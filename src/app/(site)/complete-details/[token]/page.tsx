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
  Clock,
} from "lucide-react";
import { format } from "date-fns";
import { COUNTRIES } from "@/lib/countries";

interface TokenData {
  climberIndex: number;
  climberName: string | null;
  existingDetails: {
    name: string;
    email: string;
    phone: string;
    nationality: string;
    passportNumber: string;
    dateOfBirth: string;
    dietaryRequirements: string;
    medicalConditions: string;
  };
  booking: {
    leadName: string;
    routeName: string;
    routeSlug: string;
    routeDuration: number;
    departureDate: string;
    summitDate: string | null;
    endDate: string;
    totalClimbers: number;
  };
  expiresAt: string;
}

export default function CompleteDetailsPage() {
  const params = useParams();
  const token = params.token as string;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [tokenData, setTokenData] = useState<TokenData | null>(null);
  const [alreadyCompleted, setAlreadyCompleted] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form state
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

  useEffect(() => {
    fetchTokenData();
  }, [token]);

  const fetchTokenData = async () => {
    try {
      const response = await fetch(`/api/climber-details/${token}`);
      const data = await response.json();

      if (!response.ok) {
        if (data.alreadyCompleted) {
          setAlreadyCompleted(true);
        } else {
          setError(data.error || "Invalid or expired link");
        }
        return;
      }

      setTokenData(data.data);
      // Pre-fill form with existing data
      setFormData({
        name: data.data.existingDetails.name || "",
        email: data.data.existingDetails.email || "",
        phone: data.data.existingDetails.phone || "",
        nationality: data.data.existingDetails.nationality || "",
        passportNumber: data.data.existingDetails.passportNumber || "",
        dateOfBirth: data.data.existingDetails.dateOfBirth || "",
        dietaryRequirements: data.data.existingDetails.dietaryRequirements || "",
        medicalConditions: data.data.existingDetails.medicalConditions || "",
        subscribeNewsletter: false,
      });
    } catch {
      setError("Failed to load details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const response = await fetch(`/api/climber-details/${token}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to submit details");
        return;
      }

      setSuccess(true);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--surface)] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--primary)]" />
      </div>
    );
  }

  // Already completed state
  if (alreadyCompleted) {
    return (
      <div className="min-h-screen bg-[var(--surface)] py-12 px-4">
        <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-sm border border-[var(--border)] p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-[var(--text)] mb-2">
            Already Submitted
          </h1>
          <p className="text-[var(--text-muted)] mb-6">
            Your details have already been submitted for this trek. If you need to make changes, please contact the team.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-[var(--primary)] text-white rounded-lg font-medium hover:bg-[var(--primary-dark)] transition-colors"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !tokenData) {
    return (
      <div className="min-h-screen bg-[var(--surface)] py-12 px-4">
        <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-sm border border-[var(--border)] p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-[var(--text)] mb-2">
            Link Not Valid
          </h1>
          <p className="text-[var(--text-muted)] mb-6">
            {error}. If you believe this is an error, please contact the booking lead or our support team.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-[var(--primary)] text-white rounded-lg font-medium hover:bg-[var(--primary-dark)] transition-colors"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    );
  }

  // Success state
  if (success) {
    return (
      <div className="min-h-screen bg-[var(--surface)] py-12 px-4">
        <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-sm border border-[var(--border)] p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-[var(--text)] mb-2">
            Details Submitted!
          </h1>
          <p className="text-[var(--text-muted)] mb-6">
            Thank you, {formData.name}! Your details have been saved. We can&apos;t wait to see you on the mountain!
          </p>

          <div className="bg-[var(--surface)] rounded-lg p-4 mb-6 text-left">
            <h3 className="font-medium text-[var(--text)] mb-2">Your Trek</h3>
            <p className="text-sm text-[var(--text-muted)]">
              <strong>{tokenData?.booking.routeName}</strong>
              <br />
              {tokenData?.booking.departureDate && format(new Date(tokenData.booking.departureDate), "MMMM d, yyyy")}
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-left">
            <h4 className="font-medium text-amber-800 mb-1">What&apos;s Next?</h4>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>You&apos;ll receive a packing list and preparation guide</li>
              <li>Final trip details will be sent 2 weeks before departure</li>
              <li>Questions? Contact us anytime</li>
            </ul>
          </div>

          <Link
            href={`/kilimanjaro-trekking/${tokenData?.booking.routeSlug}/`}
            className="inline-block mt-6 px-6 py-3 bg-[var(--secondary)] text-white rounded-lg font-medium hover:bg-[var(--secondary-dark)] transition-colors"
          >
            Learn More About Your Route
          </Link>
        </div>
      </div>
    );
  }

  // Main form
  return (
    <div className="min-h-screen bg-[var(--surface)] py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl font-bold text-[var(--text)] mb-2">
            Complete Your Trek Details
          </h1>
          <p className="text-[var(--text-muted)]">
            Fill in your information for the upcoming Kilimanjaro adventure
          </p>
        </div>

        {/* Trek Info Card */}
        {tokenData && (
          <div className="bg-white rounded-xl shadow-sm border border-[var(--border)] p-6 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[var(--primary)]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Mountain className="w-6 h-6 text-[var(--primary)]" />
              </div>
              <div className="flex-1">
                <h2 className="font-heading text-lg font-bold text-[var(--text)] mb-1">
                  {tokenData.booking.routeName}
                </h2>
                <p className="text-sm text-[var(--text-muted)] mb-3">
                  Booked by {tokenData.booking.leadName}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[var(--text-light)]" />
                    <span>{format(new Date(tokenData.booking.departureDate), "MMM d, yyyy")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[var(--text-light)]" />
                    <span>{tokenData.booking.routeDuration} days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[var(--text-light)]" />
                    <span>{tokenData.booking.totalClimbers} climbers</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-[var(--border)] p-6">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              {error}
            </div>
          )}

          <div className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="font-heading font-semibold text-[var(--text)] mb-4">
                Personal Information
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--text)] mb-1">
                    Full Name (as on passport) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text)] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text)] mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none"
                    placeholder="+1 234 567 8900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text)] mb-1">
                    Nationality
                  </label>
                  <select
                    value={formData.nationality}
                    onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                    className="w-full px-4 py-2.5 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none bg-white"
                  >
                    <option value="">Select country</option>
                    {COUNTRIES.map((country) => (
                      <option key={country.code} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Travel Documents */}
            <div>
              <h3 className="font-heading font-semibold text-[var(--text)] mb-4">
                Travel Documents
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--text)] mb-1">
                    Passport Number
                  </label>
                  <input
                    type="text"
                    value={formData.passportNumber}
                    onChange={(e) => setFormData({ ...formData, passportNumber: e.target.value })}
                    className="w-full px-4 py-2.5 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none"
                    placeholder="AB1234567"
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
                    className="w-full px-4 py-2.5 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Health & Dietary */}
            <div>
              <h3 className="font-heading font-semibold text-[var(--text)] mb-4">
                Health & Dietary Information
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--text)] mb-1">
                    Dietary Requirements
                  </label>
                  <input
                    type="text"
                    value={formData.dietaryRequirements}
                    onChange={(e) => setFormData({ ...formData, dietaryRequirements: e.target.value })}
                    className="w-full px-4 py-2.5 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none"
                    placeholder="e.g., Vegetarian, Vegan, Halal, Gluten-free"
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
                    className="w-full px-4 py-2.5 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none"
                    placeholder="e.g., Asthma, Allergies, Diabetes"
                  />
                </div>
              </div>
              <p className="text-xs text-[var(--text-muted)] mt-2">
                This information helps us ensure your safety and comfort during the trek.
              </p>
            </div>

            {/* Newsletter */}
            <div className="border-t border-[var(--border)] pt-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.subscribeNewsletter}
                  onChange={(e) => setFormData({ ...formData, subscribeNewsletter: e.target.checked })}
                  className="w-4 h-4 rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)]"
                />
                <span className="text-sm text-[var(--text-muted)]">
                  Subscribe to our newsletter for travel tips, exclusive offers, and adventure inspiration
                </span>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 px-6 bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-white font-heading font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Check className="w-5 h-5" />
                  Submit My Details
                </>
              )}
            </button>

            <p className="text-xs text-center text-[var(--text-muted)]">
              Your information is securely stored and only used for trip preparation.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
