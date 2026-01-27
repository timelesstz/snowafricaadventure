import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { CommissionStatus, Prisma } from "@prisma/client";

type RouteParams = { params: Promise<{ id: string }> };

// PATCH /api/admin/commissions/[id] - Update commission status
export async function PATCH(request: Request, { params }: RouteParams) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await request.json();
    const { status, paymentReference } = body;

    const updateData: Prisma.CommissionUpdateInput = {};

    if (status) {
      updateData.status = status as CommissionStatus;
      if (status === "PAID") {
        updateData.paidAt = new Date();
      }
    }

    if (paymentReference) {
      updateData.paymentReference = paymentReference;
    }

    const commission = await prisma.commission.update({
      where: { id },
      data: updateData,
      include: {
        partner: { select: { name: true } },
        booking: { select: { leadName: true } },
      },
    });

    return NextResponse.json(commission);
  } catch (error) {
    console.error("Error updating commission:", error);
    return NextResponse.json(
      { error: "Failed to update commission" },
      { status: 500 }
    );
  }
}
