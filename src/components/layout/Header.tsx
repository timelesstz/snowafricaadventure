"use client";

import Link from "next/link";
import { useState } from "react";
import { Phone, Mail, Menu, X, Search } from "lucide-react";
import { SITE_CONFIG, MAIN_NAV, TOP_NAV } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Bar */}
      <div className="bg-[var(--primary-dark)] text-white text-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-2">
            {/* Contact Info */}
            <div className="flex items-center gap-4">
              <a
                href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-1 hover:text-[var(--secondary)] transition-colors"
              >
                <Phone className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{SITE_CONFIG.phone}</span>
              </a>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex items-center gap-1 hover:text-[var(--secondary)] transition-colors"
              >
                <Mail className="h-3.5 w-3.5" />
                <span className="hidden md:inline">{SITE_CONFIG.email}</span>
              </a>
            </div>

            {/* Top Nav Links */}
            <nav className="hidden md:flex items-center gap-4">
              {TOP_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="hover:text-[var(--secondary)] transition-colors"
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
          <div className="flex items-center justify-between py-3">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-12 h-12 bg-[var(--primary)] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">SA</span>
              </div>
              <div className="hidden sm:block">
                <div className="font-heading font-bold text-lg text-[var(--text)]">
                  Snow Africa
                </div>
                <div className="text-xs text-[var(--text-muted)] -mt-1">Adventure</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {MAIN_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--surface)] rounded-md transition-colors font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Search & CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/search/"
                className="p-2 text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--surface)] rounded-md transition-colors"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </Link>
              <Link
                href="/tailor-made-safari/"
                className="bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-white px-5 py-2.5 rounded-md font-semibold transition-colors"
              >
                Plan Your Trip
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[var(--text)]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "lg:hidden border-t",
            mobileMenuOpen ? "block" : "hidden"
          )}
        >
          <nav className="container mx-auto px-4 py-4 space-y-2">
            {/* Search */}
            <Link
              href="/search/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-2 text-[var(--text)] hover:bg-[var(--surface)] rounded-md"
            >
              <Search className="h-4 w-4" />
              Search
            </Link>
            <hr className="my-2" />
            {MAIN_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 text-[var(--text)] hover:bg-[var(--surface)] rounded-md"
              >
                {item.label}
              </Link>
            ))}
            <hr className="my-4" />
            {TOP_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 text-[var(--text-muted)] hover:bg-[var(--surface)] rounded-md text-sm"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4">
              <Link
                href="/tailor-made-safari/"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-white px-5 py-3 rounded-md font-semibold transition-colors"
              >
                Plan Your Trip
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
