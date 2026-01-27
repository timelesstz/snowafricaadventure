"use client";

import { useState, useMemo } from "react";
import Image from "next/image";

interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  elevation?: string;
  distance?: string;
  camp?: string;
  image?: string;
  tags?: string[];
  meals?: string;
  duration?: string;
}

interface ElevationPoint {
  day: number;
  elevation: number;
  camp: string;
}

interface RouteItineraryProps {
  days: ItineraryDay[];
  routeTitle?: string;
  routeSlug?: string;
}

// Generate elevation profile from itinerary data
function extractElevationProfile(days: ItineraryDay[]): ElevationPoint[] {
  return days
    .filter(day => day.elevation && day.camp)
    .map(day => {
      const elevStr = day.elevation || "";
      const numbers = elevStr.match(/[\d,]+(?=m)/g) || [];
      const elevations = numbers.map(n => parseInt(n.replace(/,/g, ""), 10));
      const maxElev = Math.max(...elevations, 0);

      return {
        day: day.day,
        elevation: maxElev || 0,
        camp: day.camp || "",
      };
    })
    .filter(point => point.elevation > 0);
}

// Generate SVG path for elevation visualization
function generateElevationPath(points: ElevationPoint[], width: number, height: number): { linePath: string; areaPath: string } {
  if (points.length < 2) {
    return { linePath: "", areaPath: "" };
  }

  const maxElev = Math.max(...points.map(p => p.elevation));
  const minElev = Math.min(...points.map(p => p.elevation));
  const elevRange = maxElev - minElev || 1;

  const padding = 20;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding;

  const getX = (index: number) => padding + (index / (points.length - 1)) * chartWidth;
  const getY = (elev: number) => chartHeight - ((elev - minElev) / elevRange) * (chartHeight - 20) + 10;

  const linePoints = points.map((point, i) => `${getX(i)},${getY(point.elevation)}`);
  const linePath = `M${linePoints.join(" L")}`;

  const areaPath = `M${padding},${chartHeight} L${linePoints.join(" L")} L${getX(points.length - 1)},${chartHeight} Z`;

  return { linePath, areaPath };
}

// Determine day badge type
function getDayBadge(day: ItineraryDay, index: number, totalDays: number): string | null {
  const titleLower = day.title.toLowerCase();
  if (titleLower.includes("summit") || titleLower.includes("uhuru")) return "Summit!";
  if (index === 0) return "Start";
  if (index === totalDays - 1) return "Finish";
  if (titleLower.includes("lava tower") || titleLower.includes("acclimatization") || titleLower.includes("key")) return "Key Day";
  return null;
}

// Extract elevation change from string like "1,860m → 2,720m"
function getElevationChange(elevation?: string): string | null {
  if (!elevation) return null;
  const numbers = elevation.match(/[\d,]+(?=m)/g) || [];
  if (numbers.length >= 2) {
    const firstNum = numbers[0];
    const lastNum = numbers[numbers.length - 1];
    if (!firstNum || !lastNum) return null;
    const start = parseInt(firstNum.replace(/,/g, ""), 10);
    const end = parseInt(lastNum.replace(/,/g, ""), 10);
    const diff = end - start;
    if (diff > 0) return `+${diff.toLocaleString()}m`;
    if (diff < 0) return `${diff.toLocaleString()}m`;
  }
  return null;
}

