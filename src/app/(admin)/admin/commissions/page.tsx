import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Download, HandCoins } from "lucide-react";
import CommissionStatusBadge from "@/components/admin/CommissionStatusBadge";
import CommissionActions from "@/components/admin/CommissionActions";

async function getCommissions() {
  return prisma.commission.findMany({
    include: {
      partner: { select: { name: true, type: true } },
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
    take: 50,
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

export default async function CommissionsPage() {
  const [commissions, stats] = await Promise.all([
    getCommissions(),
    getCommissionStats(),
  ]);

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
                      <span className="font-medium text-slate-900">
                        {commission.partner.name}
                      </span>
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
