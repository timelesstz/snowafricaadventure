"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

interface BrowserRow {
  browser: string | null;
  _count: { id: number };
}

interface BrowserChartProps {
  data: BrowserRow[];
  title?: string;
}

const BROWSER_COLORS: Record<string, string> = {
  Chrome: "#4285F4",
  Safari: "#000000",
  Firefox: "#FF7139",
  Edge: "#0078D7",
  Opera: "#FF1B2D",
  Unknown: "#94a3b8",
};

export default function BrowserChart({
  data,
  title = "Browser Distribution",
}: BrowserChartProps) {
  const chartData = data.map((row) => ({
    browser: row.browser || "Unknown",
    count: row._count.id,
    fill: BROWSER_COLORS[row.browser || "Unknown"] || BROWSER_COLORS.Unknown,
  }));

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <h3 className="text-sm font-semibold text-slate-700 mb-4">{title}</h3>
      {chartData.length > 0 ? (
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="browser" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="count" radius={[4, 4, 0, 0]} name="Count">
                {chartData.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-48 flex items-center justify-center text-slate-400 text-sm">
          No browser data yet
        </div>
      )}
    </div>
  );
}
