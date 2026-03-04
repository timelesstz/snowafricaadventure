"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import DateRangePicker from "@/components/admin/seo/DateRangePicker";
import {
  ExternalLink,
  ArrowUpDown,
  Search,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Target,
  TrendingUp,
  Shield,
  AlertTriangle,
  Eye,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import {
  analyzeQuery,
  generateTopInsights,
  type QueryAdvice,
} from "@/lib/seo-dashboard/query-advisor";

interface QueryRow {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  topPage?: string | null;
}

interface TimePoint {
  date: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

interface SearchConsoleData {
  queries: QueryRow[];
  total: number;
  timeSeries: TimePoint[];
}

type SortField = "clicks" | "impressions" | "ctr" | "position";

const INSIGHT_ICONS: Record<string, React.ReactNode> = {
  "Fix These Titles": <AlertTriangle className="w-4 h-4 text-amber-500" />,
  "Page 2 Queries": <TrendingUp className="w-4 h-4 text-violet-500" />,
  "Wasted Impressions": <Eye className="w-4 h-4 text-red-500" />,
  "Protect These": <Shield className="w-4 h-4 text-emerald-500" />,
};

function getInsightIcon(title: string) {
  for (const [key, icon] of Object.entries(INSIGHT_ICONS)) {
    if (title.includes(key)) return icon;
  }
  return <Target className="w-4 h-4 text-indigo-500" />;
}

export default function SearchConsolePage() {
  const [days, setDays] = useState(28);
  const [data, setData] = useState<SearchConsoleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortField>("clicks");
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [tab, setTab] = useState<"queries" | "pages">("queries");
  const [pageData, setPageData] = useState<{
    pages: QueryRow[];
    total: number;
  } | null>(null);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [showAdvisor, setShowAdvisor] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        days: days.toString(),
        sort,
        order,
        search,
        limit: "100",
      });
      const res = await fetch(`/api/admin/seo/search-queries?${params}`);
      if (res.ok) setData(await res.json());

      const pRes = await fetch(
        `/api/admin/seo/page-metrics?days=${days}&search=${search}&limit=100`
      );
      if (pRes.ok) setPageData(await pRes.json());
    } catch (error) {
      console.error("Failed to fetch search console data:", error);
    }
    setLoading(false);
  }, [days, sort, order, search]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Generate AI insights from query data
  const insights = useMemo(() => {
    if (!data?.queries || data.queries.length === 0) return [];
    return generateTopInsights(data.queries);
  }, [data?.queries]);

  // Pre-compute advice for each row
  const adviceMap = useMemo(() => {
    const map = new Map<number, QueryAdvice>();
    if (data?.queries) {
      data.queries.forEach((q, i) => {
        map.set(i, analyzeQuery(q));
      });
    }
    return map;
  }, [data?.queries]);

  const handleSort = (field: SortField) => {
    if (sort === field) {
      setOrder(order === "desc" ? "asc" : "desc");
    } else {
      setSort(field);
      setOrder("desc");
    }
  };

  const SortHeader = ({
    field,
    label,
  }: {
    field: SortField;
    label: string;
  }) => (
    <button
      type="button"
      onClick={() => handleSort(field)}
      className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-700"
    >
      {label}
      <ArrowUpDown className="w-3 h-3" />
    </button>
  );

  const rows = tab === "queries" ? data?.queries : pageData?.pages;

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setTab("queries")}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                tab === "queries"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500"
              }`}
            >
              Queries
            </button>
            <button
              type="button"
              onClick={() => setTab("pages")}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                tab === "pages"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500"
              }`}
            >
              Pages
            </button>
          </div>
          <DateRangePicker value={days} onChange={setDays} />
        </div>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Filter..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 w-48"
          />
        </div>
      </div>

      {/* AI Advisor Panel */}
      {tab === "queries" && insights.length > 0 && (
        <div className="bg-gradient-to-br from-amber-50 via-white to-indigo-50 rounded-xl border border-amber-200/60 overflow-hidden">
          <button
            type="button"
            onClick={() => setShowAdvisor(!showAdvisor)}
            className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-amber-50/50 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-amber-100 rounded-lg">
                <Sparkles className="w-4 h-4 text-amber-600" />
              </div>
              <div className="text-left">
                <h3 className="text-sm font-semibold text-slate-900">
                  SEO Advisor
                </h3>
                <p className="text-xs text-slate-500">
                  {insights.length} actionable insight
                  {insights.length !== 1 ? "s" : ""} based on your data
                </p>
              </div>
            </div>
            {showAdvisor ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {showAdvisor && (
            <div className="px-5 pb-5 space-y-3">
              {insights.map((insight, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg border border-slate-100 p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 shrink-0">
                      {getInsightIcon(insight.title)}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-slate-900">
                        {insight.title}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {insight.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-2.5">
                        {insight.queries.map((q, j) => (
                          <span
                            key={j}
                            className="inline-flex px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-xs font-medium"
                          >
                            {q}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Time Series Chart */}
      {data?.timeSeries && data.timeSeries.length > 1 && (
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">
            Clicks & Impressions Over Time
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.timeSeries}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11 }}
                  tickFormatter={(d) =>
                    new Date(d).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                />
                <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fontSize: 11 }}
                />
                <Tooltip
                  labelFormatter={(d) =>
                    new Date(d).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })
                  }
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="clicks"
                  stroke="#d97706"
                  strokeWidth={2}
                  dot={false}
                  name="Clicks"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="impressions"
                  stroke="#6366f1"
                  strokeWidth={2}
                  dot={false}
                  name="Impressions"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Data Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="px-5 py-12 text-center text-sm text-slate-400">
            Loading...
          </div>
        ) : !rows || rows.length === 0 ? (
          <div className="px-5 py-12 text-center text-sm text-slate-400">
            No data available. Sync data from Settings first.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="text-left px-5 py-3 text-xs font-medium text-slate-500">
                    {tab === "queries" ? "Query" : "Page"}
                  </th>
                  <th className="text-right px-3 py-3">
                    <SortHeader field="clicks" label="Clicks" />
                  </th>
                  <th className="text-right px-3 py-3">
                    <SortHeader field="impressions" label="Impressions" />
                  </th>
                  <th className="text-right px-3 py-3">
                    <SortHeader field="ctr" label="CTR" />
                  </th>
                  <th className="text-right px-3 py-3">
                    <SortHeader field="position" label="Position" />
                  </th>
                  {tab === "queries" && (
                    <th className="text-center px-3 py-3 text-xs font-medium text-slate-500">
                      <div className="flex items-center justify-center gap-1">
                        <Lightbulb className="w-3 h-3" />
                        Advice
                      </div>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {rows.map((row, i) => {
                  const isQuery = tab === "queries";
                  const label = isQuery
                    ? row.query
                    : (() => {
                        try {
                          return new URL(
                            row.query ||
                              (row as unknown as { page: string }).page
                          ).pathname;
                        } catch {
                          return (
                            row.query ||
                            (row as unknown as { page: string }).page
                          );
                        }
                      })();
                  const pageUrl = isQuery
                    ? row.topPage
                    : (row as unknown as { page: string }).page;
                  const advice = isQuery ? adviceMap.get(i) : null;
                  const isExpanded = expandedRow === i && isQuery;

                  return (
                    <tr
                      key={i}
                      className={`hover:bg-slate-25 ${isQuery ? "cursor-pointer" : ""} ${isExpanded ? "bg-slate-25" : ""}`}
                      onClick={() => {
                        if (isQuery)
                          setExpandedRow(isExpanded ? null : i);
                      }}
                    >
                      <td className="px-5 py-3 max-w-sm">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="truncate font-medium text-slate-900">
                              {label}
                            </span>
                            {pageUrl && (
                              <a
                                href={pageUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-400 hover:text-amber-600 shrink-0"
                                onClick={(e) => e.stopPropagation()}
                                title="Open page"
                                aria-label="Open page in new tab"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                          {isQuery && pageUrl && (
                            <p className="text-xs text-slate-400 mt-0.5 truncate max-w-xs">
                              {(() => {
                                try {
                                  return new URL(pageUrl).pathname;
                                } catch {
                                  return pageUrl;
                                }
                              })()}
                            </p>
                          )}
                          {/* Expanded advice panel */}
                          {isExpanded && advice && (
                            <div
                              className={`mt-2.5 p-3 rounded-lg ${advice.color} border border-slate-100`}
                            >
                              <p
                                className={`text-xs leading-relaxed ${advice.textColor}`}
                              >
                                {advice.advice}
                              </p>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="text-right px-3 py-3 text-slate-700 font-medium">
                        {row.clicks.toLocaleString()}
                      </td>
                      <td className="text-right px-3 py-3 text-slate-500">
                        {row.impressions.toLocaleString()}
                      </td>
                      <td className="text-right px-3 py-3 text-slate-500">
                        {row.ctr}%
                      </td>
                      <td className="text-right px-3 py-3 text-slate-700 font-medium">
                        {row.position > 0 ? `#${row.position}` : "-"}
                      </td>
                      {isQuery && advice && (
                        <td className="text-center px-3 py-3">
                          <span
                            className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${advice.color} ${advice.textColor}`}
                          >
                            {advice.label}
                          </span>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
