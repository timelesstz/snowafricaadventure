"use client";

import { useEffect } from "react";

export function NotFoundTracker() {
  useEffect(() => {
    fetch("/api/track-404", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: window.location.pathname + window.location.search,
        userAgent: navigator.userAgent,
        referer: document.referrer || null,
      }),
    }).catch(() => {});
  }, []);

  return null;
}
