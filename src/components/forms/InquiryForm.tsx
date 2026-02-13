"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/Button";
import { TRIP_TYPES, PHONE_PREFIXES } from "@/lib/constants";
import { COUNTRIES, REFERRAL_SOURCES } from "@/lib/countries";
import { InviteFriendsSection, type InviteFriend } from "./InviteFriendsSection";
import { PostSubmissionShare } from "@/components/social/ShareButtons";

interface InquiryFormProps {
  relatedTo?: string;
  tripType?: string;
  variant?: "sidebar" | "full" | "hero";
  showInviteSection?: boolean;
}

export function InquiryForm({
  relatedTo,
  tripType,
  variant = "sidebar",
  showInviteSection = false,
}: InquiryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inviteFriends, setInviteFriends] = useState<InviteFriend[]>([]);
  const [showOtherReferral, setShowOtherReferral] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Handle referral source
    let referralSource = data.referralSource as string;
    if (referralSource === "other" && data.referralOther) {
      referralSource = `Other: ${data.referralOther}`;
    }

    // Filter out empty invite friends
    const validInvites = inviteFriends.filter(
      (f) => f.name.trim() && f.email.trim()
    );

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          referralSource,
          relatedTo,
          type: tripType || data.tripType || "general",
          inviteFriends: validInvites.length > 0 ? validInvites : undefined,
        }),
      });

      const result = await response.json();

      if (response.ok) {
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
  }, [relatedTo, tripType, inviteFriends]);

  if (submitted) {
    return (
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-8 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="font-heading font-bold text-2xl text-slate-900 mb-2">Thank You!</h3>
        <p className="text-slate-600 mb-2">
          We&apos;ve received your inquiry and our team is already working on your request.
        </p>
        <p className="text-sm text-slate-500 mb-6">
          Check your email for a confirmation with all the details.
        </p>

        {/* Post-submission share CTA */}
        <div className="pt-6 border-t border-green-200">
          <PostSubmissionShare />
        </div>
      </div>
    );
  }

  const isHero = variant === "hero";
  const isFull = variant === "full";
  const showInvite = showInviteSection || tripType === "Kilimanjaro" || isFull;

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-5 ${isHero ? "bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-xl" : ""}`}
    >
      {isHero && (
        <h3 className="font-heading font-bold text-xl text-slate-900 mb-4">
          Start Planning Your Adventure
        </h3>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {/* Row 1: Full Name + Email (side by side) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none"
              placeholder="John Smith"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none"
              placeholder="john@example.com"
            />
          </div>
        </div>

        {/* Row 2: Country + Trip Type (side by side) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Country */}
          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Country <span className="text-red-500">*</span>
            </label>
            <select
              id="country"
              name="country"
              required
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none bg-white"
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

          {/* Trip Type (if not pre-set) */}
          {!tripType ? (
            <div>
              <label
                htmlFor="tripType"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Trip Type <span className="text-red-500">*</span>
              </label>
              <select
                id="tripType"
                name="tripType"
                required
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none bg-white"
              >
                <option value="">Select trip type</option>
                {TRIP_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            /* If tripType is preset, show Arrival Date here instead */
            <div>
              <label
                htmlFor="arrivalDate"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Preferred Travel Date
              </label>
              <input
                type="date"
                id="arrivalDate"
                name="arrivalDate"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none"
              />
            </div>
          )}
        </div>

        {/* Row 3: Phone Number */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            Phone / WhatsApp
          </label>
          <div className="flex gap-2">
            <select
              name="phonePrefix"
              className="w-[100px] px-2 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm transition-all outline-none bg-white"
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
              className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none"
              placeholder="123 456 7890"
            />
          </div>
        </div>

        {/* Row 4: Travelers + Arrival Date (side by side) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Adults */}
          <div>
            <label
              htmlFor="numAdults"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Adults
            </label>
            <input
              type="number"
              id="numAdults"
              name="numAdults"
              min="1"
              defaultValue="2"
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none"
            />
          </div>

          {/* Children */}
          <div>
            <label
              htmlFor="numChildren"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Children
            </label>
            <input
              type="number"
              id="numChildren"
              name="numChildren"
              min="0"
              defaultValue="0"
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none"
            />
          </div>

          {/* Arrival Date (only show here if tripType is NOT preset) */}
          {!tripType && (
            <div>
              <label
                htmlFor="arrivalDate"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Travel Date
              </label>
              <input
                type="date"
                id="arrivalDate"
                name="arrivalDate"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none"
              />
            </div>
          )}
        </div>
      </div>

      {/* How did you hear about us */}
      {isFull && (
        <div>
          <label
            htmlFor="referralSource"
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            How did you hear about us?
          </label>
          <select
            id="referralSource"
            name="referralSource"
            onChange={(e) => setShowOtherReferral(e.target.value === "other")}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none"
          >
            <option value="">Please select...</option>
            {REFERRAL_SOURCES.map((source) => (
              <option key={source.value} value={source.value}>
                {source.label}
              </option>
            ))}
          </select>
          {showOtherReferral && (
            <input
              type="text"
              name="referralOther"
              placeholder="Please specify..."
              className="w-full mt-2 px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none"
            />
          )}
        </div>
      )}

      {/* Additional Info */}
      {(isFull || variant === "sidebar") && (
        <div>
          <label
            htmlFor="additionalInfo"
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            Tell us about your dream trip
          </label>
          <textarea
            id="additionalInfo"
            name="additionalInfo"
            rows={4}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none resize-none"
            placeholder="What are your interests? Any special requirements? Preferred activities?"
          />
        </div>
      )}

      {/* Invite Friends Section */}
      {showInvite && (
        <InviteFriendsSection
          friends={inviteFriends}
          onChange={setInviteFriends}
          maxFriends={5}
        />
      )}

      {/* Submit */}
      <Button
        type="submit"
        variant="secondary"
        size="lg"
        className="w-full !py-3 !text-base font-semibold"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Sending...
          </span>
        ) : (
          "Send Inquiry"
        )}
      </Button>

      <p className="text-xs text-slate-500 text-center">
        We typically respond within 24 hours. No spam, ever.
      </p>
    </form>
  );
}
