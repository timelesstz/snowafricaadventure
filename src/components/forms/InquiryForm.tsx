"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/Button";
import { TRIP_TYPES, PHONE_PREFIXES } from "@/lib/constants";
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
  const [inviteFriends, setInviteFriends] = useState<InviteFriend[]>([]);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

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
          relatedTo,
          type: tripType || data.tripType || "general",
          inviteFriends: validInvites.length > 0 ? validInvites : undefined,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [relatedTo, tripType, inviteFriends]);

  if (submitted) {
    return (
      <div className="bg-[var(--surface)] border border-[var(--surface)] rounded-lg p-6 text-center">
        <div className="w-12 h-12 bg-[var(--surface)] rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-6 h-6 text-[var(--primary)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="font-semibold text-lg text-[var(--primary-dark)]">Thank You!</h3>
        <p className="text-[var(--primary-dark)] mt-2">
          We&apos;ve received your inquiry and will get back to you within 24 hours.
        </p>

        {/* Post-submission share CTA */}
        <div className="mt-6 pt-6 border-t border-[var(--border)]">
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
      className={`space-y-4 ${isHero ? "bg-white/95 backdrop-blur-sm p-6 rounded-lg shadow-xl" : ""}`}
    >
      {isHero && (
        <h3 className="font-heading font-bold text-xl text-[var(--text)] mb-4">
          Start Planning Your Adventure
        </h3>
      )}

      <div className={isFull ? "grid md:grid-cols-2 gap-4" : "space-y-4"}>
        {/* Name */}
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-[var(--text-muted)] mb-1"
          >
            Full Name *
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            required
            className="w-full px-3 py-2 border border-[var(--border)] rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)]"
            placeholder="John Smith"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[var(--text-muted)] mb-1"
          >
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-3 py-2 border border-[var(--border)] rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)]"
            placeholder="john@example.com"
          />
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-[var(--text-muted)] mb-1"
          >
            Phone Number
          </label>
          <div className="flex gap-2">
            <select
              name="phonePrefix"
              className="w-24 px-2 py-2 border border-[var(--border)] rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] text-sm"
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
              className="flex-1 px-3 py-2 border border-[var(--border)] rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)]"
              placeholder="123 456 7890"
            />
          </div>
        </div>

        {/* Trip Type (if not pre-set) */}
        {!tripType && (
          <div>
            <label
              htmlFor="tripType"
              className="block text-sm font-medium text-[var(--text-muted)] mb-1"
            >
              Trip Type *
            </label>
            <select
              id="tripType"
              name="tripType"
              required
              className="w-full px-3 py-2 border border-[var(--border)] rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)]"
            >
              <option value="">Select trip type</option>
              {TRIP_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Number of Travelers */}
        <div className={isFull ? "" : "grid grid-cols-2 gap-2"}>
          <div>
            <label
              htmlFor="numAdults"
              className="block text-sm font-medium text-[var(--text-muted)] mb-1"
            >
              Adults
            </label>
            <input
              type="number"
              id="numAdults"
              name="numAdults"
              min="1"
              defaultValue="2"
              className="w-full px-3 py-2 border border-[var(--border)] rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)]"
            />
          </div>
          {!isFull && (
            <div>
              <label
                htmlFor="numChildren"
                className="block text-sm font-medium text-[var(--text-muted)] mb-1"
              >
                Children
              </label>
              <input
                type="number"
                id="numChildren"
                name="numChildren"
                min="0"
                defaultValue="0"
                className="w-full px-3 py-2 border border-[var(--border)] rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)]"
              />
            </div>
          )}
        </div>

        {/* Arrival Date */}
        <div>
          <label
            htmlFor="arrivalDate"
            className="block text-sm font-medium text-[var(--text-muted)] mb-1"
          >
            Preferred Arrival Date
          </label>
          <input
            type="date"
            id="arrivalDate"
            name="arrivalDate"
            className="w-full px-3 py-2 border border-[var(--border)] rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)]"
          />
        </div>
      </div>

      {/* Additional Info */}
      {(isFull || variant === "sidebar") && (
        <div>
          <label
            htmlFor="additionalInfo"
            className="block text-sm font-medium text-[var(--text-muted)] mb-1"
          >
            Additional Information
          </label>
          <textarea
            id="additionalInfo"
            name="additionalInfo"
            rows={3}
            className="w-full px-3 py-2 border border-[var(--border)] rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)]"
            placeholder="Tell us about your dream trip..."
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
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send Inquiry"}
      </Button>

      <p className="text-xs text-[var(--text-light)] text-center">
        We typically respond within 24 hours
      </p>
    </form>
  );
}
