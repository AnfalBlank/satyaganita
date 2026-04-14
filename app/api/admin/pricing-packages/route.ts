import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { pricingPackages } from "@/server/db/schema";
import { auth } from "@/lib/auth";
import { nanoid } from "nanoid";
import { eq } from "drizzle-orm";

// GET /api/admin/pricing-packages - Fetch all pricing packages
export async function GET(request: NextRequest) {
  try {
    const allPackages = await db.select().from(pricingPackages).orderBy(pricingPackages.order);
    return NextResponse.json(allPackages);
  } catch (error) {
    console.error("Failed to fetch pricing packages:", error);
    return NextResponse.json({ error: "Failed to fetch pricing packages" }, { status: 500 });
  }
}

// POST /api/admin/pricing-packages - Create pricing package
export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, revenue, price, period, focus, icon, popular, color, buttonColor, order } = body;

    if (!name || !revenue || !price || !focus) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newPackage = await db.insert(pricingPackages).values({
      id: nanoid(),
      name,
      revenue,
      price,
      period: period || '',
      focus,
      icon: icon || null,
      popular: popular || false,
      color: color || 'border-primary',
      buttonColor: buttonColor || 'bg-primary hover:bg-primary/90',
      order: order || 0,
    }).returning();

    return NextResponse.json(newPackage[0]);
  } catch (error) {
    console.error("Failed to create pricing package:", error);
    return NextResponse.json({ error: "Failed to create pricing package" }, { status: 500 });
  }
}

// PUT /api/admin/pricing-packages - Update pricing package
export async function PUT(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const updated = await db.update(pricingPackages)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(pricingPackages.id, id))
      .returning();

    return NextResponse.json(updated[0]);
  } catch (error) {
    console.error("Failed to update pricing package:", error);
    return NextResponse.json({ error: "Failed to update pricing package" }, { status: 500 });
  }
}

// DELETE /api/admin/pricing-packages - Delete pricing package
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await db.delete(pricingPackages).where(eq(pricingPackages.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete pricing package:", error);
    return NextResponse.json({ error: "Failed to delete pricing package" }, { status: 500 });
  }
}
