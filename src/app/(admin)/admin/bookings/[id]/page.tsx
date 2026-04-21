"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Calendar,
  Users,
  DollarSign,
  Mountain,
  Save,
  Loader2,
  AlertCircle,
  AlertTriangle,
  Check,
  CheckCircle2,
  XCircle,
  Clock,
  Trash2,
  Copy,
  Send,
  RefreshCw,
  MessageCircle,
  Handshake,
  FileText,
  Receipt,
  History,
  Printer,
} from "lucide-react";
import { BookingStatusBadge } from "@/components/admin/bookings/BookingStatusBadge";
import { PaymentStatus } from "@/components/admin/bookings/PaymentStatus";
import { BookingStatus, EmailStatus } from "@prisma/client";

interface ClimberDetail {
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

interface Booking {
  id: string;
  leadName: string;
  leadEmail: string;
  leadPhone: string | null;
  leadNationality: string | null;
  totalClimbers: number;
  climberDetails: ClimberDetail[] | null;
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
  ipAddress: string | null;
  country: string | null;
  countryCode: string | null;
  city: string | null;
  region: string | null;
  device: string | null;
  browser: string | null;
  referrerUrl: string | null;
  landingPage: string | null;
  createdAt: string;
  updatedAt: string;
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
  commission: {
    id: string;
    commissionAmount: string;
    commissionRate: string;
    bookingAmount: string;
    currency: string;
    status: string;
    paidAt: string | null;
    partner: {
      id: string;
      name: string;
      contactEmail: string | null;
    };
  } | null;
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

interface EmailLogEntry {
  id: string;
  recipient: string;
  subject: string;
  type: string;
  status: EmailStatus;
  error: string | null;
  sentAt: string | null;
  createdAt: string;
}

interface RelatedBooking {
  id: string;
  status: BookingStatus;
  totalPrice: string;
  totalClimbers: number;
  depositPaid: boolean;
  balancePaid: boolean;
  createdAt: string;
  departure: {
    arrivalDate: string;
    route: { title: string };
  };
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

const DESTRUCTIVE_STATUSES: BookingStatus[] = ["CANCELLED", "REFUNDED", "NO_SHOW"];

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
  const [initialFormData, setInitialFormData] = useState(formData);

  // Climber tokens state
  const [climberTokens, setClimberTokens] = useState<ClimberTokenData[]>([]);
  const [climberTokensLoading, setClimberTokensLoading] = useState(false);
  const [climberEmails, setClimberEmails] = useState<Record<number, string>>({});
  const [sendingEmail, setSendingEmail] = useState<number | null>(null);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Email history
  const [emailLogs, setEmailLogs] = useState<EmailLogEntry[]>([]);
  const [emailLogsLoading, setEmailLogsLoading] = useState(false);
  const [sendingAction, setSendingAction] = useState<string | null>(null);

  // Status update dialog
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  // Related bookings
  const [relatedBookings, setRelatedBookings] = useState<RelatedBooking[]>([]);

  // Climber details editor
  const [climberEdits, setClimberEdits] = useState<ClimberDetail[]>([]);
  const [initialClimberEdits, setInitialClimberEdits] = useState<ClimberDetail[]>([]);
  const [savingClimbers, setSavingClimbers] = useState(false);

  useEffect(() => {
    fetchBooking();
    fetchClimberTokens();
    fetchEmailLogs();
    fetchRelatedBookings();
  }, [id]);

