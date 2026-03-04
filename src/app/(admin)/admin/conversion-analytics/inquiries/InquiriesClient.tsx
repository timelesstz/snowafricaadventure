"use client";

import CountryDistributionTable from "@/components/admin/conversion-analytics/CountryDistributionTable";
import DeviceBreakdownChart from "@/components/admin/conversion-analytics/DeviceBreakdownChart";
import UTMSourceChart from "@/components/admin/conversion-analytics/UTMSourceChart";
import BrowserChart from "@/components/admin/conversion-analytics/BrowserChart";
import ReferrerTable from "@/components/admin/conversion-analytics/ReferrerTable";
import VisitorDetailsTable from "@/components/admin/conversion-analytics/VisitorDetailsTable";

interface InquiriesClientProps {
  countryData: Array<{ countryCode: string | null; _count: { id: number } }>;
  deviceData: Array<{ device: string | null; _count: { id: number } }>;
  browserData: Array<{ browser: string | null; _count: { id: number } }>;
  utmData: Array<{ utmSource: string | null; _count: { id: number } }>;
  referrerData: Array<{ referrerUrl: string | null; _count: { id: number } }>;
  typeBreakdown: Array<{ type: string; count: number }>;
  records: Array<{
    id: string;
    name: string;
    email: string;
    type: string;
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

const TYPE_COLORS: Record<string, string> = {
  contact: "bg-blue-100 text-blue-700",
  "Wildlife Safari": "bg-green-100 text-green-700",
  "tailor-made": "bg-purple-100 text-purple-700",
  zanzibar: "bg-amber-100 text-amber-700",
  kilimanjaro: "bg-orange-100 text-orange-700",
};

export default function InquiriesClient({
  countryData,
  deviceData,
  browserData,
  utmData,
  referrerData,
  typeBreakdown,
  records,
}: InquiriesClientProps) {
  return (
    <div className="space-y-6">
      {/* Inquiry Type Breakdown */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h3 className="text-sm font-semibold text-slate-700 mb-3">
          Inquiry Types
        </h3>
        <div className="flex flex-wrap gap-3">
          {typeBreakdown.map((t) => (
            <div
              key={t.type}
              className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                TYPE_COLORS[t.type] || "bg-slate-100 text-slate-700"
              }`}
            >
              {t.type}: {t.count}
            </div>
          ))}
        </div>
      </div>

      {/* Row 1: Country + Device */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CountryDistributionTable
          data={countryData}
          title="Inquiry Countries"
        />
        <DeviceBreakdownChart data={deviceData} title="Inquiry Devices" />
      </div>

      {/* Row 2: UTM + Browser */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UTMSourceChart data={utmData} title="Inquiry UTM Sources" />
        <BrowserChart data={browserData} title="Inquiry Browsers" />
      </div>

      {/* Referrers */}
      <ReferrerTable data={referrerData} title="Inquiry Referrers" />

      {/* Individual Records */}
      <VisitorDetailsTable records={records} title="Recent Inquiry Visitors" />
    </div>
  );
}
