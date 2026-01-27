/**
 * Social sharing utilities for Snow Africa Adventure
 */

import { SITE_CONFIG } from "./constants";

export interface ShareData {
  title: string;
  text: string;
  url: string;
}

export interface DepartureShareData {
  id: string;
  routeName: string;
  arrivalDate: string;
  endDate: string;
  price: number;
  availableSpots: number;
  isFullMoon?: boolean;
}

/**
 * Build a URL with UTM parameters for tracking
 */
export function buildShareUrl(
  baseUrl: string,
  params: {
    source: string;
    medium?: string;
    campaign?: string;
    content?: string;
    departureId?: string;
  }
): string {
  const url = new URL(baseUrl, SITE_CONFIG.url);

  // Add UTM parameters
  url.searchParams.set("utm_source", params.source);
  if (params.medium) url.searchParams.set("utm_medium", params.medium);
  if (params.campaign) url.searchParams.set("utm_campaign", params.campaign);
  if (params.content) url.searchParams.set("utm_content", params.content);

  // Add departure ID if sharing a specific departure
  if (params.departureId) {
    url.searchParams.set("departure", params.departureId);
  }

  return url.toString();
}

/**
 * Format share text for a specific departure
 */
export function formatDepartureShareText(departure: DepartureShareData): string {
  const fullMoonEmoji = departure.isFullMoon ? " (Full Moon Summit)" : "";
  const spots = departure.availableSpots === 1
    ? "Only 1 spot left!"
    : departure.availableSpots <= 3
      ? `Only ${departure.availableSpots} spots left!`
      : `${departure.availableSpots} spots available`;

  return `Join me on a Kilimanjaro adventure! ${departure.routeName}${fullMoonEmoji} - ${formatDateRange(departure.arrivalDate, departure.endDate)}. $${departure.price.toLocaleString()} per person. ${spots}`;
}

/**
 * Format a date range for display
 */
function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" };
  return `${start.toLocaleDateString("en-US", options)} - ${end.toLocaleDateString("en-US", options)}`;
}

/**
 * Generate Facebook share URL
 */
export function getFacebookShareUrl(shareUrl: string): string {
  const url = buildShareUrl(shareUrl, {
    source: "facebook",
    medium: "social",
    campaign: "group-departure-share",
  });
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
}

/**
 * Generate Twitter/X share URL
 */
export function getTwitterShareUrl(shareUrl: string, text: string): string {
  const url = buildShareUrl(shareUrl, {
    source: "twitter",
    medium: "social",
    campaign: "group-departure-share",
  });
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
}

/**
 * Generate WhatsApp share URL
 */
export function getWhatsAppShareUrl(shareUrl: string, text: string): string {
  const url = buildShareUrl(shareUrl, {
    source: "whatsapp",
    medium: "social",
    campaign: "group-departure-share",
  });
  const message = `${text}\n\n${url}`;
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

/**
 * Generate Email share URL (mailto)
 */
export function getEmailShareUrl(
  shareUrl: string,
  subject: string,
  body: string
): string {
  const url = buildShareUrl(shareUrl, {
    source: "email",
    medium: "email",
    campaign: "group-departure-share",
  });
  const fullBody = `${body}\n\nLearn more: ${url}`;
  return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(fullBody)}`;
}

/**
 * Generate LinkedIn share URL
 */
export function getLinkedInShareUrl(shareUrl: string): string {
  const url = buildShareUrl(shareUrl, {
    source: "linkedin",
    medium: "social",
    campaign: "group-departure-share",
  });
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand("copy");
    textArea.remove();
    return successful;
  } catch {
    return false;
  }
}

/**
 * Check if Web Share API is available
 */
export function canUseWebShare(): boolean {
  return typeof navigator !== "undefined" && !!navigator.share;
}

/**
 * Use native Web Share API
 */
export async function nativeShare(data: ShareData): Promise<boolean> {
  if (!canUseWebShare()) return false;

  try {
    await navigator.share({
      title: data.title,
      text: data.text,
      url: buildShareUrl(data.url, {
        source: "native-share",
        medium: "social",
        campaign: "group-departure-share",
      }),
    });
    return true;
  } catch (error) {
    // User cancelled or error occurred
    if (error instanceof Error && error.name !== "AbortError") {
      console.error("Share failed:", error);
    }
    return false;
  }
}

/**
 * Generate default share content for departures page
 */
export function getDefaultShareContent(): {
  title: string;
  text: string;
  url: string;
  emailSubject: string;
  emailBody: string;
} {
  return {
    title: "Kilimanjaro Group Departures | Snow Africa Adventure",
    text: "Join a scheduled Kilimanjaro group climb with Snow Africa Adventure. Share the adventure with fellow climbers from around the world!",
    url: `${SITE_CONFIG.url}/kilimanjaro-join-group-departures/`,
    emailSubject: "Join me on a Kilimanjaro Adventure!",
    emailBody: `Hi!

I found this amazing opportunity to climb Mount Kilimanjaro with Snow Africa Adventure. They have scheduled group departures where you can join climbers from around the world.

Their guides have a 95%+ summit success rate and groups are kept small (max 10 people).

Would you be interested in joining? Check out the available dates!`,
  };
}

/**
 * Generate share content for a specific departure
 */
export function getDepartureShareContent(departure: DepartureShareData): {
  title: string;
  text: string;
  url: string;
  emailSubject: string;
  emailBody: string;
} {
  const fullMoonText = departure.isFullMoon ? " - Full Moon Summit" : "";
  const dateRange = formatDateRange(departure.arrivalDate, departure.endDate);

  return {
    title: `${departure.routeName}${fullMoonText} | Kilimanjaro Group Climb`,
    text: formatDepartureShareText(departure),
    url: `${SITE_CONFIG.url}/kilimanjaro-join-group-departures/?departure=${departure.id}`,
    emailSubject: `Join me on Kilimanjaro! ${departure.routeName} - ${dateRange}`,
    emailBody: `Hi!

I'm planning to climb Mount Kilimanjaro and thought you might be interested in joining!

Here are the details:
- Route: ${departure.routeName}${fullMoonText}
- Dates: ${dateRange}
- Price: $${departure.price.toLocaleString()} per person
- Spots Available: ${departure.availableSpots}

This is a group departure with Snow Africa Adventure - we'd be climbing with other adventurers from around the world. Their guides have a 95%+ summit success rate!

Would you be interested in joining? Let me know what you think!`,
  };
}

/**
 * Generate invite link content
 */
export function getInviteContent(
  inviterName: string,
  departure: DepartureShareData,
  inviteCode: string
): {
  subject: string;
  body: string;
  url: string;
} {
  const fullMoonText = departure.isFullMoon ? " (Full Moon Summit)" : "";
  const dateRange = formatDateRange(departure.arrivalDate, departure.endDate);

  return {
    subject: `${inviterName} invited you to climb Kilimanjaro!`,
    body: `Hi!

${inviterName} has invited you to join them on a Kilimanjaro adventure!

${departure.routeName}${fullMoonText}
Dates: ${dateRange}
Price: $${departure.price.toLocaleString()} per person
${departure.availableSpots <= 3 ? `\n🔥 Only ${departure.availableSpots} spots left!\n` : ""}
Climb together with a small group (max 10 people) led by expert local guides. Snow Africa Adventure has a 95%+ summit success rate!`,
    url: `${SITE_CONFIG.url}/kilimanjaro-join-group-departures/?invite=${inviteCode}&departure=${departure.id}`,
  };
}
