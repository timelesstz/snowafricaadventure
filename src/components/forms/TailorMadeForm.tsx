"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/Button";
import {
  PHONE_PREFIXES,
  SAFARI_DESTINATIONS,
  BUDGET_LEVELS,
  ACCOMMODATION_TYPES,
  SAFARI_INTERESTS,
  DATE_FLEXIBILITY,
  SAFARI_EXPERIENCE,
} from "@/lib/constants";
import { COUNTRIES, REFERRAL_SOURCES } from "@/lib/countries";
import { PostSubmissionShare } from "@/components/social/ShareButtons";
import {
  MapPin,
  Users,
  Calendar,
  Wallet,
  Home,
  Star,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export function TailorMadeForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showOtherReferral, setShowOtherReferral] = useState(false);
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [numChildren, setNumChildren] = useState(0);
  const [childrenAges, setChildrenAges] = useState<string[]>([]);

  const toggleDestination = (value: string) => {
    setSelectedDestinations((prev) =>
      prev.includes(value)
        ? prev.filter((d) => d !== value)
        : [...prev, value]
    );
  };

  const toggleInterest = (value: string) => {
    setSelectedInterests((prev) =>
      prev.includes(value)
        ? prev.filter((i) => i !== value)
        : [...prev, value]
    );
  };

  const handleChildrenChange = (count: number) => {
    setNumChildren(count);
    setChildrenAges((prev) => {
      if (count > prev.length) {
        return [...prev, ...Array(count - prev.length).fill("")];
      }
      return prev.slice(0, count);
    });
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

      try {
        const response = await fetch("/api/inquiries", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data,
            referralSource,
            destinations: selectedDestinations.join(","),
            interests: selectedInterests.join(","),
            childrenAges: childrenAges.filter((a) => a).join(","),
            numChildren,
            relatedTo: "Tailor-Made Safari",
            type: "tailor-made",
            tripType: "Customized",
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
    [selectedDestinations, selectedInterests, childrenAges, numChildren]
  );

  if (submitted) {
    return (
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-8 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg">
          <CheckCircle2 className="w-8 h-8 text-white" />
        </div>
        <h3 className="font-heading font-bold text-2xl text-slate-900 mb-2">
          Thank You!
        </h3>
        <p className="text-slate-600 mb-2">
          We&apos;ve received your custom safari request and our team is already
          working on your personalized itinerary.
        </p>
        <p className="text-sm text-slate-500 mb-6">
          Expect a detailed proposal within 24-48 hours.
        </p>
        <div className="pt-6 border-t border-green-200">
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
          <Users className="w-5 h-5 text-[var(--primary)]" />
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
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none"
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
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none"
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

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1.5">
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
        </div>
      </div>

      {/* Section 2: Group Size */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
          <Users className="w-5 h-5 text-[var(--primary)]" />
          <h3 className="font-semibold text-lg">Group Size</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="numAdults" className="block text-sm font-medium text-slate-700 mb-1.5">
              Number of Adults <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="numAdults"
              name="numAdults"
              min="1"
              max="20"
              defaultValue="2"
              required
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none"
            />
          </div>

          <div>
            <label htmlFor="numChildren" className="block text-sm font-medium text-slate-700 mb-1.5">
              Number of Children (under 16)
            </label>
            <input
              type="number"
              id="numChildren"
              name="numChildren"
              min="0"
              max="10"
              value={numChildren}
              onChange={(e) => handleChildrenChange(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none"
            />
          </div>
        </div>

        {/* Children Ages */}
        {numChildren > 0 && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Children&apos;s Ages
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {Array.from({ length: numChildren }).map((_, i) => (
                <input
                  key={i}
                  type="number"
                  min="0"
                  max="15"
                  placeholder={`Child ${i + 1} age`}
                  value={childrenAges[i] || ""}
                  onChange={(e) => {
                    const newAges = [...childrenAges];
                    newAges[i] = e.target.value;
                    setChildrenAges(newAges);
                  }}
                  className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none text-sm"
                />
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Children&apos;s ages help us recommend suitable activities and accommodations
            </p>
          </div>
        )}
      </div>

      {/* Section 3: Travel Dates */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
          <Calendar className="w-5 h-5 text-[var(--primary)]" />
          <h3 className="font-semibold text-lg">Travel Dates</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="arrivalDate" className="block text-sm font-medium text-slate-700 mb-1.5">
              Preferred Start Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="arrivalDate"
              name="arrivalDate"
              required
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none"
            />
          </div>

          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-slate-700 mb-1.5">
              Duration (days)
            </label>
            <select
              id="duration"
              name="duration"
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none bg-white"
            >
              <option value="">Select duration</option>
              <option value="3">3 Days</option>
              <option value="4">4 Days</option>
              <option value="5">5 Days</option>
              <option value="6">6 Days</option>
              <option value="7">7 Days (1 Week)</option>
              <option value="8">8 Days</option>
              <option value="10">10 Days</option>
              <option value="12">12 Days</option>
              <option value="14">14 Days (2 Weeks)</option>
              <option value="custom">Custom / Not Sure</option>
            </select>
          </div>

          <div>
            <label htmlFor="flexibility" className="block text-sm font-medium text-slate-700 mb-1.5">
              Date Flexibility
            </label>
            <select
              id="flexibility"
              name="flexibility"
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none bg-white"
            >
              {DATE_FLEXIBILITY.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Section 4: Destinations */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
          <MapPin className="w-5 h-5 text-[var(--primary)]" />
          <h3 className="font-semibold text-lg">Destinations of Interest</h3>
        </div>
        <p className="text-sm text-slate-500">
          Select all parks/areas you&apos;d like to visit (or leave blank for recommendations)
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {SAFARI_DESTINATIONS.map((dest) => (
            <button
              key={dest.value}
              type="button"
              onClick={() => toggleDestination(dest.value)}
              className={`px-3 py-2 text-sm rounded-lg border transition-all text-left ${
                selectedDestinations.includes(dest.value)
                  ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                  : "bg-white text-slate-700 border-slate-300 hover:border-[var(--primary)]"
              }`}
            >
              {dest.label}
            </button>
          ))}
        </div>
      </div>

      {/* Section 5: Budget & Accommodation */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
          <Wallet className="w-5 h-5 text-[var(--primary)]" />
          <h3 className="font-semibold text-lg">Budget & Accommodation</h3>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Budget Level <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {BUDGET_LEVELS.map((level) => (
              <label
                key={level.value}
                className="relative flex flex-col p-4 border rounded-lg cursor-pointer hover:border-[var(--primary)] transition-all"
              >
                <input
                  type="radio"
                  name="budget"
                  value={level.value}
                  required
                  className="absolute top-3 right-3 w-4 h-4 text-[var(--primary)] focus:ring-amber-500"
                />
                <span className="font-medium text-slate-900">{level.label}</span>
                <span className="text-xs text-slate-500 mt-1">{level.description}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Preferred Accommodation Style
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ACCOMMODATION_TYPES.map((type) => (
              <label
                key={type.value}
                className="relative flex flex-col p-4 border rounded-lg cursor-pointer hover:border-[var(--primary)] transition-all"
              >
                <input
                  type="radio"
                  name="accommodation"
                  value={type.value}
                  className="absolute top-3 right-3 w-4 h-4 text-[var(--primary)] focus:ring-amber-500"
                />
                <Home className="w-5 h-5 text-[var(--primary)] mb-1" />
                <span className="font-medium text-slate-900">{type.label}</span>
                <span className="text-xs text-slate-500">{type.description}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Section 6: Special Interests */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
          <Sparkles className="w-5 h-5 text-[var(--primary)]" />
          <h3 className="font-semibold text-lg">Special Interests</h3>
        </div>
        <p className="text-sm text-slate-500">
          What experiences are most important to you? (Select all that apply)
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {SAFARI_INTERESTS.map((interest) => (
            <button
              key={interest.value}
              type="button"
              onClick={() => toggleInterest(interest.value)}
              className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                selectedInterests.includes(interest.value)
                  ? "bg-[var(--secondary)] text-[var(--primary-dark)] border-[var(--secondary)]"
                  : "bg-white text-slate-700 border-slate-300 hover:border-[var(--secondary)]"
              }`}
            >
              {interest.label}
            </button>
          ))}
        </div>
      </div>

      {/* Section 7: Experience Level */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
          <Star className="w-5 h-5 text-[var(--primary)]" />
          <h3 className="font-semibold text-lg">Safari Experience</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {SAFARI_EXPERIENCE.map((exp) => (
            <label
              key={exp.value}
              className="relative flex flex-col p-4 border rounded-lg cursor-pointer hover:border-[var(--primary)] transition-all"
            >
              <input
                type="radio"
                name="experience"
                value={exp.value}
                className="absolute top-3 right-3 w-4 h-4 text-[var(--primary)] focus:ring-amber-500"
              />
              <span className="font-medium text-slate-900">{exp.label}</span>
              <span className="text-xs text-slate-500 mt-1">{exp.description}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Section 8: Additional Info */}
      <div className="space-y-4">
        <div>
          <label htmlFor="additionalInfo" className="block text-sm font-medium text-slate-700 mb-1.5">
            Tell us more about your dream safari
          </label>
          <textarea
            id="additionalInfo"
            name="additionalInfo"
            rows={4}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none resize-none"
            placeholder="Any special occasions (honeymoon, anniversary, birthday)? Specific wildlife you want to see? Medical or dietary requirements? Anything else we should know?"
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
      </div>

      {/* Submit */}
      <Button
        type="submit"
        variant="secondary"
        size="lg"
        className="w-full !py-4 !text-base font-semibold"
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
            Creating Your Request...
          </span>
        ) : (
          "Get My Custom Safari Proposal"
        )}
      </Button>

      <p className="text-xs text-slate-500 text-center">
        We&apos;ll send you a personalized itinerary within 24-48 hours. No obligation, no spam.
      </p>
    </form>
  );
}
