import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  ExternalLink,
  BarChart3,
  Search,
  TrendingUp,
  DollarSign,
  Users,
  Calendar,
  MessageSquare,
  Mountain,
  TreePalm,
  ArrowUpRight,
  ArrowDownRight,
  Globe,
  MapPin,
  Clock,
  Mail,
  Phone,
  Target,
  Percent,
  Activity,
  FileText,
  Eye,
} from "lucide-react";
import { BookingStatus, DepartureStatus } from "@prisma/client";

async function getBusinessMetrics() {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);
  const ninetyDaysAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const startOfLastYear = new Date(now.getFullYear() - 1, 0, 1);
  const endOfLastYear = new Date(now.getFullYear() - 1, 11, 31);

  // Booking metrics
  const [
    totalBookings,
    confirmedBookings,
    recentBookings,
    previousPeriodBookings,
    totalRevenue,
    recentRevenue,
    previousRevenue,
    yearToDateRevenue,
    lastYearRevenue,
    pendingBookings,
    cancelledBookings,
  ] = await Promise.all([
    prisma.booking.count(),
    prisma.booking.count({
      where: { status: { in: [BookingStatus.CONFIRMED, BookingStatus.COMPLETED] } },
    }),
    prisma.booking.count({
      where: { createdAt: { gte: thirtyDaysAgo } },
    }),
    prisma.booking.count({
      where: {
        createdAt: { gte: sixtyDaysAgo, lt: thirtyDaysAgo },
      },
    }),
    prisma.booking.aggregate({
      where: { status: { in: [BookingStatus.CONFIRMED, BookingStatus.COMPLETED] } },
      _sum: { totalPrice: true },
    }),
    prisma.booking.aggregate({
      where: {
        status: { in: [BookingStatus.CONFIRMED, BookingStatus.COMPLETED] },
        createdAt: { gte: thirtyDaysAgo },
      },
      _sum: { totalPrice: true },
    }),
    prisma.booking.aggregate({
      where: {
        status: { in: [BookingStatus.CONFIRMED, BookingStatus.COMPLETED] },
        createdAt: { gte: sixtyDaysAgo, lt: thirtyDaysAgo },
      },
      _sum: { totalPrice: true },
    }),
    prisma.booking.aggregate({
      where: {
        status: { in: [BookingStatus.CONFIRMED, BookingStatus.COMPLETED] },
        createdAt: { gte: startOfYear },
      },
      _sum: { totalPrice: true },
    }),
    prisma.booking.aggregate({
      where: {
        status: { in: [BookingStatus.CONFIRMED, BookingStatus.COMPLETED] },
        createdAt: { gte: startOfLastYear, lte: endOfLastYear },
      },
      _sum: { totalPrice: true },
    }),
    prisma.booking.count({
      where: { status: BookingStatus.PENDING },
    }),
    prisma.booking.count({
      where: { status: BookingStatus.CANCELLED },
    }),
  ]);

  // Inquiry metrics
  const [
    totalInquiries,
    recentInquiries,
    previousInquiries,
    inquiriesByType,
    convertedInquiries,
    newInquiries,
    respondedInquiries,
  ] = await Promise.all([
    prisma.inquiry.count(),
    prisma.inquiry.count({
      where: { createdAt: { gte: thirtyDaysAgo } },
    }),
    prisma.inquiry.count({
      where: { createdAt: { gte: sixtyDaysAgo, lt: thirtyDaysAgo } },
    }),
    prisma.inquiry.groupBy({
      by: ["type"],
      _count: { type: true },
    }),
    prisma.inquiry.count({
      where: { status: "converted" },
    }),
    prisma.inquiry.count({
      where: { status: "new" },
    }),
    prisma.inquiry.count({
      where: { status: "responded" },
    }),
  ]);

  // Departure metrics
  const [
    totalDepartures,
    upcomingDepartures,
    fullDepartures,
    guaranteedDepartures,
    totalClimbers,
    avgClimbersPerBooking,
  ] = await Promise.all([
    prisma.groupDeparture.count(),
    prisma.groupDeparture.count({
      where: {
        arrivalDate: { gte: now },
        status: { in: [DepartureStatus.OPEN, DepartureStatus.LIMITED, DepartureStatus.GUARANTEED] },
      },
    }),
    prisma.groupDeparture.count({
      where: {
        arrivalDate: { gte: now },
        status: DepartureStatus.FULL,
      },
    }),
    prisma.groupDeparture.count({
      where: {
        arrivalDate: { gte: now },
        status: DepartureStatus.GUARANTEED,
      },
    }),
    prisma.booking.aggregate({
      where: { status: { in: [BookingStatus.CONFIRMED, BookingStatus.COMPLETED] } },
      _sum: { totalClimbers: true },
    }),
    prisma.booking.aggregate({
      where: { status: { in: [BookingStatus.CONFIRMED, BookingStatus.COMPLETED] } },
      _avg: { totalClimbers: true },
    }),
  ]);

  // Partner metrics
  const [activePartners, partnerBookings, totalCommissions, pendingCommissions] = await Promise.all([
    prisma.partner.count({ where: { isActive: true } }),
    prisma.commission.count({
      where: {
        booking: {
          status: { in: [BookingStatus.CONFIRMED, BookingStatus.COMPLETED] },
        },
      },
    }),
    prisma.commission.aggregate({
      where: { status: "PAID" },
      _sum: { commissionAmount: true },
    }),
    prisma.commission.aggregate({
      where: { status: "PENDING" },
      _sum: { commissionAmount: true },
    }),
  ]);

  // Calculate trends
  const bookingTrend = previousPeriodBookings > 0
    ? ((recentBookings - previousPeriodBookings) / previousPeriodBookings) * 100
    : recentBookings > 0 ? 100 : 0;

  const inquiryTrend = previousInquiries > 0
    ? ((recentInquiries - previousInquiries) / previousInquiries) * 100
    : recentInquiries > 0 ? 100 : 0;

  const revenueTrend =
    Number(previousRevenue._sum.totalPrice || 0) > 0
      ? ((Number(recentRevenue._sum.totalPrice || 0) - Number(previousRevenue._sum.totalPrice || 0)) /
          Number(previousRevenue._sum.totalPrice || 1)) *
        100
      : Number(recentRevenue._sum.totalPrice || 0) > 0
        ? 100
        : 0;

  const conversionRate = totalInquiries > 0 ? (convertedInquiries / totalInquiries) * 100 : 0;
  const avgBookingValue = confirmedBookings > 0
    ? Number(totalRevenue._sum.totalPrice || 0) / confirmedBookings
    : 0;

  return {
    bookings: {
      total: totalBookings,
      confirmed: confirmedBookings,
      pending: pendingBookings,
      cancelled: cancelledBookings,
      recent: recentBookings,
      trend: bookingTrend,
    },
    revenue: {
      total: Number(totalRevenue._sum.totalPrice || 0),
      recent: Number(recentRevenue._sum.totalPrice || 0),
      yearToDate: Number(yearToDateRevenue._sum.totalPrice || 0),
      lastYear: Number(lastYearRevenue._sum.totalPrice || 0),
      trend: revenueTrend,
      avgBookingValue,
    },
    inquiries: {
      total: totalInquiries,
      recent: recentInquiries,
      trend: inquiryTrend,
      byType: inquiriesByType,
      conversionRate,
      new: newInquiries,
      responded: respondedInquiries,
      converted: convertedInquiries,
    },
    departures: {
      total: totalDepartures,
      upcoming: upcomingDepartures,
      full: fullDepartures,
      guaranteed: guaranteedDepartures,
    },
    climbers: {
      total: totalClimbers._sum.totalClimbers || 0,
      avgPerBooking: avgClimbersPerBooking._avg.totalClimbers || 0,
    },
    partners: {
      active: activePartners,
      bookings: partnerBookings,
      percentage: totalBookings > 0 ? (partnerBookings / totalBookings) * 100 : 0,
      totalPaid: Number(totalCommissions._sum.commissionAmount || 0),
      pending: Number(pendingCommissions._sum.commissionAmount || 0),
    },
  };
}

