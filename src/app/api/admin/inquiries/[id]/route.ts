import { auth, requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { AdminRole, Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { adminInquiryUpdateSchema } from "@/lib/schemas";

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
  try {
    await requireRole(AdminRole.EDITOR);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unauthorized";
    const status = msg === "Insufficient permissions" ? 403 : 401;
    return NextResponse.json({ error: msg }, { status });
  }

  const { id } = await params;

  try {
    const body = await request.json();
    const data = adminInquiryUpdateSchema.parse(body);

    // Build update data — Zod has already coerced dates/numbers and validated strings
    const updateData: Prisma.InquiryUpdateInput = {};
    if (data.status !== undefined) updateData.status = data.status;
    if (data.fullName !== undefined) updateData.fullName = data.fullName;
    if (data.email !== undefined) updateData.email = data.email;
    if (data.phone !== undefined) updateData.phone = data.phone;
    if (data.phonePrefix !== undefined) updateData.phonePrefix = data.phonePrefix;
    if (data.nationality !== undefined) updateData.nationality = data.nationality;
    if (data.tripType !== undefined) updateData.tripType = data.tripType;
    if (data.numAdults !== undefined) updateData.numAdults = data.numAdults;
    if (data.numChildren !== undefined) updateData.numChildren = data.numChildren;
    if (data.arrivalDate !== undefined) updateData.arrivalDate = data.arrivalDate;
    if (data.additionalInfo !== undefined) updateData.additionalInfo = data.additionalInfo;
    if (data.relatedTo !== undefined) updateData.relatedTo = data.relatedTo;
    if (data.referralSource !== undefined) updateData.referralSource = data.referralSource;

    const inquiry = await prisma.inquiry.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(inquiry);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Validation failed", issues: error.issues },
        { status: 400 }
      );
    }
    console.error("Error updating inquiry:", error);
    return NextResponse.json(
      { error: "Failed to update inquiry" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/inquiries/[id] - Delete an inquiry (ADMIN+ only)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireRole(AdminRole.ADMIN);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unauthorized";
    const status = msg === "Insufficient permissions" ? 403 : 401;
    return NextResponse.json({ error: msg }, { status });
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
