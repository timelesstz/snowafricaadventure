"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

const tabs = [
  { href: "/admin/conversion-analytics", label: "Overview" },
  { href: "/admin/conversion-analytics/bookings", label: "Bookings" },
  { href: "/admin/conversion-analytics/inquiries", label: "Inquiries" },
  { href: "/admin/conversion-analytics/departures", label: "Departures" },
];

export default function ConversionSubNav() {
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
