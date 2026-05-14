import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { posts } from "@/server/db/schema";
import { eq, desc } from "drizzle-orm";
import { nanoid } from "nanoid";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const isAdmin = searchParams.get("admin") === "true";

    // For admin, return all posts (including drafts). For public, only published.
    const session = await auth.api.getSession({ headers: request.headers });
    const canSeeAll = isAdmin && session?.user?.role === "admin";

    let allPosts;
    if (canSeeAll) {
      allPosts = await db.select().from(posts).orderBy(desc(posts.createdAt));
    } else {
      allPosts = await db.select().from(posts).where(eq(posts.published, true)).orderBy(desc(posts.createdAt));
    }

    return NextResponse.json(allPosts);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, slug, content, excerpt, coverImage, published, category } = await request.json();
    const [newPost] = await db.insert(posts).values({
      id: nanoid(),
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      content,
      excerpt,
      coverImage,
      published,
      category: category === "none" ? null : category || null,
      authorId: session.user.id,
    }).returning();

    return NextResponse.json(newPost);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, title, slug, content, excerpt, coverImage, published, category } = await request.json();
    const [updatedPost] = await db.update(posts).set({
      title,
      slug,
      content,
      excerpt,
      coverImage,
      published,
      category: category === "none" ? null : category || null,
      updatedAt: new Date(),
    }).where(eq(posts.id, id)).returning();

    return NextResponse.json(updatedPost);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await request.json();
    await db.delete(posts).where(eq(posts.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}
