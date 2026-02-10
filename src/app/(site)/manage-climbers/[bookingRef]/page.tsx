"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Loader2,
  AlertCircle,
  Check,
  Mountain,
  Calendar,
  Users,
  Copy,
  Edit2,
  ExternalLink,
  Mail,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";
import { format } from "date-fns";
import { COUNTRIES } from "@/lib/countries";

interface ClimberDetails {
  name?: string;
  email?: string;
  phone?: string;
  nationality?: string;
  passportNumber?: string;
  dateOfBirth?: string;
  dietaryRequirements?: string;
  medicalConditions?: string;
  isComplete?: boolean;
}

interface ClimberData {
  index: number;
  isLead: boolean;
  name: string | null;
  email: string | null;
  isComplete: boolean;
  token: { code: string; expiresAt: string } | null;
  details: ClimberDetails | null;
}

interface BookingData {
  bookingRef: string;
  bookingId: string;
  leadName: string;
  leadEmail: string;
  totalClimbers: number;
  completedCount: number;
  depositPaid: boolean;
  route: {
    name: string;
    slug: string;
    duration: number;
  };
  departure: {
    arrivalDate: string;
    endDate: string;
  };
  climbers: ClimberData[];
}

export default function ManageClimbersPage() {
  const params = useParams();
  const bookingRef = params.bookingRef as string;

  const [step, setStep] = useState<"verify" | "manage">("verify");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [editingClimber, setEditingClimber] = useState<number | null>(null);
  const [expandedClimber, setExpandedClimber] = useState<number | null>(null);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    nationality: "",
    passportNumber: "",
    dateOfBirth: "",
    dietaryRequirements: "",
    medicalConditions: "",
    subscribeNewsletter: false,
  });

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `/api/manage-climbers/${bookingRef}?email=${encodeURIComponent(email)}`
      );
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to verify email");
        return;
      }

      setBooking(data.data);
      setStep("manage");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const refreshBooking = async () => {
    if (!email) return;
    try {
      const response = await fetch(
        `/api/manage-climbers/${bookingRef}?email=${encodeURIComponent(email)}`
      );
      const data = await response.json();
      if (response.ok) {
        setBooking(data.data);
      }
    } catch (e) {
      console.error("Failed to refresh booking:", e);
    }
  };

  const handleCopyLink = async (token: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;
    const url = `${baseUrl}/complete-details/${token}`;
    await navigator.clipboard.writeText(url);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const handleStartEdit = (climber: ClimberData) => {
    setEditingClimber(climber.index);
    setFormData({
      name: (climber.details?.name as string) || climber.name || "",
      email: (climber.details?.email as string) || climber.email || "",
      phone: (climber.details?.phone as string) || "",
      nationality: (climber.details?.nationality as string) || "",
      passportNumber: (climber.details?.passportNumber as string) || "",
      dateOfBirth: (climber.details?.dateOfBirth as string) || "",
      dietaryRequirements: (climber.details?.dietaryRequirements as string) || "",
      medicalConditions: (climber.details?.medicalConditions as string) || "",
      subscribeNewsletter: false,
    });
  };

  const handleSaveClimber = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingClimber === null) return;
    setError("");
    setSubmitting(true);

    try {
      const response = await fetch(`/api/manage-climbers/${bookingRef}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          climberIndex: editingClimber,
          details: formData,
          leadEmail: email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to save details");
        return;
      }

      // Refresh booking data
      await refreshBooking();
      setEditingClimber(null);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Verification step
  if (step === "verify") {
    return (
      <div className="min-h-screen bg-[var(--surface)] py-12 px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-[var(--primary)]" />
            </div>
            <h1 className="font-heading text-2xl font-bold text-[var(--text)] mb-2">
              Manage Your Group
            </h1>
            <p className="text-[var(--text-muted)]">
              Booking Reference: <span className="font-mono font-bold">{bookingRef}</span>
            </p>
          </div>

          <form onSubmit={handleVerify} className="bg-white rounded-xl shadow-sm border border-[var(--border)] p-6">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium text-[var(--text)] mb-1">
                Enter your email to verify
              </label>
              <p className="text-xs text-[var(--text-muted)] mb-2">
                Use the email address you booked with
              </p>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none"
                placeholder="your@email.com"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-6 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white font-medium rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Access My Booking"
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Management step
  if (!booking) return null;

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";

  return (
    <div className="min-h-screen bg-[var(--surface)] py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="font-heading text-2xl font-bold text-[var(--text)] mb-1">
            Manage Your Group
          </h1>
          <p className="text-[var(--text-muted)]">
            Fill in details for your group or share individual links
          </p>
        </div>

        {/* Booking Summary */}
        <div className="bg-white rounded-xl shadow-sm border border-[var(--border)] p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[var(--primary)]/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Mountain className="w-6 h-6 text-[var(--primary)]" />
            </div>
            <div className="flex-1">
              <h2 className="font-heading text-lg font-bold text-[var(--text)]">
                {booking.route.name}
              </h2>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[var(--text-muted)] mt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {format(new Date(booking.departure.arrivalDate), "MMM d")} -{" "}
                  {format(new Date(booking.departure.endDate), "MMM d, yyyy")}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {booking.totalClimbers} climbers
                </span>
              </div>
              <div className="mt-3">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-[var(--text-muted)]">Progress:</span>
                  <div className="flex-1 h-2 bg-[var(--surface)] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 transition-all"
                      style={{
                        width: `${(booking.completedCount / booking.totalClimbers) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="font-medium">
                    {booking.completedCount}/{booking.totalClimbers}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            {error}
          </div>
        )}

        {/* Climber List */}
        <div className="space-y-4">
          {booking.climbers.map((climber) => (
            <div
              key={climber.index}
              className="bg-white rounded-xl shadow-sm border border-[var(--border)] overflow-hidden"
            >
              {/* Climber Header */}
              <div
                className={`p-4 flex items-center justify-between cursor-pointer hover:bg-[var(--surface)] transition-colors ${
                  editingClimber === climber.index ? "bg-[var(--surface)]" : ""
                }`}
                onClick={() =>
                  setExpandedClimber(expandedClimber === climber.index ? null : climber.index)
                }
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      climber.isComplete
                        ? "bg-green-100 text-green-600"
                        : "bg-amber-100 text-amber-600"
                    }`}
                  >
                    {climber.isComplete ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <span className="font-bold">{climber.index + 1}</span>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-[var(--text)]">
                      {climber.name || `Climber ${climber.index + 1}`}
                      {climber.isLead && (
                        <span className="ml-2 text-xs bg-[var(--primary)]/10 text-[var(--primary)] px-2 py-0.5 rounded-full">
                          Lead
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-[var(--text-muted)]">
                      {climber.isComplete ? "Details complete" : "Pending details"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!climber.isComplete && climber.token && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyLink(climber.token!.code);
                      }}
                      className="flex items-center gap-1 px-3 py-1.5 text-sm text-[var(--primary)] hover:bg-[var(--primary)]/10 rounded-lg transition-colors"
                    >
                      {copiedToken === climber.token.code ? (
                        <>
                          <Check className="w-4 h-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy Link
                        </>
                      )}
                    </button>
                  )}
                  {expandedClimber === climber.index ? (
                    <ChevronUp className="w-5 h-5 text-[var(--text-muted)]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[var(--text-muted)]" />
                  )}
                </div>
              </div>

              {/* Expanded Content */}
              {expandedClimber === climber.index && editingClimber !== climber.index && (
                <div className="px-4 pb-4 border-t border-[var(--border)]">
                  {climber.isComplete && climber.details ? (
                    <div className="pt-4 grid sm:grid-cols-2 gap-3 text-sm">
                      {climber.details.name && (
                        <div>
                          <span className="text-[var(--text-muted)]">Name:</span>
                          <span className="ml-2 text-[var(--text)]">{climber.details.name}</span>
                        </div>
                      )}
                      {climber.details.email && (
                        <div>
                          <span className="text-[var(--text-muted)]">Email:</span>
                          <span className="ml-2 text-[var(--text)]">{climber.details.email}</span>
                        </div>
                      )}
                      {climber.details.nationality && (
                        <div>
                          <span className="text-[var(--text-muted)]">Nationality:</span>
                          <span className="ml-2 text-[var(--text)]">{climber.details.nationality}</span>
                        </div>
                      )}
                      {climber.details.dietaryRequirements && (
                        <div>
                          <span className="text-[var(--text-muted)]">Dietary:</span>
                          <span className="ml-2 text-[var(--text)]">{climber.details.dietaryRequirements}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="pt-4">
                      <p className="text-sm text-[var(--text-muted)] mb-3">
                        {climber.token
                          ? "Share the link or fill in details yourself:"
                          : "Fill in this climber's details:"}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => handleStartEdit(climber)}
                          className="flex items-center gap-2 px-4 py-2 bg-[var(--secondary)] text-white rounded-lg text-sm font-medium hover:bg-[var(--secondary-dark)] transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                          Fill Details
                        </button>
                        {climber.token && (
                          <>
                            <button
                              onClick={() => handleCopyLink(climber.token!.code)}
                              className="flex items-center gap-2 px-4 py-2 border border-[var(--border)] text-[var(--text)] rounded-lg text-sm font-medium hover:bg-[var(--surface)] transition-colors"
                            >
                              <Copy className="w-4 h-4" />
                              {copiedToken === climber.token.code ? "Copied!" : "Copy Link"}
                            </button>
                            <a
                              href={`${baseUrl}/complete-details/${climber.token.code}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-4 py-2 border border-[var(--border)] text-[var(--text)] rounded-lg text-sm font-medium hover:bg-[var(--surface)] transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                              Open Link
                            </a>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Edit Form */}
              {editingClimber === climber.index && (
                <div className="px-4 pb-4 border-t border-[var(--border)]">
                  <form onSubmit={handleSaveClimber} className="pt-4 space-y-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-[var(--text)]">
                        Edit Details for Climber {climber.index + 1}
                      </h4>
                      <button
                        type="button"
                        onClick={() => setEditingClimber(null)}
                        className="p-1 hover:bg-[var(--surface)] rounded-lg"
                      >
                        <X className="w-5 h-5 text-[var(--text-muted)]" />
                      </button>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[var(--text)] mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-3 py-2 border border-[var(--border)] rounded-lg text-sm focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[var(--text)] mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3 py-2 border border-[var(--border)] rounded-lg text-sm focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[var(--text)] mb-1">
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-3 py-2 border border-[var(--border)] rounded-lg text-sm focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[var(--text)] mb-1">
                          Nationality
                        </label>
                        <select
                          value={formData.nationality}
                          onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                          className="w-full px-3 py-2 border border-[var(--border)] rounded-lg text-sm focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none bg-white"
                        >
                          <option value="">Select</option>
                          {COUNTRIES.map((c) => (
                            <option key={c.code} value={c.name}>{c.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[var(--text)] mb-1">
                          Passport Number
                        </label>
                        <input
                          type="text"
                          value={formData.passportNumber}
                          onChange={(e) => setFormData({ ...formData, passportNumber: e.target.value })}
                          className="w-full px-3 py-2 border border-[var(--border)] rounded-lg text-sm focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[var(--text)] mb-1">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                          className="w-full px-3 py-2 border border-[var(--border)] rounded-lg text-sm focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[var(--text)] mb-1">
                          Dietary Requirements
                        </label>
                        <input
                          type="text"
                          value={formData.dietaryRequirements}
                          onChange={(e) => setFormData({ ...formData, dietaryRequirements: e.target.value })}
                          className="w-full px-3 py-2 border border-[var(--border)] rounded-lg text-sm focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none"
                          placeholder="e.g., Vegetarian"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[var(--text)] mb-1">
                          Medical Conditions
                        </label>
                        <input
                          type="text"
                          value={formData.medicalConditions}
                          onChange={(e) => setFormData({ ...formData, medicalConditions: e.target.value })}
                          className="w-full px-3 py-2 border border-[var(--border)] rounded-lg text-sm focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none"
                          placeholder="e.g., Asthma"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`newsletter-${climber.index}`}
                        checked={formData.subscribeNewsletter}
                        onChange={(e) => setFormData({ ...formData, subscribeNewsletter: e.target.checked })}
                        className="w-4 h-4 rounded border-[var(--border)] text-[var(--primary)]"
                      />
                      <label htmlFor={`newsletter-${climber.index}`} className="text-sm text-[var(--text-muted)]">
                        Subscribe to newsletter
                      </label>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setEditingClimber(null)}
                        className="px-4 py-2 text-[var(--text)] hover:bg-[var(--surface)] rounded-lg text-sm font-medium transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="px-4 py-2 bg-[var(--secondary)] text-white rounded-lg text-sm font-medium hover:bg-[var(--secondary-dark)] transition-colors disabled:opacity-50 flex items-center gap-2"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Check className="w-4 h-4" />
                            Save Details
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Help text */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-800 mb-1">Need help?</h4>
          <p className="text-sm text-blue-700">
            You can either fill in the details for each climber yourself, or share their unique links so they can fill in their own information. Contact us if you have any questions.
          </p>
        </div>
      </div>
    </div>
  );
}
