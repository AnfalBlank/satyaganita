import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { services } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const allServices = await db.select().from(services).orderBy(services.order);
    return NextResponse.json(allServices);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, description, icon, slug, order } = await request.json();
    const [newService] = await db.insert(services).values({
      id: nanoid(),
      title,
      description,
      icon,
      slug: slug || title.toLowerCase().replace(/ /g, "-"),
      order: order || 0,
    }).returning();

    return NextResponse.json(newService);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, title, description, icon, slug, order } = await request.json();
    const [updatedService] = await db.update(services).set({
      title,
      description,
      icon,
      slug,
      order,
      updatedAt: new Date(),
    }).where(eq(services.id, id)).returning();

    return NextResponse.json(updatedService);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update service" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await request.json();
    await db.delete(services).where(eq(services.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete service" }, { status: 500 });
  }
}
