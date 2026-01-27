/**
 * Core Web Vitals Monitoring
 *
 * Tracks real user metrics for:
 * - LCP (Largest Contentful Paint) - loading performance
 * - FID (First Input Delay) - interactivity
 * - CLS (Cumulative Layout Shift) - visual stability
 * - TTFB (Time to First Byte) - server response time
 * - INP (Interaction to Next Paint) - responsiveness
 */

export interface WebVitalsMetric {
  name: "CLS" | "FID" | "LCP" | "TTFB" | "INP" | "FCP";
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  delta: number;
  id: string;
  navigationType: string;
}

// Thresholds based on Google's Core Web Vitals guidelines
const THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 },
  FID: { good: 100, poor: 300 },
  CLS: { good: 0.1, poor: 0.25 },
  TTFB: { good: 800, poor: 1800 },
  INP: { good: 200, poor: 500 },
  FCP: { good: 1800, poor: 3000 },
};

function getRating(
  name: keyof typeof THRESHOLDS,
  value: number
): "good" | "needs-improvement" | "poor" {
  const threshold = THRESHOLDS[name];
  if (value <= threshold.good) return "good";
  if (value <= threshold.poor) return "needs-improvement";
  return "poor";
}

type ReportCallback = (metric: WebVitalsMetric) => void;

/**
 * Initialize Core Web Vitals monitoring
 * Only runs in browser environment
 */
export function initWebVitals(onReport: ReportCallback): void {
  if (typeof window === "undefined") return;

  // Use Performance Observer API for accurate metrics
  try {
    // LCP - Largest Contentful Paint
    observeLCP(onReport);

    // FID - First Input Delay (deprecated but still useful)
    observeFID(onReport);

    // CLS - Cumulative Layout Shift
    observeCLS(onReport);

    // TTFB - Time to First Byte
    observeTTFB(onReport);

    // INP - Interaction to Next Paint (replaces FID)
    observeINP(onReport);

    // FCP - First Contentful Paint
    observeFCP(onReport);
  } catch (e) {
    console.warn("Web Vitals monitoring not supported:", e);
  }
}

function observeLCP(onReport: ReportCallback): void {
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1] as PerformanceEntry & {
      startTime: number;
    };

    if (lastEntry) {
      const value = lastEntry.startTime;
      onReport({
        name: "LCP",
        value,
        rating: getRating("LCP", value),
        delta: value,
        id: generateId(),
        navigationType: getNavigationType(),
      });
    }
  });

  observer.observe({ type: "largest-contentful-paint", buffered: true });
}

function observeFID(onReport: ReportCallback): void {
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries() as (PerformanceEntry & {
      processingStart: number;
      startTime: number;
    })[];

    for (const entry of entries) {
      const value = entry.processingStart - entry.startTime;
      onReport({
        name: "FID",
        value,
        rating: getRating("FID", value),
        delta: value,
        id: generateId(),
        navigationType: getNavigationType(),
      });
    }
  });

  observer.observe({ type: "first-input", buffered: true });
}

function observeCLS(onReport: ReportCallback): void {
  let clsValue = 0;
  let sessionValue = 0;
  let sessionEntries: PerformanceEntry[] = [];

  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries() as (PerformanceEntry & {
      hadRecentInput: boolean;
      value: number;
      startTime: number;
    })[];

    for (const entry of entries) {
      // Only count layout shifts without recent user input
      if (!entry.hadRecentInput) {
        const firstSessionEntry = sessionEntries[0] as
          | (PerformanceEntry & { startTime: number })
          | undefined;
        const lastSessionEntry = sessionEntries[sessionEntries.length - 1] as
          | (PerformanceEntry & { startTime: number })
          | undefined;

        // Start new session if gap > 1s or total > 5s
        if (
          sessionValue &&
          (entry.startTime - (lastSessionEntry?.startTime || 0) > 1000 ||
            entry.startTime - (firstSessionEntry?.startTime || 0) > 5000)
        ) {
          if (sessionValue > clsValue) {
            clsValue = sessionValue;
          }
          sessionValue = 0;
          sessionEntries = [];
        }

        sessionValue += entry.value;
        sessionEntries.push(entry);
      }
    }

    // Report the larger of session or cumulative
    const value = Math.max(clsValue, sessionValue);
    onReport({
      name: "CLS",
      value,
      rating: getRating("CLS", value),
      delta: value,
      id: generateId(),
      navigationType: getNavigationType(),
    });
  });

  observer.observe({ type: "layout-shift", buffered: true });
}

function observeTTFB(onReport: ReportCallback): void {
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries() as PerformanceNavigationTiming[];

    for (const entry of entries) {
      const value = entry.responseStart - entry.requestStart;
      onReport({
        name: "TTFB",
        value,
        rating: getRating("TTFB", value),
        delta: value,
        id: generateId(),
        navigationType: getNavigationType(),
      });
    }
  });

  observer.observe({ type: "navigation", buffered: true });
}

function observeINP(onReport: ReportCallback): void {
  let maxINP = 0;

  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries() as (PerformanceEntry & {
      duration: number;
    })[];

    for (const entry of entries) {
      if (entry.duration > maxINP) {
        maxINP = entry.duration;
        onReport({
          name: "INP",
          value: maxINP,
          rating: getRating("INP", maxINP),
          delta: maxINP,
          id: generateId(),
          navigationType: getNavigationType(),
        });
      }
    }
  });

  // durationThreshold is a valid option for event observations but not in TypeScript types yet
  observer.observe({ type: "event", buffered: true, durationThreshold: 16 } as PerformanceObserverInit);
}

function observeFCP(onReport: ReportCallback): void {
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();

    for (const entry of entries) {
      if (entry.name === "first-contentful-paint") {
        const value = entry.startTime;
        onReport({
          name: "FCP",
          value,
          rating: getRating("FCP", value),
          delta: value,
          id: generateId(),
          navigationType: getNavigationType(),
        });
      }
    }
  });

  observer.observe({ type: "paint", buffered: true });
}

function generateId(): string {
  return `v1-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function getNavigationType(): string {
  if (typeof window === "undefined") return "unknown";

  const navigation = window.performance?.getEntriesByType?.(
    "navigation"
  )[0] as PerformanceNavigationTiming | undefined;

  return navigation?.type || "navigate";
}

/**
 * Default reporter that logs to console in development
 * and can be extended to send to analytics in production
 */
export function createWebVitalsReporter(options?: {
  debug?: boolean;
  endpoint?: string;
}): ReportCallback {
  const { debug = process.env.NODE_ENV === "development", endpoint } =
    options || {};

  return (metric: WebVitalsMetric) => {
    // Log in development
    if (debug) {
      const color =
        metric.rating === "good"
          ? "\x1b[32m"
          : metric.rating === "needs-improvement"
            ? "\x1b[33m"
            : "\x1b[31m";
      console.log(
        `${color}[Web Vitals] ${metric.name}: ${metric.value.toFixed(2)} (${metric.rating})\x1b[0m`
      );
    }

    // Send to analytics endpoint if provided
    if (endpoint) {
      const body = JSON.stringify({
        ...metric,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: Date.now(),
      });

      // Use sendBeacon for reliability
      if (navigator.sendBeacon) {
        navigator.sendBeacon(endpoint, body);
      } else {
        fetch(endpoint, {
          method: "POST",
          body,
          headers: { "Content-Type": "application/json" },
          keepalive: true,
        }).catch(() => {
          // Silently fail - analytics should not break the app
        });
      }
    }
  };
}
