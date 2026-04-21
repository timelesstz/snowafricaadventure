"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Users,
  HandCoins,
  BarChart3,
  LogOut,
  Menu,
  X,
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
  AlertTriangle,
  ArrowRightLeft,
  PanelTop,
  LayoutTemplate,
  Search,
  Target,
  Send,
  Link2,
  Inbox,
  ChevronDown,
} from "lucide-react";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { clsx } from "clsx";
import { AdminRole } from "@prisma/client";
import { RoleBadge } from "./RoleBadge";
import { hasMinRole } from "@/lib/auth-types";
import NotificationBell from "./NotificationBell";

interface User {
  name?: string | null;
  email?: string | null;
  role: AdminRole;
}

interface NavItem {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  minRole?: AdminRole;
}

interface NavGroup {
  id: string;
  label: string;
  items: NavItem[];
}

const topLevelItems: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
];

const navGroups: NavGroup[] = [
  {
    id: "content",
    label: "Content",
    items: [
      { href: "/admin/homepage", label: "Homepage", icon: Home, minRole: AdminRole.EDITOR },
      { href: "/admin/about-us", label: "About Us", icon: Users, minRole: AdminRole.EDITOR },
      { href: "/admin/heroes", label: "Page Heroes", icon: PanelTop, minRole: AdminRole.EDITOR },
      { href: "/admin/pages", label: "Page Builder", icon: LayoutTemplate, minRole: AdminRole.EDITOR },
      { href: "/admin/media", label: "Media Library", icon: Image, minRole: AdminRole.EDITOR },
      { href: "/admin/routes", label: "Trekking Routes", icon: Mountain, minRole: AdminRole.EDITOR },
      { href: "/admin/safaris", label: "Safari Packages", icon: Compass, minRole: AdminRole.EDITOR },
      { href: "/admin/destinations", label: "Destinations", icon: MapPin, minRole: AdminRole.EDITOR },
      { href: "/admin/day-trips", label: "Day Trips", icon: Sun, minRole: AdminRole.EDITOR },
      { href: "/admin/blog", label: "Blog Posts", icon: FileText, minRole: AdminRole.EDITOR },
      { href: "/admin/reviews", label: "Reviews", icon: Star, minRole: AdminRole.EDITOR },
    ],
  },
  {
    id: "bookings",
    label: "Bookings",
    items: [
      { href: "/admin/departures", label: "Departures", icon: CalendarDays, minRole: AdminRole.EDITOR },
      { href: "/admin/bookings", label: "Bookings", icon: ClipboardList, minRole: AdminRole.EDITOR },
      { href: "/admin/inquiries", label: "Inquiries", icon: MessageSquare, minRole: AdminRole.EDITOR },
    ],
  },
  {
    id: "commerce",
    label: "Commerce",
    items: [
      { href: "/admin/partners", label: "Partners", icon: Users, minRole: AdminRole.ADMIN },
      { href: "/admin/commissions", label: "Commissions", icon: HandCoins, minRole: AdminRole.EDITOR },
      { href: "/admin/commissions/payouts", label: "Payouts", icon: CreditCard, minRole: AdminRole.ADMIN },
      { href: "/admin/invite-links", label: "Invite Links", icon: Link2, minRole: AdminRole.EDITOR },
    ],
  },
  {
    id: "marketing",
    label: "Marketing",
    items: [
      { href: "/admin/newsletter", label: "Newsletter", icon: Inbox, minRole: AdminRole.EDITOR },
      { href: "/admin/email-log", label: "Email Log", icon: Send, minRole: AdminRole.EDITOR },
      { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
      { href: "/admin/conversion-analytics", label: "Conversion Analytics", icon: Target },
    ],
  },
  {
    id: "seo",
    label: "SEO",
    items: [
      { href: "/admin/seo", label: "SEO Dashboard", icon: Search },
      { href: "/admin/404-monitor", label: "404 Monitor", icon: AlertTriangle, minRole: AdminRole.EDITOR },
      { href: "/admin/redirects", label: "Redirects", icon: ArrowRightLeft, minRole: AdminRole.EDITOR },
    ],
  },
  {
    id: "system",
    label: "System",
    items: [
      { href: "/admin/theme", label: "Theme", icon: Palette },
      { href: "/admin/settings", label: "Settings", icon: Settings, minRole: AdminRole.ADMIN },
      { href: "/admin/users", label: "User Management", icon: UserCog, minRole: AdminRole.SUPER_ADMIN },
    ],
  },
];

const STORAGE_KEY = "admin:sidebar:collapsed";

// useSyncExternalStore bindings for localStorage-backed collapsed state.
// Avoids setState-in-effect by letting React read the store synchronously.
const collapsedSubscribers = new Set<() => void>();

function subscribeCollapsed(callback: () => void) {
  collapsedSubscribers.add(callback);
  const storageListener = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) callback();
  };
  window.addEventListener("storage", storageListener);
  return () => {
    collapsedSubscribers.delete(callback);
    window.removeEventListener("storage", storageListener);
  };
}

function getCollapsedSnapshot(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? "[]";
  } catch {
    return "[]";
  }
}

function getCollapsedServerSnapshot(): string {
  return "[]";
}

function writeCollapsed(next: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
  } catch {
    // ignore — localStorage may be disabled
  }
  collapsedSubscribers.forEach((cb) => cb());
}

