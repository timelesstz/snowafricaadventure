/**
 * Honeypot triage for public lead forms.
 *
 * Browser autofill sometimes fills the hidden "website" field, so a tripped
 * honeypot alone is not proof of a bot. A submission that looks like a real
 * traveller is kept as a normal lead (with a flag to verify) instead of being
 * filed as spam where nobody looks.
 */

/** Written into the lead record when the honeypot was filled but the lead looks human. */
export const HONEYPOT_AUTOFILL_FLAG = "[Honeypot filled — possible autofill, verify]";

const URL_PATTERN = /(https?:\/\/|www\.|\b[a-z0-9-]+\.(com|net|org|io|co|info|biz|xyz|ru|top)\b)/i;

/** Phrases typical of B2B cold pitches sent through travel contact forms. */
const SPAM_PHRASES = [
  "seo",
  "website redesign",
  "web design",
  "guest post",
  "backlink",
  "freelance",
  "ranking",
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export interface HoneypotLeadInput {
  email?: string | null;
  name?: string | null;
  /** Free-text message the visitor typed, if any. */
  message?: string | null;
  /** True when trip details (dates, travellers, departure) were filled. */
  hasTripFields?: boolean;
  /** Raw User-Agent header. Omit only where no request exists. */
  userAgent?: string | null;
}

/**
 * True when the User-Agent could not come from a real browser: missing, or
 * wrapped in literal quote marks (a common scripting slip, seen in the
 * Nov 2026 Tor bot wave on the article quote cards).
 */
export function isMalformedUserAgent(userAgent: string | null | undefined): boolean {
  const ua = (userAgent ?? "").trim();
  if (!ua) return true;
  return /^["']|["']$/.test(ua);
}

/**
 * True for a one-word name made of random letters, e.g. "Rixbxtl" or
 * "Pkmnp": five or more consonants in a row. Real one-word names rarely
 * have that ("Schmidt" has four), and two-word names are never judged.
 */
export function looksLikeGibberishName(name: string): boolean {
  const trimmed = name.trim();
  if (/\s/.test(trimmed)) return false;
  return /[b-df-hj-np-tv-xz]{5,}/i.test(trimmed);
}

export function containsSpamSignals(text: string): boolean {
  if (URL_PATTERN.test(text)) return true;
  const lower = text.toLowerCase();
  return SPAM_PHRASES.some((phrase) =>
    // Whole-word match so "season" or "Sereno" don't trip "seo"
    new RegExp(`\\b${phrase.replace(/\s+/g, "\\s+")}\\b`, "i").test(lower)
  );
}

/**
 * True when a honeypot-tripped submission still looks like a real person:
 * valid email, a real-looking name, some substance (a message or trip
 * fields), no URL or B2B pitch phrases, and a real browser User-Agent.
 */
export function isPlausibleHoneypotLead(input: HoneypotLeadInput): boolean {
  const email = (input.email ?? "").trim();
  const name = (input.name ?? "").trim();
  const message = (input.message ?? "").trim();

  if (!EMAIL_PATTERN.test(email)) return false;

  const nameWords = name.split(/\s+/).filter(Boolean);
  if (!(nameWords.length >= 2 || name.length >= 4)) return false;

  if (!message && !input.hasTripFields) return false;

  if (containsSpamSignals(`${name} ${message}`)) return false;

  // The honeypot is already filled, so any bot fingerprint settles it.
  if (input.userAgent !== undefined && isMalformedUserAgent(input.userAgent)) return false;
  if (looksLikeGibberishName(name)) return false;

  return true;
}
