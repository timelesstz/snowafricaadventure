import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { AdminRole, CommissionStatus, Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { adminCommissionUpdateSchema } from "@/lib/schemas";

type RouteParams = { params: Promise<{ id: string }> };

// PATCH /api/admin/commissions/[id] - Update commission status
export async function PATCH(request: Request, { params }: RouteParams) {
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
    const { status, paymentReference } = adminCommissionUpdateSchema.parse(body);

    const updateData: Prisma.CommissionUpdateInput = {};

    if (status) {
      updateData.status = status as CommissionStatus;
      if (status === "PAID") {
        updateData.paidAt = new Date();
      }
    }

    if (paymentReference !== undefined) {
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
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Validation failed", issues: error.issues },
        { status: 400 }
      );
    }
    console.error("Error updating commission:", error);
    return NextResponse.json(
      { error: "Failed to update commission" },
      { status: 500 }
    );
  }
}
