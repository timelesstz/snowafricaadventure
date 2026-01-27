"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-accordion space-y-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="border border-[var(--border)] rounded-xl overflow-hidden bg-white shadow-sm"
        >
          <button
            onClick={() => toggleItem(index)}
            className="w-full flex items-center justify-between p-5 text-left hover:bg-[var(--surface)] transition-colors"
            aria-expanded={openIndex === index}
          >
            <span className="font-semibold text-[var(--text)] pr-4">
              {item.question}
            </span>
            <ChevronDown
              className={`w-5 h-5 text-[var(--primary)] flex-shrink-0 transition-transform duration-200 ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-200 ${
              openIndex === index ? "max-h-96" : "max-h-0"
            }`}
          >
            <div className="p-5 pt-0 text-[var(--text-muted)] leading-relaxed border-t border-[var(--muted)]">
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Client-side script to initialize accordions from HTML
export function initFaqAccordions() {
  if (typeof window === "undefined") return;

  const faqContainers = document.querySelectorAll(".faq-container");
  faqContainers.forEach((container) => {
    const items = container.querySelectorAll(".faq-item");
    items.forEach((item, index) => {
      const button = item.querySelector(".faq-button");
      const content = item.querySelector(".faq-content");
      const icon = item.querySelector(".faq-icon");

      if (button && content && icon) {
        // Open first item by default
        if (index === 0) {
          content.classList.remove("max-h-0");
          content.classList.add("max-h-96");
          icon.classList.add("rotate-180");
        }

        button.addEventListener("click", () => {
          const isOpen = !content.classList.contains("max-h-0");

          // Close all items
          items.forEach((otherItem) => {
            const otherContent = otherItem.querySelector(".faq-content");
            const otherIcon = otherItem.querySelector(".faq-icon");
            if (otherContent && otherIcon) {
              otherContent.classList.add("max-h-0");
              otherContent.classList.remove("max-h-96");
              otherIcon.classList.remove("rotate-180");
            }
          });

          // Toggle current item
          if (!isOpen) {
            content.classList.remove("max-h-0");
            content.classList.add("max-h-96");
            icon.classList.add("rotate-180");
          }
        });
      }
    });
  });
}
