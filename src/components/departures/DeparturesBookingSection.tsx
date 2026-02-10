"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { DeparturesTable, type Departure } from "./DeparturesTable";
import { GroupBookingForm } from "@/components/forms/GroupBookingForm";

interface DeparturesBookingSectionProps {
  departures: Departure[];
  year: number;
}

export function DeparturesBookingSection({
  departures,
  year,
}: DeparturesBookingSectionProps) {
  const searchParams = useSearchParams();
  const [selectedDeparture, setSelectedDeparture] = useState<Departure | null>(null);
  const bookingFormRef = useRef<HTMLDivElement>(null);
  const hasAutoSelected = useRef(false);

  // Auto-select departure from URL param on mount
  useEffect(() => {
    if (hasAutoSelected.current) return;
    const departureId = searchParams.get("departure");
    if (departureId) {
      const found = departures.find((d) => d.id === departureId);
      if (found) {
        setSelectedDeparture(found);
        hasAutoSelected.current = true;
        // Scroll to form after a brief delay for render
        setTimeout(() => {
          bookingFormRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    }
  }, [searchParams, departures]);

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
      {/* Departures Table */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold mb-8">
            {year} Departures
          </h2>
          <DeparturesTable
            departures={departures}
            year={year}
            onSelectDeparture={handleSelectDeparture}
          />
        </div>
      </section>

      {/* Booking Form */}
      <section id="booking-form" ref={bookingFormRef} className="py-12 bg-[var(--muted)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-center mb-8">
              Book Your Spot
            </h2>
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
              <GroupBookingForm
                departure={selectedDeparture}
                onClearDeparture={handleClearDeparture}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
