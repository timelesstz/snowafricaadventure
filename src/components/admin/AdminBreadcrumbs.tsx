"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

// Known segment → display label. Unknown segments fall back to titlecased text.
const LABELS: Record<string, string> = {
  admin: "Admin",
  homepage: "Homepage",
  "about-us": "About Us",
  heroes: "Page Heroes",
  pages: "Page Builder",
  media: "Media Library",
  routes: "Trekking Routes",
  safaris: "Safari Packages",
  destinations: "Destinations",
  "day-trips": "Day Trips",
  blog: "Blog Posts",
  reviews: "Reviews",
  departures: "Departures",
  bookings: "Bookings",
  inquiries: "Inquiries",
  partners: "Partners",
  commissions: "Commissions",
  payouts: "Payouts",
  "invite-links": "Invite Links",
  newsletter: "Newsletter",
  "email-log": "Email Log",
  analytics: "Analytics",
  "conversion-analytics": "Conversion Analytics",
  seo: "SEO",
  "404-monitor": "404 Monitor",
  redirects: "Redirects",
  theme: "Theme",
  settings: "Settings",
  users: "Users",
  new: "New",
  edit: "Edit",
  bulk: "Bulk",
  rotate: "Rotate",
  "climber-tokens": "Climber Tokens",
  login: "Login",
};

function labelFor(segment: string): string {
  if (LABELS[segment]) return LABELS[segment];
  // cuid (cm*/cl*) or uuid-ish ids → show as "Details" rather than raw id
  if (/^c[a-z0-9]{20,}$/i.test(segment) || /^[0-9a-f-]{20,}$/i.test(segment)) {
    return "Details";
  }
  return segment
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function AdminBreadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  // Only render inside /admin, and never on the dashboard root or login page.
  if (segments[0] !== "admin") return null;
  if (segments.length <= 1) return null;
  if (segments[1] === "login") return null;

  // Build crumbs for segments after the root "/admin".
  const crumbs = segments.slice(1).map((seg, i) => {
    const href = "/" + segments.slice(0, i + 2).join("/");
    const isLast = i === segments.length - 2;
    return { label: labelFor(seg), href, isLast };
  });

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center flex-wrap gap-1 text-sm">
        <li>
          <Link
            href="/admin"
            className="text-slate-500 hover:text-amber-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded"
          >
            Admin
          </Link>
        </li>
        {crumbs.map((crumb) => (
          <li key={crumb.href} className="flex items-center gap-1">
            <ChevronRight
              className="w-4 h-4 text-slate-400"
              aria-hidden="true"
            />
            {crumb.isLast ? (
              <span className="text-slate-900 font-medium" aria-current="page">
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className="text-slate-500 hover:text-amber-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded"
              >
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
