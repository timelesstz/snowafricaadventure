import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { clsx } from "clsx";
import type { SeoOverviewData } from "@/lib/seo-overview";
import { bandFor } from "./format";
import ScoreTrend from "./ScoreTrend";

interface Props {
  health: SeoOverviewData["health"];
  issueTotal: number;
  periodLabel: string | null;
}

const RADIUS = 52;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function HealthHero({ health, issueTotal, periodLabel }: Props) {
  const band = bandFor(health.score);
  const dash = (health.score / 100) * CIRCUMFERENCE;
  const delta = health.delta;

  return (
    <section
      aria-labelledby="seo-health-heading"
      className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 sm:p-6"
    >
      <div className="grid gap-6 md:grid-cols-[auto_1fr] md:items-center">
        <div className="flex items-center gap-5">
          <div className="relative w-28 h-28 shrink-0">
            <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90" aria-hidden="true">
              <circle cx="60" cy="60" r={RADIUS} fill="none" stroke="#e2e8f0" strokeWidth="10" />
              <circle
                cx="60"
                cy="60"
                r={RADIUS}
                fill="none"
                stroke={band.stroke}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${dash} ${CIRCUMFERENCE}`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-slate-900 tabular-nums leading-none">
                {health.score}
              </span>
              <span className="text-[11px] text-slate-500 mt-1">of 100</span>
            </div>
          </div>
          <div className="min-w-0">
            <h2 id="seo-health-heading" className="text-sm font-medium text-slate-500">
              SEO health
            </h2>
            <p className={clsx("text-xl font-semibold mt-0.5", band.text)}>{band.label}</p>
            <p className="text-sm text-slate-600 mt-1 flex items-center gap-1 flex-wrap">
              {delta === null ? (
                <span>Trend appears after a week of daily snapshots</span>
              ) : (
                <>
                  <span
                    className={clsx(
                      "inline-flex items-center gap-0.5 font-semibold tabular-nums",
                      delta > 0 ? "text-emerald-700" : delta < 0 ? "text-red-700" : "text-slate-600"
                    )}
                  >
                    {delta > 0 ? (
                      <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
                    ) : delta < 0 ? (
                      <ArrowDown className="w-3.5 h-3.5" aria-hidden="true" />
                    ) : (
                      <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                    )}
                    {delta > 0 ? "+" : ""}
                    {delta}
                  </span>
                  <span>since {health.trend[0]?.date ?? "last month"}</span>
                </>
              )}
            </p>
            <p className="text-sm text-slate-600 mt-0.5">
              <span className="font-semibold text-slate-900 tabular-nums">{issueTotal}</span> open
              issue{issueTotal === 1 ? "" : "s"}
            </p>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_minmax(0,14rem)] lg:items-end">
          <dl className="space-y-2.5">
            {health.components.map((c) => (
              <div key={c.key} className="grid grid-cols-[minmax(0,9rem)_1fr_auto] items-center gap-3 text-sm">
                <dt className="text-slate-600 truncate">{c.label}</dt>
                <div
                  className="h-2 rounded-full bg-slate-100 overflow-hidden"
                  role="img"
                  aria-label={c.score === null ? `${c.label}: no data` : `${c.label}: ${c.score} of 100`}
                >
                  {c.score !== null && (
                    <div className={clsx("h-full rounded-full", bandFor(c.score).bar)} style={{ width: `${c.score}%` }} />
                  )}
                </div>
                <dd className="tabular-nums text-right w-20">
                  {c.score === null ? (
                    <span className="text-slate-400">no data</span>
                  ) : (
                    <>
                      <span className="font-semibold text-slate-900">{c.score}</span>
                      <span className="text-slate-400 text-xs"> · {c.effectiveWeight}%</span>
                    </>
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <div className="hidden lg:block">
            <ScoreTrend trend={health.trend} stroke={band.stroke} />
            {periodLabel && (
              <p className="text-xs text-slate-500 mt-1 text-right">Search data {periodLabel}</p>
            )}
          </div>
        </div>
      </div>
      {periodLabel && (
        <p className="lg:hidden text-xs text-slate-500 mt-4">Search data {periodLabel}</p>
      )}
    </section>
  );
}
