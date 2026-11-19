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
 * fields), and no URL or B2B pitch phrases.
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

  return true;
}
