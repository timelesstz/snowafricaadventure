"use client";

import { useState, useMemo } from "react";
import {
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Mountain,
  Sparkles,
  TrendingUp,
} from "lucide-react";

interface ElevationPoint {
  day: number;
  elevation: number;
  camp: string;
  label?: string;
}

interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  elevation?: string;
  distance?: string;
  duration?: string;
  camp?: string;
  meals?: string;
  tags?: string[];
  image?: string;
}

function extractFromItinerary(days: ItineraryDay[]): ElevationPoint[] {
  return days
    .filter((day) => day.elevation && day.camp)
    .map((day) => {
      const elevStr = day.elevation || "";
      const numbers = elevStr.match(/[\d,]+(?=m)/g) || [];
      const elevations = numbers.map((n) =>
        parseInt(n.replace(/,/g, ""), 10)
      );
      const maxElev = Math.max(...elevations, 0);
      return {
        day: day.day,
        elevation: maxElev || 0,
        camp: day.camp || "",
      };
    })
    .filter((p) => p.elevation > 0);
}

function generateElevationPath(
  points: ElevationPoint[],
  width: number,
  height: number
): { linePath: string; areaPath: string } {
  if (points.length < 2) return { linePath: "", areaPath: "" };

  const maxElev = Math.max(...points.map((p) => p.elevation));
  const minElev = Math.min(...points.map((p) => p.elevation));
  const elevRange = maxElev - minElev || 1;

  const padding = 20;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding;

  const getX = (index: number) =>
    padding + (index / (points.length - 1)) * chartWidth;
  const getY = (elev: number) =>
    chartHeight - ((elev - minElev) / elevRange) * (chartHeight - 20) + 10;

  const linePoints = points.map(
    (point, i) => `${getX(i)},${getY(point.elevation)}`
  );
  const linePath = `M${linePoints.join(" L")}`;
  const areaPath = `M${padding},${chartHeight} L${linePoints.join(" L")} L${getX(points.length - 1)},${chartHeight} Z`;

  return { linePath, areaPath };
}

