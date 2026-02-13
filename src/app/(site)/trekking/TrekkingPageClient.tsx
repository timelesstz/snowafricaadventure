"use client";

import { useState, useMemo } from "react";
import { RouteCardEnhanced } from "@/components/cards/RouteCardEnhanced";
import { TrekkingFilters } from "@/components/filters/TrekkingFilters";
import { LayoutGrid, List } from "lucide-react";
import { cn } from "@/lib/utils";

interface Route {
  slug: string;
  title: string;
  duration: string;
  durationDays: number;
  physicalRating: string | null;
  maxPeople: number | null;
  overview: string;
  successRate: number | null;
  featuredImage: string | null;
  highlights: string[];
  startPoint: string | null;
  endPoint: string | null;
}

interface TrekkingPageClientProps {
  routes: Route[];
  difficulties: string[];
}

// Difficulty order for sorting
const difficultyOrder: Record<string, number> = {
  Easy: 1,
  Moderate: 2,
  Challenging: 3,
  Difficult: 4,
  Strenuous: 5,
};

export function TrekkingPageClient({ routes, difficulties }: TrekkingPageClientProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredAndSortedRoutes = useMemo(() => {
    let result = routes.filter((route) => {
      // Difficulty filter
      if (selectedDifficulty && route.physicalRating !== selectedDifficulty) return false;

      // Duration filter
      if (selectedDuration) {
        const days = route.durationDays;
        switch (selectedDuration) {
          case "5-6":
            if (days < 5 || days > 6) return false;
            break;
          case "7-8":
            if (days < 7 || days > 8) return false;
            break;
          case "9+":
            if (days < 9) return false;
            break;
        }
      }

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          route.title.toLowerCase().includes(query) ||
          route.overview.toLowerCase().includes(query)
        );
      }

      return true;
    });

    // Sort
    switch (sortBy) {
      case "success":
        result.sort((a, b) => (b.successRate || 0) - (a.successRate || 0));
        break;
      case "duration-asc":
        result.sort((a, b) => a.durationDays - b.durationDays);
        break;
      case "duration-desc":
        result.sort((a, b) => b.durationDays - a.durationDays);
        break;
      case "difficulty-asc":
        result.sort(
          (a, b) =>
            (difficultyOrder[a.physicalRating || "Moderate"] || 3) -
            (difficultyOrder[b.physicalRating || "Moderate"] || 3)
        );
        break;
      case "difficulty-desc":
        result.sort(
          (a, b) =>
            (difficultyOrder[b.physicalRating || "Moderate"] || 3) -
            (difficultyOrder[a.physicalRating || "Moderate"] || 3)
        );
        break;
      case "popular":
      default:
        // Keep original order (by duration) but prioritize Machame and Lemosho
        const popularRoutes = ["machame-route", "lemosho-route", "marangu-route"];
        result.sort((a, b) => {
          const aPopular = popularRoutes.indexOf(a.slug);
          const bPopular = popularRoutes.indexOf(b.slug);
          if (aPopular !== -1 && bPopular === -1) return -1;
          if (aPopular === -1 && bPopular !== -1) return 1;
          if (aPopular !== -1 && bPopular !== -1) return aPopular - bPopular;
          return a.durationDays - b.durationDays;
        });
        break;
    }

    return result;
  }, [routes, selectedDifficulty, selectedDuration, searchQuery, sortBy]);

  const clearFilters = () => {
    setSelectedDifficulty("");
    setSelectedDuration("");
    setSearchQuery("");
    setSortBy("popular");
  };

  // Get featured route (first popular one)
  const featuredRoute = filteredAndSortedRoutes.find(
    (r) => r.slug === "machame-route" || r.slug === "lemosho-route"
  ) || filteredAndSortedRoutes[0];

  const remainingRoutes = filteredAndSortedRoutes.filter(
    (r) => r.slug !== featuredRoute?.slug
  );

  return (
    <div className="space-y-8">
      {/* Filters */}
      <TrekkingFilters
        difficulties={difficulties}
        durations={[]}
        selectedDifficulty={selectedDifficulty}
        selectedDuration={selectedDuration}
        searchQuery={searchQuery}
        sortBy={sortBy}
        onDifficultyChange={setSelectedDifficulty}
        onDurationChange={setSelectedDuration}
        onSearchChange={setSearchQuery}
        onSortChange={setSortBy}
        onClearFilters={clearFilters}
        totalResults={filteredAndSortedRoutes.length}
      />

      {/* View Toggle */}
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-2xl font-bold">
          {selectedDifficulty ? `${selectedDifficulty} Routes` : "All Kilimanjaro Routes"}
        </h2>
        <div className="flex items-center gap-2 bg-white rounded-lg p-1 shadow-sm border border-[var(--border)]">
          <button
            onClick={() => setViewMode("grid")}
            className={cn(
              "p-2 rounded-md transition-colors",
              viewMode === "grid"
                ? "bg-[var(--primary)] text-white"
                : "text-[var(--text-muted)] hover:text-[var(--text)]"
            )}
            aria-label="Grid view"
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={cn(
              "p-2 rounded-md transition-colors",
              viewMode === "list"
                ? "bg-[var(--primary)] text-white"
                : "text-[var(--text-muted)] hover:text-[var(--text)]"
            )}
            aria-label="List view"
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Results */}
      {filteredAndSortedRoutes.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl">
          <div className="text-6xl mb-4">🏔️</div>
          <h3 className="text-xl font-semibold mb-2">No routes found</h3>
          <p className="text-[var(--text-muted)] mb-4">
            Try adjusting your filters or search terms
          </p>
          <button
            onClick={clearFilters}
            className="text-[var(--primary)] font-medium hover:underline"
          >
            Clear all filters
          </button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="space-y-8">
          {/* Featured Route */}
          {featuredRoute && filteredAndSortedRoutes.length > 1 && (
            <RouteCardEnhanced
              {...featuredRoute}
              variant="featured"
              className="hidden lg:block"
            />
          )}

          {/* Routes Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* On smaller screens, show featured in grid */}
            {featuredRoute && filteredAndSortedRoutes.length > 1 && (
              <RouteCardEnhanced
                {...featuredRoute}
                variant="default"
                className="lg:hidden"
              />
            )}
            {/* If only one result, show it in grid */}
            {filteredAndSortedRoutes.length === 1 && featuredRoute && (
              <RouteCardEnhanced
                {...featuredRoute}
                variant="default"
              />
            )}
            {remainingRoutes.map((route) => (
              <RouteCardEnhanced
                key={route.slug}
                {...route}
                variant="default"
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAndSortedRoutes.map((route) => (
            <RouteCardEnhanced
              key={route.slug}
              {...route}
              variant="horizontal"
            />
          ))}
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-[var(--border)]">
          <p className="text-3xl font-bold text-[var(--primary)]">{routes.length}</p>
          <p className="text-sm text-[var(--text-muted)]">Total Routes</p>
        </div>
        <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-[var(--border)]">
          <p className="text-3xl font-bold text-emerald-500">
            {Math.max(...routes.map((r) => r.successRate || 0))}%
          </p>
          <p className="text-sm text-[var(--text-muted)]">Best Success Rate</p>
        </div>
        <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-[var(--border)]">
          <p className="text-3xl font-bold text-[var(--secondary)]">
            {Math.min(...routes.map((r) => r.durationDays))}-{Math.max(...routes.map((r) => r.durationDays))}
          </p>
          <p className="text-sm text-[var(--text-muted)]">Days Range</p>
        </div>
        <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-[var(--border)]">
          <p className="text-3xl font-bold text-purple-500">5,895m</p>
          <p className="text-sm text-[var(--text-muted)]">Summit Altitude</p>
        </div>
      </div>
    </div>
  );
}
