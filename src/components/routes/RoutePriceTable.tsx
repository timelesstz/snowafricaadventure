"use client";

import { useState, useCallback, useEffect } from "react";
import { DollarSign, Check, User, Users, X, ArrowRight } from "lucide-react";
import { PHONE_PREFIXES } from "@/lib/constants";
import { COUNTRIES } from "@/lib/countries";
import { trackFormStart, trackFormSubmit } from "@/lib/analytics";

interface PriceTier {
  groupSize: string;
  description: string;
  price: number;
  savings?: number;
  featured?: boolean;
}

interface RoutePriceTableProps {
  routeTitle: string;
  duration?: string;
  priceTiers?: PriceTier[] | null;
  currency?: string;
}

const defaultPriceTiers: PriceTier[] = [
  { groupSize: "1 Person", description: "Private climb experience", price: 3250 },
  { groupSize: "2-4 People", description: "Small group adventure", price: 3050, savings: 200, featured: true },
  { groupSize: "5-7 People", description: "Medium group savings", price: 2925, savings: 325 },
  { groupSize: "8-10 People", description: "Large group discount", price: 2850, savings: 400 },
  { groupSize: "11 & Above", description: "Best value for groups", price: 2765, savings: 485 },
];

/* ─── Custom Quote Modal ─── */
function CustomQuoteModal({
  isOpen,
  onClose,
  routeTitle,
  selectedTier,
  currency,
}: {
  isOpen: boolean;
  onClose: () => void;
  routeTitle: string;
  selectedTier: PriceTier | null;
  currency: string;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Track form start
  useEffect(() => {
    if (isOpen) {
      trackFormStart({
        formName: "custom_quote_form",
        formId: "custom-quote-modal",
        formLocation: routeTitle,
      });
    }
  }, [isOpen, routeTitle]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsSubmitting(true);
      setError(null);

      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());

      try {
        const response = await fetch("/api/inquiries/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: data.fullName,
            email: data.email,
            phonePrefix: data.phonePrefix,
            phone: data.phone,
            country: data.country,
            numAdults: data.numAdults,
            arrivalDate: data.arrivalDate || undefined,
            additionalInfo: selectedTier
              ? `[Custom Quote] Group size: ${selectedTier.groupSize} (${currency} $${selectedTier.price.toLocaleString()}/person). ${data.message || ""}`
              : `[Custom Quote] ${data.message || ""}`,
            relatedTo: routeTitle,
            type: "Kilimanjaro",
          }),
        });

        if (response.ok) {
          trackFormSubmit({
            formName: "custom_quote_form",
            formId: "custom-quote-modal",
            tripType: "Kilimanjaro",
            numTravelers: parseInt(data.numAdults as string) || 1,
            relatedItem: routeTitle,
          });
          setSubmitted(true);
        } else {
          const result = await response.json().catch(() => null);
          setError(result?.message || "Something went wrong. Please try again.");
        }
      } catch {
        setError("Network error. Please check your connection and try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [routeTitle, selectedTier, currency]
  );

  const handleClose = useCallback(() => {
    onClose();
    // Reset state after animation
    setTimeout(() => {
      setSubmitted(false);
      setError(null);
    }, 300);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[var(--primary-dark)] text-white p-5 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading text-xl font-bold">Get Your Custom Quote</h2>
              <p className="text-white/70 text-sm mt-0.5">{routeTitle}</p>
            </div>
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close quote form"
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Selected Tier Badge */}
        {selectedTier && (
          <div className="bg-[var(--secondary)]/10 border-b border-[var(--border)] px-5 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[var(--secondary)]/20 rounded-lg flex items-center justify-center text-[var(--secondary-dark)]">
                {selectedTier.groupSize === "1 Person" ? (
                  <User className="w-5 h-5" />
                ) : (
                  <Users className="w-5 h-5" />
                )}
              </div>
              <div>
                <span className="font-heading font-semibold text-[var(--primary-dark)] text-sm">
                  {selectedTier.groupSize}
                </span>
                <span className="block text-xs text-[var(--text-muted)]">
                  ${selectedTier.price.toLocaleString()} {currency}/person
                </span>
              </div>
            </div>
            {selectedTier.savings && (
              <span className="bg-emerald-500 text-white px-2.5 py-1 rounded-full text-xs font-semibold">
                Save ${selectedTier.savings.toLocaleString()}
              </span>
            )}
          </div>
        )}

        {submitted ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-heading font-bold text-2xl text-slate-900 mb-2">Quote Request Sent!</h3>
            <p className="text-slate-600 mb-2">
              Our team will craft a personalized quote for your {selectedTier?.groupSize || "group"} adventure.
            </p>
            <p className="text-sm text-slate-500 mb-6">
              Expect a response within 24 hours.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2.5 bg-[var(--primary)] text-white font-heading font-semibold rounded-lg hover:bg-[var(--primary-dark)] transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="quote-fullName" className="block text-sm font-medium text-slate-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="quote-fullName"
                  name="fullName"
                  required
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm transition-all outline-none"
                  placeholder="John Smith"
                />
              </div>
              <div>
                <label htmlFor="quote-email" className="block text-sm font-medium text-slate-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="quote-email"
                  name="email"
                  required
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm transition-all outline-none"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            {/* Country */}
            <div>
              <label htmlFor="quote-country" className="block text-sm font-medium text-slate-700 mb-1">
                Country <span className="text-red-500">*</span>
              </label>
              <select
                id="quote-country"
                name="country"
                required
                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm transition-all outline-none bg-white"
              >
                <option value="">Select your country</option>
                {COUNTRIES.slice(0, 20).map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.flag} {country.name}
                  </option>
                ))}
                <option disabled>──────────────</option>
                {COUNTRIES.slice(20).map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.flag} {country.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="quote-phone" className="block text-sm font-medium text-slate-700 mb-1">
                Phone / WhatsApp
              </label>
              <div className="flex gap-2">
                <select
                  name="phonePrefix"
                  aria-label="Phone country code"
                  className="w-[90px] px-1.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm transition-all outline-none bg-white"
                >
                  {PHONE_PREFIXES.map((prefix) => (
                    <option key={prefix.code} value={prefix.code}>
                      {prefix.code}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  id="quote-phone"
                  name="phone"
                  className="flex-1 px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm transition-all outline-none"
                  placeholder="123 456 7890"
                />
              </div>
            </div>

            {/* Group size + Travel date */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="quote-numAdults" className="block text-sm font-medium text-slate-700 mb-1">
                  Group Size
                </label>
                <input
                  type="number"
                  id="quote-numAdults"
                  name="numAdults"
                  min="1"
                  key={selectedTier?.groupSize ?? "default"}
                  defaultValue={selectedTier ? parseInt(selectedTier.groupSize.match(/\d+/)?.[0] || "2") : 2}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm transition-all outline-none"
                />
              </div>
              <div>
                <label htmlFor="quote-arrivalDate" className="block text-sm font-medium text-slate-700 mb-1">
                  Preferred Date
                </label>
                <input
                  type="date"
                  id="quote-arrivalDate"
                  name="arrivalDate"
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm transition-all outline-none"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="quote-message" className="block text-sm font-medium text-slate-700 mb-1">
                Anything else we should know?
              </label>
              <textarea
                id="quote-message"
                name="message"
                rows={3}
                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm transition-all outline-none resize-none"
                placeholder="Special requirements, preferred accommodation, fitness level..."
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-[var(--secondary)] text-[var(--primary-dark)] font-heading font-bold rounded-lg hover:bg-[var(--secondary-dark)] transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  Get My Custom Quote
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <p className="text-xs text-slate-500 text-center">
              We respond within 24 hours. No spam, ever.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

/* ─── Main Price Table ─── */
export function RoutePriceTable({
  routeTitle,
  duration,
  priceTiers,
  currency = "USD",
}: RoutePriceTableProps) {
  const tiers = priceTiers ?? defaultPriceTiers;
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [selectedTier, setSelectedTier] = useState<PriceTier | null>(null);

  const handleTierClick = useCallback((tier: PriceTier) => {
    setSelectedTier(tier);
    setShowQuoteModal(true);
  }, []);

  const handleGetQuote = useCallback(() => {
    setSelectedTier(null);
    setShowQuoteModal(true);
  }, []);

  // Create display title with duration if available
  const displayTitle = duration
    ? `${duration} ${routeTitle.replace(/^\d+-Day\s*/i, "")}`
    : routeTitle;

  return (
    <>
      <section className="py-20 bg-gradient-to-b from-[var(--surface)] to-white" id="pricing">
        <div className="max-w-5xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 bg-[var(--secondary)]/10 text-[var(--secondary-dark)] px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <DollarSign className="w-4 h-4" />
              Group Pricing
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-[var(--primary)] mb-3">
              {displayTitle} Pricing
            </h2>
            <p className="text-lg text-[var(--text-muted)] max-w-xl mx-auto">
              Save more when you climb with friends. All prices include accommodation, meals, park fees, and expert guides.
            </p>
          </div>

          {/* Price Table */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-3 bg-[var(--primary)] text-white px-8 py-5 font-heading font-semibold">
              <div>Group Size</div>
              <div>Price per Person</div>
              <div>Savings</div>
            </div>

            {/* Table Rows — clickable */}
            {tiers.map((tier, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleTierClick(tier)}
                className={`grid grid-cols-3 px-8 py-6 border-b border-[var(--border)] items-center transition-all w-full text-left group cursor-pointer ${
                  tier.featured
                    ? "bg-gradient-to-r from-[var(--secondary)]/10 to-[var(--secondary)]/5 relative hover:from-[var(--secondary)]/20 hover:to-[var(--secondary)]/10"
                    : "hover:bg-[var(--surface)]"
                }`}
              >
                {tier.featured && (
                  <span className="absolute top-1/2 right-8 -translate-y-1/2 bg-[var(--secondary)] text-[var(--primary-dark)] px-3 py-1 rounded-full text-xs font-semibold hidden lg:block">
                    Most Popular
                  </span>
                )}

                {/* Group Size */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[var(--surface)] rounded-lg flex items-center justify-center text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white transition-colors">
                    {tier.groupSize === "1 Person" ? (
                      <User className="w-6 h-6" />
                    ) : (
                      <Users className="w-6 h-6" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-[var(--primary)]">
                      {tier.groupSize}
                    </h4>
                    <span className="text-sm text-[var(--text-muted)]">
                      {tier.description}
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="font-heading text-2xl font-bold text-[var(--primary)]">
                  ${tier.price.toLocaleString()}{" "}
                  <span className="text-sm font-normal text-[var(--text-muted)]">
                    {currency}
                  </span>
                </div>

                {/* Savings + Arrow */}
                <div className="flex items-center gap-3">
                  {tier.savings ? (
                    <span className="inline-block bg-emerald-500 text-white px-2.5 py-1 rounded-full text-xs font-semibold">
                      Save ${tier.savings.toLocaleString()}
                    </span>
                  ) : (
                    <span className="text-[var(--text-muted)]">&mdash;</span>
                  )}
                  <ArrowRight className="w-4 h-4 text-[var(--text-muted)] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all ml-auto" />
                </div>
              </button>
            ))}

            {/* Table Footer */}
            <div className="bg-[var(--surface)] px-8 py-6 flex flex-wrap justify-between items-center gap-4">
              <div className="flex flex-wrap gap-4 text-sm text-[var(--text-muted)]">
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-500" />
                  Park fees included
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-500" />
                  All meals
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-500" />
                  Expert guides
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-500" />
                  Camping equipment
                </span>
              </div>
              <button
                type="button"
                onClick={handleGetQuote}
                className="px-8 py-3.5 bg-[var(--secondary)] text-[var(--primary-dark)] font-heading font-bold rounded-lg hover:bg-[var(--secondary-dark)] transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                Get Custom Quote
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Quote Modal */}
      <CustomQuoteModal
        isOpen={showQuoteModal}
        onClose={() => setShowQuoteModal(false)}
        routeTitle={routeTitle}
        selectedTier={selectedTier}
        currency={currency}
      />
    </>
  );
}
