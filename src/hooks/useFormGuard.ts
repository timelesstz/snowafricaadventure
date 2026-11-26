"use client";

import { useCallback, useEffect, useRef } from "react";
import { loadTurnstile, TURNSTILE_SITE_KEY, type TurnstileApi } from "@/lib/turnstile-client";

/** Refresh well before the server's 24-hour limit. */
const REFRESH_AFTER_MS = 12 * 60 * 60 * 1000;
/** How long a submit waits for a Turnstile token still being worked out. */
const TURNSTILE_WAIT_MS = 6_000;
/** Cloudflare's minimum width for the "flexible" widget. */
const FLEXIBLE_MIN_WIDTH = 300;

async function fetchToken(): Promise<string | null> {
  try {
    const res = await fetch("/api/form-token/", { cache: "no-store" });
    if (!res.ok) return null;
    const data = (await res.json()) as { token?: string | null };
    return data.token ?? null;
  } catch {
    return null;
  }
}

export interface FormGuardFields {
  formToken: string | null;
  turnstileToken: string | null;
}

interface FormGuardOptions {
  /** Turnstile action name, shown in Cloudflare analytics (a-z, 0-9, _ -). */
  action?: string;
  /** Widget theme; use "dark" on dark form backgrounds. */
  theme?: "auto" | "light" | "dark";
}

/**
 * Spam checks for a public form. Two independent signals go with each lead:
 *
 * - `formToken`: a signed, timestamped token from /api/form-token/, fetched
 *   when the form mounts (after the page is idle, so it never competes with
 *   LCP). Catches scripts and instant submits (see lib/form-guard.ts).
 * - `turnstileToken`: Cloudflare Turnstile, rendered into the element given
 *   `turnstileRef` once it scrolls into view. Invisible for most visitors; it
 *   only shows a checkbox when Cloudflare needs one. Off without a site key.
 *
 * `getGuardFields` resolves to both, with null for any that isn't ready, so
 * the server triages the lead instead of dropping it.
 */
export function useFormGuard({ action, theme = "auto" }: FormGuardOptions = {}) {
  const tokenRef = useRef<{ token: string; fetchedAt: number } | null>(null);
  const pendingRef = useRef<Promise<string | null> | null>(null);

  const load = useCallback(() => {
    if (!pendingRef.current) {
      pendingRef.current = fetchToken().then((token) => {
        pendingRef.current = null;
        tokenRef.current = token ? { token, fetchedAt: Date.now() } : null;
        return token;
      });
    }
    return pendingRef.current;
  }, []);

  useEffect(() => {
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => void load(), { timeout: 2000 });
      return () => w.cancelIdleCallback?.(id);
    }
    const id = window.setTimeout(() => void load(), 1);
    return () => window.clearTimeout(id);
  }, [load]);

  const getFormToken = useCallback((): string | null => {
    const current = tokenRef.current;
    if (current && Date.now() - current.fetchedAt < REFRESH_AFTER_MS) return current.token;
    // No usable token: one fetched now would be younger than the server's
    // minimum fill time and read as a bot. Send none, so the server triages
    // the lead (kept when it looks human), and get one ready for next time.
    if (!pendingRef.current) void load();
    return null;
  }, [load]);

  // --- Cloudflare Turnstile -------------------------------------------------
  const turnstile = useRef<{ api: TurnstileApi; widgetId: string } | null>(null);
  const turnstileToken = useRef<string | null>(null);
  const turnstileWaiters = useRef<Array<(token: string | null) => void>>([]);
  const detach = useRef<(() => void) | null>(null);

  const settleWaiters = (token: string | null) => {
    for (const resolve of turnstileWaiters.current.splice(0)) resolve(token);
  };

  /** Callback ref for the element the Turnstile widget renders into. */
  const turnstileRef = useCallback(
    (el: HTMLDivElement | null) => {
      detach.current?.();
      detach.current = null;
      if (!el || !TURNSTILE_SITE_KEY) return;

      // Most visitors never see the widget. Until Cloudflare needs a click,
      // the slot has no box, so it adds no gap to the form's spacing.
      const collapse = () => (el.style.display = "contents");
      const expand = () => (el.style.display = "");
      collapse();

      let cancelled = false;
      const render = async () => {
        const api = await loadTurnstile();
        if (!api || cancelled || !el.isConnected) return;
        // "flexible" needs at least 300px; narrow cards on phones get the
        // compact square widget instead of one that spills past the edge.
        const room = (el.parentElement ?? el).clientWidth;
        const widgetId = api.render(el, {
          sitekey: TURNSTILE_SITE_KEY,
          action,
          theme,
          size: room > 0 && room < FLEXIBLE_MIN_WIDTH ? "compact" : "flexible",
          appearance: "interaction-only",
          callback: (token) => {
            turnstileToken.current = token;
            settleWaiters(token);
          },
          "expired-callback": () => {
            turnstileToken.current = null;
          },
          "error-callback": () => {
            turnstileToken.current = null;
            settleWaiters(null);
          },
          "before-interactive-callback": expand,
          "after-interactive-callback": collapse,
        });
        turnstile.current = { api, widgetId };
      };

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            observer.disconnect();
            void render();
          }
        },
        { rootMargin: "400px" }
      );
      // The collapsed slot has no box of its own, so watch its container.
      observer.observe(el.parentElement ?? el);

      detach.current = () => {
        cancelled = true;
        observer.disconnect();
        if (turnstile.current) {
          try {
            turnstile.current.api.remove(turnstile.current.widgetId);
          } catch {
            // Widget already gone with its element
          }
        }
        turnstile.current = null;
        turnstileToken.current = null;
        settleWaiters(null);
      };
    },
    [action, theme]
  );

  useEffect(() => () => detach.current?.(), []);

  const getTurnstileToken = useCallback(async (): Promise<string | null> => {
    if (!TURNSTILE_SITE_KEY || !turnstile.current) return null;
    const ready = turnstileToken.current ?? turnstile.current.api.getResponse(turnstile.current.widgetId) ?? null;
    const token =
      ready ||
      (await new Promise<string | null>((resolve) => {
        turnstileWaiters.current.push(resolve);
        setTimeout(() => resolve(null), TURNSTILE_WAIT_MS);
      }));
    // Turnstile tokens are single-use: get a fresh one for any retry.
    if (token && turnstile.current) {
      turnstileToken.current = null;
      try {
        turnstile.current.api.reset(turnstile.current.widgetId);
      } catch {
        // Widget removed meanwhile
      }
    }
    return token;
  }, []);

  /** Both spam-check values for this submission. */
  const getGuardFields = useCallback(
    async (): Promise<FormGuardFields> => ({
      formToken: getFormToken(),
      turnstileToken: await getTurnstileToken(),
    }),
    [getFormToken, getTurnstileToken]
  );

  /** Call after a successful send: the server accepts each form token for
   * one lead only, so a second request from the same form needs a new one.
   * A failed send keeps its token, so the visitor can fix an error and resend. */
  const renewFormToken = useCallback(() => {
    tokenRef.current = null;
    void load();
  }, [load]);

  return { getGuardFields, renewFormToken, turnstileRef };
}
