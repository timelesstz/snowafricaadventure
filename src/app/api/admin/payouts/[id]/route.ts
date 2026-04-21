import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { AdminRole, PayoutStatus, CommissionStatus, Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { adminPayoutUpdateSchema } from "@/lib/schemas";

type RouteParams = { params: Promise<{ id: string }> };

// PATCH /api/admin/payouts/[id] - Update payout status
export async function PATCH(request: Request, { params }: RouteParams) {
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
    const { status, paymentReference, notes } = adminPayoutUpdateSchema.parse(body);

    const updateData: Prisma.CommissionPayoutUpdateInput = {};

    if (status) {
      updateData.status = status as PayoutStatus;
      if (status === "PAID") {
        updateData.paidAt = new Date();

        // Also mark all related commissions as paid
        const payout = await prisma.commissionPayout.findUnique({
          where: { id },
        });

        if (payout) {
          await prisma.commission.updateMany({
            where: {
              partnerId: payout.partnerId,
              status: CommissionStatus.ELIGIBLE,
              createdAt: {
                gte: payout.periodStart,
                lte: payout.periodEnd,
              },
            },
            data: {
              status: CommissionStatus.PAID,
              paidAt: new Date(),
              paymentReference: paymentReference || `Payout: ${id}`,
            },
          });
        }
      }
    }

    if (paymentReference !== undefined) updateData.paymentReference = paymentReference;
    if (notes !== undefined) updateData.notes = notes;

    const payout = await prisma.commissionPayout.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(payout);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Validation failed", issues: error.issues },
        { status: 400 }
      );
    }
    console.error("Error updating payout:", error);
    return NextResponse.json(
      { error: "Failed to update payout" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/payouts/[id] - Cancel/delete payout
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
    const payout = await prisma.commissionPayout.findUnique({
      where: { id },
    });

    if (!payout) {
      return NextResponse.json({ error: "Payout not found" }, { status: 404 });
    }

    if (payout.status === "PAID") {
      return NextResponse.json(
        { error: "Cannot delete a paid payout" },
        { status: 400 }
      );
    }

    await prisma.commissionPayout.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Payout deleted" });
  } catch (error) {
    console.error("Error deleting payout:", error);
    return NextResponse.json(
      { error: "Failed to delete payout" },
      { status: 500 }
    );
  }
}
