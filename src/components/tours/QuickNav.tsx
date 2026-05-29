"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'highlights', label: 'Highlights' },
  { id: 'itinerary', label: 'Day by Day' },
  { id: 'inclusions', label: 'Inclusions' },
];

interface QuickNavProps {
  priceFrom?: number;
}

export function QuickNav({ priceFrom }: QuickNavProps) {
  const [activeSection, setActiveSection] = useState('overview');
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 500);

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
    <>
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

      {/* Mobile Sticky CTA Bar */}
      {isSticky && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-t border-[var(--border)] shadow-[0_-2px_10px_rgba(0,0,0,0.08)] px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            {priceFrom ? (
              <div>
                <div className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">From</div>
                <div className="font-heading font-bold text-[var(--primary)] text-lg leading-tight">
                  ${priceFrom.toLocaleString()}<span className="text-xs font-normal text-[var(--text-muted)]">/person</span>
                </div>
              </div>
            ) : (
              <div className="text-sm font-medium text-[var(--text)]">Ready to book?</div>
            )}
            <Link
              href="#book"
              className="px-6 py-2.5 bg-[var(--secondary)] text-white font-heading font-semibold rounded-sm hover:bg-[var(--secondary-dark)] transition-colors text-sm whitespace-nowrap"
            >
              Book This Safari
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
