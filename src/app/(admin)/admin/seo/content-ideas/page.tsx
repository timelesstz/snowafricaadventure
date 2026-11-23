import Link from "next/link";
import { ExternalLink, FilePlus2, Link2, Pencil, RefreshCw } from "lucide-react";
import { clsx } from "clsx";
import { requireRole } from "@/lib/auth";
import { failedChecks, loadContentIndex, type ContentRecord } from "@/lib/seo-intel/content-index";
import {
  AREA_KINDS,
  buildIdeas,
  clusterQueries,
  refreshPriority,
  refreshReasons,
  type ContentIdea,
  type FocusArea,
  type RefreshCode,
} from "@/lib/seo-intel/content-ideas";
import { gscWindow, pageAggs, parsePeriod, queryPageRows } from "@/lib/seo-intel/data";
import { EDIT_HREF, KIND_LABEL } from "@/lib/seo-intel/paths";
import { aggregate, EMPTY_AGG } from "@/lib/seo-intel/rules";
import MetaFixButton from "@/components/admin/seo/intel/MetaFixButton";
import {
  EmptyState,
  fmtInt,
  fmtPos,
  fmtWindow,
  Kpi,
  PageIntro,
  Panel,
  Pill,
  ScoreBadge,
  SegmentLinks,
} from "@/components/admin/seo/intel/ui";

export const dynamic = "force-dynamic";
export const metadata = { title: "Content ideas · SEO" };

type SearchParams = Promise<Record<string, string | string[] | undefined>>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

const BASE = "/admin/seo/content-ideas/";
const AREAS = [
  { value: "route", label: "Treks & routes" },
  { value: "tour", label: "Safaris & tours" },
] as const;
const PERIOD_OPTIONS = [
  { value: 28, label: "28 days" },
  { value: 90, label: "90 days" },
] as const;
const AREA_NOUN: Record<FocusArea, string> = { route: "treks and Kilimanjaro routes", tour: "safaris and tours" };
const LIST_LIMIT = 12;

const REASON: Record<RefreshCode, { label: string; tone: "red" | "amber" | "sky" | "violet" | "slate" }> = {
  falling: { label: "Falling", tone: "red" },
  "query-gap": { label: "Search gap", tone: "violet" },
  striking: { label: "Near top 3", tone: "sky" },
  snippet: { label: "Weak snippet", tone: "amber" },
  weak: { label: "Thin content", tone: "amber" },
  stale: { label: "Out of date", tone: "slate" },
  invisible: { label: "Not in Google", tone: "red" },
};

