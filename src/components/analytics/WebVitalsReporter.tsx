"use client";

import { useEffect } from "react";
import {
  initWebVitals,
  createWebVitalsReporter,
} from "@/lib/analytics/web-vitals";

interface WebVitalsReporterProps {
  /**
   * Enable debug logging to console
   * Default: true in development, false in production
   */
  debug?: boolean;
  /**
   * Analytics endpoint to send metrics to
   * If not provided, metrics are only logged (in debug mode)
   */
  endpoint?: string;
}

/**
 * Web Vitals Reporter Component
 *
 * Add to your root layout to automatically track Core Web Vitals:
 * - LCP (Largest Contentful Paint)
 * - FID (First Input Delay)
 * - CLS (Cumulative Layout Shift)
 * - TTFB (Time to First Byte)
 * - INP (Interaction to Next Paint)
 * - FCP (First Contentful Paint)
 *
 * @example
 * // In app/layout.tsx
 * import { WebVitalsReporter } from "@/components/analytics/WebVitalsReporter";
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         {children}
 *         <WebVitalsReporter endpoint="/api/analytics/vitals" />
 *       </body>
 *     </html>
 *   );
 * }
 */
export function WebVitalsReporter({ debug, endpoint }: WebVitalsReporterProps) {
  useEffect(() => {
    const reporter = createWebVitalsReporter({ debug, endpoint });
    initWebVitals(reporter);
  }, [debug, endpoint]);

  // This component doesn't render anything
  return null;
}

export default WebVitalsReporter;