async function getMonthlyData() {
  const now = new Date();
  const twelveMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 11, 1);

  // Get bookings for last 12 months
  const bookings = await prisma.booking.findMany({
    where: {
      createdAt: { gte: twelveMonthsAgo },
      status: { in: [BookingStatus.CONFIRMED, BookingStatus.COMPLETED] },
    },
    select: {
      createdAt: true,
      totalPrice: true,
      totalClimbers: true,
    },
  });

  // Get inquiries for last 12 months
  const inquiries = await prisma.inquiry.findMany({
    where: {
      createdAt: { gte: twelveMonthsAgo },
    },
    select: {
      createdAt: true,
    },
  });

  // Group by month
  const months: { month: string; bookings: number; revenue: number; inquiries: number }[] = [];

  for (let i = 11; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthKey = date.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
    const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
    const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59);

    const monthBookings = bookings.filter((b) => {
      const d = new Date(b.createdAt);
      return d >= monthStart && d <= monthEnd;
    });

    const monthInquiries = inquiries.filter((i) => {
      const d = new Date(i.createdAt);
      return d >= monthStart && d <= monthEnd;
    });

    months.push({
      month: monthKey,
      bookings: monthBookings.length,
      revenue: monthBookings.reduce((sum, b) => sum + Number(b.totalPrice), 0),
      inquiries: monthInquiries.length,
    });
  }

  return months;
}

