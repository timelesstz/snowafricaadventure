"use client";

import { ArrowUp, ArrowDown, Minus } from "lucide-react";
import { clsx } from "clsx";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: number; // percentage change
  trendLabel?: string;
  sparklineData?: Array<{ value: number }>;
  invertTrend?: boolean; // for position, lower is better
}

export default function MetricCard({
  title,
  value,
  trend,
  trendLabel,
  sparklineData,
  invertTrend = false,
}: MetricCardProps) {
  const isPositive = invertTrend ? (trend || 0) > 0 : (trend || 0) > 0;
  const isNegative = invertTrend ? (trend || 0) < 0 : (trend || 0) < 0;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <p className="text-sm text-slate-500 font-medium">{title}</p>
      <div className="flex items-end justify-between mt-2">
        <div>
          <p className="text-2xl font-bold text-slate-900">{value}</p>
          {trend !== undefined && (
            <div className="flex items-center gap-1 mt-1">
              {isPositive ? (
                <ArrowUp className="w-3.5 h-3.5 text-green-500" />
              ) : isNegative ? (
                <ArrowDown className="w-3.5 h-3.5 text-red-500" />
              ) : (
                <Minus className="w-3.5 h-3.5 text-slate-400" />
              )}
              <span
                className={clsx(
                  "text-xs font-medium",
                  isPositive
                    ? "text-green-600"
                    : isNegative
                    ? "text-red-600"
                    : "text-slate-500"
                )}
              >
                {Math.abs(trend).toFixed(1)}%
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
                  stroke={isPositive ? "#22c55e" : isNegative ? "#ef4444" : "#94a3b8"}
                  fill={isPositive ? "#dcfce7" : isNegative ? "#fef2f2" : "#f1f5f9"}
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
