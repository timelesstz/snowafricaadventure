import { auth, requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { AdminRole, Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { adminPartnerCreateSchema } from "@/lib/schemas";

// GET /api/admin/partners - List all partners
export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const partners = await prisma.partner.findMany({
      include: {
        commissionRates: true,
        _count: {
          select: { commissions: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(partners);
  } catch (error) {
    console.error("Error fetching partners:", error);
    return NextResponse.json(
      { error: "Failed to fetch partners" },
      { status: 500 }
    );
  }
}

// POST /api/admin/partners - Create a new partner
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
    const data = adminPartnerCreateSchema.parse(body);

    const partner = await prisma.partner.create({
      data: {
        name: data.name,
        type: data.type,
        contactName: data.contactName || null,
        contactEmail: data.contactEmail || null,
        contactPhone: data.contactPhone || null,
        agreementDate: data.agreementDate ?? null,
        agreementExpiry: data.agreementExpiry ?? null,
        agreementDocument: data.agreementDocument ?? null,
        payoutFrequency: data.payoutFrequency ?? "MONTHLY",
        payoutMethod: data.payoutMethod ?? null,
        payoutDetails: (data.payoutDetails as Prisma.InputJsonValue) ?? undefined,
        notes: data.notes || null,
        isActive: data.isActive ?? true,
        commissionRates: data.commissionRates
          ? {
              create: data.commissionRates.map((rate) => ({
                tripType: rate.tripType,
                commissionRate: rate.commissionRate,
                isActive: rate.isActive ?? true,
              })),
            }
          : undefined,
      },
      include: {
        commissionRates: true,
      },
    });

    return NextResponse.json(partner, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Validation failed", issues: error.issues },
        { status: 400 }
      );
    }
    console.error("Error creating partner:", error);
    return NextResponse.json(
      { error: "Failed to create partner" },
      { status: 500 }
    );
  }
}
