"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MoreHorizontal, Check, DollarSign, X, Trash2 } from "lucide-react";

export default function PayoutActions({
  id,
  status,
}: {
  id: string;
  status: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const updateStatus = async (newStatus: string, paymentReference?: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/payouts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, paymentReference }),
      });

      if (!response.ok) throw new Error("Failed to update");

      router.refresh();
    } catch (error) {
      console.error("Error updating payout:", error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const handleMarkPaid = async () => {
    const reference = prompt("Enter payment reference (optional):");
    await updateStatus("PAID", reference || undefined);
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this payout?")) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/admin/payouts/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete");

      router.refresh();
    } catch (error) {
      console.error("Error deleting payout:", error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        disabled={loading}
        className="p-2 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50"
      >
        <MoreHorizontal className="w-4 h-4" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-slate-200 z-20 py-1">
            {status === "PENDING" && (
              <button
                onClick={() => updateStatus("APPROVED")}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left hover:bg-slate-50 text-blue-600"
              >
                <Check className="w-4 h-4" />
                Approve Payout
              </button>
            )}

            {(status === "PENDING" || status === "APPROVED") && (
              <button
                onClick={handleMarkPaid}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left hover:bg-slate-50 text-green-600"
              >
                <DollarSign className="w-4 h-4" />
                Mark as Paid
              </button>
            )}

            {status !== "PAID" && status !== "CANCELLED" && (
              <button
                onClick={() => updateStatus("CANCELLED")}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left hover:bg-slate-50 text-red-600"
              >
                <X className="w-4 h-4" />
                Cancel Payout
              </button>
            )}

            {status !== "PAID" && (
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left hover:bg-slate-50 text-red-600"
              >
                <Trash2 className="w-4 h-4" />
                Delete Payout
              </button>
            )}

            {status === "PAID" && (
              <p className="px-4 py-2 text-sm text-slate-500">
                No actions available
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
