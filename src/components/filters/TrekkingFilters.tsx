"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, X, ChevronDown, Mountain, Clock, Target } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrekkingFiltersProps {
  difficulties: string[];
  durations: string[];
  selectedDifficulty: string;
  selectedDuration: string;
  searchQuery: string;
  sortBy: string;
  onDifficultyChange: (difficulty: string) => void;
  onDurationChange: (duration: string) => void;
  onSearchChange: (query: string) => void;
  onSortChange: (sort: string) => void;
  onClearFilters: () => void;
  totalResults: number;
  className?: string;
}

const difficultyColors: Record<string, { bg: string; text: string; activeBg: string }> = {
  Easy: { bg: "bg-emerald-100", text: "text-emerald-700", activeBg: "bg-emerald-500" },
  Moderate: { bg: "bg-blue-100", text: "text-blue-700", activeBg: "bg-blue-500" },
  Challenging: { bg: "bg-amber-100", text: "text-amber-700", activeBg: "bg-amber-500" },
  Difficult: { bg: "bg-orange-100", text: "text-orange-700", activeBg: "bg-orange-500" },
  Strenuous: { bg: "bg-red-100", text: "text-red-700", activeBg: "bg-red-500" },
};

export function TrekkingFilters({
  difficulties,
  durations,
  selectedDifficulty,
  selectedDuration,
  searchQuery,
  sortBy,
  onDifficultyChange,
  onDurationChange,
  onSearchChange,
  onSortChange,
  onClearFilters,
  totalResults,
  className,
}: TrekkingFiltersProps) {
  const hasActiveFilters = selectedDifficulty || selectedDuration || searchQuery;

  return (
    <div className={cn("bg-white rounded-2xl shadow-lg border border-[var(--border)] overflow-hidden", className)}>
      {/* Main Filter Bar */}
      <div className="p-4 md:p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search routes..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2 lg:gap-3">
            {/* Duration Filter */}
            <div className="relative">
              <select
                value={selectedDuration}
                onChange={(e) => onDurationChange(e.target.value)}
                className="appearance-none pl-4 pr-10 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-xl font-medium text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] cursor-pointer hover:border-[var(--primary)] transition-all"
              >
                <option value="">Any Duration</option>
                <option value="5-6">5-6 Days</option>
                <option value="7-8">7-8 Days</option>
                <option value="9+">9+ Days</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] pointer-events-none" />
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="appearance-none pl-4 pr-10 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-xl font-medium text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] cursor-pointer hover:border-[var(--primary)] transition-all"
              >
                <option value="popular">Most Popular</option>
                <option value="success">Success Rate</option>
                <option value="duration-asc">Shortest First</option>
                <option value="duration-desc">Longest First</option>
                <option value="difficulty-asc">Easiest First</option>
                <option value="difficulty-desc">Hardest First</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Active Filters & Results Count */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            {hasActiveFilters && (
              <>
                {selectedDifficulty && (
                  <span className={cn(
                    "inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium",
                    difficultyColors[selectedDifficulty]?.bg || "bg-gray-100",
                    difficultyColors[selectedDifficulty]?.text || "text-gray-700"
                  )}>
                    {selectedDifficulty}
                    <button onClick={() => onDifficultyChange("")} className="hover:opacity-70">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}
                {selectedDuration && (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-sm font-medium">
                    {selectedDuration} Days
                    <button onClick={() => onDurationChange("")} className="hover:text-[var(--primary-dark)]">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-sm font-medium">
                    &ldquo;{searchQuery}&rdquo;
                    <button onClick={() => onSearchChange("")} className="hover:text-[var(--primary-dark)]">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}
                <button
                  onClick={onClearFilters}
                  className="text-sm text-[var(--text-muted)] hover:text-[var(--primary)] underline underline-offset-2"
                >
                  Clear all
                </button>
              </>
            )}
          </div>
          <span className="text-sm text-[var(--text-muted)]">
            <strong className="text-[var(--text)]">{totalResults}</strong> {totalResults === 1 ? "route" : "routes"} found
          </span>
        </div>
      </div>

      {/* Difficulty Pills */}
      <div className="px-4 md:px-6 pb-4 md:pb-6 border-t border-[var(--border)] pt-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onDifficultyChange("")}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all",
              !selectedDifficulty
                ? "bg-[var(--primary)] text-white shadow-lg"
                : "bg-[var(--surface)] text-[var(--text)] hover:bg-[var(--muted)]"
            )}
          >
            All Levels
          </button>
          {difficulties.map((difficulty) => {
            const colors = difficultyColors[difficulty] || difficultyColors.Moderate;
            return (
              <button
                key={difficulty}
                onClick={() => onDifficultyChange(difficulty === selectedDifficulty ? "" : difficulty)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  selectedDifficulty === difficulty
                    ? `${colors.activeBg} text-white shadow-lg`
                    : `${colors.bg} ${colors.text} hover:opacity-80`
                )}
              >
                {difficulty}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
