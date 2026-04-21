"use client";

import MetricCard from "@/components/admin/seo/MetricCard";
import HealthScoreGauge from "@/components/admin/seo/HealthScoreGauge";
import Link from "next/link";
import {
  ExternalLink,
  AlertCircle,
  TrendingUp,
  FileWarning,
  Search,
  BarChart3,
  Settings as SettingsIcon,
} from "lucide-react";
import type { SeoOverviewData } from "@/lib/seo-overview";

interface Props {
  data: SeoOverviewData;
}

function shortPath(url: string): string {
  try {
    return new URL(url).pathname || url;
  } catch {
    return url;
  }
}

function ConnectCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-slate-50 border border-dashed border-slate-200 rounded-xl p-5 flex items-center justify-between">
      <div>
        <p className="text-sm font-semibold text-slate-700">{title}</p>
        <p className="text-xs text-slate-500 mt-0.5">{description}</p>
      </div>
      <Link
        href="/admin/seo/settings"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 text-white rounded-lg text-xs font-medium hover:bg-amber-700"
      >
        <SettingsIcon className="w-3.5 h-3.5" />
        Connect
      </Link>
    </div>
  );
}

function IssueRow({
  icon: Icon,
  label,
  count,
  href,
  tone,
}: {
  icon: typeof AlertCircle;
  label: string;
  count: number;
  href: string;
  tone: "red" | "amber" | "slate";
}) {
  const toneClasses = {
    red: "text-red-700 hover:bg-red-50",
    amber: "text-amber-700 hover:bg-amber-50",
    slate: "text-slate-600 hover:bg-slate-50",
  } as const;
  return (
    <Link
      href={href}
      className={`flex items-center justify-between px-3 py-2 rounded-md text-sm ${toneClasses[tone]}`}
    >
      <span className="flex items-center gap-2">
        <Icon className="w-3.5 h-3.5" />
        {label}
      </span>
      <span className="font-semibold tabular-nums">{count}</span>
    </Link>
  );
}

