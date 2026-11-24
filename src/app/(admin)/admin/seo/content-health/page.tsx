import Link from "next/link";
import { ArrowRight, ExternalLink, Pencil, Search } from "lucide-react";
import { clsx } from "clsx";
import { requireRole } from "@/lib/auth";
import type { ContentKind } from "@/lib/seo-overview";
import type { SeoBand } from "@/lib/seo-score";
import { failedChecks, loadContentIndex } from "@/lib/seo-intel/content-index";
import { gscWindow, pageAggs, recentChangesWithImpact } from "@/lib/seo-intel/data";
import { CONTENT_KINDS, isContentKind, KIND_LABEL } from "@/lib/seo-intel/paths";
import { changeImpact, contentPriority, ctrGap, EMPTY_AGG, pctChange, type ImpactVerdict } from "@/lib/seo-intel/rules";
import MetaFixButton from "@/components/admin/seo/intel/MetaFixButton";
import {
  Delta,
  EmptyState,
  fmtInt,
  fmtPct,
  fmtPos,
  fmtWindow,
  Kpi,
  Panel,
  PageIntro,
  Pill,
  ScoreBadge,
  TableScroll,
  td,
  tdNum,
  th,
  thNum,
} from "@/components/admin/seo/intel/ui";

export const dynamic = "force-dynamic";
export const metadata = { title: "Content health · SEO" };

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const BANDS: Array<{ value: SeoBand | "all"; label: string }> = [
  { value: "all", label: "All scores" },
  { value: "poor", label: "Poor (under 40)" },
  { value: "needs-work", label: "Needs work (40–59)" },
  { value: "good", label: "Good (60–79)" },
  { value: "excellent", label: "Excellent (80+)" },
];
const SORTS = [
  { value: "priority", label: "Priority" },
  { value: "score", label: "Lowest score" },
  { value: "traffic", label: "Most impressions" },
] as const;
const PAGE_SIZE = 50;

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

const IMPACT: Record<ImpactVerdict, { label: string; tone: "emerald" | "red" | "slate" | "sky" }> = {
  improved: { label: "Improved", tone: "emerald" },
  worse: { label: "Worse", tone: "red" },
  flat: { label: "No change", tone: "slate" },
  "too-early": { label: "Measuring", tone: "sky" },
};

