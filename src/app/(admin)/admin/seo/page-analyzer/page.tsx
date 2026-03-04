"use client";

import { useState } from "react";
import {
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Info,
  Search,
  Loader2,
} from "lucide-react";
import { clsx } from "clsx";
import type { AuditResult, AuditIssue } from "@/lib/seo-dashboard/types";

const severityIcons = {
  pass: CheckCircle2,
  critical: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const severityColors = {
  pass: "text-green-500",
  critical: "text-red-500",
  warning: "text-amber-500",
  info: "text-blue-500",
};

export default function PageAnalyzerPage() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<AuditResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAudit = async () => {
    if (!url.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/admin/seo/audit-page", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Audit failed");
      }

      setResult(await res.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Audit failed");
    }
    setLoading(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-amber-600";
    if (score >= 40) return "text-orange-600";
    return "text-red-600";
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-green-50 border-green-200";
    if (score >= 60) return "bg-amber-50 border-amber-200";
    if (score >= 40) return "bg-orange-50 border-orange-200";
    return "bg-red-50 border-red-200";
  };

  return (
    <div className="space-y-6">
      {/* URL Input */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h3 className="text-sm font-semibold text-slate-900 mb-3">
          Analyze a Page
        </h3>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAudit()}
              placeholder="Enter URL or path (e.g., /tanzania-safaris/ or https://...)"
              className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <button
            type="button"
            onClick={handleAudit}
            disabled={loading || !url.trim()}
            className="px-5 py-2.5 bg-amber-600 text-white text-sm font-medium rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Analyze"
            )}
          </button>
        </div>
        {error && (
          <p className="mt-3 text-sm text-red-600">{error}</p>
        )}
      </div>

      {/* Results */}
      {result && (
        <>
          {/* Score */}
          <div
            className={clsx(
              "rounded-xl border p-6 flex items-center gap-6",
              getScoreBg(result.score)
            )}
          >
            <div
              className={clsx(
                "text-5xl font-bold",
                getScoreColor(result.score)
              )}
            >
              {result.score}
            </div>
            <div>
              <p className="text-lg font-semibold text-slate-900">
                SEO Score
              </p>
              <p className="text-sm text-slate-600 mt-0.5">
                {result.url}
              </p>
              <div className="flex gap-4 mt-2 text-xs text-slate-500">
                <span>{result.wordCount} words</span>
                <span>{result.h1Count} H1 / {result.h2Count} H2 / {result.h3Count} H3</span>
                <span>{result.internalLinks} internal links</span>
                <span>{result.imagesTotal} images</span>
              </div>
            </div>
          </div>

          {/* Issues Checklist */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100">
              <h3 className="font-semibold text-slate-900">Audit Results</h3>
            </div>
            <div className="divide-y divide-slate-50">
              {(result.issues as AuditIssue[]).map((issue, i) => {
                const Icon = severityIcons[issue.severity];
                return (
                  <div
                    key={i}
                    className="px-5 py-3 flex items-start gap-3"
                  >
                    <Icon
                      className={clsx(
                        "w-5 h-5 mt-0.5 shrink-0",
                        severityColors[issue.severity]
                      )}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-900">
                        {issue.message}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5 capitalize">
                        {issue.field}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Details */}
          {result.title && (
            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
              <h3 className="font-semibold text-slate-900 text-sm">
                Page Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-slate-500">Title:</span>{" "}
                  <span className="text-slate-900 font-medium">
                    {result.title}
                  </span>
                  <span className="text-slate-400">
                    {" "}
                    ({result.titleLength} chars)
                  </span>
                </div>
                {result.metaDescription && (
                  <div>
                    <span className="text-slate-500">Meta Description:</span>{" "}
                    <span className="text-slate-900">
                      {result.metaDescription.substring(0, 80)}...
                    </span>
                    <span className="text-slate-400">
                      {" "}
                      ({result.metaDescLength} chars)
                    </span>
                  </div>
                )}
                {result.h1Text && (
                  <div>
                    <span className="text-slate-500">H1:</span>{" "}
                    <span className="text-slate-900">{result.h1Text}</span>
                  </div>
                )}
                {result.schemaTypes.length > 0 && (
                  <div>
                    <span className="text-slate-500">Schema:</span>{" "}
                    <span className="text-slate-900">
                      {result.schemaTypes.join(", ")}
                    </span>
                  </div>
                )}
                {result.canonicalUrl && (
                  <div>
                    <span className="text-slate-500">Canonical:</span>{" "}
                    <span className="text-slate-900 font-mono text-xs">
                      {result.canonicalUrl}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
