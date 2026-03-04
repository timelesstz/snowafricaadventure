"use client";

import { useState } from "react";
import { COUNTRIES } from "@/lib/countries";
import { Monitor, Smartphone, Tablet, ChevronLeft, ChevronRight } from "lucide-react";

interface VisitorRecord {
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
}

interface VisitorDetailsTableProps {
  records: VisitorRecord[];
  title?: string;
  pageSize?: number;
}

function getFlag(code: string | null): string {
  if (!code) return "";
  return COUNTRIES.find((c) => c.code === code)?.flag || "";
}

const DeviceIcon = ({ device }: { device: string | null }) => {
  if (device === "mobile") return <Smartphone className="w-3.5 h-3.5 text-amber-500" />;
  if (device === "tablet") return <Tablet className="w-3.5 h-3.5 text-green-500" />;
  return <Monitor className="w-3.5 h-3.5 text-blue-500" />;
};

export default function VisitorDetailsTable({
  records,
  title = "Visitor Details",
  pageSize = 15,
}: VisitorDetailsTableProps) {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(records.length / pageSize);
  const paged = records.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-700">{title}</h3>
        <span className="text-xs text-slate-400">{records.length} records</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[900px]">
          <thead>
            <tr className="text-left text-slate-500 border-b border-slate-100">
              <th className="pb-2 font-medium">Name</th>
              <th className="pb-2 font-medium">Date</th>
              <th className="pb-2 font-medium">Country</th>
              <th className="pb-2 font-medium">Device</th>
              <th className="pb-2 font-medium">Browser</th>
              <th className="pb-2 font-medium">Source</th>
              <th className="pb-2 font-medium">IP</th>
              <th className="pb-2 font-medium">Landing Page</th>
            </tr>
          </thead>
          <tbody>
            {paged.map((record) => (
              <tr
                key={record.id}
                className="border-b border-slate-50 last:border-0 hover:bg-slate-50"
              >
                <td className="py-2.5">
                  <div>
                    <span className="text-slate-900 font-medium">
                      {record.name}
                    </span>
                    <p className="text-xs text-slate-400">{record.email}</p>
                  </div>
                </td>
                <td className="py-2.5 text-slate-600 whitespace-nowrap">
                  {new Date(record.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="py-2.5">
                  {record.countryCode ? (
                    <span>
                      {getFlag(record.countryCode)}{" "}
                      <span className="text-slate-700">
                        {record.country || record.countryCode}
                      </span>
                      {record.city && (
                        <span className="text-xs text-slate-400 ml-1">
                          ({record.city})
                        </span>
                      )}
                    </span>
                  ) : (
                    <span className="text-slate-400">-</span>
                  )}
                </td>
                <td className="py-2.5">
                  <div className="flex items-center gap-1.5">
                    <DeviceIcon device={record.device} />
                    <span className="text-slate-600 capitalize">
                      {record.device || "-"}
                    </span>
                  </div>
                </td>
                <td className="py-2.5 text-slate-600">
                  {record.browser || "-"}
                </td>
                <td className="py-2.5">
                  {record.utmSource ? (
                    <div>
                      <span className="text-slate-700">{record.utmSource}</span>
                      {record.utmMedium && (
                        <span className="text-xs text-slate-400 ml-1">
                          / {record.utmMedium}
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="text-slate-400">Direct</span>
                  )}
                </td>
                <td className="py-2.5 text-slate-500 font-mono text-xs">
                  {record.ipAddress || "-"}
                </td>
                <td className="py-2.5 text-slate-500 text-xs truncate max-w-[150px]">
                  {record.landingPage || "-"}
                </td>
              </tr>
            ))}
            {paged.length === 0 && (
              <tr>
                <td colSpan={8} className="py-8 text-center text-slate-400">
                  No visitor data captured yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
          <button
            onClick={() => setPage(Math.max(0, page - 1))}
            disabled={page === 0}
            className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 disabled:opacity-40"
          >
            <ChevronLeft className="w-4 h-4" /> Prev
          </button>
          <span className="text-xs text-slate-400">
            Page {page + 1} of {totalPages}
          </span>
          <button
            onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
            disabled={page >= totalPages - 1}
            className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 disabled:opacity-40"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
