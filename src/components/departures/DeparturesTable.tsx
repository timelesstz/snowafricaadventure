"use client";

import { useState, useCallback } from "react";
import { format } from "date-fns";
import { AvailabilityBadge, SocialProofBadge } from "@/components/ui/Badge";
import { ShareButton } from "@/components/social/ShareButtons";
import { InviteFriendsModal } from "@/components/forms/InviteFriendsModal";
import { formatPrice } from "@/lib/utils";
import { type DepartureShareData } from "@/lib/share";

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

interface DeparturesTableProps {
  departures: Departure[];
  year: number;
}

export function DeparturesTable({ departures, year }: DeparturesTableProps) {
  const [selectedRoute, setSelectedRoute] = useState<string>("all");
  const [inviteModalDeparture, setInviteModalDeparture] = useState<DepartureShareData | null>(null);

  const scrollToBookingForm = useCallback((departureId: string) => {
    const bookingForm = document.getElementById("booking-form");
    if (bookingForm) {
      bookingForm.scrollIntoView({ behavior: "smooth" });
      // Update URL with departure ID for reference (without reloading)
      const url = new URL(window.location.href);
      url.searchParams.set("departure", departureId);
      window.history.replaceState({}, "", url.toString());
    }
  }, []);

  const routes = Array.from(
    new Set(departures.map((d) => d.route.slug))
  ).map((slug) => {
    const dep = departures.find((d) => d.route.slug === slug);
    return { slug, name: dep?.route.name || slug };
  });

  const filteredDepartures = departures.filter(
    (d) => selectedRoute === "all" || d.route.slug === selectedRoute
  );

  const departureToShareData = (dep: Departure): DepartureShareData => ({
    id: dep.id,
    routeName: dep.route.name,
    arrivalDate: dep.arrivalDate,
    endDate: dep.endDate,
    price: dep.price,
    availableSpots: dep.availableSpots,
    isFullMoon: dep.isFullMoon,
  });

  return (
    <div>
      {/* Filter */}
      <div className="mb-6">
        <label htmlFor="route-filter" className="block text-sm font-medium text-[var(--text-muted)] mb-2">
          Filter by Route
        </label>
        <select
          id="route-filter"
          value={selectedRoute}
          onChange={(e) => setSelectedRoute(e.target.value)}
          className="px-4 py-2 border border-[var(--border)] rounded-md focus:ring-2 focus:ring-[var(--primary)]"
        >
          <option value="all">All Routes</option>
          {routes.map((route) => (
            <option key={route.slug} value={route.slug}>
              {route.name}
            </option>
          ))}
        </select>
      </div>

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
                        onClick={() => scrollToBookingForm(dep.id)}
                        className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--foreground)] px-4 py-2 rounded font-medium text-sm transition-colors cursor-pointer"
                      >
                        JOIN NOW
                      </button>
                    ) : (
                      <span className="text-[var(--text-light)] text-sm">Sold Out</span>
                    )}
                    <ShareButton
                      departure={departureToShareData(dep)}
                      onInviteClick={() => setInviteModalDeparture(departureToShareData(dep))}
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
                  <span className="text-xs text-[var(--secondary-dark)]">Full Moon Summit</span>
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
                    onClick={() => scrollToBookingForm(dep.id)}
                    className="bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--foreground)] px-4 py-2 rounded font-medium text-sm transition-colors cursor-pointer"
                  >
                    JOIN NOW
                  </button>
                ) : (
                  <span className="text-[var(--text-light)]">Sold Out</span>
                )}
                <ShareButton
                  departure={departureToShareData(dep)}
                  onInviteClick={() => setInviteModalDeparture(departureToShareData(dep))}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDepartures.length === 0 && (
        <div className="text-center py-12 text-[var(--text-light)]">
          No departures found for the selected route.
        </div>
      )}

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
