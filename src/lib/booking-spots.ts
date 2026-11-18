import { BookingStatus, type Prisma } from "@prisma/client";

/**
 * The single source of truth for which booking statuses hold a seat on a
 * group departure. INQUIRY/PENDING leads, REFUNDED, NO_SHOW, and CANCELLED
 * bookings do NOT consume availability — only paid/confirmed climbers do.
 *
 * Used by the public departures page, invite routes, the public booking API,
 * the admin departures API, and the rotation service so they always agree.
 */
export const SPOT_HOLDING_STATUSES: BookingStatus[] = [
  BookingStatus.DEPOSIT_PAID,
  BookingStatus.CONFIRMED,
  BookingStatus.COMPLETED,
];

/** Unpaid statuses that still hold a seat in the public count for a while. */
export const REQUEST_STATUSES: BookingStatus[] = [BookingStatus.INQUIRY, BookingStatus.PENDING];

/** Days an unpaid request keeps its seat in the public seats-left count. */
export const REQUEST_HOLD_DAYS = 14;

/** Marker the booking API writes into notes when the hidden bot field was filled. */
export const BOT_FLAG_PREFIX = "[FLAGGED";

/**
 * Bookings counted as "taken" in what climbers see (seats-left on the
 * departures page and invite links): every paid seat, plus requests made in
 * the last REQUEST_HOLD_DAYS days, so the count drops as soon as someone asks
 * for a seat. Old requests stop holding seats on their own, and bot-flagged
 * requests never do, so neither can make a date look sold out. Nothing is
 * changed in the database; staff still see every request in admin.
 *
 * Capacity checks, the admin seat check and the FULL/LIMITED rotation still
 * use SPOT_HOLDING_STATUSES, so an unpaid request never blocks a paying
 * climber or closes a group.
 */
export function seatDisplayBookingWhere(now: Date = new Date()): Prisma.BookingWhereInput {
  const holdStart = new Date(now.getTime() - REQUEST_HOLD_DAYS * 24 * 60 * 60 * 1000);
  return {
    OR: [
      { status: { in: SPOT_HOLDING_STATUSES } },
      {
        status: { in: REQUEST_STATUSES },
        createdAt: { gte: holdStart },
        // notes is nullable; NOT on its own would drop rows where it is null.
        OR: [{ notes: null }, { NOT: { notes: { startsWith: BOT_FLAG_PREFIX } } }],
      },
    ],
  };
}

export function countBookedSpots(
  bookings: { totalClimbers: number }[]
): number {
  return bookings.reduce((sum, b) => sum + b.totalClimbers, 0);
}
