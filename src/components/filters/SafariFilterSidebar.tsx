"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const DURATION_OPTIONS = [
  { value: "1-3", label: "1–3 Days" },
  { value: "4-6", label: "4–6 Days" },
  { value: "7-10", label: "7–10 Days" },
  { value: "10+", label: "10+ Days" },
] as const;

export const PRICE_OPTIONS = [
  { value: "0-1500", label: "Under $1,500" },
  { value: "1500-2500", label: "$1,500 – $2,500" },
  { value: "2500-3500", label: "$2,500 – $3,500" },
  { value: "3500+", label: "$3,500 and above" },
] as const;

/**
 * Filter predicates live next to the options they belong to so the sidebar
 * labels and the list filtering can never drift apart.
 */
export function matchesDuration(days: number, value: string): boolean {
  if (!value) return true;
  switch (value) {
    case "1-3":
      return days >= 1 && days <= 3;
    case "4-6":
      return days >= 4 && days <= 6;
    case "7-10":
      return days >= 7 && days <= 10;
    case "10+":
      return days > 10;
    default:
      return true;
  }
}

export function matchesPrice(price: number | null, value: string): boolean {
  if (!value) return true;
  // A package with no published price can't satisfy an explicit price band.
  if (price == null) return false;
  switch (value) {
    case "0-1500":
      return price < 1500;
    case "1500-2500":
      return price >= 1500 && price < 2500;
    case "2500-3500":
      return price >= 2500 && price < 3500;
    case "3500+":
      return price >= 3500;
    default:
      return true;
  }
}

interface FacetSafari {
  type: string;
  durationDays: number;
  priceFrom: number | null;
}

interface SafariFilterSidebarProps {
  /** Full unfiltered set — used only to show how many packages each option has. */
  safaris: FacetSafari[];
  types: string[];
  selectedType: string;
  selectedDuration: string;
  selectedPrice: string;
  searchQuery: string;
  onTypeChange: (value: string) => void;
  onDurationChange: (value: string) => void;
  onPriceChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  onClearFilters: () => void;
  totalResults: number;
  className?: string;
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-[var(--border)] px-5 py-5">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-3">
        {title}
      </h3>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function FilterOption({
  label,
  count,
  selected,
  onSelect,
}: {
  label: string;
  count?: number;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "w-full flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm text-left transition-colors",
        selected
          ? "bg-[var(--primary)]/10 text-[var(--primary)] font-semibold"
          : "text-[var(--text)] hover:bg-[var(--surface)]"
      )}
    >
      <span className="flex items-center gap-2 min-w-0">
        <span
          className={cn(
            "w-4 h-4 rounded border flex items-center justify-center shrink-0",
            selected
              ? "bg-[var(--primary)] border-[var(--primary)]"
              : "border-[var(--border)]"
          )}
        >
          {selected && <Check className="w-3 h-3 text-white" />}
        </span>
        <span className="truncate">{label}</span>
      </span>
      {count !== undefined && (
        <span className="text-xs text-[var(--text-muted)] shrink-0">{count}</span>
      )}
    </button>
  );
}

export function SafariFilterSidebar({
  safaris,
  types,
  selectedType,
  selectedDuration,
  selectedPrice,
  searchQuery,
  onTypeChange,
  onDurationChange,
  onPriceChange,
  onSearchChange,
  onClearFilters,
  totalResults,
  className,
}: SafariFilterSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeCount =
    (selectedType ? 1 : 0) +
    (selectedDuration ? 1 : 0) +
    (selectedPrice ? 1 : 0) +
    (searchQuery ? 1 : 0);

  const typeCount = (type: string) =>
    safaris.filter((s) => s.type === type).length;
  const durationCount = (value: string) =>
    safaris.filter((s) => matchesDuration(s.durationDays, value)).length;
  const priceCount = (value: string) =>
    safaris.filter((s) => matchesPrice(s.priceFrom, value)).length;

  return (
    <div className={className}>
      {/* Mobile toggle — the panel is always visible from lg up */}
      <button
        type="button"
        onClick={() => setMobileOpen((v) => !v)}
        aria-expanded={mobileOpen}
        className="lg:hidden w-full flex items-center justify-between gap-2 px-4 py-3 bg-white border border-[var(--border)] rounded-xl font-medium shadow-sm"
      >
        <span className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {activeCount > 0 && (
            <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-[var(--primary)] text-white text-xs font-bold">
              {activeCount}
            </span>
          )}
        </span>
        <span className="text-sm text-[var(--text-muted)]">
          {totalResults} {totalResults === 1 ? "safari" : "safaris"}
        </span>
      </button>

      <aside
        className={cn(
          "mt-3 lg:mt-0 bg-white rounded-2xl border border-[var(--border)] shadow-sm overflow-hidden",
          mobileOpen ? "block" : "hidden lg:block"
        )}
      >
        {/* Header */}
        <div className="px-5 py-4 flex items-center justify-between gap-2">
          <h2 className="font-heading text-lg font-bold">Filter Safaris</h2>
          {activeCount > 0 && (
            <button
              type="button"
              onClick={onClearFilters}
              className="text-sm text-[var(--text-muted)] hover:text-[var(--primary)] underline underline-offset-2"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Search */}
        <div className="px-5 pb-5">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search safaris..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              aria-label="Search safari packages"
              className="w-full pl-9 pr-9 py-2.5 text-sm bg-[var(--surface)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text)]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <FilterGroup title="Safari Type">
          <FilterOption
            label="All types"
            count={safaris.length}
            selected={!selectedType}
            onSelect={() => onTypeChange("")}
          />
          {types.map((type) => (
            <FilterOption
              key={type}
              label={type}
              count={typeCount(type)}
              selected={selectedType === type}
              onSelect={() => onTypeChange(type === selectedType ? "" : type)}
            />
          ))}
        </FilterGroup>

        <FilterGroup title="Duration">
          <FilterOption
            label="Any duration"
            count={safaris.length}
            selected={!selectedDuration}
            onSelect={() => onDurationChange("")}
          />
          {DURATION_OPTIONS.map((opt) => (
            <FilterOption
              key={opt.value}
              label={opt.label}
              count={durationCount(opt.value)}
              selected={selectedDuration === opt.value}
              onSelect={() =>
                onDurationChange(opt.value === selectedDuration ? "" : opt.value)
              }
            />
          ))}
        </FilterGroup>

        <FilterGroup title="Price per person">
          <FilterOption
            label="Any price"
            count={safaris.length}
            selected={!selectedPrice}
            onSelect={() => onPriceChange("")}
          />
          {PRICE_OPTIONS.map((opt) => (
            <FilterOption
              key={opt.value}
              label={opt.label}
              count={priceCount(opt.value)}
              selected={selectedPrice === opt.value}
              onSelect={() =>
                onPriceChange(opt.value === selectedPrice ? "" : opt.value)
              }
            />
          ))}
        </FilterGroup>

        {/* Result count */}
        <div className="border-t border-[var(--border)] px-5 py-4 bg-[var(--surface)]">
          <p className="text-sm text-[var(--text-muted)]">
            <strong className="text-[var(--text)]">{totalResults}</strong>{" "}
            {totalResults === 1 ? "safari" : "safaris"} match your filters
          </p>
        </div>
      </aside>
    </div>
  );
}
