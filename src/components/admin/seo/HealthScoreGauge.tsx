"use client";

import { clsx } from "clsx";
import { ResponsiveContainer, AreaChart, Area } from "recharts";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";

interface HealthScoreComponent {
  key: string;
  label: string;
  score: number | null;
  weight: number;
  effectiveWeight: number;
}

interface HealthScoreGaugeProps {
  score: number; // 0-100
  /** Optional 30-day score history for the sparkline. */
  trend?: Array<{ date: string; score: number }>;
  /** Score delta vs the start of the trend window. */
  delta?: number | null;
  /** Per-component breakdown, shown on hover. */
  components?: HealthScoreComponent[];
}

function bandColor(score: number) {
  if (score >= 80)
    return {
      text: "text-green-600",
      bg: "bg-green-100",
      stroke: "#16a34a",
      fill: "#dcfce7",
      label: "Excellent",
    };
  if (score >= 60)
    return {
      text: "text-amber-600",
      bg: "bg-amber-100",
      stroke: "#d97706",
      fill: "#fef3c7",
      label: "Good",
    };
  if (score >= 40)
    return {
      text: "text-orange-600",
      bg: "bg-orange-100",
      stroke: "#ea580c",
      fill: "#ffedd5",
      label: "Needs Work",
    };
  return {
    text: "text-red-600",
    bg: "bg-red-100",
    stroke: "#dc2626",
    fill: "#fee2e2",
    label: "Poor",
  };
}

export default function HealthScoreGauge({
  score,
  trend,
  delta,
  components,
}: HealthScoreGaugeProps) {
  const color = bandColor(score);
  const radius = 54;
  const circumference = Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const breakdownTooltip = components?.length
    ? components
        .map((c) =>
          c.score === null
            ? `${c.label}: no data`
            : `${c.label}: ${c.score} (${c.effectiveWeight}% weight)`
        )
        .join(" · ")
    : undefined;

  return (
    <div className="flex items-start gap-6">
      <div className="flex flex-col items-center" title={breakdownTooltip}>
        <div className="relative w-36 h-20">
          <svg viewBox="0 0 120 66" className="w-full h-full">
            <path
              d="M 6 60 A 54 54 0 0 1 114 60"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              d="M 6 60 A 54 54 0 0 1 114 60"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${circumference}`}
              strokeDashoffset={offset}
              className={color.text}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-0">
            <span className={clsx("text-3xl font-bold", color.text)}>{score}</span>
          </div>
        </div>
        <span
          className={clsx(
            "text-sm font-medium mt-1 px-3 py-0.5 rounded-full",
            color.bg,
            color.text
          )}
        >
          {color.label}
        </span>
      </div>

      {trend && trend.length > 1 && (
        <div className="flex flex-col gap-1 pt-2">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium text-slate-500">
              30-day trend
            </span>
            {delta !== null && delta !== undefined && (
              <span
                className={clsx(
                  "inline-flex items-center gap-0.5 text-xs font-semibold",
                  delta > 0
                    ? "text-green-600"
                    : delta < 0
                    ? "text-red-600"
                    : "text-slate-500"
                )}
              >
                {delta > 0 ? (
                  <ArrowUp className="w-3 h-3" />
                ) : delta < 0 ? (
                  <ArrowDown className="w-3 h-3" />
                ) : (
                  <Minus className="w-3 h-3" />
                )}
                {delta > 0 ? "+" : ""}
                {delta}
              </span>
            )}
          </div>
          <div className="w-32 h-12">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trend}>
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke={color.stroke}
                  fill={color.fill}
                  strokeWidth={1.5}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
