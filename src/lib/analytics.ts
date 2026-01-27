/**
 * Google Analytics 4 Event Tracking Utilities
 * =============================================
 * Use these functions to track custom events throughout the application.
 */

declare global {
  interface Window {
    gtag?: {
      (
        command: "event" | "config" | "js" | "set",
        eventName: string,
        params?: Record<string, unknown>
      ): void;
      (
        command: "get",
        targetId: string,
        fieldName: string,
        callback: (value: string) => void
      ): void;
    };
  }
}

type GtagEvent = {
  action: string;
  category: string;
  label?: string;
  value?: number;
  // Custom parameters
  [key: string]: unknown;
};

/**
 * Core event tracking function
 */
export function trackEvent({ action, category, label, value, ...rest }: GtagEvent) {
  if (typeof window === "undefined" || !window.gtag) return;

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
    ...rest,
  });
}

/**
 * Track inquiry form submissions
 */
export function trackInquirySubmit(params: {
  tripType: string;
  source?: string;
  formId?: string;
}) {
  trackEvent({
    action: "inquiry_submit",
    category: "Lead Generation",
    label: params.tripType,
    trip_type: params.tripType,
    form_source: params.source,
    form_id: params.formId,
  });
}

/**
 * Track viewing a specific trip/departure
 */
export function trackViewItem(params: {
  itemId: string;
  itemName: string;
  itemCategory: "safari" | "kilimanjaro" | "daytrip" | "zanzibar";
  price?: number;
}) {
  trackEvent({
    action: "view_item",
    category: "Ecommerce",
    label: params.itemName,
    item_id: params.itemId,
    item_name: params.itemName,
    item_category: params.itemCategory,
    price: params.price,
  });
}

/**
 * Track when user starts a booking process
 */
export function trackBeginCheckout(params: {
  itemId: string;
  itemName: string;
  itemCategory: string;
  value: number;
  currency?: string;
}) {
  trackEvent({
    action: "begin_checkout",
    category: "Ecommerce",
    label: params.itemName,
    value: params.value,
    currency: params.currency || "USD",
    item_id: params.itemId,
    item_name: params.itemName,
    item_category: params.itemCategory,
  });
}

/**
 * Track completed booking/purchase
 */
export function trackPurchase(params: {
  transactionId: string;
  value: number;
  currency?: string;
  itemId: string;
  itemName: string;
  itemCategory: string;
}) {
  trackEvent({
    action: "purchase",
    category: "Ecommerce",
    label: params.itemName,
    value: params.value,
    transaction_id: params.transactionId,
    currency: params.currency || "USD",
    item_id: params.itemId,
    item_name: params.itemName,
    item_category: params.itemCategory,
  });
}

/**
 * Track contact link clicks (phone, email, WhatsApp)
 */
export function trackContactClick(params: {
  method: "phone" | "email" | "whatsapp";
  location: string; // Where on site the click happened
}) {
  trackEvent({
    action: "contact_click",
    category: "Engagement",
    label: params.method,
    contact_method: params.method,
    click_location: params.location,
  });
}

/**
 * Track social media clicks
 */
export function trackSocialClick(params: {
  platform: string;
  location: string;
}) {
  trackEvent({
    action: "social_click",
    category: "Social",
    label: params.platform,
    social_platform: params.platform,
    click_location: params.location,
  });
}

/**
 * Track search queries on the site
 */
export function trackSearch(params: { searchTerm: string; resultsCount?: number }) {
  trackEvent({
    action: "search",
    category: "Engagement",
    label: params.searchTerm,
    search_term: params.searchTerm,
    results_count: params.resultsCount,
  });
}

/**
 * Track departure date selections
 */
export function trackSelectDeparture(params: {
  departureId: string;
  routeName: string;
  departureDate: string;
  price: number;
}) {
  trackEvent({
    action: "select_departure",
    category: "Ecommerce",
    label: params.routeName,
    departure_id: params.departureId,
    route_name: params.routeName,
    departure_date: params.departureDate,
    price: params.price,
  });
}

/**
 * Track CTA button clicks
 */
export function trackCtaClick(params: {
  ctaText: string;
  ctaLocation: string;
  destination?: string;
}) {
  trackEvent({
    action: "cta_click",
    category: "Engagement",
    label: params.ctaText,
    cta_text: params.ctaText,
    cta_location: params.ctaLocation,
    destination: params.destination,
  });
}

/**
 * Get the GA Client ID for attribution tracking
 * Returns a promise that resolves with the client ID or null
 */
export function getGaClientId(): Promise<string | null> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !window.gtag) {
      resolve(null);
      return;
    }

    const gaId = process.env.NEXT_PUBLIC_GA_ID;
    if (!gaId) {
      resolve(null);
      return;
    }

    // Try to get client ID from GA
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window.gtag as any)("get", gaId, "client_id", (clientId: string) => {
      resolve(clientId || null);
    });

    // Timeout after 2 seconds
    setTimeout(() => resolve(null), 2000);
  });
}

/**
 * Parse UTM parameters from URL search params
 */
export function parseUtmParams(searchParams: URLSearchParams): {
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
} {
  return {
    utmSource: searchParams.get("utm_source"),
    utmMedium: searchParams.get("utm_medium"),
    utmCampaign: searchParams.get("utm_campaign"),
  };
}