  const fetchBooking = async () => {
    try {
      const response = await fetch(`/api/admin/bookings/${id}`);
      if (!response.ok) throw new Error("Failed to fetch booking");
      const data = await response.json();
      setBooking(data);
      const next = {
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
      };
      setFormData(next);
      setInitialFormData(next);

      const details = (data.climberDetails as ClimberDetail[] | null) || [];
      const padded: ClimberDetail[] = [];
      for (let i = 0; i < data.totalClimbers; i++) {
        padded.push(details[i] || {});
      }
      setClimberEdits(padded);
      setInitialClimberEdits(padded);
    } catch {
      setError("Failed to load booking");
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedBookings = async () => {
    try {
      const response = await fetch(`/api/admin/bookings/${id}/related`);
      if (response.ok) {
        const data = await response.json();
        setRelatedBookings(data.bookings || []);
      }
    } catch (e) {
      console.error("Failed to fetch related bookings:", e);
    }
  };

  const handleSaveClimberDetails = async () => {
    setSavingClimbers(true);
    setError("");
    try {
      const response = await fetch(`/api/admin/bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ climberDetails: climberEdits }),
      });
      if (!response.ok) throw new Error("Save failed");
      const updated = await response.json();
      setBooking(updated);
      setInitialClimberEdits(climberEdits);
      setSuccess("Climber details saved");
      setTimeout(() => setSuccess(""), 3000);
      fetchClimberTokens();
    } catch {
      setError("Failed to save climber details");
    } finally {
      setSavingClimbers(false);
    }
  };

  const updateClimberField = (
    index: number,
    field: keyof ClimberDetail,
    value: string | boolean
  ) => {
    setClimberEdits((prev) => {
      const next = prev.slice();
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const fetchClimberTokens = async () => {
    setClimberTokensLoading(true);
    try {
      const response = await fetch(`/api/admin/bookings/${id}/climber-tokens`);
      if (response.ok) {
        const data = await response.json();
        setClimberTokens(data.climbers || []);
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

  const fetchEmailLogs = async () => {
    setEmailLogsLoading(true);
    try {
      const response = await fetch(`/api/admin/bookings/${id}/emails`);
      if (response.ok) {
        const data = await response.json();
        setEmailLogs(data.logs || []);
      }
    } catch (e) {
      console.error("Failed to fetch email logs:", e);
    } finally {
      setEmailLogsLoading(false);
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
    } catch {
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
        fetchEmailLogs();
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
      .filter(([, email]) => email)
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
        fetchEmailLogs();
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
        fetchEmailLogs();
      }
    } catch {
      setError("Failed to send email to lead");
    }
  };

  const handleSendBookingEmail = async (
    action: "confirmation" | "deposit_reminder" | "balance_reminder"
  ) => {
    setSendingAction(action);
    setError("");
    try {
      const response = await fetch(`/api/admin/bookings/${id}/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      if (response.ok) {
        const labels = {
          confirmation: "Confirmation email",
          deposit_reminder: "Deposit reminder",
          balance_reminder: "Balance reminder",
        };
        setSuccess(`${labels[action]} sent to ${formData.leadEmail}`);
        setTimeout(() => setSuccess(""), 3000);
        fetchEmailLogs();
      } else {
        const data = await response.json().catch(() => ({}));
        setError(data.error || "Failed to send email");
      }
    } catch {
      setError("Failed to send email");
    } finally {
      setSendingAction(null);
    }
  };

  const handleSendStatusUpdate = async () => {
    setSendingAction("status_update");
    setError("");
    try {
      const response = await fetch(`/api/admin/bookings/${id}/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "status_update",
          message: statusMessage,
          previousStatus: initialFormData.status,
        }),
      });
      if (response.ok) {
        setSuccess(`Status update sent to ${formData.leadEmail}`);
        setTimeout(() => setSuccess(""), 3000);
        setStatusDialogOpen(false);
        setStatusMessage("");
        fetchEmailLogs();
      } else {
        const data = await response.json().catch(() => ({}));
        setError(data.error || "Failed to send email");
      }
    } catch {
      setError("Failed to send email");
    } finally {
      setSendingAction(null);
    }
  };

  const handleCopy = async (text: string, field: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleCopyLink = async (code: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;
    await navigator.clipboard.writeText(`${baseUrl}/complete-details/${code}`);
    setCopiedToken(code);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const isDirty = useMemo(
    () => JSON.stringify(formData) !== JSON.stringify(initialFormData),
    [formData, initialFormData]
  );

  const climbersDirty = useMemo(
    () => JSON.stringify(climberEdits) !== JSON.stringify(initialClimberEdits),
    [climberEdits, initialClimberEdits]
  );

  useEffect(() => {
    if (!isDirty) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty]);

  const handleSave = useCallback(async () => {
    if (!isDirty) return;

    const becomingDestructive =
      DESTRUCTIVE_STATUSES.includes(formData.status) &&
      formData.status !== initialFormData.status;

    if (becomingDestructive) {
      const ok = confirm(
        `Change status to ${formData.status}? This will stamp a cancellation timestamp and may affect commission tracking.`
      );
      if (!ok) return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const totalPrice = formData.pricePerPerson * formData.totalClimbers;

      const response = await fetch(`/api/admin/bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, totalPrice }),
      });

      if (!response.ok) throw new Error("Failed to update booking");

      const updated = await response.json();
      setBooking(updated);
      setInitialFormData(formData);
      setSuccess("Booking updated successfully");
      setTimeout(() => setSuccess(""), 3000);
      fetchEmailLogs();
    } catch {
      setError("Failed to update booking");
    } finally {
      setSaving(false);
    }
  }, [formData, initialFormData, id, isDirty]);

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

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
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
  const balanceDue = Math.max(0, totalPrice - formData.depositAmount);

