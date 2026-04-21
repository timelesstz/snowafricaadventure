import { auth, requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { AdminRole } from "@prisma/client";
import { ZodError } from "zod";
import { adminPayoutCreateSchema } from "@/lib/schemas";

// GET /api/admin/payouts - List all payouts
export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payouts = await prisma.commissionPayout.findMany({
      orderBy: { createdAt: "desc" },
    });

    // Fetch partner names
    const partnerIds = [...new Set(payouts.map((p) => p.partnerId))];
    const partners = await prisma.partner.findMany({
      where: { id: { in: partnerIds } },
      select: { id: true, name: true },
    });
    const partnerMap = new Map(partners.map((p) => [p.id, p.name]));

    const payoutsWithPartner = payouts.map((p) => ({
      ...p,
      partnerName: partnerMap.get(p.partnerId) || "Unknown",
    }));

    return NextResponse.json(payoutsWithPartner);
  } catch (error) {
    console.error("Error fetching payouts:", error);
    return NextResponse.json(
      { error: "Failed to fetch payouts" },
      { status: 500 }
    );
  }
}

// POST /api/admin/payouts - Generate a new payout
export async function POST(request: Request) {
  try {
    await requireRole(AdminRole.ADMIN);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unauthorized";
    const status = msg === "Insufficient permissions" ? 403 : 401;
    return NextResponse.json({ error: msg }, { status });
  }

  try {
    const body = await request.json();
    const { partnerId, periodStart, periodEnd } = adminPayoutCreateSchema.parse(body);

    if (periodEnd < periodStart) {
      return NextResponse.json(
        { error: "periodEnd must be on or after periodStart" },
        { status: 400 }
      );
    }

    // Get eligible commissions in the period
    const commissions = await prisma.commission.findMany({
      where: {
        partnerId,
        status: "ELIGIBLE",
        createdAt: {
          gte: periodStart,
          lte: periodEnd,
        },
      },
    });

    if (commissions.length === 0) {
      return NextResponse.json(
        { error: "No eligible commissions found in this period" },
        { status: 400 }
      );
    }

    const totalAmount = commissions.reduce(
      (sum, c) => sum + Number(c.commissionAmount),
      0
    );

    // Create payout record
    const payout = await prisma.commissionPayout.create({
      data: {
        partnerId,
        periodStart,
        periodEnd,
        totalCommissions: commissions.length,
        totalAmount,
        status: "PENDING",
      },
    });

    return NextResponse.json(payout, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Validation failed", issues: error.issues },
        { status: 400 }
      );
    }
    console.error("Error creating payout:", error);
    return NextResponse.json(
      { error: "Failed to create payout" },
      { status: 500 }
    );
  }
}
