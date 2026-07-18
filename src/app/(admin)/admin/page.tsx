import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  Users,
  HandCoins,
  CalendarDays,
  TrendingUp,
  ClipboardList,
  MessageSquare,
  Plane,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import CommissionStatusBadge from "@/components/admin/CommissionStatusBadge";
import { SPOT_HOLDING_STATUSES, countBookedSpots } from "@/lib/booking-spots";
import {
  AdminPageHeader,
  StatCard,
  StatCardGrid,
} from "@/components/admin/ui";
import { BookingsTrendChart } from "@/components/admin/dashboard/BookingsTrendChart";

async function getDashboardStats() {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const sixtyDays = new Date(now);
  sixtyDays.setDate(sixtyDays.getDate() + 60);

  const [
    partnersCount,
    activePartnersCount,
    pendingCommissionsAgg,
    pendingCommissionsCount,
    totalCommissionsPaid,
    commissionsThisMonth,
    monthlyBookings,
    newInquiries,
    contactedInquiries,
    convertedInquiries,
    staleNewInquiries,
    upcomingDepartures,
    pendingClimberTokens,
  ] = await Promise.all([
    prisma.partner.count(),
    prisma.partner.count({ where: { isActive: true } }),
    prisma.commission.aggregate({
      _sum: { commissionAmount: true },
      where: { status: "PENDING" },
    }),
    prisma.commission.count({ where: { status: "PENDING" } }),
    prisma.commission.aggregate({
      _sum: { commissionAmount: true },
      where: { status: "PAID" },
    }),
    prisma.commission.aggregate({
      _sum: { commissionAmount: true },
      _count: true,
      where: { createdAt: { gte: monthStart } },
    }),
    prisma.booking.aggregate({
      _sum: { totalPrice: true },
      _count: true,
      where: { createdAt: { gte: monthStart } },
    }),
    prisma.inquiry.count({ where: { status: "new" } }),
    prisma.inquiry.count({ where: { status: "contacted" } }),
    prisma.inquiry.count({ where: { status: "converted" } }),
    prisma.inquiry.count({
      where: { status: "new", createdAt: { lt: new Date(now.getTime() - 48 * 3_600_000) } },
    }),
    prisma.groupDeparture.count({
      where: {
        status: { in: ["OPEN", "LIMITED", "GUARANTEED"] },
        startDate: { gte: now, lte: sixtyDays },
      },
    }),
    prisma.climberToken.count({
      where: {
        isCompleted: false,
        expiresAt: { gte: now },
      },
    }),
  ]);

  return {
    partnersCount,
    activePartnersCount,
    pendingCommissionsAmount: pendingCommissionsAgg._sum.commissionAmount || 0,
    pendingCommissionsCount,
    totalCommissionsPaid: totalCommissionsPaid._sum.commissionAmount || 0,
    monthlyCommissionAmount: commissionsThisMonth._sum.commissionAmount || 0,
    monthlyCommissionCount: commissionsThisMonth._count,
    monthlyBookingsCount: monthlyBookings._count,
    monthlyBookingsValue: monthlyBookings._sum.totalPrice || 0,
    newInquiriesCount: newInquiries,
    contactedInquiriesCount: contactedInquiries,
    convertedInquiriesCount: convertedInquiries,
    staleNewInquiriesCount: staleNewInquiries,
    upcomingDeparturesCount: upcomingDepartures,
    pendingClimberTokens,
    monthLabel: now.toLocaleDateString("en-US", { month: "long" }),
  };
}

