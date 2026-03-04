"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Trash2, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { clsx } from "clsx";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import type { KeywordWithPosition } from "@/lib/seo-dashboard/types";

export default function KeywordsPage() {
  const [keywords, setKeywords] = useState<KeywordWithPosition[]>([]);
  const [loading, setLoading] = useState(true);
  const [newKeyword, setNewKeyword] = useState("");
  const [newTargetUrl, setNewTargetUrl] = useState("");
  const [adding, setAdding] = useState(false);
  const [selectedKeyword, setSelectedKeyword] = useState<KeywordWithPosition | null>(null);

  const fetchKeywords = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/seo/keywords");
      if (res.ok) setKeywords(await res.json());
    } catch (error) {
      console.error("Failed to fetch keywords:", error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchKeywords();
  }, [fetchKeywords]);

  const handleAdd = async () => {
    if (!newKeyword.trim()) return;
    setAdding(true);
    try {
      const res = await fetch("/api/admin/seo/keywords", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          keyword: newKeyword.trim().toLowerCase(),
          targetUrl: newTargetUrl.trim() || null,
        }),
      });
      if (res.ok) {
        setNewKeyword("");
        setNewTargetUrl("");
        fetchKeywords();
      }
    } catch (error) {
      console.error("Failed to add keyword:", error);
    }
    setAdding(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/admin/seo/keywords?id=${id}`, { method: "DELETE" });
      fetchKeywords();
    } catch (error) {
      console.error("Failed to delete keyword:", error);
    }
  };

  const getPositionTrend = (kw: KeywordWithPosition) => {
    const history = kw.positionHistory;
    if (history.length < 2) return 0;
    return history[0].position - history[history.length - 1].position;
  };

  return (
    <div className="space-y-6">
      {/* Add Keyword */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h3 className="text-sm font-semibold text-slate-900 mb-3">
          Track a Keyword
        </h3>
        <div className="flex gap-3 flex-wrap">
          <input
            type="text"
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder="Keyword to track..."
            className="flex-1 min-w-48 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <input
            type="text"
            value={newTargetUrl}
            onChange={(e) => setNewTargetUrl(e.target.value)}
            placeholder="Target URL (optional)"
            className="flex-1 min-w-48 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <button
            type="button"
            onClick={handleAdd}
            disabled={adding || !newKeyword.trim()}
            className="px-4 py-2 bg-amber-600 text-white text-sm font-medium rounded-lg hover:bg-amber-700 disabled:opacity-50 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>

      {/* Keywords Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="px-5 py-12 text-center text-sm text-slate-400">
            Loading...
          </div>
        ) : keywords.length === 0 ? (
          <div className="px-5 py-12 text-center text-sm text-slate-400">
            No keywords tracked yet. Add keywords above to start tracking.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="text-left px-5 py-3 text-xs font-medium text-slate-500">
                    Keyword
                  </th>
                  <th className="text-right px-3 py-3 text-xs font-medium text-slate-500">
                    Position
                  </th>
                  <th className="text-right px-3 py-3 text-xs font-medium text-slate-500">
                    Best
                  </th>
                  <th className="text-right px-3 py-3 text-xs font-medium text-slate-500">
                    Trend
                  </th>
                  <th className="text-right px-3 py-3 text-xs font-medium text-slate-500">
                    Clicks (30d)
                  </th>
                  <th className="text-right px-3 py-3 text-xs font-medium text-slate-500">
                    Impressions
                  </th>
                  <th className="text-right px-5 py-3 text-xs font-medium text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {keywords.map((kw) => {
                  const trend = getPositionTrend(kw);
                  return (
                    <tr
                      key={kw.id}
                      className="hover:bg-slate-25 cursor-pointer"
                      onClick={() =>
                        setSelectedKeyword(
                          selectedKeyword?.id === kw.id ? null : kw
                        )
                      }
                    >
                      <td className="px-5 py-3">
                        <div>
                          <span className="font-medium text-slate-900">
                            {kw.keyword}
                          </span>
                          {kw.targetUrl && (
                            <p className="text-xs text-slate-400 truncate max-w-xs">
                              {kw.targetUrl}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="text-right px-3 py-3">
                        {kw.currentPosition ? (
                          <span className="font-bold text-slate-900">
                            #{kw.currentPosition.toFixed(1)}
                          </span>
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </td>
                      <td className="text-right px-3 py-3 text-slate-500">
                        {kw.bestPosition
                          ? `#${kw.bestPosition.toFixed(1)}`
                          : "-"}
                      </td>
                      <td className="text-right px-3 py-3">
                        <div className="flex items-center justify-end gap-1">
                          {trend > 0 ? (
                            <>
                              <TrendingUp className="w-3.5 h-3.5 text-green-500" />
                              <span className="text-xs text-green-600">
                                +{trend.toFixed(1)}
                              </span>
                            </>
                          ) : trend < 0 ? (
                            <>
                              <TrendingDown className="w-3.5 h-3.5 text-red-500" />
                              <span className="text-xs text-red-600">
                                {trend.toFixed(1)}
                              </span>
                            </>
                          ) : (
                            <Minus className="w-3.5 h-3.5 text-slate-400" />
                          )}
                        </div>
                      </td>
                      <td className="text-right px-3 py-3 text-slate-700">
                        {kw.clicks.toLocaleString()}
                      </td>
                      <td className="text-right px-3 py-3 text-slate-500">
                        {kw.impressions.toLocaleString()}
                      </td>
                      <td className="text-right px-5 py-3">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(kw.id);
                          }}
                          className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Position History Chart */}
      {selectedKeyword && selectedKeyword.positionHistory.length > 1 && (
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">
            Position History:{" "}
            <span className="text-amber-600">{selectedKeyword.keyword}</span>
          </h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={selectedKeyword.positionHistory}>
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
                <YAxis
                  reversed
                  tick={{ fontSize: 11 }}
                  domain={["auto", "auto"]}
                />
                <Tooltip
                  labelFormatter={(d) =>
                    new Date(d).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                    })
                  }
                  formatter={(value: number | undefined) => [
                    value !== undefined ? `#${value.toFixed(1)}` : "-",
                    "Position",
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="position"
                  stroke="#d97706"
                  strokeWidth={2}
                  dot={{ fill: "#d97706", r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
