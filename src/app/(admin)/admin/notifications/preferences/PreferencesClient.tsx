"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { clsx } from "clsx";
import { AlertCircle, BellRing, Check, Volume2, VolumeX } from "lucide-react";
import type { NotificationType } from "@prisma/client";
import { AdminPageHeader } from "@/components/admin/ui";
import {
  ALL_TYPES,
  iconForType,
  labelForType,
} from "@/lib/notifications/display";

const SOUND_KEY = "admin:notifications:sound";
const MUTED_KEY = "admin:notifications:muted";

function urlBase64ToBuffer(base64: string): ArrayBuffer {
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const normalized = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(normalized);
  const buffer = new ArrayBuffer(raw.length);
  const view = new Uint8Array(buffer);
  for (let i = 0; i < raw.length; i++) view[i] = raw.charCodeAt(i);
  return buffer;
}

type PushStatus =
  | "unsupported"
  | "denied"
  | "granted-subscribed"
  | "granted-unsubscribed"
  | "default";

export default function PreferencesClient({
  vapidPublicKey,
}: {
  vapidPublicKey: string | null;
}) {
  const [status, setStatus] = useState<PushStatus>("default");
  const [busy, setBusy] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [muted, setMuted] = useState<Set<NotificationType>>(new Set());

  // Load state from browser + SW
  const refreshStatus = useCallback(async () => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      setStatus("unsupported");
      return;
    }
    if (Notification.permission === "denied") {
      setStatus("denied");
      return;
    }
    if (Notification.permission !== "granted") {
      setStatus("default");
      return;
    }
    try {
      const reg = await navigator.serviceWorker.getRegistration("/admin/");
      const sub = await reg?.pushManager.getSubscription();
      setStatus(sub ? "granted-subscribed" : "granted-unsubscribed");
    } catch {
      setStatus("granted-unsubscribed");
    }
  }, []);

  useEffect(() => {
    refreshStatus();
    if (typeof window !== "undefined") {
      setSoundOn(window.localStorage.getItem(SOUND_KEY) === "on");
      try {
        const raw = window.localStorage.getItem(MUTED_KEY);
        const arr = raw ? (JSON.parse(raw) as string[]) : [];
        setMuted(new Set<NotificationType>(arr as NotificationType[]));
      } catch {
        setMuted(new Set());
      }
    }
  }, [refreshStatus]);

  const enablePush = async () => {
    if (!vapidPublicKey) {
      toast.error(
        "Browser push is not configured. Ask an admin to set VAPID keys."
      );
      return;
    }
    setBusy(true);
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        toast.error("Notification permission was not granted");
        await refreshStatus();
        return;
      }
      const reg = await navigator.serviceWorker.getRegistration("/admin/");
      if (!reg) {
        toast.error("Service worker not ready — reload and try again");
        return;
      }
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToBuffer(vapidPublicKey),
      });

      const res = await fetch("/api/admin/notifications/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subscription: sub.toJSON(),
          userAgent: navigator.userAgent,
        }),
      });
      if (!res.ok) throw new Error("Failed to register with server");

      toast.success("Browser notifications enabled");
      await refreshStatus();
    } catch (err) {
      console.error(err);
      toast.error("Could not enable browser notifications");
    } finally {
      setBusy(false);
    }
  };

  const disablePush = async () => {
    setBusy(true);
    try {
      const reg = await navigator.serviceWorker.getRegistration("/admin/");
      const sub = await reg?.pushManager.getSubscription();
      if (sub) {
        const endpoint = sub.endpoint;
        await sub.unsubscribe();
        await fetch("/api/admin/notifications/subscribe", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ endpoint }),
        });
      }
      toast.success("Browser notifications disabled");
      await refreshStatus();
    } catch (err) {
      console.error(err);
      toast.error("Could not disable browser notifications");
    } finally {
      setBusy(false);
    }
  };

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    window.localStorage.setItem(SOUND_KEY, next ? "on" : "off");
    toast.success(next ? "Sound enabled" : "Sound muted");
  };

  const toggleMuted = (t: NotificationType) => {
    setMuted((prev) => {
      const next = new Set(prev);
      if (next.has(t)) next.delete(t);
      else next.add(t);
      window.localStorage.setItem(MUTED_KEY, JSON.stringify([...next]));
      return next;
    });
  };

  const pushLabel =
    status === "granted-subscribed"
      ? "Enabled"
      : status === "denied"
        ? "Blocked by browser"
        : status === "unsupported"
          ? "Not supported"
          : "Disabled";

  return (
    <div className="max-w-3xl">
      <AdminPageHeader
        title="Notification preferences"
        description="Choose how you're alerted when new notifications arrive."
      />

      <section className="bg-white border border-slate-200 rounded-xl p-5 mb-5">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <BellRing className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div>
                <h2 className="font-semibold text-slate-900">
                  Browser notifications
                </h2>
                <p className="text-sm text-slate-600 mt-0.5">
                  Receive native OS alerts even when this tab is in the
                  background.
                </p>
              </div>
              <span
                className={clsx(
                  "text-xs font-semibold px-2 py-1 rounded-full",
                  status === "granted-subscribed"
                    ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                    : status === "denied"
                      ? "bg-red-50 text-red-700 ring-1 ring-red-200"
                      : "bg-slate-100 text-slate-600 ring-1 ring-slate-200"
                )}
              >
                {pushLabel}
              </span>
            </div>

            {status === "unsupported" && (
              <div className="mt-3 flex items-start gap-2 text-sm text-slate-600 bg-slate-50 border border-slate-200 rounded-lg p-3">
                <AlertCircle className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" aria-hidden="true" />
                <span>
                  This browser doesn&rsquo;t support push notifications, or the
                  admin service worker hasn&rsquo;t registered yet. Try reloading.
                </span>
              </div>
            )}

            {status === "denied" && (
              <div className="mt-3 flex items-start gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">
                <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
                <span>
                  Notifications are blocked in your browser settings. Unblock
                  this site in your browser&rsquo;s site permissions to enable.
                </span>
              </div>
            )}

            {!vapidPublicKey && status !== "unsupported" && (
              <div className="mt-3 flex items-start gap-2 text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg p-3">
                <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
                <span>
                  Browser push is not configured on the server. A super-admin
                  needs to set <code className="px-1 py-0.5 rounded bg-amber-100 font-mono text-xs">VAPID_PUBLIC_KEY</code>,{" "}
                  <code className="px-1 py-0.5 rounded bg-amber-100 font-mono text-xs">VAPID_PRIVATE_KEY</code> and{" "}
                  <code className="px-1 py-0.5 rounded bg-amber-100 font-mono text-xs">NEXT_PUBLIC_VAPID_PUBLIC_KEY</code> env vars.
                </span>
              </div>
            )}

            <div className="mt-4">
              {status === "granted-subscribed" ? (
                <button
                  type="button"
                  onClick={disablePush}
                  disabled={busy}
                  className="inline-flex items-center gap-1.5 h-9 px-4 rounded-lg text-sm text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-50"
                >
                  Disable browser notifications
                </button>
              ) : (
                <button
                  type="button"
                  onClick={enablePush}
                  disabled={
                    busy ||
                    status === "denied" ||
                    status === "unsupported" ||
                    !vapidPublicKey
                  }
                  className="inline-flex items-center gap-1.5 h-9 px-4 rounded-lg text-sm text-white bg-amber-600 hover:bg-amber-700 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Check className="h-4 w-4" aria-hidden="true" />
                  Enable browser notifications
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border border-slate-200 rounded-xl p-5 mb-5">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
            {soundOn ? (
              <Volume2 className="h-5 w-5" aria-hidden="true" />
            ) : (
              <VolumeX className="h-5 w-5" aria-hidden="true" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="font-semibold text-slate-900">Sound on arrival</h2>
                <p className="text-sm text-slate-600 mt-0.5">
                  Play a short chime when a new notification arrives in this
                  tab.
                </p>
              </div>
              <button
                type="button"
                onClick={toggleSound}
                aria-pressed={soundOn ? "true" : "false"}
                className={clsx(
                  "relative h-6 w-11 rounded-full transition-colors",
                  soundOn ? "bg-amber-600" : "bg-slate-300"
                )}
              >
                <span className="sr-only">
                  {soundOn ? "Mute sound" : "Enable sound"}
                </span>
                <span
                  className={clsx(
                    "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
                    soundOn ? "translate-x-5" : "translate-x-0.5"
                  )}
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border border-slate-200 rounded-xl p-5">
        <h2 className="font-semibold text-slate-900">Notification types</h2>
        <p className="text-sm text-slate-600 mt-0.5 mb-4">
          Hide specific types from your bell dropdown. These settings apply
          only to your browser.
        </p>
        <ul className="grid sm:grid-cols-2 gap-2">
          {ALL_TYPES.map((t) => {
            const Icon = iconForType(t);
            const isMuted = muted.has(t);
            return (
              <li key={t}>
                <label className="flex items-center gap-3 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!isMuted}
                    onChange={() => toggleMuted(t)}
                    className="h-4 w-4 rounded border-slate-300 text-amber-600 focus:ring-amber-400"
                  />
                  <Icon className="h-4 w-4 text-slate-500" aria-hidden="true" />
                  <span className="text-sm text-slate-700 flex-1">
                    {labelForType(t)}
                  </span>
                  {isMuted && (
                    <span className="text-[10px] font-semibold text-slate-400 uppercase">
                      Hidden
                    </span>
                  )}
                </label>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
