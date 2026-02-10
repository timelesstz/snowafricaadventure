"use client";

import { useState, useCallback, useMemo } from "react";
import { format } from "date-fns";
import { AvailabilityBadge, SocialProofBadge } from "@/components/ui/Badge";
import { ShareButton } from "@/components/social/ShareButtons";
import { InviteFriendsModal } from "@/components/forms/InviteFriendsModal";
import { formatPrice } from "@/lib/utils";
import { type DepartureShareData } from "@/lib/share";
import {
  Filter,
  X,
  ChevronDown,
  Moon,
  Mountain,
  CalendarDays,
  Users,
  RotateCcw,
} from "lucide-react";

interface Departure {
  id: string;
  route: { name: string; slug: string };
  arrivalDate: string;
  endDate: string;
  price: number;
  maxParticipants: number;
  bookedSpots: number;
  availableSpots: number;
  isFullMoon: boolean;
  status: string;
}

export type { Departure };

interface DeparturesTableProps {
  departures: Departure[];
  year: number;
  onSelectDeparture?: (departure: Departure) => void;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function DeparturesTable({ departures, year, onSelectDeparture }: DeparturesTableProps) {
  // Filter state
  const [selectedRoutes, setSelectedRoutes] = useState<Set<string>>(new Set());
  const [selectedMonths, setSelectedMonths] = useState<Set<number>>(new Set());
  const [fullMoonOnly, setFullMoonOnly] = useState(false);
  const [availabilityFilter, setAvailabilityFilter] = useState<"all" | "available" | "limited">("all");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Invite modal state
  const [inviteModalDeparture, setInviteModalDeparture] = useState<DepartureShareData | null>(null);

  // Extract unique routes
  const routes = useMemo(() => {
    const map = new Map<string, string>();
    departures.forEach((d) => map.set(d.route.slug, d.route.name));
    return Array.from(map.entries()).map(([slug, name]) => ({ slug, name }));
  }, [departures]);

  // Extract unique months that have departures
  const availableMonths = useMemo(() => {
    const months = new Set<number>();
    departures.forEach((d) => {
      months.add(new Date(d.arrivalDate).getMonth());
    });
    return Array.from(months).sort((a, b) => a - b);
  }, [departures]);

  // Count departures per route for filter labels
  const routeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    departures.forEach((d) => {
      counts[d.route.slug] = (counts[d.route.slug] || 0) + 1;
    });
    return counts;
  }, [departures]);

  // Count departures per month for filter labels
  const monthCounts = useMemo(() => {
    const counts: Record<number, number> = {};
    departures.forEach((d) => {
      const m = new Date(d.arrivalDate).getMonth();
      counts[m] = (counts[m] || 0) + 1;
    });
    return counts;
  }, [departures]);

  // Apply filters
  const filteredDepartures = useMemo(() => {
    return departures.filter((d) => {
      if (selectedRoutes.size > 0 && !selectedRoutes.has(d.route.slug)) return false;
      if (selectedMonths.size > 0) {
        const month = new Date(d.arrivalDate).getMonth();
        if (!selectedMonths.has(month)) return false;
      }
      if (fullMoonOnly && !d.isFullMoon) return false;
      if (availabilityFilter === "available" && d.availableSpots <= 0) return false;
      if (availabilityFilter === "limited" && d.availableSpots > 3) return false;
      return true;
    });
  }, [departures, selectedRoutes, selectedMonths, fullMoonOnly, availabilityFilter]);

  // Active filter count
  const activeFilterCount =
    (selectedRoutes.size > 0 ? 1 : 0) +
    (selectedMonths.size > 0 ? 1 : 0) +
    (fullMoonOnly ? 1 : 0) +
    (availabilityFilter !== "all" ? 1 : 0);

  const clearAllFilters = () => {
    setSelectedRoutes(new Set());
    setSelectedMonths(new Set());
    setFullMoonOnly(false);
    setAvailabilityFilter("all");
  };

  const toggleRoute = (slug: string) => {
    setSelectedRoutes((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  const toggleMonth = (month: number) => {
    setSelectedMonths((prev) => {
      const next = new Set(prev);
      if (next.has(month)) next.delete(month);
      else next.add(month);
      return next;
    });
  };

  const scrollToBookingForm = useCallback((departureId: string) => {
    const bookingForm = document.getElementById("booking-form");
    if (bookingForm) {
      bookingForm.scrollIntoView({ behavior: "smooth" });
      const url = new URL(window.location.href);
      url.searchParams.set("departure", departureId);
      window.history.replaceState({}, "", url.toString());
    }
  }, []);

  const departureToShareData = (dep: Departure): DepartureShareData => ({
    id: dep.id,
    routeName: dep.route.name,
    arrivalDate: dep.arrivalDate,
    endDate: dep.endDate,
    price: dep.price,
    availableSpots: dep.availableSpots,
    isFullMoon: dep.isFullMoon,
  });

  // ---------- Filter Sidebar Content ----------
  const filterContent = (
    <div className="space-y-6">
      {/* Header with reset */}
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-base font-bold text-[var(--text)] flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filters
        </h3>
        {activeFilterCount > 0 && (
          <button
            type="button"
            onClick={clearAllFilters}
            className="inline-flex items-center gap-1 text-xs text-[var(--secondary)] hover:text-[var(--secondary-dark)] font-medium transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Reset all
          </button>
        )}
      </div>

      {/* Route Filter */}
      <div>
        <h4 className="text-sm font-semibold text-[var(--text)] mb-3 flex items-center gap-2">
          <Mountain className="w-3.5 h-3.5 text-[var(--secondary)]" />
          Route
        </h4>
        <div className="space-y-2">
          {routes.map((route) => (
            <label
              key={route.slug}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedRoutes.has(route.slug)}
                onChange={() => toggleRoute(route.slug)}
                className="w-4 h-4 rounded border-[var(--border)] text-[var(--secondary)] focus:ring-[var(--secondary)] accent-[var(--secondary)]"
              />
              <span className="text-sm text-[var(--text-muted)] group-hover:text-[var(--text)] transition-colors flex-1">
                {route.name}
              </span>
              <span className="text-xs text-[var(--text-light)] bg-[var(--surface)] px-1.5 py-0.5 rounded">
                {routeCounts[route.slug] || 0}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Month Filter */}
      <div>
        <h4 className="text-sm font-semibold text-[var(--text)] mb-3 flex items-center gap-2">
          <CalendarDays className="w-3.5 h-3.5 text-[var(--secondary)]" />
          Month
        </h4>
        <div className="flex flex-wrap gap-2">
          {availableMonths.map((month) => {
            const isSelected = selectedMonths.has(month);
            return (
              <button
                type="button"
                key={month}
                onClick={() => toggleMonth(month)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isSelected
                    ? "bg-[var(--secondary)] text-white shadow-sm"
                    : "bg-[var(--surface)] text-[var(--text-muted)] hover:bg-[var(--border)] hover:text-[var(--text)]"
                }`}
              >
                {MONTH_NAMES[month].slice(0, 3)}
                <span className="ml-1 opacity-70">{monthCounts[month]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Full Moon Filter */}
      <div>
        <h4 className="text-sm font-semibold text-[var(--text)] mb-3 flex items-center gap-2">
          <Moon className="w-3.5 h-3.5 text-[var(--secondary)]" />
          Special
        </h4>
        <label className="flex items-center gap-3 cursor-pointer group">
          <button
            type="button"
            role="switch"
            aria-checked={fullMoonOnly ? "true" : "false"}
            onClick={() => setFullMoonOnly(!fullMoonOnly)}
            className={`relative w-10 h-5 rounded-full transition-colors ${
              fullMoonOnly ? "bg-[var(--secondary)]" : "bg-[var(--border)]"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${
                fullMoonOnly ? "translate-x-5" : ""
              }`}
            />
          </button>
          <span className="text-sm text-[var(--text-muted)] group-hover:text-[var(--text)] transition-colors">
            Full Moon climbs only
          </span>
        </label>
      </div>

      {/* Availability Filter */}
      <div>
        <h4 className="text-sm font-semibold text-[var(--text)] mb-3 flex items-center gap-2">
          <Users className="w-3.5 h-3.5 text-[var(--secondary)]" />
          Availability
        </h4>
        <div className="space-y-2">
          {([
            { value: "all", label: "All departures" },
            { value: "available", label: "Available spots only" },
            { value: "limited", label: "Last few spots (≤3)" },
          ] as const).map((opt) => (
            <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="radio"
                name="availability"
                checked={availabilityFilter === opt.value}
                onChange={() => setAvailabilityFilter(opt.value)}
                className="w-4 h-4 border-[var(--border)] text-[var(--secondary)] focus:ring-[var(--secondary)] accent-[var(--secondary)]"
              />
              <span className="text-sm text-[var(--text-muted)] group-hover:text-[var(--text)] transition-colors">
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="pt-4 border-t border-[var(--border)]">
        <p className="text-sm text-[var(--text-muted)]">
          Showing{" "}
          <span className="font-semibold text-[var(--text)]">
            {filteredDepartures.length}
          </span>{" "}
          of {departures.length} departures
        </p>
      </div>
    </div>
  );

  return (
    <div>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <button
          type="button"
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white border border-[var(--border)] rounded-lg shadow-sm"
        >
          <span className="flex items-center gap-2 font-medium text-[var(--text)]">
            <Filter className="w-4 h-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-[var(--secondary)] rounded-full">
                {activeFilterCount}
              </span>
            )}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-[var(--text-muted)] transition-transform ${
              mobileFiltersOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Mobile Filter Panel */}
        {mobileFiltersOpen && (
          <div className="mt-2 p-4 bg-white border border-[var(--border)] rounded-lg shadow-sm">
            {filterContent}
            <div className="mt-4 pt-4 border-t border-[var(--border)]">
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full py-2.5 bg-[var(--secondary)] text-white rounded-lg font-medium text-sm hover:bg-[var(--secondary-dark)] transition-colors"
              >
                Show {filteredDepartures.length} departures
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Desktop: Sidebar + Table layout */}
      <div className="flex gap-8">
        {/* Sticky Sidebar - Desktop only */}
        <aside className="hidden lg:block w-[260px] shrink-0">
          <div className="sticky top-24 bg-white border border-[var(--border)] rounded-xl p-5 shadow-sm max-h-[calc(100vh-120px)] overflow-y-auto">
            {filterContent}
          </div>
        </aside>

        {/* Departure List */}
        <div className="flex-1 min-w-0">
          {/* Active filter pills */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {selectedRoutes.size > 0 &&
                Array.from(selectedRoutes).map((slug) => {
                  const route = routes.find((r) => r.slug === slug);
                  return (
                    <span
                      key={slug}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-[var(--secondary)]/10 text-[var(--secondary-dark)] rounded-full text-xs font-medium"
                    >
                      {route?.name}
                      <button type="button" onClick={() => toggleRoute(slug)} className="hover:text-red-500" aria-label={`Remove ${route?.name} filter`}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  );
                })}
              {selectedMonths.size > 0 &&
                Array.from(selectedMonths).map((month) => (
                  <span
                    key={month}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-[var(--secondary)]/10 text-[var(--secondary-dark)] rounded-full text-xs font-medium"
                  >
                    {MONTH_NAMES[month]}
                    <button type="button" onClick={() => toggleMonth(month)} className="hover:text-red-500" aria-label={`Remove ${MONTH_NAMES[month]} filter`}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              {fullMoonOnly && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[var(--secondary)]/10 text-[var(--secondary-dark)] rounded-full text-xs font-medium">
                  {String.fromCodePoint(0x1F315)} Full Moon
                  <button type="button" onClick={() => setFullMoonOnly(false)} className="hover:text-red-500" aria-label="Remove Full Moon filter">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {availabilityFilter !== "all" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[var(--secondary)]/10 text-[var(--secondary-dark)] rounded-full text-xs font-medium">
                  {availabilityFilter === "available" ? "Available only" : "Last few spots"}
                  <button
                    type="button"
                    onClick={() => setAvailabilityFilter("all")}
                    className="hover:text-red-500"
                    aria-label="Remove availability filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              <button
                type="button"
                onClick={clearAllFilters}
                className="text-xs text-[var(--text-light)] hover:text-[var(--text-muted)] underline ml-1"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[var(--primary-dark)] text-white">
                  <th className="text-left p-4 font-semibold">Route</th>
                  <th className="text-left p-4 font-semibold">Arrival Date</th>
                  <th className="text-left p-4 font-semibold">End Date</th>
                  <th className="text-left p-4 font-semibold">Price (USD)</th>
                  <th className="text-left p-4 font-semibold">Availability</th>
                  <th className="text-left p-4 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredDepartures.map((dep, index) => (
                  <tr
                    key={dep.id}
                    className={`border-b hover:bg-[var(--surface)] ${
                      index % 2 === 0 ? "bg-white" : "bg-[var(--surface)]"
                    }`}
                  >
                    <td className="p-4">
                      <div className="font-medium">
                        {dep.isFullMoon && (
                          <span className="mr-1" title="Full Moon Climb">
                            {String.fromCodePoint(0x1F315)}
                          </span>
                        )}
                        {dep.route.name}
                      </div>
                      {dep.isFullMoon && (
                        <span className="text-xs text-[var(--secondary-dark)]">
                          Full Moon Summit
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      {format(new Date(dep.arrivalDate), "MMM d, yyyy")}
                    </td>
                    <td className="p-4">
                      {format(new Date(dep.endDate), "MMM d, yyyy")}
                    </td>
                    <td className="p-4 font-semibold text-[var(--primary-dark)]">
                      {formatPrice(dep.price)}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <AvailabilityBadge
                          available={dep.availableSpots}
                          total={dep.maxParticipants}
                        />
                        <SocialProofBadge
                          bookedSpots={dep.bookedSpots}
                          availableSpots={dep.availableSpots}
                        />
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {dep.availableSpots > 0 ? (
                          <button
                            type="button"
                            onClick={() => onSelectDeparture ? onSelectDeparture(dep) : scrollToBookingForm(dep.id)}
                            className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--foreground)] px-4 py-2 rounded font-medium text-sm transition-colors cursor-pointer"
                          >
                            JOIN NOW
                          </button>
                        ) : (
                          <span className="text-[var(--text-light)] text-sm">Sold Out</span>
                        )}
                        <ShareButton
                          departure={departureToShareData(dep)}
                          onInviteClick={() =>
                            setInviteModalDeparture(departureToShareData(dep))
                          }
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {filteredDepartures.map((dep) => (
              <div
                key={dep.id}
                className="bg-white border border-[var(--border)] rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold">
                      {dep.isFullMoon && (
                        <span className="mr-1">{String.fromCodePoint(0x1F315)}</span>
                      )}
                      {dep.route.name}
                    </h3>
                    {dep.isFullMoon && (
                      <span className="text-xs text-[var(--secondary-dark)]">
                        Full Moon Summit
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <AvailabilityBadge
                      available={dep.availableSpots}
                      total={dep.maxParticipants}
                    />
                    <SocialProofBadge
                      bookedSpots={dep.bookedSpots}
                      availableSpots={dep.availableSpots}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm text-[var(--text-muted)] mb-4">
                  <div>
                    <span className="text-[var(--text-light)]">Arrival:</span>{" "}
                    {format(new Date(dep.arrivalDate), "MMM d, yyyy")}
                  </div>
                  <div>
                    <span className="text-[var(--text-light)]">End:</span>{" "}
                    {format(new Date(dep.endDate), "MMM d, yyyy")}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-[var(--primary-dark)]">
                    {formatPrice(dep.price)}
                  </span>
                  <div className="flex items-center gap-2">
                    {dep.availableSpots > 0 ? (
                      <button
                        type="button"
                        onClick={() => onSelectDeparture ? onSelectDeparture(dep) : scrollToBookingForm(dep.id)}
                        className="bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--foreground)] px-4 py-2 rounded font-medium text-sm transition-colors cursor-pointer"
                      >
                        JOIN NOW
                      </button>
                    ) : (
                      <span className="text-[var(--text-light)]">Sold Out</span>
                    )}
                    <ShareButton
                      departure={departureToShareData(dep)}
                      onInviteClick={() =>
                        setInviteModalDeparture(departureToShareData(dep))
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredDepartures.length === 0 && (
            <div className="text-center py-16 bg-white border border-[var(--border)] rounded-lg">
              <CalendarDays className="w-12 h-12 text-[var(--text-light)] mx-auto mb-3" />
              <p className="text-[var(--text-muted)] font-medium mb-2">
                No departures match your filters
              </p>
              <p className="text-sm text-[var(--text-light)] mb-4">
                Try adjusting your filters to see more results
              </p>
              <button
                type="button"
                onClick={clearAllFilters}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--secondary)] text-white rounded-lg text-sm font-medium hover:bg-[var(--secondary-dark)] transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Invite Friends Modal */}
      {inviteModalDeparture && (
        <InviteFriendsModal
          isOpen={!!inviteModalDeparture}
          onClose={() => setInviteModalDeparture(null)}
          departure={inviteModalDeparture}
        />
      )}
    </div>
  );
}
