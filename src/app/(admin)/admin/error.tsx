"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, LayoutDashboard } from "lucide-react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin page error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
      <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mb-4">
        <AlertTriangle className="w-7 h-7 text-red-600" aria-hidden="true" />
      </div>
      <h1 className="text-xl font-semibold text-slate-900 mb-2">
        Something went wrong
      </h1>
      <p className="text-slate-600 max-w-md mb-6">
        This admin page hit an unexpected error. Your session is still active —
        try again, or head back to the dashboard.
        {error.digest && (
          <span className="block mt-2 text-xs text-slate-400">
            Error reference: {error.digest}
          </span>
        )}
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
        >
          <RotateCcw className="w-4 h-4" aria-hidden="true" />
          Try again
        </button>
        <Link
          href="/admin"
          className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <LayoutDashboard className="w-4 h-4" aria-hidden="true" />
          Dashboard
        </Link>
      </div>
    </div>
  );
}
