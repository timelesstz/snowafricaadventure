"use client";

import { useState } from "react";
import Link from "next/link";
import { clsx } from "clsx";
import {
  ArrowRight,
  CheckCircle2,
  Database,
  FileText,
  Link2Off,
  Code2,
  TrendingUp,
} from "lucide-react";
import type { SeoAction, ActionCategory, ActionSeverity } from "@/lib/seo-action-queue";

const CATEGORY_ICON: Record<ActionCategory, typeof Database> = {
  data: Database,
  errors: Link2Off,
  rankings: TrendingUp,
  content: FileText,
  technical: Code2,
};

const SEVERITY: Record<ActionSeverity, { label: string; chip: string; rail: string }> = {
  high: { label: "Fix now", chip: "bg-red-50 text-red-700 ring-red-200", rail: "bg-red-500" },
  medium: { label: "This week", chip: "bg-amber-50 text-amber-800 ring-amber-200", rail: "bg-amber-500" },
  low: { label: "When you can", chip: "bg-slate-100 text-slate-600 ring-slate-200", rail: "bg-slate-300" },
};

const INITIAL = 6;

export default function ActionQueue({ actions }: { actions: SeoAction[] }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? actions : actions.slice(0, INITIAL);
  const counts = actions.reduce(
    (acc, a) => ({ ...acc, [a.severity]: acc[a.severity] + 1 }),
    { high: 0, medium: 0, low: 0 } as Record<ActionSeverity, number>
  );

  return (
    <section
      aria-labelledby="seo-actions-heading"
      className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden"
    >
      <div className="px-4 sm:px-5 py-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 id="seo-actions-heading" className="text-h3 text-slate-900">
            Fix next
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Ranked by urgency, then by the traffic at stake
          </p>
        </div>
        {actions.length > 0 && (
          <p className="text-xs text-slate-500 tabular-nums">
            {counts.high > 0 && <span className="text-red-700 font-semibold">{counts.high} now</span>}
            {counts.high > 0 && (counts.medium > 0 || counts.low > 0) && " · "}
            {counts.medium > 0 && <span className="text-amber-800 font-semibold">{counts.medium} this week</span>}
            {counts.medium > 0 && counts.low > 0 && " · "}
            {counts.low > 0 && <span>{counts.low} later</span>}
          </p>
        )}
      </div>

      {actions.length === 0 ? (
        <div className="px-5 py-10 text-center">
          <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" aria-hidden="true" />
          <p className="mt-2 font-medium text-slate-900">Nothing needs fixing right now</p>
          <p className="text-sm text-slate-500 mt-1">
            Syncs are current, content scores well and no 404s are getting traffic.
          </p>
        </div>
      ) : (
        <ol className="divide-y divide-slate-100">
          {visible.map((a) => {
            const Icon = CATEGORY_ICON[a.category];
            const sev = SEVERITY[a.severity];
            return (
              <li key={a.id} className="relative">
                <span className={clsx("absolute left-0 top-0 bottom-0 w-1", sev.rail)} aria-hidden="true" />
                <Link
                  href={a.href}
                  className="group flex gap-3 pl-5 pr-4 sm:pr-5 py-3.5 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-amber-400"
                >
                  <Icon className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" aria-hidden="true" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span className="font-medium text-slate-900 break-words">{a.title}</span>
                      <span className={clsx("text-[11px] font-semibold px-1.5 py-0.5 rounded ring-1 ring-inset", sev.chip)}>
                        {sev.label}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mt-0.5 break-words">{a.detail}</p>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1 self-center text-sm font-medium text-amber-700 group-hover:text-amber-800 shrink-0">
                    {a.cta}
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      )}

      {actions.length > INITIAL && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="w-full px-5 py-3 text-sm font-medium text-amber-700 hover:bg-slate-50 border-t border-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-amber-400"
        >
          {expanded ? "Show fewer" : `Show all ${actions.length}`}
        </button>
      )}
    </section>
  );
}
