"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RedirectType } from "@prisma/client";
import { Loader2, ArrowRight, Save } from "lucide-react";

interface RedirectFormProps {
  initialSourceUrl: string;
  initialDestinationUrl: string;
  initialType: RedirectType;
  initialIsActive: boolean;
  initialNotes: string;
  notFoundId?: string;
  editId?: string;
  isEditing: boolean;
}

export function RedirectForm({
  initialSourceUrl,
  initialDestinationUrl,
  initialType,
  initialIsActive,
  initialNotes,
  notFoundId,
  editId,
  isEditing,
}: RedirectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [sourceUrl, setSourceUrl] = useState(initialSourceUrl);
  const [destinationUrl, setDestinationUrl] = useState(initialDestinationUrl);
  const [type, setType] = useState<RedirectType>(initialType);
  const [isActive, setIsActive] = useState(initialIsActive);
  const [notes, setNotes] = useState(initialNotes);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const endpoint = isEditing
        ? `/api/admin/redirects/${editId}`
        : "/api/admin/redirects";

      const method = isEditing ? "PATCH" : "POST";

      const body = {
        sourceUrl,
        destinationUrl,
        type,
        isActive,
        notes: notes || null,
        ...(notFoundId && !isEditing && { notFoundUrlId: notFoundId }),
      };

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save redirect");
      }

      router.push("/admin/redirects");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Source URL */}
      <div>
        <label
          htmlFor="sourceUrl"
          className="block text-sm font-medium text-slate-700 mb-1"
        >
          Source URL
        </label>
        <input
          type="text"
          id="sourceUrl"
          value={sourceUrl}
          onChange={(e) => setSourceUrl(e.target.value)}
          placeholder="/old-page-url"
          required
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
        />
        <p className="mt-1 text-xs text-slate-500">
          The URL that will be redirected (e.g., /old-page or
          /products/old-product)
        </p>
      </div>

      {/* Arrow indicator */}
      <div className="flex justify-center">
        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
          <ArrowRight className="w-5 h-5 text-emerald-600" />
        </div>
      </div>

      {/* Destination URL */}
      <div>
        <label
          htmlFor="destinationUrl"
          className="block text-sm font-medium text-slate-700 mb-1"
        >
          Destination URL
        </label>
        <input
          type="text"
          id="destinationUrl"
          value={destinationUrl}
          onChange={(e) => setDestinationUrl(e.target.value)}
          placeholder="/new-page-url or https://example.com/page"
          required
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
        />
        <p className="mt-1 text-xs text-slate-500">
          Where users will be redirected to (can be relative or absolute URL)
        </p>
      </div>

      {/* Redirect Type */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Redirect Type
        </label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="type"
              value="PERMANENT"
              checked={type === "PERMANENT"}
              onChange={(e) => setType(e.target.value as RedirectType)}
              className="w-4 h-4 text-amber-600 focus:ring-amber-500"
            />
            <span className="text-sm text-slate-700">301 Permanent</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="type"
              value="TEMPORARY"
              checked={type === "TEMPORARY"}
              onChange={(e) => setType(e.target.value as RedirectType)}
              className="w-4 h-4 text-amber-600 focus:ring-amber-500"
            />
            <span className="text-sm text-slate-700">302 Temporary</span>
          </label>
        </div>
        <p className="mt-1 text-xs text-slate-500">
          Use 301 for permanent moves (SEO friendly), 302 for temporary
          redirects
        </p>
      </div>

      {/* Active Status (only for editing) */}
      {isEditing && (
        <div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="w-4 h-4 text-amber-600 focus:ring-amber-500 rounded"
            />
            <span className="text-sm font-medium text-slate-700">
              Active
            </span>
          </label>
          <p className="mt-1 text-xs text-slate-500 ml-7">
            Inactive redirects will not be applied to incoming requests
          </p>
        </div>
      )}

      {/* Notes */}
      <div>
        <label
          htmlFor="notes"
          className="block text-sm font-medium text-slate-700 mb-1"
        >
          Notes (optional)
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add any notes about this redirect..."
          rows={3}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none resize-none"
        />
      </div>

      {/* Submit Button */}
      <div className="flex items-center gap-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {isEditing ? "Saving..." : "Creating..."}
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              {isEditing ? "Save Changes" : "Create Redirect"}
            </>
          )}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 text-slate-600 hover:text-slate-800 transition-colors"
        >
          Cancel
        </button>
      </div>

      {/* Info box */}
      {notFoundId && !isEditing && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">
            This redirect will be linked to the 404 entry and automatically
            update its status to &quot;Redirected&quot;.
          </p>
        </div>
      )}
    </form>
  );
}
