import Link from "next/link";
import { AlertTriangle, ChevronRight, ClipboardList, Hourglass, Search, Wallet, X } from "lucide-react";
import { clsx } from "clsx";
import { AdminRole, BookingStatus, type Prisma } from "@prisma/client";
import { auth } from "@/lib/auth";
import { hasMinRole } from "@/lib/auth-types";
import { deleteBlocker } from "@/lib/bookings/delete-rules";
import { prisma } from "@/lib/prisma";
import { BookingStatusBadge } from "@/components/admin/bookings/BookingStatusBadge";
import { AdminPageHeader, EmptyState, Pagination, StatCard, StatCardGrid } from "@/components/admin/ui";
import {
  BOOKED_STATUSES,
  FOLLOW_UP_DAYS,
  OPEN_STATUSES,
  PAGE_SIZE,
  STATUS_LABEL,
  STATUS_ORDER,
  bookingWhere,
  departureTiming,
  followUpWhere,
  formatUsd,
  needsFollowUp,
  parseBookingFilters,
  paymentSummary,
  type BookingFilters,
  type BookingView,
  type TimingTone,
} from "@/lib/bookings/list";
import { BULK_FORM_ID, BulkDeleteBar, DeleteBookingButton, SelectAllBox } from "./BookingDeleteControls";

export const metadata = { title: "Bookings" };

const rowSelect = {
  id: true,
  leadName: true,
  leadEmail: true,
  leadPhone: true,
  totalClimbers: true,
  totalPrice: true,
  depositAmount: true,
  depositPaid: true,
  balancePaid: true,
  status: true,
  createdAt: true,
  departure: { select: { arrivalDate: true, route: { select: { title: true } } } },
  commission: { select: { status: true } },
} satisfies Prisma.BookingSelect;

type BookingRow = Prisma.BookingGetPayload<{ select: typeof rowSelect }>;

/** Unpaid balances on bookings the customer has committed to. */
const toCollectWhere: Prisma.BookingWhereInput = {
  status: { in: [BookingStatus.DEPOSIT_PAID, BookingStatus.CONFIRMED] },
  balancePaid: false,
};

async function loadSummary(now: Date) {
  const [byStatus, followUp, booked, fullyPaid, depositsOnly, collectTotal, collectDeposits] = await Promise.all([
    prisma.booking.groupBy({ by: ["status"], _count: { _all: true } }),
    prisma.booking.count({ where: followUpWhere(now) }),
    prisma.booking.aggregate({ where: { status: { in: BOOKED_STATUSES } }, _sum: { totalPrice: true } }),
    prisma.booking.aggregate({ where: { balancePaid: true }, _sum: { totalPrice: true } }),
    prisma.booking.aggregate({ where: { depositPaid: true, balancePaid: false }, _sum: { depositAmount: true } }),
    prisma.booking.aggregate({ where: toCollectWhere, _sum: { totalPrice: true } }),
    prisma.booking.aggregate({ where: { ...toCollectWhere, depositPaid: true }, _sum: { depositAmount: true } }),
  ]);

  const counts = Object.fromEntries(byStatus.map((g) => [g.status, g._count._all])) as Partial<Record<BookingStatus, number>>;
  const sum = (v: Prisma.Decimal | null) => (v ? Number(v) : 0);

  return {
    counts,
    total: byStatus.reduce((n, g) => n + g._count._all, 0),
    open: OPEN_STATUSES.reduce((n, s) => n + (counts[s] ?? 0), 0),
    followUp,
    bookedValue: sum(booked._sum.totalPrice),
    received: sum(fullyPaid._sum.totalPrice) + sum(depositsOnly._sum.depositAmount),
    toCollect: Math.max(0, sum(collectTotal._sum.totalPrice) - sum(collectDeposits._sum.depositAmount)),
  };
}

async function loadRows(filters: BookingFilters, now: Date) {
  const where = bookingWhere(filters, now);
  const total = await prisma.booking.count({ where });
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  // A page past the end (old link, fewer results after a filter) shows the last page, not "nothing found".
  const page = Math.min(filters.page, totalPages);
  const rows = await prisma.booking.findMany({
    where,
    select: rowSelect,
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  });
  return { rows, total, page, totalPages };
}

// ---------------------------------------------------------------------------
// View helpers
// ---------------------------------------------------------------------------
const dateFmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
const shortDateFmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });

function viewHref(view: BookingView, search: string) {
  const qs = new URLSearchParams();
  if (view !== "all") qs.set("status", view);
  if (search) qs.set("search", search);
  const s = qs.toString();
  return `/admin/bookings/${s ? `?${s}` : ""}`;
}

const timingClass: Record<TimingTone, string> = {
  past: "text-slate-500",
  soon: "text-amber-700",
  later: "text-slate-500",
};

