"use client";

import { useEffect, useRef, useState } from "react";
import { LogOut, Search, Settings2, UserCircle2 } from "lucide-react";
import { signOut } from "next-auth/react";
import { clsx } from "clsx";
import Link from "next/link";
import { AdminRole } from "@prisma/client";
import { AdminBreadcrumbs } from "./AdminBreadcrumbs";
import NotificationBell from "./NotificationBell";
import { RoleBadge } from "./RoleBadge";

interface TopBarUser {
  name?: string | null;
  email?: string | null;
  role: AdminRole;
}

function openCommandPalette() {
  // The CommandPalette component listens for ⌘/Ctrl+K on window.
  // Dispatching a synthetic KeyboardEvent is the cleanest way to reuse it
  // without adding a second entry point.
  const event = new KeyboardEvent("keydown", {
    key: "k",
    metaKey: true,
    ctrlKey: true,
    bubbles: true,
  });
  window.dispatchEvent(event);
}

export default function AdminTopBar({ user }: { user: TopBarUser }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("mousedown", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const initials =
    (user.name ?? user.email ?? "?")
      .split(/\s+/)
      .map((s) => s.charAt(0))
      .slice(0, 2)
      .join("")
      .toUpperCase() || "?";

  return (
    <header
      className={clsx(
        "sticky top-0 z-30 bg-white/95 backdrop-blur",
        "border-b border-slate-200",
        "h-14 px-4 lg:px-6 flex items-center justify-between gap-3"
      )}
    >
      <div className="min-w-0 flex-1">
        <AdminBreadcrumbs />
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        <button
          type="button"
          onClick={openCommandPalette}
          className={clsx(
            "hidden md:inline-flex items-center gap-2 h-9 px-3 rounded-lg",
            "text-sm text-slate-500 bg-slate-100 hover:bg-slate-200 transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          )}
          aria-label="Open command palette"
        >
          <Search className="h-4 w-4" aria-hidden="true" />
          <span>Search…</span>
          <kbd className="ml-2 text-[10px] font-semibold text-slate-500 bg-white border border-slate-200 rounded px-1.5 py-0.5">
            ⌘K
          </kbd>
        </button>

        <NotificationBell variant="light" />

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={menuOpen ? "true" : "false"}
            aria-label="Account menu"
            className={clsx(
              "inline-flex items-center gap-2 h-10 pl-1 pr-2 rounded-lg transition-colors",
              "text-slate-700 hover:bg-slate-100",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            )}
          >
            <span className="h-8 w-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-semibold">
              {initials}
            </span>
            <span className="hidden sm:block text-sm font-medium max-w-[8rem] truncate">
              {user.name ?? "Admin"}
            </span>
          </button>

          {menuOpen && (
            <div
              role="menu"
              className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50"
            >
              <div className="p-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="h-10 w-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-sm font-semibold">
                    {initials}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate">
                      {user.name ?? "Admin"}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {user.email ?? ""}
                    </p>
                  </div>
                </div>
                <div className="mt-3">
                  <RoleBadge role={user.role} size="sm" />
                </div>
              </div>
              <div className="py-1">
                <Link
                  href="/admin/notifications/preferences"
                  onClick={() => setMenuOpen(false)}
                  role="menuitem"
                  className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                >
                  <Settings2 className="h-4 w-4 text-slate-500" aria-hidden="true" />
                  Notification preferences
                </Link>
                <Link
                  href="/admin/settings"
                  onClick={() => setMenuOpen(false)}
                  role="menuitem"
                  className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                >
                  <UserCircle2 className="h-4 w-4 text-slate-500" aria-hidden="true" />
                  Account settings
                </Link>
              </div>
              <div className="border-t border-slate-100 py-1">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    signOut({ callbackUrl: "/admin/login" });
                  }}
                  role="menuitem"
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" aria-hidden="true" />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
