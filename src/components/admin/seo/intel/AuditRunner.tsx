"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Loader2, Play, RefreshCw } from "lucide-react";
import { clsx } from "clsx";

interface Props {
  /** Pre-filled URL; renders as a compact "Re-run" button when `rerun` is set. */
  defaultUrl?: string;
  rerun?: boolean;
  suggestions?: string[];
}

/** Runs a live audit through the existing endpoint, then opens the result. */
export default function AuditRunner({ defaultUrl = "", rerun = false, suggestions = [] }: Props) {
  const router = useRouter();
  const [url, setUrl] = useState(defaultUrl);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const run = async (target: string) => {
    if (!target.trim()) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/seo/audit-page/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: target.trim() }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(res.status === 401 ? "You need editor access to run audits." : json.error || "Audit failed");
      startTransition(() => {
        router.push(`/admin/seo/page-analyzer/?url=${encodeURIComponent(json.url)}`, { scroll: false });
        router.refresh();
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Audit failed");
    } finally {
      setBusy(false);
    }
  };

  if (rerun) {
    return (
      <div className="flex flex-col items-end gap-1">
        <button
          type="button"
          onClick={() => run(defaultUrl)}
          disabled={busy}
          className="inline-flex items-center gap-1.5 min-h-9 px-3 rounded-md border border-slate-300 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-60"
        >
          {busy ? <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> : <RefreshCw className="w-4 h-4" aria-hidden="true" />}
          {busy ? "Auditing…" : "Re-run audit"}
        </button>
        <p aria-live="polite" className="text-xs text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        run(url);
      }}
      className="bg-white rounded-lg border border-slate-200 shadow-sm p-4 sm:p-5"
    >
      <label htmlFor="audit-url" className="block text-sm font-semibold text-slate-900">
        Audit a page
      </label>
      <p id="audit-url-hint" className="text-sm text-slate-500 mt-0.5">
        A full URL or a site path. The live page is fetched and checked for 13 on-page factors.
      </p>
      <div className="mt-3 flex flex-col sm:flex-row gap-2">
        <input
          id="audit-url"
          list="audit-url-options"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          aria-describedby="audit-url-hint"
          placeholder="/trekking/machame-route/"
          className="flex-1 min-h-10 rounded-md border border-slate-300 px-3 text-sm focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-600/30"
        />
        <datalist id="audit-url-options">
          {suggestions.map((s) => (
            <option key={s} value={s} />
          ))}
        </datalist>
        <button
          type="submit"
          disabled={busy || !url.trim()}
          className={clsx(
            "inline-flex items-center justify-center gap-1.5 min-h-10 px-4 rounded-md bg-amber-600 text-[var(--primary-dark)] text-sm font-semibold hover:bg-amber-500 disabled:opacity-50"
          )}
        >
          {busy ? <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> : <Play className="w-4 h-4" aria-hidden="true" />}
          {busy ? "Auditing…" : "Run audit"}
        </button>
      </div>
      <div aria-live="polite">
        {error && (
          <p className="mt-2 flex gap-2 text-sm text-red-700">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
            {error}
          </p>
        )}
      </div>
    </form>
  );
}
