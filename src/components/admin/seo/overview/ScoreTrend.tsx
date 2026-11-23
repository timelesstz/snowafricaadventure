"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip, YAxis } from "recharts";

interface Props {
  trend: Array<{ date: string; score: number }>;
  stroke: string;
}

export default function ScoreTrend({ trend, stroke }: Props) {
  if (trend.length < 2) {
    return (
      <div className="h-16 flex items-center justify-center rounded-md bg-slate-50 text-xs text-slate-500">
        Not enough history yet
      </div>
    );
  }
  return (
    <div className="h-16" role="img" aria-label={`Health score over ${trend.length} days, from ${trend[0].score} to ${trend[trend.length - 1].score}`}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={trend} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
          <YAxis hide domain={[0, 100]} />
          <Tooltip
            cursor={{ stroke: "#cbd5e1" }}
            contentStyle={{ fontSize: 12, borderRadius: 6, borderColor: "#e2e8f0" }}
            formatter={(v) => [v, "Score"]}
            labelFormatter={(_, p) => (p?.[0]?.payload as { date?: string } | undefined)?.date ?? ""}
          />
          <Area type="monotone" dataKey="score" stroke={stroke} fill={stroke} fillOpacity={0.12} strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
