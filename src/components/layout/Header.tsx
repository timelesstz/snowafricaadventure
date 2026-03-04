"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  Phone,
  Mail,
  Menu,
  X,
  Search,
  ChevronRight,
  ChevronDown,
  Mountain,
  Map,
  Compass,
  TreePalm,
  Users,
  Calendar,
  DollarSign,
  Clock,
  Binoculars,
  Palmtree,
  Sun,
} from "lucide-react";
import {
  SITE_CONFIG,
  MEGA_NAV,
  SIMPLE_NAV,
  GROUP_CLIMB_NAV,
  TOP_NAV,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/theme-provider";

// Icons for mega menu items
const MEGA_ICONS: Record<string, React.ElementType> = {
  "/tanzania-safaris/": Binoculars,
  "/tailor-made-safari/": Compass,
  "/tanzania-destinations/": Map,
  "/tanzania-day-tours/": Sun,
  "/trekking/": Mountain,
  "/best-route-to-climb-kilimanjaro/": Compass,
  "/climbing-kilimanjaro/": Mountain,
  "/kilimanjaro-prices/": DollarSign,
  "/best-time-to-climb-kilimanjaro/": Clock,
};

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMega, setOpenMega] = useState<string | null>(null);
  const [openMobileSub, setOpenMobileSub] = useState<string | null>(null);
  const { logo } = useTheme();
  const megaTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);

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

  // Close mega menu on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMega(null);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const handleMegaEnter = useCallback((label: string) => {
    if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current);
    setOpenMega(label);
  }, []);

  const handleMegaLeave = useCallback(() => {
    megaTimeoutRef.current = setTimeout(() => setOpenMega(null), 200);
  }, []);

  const closeMobile = useCallback(() => {
    setMobileMenuOpen(false);
    setOpenMobileSub(null);
  }, []);

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
                <span className="text-[10px] sm:text-xs">
                  {SITE_CONFIG.phone}
                </span>
              </a>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="hidden sm:flex items-center gap-1 hover:text-[var(--secondary)] transition-colors"
                aria-label={`Email us: ${SITE_CONFIG.email}`}
              >
                <Mail className="h-3 w-3" />
                <span className="text-[10px] sm:text-xs">
                  {SITE_CONFIG.email}
                </span>
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
                    <span className="text-white font-bold text-xs sm:text-sm">
                      SA
                    </span>
                  </div>
                  <div>
                    <div className="font-heading font-bold text-xs sm:text-sm leading-tight text-[var(--text)]">
                      Snow Africa
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-[var(--text-muted)] -mt-0.5">
                      Adventure
                    </div>
                  </div>
                </>
              )}
            </Link>

            {/* Desktop Navigation */}
            <nav
              ref={navRef}
              className="hidden lg:flex items-center"
            >
              {/* Home */}
              <Link
                href="/"
                className="px-3 xl:px-4 py-2 text-sm text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--surface)] rounded-md transition-colors font-medium"
              >
                Home
              </Link>

              {/* Mega Menu Items */}
              {MEGA_NAV.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => handleMegaEnter(item.label)}
                  onMouseLeave={handleMegaLeave}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1 px-3 xl:px-4 py-2 text-sm font-medium rounded-md transition-colors",
                      openMega === item.label
                        ? "text-[var(--primary)] bg-[var(--surface)]"
                        : "text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--surface)]"
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-200",
                        openMega === item.label && "rotate-180"
                      )}
                    />
                  </Link>

                  {/* Mega Dropdown */}
                  <div
                    className={cn(
                      "absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-200",
                      openMega === item.label
                        ? "opacity-100 visible translate-y-0"
                        : "opacity-0 invisible -translate-y-1"
                    )}
                    onMouseEnter={() => handleMegaEnter(item.label)}
                    onMouseLeave={handleMegaLeave}
                  >
                    <div className="bg-white rounded-xl shadow-xl border border-[var(--border)] p-4 min-w-[320px]">
                      <div className="space-y-1">
                        {item.children.map((child) => {
                          const Icon = MEGA_ICONS[child.href] || ChevronRight;
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-[var(--surface)] transition-colors group"
                              onClick={() => setOpenMega(null)}
                            >
                              <div className="mt-0.5 p-1.5 rounded-md bg-[var(--surface)] group-hover:bg-[var(--primary-light)] transition-colors">
                                <Icon className="h-4 w-4 text-[var(--primary)]" />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-[var(--text)] group-hover:text-[var(--primary)] transition-colors">
                                  {child.label}
                                </div>
                                {child.description && (
                                  <div className="text-xs text-[var(--text-muted)] mt-0.5">
                                    {child.description}
                                  </div>
                                )}
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Join Group Climb — Highlighted */}
              <Link
                href={GROUP_CLIMB_NAV.href}
                className="flex items-center gap-1.5 mx-1 px-3 xl:px-4 py-1.5 text-sm font-semibold rounded-md transition-all bg-[var(--secondary)]/10 text-[var(--secondary-dark,#b8860b)] border border-[var(--secondary)]/30 hover:bg-[var(--secondary)] hover:text-white hover:border-[var(--secondary)]"
              >
                <Users className="h-3.5 w-3.5" />
                {GROUP_CLIMB_NAV.label}
              </Link>

              {/* Simple Links */}
              {SIMPLE_NAV.map((item) => (
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
            mobileMenuOpen
              ? "max-h-[calc(100dvh-8rem)] opacity-100"
              : "max-h-0 opacity-0"
          )}
        >
          <nav className="container mx-auto px-4 py-3 overflow-y-auto max-h-[calc(100dvh-9rem)]">
            {/* Home */}
            <Link
              href="/"
              onClick={closeMobile}
              className="flex items-center justify-between px-3 py-3 text-[var(--text)] hover:bg-[var(--surface)] rounded-lg font-medium transition-colors"
            >
              Home
              <ChevronRight className="h-4 w-4 text-[var(--text-light)]" />
            </Link>

            {/* Mega Menu Sections — Accordion */}
            {MEGA_NAV.map((section) => (
              <div key={section.label}>
                <button
                  type="button"
                  onClick={() =>
                    setOpenMobileSub(
                      openMobileSub === section.label ? null : section.label
                    )
                  }
                  className="flex items-center justify-between w-full px-3 py-3 text-[var(--text)] hover:bg-[var(--surface)] rounded-lg font-medium transition-colors"
                >
                  {section.label}
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-[var(--text-light)] transition-transform duration-200",
                      openMobileSub === section.label && "rotate-180"
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-200",
                    openMobileSub === section.label
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  )}
                >
                  <div className="pl-4 pb-1 space-y-0.5">
                    {section.children.map((child) => {
                      const Icon = MEGA_ICONS[child.href] || ChevronRight;
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={closeMobile}
                          className="flex items-center gap-3 px-3 py-2.5 text-sm text-[var(--text-muted)] hover:bg-[var(--surface)] hover:text-[var(--text)] rounded-lg transition-colors"
                        >
                          <Icon className="h-4 w-4 text-[var(--primary)] shrink-0" />
                          <div>
                            <div className="font-medium">{child.label}</div>
                            {child.description && (
                              <div className="text-xs text-[var(--text-light)]">
                                {child.description}
                              </div>
                            )}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}

            {/* Join Group Climb — Highlighted */}
            <Link
              href={GROUP_CLIMB_NAV.href}
              onClick={closeMobile}
              className="flex items-center gap-2 mx-1 mt-1 px-3 py-3 bg-[var(--secondary)]/10 text-[var(--secondary-dark,#b8860b)] hover:bg-[var(--secondary)]/20 rounded-lg font-semibold transition-colors border border-[var(--secondary)]/20"
            >
              <Users className="h-4 w-4" />
              {GROUP_CLIMB_NAV.label}
              <ChevronRight className="h-4 w-4 ml-auto" />
            </Link>

            {/* Simple Links */}
            {SIMPLE_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobile}
                className="flex items-center justify-between px-3 py-3 text-[var(--text)] hover:bg-[var(--surface)] rounded-lg font-medium transition-colors"
              >
                {item.label}
                <ChevronRight className="h-4 w-4 text-[var(--text-light)]" />
              </Link>
            ))}

            {/* Divider */}
            <div className="my-3 border-t border-[var(--border)]" />

            {/* Secondary Navigation */}
            <div className="space-y-0.5">
              {TOP_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobile}
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
                onClick={closeMobile}
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
