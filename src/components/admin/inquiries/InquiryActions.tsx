"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2, CheckCircle, AlertCircle } from "lucide-react";

interface Inquiry {
  id: string;
  status: string;
  fullName: string;
}

interface InquiryActionsProps {
  inquiry: Inquiry;
}

const statuses = [
  { value: "new", label: "New", description: "Not yet reviewed" },
  { value: "contacted", label: "Contacted", description: "Reached out to customer" },
  { value: "converted", label: "Converted", description: "Became a booking" },
  { value: "closed", label: "Closed", description: "No further action needed" },
];

export function InquiryActions({ inquiry }: InquiryActionsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState(inquiry.status);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleStatusChange = async (newStatus: string) => {
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`/api/admin/inquiries/${inquiry.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      setStatus(newStatus);
      setSuccess("Status updated successfully");
      startTransition(() => {
        router.refresh();
      });
    } catch {
      setError("Failed to update status");
    }
  };

  const handleDelete = async () => {
    setError(null);

    try {
      const response = await fetch(`/api/admin/inquiries/${inquiry.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete inquiry");
      }

      router.push("/admin/inquiries");
    } catch {
      setError("Failed to delete inquiry");
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">
        Update Status
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700 text-sm">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700 text-sm">
          <CheckCircle className="w-4 h-4" />
          {success}
        </div>
      )}

      <div className="space-y-2">
        {statuses.map((s) => (
          <button
            key={s.value}
            onClick={() => handleStatusChange(s.value)}
            disabled={isPending || status === s.value}
            className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
              status === s.value
                ? "bg-amber-50 border-amber-300 text-amber-800"
                : "border-slate-200 hover:bg-slate-50 text-slate-700"
            } ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <p className="font-medium">{s.label}</p>
            <p className="text-sm text-slate-500">{s.description}</p>
          </button>
        ))}
      </div>

      <hr className="my-6" />

      <div>
        <h3 className="text-sm font-medium text-slate-900 mb-3">
          Danger Zone
        </h3>
        {showDeleteConfirm ? (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700 mb-3">
              Are you sure you want to delete this inquiry from{" "}
              <strong>{inquiry.fullName}</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleDelete}
                disabled={isPending}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isPending}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="flex items-center gap-2 px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 text-sm w-full justify-center"
          >
            <Trash2 className="w-4 h-4" />
            Delete Inquiry
          </button>
        )}
      </div>
    </div>
  );
}
