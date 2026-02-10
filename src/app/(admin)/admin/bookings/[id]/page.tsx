"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Globe,
  Calendar,
  Users,
  DollarSign,
  Mountain,
  Save,
  Loader2,
  AlertCircle,
  Check,
  X,
  Trash2,
  Copy,
  Send,
  ExternalLink,
  RefreshCw,
} from "lucide-react";
import { BookingStatusBadge } from "@/components/admin/bookings/BookingStatusBadge";
import { PaymentStatus } from "@/components/admin/bookings/PaymentStatus";
import { BookingStatus } from "@prisma/client";

interface Booking {
  id: string;
  leadName: string;
  leadEmail: string;
  leadPhone: string | null;
  leadNationality: string | null;
  totalClimbers: number;
  climberDetails: unknown;
  pricePerPerson: string;
  totalPrice: string;
  depositAmount: string | null;
  depositPaid: boolean;
  depositPaidAt: string | null;
  balancePaid: boolean;
  balancePaidAt: string | null;
  status: BookingStatus;
  notes: string | null;
  source: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  createdAt: string;
  confirmedAt: string | null;
  cancelledAt: string | null;
  departure: {
    id: string;
    arrivalDate: string;
    startDate: string;
    endDate: string;
    route: {
      id: string;
      title: string;
      slug: string;
      duration: string;
    };
  };
}

interface ClimberTokenData {
  index: number;
  isLead: boolean;
  name: string | null;
  email: string | null;
  isComplete: boolean;
  token: {
    id: string;
    code: string;
    expiresAt: string;
    isCompleted: boolean;
  } | null;
}

const BOOKING_STATUSES: { value: BookingStatus; label: string }[] = [
  { value: "INQUIRY", label: "Inquiry" },
  { value: "PENDING", label: "Pending Deposit" },
  { value: "DEPOSIT_PAID", label: "Deposit Paid" },
  { value: "CONFIRMED", label: "Confirmed (Fully Paid)" },
  { value: "CANCELLED", label: "Cancelled" },
  { value: "REFUNDED", label: "Refunded" },
  { value: "NO_SHOW", label: "No Show" },
  { value: "COMPLETED", label: "Completed" },
];

