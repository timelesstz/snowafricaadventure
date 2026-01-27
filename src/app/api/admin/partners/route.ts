import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

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
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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
      commissionRates,
    } = body;

    const partner = await prisma.partner.create({
      data: {
        name,
        type,
        contactName,
        contactEmail,
        contactPhone,
        agreementDate: agreementDate ? new Date(agreementDate) : null,
        agreementExpiry: agreementExpiry ? new Date(agreementExpiry) : null,
        payoutFrequency: payoutFrequency || "MONTHLY",
        payoutMethod,
        payoutDetails,
        notes,
        isActive: true,
        commissionRates: commissionRates
          ? {
              create: commissionRates.map(
                (rate: { tripType: string; commissionRate: number }) => ({
                  tripType: rate.tripType,
                  commissionRate: rate.commissionRate,
                  isActive: true,
                })
              ),
            }
          : undefined,
      },
      include: {
        commissionRates: true,
      },
    });

    return NextResponse.json(partner, { status: 201 });
  } catch (error) {
    console.error("Error creating partner:", error);
    return NextResponse.json(
      { error: "Failed to create partner" },
      { status: 500 }
    );
  }
}
