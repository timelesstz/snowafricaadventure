import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  Users,
  DollarSign,
  Clock,
  CheckCircle,
  Search,
  Filter,
  Eye,
} from "lucide-react";
import { BookingStatusBadge } from "@/components/admin/bookings/BookingStatusBadge";
import { BookingStatus, type Booking } from "@prisma/client";
import {
  AdminPageHeader,
  StatCard,
  StatCardGrid,
  EmptyState,
  DataToolbar,
  DataTable,
  Pagination,
  type Column,
} from "@/components/admin/ui";

async function getBookings(params: {
  status?: string;
  search?: string;
  page?: number;
}) {
  const { status, search, page = 1 } = params;
  const limit = 20;

  const where = {
    ...(status && status !== "all" && { status: status as BookingStatus }),
    ...(search && {
      OR: [
        { leadName: { contains: search, mode: "insensitive" as const } },
        { leadEmail: { contains: search, mode: "insensitive" as const } },
      ],
    }),
  };

  const [bookings, total] = await Promise.all([
    prisma.booking.findMany({
      where,
      include: {
        departure: {
          include: {
            route: {
              select: { title: true, slug: true },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.booking.count({ where }),
  ]);

  return { bookings, total, page, limit, totalPages: Math.ceil(total / limit) };
}

async function getBookingStats() {
  const [
    totalBookings,
    pendingBookings,
    confirmedBookings,
    totalRevenue,
    depositsPending,
  ] = await Promise.all([
    prisma.booking.count(),
    prisma.booking.count({
      where: { status: { in: [BookingStatus.INQUIRY, BookingStatus.PENDING] } },
    }),
    prisma.booking.count({
      where: { status: { in: [BookingStatus.CONFIRMED, BookingStatus.COMPLETED] } },
    }),
    prisma.booking.aggregate({
      where: { status: { in: [BookingStatus.CONFIRMED, BookingStatus.COMPLETED] } },
      _sum: { totalPrice: true },
    }),
    prisma.booking.count({
      where: { status: BookingStatus.DEPOSIT_PAID, balancePaid: false },
    }),
  ]);

  return {
    totalBookings,
    pendingBookings,
    confirmedBookings,
    totalRevenue: totalRevenue._sum.totalPrice || 0,
    depositsPending,
  };
}

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatDateTime(date: Date) {
  return new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

type BookingRow = Booking & {
  departure: {
    arrivalDate: Date;
    route: { title: string; slug: string };
  };
};

export default async function BookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; search?: string; page?: string }>;
}) {
  const params = await searchParams;
  const status = params.status;
  const search = params.search;
  const page = params.page ? parseInt(params.page) : 1;

  const [{ bookings, total, totalPages }, stats] = await Promise.all([
    getBookings({ status, search, page }),
    getBookingStats(),
  ]);

  const statuses = [
    { value: "all", label: "All Bookings" },
    { value: "INQUIRY", label: "Inquiry" },
    { value: "PENDING", label: "Pending" },
    { value: "DEPOSIT_PAID", label: "Deposit Paid" },
    { value: "CONFIRMED", label: "Confirmed" },
    { value: "COMPLETED", label: "Completed" },
    { value: "CANCELLED", label: "Cancelled" },
  ];

  const columns: Column<BookingRow>[] = [
    {
      key: "customer",
      header: "Customer",
      render: (b) => (
        <div>
          <p className="font-medium text-slate-900">{b.leadName}</p>
          <p className="text-sm text-slate-500">{b.leadEmail}</p>
        </div>
      ),
    },
    {
      key: "departure",
      header: "Departure",
      render: (b) => (
        <div>
          <p className="font-medium text-slate-900 text-sm">
            {b.departure.route.title}
          </p>
          <p className="text-xs text-slate-500">
            {formatDate(b.departure.arrivalDate)}
          </p>
        </div>
      ),
    },
    {
      key: "climbers",
      header: "Climbers",
      render: (b) => <span className="text-slate-700">{b.totalClimbers}</span>,
    },
    {
      key: "total",
      header: "Total",
      render: (b) => (
        <span className="font-medium text-slate-900">
          ${Number(b.totalPrice).toLocaleString()}
        </span>
      ),
    },
    {
      key: "payment",
      header: "Payment",
      render: (b) =>
        b.depositPaid && b.balancePaid ? (
          <span className="text-xs text-green-600 font-medium">Paid in full</span>
        ) : b.depositPaid ? (
          <span className="text-xs text-blue-600 font-medium">Deposit paid</span>
        ) : (
          <span className="text-xs text-slate-400">Unpaid</span>
        ),
    },
    {
      key: "status",
      header: "Status",
      render: (b) => <BookingStatusBadge status={b.status} size="sm" />,
    },
    {
      key: "created",
      header: "Created",
      render: (b) => (
        <span className="text-sm text-slate-500">
          {formatDateTime(b.createdAt)}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      render: (b) => (
        <Link
          href={`/admin/bookings/${b.id}`}
          className="inline-flex items-center gap-1 px-3 py-1 text-sm text-slate-600 hover:text-amber-600 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          <Eye className="w-4 h-4" aria-hidden="true" />
          View
        </Link>
      ),
    },
  ];

  return (
    <div>
      <AdminPageHeader
        title="Bookings"
        description="Manage group departure bookings"
      />

      <StatCardGrid cols={5}>
        <StatCard label="Total Bookings" value={stats.totalBookings} icon={Users} />
        <StatCard label="Pending" value={stats.pendingBookings} icon={Clock} tone="pending" />
        <StatCard label="Confirmed" value={stats.confirmedBookings} icon={CheckCircle} tone="success" />
        <StatCard label="Balance Due" value={stats.depositsPending} icon={DollarSign} tone="info" />
        <StatCard
          label="Revenue"
          value={`$${Number(stats.totalRevenue).toLocaleString()}`}
          icon={DollarSign}
          tone="completed"
        />
      </StatCardGrid>

      <DataToolbar>
        <div className="flex-1 min-w-[200px]">
          <label className="sr-only" htmlFor="booking-search">
            Search bookings
          </label>
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
              aria-hidden="true"
            />
            <input
              id="booking-search"
              type="text"
              name="search"
              defaultValue={search}
              placeholder="Search by name or email…"
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" aria-hidden="true" />
          <label className="sr-only" htmlFor="booking-status">
            Filter by status
          </label>
          <select
            id="booking-status"
            name="status"
            defaultValue={status || "all"}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
          >
            {statuses.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2"
        >
          Filter
        </button>
      </DataToolbar>

      {bookings.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No bookings found"
          message={
            search || status
              ? "Try adjusting your filters"
              : "Bookings will appear here once customers book departures"
          }
        />
      ) : (
        <>
          <DataTable
            columns={columns}
            rows={bookings as BookingRow[]}
            getRowKey={(b) => b.id}
          />
          <Pagination
            page={page}
            totalPages={totalPages}
            total={total}
            pageSize={20}
            basePath="/admin/bookings"
            params={{ status, search }}
            label="booking"
          />
        </>
      )}
    </div>
  );
}