async function getTopRoutes() {
  const bookingsByRoute = await prisma.booking.groupBy({
    by: ["departureId"],
    where: {
      status: { in: [BookingStatus.CONFIRMED, BookingStatus.COMPLETED] },
    },
    _count: { id: true },
    _sum: { totalPrice: true, totalClimbers: true },
  });

  // Get departure details to get route info
  const departureIds = bookingsByRoute.map((b) => b.departureId);
  const departures = await prisma.groupDeparture.findMany({
    where: { id: { in: departureIds } },
    include: { route: { select: { title: true, slug: true } } },
  });

  // Aggregate by route
  const routeMap = new Map<string, { name: string; slug: string; bookings: number; revenue: number; climbers: number }>();

  for (const booking of bookingsByRoute) {
    const departure = departures.find((d) => d.id === booking.departureId);
    if (departure?.route) {
      const existing = routeMap.get(departure.route.slug) || {
        name: departure.route.title,
        slug: departure.route.slug,
        bookings: 0,
        revenue: 0,
        climbers: 0,
      };
      existing.bookings += booking._count.id;
      existing.revenue += Number(booking._sum.totalPrice || 0);
      existing.climbers += booking._sum.totalClimbers || 0;
      routeMap.set(departure.route.slug, existing);
    }
  }

  return Array.from(routeMap.values())
    .sort((a, b) => b.bookings - a.bookings)
    .slice(0, 5);
}

async function getBookingSources() {
  const sources = await prisma.booking.groupBy({
    by: ["source"],
    where: {
      status: { in: [BookingStatus.CONFIRMED, BookingStatus.COMPLETED] },
      source: { not: null },
    },
    _count: { id: true },
    _sum: { totalPrice: true },
  });

  return sources
    .filter((s) => s.source)
    .sort((a, b) => b._count.id - a._count.id)
    .slice(0, 10);
}

async function getTopNationalities() {
  const nationalities = await prisma.booking.groupBy({
    by: ["leadNationality"],
    where: {
      status: { in: [BookingStatus.CONFIRMED, BookingStatus.COMPLETED] },
      leadNationality: { not: null },
    },
    _count: { id: true },
    _sum: { totalClimbers: true },
  });

  return nationalities
    .filter((n) => n.leadNationality)
    .sort((a, b) => b._count.id - a._count.id)
    .slice(0, 10);
}

async function getRecentActivity() {
  const [recentBookings, recentInquiries] = await Promise.all([
    prisma.booking.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        leadName: true,
        leadEmail: true,
        totalPrice: true,
        status: true,
        createdAt: true,
        departure: {
          select: {
            route: { select: { title: true } },
          },
        },
      },
    }),
    prisma.inquiry.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        fullName: true,
        email: true,
        type: true,
        status: true,
        createdAt: true,
      },
    }),
  ]);

  return { recentBookings, recentInquiries };
}

