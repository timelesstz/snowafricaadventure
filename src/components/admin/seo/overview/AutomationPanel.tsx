"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AdminRole } from "@prisma/client";
import { clsx } from "clsx";
import { BellRing, Loader2, Play } from "lucide-react";
import { PermissionGate } from "@/components/admin/PermissionGate";
import type { AutomationKey, AutomationStatus, RecentSeoAlert } from "@/lib/seo-automation/status";

export interface AutomationRow extends AutomationStatus {
  /** Pre-formatted on the server, e.g. "3h ago". */
  lastRunLabel: string | null;
}

export interface AlertRow extends RecentSeoAlert {
  createdLabel: string;
}

interface Props {
  automations: AutomationRow[];
  recentAlerts: AlertRow[];
  schedule: string;
}

const STATE: Record<AutomationStatus["state"], { dot: string; label: string }> = {
  ok: { dot: "bg-emerald-500", label: "Healthy" },
  failed: { dot: "bg-red-500", label: "Failed" },
  running: { dot: "bg-sky-500 animate-pulse", label: "Running" },
  never: { dot: "bg-slate-300", label: "Not run yet" },
};

const PRIORITY_DOT: Record<RecentSeoAlert["priority"], string> = {
  URGENT: "bg-red-600",
  HIGH: "bg-red-400",
  NORMAL: "bg-amber-400",
  LOW: "bg-slate-300",
};

export default function AutomationPanel({ automations, recentAlerts, schedule }: Props) {
  const router = useRouter();
  const [running, setRunning] = useState<AutomationKey | null>(null);
  const [status, setStatus] = useState<{ tone: "ok" | "error"; text: string } | null>(null);
  const [, startTransition] = useTransition();

  async function run(key: AutomationKey) {
    setRunning(key);
    setStatus(null);
    try {
      const res = await fetch("/api/admin/seo/automations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: key }),
      });
      const data = (await res.json().catch(() => ({}))) as { message?: string; error?: string };
      if (!res.ok) {
        setStatus({ tone: "error", text: data.error ?? `Failed (HTTP ${res.status})` });
      } else {
        setStatus({ tone: "ok", text: data.message ?? "Done." });
        startTransition(() => router.refresh());
      }
    } catch {
      setStatus({ tone: "error", text: "Could not reach the server. Check your connection and try again." });
    } finally {
      setRunning(null);
    }
  }

  return (
    <section
      aria-labelledby="seo-automation-heading"
      className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden"
    >
      <div className="px-4 sm:px-5 py-4 border-b border-slate-200">
        <h2 id="seo-automation-heading" className="text-h3 text-slate-900">
          Automations
        </h2>
        <p className="text-sm text-slate-500 mt-0.5">{schedule}</p>
      </div>

      <ul className="divide-y divide-slate-100">
        {automations.map((a) => {
          const st = STATE[a.state];
          return (
            <li key={a.key} className="px-4 sm:px-5 py-3 flex items-start gap-3">
              <span className={clsx("mt-1.5 w-2 h-2 rounded-full shrink-0", st.dot)} aria-hidden="true" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-900">
                  {a.label}
                  <span className="sr-only">: {st.label}</span>
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {a.lastRunLabel ? `Last run ${a.lastRunLabel}` : st.label}
                  {a.summary && (
                    <span className={clsx(a.state === "failed" && "text-red-700")}> · {a.summary}</span>
                  )}
                </p>
              </div>
              {a.runnable && (
                <PermissionGate minRole={AdminRole.EDITOR}>
                  <button
                    type="button"
                    onClick={() => run(a.key)}
                    disabled={running !== null}
                    aria-label={`Run ${a.label} now`}
                    className="inline-flex items-center gap-1.5 min-h-9 px-2.5 rounded-md border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 shrink-0"
                  >
                    {running === a.key ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
                    ) : (
                      <Play className="w-3.5 h-3.5" aria-hidden="true" />
                    )}
                    {running === a.key ? "Running" : "Run"}
                  </button>
                </PermissionGate>
              )}
            </li>
          );
        })}
      </ul>

      <p
        role="status"
        aria-live="polite"
        className={clsx(
          "px-4 sm:px-5 text-sm",
          status ? "py-2.5 border-t border-slate-100" : "sr-only",
          status?.tone === "error" ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-800"
        )}
      >
        {status?.text}
      </p>

      <div className="border-t border-slate-200">
        <div className="px-4 sm:px-5 pt-4 pb-2 flex items-center justify-between gap-2">
          <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
            <BellRing className="w-4 h-4 text-slate-400" aria-hidden="true" />
            Recent alerts
          </h3>
          <Link href="/admin/notifications" className="text-xs font-medium text-amber-700 hover:text-amber-800">
            All notifications
          </Link>
        </div>
        {recentAlerts.length === 0 ? (
          <p className="px-4 sm:px-5 pb-4 text-sm text-slate-500">
            No alerts yet. When traffic drops, a page loses rankings or a sync breaks, it shows here and the team gets an email.
          </p>
        ) : (
          <ul className="pb-2">
            {recentAlerts.map((al) => {
              const body = (
                <>
                  <span className={clsx("mt-1.5 w-2 h-2 rounded-full shrink-0", PRIORITY_DOT[al.priority])} aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className={clsx("block text-sm text-slate-900 break-words", !al.isRead && "font-medium")}>
                      {al.title}
                    </span>
                    <span className="block text-xs text-slate-500 mt-0.5">{al.createdLabel}</span>
                  </span>
                </>
              );
              return (
                <li key={al.id}>
                  {al.href ? (
                    <Link
                      href={al.href}
                      title={al.message}
                      className="flex gap-3 px-4 sm:px-5 py-2 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-amber-400"
                    >
                      {body}
                    </Link>
                  ) : (
                    <div className="flex gap-3 px-4 sm:px-5 py-2" title={al.message}>
                      {body}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
