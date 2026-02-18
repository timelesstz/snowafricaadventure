"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Phone, Mail, Menu, X, Search, ChevronRight } from "lucide-react";
import { SITE_CONFIG, MAIN_NAV, TOP_NAV } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/theme-provider";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { logo } = useTheme();

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Bar */}
      <div className="bg-[var(--primary-dark)] text-white">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between py-1">
            {/* Contact Info */}
            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-1 hover:text-[var(--secondary)] transition-colors"
                aria-label={`Call us: ${SITE_CONFIG.phone}`}
              >
                <Phone className="h-3 w-3" />
                <span className="text-[10px] sm:text-xs">{SITE_CONFIG.phone}</span>
              </a>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="hidden sm:flex items-center gap-1 hover:text-[var(--secondary)] transition-colors"
                aria-label={`Email us: ${SITE_CONFIG.email}`}
              >
                <Mail className="h-3 w-3" />
                <span className="text-[10px] sm:text-xs">{SITE_CONFIG.email}</span>
              </a>
            </div>

            {/* Top Nav Links */}
            <nav className="hidden md:flex items-center gap-0.5">
              {TOP_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-1.5 lg:px-2 py-0.5 hover:text-[var(--secondary)] transition-colors rounded text-[10px] sm:text-xs"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-1.5 shrink-0">
              {logo.logoUrl ? (
                <Image
                  src={logo.logoUrl}
                  alt={SITE_CONFIG.name}
                  width={140}
                  height={40}
                  className="h-7 sm:h-9 w-auto object-contain"
                  priority
                />
              ) : (
                <>
                  <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[var(--primary)] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs sm:text-sm">SA</span>
                  </div>
                  <div>
                    <div className="font-heading font-bold text-xs sm:text-sm leading-tight text-[var(--text)]">
                      Snow Africa
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-[var(--text-muted)] -mt-0.5">Adventure</div>
                  </div>
                </>
              )}
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center">
              {MAIN_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 xl:px-4 py-2 text-sm text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--surface)] rounded-md transition-colors font-medium whitespace-nowrap"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right side: CTA + Search + Menu */}
            <div className="flex items-center gap-1 sm:gap-2">
              <Link
                href="/tailor-made-safari/"
                className="bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-white px-2.5 py-1.5 sm:px-3 sm:py-1.5 lg:px-4 lg:py-2 rounded-md font-semibold transition-colors text-xs sm:text-sm"
              >
                Plan Your Trip
              </Link>
              <Link
                href="/search/"
                className="p-2 text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--surface)] rounded-md transition-colors"
                aria-label="Search"
              >
                <Search className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-[var(--text)] rounded-md hover:bg-[var(--surface)] transition-colors"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen ? "true" : "false"}
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                ) : (
                  <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "lg:hidden border-t border-[var(--border)] overflow-hidden transition-all duration-300 ease-in-out",
            mobileMenuOpen ? "max-h-[calc(100dvh-8rem)] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <nav className="container mx-auto px-4 py-3 overflow-y-auto max-h-[calc(100dvh-9rem)]">
            {/* Main Navigation */}
            <div className="space-y-0.5">
              {MAIN_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-3 text-[var(--text)] hover:bg-[var(--surface)] rounded-lg font-medium transition-colors"
                >
                  {item.label}
                  <ChevronRight className="h-4 w-4 text-[var(--text-light)]" />
                </Link>
              ))}
            </div>

            {/* Divider */}
            <div className="my-3 border-t border-[var(--border)]" />

            {/* Secondary Navigation */}
            <div className="space-y-0.5">
              {TOP_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 text-sm text-[var(--text-muted)] hover:bg-[var(--surface)] hover:text-[var(--text)] rounded-lg transition-colors"
                >
                  {item.label}
                  <ChevronRight className="h-3.5 w-3.5 text-[var(--text-light)]" />
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="mt-4">
              <Link
                href="/tailor-made-safari/"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-white px-5 py-3 rounded-lg font-semibold transition-colors"
              >
                Plan Your Trip
              </Link>
            </div>

            {/* Contact Info in Mobile Menu */}
            <div className="mt-4 pt-3 border-t border-[var(--border)]">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                <a
                  href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--text-muted)] hover:text-[var(--primary)] rounded-lg hover:bg-[var(--surface)] transition-colors"
                >
                  <Phone className="h-4 w-4 text-[var(--secondary)]" />
                  {SITE_CONFIG.phone}
                </a>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--text-muted)] hover:text-[var(--primary)] rounded-lg hover:bg-[var(--surface)] transition-colors"
                >
                  <Mail className="h-4 w-4 text-[var(--secondary)]" />
                  {SITE_CONFIG.email}
                </a>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
