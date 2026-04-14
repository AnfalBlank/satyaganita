import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { industrySectors } from "@/server/db/schema";
import { auth } from "@/lib/auth";
import { nanoid } from "nanoid";
import { eq } from "drizzle-orm";

// GET /api/admin/industry-sectors
export async function GET() {
  try {
    const sectors = await db.select().from(industrySectors).orderBy(industrySectors.order);
    return NextResponse.json(sectors);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

// POST /api/admin/industry-sectors
export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, order } = await request.json();
    const newSector = await db.insert(industrySectors).values({
      id: nanoid(),
      name,
      order: order || 0,
    }).returning();

    return NextResponse.json(newSector[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}

// PUT /api/admin/industry-sectors
export async function PUT(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, ...updateData } = await request.json();
    const updated = await db.update(industrySectors)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(industrySectors.id, id))
      .returning();

    return NextResponse.json(updated[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

// DELETE /api/admin/industry-sectors
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    await db.delete(industrySectors).where(eq(industrySectors.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
