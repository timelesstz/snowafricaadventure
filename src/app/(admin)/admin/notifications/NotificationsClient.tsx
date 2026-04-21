"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { clsx } from "clsx";
import { toast } from "sonner";
import {
  Bell,
  Check,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Search as SearchIcon,
  Settings2,
  Trash2,
} from "lucide-react";
import type { NotificationPriority, NotificationType } from "@prisma/client";
import {
  AdminPageHeader,
  EmptyState,
  Skeleton,
} from "@/components/admin/ui";
import {
  ALL_PRIORITIES,
  ALL_TYPES,
  iconForType,
  iconSurfaceFor,
  labelForType,
  linkForNotification,
  PRIORITY_BADGE,
} from "@/lib/notifications/display";

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  data?: Record<string, unknown>;
  isRead: boolean;
  priority: NotificationPriority;
  createdAt: string;
}

type ReadFilter = "all" | "unread" | "read";

const PAGE_SIZE = 25;

export default function NotificationsClient() {
  const [items, setItems] = useState<Notification[]>([]);
  const [total, setTotal] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [readFilter, setReadFilter] = useState<ReadFilter>("all");
  const [typeFilter, setTypeFilter] = useState<NotificationType | "">("");
  const [priorityFilter, setPriorityFilter] = useState<NotificationPriority | "">("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      params.set("limit", String(PAGE_SIZE));
      params.set("offset", String(page * PAGE_SIZE));
      if (readFilter === "unread") params.set("isRead", "false");
      if (readFilter === "read") params.set("isRead", "true");
      if (typeFilter) params.set("type", typeFilter);
      if (priorityFilter) params.set("priority", priorityFilter);

      const res = await fetch(`/api/admin/notifications?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to load notifications");
      const data = await res.json();
      setItems(data.notifications);
      setTotal(data.total);
      setUnreadCount(data.unreadCount);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [page, readFilter, typeFilter, priorityFilter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Reset page when filters change
  useEffect(() => {
    setPage(0);
  }, [readFilter, typeFilter, priorityFilter]);

  // Reset selection when the result set changes
  useEffect(() => {
    setSelected(new Set());
  }, [items]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.message.toLowerCase().includes(q)
    );
  }, [items, search]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const allOnPageSelected =
    filtered.length > 0 && filtered.every((n) => selected.has(n.id));

  const toggleOne = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const togglePage = () => {
    setSelected((prev) => {
      if (allOnPageSelected) {
        const next = new Set(prev);
        filtered.forEach((n) => next.delete(n.id));
        return next;
      }
      const next = new Set(prev);
      filtered.forEach((n) => next.add(n.id));
      return next;
    });
  };

  const bulkMarkRead = async () => {
    const ids = Array.from(selected);
    if (ids.length === 0) return;
    try {
      const res = await fetch("/api/admin/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "markRead", ids }),
      });
      if (!res.ok) throw new Error("Request failed");
      toast.success(`Marked ${ids.length} as read`);
      setSelected(new Set());
      fetchData();
    } catch {
      toast.error("Could not mark as read");
    }
  };

  const bulkDelete = async () => {
    const ids = Array.from(selected);
    if (ids.length === 0) return;
    if (!window.confirm(`Delete ${ids.length} notification(s)?`)) return;
    try {
      const res = await fetch("/api/admin/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", ids }),
      });
      if (!res.ok) throw new Error("Request failed");
      toast.success(`Deleted ${ids.length}`);
      setSelected(new Set());
      fetchData();
    } catch {
      toast.error("Could not delete");
    }
  };

  const markSingleRead = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/notifications/${id}`, {
        method: "PATCH",
      });
      if (!res.ok) throw new Error();
      setItems((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
      setUnreadCount((c) => Math.max(0, c - 1));
    } catch {
      toast.error("Could not mark as read");
    }
  };

  const deleteSingle = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/notifications/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      setItems((prev) => prev.filter((n) => n.id !== id));
      setTotal((t) => Math.max(0, t - 1));
      toast.success("Deleted");
    } catch {
      toast.error("Could not delete");
    }
  };

  const markAllRead = async () => {
    try {
      const res = await fetch("/api/admin/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "markAllRead" }),
      });
      if (!res.ok) throw new Error();
      toast.success("All caught up");
      fetchData();
    } catch {
      toast.error("Could not mark all as read");
    }
  };

  return (
    <div>
      <AdminPageHeader
        title="Notifications"
        description={
          unreadCount > 0
            ? `${unreadCount} unread of ${total} total`
            : `${total} total`
        }
        actions={
          <>
            <button
              type="button"
              onClick={fetchData}
              className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg text-sm text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              Refresh
            </button>
            <button
              type="button"
              onClick={markAllRead}
              disabled={unreadCount === 0}
              className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg text-sm text-white bg-amber-600 hover:bg-amber-700 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <Check className="h-4 w-4" aria-hidden="true" />
              Mark all read
            </button>
            <Link
              href="/admin/notifications/preferences"
              className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg text-sm text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <Settings2 className="h-4 w-4" aria-hidden="true" />
              Preferences
            </Link>
          </>
        }
      />

      {/* Read-state tabs */}
      <div
        className="inline-flex items-center gap-1 p-1 bg-white border border-slate-200 rounded-lg mb-4"
        role="tablist"
        aria-label="Read state"
      >
        {(
          [
            { value: "all", label: "All" },
            { value: "unread", label: `Unread${unreadCount > 0 ? ` (${unreadCount})` : ""}` },
            { value: "read", label: "Read" },
          ] as { value: ReadFilter; label: string }[]
        ).map((tab) => (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={readFilter === tab.value ? "true" : "false"}
            onClick={() => setReadFilter(tab.value)}
            className={clsx(
              "h-8 px-3 rounded-md text-sm transition-colors",
              readFilter === tab.value
                ? "bg-amber-600 text-white"
                : "text-slate-600 hover:bg-slate-100"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <div className="relative flex-1 min-w-[14rem] max-w-md">
          <SearchIcon
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"
            aria-hidden="true"
          />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search title or message…"
            className="w-full h-9 pl-9 pr-3 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as NotificationType | "")}
          className="h-9 px-3 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          aria-label="Filter by type"
        >
          <option value="">All types</option>
          {ALL_TYPES.map((t) => (
            <option key={t} value={t}>
              {labelForType(t)}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-1" role="group" aria-label="Filter by priority">
          <button
            type="button"
            onClick={() => setPriorityFilter("")}
            className={clsx(
              "h-9 px-3 rounded-lg text-xs font-semibold transition-colors",
              priorityFilter === ""
                ? "bg-slate-900 text-white"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            )}
          >
            Any
          </button>
          {ALL_PRIORITIES.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPriorityFilter(p)}
              className={clsx(
                "h-9 px-3 rounded-lg text-xs font-semibold transition-colors",
                priorityFilter === p
                  ? "ring-2 ring-offset-1 ring-amber-400"
                  : "",
                PRIORITY_BADGE[p]
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Bulk action bar */}
      {selected.size > 0 && (
        <div className="sticky top-14 z-20 flex items-center justify-between gap-3 mb-3 px-4 py-2 bg-amber-50 border border-amber-200 rounded-lg">
          <span className="text-sm text-amber-900 font-medium">
            {selected.size} selected
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSelected(new Set())}
              className="h-8 px-3 rounded-md text-sm text-amber-900 hover:bg-amber-100"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={bulkMarkRead}
              className="inline-flex items-center gap-1.5 h-8 px-3 rounded-md text-sm text-white bg-amber-600 hover:bg-amber-700"
            >
              <Check className="h-4 w-4" aria-hidden="true" />
              Mark read
            </button>
            <button
              type="button"
              onClick={bulkDelete}
              className="inline-flex items-center gap-1.5 h-8 px-3 rounded-md text-sm text-white bg-red-600 hover:bg-red-700"
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
              Delete
            </button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-2.5 border-b border-slate-200 bg-slate-50">
          <input
            type="checkbox"
            checked={allOnPageSelected}
            onChange={togglePage}
            aria-label="Select all on page"
            className="h-4 w-4 rounded border-slate-300 text-amber-600 focus:ring-amber-400"
          />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Notification
          </span>
        </div>

        {loading ? (
          <div className="p-4 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        ) : error ? (
          <div className="p-6 text-center text-sm text-red-600">{error}</div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={Bell}
            title="No notifications"
            message={
              search || typeFilter || priorityFilter || readFilter !== "all"
                ? "No notifications match your filters."
                : "You'll see new bookings, inquiries, and alerts here."
            }
          />
        ) : (
          <ul className="divide-y divide-slate-100">
            {filtered.map((n) => {
              const link = linkForNotification(n);
              const Icon = iconForType(n.type);
              const surface = iconSurfaceFor(n.priority);
              const isSelected = selected.has(n.id);
              return (
                <li
                  key={n.id}
                  className={clsx(
                    "flex items-start gap-3 px-4 py-3 transition-colors",
                    !n.isRead ? "bg-amber-50/40" : "hover:bg-slate-50",
                    isSelected && "bg-amber-50"
                  )}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleOne(n.id)}
                    aria-label={`Select notification: ${n.title}`}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-amber-600 focus:ring-amber-400"
                  />

                  <div
                    className={clsx(
                      "shrink-0 h-10 w-10 rounded-lg flex items-center justify-center",
                      surface
                    )}
                    aria-hidden="true"
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={clsx(
                          "text-[10px] font-semibold px-1.5 py-0.5 rounded-full uppercase tracking-wide",
                          PRIORITY_BADGE[n.priority]
                        )}
                      >
                        {n.priority}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {labelForType(n.type)}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        · {formatDistanceToNow(new Date(n.createdAt), { addSuffix: true })}
                      </span>
                      {!n.isRead && (
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-amber-500"
                          aria-label="Unread"
                        />
                      )}
                    </div>

                    {link ? (
                      <Link
                        href={link}
                        onClick={() => !n.isRead && markSingleRead(n.id)}
                        className="block mt-0.5 group"
                      >
                        <p className="font-medium text-slate-900 text-sm group-hover:text-amber-700 transition-colors">
                          {n.title}
                        </p>
                        <p className="text-sm text-slate-600 line-clamp-2">
                          {n.message}
                        </p>
                      </Link>
                    ) : (
                      <div className="mt-0.5">
                        <p className="font-medium text-slate-900 text-sm">
                          {n.title}
                        </p>
                        <p className="text-sm text-slate-600 line-clamp-2">
                          {n.message}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    {!n.isRead && (
                      <button
                        type="button"
                        onClick={() => markSingleRead(n.id)}
                        className="p-1.5 hover:bg-slate-100 rounded text-slate-400 hover:text-emerald-600"
                        aria-label="Mark as read"
                        title="Mark as read"
                      >
                        <Check className="h-4 w-4" aria-hidden="true" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => deleteSingle(n.id)}
                      className="p-1.5 hover:bg-slate-100 rounded text-slate-400 hover:text-red-600"
                      aria-label="Delete notification"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {/* Pagination */}
        {totalPages > 1 && !loading && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 bg-slate-50">
            <span className="text-xs text-slate-500">
              Page {page + 1} of {totalPages}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="inline-flex items-center gap-1 h-8 px-3 rounded-md text-sm text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                Prev
              </button>
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1}
                className="inline-flex items-center gap-1 h-8 px-3 rounded-md text-sm text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-40"
              >
                Next
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
