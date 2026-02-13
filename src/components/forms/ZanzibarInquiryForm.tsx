"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/Button";
import {
  PHONE_PREFIXES,
  BUDGET_LEVELS,
  ZANZIBAR_BEACHES,
  ZANZIBAR_ACTIVITIES,
  ZANZIBAR_DURATIONS,
} from "@/lib/constants";
import { COUNTRIES, REFERRAL_SOURCES } from "@/lib/countries";
import { PostSubmissionShare } from "@/components/social/ShareButtons";
import {
  Users,
  Calendar,
  Wallet,
  MapPin,
  Waves,
  CheckCircle2,
  Palmtree,
} from "lucide-react";

export function ZanzibarInquiryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showOtherReferral, setShowOtherReferral] = useState(false);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [combineWithSafari, setCombineWithSafari] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<string>("");

  const toggleActivity = (value: string) => {
    setSelectedActivities((prev) =>
      prev.includes(value)
        ? prev.filter((a) => a !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
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

      // Build additional info with structured data
      const structuredInfo = [];
      if (data.beachArea) {
        const beach = ZANZIBAR_BEACHES.find((b) => b.value === data.beachArea);
        structuredInfo.push(`Beach preference: ${beach?.label || data.beachArea}`);
      }
      if (selectedActivities.length > 0) {
        const activityLabels = selectedActivities.map((a) => {
          const activity = ZANZIBAR_ACTIVITIES.find((act) => act.value === a);
          return activity?.label || a;
        });
        structuredInfo.push(`Activities: ${activityLabels.join(", ")}`);
      }
      if (combineWithSafari) {
        structuredInfo.push(`Combine with safari: ${combineWithSafari}`);
      }
      if (data.additionalInfo) {
        structuredInfo.push(`Notes: ${data.additionalInfo}`);
      }

      try {
        const response = await fetch("/api/inquiries", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data,
            referralSource,
            interests: selectedActivities.join(","),
            destinations: data.beachArea,
            duration: selectedDuration !== "custom" ? parseInt(selectedDuration) : null,
            additionalInfo: structuredInfo.join("\n\n"),
            relatedTo: "Zanzibar Beach Holiday",
            type: "zanzibar",
            tripType: combineWithSafari === "yes" ? "Wildlife Safari + Zanzibar Beach" : "Zanzibar Beach",
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
    },
    [selectedActivities, combineWithSafari, selectedDuration]
  );

  if (submitted) {
    return (
      <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl p-8 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg">
          <CheckCircle2 className="w-8 h-8 text-white" />
        </div>
        <h3 className="font-heading font-bold text-2xl text-slate-900 mb-2">
          Thank You!
        </h3>
        <p className="text-slate-600 mb-2">
          We&apos;ve received your Zanzibar getaway request. Our beach holiday
          experts are already working on the perfect package for you.
        </p>
        <p className="text-sm text-slate-500 mb-6">
          Expect a detailed proposal within 24 hours.
        </p>
        <div className="pt-6 border-t border-cyan-200">
          <PostSubmissionShare />
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Section 1: Contact Information */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
          <Users className="w-5 h-5 text-cyan-600" />
          <h3 className="font-semibold text-lg">Contact Information</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-1.5">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all outline-none"
              placeholder="John Smith"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all outline-none"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-slate-700 mb-1.5">
              Country <span className="text-red-500">*</span>
            </label>
            <select
              id="country"
              name="country"
              required
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all outline-none bg-white"
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

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1.5">
              Phone / WhatsApp
            </label>
            <div className="flex gap-2">
              <select
                name="phonePrefix"
                className="w-[100px] px-2 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-sm transition-all outline-none bg-white"
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
                className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all outline-none"
                placeholder="123 456 7890"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Group Size */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
          <Users className="w-5 h-5 text-cyan-600" />
          <h3 className="font-semibold text-lg">Travelers</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="numAdults" className="block text-sm font-medium text-slate-700 mb-1.5">
              Adults <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="numAdults"
              name="numAdults"
              min="1"
              max="20"
              defaultValue="2"
              required
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all outline-none"
            />
          </div>

          <div>
            <label htmlFor="numChildren" className="block text-sm font-medium text-slate-700 mb-1.5">
              Children
            </label>
            <input
              type="number"
              id="numChildren"
              name="numChildren"
              min="0"
              max="10"
              defaultValue="0"
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all outline-none"
            />
          </div>
        </div>
      </div>

      {/* Section 3: Travel Dates & Duration */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
          <Calendar className="w-5 h-5 text-cyan-600" />
          <h3 className="font-semibold text-lg">When & How Long</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="arrivalDate" className="block text-sm font-medium text-slate-700 mb-1.5">
              Arrival Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="arrivalDate"
              name="arrivalDate"
              required
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Duration
            </label>
            <select
              name="duration"
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all outline-none bg-white"
            >
              <option value="">Select duration</option>
              {ZANZIBAR_DURATIONS.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label} - {d.description}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Section 4: Beach Area */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
          <Palmtree className="w-5 h-5 text-cyan-600" />
          <h3 className="font-semibold text-lg">Beach Area Preference</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ZANZIBAR_BEACHES.map((beach) => (
            <label
              key={beach.value}
              className="relative flex flex-col p-4 border rounded-lg cursor-pointer hover:border-cyan-500 transition-all"
            >
              <input
                type="radio"
                name="beachArea"
                value={beach.value}
                className="absolute top-3 right-3 w-4 h-4 text-cyan-600 focus:ring-cyan-500"
              />
              <span className="font-medium text-slate-900">{beach.label}</span>
              <span className="text-xs text-slate-500 mt-1">{beach.description}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Section 5: Activities */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
          <Waves className="w-5 h-5 text-cyan-600" />
          <h3 className="font-semibold text-lg">Activities You&apos;d Like</h3>
        </div>
        <p className="text-sm text-slate-500">
          Select all activities that interest you
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {ZANZIBAR_ACTIVITIES.map((activity) => (
            <button
              key={activity.value}
              type="button"
              onClick={() => toggleActivity(activity.value)}
              className={`px-3 py-2.5 text-sm rounded-lg border transition-all ${
                selectedActivities.includes(activity.value)
                  ? "bg-cyan-600 text-white border-cyan-600"
                  : "bg-white text-slate-700 border-slate-300 hover:border-cyan-500"
              }`}
            >
              {activity.label}
            </button>
          ))}
        </div>
      </div>

      {/* Section 6: Budget */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
          <Wallet className="w-5 h-5 text-cyan-600" />
          <h3 className="font-semibold text-lg">Accommodation Style</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {BUDGET_LEVELS.map((level) => (
            <label
              key={level.value}
              className="relative flex flex-col p-4 border rounded-lg cursor-pointer hover:border-cyan-500 transition-all"
            >
              <input
                type="radio"
                name="budget"
                value={level.value}
                className="absolute top-3 right-3 w-4 h-4 text-cyan-600 focus:ring-cyan-500"
              />
              <span className="font-medium text-slate-900">{level.label}</span>
              <span className="text-xs text-slate-500 mt-1">{level.description}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Section 7: Combine with Safari */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
          <MapPin className="w-5 h-5 text-cyan-600" />
          <h3 className="font-semibold text-lg">Combine with Safari?</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <label className="relative flex flex-col p-4 border rounded-lg cursor-pointer hover:border-cyan-500 transition-all">
            <input
              type="radio"
              name="combineWithSafari"
              value="yes"
              onChange={(e) => setCombineWithSafari(e.target.value)}
              className="absolute top-3 right-3 w-4 h-4 text-cyan-600 focus:ring-cyan-500"
            />
            <span className="font-medium text-slate-900">Yes, please!</span>
            <span className="text-xs text-slate-500 mt-1">Add a safari to my trip</span>
          </label>
          <label className="relative flex flex-col p-4 border rounded-lg cursor-pointer hover:border-cyan-500 transition-all">
            <input
              type="radio"
              name="combineWithSafari"
              value="maybe"
              onChange={(e) => setCombineWithSafari(e.target.value)}
              className="absolute top-3 right-3 w-4 h-4 text-cyan-600 focus:ring-cyan-500"
            />
            <span className="font-medium text-slate-900">Maybe</span>
            <span className="text-xs text-slate-500 mt-1">Tell me about options</span>
          </label>
          <label className="relative flex flex-col p-4 border rounded-lg cursor-pointer hover:border-cyan-500 transition-all">
            <input
              type="radio"
              name="combineWithSafari"
              value="no"
              onChange={(e) => setCombineWithSafari(e.target.value)}
              className="absolute top-3 right-3 w-4 h-4 text-cyan-600 focus:ring-cyan-500"
            />
            <span className="font-medium text-slate-900">No, just beach</span>
            <span className="text-xs text-slate-500 mt-1">Zanzibar only</span>
          </label>
        </div>
      </div>

      {/* Section 8: Additional Info */}
      <div className="space-y-4">
        <div>
          <label htmlFor="additionalInfo" className="block text-sm font-medium text-slate-700 mb-1.5">
            Anything else we should know?
          </label>
          <textarea
            id="additionalInfo"
            name="additionalInfo"
            rows={3}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all outline-none resize-none"
            placeholder="Special occasions, dietary requirements, accessibility needs, specific hotels you've heard of..."
          />
        </div>

        <div>
          <label htmlFor="referralSource" className="block text-sm font-medium text-slate-700 mb-1.5">
            How did you hear about us?
          </label>
          <select
            id="referralSource"
            name="referralSource"
            onChange={(e) => setShowOtherReferral(e.target.value === "other")}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all outline-none"
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
              className="w-full mt-2 px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all outline-none"
            />
          )}
        </div>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        variant="secondary"
        size="lg"
        className="w-full !py-4 !text-base font-semibold !bg-cyan-600 hover:!bg-cyan-700"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Planning Your Getaway...
          </span>
        ) : (
          "Plan My Zanzibar Getaway"
        )}
      </Button>

      <p className="text-xs text-slate-500 text-center">
        We&apos;ll send you beach holiday options within 24 hours. No obligation, no spam.
      </p>
    </form>
  );
}
