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
import { SITE_CONFIG, FOOTER_NAV } from "@/lib/constants";
import { useTheme } from "@/components/theme-provider";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { logo } = useTheme();

  return (
    <footer className="bg-[var(--primary-dark)] text-slate-300">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              {(logo.logoDarkUrl || logo.logoUrl) ? (
                <Image
                  src={logo.logoDarkUrl || logo.logoUrl!}
                  alt={SITE_CONFIG.name}
                  width={140}
                  height={40}
                  className="h-10 w-auto object-contain"
                />
              ) : (
                <>
                  <div className="w-10 h-10 bg-[var(--primary)] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">SA</span>
                  </div>
                  <div>
                    <div className="font-heading font-bold text-white">
                      Snow Africa
                    </div>
                    <div className="text-xs text-slate-400 -mt-1">Adventure</div>
                  </div>
                </>
              )}
            </div>
            <p className="text-sm mb-4">
              Experience the adventure of a lifetime with expert-led Kilimanjaro
              treks, Tanzania safaris, and Zanzibar beach holidays.
            </p>
            <div className="space-y-2 text-sm">
              <a
                href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 hover:text-[var(--secondary)] transition-colors"
              >
                <Phone className="h-4 w-4" />
                {SITE_CONFIG.phone}
              </a>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex items-center gap-2 hover:text-[var(--secondary)] transition-colors"
              >
                <Mail className="h-4 w-4" />
                {SITE_CONFIG.email}
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>
                  {SITE_CONFIG.address.street}, {SITE_CONFIG.address.city},{" "}
                  {SITE_CONFIG.address.country}
                </span>
              </div>
            </div>
          </div>

          {/* Safari & Tours */}
          <div>
            <h3 className="font-semibold text-white mb-4">
              {FOOTER_NAV.safaris.title}
            </h3>
            <ul className="space-y-2 text-sm">
              {FOOTER_NAV.safaris.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-[var(--secondary)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/tanzania-safaris/"
                  className="text-[var(--secondary)] hover:text-[var(--secondary-light)] transition-colors"
                >
                  View All Safaris →
                </Link>
              </li>
            </ul>
          </div>

          {/* Kilimanjaro */}
          <div>
            <h3 className="font-semibold text-white mb-4">
              {FOOTER_NAV.kilimanjaro.title}
            </h3>
            <ul className="space-y-2 text-sm">
              {FOOTER_NAV.kilimanjaro.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-[var(--secondary)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/trekking/"
                  className="text-[var(--secondary)] hover:text-[var(--secondary-light)] transition-colors"
                >
                  View All Routes →
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">
              {FOOTER_NAV.company.title}
            </h3>
            <ul className="space-y-2 text-sm">
              {FOOTER_NAV.company.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-[var(--secondary)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div className="mt-6">
              <h4 className="font-semibold text-white mb-3">Follow Us</h4>
              <div className="flex gap-3">
                <a
                  href={SITE_CONFIG.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-[var(--primary)] hover:bg-[var(--secondary)] rounded-full flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href={SITE_CONFIG.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-[var(--primary)] hover:bg-[var(--secondary)] rounded-full flex items-center justify-center transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </a>
                <a
                  href={SITE_CONFIG.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-[var(--primary)] hover:bg-[var(--secondary)] rounded-full flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href={SITE_CONFIG.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-[var(--primary)] hover:bg-[var(--secondary)] rounded-full flex items-center justify-center transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t border-slate-700">
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-slate-400">
            <span className="font-semibold">Partners & Certifications:</span>
            <span>TripAdvisor</span>
            <span>SafariBookings</span>
            <span>TATO Member</span>
            <span>KPAP Partner</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
            <p>
              © {currentYear} {SITE_CONFIG.name}. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link
                href="/terms-and-conditions/"
                className="hover:text-white transition-colors"
              >
                Terms & Conditions
              </Link>
              <span>|</span>
              <Link href="/blog/" className="hover:text-white transition-colors">
                Blog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
