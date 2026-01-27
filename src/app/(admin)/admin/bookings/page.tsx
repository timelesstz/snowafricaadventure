import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  Users,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Eye,
} from "lucide-react";
import { BookingStatusBadge } from "@/components/admin/bookings/BookingStatusBadge";
import { BookingStatus } from "@prisma/client";

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Bookings</h1>
          <p className="text-slate-600 mt-1">
            Manage group departure bookings
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-slate-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Total Bookings</p>
              <p className="text-xl font-bold text-slate-900">
                {stats.totalBookings}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Pending</p>
              <p className="text-xl font-bold text-slate-900">
                {stats.pendingBookings}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Confirmed</p>
              <p className="text-xl font-bold text-slate-900">
                {stats.confirmedBookings}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Balance Due</p>
              <p className="text-xl font-bold text-slate-900">
                {stats.depositsPending}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Revenue</p>
              <p className="text-xl font-bold text-slate-900">
                ${Number(stats.totalRevenue).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
        <form method="GET" className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                name="search"
                defaultValue={search}
                placeholder="Search by name or email..."
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
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
            className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
          >
            Filter
          </button>
        </form>
      </div>

      {/* Bookings Table */}
      {bookings.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-12 text-center">
          <Users className="w-12 h-12 mx-auto text-slate-400 mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">
            No bookings found
          </h3>
          <p className="text-slate-500">
            {search || status
              ? "Try adjusting your filters"
              : "Bookings will appear here once customers book departures"}
          </p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-6 py-3 text-sm font-medium text-slate-600">
                    Customer
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-slate-600">
                    Departure
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-slate-600">
                    Climbers
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-slate-600">
                    Total
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-slate-600">
                    Payment
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-slate-600">
                    Status
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-slate-600">
                    Created
                  </th>
                  <th className="text-right px-6 py-3 text-sm font-medium text-slate-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-slate-900">
                          {booking.leadName}
                        </p>
                        <p className="text-sm text-slate-500">
                          {booking.leadEmail}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-slate-900 text-sm">
                          {booking.departure.route.title}
                        </p>
                        <p className="text-xs text-slate-500">
                          {formatDate(booking.departure.arrivalDate)}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-700">
                        {booking.totalClimbers}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-slate-900">
                        ${Number(booking.totalPrice).toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {booking.depositPaid && booking.balancePaid ? (
                          <span className="text-xs text-green-600 font-medium">
                            Paid in full
                          </span>
                        ) : booking.depositPaid ? (
                          <span className="text-xs text-blue-600 font-medium">
                            Deposit paid
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400">
                            Unpaid
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <BookingStatusBadge status={booking.status} size="sm" />
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {formatDateTime(booking.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/admin/bookings/${booking.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1 text-sm text-slate-600 hover:text-amber-600"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-600">
                Showing {(page - 1) * 20 + 1} to {Math.min(page * 20, total)} of{" "}
                {total} bookings
              </p>
              <div className="flex items-center gap-2">
                {page > 1 && (
                  <Link
                    href={`/admin/bookings?page=${page - 1}${status ? `&status=${status}` : ""}${search ? `&search=${search}` : ""}`}
                    className="px-3 py-1 border border-slate-300 rounded-lg hover:bg-slate-50"
                  >
                    Previous
                  </Link>
                )}
                <span className="px-3 py-1 text-sm text-slate-600">
                  Page {page} of {totalPages}
                </span>
                {page < totalPages && (
                  <Link
                    href={`/admin/bookings?page=${page + 1}${status ? `&status=${status}` : ""}${search ? `&search=${search}` : ""}`}
                    className="px-3 py-1 border border-slate-300 rounded-lg hover:bg-slate-50"
                  >
                    Next
                  </Link>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
