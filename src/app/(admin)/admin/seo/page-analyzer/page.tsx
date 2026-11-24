import Link from "next/link";
import { AlertOctagon, AlertTriangle, ArrowLeft, CheckCircle2, ExternalLink, Info, Pencil, TrendingDown, TrendingUp } from "lucide-react";
import { clsx } from "clsx";
import prisma from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import { SITE_CONFIG } from "@/lib/constants";
import { failedChecks, indexByPath, loadContentIndex } from "@/lib/seo-intel/content-index";
import { gscWindow, latestAudits, pageAggs, pageDaily, topQueriesForPath } from "@/lib/seo-intel/data";
import { KIND_LABEL, pathKey } from "@/lib/seo-intel/paths";
import {
  aggregate,
  ctrGap,
  diffAudits,
  EMPTY_AGG,
  forecastClicks,
  isStrikingDistance,
  parseAuditIssues,
  pctChange,
  type AuditIssueLike,
} from "@/lib/seo-intel/rules";
import AuditRunner from "@/components/admin/seo/intel/AuditRunner";
import MetaFixButton from "@/components/admin/seo/intel/MetaFixButton";
import TrendChart from "@/components/admin/seo/intel/TrendChart";
import {
  Delta,
  EmptyState,
  fmtDay,
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
export const metadata = { title: "Page analyzer · SEO" };

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const SEVERITY = {
  critical: { label: "Critical", icon: AlertOctagon, cls: "text-red-700", tone: "red" as const },
  warning: { label: "Warning", icon: AlertTriangle, cls: "text-amber-700", tone: "amber" as const },
  info: { label: "Info", icon: Info, cls: "text-sky-700", tone: "sky" as const },
  pass: { label: "Passed", icon: CheckCircle2, cls: "text-emerald-700", tone: "emerald" as const },
};

function displayUrl(url: string) {
  try {
    const u = new URL(url);
    const bare = (h: string) => h.replace(/^www\./, "");
    const own = [bare(new URL(SITE_CONFIG.url).host), "snowafricaadventure.com"];
    return own.includes(bare(u.host)) ? u.pathname : `${u.host}${u.pathname}`;
  } catch {
    return url;
  }
}

export default async function PageAnalyzerPage({ searchParams }: { searchParams: SearchParams }) {
  await requireRole("VIEWER");
  const sp = await searchParams;
  const rawUrl = (Array.isArray(sp.url) ? sp.url[0] : sp.url)?.trim() ?? "";

  const [records, audits] = await Promise.all([loadContentIndex(), latestAudits(300)]);
  const live = records.filter((r) => r.isLive);
  const suggestions = live.map((r) => r.path).sort();

  if (!rawUrl) return <AuditIndex audits={audits} records={live} suggestions={suggestions} />;

  // Resolve the selected page: an audited URL, or a path we have not audited yet.
  const path = pathKey(rawUrl);
  const auditedUrl = audits.find((a) => a.url === rawUrl)?.url ?? audits.find((a) => pathKey(a.url) === path)?.url ?? null;
  const fullUrl = auditedUrl ?? (rawUrl.startsWith("/") ? new URL(rawUrl, SITE_CONFIG.url).toString() : rawUrl);

  const window = await gscWindow(28);
  const [history, daily, queries, current, previous] = await Promise.all([
    auditedUrl
      ? prisma.seoPageAudit.findMany({ where: { url: auditedUrl }, orderBy: { createdAt: "desc" }, take: 30 })
      : Promise.resolve([]),
    pageDaily(path, window.start, window.end),
    topQueriesForPath(path, window.start, window.end, 25),
    pageAggs(window.start, window.end).then((m) => m.get(path) ?? EMPTY_AGG),
    pageAggs(window.prevStart, window.start).then((m) => m.get(path) ?? EMPTY_AGG),
  ]);
  const content = indexByPath(records).get(path) ?? null;
  const latest = history[0] ?? null;
  const prior = history[1] ?? null;
  const issues = latest ? parseAuditIssues(latest.issues) : [];
  const diff = latest && prior ? diffAudits({ score: prior.score, issues: parseAuditIssues(prior.issues) }, { score: latest.score, issues }) : null;
  const grouped = (sev: keyof typeof SEVERITY) => issues.filter((i) => i.severity === sev);
  const gap = ctrGap(current);
  const totals = aggregate(daily);

  return (
    <div className="space-y-6">
      <Link href="/admin/seo/page-analyzer/" className="inline-flex items-center gap-1 text-sm font-medium text-amber-700 hover:underline">
        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
        All audited pages
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Page analysis</p>
          <h2 className="text-xl font-bold text-slate-900 break-all">{content?.title ?? displayUrl(fullUrl)}</h2>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-sm">
            <a href={fullUrl} target="_blank" rel="noreferrer" className="text-slate-600 hover:text-amber-700 inline-flex items-center gap-1 break-all">
              {displayUrl(fullUrl)}
              <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span className="sr-only">(opens in new tab)</span>
            </a>
            {content && <Pill>{KIND_LABEL[content.kind]}</Pill>}
            {latest && <span className="text-slate-500">Audited {fmtDay(latest.createdAt)} · {history.length} run{history.length === 1 ? "" : "s"}</span>}
          </div>
        </div>
        <AuditRunner rerun defaultUrl={fullUrl} />
      </div>

      <div className="grid grid-cols-1 min-[420px]:grid-cols-2 xl:grid-cols-4 gap-4">
        <Kpi
          label="Audit score"
          value={latest ? `${latest.score}/100` : "—"}
          delta={diff ? <Delta value={diff.scoreDelta} suffix=" pts" label="since the previous audit" /> : undefined}
          hint={latest ? (diff ? "since last audit" : "first audit") : "Not audited yet"}
        />
        <Kpi label="Clicks, 28 days" value={fmtInt(current.clicks)} delta={<Delta value={pctChange(current.clicks, previous.clicks)} label="vs previous 28 days" />} />
        <Kpi label="Impressions" value={fmtInt(current.impressions)} delta={<Delta value={pctChange(current.impressions, previous.impressions)} label="vs previous 28 days" />} />
        <Kpi
          label="Avg. position"
          value={fmtPos(current.position)}
          delta={previous.position > 0 && current.position > 0 ? <Delta value={current.position - previous.position} suffix="" digits={1} invert label="positions vs previous 28 days" /> : undefined}
          hint={gap ? `CTR ${fmtPct(gap.actual)}, expected ${fmtPct(gap.expected)}` : current.impressions ? `CTR ${fmtPct(current.ctr)}` : undefined}
        />
      </div>

      {(gap || content) && (
        <section aria-label="Recommended next step" className={clsx("rounded-lg border p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4", gap ? "border-red-200 bg-red-50/60" : "border-slate-200 bg-white")}>
          <div className="min-w-0 max-w-2xl">
            <p className="text-sm font-semibold text-slate-900">
              {gap
                ? `The snippet is losing about ${fmtInt(gap.missedClicks)} clicks a month`
                : content && failedChecks(content.result).length
                  ? `Content score ${content.result.score}/100: ${failedChecks(content.result).length} check${failedChecks(content.result).length === 1 ? "" : "s"} failing`
                  : `Content score ${content!.result.score}/100. Every content check passes`}
            </p>
            <p className="text-sm text-slate-600 mt-0.5">
              {gap
                ? `It ranks at position ${fmtPos(current.position)}, where results normally earn ${fmtPct(gap.expected)} of clicks; this page earns ${fmtPct(gap.actual)}. A sharper title and description aimed at the top query below is the fastest fix.`
                : content && failedChecks(content.result).length
                  ? failedChecks(content.result).slice(0, 4).join(" · ")
                  : "Focus on links and the queries in striking distance below."}
            </p>
          </div>
          {content && (
            <div className="flex flex-wrap gap-2">
              <MetaFixButton kind={content.kind} id={content.id} title={content.title} path={content.path} metaTitle={content.metaTitle} metaDescription={content.metaDescription} />
              <Link href={content.editHref} className="inline-flex items-center gap-1.5 min-h-9 px-3 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-100">
                <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
                Edit content
              </Link>
            </div>
          )}
        </section>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-6 items-start">
        <Panel id="pa-issues" title="On-page audit" meta={latest ? `${grouped("critical").length} critical · ${grouped("warning").length} warnings · ${grouped("pass").length} passed` : undefined}>
          {!latest ? (
            <EmptyState title="This page has not been audited">Run the audit to check its title, description, headings, schema, links and images.</EmptyState>
          ) : (
            <div className="space-y-4">
              {diff && (diff.fixed.length > 0 || diff.introduced.length > 0) && (
                <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm">
                  <p className="font-medium text-slate-800">Since the audit on {fmtDay(prior!.createdAt)}</p>
                  <ul className="mt-1 space-y-0.5">
                    {diff.fixed.map((i) => (
                      <li key={`f-${i.field}`} className="flex gap-1.5 text-emerald-700"><TrendingUp className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />Fixed: {i.message}</li>
                    ))}
                    {diff.introduced.map((i) => (
                      <li key={`n-${i.field}`} className="flex gap-1.5 text-red-700"><TrendingDown className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />New: {i.message}</li>
                    ))}
                  </ul>
                </div>
              )}
              {(["critical", "warning", "info"] as const).map((sev) =>
                grouped(sev).length ? <IssueList key={sev} sev={sev} items={grouped(sev)} /> : null
              )}
              {grouped("pass").length > 0 && (
                <details className="group">
                  <summary className="cursor-pointer text-sm font-medium text-slate-700 min-h-9 flex items-center">
                    {grouped("pass").length} checks passed
                  </summary>
                  <IssueList sev="pass" items={grouped("pass")} />
                </details>
              )}
            </div>
          )}
        </Panel>

        <div className="space-y-6">
          {latest && (
            <Panel id="pa-details" title="What Google sees">
              <dl className="space-y-3 text-sm">
                <Detail label={`Title (${latest.titleLength} chars)`} value={latest.title} />
                <Detail label={`Meta description (${latest.metaDescLength} chars)`} value={latest.metaDescription} />
                <Detail label={`H1 (${latest.h1Count})`} value={latest.h1Text} />
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100">
                  <Stat label="Words" value={fmtInt(latest.wordCount)} />
                  <Stat label="H2 / H3" value={`${latest.h2Count} / ${latest.h3Count}`} />
                  <Stat label="Internal links" value={fmtInt(latest.internalLinks)} />
                  <Stat label="External links" value={fmtInt(latest.externalLinks)} />
                  <Stat label="Images" value={`${latest.imagesTotal}${latest.imagesMissingAlt ? ` (${latest.imagesMissingAlt} no alt)` : ""}`} />
                  <Stat label="Canonical" value={latest.hasCanonical ? "Yes" : "Missing"} />
                </div>
                <Detail label="Schema" value={latest.schemaTypes.length ? latest.schemaTypes.join(", ") : null} />
              </dl>
            </Panel>
          )}
          {history.length > 1 && (
            <Panel id="pa-history" title="Audit history">
              <TrendChart
                height={160}
                summary={`Audit score over ${history.length} runs, from ${history[history.length - 1].score} to ${history[0].score}.`}
                data={[...history].reverse().map((h) => ({ date: h.createdAt.toISOString().slice(0, 10), score: h.score }))}
                series={[{ key: "score", label: "Audit score", color: "#b45309" }]}
              />
            </Panel>
          )}
        </div>
      </div>

      <Panel
        id="pa-search"
        title="Search performance"
        meta={window.latest ? `${fmtWindow(window.start, window.end)} · ${fmtInt(totals.clicks)} clicks from ${fmtInt(totals.impressions)} impressions` : "Search Console is not connected"}
      >
        {daily.length === 0 ? (
          <EmptyState title="No search data for this page">Google has not shown this URL in the last 28 days, or it is new.</EmptyState>
        ) : (
          <TrendChart
            summary={`Daily clicks and average position for ${displayUrl(fullUrl)} over 28 days.`}
            data={daily.map((d) => ({ date: d.date, clicks: d.clicks, position: Number(d.position.toFixed(1)) }))}
            series={[
              { key: "clicks", label: "Clicks", color: "#0f766e" },
              { key: "position", label: "Avg. position", color: "#7c3aed", right: true, reversed: true, format: "pos" },
            ]}
          />
        )}
      </Panel>

      <Panel id="pa-queries" title="Queries this page ranks for" meta="Striking distance means positions 8–20, where a push to the top three pays most." flush>
        {queries.length === 0 ? (
          <div className="px-4 sm:px-5 pb-5"><EmptyState title="No queries yet" /></div>
        ) : (
          <TableScroll label="Queries for this page">
            <table className="min-w-full border-t border-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th scope="col" className={th}>Query</th>
                  <th scope="col" className={thNum}>Clicks</th>
                  <th scope="col" className={thNum}>Impr.</th>
                  <th scope="col" className={thNum}>CTR</th>
                  <th scope="col" className={thNum}>Pos.</th>
                  <th scope="col" className={th}>Opportunity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {queries.map((q) => {
                  const qGap = ctrGap(q, { minImpressions: 30 });
                  const strike = isStrikingDistance(q);
                  return (
                    <tr key={q.query}>
                      <td className={clsx(td, "min-w-[14rem]")}>
                        <Link href={`/admin/seo/search-console/?q=${encodeURIComponent(q.query)}`} className="font-medium text-slate-900 hover:text-amber-700">{q.query}</Link>
                      </td>
                      <td className={tdNum}>{fmtInt(q.clicks)}</td>
                      <td className={tdNum}>{fmtInt(q.impressions)}</td>
                      <td className={tdNum}>{fmtPct(q.ctr)}</td>
                      <td className={tdNum}>{fmtPos(q.position)}</td>
                      <td className={td}>
                        {strike ? (
                          <Pill tone="violet">Striking distance · +{fmtInt(forecastClicks(q))} clicks at #3</Pill>
                        ) : qGap ? (
                          <Pill tone="red">Low CTR · ~{fmtInt(qGap.missedClicks)} missed</Pill>
                        ) : (
                          <span className="text-xs text-slate-400">—</span>
                        )}
                      </td>
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

function IssueList({ sev, items }: { sev: keyof typeof SEVERITY; items: AuditIssueLike[] }) {
  const s = SEVERITY[sev];
  const Icon = s.icon;
  return (
    <div>
      {sev !== "pass" && <h4 className={clsx("text-xs font-semibold uppercase tracking-wide mb-1.5", s.cls)}>{s.label}</h4>}
      <ul className="space-y-1.5">
        {items.map((i, n) => (
          <li key={`${i.field}-${n}`} className="flex gap-2 text-sm text-slate-700">
            <Icon className={clsx("w-4 h-4 shrink-0 mt-0.5", s.cls)} aria-hidden="true" />
            <span>{i.message}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string | null }) {
  return (
    <div>
      <dt className="text-xs font-medium text-slate-500">{label}</dt>
      <dd className={clsx("mt-0.5 break-words", value ? "text-slate-900" : "text-red-700")}>{value || "Missing"}</dd>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-slate-500">{label}</dt>
      <dd className="font-semibold text-slate-900 tabular-nums">{value}</dd>
    </div>
  );
}

// ─── Index view (no URL selected) ────────────────────────────────────────

async function AuditIndex({
  audits,
  records,
  suggestions,
}: {
  audits: Awaited<ReturnType<typeof latestAudits>>;
  records: Awaited<ReturnType<typeof loadContentIndex>>;
  suggestions: string[];
}) {
  const window = await gscWindow(28);
  const traffic = await pageAggs(window.start, window.end);
  const auditedPaths = new Set(audits.map((a) => pathKey(a.url)));
  const unaudited = records
    .filter((r) => !auditedPaths.has(r.path))
    .map((r) => ({ ...r, agg: traffic.get(r.path) ?? EMPTY_AGG }))
    .sort((a, b) => b.agg.impressions - a.agg.impressions)
    .slice(0, 8);
  const avg = audits.length ? Math.round(audits.reduce((s, a) => s + a.score, 0) / audits.length) : 0;
  const below = audits.filter((a) => a.score < 70).length;

  return (
    <div className="space-y-6">
      <PageIntro
        title="Page analyzer"
        description="Audit any live page, see what changed since the last audit, and how it performs in search. Pages are re-audited automatically every week."
      />
      <AuditRunner suggestions={suggestions} />

      <div className="grid grid-cols-1 min-[420px]:grid-cols-3 gap-4">
        <Kpi label="Pages audited" value={fmtInt(audits.length)} />
        <Kpi label="Average audit score" value={audits.length ? `${avg}/100` : "—"} />
        <Kpi label="Below 70" value={fmtInt(below)} hint={below ? "Worst first below" : undefined} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-6 items-start">
        <Panel id="pa-audited" title="Audited pages" meta="Latest audit per URL, lowest score first." flush>
          {audits.length === 0 ? (
            <div className="px-4 sm:px-5 pb-5"><EmptyState title="No audits yet">Run your first audit above.</EmptyState></div>
          ) : (
            <TableScroll label="Audited pages">
              <table className="min-w-full border-t border-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th scope="col" className={th}>Page</th>
                    <th scope="col" className={thNum}>Score</th>
                    <th scope="col" className={thNum}>Runs</th>
                    <th scope="col" className={thNum}>Last audit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {audits.slice(0, 100).map((a) => (
                    <tr key={a.id} className="hover:bg-slate-50/70">
                      <td className={clsx(td, "min-w-[16rem] max-w-[28rem]")}>
                        <Link href={`/admin/seo/page-analyzer/?url=${encodeURIComponent(a.url)}`} className="font-medium text-slate-900 hover:text-amber-700 break-all">
                          {displayUrl(a.url)}
                        </Link>
                        {a.title && <div className="text-xs text-slate-500 truncate">{a.title}</div>}
                      </td>
                      <td className={tdNum}><ScoreBadge score={a.score} /></td>
                      <td className={tdNum}>{a.runs}</td>
                      <td className={tdNum}>{fmtDay(a.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableScroll>
          )}
        </Panel>

        <Panel id="pa-unaudited" title="Not audited yet" meta="Live content pages with the most search impressions and no audit on record.">
          {unaudited.length === 0 ? (
            <EmptyState title="Every live page has an audit" />
          ) : (
            <ul className="divide-y divide-slate-100">
              {unaudited.map((r) => (
                <li key={`${r.kind}-${r.id}`}>
                  <Link href={`/admin/seo/page-analyzer/?url=${encodeURIComponent(r.path)}`} className="flex items-center justify-between gap-3 py-2.5 -mx-2 px-2 rounded hover:bg-slate-50">
                    <span className="min-w-0">
                      <span className="block text-sm font-medium text-slate-900 truncate">{r.title}</span>
                      <span className="block text-xs text-slate-500">{KIND_LABEL[r.kind]} · {r.path}</span>
                    </span>
                    <span className="shrink-0 text-xs text-slate-500 tabular-nums">{fmtInt(r.agg.impressions)} impr</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>
    </div>
  );
}
