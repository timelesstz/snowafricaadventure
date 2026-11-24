import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, ExternalLink, GitFork, Lightbulb, Search, Sparkle, Target } from "lucide-react";
import { clsx } from "clsx";
import { requireRole } from "@/lib/auth";
import { indexByPath, loadContentIndex, type ContentRecord } from "@/lib/seo-intel/content-index";
import { gscDaily, gscWindow, pageAggs, parsePeriod, queryPageRows } from "@/lib/seo-intel/data";
import { KIND_LABEL } from "@/lib/seo-intel/paths";
import {
  aggregate,
  aggregateBy,
  ctrGap,
  detectCannibalization,
  EMPTY_AGG,
  expectedCtr,
  findMovers,
  forecastClicks,
  isStrikingDistance,
  pctChange,
  type Agg,
  type Cannibalization,
  type CtrGap,
  type Mover,
} from "@/lib/seo-intel/rules";
import MetaFixButton from "@/components/admin/seo/intel/MetaFixButton";
import TrendChart from "@/components/admin/seo/intel/TrendChart";
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
  SegmentLinks,
  TableScroll,
  td,
  tdNum,
  th,
  thNum,
} from "@/components/admin/seo/intel/ui";

export const dynamic = "force-dynamic";
export const maxDuration = 60;
export const metadata = { title: "Search Console · SEO" };

type SearchParams = Promise<Record<string, string | string[] | undefined>>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

const TABS = [
  { value: "opportunities", label: "Opportunities" },
  { value: "queries", label: "Queries" },
  { value: "pages", label: "Pages" },
] as const;
type Tab = (typeof TABS)[number]["value"];
const SORTS = ["clicks", "impressions", "ctr", "position", "change"] as const;
type Sort = (typeof SORTS)[number];
const PAGE_SIZE = 50;
const BASE = "/admin/seo/search-console/";
const BRAND_QUERY = /snow[\s-]*africa/i;
const analyzeHref = (path: string) => `/admin/seo/page-analyzer/?url=${encodeURIComponent(path)}`;

type PageGap = { path: string; agg: Agg; gap: CtrGap };

function sortRows<T extends { agg: Agg; prev: Agg }>(rows: T[], sort: Sort): T[] {
  return [...rows].sort((a, b) => {
    switch (sort) {
      case "impressions":
        return b.agg.impressions - a.agg.impressions;
      case "ctr":
        return b.agg.ctr - a.agg.ctr || b.agg.impressions - a.agg.impressions;
      case "position":
        return (a.agg.position || 999) - (b.agg.position || 999);
      case "change":
        return Math.abs(b.agg.clicks - b.prev.clicks) - Math.abs(a.agg.clicks - a.prev.clicks);
      default:
        return b.agg.clicks - a.agg.clicks || b.agg.impressions - a.agg.impressions;
    }
  });
}

