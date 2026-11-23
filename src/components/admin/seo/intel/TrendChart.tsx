"use client";

import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export interface TrendSeries {
  key: string;
  label: string;
  color: string;
  /** Plot on a right-hand axis (e.g. position next to clicks). */
  right?: boolean;
  /** Lower is better; flips the axis. */
  reversed?: boolean;
  format?: "int" | "pct" | "pos";
}

interface Props {
  data: Array<Record<string, number | string>>;
  series: TrendSeries[];
  /** Accessible summary of what the chart shows. */
  summary: string;
  variant?: "line" | "area";
  height?: number;
}

const fmt = (v: number, f: TrendSeries["format"]) =>
  f === "pct" ? `${(v * 100).toFixed(1)}%` : f === "pos" ? v.toFixed(1) : Math.round(v).toLocaleString("en-GB");

const day = (d: string) =>
  new Date(`${d}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });

export default function TrendChart({ data, series, summary, variant = "line", height = 240 }: Props) {
  const hasRight = series.some((s) => s.right);
  const rightReversed = series.some((s) => s.right && s.reversed);
  const Chart = variant === "area" ? AreaChart : LineChart;

  return (
    <figure>
      <figcaption className="sr-only">{summary}</figcaption>
      <div style={{ height }} aria-hidden="true">
        <ResponsiveContainer width="100%" height="100%">
          <Chart data={data} margin={{ top: 8, right: hasRight ? 4 : 12, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" tickFormatter={day} tick={{ fontSize: 11, fill: "#64748b" }} minTickGap={24} tickLine={false} axisLine={false} />
            <YAxis yAxisId="left" tick={{ fontSize: 11, fill: "#64748b" }} width={44} tickLine={false} axisLine={false} />
            {hasRight && (
              <YAxis
                yAxisId="right"
                orientation="right"
                reversed={rightReversed}
                tick={{ fontSize: 11, fill: "#64748b" }}
                width={36}
                tickLine={false}
                axisLine={false}
              />
            )}
            <Tooltip
              labelFormatter={(l) => day(String(l))}
              formatter={(value, name) => {
                const s = series.find((x) => x.key === name || x.label === name);
                return [fmt(Number(value), s?.format), s?.label ?? String(name)];
              }}
              contentStyle={{ fontSize: 12, borderRadius: 6, borderColor: "#cbd5e1" }}
            />
            {series.map((s) =>
              variant === "area" && !s.right ? (
                <Area
                  key={s.key}
                  yAxisId="left"
                  type="monotone"
                  dataKey={s.key}
                  name={s.label}
                  stroke={s.color}
                  fill={s.color}
                  fillOpacity={0.12}
                  strokeWidth={2}
                  dot={false}
                />
              ) : (
                <Line
                  key={s.key}
                  yAxisId={s.right ? "right" : "left"}
                  type="monotone"
                  dataKey={s.key}
                  name={s.label}
                  stroke={s.color}
                  strokeWidth={2}
                  strokeDasharray={s.right ? "4 3" : undefined}
                  dot={false}
                />
              )
            )}
          </Chart>
        </ResponsiveContainer>
      </div>
      <ul className="flex flex-wrap gap-x-4 gap-y-1 mt-2" aria-hidden="true">
        {series.map((s) => (
          <li key={s.key} className="flex items-center gap-1.5 text-xs text-slate-600">
            <span className="w-3 h-0.5 rounded" style={{ background: s.color }} />
            {s.label}
            {s.reversed ? " (lower is better)" : ""}
          </li>
        ))}
      </ul>
    </figure>
  );
}
