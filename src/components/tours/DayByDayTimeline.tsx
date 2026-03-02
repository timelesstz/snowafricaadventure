"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Building2, ChevronDown, ChevronUp, Utensils } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import type { DayItinerary } from "./types";

interface DayByDayTimelineProps {
  itinerary: DayItinerary[];
  safariTitle?: string;
  safariSlug?: string;
  overview?: string;
  highlights?: string[];
  inclusions?: string[];
  exclusions?: string[];
  duration?: string;
  parks?: number;
  gameDrives?: number;
}

const dayLabels = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];

export function DayByDayTimeline({ itinerary, safariTitle, safariSlug, overview, highlights, inclusions, exclusions, parks, gameDrives }: DayByDayTimelineProps) {
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const { logo } = useTheme();

  const toggleDay = (day: number) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

  // Truncate description to first 150 characters for preview
  const getPreviewText = (text: string) => {
    if (text.length <= 150) return text;
    return text.substring(0, 150).trim() + "...";
  };

  const handleDownloadPdf = () => {
    if (!safariTitle) return;
    setIsGeneratingPdf(true);

    const printWindow = window.open("", "_blank", "width=800,height=600");
    if (!printWindow) {
      setIsGeneratingPdf(false);
      alert("Please allow pop-ups to download the itinerary PDF");
      return;
    }

    const logoUrl = logo.logoUrl || logo.logoDarkUrl;
    const safariUrl = `https://www.snowafricaadventure.com${safariSlug ? `/tanzania-safaris/${safariSlug}/` : ""}`;
    const year = new Date().getFullYear();

    const logoHtml = logoUrl
      ? `<img src="${logoUrl}" alt="Snow Africa Adventure" class="logo-img" />`
      : `<div class="logo-text">Snow<span>Africa</span> Adventure</div>`;

    const highlightsHtml = highlights && highlights.length > 0
      ? `<div class="highlights-section">
          <h2 class="section-title"><span class="section-icon">&#9733;</span>Safari Highlights</h2>
          <div class="highlights-grid">
            ${highlights.map(h => `<div class="highlight-item"><span class="highlight-check">&#10003;</span>${h}</div>`).join("")}
          </div>
        </div>`
      : "";

    const inclusionsHtml = (inclusions && inclusions.length > 0) || (exclusions && exclusions.length > 0)
      ? `<div class="inclusions-section">
          <h2 class="section-title"><span class="section-icon">&#9776;</span>What&rsquo;s Included &amp; Excluded</h2>
          <div class="inclusions-grid">
            ${inclusions && inclusions.length > 0 ? `
              <div class="inclusions-col">
                <h3 class="inc-heading inc-included">Included</h3>
                <ul class="inc-list">${inclusions.map(i => `<li><span class="inc-icon included">&#10003;</span>${i}</li>`).join("")}</ul>
              </div>` : ""}
            ${exclusions && exclusions.length > 0 ? `
              <div class="inclusions-col">
                <h3 class="inc-heading inc-excluded">Not Included</h3>
                <ul class="inc-list">${exclusions.map(e => `<li><span class="inc-icon excluded">&#10007;</span>${e}</li>`).join("")}</ul>
              </div>` : ""}
          </div>
        </div>`
      : "";

    const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <title>${safariTitle} - Full Itinerary | Snow Africa Adventure</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Sora:wght@300;400;500;600&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Sora', -apple-system, sans-serif; color: #1e293b; line-height: 1.65; max-width: 780px; margin: 0 auto; padding: 0 36px; }
    h1, h2, h3, h4 { font-family: 'Outfit', sans-serif; line-height: 1.25; }

    .cover-header { text-align: center; padding: 48px 20px 36px; position: relative; }
    .cover-header::after { content: ''; position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 120px; height: 3px; background: linear-gradient(90deg, transparent, #F59E0B, transparent); }
    .logo-img { height: 56px; width: auto; margin-bottom: 24px; object-fit: contain; }
    .logo-text { font-family: 'Outfit', sans-serif; font-size: 26px; font-weight: 800; color: #1e293b; margin-bottom: 24px; letter-spacing: -0.5px; }
    .logo-text span { color: #F59E0B; }
    .cover-label { display: inline-block; font-family: 'Outfit', sans-serif; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 3px; color: #F59E0B; margin-bottom: 12px; padding: 5px 16px; border: 1.5px solid #F59E0B; border-radius: 20px; }
    .cover-title { font-size: 32px; font-weight: 800; color: #1e293b; margin-bottom: 8px; letter-spacing: -0.5px; }
    .cover-subtitle { font-size: 15px; color: #64748b; font-weight: 400; }

    .stats-bar { display: flex; justify-content: center; gap: 4px; margin: 32px 0; background: #f8fafc; border-radius: 14px; padding: 4px; }
    .stat-box { flex: 1; text-align: center; padding: 16px 8px; border-radius: 12px; }
    .stat-box.featured { background: #1e293b; }
    .stat-box .stat-value { display: block; font-family: 'Outfit', sans-serif; font-size: 22px; font-weight: 700; color: #1e293b; line-height: 1.2; }
    .stat-box.featured .stat-value { color: #F59E0B; }
    .stat-box .stat-label { display: block; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; margin-top: 4px; }

    .intro-section { margin-bottom: 36px; padding: 28px 32px; background: linear-gradient(135deg, #fefce8 0%, #fff7ed 100%); border-radius: 14px; border-left: 4px solid #F59E0B; }
    .intro-section h2 { font-size: 18px; font-weight: 700; color: #1e293b; margin-bottom: 10px; }
    .intro-section p { font-size: 13.5px; color: #475569; line-height: 1.75; }

    .section-title { font-size: 20px; font-weight: 700; color: #1e293b; margin-bottom: 20px; display: flex; align-items: center; gap: 10px; }
    .section-icon { display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; background: #fef3c7; color: #d97706; border-radius: 8px; font-size: 15px; }

    .highlights-section { margin-bottom: 36px; }
    .highlights-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
    .highlight-item { display: flex; align-items: center; gap: 10px; padding: 12px 16px; background: #f8fafc; border-radius: 10px; font-size: 13px; color: #334155; font-weight: 500; }
    .highlight-check { color: #16a34a; font-weight: 700; font-size: 14px; flex-shrink: 0; }

    .itinerary-header { display: flex; align-items: center; gap: 10px; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 2px solid #f1f5f9; }
    .itinerary-header h2 { font-size: 20px; font-weight: 700; color: #1e293b; }

    .day-card { border: 1px solid #e2e8f0; border-radius: 14px; margin-bottom: 18px; overflow: hidden; page-break-inside: avoid; break-inside: avoid; }
    .day-header { padding: 16px 20px; display: flex; align-items: center; gap: 14px; background: #f8fafc; border-bottom: 1px solid #e2e8f0; }
    .day-number { width: 38px; height: 38px; min-width: 38px; background: #1e293b; color: white; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 15px; font-family: 'Outfit', sans-serif; }
    .day-title-group { flex: 1; }
    .day-title { font-size: 15px; font-weight: 600; font-family: 'Outfit', sans-serif; line-height: 1.3; }
    .day-meta { display: flex; gap: 16px; margin-top: 3px; }
    .day-meta span { font-size: 11px; color: #94a3b8; }
    .day-badge { background: #F59E0B; color: #1e293b; padding: 4px 12px; border-radius: 20px; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; white-space: nowrap; }
    .day-content { padding: 18px 20px; }
    .day-description { font-size: 13px; color: #475569; line-height: 1.7; }

    .inclusions-section { margin-top: 36px; margin-bottom: 36px; }
    .inclusions-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
    .inc-heading { font-size: 14px; font-weight: 700; margin-bottom: 14px; padding-bottom: 10px; border-bottom: 2px solid #e2e8f0; }
    .inc-heading.inc-included { color: #16a34a; }
    .inc-heading.inc-excluded { color: #dc2626; }
    .inc-list { list-style: none; padding: 0; }
    .inc-list li { display: flex; align-items: flex-start; gap: 10px; padding: 8px 0; font-size: 12.5px; color: #475569; border-bottom: 1px solid #f1f5f9; line-height: 1.5; }
    .inc-list li:last-child { border-bottom: none; }
    .inc-icon { flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 20px; border-radius: 50%; font-size: 11px; font-weight: 700; margin-top: 1px; }
    .inc-icon.included { background: #dcfce7; color: #16a34a; }
    .inc-icon.excluded { background: #fee2e2; color: #dc2626; }

    .cta-section { margin-top: 40px; background: linear-gradient(135deg, #1e293b 0%, #334155 100%); border-radius: 16px; padding: 36px 32px; text-align: center; color: white; page-break-inside: avoid; }
    .cta-section h2 { font-size: 22px; font-weight: 700; margin-bottom: 8px; }
    .cta-section .cta-subtitle { font-size: 14px; color: rgba(255,255,255,0.7); margin-bottom: 24px; }
    .cta-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-bottom: 24px; }
    .cta-item { background: rgba(255,255,255,0.08); border-radius: 12px; padding: 16px 12px; }
    .cta-item .cta-icon { font-size: 20px; margin-bottom: 6px; }
    .cta-item .cta-label { font-size: 11px; color: rgba(255,255,255,0.6); text-transform: uppercase; letter-spacing: 0.5px; }
    .cta-item .cta-value { font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 600; color: #F59E0B; margin-top: 2px; }
    .cta-divider { height: 1px; background: rgba(255,255,255,0.1); margin-bottom: 20px; }
    .cta-website { font-size: 13px; color: #F59E0B; font-weight: 600; text-decoration: none; }

    .footer { margin-top: 32px; padding: 20px 0; text-align: center; color: #94a3b8; font-size: 11px; border-top: 1px solid #e2e8f0; }
    .footer a { color: #F59E0B; text-decoration: none; }
    .footer p { margin: 3px 0; }

    @media print {
      body { padding: 0 24px; }
      .day-card { break-inside: avoid; page-break-inside: avoid; }
      .inclusions-section { break-inside: avoid; }
      .cta-section { break-inside: avoid; }
      .highlights-section { break-inside: avoid; }
    }
  </style>
</head>
<body>
  <div class="cover-header">
    ${logoHtml}
    <div class="cover-label">Full Itinerary</div>
    <h1 class="cover-title">${safariTitle}</h1>
    <p class="cover-subtitle">${itinerary.length}-Day Tanzania Safari Experience</p>
  </div>

  <div class="stats-bar">
    <div class="stat-box">
      <span class="stat-value">${itinerary.length}</span>
      <span class="stat-label">Days</span>
    </div>
    ${parks ? `<div class="stat-box featured"><span class="stat-value">${parks}</span><span class="stat-label">National Parks</span></div>` : ""}
    ${gameDrives ? `<div class="stat-box"><span class="stat-value">${gameDrives}</span><span class="stat-label">Game Drives</span></div>` : ""}
    <div class="stat-box">
      <span class="stat-value">4x4</span>
      <span class="stat-label">Private Vehicle</span>
    </div>
  </div>

  ${overview ? `<div class="intro-section"><h2>About This Safari</h2><p>${overview}</p></div>` : ""}

  ${highlightsHtml}

  <div class="itinerary-header">
    <span class="section-icon">&#128197;</span>
    <h2>Day-by-Day Itinerary</h2>
  </div>

  ${itinerary.map((day, index) => {
    const isFirst = index === 0;
    const isLast = index === itinerary.length - 1;
    const badge = isFirst ? "Start" : isLast ? "Finish" : day.isFeatured ? "Highlight" : null;
    return `
    <div class="day-card">
      <div class="day-header">
        <div class="day-number">${day.day}</div>
        <div class="day-title-group">
          <div class="day-title">${day.title}</div>
          <div class="day-meta">
            ${day.accommodation ? `<span>&#127968; ${day.accommodation}</span>` : ""}
            ${day.meals ? `<span>&#127860; ${day.meals}</span>` : ""}
            ${day.location ? `<span>&#128205; ${day.location}</span>` : ""}
          </div>
        </div>
        ${badge ? `<div class="day-badge">${badge}</div>` : ""}
      </div>
      <div class="day-content">
        <p class="day-description">${day.description}</p>
      </div>
    </div>`;
  }).join("")}

  ${inclusionsHtml}

  <div class="cta-section">
    <h2>Ready for Your Safari Adventure?</h2>
    <p class="cta-subtitle">Our expert team is ready to help you plan your dream safari</p>
    <div class="cta-grid">
      <div class="cta-item">
        <div class="cta-icon">&#9993;</div>
        <div class="cta-label">Email</div>
        <div class="cta-value">info@snowafricaadventure.com</div>
      </div>
      <div class="cta-item">
        <div class="cta-icon">&#9742;</div>
        <div class="cta-label">Phone / WhatsApp</div>
        <div class="cta-value">+255 766 657 854</div>
      </div>
      <div class="cta-item">
        <div class="cta-icon">&#127758;</div>
        <div class="cta-label">Website</div>
        <div class="cta-value">snowafricaadventure.com</div>
      </div>
    </div>
    <div class="cta-divider"></div>
    <a href="${safariUrl}" class="cta-website">View this itinerary online &rarr;</a>
  </div>

  <div class="footer">
    <p>&copy; ${year} Snow Africa Adventure. All rights reserved.</p>
    <p>MEC House, Plot no 161, Second floor, Mianzini Area, Arusha, Tanzania</p>
  </div>

  <script>
    window.onload = function() {
      setTimeout(function() { window.print(); }, 500);
      window.onafterprint = function() { window.close(); };
    };
  </script>
</body>
</html>`;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    setIsGeneratingPdf(false);
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

        {/* Download PDF Button */}
        {safariTitle && (
          <div className="text-center mt-12 mb-8">
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white font-heading font-semibold rounded-lg hover:border-[var(--secondary)] hover:bg-white/15 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
        )}

        {/* CTA Card */}
        <div className="mt-8 text-center p-8 lg:p-10 bg-white rounded-sm max-w-[700px] mx-auto relative">
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
              href="/contact-us/"
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
