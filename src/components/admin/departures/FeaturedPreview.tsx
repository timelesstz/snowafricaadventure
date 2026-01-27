"use client";

import { Star, ArrowRight } from "lucide-react";
import { DepartureStatusBadge } from "./DepartureStatusBadge";
import { DepartureStatus } from "@prisma/client";

interface FeaturedDeparture {
  id: string;
  arrivalDate: string;
  startDate: string;
  isFeatured: boolean;
  isManuallyFeatured: boolean;
  status: DepartureStatus;
  route: {
    title: string;
  };
}

interface FeaturedPreviewProps {
  departures: FeaturedDeparture[];
  title?: string;
}

export function FeaturedPreview({
  departures,
  title = "Featured Departures",
}: FeaturedPreviewProps) {
  const featured = departures.filter((d) => d.isFeatured);
  const upcoming = departures
    .filter((d) => !d.isFeatured)
    .slice(0, 3);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  if (featured.length === 0 && upcoming.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">{title}</h3>
        <p className="text-slate-500 text-sm">No departures scheduled</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">{title}</h3>

      <div className="space-y-4">
        {/* Featured departures */}
        {featured.map((dep) => (
          <div
            key={dep.id}
            className="flex items-center gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg"
          >
            <Star className="w-5 h-5 text-amber-500 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-slate-900 truncate">
                {dep.route.title}
              </p>
              <p className="text-sm text-slate-600">
                {formatDate(dep.arrivalDate)} arrival
              </p>
            </div>
            <div className="flex items-center gap-2">
              <DepartureStatusBadge status={dep.status} size="sm" />
              {dep.isManuallyFeatured && (
                <span className="text-xs text-amber-600 font-medium">
                  MANUAL
                </span>
              )}
            </div>
          </div>
        ))}

        {/* Queue preview */}
        {upcoming.length > 0 && (
          <>
            <div className="flex items-center gap-2 text-sm text-slate-500 pt-2">
              <ArrowRight className="w-4 h-4" />
              <span>Next in queue</span>
            </div>
            {upcoming.map((dep, index) => (
              <div
                key={dep.id}
                className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg"
              >
                <span className="w-6 h-6 flex items-center justify-center text-xs font-medium text-slate-500 bg-white border border-slate-200 rounded-full">
                  {index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-700 truncate text-sm">
                    {dep.route.title}
                  </p>
                  <p className="text-xs text-slate-500">
                    {formatDate(dep.arrivalDate)}
                  </p>
                </div>
                <DepartureStatusBadge status={dep.status} size="sm" />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
