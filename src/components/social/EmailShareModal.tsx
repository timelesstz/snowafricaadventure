"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/Button";
import { getDepartureShareContent, type DepartureShareData } from "@/lib/share";

interface EmailShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  departure?: DepartureShareData;
  onSend?: (emails: string[], subject: string, message: string) => void;
}

export function EmailShareModal({
  isOpen,
  onClose,
  departure,
  onSend,
}: EmailShareModalProps) {
  const content = departure ? getDepartureShareContent(departure) : null;

  const [recipients, setRecipients] = useState("");
  const [subject, setSubject] = useState(content?.emailSubject || "Check out this Kilimanjaro adventure!");
  const [message, setMessage] = useState(content?.emailBody || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const emails = recipients
      .split(/[,;\s]+/)
      .map((email) => email.trim())
      .filter((email) => email.length > 0);

    if (emails.length === 0) {
      setError("Please enter at least one email address");
      setIsSubmitting(false);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const invalidEmails = emails.filter((email) => !emailRegex.test(email));
    if (invalidEmails.length > 0) {
      setError(`Invalid email address: ${invalidEmails.join(", ")}`);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/share/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipients: emails,
          subject,
          message,
          departureId: departure?.id,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to send email");
      }

      setSuccess(true);
      onSend?.(emails, subject, message);

      setTimeout(() => {
        onClose();
        setSuccess(false);
        setRecipients("");
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send email");
    } finally {
      setIsSubmitting(false);
    }
  }, [recipients, subject, message, departure?.id, onSend, onClose]);

  if (!isOpen) return null;

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
        <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
          <h2 className="font-heading text-xl font-bold">Share via Email</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-[var(--surface)] rounded-full transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {success ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-green-600">Email Sent!</h3>
            <p className="text-[var(--text-muted)] mt-2">
              Your message has been sent successfully.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            {/* Recipients */}
            <div>
              <label htmlFor="recipients" className="block text-sm font-medium text-[var(--text-muted)] mb-1">
                To (separate multiple emails with commas)
              </label>
              <input
                type="text"
                id="recipients"
                value={recipients}
                onChange={(e) => setRecipients(e.target.value)}
                placeholder="friend@example.com, family@example.com"
                className="w-full px-3 py-2 border border-[var(--border)] rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)]"
                required
              />
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-[var(--text-muted)] mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 border border-[var(--border)] rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)]"
                required
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[var(--text-muted)] mb-1">
                Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={8}
                className="w-full px-3 py-2 border border-[var(--border)] rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)]"
                required
              />
            </div>

            {/* Preview note */}
            <p className="text-xs text-[var(--text-light)]">
              A link to the departure page will be automatically included.
            </p>

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
                variant="primary"
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? "Sending..." : "Send Email"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
