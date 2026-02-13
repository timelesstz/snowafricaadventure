"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ResetPinPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPin !== confirmPin) {
      setError("PINs do not match");
      return;
    }

    if (!/^\d{4,6}$/.test(newPin)) {
      setError("PIN must be 4-6 digits");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/reset-pin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, newPin }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to reset PIN");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/admin/login");
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            PIN Reset Successful
          </h1>
          <p className="text-slate-600 mb-6">
            Your PIN has been reset. Redirecting to login...
          </p>
          <Link
            href="/admin/login"
            className="inline-block py-2 px-4 text-amber-600 hover:text-amber-700 font-medium"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Reset Your PIN</h1>
          <p className="text-slate-600 mt-2">
            Verify your identity with your password to set a new PIN
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
              placeholder="admin@snowafricaadventure.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Current Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
              placeholder="Enter your password"
            />
          </div>

          <div className="border-t border-slate-200 pt-4">
            <label
              htmlFor="newPin"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              New PIN (4-6 digits)
            </label>
            <input
              id="newPin"
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              value={newPin}
              onChange={(e) => setNewPin(e.target.value.replace(/\D/g, ""))}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors text-center text-2xl tracking-widest"
              placeholder="••••••"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPin"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Confirm New PIN
            </label>
            <input
              id="confirmPin"
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              value={confirmPin}
              onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, ""))}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors text-center text-2xl tracking-widest"
              placeholder="••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Resetting..." : "Reset PIN"}
          </button>

          <div className="text-center">
            <Link
              href="/admin/login"
              className="text-sm text-slate-600 hover:text-slate-800"
            >
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
