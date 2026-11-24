"use client";

import { useEffect, useId, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, CheckCircle2, Loader2, Sparkles, Wand2, X } from "lucide-react";
import { clsx } from "clsx";
import type { ContentKind } from "@/lib/seo-overview";
import { META_DESCRIPTION_MAX, META_DESCRIPTION_MIN, META_TITLE_MAX } from "@/lib/seo-intel/paths";

interface Props {
  kind: ContentKind;
  id: string;
  title: string;
  path: string;
  metaTitle: string | null;
  metaDescription: string | null;
  /** Button text; defaults to "Improve meta". */
  label?: string;
  compact?: boolean;
}

interface Suggestion {
  primaryQuery: string;
  metaTitle: string;
  metaDescription: string;
  rationale: string;
  warnings: string[];
}

interface QueryRow {
  query: string;
  impressions: number;
  clicks: number;
  position: number;
}

type Status =
  | { kind: "idle" }
  | { kind: "suggesting" }
  | { kind: "saving" }
  | { kind: "error"; message: string }
  | { kind: "saved"; fields: string[] };

const SITE_SUFFIX = " | Snow Africa Adventure";

function Counter({ length, min, max }: { length: number; min?: number; max: number }) {
  const bad = length > max || (min !== undefined && length > 0 && length < min);
  return (
    <span className={clsx("text-xs tabular-nums", bad ? "text-red-700 font-semibold" : "text-slate-500")}>
      {length}/{min !== undefined ? `${min}–` : ""}
      {max}
    </span>
  );
}

/**
 * Review-then-apply editor for one item's title tag and meta description.
 * Claude can draft a version; nothing is saved until the editor clicks Apply.
 */
