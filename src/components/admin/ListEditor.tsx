"use client";

import { useState, useRef } from "react";
import { Plus, X, GripVertical, ChevronUp, ChevronDown } from "lucide-react";

interface ListEditorProps {
  name: string;
  defaultValue?: string[];
  placeholder?: string;
  variant?: "default" | "success" | "danger";
}

const variantStyles = {
  default: {
    chip: "bg-slate-100 text-slate-700 border-slate-200",
    chipHover: "hover:border-slate-300",
    icon: "text-slate-400 hover:text-slate-600",
    remove: "text-slate-400 hover:text-red-500",
  },
  success: {
    chip: "bg-emerald-50 text-emerald-800 border-emerald-200",
    chipHover: "hover:border-emerald-300",
    icon: "text-emerald-400 hover:text-emerald-600",
    remove: "text-emerald-400 hover:text-red-500",
  },
  danger: {
    chip: "bg-red-50 text-red-800 border-red-200",
    chipHover: "hover:border-red-300",
    icon: "text-red-400 hover:text-red-600",
    remove: "text-red-400 hover:text-red-600",
  },
};

export default function ListEditor({
  name,
  defaultValue,
  placeholder = "Type and press Enter to add",
  variant = "default",
}: ListEditorProps) {
  const [items, setItems] = useState<string[]>(
    () => defaultValue?.filter(Boolean) || []
  );
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const styles = variantStyles[variant];

  // Serialize as newline-separated for the server action
  const serialized = items.join("\n");

  function addItem() {
    const text = input.trim();
    if (!text) return;
    if (!items.includes(text)) {
      setItems([...items, text]);
    }
    setInput("");
    inputRef.current?.focus();
  }

  function removeItem(index: number) {
    setItems(items.filter((_, i) => i !== index));
  }

  function moveItem(index: number, direction: "up" | "down") {
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= items.length) return;
    const updated = [...items];
    [updated[index], updated[target]] = [updated[target], updated[index]];
    setItems(updated);
  }

  return (
    <div className="space-y-3">
      <input type="hidden" name={name} value={serialized} />

      {/* Item list */}
      {items.length > 0 && (
        <ul className="space-y-1.5">
          {items.map((item, index) => (
            <li
              key={index}
              className={`group flex items-center gap-2 px-3 py-2 border rounded-lg text-sm transition-colors ${styles.chip} ${styles.chipHover}`}
            >
              {/* Reorder buttons */}
              <div className="flex flex-col gap-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={() => moveItem(index, "up")}
                  disabled={index === 0}
                  className={`${styles.icon} disabled:opacity-20 disabled:cursor-not-allowed`}
                >
                  <ChevronUp className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={() => moveItem(index, "down")}
                  disabled={index === items.length - 1}
                  className={`${styles.icon} disabled:opacity-20 disabled:cursor-not-allowed`}
                >
                  <ChevronDown className="w-3 h-3" />
                </button>
              </div>

              <span className="flex-1">{item}</span>

              <button
                type="button"
                onClick={() => removeItem(index)}
                className={`${styles.remove} opacity-0 group-hover:opacity-100 transition-opacity p-0.5`}
                title="Remove"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Add input */}
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addItem();
            }
          }}
          className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={addItem}
          className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm hover:bg-slate-200 transition-colors font-medium"
        >
          <Plus className="w-3.5 h-3.5" />
          Add
        </button>
      </div>

      {items.length > 0 && (
        <p className="text-xs text-slate-400">{items.length} item{items.length !== 1 ? "s" : ""}</p>
      )}
    </div>
  );
}
