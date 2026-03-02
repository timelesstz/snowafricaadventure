"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { useTheme } from "@/components/theme-provider";

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
  elevationProfileData?: ElevationPoint[] | null;
  overview?: string;
  highlights?: string[];
  inclusions?: string[];
  exclusions?: string[];
  difficulty?: string;
  successRate?: number;
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

export function RouteItinerary({ days, routeTitle = "Route", routeSlug, elevationProfileData, overview, highlights, inclusions, exclusions, difficulty, successRate }: RouteItineraryProps) {
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const { logo } = useTheme();

  const elevationProfile = useMemo(() => {
    if (elevationProfileData && elevationProfileData.length > 0) {
      return elevationProfileData;
    }
    return extractElevationProfile(days);
  }, [elevationProfileData, days]);

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

    const printWindow = window.open("", "_blank", "width=800,height=600");
    if (!printWindow) {
      setIsGeneratingPdf(false);
      alert("Please allow pop-ups to download the itinerary PDF");
      return;
    }

    const logoUrl = logo.logoUrl || logo.logoDarkUrl;
    const routeUrl = `https://www.snowafricaadventure.com${routeSlug ? `/trekking/${routeSlug}/` : ""}`;
    const year = new Date().getFullYear();

    const logoHtml = logoUrl
      ? `<img src="${logoUrl}" alt="Snow Africa Adventure" class="logo-img" />`
      : `<div class="logo-text">Snow<span>Africa</span> Adventure</div>`;

    const highlightsHtml = highlights && highlights.length > 0
      ? `<div class="highlights-section">
          <h2 class="section-title">
            <span class="section-icon">&#9733;</span>
            Route Highlights
          </h2>
          <div class="highlights-grid">
            ${highlights.map(h => `<div class="highlight-item"><span class="highlight-check">&#10003;</span>${h}</div>`).join("")}
          </div>
        </div>`
      : "";

    const inclusionsHtml = (inclusions && inclusions.length > 0) || (exclusions && exclusions.length > 0)
      ? `<div class="inclusions-section" style="page-break-before: auto;">
          <h2 class="section-title">
            <span class="section-icon">&#9776;</span>
            What&rsquo;s Included &amp; Excluded
          </h2>
          <div class="inclusions-grid">
            ${inclusions && inclusions.length > 0 ? `
              <div class="inclusions-col">
                <h3 class="inc-heading inc-included">Included</h3>
                <ul class="inc-list">
                  ${inclusions.map(i => `<li><span class="inc-icon included">&#10003;</span>${i}</li>`).join("")}
                </ul>
              </div>
            ` : ""}
            ${exclusions && exclusions.length > 0 ? `
              <div class="inclusions-col">
                <h3 class="inc-heading inc-excluded">Not Included</h3>
                <ul class="inc-list">
                  ${exclusions.map(e => `<li><span class="inc-icon excluded">&#10007;</span>${e}</li>`).join("")}
                </ul>
              </div>
            ` : ""}
          </div>
        </div>`
      : "";

    const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <title>${routeTitle} - Full Itinerary | Snow Africa Adventure</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Sora:wght@300;400;500;600&display=swap');

    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: 'Sora', -apple-system, sans-serif;
      color: #1e293b;
      line-height: 1.65;
      max-width: 780px;
      margin: 0 auto;
      padding: 0 36px;
    }

    h1, h2, h3, h4 { font-family: 'Outfit', sans-serif; line-height: 1.25; }

    /* ===== COVER HEADER ===== */
    .cover-header {
      text-align: center;
      padding: 48px 20px 36px;
      position: relative;
    }

    .cover-header::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 120px;
      height: 3px;
      background: linear-gradient(90deg, transparent, #F59E0B, transparent);
    }

    .logo-img {
      height: 56px;
      width: auto;
      margin-bottom: 24px;
      object-fit: contain;
    }

    .logo-text {
      font-family: 'Outfit', sans-serif;
      font-size: 26px;
      font-weight: 800;
      color: #1e293b;
      margin-bottom: 24px;
      letter-spacing: -0.5px;
    }

    .logo-text span { color: #F59E0B; }

    .cover-label {
      display: inline-block;
      font-family: 'Outfit', sans-serif;
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 3px;
      color: #F59E0B;
      margin-bottom: 12px;
      padding: 5px 16px;
      border: 1.5px solid #F59E0B;
      border-radius: 20px;
    }

    .cover-title {
      font-size: 32px;
      font-weight: 800;
      color: #1e293b;
      margin-bottom: 8px;
      letter-spacing: -0.5px;
    }

    .cover-subtitle {
      font-size: 15px;
      color: #64748b;
      font-weight: 400;
    }

    /* ===== STATS BAR ===== */
    .stats-bar {
      display: flex;
      justify-content: center;
      gap: 4px;
      margin: 32px 0;
      background: #f8fafc;
      border-radius: 14px;
      padding: 4px;
    }

    .stat-box {
      flex: 1;
      text-align: center;
      padding: 16px 8px;
      border-radius: 12px;
    }

    .stat-box.featured {
      background: #1e293b;
    }

    .stat-box .stat-value {
      display: block;
      font-family: 'Outfit', sans-serif;
      font-size: 22px;
      font-weight: 700;
      color: #1e293b;
      line-height: 1.2;
    }

    .stat-box.featured .stat-value {
      color: #F59E0B;
    }

    .stat-box .stat-label {
      display: block;
      font-size: 10px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #94a3b8;
      margin-top: 4px;
    }

    .stat-box.featured .stat-label {
      color: #94a3b8;
    }

    /* ===== INTRO SECTION ===== */
    .intro-section {
      margin-bottom: 36px;
      padding: 28px 32px;
      background: linear-gradient(135deg, #fefce8 0%, #fff7ed 100%);
      border-radius: 14px;
      border-left: 4px solid #F59E0B;
    }

    .intro-section h2 {
      font-size: 18px;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 10px;
    }

    .intro-section p {
      font-size: 13.5px;
      color: #475569;
      line-height: 1.75;
    }

    /* ===== SECTION TITLES ===== */
    .section-title {
      font-size: 20px;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .section-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      background: #fef3c7;
      color: #d97706;
      border-radius: 8px;
      font-size: 15px;
    }

    /* ===== HIGHLIGHTS ===== */
    .highlights-section {
      margin-bottom: 36px;
    }

    .highlights-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }

    .highlight-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 16px;
      background: #f8fafc;
      border-radius: 10px;
      font-size: 13px;
      color: #334155;
      font-weight: 500;
    }

    .highlight-check {
      color: #16a34a;
      font-weight: 700;
      font-size: 14px;
      flex-shrink: 0;
    }

    /* ===== ITINERARY HEADER ===== */
    .itinerary-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 2px solid #f1f5f9;
    }

    .itinerary-header h2 {
      font-size: 20px;
      font-weight: 700;
      color: #1e293b;
    }

    /* ===== DAY CARDS ===== */
    .day-card {
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      margin-bottom: 18px;
      overflow: hidden;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .day-card.summit {
      background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
      color: white;
      border: 2px solid #F59E0B;
    }

    .day-header {
      padding: 16px 20px;
      display: flex;
      align-items: center;
      gap: 14px;
      background: #f8fafc;
      border-bottom: 1px solid #e2e8f0;
    }

    .day-card.summit .day-header {
      background: rgba(245,158,11,0.08);
      border-bottom-color: rgba(255,255,255,0.08);
    }

    .day-number {
      width: 38px;
      height: 38px;
      min-width: 38px;
      background: #1e293b;
      color: white;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 15px;
      font-family: 'Outfit', sans-serif;
    }

    .day-card.summit .day-number {
      background: #F59E0B;
      color: #1e293b;
    }

    .day-title-group {
      flex: 1;
    }

    .day-title {
      font-size: 15px;
      font-weight: 600;
      font-family: 'Outfit', sans-serif;
      line-height: 1.3;
    }

    .day-meals {
      font-size: 11px;
      color: #94a3b8;
      margin-top: 2px;
    }

    .day-card.summit .day-meals {
      color: rgba(255,255,255,0.5);
    }

    .day-badge {
      background: #F59E0B;
      color: #1e293b;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      white-space: nowrap;
    }

    .day-card.summit .day-badge {
      background: #F59E0B;
      color: #1e293b;
    }

    .day-content {
      padding: 18px 20px;
    }

    .day-description {
      font-size: 13px;
      color: #475569;
      line-height: 1.7;
      margin-bottom: 14px;
    }

    .day-card.summit .day-description {
      color: rgba(255,255,255,0.8);
    }

    .day-stats {
      display: flex;
      gap: 24px;
      flex-wrap: wrap;
      padding-top: 14px;
      border-top: 1px solid #e2e8f0;
    }

    .day-card.summit .day-stats {
      border-top-color: rgba(255,255,255,0.1);
    }

    .day-stat-item {
      display: flex;
      flex-direction: column;
    }

    .day-stat-item strong {
      font-size: 13px;
      font-family: 'Outfit', sans-serif;
      font-weight: 600;
      color: #1e293b;
      line-height: 1.3;
    }

    .day-card.summit .day-stat-item strong {
      color: #F59E0B;
    }

    .day-stat-item span {
      font-size: 10px;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-weight: 600;
    }

    .day-card.summit .day-stat-item span {
      color: rgba(255,255,255,0.5);
    }

    /* ===== INCLUSIONS ===== */
    .inclusions-section {
      margin-top: 36px;
      margin-bottom: 36px;
    }

    .inclusions-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }

    .inclusions-col {}

    .inc-heading {
      font-size: 14px;
      font-weight: 700;
      margin-bottom: 14px;
      padding-bottom: 10px;
      border-bottom: 2px solid #e2e8f0;
    }

    .inc-heading.inc-included { color: #16a34a; }
    .inc-heading.inc-excluded { color: #dc2626; }

    .inc-list {
      list-style: none;
      padding: 0;
    }

    .inc-list li {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 8px 0;
      font-size: 12.5px;
      color: #475569;
      border-bottom: 1px solid #f1f5f9;
      line-height: 1.5;
    }

    .inc-list li:last-child {
      border-bottom: none;
    }

    .inc-icon {
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      font-size: 11px;
      font-weight: 700;
      margin-top: 1px;
    }

    .inc-icon.included {
      background: #dcfce7;
      color: #16a34a;
    }

    .inc-icon.excluded {
      background: #fee2e2;
      color: #dc2626;
    }

    /* ===== CTA SECTION ===== */
    .cta-section {
      margin-top: 40px;
      background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
      border-radius: 16px;
      padding: 36px 32px;
      text-align: center;
      color: white;
      page-break-inside: avoid;
    }

    .cta-section h2 {
      font-size: 22px;
      font-weight: 700;
      margin-bottom: 8px;
    }

    .cta-section .cta-subtitle {
      font-size: 14px;
      color: rgba(255,255,255,0.7);
      margin-bottom: 24px;
    }

    .cta-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 16px;
      margin-bottom: 24px;
    }

    .cta-item {
      background: rgba(255,255,255,0.08);
      border-radius: 12px;
      padding: 16px 12px;
    }

    .cta-item .cta-icon {
      font-size: 20px;
      margin-bottom: 6px;
    }

    .cta-item .cta-label {
      font-size: 11px;
      color: rgba(255,255,255,0.6);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .cta-item .cta-value {
      font-family: 'Outfit', sans-serif;
      font-size: 14px;
      font-weight: 600;
      color: #F59E0B;
      margin-top: 2px;
    }

    .cta-divider {
      height: 1px;
      background: rgba(255,255,255,0.1);
      margin-bottom: 20px;
    }

    .cta-website {
      font-size: 13px;
      color: #F59E0B;
      font-weight: 600;
      text-decoration: none;
    }

    /* ===== FOOTER ===== */
    .footer {
      margin-top: 32px;
      padding: 20px 0;
      text-align: center;
      color: #94a3b8;
      font-size: 11px;
      border-top: 1px solid #e2e8f0;
    }

    .footer a {
      color: #F59E0B;
      text-decoration: none;
    }

    .footer p {
      margin: 3px 0;
    }

    /* ===== PRINT STYLES ===== */
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

  <!-- COVER HEADER -->
  <div class="cover-header">
    ${logoHtml}
    <div class="cover-label">Full Itinerary</div>
    <h1 class="cover-title">${routeTitle}</h1>
    <p class="cover-subtitle">${days.length}-Day Kilimanjaro Trekking Adventure</p>
  </div>

  <!-- STATS BAR -->
  <div class="stats-bar">
    <div class="stat-box">
      <span class="stat-value">${days.length}</span>
      <span class="stat-label">Days</span>
    </div>
    <div class="stat-box featured">
      <span class="stat-value">5,895m</span>
      <span class="stat-label">Summit</span>
    </div>
    <div class="stat-box">
      <span class="stat-value">${maxElevation.toLocaleString()}m</span>
      <span class="stat-label">Max Elevation</span>
    </div>
    ${difficulty ? `<div class="stat-box"><span class="stat-value">${difficulty}</span><span class="stat-label">Difficulty</span></div>` : ""}
    ${successRate ? `<div class="stat-box"><span class="stat-value">${successRate}%</span><span class="stat-label">Success Rate</span></div>` : ""}
  </div>

  <!-- INTRO / OVERVIEW -->
  ${overview ? `
  <div class="intro-section">
    <h2>About This Route</h2>
    <p>${overview}</p>
  </div>` : ""}

  <!-- HIGHLIGHTS -->
  ${highlightsHtml}

  <!-- DAY-BY-DAY ITINERARY -->
  <div class="itinerary-header">
    <span class="section-icon">&#128197;</span>
    <h2>Day-by-Day Itinerary</h2>
  </div>

  ${days.map((day, index) => {
    const badge = getDayBadge(day, index, days.length);
    const isSummit = day.title.toLowerCase().includes("summit") || day.title.toLowerCase().includes("uhuru");
    return `
    <div class="day-card${isSummit ? " summit" : ""}">
      <div class="day-header">
        <div class="day-number">${day.day}</div>
        <div class="day-title-group">
          <div class="day-title">${day.title}</div>
          ${day.meals ? `<div class="day-meals">&#127860; ${day.meals}</div>` : ""}
        </div>
        ${badge ? `<div class="day-badge">${badge}</div>` : ""}
      </div>
      <div class="day-content">
        <p class="day-description">${day.description}</p>
        <div class="day-stats">
          ${day.elevation ? `<div class="day-stat-item"><strong>${day.elevation}</strong><span>Elevation</span></div>` : ""}
          ${day.distance ? `<div class="day-stat-item"><strong>${day.distance}</strong><span>Distance</span></div>` : ""}
          ${day.duration ? `<div class="day-stat-item"><strong>${day.duration}</strong><span>Duration</span></div>` : ""}
          ${day.camp ? `<div class="day-stat-item"><strong>${day.camp}</strong><span>Camp</span></div>` : ""}
        </div>
      </div>
    </div>`;
  }).join("")}

  <!-- INCLUSIONS / EXCLUSIONS -->
  ${inclusionsHtml}

  <!-- CONTACT CTA -->
  <div class="cta-section">
    <h2>Ready to Conquer Kilimanjaro?</h2>
    <p class="cta-subtitle">Our expert team is ready to help you plan your adventure</p>
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
    <a href="${routeUrl}" class="cta-website">View this itinerary online &rarr;</a>
  </div>

  <!-- FOOTER -->
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
