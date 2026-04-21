"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import Link from "next/link";
import { Bell, Check, CheckCheck, Settings2, Trash2, X } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { clsx } from "clsx";
import { toast } from "sonner";
import type { NotificationPriority } from "@prisma/client";
import {
  iconForType,
  iconSurfaceFor,
  PRIORITY_BADGE,
  linkForNotification,
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

interface NotificationsResponse {
  notifications: Notification[];
  total: number;
  unreadCount: number;
}

type Variant = "dark" | "light";

const SOUND_KEY = "admin:notifications:sound";
const MUTED_KEY = "admin:notifications:muted";

function readMutedTypes(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(MUTED_KEY);
    return new Set<string>(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

function playChime() {
  if (typeof window === "undefined") return;
  if (window.localStorage.getItem(SOUND_KEY) !== "on") return;
  try {
    const audio = new Audio("/admin/notification.mp3");
    audio.volume = 0.4;
    void audio.play().catch(() => {
      // Autoplay blocked or file missing — silent fallback.
    });
  } catch {
    // ignore
  }
}

export default function NotificationBell({
  variant = "light",
}: {
  variant?: Variant;
} = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pulse, setPulse] = useState(false);
  const prevUnreadRef = useRef<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const fetchNotifications = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/notifications?limit=20");
      if (!response.ok) return;
      const data: NotificationsResponse = await response.json();
      const muted = readMutedTypes();
      const visible = muted.size
        ? data.notifications.filter((n) => !muted.has(n.type))
        : data.notifications;
      setNotifications(visible);
      setUnreadCount(data.unreadCount);

      if (
        prevUnreadRef.current !== null &&
        data.unreadCount > prevUnreadRef.current
      ) {
        setPulse(true);
        playChime();
        window.setTimeout(() => setPulse(false), 2000);
      }
      prevUnreadRef.current = data.unreadCount;
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const markAsRead = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/notifications/${id}`, {
        method: "PATCH",
      });
      if (!response.ok) throw new Error("Request failed");
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
      toast.error("Could not mark notification as read");
    }
  };

  const markAllAsRead = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "markAllRead" }),
      });
      if (!response.ok) throw new Error("Request failed");
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
      toast.success("All notifications marked as read");
    } catch (error) {
      console.error("Failed to mark all as read:", error);
      toast.error("Could not mark all as read");
    } finally {
      setLoading(false);
    }
  };

  const deleteNotification = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/notifications/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Request failed");
      const notification = notifications.find((n) => n.id === id);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
      if (notification && !notification.isRead) {
        setUnreadCount((prev) => Math.max(0, prev - 1));
      }
      toast.success("Notification removed");
    } catch (error) {
      console.error("Failed to delete notification:", error);
      toast.error("Could not remove notification");
    }
  };

  const buttonClasses = useMemo(
    () =>
      clsx(
        "relative inline-flex items-center justify-center h-10 w-10 rounded-lg transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2",
        variant === "dark"
          ? "text-slate-200 hover:bg-slate-700/70 focus-visible:ring-offset-slate-800"
          : "text-slate-600 hover:bg-slate-100 focus-visible:ring-offset-white"
      ),
    [variant]
  );

  const badgeClasses = clsx(
    "absolute -top-0.5 -right-0.5 min-w-[1.15rem] h-[1.15rem] px-1 rounded-full",
    "text-[10px] font-bold leading-none flex items-center justify-center",
    "bg-red-500 text-white ring-2",
    variant === "dark" ? "ring-slate-800" : "ring-white",
    pulse && "animate-pulse"
  );

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className={buttonClasses}
        aria-haspopup="dialog"
        aria-expanded={isOpen ? "true" : "false"}
        aria-label={
          unreadCount > 0
            ? `Notifications (${unreadCount} unread)`
            : "Notifications"
        }
      >
        <Bell className="h-5 w-5" aria-hidden="true" />
        {unreadCount > 0 && (
          <span className={badgeClasses} aria-hidden="true">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div
            ref={dropdownRef}
            role="dialog"
            aria-label="Notifications"
            className={clsx(
              "z-50 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden",
              // Desktop: anchored dropdown
              "sm:absolute sm:right-0 sm:mt-2 sm:w-[22rem]",
              // Mobile: full-width fixed panel
              "fixed inset-x-2 top-16 sm:inset-auto sm:top-auto"
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-slate-50">
              <div>
                <h3 className="font-semibold text-slate-900 text-sm">
                  Notifications
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {unreadCount > 0
                    ? `${unreadCount} unread`
                    : "You're all caught up"}
                </p>
              </div>
              <div className="flex items-center gap-1">
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={markAllAsRead}
                    disabled={loading}
                    className="text-xs text-amber-700 hover:text-amber-800 flex items-center gap-1 px-2 py-1 rounded hover:bg-amber-50 disabled:opacity-50 transition-colors"
                  >
                    <CheckCheck className="h-3.5 w-3.5" aria-hidden="true" />
                    Mark all read
                  </button>
                )}
                <Link
                  href="/admin/notifications/preferences"
                  onClick={() => setIsOpen(false)}
                  aria-label="Notification preferences"
                  title="Preferences"
                  className="p-1.5 hover:bg-slate-200 rounded text-slate-500 hover:text-slate-700 transition-colors"
                >
                  <Settings2 className="h-4 w-4" aria-hidden="true" />
                </Link>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close notifications"
                  className="p-1.5 hover:bg-slate-200 rounded text-slate-500 hover:text-slate-700 transition-colors"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* List */}
            <div className="max-h-[min(70vh,420px)] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="px-4 py-10 text-center text-slate-500">
                  <Bell
                    className="h-8 w-8 mx-auto mb-2 opacity-40"
                    aria-hidden="true"
                  />
                  <p className="text-sm">No notifications yet</p>
                  <p className="text-xs text-slate-400 mt-1">
                    New bookings and inquiries will appear here.
                  </p>
                </div>
              ) : (
                notifications.map((notification) => {
                  const link = linkForNotification(notification);
                  const Icon = iconForType(notification.type);
                  const surface = iconSurfaceFor(notification.priority);
                  return (
                    <div
                      key={notification.id}
                      className={clsx(
                        "px-3 py-3 border-b border-slate-100 last:border-b-0 transition-colors",
                        !notification.isRead
                          ? "bg-amber-50/40 hover:bg-amber-50/70"
                          : "hover:bg-slate-50"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={clsx(
                            "shrink-0 h-9 w-9 rounded-lg flex items-center justify-center",
                            surface
                          )}
                          aria-hidden="true"
                        >
                          <Icon className="h-4.5 w-4.5" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span
                              className={clsx(
                                "text-[10px] font-semibold px-1.5 py-0.5 rounded-full uppercase tracking-wide",
                                PRIORITY_BADGE[notification.priority]
                              )}
                            >
                              {notification.priority}
                            </span>
                            <span className="text-[11px] text-slate-400">
                              {formatDistanceToNow(
                                new Date(notification.createdAt),
                                { addSuffix: true }
                              )}
                            </span>
                            {!notification.isRead && (
                              <span
                                className="h-1.5 w-1.5 rounded-full bg-amber-500"
                                aria-label="Unread"
                              />
                            )}
                          </div>

                          {link ? (
                            <Link
                              href={link}
                              onClick={() => {
                                if (!notification.isRead) {
                                  markAsRead(notification.id);
                                }
                                setIsOpen(false);
                              }}
                              className="block mt-1 group"
                            >
                              <p className="font-medium text-slate-900 text-sm group-hover:text-amber-700 transition-colors line-clamp-1">
                                {notification.title}
                              </p>
                              <p className="text-xs text-slate-600 line-clamp-2 mt-0.5">
                                {notification.message}
                              </p>
                            </Link>
                          ) : (
                            <div className="mt-1">
                              <p className="font-medium text-slate-900 text-sm line-clamp-1">
                                {notification.title}
                              </p>
                              <p className="text-xs text-slate-600 line-clamp-2 mt-0.5">
                                {notification.message}
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col items-center gap-1">
                          {!notification.isRead && (
                            <button
                              type="button"
                              onClick={() => markAsRead(notification.id)}
                              className="p-1 hover:bg-slate-200 rounded text-slate-400 hover:text-emerald-600 transition-colors"
                              aria-label="Mark notification as read"
                              title="Mark as read"
                            >
                              <Check className="h-4 w-4" aria-hidden="true" />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => deleteNotification(notification.id)}
                            className="p-1 hover:bg-slate-200 rounded text-slate-400 hover:text-red-600 transition-colors"
                            aria-label="Delete notification"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <Link
                href="/admin/notifications"
                className="text-xs font-medium text-amber-700 hover:text-amber-800"
                onClick={() => setIsOpen(false)}
              >
                View all notifications →
              </Link>
              <Link
                href="/admin/notifications/preferences"
                className="text-xs text-slate-500 hover:text-slate-700"
                onClick={() => setIsOpen(false)}
              >
                Preferences
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
