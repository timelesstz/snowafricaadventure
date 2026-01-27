/**
 * Commission Calculation and Management Service
 * ==============================================
 * Handles automatic commission creation for website-generated bookings
 */

import { prisma } from "./prisma";
import { Prisma } from "@prisma/client";
import { sendPartnerCommissionEmail } from "./email/send";
import type { PartnerCommissionEmailData } from "./email/templates";

export type TripType = "kilimanjaro" | "safari" | "daytrip" | "zanzibar";

interface CreateCommissionParams {
  bookingId: string;
  bookingAmount: number | Prisma.Decimal;
  tripType: TripType;
  currency?: string;
}

/**
 * Find the active marketing partner (for website commissions)
 */
export async function getMarketingPartner() {
  return prisma.partner.findFirst({
    where: {
      type: "MARKETING",
      isActive: true,
    },
    include: {
      commissionRates: {
        where: { isActive: true },
      },
    },
  });
}

/**
 * Get commission rate for a specific trip type and partner
 */
export async function getCommissionRate(
  partnerId: string,
  tripType: TripType
): Promise<number | null> {
  const rate = await prisma.partnerCommissionRate.findFirst({
    where: {
      partnerId,
      tripType,
      isActive: true,
    },
  });

  return rate ? Number(rate.commissionRate) : null;
}

/**
 * Create a commission record for a booking
 * Called automatically when a booking is created from the website
 */
export async function createCommission({
  bookingId,
  bookingAmount,
  tripType,
  currency = "USD",
}: CreateCommissionParams) {
  // Find the marketing partner
  const partner = await getMarketingPartner();
  if (!partner) {
    console.log("No active marketing partner found, skipping commission");
    return null;
  }

  // Get the commission rate for this trip type
  const rate = await getCommissionRate(partner.id, tripType);
  if (!rate) {
    console.log(`No commission rate found for trip type: ${tripType}`);
    return null;
  }

  // Calculate commission amount
  const amount = Number(bookingAmount);
  const commissionAmount = (amount * rate) / 100;

  // Create the commission record
  const commission = await prisma.commission.create({
    data: {
      partnerId: partner.id,
      bookingId,
      bookingAmount: amount,
      commissionRate: rate,
      commissionAmount,
      currency,
      tripType,
      status: "PENDING",
    },
  });

  console.log(
    `Commission created: $${commissionAmount.toFixed(2)} (${rate}% of $${amount}) for ${tripType}`
  );

  // Send email notification to partner (non-blocking)
  if (partner.contactEmail) {
    sendPartnerCommissionNotification(
      partner.id,
      partner.name,
      partner.contactEmail,
      bookingId,
      tripType,
      amount,
      rate,
      commissionAmount
    ).catch((error) => {
      console.error("Failed to send partner commission email:", error);
    });
  }

  return commission;
}

/**
 * Send commission notification email to partner
 */
async function sendPartnerCommissionNotification(
  partnerId: string,
  partnerName: string,
  partnerEmail: string,
  bookingId: string,
  tripType: string,
  bookingAmount: number,
  commissionRate: number,
  commissionAmount: number
) {
  // Get booking details
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      departure: {
        include: {
          route: { select: { title: true } },
        },
      },
    },
  });

  if (!booking) return;

  // Get partner's total pending commissions
  const pendingStats = await prisma.commission.aggregate({
    where: {
      partnerId,
      status: { in: ["PENDING", "ELIGIBLE"] },
    },
    _sum: { commissionAmount: true },
    _count: true,
  });

  const emailData: PartnerCommissionEmailData = {
    partnerName,
    bookingId,
    leadName: booking.leadName,
    routeTitle: booking.departure?.route?.title || "Trip",
    departureDate: booking.departure?.arrivalDate?.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }) || "TBD",
    totalClimbers: booking.totalClimbers,
    bookingAmount,
    commissionRate,
    commissionAmount,
    tripType,
    totalPendingCommissions: pendingStats._count,
    totalPendingAmount: Number(pendingStats._sum.commissionAmount || 0),
  };

  await sendPartnerCommissionEmail(partnerEmail, emailData);
  console.log(`Partner commission email sent to ${partnerEmail}`);
}

/**
 * Update commission status when booking status changes
 */
