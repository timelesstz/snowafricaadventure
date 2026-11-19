"use client";

import { useId, useRef, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { trackBeginCheckout, trackFormStart, trackFormSubmit } from "@/lib/analytics";
import { useFormAbandonment } from "@/hooks/useFormAbandonment";
import { collectClientTracking } from "@/lib/client-tracking";

/**
 * One-step quote request inside the in-article trip card. The trip is
 * already chosen (it's the one on the card), so the reader only gives a
 * month, a group size and where to send the quote. Posts to the same
 * /api/inquiries/ endpoint and honeypot as the other forms.
 */

const FORM_NAME = "trip_card_quote";

function upcomingMonths(count: number) {
  const now = new Date();
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() + 1 + i, 1);
    const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-01`;
    const label = d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    return { value, label };
  });
}

interface TripCardQuoteProps {
  tripTitle: string;
  /** Category the admin filters by, e.g. "Kilimanjaro" or "Wildlife Safari". */
  tripType: string;
  type: "trekking" | "safari";
  postTitle: string;
}

export function TripCardQuote({ tripTitle, tripType, type, postTitle }: TripCardQuoteProps) {
  const uid = useId();
  const fid = (n: string) => `${uid}-${n}`;
  const [months] = useState(() => upcomingMonths(18));
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const started = useRef(false);
  const relatedTo = `${tripTitle} (from article: ${postTitle})`.slice(0, 500);

  useFormAbandonment({ formName: FORM_NAME, formId: "article-trip-card", isSubmitted: submitted !== null });

  const markStarted = () => {
    if (started.current) return;
    started.current = true;
    trackFormStart({ formName: FORM_NAME, formId: "article-trip-card", formLocation: postTitle });
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const fullName = String(form.get("fullName") || "").trim();
    const email = String(form.get("email") || "").trim();
    const month = String(form.get("month") || "");
    const travellers = Number(form.get("travellers") || 2);
    setSubmitting(true);
    setError(null);

    try {
      const tracking = await collectClientTracking();
      const response = await fetch("/api/inquiries/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          tripType,
          numAdults: travellers,
          arrivalDate: month || undefined,
          flexibility: month ? "Month only" : "Dates not set",
          additionalInfo: `Quote request for ${tripTitle}, sent from the trip card in an article.`,
          relatedTo,
          type,
          website: honeypotRef.current?.value || "",
          ...tracking,
        }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok) {
        setError(result?.message || "We couldn't send that. Please try again.");
        return;
      }
      trackFormSubmit({ formName: FORM_NAME, formId: "article-trip-card", tripType, numTravelers: travellers, relatedItem: tripTitle });
      trackBeginCheckout({ itemId: tripTitle, itemName: tripTitle, itemCategory: type, value: 0 });
      setSubmitted(fullName.split(" ")[0] || fullName);
    } catch {
      setError("Network error. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted !== null) {
    return (
      <div role="status" className="flex items-start gap-3 rounded-xl bg-white/10 p-4 ring-1 ring-white/15">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--secondary)]">
          <Check className="h-5 w-5 text-[var(--primary-dark)]" aria-hidden="true" />
        </span>
        <div>
          <p className="font-heading font-semibold text-white">Thanks, {submitted}.</p>
          <p className="mt-0.5 text-sm text-white/80">
            Your request for {tripTitle} is with our team. We reply within 24 hours, so check your inbox (and spam folder).
          </p>
        </div>
      </div>
    );
  }

  const label = "mb-1 block text-xs font-medium text-white/85";
  const input =
    "block h-10 w-full rounded-md border border-white/20 bg-white px-3 text-sm text-[var(--text)] focus:border-[var(--secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]/50";

  return (
    <form onSubmit={handleSubmit} onFocus={markStarted} aria-label={`Get a quote for ${tripTitle}`} className="relative">
      <div className="grid grid-cols-2 gap-3 @lg:grid-cols-4">
        <div>
          <label htmlFor={fid("month")} className={label}>
            Travel month
          </label>
          <select id={fid("month")} name="month" defaultValue="" className={input}>
            <option value="">Not sure yet</option>
            {months.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={fid("travellers")} className={label}>
            Travellers
          </label>
          <select id={fid("travellers")} name="travellers" defaultValue="2" className={input}>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n === 12 ? "12 or more" : n}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-2 @lg:col-span-1">
          <label htmlFor={fid("name")} className={label}>
            Full name
          </label>
          <input id={fid("name")} name="fullName" required minLength={2} autoComplete="name" className={input} />
        </div>
        <div className="col-span-2 @lg:col-span-1">
          <label htmlFor={fid("email")} className={label}>
            Email
          </label>
          <input id={fid("email")} name="email" type="email" required autoComplete="email" className={input} />
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-3 rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-800">
          {error}
        </p>
      )}

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[var(--secondary)] px-5 text-sm font-semibold text-[var(--primary-dark)] transition-colors hover:bg-[var(--secondary-light)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:opacity-70"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            "Get my quote"
          )}
        </button>
        <p className="text-xs text-white/70">Free, no obligation. We reply within 24 hours.</p>
      </div>

      {/* Honeypot: hidden from people, filled by bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={fid("website")}>Website</label>
        <input type="text" id={fid("website")} name="website" ref={honeypotRef} tabIndex={-1} autoComplete="off" />
      </div>
    </form>
  );
}
