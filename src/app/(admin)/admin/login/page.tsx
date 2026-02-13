"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type LoginMethod = "password" | "pin";

export default function LoginPage() {
  const router = useRouter();
  const [loginMethod, setLoginMethod] = useState<LoginMethod>("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn(
        loginMethod === "password" ? "credentials" : "pin",
        {
          email,
          ...(loginMethod === "password" ? { password } : { pin }),
          redirect: false,
        }
      );

      if (result?.error) {
        setError(
          loginMethod === "password"
            ? "Invalid email or password"
            : "Invalid email or PIN"
        );
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900">
            Snow Africa Admin
          </h1>
          <p className="text-slate-600 mt-2">Sign in to your account</p>
        </div>

        {/* Login Method Tabs */}
        <div className="flex border-b border-slate-200 mb-6">
          <button
            type="button"
            onClick={() => {
              setLoginMethod("password");
              setError("");
            }}
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
              loginMethod === "password"
                ? "border-amber-500 text-amber-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            Password
          </button>
          <button
            type="button"
            onClick={() => {
              setLoginMethod("pin");
              setError("");
            }}
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
              loginMethod === "pin"
                ? "border-amber-500 text-amber-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            Quick PIN
          </button>
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
              Email
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

          {loginMethod === "password" ? (
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Password
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
          ) : (
            <div>
              <label
                htmlFor="pin"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                PIN (4-6 digits)
              </label>
              <input
                id="pin"
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors text-center text-2xl tracking-widest"
                placeholder="••••••"
              />
              <p className="mt-1 text-xs text-slate-500">
                PIN login is only available for Admin users who have set up a PIN.
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <div className="text-center">
            {loginMethod === "password" ? (
              <Link
                href="/admin/forgot-password"
                className="text-sm text-amber-600 hover:text-amber-700 hover:underline"
              >
                Forgot your password?
              </Link>
            ) : (
              <Link
                href="/admin/reset-pin"
                className="text-sm text-amber-600 hover:text-amber-700 hover:underline"
              >
                Forgot your PIN?
              </Link>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
