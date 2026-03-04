"use client";

import { clsx } from "clsx";

interface HealthScoreGaugeProps {
  score: number; // 0-100
}

export default function HealthScoreGauge({ score }: HealthScoreGaugeProps) {
  const getColor = () => {
    if (score >= 80) return { text: "text-green-600", bg: "bg-green-100", ring: "ring-green-500", label: "Excellent" };
    if (score >= 60) return { text: "text-amber-600", bg: "bg-amber-100", ring: "ring-amber-500", label: "Good" };
    if (score >= 40) return { text: "text-orange-600", bg: "bg-orange-100", ring: "ring-orange-500", label: "Needs Work" };
    return { text: "text-red-600", bg: "bg-red-100", ring: "ring-red-500", label: "Poor" };
  };

  const color = getColor();
  // SVG arc for gauge
  const radius = 54;
  const circumference = Math.PI * radius; // half circle
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-36 h-20">
        <svg viewBox="0 0 120 66" className="w-full h-full">
          {/* Background arc */}
          <path
            d="M 6 60 A 54 54 0 0 1 114 60"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Score arc */}
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
      <span className={clsx("text-sm font-medium mt-1 px-3 py-0.5 rounded-full", color.bg, color.text)}>
        {color.label}
      </span>
    </div>
  );
}
