import { BookingStatus } from "@prisma/client";

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

export function countBookedSpots(
  bookings: { totalClimbers: number }[]
): number {
  return bookings.reduce((sum, b) => sum + b.totalClimbers, 0);
}
