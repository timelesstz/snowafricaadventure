"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home, MessageSquare } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-16 text-center">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full">
            <AlertTriangle className="w-10 h-10 text-red-500" />
          </div>
        </div>

        {/* Message */}
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Something Went Wrong
        </h1>
        <p className="text-lg text-slate-600 max-w-md mx-auto mb-4">
          We apologize for the inconvenience. An unexpected error has occurred.
        </p>

        {/* Error Details (only in development) */}
        {process.env.NODE_ENV === "development" && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-lg mx-auto mb-8 text-left">
            <p className="text-sm font-mono text-red-700 break-all">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs text-red-500 mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-medium"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
        </div>

        {/* Support */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 max-w-md mx-auto">
          <h2 className="text-lg font-semibold text-slate-900 mb-2 flex items-center justify-center gap-2">
            <MessageSquare className="w-5 h-5 text-amber-500" />
            Need Assistance?
          </h2>
          <p className="text-slate-600 mb-4">
            If this problem persists, please contact our support team.
          </p>
          <div className="space-y-2 text-sm">
            <p>
              <span className="text-slate-500">Email:</span>{" "}
              <a
                href="mailto:info@snowafricaadventure.com"
                className="text-amber-600 hover:underline"
              >
                info@snowafricaadventure.com
              </a>
            </p>
            <p>
              <span className="text-slate-500">WhatsApp:</span>{" "}
              <a
                href="https://wa.me/255766657854"
                className="text-amber-600 hover:underline"
              >
                +255 766 657 854
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