export default function ElevationProfileEditor({
  name,
  defaultValue,
  itinerary,
}: {
  name: string;
  defaultValue?: ElevationPoint[] | null;
  itinerary?: ItineraryDay[] | null;
}) {
  const [points, setPoints] = useState<ElevationPoint[]>(() => {
    if (Array.isArray(defaultValue) && defaultValue.length > 0)
      return defaultValue;
    return [];
  });

  const serialized = points.length > 0 ? JSON.stringify(points) : "";

  const maxElevation = useMemo(() => {
    if (points.length === 0) return 0;
    return Math.max(...points.map((p) => p.elevation));
  }, [points]);

  const { linePath, areaPath } = useMemo(
    () => generateElevationPath(points, 700, 160),
    [points]
  );

  function addPoint() {
    const nextDay = points.length > 0 ? points[points.length - 1].day + 1 : 1;
    setPoints([...points, { day: nextDay, elevation: 0, camp: "" }]);
  }

  function removePoint(index: number) {
    setPoints(points.filter((_, i) => i !== index));
  }

  function movePoint(index: number, direction: "up" | "down") {
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= points.length) return;
    const updated = [...points];
    [updated[index], updated[target]] = [updated[target], updated[index]];
    setPoints(updated);
  }

  function updatePoint(
    index: number,
    field: keyof ElevationPoint,
    value: string | number
  ) {
    const updated = [...points];
    if (field === "day" || field === "elevation") {
      updated[index] = {
        ...updated[index],
        [field]: typeof value === "string" ? parseInt(value) || 0 : value,
      };
    } else {
      updated[index] = { ...updated[index], [field]: value };
    }
    setPoints(updated);
  }

  function generateFromItinerary() {
    if (!itinerary || itinerary.length === 0) return;
    const extracted = extractFromItinerary(itinerary);
    if (extracted.length > 0) setPoints(extracted);
  }

  return (
    <div className="space-y-4">
      <input type="hidden" name={name} value={serialized} />

      {/* Live SVG Preview */}
      {points.length > 1 ? (
        <div className="relative bg-gradient-to-b from-slate-50 to-white rounded-xl p-5 border border-slate-200 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" />
              Live Preview
            </span>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Camp
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-500" />
                Summit
              </span>
            </div>
          </div>

          <div className="relative h-[160px]">
            <svg
              viewBox="0 0 700 160"
              className="w-full h-full"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient
                  id="adminElevLine"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="50%" stopColor="#F59E0B" />
                  <stop offset="85%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
                <linearGradient
                  id="adminElevArea"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    stopColor="rgba(245, 158, 11, 0.15)"
                  />
                  <stop
                    offset="100%"
                    stopColor="rgba(245, 158, 11, 0)"
                  />
                </linearGradient>
              </defs>
              {areaPath && <path d={areaPath} fill="url(#adminElevArea)" />}
              {linePath && (
                <path
                  d={linePath}
                  fill="none"
                  stroke="url(#adminElevLine)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
            </svg>
          </div>

          {/* Markers */}
          <div className="flex justify-between px-3 -mt-2">
            {points.map((point, index) => {
              const isSummit = point.elevation === maxElevation && maxElevation > 0;
              return (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className={`rounded-full border-2 border-white shadow ${
                      isSummit
                        ? "w-4 h-4 bg-cyan-500"
                        : "w-3 h-3 bg-amber-500"
                    }`}
                  />
                  <span className="text-[10px] font-bold text-slate-700 mt-1">
                    {point.elevation > 0
                      ? `${point.elevation.toLocaleString()}m`
                      : "—"}
                  </span>
                  <span className="text-[9px] text-slate-500 truncate max-w-[60px] text-center">
                    {point.camp || `Day ${point.day}`}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl">
          <Mountain className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 text-sm">
            {points.length === 1
              ? "Add at least 2 points to see the elevation chart"
              : "No elevation points yet"}
          </p>
        </div>
      )}

      {/* Auto-Generate Button */}
      {itinerary && itinerary.length > 0 && points.length === 0 && (
        <button
          type="button"
          onClick={generateFromItinerary}
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 text-sm font-medium transition-colors"
        >
          <Sparkles className="w-4 h-4" />
          Generate from Itinerary
        </button>
      )}

      {/* Points Table */}
      {points.length > 0 && (
        <div className="space-y-2">
          {/* Header */}
          <div className="grid grid-cols-[40px_70px_100px_1fr_1fr_72px] gap-2 px-2 text-xs font-medium text-slate-500 uppercase tracking-wider">
            <span />
            <span>Day</span>
            <span>Elevation (m)</span>
            <span>Camp / Location</span>
            <span>Label</span>
            <span />
          </div>

          {points.map((point, index) => {
            const isSummit = point.elevation === maxElevation && maxElevation > 0;
            return (
              <div
                key={index}
                className={`grid grid-cols-[40px_70px_100px_1fr_1fr_72px] gap-2 items-center px-2 py-2 rounded-lg border transition-all ${
                  isSummit
                    ? "border-cyan-200 bg-cyan-50/50"
                    : "border-slate-200 bg-white"
                }`}
              >
                {/* Move buttons */}
                <div className="flex flex-col gap-0.5">
                  <button
                    type="button"
                    onClick={() => movePoint(index, "up")}
                    disabled={index === 0}
                    className="text-slate-400 hover:text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => movePoint(index, "down")}
                    disabled={index === points.length - 1}
                    className="text-slate-400 hover:text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Day */}
                <input
                  type="number"
                  min="1"
                  value={point.day}
                  onChange={(e) => updatePoint(index, "day", e.target.value)}
                  className="px-2 py-1.5 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none w-full"
                />

                {/* Elevation */}
                <input
                  type="number"
                  min="0"
                  max="8848"
                  value={point.elevation || ""}
                  onChange={(e) =>
                    updatePoint(index, "elevation", e.target.value)
                  }
                  placeholder="e.g. 2720"
                  className="px-2 py-1.5 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none w-full"
                />

                {/* Camp */}
                <input
                  type="text"
                  value={point.camp}
                  onChange={(e) => updatePoint(index, "camp", e.target.value)}
                  placeholder="e.g. Mandara Hut"
                  className="px-2 py-1.5 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none w-full"
                />

                {/* Label */}
                <input
                  type="text"
                  value={point.label || ""}
                  onChange={(e) => updatePoint(index, "label", e.target.value)}
                  placeholder="e.g. Summit!"
                  className="px-2 py-1.5 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none w-full"
                />

                {/* Delete */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => removePoint(index)}
                    className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                    title="Remove point"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={addPoint}
          className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Point
        </button>

        {itinerary && itinerary.length > 0 && points.length > 0 && (
          <button
            type="button"
            onClick={generateFromItinerary}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 text-sm font-medium transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            Regenerate from Itinerary
          </button>
        )}

        {points.length > 0 && (
          <span className="text-xs text-slate-500 ml-auto">
            {points.length} point{points.length !== 1 ? "s" : ""} · Max{" "}
            {maxElevation.toLocaleString()}m
          </span>
        )}
      </div>
    </div>
  );
}
