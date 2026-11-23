import Link from "next/link";
import { ArrowRight, ExternalLink, Settings as SettingsIcon } from "lucide-react";
import { clsx } from "clsx";
import MetricCard from "@/components/admin/seo/MetricCard";
import type { SeoOverviewData } from "@/lib/seo-overview";
import { CTR_AT_POSITION_3 } from "@/lib/seo-action-queue";
import { shortPath } from "./format";

function SectionHeader({
  id,
  title,
  meta,
  href,
  linkLabel = "View all",
}: {
  id: string;
  title: string;
  meta?: string | null;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-1 mb-3">
      <div>
        <h2 id={id} className="text-h3 text-slate-900">
          {title}
        </h2>
        {meta && <p className="text-sm text-slate-500 mt-0.5">{meta}</p>}
      </div>
      {href && (
        <Link href={href} className="text-sm font-medium text-amber-700 hover:text-amber-800 inline-flex items-center gap-1">
          {linkLabel}
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}

function ConnectCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-slate-50 border border-dashed border-slate-300 rounded-lg p-5 flex flex-wrap items-center justify-between gap-3">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-slate-800">{title}</p>
        <p className="text-sm text-slate-600 mt-0.5">{description}</p>
      </div>
      <Link
        href="/admin/seo/settings"
        className="inline-flex items-center gap-1.5 min-h-9 px-3 bg-amber-600 text-[var(--primary-dark)] rounded-md text-sm font-medium hover:bg-amber-500"
      >
        <SettingsIcon className="w-4 h-4" aria-hidden="true" />
        Connect
      </Link>
    </div>
  );
}

export function SearchKpis({ data, periodLabel }: { data: SeoOverviewData; periodLabel: string | null }) {
  const series = (key: "clicks" | "impressions" | "position" | "ctr") =>
    data.dailyMetrics.map((d) => ({ value: d[key] }));
  const vs = `vs prior ${data.period.rangeDays}d`;
  return (
    <section aria-labelledby="seo-search-heading">
      <SectionHeader
        id="seo-search-heading"
        title="Google Search"
        meta={periodLabel ? `${periodLabel} · Search Console reports 2–3 days behind` : null}
        href="/admin/seo/search-console"
      />
      {data.gsc.hasData ? (
        <div className="grid grid-cols-1 min-[420px]:grid-cols-2 xl:grid-cols-4 gap-4">
          <MetricCard title="Clicks" value={data.gsc.totalClicks.toLocaleString()} trend={data.gsc.clicksTrend} trendLabel={vs} sparklineData={series("clicks")} />
          <MetricCard title="Impressions" value={data.gsc.totalImpressions.toLocaleString()} trend={data.gsc.impressionsTrend} trendLabel={vs} sparklineData={series("impressions")} />
          <MetricCard title="Avg. position" value={data.gsc.weightedPosition || "—"} trend={data.gsc.positionTrend} trendLabel={vs} invertTrend sparklineData={series("position")} />
          <MetricCard title="Avg. CTR" value={`${data.gsc.weightedCtr}%`} trend={data.gsc.ctrTrend} trendLabel={vs} sparklineData={series("ctr")} />
        </div>
      ) : (
        <ConnectCard
          title="Search Console is not connected"
          description="Connect it to track clicks, impressions, position and click-through rate."
        />
      )}
    </section>
  );
}

export function AnalyticsKpis({ data, periodLabel }: { data: SeoOverviewData; periodLabel: string | null }) {
  const vs = `vs prior ${data.period.rangeDays}d`;
  return (
    <section aria-labelledby="seo-ga-heading">
      <SectionHeader id="seo-ga-heading" title="Organic visits" meta={periodLabel ? `${periodLabel} · Google Analytics 4` : null} href="/admin/seo/analytics" />
      {data.ga.hasData ? (
        <div className="grid grid-cols-1 min-[420px]:grid-cols-2 xl:grid-cols-4 gap-4">
          <MetricCard title="Sessions" value={data.ga.sessions.toLocaleString()} trend={data.ga.sessionsTrend} trendLabel={vs} />
          <MetricCard title="Users" value={data.ga.users.toLocaleString()} trend={data.ga.usersTrend} trendLabel={vs} />
          <MetricCard title="Conversions" value={data.ga.conversions.toLocaleString()} trend={data.ga.conversionsTrend} trendLabel={vs} />
          <MetricCard title="Bounce rate" value={`${data.ga.bounceRate}%`} />
        </div>
      ) : (
        <ConnectCard
          title="Google Analytics is not connected"
          description="Connect GA4 to see organic sessions and conversions next to search data."
        />
      )}
    </section>
  );
}

const BANDS = [
  { key: "excellent", label: "Excellent", bar: "bg-emerald-500", text: "text-emerald-700" },
  { key: "good", label: "Good", bar: "bg-lime-500", text: "text-lime-700" },
  { key: "needs-work", label: "Needs work", bar: "bg-amber-500", text: "text-amber-800" },
  { key: "poor", label: "Poor", bar: "bg-red-500", text: "text-red-700" },
] as const;

export function ContentHealthCard({ data }: { data: SeoOverviewData }) {
  const ch = data.contentHealth;
  return (
    <section aria-labelledby="seo-content-heading" className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 sm:p-5">
      <SectionHeader
        id="seo-content-heading"
        title="Content health"
        meta={`Average ${ch.average}/100 across ${ch.count} routes, safaris, destinations, day trips and posts`}
        href="/admin/seo/content-health"
      />
      {ch.count === 0 ? (
        <p className="text-sm text-slate-500">No content to score yet.</p>
      ) : (
        <>
          <div className="flex h-3 rounded-full overflow-hidden bg-slate-100" role="img" aria-label={BANDS.map((b) => `${b.label}: ${ch.bands[b.key]}`).join(", ")}>
            {BANDS.map((b) =>
              ch.bands[b.key] > 0 ? (
                <div key={b.key} className={b.bar} style={{ width: `${(ch.bands[b.key] / ch.count) * 100}%` }} />
              ) : null
            )}
          </div>
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
            {BANDS.map((b) => (
              <div key={b.key}>
                <dt className="text-xs text-slate-500 flex items-center gap-1.5">
                  <span className={clsx("w-2 h-2 rounded-full", b.bar)} aria-hidden="true" />
                  {b.label}
                </dt>
                <dd className={clsx("text-xl font-bold tabular-nums mt-0.5", b.text)}>{ch.bands[b.key]}</dd>
              </div>
            ))}
          </dl>
          {ch.topFailures.length > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-xs font-medium text-slate-500 mb-2">Most common gaps</p>
              <ul className="flex flex-wrap gap-1.5">
                {ch.topFailures.slice(0, 6).map((f) => (
                  <li key={f.label} className="inline-flex items-center gap-1.5 px-2 py-1 bg-slate-50 border border-slate-200 rounded text-xs text-slate-700">
                    {f.label}
                    <span className="font-semibold text-slate-900 tabular-nums">{f.count}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export function QuickWinsTable({ data }: { data: SeoOverviewData }) {
  if (data.quickWins.length === 0) return null;
  return (
    <section aria-labelledby="seo-quickwins-heading" className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-4 sm:px-5 pt-4">
        <SectionHeader
          id="seo-quickwins-heading"
          title="Striking distance"
          meta={`Queries ranking #4–10 with 100+ impressions in 28 days. "Gain" estimates extra monthly clicks at #3 (${Math.round(CTR_AT_POSITION_3 * 100)}% CTR).`}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-slate-500 border-y border-slate-100 bg-slate-50">
              <th scope="col" className="px-4 sm:px-5 py-2 font-medium">Query</th>
              <th scope="col" className="px-3 py-2 font-medium hidden md:table-cell">Ranking page</th>
              <th scope="col" className="px-3 py-2 font-medium text-right">Pos.</th>
              <th scope="col" className="px-3 py-2 font-medium text-right hidden sm:table-cell">Impr.</th>
              <th scope="col" className="px-4 sm:px-5 py-2 font-medium text-right">Gain</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.quickWins.map((q) => (
              <tr key={q.query} className="hover:bg-slate-50">
                <td className="px-4 sm:px-5 py-2.5 max-w-[16rem]">
                  <Link href={`/admin/seo/search-console?query=${encodeURIComponent(q.query)}`} className="text-slate-900 hover:text-amber-700 break-words">
                    {q.query}
                  </Link>
                </td>
                <td className="px-3 py-2.5 text-slate-600 hidden md:table-cell max-w-[14rem] truncate" title={q.page ?? undefined}>
                  {q.page ? shortPath(q.page) : "—"}
                </td>
                <td className="px-3 py-2.5 text-right tabular-nums text-slate-900">{q.position}</td>
                <td className="px-3 py-2.5 text-right tabular-nums text-slate-600 hidden sm:table-cell">{q.impressions.toLocaleString()}</td>
                <td className="px-4 sm:px-5 py-2.5 text-right tabular-nums font-semibold text-emerald-700">
                  {q.estimatedGain > 0 ? `+${q.estimatedGain}` : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function RankList({
  id,
  title,
  rows,
  empty,
}: {
  id: string;
  title: string;
  rows: Array<{ key: string; label: string; clicks: number; position: number; external?: string }>;
  empty: string;
}) {
  return (
    <section aria-labelledby={id} className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-4 sm:px-5 pt-4">
        <SectionHeader id={id} title={title} href="/admin/seo/search-console" />
      </div>
      {rows.length === 0 ? (
        <p className="px-5 pb-6 text-sm text-slate-500">{empty}</p>
      ) : (
        <ol className="divide-y divide-slate-100 border-t border-slate-100">
          {rows.map((r, i) => (
            <li key={r.key} className="px-4 sm:px-5 py-2.5 flex items-center gap-3 text-sm">
              <span className="text-xs text-slate-400 w-5 text-right tabular-nums">{i + 1}</span>
              <span className="flex-1 min-w-0 truncate text-slate-900" title={r.label}>{r.label}</span>
              <span className="tabular-nums text-slate-600 shrink-0">{r.clicks.toLocaleString()} <span className="text-slate-400 text-xs">clicks</span></span>
              <span className="tabular-nums text-slate-600 shrink-0 w-12 text-right">#{r.position}</span>
              {r.external && (
                <a href={r.external} target="_blank" rel="noopener noreferrer" aria-label={`Open ${r.label} in a new tab`} className="text-slate-400 hover:text-amber-700 shrink-0">
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              )}
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

export function TopLists({ data }: { data: SeoOverviewData }) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <RankList
        id="seo-top-queries"
        title="Top queries"
        empty="No query data for this period."
        rows={data.topQueries.map((q) => ({ key: q.query, label: q.query, clicks: q.clicks, position: q.position }))}
      />
      <RankList
        id="seo-top-pages"
        title="Top pages"
        empty="No page data for this period."
        rows={data.topPages.map((p) => ({ key: p.page, label: shortPath(p.page), clicks: p.clicks, position: p.position, external: p.page }))}
      />
    </div>
  );
}
