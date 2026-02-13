"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SafariFiltersProps {
  types: string[];
  durations: { min: number; max: number }[];
  selectedType: string;
  selectedDuration: string;
  searchQuery: string;
  onTypeChange: (type: string) => void;
  onDurationChange: (duration: string) => void;
  onSearchChange: (query: string) => void;
  onClearFilters: () => void;
  totalResults: number;
  className?: string;
}

export function SafariFilters({
  types,
  durations,
  selectedType,
  selectedDuration,
  searchQuery,
  onTypeChange,
  onDurationChange,
  onSearchChange,
  onClearFilters,
  totalResults,
  className,
}: SafariFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasActiveFilters = selectedType || selectedDuration || searchQuery;

  const durationLabels: Record<string, string> = {
    "1-3": "1-3 Days",
    "4-6": "4-6 Days",
    "7-10": "7-10 Days",
    "10+": "10+ Days",
  };

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
              placeholder="Search safari packages..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2 lg:gap-3">
            {/* Type Filter */}
            <div className="relative">
              <select
                value={selectedType}
                onChange={(e) => onTypeChange(e.target.value)}
                className="appearance-none pl-4 pr-10 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-xl font-medium text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] cursor-pointer hover:border-[var(--primary)] transition-all"
              >
                <option value="">All Types</option>
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] pointer-events-none" />
            </div>

            {/* Duration Filter */}
            <div className="relative">
              <select
                value={selectedDuration}
                onChange={(e) => onDurationChange(e.target.value)}
                className="appearance-none pl-4 pr-10 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-xl font-medium text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] cursor-pointer hover:border-[var(--primary)] transition-all"
              >
                <option value="">Any Duration</option>
                {Object.entries(durationLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] pointer-events-none" />
            </div>

            {/* More Filters Toggle (mobile) */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="lg:hidden flex items-center gap-2 px-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-xl font-medium text-[var(--text)] hover:border-[var(--primary)] transition-all"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>

        {/* Active Filters & Results Count */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            {hasActiveFilters && (
              <>
                {selectedType && (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-sm font-medium">
                    {selectedType}
                    <button onClick={() => onTypeChange("")} className="hover:text-[var(--primary-dark)]">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}
                {selectedDuration && (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-sm font-medium">
                    {durationLabels[selectedDuration]}
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
            <strong className="text-[var(--text)]">{totalResults}</strong> {totalResults === 1 ? "safari" : "safaris"} found
          </span>
        </div>
      </div>

      {/* Type Pills */}
      <div className="px-4 md:px-6 pb-4 md:pb-6 border-t border-[var(--border)] pt-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onTypeChange("")}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all",
              !selectedType
                ? "bg-[var(--primary)] text-white shadow-lg"
                : "bg-[var(--surface)] text-[var(--text)] hover:bg-[var(--muted)]"
            )}
          >
            All Safaris
          </button>
          {types.map((type) => (
            <button
              key={type}
              onClick={() => onTypeChange(type === selectedType ? "" : type)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                selectedType === type
                  ? type === "Luxury"
                    ? "bg-amber-500 text-white shadow-lg"
                    : type === "Budget"
                    ? "bg-blue-500 text-white shadow-lg"
                    : "bg-emerald-500 text-white shadow-lg"
                  : "bg-[var(--surface)] text-[var(--text)] hover:bg-[var(--muted)]"
              )}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