export async function updateCommissionStatus(
  bookingId: string,
  newStatus: "ELIGIBLE" | "VOIDED"
) {
  const commission = await prisma.commission.findUnique({
    where: { bookingId },
  });

  if (!commission) return null;

  return prisma.commission.update({
    where: { bookingId },
    data: { status: newStatus },
  });
}

/**
 * Mark commission as paid
 */
export async function markCommissionPaid(
  commissionId: string,
  paymentReference?: string
) {
  return prisma.commission.update({
    where: { id: commissionId },
    data: {
      status: "PAID",
      paidAt: new Date(),
      paymentReference,
    },
  });
}

/**
 * Get commission summary for a partner
 */
export async function getPartnerCommissionSummary(partnerId: string) {
  const [pending, eligible, paid, voided] = await Promise.all([
    prisma.commission.aggregate({
      where: { partnerId, status: "PENDING" },
      _sum: { commissionAmount: true },
      _count: true,
    }),
    prisma.commission.aggregate({
      where: { partnerId, status: "ELIGIBLE" },
      _sum: { commissionAmount: true },
      _count: true,
    }),
    prisma.commission.aggregate({
      where: { partnerId, status: "PAID" },
      _sum: { commissionAmount: true },
      _count: true,
    }),
    prisma.commission.aggregate({
      where: { partnerId, status: "VOIDED" },
      _sum: { commissionAmount: true },
      _count: true,
    }),
  ]);

  return {
    pending: {
      count: pending._count,
      amount: Number(pending._sum.commissionAmount || 0),
    },
    eligible: {
      count: eligible._count,
      amount: Number(eligible._sum.commissionAmount || 0),
    },
    paid: {
      count: paid._count,
      amount: Number(paid._sum.commissionAmount || 0),
    },
    voided: {
      count: voided._count,
      amount: Number(voided._sum.commissionAmount || 0),
    },
    totalPayable:
      Number(pending._sum.commissionAmount || 0) +
      Number(eligible._sum.commissionAmount || 0),
  };
}

/**
 * Generate a payout for eligible commissions
 */
export async function generatePayout(
  partnerId: string,
  periodStart: Date,
  periodEnd: Date
) {
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
    return null;
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

  return payout;
}

/**
 * Determine trip type from booking context
 * This would be called when processing a booking to determine the correct commission rate
 */
export function determineTripType(context: {
  routeSlug?: string;
  safariSlug?: string;
  dayTripSlug?: string;
  isZanzibar?: boolean;
}): TripType {
  if (context.routeSlug) return "kilimanjaro";
  if (context.safariSlug) return "safari";
  if (context.dayTripSlug) return "daytrip";
  if (context.isZanzibar) return "zanzibar";
  return "safari"; // Default fallback
}

/**
 * Get earnings breakdown by trip type for a partner
 */
export async function getPartnerEarningsByTripType(partnerId: string) {
  const tripTypes: TripType[] = ["kilimanjaro", "safari", "daytrip", "zanzibar"];

  const breakdowns = await Promise.all(
    tripTypes.map(async (tripType) => {
      const result = await prisma.commission.aggregate({
        where: {
          partnerId,
          tripType,
          status: { in: ["PENDING", "ELIGIBLE", "PAID"] },
        },
        _sum: { commissionAmount: true, bookingAmount: true },
        _count: true,
      });

      return {
        tripType,
        bookings: result._count,
        bookingAmount: Number(result._sum.bookingAmount || 0),
        commissionAmount: Number(result._sum.commissionAmount || 0),
      };
    })
  );

  return breakdowns.filter((b) => b.bookings > 0);
}

/**
 * Get full partner earnings summary with breakdown
 */
export async function getPartnerFullEarnings(partnerId: string) {
  const [summary, byTripType, recentCommissions] = await Promise.all([
    getPartnerCommissionSummary(partnerId),
    getPartnerEarningsByTripType(partnerId),
    prisma.commission.findMany({
      where: { partnerId },
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
      take: 10,
    }),
  ]);

  return {
    summary,
    byTripType,
    recentCommissions: recentCommissions.map((c) => ({
      id: c.id,
      bookingId: c.bookingId,
      tripType: c.tripType,
      routeTitle: c.booking.departure?.route?.title || "N/A",
      bookingAmount: Number(c.bookingAmount),
      commissionAmount: Number(c.commissionAmount),
      commissionRate: Number(c.commissionRate),
      status: c.status,
      createdAt: c.createdAt,
    })),
  };
}
