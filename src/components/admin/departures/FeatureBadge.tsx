"use client";

import { Star, Sparkles } from "lucide-react";
import { clsx } from "clsx";

interface FeatureBadgeProps {
  isFeatured: boolean;
  isManuallyFeatured: boolean;
  excludeFromRotation?: boolean;
  size?: "sm" | "md";
}

export function FeatureBadge({
  isFeatured,
  isManuallyFeatured,
  excludeFromRotation,
  size = "md",
}: FeatureBadgeProps) {
  if (!isFeatured && !excludeFromRotation) {
    return null;
  }

  if (excludeFromRotation) {
    return (
      <span
        className={clsx(
          "inline-flex items-center gap-1 font-medium rounded-full bg-slate-100 text-slate-600",
          size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs"
        )}
      >
        Excluded
      </span>
    );
  }

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 font-medium rounded-full",
        isManuallyFeatured
          ? "bg-amber-100 text-amber-700"
          : "bg-cyan-100 text-cyan-700",
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs"
      )}
    >
      {isManuallyFeatured ? (
        <>
          <Star className="w-3 h-3" />
          Manual
        </>
      ) : (
        <>
          <Sparkles className="w-3 h-3" />
          Auto
        </>
      )}
    </span>
  );
}
