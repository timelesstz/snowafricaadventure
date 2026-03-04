"use client";

import MetricCard from "@/components/admin/seo/MetricCard";
import HealthScoreGauge from "@/components/admin/seo/HealthScoreGauge";
import SyncStatusBadge from "@/components/admin/seo/SyncStatusBadge";
import Link from "next/link";
import { ExternalLink, AlertCircle } from "lucide-react";

interface OverviewData {
  totalClicks: number;
  totalImpressions: number;
  avgPosition: number;
  avgCtr: number;
  clicksTrend: number;
  impressionsTrend: number;
  positionTrend: number;
  ctrTrend: number;
  healthScore: number;
  lastSyncAt: string | null;
  topQueries: Array<{
    query: string;
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
  }>;
  topPages: Array<{
    page: string;
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
  }>;
  dailyMetrics: Array<{
    date: string;
    clicks: number;
    impressions: number;
  }>;
  issuesCount: number;
}

export default function OverviewDashboard({ data }: { data: OverviewData }) {
  const hasData = data.totalClicks > 0 || data.totalImpressions > 0;

  if (!hasData) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8 text-slate-400" />
        </div>
        <h2 className="text-lg font-semibold text-slate-900 mb-2">
          No SEO Data Yet
        </h2>
        <p className="text-slate-500 max-w-md mx-auto mb-6">
          Connect Google Search Console and Analytics to start tracking your SEO
          performance. Configure your API credentials in Settings.
        </p>
        <Link
          href="/admin/seo/settings"
          className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
        >
          Go to Settings
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Health Score + Last Sync */}
      <div className="flex items-start justify-between">
        <HealthScoreGauge score={data.healthScore} />
        <div className="flex items-center gap-3">
          <SyncStatusBadge lastSyncAt={data.lastSyncAt} />
          {data.issuesCount > 0 && (
            <Link
              href="/admin/seo/recommendations"
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-700 rounded-full text-xs font-medium hover:bg-red-100"
            >
              <AlertCircle className="w-3.5 h-3.5" />
              {data.issuesCount} issues
            </Link>
          )}
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Clicks"
          value={data.totalClicks.toLocaleString()}
          trend={data.clicksTrend}
          trendLabel="vs prior 7d"
          sparklineData={data.dailyMetrics.map((d) => ({ value: d.clicks }))}
        />
        <MetricCard
          title="Impressions"
          value={data.totalImpressions.toLocaleString()}
          trend={data.impressionsTrend}
          trendLabel="vs prior 7d"
          sparklineData={data.dailyMetrics.map((d) => ({
            value: d.impressions,
          }))}
        />
        <MetricCard
          title="Avg. Position"
          value={data.avgPosition}
          trend={data.positionTrend}
          trendLabel="vs prior 7d"
          invertTrend
        />
        <MetricCard
          title="Avg. CTR"
          value={`${data.avgCtr}%`}
          trend={data.ctrTrend}
          trendLabel="vs prior 7d"
        />
      </div>

      {/* Top Queries + Top Pages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Queries */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-semibold text-slate-900">Top Search Queries</h3>
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
                <div
                  key={q.query}
                  className="px-5 py-3 flex items-center gap-3"
                >
                  <span className="text-xs text-slate-400 w-5 text-right">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">
                      {q.query}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span>{q.clicks} clicks</span>
                    <span>#{q.position}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Top Pages */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-semibold text-slate-900">Top Pages</h3>
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
              data.topPages.map((p, i) => {
                const path = (() => {
                  try {
                    return new URL(p.page).pathname;
                  } catch {
                    return p.page;
                  }
                })();
                return (
                  <div
                    key={p.page}
                    className="px-5 py-3 flex items-center gap-3"
                  >
                    <span className="text-xs text-slate-400 w-5 text-right">
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">
                        {path}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span>{p.clicks} clicks</span>
                      <span>#{p.position}</span>
                      <a
                        href={p.page}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-amber-600"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