export function RouteItinerary({ days, routeTitle = "Route" }: RouteItineraryProps) {
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  const elevationProfile = useMemo(() => extractElevationProfile(days), [days]);

  const maxElevation = useMemo(() => {
    if (elevationProfile.length === 0) return 5895;
    return Math.max(...elevationProfile.map(p => p.elevation));
  }, [elevationProfile]);

  const { linePath, areaPath } = useMemo(
    () => generateElevationPath(elevationProfile, 700, 120),
    [elevationProfile]
  );

  const toggleDay = (day: number) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

  const isSummitDay = (day: ItineraryDay) => {
    const titleLower = day.title.toLowerCase();
    return titleLower.includes("summit") || titleLower.includes("uhuru");
  };

  return (
    <section className="section" id="itinerary">
      {/* Section Header with Icon */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-[var(--surface)] rounded-xl flex items-center justify-center text-[var(--secondary)]">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
        </div>
        <h2 className="font-heading text-2xl font-bold text-[var(--primary)]">
          Your {days.length}-Day Journey
        </h2>
      </div>

      {/* Itinerary Intro */}
      <p className="text-center text-[1.0625rem] text-[var(--text-muted)] max-w-[600px] mx-auto mb-10">
        From rainforest floor to Africa&apos;s rooftop - traverse 5 climate zones and experience the adventure of a lifetime.
      </p>

      {/* Elevation Profile */}
      {elevationProfile.length > 1 && (
        <div className="relative bg-gradient-to-b from-[var(--surface)] to-white rounded-2xl p-6 md:p-8 mb-10 overflow-hidden">
          {/* Header with Legend */}
          <div className="flex items-center justify-between mb-6">
            <span className="font-heading text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider">
              Elevation Profile
            </span>
            <div className="flex items-center gap-5 text-xs text-[var(--text-muted)]">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--secondary)]"></span>
                Camp
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]"></span>
                Summit
              </span>
            </div>
          </div>

          {/* SVG Elevation Chart */}
          <div className="relative h-[180px] flex items-end justify-between px-5">
            <div className="absolute bottom-10 left-5 right-5 h-[120px]">
              <svg viewBox="0 0 700 120" className="w-full h-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="elevGradientLine" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981"/>
                    <stop offset="50%" stopColor="#F59E0B"/>
                    <stop offset="85%" stopColor="#06b6d4"/>
                    <stop offset="100%" stopColor="#10b981"/>
                  </linearGradient>
                  <linearGradient id="elevGradientArea" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(245, 158, 11, 0.2)"/>
                    <stop offset="100%" stopColor="rgba(245, 158, 11, 0)"/>
                  </linearGradient>
                </defs>
                {areaPath && <path d={areaPath} fill="url(#elevGradientArea)" />}
                {linePath && (
                  <path
                    d={linePath}
                    fill="none"
                    stroke="url(#elevGradientLine)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}
              </svg>
            </div>

            {/* Elevation Markers */}
            <div className="relative z-10 flex justify-between w-full pb-2">
              {elevationProfile.map((point, index) => {
                const isSummit = point.elevation === maxElevation;
                return (
                  <div key={index} className="flex flex-col items-center cursor-pointer hover:-translate-y-1 transition-transform">
                    <div
                      className={`mb-2 rounded-full border-[3px] border-white shadow-md ${
                        isSummit
                          ? "w-5 h-5 bg-[var(--accent)]"
                          : "w-4 h-4 bg-[var(--secondary)]"
                      }`}
                    />
                    <span className="font-heading text-xs font-bold text-[var(--primary)]">
                      {point.elevation.toLocaleString()}m
                    </span>
                    <span className="text-[0.6875rem] font-semibold text-[var(--text-muted)] text-center max-w-[60px] truncate hidden sm:block">
                      {point.camp}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Day Cards Grid */}
      <div className="grid md:grid-cols-2 gap-5">
        {days.map((day, index) => {
          const isExpanded = expandedDay === day.day;
          const isSummit = isSummitDay(day);
          const dayBadge = getDayBadge(day, index, days.length);
          const elevChange = getElevationChange(day.elevation);

          return (
            <div
              key={day.day}
              className={`rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer ${
                isSummit
                  ? "md:col-span-2 border-0"
                  : "bg-white border border-[var(--border)] hover:border-[var(--secondary)] hover:shadow-lg hover:-translate-y-1"
              }`}
              style={isSummit ? { background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)" } : undefined}
              onClick={() => toggleDay(day.day)}
            >
              {/* Image Section */}
              <div className={`relative overflow-hidden ${isSummit ? "h-[180px]" : "h-[140px]"}`}>
                <Image
                  src={day.image || "https://images.unsplash.com/photo-1609198092458-38a293c7ac4b?w=600"}
                  alt={day.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-[1.08]"
                />
                {/* Day Number Badge - Circle */}
                <span className={`absolute top-3 left-3 w-9 h-9 rounded-full flex items-center justify-center font-heading font-extrabold text-sm shadow-md ${
                  isSummit
                    ? "bg-[var(--secondary)] text-[var(--primary-dark)]"
                    : "bg-white text-[var(--primary)]"
                }`}>
                  {day.day}
                </span>
                {/* Day Badge (Start/Key Day/Summit/Finish) */}
                {dayBadge && (
                  <span className="absolute top-3 right-3 bg-[var(--secondary)] text-[var(--primary-dark)] px-2.5 py-1 rounded-full text-[0.6875rem] font-semibold uppercase tracking-wide">
                    {dayBadge}
                  </span>
                )}
              </div>

              {/* Content Section */}
              <div className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-2.5">
                  <h4 className={`font-heading font-semibold leading-tight ${
                    isSummit ? "text-white" : "text-[var(--primary)]"
                  }`}>
                    {day.title}
                  </h4>
                  {elevChange && (
                    <span className={`flex items-center gap-1 px-2 py-1 rounded text-[0.6875rem] font-semibold whitespace-nowrap ml-2 ${
                      isSummit
                        ? "bg-white/15 text-[var(--accent-light)]"
                        : "bg-[var(--surface)] text-emerald-600"
                    }`}>
                      <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                      </svg>
                      {elevChange}
                    </span>
                  )}
                </div>

                {/* Description Preview */}
                <p className={`text-sm leading-relaxed mb-4 line-clamp-2 ${
                  isSummit ? "text-white/80" : "text-[var(--text-muted)]"
                }`}>
                  {day.description}
                </p>

                {/* Stats Grid */}
                <div className={`flex gap-5 pt-3 border-t mb-3 ${
                  isSummit ? "border-white/10" : "border-[var(--border)]"
                }`}>
                  {day.distance && (
                    <div className="flex flex-col">
                      <span className={`font-heading font-bold text-[0.9375rem] leading-none ${
                        isSummit ? "text-[var(--secondary)]" : "text-[var(--primary)]"
                      }`}>
                        {day.distance}
                      </span>
                      <span className={`text-[0.6875rem] uppercase tracking-wide mt-0.5 ${
                        isSummit ? "text-white/60" : "text-[var(--text-muted)]"
                      }`}>
                        Distance
                      </span>
                    </div>
                  )}
                  {day.duration && (
                    <div className="flex flex-col">
                      <span className={`font-heading font-bold text-[0.9375rem] leading-none ${
                        isSummit ? "text-[var(--secondary)]" : "text-[var(--primary)]"
                      }`}>
                        {day.duration}
                      </span>
                      <span className={`text-[0.6875rem] uppercase tracking-wide mt-0.5 ${
                        isSummit ? "text-white/60" : "text-[var(--text-muted)]"
                      }`}>
                        Duration
                      </span>
                    </div>
                  )}
                  {day.camp && (
                    <div className="flex flex-col">
                      <span className={`font-heading font-bold text-[0.9375rem] leading-none ${
                        isSummit ? "text-[var(--secondary)]" : "text-[var(--primary)]"
                      }`}>
                        {day.camp.split(" ")[0]}
                      </span>
                      <span className={`text-[0.6875rem] uppercase tracking-wide mt-0.5 ${
                        isSummit ? "text-white/60" : "text-[var(--text-muted)]"
                      }`}>
                        Camp
                      </span>
                    </div>
                  )}
                </div>

                {/* Tags */}
                {day.tags && day.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {day.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className={`px-2.5 py-1 rounded-full text-[0.6875rem] font-medium ${
                          isSummit
                            ? "bg-white/15 text-white"
                            : "bg-[var(--surface)] text-[var(--text-muted)]"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Expanded Content */}
                {isExpanded && (
                  <div className={`mt-4 pt-4 border-t ${
                    isSummit ? "border-white/10" : "border-[var(--border)]"
                  }`}>
                    <p className={`text-sm leading-relaxed ${
                      isSummit ? "text-white/85" : "text-[var(--text)]"
                    }`}>
                      {day.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Download Button */}
      <div className="text-center mt-8">
        <button className="inline-flex items-center gap-2 px-7 py-3.5 bg-white border-2 border-[var(--border)] text-[var(--primary)] font-heading font-semibold rounded-lg hover:border-[var(--secondary)] hover:text-[var(--secondary-dark)] hover:bg-[var(--surface)] transition-all">
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10 9 9 9 8 9"/>
          </svg>
          Download Full Itinerary PDF
        </button>
      </div>
    </section>
  );
}
