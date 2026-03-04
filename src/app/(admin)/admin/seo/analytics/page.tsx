"use client";

import { useState, useEffect, useCallback } from "react";
import DateRangePicker from "@/components/admin/seo/DateRangePicker";
import MetricCard from "@/components/admin/seo/MetricCard";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface OrganicData {
  totals: {
    sessions: number;
    users: number;
    newUsers: number;
    conversions: number;
    bounceRate: number;
    avgSessionDuration: number;
  };
  dailyData: Array<{
    date: string;
    sessions: number;
    users: number;
    bounceRate: number;
  }>;
  topPages: Array<{
    landingPage: string;
    sessions: number;
    users: number;
    conversions: number;
    bounceRate: number;
  }>;
}

export default function AnalyticsPage() {
  const [days, setDays] = useState(28);
  const [data, setData] = useState<OrganicData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/seo/organic-traffic?days=${days}`);
      if (res.ok) setData(await res.json());
    } catch (error) {
      console.error("Failed to fetch organic traffic:", error);
    }
    setLoading(false);
  }, [days]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <div className="text-center py-12 text-sm text-slate-400">Loading...</div>
    );
  }

  if (!data || data.totals.sessions === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-500 mb-2">No organic traffic data yet.</p>
        <p className="text-sm text-slate-400">
          Configure Google Analytics in Settings and sync data to see organic
          traffic metrics.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <DateRangePicker value={days} onChange={setDays} />
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Organic Sessions"
          value={data.totals.sessions.toLocaleString()}
          sparklineData={data.dailyData.map((d) => ({ value: d.sessions }))}
        />
        <MetricCard
          title="Organic Users"
          value={data.totals.users.toLocaleString()}
          sparklineData={data.dailyData.map((d) => ({ value: d.users }))}
        />
        <MetricCard
          title="Bounce Rate"
          value={`${data.totals.bounceRate}%`}
        />
        <MetricCard
          title="Conversions"
          value={data.totals.conversions.toLocaleString()}
        />
      </div>

      {/* Sessions Chart */}
      {data.dailyData.length > 1 && (
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">
            Organic Sessions Over Time
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.dailyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11 }}
                  tickFormatter={(d) =>
                    new Date(d).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  labelFormatter={(d) =>
                    new Date(d).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })
                  }
                />
                <Area
                  type="monotone"
                  dataKey="sessions"
                  stroke="#d97706"
                  fill="#fef3c7"
                  strokeWidth={2}
                  name="Sessions"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Top Landing Pages */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h3 className="font-semibold text-slate-900">
            Top Organic Landing Pages
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-5 py-3 text-xs font-medium text-slate-500">
                  Landing Page
                </th>
                <th className="text-right px-3 py-3 text-xs font-medium text-slate-500">
                  Sessions
                </th>
                <th className="text-right px-3 py-3 text-xs font-medium text-slate-500">
                  Users
                </th>
                <th className="text-right px-3 py-3 text-xs font-medium text-slate-500">
                  Bounce Rate
                </th>
                <th className="text-right px-5 py-3 text-xs font-medium text-slate-500">
                  Conversions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {data.topPages.map((p, i) => (
                <tr key={i} className="hover:bg-slate-25">
                  <td className="px-5 py-3 max-w-xs">
                    <span className="truncate block font-medium text-slate-900">
                      {p.landingPage || "/"}
                    </span>
                  </td>
                  <td className="text-right px-3 py-3 text-slate-700">
                    {p.sessions.toLocaleString()}
                  </td>
                  <td className="text-right px-3 py-3 text-slate-500">
                    {p.users.toLocaleString()}
                  </td>
                  <td className="text-right px-3 py-3 text-slate-500">
                    {p.bounceRate}%
                  </td>
                  <td className="text-right px-5 py-3 text-slate-700 font-medium">
                    {p.conversions}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
