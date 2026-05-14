"use client";

import { useState } from "react";
import { RefreshCw, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function ResendButton({ emailId }: { emailId: string }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<"success" | "error" | null>(null);
  const router = useRouter();

  async function handleResend() {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`/api/admin/email-log/${emailId}/resend`, {
        method: "POST",
      });
      if (res.ok) {
        setResult("success");
        router.refresh();
      } else {
        setResult("error");
      }
    } catch {
      setResult("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleResend}
        disabled={loading}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-amber-600 rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
        ) : (
          <RefreshCw className="w-3.5 h-3.5" />
        )}
        Resend
      </button>
      {result === "success" && (
        <span className="text-xs text-green-600 font-medium">Resent!</span>
      )}
      {result === "error" && (
        <span className="text-xs text-red-600 font-medium">Failed</span>
      )}
    </div>
  );
}