export default function BookingDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    leadName: "",
    leadEmail: "",
    leadPhone: "",
    leadNationality: "",
    totalClimbers: 1,
    pricePerPerson: 0,
    depositAmount: 0,
    depositPaid: false,
    balancePaid: false,
    status: "INQUIRY" as BookingStatus,
    notes: "",
  });

  // Climber tokens state
  const [climberTokens, setClimberTokens] = useState<ClimberTokenData[]>([]);
  const [climberTokensLoading, setClimberTokensLoading] = useState(false);
  const [climberEmails, setClimberEmails] = useState<Record<number, string>>({});
  const [sendingEmail, setSendingEmail] = useState<number | null>(null);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  useEffect(() => {
    fetchBooking();
    fetchClimberTokens();
  }, [id]);

  const fetchBooking = async () => {
    try {
      const response = await fetch(`/api/admin/bookings/${id}`);
      if (!response.ok) throw new Error("Failed to fetch booking");
      const data = await response.json();
      setBooking(data);
      setFormData({
        leadName: data.leadName,
        leadEmail: data.leadEmail,
        leadPhone: data.leadPhone || "",
        leadNationality: data.leadNationality || "",
        totalClimbers: data.totalClimbers,
        pricePerPerson: Number(data.pricePerPerson),
        depositAmount: data.depositAmount ? Number(data.depositAmount) : 0,
        depositPaid: data.depositPaid,
        balancePaid: data.balancePaid,
        status: data.status,
        notes: data.notes || "",
      });
    } catch {
      setError("Failed to load booking");
    } finally {
      setLoading(false);
    }
  };

  const fetchClimberTokens = async () => {
    setClimberTokensLoading(true);
    try {
      const response = await fetch(`/api/admin/bookings/${id}/climber-tokens`);
      if (response.ok) {
        const data = await response.json();
        setClimberTokens(data.climbers || []);
        // Pre-fill email inputs
        const emails: Record<number, string> = {};
        data.climbers?.forEach((c: ClimberTokenData) => {
          if (c.email) emails[c.index] = c.email;
        });
        setClimberEmails(emails);
      }
    } catch (e) {
      console.error("Failed to fetch climber tokens:", e);
    } finally {
      setClimberTokensLoading(false);
    }
  };

  const handleGenerateTokens = async () => {
    try {
      const response = await fetch(`/api/admin/bookings/${id}/climber-tokens`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "generate" }),
      });
      if (response.ok) {
        fetchClimberTokens();
        setSuccess("Climber tokens generated");
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (e) {
      setError("Failed to generate tokens");
    }
  };

  const handleSendLink = async (climberIndex: number) => {
    const email = climberEmails[climberIndex];
    if (!email) {
      setError("Please enter an email address");
      return;
    }
    setSendingEmail(climberIndex);
    try {
      const response = await fetch(`/api/admin/bookings/${id}/climber-tokens`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "resend", climberIndex, email }),
      });
      if (response.ok) {
        setSuccess(`Email sent to ${email}`);
        setTimeout(() => setSuccess(""), 3000);
        fetchClimberTokens();
      } else {
        setError("Failed to send email");
      }
    } catch {
      setError("Failed to send email");
    } finally {
      setSendingEmail(null);
    }
  };

  const handleSendAllLinks = async () => {
    const emails = Object.entries(climberEmails)
      .filter(([_, email]) => email)
      .map(([index, email]) => ({ climberIndex: parseInt(index), email }));

    if (emails.length === 0) {
      setError("No emails to send");
      return;
    }

    try {
      const response = await fetch(`/api/admin/bookings/${id}/climber-tokens`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "send_all", emails }),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess(`Sent ${data.emailsSent} emails`);
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch {
      setError("Failed to send emails");
    }
  };

  const handleSendToLead = async () => {
    try {
      const response = await fetch(`/api/admin/bookings/${id}/climber-tokens`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "send_to_lead" }),
      });
      if (response.ok) {
        setSuccess("Email sent to lead climber");
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch {
      setError("Failed to send email to lead");
    }
  };

  const handleCopyLink = async (code: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;
    await navigator.clipboard.writeText(`${baseUrl}/complete-details/${code}`);
    setCopiedToken(code);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const totalPrice = formData.pricePerPerson * formData.totalClimbers;

      const response = await fetch(`/api/admin/bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          totalPrice,
        }),
      });

      if (!response.ok) throw new Error("Failed to update booking");

      const updated = await response.json();
      setBooking(updated);
      setSuccess("Booking updated successfully");
      setTimeout(() => setSuccess(""), 3000);
    } catch {
      setError("Failed to update booking");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this booking? This action cannot be undone.")) {
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(`/api/admin/bookings/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete booking");

      router.push("/admin/bookings");
    } catch {
      setError("Failed to delete booking");
      setSaving(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-slate-900">Booking not found</h2>
        <Link href="/admin/bookings" className="text-amber-600 hover:underline mt-2 inline-block">
          Back to bookings
        </Link>
      </div>
    );
  }

  const totalPrice = formData.pricePerPerson * formData.totalClimbers;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/bookings"
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Booking Details
            </h1>
            <p className="text-slate-600 mt-1">
              {booking.departure.route.title} - {formatDate(booking.departure.arrivalDate)}
            </p>
          </div>
        </div>
        <BookingStatusBadge status={booking.status} />
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-50 text-green-700 rounded-lg flex items-center gap-2">
          <Check className="w-5 h-5" />
          {success}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Info */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
            <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <User className="w-5 h-5 text-slate-400" />
              Customer Information
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.leadName}
                  onChange={(e) => setFormData({ ...formData, leadName: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.leadEmail}
                  onChange={(e) => setFormData({ ...formData, leadEmail: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Phone
                </label>
                <input
                  type="text"
                  value={formData.leadPhone}
                  onChange={(e) => setFormData({ ...formData, leadPhone: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Nationality
                </label>
                <input
                  type="text"
                  value={formData.leadNationality}
                  onChange={(e) => setFormData({ ...formData, leadNationality: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Booking Details */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
            <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-slate-400" />
              Booking Details
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Number of Climbers
                </label>
                <input
                  type="number"
                  value={formData.totalClimbers}
                  onChange={(e) => setFormData({ ...formData, totalClimbers: Number(e.target.value) })}
                  min="1"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Price Per Person (USD)
                </label>
                <input
                  type="number"
                  value={formData.pricePerPerson}
                  onChange={(e) => setFormData({ ...formData, pricePerPerson: Number(e.target.value) })}
                  min="0"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Deposit Amount (USD)
                </label>
                <input
                  type="number"
                  value={formData.depositAmount}
                  onChange={(e) => setFormData({ ...formData, depositAmount: Number(e.target.value) })}
                  min="0"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Total Price
                </label>
                <div className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-900">
                  ${totalPrice.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Status & Payment */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
            <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-slate-400" />
              Status & Payment
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Booking Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as BookingStatus })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                >
                  {BOOKING_STATUSES.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.depositPaid}
                    onChange={(e) => setFormData({ ...formData, depositPaid: e.target.checked })}
                    className="w-4 h-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                  />
                  <span className="text-sm text-slate-700">Deposit Paid</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.balancePaid}
                    onChange={(e) => setFormData({ ...formData, balancePaid: e.target.checked })}
                    className="w-4 h-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                  />
                  <span className="text-sm text-slate-700">Balance Paid</span>
                </label>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">Notes</h2>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={4}
              placeholder="Internal notes about this booking..."
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none resize-none"
            />
          </div>

          {/* Climber Details Status */}
          {formData.totalClimbers > 1 && (
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-slate-400" />
                  Climber Details Status
                </h2>
                <button
                  onClick={fetchClimberTokens}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  title="Refresh"
                >
                  <RefreshCw className={`w-4 h-4 text-slate-500 ${climberTokensLoading ? "animate-spin" : ""}`} />
                </button>
              </div>

              {/* Progress bar */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 transition-all"
                    style={{
                      width: `${(climberTokens.filter((c) => c.isComplete).length / formData.totalClimbers) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-sm font-medium text-slate-600">
                  {climberTokens.filter((c) => c.isComplete).length}/{formData.totalClimbers} complete
                </span>
              </div>

              {/* Climber list */}
              <div className="space-y-3">
                {climberTokens.map((climber) => (
                  <div
                    key={climber.index}
                    className={`border rounded-lg p-3 ${
                      climber.isComplete ? "border-green-200 bg-green-50" : "border-slate-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {climber.isComplete ? (
                          <Check className="w-5 h-5 text-green-600" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
                        )}
                        <span className="font-medium text-slate-800">
                          {climber.name || `Climber ${climber.index + 1}`}
                          {climber.isLead && (
                            <span className="ml-2 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                              Lead
                            </span>
                          )}
                        </span>
                      </div>
                      <span className={`text-sm ${climber.isComplete ? "text-green-600" : "text-slate-500"}`}>
                        {climber.isComplete ? "Complete" : "Pending"}
                      </span>
                    </div>

                    {/* Actions for non-lead, non-complete climbers */}
                    {!climber.isLead && !climber.isComplete && climber.token && (
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <input
                          type="email"
                          value={climberEmails[climber.index] || ""}
                          onChange={(e) =>
                            setClimberEmails({ ...climberEmails, [climber.index]: e.target.value })
                          }
                          placeholder="Email address"
                          className="flex-1 min-w-[200px] px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                        />
                        <button
                          onClick={() => handleSendLink(climber.index)}
                          disabled={sendingEmail === climber.index}
                          className="flex items-center gap-1 px-3 py-1.5 text-sm bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors disabled:opacity-50"
                        >
                          {sendingEmail === climber.index ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Send className="w-4 h-4" />
                          )}
                          Send Link
                        </button>
                        <button
                          onClick={() => handleCopyLink(climber.token!.code)}
                          className="flex items-center gap-1 px-3 py-1.5 text-sm border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                          {copiedToken === climber.token.code ? (
                            <>
                              <Check className="w-4 h-4 text-green-600" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              Copy
                            </>
                          )}
                        </button>
                      </div>
                    )}

                    {/* Show that token needs to be generated */}
                    {!climber.isLead && !climber.isComplete && !climber.token && (
                      <p className="mt-2 text-sm text-slate-500">
                        Token not generated. Generate tokens to enable link sharing.
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Bulk actions */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200">
                {!formData.depositPaid && (
                  <p className="text-sm text-amber-600 w-full">
                    Note: Climber tokens are automatically generated when deposit is marked as paid.
                  </p>
                )}
                {climberTokens.some((c) => !c.token && !c.isLead && !c.isComplete) && (
                  <button
                    onClick={handleGenerateTokens}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm"
                  >
                    Generate Missing Tokens
                  </button>
                )}
                <button
                  onClick={handleSendAllLinks}
                  className="flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors text-sm"
                >
                  <Send className="w-4 h-4" />
                  Send All Pending Links
                </button>
                <button
                  onClick={handleSendToLead}
                  className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-sm"
                >
                  <Mail className="w-4 h-4" />
                  Send Summary to Lead
                </button>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-between">
            <button
              onClick={handleDelete}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4" />
              Delete Booking
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Save Changes
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Departure Info */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Mountain className="w-5 h-5 text-slate-400" />
              Departure
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-slate-500">Route</p>
                <p className="font-medium text-slate-900">
                  {booking.departure.route.title}
                </p>
              </div>
              <div>
                <p className="text-slate-500">Duration</p>
                <p className="font-medium text-slate-900">
                  {booking.departure.route.duration}
                </p>
              </div>
              <div>
                <p className="text-slate-500">Arrival</p>
                <p className="font-medium text-slate-900">
                  {formatDate(booking.departure.arrivalDate)}
                </p>
              </div>
              <div>
                <p className="text-slate-500">Trek Dates</p>
                <p className="font-medium text-slate-900">
                  {new Date(booking.departure.startDate).toLocaleDateString()} - {new Date(booking.departure.endDate).toLocaleDateString()}
                </p>
              </div>
              <Link
                href={`/admin/departures/${booking.departure.id}`}
                className="text-amber-600 hover:underline text-sm"
              >
                View Departure →
              </Link>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-slate-400" />
              Payment
            </h3>
            <PaymentStatus
              depositPaid={formData.depositPaid}
              balancePaid={formData.balancePaid}
              depositAmount={formData.depositAmount}
              totalPrice={totalPrice}
            />
          </div>

          {/* Metadata */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Metadata</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-slate-500">Source</p>
                <p className="font-medium text-slate-900">
                  {booking.source || "Unknown"}
                </p>
              </div>
              <div>
                <p className="text-slate-500">Created</p>
                <p className="font-medium text-slate-900">
                  {new Date(booking.createdAt).toLocaleString()}
                </p>
              </div>
              {booking.confirmedAt && (
                <div>
                  <p className="text-slate-500">Confirmed</p>
                  <p className="font-medium text-slate-900">
                    {new Date(booking.confirmedAt).toLocaleString()}
                  </p>
                </div>
              )}
              {booking.utmSource && (
                <div>
                  <p className="text-slate-500">UTM Source</p>
                  <p className="font-medium text-slate-900">
                    {booking.utmSource}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
