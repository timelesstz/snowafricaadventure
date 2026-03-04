import { generateRecommendations } from "@/lib/seo-dashboard/recommendation-engine";
import RecommendationCard from "@/components/admin/seo/RecommendationCard";

export const dynamic = "force-dynamic";

export default async function RecommendationsPage() {
  const recommendations = await generateRecommendations();

  const critical = recommendations.filter((r) => r.severity === "critical");
  const warnings = recommendations.filter((r) => r.severity === "warning");
  const info = recommendations.filter((r) => r.severity === "info");

  return (
    <div className="space-y-6">
      {recommendations.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-slate-500 mb-2">No recommendations right now.</p>
          <p className="text-sm text-slate-400">
            Run page audits and sync search console data to generate SEO
            recommendations.
          </p>
        </div>
      ) : (
        <>
          {/* Summary */}
          <div className="flex gap-4">
            {critical.length > 0 && (
              <div className="px-4 py-2 bg-red-50 text-red-700 rounded-lg text-sm font-medium">
                {critical.length} critical
              </div>
            )}
            {warnings.length > 0 && (
              <div className="px-4 py-2 bg-amber-50 text-amber-700 rounded-lg text-sm font-medium">
                {warnings.length} warnings
              </div>
            )}
            {info.length > 0 && (
              <div className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                {info.length} info
              </div>
            )}
          </div>

          {/* Critical */}
          {critical.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-3">
                Critical Issues
              </h3>
              <div className="space-y-3">
                {critical.map((rec) => (
                  <RecommendationCard key={rec.id} recommendation={rec} />
                ))}
              </div>
            </div>
          )}

          {/* Warnings */}
          {warnings.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-3">
                Warnings
              </h3>
              <div className="space-y-3">
                {warnings.map((rec) => (
                  <RecommendationCard key={rec.id} recommendation={rec} />
                ))}
              </div>
            </div>
          )}

          {/* Info */}
          {info.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-3">
                Information
              </h3>
              <div className="space-y-3">
                {info.map((rec) => (
                  <RecommendationCard key={rec.id} recommendation={rec} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
