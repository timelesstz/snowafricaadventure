import { AlertCircle, AlertTriangle, Info } from "lucide-react";
import { clsx } from "clsx";
import type { Recommendation } from "@/lib/seo-dashboard/types";

interface RecommendationCardProps {
  recommendation: Recommendation;
}

const severityConfig = {
  critical: {
    icon: AlertCircle,
    bg: "bg-red-50",
    border: "border-red-200",
    badge: "bg-red-100 text-red-700",
    iconColor: "text-red-500",
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-amber-50",
    border: "border-amber-200",
    badge: "bg-amber-100 text-amber-700",
    iconColor: "text-amber-500",
  },
  info: {
    icon: Info,
    bg: "bg-blue-50",
    border: "border-blue-200",
    badge: "bg-blue-100 text-blue-700",
    iconColor: "text-blue-500",
  },
};

export default function RecommendationCard({
  recommendation,
}: RecommendationCardProps) {
  const config = severityConfig[recommendation.severity];
  const Icon = config.icon;

  return (
    <div
      className={clsx(
        "rounded-lg border p-4",
        config.bg,
        config.border
      )}
    >
      <div className="flex gap-3">
        <Icon className={clsx("w-5 h-5 mt-0.5 shrink-0", config.iconColor)} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-sm font-semibold text-slate-900">
              {recommendation.title}
            </h4>
            <span
              className={clsx(
                "px-2 py-0.5 rounded-full text-xs font-medium",
                config.badge
              )}
            >
              {recommendation.severity}
            </span>
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
              {recommendation.category}
            </span>
          </div>
          <p className="text-sm text-slate-600 mt-1">
            {recommendation.description}
          </p>
          {recommendation.affectedUrl && (
            <p className="text-xs text-slate-500 mt-2 font-mono truncate">
              {recommendation.affectedUrl}
            </p>
          )}
          {recommendation.metric && (
            <p className="text-xs font-medium text-slate-700 mt-1">
              {recommendation.metric}
            </p>
          )}

          {/* The concrete next step. Without this a recommendation only
              restates the problem. */}
          {recommendation.action && (
            <p className="text-sm text-slate-700 mt-2">
              <span className="font-semibold">Do this: </span>
              {recommendation.action}
            </p>
          )}

          {/* Supporting numbers, so the advice can be judged rather than
              taken on trust. */}
          <div className="flex flex-wrap gap-2 mt-2">
            {recommendation.commercial && (
              <span className="px-2 py-0.5 rounded text-xs font-semibold bg-emerald-100 text-emerald-700">
                Commercial intent
              </span>
            )}
            {typeof recommendation.position === "number" && (
              <span className="px-2 py-0.5 rounded text-xs bg-white/70 text-slate-600 border border-slate-200">
                Position {recommendation.position.toFixed(0)}
              </span>
            )}
            {typeof recommendation.impressions === "number" && (
              <span className="px-2 py-0.5 rounded text-xs bg-white/70 text-slate-600 border border-slate-200">
                {recommendation.impressions.toLocaleString()} impressions
              </span>
            )}
            {typeof recommendation.clicks === "number" && (
              <span className="px-2 py-0.5 rounded text-xs bg-white/70 text-slate-600 border border-slate-200">
                {recommendation.clicks} clicks
              </span>
            )}
            {!!recommendation.estimatedClicks && recommendation.estimatedClicks > 0 && (
              <span className="px-2 py-0.5 rounded text-xs font-semibold bg-blue-100 text-blue-700">
                ~+{recommendation.estimatedClicks} clicks/mo if fixed
              </span>
            )}
            {recommendation.effort && (
              <span className="px-2 py-0.5 rounded text-xs bg-white/70 text-slate-600 border border-slate-200">
                {recommendation.effort} effort
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
