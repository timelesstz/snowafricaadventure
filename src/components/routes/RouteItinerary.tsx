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

export function RouteItinerary({ days, routeTitle = "Route", routeSlug }: RouteItineraryProps) {
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

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

  const handleDownloadPdf = () => {
    setIsGeneratingPdf(true);

    // Create a new window with print-friendly content
    const printWindow = window.open("", "_blank", "width=800,height=600");
    if (!printWindow) {
      setIsGeneratingPdf(false);
      alert("Please allow pop-ups to download the itinerary PDF");
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${routeTitle} - Full Itinerary | Snow Africa Adventure</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Sora:wght@400;500;600&display=swap');

          * { margin: 0; padding: 0; box-sizing: border-box; }

          body {
            font-family: 'Sora', sans-serif;
            color: #1e3a5f;
            line-height: 1.6;
            padding: 40px;
            max-width: 800px;
            margin: 0 auto;
          }

          h1, h2, h3, h4 { font-family: 'Outfit', sans-serif; }

          .header {
            text-align: center;
            margin-bottom: 40px;
            padding-bottom: 30px;
            border-bottom: 3px solid #F59E0B;
          }

          .logo {
            font-size: 24px;
            font-weight: 700;
            color: #1e3a5f;
            margin-bottom: 10px;
          }

          .logo span { color: #F59E0B; }

          h1 {
            font-size: 28px;
            color: #1e3a5f;
            margin-bottom: 8px;
          }

          .subtitle {
            color: #64748b;
            font-size: 14px;
          }

          .summary-box {
            background: #f8fafc;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 30px;
            display: flex;
            justify-content: space-around;
            text-align: center;
          }

          .summary-item strong {
            display: block;
            font-size: 20px;
            color: #1e3a5f;
            font-family: 'Outfit', sans-serif;
          }

          .summary-item span {
            font-size: 12px;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .day-card {
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            margin-bottom: 20px;
            overflow: hidden;
            page-break-inside: avoid;
          }

          .day-card.summit {
            background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
            color: white;
            border: none;
          }

          .day-header {
            background: #f8fafc;
            padding: 15px 20px;
            display: flex;
            align-items: center;
            gap: 15px;
          }

          .day-card.summit .day-header {
            background: rgba(255,255,255,0.1);
          }

          .day-number {
            width: 40px;
            height: 40px;
            background: #1e3a5f;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-family: 'Outfit', sans-serif;
          }

          .day-card.summit .day-number {
            background: #F59E0B;
            color: #1e3a5f;
          }

          .day-title {
            font-size: 16px;
            font-weight: 600;
          }

          .day-badge {
            background: #F59E0B;
            color: #1e3a5f;
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
            margin-left: auto;
          }

          .day-content {
            padding: 20px;
          }

          .day-description {
            margin-bottom: 15px;
            color: #475569;
            font-size: 14px;
          }

          .day-card.summit .day-description {
            color: rgba(255,255,255,0.85);
          }

          .day-stats {
            display: flex;
            gap: 30px;
            padding-top: 15px;
            border-top: 1px solid #e2e8f0;
          }

          .day-card.summit .day-stats {
            border-top-color: rgba(255,255,255,0.1);
          }

          .stat-item strong {
            display: block;
            font-size: 14px;
            font-family: 'Outfit', sans-serif;
            color: #1e3a5f;
          }

          .day-card.summit .stat-item strong {
            color: #F59E0B;
          }

          .stat-item span {
            font-size: 11px;
            color: #64748b;
            text-transform: uppercase;
          }

          .day-card.summit .stat-item span {
            color: rgba(255,255,255,0.6);
          }

          .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #e2e8f0;
            text-align: center;
            color: #64748b;
            font-size: 12px;
          }

          .footer a {
            color: #F59E0B;
            text-decoration: none;
          }

          .contact-info {
            background: #f8fafc;
            padding: 20px;
            border-radius: 12px;
            margin-top: 20px;
            text-align: center;
          }

          .contact-info p {
            margin: 5px 0;
            font-size: 13px;
          }

          @media print {
            body { padding: 20px; }
            .day-card { break-inside: avoid; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">Snow<span>Africa</span> Adventure</div>
          <h1>${routeTitle}</h1>
          <p class="subtitle">${days.length}-Day Kilimanjaro Trekking Itinerary</p>
        </div>

        <div class="summary-box">
          <div class="summary-item">
            <strong>${days.length}</strong>
            <span>Days</span>
          </div>
          <div class="summary-item">
            <strong>${maxElevation.toLocaleString()}m</strong>
            <span>Max Elevation</span>
          </div>
          <div class="summary-item">
            <strong>5,895m</strong>
            <span>Summit</span>
          </div>
        </div>

        ${days.map((day, index) => {
          const badge = getDayBadge(day, index, days.length);
          const isSummit = day.title.toLowerCase().includes("summit") || day.title.toLowerCase().includes("uhuru");
          return `
            <div class="day-card${isSummit ? " summit" : ""}">
              <div class="day-header">
                <div class="day-number">${day.day}</div>
                <div class="day-title">${day.title}</div>
                ${badge ? `<div class="day-badge">${badge}</div>` : ""}
              </div>
              <div class="day-content">
                <p class="day-description">${day.description}</p>
                <div class="day-stats">
                  ${day.elevation ? `<div class="stat-item"><strong>${day.elevation}</strong><span>Elevation</span></div>` : ""}
                  ${day.distance ? `<div class="stat-item"><strong>${day.distance}</strong><span>Distance</span></div>` : ""}
                  ${day.duration ? `<div class="stat-item"><strong>${day.duration}</strong><span>Duration</span></div>` : ""}
                  ${day.camp ? `<div class="stat-item"><strong>${day.camp}</strong><span>Camp</span></div>` : ""}
                </div>
              </div>
            </div>
          `;
        }).join("")}

        <div class="contact-info">
          <p><strong>Ready to climb Kilimanjaro?</strong></p>
          <p>Email: info@snowafricaadventure.com</p>
          <p>Website: www.snowafricaadventure.com</p>
        </div>

        <div class="footer">
          <p>Generated from <a href="https://www.snowafricaadventure.com${routeSlug ? `/trekking/${routeSlug}/` : ""}">Snow Africa Adventure</a></p>
          <p>© ${new Date().getFullYear()} Snow Africa Adventure. All rights reserved.</p>
        </div>

        <script>
          window.onload = function() {
            window.print();
            window.onafterprint = function() {
              window.close();
            };
          };
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    setIsGeneratingPdf(false);
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
                  src={day.image || "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp"}
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
        <button
          onClick={handleDownloadPdf}
          disabled={isGeneratingPdf}
          className="inline-flex items-center gap-2 px-7 py-3.5 bg-white border-2 border-[var(--border)] text-[var(--primary)] font-heading font-semibold rounded-lg hover:border-[var(--secondary)] hover:text-[var(--secondary-dark)] hover:bg-[var(--surface)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGeneratingPdf ? (
            <svg className="animate-spin" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeOpacity="0.25"/>
              <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
          )}
          {isGeneratingPdf ? "Preparing..." : "Download Full Itinerary PDF"}
        </button>
      </div>
    </section>
  );
}
