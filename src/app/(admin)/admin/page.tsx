import { prisma } from "@/lib/prisma";
import {
  Users,
  HandCoins,
  CalendarDays,
  TrendingUp,
} from "lucide-react";

async function getDashboardStats() {
  const [
    partnersCount,
    activePartnersCount,
    pendingCommissions,
    totalCommissionsPaid,
  ] = await Promise.all([
    prisma.partner.count(),
    prisma.partner.count({ where: { isActive: true } }),
    prisma.commission.aggregate({
      _sum: { commissionAmount: true },
      where: { status: "PENDING" },
    }),
    prisma.commission.aggregate({
      _sum: { commissionAmount: true },
      where: { status: "PAID" },
    }),
  ]);

  return {
    partnersCount,
    activePartnersCount,
    pendingCommissions: pendingCommissions._sum.commissionAmount || 0,
    totalCommissionsPaid: totalCommissionsPaid._sum.commissionAmount || 0,
  };
}

async function getRecentCommissions() {
  return prisma.commission.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      partner: { select: { name: true } },
      booking: { select: { leadName: true, leadEmail: true } },
    },
  });
}

export default async function AdminDashboard() {
  const [stats, recentCommissions] = await Promise.all([
    getDashboardStats(),
    getRecentCommissions(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600 mt-1">
          Overview of partner agreements and commissions
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Partners"
          value={stats.partnersCount.toString()}
          subtitle={`${stats.activePartnersCount} active`}
          icon={Users}
          iconColor="bg-blue-500"
        />
        <StatCard
          title="Pending Commissions"
          value={`$${Number(stats.pendingCommissions).toLocaleString()}`}
          subtitle="Awaiting payment"
          icon={HandCoins}
          iconColor="bg-amber-500"
        />
        <StatCard
          title="Total Paid Out"
          value={`$${Number(stats.totalCommissionsPaid).toLocaleString()}`}
          subtitle="All time"
          icon={TrendingUp}
          iconColor="bg-green-500"
        />
        <StatCard
          title="This Month"
          value={new Date().toLocaleDateString("en-US", { month: "long" })}
          subtitle="Current period"
          icon={CalendarDays}
          iconColor="bg-purple-500"
        />
      </div>

      {/* Recent Commissions */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200">
        <div className="p-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">
            Recent Commissions
          </h2>
        </div>
        <div className="p-4">
          {recentCommissions.length === 0 ? (
            <p className="text-slate-500 text-center py-8">
              No commissions recorded yet
            </p>
          ) : (
            <div className="space-y-3">
              {recentCommissions.map((commission) => (
                <div
                  key={commission.id}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-slate-900">
                      {commission.booking.leadName}
                    </p>
                    <p className="text-sm text-slate-500">
                      {commission.partner.name} • {Number(commission.commissionRate)}%
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-900">
                      ${Number(commission.commissionAmount).toLocaleString()}
                    </p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        commission.status === "PAID"
                          ? "bg-green-100 text-green-700"
                          : commission.status === "ELIGIBLE"
                          ? "bg-blue-100 text-blue-700"
                          : commission.status === "VOIDED"
                          ? "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {commission.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ElementType;
  iconColor: string;
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg ${iconColor}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="text-sm text-slate-600">{title}</p>
          <p className="text-2xl font-bold text-slate-900">{value}</p>
          <p className="text-xs text-slate-500">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}
