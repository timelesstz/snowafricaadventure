import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { CommissionStatus, Prisma } from "@prisma/client";

// GET /api/admin/commissions/export - Export commissions as CSV
export async function GET(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const partnerId = searchParams.get("partnerId");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  try {
    // Build where clause with proper typing
    const whereClause: Prisma.CommissionWhereInput = {
      ...(status && { status: status as CommissionStatus }),
      ...(partnerId && { partnerId }),
      ...((startDate || endDate) && {
        createdAt: {
          ...(startDate && { gte: new Date(startDate) }),
          ...(endDate && { lte: new Date(endDate) }),
        },
      }),
    };

    const commissions = await prisma.commission.findMany({
      where: whereClause,
      include: {
        partner: { select: { name: true } },
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
    });

    // Generate CSV
    const headers = [
      "ID",
      "Date",
      "Partner",
      "Customer",
      "Email",
      "Trip",
      "Departure Date",
      "Booking Amount",
      "Rate",
      "Commission",
      "Currency",
      "Status",
      "Paid At",
      "Payment Ref",
    ];

    const rows = commissions.map((c) => [
      c.id,
      c.createdAt.toISOString().split("T")[0],
      c.partner.name,
      c.booking.leadName,
      c.booking.leadEmail,
      c.booking.departure.route.title,
      c.booking.departure.startDate.toISOString().split("T")[0],
      Number(c.bookingAmount).toFixed(2),
      `${Number(c.commissionRate)}%`,
      Number(c.commissionAmount).toFixed(2),
      c.currency,
      c.status,
      c.paidAt ? c.paidAt.toISOString().split("T")[0] : "",
      c.paymentReference || "",
    ]);

    const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join(
      "\n"
    );

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="commissions-${new Date().toISOString().split("T")[0]}.csv"`,
      },
    });
  } catch (error) {
    console.error("Error exporting commissions:", error);
    return NextResponse.json(
      { error: "Failed to export commissions" },
      { status: 500 }
    );
  }
}
