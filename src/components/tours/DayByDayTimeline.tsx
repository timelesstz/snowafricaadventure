"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Building2, ChevronDown, ChevronUp, Utensils } from "lucide-react";
import type { DayItinerary } from "./types";

interface DayByDayTimelineProps {
  itinerary: DayItinerary[];
}

const dayLabels = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];

export function DayByDayTimeline({ itinerary }: DayByDayTimelineProps) {
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  const toggleDay = (day: number) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

  // Truncate description to first 150 characters for preview
  const getPreviewText = (text: string) => {
    if (text.length <= 150) return text;
    return text.substring(0, 150).trim() + "...";
  };

  return (
    <section id="itinerary" className="bg-[var(--primary-dark)] py-16 lg:py-24 relative overflow-hidden">
      {/* Top Gradient Glow */}
      <div
        className="absolute top-0 left-0 right-0 h-[300px] pointer-events-none"
        style={{ background: 'linear-gradient(180deg, rgba(245, 158, 11, 0.08) 0%, transparent 100%)' }}
      />

      {/* Header */}
      <div className="text-center max-w-[800px] mx-auto mb-16 px-4 sm:px-6 lg:px-8 relative">
        <span className="inline-block font-heading text-xs font-bold uppercase tracking-widest text-[var(--secondary)] pb-2 mb-4 border-b-2 border-white/20">
          Day by Day
        </span>
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
          Your Safari Journey
        </h2>
        <p className="text-white/70 text-lg leading-relaxed">
          From Arusha to the Serengeti - {itinerary.length} days of unforgettable wildlife encounters
        </p>
      </div>

      {/* Timeline Container */}
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Vertical Timeline Line - Hidden on mobile */}
        <div
          className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2"
          style={{ background: 'linear-gradient(180deg, var(--secondary) 0%, rgba(245, 158, 11, 0.3) 100%)' }}
        />

        {/* Day Cards */}
        <div className="space-y-12 lg:space-y-16">
          {itinerary.map((day, index) => {
            const isEven = index % 2 === 1;
            const isFeatured = day.isFeatured;
            const isExpanded = expandedDay === day.day;

            return (
              <div
                key={day.day}
                className={`
                  grid lg:grid-cols-[1fr_60px_1fr] gap-4 lg:gap-0 items-center relative
                `}
              >
                {/* Image - Order changes based on even/odd */}
                <div className={`${isEven ? 'lg:order-3' : 'lg:order-1'}`}>
                  <div className="relative h-[200px] lg:h-[280px] overflow-hidden rounded-sm shadow-lg group">
                    <Image
                      src={day.image || `https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/05/safaritanzania.jpg`}
                      alt={day.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 font-heading text-[11px] font-bold uppercase tracking-widest text-white bg-black/50 px-2 py-1 rounded-sm z-10">
                      Day {dayLabels[day.day - 1] || day.day}
                    </span>
                  </div>
                </div>

                {/* Timeline Node */}
                <div className="hidden lg:flex justify-center order-2 relative z-10">
                  <div
                    className={`
                      flex items-center justify-center font-heading font-extrabold text-white rounded-sm
                      border-[3px] border-[var(--primary-dark)]
                      ${isFeatured
                        ? 'w-14 h-14 text-xl shadow-lg shadow-[var(--secondary)]/60'
                        : 'w-12 h-12 text-lg shadow-lg shadow-[var(--secondary)]/40'
                      }
                    `}
                    style={{ background: 'var(--secondary)' }}
                  >
                    {day.day}
                  </div>
                </div>

                {/* Content Card */}
                <div className={`${isEven ? 'lg:order-1' : 'lg:order-3'}`}>
                  <div
                    onClick={() => toggleDay(day.day)}
                    className={`
                      relative bg-white rounded-sm shadow-lg p-5 lg:p-6 cursor-pointer
                      transition-all duration-300 hover:shadow-xl
                      ${isFeatured ? 'border-2 border-[var(--secondary)]' : 'hover:border hover:border-[var(--secondary)]/30'}
                      ${isExpanded ? 'ring-2 ring-[var(--secondary)]/20' : ''}
                    `}
                  >
                    {/* Arrow pointing to timeline - Hidden on mobile */}
                    <div
                      className={`
                        hidden lg:block absolute top-1/2 -translate-y-1/2
                        border-8 border-transparent
                        ${isEven
                          ? 'right-[-8px] border-l-white'
                          : 'left-[-8px] border-r-white'
                        }
                      `}
                    />

                    {/* Featured Badge */}
                    {isFeatured && (
                      <span className="absolute -top-3 left-6 font-heading text-[11px] font-bold uppercase tracking-wide text-white bg-[var(--secondary)] px-2.5 py-1 rounded-sm">
                        Safari Highlight
                      </span>
                    )}

                    {/* Mobile Day Number */}
                    <div className="lg:hidden flex items-center gap-3 mb-3">
                      <div
                        className="w-10 h-10 flex items-center justify-center font-heading font-extrabold text-white rounded-sm text-base"
                        style={{ background: 'var(--secondary)' }}
                      >
                        {day.day}
                      </div>
                      <span className="font-heading text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                        Day {dayLabels[day.day - 1] || day.day}
                      </span>
                    </div>

                    <h3 className="font-heading text-xl font-bold text-[var(--text)] mb-2 tracking-tight">
                      {day.title}
                    </h3>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-3 mb-3">
                      {day.location && (
                        <span className="inline-flex items-center gap-1 text-xs text-[var(--text-muted)]">
                          <MapPin className="w-3 h-3 text-[var(--secondary)]" />
                          {day.location}
                        </span>
                      )}
                      {day.accommodation && (
                        <span className="inline-flex items-center gap-1 text-xs text-[var(--text-muted)]">
                          <Building2 className="w-3 h-3 text-[var(--secondary)]" />
                          {day.accommodation}
                        </span>
                      )}
                      {day.meals && (
                        <span className="inline-flex items-center gap-1 text-xs text-[var(--text-muted)]">
                          <Utensils className="w-3 h-3 text-[var(--secondary)]" />
                          {day.meals}
                        </span>
                      )}
                    </div>

                    {/* Description - Preview or Full */}
                    <div className="mb-4">
                      {isExpanded ? (
                        <div className="text-sm text-[var(--text-muted)] leading-relaxed whitespace-pre-line">
                          {day.description}
                        </div>
                      ) : (
                        <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                          {getPreviewText(day.description)}
                        </p>
                      )}
                    </div>

                    {/* Highlights - Only show when expanded */}
                    {isExpanded && day.highlights && day.highlights.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4 pt-3 border-t border-[var(--border)]">
                        {day.highlights.map((highlight, hIndex) => (
                          <span
                            key={hIndex}
                            className="inline-flex items-center gap-1 text-xs font-medium text-[var(--secondary-dark)] bg-[var(--secondary)]/10 px-2 py-1 rounded-sm"
                          >
                            <span className="w-1 h-1 bg-[var(--secondary)] rounded-full" />
                            {highlight}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Click to expand/collapse indicator */}
                    <button
                      className="flex items-center gap-1 text-xs font-semibold text-[var(--secondary)] hover:text-[var(--secondary-dark)] transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDay(day.day);
                      }}
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp className="w-4 h-4" />
                          Show less
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4" />
                          Read more details
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Card */}
        <div className="mt-16 text-center p-8 lg:p-10 bg-white rounded-sm max-w-[700px] mx-auto relative">
          <h3 className="font-heading text-2xl font-bold text-[var(--text)] mb-2 tracking-tight">
            Ready for Your Safari Adventure?
          </h3>
          <p className="text-[var(--text-muted)] mb-6">
            Join hundreds of travelers who&apos;ve experienced Tanzania with Snow Africa
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="#book"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[var(--secondary)] text-white font-heading font-semibold rounded-sm hover:bg-[var(--secondary-dark)] hover:-translate-y-0.5 transition-all"
            >
              Check Availability
            </Link>
            <Link
              href="/contact-us"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-transparent text-[var(--text)] font-heading font-semibold rounded-sm border-2 border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--surface)] transition-all"
            >
              Ask a Question
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
