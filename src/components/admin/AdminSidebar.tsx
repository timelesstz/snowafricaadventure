"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { signOut } from "next-auth/react";
import { ChevronDown, LogOut, Mountain, Search, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { clsx } from "clsx";
import type { AdminRole } from "@prisma/client";
import { getRoleName } from "@/lib/auth-types-client";
import { HOME_ITEM, findActiveHref, navForRole, type NavGroup, type NavItem } from "./sidebar/nav-config";
import { openCommandPalette, useModKeyLabel } from "./CommandPalette";

interface User {
  name?: string | null;
  email?: string | null;
  role: AdminRole;
}

/** Fired by the top bar's menu button on small screens. */
export const NAV_TOGGLE_EVENT = "admin:nav-toggle";
export const NAV_TRIGGER_ID = "admin-nav-trigger";

// ---------------------------------------------------------------------------
// Collapsed groups live in localStorage, read through useSyncExternalStore so
// the server render and the first client render agree (every group open).
// ---------------------------------------------------------------------------
const STORAGE_KEY = "admin:sidebar:collapsed";
const subscribers = new Set<() => void>();

function subscribeCollapsed(callback: () => void) {
  subscribers.add(callback);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) callback();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    subscribers.delete(callback);
    window.removeEventListener("storage", onStorage);
  };
}

function readCollapsed(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? "[]";
  } catch {
    return "[]";
  }
}

function writeCollapsed(next: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
  } catch {
    // Storage can be disabled (private mode); the toggle still works for this page view.
  }
  subscribers.forEach((cb) => cb());
}

function useCollapsedGroups() {
  const raw = useSyncExternalStore(subscribeCollapsed, readCollapsed, () => "[]");
  return useMemo(() => {
    try {
      return new Set<string>(JSON.parse(raw) as string[]);
    } catch {
      return new Set<string>();
    }
  }, [raw]);
}

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900";

function initials(user: User) {
  return (
    (user.name ?? user.email ?? "?")
      .split(/\s+/)
      .map((s) => s.charAt(0))
      .slice(0, 2)
      .join("")
      .toUpperCase() || "?"
  );
}

// ---------------------------------------------------------------------------
// Pieces
// ---------------------------------------------------------------------------
function NavLink({ item, active, onNavigate }: { item: NavItem; active: boolean; onNavigate?: () => void }) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={clsx(
        "group relative flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
        focusRing,
        active
          ? "bg-amber-400/10 font-medium text-amber-100"
          : "text-slate-300 hover:bg-white/5 hover:text-white"
      )}
    >
      {active && <span aria-hidden="true" className="absolute inset-y-1.5 left-0 w-0.5 rounded-full bg-amber-400" />}
      <Icon
        className={clsx(
          "h-[18px] w-[18px] shrink-0 transition-colors",
          active ? "text-amber-400" : "text-slate-400 group-hover:text-slate-200"
        )}
        aria-hidden="true"
      />
      <span className="truncate">{item.label}</span>
    </Link>
  );
}

