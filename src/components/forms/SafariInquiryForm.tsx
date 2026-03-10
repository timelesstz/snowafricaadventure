"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowLeft, ArrowRight, Check, Mail, Search, ChevronDown } from "lucide-react";
import { PHONE_PREFIXES, COUNTRY_TO_PREFIX } from "@/lib/constants";
import { COUNTRIES as COUNTRIES_LIB } from "@/lib/countries";
import { trackFormStart, trackFormStep, trackFormSubmit } from "@/lib/analytics";
import { collectClientTracking } from "@/lib/client-tracking";

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
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="font-heading font-bold text-xl text-[var(--text)] mb-2">
          Thank You!
        </h3>
        <p className="text-[var(--text-muted)]">
          We&apos;ve received your inquiry and will send your custom quote within 24
          hours.
        </p>
      </div>
    );
  }

  const isCard = variant === "card";

  return (
    <div className={isCard ? "" : "bg-white p-6 rounded-lg"} data-form-id={`safari-inquiry-${safariSlug || 'general'}`}>
      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm mb-4">
          {error}
        </div>
      )}

      {/* Stage 1: Contact Info */}
      {stage === 1 && (
        <form onSubmit={handleStage1Submit} className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Mail className="w-5 h-5 text-[var(--secondary)]" />
            <h3 className="font-heading font-bold text-lg text-[var(--text)]">
              Get Your Custom Quote
            </h3>
          </div>

          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block font-heading text-[13px] font-semibold text-[var(--text)] mb-1"
            >
              Full Name *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-[var(--border)] rounded-sm font-sans text-[15px] text-[var(--text)] focus:outline-none focus:border-[var(--secondary)] focus:ring-2 focus:ring-[var(--secondary)]/15 transition-all"
              placeholder="John Smith"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block font-heading text-[13px] font-semibold text-[var(--text)] mb-1"
            >
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-[var(--border)] rounded-sm font-sans text-[15px] text-[var(--text)] focus:outline-none focus:border-[var(--secondary)] focus:ring-2 focus:ring-[var(--secondary)]/15 transition-all"
              placeholder="john@example.com"
            />
          </div>

          {/* Phone / WhatsApp */}
          <div>
            <label
              htmlFor="phone"
              className="block font-heading text-[13px] font-semibold text-[var(--text)] mb-1"
            >
              Phone / WhatsApp Number
            </label>
            <div className="flex gap-2">
              <select
                name="phonePrefix"
                value={formData.phonePrefix}
                onChange={handleChange}
                className="w-24 px-2 py-3 border border-[var(--border)] rounded-sm font-sans text-[14px] text-[var(--text)] bg-white focus:outline-none focus:border-[var(--secondary)] focus:ring-2 focus:ring-[var(--secondary)]/15 transition-all"
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
                value={formData.phone}
                onChange={handleChange}
                className="flex-1 px-4 py-3 border border-[var(--border)] rounded-sm font-sans text-[15px] text-[var(--text)] focus:outline-none focus:border-[var(--secondary)] focus:ring-2 focus:ring-[var(--secondary)]/15 transition-all"
                placeholder="123 456 7890"
              />
            </div>
          </div>

          {/* Continue Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[var(--secondary)] text-white font-heading font-semibold rounded-sm hover:bg-[var(--secondary-dark)] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[var(--secondary)]/25 transition-all mt-2"
          >
            Continue
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      )}

      {/* Stage 2: Trip Details */}
      {stage === 2 && (
        <form onSubmit={handleStage2Submit} className="space-y-4">
          {/* Header with Back */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() => setStage(1)}
              className="flex items-center gap-1 text-[var(--text-muted)] hover:text-[var(--text)] transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <span className="text-[13px] text-[var(--text-muted)]">Step 2 of 2</span>
          </div>

          {/* Number of Pax + Country (25% / 75%) */}
          <div className="flex gap-3">
            {/* Number of Pax - 25% */}
            <div className="w-1/4">
              <label
                htmlFor="numPax"
                className="block font-heading text-[13px] font-semibold text-[var(--text)] mb-1"
              >
                Travelers *
              </label>
              <select
                id="numPax"
                name="numPax"
                required
                value={formData.numPax}
                onChange={handleChange}
                className="w-full px-3 py-3 border border-[var(--border)] rounded-sm font-sans text-[15px] text-[var(--text)] bg-white focus:outline-none focus:border-[var(--secondary)] focus:ring-2 focus:ring-[var(--secondary)]/15 transition-all"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
                <option value="10+">10+</option>
              </select>
            </div>

            {/* Country - 75% with searchable dropdown */}
            <div className="w-3/4 relative" ref={countryDropdownRef}>
              <label
                htmlFor="countrySearch"
                className="block font-heading text-[13px] font-semibold text-[var(--text)] mb-1"
              >
                Where are you from? *
              </label>
              <div className="relative">
                <div
                  className={`w-full px-4 py-3 border rounded-sm font-sans text-[15px] bg-white cursor-pointer flex items-center justify-between transition-all ${
                    isCountryDropdownOpen
                      ? "border-[var(--secondary)] ring-2 ring-[var(--secondary)]/15"
                      : "border-[var(--border)]"
                  }`}
                  onClick={() => {
                    setIsCountryDropdownOpen(true);
                    setTimeout(() => countryInputRef.current?.focus(), 0);
                  }}
                >
                  {formData.country ? (
                    <span className="flex items-center gap-2">
                      <span className="text-lg">{getFlagEmoji(formData.countryCode)}</span>
                      <span className="text-[var(--text)]">{formData.country}</span>
                    </span>
                  ) : (
                    <span className="text-[var(--text-light)]">Select country</span>
                  )}
                  <ChevronDown className={`w-4 h-4 text-[var(--text-muted)] transition-transform ${isCountryDropdownOpen ? "rotate-180" : ""}`} />
                </div>

                {/* Dropdown */}
                {isCountryDropdownOpen && (
                  <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-[var(--border)] rounded-sm shadow-lg max-h-[280px] overflow-hidden">
                    {/* Search input */}
                    <div className="p-2 border-b border-[var(--border)] sticky top-0 bg-white">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                        <input
                          ref={countryInputRef}
                          type="text"
                          value={countrySearch}
                          onChange={(e) => setCountrySearch(e.target.value)}
                          placeholder="Search countries..."
                          className="w-full pl-9 pr-3 py-2 border border-[var(--border)] rounded-sm text-[14px] focus:outline-none focus:border-[var(--secondary)]"
                        />
                      </div>
                    </div>

                    {/* Country list */}
                    <div className="overflow-y-auto max-h-[220px]">
                      {filteredCountries.length > 0 ? (
                        filteredCountries.map((country) => (
                          <button
                            key={country.code}
                            type="button"
                            onClick={() => handleCountrySelect(country)}
                            className={`w-full px-4 py-2.5 flex items-center gap-3 hover:bg-[var(--surface)] transition-colors text-left ${
                              formData.country === country.name ? "bg-[var(--surface)]" : ""
                            }`}
                          >
                            <span className="text-lg">{getFlagEmoji(country.code)}</span>
                            <span className="text-[14px] text-[var(--text)]">{country.name}</span>
                          </button>
                        ))
                      ) : (
                        <div className="px-4 py-3 text-[14px] text-[var(--text-muted)]">
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
            <label
              htmlFor="specialInterest"
              className="block font-heading text-[13px] font-semibold text-[var(--text)] mb-1"
            >
              Special Interests
            </label>
            <textarea
              id="specialInterest"
              name="specialInterest"
              rows={3}
              value={formData.specialInterest}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-[var(--border)] rounded-sm font-sans text-[15px] text-[var(--text)] focus:outline-none focus:border-[var(--secondary)] focus:ring-2 focus:ring-[var(--secondary)]/15 transition-all resize-none"
              placeholder="E.g., Big Five, Great Migration, bird watching, photography..."
            />
          </div>

          {/* Honeypot */}
          <div className="absolute opacity-0 h-0 overflow-hidden" aria-hidden="true" tabIndex={-1}>
            <label htmlFor="website-safari">Website</label>
            <input type="text" id="website-safari" name="website" ref={honeypotRef} tabIndex={-1} autoComplete="off" />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[var(--secondary)] text-white font-heading font-semibold rounded-sm hover:bg-[var(--secondary-dark)] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[var(--secondary)]/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isSubmitting ? "Sending..." : "Request Quote"}
          </button>
          <p className="text-xs text-slate-500 text-center mt-3">
            We typically respond within 24 hours. No spam, ever.
            Your data is protected under our{" "}
            <a href="/privacy-policy/" className="underline hover:text-slate-700">privacy policy</a>.
          </p>
        </form>
      )}
    </div>
  );
}