function isItemActive(pathname: string, item: NavItem): boolean {
  if (pathname === item.href) return true;
  if (item.href === "/admin") return false;
  if (!pathname.startsWith(item.href)) return false;
  // Prevent /admin/commissions from matching /admin/commissions/payouts
  if (
    item.href === "/admin/commissions" &&
    pathname.startsWith("/admin/commissions/payouts")
  ) {
    return false;
  }
  return true;
}

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800";

export default function AdminSidebar({ user }: { user: User }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const collapsedRaw = useSyncExternalStore(
    subscribeCollapsed,
    getCollapsedSnapshot,
    getCollapsedServerSnapshot
  );
  const collapsed = useMemo<Set<string>>(() => {
    try {
      return new Set<string>(JSON.parse(collapsedRaw) as string[]);
    } catch {
      return new Set<string>();
    }
  }, [collapsedRaw]);

  // Close mobile menu on Escape
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const handleSignOut = () => {
    signOut({ callbackUrl: "/admin/login" });
  };

  const toggleGroup = (id: string) => {
    const next = new Set(collapsed);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    writeCollapsed(next);
  };

  const visibleGroups = navGroups
    .map((group) => ({
      ...group,
      items: group.items.filter(
        (item) => !item.minRole || hasMinRole(user.role, item.minRole)
      ),
    }))
    .filter((group) => group.items.length > 0);

  const visibleTop = topLevelItems.filter(
    (item) => !item.minRole || hasMinRole(user.role, item.minRole)
  );

  const groupContainsActive = (group: NavGroup) =>
    group.items.some((item) => isItemActive(pathname, item));

  const renderItem = (item: NavItem) => {
    const active = isItemActive(pathname, item);
    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={() => setMobileOpen(false)}
        aria-current={active ? "page" : undefined}
        className={clsx(
          "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors",
          focusRing,
          active
            ? "bg-amber-600 text-white"
            : "text-slate-300 hover:bg-slate-700 hover:text-white"
        )}
      >
        <item.icon className="w-5 h-5 shrink-0" aria-hidden="true" />
        <span className="truncate">{item.label}</span>
      </Link>
    );
  };

  const navContent = (
    <>
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">Snow Africa</h1>
            <p className="text-sm text-slate-400 mt-1">Admin Dashboard</p>
            <p
              className="hidden lg:flex items-center gap-1.5 mt-2 text-[10px] text-slate-500"
              aria-hidden="true"
              title="Press to open the command palette"
            >
              Press
              <kbd className="bg-slate-700 text-slate-200 rounded px-1 py-0.5 font-mono">
                ⌘K
              </kbd>
              to search
            </p>
          </div>
          <div className="hidden lg:block">
            <NotificationBell />
          </div>
        </div>
      </div>

      <nav
        className="flex-1 p-4 overflow-y-auto"
        aria-label="Admin navigation"
      >
        <div className="space-y-1">{visibleTop.map(renderItem)}</div>
        {visibleGroups.map((group) => {
          const hasActive = groupContainsActive(group);
          const open = !collapsed.has(group.id) || hasActive;
          return (
            <div key={group.id} className="mt-4">
              <button
                type="button"
                onClick={() => toggleGroup(group.id)}
                aria-expanded={open ? "true" : "false"}
                aria-controls={`nav-group-${group.id}`}
                className={clsx(
                  "flex items-center justify-between w-full px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors",
                  focusRing,
                  hasActive
                    ? "text-amber-300"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                <span>{group.label}</span>
                <ChevronDown
                  className={clsx(
                    "w-4 h-4 transition-transform",
                    open ? "rotate-0" : "-rotate-90"
                  )}
                  aria-hidden="true"
                />
              </button>
              {open && (
                <div id={`nav-group-${group.id}`} className="mt-1 space-y-1">
                  {group.items.map(renderItem)}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-700">
        <div className="px-4 py-3">
          <p className="text-white font-medium text-sm">{user.name}</p>
          <p className="text-slate-400 text-xs truncate mb-2">{user.email}</p>
          <RoleBadge role={user.role} size="sm" />
        </div>
        <button
          type="button"
          onClick={handleSignOut}
          className={clsx(
            "flex items-center gap-3 w-full px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors",
            focusRing
          )}
        >
          <LogOut className="w-5 h-5" aria-hidden="true" />
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-slate-800 flex items-center justify-between px-4 z-50">
        <h1 className="text-lg font-bold text-white">Snow Africa Admin</h1>
        <div className="flex items-center gap-2">
          <NotificationBell />
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen ? "true" : "false"}
            aria-controls="mobile-nav"
            className={clsx("p-2 text-white rounded-lg", focusRing)}
          >
            {mobileOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar — slide-in drawer */}
      <div
        className={clsx(
          "lg:hidden fixed inset-0 z-40 transition-opacity duration-200",
          mobileOpen ? "visible opacity-100" : "invisible opacity-0"
        )}
        aria-hidden={mobileOpen ? "false" : "true"}
      >
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
        <div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Admin navigation"
          className={clsx(
            "absolute top-16 left-0 bottom-0 w-[280px] bg-slate-800 flex flex-col",
            "transition-transform duration-200 ease-out",
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {navContent}
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex fixed top-0 left-0 bottom-0 w-64 bg-slate-800 flex-col">
        {navContent}
      </div>
    </>
  );
}
