import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Download, HandCoins, ChevronLeft, ChevronRight, Search, Filter } from "lucide-react";
import CommissionStatusBadge from "@/components/admin/CommissionStatusBadge";
import CommissionActions from "@/components/admin/CommissionActions";

const ITEMS_PER_PAGE = 20;

interface SearchParams {
  page?: string;
  status?: string;
  partner?: string;
  search?: string;
}

async function getCommissions(searchParams: SearchParams) {
  const page = parseInt(searchParams.page || "1");
  const status = searchParams.status;
  const partnerId = searchParams.partner;
  const search = searchParams.search;

  const where: Record<string, unknown> = {};

  if (status && status !== "all") {
    where.status = status;
  }

  if (partnerId && partnerId !== "all") {
    where.partnerId = partnerId;
  }

  if (search) {
    where.OR = [
      { booking: { leadName: { contains: search, mode: "insensitive" } } },
      { booking: { leadEmail: { contains: search, mode: "insensitive" } } },
      { partner: { name: { contains: search, mode: "insensitive" } } },
    ];
  }

  const [commissions, total] = await Promise.all([
    prisma.commission.findMany({
      where,
      include: {
        partner: { select: { id: true, name: true, type: true } },
        booking: {
          select: {
            leadName: true,
            leadEmail: true,
            departure: {
              select: {
                route: { select: { title: true } },
                startDate: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    }),
    prisma.commission.count({ where }),
  ]);

  return {
    commissions,
    pagination: {
      page,
      total,
      totalPages: Math.ceil(total / ITEMS_PER_PAGE),
    },
  };
}

async function getPartners() {
  return prisma.partner.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });
}

async function getCommissionStats() {
  const [pending, eligible, paid, total] = await Promise.all([
    prisma.commission.aggregate({
      _sum: { commissionAmount: true },
      _count: true,
      where: { status: "PENDING" },
    }),
    prisma.commission.aggregate({
      _sum: { commissionAmount: true },
      _count: true,
      where: { status: "ELIGIBLE" },
    }),
    prisma.commission.aggregate({
      _sum: { commissionAmount: true },
      _count: true,
      where: { status: "PAID" },
    }),
    prisma.commission.aggregate({
      _sum: { commissionAmount: true },
      _count: true,
    }),
  ]);

  return { pending, eligible, paid, total };
}

export default async function CommissionsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const [{ commissions, pagination }, stats, partners] = await Promise.all([
    getCommissions(params),
    getCommissionStats(),
    getPartners(),
  ]);

  const currentStatus = params.status || "all";
  const currentPartner = params.partner || "all";
  const currentSearch = params.search || "";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Commissions</h1>
          <p className="text-slate-600 mt-1">
            Track and manage partner commissions
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/admin/commissions/payouts"
            className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
          >
            View Payouts
          </Link>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            href="/api/admin/commissions/export"
            className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
          >
            <Download className="w-5 h-5" />
            Export CSV
          </a>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
        <form className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              name="search"
              defaultValue={currentSearch}
              placeholder="Search by customer or partner..."
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>

          <select
            name="status"
            defaultValue={currentStatus}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          >
            <option value="all">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="ELIGIBLE">Eligible</option>
            <option value="PAID">Paid</option>
            <option value="VOIDED">Voided</option>
          </select>

          <select
            name="partner"
            defaultValue={currentPartner}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          >
            <option value="all">All Partners</option>
            {partners.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <Filter className="w-4 h-4" />
            Apply
          </button>

          {(currentStatus !== "all" || currentPartner !== "all" || currentSearch) && (
            <Link
              href="/admin/commissions"
              className="text-sm text-slate-600 hover:text-slate-800"
            >
              Clear filters
            </Link>
          )}
        </form>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Pending"
          count={stats.pending._count}
          amount={Number(stats.pending._sum.commissionAmount || 0)}
          color="amber"
        />
        <StatCard
          title="Eligible"
          count={stats.eligible._count}
          amount={Number(stats.eligible._sum.commissionAmount || 0)}
          color="blue"
        />
        <StatCard
          title="Paid"
          count={stats.paid._count}
          amount={Number(stats.paid._sum.commissionAmount || 0)}
          color="green"
        />
        <StatCard
          title="Total"
          count={stats.total._count}
          amount={Number(stats.total._sum.commissionAmount || 0)}
          color="slate"
        />
      </div>

      {/* Commissions Table */}
      {commissions.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-12 text-center">
          <HandCoins className="w-12 h-12 mx-auto text-slate-400 mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">
            No commissions yet
          </h3>
          <p className="text-slate-500">
            Commissions will appear here when bookings are made through the
            website
          </p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-6 py-3 text-sm font-medium text-slate-600">
                      Date
                    </th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-slate-600">
                      Partner
                    </th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-slate-600">
                      Customer
                    </th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-slate-600">
                      Trip
                    </th>
                    <th className="text-right px-6 py-3 text-sm font-medium text-slate-600">
                      Booking
                    </th>
                    <th className="text-right px-6 py-3 text-sm font-medium text-slate-600">
                      Rate
                    </th>
                    <th className="text-right px-6 py-3 text-sm font-medium text-slate-600">
                      Commission
                    </th>
                    <th className="text-center px-6 py-3 text-sm font-medium text-slate-600">
                      Status
                    </th>
                    <th className="text-right px-6 py-3 text-sm font-medium text-slate-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {commissions.map((commission) => (
                    <tr key={commission.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {commission.createdAt.toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          href={`/admin/partners/${commission.partner.id}`}
                          className="font-medium text-amber-600 hover:text-amber-700"
                        >
                          {commission.partner.name}
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-slate-900">
                            {commission.booking.leadName}
                          </p>
                          <p className="text-sm text-slate-500">
                            {commission.booking.leadEmail}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-slate-900">
                            {commission.booking.departure.route.title}
                          </p>
                          <p className="text-sm text-slate-500">
                            {commission.booking.departure.startDate.toLocaleDateString()}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right text-slate-900">
                        ${Number(commission.bookingAmount).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-right text-slate-600">
                        {Number(commission.commissionRate)}%
                      </td>
                      <td className="px-6 py-4 text-right font-semibold text-slate-900">
                        ${Number(commission.commissionAmount).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <CommissionStatusBadge status={commission.status} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <CommissionActions
                          id={commission.id}
                          status={commission.status}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between bg-white rounded-lg shadow-sm border border-slate-200 p-4">
              <p className="text-sm text-slate-600">
                Showing {(pagination.page - 1) * ITEMS_PER_PAGE + 1} to{" "}
                {Math.min(pagination.page * ITEMS_PER_PAGE, pagination.total)} of{" "}
                {pagination.total} commissions
              </p>
              <div className="flex gap-2">
                <Link
                  href={`/admin/commissions?page=${pagination.page - 1}${currentStatus !== "all" ? `&status=${currentStatus}` : ""}${currentPartner !== "all" ? `&partner=${currentPartner}` : ""}${currentSearch ? `&search=${currentSearch}` : ""}`}
                  className={`flex items-center gap-1 px-4 py-2 border border-slate-300 rounded-lg transition-colors ${
                    pagination.page === 1
                      ? "opacity-50 pointer-events-none"
                      : "hover:bg-slate-50"
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Link>
                <Link
                  href={`/admin/commissions?page=${pagination.page + 1}${currentStatus !== "all" ? `&status=${currentStatus}` : ""}${currentPartner !== "all" ? `&partner=${currentPartner}` : ""}${currentSearch ? `&search=${currentSearch}` : ""}`}
                  className={`flex items-center gap-1 px-4 py-2 border border-slate-300 rounded-lg transition-colors ${
                    pagination.page === pagination.totalPages
                      ? "opacity-50 pointer-events-none"
                      : "hover:bg-slate-50"
                  }`}
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function StatCard({
  title,
  count,
  amount,
  color,
}: {
  title: string;
  count: number;
  amount: number;
  color: "amber" | "blue" | "green" | "slate";
}) {
  const colorClasses = {
    amber: "bg-amber-50 border-amber-200 text-amber-700",
    blue: "bg-blue-50 border-blue-200 text-blue-700",
    green: "bg-green-50 border-green-200 text-green-700",
    slate: "bg-slate-50 border-slate-200 text-slate-700",
  };

  return (
    <div className={`p-4 rounded-lg border ${colorClasses[color]}`}>
      <p className="text-sm font-medium opacity-80">{title}</p>
      <p className="text-2xl font-bold mt-1">${amount.toLocaleString()}</p>
      <p className="text-sm opacity-60 mt-1">{count} commissions</p>
    </div>
  );
}