export default function OverviewDashboard({ data }: Props) {
  const dailySparkline = data.dailyMetrics.map((d) => ({ value: d.clicks }));
  const dailyImpressionsSparkline = data.dailyMetrics.map((d) => ({
    value: d.impressions,
  }));
  const dailyPositionSparkline = data.dailyMetrics.map((d) => ({
    value: d.position,
  }));
  const dailyCtrSparkline = data.dailyMetrics.map((d) => ({ value: d.ctr }));

  return (
    <div className="space-y-6">
      {/* Top row: Health score + issue breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-start justify-between gap-4">
            <HealthScoreGauge
              score={data.health.score}
              trend={data.health.trend}
              delta={data.health.delta}
              components={data.health.components}
            />
            <div className="flex-1 max-w-sm">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
                Score components
              </p>
              <div className="space-y-1">
                {data.health.components.map((c) => (
                  <div
                    key={c.key}
                    className="flex items-center justify-between text-xs"
                  >
                    <span className="text-slate-600">{c.label}</span>
                    <span className="tabular-nums">
                      {c.score === null ? (
                        <span className="text-slate-400 italic">no data</span>
                      ) : (
                        <span className="font-medium text-slate-900">
                          {c.score}{" "}
                          <span className="text-slate-400">
                            · {c.effectiveWeight}%
                          </span>
                        </span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Open issues
            </p>
            <span className="text-xs font-semibold text-slate-900 tabular-nums">
              {data.issues.total}
            </span>
          </div>
          <div className="space-y-1">
            <IssueRow
              icon={AlertCircle}
              label="Content needing work"
              count={data.issues.needsAttentionContent}
              href="/admin/seo/content-health"
              tone="amber"
            />
            <IssueRow
              icon={FileWarning}
              label="Active 404s with traffic"
              count={data.issues.active404s}
              href="/admin/404-monitor"
              tone={data.issues.active404s > 0 ? "red" : "slate"}
            />
            <IssueRow
              icon={AlertCircle}
              label="Missing meta description"
              count={data.issues.missingMetaDescription}
              href="/admin/seo/content-health"
              tone="amber"
            />
            <IssueRow
              icon={AlertCircle}
              label="Pages missing schema"
              count={data.issues.missingSchema}
              href="/admin/seo/page-analyzer"
              tone="slate"
            />
          </div>
        </div>
      </div>

      {/* GSC Section */}
      {data.gsc.hasData ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Total Clicks"
            value={data.gsc.totalClicks.toLocaleString()}
            trend={data.gsc.clicksTrend}
            trendLabel="vs prior 7d"
            sparklineData={dailySparkline}
          />
          <MetricCard
            title="Impressions"
            value={data.gsc.totalImpressions.toLocaleString()}
            trend={data.gsc.impressionsTrend}
            trendLabel="vs prior 7d"
            sparklineData={dailyImpressionsSparkline}
          />
          <MetricCard
            title="Avg. Position"
            value={data.gsc.weightedPosition || "—"}
            trend={data.gsc.positionTrend}
            trendLabel="vs prior 7d"
            invertTrend
            sparklineData={dailyPositionSparkline}
          />
          <MetricCard
            title="Avg. CTR"
            value={`${data.gsc.weightedCtr}%`}
            trend={data.gsc.ctrTrend}
            trendLabel="vs prior 7d"
            sparklineData={dailyCtrSparkline}
          />
        </div>
      ) : (
        <ConnectCard
          title="Search Console not connected"
          description="Connect Google Search Console to track clicks, impressions, position, and CTR over time."
        />
      )}

      {/* GA4 Section */}
      {data.ga.hasData ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Organic Sessions"
            value={data.ga.sessions.toLocaleString()}
            trend={data.ga.sessionsTrend}
            trendLabel="vs prior 7d"
          />
          <MetricCard
            title="Organic Users"
            value={data.ga.users.toLocaleString()}
            trend={data.ga.usersTrend}
            trendLabel="vs prior 7d"
          />
          <MetricCard
            title="Conversions"
            value={data.ga.conversions.toLocaleString()}
            trend={data.ga.conversionsTrend}
            trendLabel="vs prior 7d"
          />
          <MetricCard
            title="Bounce Rate"
            value={`${data.ga.bounceRate}%`}
            invertTrend
          />
        </div>
      ) : (
        <ConnectCard
          title="Google Analytics not connected"
          description="Connect GA4 to see organic sessions, conversions, and bounce rate alongside GSC data."
        />
      )}

      {/* Content health summary */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-slate-900">Content health</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Average score across {data.contentHealth.count} pieces of content
            </p>
          </div>
          <Link
            href="/admin/seo/content-health"
            className="text-xs text-amber-600 hover:text-amber-700"
          >
            View all
          </Link>
        </div>
        <div className="px-5 py-4 grid grid-cols-2 sm:grid-cols-5 gap-4">
          <div>
            <p className="text-2xl font-bold text-slate-900">
              {data.contentHealth.average}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">Average score</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-emerald-600">
              {data.contentHealth.bands.excellent}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">Excellent</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-lime-600">
              {data.contentHealth.bands.good}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">Good</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-amber-600">
              {data.contentHealth.bands["needs-work"]}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">Needs work</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-red-600">
              {data.contentHealth.bands.poor}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">Poor</p>
          </div>
        </div>
        {data.contentHealth.topFailures.length > 0 && (
          <div className="px-5 py-3 border-t border-slate-100 bg-slate-50">
            <p className="text-xs text-slate-500 mb-2">Top gaps</p>
            <div className="flex flex-wrap gap-1.5">
              {data.contentHealth.topFailures.slice(0, 5).map((f) => (
                <span
                  key={f.label}
                  className="inline-flex items-center gap-1 px-2 py-0.5 bg-white border border-slate-200 rounded-md text-xs text-slate-700"
                >
                  {f.label}
                  <span className="text-slate-400">{f.count}</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quick wins */}
      {data.quickWins.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                Quick wins
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Queries in positions 4–10 with ≥100 impressions over 28 days —
                small ranking lifts unlock big CTR gains
              </p>
            </div>
          </div>
          <div className="divide-y divide-slate-50">
            {data.quickWins.map((q) => (
              <Link
                key={q.query}
                href={`/admin/seo/search-console?query=${encodeURIComponent(q.query)}`}
                className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50"
              >
                <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="flex-1 text-sm text-slate-900 truncate">
                  {q.query}
                </span>
                <div className="flex items-center gap-4 text-xs text-slate-500 tabular-nums">
                  <span>{q.impressions.toLocaleString()} impr</span>
                  <span>#{q.position}</span>
                  <span>{q.ctr}% CTR</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Top queries + Top pages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-slate-400" />
              Top search queries
            </h3>
            <Link
              href="/admin/seo/search-console"
              className="text-xs text-amber-600 hover:text-amber-700"
            >
              View all
            </Link>
          </div>
          <div className="divide-y divide-slate-50">
            {data.topQueries.length === 0 ? (
              <p className="px-5 py-8 text-center text-sm text-slate-400">
                No query data yet
              </p>
            ) : (
              data.topQueries.map((q, i) => (
                <div key={q.query} className="px-5 py-3 flex items-center gap-3">
                  <span className="text-xs text-slate-400 w-5 text-right">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">
                      {q.query}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-500 tabular-nums">
                    <span>{q.clicks} clicks</span>
                    <span>#{q.position}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-slate-400" />
              Top pages
            </h3>
            <Link
              href="/admin/seo/search-console"
              className="text-xs text-amber-600 hover:text-amber-700"
            >
              View all
            </Link>
          </div>
          <div className="divide-y divide-slate-50">
            {data.topPages.length === 0 ? (
              <p className="px-5 py-8 text-center text-sm text-slate-400">
                No page data yet
              </p>
            ) : (
              data.topPages.map((p, i) => (
                <div key={p.page} className="px-5 py-3 flex items-center gap-3">
                  <span className="text-xs text-slate-400 w-5 text-right">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">
                      {shortPath(p.page)}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-500 tabular-nums">
                    <span>{p.clicks} clicks</span>
                    <span>#{p.position}</span>
                    <a
                      href={p.page}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${shortPath(p.page)}`}
                      className="text-slate-400 hover:text-amber-600"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
