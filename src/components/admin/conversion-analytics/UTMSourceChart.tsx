"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface UTMRow {
  utmSource: string | null;
  _count: { id: number };
}

interface UTMSourceChartProps {
  data: UTMRow[];
  title?: string;
}

export default function UTMSourceChart({
  data,
  title = "Traffic Sources (UTM)",
}: UTMSourceChartProps) {
  const chartData = data
    .filter((row) => row.utmSource)
    .map((row) => ({
      source: row.utmSource || "Direct",
      count: row._count.id,
    }));

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <h3 className="text-sm font-semibold text-slate-700 mb-4">{title}</h3>
      {chartData.length > 0 ? (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 12 }} />
              <YAxis
                dataKey="source"
                type="category"
                tick={{ fontSize: 12 }}
                width={100}
              />
              <Tooltip />
              <Bar
                dataKey="count"
                fill="#f59e0b"
                radius={[0, 4, 4, 0]}
                name="Count"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-64 flex items-center justify-center text-slate-400 text-sm">
          No UTM data captured yet. UTM tracking starts when visitors arrive via links with utm_source parameters.
        </div>
      )}
    </div>
  );
}