export default async function ContentIdeasPage({ searchParams }: { searchParams: SearchParams }) {
  await requireRole("VIEWER");
  const sp = await searchParams;
  const area: FocusArea = one(sp.area) === "tour" ? "tour" : "route";
  const period = parsePeriod(one(sp.period), 28) === 90 ? 90 : 28;
  const showAll = one(sp.all) === "1";

  const win = await gscWindow(period);
  const [records, rows, traffic, previous] = await Promise.all([
    loadContentIndex(),
    queryPageRows(win.start, win.end),
    pageAggs(win.start, win.end),
    pageAggs(win.prevStart, win.start),
  ]);
  const hasSearchData = win.latest !== null;

  // Ideas from searches. Thresholds scale with the window so 90 days isn't all noise.
  const clusters = clusterQueries(rows, { minImpressions: period === 90 ? 80 : 30 });
  const ideas = buildIdeas(clusters, records).filter((i) => i.cluster.topic.area === area && i.status !== "covered");
  const areaClusters = clusters.filter((c) => c.topic.area === area);
  const demand = aggregate(areaClusters.map((c) => c.agg));
  const newIdeas = ideas.filter((i) => i.status === "new");
  const kinds = AREA_KINDS[area];
  const guideIdeas = ideas.filter((i) => i.status === "refresh" && !(i.target?.content && kinds.includes(i.target.content.kind)));

  // Bookable pages in this area, each with every reason it needs work.
  const ideasByRecord = new Map<string, ContentIdea[]>();
  for (const i of ideas) {
    const id = i.target?.content?.id;
    if (i.status === "refresh" && id) ideasByRecord.set(id, [...(ideasByRecord.get(id) ?? []), i]);
  }
  const pages = records
    .filter((r) => r.isLive && kinds.includes(r.kind))
    .map((r) => {
      const agg = traffic.get(r.path) ?? EMPTY_AGG;
      const fails = failedChecks(r.result);
      const reasons = refreshReasons({
        agg,
        previous: previous.get(r.path) ?? EMPTY_AGG,
        score: r.result.score,
        fails,
        updatedAt: r.updatedAt,
        isLive: r.isLive,
        ideas: ideasByRecord.get(r.id) ?? [],
        days: period,
        hasSearchData,
      });
      return { record: r, agg, reasons, priority: refreshPriority(r.kind, reasons, r.result.score, agg.impressions) };
    })
    .filter((p) => p.reasons.length > 0)
    .sort((a, b) => b.priority - a.priority);

  const reach = ideas.reduce((s, i) => s + i.gain, 0);
  const params = { area, period: String(period), all: showAll ? "1" : undefined };
  const allHref = (on: boolean) => {
    const next = new URLSearchParams({ area, period: String(period) });
    if (on) next.set("all", "1");
    return `${BASE}?${next.toString()}`;
  };

  return (
    <div className="space-y-6">
      <PageIntro
        title="Content ideas"
        description={
          <>
            What to refresh and what to write next for {AREA_NOUN[area]}, from the searches that find the site and each page’s
            content score. Search data: {hasSearchData ? fmtWindow(win.start, win.end) : "not connected"}.
          </>
        }
      >
        <SegmentLinks label="Focus" param="area" options={AREAS} value={area} basePath={BASE} params={params} />
        <SegmentLinks label="Period" param="period" options={PERIOD_OPTIONS} value={period} basePath={BASE} params={params} />
      </PageIntro>

      <div className="grid grid-cols-1 min-[420px]:grid-cols-2 xl:grid-cols-4 gap-4">
        <Kpi
          label={`Searches about ${area === "route" ? "treks" : "safaris"}`}
          value={hasSearchData ? fmtInt(demand.impressions) : "—"}
          hint={hasSearchData && demand.impressions ? `Average position ${fmtPos(demand.position)}, ${fmtInt(demand.clicks)} clicks` : "Connect Search Console"}
        />
        <Kpi label="Pages to refresh" value={fmtInt(pages.length)} hint={`of ${records.filter((r) => r.isLive && kinds.includes(r.kind)).length} live ${area === "route" ? "routes" : "tours"}`} />
        <Kpi label="New pages to write" value={fmtInt(newIdeas.length)} hint={newIdeas.length ? "Searches with no page for them" : "Every topic has a page"} />
        <Kpi label="Clicks within reach" value={hasSearchData ? `~${fmtInt(reach)}` : "—"} hint={`Extra clicks per ${period} days if these topics reached position 3`} />
      </div>

      {!hasSearchData && (
        <EmptyState
          title="Search Console has no data yet"
          action={<Link href="/admin/seo/settings/" className="text-sm font-medium text-amber-700 hover:underline">Check the connection</Link>}
        >
          Ideas come from real searches. Until data arrives, only content-score and out-of-date checks are shown.
        </EmptyState>
      )}

      <Panel
        id="ci-new"
        title="Write next"
        meta="Searches with real demand and no page that answers them. Biggest opportunity first."
      >
        {newIdeas.length === 0 ? (
          <EmptyState title="No missing pages">
            Every {area === "route" ? "trek" : "safari"} topic people search for already has a page. The gains are in refreshing them, below.
          </EmptyState>
        ) : (
          <ul className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {newIdeas.map((i) => (
              <IdeaCard key={i.cluster.key} idea={i} />
            ))}
          </ul>
        )}
      </Panel>

      <Panel
        id="ci-refresh"
        title={`Refresh these ${area === "route" ? "route" : "tour"} pages`}
        meta="Bookable pages, most valuable first. Each reason says what is wrong and roughly how many clicks fixing it is worth."
      >
        {pages.length === 0 ? (
          <EmptyState title="Nothing to refresh">Every live page is growing, ranks well and passes its content checks.</EmptyState>
        ) : (
          <>
            <ol className="divide-y divide-slate-100">
              {(showAll ? pages : pages.slice(0, LIST_LIMIT)).map((p, idx) => (
                <RefreshRow key={p.record.id} rank={idx + 1} record={p.record} agg={p.agg} reasons={p.reasons} />
              ))}
            </ol>
            {pages.length > LIST_LIMIT && (
              <div className="pt-3">
                <Link href={allHref(!showAll)} scroll={false} className="text-sm font-medium text-amber-700 hover:underline">
                  {showAll ? "Show the top " + LIST_LIMIT : `Show all ${pages.length} pages`}
                </Link>
              </div>
            )}
          </>
        )}
      </Panel>

      <Panel
        id="ci-guides"
        title="Refresh the guides that rank for these searches"
        meta="Posts and guide pages Google shows for trip searches. Improve the one Google already prefers, and send its readers to the bookable page."
      >
        {guideIdeas.length === 0 ? (
          <EmptyState title="No guide pages to refresh">Searches in this area land on bookable pages, which are covered above.</EmptyState>
        ) : (
          <ul className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {guideIdeas.slice(0, showAll ? undefined : LIST_LIMIT).map((i) => (
              <IdeaCard key={i.cluster.key} idea={i} />
            ))}
          </ul>
        )}
      </Panel>

      <p className="text-xs text-slate-500 max-w-3xl">
        How this works: searches are grouped by topic (a route, a park, Kilimanjaro in general) and intent (price, best time, a
        7-day itinerary). Each group is matched to the page that should answer it; a page already in the top five for most of
        those searches counts as covered and is hidden. Click estimates use the click-through rate at position 3 and are a
        guide, not a forecast. Brand searches are left out.
      </p>
    </div>
  );
}