export default function MetaFixButton({ kind, id, title, path, metaTitle, metaDescription, label = "Improve meta", compact }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const headingId = useId();
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [draftTitle, setDraftTitle] = useState(metaTitle ?? "");
  const [draftDesc, setDraftDesc] = useState(metaDescription ?? "");
  const [suggestion, setSuggestion] = useState<Suggestion | null>(null);
  const [queries, setQueries] = useState<QueryRow[]>([]);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [source, setSource] = useState<"ai" | "manual">("manual");

  // Re-sync when the server data changes after an apply + refresh.
  useEffect(() => {
    setDraftTitle(metaTitle ?? "");
    setDraftDesc(metaDescription ?? "");
  }, [metaTitle, metaDescription]);

  const open = () => {
    setStatus({ kind: "idle" });
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();

  const suggest = async () => {
    setStatus({ kind: "suggesting" });
    try {
      const res = await fetch("/api/admin/seo/ai/meta-suggestion/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, id }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Could not create a suggestion");
      setSuggestion(json.suggestion);
      setQueries(json.queries ?? []);
      setDraftTitle(json.suggestion.metaTitle);
      setDraftDesc(json.suggestion.metaDescription);
      setSource("ai");
      setStatus({ kind: "idle" });
    } catch (e) {
      setStatus({ kind: "error", message: e instanceof Error ? e.message : "Something went wrong" });
    }
  };

  const titleChanged = draftTitle.trim() !== (metaTitle ?? "");
  const descChanged = draftDesc.trim() !== (metaDescription ?? "");
  const tooLong = draftTitle.trim().length > 70 || draftDesc.trim().length > 200;
  const tooShort =
    (titleChanged && draftTitle.trim().length < 10) || (descChanged && draftDesc.trim().length < 50);

  const apply = async () => {
    setStatus({ kind: "saving" });
    try {
      const res = await fetch("/api/admin/seo/content-meta/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind,
          id,
          ...(titleChanged ? { metaTitle: draftTitle.trim() } : {}),
          ...(descChanged ? { metaDescription: draftDesc.trim() } : {}),
          source,
          reason: suggestion?.primaryQuery ? `Target query: ${suggestion.primaryQuery}` : undefined,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(res.status === 401 ? "You need editor access to apply changes." : json.error || "Could not save");
      setStatus({ kind: "saved", fields: json.changed ?? [] });
      startTransition(() => router.refresh());
    } catch (e) {
      setStatus({ kind: "error", message: e instanceof Error ? e.message : "Something went wrong" });
    }
  };

  const busy = status.kind === "suggesting" || status.kind === "saving";
  const previewTitle = `${draftTitle.trim() || title}${SITE_SUFFIX}`;

  return (
    <>
      <button
        type="button"
        onClick={open}
        className={clsx(
          "inline-flex items-center gap-1.5 rounded-md font-medium border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 whitespace-nowrap",
          compact ? "min-h-8 px-2.5 text-xs" : "min-h-9 px-3 text-sm"
        )}
      >
        <Wand2 className="w-3.5 h-3.5" aria-hidden="true" />
        {label}
        <span className="sr-only"> for {title}</span>
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={headingId}
        className="m-0 ml-auto h-dvh max-h-dvh w-full max-w-xl bg-white p-0 shadow-2xl backdrop:bg-slate-900/40 open:flex open:flex-col"
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
      >
        <header className="flex items-start justify-between gap-3 border-b border-slate-200 px-5 py-4">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Search snippet</p>
            <h2 id={headingId} className="text-lg font-semibold text-slate-900 truncate">
              {title}
            </h2>
            <a href={path} target="_blank" rel="noreferrer" className="text-sm text-amber-700 hover:underline break-all">
              {path}
            </a>
          </div>
          <button
            type="button"
            onClick={close}
            className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          >
            <X className="w-5 h-5" aria-hidden="true" />
            <span className="sr-only">Close</span>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
          <div className="rounded-lg border border-violet-200 bg-violet-50/60 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-violet-900 max-w-xs">
                Claude drafts a title and description from this page&apos;s content and the searches it already appears for.
              </p>
              <button
                type="button"
                onClick={suggest}
                disabled={busy}
                className="inline-flex items-center gap-1.5 min-h-9 px-3 rounded-md bg-violet-700 text-white text-sm font-medium hover:bg-violet-800 disabled:opacity-60"
              >
                {status.kind === "suggesting" ? (
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                ) : (
                  <Sparkles className="w-4 h-4" aria-hidden="true" />
                )}
                {status.kind === "suggesting" ? "Writing…" : suggestion ? "Try again" : "Suggest with AI"}
              </button>
            </div>
            {suggestion && (
              <div className="mt-3 border-t border-violet-200 pt-3 text-sm text-violet-950 space-y-1">
                <p>
                  <span className="font-semibold">Target query:</span> {suggestion.primaryQuery}
                </p>
                <p>{suggestion.rationale}</p>
              </div>
            )}
          </div>

          {queries.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">Searches this page shows for (28 days)</p>
              <ul className="text-sm divide-y divide-slate-100 border border-slate-200 rounded-md">
                {queries.map((q) => (
                  <li key={q.query} className="flex items-center justify-between gap-3 px-3 py-1.5">
                    <span className="min-w-0 truncate text-slate-800">{q.query}</span>
                    <span className="shrink-0 text-xs text-slate-500 tabular-nums">
                      {q.impressions.toLocaleString()} impr · pos {q.position.toFixed(1)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <div className="flex items-baseline justify-between">
                <label htmlFor={`${headingId}-t`} className="text-sm font-medium text-slate-800">
                  Title tag
                </label>
                <Counter length={draftTitle.trim().length} max={META_TITLE_MAX} />
              </div>
              <input
                id={`${headingId}-t`}
                value={draftTitle}
                onChange={(e) => {
                  setDraftTitle(e.target.value);
                  setStatus({ kind: "idle" });
                }}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-600/30"
              />
              <p className="mt-1 text-xs text-slate-500">The site adds &ldquo;{SITE_SUFFIX.trim()}&rdquo; after it.</p>
              {titleChanged && (
                <p className="mt-1 text-xs text-slate-500">
                  <span className="font-medium">Was:</span>{" "}
                  <span className="line-through decoration-red-400">{metaTitle || "(empty, uses page name)"}</span>
                </p>
              )}
            </div>
            <div>
              <div className="flex items-baseline justify-between">
                <label htmlFor={`${headingId}-d`} className="text-sm font-medium text-slate-800">
                  Meta description
                </label>
                <Counter length={draftDesc.trim().length} min={META_DESCRIPTION_MIN} max={META_DESCRIPTION_MAX} />
              </div>
              <textarea
                id={`${headingId}-d`}
                value={draftDesc}
                rows={4}
                onChange={(e) => {
                  setDraftDesc(e.target.value);
                  setStatus({ kind: "idle" });
                }}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-600/30"
              />
              {descChanged && (
                <p className="mt-1 text-xs text-slate-500">
                  <span className="font-medium">Was:</span>{" "}
                  <span className="line-through decoration-red-400">{metaDescription || "(empty)"}</span>
                </p>
              )}
            </div>
          </div>

          {suggestion && suggestion.warnings.length > 0 && (
            <ul className="space-y-1">
              {suggestion.warnings.map((w) => (
                <li key={w} className="flex gap-2 text-sm text-amber-800">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                  {w}
                </li>
              ))}
            </ul>
          )}

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">Google preview</p>
            <div className="rounded-lg border border-slate-200 p-4">
              <p className="text-xs text-slate-600 truncate">snowafricaadventure.com{path.replace(/\/$/, "").replace(/\//g, " › ")}</p>
              <p className="text-lg leading-snug text-[#1a0dab] line-clamp-1">{previewTitle}</p>
              <p className="text-sm text-slate-700 line-clamp-2">{draftDesc.trim() || "Google will pick text from the page."}</p>
            </div>
          </div>
        </div>

        <footer className="border-t border-slate-200 px-5 py-3 space-y-2">
          <div aria-live="polite" className="text-sm">
            {status.kind === "error" && (
              <p className="flex gap-2 text-red-700">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                {status.message}
              </p>
            )}
            {status.kind === "saved" && (
              <p className="flex gap-2 text-emerald-700">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                {status.fields.length
                  ? "Saved and live. The change is logged so its effect on clicks shows up here in a week or two."
                  : "Nothing changed."}
              </p>
            )}
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2">
            <button type="button" onClick={close} className="min-h-10 px-4 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-100">
              {status.kind === "saved" ? "Done" : "Cancel"}
            </button>
            <button
              type="button"
              onClick={apply}
              disabled={busy || (!titleChanged && !descChanged) || tooLong || tooShort}
              className="inline-flex items-center gap-1.5 min-h-10 px-4 rounded-md bg-amber-600 text-[var(--primary-dark)] text-sm font-semibold hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status.kind === "saving" && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
              Apply to live site
            </button>
          </div>
        </footer>
      </dialog>
    </>
  );
}
