"use client";

import { getGaClientId, parseUtmParams } from "@/lib/analytics";

export interface ClientTrackingData {
  gaClientId: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  referrerUrl: string | null;
  landingPage: string | null;
}

/**
 * Collects client-side tracking data to send with form submissions.
 * UTM params and landing page are persisted in sessionStorage so they
 * survive page navigation within the same session.
 */
export async function collectClientTracking(): Promise<ClientTrackingData> {
  const gaClientId = await getGaClientId();

  // Persist landing page on first visit
  let landingPage: string | null = null;
  try {
    landingPage = sessionStorage.getItem("sa_landing_page");
    if (!landingPage) {
      landingPage = window.location.pathname;
      sessionStorage.setItem("sa_landing_page", landingPage);
    }
  } catch {
    landingPage = window.location.pathname;
  }

  // Persist UTM params from landing URL
  let utmSource: string | null = null;
  let utmMedium: string | null = null;
  let utmCampaign: string | null = null;

  try {
    const storedUtm = sessionStorage.getItem("sa_utm");
    if (storedUtm) {
      const parsed = JSON.parse(storedUtm);
      utmSource = parsed.utmSource || null;
      utmMedium = parsed.utmMedium || null;
      utmCampaign = parsed.utmCampaign || null;
    } else {
      const params = parseUtmParams(
        new URLSearchParams(window.location.search)
      );
      utmSource = params.utmSource;
      utmMedium = params.utmMedium;
      utmCampaign = params.utmCampaign;
      if (utmSource || utmMedium || utmCampaign) {
        sessionStorage.setItem("sa_utm", JSON.stringify(params));
      }
    }
  } catch {
    // sessionStorage not available
  }

  // Referrer
  const referrerUrl = document.referrer || null;

  return {
    gaClientId,
    utmSource,
    utmMedium,
    utmCampaign,
    referrerUrl,
    landingPage,
  };
}
