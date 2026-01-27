import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { CommissionStatus, Prisma } from "@prisma/client";

// GET /api/admin/commissions - List commissions with filters
export async function GET(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const partnerId = searchParams.get("partnerId");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");

  try {
    const where: Prisma.CommissionWhereInput = {};

    if (status) where.status = status as CommissionStatus;
    if (partnerId) where.partnerId = partnerId;

    const [commissions, total] = await Promise.all([
      prisma.commission.findMany({
        where,
        include: {
          partner: { select: { name: true, type: true } },
          booking: {
            select: {
              leadName: true,
              leadEmail: true,
              departure: {
                select: {
                  route: { select: { title: true } },
                  startDate: true,
                },
              },
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.commission.count({ where }),
    ]);

    return NextResponse.json({
      commissions,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching commissions:", error);
    return NextResponse.json(
      { error: "Failed to fetch commissions" },
      { status: 500 }
    );
  }
}