  const daysUntilDeparture = Math.ceil(
    (new Date(booking.departure.arrivalDate).getTime() - Date.now()) /
      (1000 * 60 * 60 * 24)
  );

  const departurePassed = daysUntilDeparture < 0;
  const balanceWarning =
    !formData.balancePaid &&
    !departurePassed &&
    daysUntilDeparture <= 60 &&
    formData.status !== "CANCELLED" &&
    formData.status !== "REFUNDED";

  const bookingRef = booking.id.slice(-8).toUpperCase();
  const waPhone = (formData.leadPhone || "").replace(/[^\d]/g, "");

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-start gap-4">
          <Link
            href="/admin/bookings"
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-bold text-slate-900">Booking Details</h1>
              <button
                onClick={() => handleCopy(bookingRef, "ref")}
                className="text-xs font-mono px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded transition-colors"
                title="Copy reference"
              >
                {copiedField === "ref" ? "Copied!" : `REF: ${bookingRef}`}
              </button>
            </div>
            <p className="text-slate-600 mt-1">
              {booking.departure.route.title} · {formatDate(booking.departure.arrivalDate)}
            </p>
          </div>
        </div>
        <BookingStatusBadge status={booking.status} />
      </div>

      {/* Countdown / balance banner */}
      {balanceWarning && (
        <div className="p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-medium">
              Departure in {daysUntilDeparture} day{daysUntilDeparture === 1 ? "" : "s"} — balance
              of ${balanceDue.toLocaleString()} still outstanding.
            </p>
            <p className="text-sm text-amber-700">
              Send the customer a balance reminder from the Quick Actions below.
            </p>
          </div>
        </div>
      )}

      {departurePassed && formData.status !== "COMPLETED" && formData.status !== "CANCELLED" && (
        <div className="p-4 bg-slate-100 border border-slate-200 text-slate-800 rounded-lg flex items-center gap-3">
          <Clock className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm">
            Departure date has passed. Consider marking this booking as{" "}
            <span className="font-medium">Completed</span> or{" "}
            <span className="font-medium">No Show</span>.
          </p>
        </div>
      )}

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

