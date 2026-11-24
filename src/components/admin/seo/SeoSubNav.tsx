"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import SyncStatusBadge from "./SyncStatusBadge";
import type { SyncFreshness } from "@/lib/seo-overview";

const tabs = [
  { href: "/admin/seo", label: "Overview" },
  { href: "/admin/seo/content-health", label: "Content Health" },
  { href: "/admin/seo/search-console", label: "Search Console" },
  { href: "/admin/seo/analytics", label: "Analytics" },
  { href: "/admin/seo/page-analyzer", label: "Page Analyzer" },
  { href: "/admin/seo/keywords", label: "Keywords" },
  { href: "/admin/seo/recommendations", label: "Recommendations" },
  { href: "/admin/seo/content-performance", label: "Content" },
  { href: "/admin/seo/content-ideas", label: "Content Ideas" },
  { href: "/admin/seo/settings", label: "Settings" },
];

interface SeoSubNavProps {
  freshness?: { gsc: SyncFreshness; ga: SyncFreshness };
}

export default function SeoSubNav({ freshness }: SeoSubNavProps) {
  const pathname = usePathname();

  return (
    <div className="border-b border-slate-200 mb-6">
      <div className="flex items-center justify-between gap-4">
        <nav aria-label="SEO sections" className="flex min-w-0 flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {tabs.map((tab) => {
            const isActive =
              tab.href === "/admin/seo"
                ? pathname === tab.href || pathname === tab.href + "/"
                : pathname.startsWith(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                aria-current={isActive ? "page" : undefined}
                className={clsx(
                  "px-3 sm:px-4 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-amber-400 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                  isActive
                    ? "border-amber-600 text-amber-700"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                )}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
        {freshness && (
          <div className="hidden md:flex items-center gap-2 pb-2 shrink-0">
            <SyncStatusBadge
              source="GSC"
              lastSyncAt={freshness.gsc.completedAt}
              hoursAgo={freshness.gsc.hoursAgo}
              status={freshness.gsc.status}
              error={freshness.gsc.error}
            />
            <SyncStatusBadge
              source="GA4"
              lastSyncAt={freshness.ga.completedAt}
              hoursAgo={freshness.ga.hoursAgo}
              status={freshness.ga.status}
              error={freshness.ga.error}
            />
          </div>
        )}
      </div>
    </div>
  );
}
