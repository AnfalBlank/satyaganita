import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { faqs } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const allFaqs = await db.select().from(faqs).orderBy(faqs.order);
    return NextResponse.json(allFaqs);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch FAQs" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { question, answer, order } = await request.json();
    const [newFaq] = await db.insert(faqs).values({
      id: nanoid(),
      question,
      answer,
      order: order || 0,
    }).returning();

    return NextResponse.json(newFaq);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create FAQ" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, question, answer, order } = await request.json();
    const [updatedFaq] = await db.update(faqs).set({
      question,
      answer,
      order,
      updatedAt: new Date(),
    }).where(eq(faqs.id, id)).returning();

    return NextResponse.json(updatedFaq);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update FAQ" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await request.json();
    await db.delete(faqs).where(eq(faqs.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete FAQ" }, { status: 500 });
  }
}
