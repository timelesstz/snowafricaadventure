"use client";

import { useCallback, useEffect, useRef } from "react";

/** Refresh well before the server's 24-hour limit. */
const REFRESH_AFTER_MS = 12 * 60 * 60 * 1000;

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

/**
 * Fetches the form's spam-check token when the form mounts (after the page
 * is idle, so it never competes with LCP). `getFormToken` resolves to the
 * token to send as `formToken` with the submission, or null when there is
 * none to send (the server then triages the lead instead of dropping it).
 */
export function useFormGuard() {
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

  /** Token to send with this submission. */
  const getFormToken = useCallback(async (): Promise<string | null> => {
    const current = tokenRef.current;
    if (current && Date.now() - current.fetchedAt < REFRESH_AFTER_MS) return current.token;
    if (pendingRef.current) return pendingRef.current;
    // No usable token: one fetched now would be younger than the server's
    // minimum fill time and read as a bot. Send none, so the server triages
    // the lead (kept when it looks human), and get one ready for next time.
    void load();
    return null;
  }, [load]);

  /** Call after a successful send: the server accepts each token for one
   * lead only, so a second request from the same form needs a new one. A
   * failed send keeps its token, so the visitor can fix an error and resend. */
  const renewFormToken = useCallback(() => {
    tokenRef.current = null;
    void load();
  }, [load]);

  return { getFormToken, renewFormToken };
}