async function getContentStats() {
  const [
    blogPosts,
    publishedPosts,
    safariPackages,
    activeSafarisCount,
    trekkingRoutes,
    destinations,
  ] = await Promise.all([
    prisma.blogPost.count(),
    prisma.blogPost.count({ where: { isPublished: true } }),
    prisma.safariPackage.count(),
    prisma.safariPackage.count({ where: { isActive: true } }),
    prisma.trekkingRoute.count(),
    prisma.destination.count(),
  ]);

  return {
    blogPosts: { total: blogPosts, published: publishedPosts },
    safariPackages: { total: safariPackages, active: activeSafarisCount },
    trekkingRoutes,
    destinations,
  };
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function AnalyticsPage() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  const [metrics, monthlyData, topRoutes, bookingSources, topNationalities, recentActivity, contentStats] =
    await Promise.all([
      getBusinessMetrics(),
      getMonthlyData(),
      getTopRoutes(),
      getBookingSources(),
      getTopNationalities(),
      getRecentActivity(),
      getContentStats(),
    ]);

  const maxRevenue = Math.max(...monthlyData.map((m) => m.revenue), 1);
  const maxBookings = Math.max(...monthlyData.map((m) => m.bookings), 1);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Analytics Dashboard</h1>
        <p className="text-slate-600 mt-1">
          Real-time business metrics and performance insights
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Revenue"
          value={formatCurrency(metrics.revenue.total)}
          subValue={`${formatCurrency(metrics.revenue.recent)} last 30 days`}
          trend={metrics.revenue.trend}
          icon={DollarSign}
          iconBg="bg-emerald-100"
          iconColor="text-emerald-600"
        />
        <MetricCard
          title="Total Bookings"
          value={metrics.bookings.total.toString()}
          subValue={`${metrics.bookings.recent} last 30 days`}
          trend={metrics.bookings.trend}
          icon={Calendar}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
        />
        <MetricCard
          title="Total Inquiries"
          value={metrics.inquiries.total.toString()}
          subValue={`${metrics.inquiries.recent} last 30 days`}
          trend={metrics.inquiries.trend}
          icon={MessageSquare}
          iconBg="bg-purple-100"
          iconColor="text-purple-600"
        />
        <MetricCard
          title="Total Climbers"
          value={metrics.climbers.total.toString()}
          subValue={`${metrics.climbers.avgPerBooking.toFixed(1)} avg per booking`}
          icon={Users}
          iconBg="bg-amber-100"
          iconColor="text-amber-600"
        />
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Revenue Overview</h2>
            <p className="text-sm text-slate-500">Monthly revenue for the last 12 months</p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-500 rounded"></div>
              <span className="text-slate-600">Revenue</span>
            </div>
          </div>
        </div>
        <div className="h-64 flex items-end gap-2">
          {monthlyData.map((month, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex flex-col items-center">
                <span className="text-xs text-slate-500 mb-1">
                  {month.revenue > 0 ? formatCurrency(month.revenue) : ""}
                </span>
                <div
                  className="w-full bg-emerald-500 rounded-t transition-all hover:bg-emerald-600"
                  style={{ height: `${(month.revenue / maxRevenue) * 180}px`, minHeight: month.revenue > 0 ? "4px" : "0" }}
                ></div>
              </div>
              <span className="text-xs text-slate-500">{month.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bookings & Inquiries Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Bookings Trend</h2>
              <p className="text-sm text-slate-500">Monthly confirmed bookings</p>
            </div>
          </div>
          <div className="h-48 flex items-end gap-2">
            {monthlyData.map((month, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col items-center">
                  {month.bookings > 0 && (
                    <span className="text-xs text-slate-500 mb-1">{month.bookings}</span>
                  )}
                  <div
                    className="w-full bg-blue-500 rounded-t transition-all hover:bg-blue-600"
                    style={{ height: `${(month.bookings / maxBookings) * 120}px`, minHeight: month.bookings > 0 ? "4px" : "0" }}
                  ></div>
                </div>
                <span className="text-[10px] text-slate-500">{month.month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Inquiries Trend</h2>
              <p className="text-sm text-slate-500">Monthly inquiry volume</p>
            </div>
          </div>
          <div className="h-48 flex items-end gap-2">
            {monthlyData.map((month, i) => {
              const maxInq = Math.max(...monthlyData.map((m) => m.inquiries), 1);
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col items-center">
                    {month.inquiries > 0 && (
                      <span className="text-xs text-slate-500 mb-1">{month.inquiries}</span>
                    )}
                    <div
                      className="w-full bg-purple-500 rounded-t transition-all hover:bg-purple-600"
                      style={{ height: `${(month.inquiries / maxInq) * 120}px`, minHeight: month.inquiries > 0 ? "4px" : "0" }}
                    ></div>
                  </div>
                  <span className="text-[10px] text-slate-500">{month.month}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Secondary Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-100 rounded-lg">
              <Target className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{metrics.inquiries.conversionRate.toFixed(1)}%</p>
              <p className="text-xs text-slate-500">Conversion Rate</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-100 rounded-lg">
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{formatCurrency(metrics.revenue.avgBookingValue)}</p>
              <p className="text-xs text-slate-500">Avg Booking Value</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-100 rounded-lg">
              <Calendar className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{metrics.departures.upcoming}</p>
              <p className="text-xs text-slate-500">Upcoming Departures</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-green-100 rounded-lg">
              <Percent className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{metrics.departures.full}</p>
              <p className="text-xs text-slate-500">Full Departures</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Routes */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Mountain className="w-5 h-5 text-amber-600" />
            Top Trekking Routes
          </h3>
          {topRoutes.length === 0 ? (
            <p className="text-sm text-slate-500">No booking data yet</p>
          ) : (
            <div className="space-y-3">
              {topRoutes.map((route, i) => (
                <div key={route.slug} className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-xs font-medium text-slate-600">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{route.name}</p>
                    <p className="text-xs text-slate-500">
                      {route.bookings} bookings · {route.climbers} climbers
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-emerald-600">
                    {formatCurrency(route.revenue)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top Nationalities */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-600" />
            Top Nationalities
          </h3>
          {topNationalities.length === 0 ? (
            <p className="text-sm text-slate-500">No nationality data yet</p>
          ) : (
            <div className="space-y-3">
              {topNationalities.map((nat, i) => (
                <div key={nat.leadNationality} className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-xs font-medium text-slate-600">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900">{nat.leadNationality}</p>
                    <p className="text-xs text-slate-500">
                      {nat._sum.totalClimbers || 0} climbers
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-slate-900">
                    {nat._count.id} bookings
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Booking Sources */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-purple-600" />
            Booking Sources
          </h3>
          {bookingSources.length === 0 ? (
            <p className="text-sm text-slate-500">No source data yet</p>
          ) : (
            <div className="space-y-3">
              {bookingSources.map((source, i) => (
                <div key={source.source} className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-xs font-medium text-slate-600">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate capitalize">
                      {source.source || "Direct"}
                    </p>
                    <p className="text-xs text-slate-500">
                      {formatCurrency(Number(source._sum.totalPrice || 0))}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-slate-900">
                    {source._count.id}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Inquiries by Type & Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Inquiries by Type</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { type: "safari", label: "Safari", icon: TreePalm, color: "amber" },
              { type: "trekking", label: "Trekking", icon: Mountain, color: "emerald" },
              { type: "group", label: "Group", icon: Users, color: "purple" },
              { type: "custom", label: "Custom", icon: Calendar, color: "blue" },
              { type: "contact", label: "Contact", icon: MessageSquare, color: "slate" },
              { type: "zanzibar", label: "Zanzibar", icon: TreePalm, color: "cyan" },
            ].map(({ type, label, icon: Icon, color }) => {
              const count = metrics.inquiries.byType.find((t) => t.type === type)?._count.type || 0;
              const colorClasses: Record<string, string> = {
                amber: "bg-amber-100 text-amber-600",
                emerald: "bg-emerald-100 text-emerald-600",
                purple: "bg-purple-100 text-purple-600",
                blue: "bg-blue-100 text-blue-600",
                slate: "bg-slate-100 text-slate-600",
                cyan: "bg-cyan-100 text-cyan-600",
              };
              return (
                <div key={type} className="text-center p-4 bg-slate-50 rounded-lg">
                  <div className={`inline-flex p-2.5 rounded-full ${colorClasses[color]} mb-2`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="text-xl font-bold text-slate-900">{count}</div>
                  <div className="text-xs text-slate-500">{label}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Inquiry & Booking Status</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wide">Inquiries</h4>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">New</span>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-sm font-medium">
                  {metrics.inquiries.new}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Responded</span>
                <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-sm font-medium">
                  {metrics.inquiries.responded}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Converted</span>
                <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-sm font-medium">
                  {metrics.inquiries.converted}
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wide">Bookings</h4>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Pending</span>
                <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded text-sm font-medium">
                  {metrics.bookings.pending}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Confirmed</span>
                <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-sm font-medium">
                  {metrics.bookings.confirmed}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Cancelled</span>
                <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-sm font-medium">
                  {metrics.bookings.cancelled}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              Recent Bookings
            </h3>
            <Link href="/admin/bookings/" className="text-sm text-amber-600 hover:text-amber-700">
              View all
            </Link>
          </div>
          {recentActivity.recentBookings.length === 0 ? (
            <p className="text-sm text-slate-500">No bookings yet</p>
          ) : (
            <div className="space-y-3">
              {recentActivity.recentBookings.map((booking) => (
                <Link
                  key={booking.id}
                  href={`/admin/bookings/${booking.id}/`}
                  className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{booking.leadName}</p>
                    <p className="text-xs text-slate-500 truncate">
                      {booking.departure?.route?.title || "Unknown route"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-emerald-600">
                      {formatCurrency(Number(booking.totalPrice))}
                    </p>
                    <p className="text-xs text-slate-400">{formatDate(booking.createdAt)}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <Mail className="w-5 h-5 text-purple-600" />
              Recent Inquiries
            </h3>
            <Link href="/admin/inquiries/" className="text-sm text-amber-600 hover:text-amber-700">
              View all
            </Link>
          </div>
          {recentActivity.recentInquiries.length === 0 ? (
            <p className="text-sm text-slate-500">No inquiries yet</p>
          ) : (
            <div className="space-y-3">
              {recentActivity.recentInquiries.map((inquiry) => (
                <Link
                  key={inquiry.id}
                  href={`/admin/inquiries/${inquiry.id}/`}
                  className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{inquiry.fullName}</p>
                    <p className="text-xs text-slate-500 capitalize">{inquiry.type} inquiry</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-0.5 text-xs font-medium rounded ${
                      inquiry.status === "new" ? "bg-blue-100 text-blue-700" :
                      inquiry.status === "converted" ? "bg-green-100 text-green-700" :
                      "bg-slate-100 text-slate-600"
                    }`}>
                      {inquiry.status}
                    </span>
                    <p className="text-xs text-slate-400 mt-1">{formatDate(inquiry.createdAt)}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Partner & Revenue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-sm font-medium text-slate-500 mb-4">Partner Performance</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Active Partners</span>
              <span className="font-semibold text-slate-900">{metrics.partners.active}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Partner Bookings</span>
              <span className="font-semibold text-slate-900">{metrics.partners.bookings}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Partner Share</span>
              <span className="font-semibold text-amber-600">
                {metrics.partners.percentage.toFixed(1)}%
              </span>
            </div>
            <div className="pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Commissions Paid</span>
                <span className="font-semibold text-emerald-600">
                  {formatCurrency(metrics.partners.totalPaid)}
                </span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-slate-600">Pending Payouts</span>
                <span className="font-semibold text-amber-600">
                  {formatCurrency(metrics.partners.pending)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-sm font-medium text-slate-500 mb-4">Revenue Comparison</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-slate-600">Year to Date</span>
                <span className="font-semibold text-slate-900">
                  {formatCurrency(metrics.revenue.yearToDate)}
                </span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{
                    width: `${Math.min((metrics.revenue.yearToDate / Math.max(metrics.revenue.lastYear, 1)) * 100, 100)}%`
                  }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-slate-600">Last Year Total</span>
                <span className="font-semibold text-slate-900">
                  {formatCurrency(metrics.revenue.lastYear)}
                </span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-slate-400 rounded-full w-full"></div>
              </div>
            </div>
            <div className="pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">YoY Progress</span>
                <span className={`font-semibold ${
                  metrics.revenue.yearToDate >= metrics.revenue.lastYear ? "text-emerald-600" : "text-amber-600"
                }`}>
                  {metrics.revenue.lastYear > 0
                    ? `${((metrics.revenue.yearToDate / metrics.revenue.lastYear) * 100).toFixed(0)}%`
                    : "N/A"
                  }
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-sm font-medium text-slate-500 mb-4">Content Overview</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-600 flex items-center gap-2">
                <FileText className="w-4 h-4" /> Blog Posts
              </span>
              <span className="font-semibold text-slate-900">
                {contentStats.blogPosts.published}/{contentStats.blogPosts.total}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600 flex items-center gap-2">
                <TreePalm className="w-4 h-4" /> Safari Packages
              </span>
              <span className="font-semibold text-slate-900">
                {contentStats.safariPackages.active}/{contentStats.safariPackages.total}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600 flex items-center gap-2">
                <Mountain className="w-4 h-4" /> Trekking Routes
              </span>
              <span className="font-semibold text-slate-900">{contentStats.trekkingRoutes}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600 flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Destinations
              </span>
              <span className="font-semibold text-slate-900">{contentStats.destinations}</span>
            </div>
          </div>
        </div>
      </div>

      {/* External Tools */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ExternalLinkCard
          title="Google Analytics 4"
          description="Real-time traffic, user behavior, and conversions"
          icon={BarChart3}
          href={gaId ? `https://analytics.google.com/analytics/web/#/p${gaId.replace("G-", "")}` : "https://analytics.google.com"}
          color="blue"
        />
        <ExternalLinkCard
          title="Google Search Console"
          description="Search performance, indexing, and SEO insights"
          icon={Search}
          href="https://search.google.com/search-console"
          color="green"
        />
        <ExternalLinkCard
          title="PageSpeed Insights"
          description="Core Web Vitals and performance metrics"
          icon={TrendingUp}
          href="https://pagespeed.web.dev/report?url=https://snowafricaadventure.com"
          color="amber"
        />
      </div>

      {/* GA Configuration Status */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Analytics Configuration
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div>
              <p className="font-medium text-slate-900">Google Analytics 4</p>
              <p className="text-sm text-slate-500">Measurement ID</p>
            </div>
            <div className="text-right">
              {gaId ? (
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  {gaId}
                </span>
              ) : (
                <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                  Not configured
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div>
              <p className="font-medium text-slate-900">Search Console</p>
              <p className="text-sm text-slate-500">Site verification</p>
            </div>
            <div className="text-right">
              {process.env.GOOGLE_SITE_VERIFICATION ? (
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  Configured
                </span>
              ) : (
                <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                  Not configured
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  title,
  value,
  subValue,
  trend,
  icon: Icon,
  iconBg,
  iconColor,
}: {
  title: string;
  value: string;
  subValue: string;
  trend?: number;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${iconBg}`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
        {trend !== undefined && (
          <div
            className={`flex items-center gap-1 text-sm font-medium ${
              trend >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {trend >= 0 ? (
              <ArrowUpRight className="w-4 h-4" />
            ) : (
              <ArrowDownRight className="w-4 h-4" />
            )}
            {Math.abs(trend).toFixed(0)}%
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-slate-900">{value}</div>
      <div className="text-sm text-slate-500 mt-1">{subValue}</div>
      <div className="text-xs text-slate-400 mt-2">{title}</div>
    </div>
  );
}

function ExternalLinkCard({
  title,
  description,
  icon: Icon,
  href,
  color,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
  color: "blue" | "green" | "amber";
}) {
  const colorClasses = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    amber: "bg-amber-500",
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-sm border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all group"
    >
      <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="font-semibold text-slate-900">{title}</p>
          <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition-colors" />
        </div>
        <p className="text-sm text-slate-500">{description}</p>
      </div>
    </a>
  );
}
