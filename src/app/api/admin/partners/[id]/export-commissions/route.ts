import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const partner = await prisma.partner.findUnique({
      where: { id },
      select: { name: true },
    });

    if (!partner) {
      return NextResponse.json({ error: "Partner not found" }, { status: 404 });
    }

    const commissions = await prisma.commission.findMany({
      where: { partnerId: id },
      include: {
        booking: {
          include: {
            departure: {
              include: {
                route: { select: { title: true, slug: true } },
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Build CSV content
    const headers = [
      "Commission ID",
      "Booking ID",
      "Customer Name",
      "Route",
      "Trip Type",
      "Departure Date",
      "Climbers",
      "Booking Amount",
      "Commission Rate",
      "Commission Amount",
      "Currency",
      "Status",
      "Created Date",
      "Paid Date",
      "Payment Reference",
    ];

    const rows = commissions.map((c) => [
      c.id,
      c.bookingId,
      c.booking?.leadName || "N/A",
      c.booking?.departure?.route?.title || "N/A",
      c.tripType || "N/A",
      c.booking?.departure?.arrivalDate?.toISOString().split("T")[0] || "N/A",
      c.booking?.totalClimbers?.toString() || "0",
      Number(c.bookingAmount).toFixed(2),
      Number(c.commissionRate).toFixed(2) + "%",
      Number(c.commissionAmount).toFixed(2),
      c.currency,
      c.status,
      c.createdAt.toISOString().split("T")[0],
      c.paidAt?.toISOString().split("T")[0] || "",
      c.paymentReference || "",
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n");

    // Calculate summary
    const summary = {
      totalCommissions: commissions.length,
      totalAmount: commissions.reduce(
        (sum, c) => sum + Number(c.commissionAmount),
        0
      ),
      pendingAmount: commissions
        .filter((c) => c.status === "PENDING" || c.status === "ELIGIBLE")
        .reduce((sum, c) => sum + Number(c.commissionAmount), 0),
      paidAmount: commissions
        .filter((c) => c.status === "PAID")
        .reduce((sum, c) => sum + Number(c.commissionAmount), 0),
    };

    // Add summary at the end
    const summaryRows = [
      "",
      "SUMMARY",
      `Total Commissions,${summary.totalCommissions}`,
      `Total Amount,$${summary.totalAmount.toFixed(2)}`,
      `Pending/Eligible,$${summary.pendingAmount.toFixed(2)}`,
      `Paid,$${summary.paidAmount.toFixed(2)}`,
    ];

    const fullCsv = csvContent + "\n" + summaryRows.join("\n");

    // Return CSV file
    const filename = `${partner.name.toLowerCase().replace(/\s+/g, "-")}-commissions-${
      new Date().toISOString().split("T")[0]
    }.csv`;

    return new NextResponse(fullCsv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Failed to export commissions:", error);
    return NextResponse.json(
      { error: "Failed to export commissions" },
      { status: 500 }
    );
  }
}
