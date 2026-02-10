"use client";

import { useState } from "react";
import { Plus, Trash2, ChevronDown, ChevronUp, MapPin, Star } from "lucide-react";
import ImageUploadField from "./ImageUploadField";

interface SafariDay {
  day: number;
  title: string;
  description: string;
  location?: string;
  accommodation?: string;
  meals?: string;
  highlights?: string[];
  image?: string;
  isFeatured?: boolean;
}

const EMPTY_DAY: SafariDay = {
  day: 1,
  title: "",
  description: "",
  location: "",
  accommodation: "",
  meals: "",
  highlights: [],
  image: "",
  isFeatured: false,
};

export default function SafariItineraryEditor({
  name,
  defaultValue,
}: {
  name: string;
  defaultValue?: SafariDay[] | null;
}) {
  const [days, setDays] = useState<SafariDay[]>(() => {
    if (Array.isArray(defaultValue) && defaultValue.length > 0) return defaultValue;
    return [];
  });
  const [expandedIndex, setExpandedIndex] = useState<number | null>(
    days.length > 0 ? 0 : null
  );
  const [highlightInput, setHighlightInput] = useState<Record<number, string>>({});

  const serialized = days.length > 0 ? JSON.stringify(days) : "";

  function addDay() {
    const newDay: SafariDay = { ...EMPTY_DAY, day: days.length + 1 };
    setDays([...days, newDay]);
    setExpandedIndex(days.length);
  }

  function removeDay(index: number) {
    const updated = days
      .filter((_, i) => i !== index)
      .map((d, i) => ({ ...d, day: i + 1 }));
    setDays(updated);
    if (expandedIndex === index) setExpandedIndex(null);
    else if (expandedIndex !== null && expandedIndex > index) {
      setExpandedIndex(expandedIndex - 1);
    }
  }

  function moveDay(index: number, direction: "up" | "down") {
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= days.length) return;
    const updated = [...days];
    [updated[index], updated[target]] = [updated[target], updated[index]];
    setDays(updated.map((d, i) => ({ ...d, day: i + 1 })));
    setExpandedIndex(target);
  }

  function updateDay(index: number, field: keyof SafariDay, value: string | string[] | boolean) {
    const updated = [...days];
    updated[index] = { ...updated[index], [field]: value };
    setDays(updated);
  }

  function addHighlight(index: number) {
    const text = (highlightInput[index] || "").trim();
    if (!text) return;
    const current = days[index].highlights || [];
    if (!current.includes(text)) {
      updateDay(index, "highlights", [...current, text]);
    }
    setHighlightInput({ ...highlightInput, [index]: "" });
  }

  function removeHighlight(dayIndex: number, highlightIndex: number) {
    const current = days[dayIndex].highlights || [];
    updateDay(dayIndex, "highlights", current.filter((_, i) => i !== highlightIndex));
  }

  return (
    <div className="space-y-4">
      <input type="hidden" name={name} value={serialized} />

      {days.length === 0 && (
        <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-xl">
          <MapPin className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 mb-4">No itinerary days yet</p>
          <button
            type="button"
            onClick={addDay}
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Day 1
          </button>
        </div>
      )}

      {days.map((day, index) => {
        const isExpanded = expandedIndex === index;
        return (
          <div
            key={index}
            className={`border rounded-xl transition-all ${
              isExpanded
                ? "border-amber-300 bg-amber-50/30 shadow-sm"
                : day.isFeatured
                  ? "border-amber-200 bg-amber-50/10 hover:border-amber-300"
                  : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-3 cursor-pointer select-none"
              onClick={() => setExpandedIndex(isExpanded ? null : index)}
            >
              <div className="flex flex-col gap-0.5">
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); moveDay(index, "up"); }}
                  disabled={index === 0}
                  className="text-slate-400 hover:text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); moveDay(index, "down"); }}
                  disabled={index === days.length - 1}
                  className="text-slate-400 hover:text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>

              <span className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold shrink-0 ${
                day.isFeatured ? "bg-amber-500 text-white" : "bg-amber-100 text-amber-700"
              }`}>
                {day.day}
              </span>

              <div className="flex-1 min-w-0">
                <span className="font-medium text-slate-900 truncate block">
                  {day.isFeatured && <Star className="w-3.5 h-3.5 inline text-amber-500 mr-1 -mt-0.5" />}
                  {day.title || <span className="text-slate-400 italic">Untitled day</span>}
                </span>
                {(day.location || day.accommodation) && (
                  <span className="text-xs text-slate-500">
                    {[day.location, day.accommodation].filter(Boolean).join(" — ")}
                  </span>
                )}
              </div>

              {day.meals && (
                <span className="hidden sm:block text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
                  {day.meals}
                </span>
              )}

              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); removeDay(index); }}
                className="text-slate-400 hover:text-red-500 p-1"
                title="Remove day"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* Expanded Fields */}
            {isExpanded && (
              <div className="px-4 pb-5 pt-2 border-t border-slate-100 space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={day.title}
                    onChange={(e) => updateDay(index, "title", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                    placeholder="e.g., Arrival in Arusha"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Description *
                  </label>
                  <textarea
                    value={day.description}
                    onChange={(e) => updateDay(index, "description", e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                    placeholder="Describe the day's activities..."
                  />
                </div>

                {/* Location, Accommodation, Meals */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={day.location || ""}
                      onChange={(e) => updateDay(index, "location", e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                      placeholder="e.g., Serengeti"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Accommodation
                    </label>
                    <input
                      type="text"
                      value={day.accommodation || ""}
                      onChange={(e) => updateDay(index, "accommodation", e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                      placeholder="e.g., Serena Lodge"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Meals
                    </label>
                    <input
                      type="text"
                      value={day.meals || ""}
                      onChange={(e) => updateDay(index, "meals", e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                      placeholder="e.g., B, L, D"
                    />
                  </div>
                </div>

                {/* Day Image */}
                <ImageUploadField
                  name=""
                  value={day.image || null}
                  onChange={(url) => updateDay(index, "image", url || "")}
                  folder="safaris"
                  label="Day Image"
                  previewSize="sm"
                />

                {/* Highlights */}
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Highlights
                  </label>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {(day.highlights || []).map((h, hIdx) => (
                      <span
                        key={hIdx}
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium"
                      >
                        {h}
                        <button
                          type="button"
                          onClick={() => removeHighlight(index, hIdx)}
                          className="hover:text-red-600"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={highlightInput[index] || ""}
                      onChange={(e) => setHighlightInput({ ...highlightInput, [index]: e.target.value })}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addHighlight(index);
                        }
                      }}
                      className="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                      placeholder="Add highlight and press Enter"
                    />
                    <button
                      type="button"
                      onClick={() => addHighlight(index)}
                      className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-sm hover:bg-slate-200"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Featured toggle */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={day.isFeatured || false}
                    onChange={(e) => updateDay(index, "isFeatured", e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                  />
                  <span className="text-sm text-slate-700">Safari Highlight</span>
                  <span className="text-xs text-slate-400">(featured on timeline)</span>
                </label>
              </div>
            )}
          </div>
        );
      })}

      {days.length > 0 && (
        <button
          type="button"
          onClick={addDay}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 hover:border-amber-400 hover:text-amber-600 transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Add Day {days.length + 1}
        </button>
      )}
    </div>
  );
}
