"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { DeparturesTable, type Departure } from "./DeparturesTable";
import { GroupBookingForm } from "@/components/forms/GroupBookingForm";

interface DeparturesBookingSectionProps {
  yearGroups: { year: number; departures: Departure[] }[];
}

export function DeparturesBookingSection({
  yearGroups,
}: DeparturesBookingSectionProps) {
  const departures = yearGroups.flatMap((g) => g.departures);
  const searchParams = useSearchParams();
  const bookingFormRef = useRef<HTMLDivElement>(null);

  // Auto-select the departure named in ?departure= on first render via a lazy
  // initializer (departures are server-provided props, present immediately).
  const [selectedDeparture, setSelectedDeparture] = useState<Departure | null>(
    () => {
      const id = searchParams.get("departure");
      if (!id) return null;
      return departures.find((d) => d.id === id) ?? null;
    }
  );

  // Scroll to the form once, only when a departure was auto-selected on mount.
  const shouldAutoScrollRef = useRef(selectedDeparture !== null);
  useEffect(() => {
    if (!shouldAutoScrollRef.current) return;
    shouldAutoScrollRef.current = false;
    const timer = setTimeout(() => {
      bookingFormRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleSelectDeparture = useCallback(
    (departure: Departure) => {
      setSelectedDeparture(departure);

      // Update URL param
      const url = new URL(window.location.href);
      url.searchParams.set("departure", departure.id);
      window.history.replaceState({}, "", url.toString());

      // Smooth scroll to booking form
      setTimeout(() => {
        bookingFormRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    },
    []
  );

  const handleClearDeparture = useCallback(() => {
    setSelectedDeparture(null);
    const url = new URL(window.location.href);
    url.searchParams.delete("departure");
    window.history.replaceState({}, "", url.toString());
  }, []);

  return (
    <>
      {/* Departures Tables — one per year */}
      {yearGroups.map((group) => (
        <section key={group.year} className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-3xl font-bold mb-8">
              {group.year} Departures
            </h2>
            <DeparturesTable
              departures={group.departures}
              year={group.year}
              onSelectDeparture={handleSelectDeparture}
            />
          </div>
        </section>
      ))}

      {/* Booking Form */}
      <section id="booking-form" ref={bookingFormRef} className="py-12 bg-[var(--muted)]">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-center mb-8">
            Book Your Spot
          </h2>
          <GroupBookingForm
            departure={selectedDeparture}
            onClearDeparture={handleClearDeparture}
          />
        </div>
      </section>
    </>
  );
}
