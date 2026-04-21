"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

const tabs = [
  { href: "/admin/seo", label: "Overview" },
  { href: "/admin/seo/content-health", label: "Content Health" },
  { href: "/admin/seo/search-console", label: "Search Console" },
  { href: "/admin/seo/analytics", label: "Analytics" },
  { href: "/admin/seo/page-analyzer", label: "Page Analyzer" },
  { href: "/admin/seo/keywords", label: "Keywords" },
  { href: "/admin/seo/recommendations", label: "Recommendations" },
  { href: "/admin/seo/content-performance", label: "Content" },
  { href: "/admin/seo/settings", label: "Settings" },
];

export default function SeoSubNav() {
  const pathname = usePathname();

  return (
    <div className="border-b border-slate-200 mb-6 overflow-x-auto">
      <nav className="flex gap-0 min-w-max">
        {tabs.map((tab) => {
          const isActive =
            pathname === tab.href ||
            pathname === tab.href + "/";
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={clsx(
                "px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                isActive
                  ? "border-amber-600 text-amber-600"
                  : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
              )}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
