import { CommissionStatus } from "@prisma/client";

/**
 * Which bookings the admin may delete. Kept free of database imports so the
 * list page and tests can use it directly.
 *
 * Only bookings with no money attached can be deleted: no deposit, no balance,
 * and no commission a partner has earned or been paid. Anything with money on
 * it must be cancelled or refunded instead, so the payment history survives.
 */

export const MAX_BULK_DELETE = 50;

export interface DeletableBooking {
  depositPaid: boolean;
  balancePaid: boolean;
  commission: { status: CommissionStatus } | null;
}

const KEEP_COMMISSION: CommissionStatus[] = [CommissionStatus.ELIGIBLE, CommissionStatus.PAID];

/** Why a booking may not be deleted, or null when it may. */
export function deleteBlocker(b: DeletableBooking): string | null {
  if (b.depositPaid || b.balancePaid) return "money has been paid; cancel or refund it instead";
  if (b.commission && KEEP_COMMISSION.includes(b.commission.status)) {
    return "a partner commission is earned or paid on it";
  }
  return null;
}

