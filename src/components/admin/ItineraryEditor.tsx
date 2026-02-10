"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, GripVertical, ChevronDown, ChevronUp, Mountain } from "lucide-react";
import ImageUploadField from "./ImageUploadField";

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

const EMPTY_DAY: ItineraryDay = {
  day: 1,
  title: "",
  description: "",
  elevation: "",
  distance: "",
  duration: "",
  camp: "",
  meals: "",
  tags: [],
  image: "",
};

export default function ItineraryEditor({
  name,
  defaultValue,
}: {
  name: string;
  defaultValue?: ItineraryDay[] | null;
}) {
  const [days, setDays] = useState<ItineraryDay[]>(() => {
    if (Array.isArray(defaultValue) && defaultValue.length > 0) return defaultValue;
    return [];
  });
  const [expandedIndex, setExpandedIndex] = useState<number | null>(
    days.length > 0 ? 0 : null
  );
  const [tagsInput, setTagsInput] = useState<Record<number, string>>({});

  // Serialize to hidden input
  const serialized = days.length > 0 ? JSON.stringify(days) : "";

  function addDay() {
    const newDay: ItineraryDay = {
      ...EMPTY_DAY,
      day: days.length + 1,
    };
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
    const renumbered = updated.map((d, i) => ({ ...d, day: i + 1 }));
    setDays(renumbered);
    setExpandedIndex(target);
  }

  function updateDay(index: number, field: keyof ItineraryDay, value: string | string[]) {
    const updated = [...days];
    updated[index] = { ...updated[index], [field]: value };
    setDays(updated);
  }

  function addTag(index: number) {
    const tag = (tagsInput[index] || "").trim();
    if (!tag) return;
    const current = days[index].tags || [];
    if (!current.includes(tag)) {
      updateDay(index, "tags", [...current, tag]);
    }
    setTagsInput({ ...tagsInput, [index]: "" });
  }

  function removeTag(dayIndex: number, tagIndex: number) {
    const current = days[dayIndex].tags || [];
    updateDay(dayIndex, "tags", current.filter((_, i) => i !== tagIndex));
  }

  return (
    <div className="space-y-4">
      <input type="hidden" name={name} value={serialized} />

      {days.length === 0 && (
        <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-xl">
          <Mountain className="w-10 h-10 text-slate-300 mx-auto mb-3" />
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

              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-700 text-sm font-bold shrink-0">
                {day.day}
              </span>

              <div className="flex-1 min-w-0">
                <span className="font-medium text-slate-900 truncate block">
                  {day.title || <span className="text-slate-400 italic">Untitled day</span>}
                </span>
                {day.camp && (
                  <span className="text-xs text-slate-500">{day.camp}</span>
                )}
              </div>

              {day.elevation && (
                <span className="hidden sm:block text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
                  {day.elevation}
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
                    placeholder="e.g., Marangu Gate to Mandara Hut"
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
                    placeholder="Describe the day's trek..."
                  />
                </div>

                {/* Grid: Elevation, Distance, Duration, Camp */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Elevation
                    </label>
                    <input
                      type="text"
                      value={day.elevation || ""}
                      onChange={(e) => updateDay(index, "elevation", e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                      placeholder="1,860m to 2,720m"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Distance
                    </label>
                    <input
                      type="text"
                      value={day.distance || ""}
                      onChange={(e) => updateDay(index, "distance", e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                      placeholder="8km"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={day.duration || ""}
                      onChange={(e) => updateDay(index, "duration", e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                      placeholder="3-5 hours"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Camp / Hut
                    </label>
                    <input
                      type="text"
                      value={day.camp || ""}
                      onChange={(e) => updateDay(index, "camp", e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                      placeholder="Mandara Hut"
                    />
                  </div>
                </div>

                {/* Meals */}
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Meals
                  </label>
                  <input
                    type="text"
                    value={day.meals || ""}
                    onChange={(e) => updateDay(index, "meals", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                    placeholder="Breakfast, Lunch, Dinner"
                  />
                </div>

                {/* Day Image */}
                <ImageUploadField
                  name=""
                  value={day.image || null}
                  onChange={(url) => updateDay(index, "image", url || "")}
                  folder="routes"
                  label="Day Image"
                  previewSize="sm"
                />

                {/* Tags */}
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {(day.tags || []).map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(index, tagIdx)}
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
                      value={tagsInput[index] || ""}
                      onChange={(e) => setTagsInput({ ...tagsInput, [index]: e.target.value })}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addTag(index);
                        }
                      }}
                      className="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                      placeholder="Add tag and press Enter"
                    />
                    <button
                      type="button"
                      onClick={() => addTag(index)}
                      className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-sm hover:bg-slate-200"
                    >
                      Add
                    </button>
                  </div>
                </div>
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
