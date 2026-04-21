"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";
import { SITE_CONFIG, FOOTER_NAV, PARTNER_INFO } from "@/lib/constants";
import { useTheme } from "@/components/theme-provider";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { logo } = useTheme();

  return (
    <footer className="relative bg-[var(--primary-dark)] text-slate-300">
      {/* Thin gold top rule */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--secondary)]/60 to-transparent" />

      {/* Editorial tagline band */}
      <div className="container mx-auto px-4 pt-12 pb-8">
        <div className="flex flex-col items-center text-center">
          <span className="text-[10px] tracking-[0.35em] uppercase text-[var(--secondary)]/90 font-medium">
            Tanzania · Since 2013
          </span>
          <h2 className="font-heading text-2xl md:text-3xl text-white mt-3 max-w-3xl leading-snug">
            Handcrafted safaris, summits & shorelines — guided by the people
            who call this land home.
          </h2>
          <div className="mt-6 flex items-center gap-3">
            <span className="h-px w-10 bg-white/20" />
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--secondary)]" />
            <span className="h-px w-10 bg-white/20" />
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand & Contact (wider column) */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-2 mb-5">
              {logo.logoDarkUrl || logo.logoUrl ? (
                <Image
                  src={logo.logoDarkUrl || logo.logoUrl!}
                  alt={SITE_CONFIG.name}
                  width={160}
                  height={44}
                  className="h-11 w-auto object-contain"
                />
              ) : (
                <>
                  <div className="w-11 h-11 bg-[var(--primary)] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">SA</span>
                  </div>
                  <div>
                    <div className="font-heading font-bold text-white text-lg">
                      Snow Africa
                    </div>
                    <div className="text-xs text-slate-400 -mt-1 tracking-wider uppercase">
                      Adventure
                    </div>
                  </div>
                </>
              )}
            </div>
            <p className="text-sm leading-relaxed text-slate-400 mb-6 max-w-sm">
              Expert-led Kilimanjaro treks, curated Tanzania safaris, and
              Zanzibar beach escapes — drawn up by veteran guides with decades
              on these routes.
            </p>

            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`}
                  className="group flex items-center gap-3 hover:text-white transition-colors"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 group-hover:border-[var(--secondary)] group-hover:text-[var(--secondary)] transition-colors">
                    <Phone className="h-3.5 w-3.5" />
                  </span>
                  <span>{SITE_CONFIG.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="group flex items-center gap-3 hover:text-white transition-colors"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 group-hover:border-[var(--secondary)] group-hover:text-[var(--secondary)] transition-colors">
                    <Mail className="h-3.5 w-3.5" />
                  </span>
                  <span>{SITE_CONFIG.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 flex-shrink-0 mt-0.5">
                  <MapPin className="h-3.5 w-3.5" />
                </span>
                <span className="leading-relaxed">
                  {SITE_CONFIG.address.street}
                  <br />
                  {SITE_CONFIG.address.city}, {SITE_CONFIG.address.country}
                </span>
              </li>
            </ul>
          </div>

          {/* Safari & Tours */}
          <div className="md:col-span-2">
            <h3 className="text-[10px] tracking-[0.3em] uppercase text-[var(--secondary)]/90 font-semibold mb-4">
              {FOOTER_NAV.safaris.title}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_NAV.safaris.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  href="/tanzania-safaris/"
                  className="inline-flex items-center gap-1 text-[var(--secondary)] hover:text-[var(--secondary-light)] transition-colors text-sm"
                >
                  View all <span aria-hidden>→</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Kilimanjaro */}
          <div className="md:col-span-3">
            <h3 className="text-[10px] tracking-[0.3em] uppercase text-[var(--secondary)]/90 font-semibold mb-4">
              {FOOTER_NAV.kilimanjaro.title}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_NAV.kilimanjaro.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  href="/trekking/"
                  className="inline-flex items-center gap-1 text-[var(--secondary)] hover:text-[var(--secondary-light)] transition-colors text-sm"
                >
                  View all routes <span aria-hidden>→</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Company + Follow */}
          <div className="md:col-span-3">
            <h3 className="text-[10px] tracking-[0.3em] uppercase text-[var(--secondary)]/90 font-semibold mb-4">
              {FOOTER_NAV.company.title}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_NAV.company.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-7">
              <h4 className="text-[10px] tracking-[0.3em] uppercase text-[var(--secondary)]/90 font-semibold mb-3">
                Follow the Journey
              </h4>
              <div className="flex gap-2.5">
                <a
                  href={SITE_CONFIG.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-slate-300 hover:border-[var(--secondary)] hover:text-[var(--secondary)] transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href={SITE_CONFIG.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-slate-300 hover:border-[var(--secondary)] hover:text-[var(--secondary)] transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </a>
                <a
                  href={SITE_CONFIG.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-slate-300 hover:border-[var(--secondary)] hover:text-[var(--secondary)] transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href={SITE_CONFIG.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-slate-300 hover:border-[var(--secondary)] hover:text-[var(--secondary)] transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Trust band */}
        <div className="mt-14 pt-8 border-t border-white/10">
          <div className="flex flex-col items-center gap-4 text-center">
            <span className="text-[10px] tracking-[0.35em] uppercase text-[var(--secondary)]/90 font-semibold">
              Accredited & Trusted
            </span>
            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 text-sm text-slate-400">
              <a
                href="https://www.tripadvisor.com/Attraction_Review-g297913-d15336338-Reviews-Snow_Africa_Adventures-Arusha_Arusha_Region.html"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                TripAdvisor
              </a>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <span>SafariBookings</span>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <span>TATO Member</span>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <span>KPAP Partner</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2">
              <span>
                © {currentYear} {SITE_CONFIG.name}. All rights reserved.
              </span>
              <span className="hidden md:inline text-white/15">|</span>
              <Link
                href="/terms-and-conditions/"
                className="hover:text-white transition-colors"
              >
                Terms & Conditions
              </Link>
              <span className="text-white/15">·</span>
              <Link
                href="/privacy-policy/"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
            </div>

            <div className="flex items-center gap-2 text-slate-500">
              <span className="text-[10px] tracking-[0.3em] uppercase">
                Crafted by
              </span>
              <a
                href={PARTNER_INFO.marketing.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-[var(--secondary)] transition-colors font-medium tracking-wide"
              >
                {PARTNER_INFO.marketing.shortName}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