export default async function SearchConsolePage({ searchParams }: { searchParams: SearchParams }) {
  await requireRole("VIEWER");
  const sp = await searchParams;
  const period = parsePeriod(one(sp.period), 28);
  const q = (one(sp.q) || one(sp.query)).trim().toLowerCase();
  const tabParam = one(sp.tab);
  const tab: Tab = TABS.some((t) => t.value === tabParam) ? (tabParam as Tab) : q ? "queries" : "opportunities";
  const sort: Sort = (SORTS as readonly string[]).includes(one(sp.sort)) ? (one(sp.sort) as Sort) : "clicks";
  const page = Math.max(1, Math.floor(Number(one(sp.page))) || 1);

  const win = await gscWindow(period);
  if (!win.latest) {
    return (
      <div className="space-y-6">
        <PageIntro title="Search Console" description="Queries, pages and ranking opportunities from Google Search." />
        <EmptyState
          title="No Search Console data yet"
          action={
            <Link href="/admin/seo/settings/" className="min-h-9 inline-flex items-center px-3 rounded-md bg-amber-600 text-[var(--primary-dark)] text-sm font-semibold hover:bg-amber-500">
              Open SEO settings
            </Link>
          }
        >
          Connect Search Console and run a sync to see which searches bring visitors, where rankings move, and which snippets lose clicks.
        </EmptyState>
      </div>
    );
  }

  const [rows, prevRows, pages, prevPages, daily, prevDaily, records] = await Promise.all([
    queryPageRows(win.start, win.end),
    queryPageRows(win.prevStart, win.start),
    pageAggs(win.start, win.end),
    pageAggs(win.prevStart, win.start),
    gscDaily(win.start, win.end),
    gscDaily(win.prevStart, win.start),
    loadContentIndex(),
  ]);
  const content = indexByPath(records);

  const total = aggregate(daily);
  const prevTotal = aggregate(prevDaily);
  const queries = aggregateBy(rows, (r) => r.query);
  const prevQueries = aggregateBy(prevRows, (r) => r.query);

  // Best-ranking page per query, and how many of our pages appear for it.
  const topPage = new Map<string, { page: string; impressions: number; count: number }>();
  for (const r of rows) {
    const cur = topPage.get(r.query);
    if (!cur) topPage.set(r.query, { page: r.page, impressions: r.impressions, count: 1 });
    else {
      cur.count++;
      if (r.impressions > cur.impressions) {
        cur.page = r.page;
        cur.impressions = r.impressions;
      }
    }
  }

  const queryMovers = findMovers(queries, prevQueries);
  const pageMovers = findMovers(pages, prevPages, { minImpressions: 50 });
  // Brand searches always show several of our pages (home, contact, sitelinks); that is not cannibalization.
  const cannibal = detectCannibalization(rows).filter((c) => !BRAND_QUERY.test(c.query));
  const striking = [...queries]
    .filter(([, a]) => isStrikingDistance(a))
    .map(([query, agg]) => ({ query, agg, gain: forecastClicks(agg) }))
    .filter((s) => s.gain > 0)
    .sort((a, b) => b.gain - a.gain);
  const pageGaps: PageGap[] = [];
  for (const [path, agg] of pages) {
    const gap = ctrGap(agg);
    if (gap) pageGaps.push({ path, agg, gap });
  }
  pageGaps.sort((a, b) => b.gap.missedClicks - a.gap.missedClicks);

  const strikingGain = striking.reduce((s, x) => s + x.gain, 0);
  const missedTotal = pageGaps.reduce((s, x) => s + x.gap.missedClicks, 0);
  const vs = `vs previous ${period} days`;

  const params: Record<string, string | undefined> = {
    period: String(period),
    tab,
    q: q || undefined,
    sort: sort !== "clicks" ? sort : undefined,
  };
  const hrefWith = (patch: Record<string, string | undefined>) => {
    const next = new URLSearchParams();
    for (const [k, v] of Object.entries({ ...params, ...patch })) if (v) next.set(k, v);
    return `${BASE}?${next.toString()}`;
  };

  // Headline insights, written from this period's numbers.
  const insights: Array<{ tone: "good" | "bad" | "idea"; text: string; href?: string }> = [];
  const clicksChange = pctChange(total.clicks, prevTotal.clicks);
  if (clicksChange !== null && Math.abs(clicksChange) >= 10) {
    const driver = [...pageMovers]
      .filter((m) => Math.sign(m.clicksDelta) === Math.sign(clicksChange))
      .sort((a, b) => Math.abs(b.clicksDelta) - Math.abs(a.clicksDelta))[0];
    const driverName = driver ? content.get(driver.key)?.title ?? driver.key : null;
    insights.push({
      tone: clicksChange > 0 ? "good" : "bad",
      text: `Clicks ${clicksChange > 0 ? "rose" : "fell"} ${Math.abs(Math.round(clicksChange))}% ${vs}.${
        driver ? ` The biggest single change is ${driverName} (${driver.clicksDelta > 0 ? "+" : ""}${fmtInt(driver.clicksDelta)} clicks).` : ""
      }`,
      href: driver ? analyzeHref(driver.key) : undefined,
    });
  }
  if (missedTotal > 0)
    insights.push({
      tone: "idea",
      text: `${pageGaps.length} page-one URL${pageGaps.length === 1 ? " earns" : "s earn"} fewer clicks than their position should, about ${fmtInt(missedTotal)} clicks missed. Rewriting those titles and descriptions is the cheapest win here.`,
      href: hrefWith({ tab: "opportunities", page: undefined }) + "#sc-ctr",
    });
  if (strikingGain > 0)
    insights.push({
      tone: "idea",
      text: `${striking.length} quer${striking.length === 1 ? "y sits" : "ies sit"} on positions 8–20. Moving them into the top three is worth about ${fmtInt(strikingGain)} extra clicks per ${period} days.`,
      href: hrefWith({ tab: "opportunities", page: undefined }) + "#sc-striking",
    });
  if (cannibal.length > 0)
    insights.push({
      tone: "bad",
      text: `${cannibal.length} quer${cannibal.length === 1 ? "y has" : "ies have"} two or more of our pages competing, which splits ranking signals. The largest is “${cannibal[0].query}”.`,
      href: hrefWith({ tab: "opportunities", page: undefined }) + "#sc-cannibal",
    });

  return (
    <div className="space-y-6">
      <PageIntro
        title="Search Console"
        description={
          <>
            Google Search for {fmtWindow(win.start, win.end)}, compared with the {period} days before. Search Console reports 2–3 days late, so the window ends on the latest day with data.
          </>
        }
      >
        <SegmentLinks
          label="Period"
          param="period"
          basePath={BASE}
          params={{ tab, q: q || undefined, sort: params.sort }}
          value={period}
          options={[
            { value: 7, label: "7 days" },
            { value: 28, label: "28 days" },
            { value: 90, label: "90 days" },
          ]}
        />
      </PageIntro>

      <div className="grid grid-cols-1 min-[420px]:grid-cols-2 xl:grid-cols-4 gap-4">
        <Kpi label="Clicks" value={fmtInt(total.clicks)} delta={<Delta value={clicksChange} label={vs} />} />
        <Kpi label="Impressions" value={fmtInt(total.impressions)} delta={<Delta value={pctChange(total.impressions, prevTotal.impressions)} label={vs} />} />
        <Kpi
          label="CTR"
          value={fmtPct(total.ctr, 2)}
          delta={<Delta value={prevTotal.impressions ? (total.ctr - prevTotal.ctr) * 100 : null} suffix=" pts" digits={2} label={vs} />}
          hint="clicks ÷ impressions"
        />
        <Kpi
          label="Avg. position"
          value={fmtPos(total.position)}
          delta={prevTotal.position ? <Delta value={total.position - prevTotal.position} suffix="" digits={1} invert label={vs} /> : undefined}
          hint="weighted by impressions"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-6 items-start">
        <Panel id="sc-trend" title="Daily clicks and position">
          {daily.length === 0 ? (
            <EmptyState title="No daily data in this window" />
          ) : (
            <TrendChart
              summary={`Daily clicks and average position, ${fmtWindow(win.start, win.end)}. ${fmtInt(total.clicks)} clicks in total.`}
              data={daily.map((d) => ({ date: d.date, clicks: d.clicks, position: Number(d.position.toFixed(1)) }))}
              series={[
                { key: "clicks", label: "Clicks", color: "#0f766e" },
                { key: "position", label: "Avg. position", color: "#7c3aed", right: true, reversed: true, format: "pos" },
              ]}
            />
          )}
        </Panel>
        <Panel id="sc-insights" title="What the data says" meta="Worked out from this period's numbers.">
          {insights.length === 0 ? (
            <EmptyState title="Nothing stands out">Traffic is steady and no page or query needs urgent work.</EmptyState>
          ) : (
            <ul className="space-y-3">
              {insights.map((i) => {
                const Icon = i.tone === "good" ? ArrowUpRight : i.tone === "bad" ? ArrowDownRight : Lightbulb;
                return (
                  <li key={i.text} className="flex gap-2.5 text-sm text-slate-700">
                    <Icon
                      className={clsx("w-4 h-4 shrink-0 mt-0.5", i.tone === "good" ? "text-emerald-600" : i.tone === "bad" ? "text-red-600" : "text-amber-600")}
                      aria-hidden="true"
                    />
                    <span>
                      {i.text}
                      {i.href && (
                        <>
                          {" "}
                          <Link href={i.href} className="font-medium text-amber-700 hover:underline">
                            Show me
                          </Link>
                        </>
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </Panel>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-3">
        <SegmentLinks label="View" param="tab" basePath={BASE} params={{ period: String(period), q: q || undefined }} value={tab} options={TABS} />
        {tab !== "opportunities" && (
          <form method="get" action={BASE} className="flex flex-wrap items-end gap-2">
            <input type="hidden" name="period" value={period} />
            <input type="hidden" name="tab" value={tab} />
            <label className="flex-1 min-w-[12rem]">
              <span className="sr-only">{tab === "queries" ? "Filter queries" : "Filter pages"}</span>
              <span className="relative block">
                <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" aria-hidden="true" />
                <input
                  name="q"
                  defaultValue={q}
                  placeholder={tab === "queries" ? "Filter queries" : "Filter URLs"}
                  className="w-full min-h-10 rounded-md border border-slate-300 pl-8 pr-3 text-sm focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-600/30"
                />
              </span>
            </label>
            <label>
              <span className="sr-only">Sort by</span>
              <select name="sort" defaultValue={sort} className="min-h-10 rounded-md border border-slate-300 bg-white px-2 text-sm">
                <option value="clicks">Most clicks</option>
                <option value="impressions">Most impressions</option>
                <option value="ctr">Highest CTR</option>
                <option value="position">Best position</option>
                <option value="change">Biggest change</option>
              </select>
            </label>
            <button type="submit" className="min-h-10 px-4 rounded-md bg-slate-900 text-white text-sm font-medium hover:bg-slate-800">
              Apply
            </button>
          </form>
        )}
      </div>

      {tab === "opportunities" && (
        <Opportunities period={period} striking={striking} pageGaps={pageGaps} cannibal={cannibal} queryMovers={queryMovers} content={content} />
      )}

      {tab === "queries" && (
        <QueriesTable
          list={sortRows(
            [...queries]
              .filter(([query]) => !q || query.toLowerCase().includes(q))
              .map(([query, agg]) => ({ query, agg, prev: prevQueries.get(query) ?? EMPTY_AGG, top: topPage.get(query) })),
            sort
          )}
          q={q}
          page={page}
          vs={vs}
          content={content}
          hrefWith={hrefWith}
        />
      )}

      {tab === "pages" && (
        <PagesTable
          list={sortRows(
            [...pages]
              .filter(([path]) => !q || path.includes(q))
              .map(([path, agg]) => ({ path, agg, prev: prevPages.get(path) ?? EMPTY_AGG, item: content.get(path) ?? null })),
            sort
          )}
          q={q}
          page={page}
          vs={vs}
          hrefWith={hrefWith}
        />
      )}
    </div>
  );
}

function Pager({ page, pageCount, hrefWith }: { page: number; pageCount: number; hrefWith: (p: Record<string, string | undefined>) => string }) {
  if (pageCount <= 1) return null;
  return (
    <nav aria-label="Table pages" className="flex items-center justify-between gap-3 border-t border-slate-200 px-4 sm:px-5 py-3 text-sm">
      <span className="text-slate-500">
        Page {page} of {pageCount}
      </span>
      <span className="flex gap-2">
        {page > 1 && (
          <Link href={hrefWith({ page: String(page - 1) })} className="min-h-9 px-3 inline-flex items-center rounded-md border border-slate-300 hover:bg-slate-50">
            Previous
          </Link>
        )}
        {page < pageCount && (
          <Link href={hrefWith({ page: String(page + 1) })} className="min-h-9 px-3 inline-flex items-center rounded-md border border-slate-300 hover:bg-slate-50">
            Next
          </Link>
        )}
      </span>
    </nav>
  );
}

function QueriesTable({
  list,
  q,
  page,
  vs,
  content,
  hrefWith,
}: {
  list: Array<{ query: string; agg: Agg; prev: Agg; top?: { page: string; count: number } }>;
  q: string;
  page: number;
  vs: string;
  content: Map<string, ContentRecord>;
  hrefWith: (p: Record<string, string | undefined>) => string;
}) {
  const pageCount = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);
  const visible = list.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);
  return (
    <Panel id="sc-queries" title="Queries" meta={`${fmtInt(list.length)} queries${q ? ` matching “${q}”` : ""}. CTR and position are weighted by impressions.`} flush>
      {visible.length === 0 ? (
        <div className="px-4 sm:px-5 pb-5">
          <EmptyState title="No queries match">Try a shorter filter or a longer period.</EmptyState>
        </div>
      ) : (
        <TableScroll label="Queries">
          <table className="min-w-full border-t border-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className={th}>Query</th>
                <th scope="col" className={thNum}>Clicks</th>
                <th scope="col" className={thNum}>Impr.</th>
                <th scope="col" className={thNum}>CTR</th>
                <th scope="col" className={thNum}>Position</th>
                <th scope="col" className={th}>Ranking page</th>
                <th scope="col" className={th}>Signal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {visible.map((r) => {
                const gap = ctrGap(r.agg, { minImpressions: 30 });
                return (
                  <tr key={r.query} className="hover:bg-slate-50/70">
                    <td className={clsx(td, "min-w-[14rem] font-medium text-slate-900")}>{r.query}</td>
                    <td className={tdNum}>
                      <div>{fmtInt(r.agg.clicks)}</div>
                      {r.prev.clicks > 0 && <Delta value={pctChange(r.agg.clicks, r.prev.clicks)} label={vs} />}
                    </td>
                    <td className={tdNum}>{fmtInt(r.agg.impressions)}</td>
                    <td className={tdNum}>
                      <div>{fmtPct(r.agg.ctr)}</div>
                      {r.agg.position > 0 && r.agg.position <= 20 && <div className="text-xs text-slate-500">expected {fmtPct(expectedCtr(r.agg.position))}</div>}
                    </td>
                    <td className={tdNum}>
                      <div>{fmtPos(r.agg.position)}</div>
                      {r.prev.position > 0 && <Delta value={r.agg.position - r.prev.position} suffix="" digits={1} invert label={vs} />}
                    </td>
                    <td className={clsx(td, "min-w-[12rem] max-w-[18rem]")}>
                      {r.top && (
                        <Link href={analyzeHref(r.top.page)} className="text-xs text-slate-600 hover:text-amber-700 break-all">
                          {content.get(r.top.page)?.title ?? r.top.page}
                        </Link>
                      )}
                      {r.top && r.top.count > 1 && (
                        <div className="text-xs text-slate-500">
                          +{r.top.count - 1} other page{r.top.count > 2 ? "s" : ""}
                        </div>
                      )}
                    </td>
                    <td className={td}>
                      {r.prev.impressions === 0 ? (
                        <Pill tone="sky">New</Pill>
                      ) : isStrikingDistance(r.agg) && forecastClicks(r.agg) > 0 ? (
                        <Pill tone="violet">+{fmtInt(forecastClicks(r.agg))} at #3</Pill>
                      ) : gap ? (
                        <Pill tone="red">Low CTR</Pill>
                      ) : null}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </TableScroll>
      )}
      <Pager page={current} pageCount={pageCount} hrefWith={hrefWith} />
    </Panel>
  );
}

function PagesTable({
  list,
  q,
  page,
  vs,
  hrefWith,
}: {
  list: Array<{ path: string; agg: Agg; prev: Agg; item: ContentRecord | null }>;
  q: string;
  page: number;
  vs: string;
  hrefWith: (p: Record<string, string | undefined>) => string;
}) {
  const pageCount = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);
  const visible = list.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);
  return (
    <Panel id="sc-pages" title="Pages" meta={`${fmtInt(list.length)} URLs${q ? ` matching “${q}”` : ""}. Click a page to analyze it.`} flush>
      {visible.length === 0 ? (
        <div className="px-4 sm:px-5 pb-5">
          <EmptyState title="No pages match">Try part of the URL, for example “machame”.</EmptyState>
        </div>
      ) : (
        <TableScroll label="Pages">
          <table className="min-w-full border-t border-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className={th}>Page</th>
                <th scope="col" className={thNum}>Clicks</th>
                <th scope="col" className={thNum}>Impr.</th>
                <th scope="col" className={thNum}>CTR</th>
                <th scope="col" className={thNum}>Position</th>
                <th scope="col" className={th}>
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {visible.map((r) => {
                const gap = ctrGap(r.agg);
                return (
                  <tr key={r.path} className="hover:bg-slate-50/70">
                    <td className={clsx(td, "min-w-[16rem] max-w-[26rem]")}>
                      <Link href={analyzeHref(r.path)} className="font-medium text-slate-900 hover:text-amber-700 break-all">
                        {r.item?.title ?? r.path}
                      </Link>
                      <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                        {r.item && <Pill>{KIND_LABEL[r.item.kind]}</Pill>}
                        {r.item && <span className="text-xs text-slate-500 break-all">{r.path}</span>}
                        {gap && <Pill tone="red">~{fmtInt(gap.missedClicks)} clicks missed</Pill>}
                      </div>
                    </td>
                    <td className={tdNum}>
                      <div>{fmtInt(r.agg.clicks)}</div>
                      {r.prev.clicks > 0 && <Delta value={pctChange(r.agg.clicks, r.prev.clicks)} label={vs} />}
                    </td>
                    <td className={tdNum}>{fmtInt(r.agg.impressions)}</td>
                    <td className={tdNum}>{fmtPct(r.agg.ctr)}</td>
                    <td className={tdNum}>
                      <div>{fmtPos(r.agg.position)}</div>
                      {r.prev.position > 0 && <Delta value={r.agg.position - r.prev.position} suffix="" digits={1} invert label={vs} />}
                    </td>
                    <td className={clsx(td, "whitespace-nowrap text-right")}>
                      {r.item ? (
                        <MetaFixButton
                          compact
                          kind={r.item.kind}
                          id={r.item.id}
                          title={r.item.title}
                          path={r.item.path}
                          metaTitle={r.item.metaTitle}
                          metaDescription={r.item.metaDescription}
                          label="Meta"
                        />
                      ) : (
                        <a href={r.path} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 min-h-9 text-xs text-slate-500 hover:text-amber-700">
                          Open <ExternalLink className="w-3 h-3" aria-hidden="true" />
                          <span className="sr-only">{r.path} in a new tab</span>
                        </a>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </TableScroll>
      )}
      <Pager page={current} pageCount={pageCount} hrefWith={hrefWith} />
    </Panel>
  );
}

const MOVER_META: Record<Mover["kind"], { label: string; tone: "emerald" | "red" | "sky" | "slate" }> = {
  rising: { label: "Rising", tone: "emerald" },
  falling: { label: "Falling", tone: "red" },
  new: { label: "New", tone: "sky" },
  lost: { label: "Lost", tone: "slate" },
};

function Opportunities({
  period,
  striking,
  pageGaps,
  cannibal,
  queryMovers,
  content,
}: {
  period: number;
  striking: Array<{ query: string; agg: Agg; gain: number }>;
  pageGaps: PageGap[];
  cannibal: Cannibalization[];
  queryMovers: Mover[];
  content: Map<string, ContentRecord>;
}) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
      <Panel id="sc-ctr" title="Snippets losing clicks" meta="Page-one URLs whose CTR is well under normal for their position." flush>
        {pageGaps.length === 0 ? (
          <div className="px-4 sm:px-5 pb-5">
            <EmptyState title="No weak snippets this period">Every page-one result earns about the clicks its position should.</EmptyState>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100 border-t border-slate-200">
            {pageGaps.slice(0, 10).map((p) => {
              const item = content.get(p.path);
              return (
                <li key={p.path} className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-5 py-3">
                  <div className="min-w-0 flex-1">
                    <Link href={analyzeHref(p.path)} className="block text-sm font-medium text-slate-900 hover:text-amber-700 truncate">
                      {item?.title ?? p.path}
                    </Link>
                    <p className="text-xs text-slate-500 tabular-nums">
                      Pos {fmtPos(p.agg.position)} · CTR {fmtPct(p.gap.actual)} (expected {fmtPct(p.gap.expected)}) ·{" "}
                      <span className="font-semibold text-red-700">~{fmtInt(p.gap.missedClicks)} missed</span>
                    </p>
                  </div>
                  {item && (
                    <MetaFixButton
                      compact
                      kind={item.kind}
                      id={item.id}
                      title={item.title}
                      path={item.path}
                      metaTitle={item.metaTitle}
                      metaDescription={item.metaDescription}
                      label="Rewrite"
                    />
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </Panel>

      <Panel id="sc-striking" title="Striking distance" meta={`Queries on positions 8–20, with the extra clicks per ${period} days if each reached #3.`} flush>
        {striking.length === 0 ? (
          <div className="px-4 sm:px-5 pb-5">
            <EmptyState title="No queries in striking distance" />
          </div>
        ) : (
          <ul className="divide-y divide-slate-100 border-t border-slate-200">
            {striking.slice(0, 10).map((s) => (
              <li key={s.query} className="flex items-center justify-between gap-3 px-4 sm:px-5 py-2.5">
                <div className="min-w-0">
                  <Link
                    href={`${BASE}?tab=queries&period=${period}&q=${encodeURIComponent(s.query)}`}
                    className="block text-sm font-medium text-slate-900 hover:text-amber-700 truncate"
                  >
                    <Target className="inline w-3.5 h-3.5 mr-1 text-violet-600" aria-hidden="true" />
                    {s.query}
                  </Link>
                  <p className="text-xs text-slate-500 tabular-nums">
                    Pos {fmtPos(s.agg.position)} · {fmtInt(s.agg.impressions)} impressions
                  </p>
                </div>
                <span className="shrink-0 text-sm font-semibold text-violet-700 tabular-nums">
                  +{fmtInt(s.gain)}
                  <span className="sr-only"> extra clicks</span>
                </span>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <Panel
        id="sc-cannibal"
        title="Pages competing for one query"
        meta="Two or more of our URLs splitting the same search. Merge them, or link the weaker page to the stronger one."
        flush
      >
        {cannibal.length === 0 ? (
          <div className="px-4 sm:px-5 pb-5">
            <EmptyState title="No competing pages found">Each query has one clear page.</EmptyState>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100 border-t border-slate-200">
            {cannibal.slice(0, 8).map((c) => (
              <li key={c.query} className="px-4 sm:px-5 py-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-slate-900 min-w-0 truncate">
                    <GitFork className="inline w-3.5 h-3.5 mr-1 text-red-600" aria-hidden="true" />
                    {c.query}
                  </p>
                  <Pill tone={c.severity === "high" ? "red" : "amber"}>{c.severity === "high" ? "Both on page one" : "Split ranking"}</Pill>
                </div>
                <ul className="mt-1.5 space-y-1">
                  {c.pages.slice(0, 3).map((p) => (
                    <li key={p.page} className="flex items-center justify-between gap-3 text-xs">
                      <Link href={analyzeHref(p.page)} className="min-w-0 truncate text-slate-600 hover:text-amber-700">
                        {content.get(p.page)?.title ?? p.page}
                      </Link>
                      <span className="shrink-0 tabular-nums text-slate-500">
                        pos {fmtPos(p.agg.position)} · {Math.round(p.share * 100)}% of impr.
                      </span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <Panel id="sc-movers" title="Biggest movers" meta={`Queries whose ranking changed most against the previous ${period} days.`} flush>
        {queryMovers.length === 0 ? (
          <div className="px-4 sm:px-5 pb-5">
            <EmptyState title="Rankings are stable" />
          </div>
        ) : (
          <ul className="divide-y divide-slate-100 border-t border-slate-200">
            {queryMovers.slice(0, 10).map((m) => (
              <li key={m.key} className="flex items-center justify-between gap-3 px-4 sm:px-5 py-2.5">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">
                    {m.kind === "new" && <Sparkle className="inline w-3.5 h-3.5 mr-1 text-sky-600" aria-hidden="true" />}
                    {m.key}
                  </p>
                  <p className="text-xs text-slate-500 tabular-nums">
                    {m.kind === "new"
                      ? `Now pos ${fmtPos(m.current.position)}, ${fmtInt(m.current.impressions)} impressions`
                      : m.kind === "lost"
                        ? `Was pos ${fmtPos(m.previous.position)}, ${fmtInt(m.previous.impressions)} impressions`
                        : `Pos ${fmtPos(m.previous.position)} → ${fmtPos(m.current.position)}`}
                    {" · "}
                    {m.clicksDelta > 0 ? "+" : ""}
                    {fmtInt(m.clicksDelta)} clicks
                  </p>
                </div>
                <Pill tone={MOVER_META[m.kind].tone}>{MOVER_META[m.kind].label}</Pill>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}