function RefreshRow({
  rank,
  record,
  agg,
  reasons,
}: {
  rank: number;
  record: ContentRecord;
  agg: { clicks: number; impressions: number; position: number };
  reasons: ReturnType<typeof refreshReasons>;
}) {
  const gain = reasons.reduce((s, r) => s + r.gain, 0);
  const hasSnippet = reasons.some((r) => r.code === "snippet");
  return (
    <li className="py-3.5 flex flex-col md:flex-row md:items-start gap-3">
      <span className="hidden md:flex w-7 h-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600 tabular-nums" aria-hidden="true">
        {rank}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="font-medium text-slate-900">{record.title}</span>
          <Pill>{KIND_LABEL[record.kind]}</Pill>
          <ScoreBadge score={record.result.score} />
        </div>
        <p className="text-xs text-slate-500 mt-0.5 tabular-nums">
          {fmtInt(agg.impressions)} impressions · {fmtInt(agg.clicks)} clicks · position {fmtPos(agg.position)}
          {gain > 0 && <span className="font-semibold text-emerald-700"> · ~{fmtInt(gain)} clicks to gain</span>}
        </p>
        <ul className="mt-2 space-y-1.5">
          {reasons.map((r, i) => (
            <li key={`${r.code}-${i}`} className="flex flex-col min-[480px]:flex-row min-[480px]:items-start gap-1 min-[480px]:gap-2 text-sm text-slate-700">
              <span className="shrink-0 min-[480px]:w-28">
                <Pill tone={REASON[r.code].tone}>{REASON[r.code].label}</Pill>
              </span>
              <span className="min-w-0">{r.text}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-wrap items-center gap-1.5 md:justify-end shrink-0">
        {hasSnippet && (
          <MetaFixButton compact kind={record.kind} id={record.id} title={record.title} path={record.path} metaTitle={record.metaTitle} metaDescription={record.metaDescription} label="Rewrite snippet" />
        )}
        <Link href={record.editHref} className="inline-flex items-center gap-1 min-h-9 px-3 rounded-md border border-slate-300 text-xs font-medium text-slate-700 hover:bg-slate-50">
          <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
          Edit<span className="sr-only"> {record.title}</span>
        </Link>
        <a href={record.path} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 min-h-9 px-2.5 rounded-md text-xs font-medium text-slate-600 hover:bg-slate-100">
          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          View<span className="sr-only"> {record.title} (opens in new tab)</span>
        </a>
      </div>
    </li>
  );
}

function IdeaCard({ idea }: { idea: ContentIdea }) {
  const { cluster, target, status } = idea;
  const isNew = status === "new";
  const queries = cluster.queries.slice(0, 8);
  return (
    <li className={clsx("rounded-lg border p-4 flex flex-col gap-3", isNew ? "border-violet-200 bg-violet-50/40" : "border-slate-200 bg-white")}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-1.5">
            {isNew ? (
              <Pill tone="violet"><FilePlus2 className="w-3 h-3 mr-1" aria-hidden="true" />New page</Pill>
            ) : (
              <Pill tone="sky"><RefreshCw className="w-3 h-3 mr-1" aria-hidden="true" />Refresh</Pill>
            )}
            <Pill>{cluster.intent.label}</Pill>
          </div>
          <h4 className="mt-1.5 font-semibold text-slate-900">{idea.title}</h4>
        </div>
        <div className="text-right shrink-0">
          <p className="text-lg font-bold text-emerald-700 tabular-nums leading-tight">~{fmtInt(idea.gain)}</p>
          <p className="text-xs text-slate-500">clicks to gain</p>
        </div>
      </div>

      <p className="text-sm text-slate-700">{idea.advice}</p>

      <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
        <dt className="text-slate-500">Searches</dt>
        <dd className="text-right tabular-nums text-slate-900">{fmtInt(cluster.agg.impressions)}</dd>
        <dt className="text-slate-500">Our average position</dt>
        <dd className="text-right tabular-nums text-slate-900">{fmtPos(cluster.agg.position)}</dd>
        {target && (
          <>
            <dt className="text-slate-500">This page’s position</dt>
            <dd className="text-right tabular-nums text-slate-900">{idea.targetPosition > 0 ? fmtPos(idea.targetPosition) : "not shown"}</dd>
          </>
        )}
      </dl>

      {target && (
        <div className="text-sm">
          <span className="text-slate-500">Page: </span>
          <a href={target.path} target="_blank" rel="noreferrer" className="font-medium text-slate-900 hover:text-amber-700 break-words">
            {target.title}
            <span className="sr-only"> (opens in new tab)</span>
          </a>
          {!target.content && <span className="ml-1.5"><Pill>Built in code</Pill></span>}
        </div>
      )}
      {idea.googlePage && (
        <p className="text-xs text-slate-600">
          Google mostly shows <span className="font-medium break-all">{idea.googlePage.path}</span> (position {fmtPos(idea.googlePage.agg.position)}) for these searches.
        </p>
      )}
      {idea.competing.length > 0 && (
        <p className="text-xs text-amber-800">
          Also splitting these searches: {idea.competing.map((p) => p.path).join(", ")}. Pick one page to lead and link the others to it.
        </p>
      )}
      {idea.linkTo && (
        <p className="text-xs text-slate-600 inline-flex items-start gap-1">
          <Link2 className="w-3.5 h-3.5 mt-px shrink-0 text-slate-400" aria-hidden="true" />
          <span>
            Link prominently to the bookable page:{" "}
            <Link href={idea.linkTo.path} className="font-medium text-amber-700 hover:underline">{idea.linkTo.title}</Link>
          </span>
        </p>
      )}

      <details className="group">
        <summary className="cursor-pointer text-xs font-medium text-slate-600 hover:text-slate-900 min-h-6">
          {cluster.queries.length} search{cluster.queries.length === 1 ? "" : "es"} in this group
        </summary>
        <ul className="mt-2 space-y-1">
          {queries.map((q) => (
            <li key={q.query} className="flex items-baseline justify-between gap-3 text-xs">
              <span className="text-slate-700 break-words min-w-0">{q.query}</span>
              <span className="shrink-0 tabular-nums text-slate-500">
                {fmtInt(q.agg.impressions)} · pos {fmtPos(q.agg.position)}
              </span>
            </li>
          ))}
          {cluster.queries.length > queries.length && <li className="text-xs text-slate-400">+{cluster.queries.length - queries.length} more</li>}
        </ul>
      </details>

      <div className="flex flex-wrap gap-1.5 mt-auto">
        {target?.content ? (
          <Link href={EDIT_HREF[target.content.kind](target.content.id)} className="inline-flex items-center gap-1 min-h-9 px-3 rounded-md bg-slate-900 text-white text-xs font-medium hover:bg-slate-800">
            <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
            Edit page<span className="sr-only"> {target.title}</span>
          </Link>
        ) : isNew ? (
          <Link href={newHref(idea)} className="inline-flex items-center gap-1 min-h-9 px-3 rounded-md bg-slate-900 text-white text-xs font-medium hover:bg-slate-800">
            <FilePlus2 className="w-3.5 h-3.5" aria-hidden="true" />
            Start a draft
          </Link>
        ) : null}
      </div>
    </li>
  );
}

/** Guides start as blog drafts; a missing itinerary or trip page starts as a route or safari draft. */
const newHref = (idea: ContentIdea) =>
  idea.cluster.intent.informational
    ? "/admin/blog/new/"
    : idea.cluster.topic.area === "route"
      ? "/admin/routes/new/"
      : "/admin/safaris/new/";
