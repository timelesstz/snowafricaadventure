import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/admin/inquiries/[id] - Get a single inquiry
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const inquiry = await prisma.inquiry.findUnique({
      where: { id },
    });

    if (!inquiry) {
      return NextResponse.json(
        { error: "Inquiry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(inquiry);
  } catch (error) {
    console.error("Error fetching inquiry:", error);
    return NextResponse.json(
      { error: "Failed to fetch inquiry" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/inquiries/[id] - Update inquiry (all fields)
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await request.json();
    const {
      status,
      fullName,
      email,
      phone,
      phonePrefix,
      nationality,
      tripType,
      numAdults,
      numChildren,
      arrivalDate,
      additionalInfo,
      relatedTo,
      referralSource,
    } = body;

    // Build update data - only include fields that are provided
    const updateData: Record<string, unknown> = {};

    if (status !== undefined) updateData.status = status;
    if (fullName !== undefined) updateData.fullName = fullName;
    if (email !== undefined) updateData.email = email;
    if (phone !== undefined) updateData.phone = phone;
    if (phonePrefix !== undefined) updateData.phonePrefix = phonePrefix;
    if (nationality !== undefined) updateData.nationality = nationality;
    if (tripType !== undefined) updateData.tripType = tripType;
    if (numAdults !== undefined) updateData.numAdults = numAdults ? parseInt(numAdults) : null;
    if (numChildren !== undefined) updateData.numChildren = numChildren ? parseInt(numChildren) : null;
    if (arrivalDate !== undefined) updateData.arrivalDate = arrivalDate ? new Date(arrivalDate) : null;
    if (additionalInfo !== undefined) updateData.additionalInfo = additionalInfo;
    if (relatedTo !== undefined) updateData.relatedTo = relatedTo;
    if (referralSource !== undefined) updateData.referralSource = referralSource;

    const inquiry = await prisma.inquiry.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(inquiry);
  } catch (error) {
    console.error("Error updating inquiry:", error);
    return NextResponse.json(
      { error: "Failed to update inquiry" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/inquiries/[id] - Delete an inquiry
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    await prisma.inquiry.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting inquiry:", error);
    return NextResponse.json(
      { error: "Failed to delete inquiry" },
      { status: 500 }
    );
  }
}
