"use client";

import Link from "next/link";
import { Users, Clock, MapPin, ArrowRight } from "lucide-react";

interface Departure {
  id: string;
  startDate: Date;
  endDate: Date;
  price: number;
  spotsTotal: number;
  spotsTaken: number;
  routeTitle: string;
  duration: string;
  guideLanguage?: string;
}

interface RouteJoinGroupDeparturesProps {
  departures: Departure[];
  routeSlug: string;
  currency?: string;
}

export function RouteJoinGroupDepartures({
  departures,
  routeSlug,
  currency = "USD",
}: RouteJoinGroupDeparturesProps) {
  if (departures.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-white" id="departures">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-[var(--accent)]/10 text-[var(--accent)] px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Users className="w-4 h-4" />
            Join Group Departures
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-[var(--primary)] mb-3">
            Upcoming Kilimanjaro Climbs
          </h2>
          <p className="text-lg text-[var(--text-muted)]">
            Join fellow adventurers on scheduled group departures and save up to 25%
          </p>
        </div>

        {/* Departures Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {departures.slice(0, 4).map((departure) => (
            <DepartureCard
              key={departure.id}
              departure={departure}
              currency={currency}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Link
            href="/kilimanjaro-join-group-departures/"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[var(--primary)] text-white font-heading font-semibold rounded-lg hover:bg-[var(--primary-light)] transition-all"
          >
            View All Departures
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function DepartureCard({
  departure,
  currency,
}: {
  departure: Departure;
  currency: string;
}) {
  const spotsLeft = departure.spotsTotal - departure.spotsTaken;
  const isFillingFast = spotsLeft <= 4 && spotsLeft > 0;

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(new Date(date));
  };

  const formatMonth = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", { month: "short" }).format(
      new Date(date)
    );
  };

  const formatDay = (date: Date) => {
    return new Date(date).getDate().toString().padStart(2, "0");
  };

  return (
    <div
      className={`bg-white border-2 rounded-2xl p-6 transition-all hover:shadow-lg hover:-translate-y-1 relative ${
        isFillingFast
          ? "border-[var(--secondary)]"
          : "border-[var(--border)] hover:border-[var(--secondary)]"
      }`}
    >
      {/* Filling Fast Badge */}
      {isFillingFast && (
        <span className="absolute -top-3 right-5 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
          Filling Fast!
        </span>
      )}

      {/* Header */}
      <div className="flex justify-between items-start mb-5">
        <div className="flex items-center gap-4">
          {/* Calendar Block */}
          <div className="w-16 h-16 bg-[var(--primary)] rounded-lg flex flex-col items-center justify-center text-white">
            <span className="text-xs uppercase opacity-80">
              {formatMonth(departure.startDate)}
            </span>
            <span className="font-heading font-extrabold text-2xl leading-none">
              {formatDay(departure.startDate)}
            </span>
          </div>

          {/* Date Info */}
          <div>
            <h4 className="font-heading font-semibold text-[var(--primary)]">
              {formatDate(departure.startDate)} - {formatDate(departure.endDate)}, {new Date(departure.startDate).getFullYear()}
            </h4>
            <span className="text-sm text-[var(--text-muted)]">
              {departure.duration} • {departure.routeTitle}
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="text-right">
          <div className="font-heading text-2xl font-extrabold text-[var(--primary)]">
            ${departure.price.toLocaleString()}
          </div>
          <div className="text-xs text-[var(--text-muted)]">per person</div>
        </div>
      </div>

      {/* Details */}
      <div className="flex gap-6 py-4 border-t border-b border-[var(--border)] mb-4">
        <div className="flex items-center gap-2 text-sm text-[var(--text)]">
          <Clock className="w-4 h-4 text-[var(--accent)]" />
          {departure.duration}
        </div>
        <div className="flex items-center gap-2 text-sm text-[var(--text)]">
          <Users className="w-4 h-4 text-[var(--accent)]" />
          Max {departure.spotsTotal} climbers
        </div>
        <div className="flex items-center gap-2 text-sm text-[var(--text)]">
          <MapPin className="w-4 h-4 text-[var(--accent)]" />
          {departure.guideLanguage || "English"} guide
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center">
        {/* Spots Indicator */}
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {Array.from({ length: departure.spotsTotal }).map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i < departure.spotsTaken
                    ? "bg-[var(--text-muted)]"
                    : "bg-emerald-500"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-[var(--text-muted)]">
            <strong className="text-emerald-600">{spotsLeft} spots</strong>{" "}
            {spotsLeft === departure.spotsTotal ? "available" : "left"}
          </span>
        </div>

        {/* CTA Button */}
        <button className="px-6 py-2.5 bg-[var(--secondary)] text-[var(--primary-dark)] font-heading font-semibold rounded-lg hover:bg-[var(--secondary-dark)] transition-all hover:-translate-y-0.5">
          Join This Group
        </button>
      </div>
    </div>
  );
}
