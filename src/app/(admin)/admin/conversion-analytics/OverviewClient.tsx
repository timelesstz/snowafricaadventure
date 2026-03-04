"use client";

import {
  ClipboardList,
  MessageSquare,
  Globe,
  Monitor,
  TrendingUp,
  Activity,
} from "lucide-react";
import CountryDistributionTable from "@/components/admin/conversion-analytics/CountryDistributionTable";
import DeviceBreakdownChart from "@/components/admin/conversion-analytics/DeviceBreakdownChart";
import UTMSourceChart from "@/components/admin/conversion-analytics/UTMSourceChart";
import BrowserChart from "@/components/admin/conversion-analytics/BrowserChart";
import ReferrerTable from "@/components/admin/conversion-analytics/ReferrerTable";

interface OverviewStats {
  totalBookings: number;
  trackedBookings: number;
  totalInquiries: number;
  trackedInquiries: number;
  recentBookings: number;
  recentInquiries: number;
  topCountry: string;
  topDevice: string;
}

interface OverviewClientProps {
  stats: OverviewStats;
  countryData: Array<{ countryCode: string; _count: { id: number } }>;
  deviceData: Array<{ device: string; _count: { id: number } }>;
  utmData: Array<{ utmSource: string; _count: { id: number } }>;
  browserData: Array<{ browser: string; _count: { id: number } }>;
  referrerData: Array<{ referrerUrl: string; _count: { id: number } }>;
}

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
}: {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: typeof ClipboardList;
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 font-medium">{title}</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
          {subtitle && (
            <p className="text-xs text-slate-400 mt-1">{subtitle}</p>
          )}
        </div>
        <div className="bg-amber-50 p-2.5 rounded-lg">
          <Icon className="w-5 h-5 text-amber-600" />
        </div>
      </div>
    </div>
  );
}

export default function OverviewClient({
  stats,
  countryData,
  deviceData,
  utmData,
  browserData,
  referrerData,
}: OverviewClientProps) {
  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Bookings (tracked)"
          value={stats.trackedBookings}
          subtitle={`${stats.totalBookings} total | ${stats.recentBookings} last 30d`}
          icon={ClipboardList}
        />
        <StatCard
          title="Inquiries (tracked)"
          value={stats.trackedInquiries}
          subtitle={`${stats.totalInquiries} total | ${stats.recentInquiries} last 30d`}
          icon={MessageSquare}
        />
        <StatCard
          title="Top Country"
          value={stats.topCountry}
          icon={Globe}
        />
        <StatCard
          title="Top Device"
          value={stats.topDevice}
          subtitle="across bookings & inquiries"
          icon={Monitor}
        />
      </div>

      {/* Charts Row 1: Country + Device */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CountryDistributionTable
          data={countryData}
          title="Country Distribution (All Conversions)"
        />
        <DeviceBreakdownChart
          data={deviceData}
          title="Device Breakdown (All Conversions)"
        />
      </div>

      {/* Charts Row 2: UTM + Browser */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UTMSourceChart data={utmData} />
        <BrowserChart data={browserData} />
      </div>

      {/* Referrer Table */}
      <ReferrerTable data={referrerData} title="Top Referrers (All Conversions)" />
    </div>
  );
}
