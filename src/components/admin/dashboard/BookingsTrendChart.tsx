"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface TrendPoint {
  date: string;
  count: number;
  revenue: number;
}

interface Props {
  data: TrendPoint[];
}

export function BookingsTrendChart({ data }: Props) {
  return (
    <div className="h-48">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
          <defs>
            <linearGradient id="bookingsFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d97706" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#d97706" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10, fill: "#64748b" }}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fontSize: 10, fill: "#64748b" }}
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
            width={28}
          />
          <Tooltip
            contentStyle={{
              fontSize: 12,
              borderRadius: 8,
              border: "1px solid #e2e8f0",
            }}
            formatter={(value: number | undefined, name: string | undefined) =>
              name === "count"
                ? [`${value ?? 0} bookings`, "Bookings"]
                : [`$${Number(value ?? 0).toLocaleString()}`, "Revenue"]
            }
          />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#d97706"
            strokeWidth={2}
            fill="url(#bookingsFill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
