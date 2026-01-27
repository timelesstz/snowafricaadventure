"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface NavItem {
  id: string;
  label: string;
}

interface RouteQuickNavProps {
  items?: NavItem[];
  price?: number;
  currency?: string;
}

const defaultItems: NavItem[] = [
  { id: "overview", label: "Overview" },
  { id: "itinerary", label: "Itinerary" },
  { id: "inclusions", label: "What's Included" },
  { id: "pricing", label: "Pricing" },
  { id: "departures", label: "Departures" },
  { id: "faqs", label: "FAQs" },
];

export function RouteQuickNav({
  items = defaultItems,
  price = 2450,
  currency = "USD",
}: RouteQuickNavProps) {
  const [activeSection, setActiveSection] = useState<string>("overview");
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if nav should be sticky
      setIsSticky(window.scrollY > 500);

      // Find active section
      const sections = items.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(items[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav
      className={`bg-white border-b border-[var(--border)] transition-all z-40 ${
        isSticky ? "sticky top-0 shadow-md" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Nav Tabs */}
          <div className="flex overflow-x-auto scrollbar-hide -mb-px">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-6 py-4 text-[0.9375rem] font-medium whitespace-nowrap border-b-[3px] transition-all ${
                  activeSection === item.id
                    ? "border-[var(--secondary)] text-[var(--secondary-dark)]"
                    : "border-transparent text-[var(--text-muted)] hover:text-[var(--primary)]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Price & CTA */}
          <div className="hidden md:flex items-center gap-4">
            <div className="text-right">
              <div className="text-xs text-[var(--text-muted)]">From</div>
              <div className="font-heading font-bold text-[var(--primary)]">
                ${price.toLocaleString()}/person
              </div>
            </div>
            <Link
              href="#inquiry-form"
              className="px-5 py-2.5 bg-[var(--secondary)] text-[var(--primary-dark)] font-heading font-semibold rounded-lg hover:bg-[var(--secondary-dark)] transition-colors"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
