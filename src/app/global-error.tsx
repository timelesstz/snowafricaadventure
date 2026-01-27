"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

export default function GlobalError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="text-center px-4">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full">
                <AlertTriangle className="w-10 h-10 text-red-500" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-slate-900 mb-4">
              Application Error
            </h1>
            <p className="text-slate-600 max-w-md mx-auto mb-8">
              A critical error has occurred. Please try refreshing the page.
            </p>

            <button
              onClick={reset}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-medium"
            >
              <RefreshCw className="w-5 h-5" />
              Try Again
            </button>

            <p className="mt-8 text-sm text-slate-500">
              If the problem persists, please contact{" "}
              <a
                href="mailto:info@snowafricaadventure.com"
                className="text-amber-600 hover:underline"
              >
                info@snowafricaadventure.com
              </a>
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
