"use client";

import { useState } from "react";
import {
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  DollarSign,
  Star,
} from "lucide-react";

interface PriceTier {
  groupSize: string;
  description: string;
  price: number;
  savings?: number;
  featured?: boolean;
}

const DEFAULT_TIERS: PriceTier[] = [
  { groupSize: "1 Person", description: "Private climb experience", price: 3250 },
  { groupSize: "2-4 People", description: "Small group adventure", price: 2450, savings: 800, featured: true },
  { groupSize: "5-7 People", description: "Medium group savings", price: 2250, savings: 1000 },
  { groupSize: "8-10 People", description: "Large group discount", price: 2050, savings: 1200 },
  { groupSize: "11 & Above", description: "Best value for groups", price: 1950, savings: 1300 },
];

export default function PricingTiersEditor({
  name,
  defaultValue,
}: {
  name: string;
  defaultValue?: PriceTier[] | null;
}) {
  const [tiers, setTiers] = useState<PriceTier[]>(() => {
    if (Array.isArray(defaultValue) && defaultValue.length > 0)
      return defaultValue;
    return [];
  });

  const serialized = tiers.length > 0 ? JSON.stringify(tiers) : "";

  function addTier() {
    setTiers([
      ...tiers,
      { groupSize: "", description: "", price: 0 },
    ]);
  }

  function removeTier(index: number) {
    setTiers(tiers.filter((_, i) => i !== index));
  }

  function moveTier(index: number, direction: "up" | "down") {
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= tiers.length) return;
    const updated = [...tiers];
    [updated[index], updated[target]] = [updated[target], updated[index]];
    setTiers(updated);
  }

  function updateTier(index: number, field: keyof PriceTier, value: string | number | boolean) {
    const updated = [...tiers];
    if (field === "price" || field === "savings") {
      updated[index] = { ...updated[index], [field]: typeof value === "string" ? parseInt(value) || 0 : value };
    } else if (field === "featured") {
      // Only one tier can be featured
      updated.forEach((t, i) => {
        updated[i] = { ...t, featured: i === index ? !t.featured : false };
      });
    } else {
      updated[index] = { ...updated[index], [field]: value };
    }
    setTiers(updated);
  }

  function loadDefaults() {
    setTiers(DEFAULT_TIERS);
  }

  return (
    <div className="space-y-4">
      <input type="hidden" name={name} value={serialized} />

      {tiers.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl">
          <DollarSign className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 text-sm mb-4">No pricing tiers yet</p>
          <button
            type="button"
            onClick={loadDefaults}
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 text-sm font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            Load Default Pricing
          </button>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="grid grid-cols-[40px_1fr_1fr_100px_100px_40px_40px] gap-2 px-2 text-xs font-medium text-slate-500 uppercase tracking-wider">
            <span />
            <span>Group Size</span>
            <span>Description</span>
            <span>Price ($)</span>
            <span>Savings ($)</span>
            <span title="Featured">
              <Star className="w-3.5 h-3.5" />
            </span>
            <span />
          </div>

          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`grid grid-cols-[40px_1fr_1fr_100px_100px_40px_40px] gap-2 items-center px-2 py-2 rounded-lg border transition-all ${
                tier.featured
                  ? "border-amber-200 bg-amber-50/50"
                  : "border-slate-200 bg-white"
              }`}
            >
              {/* Move */}
              <div className="flex flex-col gap-0.5">
                <button
                  type="button"
                  onClick={() => moveTier(index, "up")}
                  disabled={index === 0}
                  className="text-slate-400 hover:text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => moveTier(index, "down")}
                  disabled={index === tiers.length - 1}
                  className="text-slate-400 hover:text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Group Size */}
              <input
                type="text"
                value={tier.groupSize}
                onChange={(e) => updateTier(index, "groupSize", e.target.value)}
                placeholder="e.g. 2-4 People"
                className="px-2 py-1.5 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none w-full"
              />

              {/* Description */}
              <input
                type="text"
                value={tier.description}
                onChange={(e) => updateTier(index, "description", e.target.value)}
                placeholder="e.g. Small group adventure"
                className="px-2 py-1.5 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none w-full"
              />

              {/* Price */}
              <input
                type="number"
                min="0"
                value={tier.price || ""}
                onChange={(e) => updateTier(index, "price", e.target.value)}
                placeholder="2450"
                className="px-2 py-1.5 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none w-full"
              />

              {/* Savings */}
              <input
                type="number"
                min="0"
                value={tier.savings || ""}
                onChange={(e) => updateTier(index, "savings", e.target.value)}
                placeholder="800"
                className="px-2 py-1.5 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none w-full"
              />

              {/* Featured toggle */}
              <button
                type="button"
                onClick={() => updateTier(index, "featured", true)}
                className={`p-1.5 rounded-md transition-colors ${
                  tier.featured
                    ? "text-amber-600 bg-amber-100"
                    : "text-slate-300 hover:text-amber-500 hover:bg-amber-50"
                }`}
                title="Mark as featured/most popular"
              >
                <Star className="w-4 h-4" fill={tier.featured ? "currentColor" : "none"} />
              </button>

              {/* Delete */}
              <button
                type="button"
                onClick={() => removeTier(index)}
                className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                title="Remove tier"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </>
      )}

      {/* Actions */}
      {tiers.length > 0 && (
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={addTier}
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 text-sm font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Tier
          </button>
          <button
            type="button"
            onClick={loadDefaults}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 text-sm font-medium transition-colors"
          >
            Reset to Defaults
          </button>
          <span className="text-xs text-slate-500 ml-auto">
            {tiers.length} tier{tiers.length !== 1 ? "s" : ""}
          </span>
        </div>
      )}
    </div>
  );
}