      {/* Status update dialog */}
      {statusDialogOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
          onClick={() => setStatusDialogOpen(false)}
        >
          <div
            className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-slate-900">
              Send custom status update
            </h3>
            <p className="text-sm text-slate-600">
              Sends an email to <span className="font-medium">{formData.leadEmail}</span>{" "}
              with the current booking status and your note.
            </p>
            <textarea
              value={statusMessage}
              onChange={(e) => setStatusMessage(e.target.value)}
              rows={5}
              placeholder="Optional personal message (appears inside the email)…"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none resize-none text-sm"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setStatusDialogOpen(false)}
                className="px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSendStatusUpdate}
                disabled={sendingAction === "status_update"}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50"
              >
                {sendingAction === "status_update" ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                Send email
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={`mailto:${formData.leadEmail}`}
                className="flex items-center gap-2 px-3 py-2 text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
              >
                <Mail className="w-4 h-4" /> Email
              </a>
              {formData.leadPhone && (
                <>
                  <a
                    href={`tel:${formData.leadPhone}`}
                    className="flex items-center gap-2 px-3 py-2 text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                  >
                    <Phone className="w-4 h-4" /> Call
                  </a>
                  {waPhone.length >= 7 && (
                    <a
                      href={`https://wa.me/${waPhone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 text-sm bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" /> WhatsApp
                    </a>
                  )}
                </>
              )}
              <button
                onClick={() => handleCopy(formData.leadEmail, "email")}
                className="flex items-center gap-2 px-3 py-2 text-sm border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors"
              >
                {copiedField === "email" ? (
                  <>
                    <Check className="w-4 h-4 text-green-600" /> Email copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" /> Copy email
                  </>
                )}
              </button>
              {formData.leadPhone && (
                <button
                  onClick={() => handleCopy(formData.leadPhone, "phone")}
                  className="flex items-center gap-2 px-3 py-2 text-sm border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  {copiedField === "phone" ? (
                    <>
                      <Check className="w-4 h-4 text-green-600" /> Phone copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" /> Copy phone
                    </>
                  )}
                </button>
              )}

              <div className="w-px h-6 bg-slate-200 mx-1" />

              <button
                onClick={() => handleSendBookingEmail("confirmation")}
                disabled={sendingAction === "confirmation"}
                className="flex items-center gap-2 px-3 py-2 text-sm bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-lg transition-colors disabled:opacity-50"
              >
                {sendingAction === "confirmation" ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                Send confirmation
              </button>
              <button
                onClick={() => handleSendBookingEmail("deposit_reminder")}
                disabled={sendingAction === "deposit_reminder" || formData.depositPaid}
                className="flex items-center gap-2 px-3 py-2 text-sm bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-lg transition-colors disabled:opacity-50"
                title={formData.depositPaid ? "Deposit already paid" : undefined}
              >
                {sendingAction === "deposit_reminder" ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                Deposit reminder
              </button>
              <button
                onClick={() => handleSendBookingEmail("balance_reminder")}
                disabled={sendingAction === "balance_reminder" || formData.balancePaid}
                className="flex items-center gap-2 px-3 py-2 text-sm bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-lg transition-colors disabled:opacity-50"
                title={formData.balancePaid ? "Balance already paid" : undefined}
              >
                {sendingAction === "balance_reminder" ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                Balance reminder
              </button>
              <button
                onClick={() => {
                  setStatusMessage("");
                  setStatusDialogOpen(true);
                }}
                className="flex items-center gap-2 px-3 py-2 text-sm bg-sky-100 hover:bg-sky-200 text-sky-800 rounded-lg transition-colors"
              >
                <Send className="w-4 h-4" />
                Custom update
              </button>

              <div className="w-px h-6 bg-slate-200 mx-1" />

              <Link
                href={`/admin/bookings/${id}/invoice`}
                target="_blank"
                className="flex items-center gap-2 px-3 py-2 text-sm border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg transition-colors"
              >
                <Printer className="w-4 h-4" />
                Print invoice
              </Link>
            </div>
          </div>

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
                  onChange={(e) =>
                    setFormData({ ...formData, totalClimbers: Number(e.target.value) })
                  }
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
                  onChange={(e) =>
                    setFormData({ ...formData, pricePerPerson: Number(e.target.value) })
                  }
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
                  onChange={(e) =>
                    setFormData({ ...formData, depositAmount: Number(e.target.value) })
                  }
                  min="0"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                />
                <p className="mt-1 text-xs text-slate-500">
                  Balance due: ${balanceDue.toLocaleString()}
                </p>
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
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value as BookingStatus })
                  }
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                >
                  {BOOKING_STATUSES.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
                {DESTRUCTIVE_STATUSES.includes(formData.status) &&
                  formData.status !== initialFormData.status && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      Saving will stamp a cancellation timestamp.
                    </p>
                  )}
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.depositPaid}
                    onChange={(e) =>
                      setFormData({ ...formData, depositPaid: e.target.checked })
                    }
                    className="w-4 h-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                  />
                  <span className="text-sm text-slate-700">Deposit Paid</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.balancePaid}
                    onChange={(e) =>
                      setFormData({ ...formData, balancePaid: e.target.checked })
                    }
                    className="w-4 h-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                  />
                  <span className="text-sm text-slate-700">Balance Paid</span>
                </label>
              </div>
            </div>
          </div>

          {/* Payment Timeline */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
            <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <History className="w-5 h-5 text-slate-400" />
              Timeline
            </h2>
            <ol className="space-y-3">
              <TimelineStep
                done
                label="Booking created"
                value={formatDateTime(booking.createdAt)}
              />
              <TimelineStep
                done={booking.depositPaid}
                label="Deposit paid"
                value={
                  booking.depositPaidAt
                    ? `${formatDateTime(booking.depositPaidAt)} · $${Number(
                        booking.depositAmount || 0
                      ).toLocaleString()}`
                    : "Pending"
                }
              />
              <TimelineStep
                done={booking.balancePaid}
                label="Balance paid"
                value={
                  booking.balancePaidAt
                    ? `${formatDateTime(booking.balancePaidAt)} · $${balanceDue.toLocaleString()}`
                    : `Pending · $${balanceDue.toLocaleString()} due`
                }
              />
              <TimelineStep
                done={!!booking.confirmedAt}
                label="Booking confirmed"
                value={
                  booking.confirmedAt ? formatDateTime(booking.confirmedAt) : "Not yet confirmed"
                }
              />
              {booking.cancelledAt && (
                <TimelineStep
                  done
                  negative
                  label="Booking cancelled"
                  value={formatDateTime(booking.cancelledAt)}
                />
              )}
            </ol>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
            <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-slate-400" />
              Internal Notes
            </h2>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={4}
              placeholder="Internal notes about this booking..."
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none resize-none"
            />
          </div>

          {/* Climber Details — editable */}
          {formData.totalClimbers > 1 && (
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-slate-400" />
                  Climber Details
                </h2>
                <button
                  onClick={handleSaveClimberDetails}
                  disabled={!climbersDirty || savingClimbers}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {savingClimbers ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Save details
                </button>
              </div>
              <p className="text-xs text-slate-500">
                Fill these in when a customer sends details by email instead of completing the
                self-service form. Mark as complete to stop reminder emails.
              </p>
              <div className="space-y-3">
                {climberEdits.map((c, i) => {
                  const hasAny =
                    !!(c?.name || c?.email || c?.phone || c?.nationality ||
                    c?.dateOfBirth || c?.passportNumber || c?.dietaryRequirements ||
                    c?.medicalConditions);
                  return (
                    <details
                      key={i}
                      className="border border-slate-200 rounded-lg overflow-hidden"
                      open={i === 0 || !c?.isComplete}
                    >
                      <summary className="cursor-pointer px-4 py-3 bg-slate-50 hover:bg-slate-100 flex items-center justify-between">
                        <span className="font-medium text-slate-800">
                          {c?.name || `Climber ${i + 1}`}
                          {i === 0 && (
                            <span className="ml-2 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                              Lead
                            </span>
                          )}
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            c?.isComplete
                              ? "bg-green-100 text-green-700"
                              : hasAny
                              ? "bg-sky-100 text-sky-700"
                              : "bg-slate-200 text-slate-600"
                          }`}
                        >
                          {c?.isComplete ? "Complete" : hasAny ? "In progress" : "Empty"}
                        </span>
                      </summary>
                      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <ClimberInput
                          label="Name"
                          value={c?.name}
                          onChange={(v) => updateClimberField(i, "name", v)}
                        />
                        <ClimberInput
                          label="Email"
                          type="email"
                          value={c?.email}
                          onChange={(v) => updateClimberField(i, "email", v)}
                        />
                        <ClimberInput
                          label="Phone"
                          value={c?.phone}
                          onChange={(v) => updateClimberField(i, "phone", v)}
                        />
                        <ClimberInput
                          label="Nationality"
                          value={c?.nationality}
                          onChange={(v) => updateClimberField(i, "nationality", v)}
                        />
                        <ClimberInput
                          label="Date of birth"
                          value={c?.dateOfBirth}
                          onChange={(v) => updateClimberField(i, "dateOfBirth", v)}
                          placeholder="YYYY-MM-DD"
                        />
                        <ClimberInput
                          label="Passport #"
                          value={c?.passportNumber}
                          onChange={(v) => updateClimberField(i, "passportNumber", v)}
                        />
                        <ClimberInput
                          label="Dietary requirements"
                          value={c?.dietaryRequirements}
                          onChange={(v) => updateClimberField(i, "dietaryRequirements", v)}
                          wide
                          textarea
                        />
                        <ClimberInput
                          label="Medical conditions"
                          value={c?.medicalConditions}
                          onChange={(v) => updateClimberField(i, "medicalConditions", v)}
                          wide
                          textarea
                        />
                        <label className="sm:col-span-2 flex items-center gap-2 cursor-pointer pt-1">
                          <input
                            type="checkbox"
                            checked={!!c?.isComplete}
                            onChange={(e) =>
                              updateClimberField(i, "isComplete", e.target.checked)
                            }
                            className="w-4 h-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                          />
                          <span className="text-sm text-slate-700">
                            Mark as complete
                          </span>
                        </label>
                      </div>
                    </details>
                  );
                })}
              </div>
              {climbersDirty && (
                <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 px-3 py-2 rounded">
                  Unsaved climber changes — click <strong>Save details</strong> above.
                </p>
              )}
            </div>
          )}

