"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'highlights', label: 'Highlights' },
  { id: 'itinerary', label: 'Day by Day' },
  { id: 'inclusions', label: 'Inclusions' },
];

export function QuickNav() {
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => ({
        id: item.id,
        element: document.getElementById(item.id),
      }));

      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element && section.element.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-[var(--border)] shadow-sm">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Nav Links */}
          <div className="hidden md:flex gap-8">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={`#${item.id}`}
                className={`
                  py-4 font-heading text-sm font-medium border-b-2 transition-all
                  ${activeSection === item.id
                    ? 'text-[var(--text)] border-[var(--secondary)]'
                    : 'text-[var(--text-muted)] border-transparent hover:text-[var(--text)]'
                  }
                `}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="py-3">
            <Link
              href="#book"
              className="inline-flex items-center justify-center px-6 py-2.5 bg-[var(--secondary)] text-white font-heading text-sm font-semibold rounded-sm hover:bg-[var(--secondary-dark)] transition-colors"
            >
              Book This Safari
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
