import Image from "next/image";
import Link from "next/link";
import { Clock, Users, Mountain, TrendingUp, Target, Award, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface RouteCardEnhancedProps {
  slug: string;
  title: string;
  duration: string;
  physicalRating?: string | null;
  maxPeople?: number | null;
  featuredImage?: string | null;
  overview?: string | null;
  successRate?: number | null;
  highlights?: string[];
  variant?: "default" | "featured" | "compact" | "horizontal";
  className?: string;
}

const difficultyConfig: Record<string, { color: string; bg: string; icon: string; level: number }> = {
  Easy: { color: "text-emerald-600", bg: "bg-emerald-100", icon: "🟢", level: 1 },
  Moderate: { color: "text-blue-600", bg: "bg-blue-100", icon: "🔵", level: 2 },
  Challenging: { color: "text-amber-600", bg: "bg-amber-100", icon: "🟡", level: 3 },
  Difficult: { color: "text-orange-600", bg: "bg-orange-100", icon: "🟠", level: 4 },
  Strenuous: { color: "text-red-600", bg: "bg-red-100", icon: "🔴", level: 5 },
};

export function RouteCardEnhanced({
  slug,
  title,
  duration,
  physicalRating,
  maxPeople,
  featuredImage,
  overview,
  successRate,
  highlights,
  variant = "default",
  className,
}: RouteCardEnhancedProps) {
  const difficulty = difficultyConfig[physicalRating || "Moderate"] || difficultyConfig.Moderate;

  if (variant === "featured") {
    return (
      <Link
        href={`/trekking/${slug}/`}
        className={cn(
          "group relative grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden bg-white border border-[var(--border)] shadow-sm hover:shadow-xl transition-all duration-500",
          className
        )}
      >
        {/* Image */}
        <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[380px] overflow-hidden">
          {featuredImage ? (
            <Image
              src={featuredImage}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 66vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center">
              <Mountain className="w-24 h-24 text-white/20" />
            </div>
          )}

          {/* Top Badges */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <span className="px-4 py-2 rounded-full text-sm font-bold bg-[var(--secondary)] text-white shadow-lg">
              Most Popular
            </span>
            {successRate && (
              <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                <Target className="w-4 h-4 text-emerald-500" />
                <span className="font-bold text-sm">{successRate}% Success</span>
              </div>
            )}
          </div>

        </div>

        {/* Content */}
        <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--secondary)] mb-3">
            Featured Route
          </span>

          <h3 className="font-heading text-2xl lg:text-3xl font-bold mb-3 group-hover:text-[var(--secondary)] transition-colors">
            {title}
          </h3>
          {overview && (
            <p className="text-[var(--text-muted)] leading-relaxed line-clamp-3 mb-6">
              {overview}
            </p>
          )}

          {/* Stats Row */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[var(--text-muted)] mb-6">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[var(--secondary)]" />
              <span className="font-medium">{duration}</span>
            </span>
            <span className={cn("flex items-center gap-2 px-3 py-1 rounded-full", difficulty.bg)}>
              <span className={cn("font-medium", difficulty.color)}>{physicalRating}</span>
            </span>
            {maxPeople && (
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[var(--secondary)]" />
                <span>Max {maxPeople} people</span>
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[var(--border)]">
            {/* Difficulty Meter */}
            <div className="flex flex-col">
              <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1.5">Difficulty</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    className={cn(
                      "w-3 h-3 rounded-full transition-colors",
                      level <= difficulty.level ? difficulty.bg.replace("100", "500") : "bg-gray-200"
                    )}
                  />
                ))}
              </div>
            </div>
            <span className="inline-flex items-center gap-2 text-[var(--primary)] font-semibold group-hover:gap-3 transition-all shrink-0">
              Start Your Journey
              <span className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center text-white group-hover:bg-[var(--primary-dark)] transition-colors">
                →
              </span>
            </span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "horizontal") {
    return (
      <Link
        href={`/trekking/${slug}/`}
        className={cn(
          "group flex bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-[var(--border)]",
          className
        )}
      >
        {/* Image */}
        <div className="relative w-64 flex-shrink-0 overflow-hidden">
          {featuredImage ? (
            <Image
              src={featuredImage}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="256px"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center">
              <Mountain className="w-12 h-12 text-white/30" />
            </div>
          )}
          {physicalRating && (
            <div className={cn("absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold", difficulty.bg, difficulty.color)}>
              {physicalRating}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-5 flex flex-col">
          <div className="flex items-start justify-between gap-4 mb-2">
            <h3 className="font-bold text-lg text-[var(--text)] group-hover:text-[var(--primary)] transition-colors line-clamp-1">
              {title}
            </h3>
            {successRate && (
              <div className="flex items-center gap-1 flex-shrink-0 bg-emerald-100 px-2 py-1 rounded-full">
                <Target className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-semibold text-xs">{successRate}%</span>
              </div>
            )}
          </div>

          {overview && (
            <p className="text-sm text-[var(--text-muted)] line-clamp-2 mb-3">{overview}</p>
          )}

          {/* Stats */}
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="flex items-center gap-1 text-xs text-[var(--text-muted)] bg-[var(--surface)] px-2 py-1 rounded">
              <Clock className="w-3.5 h-3.5" />
              {duration}
            </span>
            {maxPeople && (
              <span className="flex items-center gap-1 text-xs text-[var(--text-muted)] bg-[var(--surface)] px-2 py-1 rounded">
                <Users className="w-3.5 h-3.5" />
                Max {maxPeople}
              </span>
            )}
          </div>

          {/* Highlights */}
          {highlights && highlights.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {highlights.slice(0, 3).map((h, i) => (
                <span key={i} className="text-xs text-[var(--primary)] bg-[var(--primary)]/10 px-2 py-0.5 rounded-full">
                  {h}
                </span>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="mt-auto flex items-center justify-between pt-3 border-t border-[var(--border)]">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className={cn(
                    "w-2 h-2 rounded-full",
                    level <= difficulty.level ? "bg-[var(--primary)]" : "bg-gray-200"
                  )}
                />
              ))}
            </div>
            <span className="text-[var(--primary)] font-medium group-hover:underline">
              View Route →
            </span>
          </div>
        </div>
      </Link>
    );
  }

  // Default card
  return (
    <Link
      href={`/trekking/${slug}/`}
      className={cn(
        "group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col h-full",
        className
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {featuredImage ? (
          <Image
            src={featuredImage}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center">
            <Mountain className="w-16 h-16 text-white/30" />
          </div>
        )}

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          {physicalRating && (
            <span className={cn(
              "px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm",
              difficulty.bg, difficulty.color
            )}>
              {physicalRating}
            </span>
          )}
          {successRate && (
            <div className="flex items-center gap-1 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-lg">
              <Target className="w-3.5 h-3.5 text-emerald-500" />
              <span className="font-bold text-xs text-emerald-700">{successRate}%</span>
            </div>
          )}
        </div>

        {/* Bottom Stats */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex items-center gap-3 text-white/90 text-xs">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {duration}
            </span>
            {maxPeople && (
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                Max {maxPeople}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-lg text-[var(--text)] group-hover:text-[var(--primary)] transition-colors mb-2 line-clamp-2">
          {title}
        </h3>

        {overview && (
          <p className="text-sm text-[var(--text-muted)] line-clamp-3 mb-4">{overview}</p>
        )}

        {/* Difficulty Meter */}
        <div className="mt-auto pt-4 border-t border-[var(--border)] flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Difficulty</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className={cn(
                    "w-3 h-3 rounded-sm transition-colors",
                    level <= difficulty.level
                      ? level <= 2 ? "bg-emerald-500"
                        : level <= 3 ? "bg-amber-500"
                        : "bg-red-500"
                      : "bg-gray-200"
                  )}
                />
              ))}
            </div>
          </div>
          <span className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center text-white group-hover:bg-[var(--primary-dark)] group-hover:scale-110 transition-all shadow-lg">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
