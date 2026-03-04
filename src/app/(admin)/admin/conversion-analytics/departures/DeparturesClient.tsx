"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Calendar, Users, DollarSign } from "lucide-react";
import { COUNTRIES } from "@/lib/countries";

interface DepartureRow {
  id: string;
  routeTitle: string;
  arrivalDate: string;
  endDate: string;
  maxParticipants: number;
  status: string;
  totalBookings: number;
  totalClimbers: number;
  totalRevenue: number;
  countries: Array<{ code: string; count: number }>;
  devices: Array<{ device: string; count: number }>;
  utmSources: Array<{ source: string; count: number }>;
}

interface DeparturesClientProps {
  departures: DepartureRow[];
}

function getFlag(code: string): string {
  return COUNTRIES.find((c) => c.code === code)?.flag || "";
}

function getCountryName(code: string): string {
  return COUNTRIES.find((c) => c.code === code)?.name || code;
}

const STATUS_COLORS: Record<string, string> = {
  OPEN: "bg-green-100 text-green-700",
  ALMOST_FULL: "bg-amber-100 text-amber-700",
  FULL: "bg-red-100 text-red-700",
  CLOSED: "bg-slate-100 text-slate-600",
  GUARANTEED: "bg-blue-100 text-blue-700",
};

export default function DeparturesClient({
  departures,
}: DeparturesClientProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-500 mb-2">
        Showing departures from the last 90 days with aggregated booking analytics.
      </p>

      {departures.length === 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-400">
          No departures found in the last 90 days
        </div>
      )}

      {departures.map((dep) => {
        const isExpanded = expandedId === dep.id;
        return (
          <div
            key={dep.id}
            className="bg-white rounded-xl border border-slate-200 overflow-hidden"
          >
            {/* Header Row */}
            <button
              onClick={() => setExpandedId(isExpanded ? null : dep.id)}
              className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-4 text-left">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {dep.routeTitle}
                  </p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(dep.arrivalDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        STATUS_COLORS[dep.status] || STATUS_COLORS.OPEN
                      }`}
                    >
                      {dep.status.replace("_", " ")}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm text-slate-700">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-medium">{dep.totalClimbers}</span>
                    <span className="text-slate-400">
                      / {dep.maxParticipants}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    {dep.totalBookings} booking{dep.totalBookings !== 1 ? "s" : ""}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm font-medium text-slate-700">
                    <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                    {dep.totalRevenue.toLocaleString()}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  {dep.countries.slice(0, 3).map((c) => (
                    <span key={c.code} title={getCountryName(c.code)}>
                      {getFlag(c.code)}
                    </span>
                  ))}
                  {dep.countries.length > 3 && (
                    <span className="text-xs text-slate-400">
                      +{dep.countries.length - 3}
                    </span>
                  )}
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                )}
              </div>
            </button>

            {/* Expanded Details */}
            {isExpanded && (
              <div className="border-t border-slate-100 px-5 py-4 bg-slate-50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Countries */}
                  <div>
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      Countries
                    </h4>
                    {dep.countries.length > 0 ? (
                      <div className="space-y-1.5">
                        {dep.countries.map((c) => (
                          <div
                            key={c.code}
                            className="flex items-center justify-between text-sm"
                          >
                            <span>
                              {getFlag(c.code)} {getCountryName(c.code)}
                            </span>
                            <span className="text-slate-500 font-medium">
                              {c.count}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-slate-400">No data</p>
                    )}
                  </div>

                  {/* Devices */}
                  <div>
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      Devices
                    </h4>
                    {dep.devices.length > 0 ? (
                      <div className="space-y-1.5">
                        {dep.devices.map((d) => (
                          <div
                            key={d.device}
                            className="flex items-center justify-between text-sm"
                          >
                            <span className="capitalize text-slate-700">
                              {d.device}
                            </span>
                            <span className="text-slate-500 font-medium">
                              {d.count}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-slate-400">No data</p>
                    )}
                  </div>

                  {/* UTM Sources */}
                  <div>
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      Traffic Sources
                    </h4>
                    {dep.utmSources.length > 0 ? (
                      <div className="space-y-1.5">
                        {dep.utmSources.map((u) => (
                          <div
                            key={u.source}
                            className="flex items-center justify-between text-sm"
                          >
                            <span className="text-slate-700">{u.source}</span>
                            <span className="text-slate-500 font-medium">
                              {u.count}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-slate-400">
                        All direct traffic
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
