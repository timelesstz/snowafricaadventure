import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendPartnerCommissionEmail } from "@/lib/email/send";
import type { PartnerCommissionEmailData } from "@/lib/email/templates";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const partner = await prisma.partner.findUnique({
      where: { id },
      include: {
        commissions: {
          where: { status: { in: ["PENDING", "ELIGIBLE"] } },
          orderBy: { createdAt: "desc" },
          take: 1,
          include: {
            booking: {
              include: {
                departure: {
                  include: {
                    route: { select: { title: true } },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!partner) {
      return NextResponse.json({ error: "Partner not found" }, { status: 404 });
    }

    if (!partner.contactEmail) {
      return NextResponse.json(
        { error: "Partner has no email configured" },
        { status: 400 }
      );
    }

    // Get pending commission stats
    const pendingStats = await prisma.commission.aggregate({
      where: {
        partnerId: id,
        status: { in: ["PENDING", "ELIGIBLE"] },
      },
      _sum: { commissionAmount: true },
      _count: true,
    });

    // Use most recent commission for test email, or create sample data
    const recentCommission = partner.commissions[0];

    const emailData: PartnerCommissionEmailData = {
      partnerName: partner.name,
      bookingId: recentCommission?.bookingId || "TEST-BOOKING-ID",
      leadName: recentCommission?.booking?.leadName || "Test Customer",
      routeTitle:
        recentCommission?.booking?.departure?.route?.title ||
        "Kilimanjaro Lemosho Route",
      departureDate:
        recentCommission?.booking?.departure?.arrivalDate?.toLocaleDateString(
          "en-US",
          {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          }
        ) || "January 15, 2025",
      totalClimbers: recentCommission?.booking?.totalClimbers || 2,
      bookingAmount: recentCommission
        ? Number(recentCommission.bookingAmount)
        : 4500,
      commissionRate: recentCommission
        ? Number(recentCommission.commissionRate)
        : 15,
      commissionAmount: recentCommission
        ? Number(recentCommission.commissionAmount)
        : 675,
      tripType: recentCommission?.tripType || "kilimanjaro",
      totalPendingCommissions: pendingStats._count,
      totalPendingAmount: Number(pendingStats._sum.commissionAmount || 0),
    };

    await sendPartnerCommissionEmail(partner.contactEmail, emailData);

    return NextResponse.json({
      success: true,
      message: `Test email sent to ${partner.contactEmail}`,
    });
  } catch (error) {
    console.error("Failed to send test email:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to send email" },
      { status: 500 }
    );
  }
}
