"use client";

import { useState } from "react";
import {
  Mail,
  Download,
  Send,
  CheckCircle,
  Loader2,
  RefreshCw,
} from "lucide-react";

interface PartnerActionsProps {
  partnerId: string;
  partnerName: string;
  partnerEmail: string | null;
  hasPendingCommissions: boolean;
}

export function PartnerActions({
  partnerId,
  partnerName,
  partnerEmail,
  hasPendingCommissions,
}: PartnerActionsProps) {
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState("");

  const handleSendTestEmail = async () => {
    if (!partnerEmail) {
      setError("No email configured for this partner");
      return;
    }

    setSendingEmail(true);
    setError("");

    try {
      const response = await fetch(`/api/admin/partners/${partnerId}/send-test-email`, {
        method: "POST",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to send email");
      }

      setEmailSent(true);
      setTimeout(() => setEmailSent(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send email");
    } finally {
      setSendingEmail(false);
    }
  };

  const handleExportCSV = async () => {
    setExporting(true);
    setError("");

    try {
      const response = await fetch(`/api/admin/partners/${partnerId}/export-commissions`);

      if (!response.ok) {
        throw new Error("Failed to export");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${partnerName.toLowerCase().replace(/\s+/g, "-")}-commissions.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to export");
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">Actions</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="space-y-3">
        {/* Send Test Email */}
        <button
          onClick={handleSendTestEmail}
          disabled={sendingEmail || !partnerEmail}
          className={`flex items-center gap-2 w-full px-4 py-2 text-left rounded-lg transition-colors ${
            !partnerEmail
              ? "bg-slate-100 text-slate-400 cursor-not-allowed"
              : emailSent
              ? "bg-green-50 text-green-700"
              : "text-slate-700 hover:bg-slate-50"
          }`}
        >
          {sendingEmail ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : emailSent ? (
            <CheckCircle className="w-4 h-4" />
          ) : (
            <Mail className="w-4 h-4" />
          )}
          {emailSent ? "Email Sent!" : "Send Test Email"}
        </button>

        {/* Export CSV */}
        <button
          onClick={handleExportCSV}
          disabled={exporting}
          className="flex items-center gap-2 w-full px-4 py-2 text-left text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
        >
          {exporting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          Export Commissions (CSV)
        </button>

        {/* Refresh Data */}
        <button
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 w-full px-4 py-2 text-left text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh Data
        </button>
      </div>

      {/* Partner Email Info */}
      {partnerEmail && (
        <div className="mt-4 pt-4 border-t border-slate-200">
          <p className="text-xs text-slate-500">
            Emails sent to: <span className="font-medium">{partnerEmail}</span>
          </p>
          <p className="text-xs text-slate-500">
            CC: <span className="font-medium">timelesstz@gmail.com</span>
          </p>
        </div>
      )}
    </div>
  );
}

interface CommissionActionsProps {
  commissionId: string;
  currentStatus: string;
  onStatusChange: () => void;
}

export function CommissionStatusButton({
  commissionId,
  currentStatus,
  onStatusChange,
}: CommissionActionsProps) {
  const [updating, setUpdating] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    setUpdating(true);
    try {
      const response = await fetch(`/api/admin/commissions/${commissionId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        onStatusChange();
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setUpdating(false);
    }
  };

  if (currentStatus === "PAID" || currentStatus === "VOIDED") {
    return null;
  }

  return (
    <div className="flex gap-1">
      {currentStatus === "PENDING" && (
        <button
          onClick={() => handleStatusChange("ELIGIBLE")}
          disabled={updating}
          className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors"
        >
          {updating ? "..." : "Mark Eligible"}
        </button>
      )}
      {(currentStatus === "PENDING" || currentStatus === "ELIGIBLE") && (
        <button
          onClick={() => handleStatusChange("PAID")}
          disabled={updating}
          className="px-2 py-1 text-xs bg-green-50 text-green-700 rounded hover:bg-green-100 transition-colors"
        >
          {updating ? "..." : "Mark Paid"}
        </button>
      )}
    </div>
  );
}
