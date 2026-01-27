import { prisma } from "@/lib/prisma";
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
} from "lucide-react";
import { BookingStatus, DepartureStatus } from "@prisma/client";

async function getBusinessMetrics() {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

  // Booking metrics
  const [
    totalBookings,
    confirmedBookings,
    recentBookings,
    previousPeriodBookings,
    totalRevenue,
    recentRevenue,
    previousRevenue,
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
  ]);

  // Inquiry metrics
  const [
    totalInquiries,
    recentInquiries,
    previousInquiries,
    inquiriesByType,
    convertedInquiries,
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
  ]);

  // Departure metrics
  const [
    totalDepartures,
    upcomingDepartures,
    fullDepartures,
    totalClimbers,
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
    prisma.booking.aggregate({
      where: { status: { in: [BookingStatus.CONFIRMED, BookingStatus.COMPLETED] } },
      _sum: { totalClimbers: true },
    }),
  ]);

  // Partner metrics
  const [activePartners, partnerBookings] = await Promise.all([
    prisma.partner.count({ where: { isActive: true } }),
    prisma.commission.count({
      where: {
        booking: {
          status: { in: [BookingStatus.CONFIRMED, BookingStatus.COMPLETED] },
        },
      },
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

  return {
    bookings: {
      total: totalBookings,
      confirmed: confirmedBookings,
      recent: recentBookings,
      trend: bookingTrend,
    },
    revenue: {
      total: Number(totalRevenue._sum.totalPrice || 0),
      recent: Number(recentRevenue._sum.totalPrice || 0),
      trend: revenueTrend,
    },
    inquiries: {
      total: totalInquiries,
      recent: recentInquiries,
      trend: inquiryTrend,
      byType: inquiriesByType,
      conversionRate,
    },
    departures: {
      total: totalDepartures,
      upcoming: upcomingDepartures,
      full: fullDepartures,
    },
    climbers: {
      total: totalClimbers._sum.totalClimbers || 0,
    },
    partners: {
      active: activePartners,
      bookings: partnerBookings,
      percentage: totalBookings > 0 ? (partnerBookings / totalBookings) * 100 : 0,
    },
  };
}

export default async function AnalyticsPage() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const metrics = await getBusinessMetrics();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Analytics</h1>
        <p className="text-slate-600 mt-1">
          Track website performance and business metrics
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Revenue"
          value={`$${metrics.revenue.total.toLocaleString()}`}
          subValue={`$${metrics.revenue.recent.toLocaleString()} last 30 days`}
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
          subValue={`${metrics.bookings.confirmed} confirmed bookings`}
          icon={Users}
          iconBg="bg-amber-100"
          iconColor="text-amber-600"
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h3 className="text-sm font-medium text-slate-500 mb-4">Departures Overview</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Upcoming Departures</span>
              <span className="font-semibold text-slate-900">{metrics.departures.upcoming}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Full Departures</span>
              <span className="font-semibold text-green-600">{metrics.departures.full}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Total Departures</span>
              <span className="font-semibold text-slate-900">{metrics.departures.total}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h3 className="text-sm font-medium text-slate-500 mb-4">Inquiry Conversion</h3>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1">
              <div className="text-3xl font-bold text-slate-900">
                {metrics.inquiries.conversionRate.toFixed(1)}%
              </div>
              <div className="text-sm text-slate-500">Conversion rate</div>
            </div>
            <div className="w-16 h-16 rounded-full border-4 border-amber-500 flex items-center justify-center">
              <span className="text-sm font-semibold text-amber-600">
                {Math.round(metrics.inquiries.conversionRate)}%
              </span>
            </div>
          </div>
          <div className="text-sm text-slate-500">
            Based on inquiries marked as converted
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
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
          </div>
        </div>
      </div>

      {/* Inquiries by Type */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Inquiries by Type</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { type: "safari", label: "Safari", icon: TreePalm, color: "amber" },
            { type: "trekking", label: "Trekking", icon: Mountain, color: "emerald" },
            { type: "group", label: "Group", icon: Users, color: "purple" },
            { type: "custom", label: "Custom", icon: Calendar, color: "blue" },
            { type: "contact", label: "Contact", icon: MessageSquare, color: "slate" },
          ].map(({ type, label, icon: Icon, color }) => {
            const count = metrics.inquiries.byType.find((t) => t.type === type)?._count.type || 0;
            const colorClasses: Record<string, string> = {
              amber: "bg-amber-100 text-amber-600",
              emerald: "bg-emerald-100 text-emerald-600",
              purple: "bg-purple-100 text-purple-600",
              blue: "bg-blue-100 text-blue-600",
              slate: "bg-slate-100 text-slate-600",
            };
            return (
              <div key={type} className="text-center p-4 bg-slate-50 rounded-lg">
                <div className={`inline-flex p-3 rounded-full ${colorClasses[color]} mb-2`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-2xl font-bold text-slate-900">{count}</div>
                <div className="text-sm text-slate-500">{label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* External Tools */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ExternalLinkCard
          title="Google Analytics 4"
          description="Real-time traffic, user behavior, and conversions"
          icon={BarChart3}
          href={`https://analytics.google.com/analytics/web/#/p${gaId?.replace("G-", "")}`}
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

      {/* GA Status */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Analytics Configuration
        </h2>

        <div className="space-y-4">
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

      {/* Events Tracking Info */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Event Tracking
        </h2>
        <p className="text-slate-600 mb-4">
          The following events are automatically tracked:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <EventCard
            name="inquiry_submit"
            description="Contact and booking form submissions"
          />
          <EventCard
            name="view_item"
            description="When users view trips or departures"
          />
          <EventCard
            name="begin_checkout"
            description="When users start the booking process"
          />
          <EventCard
            name="purchase"
            description="Completed bookings"
          />
          <EventCard
            name="contact_click"
            description="Phone, email, and WhatsApp clicks"
          />
          <EventCard
            name="select_departure"
            description="When users select a departure date"
          />
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
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
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
      className="flex items-center gap-4 p-6 bg-white rounded-lg shadow-sm border border-slate-200 hover:border-slate-300 transition-colors group"
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

function EventCard({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  return (
    <div className="p-4 bg-slate-50 rounded-lg">
      <code className="text-sm font-mono text-amber-600">{name}</code>
      <p className="text-sm text-slate-600 mt-1">{description}</p>
    </div>
  );
}
