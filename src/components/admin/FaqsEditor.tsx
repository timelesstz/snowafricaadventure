"use client";

import { useState } from "react";
import { Plus, Trash2, ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqsEditor({
  name,
  defaultValue,
}: {
  name: string;
  defaultValue?: FaqItem[] | null;
}) {
  const [faqs, setFaqs] = useState<FaqItem[]>(() => {
    if (Array.isArray(defaultValue) && defaultValue.length > 0) return defaultValue;
    return [];
  });
  const [expandedIndex, setExpandedIndex] = useState<number | null>(
    faqs.length > 0 ? 0 : null
  );

  const serialized = faqs.length > 0 ? JSON.stringify(faqs) : "";

  function addFaq() {
    setFaqs([...faqs, { question: "", answer: "" }]);
    setExpandedIndex(faqs.length);
  }

  function removeFaq(index: number) {
    const updated = faqs.filter((_, i) => i !== index);
    setFaqs(updated);
    if (expandedIndex === index) setExpandedIndex(null);
    else if (expandedIndex !== null && expandedIndex > index) {
      setExpandedIndex(expandedIndex - 1);
    }
  }

  function moveFaq(index: number, direction: "up" | "down") {
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= faqs.length) return;
    const updated = [...faqs];
    [updated[index], updated[target]] = [updated[target], updated[index]];
    setFaqs(updated);
    setExpandedIndex(target);
  }

  function updateFaq(index: number, field: keyof FaqItem, value: string) {
    const updated = [...faqs];
    updated[index] = { ...updated[index], [field]: value };
    setFaqs(updated);
  }

  return (
    <div className="space-y-4">
      <input type="hidden" name={name} value={serialized} />

      {faqs.length === 0 && (
        <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-xl">
          <HelpCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 mb-4">No FAQs yet</p>
          <button
            type="button"
            onClick={addFaq}
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Add First FAQ
          </button>
        </div>
      )}

      {faqs.map((faq, index) => {
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
                  onClick={(e) => { e.stopPropagation(); moveFaq(index, "up"); }}
                  disabled={index === 0}
                  className="text-slate-400 hover:text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); moveFaq(index, "down"); }}
                  disabled={index === faqs.length - 1}
                  className="text-slate-400 hover:text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>

              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 text-sm font-bold shrink-0">
                Q{index + 1}
              </span>

              <div className="flex-1 min-w-0">
                <span className="font-medium text-slate-900 truncate block">
                  {faq.question || <span className="text-slate-400 italic">Untitled question</span>}
                </span>
              </div>

              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); removeFaq(index); }}
                className="text-slate-400 hover:text-red-500 p-1"
                title="Remove FAQ"
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
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Question *
                  </label>
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => updateFaq(index, "question", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                    placeholder="e.g., How difficult is this route?"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Answer *
                  </label>
                  <textarea
                    value={faq.answer}
                    onChange={(e) => updateFaq(index, "answer", e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                    placeholder="Write a detailed answer..."
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}

      {faqs.length > 0 && (
        <button
          type="button"
          onClick={addFaq}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 hover:border-amber-400 hover:text-amber-600 transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Add FAQ
        </button>
      )}
    </div>
  );
}
