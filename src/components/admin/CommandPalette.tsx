"use client";

import { Command } from "cmdk";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  HandCoins,
  BarChart3,
  Settings,
  Palette,
  UserCog,
  CreditCard,
  CalendarDays,
  ClipboardList,
  MessageSquare,
  Mountain,
  Compass,
  FileText,
  Star,
  MapPin,
  Sun,
  Home,
  Image as ImageIcon,
  AlertTriangle,
  ArrowRightLeft,
  PanelTop,
  LayoutTemplate,
  Search as SearchIcon,
  Target,
  Send,
  Link2,
  Inbox,
  Plus,
  type LucideIcon,
} from "lucide-react";

interface PaletteItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  keywords?: string;
  group: "Navigate" | "Create";
}

const items: PaletteItem[] = [
  // Navigate
  { id: "dashboard", label: "Dashboard", href: "/admin", icon: LayoutDashboard, group: "Navigate" },
  { id: "homepage", label: "Homepage", href: "/admin/homepage", icon: Home, group: "Navigate" },
  { id: "about-us", label: "About Us", href: "/admin/about-us", icon: Users, group: "Navigate" },
  { id: "heroes", label: "Page Heroes", href: "/admin/heroes", icon: PanelTop, group: "Navigate" },
  { id: "pages", label: "Page Builder", href: "/admin/pages", icon: LayoutTemplate, group: "Navigate" },
  { id: "media", label: "Media Library", href: "/admin/media", icon: ImageIcon, group: "Navigate" },
  { id: "routes", label: "Trekking Routes", href: "/admin/routes", icon: Mountain, group: "Navigate" },
  { id: "safaris", label: "Safari Packages", href: "/admin/safaris", icon: Compass, group: "Navigate" },
  { id: "destinations", label: "Destinations", href: "/admin/destinations", icon: MapPin, group: "Navigate" },
  { id: "day-trips", label: "Day Trips", href: "/admin/day-trips", icon: Sun, group: "Navigate" },
  { id: "blog", label: "Blog Posts", href: "/admin/blog", icon: FileText, group: "Navigate" },
  { id: "reviews", label: "Reviews", href: "/admin/reviews", icon: Star, group: "Navigate" },
  { id: "departures", label: "Departures", href: "/admin/departures", icon: CalendarDays, group: "Navigate" },
  { id: "bookings", label: "Bookings", href: "/admin/bookings", icon: ClipboardList, group: "Navigate" },
  { id: "inquiries", label: "Inquiries", href: "/admin/inquiries", icon: MessageSquare, keywords: "leads", group: "Navigate" },
  { id: "partners", label: "Partners", href: "/admin/partners", icon: Users, group: "Navigate" },
  { id: "commissions", label: "Commissions", href: "/admin/commissions", icon: HandCoins, group: "Navigate" },
  { id: "payouts", label: "Payouts", href: "/admin/commissions/payouts", icon: CreditCard, group: "Navigate" },
  { id: "invite-links", label: "Invite Links", href: "/admin/invite-links", icon: Link2, group: "Navigate" },
  { id: "newsletter", label: "Newsletter", href: "/admin/newsletter", icon: Inbox, group: "Navigate" },
  { id: "email-log", label: "Email Log", href: "/admin/email-log", icon: Send, group: "Navigate" },
  { id: "analytics", label: "Analytics", href: "/admin/analytics", icon: BarChart3, group: "Navigate" },
  { id: "conversion", label: "Conversion Analytics", href: "/admin/conversion-analytics", icon: Target, group: "Navigate" },
  { id: "seo", label: "SEO Dashboard", href: "/admin/seo", icon: SearchIcon, group: "Navigate" },
  { id: "404-monitor", label: "404 Monitor", href: "/admin/404-monitor", icon: AlertTriangle, group: "Navigate" },
  { id: "redirects", label: "Redirects", href: "/admin/redirects", icon: ArrowRightLeft, group: "Navigate" },
  { id: "theme", label: "Theme", href: "/admin/theme", icon: Palette, group: "Navigate" },
  { id: "settings", label: "Settings", href: "/admin/settings", icon: Settings, group: "Navigate" },
  { id: "users", label: "User Management", href: "/admin/users", icon: UserCog, group: "Navigate" },
  // Create quick actions
  { id: "new-departure", label: "New departure", href: "/admin/departures/new", icon: Plus, keywords: "create add", group: "Create" },
  { id: "new-blog", label: "New blog post", href: "/admin/blog/new", icon: Plus, keywords: "create add", group: "Create" },
  { id: "new-partner", label: "New partner", href: "/admin/partners/new", icon: Plus, keywords: "create add", group: "Create" },
  { id: "new-user", label: "New admin user", href: "/admin/users/new", icon: Plus, keywords: "create add", group: "Create" },
  { id: "new-redirect", label: "New redirect", href: "/admin/redirects/new", icon: Plus, keywords: "create add", group: "Create" },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    setSearch("");
    router.push(href);
  };

  const groups = items.reduce<Record<string, PaletteItem[]>>((acc, item) => {
    (acc[item.group] ||= []).push(item);
    return acc;
  }, {});

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center pt-[12vh] px-4 bg-black/50"
      onClick={() => setOpen(false)}
      role="presentation"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden"
      >
        <Command
          label="Admin command palette"
          className="flex flex-col"
          shouldFilter
        >
          <div className="flex items-center gap-2 px-3 border-b border-slate-200">
            <SearchIcon className="w-4 h-4 text-slate-400" aria-hidden="true" />
            <Command.Input
              autoFocus
              value={search}
              onValueChange={setSearch}
              placeholder="Search admin pages…"
              className="flex-1 py-3 text-sm outline-none placeholder:text-slate-400"
            />
            <kbd className="text-[10px] font-semibold text-slate-400 bg-slate-100 rounded px-1.5 py-0.5">
              ESC
            </kbd>
          </div>
          <Command.List className="max-h-[60vh] overflow-y-auto p-2">
            <Command.Empty className="py-8 text-center text-sm text-slate-500">
              No matches.
            </Command.Empty>
            {Object.entries(groups).map(([name, groupItems]) => (
              <Command.Group
                key={name}
                heading={name}
                className="[&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-slate-400 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5"
              >
                {groupItems.map((item) => (
                  <Command.Item
                    key={item.id}
                    value={`${item.label} ${item.keywords ?? ""}`}
                    onSelect={() => go(item.href)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-700 cursor-pointer aria-selected:bg-amber-50 aria-selected:text-amber-900"
                  >
                    <item.icon className="w-4 h-4 text-slate-500" aria-hidden="true" />
                    <span>{item.label}</span>
                  </Command.Item>
                ))}
              </Command.Group>
            ))}
          </Command.List>
          <div className="border-t border-slate-200 px-3 py-2 text-xs text-slate-400 flex items-center gap-3">
            <span>
              <kbd className="bg-slate-100 rounded px-1 py-0.5 text-[10px] font-semibold text-slate-500">
                ↑↓
              </kbd>{" "}
              navigate
            </span>
            <span>
              <kbd className="bg-slate-100 rounded px-1 py-0.5 text-[10px] font-semibold text-slate-500">
                ↵
              </kbd>{" "}
              open
            </span>
            <span className="ml-auto">
              <kbd className="bg-slate-100 rounded px-1 py-0.5 text-[10px] font-semibold text-slate-500">
                ⌘/Ctrl + K
              </kbd>{" "}
              to toggle
            </span>
          </div>
        </Command>
      </div>
    </div>
  );
}
