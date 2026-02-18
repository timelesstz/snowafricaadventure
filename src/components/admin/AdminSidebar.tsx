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
} from "lucide-react";
import { useState } from "react";
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

// Navigation items with role requirements
const navItems: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  // Content Management
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
  // Operations
  { href: "/admin/departures", label: "Departures", icon: CalendarDays, minRole: AdminRole.EDITOR },
  { href: "/admin/bookings", label: "Bookings", icon: ClipboardList, minRole: AdminRole.EDITOR },
  { href: "/admin/inquiries", label: "Inquiries", icon: MessageSquare, minRole: AdminRole.EDITOR },
  { href: "/admin/partners", label: "Partners", icon: Users, minRole: AdminRole.ADMIN },
  { href: "/admin/commissions", label: "Commissions", icon: HandCoins, minRole: AdminRole.EDITOR },
  { href: "/admin/commissions/payouts", label: "Payouts", icon: CreditCard, minRole: AdminRole.ADMIN },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  // SEO & Monitoring
  { href: "/admin/404-monitor", label: "404 Monitor", icon: AlertTriangle, minRole: AdminRole.EDITOR },
  { href: "/admin/redirects", label: "Redirects", icon: ArrowRightLeft, minRole: AdminRole.EDITOR },
  { href: "/admin/theme", label: "Theme", icon: Palette },
  { href: "/admin/settings", label: "Settings", icon: Settings, minRole: AdminRole.ADMIN },
  { href: "/admin/users", label: "User Management", icon: UserCog, minRole: AdminRole.SUPER_ADMIN },
];

export default function AdminSidebar({ user }: { user: User }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = () => {
    signOut({ callbackUrl: "/admin/login" });
  };

  // Filter nav items based on user role
  const visibleNavItems = navItems.filter(
    (item) => !item.minRole || hasMinRole(user.role, item.minRole)
  );

  const navContent = (
    <>
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">Snow Africa</h1>
            <p className="text-sm text-slate-400 mt-1">Admin Dashboard</p>
          </div>
          <div className="hidden lg:block">
            <NotificationBell />
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {visibleNavItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href) &&
             // Prevent /admin/commissions from matching /admin/commissions/payouts
             !(item.href === "/admin/commissions" && pathname.startsWith("/admin/commissions/payouts")));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={clsx(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isActive
                  ? "bg-amber-600 text-white"
                  : "text-slate-300 hover:bg-slate-700 hover:text-white"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
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
          onClick={handleSignOut}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
        >
          <LogOut className="w-5 h-5" />
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
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-white"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute top-16 left-0 bottom-0 w-64 bg-slate-800 flex flex-col">
            {navContent}
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex fixed top-0 left-0 bottom-0 w-64 bg-slate-800 flex-col">
        {navContent}
      </div>
    </>
  );
}
