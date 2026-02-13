/**
 * Google Analytics 4 Event Tracking Utilities
 * =============================================
 * Use these functions to track custom events throughout the application.
 *
 * CONFIGURED MEASUREMENT IDs:
 * - G-56M3GQC18Q (Primary - set via NEXT_PUBLIC_GA_ID)
 * - G-W0CEF6KK96 (Secondary - set via NEXT_PUBLIC_GA_ID_SECONDARY)
 *
 * Events are automatically sent to ALL configured GA4 properties.
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
 * Sends events to ALL configured GA4 properties via single gtag call
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

// =============================================================================
// FORM TRACKING EVENTS
// =============================================================================

/**
 * Track form start - when user begins filling out a form
 */
export function trackFormStart(params: {
  formName: string;
  formId?: string;
  formLocation?: string;
}) {
  trackEvent({
    action: "form_start",
    category: "Form Engagement",
    label: params.formName,
    form_name: params.formName,
    form_id: params.formId,
    form_location: params.formLocation || window?.location?.pathname,
  });
}

/**
 * Track form step completion (for multi-step forms)
 */
export function trackFormStep(params: {
  formName: string;
  stepNumber: number;
  stepName?: string;
  formId?: string;
}) {
  trackEvent({
    action: "form_step",
    category: "Form Engagement",
    label: `${params.formName} - Step ${params.stepNumber}`,
    form_name: params.formName,
    step_number: params.stepNumber,
    step_name: params.stepName,
    form_id: params.formId,
  });
}

/**
 * Track successful form submission
 */
export function trackFormSubmit(params: {
  formName: string;
  formId?: string;
  tripType?: string;
  numTravelers?: number;
  value?: number;
  currency?: string;
  relatedItem?: string;
}) {
  trackEvent({
    action: "generate_lead",
    category: "Lead Generation",
    label: params.formName,
    form_name: params.formName,
    form_id: params.formId,
    trip_type: params.tripType,
    num_travelers: params.numTravelers,
    value: params.value,
    currency: params.currency || "USD",
    related_item: params.relatedItem,
  });
}

/**
 * Track form abandonment
 */
export function trackFormAbandonment(params: {
  formName: string;
  lastField?: string;
  stepNumber?: number;
  formId?: string;
}) {
  trackEvent({
    action: "form_abandonment",
    category: "Form Engagement",
    label: params.formName,
    form_name: params.formName,
    last_field: params.lastField,
    step_number: params.stepNumber,
    form_id: params.formId,
  });
}

/**
 * Track booking initiation (add_to_cart equivalent for tours)
 */
export function trackAddToCart(params: {
  itemId: string;
  itemName: string;
  itemCategory: "safari" | "kilimanjaro" | "daytrip" | "zanzibar" | "tailor_made";
  price: number;
  quantity?: number;
  currency?: string;
}) {
  trackEvent({
    action: "add_to_cart",
    category: "Ecommerce",
    label: params.itemName,
    item_id: params.itemId,
    item_name: params.itemName,
    item_category: params.itemCategory,
    price: params.price,
    quantity: params.quantity || 1,
    currency: params.currency || "USD",
    value: params.price * (params.quantity || 1),
  });
}

/**
 * Track newsletter signup
 */
export function trackNewsletterSignup(params: {
  location: string;
  source?: string;
}) {
  trackEvent({
    action: "newsletter_signup",
    category: "Engagement",
    label: params.location,
    signup_location: params.location,
    signup_source: params.source,
  });
}

/**
 * Track file download (brochures, PDFs)
 */
export function trackDownload(params: {
  fileName: string;
  fileType: string;
  itemRelated?: string;
}) {
  trackEvent({
    action: "file_download",
    category: "Engagement",
    label: params.fileName,
    file_name: params.fileName,
    file_type: params.fileType,
    item_related: params.itemRelated,
  });
}

/**
 * Track scroll depth milestones
 */
export function trackScrollDepth(params: {
  depth: 25 | 50 | 75 | 100;
  pageType?: string;
}) {
  trackEvent({
    action: "scroll_depth",
    category: "Engagement",
    label: `${params.depth}%`,
    scroll_depth: params.depth,
    page_type: params.pageType,
  });
}

/**
 * Track video engagement
 */
export function trackVideoEngagement(params: {
  action: "play" | "pause" | "complete" | "progress";
  videoTitle: string;
  videoUrl?: string;
  percentWatched?: number;
}) {
  trackEvent({
    action: `video_${params.action}`,
    category: "Video Engagement",
    label: params.videoTitle,
    video_title: params.videoTitle,
    video_url: params.videoUrl,
    percent_watched: params.percentWatched,
  });
}
