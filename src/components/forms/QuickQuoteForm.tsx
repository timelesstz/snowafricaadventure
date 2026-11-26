"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Loader2, Minus, Plus } from "lucide-react";
import { trackBeginCheckout, trackFormStart, trackFormStep, trackFormSubmit } from "@/lib/analytics";
import { useFormAbandonment } from "@/hooks/useFormAbandonment";
import { collectClientTracking } from "@/lib/client-tracking";
import { useFormGuard } from "@/hooks/useFormGuard";

/**
 * Three-step quote request for article heroes. One question per step keeps
 * the first screen to a single tap; contact details come last, once the
 * reader has already said what they want. Posts to the same /api/inquiries/
 * endpoint (and honeypot) as InquiryForm.
 */

const TRIPS = [
  { value: "Kilimanjaro", label: "Climb Kilimanjaro" },
  { value: "Wildlife Safari", label: "Wildlife safari" },
  { value: "Wildlife Safari + Kilimanjaro", label: "Safari + climb" },
  { value: "Wildlife Safari + Zanzibar Beach", label: "Safari + Zanzibar" },
] as const;

const STEPS = ["Trip", "Dates", "Contact"] as const;
const FORM_NAME = "quick_quote";

function upcomingMonths(count: number) {
  const now = new Date();
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() + 1 + i, 1);
    const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-01`;
    const label = d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    return { value, label };
  });
}

interface QuickQuoteFormProps {
  /** Shown in the admin inquiry as what the reader was looking at. */
  relatedTo: string;
  defaultTrip?: (typeof TRIPS)[number]["value"];
  formId?: string;
}

export function QuickQuoteForm({ relatedTo, defaultTrip, formId = "article-hero" }: QuickQuoteFormProps) {
  const uid = useId();
  const fid = (n: string) => `${uid}-${n}`;
  const [step, setStep] = useState(0);
  const [trip, setTrip] = useState<string>(defaultTrip ?? "");
  const [month, setMonth] = useState("");
  const [travellers, setTravellers] = useState(2);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [months] = useState(() => upcomingMonths(18));
  const honeypotRef = useRef<HTMLInputElement>(null);
  const headingRef = useRef<HTMLParagraphElement>(null);
  const started = useRef(false);
  const moved = useRef(false);

  useFormAbandonment({ formName: FORM_NAME, formId, isSubmitted: submitted !== null });

  const markStarted = () => {
    if (started.current) return;
    started.current = true;
    trackFormStart({ formName: FORM_NAME, formId, formLocation: relatedTo });
  };

  // Move focus to the new question so keyboard and screen-reader users
  // land on it, but not on first render (that would steal page focus).
  useEffect(() => {
    if (moved.current) headingRef.current?.focus();
  }, [step]);

  const goTo = (next: number) => {
    moved.current = true;
    setError(null);
    setStep(next);
    trackFormStep({ formName: FORM_NAME, formId, stepNumber: next + 1, stepName: STEPS[next] });
  };

  const { getFormToken, renewFormToken } = useFormGuard();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (step < 2) {
        if (step === 0 && !trip) return setError("Pick the trip you have in mind.");
        return goTo(step + 1);
      }

      const form = new FormData(e.currentTarget);
      const fullName = String(form.get("fullName") || "").trim();
      const email = String(form.get("email") || "").trim();
      const phone = String(form.get("phone") || "").trim();
      setSubmitting(true);
      setError(null);

      try {
        const tracking = await collectClientTracking();
        const response = await fetch("/api/inquiries/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            formToken: await getFormToken(),
            fullName,
            email,
            phone: phone || undefined,
            tripType: trip,
            numAdults: travellers,
            arrivalDate: month || undefined,
            flexibility: month ? "Month only" : "Dates not set",
            additionalInfo: "Quick quote request from an article.",
            relatedTo,
            // The admin inquiry filter groups by "trekking" / "safari";
            // the exact choice travels in tripType.
            type: trip === "Kilimanjaro" ? "trekking" : "safari",
            website: honeypotRef.current?.value || "",
            ...tracking,
          }),
        });
        const result = await response.json().catch(() => null);
        if (!response.ok) {
          setError(result?.message || "We couldn't send that. Please try again.");
          return;
        }
        trackFormSubmit({ formName: FORM_NAME, formId, tripType: trip, numTravelers: travellers, relatedItem: relatedTo });
        trackBeginCheckout({ itemId: relatedTo, itemName: relatedTo, itemCategory: trip.toLowerCase(), value: 0 });
        renewFormToken();
        setSubmitted(fullName.split(" ")[0] || fullName);
      } catch {
        setError("Network error. Check your connection and try again.");
      } finally {
        setSubmitting(false);
      }
    },
    // goTo is stable enough for this form; re-creating it each step is harmless
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [step, trip, month, travellers, relatedTo, formId, getFormToken, renewFormToken]
  );

  if (submitted !== null) {
    return (
      <div className="rounded-2xl bg-white p-6 text-center shadow-xl ring-1 ring-black/5" role="status">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--secondary)]">
          <Check className="h-6 w-6 text-[var(--primary-dark)]" aria-hidden="true" />
        </span>
        <p className="mt-4 font-heading text-xl font-semibold text-[var(--text)]">Thanks, {submitted}.</p>
        <p className="mt-1 text-sm leading-relaxed text-[var(--text-muted)]">
          Your request is with our team. We reply within 24 hours, so check your inbox (and spam folder).
        </p>
      </div>
    );
  }

  const label = "mb-1 block text-xs font-medium text-[var(--text)]";
  const input =
    "block w-full rounded-md border border-[var(--border)] bg-white px-3 py-1.5 text-sm text-[var(--text)] placeholder:text-[var(--text-light)] focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]/40";

  return (
    <form
      onSubmit={handleSubmit}
      onFocus={markStarted}
      noValidate={step < 2}
      aria-labelledby={fid("title")}
      className="relative rounded-2xl bg-white p-4 text-[var(--text)] shadow-xl ring-1 ring-black/5 sm:p-5"
    >
      <div className="flex items-baseline justify-between gap-3">
        <h2 id={fid("title")} className="font-heading text-base font-semibold sm:text-lg">
          Get a free quote
        </h2>
        <span className="shrink-0 text-xs font-medium text-[var(--text-muted)]">
          Step {step + 1} of 3
        </span>
      </div>
      <div className="mt-2.5 grid grid-cols-3 gap-1.5" aria-hidden="true">
        {STEPS.map((s, i) => (
          <span
            key={s}
            className={`h-1 rounded-full transition-colors ${i <= step ? "bg-[var(--secondary)]" : "bg-[var(--border)]"}`}
          />
        ))}
      </div>

      <div className="mt-4">
        {step === 0 && (
          <fieldset>
            <legend className="sr-only">Trip type</legend>
            <p ref={headingRef} tabIndex={-1} className="mb-2.5 text-sm font-medium outline-none">
              What are you planning?
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {TRIPS.map((t) => (
                <label
                  key={t.value}
                  className={`flex cursor-pointer items-center justify-center rounded-md border px-2 py-1.5 text-center text-[13px] font-medium transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[var(--secondary)] ${
                    trip === t.value
                      ? "border-[var(--primary-dark)] bg-[var(--primary-dark)] text-white"
                      : "border-[var(--border)] text-[var(--text)] hover:border-[var(--text-light)]"
                  }`}
                >
                  <input
                    type="radio"
                    name="tripChoice"
                    value={t.value}
                    checked={trip === t.value}
                    onChange={() => {
                      setTrip(t.value);
                      setError(null);
                    }}
                    className="sr-only"
                  />
                  {t.label}
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {step === 1 && (
          <div className="space-y-2.5">
            <p ref={headingRef} tabIndex={-1} className="text-sm font-medium outline-none">
              When, and how many of you?
            </p>
            <div>
              <label htmlFor={fid("month")} className={label}>
                Travel month
              </label>
              <select id={fid("month")} value={month} onChange={(e) => setMonth(e.target.value)} className={input}>
                <option value="">Not sure yet</option>
                {months.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <span id={fid("trav")} className={label}>
                Travellers
              </span>
              <div className="flex items-center gap-3" role="group" aria-labelledby={fid("trav")}>
                <button
                  type="button"
                  onClick={() => setTravellers((n) => Math.max(1, n - 1))}
                  disabled={travellers <= 1}
                  aria-label="Fewer travellers"
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-[var(--border)] transition-colors hover:bg-[var(--surface)] disabled:opacity-40"
                >
                  <Minus className="h-4 w-4" aria-hidden="true" />
                </button>
                <output aria-live="polite" className="w-10 text-center text-lg font-semibold tabular-nums">
                  {travellers}
                </output>
                <button
                  type="button"
                  onClick={() => setTravellers((n) => Math.min(30, n + 1))}
                  aria-label="More travellers"
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-[var(--border)] transition-colors hover:bg-[var(--surface)]"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-2.5">
            <p ref={headingRef} tabIndex={-1} className="text-sm font-medium outline-none">
              Where should we send your quote?
            </p>
            <div>
              <label htmlFor={fid("name")} className={label}>
                Full name
              </label>
              <input id={fid("name")} name="fullName" required minLength={2} autoComplete="name" className={input} />
            </div>
            <div>
              <label htmlFor={fid("email")} className={label}>
                Email
              </label>
              <input id={fid("email")} name="email" type="email" required autoComplete="email" className={input} />
            </div>
            <div>
              <label htmlFor={fid("phone")} className={label}>
                WhatsApp <span className="font-normal text-[var(--text-muted)]">(optional)</span>
              </label>
              <input id={fid("phone")} name="phone" type="tel" autoComplete="tel" placeholder="+1 555 123 4567" className={input} />
            </div>
          </div>
        )}
      </div>

      {error && (
        <p role="alert" className="mt-3 text-sm font-medium text-red-700">
          {error}
        </p>
      )}

      <div className="mt-4 flex items-center gap-2">
        {step > 0 && (
          <button
            type="button"
            onClick={() => goTo(step - 1)}
            className="inline-flex h-10 items-center gap-1 rounded-lg px-3 text-sm font-medium text-[var(--text-muted)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--text)]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back
          </button>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-[var(--secondary)] px-4 text-sm font-semibold text-[var(--primary-dark)] transition-colors hover:bg-[var(--secondary-light)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-dark)] disabled:opacity-70"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : step < 2 ? (
            <>
              Continue
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </>
          ) : (
            "Send my quote request"
          )}
        </button>
      </div>
      <p className="mt-2 text-center text-xs text-[var(--text-muted)]">Free, no obligation. We reply within 24 hours.</p>

      {/* Honeypot: hidden from people, filled by bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={fid("website")}>Website</label>
        <input type="text" id={fid("website")} name="website" ref={honeypotRef} tabIndex={-1} autoComplete="off" />
      </div>
    </form>
  );
}
