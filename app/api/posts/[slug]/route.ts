import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { posts, categories } from "@/server/db/schema";
import { eq, and, ne, desc } from "drizzle-orm";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    // Fetch the main post
    const post = await db.query.posts.findFirst({
      where: eq(posts.slug, slug),
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Fetch the category name if it exists
    let categoryName = "Insight";
    if (post.category) {
      const cat = await db.query.categories.findFirst({
        where: eq(categories.id, post.category),
      });
      if (cat) categoryName = cat.name;
    }

    // Fetch related posts (same category, excluding current post)
    const relatedPosts = await db.query.posts.findMany({
      where: and(
        ne(posts.id, post.id),
        eq(posts.published, true),
        post.category ? eq(posts.category, post.category) : undefined
      ),
      limit: 3,
      orderBy: [desc(posts.createdAt)],
    });

    // If not enough related posts in the same category, fetch recent ones
    if (relatedPosts.length < 3) {
      const recentPosts = await db.query.posts.findMany({
        where: and(
          ne(posts.id, post.id),
          eq(posts.published, true),
          // Exclude already fetched related posts
          ...relatedPosts.map(rp => ne(posts.id, rp.id))
        ),
        limit: 3 - relatedPosts.length,
        orderBy: [desc(posts.createdAt)],
      });
      relatedPosts.push(...recentPosts);
    }

    return NextResponse.json({
      ...post,
      categoryName,
      relatedPosts,
    });
  } catch (error) {
    console.error("[API_POST_DETAIL]", error);
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}
