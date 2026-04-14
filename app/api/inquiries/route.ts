import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/server/db'
import { inquiries } from '@/server/db/schema'
import { nanoid } from 'nanoid'
import { eq, desc } from 'drizzle-orm'
import { auth } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const allInquiries = await db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
    return NextResponse.json(allInquiries);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch inquiries" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, companyName, email, whatsapp, service, description } = body

    console.log('[Inquiry API] Received body:', body)

    if (!name || !email || !whatsapp || !description) {
      return NextResponse.json(
        { error: 'Name, email, whatsapp, and description are required' },
        { status: 400 }
      )
    }

    const [newInquiry] = await db.insert(inquiries).values({
      id: nanoid(),
      name,
      companyName: companyName || null,
      email,
      whatsapp,
      service: service || 'Lainnya',
      description,
      status: 'pending',
    }).returning()

    console.log('[Inquiry API] Created inquiry:', newInquiry)

    return NextResponse.json(newInquiry, { status: 201 })
  } catch (error) {
    console.error('[Inquiry API] Error:', error)
    return NextResponse.json(
      { error: 'Failed to submit inquiry' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, status } = await request.json();
    const [updatedInquiry] = await db.update(inquiries)
      .set({ status })
      .where(eq(inquiries.id, id))
      .returning();

    return NextResponse.json(updatedInquiry);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update inquiry" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await request.json();
    await db.delete(inquiries).where(eq(inquiries.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete inquiry" }, { status: 500 });
  }
}
