import {
  LayoutDashboard,
  Users,
  Handshake,
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
  Image,
  FileWarning,
  ArrowRightLeft,
  PanelTop,
  LayoutTemplate,
  Search,
  Target,
  Send,
  Link2,
  Inbox,
  UserCircle,
  BadgeCheck,
  BellRing,
  type LucideIcon,
} from "lucide-react";
import { AdminRole } from "@prisma/client";
import { hasMinRole } from "@/lib/auth-types";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  minRole?: AdminRole;
}

export interface NavGroup {
  id: string;
  label: string;
  items: NavItem[];
}

const { EDITOR, ADMIN, SUPER_ADMIN } = AdminRole;

export const HOME_ITEM: NavItem = { href: "/admin", label: "Dashboard", icon: LayoutDashboard };

/** Ordered by how often a tour operator reaches for them: sales first, system last. */
export const NAV_GROUPS: NavGroup[] = [
  {
    id: "sales",
    label: "Sales",
    items: [
      { href: "/admin/inquiries?status=new", label: "Open leads", icon: BellRing, minRole: EDITOR },
      { href: "/admin/inquiries", label: "Inquiries", icon: MessageSquare, minRole: EDITOR },
      { href: "/admin/bookings", label: "Bookings", icon: ClipboardList, minRole: EDITOR },
      { href: "/admin/departures", label: "Departures", icon: CalendarDays, minRole: EDITOR },
    ],
  },
  {
    id: "tours",
    label: "Tours",
    items: [
      { href: "/admin/routes", label: "Trekking routes", icon: Mountain, minRole: EDITOR },
      { href: "/admin/safaris", label: "Safari packages", icon: Compass, minRole: EDITOR },
      { href: "/admin/day-trips", label: "Day trips", icon: Sun, minRole: EDITOR },
      { href: "/admin/destinations", label: "Destinations", icon: MapPin, minRole: EDITOR },
    ],
  },
  {
    id: "website",
    label: "Website",
    items: [
      { href: "/admin/homepage", label: "Homepage", icon: Home, minRole: EDITOR },
      { href: "/admin/about-us", label: "About us", icon: Users, minRole: EDITOR },
      { href: "/admin/heroes", label: "Page heroes", icon: PanelTop, minRole: EDITOR },
      { href: "/admin/pages", label: "Page builder", icon: LayoutTemplate, minRole: EDITOR },
      { href: "/admin/blog", label: "Blog posts", icon: FileText, minRole: EDITOR },
      { href: "/admin/reviews", label: "Reviews", icon: Star, minRole: EDITOR },
      { href: "/admin/guides", label: "Guides", icon: UserCircle, minRole: EDITOR },
      { href: "/admin/logos", label: "Logos", icon: BadgeCheck, minRole: EDITOR },
      { href: "/admin/media", label: "Media library", icon: Image, minRole: EDITOR },
    ],
  },
  {
    id: "partners",
    label: "Partners",
    items: [
      { href: "/admin/partners", label: "Partners", icon: Handshake, minRole: ADMIN },
      { href: "/admin/commissions", label: "Commissions", icon: HandCoins, minRole: EDITOR },
      { href: "/admin/commissions/payouts", label: "Payouts", icon: CreditCard, minRole: ADMIN },
      { href: "/admin/invite-links", label: "Invite links", icon: Link2, minRole: EDITOR },
    ],
  },
  {
    id: "marketing",
    label: "Marketing",
    items: [
      { href: "/admin/newsletter", label: "Newsletter", icon: Inbox, minRole: EDITOR },
      { href: "/admin/email-log", label: "Communications", icon: Send, minRole: EDITOR },
      { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
      { href: "/admin/conversion-analytics", label: "Conversions", icon: Target },
    ],
  },
  {
    id: "seo",
    label: "SEO",
    items: [
      { href: "/admin/seo", label: "SEO dashboard", icon: Search },
      { href: "/admin/404-monitor", label: "404 monitor", icon: FileWarning, minRole: EDITOR },
      { href: "/admin/redirects", label: "Redirects", icon: ArrowRightLeft, minRole: EDITOR },
    ],
  },
  {
    id: "system",
    label: "System",
    items: [
      { href: "/admin/theme", label: "Theme", icon: Palette },
      { href: "/admin/settings", label: "Settings", icon: Settings, minRole: ADMIN },
      { href: "/admin/users", label: "Users", icon: UserCog, minRole: SUPER_ADMIN },
    ],
  },
];

const allowed = (role: AdminRole) => (item: NavItem) => !item.minRole || hasMinRole(role, item.minRole);

/** The groups and items this role may see; empty groups are dropped. */
export function navForRole(role: AdminRole): NavGroup[] {
  return NAV_GROUPS.map((group) => ({ ...group, items: group.items.filter(allowed(role)) })).filter(
    (group) => group.items.length > 0
  );
}

const stripSlash = (path: string) => (path.length > 1 ? path.replace(/\/+$/, "") : path);

/**
 * The href of the one nav item that best matches the current URL, or null.
 *
 * Matching is by path segment (so /admin/routes never lights up for
 * /admin/routes-old), ignores the trailing slash the site adds to every URL,
 * and prefers the most specific item: /admin/commissions/payouts beats
 * /admin/commissions, and /admin/inquiries?status=new beats /admin/inquiries
 * when that filter is on.
 */
export function findActiveHref(
  pathname: string,
  search: URLSearchParams | null,
  items: NavItem[]
): string | null {
  const path = stripSlash(pathname);
  let best: { href: string; score: number } | null = null;

  for (const item of items) {
    const [rawPath, rawQuery = ""] = item.href.split("?");
    const itemPath = stripSlash(rawPath);
    const exact = path === itemPath;
    // The dashboard only matches itself; everything else also owns its sub-pages.
    const nested = itemPath !== "/admin" && path.startsWith(`${itemPath}/`);
    if (!exact && !nested) continue;

    const query = new URLSearchParams(rawQuery);
    let queryMatches = 0;
    let fits = true;
    for (const [key, value] of query) {
      if (search?.get(key) === value) queryMatches++;
      else fits = false;
    }
    if (!fits) continue;

    const score = itemPath.length * 10 + queryMatches;
    if (!best || score > best.score) best = { href: item.href, score };
  }

  return best?.href ?? null;
}
