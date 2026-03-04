"use client";

import CountryDistributionTable from "@/components/admin/conversion-analytics/CountryDistributionTable";
import DeviceBreakdownChart from "@/components/admin/conversion-analytics/DeviceBreakdownChart";
import UTMSourceChart from "@/components/admin/conversion-analytics/UTMSourceChart";
import BrowserChart from "@/components/admin/conversion-analytics/BrowserChart";
import ReferrerTable from "@/components/admin/conversion-analytics/ReferrerTable";
import VisitorDetailsTable from "@/components/admin/conversion-analytics/VisitorDetailsTable";

interface BookingsClientProps {
  countryData: Array<{ countryCode: string | null; _count: { id: number } }>;
  deviceData: Array<{ device: string | null; _count: { id: number } }>;
  browserData: Array<{ browser: string | null; _count: { id: number } }>;
  utmData: Array<{ utmSource: string | null; _count: { id: number } }>;
  referrerData: Array<{ referrerUrl: string | null; _count: { id: number } }>;
  revenueData: Array<{
    countryCode: string | null;
    _sum: { totalPrice: number | null };
  }>;
  records: Array<{
    id: string;
    name: string;
    email: string;
    createdAt: string;
    countryCode: string | null;
    country: string | null;
    city: string | null;
    device: string | null;
    browser: string | null;
    ipAddress: string | null;
    utmSource: string | null;
    utmMedium: string | null;
    utmCampaign: string | null;
    referrerUrl: string | null;
    landingPage: string | null;
  }>;
}

export default function BookingsClient({
  countryData,
  deviceData,
  browserData,
  utmData,
  referrerData,
  revenueData,
  records,
}: BookingsClientProps) {
  return (
    <div className="space-y-6">
      {/* Row 1: Country + Device */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CountryDistributionTable
          data={countryData}
          title="Booking Countries"
          showRevenue
          revenueData={revenueData}
        />
        <DeviceBreakdownChart data={deviceData} title="Booking Devices" />
      </div>

      {/* Row 2: UTM + Browser */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UTMSourceChart data={utmData} title="Booking UTM Sources" />
        <BrowserChart data={browserData} title="Booking Browsers" />
      </div>

      {/* Referrers */}
      <ReferrerTable data={referrerData} title="Booking Referrers" />

      {/* Individual Records */}
      <VisitorDetailsTable records={records} title="Recent Booking Visitors" />
    </div>
  );
}
