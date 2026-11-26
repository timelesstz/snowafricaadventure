"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { ArrowLeft, ArrowRight, Check, Mail, Search, ChevronDown } from "lucide-react";
import { PHONE_PREFIXES, COUNTRY_TO_PREFIX } from "@/lib/constants";
import { COUNTRIES as COUNTRIES_LIB } from "@/lib/countries";
import { trackFormStart, trackFormStep, trackFormSubmit, trackBeginCheckout } from "@/lib/analytics";
import { useFormAbandonment } from "@/hooks/useFormAbandonment";
import { collectClientTracking } from "@/lib/client-tracking";
import { useFormGuard } from "@/hooks/useFormGuard";

// Map shared country list to the format used by this component
const COUNTRIES = COUNTRIES_LIB.map((c) => ({ name: c.name, code: c.code }));

// Convert country code to flag emoji
function getFlagEmoji(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

/* Shared field styles. Inputs use 16px text so iOS Safari does not zoom on
   focus; py-2.5 keeps each control at a 44px touch target. */
const LABEL = "block font-heading text-xs font-semibold text-[var(--text)] mb-1";
/* No width or horizontal padding here: conflicting utilities (w-full vs a
   fixed width) resolve by stylesheet order, not class order. */
const FIELD_BASE =
  "py-2.5 border border-[var(--border)] rounded-sm bg-white font-sans text-base text-[var(--text)] placeholder:text-[var(--text-light)] focus:outline-none focus:border-[var(--secondary)] focus:ring-2 focus:ring-[var(--secondary)]/15 transition-colors";
const FIELD = `w-full px-3 ${FIELD_BASE}`;
const SELECT = `w-full px-2 ${FIELD_BASE}`;
const BUTTON =
  "w-full flex items-center justify-center gap-2 px-5 py-3 bg-[var(--secondary)] text-[var(--primary-dark)] font-heading font-semibold rounded-sm hover:bg-[var(--secondary-dark)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--secondary)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

interface SafariInquiryFormProps {
  safariSlug?: string;
  safariTitle?: string;
  variant?: "card" | "inline";
}

export function SafariInquiryForm({
  safariSlug,
  safariTitle,
  variant = "card",
}: SafariInquiryFormProps) {
  const [stage, setStage] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  useFormAbandonment({ formName: "safari_inquiry_form", formId: safariSlug, isSubmitted: submitted, getCurrentStep: () => stage });
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    phonePrefix: "+1",
    numPax: "2",
    country: "",
    countryCode: "",
    specialInterest: "",
  });

  // Country search state
  const [countrySearch, setCountrySearch] = useState("");
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const countryInputRef = useRef<HTMLInputElement>(null);

  // Filter countries based on search
  const filteredCountries = COUNTRIES.filter((country) =>
    country.name.toLowerCase().includes(countrySearch.toLowerCase())
  );

  // Track form start
  const formStartTracked = useRef(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target as Node)
      ) {
        setIsCountryDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Track form start on first interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!formStartTracked.current) {
        formStartTracked.current = true;
        trackFormStart({
          formName: "safari_inquiry_form",
          formId: safariSlug || "general",
          formLocation: safariSlug || "safari-page",
        });
      }
    };

    const form = document.querySelector(`[data-form-id="safari-inquiry-${safariSlug || 'general'}"]`);
    if (form) {
      form.addEventListener("focusin", handleFirstInteraction, { once: true });
    }

    return () => {
      form?.removeEventListener("focusin", handleFirstInteraction);
    };
  }, [safariSlug]);

  const handleCountrySelect = (country: { name: string; code: string }) => {
    const matchedPrefix = COUNTRY_TO_PREFIX[country.code];
    setFormData((prev) => ({
      ...prev,
      country: country.name,
      countryCode: country.code,
      ...(matchedPrefix ? { phonePrefix: matchedPrefix } : {}),
    }));
    setCountrySearch("");
    setIsCountryDropdownOpen(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStage1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.fullName || formData.fullName.trim().length < 2) {
      setError("Please enter your full name (at least 2 characters).");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    // Track step completion
    trackFormStep({
      formName: "safari_inquiry_form",
      stepNumber: 1,
      stepName: "contact_info",
      formId: safariSlug || "general",
    });
    setStage(2);
  };

  const { getFormToken, renewFormToken } = useFormGuard();

  const handleStage2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Validate country selection
    if (!formData.country) {
      setError("Please select your country.");
      setIsSubmitting(false);
      return;
    }

    try {
      const tracking = await collectClientTracking();

      // Convert "10+" to numeric 10 for server
      const numPax = formData.numPax === "10+" ? 10 : parseInt(formData.numPax) || 1;

      const response = await fetch("/api/inquiries/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formToken: await getFormToken(),
          ...formData,
          country: formData.countryCode || formData.country,
          numAdults: numPax,
          additionalInfo: formData.numPax === "10+"
            ? `Group of 10+ travelers. ${formData.specialInterest || ""}`.trim()
            : formData.specialInterest || undefined,
          relatedTo: safariSlug,
          type: "Wildlife Safari",
          website: honeypotRef.current?.value || "",
          ...tracking,
        }),
      });

      let result;
      try {
        result = await response.json();
      } catch {
        setError("Something went wrong. Please try again.");
        return;
      }

      if (response.ok) {
        // Track successful form submission
        trackFormSubmit({
          formName: "safari_inquiry_form",
          formId: safariSlug || "general",
          tripType: "Wildlife Safari",
          numTravelers: numPax,
          relatedItem: safariSlug,
        });
        trackBeginCheckout({
          itemId: safariSlug || "safari-inquiry",
          itemName: safariTitle || "Safari Inquiry",
          itemCategory: "safari",
          value: 0,
        });
        renewFormToken();
        setSubmitted(true);
      } else {
        setError(result.message || "Failed to submit inquiry. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-6" role="status">
        <div className="w-12 h-12 bg-acacia-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <Check className="w-6 h-6 text-acacia-600" aria-hidden="true" />
        </div>
        <h3 className="font-heading font-bold text-lg text-[var(--text)] mb-1">
          Thank You!
        </h3>
        <p className="text-sm text-[var(--text-muted)]">
          We&apos;ve received your inquiry and will send your custom quote within 24
          hours.
        </p>
      </div>
    );
  }

  const isCard = variant === "card";

  return (
    <div className={isCard ? "" : "bg-white p-5 rounded-lg"} data-form-id={`safari-inquiry-${safariSlug || 'general'}`}>
      {/* Error Message */}
      {error && (
        <div role="alert" className="px-3 py-2 bg-red-50 border border-red-200 text-red-700 rounded-sm text-sm mb-3">
          {error}
        </div>
      )}

      {/* Stage 1: Contact Info */}
      {stage === 1 && (
        <form onSubmit={handleStage1Submit} className="space-y-3">
          {/* The card variant sits under its own "Request a Quote" header, so
              only the inline variant needs a title of its own. */}
          {!isCard && (
            <div className="flex items-center gap-2 mb-1">
              <Mail className="w-5 h-5 text-[var(--secondary)]" aria-hidden="true" />
              <h3 className="font-heading font-bold text-lg text-[var(--text)]">
                Get Your Custom Quote
              </h3>
            </div>
          )}

          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className={LABEL}>
              Full name *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              autoComplete="name"
              value={formData.fullName}
              onChange={handleChange}
              className={FIELD}
              placeholder="John Smith"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className={LABEL}>
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              className={FIELD}
              placeholder="you@email.com"
            />
          </div>

          {/* Phone / WhatsApp */}
          <div>
            <label htmlFor="phone" className={LABEL}>
              Phone / WhatsApp{" "}
              <span className="font-normal text-[var(--text-muted)]">(optional)</span>
            </label>
            <div className="flex gap-2">
              <select
                name="phonePrefix"
                aria-label="Country code"
                value={formData.phonePrefix}
                onChange={handleChange}
                className={`w-[5.5rem] shrink-0 px-2 ${FIELD_BASE}`}
              >
                {PHONE_PREFIXES.map((prefix) => (
                  <option key={prefix.code} value={prefix.code}>
                    {prefix.code}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                id="phone"
                name="phone"
                autoComplete="tel-national"
                value={formData.phone}
                onChange={handleChange}
                className={`min-w-0 flex-1 px-3 ${FIELD_BASE}`}
                placeholder="123 456 7890"
              />
            </div>
          </div>

          {/* Continue Button */}
          <button type="submit" className={`${BUTTON} mt-1`}>
            Continue
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
          <p className="text-center text-xs text-[var(--text-muted)]">
            Step 1 of 2
          </p>
        </form>
      )}

      {/* Stage 2: Trip Details */}
      {stage === 2 && (
        <form onSubmit={handleStage2Submit} className="space-y-3">
          {/* Header with Back */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStage(1)}
              className="-ml-1 flex items-center gap-1 rounded-sm px-1 py-1 text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--secondary)]"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Back
            </button>
            <span className="text-xs text-[var(--text-muted)]">Step 2 of 2</span>
          </div>

          {/* Number of Pax + Country */}
          <div className="flex gap-2">
            <div className="w-[5.5rem] shrink-0">
              <label htmlFor="numPax" className={LABEL}>
                Travelers *
              </label>
              <select
                id="numPax"
                name="numPax"
                required
                value={formData.numPax}
                onChange={handleChange}
                className={SELECT}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
                <option value="10+">10+</option>
              </select>
            </div>

            {/* Country with searchable dropdown */}
            <div className="min-w-0 flex-1 relative" ref={countryDropdownRef}>
              <label htmlFor="countrySearch" className={LABEL}>
                Country *
              </label>
              <div className="relative">
                <button
                  type="button"
                  id="countrySearch"
                  aria-haspopup="listbox"
                  aria-expanded={isCountryDropdownOpen}
                  className={`w-full px-3 py-2.5 border rounded-sm bg-white font-sans text-base text-left flex items-center justify-between gap-2 transition-colors focus:outline-none ${
                    isCountryDropdownOpen
                      ? "border-[var(--secondary)] ring-2 ring-[var(--secondary)]/15"
                      : "border-[var(--border)] focus-visible:border-[var(--secondary)] focus-visible:ring-2 focus-visible:ring-[var(--secondary)]/15"
                  }`}
                  onClick={() => {
                    setIsCountryDropdownOpen(true);
                    setTimeout(() => countryInputRef.current?.focus(), 0);
                  }}
                >
                  {formData.country ? (
                    <span className="flex min-w-0 items-center gap-2">
                      <span aria-hidden="true">{getFlagEmoji(formData.countryCode)}</span>
                      <span className="truncate text-[var(--text)]">{formData.country}</span>
                    </span>
                  ) : (
                    <span className="text-[var(--text-light)]">Select country</span>
                  )}
                  <ChevronDown className={`w-4 h-4 shrink-0 text-[var(--text-muted)] transition-transform ${isCountryDropdownOpen ? "rotate-180" : ""}`} aria-hidden="true" />
                </button>

                {/* Dropdown */}
                {isCountryDropdownOpen && (
                  <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-[var(--border)] rounded-sm shadow-lg max-h-[280px] overflow-hidden">
                    {/* Search input */}
                    <div className="p-2 border-b border-[var(--border)] sticky top-0 bg-white">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" aria-hidden="true" />
                        <input
                          ref={countryInputRef}
                          type="text"
                          aria-label="Search countries"
                          value={countrySearch}
                          onChange={(e) => setCountrySearch(e.target.value)}
                          placeholder="Search countries..."
                          className="w-full pl-9 pr-3 py-2 border border-[var(--border)] rounded-sm text-base focus:outline-none focus:border-[var(--secondary)]"
                        />
                      </div>
                    </div>

                    {/* Country list */}
                    <div className="overflow-y-auto max-h-[220px]" role="listbox" aria-label="Countries">
                      {filteredCountries.length > 0 ? (
                        filteredCountries.map((country) => (
                          <button
                            key={country.code}
                            type="button"
                            role="option"
                            aria-selected={formData.country === country.name}
                            onClick={() => handleCountrySelect(country)}
                            className={`w-full px-3 py-2 flex items-center gap-3 hover:bg-[var(--surface)] focus:bg-[var(--surface)] focus:outline-none transition-colors text-left ${
                              formData.country === country.name ? "bg-[var(--surface)]" : ""
                            }`}
                          >
                            <span aria-hidden="true">{getFlagEmoji(country.code)}</span>
                            <span className="text-sm text-[var(--text)]">{country.name}</span>
                          </button>
                        ))
                      ) : (
                        <div className="px-3 py-2.5 text-sm text-[var(--text-muted)]">
                          No countries found
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              {/* Hidden input for form validation */}
              <input
                type="hidden"
                name="country"
                value={formData.country}
                required
              />
            </div>
          </div>

          {/* Special Interest */}
          <div>
            <label htmlFor="specialInterest" className={LABEL}>
              Special interests{" "}
              <span className="font-normal text-[var(--text-muted)]">(optional)</span>
            </label>
            <textarea
              id="specialInterest"
              name="specialInterest"
              rows={2}
              value={formData.specialInterest}
              onChange={handleChange}
              className={`${FIELD} resize-none`}
              placeholder="Big Five, migration, photography..."
            />
          </div>

          {/* Honeypot */}
          <div className="hidden" aria-hidden="true" tabIndex={-1}>
            <label htmlFor="website-safari">Website</label>
            <input type="text" id="website-safari" name="website" ref={honeypotRef} tabIndex={-1} autoComplete="off" />
          </div>

          {/* Submit Button */}
          <button type="submit" disabled={isSubmitting} className={BUTTON}>
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Sending...
              </span>
            ) : (
              "Request Quote"
            )}
          </button>
          <p className="text-xs text-[var(--text-muted)] text-center">
            Reply within 24 hours. No spam. See our{" "}
            <Link href="/privacy-policy/" className="underline hover:text-[var(--text)]">privacy policy</Link>.
          </p>
        </form>
      )}
    </div>
  );
}
