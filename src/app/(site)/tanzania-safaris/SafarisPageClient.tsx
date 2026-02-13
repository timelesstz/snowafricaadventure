"use client";

import { useState, useMemo } from "react";
import { SafariCardEnhanced } from "@/components/cards/SafariCardEnhanced";
import { SafariFilters } from "@/components/filters/SafariFilters";
import { LayoutGrid, List } from "lucide-react";
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

export function SafarisPageClient({ safaris, types }: SafarisPageClientProps) {
  const [selectedType, setSelectedType] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredSafaris = useMemo(() => {
    return safaris.filter((safari) => {
      // Type filter
      if (selectedType && safari.type !== selectedType) return false;

      // Duration filter
      if (selectedDuration) {
        const days = safari.durationDays;
        switch (selectedDuration) {
          case "1-3":
            if (days < 1 || days > 3) return false;
            break;
          case "4-6":
            if (days < 4 || days > 6) return false;
            break;
          case "7-10":
            if (days < 7 || days > 10) return false;
            break;
          case "10+":
            if (days <= 10) return false;
            break;
        }
      }

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          safari.title.toLowerCase().includes(query) ||
          safari.overview.toLowerCase().includes(query) ||
          safari.destinations.some((d) => d.toLowerCase().includes(query))
        );
      }

      return true;
    });
  }, [safaris, selectedType, selectedDuration, searchQuery]);

  const clearFilters = () => {
    setSelectedType("");
    setSelectedDuration("");
    setSearchQuery("");
  };

  // Get featured safari (first one that matches filters, or first overall)
  const featuredSafari = filteredSafaris[0];
  const remainingSafaris = filteredSafaris.slice(1);

  return (
    <div className="space-y-8">
      {/* Filters */}
      <SafariFilters
        types={types}
        durations={[]}
        selectedType={selectedType}
        selectedDuration={selectedDuration}
        searchQuery={searchQuery}
        onTypeChange={setSelectedType}
        onDurationChange={setSelectedDuration}
        onSearchChange={setSearchQuery}
        onClearFilters={clearFilters}
        totalResults={filteredSafaris.length}
      />

      {/* View Toggle */}
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-2xl font-bold">
          {selectedType || "All"} Safari Packages
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
      {filteredSafaris.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl">
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
          {/* Featured Safari */}
          {featuredSafari && (
            <SafariCardEnhanced
              {...featuredSafari}
              variant="featured"
              className="hidden md:block"
            />
          )}

          {/* Safari Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* On mobile, show featured in grid too */}
            {featuredSafari && (
              <SafariCardEnhanced
                {...featuredSafari}
                variant="default"
                className="md:hidden"
              />
            )}
            {remainingSafaris.map((safari) => (
              <SafariCardEnhanced
                key={safari.slug}
                {...safari}
                variant="default"
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredSafaris.map((safari) => (
            <SafariCardEnhanced
              key={safari.slug}
              {...safari}
              variant="horizontal"
            />
          ))}
        </div>
      )}
    </div>
  );
}
