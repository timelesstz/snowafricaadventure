import { auth, requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { AdminRole, Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { adminPartnerUpdateSchema } from "@/lib/schemas";

type RouteParams = { params: Promise<{ id: string }> };

// GET /api/admin/partners/[id] - Get a single partner
export async function GET(request: Request, { params }: RouteParams) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const partner = await prisma.partner.findUnique({
      where: { id },
      include: {
        commissionRates: true,
        commissions: {
          take: 10,
          orderBy: { createdAt: "desc" },
          include: {
            booking: {
              select: { leadName: true, leadEmail: true },
            },
          },
        },
      },
    });

    if (!partner) {
      return NextResponse.json({ error: "Partner not found" }, { status: 404 });
    }

    return NextResponse.json(partner);
  } catch (error) {
    console.error("Error fetching partner:", error);
    return NextResponse.json(
      { error: "Failed to fetch partner" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/partners/[id] - Update a partner
export async function PUT(request: Request, { params }: RouteParams) {
  try {
    await requireRole(AdminRole.ADMIN);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unauthorized";
    const status = msg === "Insufficient permissions" ? 403 : 401;
    return NextResponse.json({ error: msg }, { status });
  }

  const { id } = await params;

  try {
    const body = await request.json();
    const data = adminPartnerUpdateSchema.parse(body);

    // Build a partial update — only include fields the client actually sent
    const updateData: Prisma.PartnerUpdateInput = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.type !== undefined) updateData.type = data.type;
    if (data.contactName !== undefined) updateData.contactName = data.contactName || null;
    if (data.contactEmail !== undefined) updateData.contactEmail = data.contactEmail || null;
    if (data.contactPhone !== undefined) updateData.contactPhone = data.contactPhone || null;
    if (data.agreementDate !== undefined) updateData.agreementDate = data.agreementDate;
    if (data.agreementExpiry !== undefined) updateData.agreementExpiry = data.agreementExpiry;
    if (data.agreementDocument !== undefined) updateData.agreementDocument = data.agreementDocument;
    if (data.payoutFrequency !== undefined) updateData.payoutFrequency = data.payoutFrequency;
    if (data.payoutMethod !== undefined) updateData.payoutMethod = data.payoutMethod;
    if (data.payoutDetails !== undefined) {
      updateData.payoutDetails =
        data.payoutDetails === null
          ? Prisma.JsonNull
          : (data.payoutDetails as Prisma.InputJsonValue);
    }
    if (data.notes !== undefined) updateData.notes = data.notes;
    if (data.isActive !== undefined) updateData.isActive = data.isActive;

    await prisma.partner.update({ where: { id }, data: updateData });

    // Update commission rates if provided (delete + recreate atomically)
    if (data.commissionRates) {
      await prisma.$transaction([
        prisma.partnerCommissionRate.deleteMany({ where: { partnerId: id } }),
        prisma.partnerCommissionRate.createMany({
          data: data.commissionRates.map((rate) => ({
            partnerId: id,
            tripType: rate.tripType,
            commissionRate: rate.commissionRate,
            isActive: rate.isActive ?? true,
          })),
        }),
      ]);
    }

    // Fetch updated partner with rates
    const updatedPartner = await prisma.partner.findUnique({
      where: { id },
      include: { commissionRates: true },
    });

    return NextResponse.json(updatedPartner);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Validation failed", issues: error.issues },
        { status: 400 }
      );
    }
    console.error("Error updating partner:", error);
    return NextResponse.json(
      { error: "Failed to update partner" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/partners/[id] - Delete a partner
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    await requireRole(AdminRole.ADMIN);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unauthorized";
    const status = msg === "Insufficient permissions" ? 403 : 401;
    return NextResponse.json({ error: msg }, { status });
  }

  const { id } = await params;

  try {
    // Check if partner has any commissions
    const commissionCount = await prisma.commission.count({
      where: { partnerId: id },
    });

    if (commissionCount > 0) {
      // Soft delete - just deactivate
      await prisma.partner.update({
        where: { id },
        data: { isActive: false },
      });
      return NextResponse.json({
        message: "Partner deactivated (has existing commissions)",
      });
    }

    // Hard delete if no commissions
    await prisma.partner.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Partner deleted" });
  } catch (error) {
    console.error("Error deleting partner:", error);
    return NextResponse.json(
      { error: "Failed to delete partner" },
      { status: 500 }
    );
  }
}
