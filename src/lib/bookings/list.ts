import { BookingStatus, type Prisma } from "@prisma/client";

/**
 * Filters, money and timing rules for the admin bookings list.
 * Pure functions so the page stays a thin view and the rules are tested.
 */

export const PAGE_SIZE = 20;

/** Statuses in the order a booking moves through them. */
export const STATUS_ORDER: BookingStatus[] = [
  BookingStatus.INQUIRY,
  BookingStatus.PENDING,
  BookingStatus.DEPOSIT_PAID,
  BookingStatus.CONFIRMED,
  BookingStatus.COMPLETED,
  BookingStatus.CANCELLED,
  BookingStatus.REFUNDED,
  BookingStatus.NO_SHOW,
];

export const STATUS_LABEL: Record<BookingStatus, string> = {
  INQUIRY: "Inquiry",
  PENDING: "Pending",
  DEPOSIT_PAID: "Deposit paid",
  CONFIRMED: "Confirmed",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
  REFUNDED: "Refunded",
  NO_SHOW: "No show",
};

/** Not yet paid for: the team still has to win these. */
export const OPEN_STATUSES: BookingStatus[] = [BookingStatus.INQUIRY, BookingStatus.PENDING];
/** Money is in, or promised by a confirmed booking. */
export const BOOKED_STATUSES: BookingStatus[] = [
  BookingStatus.DEPOSIT_PAID,
  BookingStatus.CONFIRMED,
  BookingStatus.COMPLETED,
];

/** An open booking departing this soon without a deposit needs a nudge. */
export const FOLLOW_UP_DAYS = 45;

export type BookingView = "all" | "follow-up" | BookingStatus;

export interface BookingFilters {
  view: BookingView;
  search: string;
  page: number;
}

const DAY = 86_400_000;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

/** Reads the query string; anything unknown falls back to a safe default instead of crashing the query. */
export function parseBookingFilters(params: Record<string, string | string[] | undefined>): BookingFilters {
  const rawView = first(params.status) ?? "all";
  const view: BookingView =
    rawView === "follow-up" || (STATUS_ORDER as string[]).includes(rawView) ? (rawView as BookingView) : "all";
  const search = (first(params.search) ?? "").trim().slice(0, 100);
  const page = Number.parseInt(first(params.page) ?? "1", 10);
  return { view, search, page: Number.isFinite(page) && page > 0 ? page : 1 };
}

const startOfDay = (d: Date) => new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));

/** Open bookings whose climb has started or starts within FOLLOW_UP_DAYS. */
export function followUpWhere(now: Date): Prisma.BookingWhereInput {
  return {
    status: { in: OPEN_STATUSES },
    depositPaid: false,
    departure: { arrivalDate: { lte: new Date(startOfDay(now).getTime() + FOLLOW_UP_DAYS * DAY) } },
  };
}

export function bookingWhere(filters: Pick<BookingFilters, "view" | "search">, now: Date): Prisma.BookingWhereInput {
  const and: Prisma.BookingWhereInput[] = [];
  if (filters.view === "follow-up") and.push(followUpWhere(now));
  else if (filters.view !== "all") and.push({ status: filters.view });

  if (filters.search) {
    const contains = { contains: filters.search, mode: "insensitive" as const };
    and.push({
      OR: [
        { id: filters.search },
        { leadName: contains },
        { leadEmail: contains },
        { leadPhone: contains },
        { departure: { route: { title: contains } } },
      ],
    });
  }
  return and.length ? { AND: and } : {};
}

// ---------------------------------------------------------------------------
// Money
// ---------------------------------------------------------------------------
type Money = { toString(): string } | number | null | undefined;
const num = (v: Money) => (v == null ? 0 : Number(v));

export interface PaymentInput {
  totalPrice: Money;
  depositAmount: Money;
  depositPaid: boolean;
  balancePaid: boolean;
}

export interface PaymentSummary {
  total: number;
  paid: number;
  outstanding: number;
  /** 0–1, for the progress bar. */
  share: number;
  label: "Paid in full" | "Deposit paid" | "Unpaid";
}

export function paymentSummary(b: PaymentInput): PaymentSummary {
  const total = num(b.totalPrice);
  const deposit = Math.min(num(b.depositAmount), total);
  // A cleared balance means the whole price is in, whatever the deposit flag says.
  const paid = b.balancePaid ? total : b.depositPaid ? deposit : 0;
  const outstanding = Math.max(0, total - paid);
  return {
    total,
    paid,
    outstanding,
    share: total > 0 ? paid / total : 0,
    label: b.balancePaid ? "Paid in full" : b.depositPaid ? "Deposit paid" : "Unpaid",
  };
}

// ---------------------------------------------------------------------------
// Timing
// ---------------------------------------------------------------------------
export type TimingTone = "past" | "soon" | "later";

export interface DepartureTiming {
  days: number;
  label: string;
  tone: TimingTone;
}

/** Whole days from today (UTC) to the arrival date, with a short human label. */
export function departureTiming(arrival: Date, now: Date): DepartureTiming {
  const days = Math.round((startOfDay(arrival).getTime() - startOfDay(now).getTime()) / DAY);
  if (days < 0) {
    const ago = -days;
    return { days, tone: "past", label: ago === 1 ? "Yesterday" : ago < 60 ? `${ago} days ago` : `${Math.round(ago / 30)} months ago` };
  }
  if (days === 0) return { days, tone: "soon", label: "Today" };
  if (days === 1) return { days, tone: "soon", label: "Tomorrow" };
  return {
    days,
    tone: days <= FOLLOW_UP_DAYS ? "soon" : "later",
    label: days < 60 ? `In ${days} days` : `In ${Math.round(days / 30)} months`,
  };
}

/** Same rule as followUpWhere, for one row. */
export function needsFollowUp(
  b: { status: BookingStatus; depositPaid: boolean; arrivalDate: Date },
  now: Date
): boolean {
  return OPEN_STATUSES.includes(b.status) && !b.depositPaid && departureTiming(b.arrivalDate, now).days <= FOLLOW_UP_DAYS;
}

export function formatUsd(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
}
