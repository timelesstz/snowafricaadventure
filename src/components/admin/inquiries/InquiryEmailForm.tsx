"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Send, AlertCircle, CheckCircle } from "lucide-react";

interface InquiryEmailFormProps {
  inquiryId: string;
  recipientName: string;
  recipientEmail: string;
}

export function InquiryEmailForm({
  inquiryId,
  recipientName,
  recipientEmail,
}: InquiryEmailFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!message.trim()) {
      setError("Please enter a message");
      return;
    }

    try {
      const response = await fetch("/api/admin/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "inquiry_response",
          targetId: inquiryId,
          message: message.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send email");
      }

      setSuccess("Email sent successfully!");
      setMessage("");
      startTransition(() => {
        router.refresh();
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send email");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
      <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
        <Send className="w-5 h-5 text-slate-400" />
        Send Response
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm text-slate-500 mb-1">To</label>
          <div className="text-slate-900">
            {recipientName} &lt;{recipientEmail}&gt;
          </div>
        </div>

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

        <div className="mb-4">
          <label htmlFor="message" className="block text-sm text-slate-500 mb-1">
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
            placeholder="Type your response here..."
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none resize-none"
            disabled={isPending}
          />
          <p className="mt-1 text-xs text-slate-400">
            Your name will be included in the email signature.
          </p>
        </div>

        <button
          type="submit"
          disabled={isPending || !message.trim()}
          className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
          {isPending ? "Sending..." : "Send Email"}
        </button>
      </form>
    </div>
  );
}
