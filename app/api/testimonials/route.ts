import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { testimonials } from "@/server/db/schema";
import { eq, desc, and } from "drizzle-orm";
import { nanoid } from "nanoid";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get("all") === "true";
    
    const session = await auth.api.getSession({ headers: request.headers });
    const isAdmin = session?.user?.role === "admin";

    let query = db.select().from(testimonials);

    if (all && isAdmin) {
      // Return all for admin dashboard
      return NextResponse.json(await query.orderBy(desc(testimonials.createdAt)));
    } else {
      // Return only approved for public
      return NextResponse.json(await query.where(eq(testimonials.approved, true)).orderBy(desc(testimonials.createdAt)));
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, company, role, content, rating, avatar } = await request.json();
    
    const session = await auth.api.getSession({ headers: request.headers });
    const isAdmin = session?.user?.role === "admin";

    // If admin is posting, it's auto-approved. If user is posting, it needs approval.
    const [newTestimonial] = await db.insert(testimonials).values({
      id: nanoid(),
      name,
      company,
      role,
      content,
      rating: rating || 5,
      avatar,
      approved: isAdmin ? true : false,
    }).returning();

    return NextResponse.json(newTestimonial);
  } catch (error) {
    console.error("Testimonial creation error:", error);
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, name, company, role, content, rating, avatar, approved } = await request.json();
    const [updatedTestimonial] = await db.update(testimonials).set({
      name,
      company,
      role,
      content,
      rating,
      avatar,
      approved,
    }).where(eq(testimonials.id, id)).returning();

    return NextResponse.json(updatedTestimonial);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update testimonial" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await request.json();
    await db.delete(testimonials).where(eq(testimonials.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 });
  }
}
