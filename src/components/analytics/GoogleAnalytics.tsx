"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

// Support multiple GA4 Measurement IDs
const GA_MEASUREMENT_IDS = [
  process.env.NEXT_PUBLIC_GA_ID,           // Primary: G-56M3GQC18Q
  process.env.NEXT_PUBLIC_GA_ID_SECONDARY, // Secondary: G-W0CEF6KK96
].filter(Boolean) as string[];

// Primary ID for gtag script loading
const PRIMARY_GA_ID = GA_MEASUREMENT_IDS[0];

function GoogleAnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (GA_MEASUREMENT_IDS.length === 0 || typeof window === "undefined") return;

    const url = pathname + (searchParams?.toString() ? `?${searchParams}` : "");

    // Send page view to ALL configured GA properties
    GA_MEASUREMENT_IDS.forEach((measurementId) => {
      window.gtag?.("config", measurementId, {
        page_path: url,
      });
    });
  }, [pathname, searchParams]);

  return null;
}

export default function GoogleAnalytics() {
  if (GA_MEASUREMENT_IDS.length === 0) {
    return null;
  }

  // Build config strings for all measurement IDs
  const configStatements = GA_MEASUREMENT_IDS.map(
    (id) => `gtag('config', '${id}', {
              page_location: window.location.href,
              page_path: window.location.pathname,
              send_page_view: true,
            });`
  ).join("\n            ");

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${PRIMARY_GA_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            ${configStatements}
          `,
        }}
      />
      <Suspense fallback={null}>
        <GoogleAnalyticsTracker />
      </Suspense>
    </>
  );
}

// Export measurement IDs for use in other components
export { GA_MEASUREMENT_IDS };
