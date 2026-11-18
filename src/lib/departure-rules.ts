import type { DepartureStatus } from "@prisma/client";

/**
 * Shared rules for group departures, used by the public page, the booking
 * form and the booking API so the price a climber sees is the price they are
 * quoted, and every path agrees on which departures can still be booked.
 */

/** Departure statuses that accept new bookings. FULL, CANCELLED and COMPLETED do not. */
export const BOOKABLE_STATUSES: DepartureStatus[] = ["OPEN", "LIMITED", "GUARANTEED"];

interface PricedDeparture {
  price: number | { toString(): string };
  earlyBirdPrice: number | { toString(): string } | null;
  earlyBirdUntil: Date | null;
}

/** The early-bird price while it is active and lower than the full price, else null. */
export function activeEarlyBirdPrice(dep: PricedDeparture, now: Date = new Date()): number | null {
  if (dep.earlyBirdPrice == null || dep.earlyBirdUntil == null) return null;
  const early = Number(dep.earlyBirdPrice);
  const full = Number(dep.price);
  if (dep.earlyBirdUntil <= now || early <= 0 || early >= full) return null;
  return early;
}

/** The per-person price a climber pays today. */
export function effectivePrice(dep: PricedDeparture, now: Date = new Date()): number {
  return activeEarlyBirdPrice(dep, now) ?? Number(dep.price);
}

/** Midnight UTC today. Departure dates are stored as UTC calendar dates. */
export function startOfTodayUTC(now: Date = new Date()): Date {
  const d = new Date(now);
  d.setUTCHours(0, 0, 0, 0);
  return d;
}

/** A departure can be booked while its status is bookable and it has not started. */
export function isDepartureBookable(
  dep: { status: DepartureStatus; arrivalDate: Date },
  now: Date = new Date()
): boolean {
  return BOOKABLE_STATUSES.includes(dep.status) && dep.arrivalDate > startOfTodayUTC(now);
}

/**
 * Parse a "YYYY-MM-DD" calendar date as a local date, so date-fns `format`
 * shows the same day in every time zone. `new Date("2026-12-01")` is UTC
 * midnight, which renders as Nov 30 for anyone west of UTC.
 */
export function parseCalendarDate(value: string): Date {
  const [y, m, d] = value.slice(0, 10).split("-").map(Number);
  return new Date(y, m - 1, d);
}
