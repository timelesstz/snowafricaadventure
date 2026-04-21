import { TrendingUp, AlertCircle, AlertTriangle, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import type { AggregateSeoResult } from "@/lib/seo-score";

/**
 * A compact summary tile for the top of an admin list page.
 * Shows average score, band distribution, and the top 3 failure labels so
 * editors can triage without scrolling the list.
 */
export function SeoSummaryCard({
  aggregate,
  healthHref = "/admin/seo/content-health",
}: {
  aggregate: AggregateSeoResult;
  healthHref?: string;
}) {
  if (aggregate.count === 0) return null;

  const { average, bands, topFailures } = aggregate;
  const barColor =
    average >= 85
      ? "bg-emerald-500"
      : average >= 65
        ? "bg-lime-500"
        : average >= 40
          ? "bg-amber-500"
          : "bg-red-500";
  const needsAttention = bands["needs-work"] + bands.poor;

  return (
    <div className="bg-gradient-to-br from-slate-50 to-white rounded-lg shadow-sm border border-slate-200 p-4">
      <div className="flex items-start justify-between gap-6 flex-wrap">
        {/* Left: average score */}
        <div className="flex items-center gap-4 min-w-[180px]">
          <div className="relative w-16 h-16 shrink-0">
            <svg viewBox="0 0 36 36" className="w-16 h-16 -rotate-90">
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-slate-200"
              />
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray={`${(average / 100) * 100.5} 100.5`}
                strokeLinecap="round"
                className={
                  average >= 85
                    ? "text-emerald-500"
                    : average >= 65
                      ? "text-lime-500"
                      : average >= 40
                        ? "text-amber-500"
                        : "text-red-500"
                }
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-slate-900">
              {average}
            </div>
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider">Average SEO</p>
            <p className="text-sm font-medium text-slate-700 mt-0.5">
              across {aggregate.count} item{aggregate.count === 1 ? "" : "s"}
            </p>
            <div className="mt-2 h-1.5 w-36 bg-slate-200 rounded-full overflow-hidden">
              <div className={`h-full ${barColor}`} style={{ width: `${average}%` }} />
            </div>
          </div>
        </div>

        {/* Middle: band counts */}
        <div className="flex items-center gap-3 flex-wrap text-sm">
          <BandPill
            icon={CheckCircle2}
            color="emerald"
            label="Excellent"
            count={bands.excellent}
          />
          <BandPill icon={TrendingUp} color="lime" label="Good" count={bands.good} />
          <BandPill
            icon={AlertTriangle}
            color="amber"
            label="Needs work"
            count={bands["needs-work"]}
          />
          <BandPill icon={AlertCircle} color="red" label="Poor" count={bands.poor} />
        </div>

        {/* Right: top failures */}
        {topFailures.length > 0 && (
          <div className="min-w-[220px]">
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
              Most common gaps
            </p>
            <ul className="space-y-0.5">
              {topFailures.slice(0, 3).map((f) => (
                <li key={f.label} className="text-xs text-slate-700 flex justify-between gap-3">
                  <span className="truncate">{f.label}</span>
                  <span className="text-red-600 font-semibold shrink-0">
                    {f.count}×
                  </span>
                </li>
              ))}
            </ul>
            {needsAttention > 0 && healthHref && (
              <Link
                href={healthHref}
                className="inline-block mt-2 text-xs font-medium text-amber-700 hover:text-amber-800"
              >
                Open SEO backlog →
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function BandPill({
  icon: Icon,
  color,
  label,
  count,
}: {
  icon: typeof TrendingUp;
  color: "emerald" | "lime" | "amber" | "red";
  label: string;
  count: number;
}) {
  const styles = {
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
    lime: "bg-lime-50 text-lime-700 border-lime-200",
    amber: "bg-amber-50 text-amber-700 border-amber-200",
    red: "bg-red-50 text-red-700 border-red-200",
  }[color];
  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-medium ${styles} ${count === 0 ? "opacity-50" : ""}`}>
      <Icon className="w-3.5 h-3.5" aria-hidden="true" />
      <span>{label}</span>
      <span className="font-bold">{count}</span>
    </div>
  );
}
