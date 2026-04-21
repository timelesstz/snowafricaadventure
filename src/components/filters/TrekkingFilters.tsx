"use client";

import { Search, X, ChevronDown, SlidersHorizontal } from "lucide-react";
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
  variant?: "bar" | "sidebar";
}

const difficultyColors: Record<string, { bg: string; text: string; activeBg: string }> = {
  Easy: { bg: "bg-emerald-100", text: "text-emerald-700", activeBg: "bg-emerald-500" },
  Moderate: { bg: "bg-blue-100", text: "text-blue-700", activeBg: "bg-blue-500" },
  Challenging: { bg: "bg-amber-100", text: "text-amber-700", activeBg: "bg-amber-500" },
  Difficult: { bg: "bg-orange-100", text: "text-orange-700", activeBg: "bg-orange-500" },
  Strenuous: { bg: "bg-red-100", text: "text-red-700", activeBg: "bg-red-500" },
};

const DURATION_OPTIONS = [
  { value: "", label: "Any duration" },
  { value: "5-6", label: "5–6 Days" },
  { value: "7-8", label: "7–8 Days" },
  { value: "9+", label: "9+ Days" },
];

const SORT_OPTIONS = [
  { value: "popular", label: "Most Popular" },
  { value: "success", label: "Success Rate" },
  { value: "duration-asc", label: "Shortest First" },
  { value: "duration-desc", label: "Longest First" },
  { value: "difficulty-asc", label: "Easiest First" },
  { value: "difficulty-desc", label: "Hardest First" },
];

export function TrekkingFilters(props: TrekkingFiltersProps) {
  if (props.variant === "sidebar") {
    return <SidebarFilters {...props} />;
  }
  return <BarFilters {...props} />;
}

// ----------------------------------------------------------------------------
// Sidebar layout (desktop = stacked left column, mobile = collapsible accordion)
// ----------------------------------------------------------------------------

function SidebarFilters({
  difficulties,
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
  const activeCount =
    (selectedDifficulty ? 1 : 0) + (selectedDuration ? 1 : 0) + (searchQuery ? 1 : 0);

  const body = (
    <div className="space-y-6">
      <FilterSection label="Search">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="Search routes..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-8 py-2.5 text-sm bg-[var(--surface)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded text-[var(--text-muted)] hover:text-[var(--text)]"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </FilterSection>

      <FilterSection label="Difficulty">
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => onDifficultyChange("")}
            className={cn(
              "flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all text-left",
              !selectedDifficulty
                ? "bg-[var(--primary)] text-white shadow-sm"
                : "bg-[var(--surface)] text-[var(--text)] hover:bg-[var(--border)]/50"
            )}
          >
            All Levels
            {!selectedDifficulty && <span className="text-xs opacity-80">✓</span>}
          </button>
          {difficulties.map((difficulty) => {
            const colors = difficultyColors[difficulty] || difficultyColors.Moderate;
            const isActive = selectedDifficulty === difficulty;
            return (
              <button
                key={difficulty}
                type="button"
                onClick={() => onDifficultyChange(isActive ? "" : difficulty)}
                className={cn(
                  "flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all text-left",
                  isActive
                    ? `${colors.activeBg} text-white shadow-sm`
                    : `${colors.bg} ${colors.text} hover:opacity-80`
                )}
              >
                {difficulty}
                {isActive && <span className="text-xs opacity-80">✓</span>}
              </button>
            );
          })}
        </div>
      </FilterSection>

      <FilterSection label="Duration">
        <div className="flex flex-col gap-2">
          {DURATION_OPTIONS.map((opt) => {
            const isActive = selectedDuration === opt.value;
            return (
              <button
                key={opt.value || "any"}
                type="button"
                onClick={() => onDurationChange(opt.value)}
                className={cn(
                  "flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all text-left",
                  isActive
                    ? "bg-[var(--primary)] text-white shadow-sm"
                    : "bg-[var(--surface)] text-[var(--text)] hover:bg-[var(--border)]/50"
                )}
              >
                {opt.label}
                {isActive && <span className="text-xs opacity-80">✓</span>}
              </button>
            );
          })}
        </div>
      </FilterSection>

      <FilterSection label="Sort by">
        <div className="relative">
          <select
            aria-label="Sort routes"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full appearance-none pl-3 pr-9 py-2.5 text-sm bg-[var(--surface)] border border-[var(--border)] rounded-lg font-medium text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] cursor-pointer hover:border-[var(--primary)] transition-all"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] pointer-events-none" />
        </div>
      </FilterSection>

      <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
        <span className="text-sm text-[var(--text-muted)]">
          <strong className="text-[var(--text)]">{totalResults}</strong>{" "}
          {totalResults === 1 ? "route" : "routes"}
        </span>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={onClearFilters}
            className="text-sm text-[var(--primary)] font-medium hover:underline"
          >
            Clear all
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className={cn("w-full", className)}>
      {/* Mobile: collapsible accordion */}
      <details className="lg:hidden bg-white rounded-2xl border border-[var(--border)] shadow-sm group">
        <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
          <span className="flex items-center gap-2 font-semibold">
            <SlidersHorizontal className="w-4 h-4 text-[var(--primary)]" />
            Filters
            {activeCount > 0 && (
              <span className="ml-1 px-2 py-0.5 rounded-full bg-[var(--primary)] text-white text-xs font-semibold">
                {activeCount}
              </span>
            )}
          </span>
          <ChevronDown className="w-5 h-5 text-[var(--text-muted)] transition-transform group-open:rotate-180" />
        </summary>
        <div className="px-4 pb-5 border-t border-[var(--border)] pt-4">{body}</div>
      </details>

      {/* Desktop: sticky sidebar */}
      <div className="hidden lg:block bg-white rounded-2xl border border-[var(--border)] shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-[var(--border)]">
          <SlidersHorizontal className="w-4 h-4 text-[var(--primary)]" />
          <h3 className="font-semibold">Filters</h3>
          {activeCount > 0 && (
            <span className="ml-auto px-2 py-0.5 rounded-full bg-[var(--primary)] text-white text-xs font-semibold">
              {activeCount} active
            </span>
          )}
        </div>
        {body}
      </div>
    </div>
  );
}

function FilterSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2.5">
        {label}
      </p>
      {children}
    </div>
  );
}

// ----------------------------------------------------------------------------
// Original horizontal bar layout (kept as the default for other callers)
// ----------------------------------------------------------------------------

function BarFilters({
  difficulties,
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
                aria-label="Filter by duration"
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
                aria-label="Sort routes"
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="appearance-none pl-4 pr-10 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-xl font-medium text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] cursor-pointer hover:border-[var(--primary)] transition-all"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
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
                    <button
                      type="button"
                      onClick={() => onDifficultyChange("")}
                      className="hover:opacity-70"
                      aria-label={`Clear ${selectedDifficulty} filter`}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}
                {selectedDuration && (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-sm font-medium">
                    {selectedDuration} Days
                    <button
                      type="button"
                      onClick={() => onDurationChange("")}
                      className="hover:text-[var(--primary-dark)]"
                      aria-label="Clear duration filter"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-sm font-medium">
                    &ldquo;{searchQuery}&rdquo;
                    <button
                      type="button"
                      onClick={() => onSearchChange("")}
                      className="hover:text-[var(--primary-dark)]"
                      aria-label="Clear search query"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}
                <button
                  type="button"
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
            type="button"
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
                type="button"
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
