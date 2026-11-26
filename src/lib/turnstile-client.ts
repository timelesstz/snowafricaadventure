"use client";

/**
 * Cloudflare Turnstile loader for the public forms. The script is loaded
 * once, only when a form with a Turnstile slot scrolls into view, so pages
 * where nobody reaches a form never download it.
 *
 * Off unless NEXT_PUBLIC_TURNSTILE_SITE_KEY is set at build time.
 */

export const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

export interface TurnstileRenderOptions {
  sitekey: string;
  action?: string;
  theme?: "auto" | "light" | "dark";
  size?: "normal" | "flexible" | "compact";
  appearance?: "always" | "execute" | "interaction-only";
  callback?: (token: string) => void;
  "expired-callback"?: () => void;
  "error-callback"?: () => void;
  /** Cloudflare is about to show the visitor a checkbox. */
  "before-interactive-callback"?: () => void;
  /** The visitor finished that check. */
  "after-interactive-callback"?: () => void;
}

export interface TurnstileApi {
  render: (el: HTMLElement, options: TurnstileRenderOptions) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
  getResponse: (widgetId: string) => string | undefined;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let loading: Promise<TurnstileApi | null> | null = null;

export function loadTurnstile(): Promise<TurnstileApi | null> {
  if (typeof window === "undefined" || !TURNSTILE_SITE_KEY) return Promise.resolve(null);
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (!loading) {
    loading = new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve(window.turnstile ?? null);
      script.onerror = () => {
        // Blocked or offline: forms still send, and the server triages the
        // lead instead of dropping it. Allow a retry on the next form.
        loading = null;
        script.remove();
        resolve(null);
      };
      document.head.appendChild(script);
    });
  }
  return loading;
}
