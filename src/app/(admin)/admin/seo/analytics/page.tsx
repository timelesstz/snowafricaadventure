import Link from "next/link";
import { AlertTriangle, Search } from "lucide-react";
import { clsx } from "clsx";
import { requireRole } from "@/lib/auth";
import { indexByPath, loadContentIndex } from "@/lib/seo-intel/content-index";
import { gaDaily, gaTotals, gaWindow, gscWindow, landingAggs, pageAggs, parsePeriod } from "@/lib/seo-intel/data";
import { KIND_LABEL } from "@/lib/seo-intel/paths";
import { diagnoseLanding, pctChange, type LandingDiagnosis, type LandingStats } from "@/lib/seo-intel/rules";
import TrendChart from "@/components/admin/seo/intel/TrendChart";
import {
  Delta,
  EmptyState,
  fmtDuration,
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
export const metadata = { title: "Analytics · SEO" };

type SearchParams = Promise<Record<string, string | string[] | undefined>>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

const BASE = "/admin/seo/analytics/";
const SORTS = [
  { value: "sessions", label: "Most sessions" },
  { value: "conversions", label: "Most enquiries" },
  { value: "rate", label: "Best conversion rate" },
  { value: "bounce", label: "Highest bounce" },
  { value: "change", label: "Biggest drop" },
] as const;
type Sort = (typeof SORTS)[number]["value"];
const PAGE_SIZE = 50;
const DIAG_LABEL: Record<LandingDiagnosis["code"], string> = {
  "high-bounce": "High bounce",
  "no-conversions": "No enquiries",
  "traffic-decay": "Traffic falling",
  "short-visits": "Short visits",
};
const rate = (s: LandingStats) => (s.sessions > 0 ? s.conversions / s.sessions : 0);

export default async function AnalyticsPage({ searchParams }: { searchParams: SearchParams }) {
  await requireRole("VIEWER");
  const sp = await searchParams;
  const period = parsePeriod(one(sp.period), 28);
  const q = one(sp.q).trim().toLowerCase();
  const sort: Sort = SORTS.some((s) => s.value === one(sp.sort)) ? (one(sp.sort) as Sort) : "sessions";
  const page = Math.max(1, Math.floor(Number(one(sp.page))) || 1);

  const win = await gaWindow(period);
  if (!win.latest) {
    return (
      <div className="space-y-6">
        <PageIntro title="Analytics" description="Organic visits, engagement and enquiries from Google Analytics 4." />
        <EmptyState
          title="No Google Analytics data yet"
          action={
            <Link href="/admin/seo/settings/" className="min-h-9 inline-flex items-center px-3 rounded-md bg-amber-600 text-[var(--primary-dark)] text-sm font-semibold hover:bg-amber-500">
              Open SEO settings
            </Link>
          }
        >
          Connect GA4 and run a sync to see which landing pages turn search visits into enquiries.
        </EmptyState>
      </div>
    );
  }

  const gsc = await gscWindow(period);
  const [total, prevTotal, daily, landings, prevLandings, records, search] = await Promise.all([
    gaTotals(win.start, win.end),
    gaTotals(win.prevStart, win.start),
    gaDaily(win.start, win.end),
    landingAggs(win.start, win.end),
    landingAggs(win.prevStart, win.start),
    loadContentIndex(),
    gsc.latest ? pageAggs(gsc.start, gsc.end) : Promise.resolve(new Map()),
  ]);
  const content = indexByPath(records);
  const vs = `vs previous ${period} days`;

  // GA4's "(not set)" bucket and admin pages are not search landing pages.
  const isNoise = (path: string) => path.includes("(not set)") || path.startsWith("/admin/") || path.startsWith("/api/");
  for (const map of [landings, prevLandings]) for (const path of [...map.keys()]) if (isNoise(path)) map.delete(path);

  const rows = [...landings].map(([path, cur]) => {
    const prev = prevLandings.get(path) ?? null;
    const item = content.get(path) ?? null;
    return { path, cur, prev, item, search: search.get(path) ?? null, diagnoses: diagnoseLanding(cur, prev, item?.kind ?? null) };
  });

  // Pages that need attention: high severity first, then by sessions at stake.
  const attention = rows
    .filter((r) => r.diagnoses.length > 0)
    .sort(
      (a, b) =>
        b.diagnoses.filter((d) => d.severity === "high").length - a.diagnoses.filter((d) => d.severity === "high").length ||
        Math.max(b.cur.sessions, b.prev?.sessions ?? 0) - Math.max(a.cur.sessions, a.prev?.sessions ?? 0)
    );
  // Pages that convert: the model to copy from.
  const converters = rows
    .filter((r) => r.cur.conversions > 0)
    .sort((a, b) => b.cur.conversions - a.cur.conversions || rate(b.cur) - rate(a.cur))
    .slice(0, 6);
  // Pages that lost traffic entirely this period.
  const lost = [...prevLandings]
    .filter(([path, s]) => s.sessions >= 20 && !landings.has(path))
    .sort((a, b) => b[1].sessions - a[1].sessions)
    .slice(0, 5);

  const convRate = rate(total);
  const prevConvRate = rate(prevTotal);

  const filtered = rows.filter((r) => !q || r.path.includes(q) || r.item?.title.toLowerCase().includes(q));
  filtered.sort((a, b) => {
    switch (sort) {
      case "conversions":
        return b.cur.conversions - a.cur.conversions || b.cur.sessions - a.cur.sessions;
      case "rate":
        return rate(b.cur) - rate(a.cur) || b.cur.sessions - a.cur.sessions;
      case "bounce":
        return (b.cur.sessions >= 10 ? b.cur.bounceRate : -1) - (a.cur.sessions >= 10 ? a.cur.bounceRate : -1);
      case "change":
        return a.cur.sessions - (a.prev?.sessions ?? 0) - (b.cur.sessions - (b.prev?.sessions ?? 0));
      default:
        return b.cur.sessions - a.cur.sessions;
    }
  });
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);
  const visible = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);
  const hrefWith = (patch: Record<string, string | undefined>) => {
    const next = new URLSearchParams();
    const all = { period: String(period), q: q || undefined, sort: sort !== "sessions" ? sort : undefined, ...patch };
    for (const [k, v] of Object.entries(all)) if (v) next.set(k, v);
    return `${BASE}?${next.toString()}`;
  };

  return (
    <div className="space-y-6">
      <PageIntro
        title="Analytics"
        description={
          <>
            Organic search visits from GA4 for {fmtWindow(win.start, win.end)}, compared with the {period} days before. Enquiries are GA4 key events (form and booking submissions).
          </>
        }
      >
        <SegmentLinks
          label="Period"
          param="period"
          basePath={BASE}
          params={{ q: q || undefined, sort: sort !== "sessions" ? sort : undefined }}
          value={period}
          options={[
            { value: 7, label: "7 days" },
            { value: 28, label: "28 days" },
            { value: 90, label: "90 days" },
          ]}
        />
      </PageIntro>

      <div className="grid grid-cols-1 min-[420px]:grid-cols-2 xl:grid-cols-5 gap-4">
        <Kpi label="Organic sessions" value={fmtInt(total.sessions)} delta={<Delta value={pctChange(total.sessions, prevTotal.sessions)} label={vs} />} />
        <Kpi label="Users" value={fmtInt(total.users)} delta={<Delta value={pctChange(total.users, prevTotal.users)} label={vs} />} />
        <Kpi label="Enquiries" value={fmtInt(total.conversions)} delta={<Delta value={pctChange(total.conversions, prevTotal.conversions)} label={vs} />} />
        <Kpi
          label="Conversion rate"
          value={fmtPct(convRate, 2)}
          delta={<Delta value={prevTotal.sessions ? (convRate - prevConvRate) * 100 : null} suffix=" pts" digits={2} label={vs} />}
          hint="enquiries ÷ sessions"
        />
        <Kpi
          label="Bounce rate"
          value={fmtPct(total.bounceRate)}
          delta={<Delta value={prevTotal.sessions ? (total.bounceRate - prevTotal.bounceRate) * 100 : null} suffix=" pts" digits={1} invert label={vs} />}
          hint={`avg. visit ${fmtDuration(total.avgSessionDuration)}`}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-6 items-start">
        <Panel id="ga-trend" title="Daily organic sessions and enquiries">
          {daily.length === 0 ? (
            <EmptyState title="No daily data in this window" />
          ) : (
            <TrendChart
              variant="area"
              summary={`Daily organic sessions and enquiries, ${fmtWindow(win.start, win.end)}. ${fmtInt(total.sessions)} sessions and ${fmtInt(total.conversions)} enquiries in total.`}
              data={daily.map((d) => ({ date: d.date, sessions: d.sessions, conversions: d.conversions }))}
              series={[
                { key: "sessions", label: "Sessions", color: "#0f766e" },
                { key: "conversions", label: "Enquiries", color: "#d97706", right: true },
              ]}
            />
          )}
        </Panel>

        <Panel id="ga-converters" title="Pages that bring enquiries" meta="The pattern to copy onto weaker pages." flush>
          {converters.length === 0 ? (
            <div className="px-4 sm:px-5 pb-5">
              <EmptyState title="No organic enquiries this period">
                Check that GA4 key events fire on the enquiry and booking forms, then look at the pages with the most sessions below.
              </EmptyState>
            </div>
          ) : (
            <ul className="divide-y divide-slate-100 border-t border-slate-200">
              {converters.map((r) => (
                <li key={r.path} className="flex items-center justify-between gap-3 px-4 sm:px-5 py-2.5">
                  <div className="min-w-0">
                    <Link href={`/admin/seo/page-analyzer/?url=${encodeURIComponent(r.path)}`} className="block text-sm font-medium text-slate-900 hover:text-amber-700 truncate">
                      {r.item?.title ?? r.path}
                    </Link>
                    <p className="text-xs text-slate-500 tabular-nums">
                      {fmtInt(r.cur.sessions)} sessions · {fmtPct(rate(r.cur))} convert
                    </p>
                  </div>
                  <span className="shrink-0 text-sm font-semibold text-amber-700 tabular-nums">
                    {fmtInt(r.cur.conversions)}
                    <span className="sr-only"> enquiries</span>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>

      <Panel
        id="ga-attention"
        title="Landing pages that need attention"
        meta="Found by rules: bounce of 70% or more, money pages with no enquiries, traffic down 30% or more, or visits under 20 seconds."
        flush
      >
        {attention.length === 0 && lost.length === 0 ? (
          <div className="px-4 sm:px-5 pb-5">
            <EmptyState title="No landing page problems found">Engagement and traffic are steady across pages with enough visits to judge.</EmptyState>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100 border-t border-slate-200">
            {attention.slice(0, 10).map((r) => (
              <li key={r.path} className="px-4 sm:px-5 py-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <Link href={`/admin/seo/page-analyzer/?url=${encodeURIComponent(r.path)}`} className="text-sm font-medium text-slate-900 hover:text-amber-700 break-all">
                      {r.item?.title ?? r.path}
                    </Link>
                    <p className="text-xs text-slate-500 tabular-nums">
                      {fmtInt(r.cur.sessions)} sessions · bounce {fmtPct(r.cur.bounceRate)} · {fmtInt(r.cur.conversions)} enquiries
                      {r.search ? ` · search pos ${fmtPos(r.search.position)}` : ""}
                    </p>
                  </div>
                  <span className="flex flex-wrap gap-1.5">
                    {r.diagnoses.map((d) => (
                      <Pill key={d.code} tone={d.severity === "high" ? "red" : "amber"}>
                        {DIAG_LABEL[d.code]}
                      </Pill>
                    ))}
                  </span>
                </div>
                <ul className="mt-1.5 space-y-1">
                  {r.diagnoses.map((d) => (
                    <li key={d.code} className="flex gap-2 text-xs text-slate-600">
                      <AlertTriangle className={clsx("w-3.5 h-3.5 shrink-0 mt-0.5", d.severity === "high" ? "text-red-600" : "text-amber-600")} aria-hidden="true" />
                      {d.message}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
            {lost.map(([path, s]) => (
              <li key={path} className="flex flex-wrap items-center justify-between gap-2 px-4 sm:px-5 py-3">
                <div className="min-w-0 flex-1">
                  <Link href={`/admin/seo/page-analyzer/?url=${encodeURIComponent(path)}`} className="text-sm font-medium text-slate-900 hover:text-amber-700 break-all">
                    {content.get(path)?.title ?? path}
                  </Link>
                  <p className="text-xs text-slate-600">
                    Had {fmtInt(s.sessions)} organic sessions last period and none this period. Check that the page still loads and is indexed.
                  </p>
                </div>
                <Pill tone="red">Traffic lost</Pill>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <Panel id="ga-landing" title="Landing pages" meta={`${fmtInt(filtered.length)} pages${q ? ` matching “${q}”` : ""}, joined with Search Console clicks and position.`} flush>
        <form method="get" action={BASE} className="flex flex-wrap items-end gap-2 px-4 sm:px-5 pb-4">
          <input type="hidden" name="period" value={period} />
          <label className="flex-1 min-w-[12rem]">
            <span className="sr-only">Filter landing pages</span>
            <span className="relative block">
              <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" aria-hidden="true" />
              <input
                name="q"
                defaultValue={q}
                placeholder="Filter by URL or title"
                className="w-full min-h-10 rounded-md border border-slate-300 pl-8 pr-3 text-sm focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-600/30"
              />
            </span>
          </label>
          <label>
            <span className="sr-only">Sort by</span>
            <select name="sort" defaultValue={sort} className="min-h-10 rounded-md border border-slate-300 bg-white px-2 text-sm">
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
          <button type="submit" className="min-h-10 px-4 rounded-md bg-slate-900 text-white text-sm font-medium hover:bg-slate-800">
            Apply
          </button>
        </form>
        {visible.length === 0 ? (
          <div className="px-4 sm:px-5 pb-5">
            <EmptyState title="No landing pages match">Try part of the URL, for example “safari”.</EmptyState>
          </div>
        ) : (
          <TableScroll label="Landing pages">
            <table className="min-w-full border-t border-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th scope="col" className={th}>Landing page</th>
                  <th scope="col" className={thNum}>Sessions</th>
                  <th scope="col" className={thNum}>Enquiries</th>
                  <th scope="col" className={thNum}>Conv. rate</th>
                  <th scope="col" className={thNum}>Bounce</th>
                  <th scope="col" className={thNum}>Avg. visit</th>
                  <th scope="col" className={thNum}>Search clicks</th>
                  <th scope="col" className={thNum}>Position</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {visible.map((r) => (
                  <tr key={r.path} className="hover:bg-slate-50/70">
                    <td className={clsx(td, "min-w-[16rem] max-w-[26rem]")}>
                      <Link href={`/admin/seo/page-analyzer/?url=${encodeURIComponent(r.path)}`} className="font-medium text-slate-900 hover:text-amber-700 break-all">
                        {r.item?.title ?? r.path}
                      </Link>
                      <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                        {r.item && <Pill>{KIND_LABEL[r.item.kind]}</Pill>}
                        {r.item && <span className="text-xs text-slate-500 break-all">{r.path}</span>}
                        {r.diagnoses.map((d) => (
                          <Pill key={d.code} tone={d.severity === "high" ? "red" : "amber"}>
                            {DIAG_LABEL[d.code]}
                          </Pill>
                        ))}
                      </div>
                    </td>
                    <td className={tdNum}>
                      <div>{fmtInt(r.cur.sessions)}</div>
                      {r.prev && r.prev.sessions > 0 && <Delta value={pctChange(r.cur.sessions, r.prev.sessions)} label={vs} />}
                    </td>
                    <td className={tdNum}>{fmtInt(r.cur.conversions)}</td>
                    <td className={tdNum}>{r.cur.sessions > 0 ? fmtPct(rate(r.cur)) : "—"}</td>
                    <td className={tdNum}>{fmtPct(r.cur.bounceRate)}</td>
                    <td className={tdNum}>{fmtDuration(r.cur.avgSessionDuration)}</td>
                    <td className={tdNum}>{r.search ? fmtInt(r.search.clicks) : "—"}</td>
                    <td className={tdNum}>{r.search ? fmtPos(r.search.position) : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableScroll>
        )}
        {pageCount > 1 && (
          <nav aria-label="Table pages" className="flex items-center justify-between gap-3 border-t border-slate-200 px-4 sm:px-5 py-3 text-sm">
            <span className="text-slate-500">
              Page {current} of {pageCount}
            </span>
            <span className="flex gap-2">
              {current > 1 && (
                <Link href={hrefWith({ page: String(current - 1) })} className="min-h-9 px-3 inline-flex items-center rounded-md border border-slate-300 hover:bg-slate-50">
                  Previous
                </Link>
              )}
              {current < pageCount && (
                <Link href={hrefWith({ page: String(current + 1) })} className="min-h-9 px-3 inline-flex items-center rounded-md border border-slate-300 hover:bg-slate-50">
                  Next
                </Link>
              )}
            </span>
          </nav>
        )}
      </Panel>
    </div>
  );
}
