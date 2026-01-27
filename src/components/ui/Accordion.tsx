"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function AccordionItem({
  title,
  children,
  defaultOpen = false,
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-[var(--border)]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 text-left hover:text-[var(--primary-dark)] transition-colors"
      >
        <span className="font-semibold text-lg">{title}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-[var(--text-light)] transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-200",
          isOpen ? "max-h-[2000px] pb-4" : "max-h-0"
        )}
      >
        {children}
      </div>
    </div>
  );
}

interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  elevation?: string;
  distance?: string;
  meals?: string;
  accommodation?: string;
}

interface ItineraryAccordionProps {
  days: ItineraryDay[];
}

export function ItineraryAccordion({ days }: ItineraryAccordionProps) {
  return (
    <div className="divide-y divide-[var(--border)] border-t border-[var(--border)]">
      {days.map((day, index) => (
        <AccordionItem
          key={day.day}
          title={`Day ${day.day}: ${day.title}`}
          defaultOpen={index === 0}
        >
          <div className="space-y-3 text-[var(--text-muted)]">
            <p>{day.description}</p>

            {(day.elevation || day.distance || day.meals || day.accommodation) && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3 border-t border-[var(--muted)]">
                {day.elevation && (
                  <div>
                    <span className="text-xs text-[var(--text-light)] uppercase tracking-wide">
                      Elevation
                    </span>
                    <p className="font-medium text-[var(--text)]">{day.elevation}</p>
                  </div>
                )}
                {day.distance && (
                  <div>
                    <span className="text-xs text-[var(--text-light)] uppercase tracking-wide">
                      Distance
                    </span>
                    <p className="font-medium text-[var(--text)]">{day.distance}</p>
                  </div>
                )}
                {day.meals && (
                  <div>
                    <span className="text-xs text-[var(--text-light)] uppercase tracking-wide">
                      Meals
                    </span>
                    <p className="font-medium text-[var(--text)]">{day.meals}</p>
                  </div>
                )}
                {day.accommodation && (
                  <div>
                    <span className="text-xs text-[var(--text-light)] uppercase tracking-wide">
                      Accommodation
                    </span>
                    <p className="font-medium text-[var(--text)]">{day.accommodation}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </AccordionItem>
      ))}
    </div>
  );
}
