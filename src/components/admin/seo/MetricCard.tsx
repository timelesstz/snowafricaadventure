"use client";

import { ArrowUp, ArrowDown, Minus } from "lucide-react";
import { clsx } from "clsx";
import { ResponsiveContainer, AreaChart, Area } from "recharts";

interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: number; // percentage change (or absolute, for position)
  trendLabel?: string;
  sparklineData?: Array<{ value: number }>;
  /** For metrics where lower is better (e.g. avg position). */
  invertTrend?: boolean;
}

export default function MetricCard({
  title,
  value,
  trend,
  trendLabel,
  sparklineData,
  invertTrend = false,
}: MetricCardProps) {
  const t = trend ?? 0;
  // For inverted metrics (position), down arrows are good news.
  const isGood = invertTrend ? t < 0 : t > 0;
  const isBad = invertTrend ? t > 0 : t < 0;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <p className="text-sm text-slate-500 font-medium">{title}</p>
      <div className="flex items-end justify-between mt-2">
        <div>
          <p className="text-2xl font-bold text-slate-900">{value}</p>
          {trend !== undefined && (
            <div className="flex items-center gap-1 mt-1">
              {t > 0 ? (
                <ArrowUp
                  className={clsx(
                    "w-3.5 h-3.5",
                    isGood ? "text-green-500" : "text-red-500"
                  )}
                />
              ) : t < 0 ? (
                <ArrowDown
                  className={clsx(
                    "w-3.5 h-3.5",
                    isGood ? "text-green-500" : "text-red-500"
                  )}
                />
              ) : (
                <Minus className="w-3.5 h-3.5 text-slate-400" />
              )}
              <span
                className={clsx(
                  "text-xs font-medium",
                  isGood
                    ? "text-green-600"
                    : isBad
                    ? "text-red-600"
                    : "text-slate-500"
                )}
              >
                {Math.abs(t).toFixed(1)}
                {invertTrend ? "" : "%"}
              </span>
              {trendLabel && (
                <span className="text-xs text-slate-400">{trendLabel}</span>
              )}
            </div>
          )}
        </div>
        {sparklineData && sparklineData.length > 1 && (
          <div className="w-20 h-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparklineData}>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={isGood ? "#22c55e" : isBad ? "#ef4444" : "#94a3b8"}
                  fill={isGood ? "#dcfce7" : isBad ? "#fef2f2" : "#f1f5f9"}
                  strokeWidth={1.5}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