function Timing({ row, now }: { row: BookingRow; now: Date }) {
  const timing = departureTiming(row.departure.arrivalDate, now);
  const flag = needsFollowUp({ ...row, arrivalDate: row.departure.arrivalDate }, now);
  return (
    <p className={clsx("flex items-center gap-1 text-xs", flag ? "font-medium text-amber-700" : timingClass[timing.tone])}>
      {flag && <AlertTriangle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />}
      <span>
        {dateFmt.format(row.departure.arrivalDate)} · {timing.label}
        {flag && <span className="sr-only"> (needs follow-up)</span>}
      </span>
    </p>
  );
}

function Payment({ row }: { row: BookingRow }) {
  const p = paymentSummary(row);
  return (
    <div className="min-w-[8rem]">
      <p className="font-semibold tabular-nums text-slate-900">{formatUsd(p.total)}</p>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-100" aria-hidden="true">
        <div
          className={clsx("h-full rounded-full", p.share >= 1 ? "bg-emerald-500" : "bg-amber-500")}
          style={{ width: `${Math.round(p.share * 100)}%` }}
        />
      </div>
      <p className="mt-1 text-xs text-slate-500">
        {p.label === "Unpaid" ? "Nothing paid yet" : p.outstanding > 0 ? `${formatUsd(p.outstanding)} still due` : "Paid in full"}
      </p>
    </div>
  );
}