          {/* Climber Details Status (tokens) */}
          {formData.totalClimbers > 1 && (
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-slate-400" />
                  Climber Details Collection
                </h2>
                <button
                  onClick={fetchClimberTokens}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  title="Refresh"
                >
                  <RefreshCw
                    className={`w-4 h-4 text-slate-500 ${
                      climberTokensLoading ? "animate-spin" : ""
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 transition-all"
                    style={{
                      width: `${
                        (climberTokens.filter((c) => c.isComplete).length /
                          formData.totalClimbers) *
                        100
                      }%`,
                    }}
                  />
                </div>
                <span className="text-sm font-medium text-slate-600">
                  {climberTokens.filter((c) => c.isComplete).length}/
                  {formData.totalClimbers} complete
                </span>
              </div>

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
                      <span
                        className={`text-sm ${
                          climber.isComplete ? "text-green-600" : "text-slate-500"
                        }`}
                      >
                        {climber.isComplete ? "Complete" : "Pending"}
                      </span>
                    </div>

                    {!climber.isLead && !climber.isComplete && climber.token && (
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <input
                          type="email"
                          value={climberEmails[climber.index] || ""}
                          onChange={(e) =>
                            setClimberEmails({
                              ...climberEmails,
                              [climber.index]: e.target.value,
                            })
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

                    {!climber.isLead && !climber.isComplete && !climber.token && (
                      <p className="mt-2 text-sm text-slate-500">
                        Token not generated. Generate tokens to enable link sharing.
                      </p>
                    )}
                  </div>
                ))}
              </div>

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

          {/* Email history */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <Receipt className="w-5 h-5 text-slate-400" />
                Email History
                <span className="text-xs font-normal text-slate-500">
                  ({emailLogs.length})
                </span>
              </h2>
              <button
                onClick={fetchEmailLogs}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                title="Refresh"
              >
                <RefreshCw
                  className={`w-4 h-4 text-slate-500 ${emailLogsLoading ? "animate-spin" : ""}`}
                />
              </button>
            </div>
            {emailLogs.length === 0 ? (
              <p className="text-sm text-slate-500">No emails logged for this booking yet.</p>
            ) : (
              <ul className="divide-y divide-slate-100">
                {emailLogs.map((log) => (
                  <li key={log.id} className="py-3 flex items-start gap-3">
                    <EmailStatusIcon status={log.status} />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-800 truncate">{log.subject}</p>
                      <p className="text-xs text-slate-500">
                        to <span className="font-mono">{log.recipient}</span> · {log.type} ·{" "}
                        {formatDateTime(log.sentAt || log.createdAt)}
                      </p>
                      {log.error && (
                        <p className="mt-1 text-xs text-red-600 truncate" title={log.error}>
                          {log.error}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Actions */}
          <div className="sticky bottom-0 bg-slate-50/95 backdrop-blur border-t border-slate-200 py-3 flex justify-between">
            <button
              onClick={handleDelete}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4" />
              Delete Booking
            </button>
            <div className="flex items-center gap-3">
              {isDirty && (
                <span className="text-xs text-amber-700 bg-amber-50 border border-amber-200 px-2 py-1 rounded">
                  Unsaved changes
                </span>
              )}
              <button
                onClick={handleSave}
                disabled={saving || !isDirty}
                className="flex items-center gap-2 px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                {!departurePassed ? (
                  <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    In {daysUntilDeparture} day{daysUntilDeparture === 1 ? "" : "s"}
                  </p>
                ) : (
                  <p className="text-xs text-slate-500 mt-0.5">
                    {Math.abs(daysUntilDeparture)} day
                    {Math.abs(daysUntilDeparture) === 1 ? "" : "s"} ago
                  </p>
                )}
              </div>
              <div>
                <p className="text-slate-500">Trek Dates</p>
                <p className="font-medium text-slate-900">
                  {new Date(booking.departure.startDate).toLocaleDateString()} -{" "}
                  {new Date(booking.departure.endDate).toLocaleDateString()}
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

          {/* Commission */}
          {booking.commission && (
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Handshake className="w-5 h-5 text-slate-400" />
                Commission
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-slate-500">Partner</p>
                  <p className="font-medium text-slate-900">
                    {booking.commission.partner.name}
                  </p>
                  {booking.commission.partner.contactEmail && (
                    <p className="text-xs text-slate-500 font-mono">
                      {booking.commission.partner.contactEmail}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-slate-500">Rate</p>
                    <p className="font-medium text-slate-900">
                      {Number(booking.commission.commissionRate).toFixed(1)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-500">Amount</p>
                    <p className="font-medium text-slate-900">
                      ${Number(booking.commission.commissionAmount).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-slate-500">Status</p>
                  <p
                    className={`inline-block mt-0.5 text-xs px-2 py-0.5 rounded-full ${
                      booking.commission.status === "PAID"
                        ? "bg-green-100 text-green-700"
                        : booking.commission.status === "PENDING"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {booking.commission.status}
                    {booking.commission.paidAt &&
                      ` · ${new Date(booking.commission.paidAt).toLocaleDateString()}`}
                  </p>
                </div>
                <Link
                  href={`/admin/commissions`}
                  className="text-amber-600 hover:underline text-sm"
                >
                  View all commissions →
                </Link>
              </div>
            </div>
          )}

          {/* Related bookings */}
          {relatedBookings.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <History className="w-5 h-5 text-slate-400" />
                Customer History
                <span className="text-xs font-normal text-slate-500">
                  ({relatedBookings.length})
                </span>
              </h3>
              <ul className="space-y-3">
                {relatedBookings.map((rb) => (
                  <li key={rb.id}>
                    <Link
                      href={`/admin/bookings/${rb.id}`}
                      className="block -mx-2 px-2 py-2 rounded hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium text-slate-900 truncate">
                          {rb.departure.route.title}
                        </p>
                        <BookingStatusBadge status={rb.status} />
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {new Date(rb.departure.arrivalDate).toLocaleDateString()} ·{" "}
                        {rb.totalClimbers} climber{rb.totalClimbers === 1 ? "" : "s"} · $
                        {Number(rb.totalPrice).toLocaleString()}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Metadata */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Metadata</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-slate-500">Source</p>
                <p className="font-medium text-slate-900">{booking.source || "Unknown"}</p>
              </div>
              <div>
                <p className="text-slate-500">Created</p>
                <p className="font-medium text-slate-900">
                  {new Date(booking.createdAt).toLocaleString()}
                </p>
              </div>
              {booking.updatedAt && booking.updatedAt !== booking.createdAt && (
                <div>
                  <p className="text-slate-500">Last updated</p>
                  <p className="font-medium text-slate-900">
                    {new Date(booking.updatedAt).toLocaleString()}
                  </p>
                </div>
              )}
              {booking.utmSource && (
                <div>
                  <p className="text-slate-500">UTM Source</p>
                  <p className="font-medium text-slate-900">
                    {booking.utmSource}
                    {booking.utmMedium && ` / ${booking.utmMedium}`}
                    {booking.utmCampaign && ` / ${booking.utmCampaign}`}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Visitor Tracking Section */}
          {(booking.countryCode || booking.device || booking.ipAddress) && (
            <div className="bg-slate-50 rounded-lg p-4 mt-4">
              <h4 className="text-sm font-semibold text-slate-700 mb-3">Visitor Tracking</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                {booking.country && (
                  <div>
                    <p className="text-slate-500">Country</p>
                    <p className="font-medium text-slate-900">
                      {booking.country}
                      {booking.city && `, ${booking.city}`}
                    </p>
                  </div>
                )}
                {booking.device && (
                  <div>
                    <p className="text-slate-500">Device</p>
                    <p className="font-medium text-slate-900 capitalize">
                      {booking.device}
                    </p>
                  </div>
                )}
                {booking.browser && (
                  <div>
                    <p className="text-slate-500">Browser</p>
                    <p className="font-medium text-slate-900">{booking.browser}</p>
                  </div>
                )}
                {booking.ipAddress && (
                  <div>
                    <p className="text-slate-500">IP Address</p>
                    <p className="font-medium text-slate-900 font-mono text-xs">
                      {booking.ipAddress}
                    </p>
                  </div>
                )}
                {booking.referrerUrl && (
                  <div className="col-span-2">
                    <p className="text-slate-500">Referrer</p>
                    <p className="font-medium text-slate-900 truncate">
                      {booking.referrerUrl}
                    </p>
                  </div>
                )}
                {booking.landingPage && (
                  <div className="col-span-2">
                    <p className="text-slate-500">Landing Page</p>
                    <p className="font-medium text-slate-900">{booking.landingPage}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TimelineStep({
  done,
  negative,
  label,
  value,
}: {
  done: boolean;
  negative?: boolean;
  label: string;
  value: string;
}) {
  return (
    <li className="flex items-start gap-3">
      {done ? (
        negative ? (
          <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
        ) : (
          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
        )
      ) : (
        <div className="w-5 h-5 rounded-full border-2 border-slate-300 flex-shrink-0 mt-0.5" />
      )}
      <div className="flex-1">
        <p
          className={`font-medium ${
            done && negative
              ? "text-red-700"
              : done
              ? "text-slate-900"
              : "text-slate-500"
          }`}
        >
          {label}
        </p>
        <p className="text-xs text-slate-500">{value}</p>
      </div>
    </li>
  );
}

function ClimberInput({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  wide,
  textarea,
}: {
  label: string;
  value?: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  wide?: boolean;
  textarea?: boolean;
}) {
  return (
    <div className={wide ? "sm:col-span-2" : undefined}>
      <label className="block text-xs text-slate-500 mb-1">{label}</label>
      {textarea ? (
        <textarea
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          rows={2}
          placeholder={placeholder}
          className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none resize-none"
        />
      ) : (
        <input
          type={type}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
        />
      )}
    </div>
  );
}

function EmailStatusIcon({ status }: { status: EmailStatus }) {
  if (status === "SENT") {
    return <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />;
  }
  if (status === "FAILED" || status === "BOUNCED") {
    return <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />;
  }
  return <Clock className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />;
}