async function getBookingsTrend() {
  const now = new Date();
  const start = new Date(now);
  start.setDate(start.getDate() - 29);
  start.setHours(0, 0, 0, 0);

  const bookings = await prisma.booking.findMany({
    where: { createdAt: { gte: start } },
    select: { createdAt: true, totalPrice: true },
  });

  const buckets: Record<string, { count: number; revenue: number }> = {};
  for (let i = 0; i < 30; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    const key = d.toISOString().slice(5, 10);
    buckets[key] = { count: 0, revenue: 0 };
  }
  for (const b of bookings) {
    const key = b.createdAt.toISOString().slice(5, 10);
    if (buckets[key]) {
      buckets[key].count += 1;
      buckets[key].revenue += Number(b.totalPrice ?? 0);
    }
  }

  return Object.entries(buckets).map(([date, v]) => ({
    date,
    count: v.count,
    revenue: v.revenue,
  }));
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

async function getOpenLeads() {
  return prisma.inquiry.findMany({
    where: { status: { in: ["new", "contacted"] } },
    orderBy: { createdAt: "asc" },
    take: 6,
    select: {
      id: true,
      fullName: true,
      email: true,
      type: true,
      tripType: true,
      status: true,
      createdAt: true,
    },
  });
}

async function getNextDepartures() {
  const departures = await prisma.groupDeparture.findMany({
    where: {
      status: { in: ["OPEN", "LIMITED", "GUARANTEED", "FULL"] },
      arrivalDate: { gte: new Date() },
    },
    orderBy: { arrivalDate: "asc" },
    take: 6,
    select: {
      id: true,
      arrivalDate: true,
      status: true,
      maxParticipants: true,
      route: { select: { title: true } },
      bookings: {
        where: { status: { in: SPOT_HOLDING_STATUSES } },
        select: { totalClimbers: true },
      },
    },
  });

  return departures.map((d) => {
    const booked = countBookedSpots(d.bookings);
    return {
      id: d.id,
      routeTitle: d.route.title,
      arrivalDate: d.arrivalDate,
      status: d.status,
      booked,
      max: d.maxParticipants,
      fillPercent: d.maxParticipants > 0 ? Math.round((booked / d.maxParticipants) * 100) : 0,
    };
  });
}

function leadAge(createdAt: Date): { label: string; urgent: boolean } {
  const hours = Math.floor((Date.now() - createdAt.getTime()) / 3_600_000);
  if (hours < 24) return { label: `${hours}h`, urgent: false };
  return { label: `${Math.floor(hours / 24)}d`, urgent: hours >= 48 };
}

export default async function AdminDashboard() {
  const [stats, trend, recentCommissions, openLeads, nextDepartures] =
    await Promise.all([
      getDashboardStats(),
      getBookingsTrend(),
      getRecentCommissions(),
      getOpenLeads(),
      getNextDepartures(),
    ]);

  const actionItems = [
    stats.pendingCommissionsCount > 0 && {
      label: `${stats.pendingCommissionsCount} commission${stats.pendingCommissionsCount === 1 ? "" : "s"} pending approval`,
      amount: `$${Number(stats.pendingCommissionsAmount).toLocaleString()}`,
      href: "/admin/commissions?status=PENDING",
      tone: "warning" as const,
    },
    stats.newInquiriesCount > 0 && {
      label: `${stats.newInquiriesCount} new inquir${stats.newInquiriesCount === 1 ? "y" : "ies"} awaiting response${stats.staleNewInquiriesCount > 0 ? ` — ${stats.staleNewInquiriesCount} unanswered for over 48h` : ""}`,
      amount: undefined,
      href: "/admin/inquiries?status=new",
      tone: stats.staleNewInquiriesCount > 0 ? ("warning" as const) : ("info" as const),
    },
    stats.pendingClimberTokens > 0 && {
      label: `${stats.pendingClimberTokens} climber detail${stats.pendingClimberTokens === 1 ? "" : "s"} not yet submitted`,
      amount: undefined,
      href: "/admin/bookings",
      tone: "warning" as const,
    },
  ].filter(Boolean) as {
    label: string;
    amount?: string;
    href: string;
    tone: "warning" | "info";
  }[];

  const funnelTotal =
    stats.newInquiriesCount +
    stats.contactedInquiriesCount +
    stats.convertedInquiriesCount;
  const pct = (n: number) =>
    funnelTotal > 0 ? Math.round((n / funnelTotal) * 100) : 0;

  return (
    <div>
      <AdminPageHeader
        title="Dashboard"
        description="Today's leads, upcoming departures, and what needs attention."
      />

      {/* Action required */}
      {actionItems.length > 0 && (
        <section className="mb-6 bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-200 bg-amber-50/60 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600" aria-hidden="true" />
            <h2 className="text-h4 text-slate-900 !text-amber-900">
              Action required
            </h2>
          </div>
          <ul className="divide-y divide-slate-200">
            {actionItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center justify-between px-4 py-3 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-inset"
                >
                  <span className="text-sm text-slate-800">{item.label}</span>
                  <span className="flex items-center gap-3">
                    {item.amount && (
                      <span className="text-sm font-semibold text-slate-900">
                        {item.amount}
                      </span>
                    )}
                    <ArrowRight
                      className="w-4 h-4 text-slate-400"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* This month */}
      <h2 className="text-h4 mb-3">This month</h2>
      <StatCardGrid cols={4}>
        <Link href="/admin/bookings" className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg">
          <StatCard
            label={`Bookings — $${Number(stats.monthlyBookingsValue).toLocaleString()} gross`}
            value={stats.monthlyBookingsCount}
            icon={ClipboardList}
            tone="info"
          />
        </Link>
        <Link href="/admin/inquiries?status=new" className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg">
          <StatCard
            label="New inquiries — awaiting response"
            value={stats.newInquiriesCount}
            icon={MessageSquare}
            tone={stats.newInquiriesCount > 0 ? "warning" : "neutral"}
          />
        </Link>
        <Link href="/admin/departures" className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg">
          <StatCard
            label="Upcoming departures — next 60 days"
            value={stats.upcomingDeparturesCount}
            icon={Plane}
            tone="completed"
          />
        </Link>
        <Link href="/admin/bookings" className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg">
          <StatCard
            label="Pending climber tokens"
            value={stats.pendingClimberTokens}
            icon={AlertCircle}
            tone={stats.pendingClimberTokens > 0 ? "pending" : "neutral"}
          />
        </Link>
      </StatCardGrid>

      {/* Trend + funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 lg:col-span-2">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-h3">Bookings — last 30 days</h2>
            <Link
              href="/admin/bookings"
              className="text-sm text-amber-600 hover:text-amber-700 flex items-center gap-1"
            >
              View all <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
          <BookingsTrendChart data={trend} />
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-h3">Inquiry funnel</h2>
            <Link
              href="/admin/inquiries"
              className="text-sm text-amber-600 hover:text-amber-700 flex items-center gap-1"
            >
              Open <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
          <div className="space-y-3">
            <FunnelRow
              label="New"
              count={stats.newInquiriesCount}
              percent={pct(stats.newInquiriesCount)}
              color="bg-blue-500"
            />
            <FunnelRow
              label="Contacted"
              count={stats.contactedInquiriesCount}
              percent={pct(stats.contactedInquiriesCount)}
              color="bg-yellow-500"
            />
            <FunnelRow
              label="Converted"
              count={stats.convertedInquiriesCount}
              percent={pct(stats.convertedInquiriesCount)}
              color="bg-green-500"
            />
          </div>
        </div>
      </div>

      {/* Daily ops: open leads + next departures */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-h3">Open leads</h2>
            <Link
              href="/admin/inquiries?status=new"
              className="text-sm text-amber-600 hover:text-amber-700 flex items-center gap-1"
            >
              View all <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
          <div className="p-4">
            {openLeads.length === 0 ? (
              <p className="text-slate-500 text-center py-8">
                No open leads — all inquiries handled
              </p>
            ) : (
              <ul className="space-y-2">
                {openLeads.map((lead) => {
                  const age = leadAge(lead.createdAt);
                  return (
                    <li key={lead.id}>
                      <Link
                        href={`/admin/inquiries/${lead.id}`}
                        className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                      >
                        <div className="min-w-0">
                          <p className="font-medium text-slate-900 truncate">
                            {lead.fullName}
                          </p>
                          <p className="text-sm text-slate-500 truncate">
                            {lead.tripType || lead.type} • {lead.email}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 ml-3">
                          <span
                            className={`text-xs font-semibold px-2 py-1 rounded-full ${
                              age.urgent
                                ? "bg-red-100 text-red-700"
                                : "bg-slate-200 text-slate-600"
                            }`}
                            title={`Waiting ${age.label}`}
                          >
                            {age.label}
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              lead.status === "new"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {lead.status}
                          </span>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-h3">Next departures</h2>
            <Link
              href="/admin/departures"
              className="text-sm text-amber-600 hover:text-amber-700 flex items-center gap-1"
            >
              View all <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
          <div className="p-4">
            {nextDepartures.length === 0 ? (
              <p className="text-slate-500 text-center py-8">
                No upcoming departures
              </p>
            ) : (
              <ul className="space-y-2">
                {nextDepartures.map((dep) => (
                  <li key={dep.id}>
                    <Link
                      href={`/admin/departures/${dep.id}`}
                      className="block p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <p className="font-medium text-slate-900 truncate">
                          {dep.routeTitle}
                        </p>
                        <span className="text-sm text-slate-500 shrink-0 ml-3">
                          {dep.arrivalDate.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-2 bg-slate-200 rounded-full overflow-hidden flex-1">
                          <div
                            className={`h-full rounded-full ${
                              dep.fillPercent >= 100
                                ? "bg-red-500"
                                : dep.fillPercent >= 70
                                  ? "bg-amber-500"
                                  : "bg-green-500"
                            }`}
                            style={{ width: `${Math.min(dep.fillPercent, 100)}%` }}
                            aria-hidden="true"
                          />
                        </div>
                        <span className="text-xs text-slate-600 shrink-0">
                          {dep.booked}/{dep.max} ({dep.fillPercent}%)
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Partners & commissions */}
      <h2 className="text-h4 mb-3">Partners &amp; Commissions</h2>
      <StatCardGrid cols={4}>
        <Link href="/admin/partners" className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg">
          <StatCard
            label={`Total partners — ${stats.activePartnersCount} active`}
            value={stats.partnersCount}
            icon={Users}
          />
        </Link>
        <Link href="/admin/commissions" className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg">
          <StatCard
            label="Pending commissions"
            value={`$${Number(stats.pendingCommissionsAmount).toLocaleString()}`}
            icon={HandCoins}
            tone="warning"
          />
        </Link>
        <Link href="/admin/commissions/payouts" className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg">
          <StatCard
            label="Total paid out — all time"
            value={`$${Number(stats.totalCommissionsPaid).toLocaleString()}`}
            icon={TrendingUp}
            tone="success"
          />
        </Link>
        <Link href="/admin/commissions" className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg">
          <StatCard
            label={`Commissions in ${stats.monthLabel} — ${stats.monthlyCommissionCount} bookings`}
            value={`$${Number(stats.monthlyCommissionAmount).toLocaleString()}`}
            icon={CalendarDays}
            tone="completed"
          />
        </Link>
      </StatCardGrid>

      {/* Recent Commissions */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-h3">Recent commissions</h2>
          <Link
            href="/admin/commissions"
            className="text-sm text-amber-600 hover:text-amber-700 flex items-center gap-1"
          >
            View all <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>
        <div className="p-4">
          {recentCommissions.length === 0 ? (
            <p className="text-slate-500 text-center py-8">
              No commissions recorded yet
            </p>
          ) : (
            <ul className="space-y-2">
              {recentCommissions.map((commission) => (
                <li
                  key={commission.id}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-slate-900">
                      {commission.booking.leadName}
                    </p>
                    <p className="text-sm text-slate-500">
                      {commission.partner.name} •{" "}
                      {Number(commission.commissionRate)}%
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-slate-900">
                      ${Number(commission.commissionAmount).toLocaleString()}
                    </span>
                    <CommissionStatusBadge status={commission.status} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function FunnelRow({
  label,
  count,
  percent,
  color,
}: {
  label: string;
  count: number;
  percent: number;
  color: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm mb-1">
        <span className="text-slate-700">{label}</span>
        <span className="text-slate-500">
          {count} <span className="text-xs">({percent}%)</span>
        </span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all`}
          style={{ width: `${percent}%` }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
