"use client";

import { useState, useMemo, useRef } from "react";
import { SafariCardEnhanced } from "@/components/cards/SafariCardEnhanced";
import {
  SafariFilterSidebar,
  matchesDuration,
  matchesPrice,
} from "@/components/filters/SafariFilterSidebar";
import { Pagination } from "@/components/ui/Pagination";
import { getPageBounds } from "@/lib/pagination";
import { LayoutGrid, List, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Safari {
  slug: string;
  title: string;
  duration: string;
  durationDays: number;
  type: string;
  overview: string;
  priceFrom: number | null;
  featuredImage: string | null;
  gameDrives: number;
  parksCount: number;
  rating: number | null;
  highlights: string[];
  destinations: string[];
}

interface SafarisPageClientProps {
  safaris: Safari[];
  types: string[];
}

/**
 * Page one leads with a featured card and then a full grid, so it holds one
 * more item than the rest. Both cases leave the 3-column grid with a multiple
 * of three — otherwise page one ends on a half-empty orphan row.
 */
const PAGE_SIZE = 9;
const FIRST_PAGE_SIZE = PAGE_SIZE + 1;

const SORT_OPTIONS = [
  { value: "recommended", label: "Recommended" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "duration-asc", label: "Duration: Shortest" },
  { value: "duration-desc", label: "Duration: Longest" },
] as const;

export function SafarisPageClient({ safaris, types }: SafarisPageClientProps) {
  const [selectedType, setSelectedType] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sort, setSort] = useState<string>("recommended");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const resultsRef = useRef<HTMLDivElement>(null);

  const filteredSafaris = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return safaris.filter((safari) => {
      if (selectedType && safari.type !== selectedType) return false;
      if (!matchesDuration(safari.durationDays, selectedDuration)) return false;
      if (!matchesPrice(safari.priceFrom, selectedPrice)) return false;

      if (query) {
        return (
          safari.title.toLowerCase().includes(query) ||
          safari.overview.toLowerCase().includes(query) ||
          safari.destinations.some((d) => d.toLowerCase().includes(query))
        );
      }

      return true;
    });
  }, [safaris, selectedType, selectedDuration, selectedPrice, searchQuery]);

  const sortedSafaris = useMemo(() => {
    const list = [...filteredSafaris];
    switch (sort) {
      case "price-asc":
        return list.sort(
          (a, b) => (a.priceFrom ?? Infinity) - (b.priceFrom ?? Infinity)
        );
      case "price-desc":
        return list.sort(
          (a, b) => (b.priceFrom ?? -Infinity) - (a.priceFrom ?? -Infinity)
        );
      case "duration-asc":
        return list.sort((a, b) => a.durationDays - b.durationDays);
      case "duration-desc":
        return list.sort((a, b) => b.durationDays - a.durationDays);
      default:
        // Server order — durationDays ascending.
        return list;
    }
  }, [filteredSafaris, sort]);

  // Bounds are derived, not stored: if the result set shrinks below the
  // current page, getPageBounds clamps during render rather than needing a
  // corrective setState in an effect.
  const { totalPages, currentPage, startIndex, endIndex } = getPageBounds(
    sortedSafaris.length,
    page,
    PAGE_SIZE,
    FIRST_PAGE_SIZE
  );
  const pageSafaris = sortedSafaris.slice(startIndex, endIndex);

  /** Any filter change invalidates the current page, so reset alongside it. */
  const withPageReset =
    <T,>(setter: (value: T) => void) =>
    (value: T) => {
      setter(value);
      setPage(1);
    };

  const clearFilters = () => {
    setSelectedType("");
    setSelectedDuration("");
    setSelectedPrice("");
    setSearchQuery("");
    setPage(1);
  };

  const goToPage = (next: number) => {
    setPage(next);
    resultsRef.current?.scrollIntoView({ block: "start" });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <SafariFilterSidebar
        className="lg:w-80 lg:shrink-0 lg:sticky lg:top-24 lg:self-start"
        safaris={safaris}
        types={types}
        selectedType={selectedType}
        selectedDuration={selectedDuration}
        selectedPrice={selectedPrice}
        searchQuery={searchQuery}
        onTypeChange={withPageReset(setSelectedType)}
        onDurationChange={withPageReset(setSelectedDuration)}
        onPriceChange={withPageReset(setSelectedPrice)}
        onSearchChange={withPageReset(setSearchQuery)}
        onClearFilters={clearFilters}
        totalResults={sortedSafaris.length}
      />

      {/* Results */}
      <div ref={resultsRef} className="flex-1 min-w-0 scroll-mt-24">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="font-heading text-2xl font-bold">
              {selectedType || "All"} Safari Packages
            </h2>
            {sortedSafaris.length > 0 && (
              <p className="text-sm text-[var(--text-muted)] mt-1">
                Showing {startIndex + 1}–
                {Math.min(endIndex, sortedSafaris.length)} of{" "}
                {sortedSafaris.length}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Sort */}
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  setPage(1);
                }}
                aria-label="Sort safari packages"
                className="appearance-none pl-4 pr-10 py-2.5 text-sm bg-white border border-[var(--border)] rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-[var(--primary)] cursor-pointer hover:border-[var(--primary)] transition-all"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] pointer-events-none" />
            </div>

            {/* View toggle */}
            <div className="flex items-center gap-1 bg-white rounded-lg p-1 border border-[var(--border)]">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-2 rounded-md transition-colors",
                  viewMode === "grid"
                    ? "bg-[var(--primary)] text-white"
                    : "text-[var(--text-muted)] hover:text-[var(--text)]"
                )}
                aria-label="Grid view"
                aria-pressed={viewMode === "grid"}
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
                aria-pressed={viewMode === "list"}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {sortedSafaris.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-[var(--border)]">
            <div className="text-6xl mb-4">🦁</div>
            <h3 className="text-xl font-semibold mb-2">No safaris found</h3>
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
            {/* The first result of page one leads as the featured card; every
                other result renders in the grid. No safari is rendered twice. */}
            {currentPage === 1 && (
              <SafariCardEnhanced {...pageSafaris[0]} variant="featured" />
            )}

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {(currentPage === 1 ? pageSafaris.slice(1) : pageSafaris).map(
                (safari) => (
                  <SafariCardEnhanced
                    key={safari.slug}
                    {...safari}
                    variant="default"
                  />
                )
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {pageSafaris.map((safari) => (
              <SafariCardEnhanced
                key={safari.slug}
                {...safari}
                variant="horizontal"
              />
            ))}
          </div>
        )}

        <Pagination
          page={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
          className="mt-10"
        />
      </div>
    </div>
  );
}