function SelectBox({ row }: { row: BookingRow }) {
  const blocker = deleteBlocker(row);
  return (
    <input
      type="checkbox"
      form={BULK_FORM_ID}
      name="id"
      value={row.id}
      disabled={blocker !== null}
      title={blocker ? `Can't delete: ${blocker}` : undefined}
      aria-label={blocker ? `${row.leadName}: can't delete, ${blocker}` : `Select ${row.leadName}`}
      className="relative z-10 h-4 w-4 rounded border-slate-300 accent-amber-600 disabled:opacity-30"
    />
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default async function BookingsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const filters = parseBookingFilters(await searchParams);
  const now = new Date();
  const [session, summary, { rows, total, page, totalPages }] = await Promise.all([
    auth(),
    loadSummary(now),
    loadRows(filters, now),
  ]);
  // Same rule as the delete API: admins and up.
  const canDelete = !!session?.user?.role && hasMinRole(session.user.role as AdminRole, AdminRole.ADMIN);

  const tabs: { view: BookingView; label: string; count: number }[] = [
    { view: "all", label: "All", count: summary.total },
    { view: "follow-up", label: "Needs follow-up", count: summary.followUp },
    ...STATUS_ORDER.filter((s) => (summary.counts[s] ?? 0) > 0 || filters.view === s).map((s) => ({
      view: s as BookingView,
      label: STATUS_LABEL[s],
      count: summary.counts[s] ?? 0,
    })),
  ];
  const filtered = filters.view !== "all" || filters.search !== "";

  return (
    <div>
      <AdminPageHeader
        title="Bookings"
        description="Group departure bookings: who is coming, what they owe and when they climb."
      />

      <StatCardGrid cols={4}>
        <StatCard label="Open requests" value={summary.open} icon={Hourglass} tone="pending" />
        <StatCard label="Booked value" value={formatUsd(summary.bookedValue)} icon={ClipboardList} tone="info" />
        <StatCard label="Received" value={formatUsd(summary.received)} icon={Wallet} tone="success" />
        <StatCard label="Balance to collect" value={formatUsd(summary.toCollect)} icon={Wallet} tone="warning" />
      </StatCardGrid>

      {summary.followUp > 0 && filters.view !== "follow-up" && (
        <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600" aria-hidden="true" />
          <p className="flex-1">
            {summary.followUp === 1 ? "1 open booking has" : `${summary.followUp} open bookings have`} no deposit and a
            climb that has passed or starts within {FOLLOW_UP_DAYS} days.
          </p>
          <Link
            href={viewHref("follow-up", filters.search)}
            className="font-medium underline underline-offset-2 hover:text-amber-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded"
          >
            Review them
          </Link>
        </div>
      )}

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        {/* Status tabs + search */}
        <div className="flex flex-col gap-3 border-b border-slate-200 p-3 lg:flex-row lg:items-center lg:justify-between">
          <nav aria-label="Filter by status" className="-mx-1 flex gap-1 overflow-x-auto px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {tabs.map((tab) => {
              const current = tab.view === filters.view;
              const alert = tab.view === "follow-up" && tab.count > 0;
              return (
                <Link
                  key={tab.view}
                  href={viewHref(tab.view, filters.search)}
                  aria-current={current ? "page" : undefined}
                  className={clsx(
                    "inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md px-3 py-1.5 text-sm transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400",
                    current ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  )}
                >
                  {tab.label}
                  <span
                    className={clsx(
                      "rounded-full px-1.5 text-xs tabular-nums",
                      current ? "bg-white/15 text-white" : alert ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-600"
                    )}
                  >
                    {tab.count}
                  </span>
                </Link>
              );
            })}
          </nav>

          <form method="GET" role="search" className="flex w-full items-center gap-2 lg:w-80">
            {filters.view !== "all" && <input type="hidden" name="status" value={filters.view} />}
            <label htmlFor="booking-search" className="sr-only">
              Search bookings
            </label>
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
              <input
                id="booking-search"
                type="search"
                name="search"
                defaultValue={filters.search}
                placeholder="Name, email or route"
                title="Search by name, email, phone, route or booking ID"
                className="w-full rounded-md border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30"
              />
            </div>
            <button
              type="submit"
              className="rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2"
            >
              Search
            </button>
          </form>
        </div>

        {filters.search && (
          <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-2 text-sm text-slate-600">
            <span>
              {total} {total === 1 ? "result" : "results"} for “{filters.search}”
            </span>
            <Link
              href={viewHref(filters.view, "")}
              className="inline-flex items-center gap-1 rounded text-slate-500 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
              Clear search
            </Link>
          </div>
        )}

        {rows.length === 0 ? (
          <div className="p-4">
            <EmptyState
              icon={ClipboardList}
              title={filtered ? "No bookings match" : "No bookings yet"}
              message={
                filters.view === "follow-up"
                  ? "Every open booking either has a deposit or departs more than 45 days from now."
                  : filtered
                    ? "Try another status or a shorter search."
                    : "Bookings appear here when someone books a group departure on the website."
              }
              action={
                filtered ? (
                  <Link href="/admin/bookings/" className="text-sm font-medium text-amber-700 hover:underline">
                    Show all bookings
                  </Link>
                ) : undefined
              }
            />
          </div>
        ) : (
          <>
            {canDelete && <BulkDeleteBar />}
            {/* Table from md up */}
            <table className="hidden w-full text-left text-sm md:table">
              <caption className="sr-only">Bookings, newest first</caption>
              <thead className="border-b border-slate-200 bg-slate-50 text-xs font-medium uppercase tracking-wide text-slate-500">
                <tr>
                  {canDelete && (
                    <th scope="col" className="w-10 py-3 pl-4">
                      <SelectAllBox />
                    </th>
                  )}
                  <th scope="col" className="px-4 py-3">Guest</th>
                  <th scope="col" className="px-4 py-3">Trip</th>
                  <th scope="col" className="px-4 py-3 text-right">Climbers</th>
                  <th scope="col" className="px-4 py-3">Amount</th>
                  <th scope="col" className="px-4 py-3">Status</th>
                  <th scope="col" className="hidden px-4 py-3 xl:table-cell">Booked</th>
                  <th scope="col" className="w-10 px-2 py-3"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((row) => (
                  <tr key={row.id} className="group relative align-top hover:bg-slate-50 focus-within:bg-slate-50">
                    {canDelete && (
                      <td className="py-3.5 pl-4">
                        <SelectBox row={row} />
                      </td>
                    )}
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/bookings/${row.id}`}
                        className="font-medium text-slate-900 after:absolute after:inset-0 focus-visible:outline-none group-focus-within:underline"
                      >
                        {row.leadName}
                      </Link>
                      <p className="max-w-[16rem] truncate text-xs text-slate-500">{row.leadEmail}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-slate-900">{row.departure.route.title}</p>
                      <Timing row={row} now={now} />
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-slate-700">{row.totalClimbers}</td>
                    <td className="px-4 py-3">
                      <Payment row={row} />
                    </td>
                    <td className="px-4 py-3">
                      <BookingStatusBadge status={row.status} size="sm" />
                    </td>
                    <td className="hidden whitespace-nowrap px-4 py-3 text-xs text-slate-500 xl:table-cell">
                      {shortDateFmt.format(row.createdAt)}
                    </td>
                    <td className="px-2 py-2.5 text-slate-400 group-hover:text-slate-700">
                      {canDelete && !deleteBlocker(row) ? (
                        <DeleteBookingButton id={row.id} name={row.leadName} />
                      ) : (
                        <ChevronRight className="mt-1 h-4 w-4" aria-hidden="true" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Cards below md */}
            <ul className="divide-y divide-slate-100 md:hidden">
              {rows.map((row) => (
                <li key={row.id} className="relative p-4 focus-within:bg-slate-50">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <Link
                        href={`/admin/bookings/${row.id}`}
                        className="font-medium text-slate-900 after:absolute after:inset-0 focus-visible:outline-none"
                      >
                        {row.leadName}
                      </Link>
                      <p className="truncate text-xs text-slate-500">{row.leadEmail}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1">
                      <BookingStatusBadge status={row.status} size="sm" />
                      {canDelete && !deleteBlocker(row) && <DeleteBookingButton id={row.id} name={row.leadName} />}
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-slate-900">
                    {row.departure.route.title}
                    <span className="text-slate-500">
                      {" "}
                      · {row.totalClimbers} {row.totalClimbers === 1 ? "climber" : "climbers"}
                    </span>
                  </p>
                  <Timing row={row} now={now} />
                  <div className="mt-3">
                    <Payment row={row} />
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {rows.length > 0 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          total={total}
          pageSize={PAGE_SIZE}
          basePath="/admin/bookings"
          params={{ status: filters.view === "all" ? undefined : filters.view, search: filters.search || undefined }}
          label="booking"
        />
      )}
    </div>
  );
}
