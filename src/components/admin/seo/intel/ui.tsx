import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { clsx } from "clsx";
import type { ReactNode } from "react";

/** Server-safe building blocks shared by the SEO intelligence pages. */

// ─── Number formatting ───────────────────────────────────────────────────

export const fmtInt = (n: number) => Math.round(n).toLocaleString("en-GB");
export const fmtPct = (fraction: number, digits = 1) => `${(fraction * 100).toFixed(digits)}%`;
export const fmtPos = (p: number) => (p > 0 ? p.toFixed(1) : "—");
export const fmtDuration = (seconds: number) => {
  const s = Math.round(seconds);
  return s >= 60 ? `${Math.floor(s / 60)}m ${String(s % 60).padStart(2, "0")}s` : `${s}s`;
};

export function fmtDay(d: Date | string): string {
  const date = typeof d === "string" ? new Date(`${d.slice(0, 10)}T00:00:00Z`) : d;
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });
}

/** "21 Oct – 17 Nov" for [start, end). */
export function fmtWindow(start: Date, end: Date): string {
  return `${fmtDay(start)} – ${fmtDay(new Date(end.getTime() - 864e5))}`;
}

// ─── Layout ──────────────────────────────────────────────────────────────

export function PageIntro({ title, description, children }: { title: string; description: ReactNode; children?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3 mb-5">
      <div className="min-w-0 max-w-2xl">
        <h2 className="text-xl font-bold text-slate-900">{title}</h2>
        <p className="text-sm text-slate-600 mt-1">{description}</p>
      </div>
      {children && <div className="flex flex-wrap items-center gap-2">{children}</div>}
    </div>
  );
}

export function Panel({
  id,
  title,
  meta,
  action,
  children,
  className,
  flush = false,
}: {
  id: string;
  title: string;
  meta?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  /** Let tables run edge to edge. */
  flush?: boolean;
}) {
  return (
    <section aria-labelledby={id} className={clsx("bg-white rounded-lg border border-slate-200 shadow-sm", className)}>
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2 px-4 sm:px-5 pt-4 pb-3">
        <div className="min-w-0">
          <h3 id={id} className="text-base font-semibold text-slate-900">
            {title}
          </h3>
          {meta && <p className="text-sm text-slate-500 mt-0.5">{meta}</p>}
        </div>
        {action}
      </div>
      <div className={flush ? "" : "px-4 sm:px-5 pb-4"}>{children}</div>
    </section>
  );
}

export function EmptyState({ title, children, action }: { title: string; children?: ReactNode; action?: ReactNode }) {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center">
      <p className="text-sm font-semibold text-slate-800">{title}</p>
      {children && <p className="text-sm text-slate-600 mt-1 max-w-prose mx-auto">{children}</p>}
      {action && <div className="mt-3 flex justify-center">{action}</div>}
    </div>
  );
}

// ─── Controls ────────────────────────────────────────────────────────────

/** Link-based segmented control; keeps the other search params. */
export function SegmentLinks<T extends string | number>({
  label,
  param,
  options,
  value,
  basePath,
  params,
}: {
  label: string;
  param: string;
  options: ReadonlyArray<{ value: T; label: string }>;
  value: T;
  basePath: string;
  params: Record<string, string | undefined>;
}) {
  return (
    <nav aria-label={label} className="inline-flex rounded-md border border-slate-300 bg-white p-0.5">
      {options.map((o) => {
        const next = new URLSearchParams();
        for (const [k, v] of Object.entries(params)) if (v) next.set(k, v);
        next.set(param, String(o.value));
        const active = o.value === value;
        return (
          <Link
            key={String(o.value)}
            href={`${basePath}?${next.toString()}`}
            aria-current={active ? "page" : undefined}
            scroll={false}
            className={clsx(
              "min-h-9 px-3 inline-flex items-center rounded text-sm font-medium transition-colors",
              active ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            )}
          >
            {o.label}
          </Link>
        );
      })}
    </nav>
  );
}

// ─── KPIs ────────────────────────────────────────────────────────────────

export function Delta({
  value,
  suffix = "%",
  invert = false,
  digits = 0,
  label,
}: {
  value: number | null;
  suffix?: string;
  /** Lower is better (position, bounce rate). */
  invert?: boolean;
  digits?: number;
  label?: string;
}) {
  if (value === null || !Number.isFinite(value)) {
    return <span className="text-xs text-slate-400">no baseline</span>;
  }
  const flat = Math.abs(value) < Math.pow(10, -digits) / 2;
  const good = invert ? value < 0 : value > 0;
  const Icon = flat ? Minus : value > 0 ? ArrowUpRight : ArrowDownRight;
  const text = `${value > 0 ? "+" : ""}${value.toFixed(digits)}${suffix}`;
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-0.5 text-xs font-semibold tabular-nums",
        flat ? "text-slate-500" : good ? "text-emerald-700" : "text-red-700"
      )}
    >
      <Icon className="w-3.5 h-3.5" aria-hidden="true" />
      {text}
      {label && <span className="sr-only"> {label}</span>}
    </span>
  );
}

export function Kpi({
  label,
  value,
  delta,
  hint,
}: {
  label: string;
  value: string;
  delta?: ReactNode;
  hint?: string;
}) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-4">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="text-2xl font-bold text-slate-900 tabular-nums mt-1">{value}</p>
      <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 min-h-4">
        {delta}
        {hint && <span className="text-xs text-slate-500">{hint}</span>}
      </div>
    </div>
  );
}

export function Pill({
  tone = "slate",
  children,
}: {
  tone?: "slate" | "red" | "amber" | "emerald" | "sky" | "violet";
  children: ReactNode;
}) {
  const tones = {
    slate: "bg-slate-100 text-slate-700",
    red: "bg-red-50 text-red-700 ring-red-200",
    amber: "bg-amber-50 text-amber-800 ring-amber-200",
    emerald: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    sky: "bg-sky-50 text-sky-700 ring-sky-200",
    violet: "bg-violet-50 text-violet-700 ring-violet-200",
  };
  return (
    <span className={clsx("inline-flex items-center rounded px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset ring-transparent whitespace-nowrap", tones[tone])}>
      {children}
    </span>
  );
}

export function ScoreBadge({ score }: { score: number }) {
  const tone = score >= 80 ? "emerald" : score >= 60 ? "sky" : score >= 40 ? "amber" : "red";
  return (
    <Pill tone={tone}>
      <span className="tabular-nums">{score}</span>
      <span className="sr-only"> out of 100</span>
    </Pill>
  );
}

/** Horizontal scroll wrapper for wide tables, keyboard-focusable. */
export function TableScroll({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="overflow-x-auto" role="region" aria-label={label} tabIndex={0}>
      {children}
    </div>
  );
}

export const th = "px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 whitespace-nowrap";
export const thNum = "px-4 py-2.5 text-right text-xs font-semibold uppercase tracking-wide text-slate-500 whitespace-nowrap";
export const td = "px-4 py-3 text-sm text-slate-700 align-top";
export const tdNum = "px-4 py-3 text-sm text-slate-700 text-right tabular-nums align-top whitespace-nowrap";
