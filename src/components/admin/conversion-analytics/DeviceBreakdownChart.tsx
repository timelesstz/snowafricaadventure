"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { Monitor, Smartphone, Tablet } from "lucide-react";

interface DeviceRow {
  device: string | null;
  _count: { id: number };
}

interface DeviceBreakdownChartProps {
  data: DeviceRow[];
  title?: string;
}

const DEVICE_COLORS: Record<string, string> = {
  desktop: "#3b82f6",
  mobile: "#f59e0b",
  tablet: "#10b981",
  Unknown: "#94a3b8",
};

const DEVICE_ICONS: Record<string, typeof Monitor> = {
  desktop: Monitor,
  mobile: Smartphone,
  tablet: Tablet,
};

export default function DeviceBreakdownChart({
  data,
  title = "Device Breakdown",
}: DeviceBreakdownChartProps) {
  const total = data.reduce((sum, row) => sum + row._count.id, 0);

  const chartData = data.map((row) => ({
    name: row.device || "Unknown",
    value: row._count.id,
    percentage: total > 0 ? ((row._count.id / total) * 100).toFixed(1) : "0",
  }));

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <h3 className="text-sm font-semibold text-slate-700 mb-4">{title}</h3>
      {chartData.length > 0 ? (
        <>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={75}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {chartData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={DEVICE_COLORS[entry.name] || DEVICE_COLORS.Unknown}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-4 mt-3 justify-center">
            {chartData.map((entry) => {
              const Icon = DEVICE_ICONS[entry.name] || Monitor;
              return (
                <div key={entry.name} className="flex items-center gap-2 text-sm">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor:
                        DEVICE_COLORS[entry.name] || DEVICE_COLORS.Unknown,
                    }}
                  />
                  <Icon className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-slate-600 capitalize">{entry.name}</span>
                  <span className="text-slate-400">{entry.percentage}%</span>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="h-48 flex items-center justify-center text-slate-400 text-sm">
          No data available yet
        </div>
      )}
    </div>
  );
}