export default async function ContentHealthPage({ searchParams }: { searchParams: SearchParams }) {
  await requireRole("VIEWER");
  const sp = await searchParams;
  const kindFilter = isContentKind(one(sp.type)) ? (one(sp.type) as ContentKind) : null;
  const bandFilter = BANDS.some((b) => b.value === one(sp.band)) ? (one(sp.band) as SeoBand | "all") : "all";
  const liveFilter = one(sp.live) === "all" ? "all" : one(sp.live) === "draft" ? "draft" : "live";
  const sort = SORTS.some((s) => s.value === one(sp.sort)) ? one(sp.sort) : "priority";
  const q = one(sp.q).trim().toLowerCase();
  const gap = one(sp.gap);
  const page = Math.max(1, Number(one(sp.page)) || 1);

  const window = await gscWindow(28);
  const [records, traffic, previousTraffic, changes] = await Promise.all([
    loadContentIndex(),
    pageAggs(window.start, window.end),
    pageAggs(window.prevStart, window.start),
    recentChangesWithImpact(12),
  ]);
  const hasSearchData = window.latest !== null;

  const rows = records.map((r) => {
    const agg = traffic.get(r.path) ?? EMPTY_AGG;
    const prev = previousTraffic.get(r.path) ?? EMPTY_AGG;
    return {
      ...r,
      fails: failedChecks(r.result),
      agg,
      prevClicks: prev.clicks,
      clicksChange: pctChange(agg.clicks, prev.clicks),
      gap: ctrGap(agg),
      priority: contentPriority(r.result.score, r.kind, agg.impressions, ctrGap(agg)?.missedClicks ?? 0),
    };
  });

  const live = rows.filter((r) => r.isLive);
  const weak = live.filter((r) => r.result.score < 60);
  const avg = live.length ? Math.round(live.reduce((s, r) => s + r.result.score, 0) / live.length) : 0;
  const missingDesc = live.filter((r) => !r.metaDescription?.trim()).length;
  const atRiskImpr = weak.reduce((s, r) => s + r.agg.impressions, 0);
  const totalImpr = live.reduce((s, r) => s + r.agg.impressions, 0);
  const snippetLosses = live.filter((r) => r.gap).sort((a, b) => b.gap!.missedClicks - a.gap!.missedClicks);

  // Fix campaigns: one failed check across many live pages, weighted by traffic.
  const campaigns = new Map<string, { count: number; impressions: number; kinds: Set<ContentKind> }>();
  for (const r of live) {
    for (const label of r.fails) {
      const c = campaigns.get(label) ?? { count: 0, impressions: 0, kinds: new Set<ContentKind>() };
      c.count++;
      c.impressions += r.agg.impressions;
      c.kinds.add(r.kind);
      campaigns.set(label, c);
    }
  }
  const topCampaigns = [...campaigns]
    .sort((a, b) => b[1].impressions - a[1].impressions || b[1].count - a[1].count)
    .slice(0, 6);

  const filtered = rows
    .filter((r) => (liveFilter === "all" ? true : liveFilter === "live" ? r.isLive : !r.isLive))
    .filter((r) => !kindFilter || r.kind === kindFilter)
    .filter((r) => bandFilter === "all" || r.result.band === bandFilter)
    .filter((r) => !gap || r.fails.includes(gap))
    .filter((r) => !q || r.title.toLowerCase().includes(q) || r.path.includes(q))
    .sort((a, b) =>
      sort === "score"
        ? a.result.score - b.result.score
        : sort === "traffic"
          ? b.agg.impressions - a.agg.impressions
          : b.priority - a.priority
    );
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const params = {
    type: kindFilter ?? undefined,
    band: bandFilter !== "all" ? bandFilter : undefined,
    live: liveFilter !== "live" ? liveFilter : undefined,
    sort: sort !== "priority" ? sort : undefined,
    q: q || undefined,
    gap: gap || undefined,
  };
  const hrefWith = (patch: Record<string, string | undefined>) => {
    const next = new URLSearchParams();
    for (const [k, v] of Object.entries({ ...params, ...patch })) if (v) next.set(k, v);
    const s = next.toString();
    return `/admin/seo/content-health/${s ? `?${s}` : ""}`;
  };
  const byPath = new Map(rows.map((r) => [r.path, r]));

  return (
    <div className="space-y-6">
      <PageIntro
        title="Content health"
        description={
          <>
            Every live route, safari, destination, day trip and post, scored on its on-page SEO and ranked by how much
            fixing it is worth. Search data: {hasSearchData ? fmtWindow(window.start, window.end) : "not connected"}.
          </>
        }
      />

      <div className="grid grid-cols-1 min-[420px]:grid-cols-2 xl:grid-cols-4 gap-4">
        <Kpi label="Average score" value={`${avg}/100`} hint={`${live.length} live pages`} />
        <Kpi label="Pages under 60" value={fmtInt(weak.length)} hint={live.length ? `${Math.round((weak.length / live.length) * 100)}% of live pages` : undefined} />
        <Kpi
          label="Search views on weak pages"
          value={hasSearchData ? fmtInt(atRiskImpr) : "—"}
          hint={hasSearchData && totalImpr ? `${Math.round((atRiskImpr / totalImpr) * 100)}% of content impressions, 28 days` : "Connect Search Console"}
        />
        <Kpi label="Missing meta description" value={fmtInt(missingDesc)} hint={missingDesc ? "Google writes its own snippet" : "All set"} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
        <Panel id="ch-campaigns" title="Fix campaigns" meta="One fix applied across many pages. Biggest search exposure first.">
          {topCampaigns.length === 0 ? (
            <EmptyState title="No failing checks on live pages">Every live page passes every content check.</EmptyState>
          ) : (
            <ul className="divide-y divide-slate-100">
              {topCampaigns.map(([label, c]) => (
                <li key={label}>
                  <Link
                    href={hrefWith({ gap: label, page: undefined })}
                    className={clsx(
                      "flex items-center justify-between gap-3 py-2.5 -mx-2 px-2 rounded hover:bg-slate-50",
                      gap === label && "bg-amber-50"
                    )}
                  >
                    <span className="min-w-0">
                      <span className="block text-sm font-medium text-slate-900">{label}</span>
                      <span className="block text-xs text-slate-500">
                        {c.count} page{c.count === 1 ? "" : "s"} · {[...c.kinds].map((k) => KIND_LABEL[k]).join(", ")}
                      </span>
                    </span>
                    <span className="shrink-0 text-right">
                      <span className="block text-sm font-semibold tabular-nums text-slate-900">{fmtInt(c.impressions)}</span>
                      <span className="block text-xs text-slate-500">impressions</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel
          id="ch-snippets"
          title="Snippets losing clicks"
          meta="Page-one results with a click-through rate well below normal for their position. The ranking is fine; the title or description isn't winning the click."
        >
          {!hasSearchData ? (
            <EmptyState title="Search Console is not connected" action={<Link href="/admin/seo/settings/" className="text-sm font-medium text-amber-700 hover:underline">Connect it</Link>} />
          ) : snippetLosses.length === 0 ? (
            <EmptyState title="No weak snippets">Every page-one content page earns about the clicks its position should.</EmptyState>
          ) : (
            <ul className="divide-y divide-slate-100">
              {snippetLosses.slice(0, 6).map((r) => (
                <li key={`${r.kind}-${r.id}`} className="flex flex-wrap items-center justify-between gap-3 py-2.5">
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium text-slate-900 truncate">{r.title}</span>
                    <span className="block text-xs text-slate-500">
                      Position {fmtPos(r.agg.position)} · CTR {fmtPct(r.gap!.actual)} vs {fmtPct(r.gap!.expected)} expected ·{" "}
                      <span className="font-semibold text-red-700">~{fmtInt(r.gap!.missedClicks)} clicks missed</span>
                    </span>
                  </span>
                  <MetaFixButton compact kind={r.kind} id={r.id} title={r.title} path={r.path} metaTitle={r.metaTitle} metaDescription={r.metaDescription} label="Rewrite" />
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>

      <Panel
        id="ch-backlog"
        title="Content backlog"
        meta={`${filtered.length} of ${rows.length} items${gap ? ` failing “${gap}”` : ""}. Priority weighs the score gap by page type and search exposure, plus clicks a weak snippet is losing.`}
        flush
      >
        <form method="get" action="/admin/seo/content-health/" className="flex flex-wrap items-end gap-3 px-4 sm:px-5 pb-4">
          {gap && <input type="hidden" name="gap" value={gap} />}
          <label className="flex-1 min-w-[12rem]">
            <span className="block text-xs font-medium text-slate-600 mb-1">Search</span>
            <span className="relative block">
              <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" aria-hidden="true" />
              <input name="q" defaultValue={q} placeholder="Name or URL" className="w-full min-h-10 rounded-md border border-slate-300 pl-8 pr-3 text-sm focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-600/30" />
            </span>
          </label>
          <label>
            <span className="block text-xs font-medium text-slate-600 mb-1">Type</span>
            <select name="type" defaultValue={kindFilter ?? ""} className="min-h-10 rounded-md border border-slate-300 bg-white px-2 text-sm">
              <option value="">All types</option>
              {CONTENT_KINDS.map((k) => (
                <option key={k} value={k}>{KIND_LABEL[k]}</option>
              ))}
            </select>
          </label>
          <label>
            <span className="block text-xs font-medium text-slate-600 mb-1">Score</span>
            <select name="band" defaultValue={bandFilter} className="min-h-10 rounded-md border border-slate-300 bg-white px-2 text-sm">
              {BANDS.map((b) => (
                <option key={b.value} value={b.value}>{b.label}</option>
              ))}
            </select>
          </label>
          <label>
            <span className="block text-xs font-medium text-slate-600 mb-1">Status</span>
            <select name="live" defaultValue={liveFilter} className="min-h-10 rounded-md border border-slate-300 bg-white px-2 text-sm">
              <option value="live">Live</option>
              <option value="draft">Drafts and inactive</option>
              <option value="all">All</option>
            </select>
          </label>
          <label>
            <span className="block text-xs font-medium text-slate-600 mb-1">Sort</span>
            <select name="sort" defaultValue={sort} className="min-h-10 rounded-md border border-slate-300 bg-white px-2 text-sm">
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </label>
          <button type="submit" className="min-h-10 px-4 rounded-md bg-slate-900 text-white text-sm font-medium hover:bg-slate-800">
            Apply
          </button>
          {(q || kindFilter || bandFilter !== "all" || liveFilter !== "live" || gap || sort !== "priority") && (
            <Link href="/admin/seo/content-health/" className="min-h-10 inline-flex items-center px-2 text-sm font-medium text-amber-700 hover:underline">
              Clear filters
            </Link>
          )}
        </form>

        {visible.length === 0 ? (
          <div className="px-4 sm:px-5 pb-5">
            <EmptyState title="Nothing matches these filters">Try another type or score band, or clear the filters.</EmptyState>
          </div>
        ) : (
          <TableScroll label="Content backlog">
            <table className="min-w-full border-t border-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th scope="col" className={th}>Page</th>
                  <th scope="col" className={thNum}>Score</th>
                  <th scope="col" className={th}>Top gaps</th>
                  <th scope="col" className={thNum}>Impr. 28d</th>
                  <th scope="col" className={thNum}>Clicks</th>
                  <th scope="col" className={thNum}>Pos.</th>
                  <th scope="col" className={thNum}>Priority</th>
                  <th scope="col" className={th}><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {visible.map((r) => (
                  <tr key={`${r.kind}-${r.id}`} className="hover:bg-slate-50/70">
                    <td className={clsx(td, "min-w-[16rem] max-w-[22rem]")}>
                      <div className="font-medium text-slate-900">{r.title}</div>
                      <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                        <Pill>{KIND_LABEL[r.kind]}</Pill>
                        {!r.isLive && <Pill tone="amber">Not live</Pill>}
                        <a href={r.path} target="_blank" rel="noreferrer" className="text-xs text-slate-500 hover:text-amber-700 inline-flex items-center gap-0.5 break-all">
                          {r.path}
                          <ExternalLink className="w-3 h-3 shrink-0" aria-hidden="true" />
                          <span className="sr-only">(opens in new tab)</span>
                        </a>
                      </div>
                    </td>
                    <td className={tdNum}><ScoreBadge score={r.result.score} /></td>
                    <td className={clsx(td, "min-w-[14rem]")}>
                      {r.fails.length === 0 ? (
                        <span className="text-xs text-emerald-700">All checks pass</span>
                      ) : (
                        <ul className="space-y-0.5 text-xs text-slate-600">
                          {r.fails.slice(0, 3).map((f) => (
                            <li key={f}>{f}</li>
                          ))}
                          {r.fails.length > 3 && <li className="text-slate-400">+{r.fails.length - 3} more</li>}
                        </ul>
                      )}
                      {r.gap && <div className="mt-1"><Pill tone="red">Snippet losing ~{fmtInt(r.gap.missedClicks)} clicks</Pill></div>}
                    </td>
                    <td className={tdNum}>{r.agg.impressions ? fmtInt(r.agg.impressions) : <span className="text-slate-400">0</span>}</td>
                    <td className={tdNum}>
                      <div>{fmtInt(r.agg.clicks)}</div>
                      {r.prevClicks > 0 && <Delta value={r.clicksChange} label="vs previous 28 days" />}
                    </td>
                    <td className={tdNum}>{fmtPos(r.agg.position)}</td>
                    <td className={tdNum}><span className="font-semibold text-slate-900">{r.priority.toFixed(0)}</span></td>
                    <td className={clsx(td, "whitespace-nowrap")}>
                      <div className="flex items-center justify-end gap-1.5">
                        <MetaFixButton compact kind={r.kind} id={r.id} title={r.title} path={r.path} metaTitle={r.metaTitle} metaDescription={r.metaDescription} label="Meta" />
                        <Link href={r.editHref} className="inline-flex items-center gap-1 min-h-8 px-2.5 rounded-md text-xs font-medium text-slate-700 hover:bg-slate-100">
                          <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
                          Edit<span className="sr-only"> {r.title}</span>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableScroll>
        )}
        {pageCount > 1 && (
          <nav aria-label="Backlog pages" className="flex items-center justify-between gap-3 border-t border-slate-200 px-4 sm:px-5 py-3 text-sm">
            <span className="text-slate-500">Page {page} of {pageCount}</span>
            <span className="flex gap-2">
              {page > 1 && <Link href={hrefWith({ page: String(page - 1) })} className="min-h-9 px-3 inline-flex items-center rounded-md border border-slate-300 hover:bg-slate-50">Previous</Link>}
              {page < pageCount && <Link href={hrefWith({ page: String(page + 1) })} className="min-h-9 px-3 inline-flex items-center rounded-md border border-slate-300 hover:bg-slate-50">Next</Link>}
            </span>
          </nav>
        )}
      </Panel>

      <Panel
        id="ch-changes"
        title="Recent meta changes and their effect"
        meta="Clicks and CTR in equal windows before and after each change (up to 14 days). Results need about a week of Search Console data."
        flush
      >
        {changes.length === 0 ? (
          <div className="px-4 sm:px-5 pb-5">
            <EmptyState title="No changes logged yet">
              Titles and descriptions applied from these SEO pages appear here, with their effect on clicks.
            </EmptyState>
          </div>
        ) : (
          <TableScroll label="Recent meta changes">
            <table className="min-w-full border-t border-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th scope="col" className={th}>Change</th>
                  <th scope="col" className={thNum}>CTR before → after</th>
                  <th scope="col" className={thNum}>Clicks before → after</th>
                  <th scope="col" className={th}>Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {changes.map((c) => {
                  const verdict = changeImpact(c.beforeAgg, c.afterAgg, c.daysAfter);
                  const item = byPath.get(c.path);
                  return (
                    <tr key={c.id}>
                      <td className={clsx(td, "min-w-[18rem] max-w-[28rem]")}>
                        <div className="font-medium text-slate-900">{item?.title ?? c.path}</div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          {c.field === "metaTitle" ? "Title" : "Description"} · {c.source === "ai" ? "AI draft, reviewed" : "Manual"} ·{" "}
                          {c.createdAt.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                          {c.userEmail ? ` · ${c.userEmail}` : ""}
                        </div>
                        <div className="text-xs mt-1 text-slate-600 break-words">
                          <span className="line-through decoration-red-400">{c.before || "(empty)"}</span>
                          <ArrowRight className="inline w-3 h-3 mx-1 text-slate-400" aria-label="changed to" />
                          <span className="text-slate-900">{c.after}</span>
                        </div>
                      </td>
                      <td className={tdNum}>
                        {fmtPct(c.beforeAgg.ctr)} → {c.daysAfter ? fmtPct(c.afterAgg.ctr) : "—"}
                      </td>
                      <td className={tdNum}>
                        {fmtInt(c.beforeAgg.clicks)} → {c.daysAfter ? fmtInt(c.afterAgg.clicks) : "—"}
                        <div className="text-xs text-slate-500">{c.daysAfter} day{c.daysAfter === 1 ? "" : "s"} after</div>
                      </td>
                      <td className={td}><Pill tone={IMPACT[verdict].tone}>{IMPACT[verdict].label}</Pill></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </TableScroll>
        )}
      </Panel>
    </div>
  );
}
