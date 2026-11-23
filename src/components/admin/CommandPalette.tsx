"use client";

import { Command } from "cmdk";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { ClipboardList, MessageSquare, Plus, Search as SearchIcon, type LucideIcon } from "lucide-react";
import { HOME_ITEM, NAV_GROUPS } from "./sidebar/nav-config";

const OPEN_EVENT = "admin:command-palette";

/** Opens the palette from anywhere (buttons in the top bar and the mobile menu). */
export function openCommandPalette() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

const noopSubscribe = () => () => {};

/** "⌘" on Apple devices, "Ctrl" elsewhere; "Ctrl" during server render. */
export function useModKeyLabel() {
  return useSyncExternalStore(
    noopSubscribe,
    () => (/Mac|iPhone|iPad/.test(navigator.userAgent) ? "⌘" : "Ctrl"),
    () => "Ctrl"
  );
}

interface PaletteItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  keywords?: string;
  group: "Navigate" | "Create";
}

const items: PaletteItem[] = [
  // Navigate: the same list as the sidebar, so the two never drift apart.
  { id: HOME_ITEM.href, label: HOME_ITEM.label, href: HOME_ITEM.href, icon: HOME_ITEM.icon, group: "Navigate" },
  ...NAV_GROUPS.flatMap((g) =>
    g.items.map((item): PaletteItem => ({
      id: item.href,
      label: item.label,
      href: item.href,
      icon: item.icon,
      keywords: g.label,
      group: "Navigate",
    }))
  ),
  // Create quick actions
  { id: "new-departure", label: "New departure", href: "/admin/departures/new", icon: Plus, keywords: "create add", group: "Create" },
  { id: "new-blog", label: "New blog post", href: "/admin/blog/new", icon: Plus, keywords: "create add", group: "Create" },
  { id: "new-partner", label: "New partner", href: "/admin/partners/new", icon: Plus, keywords: "create add", group: "Create" },
  { id: "new-user", label: "New admin user", href: "/admin/users/new", icon: Plus, keywords: "create add", group: "Create" },
  { id: "new-redirect", label: "New redirect", href: "/admin/redirects/new", icon: Plus, keywords: "create add", group: "Create" },
];

interface CustomerResults {
  bookings: {
    id: string;
    leadName: string;
    leadEmail: string;
    status: string;
    routeTitle: string;
    arrivalDate: string;
  }[];
  inquiries: {
    id: string;
    fullName: string;
    email: string;
    type: string;
    tripType: string | null;
    status: string;
  }[];
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [customers, setCustomers] = useState<CustomerResults>({
    bookings: [],
    inquiries: [],
  });
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_EVENT, onOpen);
    };
  }, []);

  // Debounced customer lookup — searches bookings and inquiries by name/email
  useEffect(() => {
    if (!open || search.trim().length < 2) {
      setCustomers({ bookings: [], inquiries: [] });
      return;
    }
    const controller = new AbortController();
    const timer = setTimeout(() => {
      fetch(`/api/admin/search?q=${encodeURIComponent(search.trim())}`, {
        signal: controller.signal,
      })
        .then((res) => (res.ok ? res.json() : { bookings: [], inquiries: [] }))
        .then((data: CustomerResults) => setCustomers(data))
        .catch(() => {});
    }, 250);
    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [open, search]);

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
              placeholder="Search pages, bookings, inquiries…"
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
            {(customers.bookings.length > 0 ||
              customers.inquiries.length > 0) && (
              <Command.Group
                heading="Customers"
                className="[&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-slate-400 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5"
              >
                {customers.bookings.map((b) => (
                  <Command.Item
                    key={`booking-${b.id}`}
                    value={`booking ${b.leadName} ${b.leadEmail}`}
                    onSelect={() => go(`/admin/bookings/${b.id}`)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-700 cursor-pointer aria-selected:bg-amber-50 aria-selected:text-amber-900"
                  >
                    <ClipboardList
                      className="w-4 h-4 text-slate-500"
                      aria-hidden="true"
                    />
                    <span className="min-w-0 flex-1 truncate">
                      {b.leadName}
                      <span className="text-slate-400"> — {b.routeTitle}</span>
                    </span>
                    <span className="text-[10px] font-semibold uppercase text-slate-400">
                      Booking
                    </span>
                  </Command.Item>
                ))}
                {customers.inquiries.map((i) => (
                  <Command.Item
                    key={`inquiry-${i.id}`}
                    value={`inquiry ${i.fullName} ${i.email}`}
                    onSelect={() => go(`/admin/inquiries/${i.id}`)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-700 cursor-pointer aria-selected:bg-amber-50 aria-selected:text-amber-900"
                  >
                    <MessageSquare
                      className="w-4 h-4 text-slate-500"
                      aria-hidden="true"
                    />
                    <span className="min-w-0 flex-1 truncate">
                      {i.fullName}
                      <span className="text-slate-400">
                        {" "}
                        — {i.tripType || i.type}
                      </span>
                    </span>
                    <span className="text-[10px] font-semibold uppercase text-slate-400">
                      Inquiry
                    </span>
                  </Command.Item>
                ))}
              </Command.Group>
            )}
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