function SidebarBody({
  user,
  groups,
  activeHref,
  idPrefix,
  onNavigate,
  onClose,
  closeRef,
}: {
  user: User;
  groups: NavGroup[];
  activeHref: string | null;
  idPrefix: string;
  onNavigate?: () => void;
  onClose?: () => void;
  closeRef?: React.Ref<HTMLButtonElement>;
}) {
  const collapsed = useCollapsedGroups();
  const modKey = useModKeyLabel();

  const toggleGroup = (id: string) => {
    const next = new Set(collapsed);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    writeCollapsed(next);
  };

  return (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <div className="flex h-14 shrink-0 items-center justify-between gap-2 border-b border-white/10 px-4">
        <Link href="/admin" onClick={onNavigate} className={clsx("flex min-w-0 items-center gap-2.5 rounded-md", focusRing)}>
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-amber-400 text-slate-900">
            <Mountain className="h-[18px] w-[18px]" aria-hidden="true" />
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-sm font-semibold text-white">Snow Africa</span>
            <span className="block text-xs text-slate-400">Admin</span>
          </span>
        </Link>
        {onClose && (
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className={clsx("rounded-md p-2 text-slate-300 hover:bg-white/5 hover:text-white", focusRing)}
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Search: the top bar has its own on wider screens */}
      {onClose && (
        <div className="px-3 pt-3">
          <button
            type="button"
            onClick={() => {
              onClose();
              openCommandPalette();
            }}
            className={clsx(
              "flex w-full items-center gap-2 rounded-md bg-white/5 px-3 py-2 text-sm text-slate-300 hover:bg-white/10",
              focusRing
            )}
          >
            <Search className="h-4 w-4 text-slate-400" aria-hidden="true" />
            <span className="flex-1 text-left">Search…</span>
            <kbd className="rounded border border-white/10 px-1.5 py-0.5 font-sans text-[11px] text-slate-400">
              {modKey} K
            </kbd>
          </button>
        </div>
      )}

      <nav aria-label="Admin" className="flex-1 overflow-y-auto overscroll-contain px-3 py-3">
        <NavLink item={HOME_ITEM} active={activeHref === HOME_ITEM.href} onNavigate={onNavigate} />

        {groups.map((group) => {
          const open = !collapsed.has(group.id);
          const holdsActive = group.items.some((item) => item.href === activeHref);
          const listId = `${idPrefix}-group-${group.id}`;
          return (
            <section key={group.id} className="mt-4" aria-labelledby={`${listId}-label`}>
              <button
                type="button"
                id={`${listId}-label`}
                onClick={() => toggleGroup(group.id)}
                aria-expanded={open}
                aria-controls={listId}
                className={clsx(
                  "flex w-full items-center justify-between rounded-md px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] transition-colors",
                  focusRing,
                  holdsActive ? "text-amber-300" : "text-slate-400 hover:text-slate-200"
                )}
              >
                <span className="flex items-center gap-2">
                  {group.label}
                  {!open && holdsActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" aria-label="(current page inside)" />
                  )}
                </span>
                <ChevronDown
                  className={clsx("h-3.5 w-3.5 transition-transform motion-reduce:transition-none", !open && "-rotate-90")}
                  aria-hidden="true"
                />
              </button>
              <div id={listId} hidden={!open} className="mt-0.5 space-y-0.5">
                {group.items.map((item) => (
                  <NavLink key={item.href} item={item} active={item.href === activeHref} onNavigate={onNavigate} />
                ))}
              </div>
            </section>
          );
        })}
      </nav>

      {/* Account */}
      <div className="flex shrink-0 items-center gap-3 border-t border-white/10 px-4 py-3">
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-700 text-xs font-semibold text-slate-100"
          aria-hidden="true"
        >
          {initials(user)}
        </span>
        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate text-sm font-medium text-white">{user.name ?? user.email}</p>
          <p className="truncate text-xs text-slate-400">{getRoleName(user.role)}</p>
        </div>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          aria-label="Sign out"
          title="Sign out"
          className={clsx("rounded-md p-2 text-slate-400 hover:bg-white/5 hover:text-white", focusRing)}
        >
          <LogOut className="h-[18px] w-[18px]" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sidebar: fixed rail on large screens, slide-in drawer below that.
// ---------------------------------------------------------------------------
export default function AdminSidebar({ user }: { user: User }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const groups = useMemo(() => navForRole(user.role), [user.role]);
  const activeHref = useMemo(
    () => findActiveHref(pathname, searchParams, [HOME_ITEM, ...groups.flatMap((g) => g.items)]),
    [pathname, searchParams, groups]
  );

  const [mobileOpen, setMobileOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Close the drawer whenever the page changes (links, back/forward, palette).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMobileOpen(false);
  }

  // A group the user collapsed reopens when they land on a page inside it.
  useEffect(() => {
    if (!activeHref) return;
    const group = groups.find((g) => g.items.some((i) => i.href === activeHref));
    if (!group) return;
    let current: Set<string>;
    try {
      current = new Set<string>(JSON.parse(readCollapsed()) as string[]);
    } catch {
      return;
    }
    if (current.delete(group.id)) writeCollapsed(current);
  }, [activeHref, groups]);

  const close = useCallback(() => {
    setMobileOpen(false);
    document.getElementById(NAV_TRIGGER_ID)?.focus();
  }, []);

  useEffect(() => {
    const onToggle = () => setMobileOpen((v) => !v);
    window.addEventListener(NAV_TOGGLE_EVENT, onToggle);
    return () => window.removeEventListener(NAV_TOGGLE_EVENT, onToggle);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen, close]);

  return (
    <>
      {/* Drawer (below lg) */}
      <div
        className={clsx(
          "fixed inset-0 z-50 lg:hidden",
          // Show at once on open (so focus can move in); hide after the slide-out on close.
          mobileOpen ? "visible" : "invisible transition-[visibility] delay-200 motion-reduce:delay-0"
        )}
      >
        <div
          className={clsx(
            "absolute inset-0 bg-slate-950/60 transition-opacity duration-200 motion-reduce:transition-none",
            mobileOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={close}
          aria-hidden="true"
        />
        <div
          id="admin-mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Admin menu"
          className={clsx(
            "absolute inset-y-0 left-0 w-[min(18rem,85vw)] bg-slate-900 shadow-2xl",
            "transition-transform duration-200 ease-out motion-reduce:transition-none",
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <SidebarBody
            user={user}
            groups={groups}
            activeHref={activeHref}
            idPrefix="m"
            onNavigate={() => setMobileOpen(false)}
            onClose={close}
            closeRef={closeRef}
          />
        </div>
      </div>

      {/* Rail (lg and up) */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-white/5 bg-slate-900 lg:block">
        <SidebarBody user={user} groups={groups} activeHref={activeHref} idPrefix="d" />
      </aside>
    </>
  );
}
