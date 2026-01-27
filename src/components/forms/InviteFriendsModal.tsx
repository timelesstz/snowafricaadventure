"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/Button";
import { type DepartureShareData } from "@/lib/share";
import { format } from "date-fns";
import { formatPrice } from "@/lib/utils";

interface InviteFriend {
  name: string;
  email: string;
}

interface InviteFriendsModalProps {
  isOpen: boolean;
  onClose: () => void;
  departure: DepartureShareData;
  inviterName?: string;
  inviterEmail?: string;
}

export function InviteFriendsModal({
  isOpen,
  onClose,
  departure,
  inviterName = "",
  inviterEmail = "",
}: InviteFriendsModalProps) {
  const [yourName, setYourName] = useState(inviterName);
  const [yourEmail, setYourEmail] = useState(inviterEmail);
  const [friends, setFriends] = useState<InviteFriend[]>([{ name: "", email: "" }]);
  const [personalMessage, setPersonalMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const addFriend = useCallback(() => {
    if (friends.length < 5) {
      setFriends([...friends, { name: "", email: "" }]);
    }
  }, [friends]);

  const removeFriend = useCallback((index: number) => {
    if (friends.length > 1) {
      setFriends(friends.filter((_, i) => i !== index));
    }
  }, [friends]);

  const updateFriend = useCallback((index: number, field: keyof InviteFriend, value: string) => {
    const updated = [...friends];
    updated[index] = { ...updated[index], [field]: value };
    setFriends(updated);
  }, [friends]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    // Validate
    if (!yourName.trim() || !yourEmail.trim()) {
      setError("Please enter your name and email");
      setIsSubmitting(false);
      return;
    }

    const validFriends = friends.filter(
      (f) => f.name.trim() && f.email.trim()
    );

    if (validFriends.length === 0) {
      setError("Please add at least one friend to invite");
      setIsSubmitting(false);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(yourEmail)) {
      setError("Please enter a valid email address for yourself");
      setIsSubmitting(false);
      return;
    }

    const invalidEmails = validFriends.filter((f) => !emailRegex.test(f.email));
    if (invalidEmails.length > 0) {
      setError(`Invalid email: ${invalidEmails.map((f) => f.name || f.email).join(", ")}`);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/invites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          departureId: departure.id,
          creatorName: yourName,
          creatorEmail: yourEmail,
          invitees: validFriends,
          personalMessage: personalMessage.trim() || undefined,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to send invites");
      }

      setSuccess(true);

      setTimeout(() => {
        onClose();
        setSuccess(false);
        setFriends([{ name: "", email: "" }]);
        setPersonalMessage("");
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send invites");
    } finally {
      setIsSubmitting(false);
    }
  }, [yourName, yourEmail, friends, personalMessage, departure.id, onClose]);

  if (!isOpen) return null;

  const fullMoonText = departure.isFullMoon ? " (Full Moon Summit)" : "";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-[var(--primary-dark)] text-white p-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-xl font-bold">Invite Friends & Family</h2>
            <button
              type="button"
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Departure Info */}
        <div className="bg-[var(--surface)] p-4 border-b border-[var(--border)]">
          <div className="flex items-start gap-3">
            {departure.isFullMoon && (
              <span className="text-2xl" title="Full Moon Summit">
                {String.fromCodePoint(0x1F315)}
              </span>
            )}
            <div className="flex-1">
              <h3 className="font-semibold text-[var(--primary-dark)]">
                {departure.routeName}{fullMoonText}
              </h3>
              <p className="text-sm text-[var(--text-muted)]">
                {format(new Date(departure.arrivalDate), "MMM d")} -{" "}
                {format(new Date(departure.endDate), "MMM d, yyyy")}
              </p>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-lg font-bold text-[var(--primary)]">
                  {formatPrice(departure.price)}
                </span>
                <span className="text-sm text-[var(--text-muted)]">
                  {departure.availableSpots} spots left
                </span>
              </div>
            </div>
          </div>
        </div>

        {success ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-green-600">Invitations Sent!</h3>
            <p className="text-[var(--text-muted)] mt-2">
              Your friends will receive an email with all the details.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            {/* Your Info */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="yourName" className="block text-sm font-medium text-[var(--text-muted)] mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="yourName"
                  value={yourName}
                  onChange={(e) => setYourName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-3 py-2 border border-[var(--border)] rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="yourEmail" className="block text-sm font-medium text-[var(--text-muted)] mb-1">
                  Your Email *
                </label>
                <input
                  type="email"
                  id="yourEmail"
                  value={yourEmail}
                  onChange={(e) => setYourEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-3 py-2 border border-[var(--border)] rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] text-sm"
                  required
                />
              </div>
            </div>

            {/* Friends */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-muted)] mb-2">
                Friends to Invite (up to 5)
              </label>
              <div className="space-y-2">
                {friends.map((friend, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={friend.name}
                      onChange={(e) => updateFriend(index, "name", e.target.value)}
                      placeholder="Friend's name"
                      className="flex-1 px-3 py-2 border border-[var(--border)] rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] text-sm"
                    />
                    <input
                      type="email"
                      value={friend.email}
                      onChange={(e) => updateFriend(index, "email", e.target.value)}
                      placeholder="friend@email.com"
                      className="flex-1 px-3 py-2 border border-[var(--border)] rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] text-sm"
                    />
                    {friends.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFriend(index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                        title="Remove"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {friends.length < 5 && (
                <button
                  type="button"
                  onClick={addFriend}
                  className="mt-2 text-sm text-[var(--primary)] hover:text-[var(--primary-dark)] font-medium flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Another Friend
                </button>
              )}
            </div>

            {/* Personal Message */}
            <div>
              <label htmlFor="personalMessage" className="block text-sm font-medium text-[var(--text-muted)] mb-1">
                Personal Message (optional)
              </label>
              <textarea
                id="personalMessage"
                value={personalMessage}
                onChange={(e) => setPersonalMessage(e.target.value)}
                rows={3}
                placeholder="Add a personal note to your invitation..."
                className="w-full px-3 py-2 border border-[var(--border)] rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] text-sm"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
                {error}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="secondary"
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? "Sending..." : "Send Invitations"}
              </Button>
            </div>

            <p className="text-xs text-[var(--text-light)] text-center">
              Your friends will receive an email with departure details and a link to book.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
