"use client";

import { Fragment, useState, useEffect, useCallback, useRef } from "react";
import { DeparturesTable, type Departure } from "./DeparturesTable";
import { GroupBookingForm } from "@/components/forms/GroupBookingForm";

interface DeparturesBookingSectionProps {
  yearGroups: { year: number; departures: Departure[] }[];
}

/**
 * Server-rendered departure tables plus the booking form.
 *
 * `?departure=<id>` is read from window.location after hydration instead of
 * useSearchParams(): on this ISR page useSearchParams forces a client-side
 * rendering bailout, which left the whole table out of the HTML that search
 * engines and AI crawlers read.
 */
export function DeparturesBookingSection({
  yearGroups,
}: DeparturesBookingSectionProps) {
  const bookingFormRef = useRef<HTMLElement>(null);
  const [selectedDeparture, setSelectedDeparture] = useState<Departure | null>(null);

  const scrollToForm = useCallback((delay: number) => {
    setTimeout(() => {
      bookingFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, delay);
  }, []);

  // Restore a shared ?departure= link once, after hydration.
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("departure");
    if (!id) return;
    const match = yearGroups
      .flatMap((g) => g.departures)
      .find((d) => d.id === id && d.availableSpots > 0);
    if (!match) return;
    const timer = setTimeout(() => {
      setSelectedDeparture(match);
      scrollToForm(300);
    }, 0);
    return () => clearTimeout(timer);
    // Run once on mount: later selections come from the table buttons.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectDeparture = useCallback(
    (departure: Departure) => {
      setSelectedDeparture(departure);
      const url = new URL(window.location.href);
      url.searchParams.set("departure", departure.id);
      window.history.replaceState({}, "", url.toString());
      scrollToForm(100);
    },
    [scrollToForm]
  );

  const handleClearDeparture = useCallback(() => {
    setSelectedDeparture(null);
    const url = new URL(window.location.href);
    url.searchParams.delete("departure");
    window.history.replaceState({}, "", url.toString());
  }, []);

  // The form sits directly under the year list that holds the chosen date, so
  // JOIN NOW in 2026 no longer scrolls past the whole 2027 list. With nothing
  // chosen it sits after the last list.
  const selectedYear = selectedDeparture
    ? yearGroups.find((g) => g.departures.some((d) => d.id === selectedDeparture.id))?.year
    : undefined;
  const formYear = selectedYear ?? yearGroups[yearGroups.length - 1]?.year;

  return (
    <>
      {yearGroups.map((group) => (
        <Fragment key={group.year}>
          <section className="py-12" aria-labelledby={`departures-${group.year}`}>
            <div className="w-full px-4 md:px-6 xl:px-10">
              <h2
                id={`departures-${group.year}`}
                className="font-heading text-2xl md:text-3xl font-bold mb-8"
              >
                {group.year} Departures
              </h2>
              <DeparturesTable
                departures={group.departures}
                year={group.year}
                onSelectDeparture={handleSelectDeparture}
              />
            </div>
          </section>

          {group.year === formYear && (
            <section
              id="booking-form"
              ref={bookingFormRef}
              aria-labelledby="booking-form-heading"
              className="py-12 bg-[var(--surface)] border-y border-[var(--border)] scroll-mt-20"
            >
              <div className="container mx-auto px-4">
                <h2
                  id="booking-form-heading"
                  className="font-heading text-2xl md:text-3xl font-bold text-center mb-2"
                >
                  Request Your Spot
                </h2>
                <p className="text-center text-sm text-[var(--text-muted)] mb-8">
                  No payment today. We confirm availability within 24 hours, then send the deposit details.
                </p>
                <GroupBookingForm
                  departure={selectedDeparture}
                  onClearDeparture={handleClearDeparture}
                />
              </div>
            </section>
          )}
        </Fragment>
      ))}
    </>
  );
}
