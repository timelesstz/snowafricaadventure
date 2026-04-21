"use client";

import { useState } from "react";
import { TrendingUp, AlertCircle, AlertTriangle, CheckCircle2, ChevronDown } from "lucide-react";
import type { SeoScoreResult, SeoCheck } from "@/lib/seo-score";

const BAND_STYLES: Record<
  SeoScoreResult["band"],
  { bar: string; text: string; icon: typeof TrendingUp; label: string }
> = {
  excellent: {
    bar: "bg-emerald-500",
    text: "text-emerald-700 bg-emerald-50 border-emerald-200",
    icon: CheckCircle2,
    label: "Excellent",
  },
  good: {
    bar: "bg-lime-500",
    text: "text-lime-700 bg-lime-50 border-lime-200",
    icon: TrendingUp,
    label: "Good",
  },
  "needs-work": {
    bar: "bg-amber-500",
    text: "text-amber-700 bg-amber-50 border-amber-200",
    icon: AlertTriangle,
    label: "Needs work",
  },
  poor: {
    bar: "bg-red-500",
    text: "text-red-700 bg-red-50 border-red-200",
    icon: AlertCircle,
    label: "Poor",
  },
};

function CheckRow({ check }: { check: SeoCheck }) {
  const statusStyles = {
    ok: "text-emerald-600",
    warn: "text-amber-600",
    fail: "text-red-600",
  };
  const statusIcons = {
    ok: CheckCircle2,
    warn: AlertTriangle,
    fail: AlertCircle,
  };
  const Icon = statusIcons[check.status];
  return (
    <li className="flex items-start gap-2 py-1 text-xs">
      <Icon className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${statusStyles[check.status]}`} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className="text-slate-700">{check.label}</span>
          <span className="text-slate-400">{check.weight ? `${check.weight}pt` : "tip"}</span>
        </div>
        {check.detail && <p className="text-slate-500 mt-0.5">{check.detail}</p>}
      </div>
    </li>
  );
}

export function SeoScoreBadge({
  result,
  editHref,
}: {
  result: SeoScoreResult;
  editHref?: string;
}) {
  const [open, setOpen] = useState(false);
  const { score, band, checks, failures } = result;
  const style = BAND_STYLES[band];
  const Icon = style.icon;

  return (
    <div className="mt-3 border-t border-slate-100 pt-3">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded"
      >
        <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-xs font-semibold ${style.text}`}>
          <Icon className="w-3.5 h-3.5" aria-hidden="true" />
          SEO {score}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-600">{style.label}</span>
            {failures > 0 && (
              <span className="text-xs text-red-600">
                · {failures} missing
              </span>
            )}
          </div>
          <div className="mt-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full ${style.bar} transition-all`}
              style={{ width: `${score}%` }}
            />
          </div>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div className="mt-3 bg-slate-50 rounded-lg p-3">
          <ul className="divide-y divide-slate-200/60">
            {checks.map((check, i) => (
              <CheckRow key={i} check={check} />
            ))}
          </ul>
          {editHref && (
            <a
              href={editHref}
              className="block mt-3 text-center text-xs font-medium text-amber-700 hover:text-amber-800 py-1.5 border-t border-slate-200/60"
            >
              Fix in editor →
            </a>
          )}
        </div>
      )}
    </div>
  );
}
