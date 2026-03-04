"use client";

import { clsx } from "clsx";

interface DateRangePickerProps {
  value: number; // days
  onChange: (days: number) => void;
}

const options = [
  { label: "7d", value: 7 },
  { label: "28d", value: 28 },
  { label: "3m", value: 90 },
  { label: "6m", value: 180 },
];

export default function DateRangePicker({ value, onChange }: DateRangePickerProps) {
  return (
    <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={clsx(
            "px-3 py-1.5 text-xs font-medium rounded-md transition-colors",
            value === opt.value
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
