import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

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
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await request.json();
    const {
      name,
      type,
      contactName,
      contactEmail,
      contactPhone,
      agreementDate,
      agreementExpiry,
      payoutFrequency,
      payoutMethod,
      payoutDetails,
      notes,
      isActive,
      commissionRates,
    } = body;

    // Update partner
    const partner = await prisma.partner.update({
      where: { id },
      data: {
        name,
        type,
        contactName,
        contactEmail,
        contactPhone,
        agreementDate: agreementDate ? new Date(agreementDate) : null,
        agreementExpiry: agreementExpiry ? new Date(agreementExpiry) : null,
        payoutFrequency,
        payoutMethod,
        payoutDetails,
        notes,
        isActive,
      },
    });

    // Update commission rates if provided
    if (commissionRates) {
      // Delete existing rates
      await prisma.partnerCommissionRate.deleteMany({
        where: { partnerId: id },
      });

      // Create new rates
      await prisma.partnerCommissionRate.createMany({
        data: commissionRates.map(
          (rate: { tripType: string; commissionRate: number; isActive?: boolean }) => ({
            partnerId: id,
            tripType: rate.tripType,
            commissionRate: rate.commissionRate,
            isActive: rate.isActive ?? true,
          })
        ),
      });
    }

    // Fetch updated partner with rates
    const updatedPartner = await prisma.partner.findUnique({
      where: { id },
      include: { commissionRates: true },
    });

    return NextResponse.json(updatedPartner);
  } catch (error) {
    console.error("Error updating partner:", error);
    return NextResponse.json(
      { error: "Failed to update partner" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/partners/[id] - Delete a partner
export async function DELETE(request: Request, { params }: RouteParams) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
