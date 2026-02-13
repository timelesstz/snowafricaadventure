"use client";

import { useState } from "react";
import { Fingerprint, Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";

interface PinSettingsProps {
  hasPin: boolean;
}

export function PinSettings({ hasPin: initialHasPin }: PinSettingsProps) {
  const [hasPin, setHasPin] = useState(initialHasPin);
  const [isEditing, setIsEditing] = useState(false);
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSetPin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (pin !== confirmPin) {
      setMessage({ type: "error", text: "PINs do not match" });
      return;
    }

    if (!/^\d{4,6}$/.test(pin)) {
      setMessage({ type: "error", text: "PIN must be 4-6 digits" });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/set-pin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin, currentPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to set PIN");
      }

      setMessage({ type: "success", text: "PIN set successfully" });
      setHasPin(true);
      setIsEditing(false);
      setPin("");
      setConfirmPin("");
      setCurrentPassword("");
    } catch (err) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "An error occurred" });
    } finally {
      setLoading(false);
    }
  };

  const handleRemovePin = async () => {
    if (!confirm("Are you sure you want to remove your PIN?")) return;

    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/auth/set-pin", {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to remove PIN");
      }

      setMessage({ type: "success", text: "PIN removed successfully" });
      setHasPin(false);
    } catch (err) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "An error occurred" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-amber-100 rounded-lg">
          <Fingerprint className="w-6 h-6 text-amber-600" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Quick PIN Login</h2>
          <p className="text-sm text-slate-500">
            Set a 4-6 digit PIN for faster login
          </p>
        </div>
      </div>

      {message && (
        <div
          className={`mb-4 p-3 rounded-md flex items-center gap-2 ${
            message.type === "success"
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle className="w-4 h-4" />
          ) : (
            <XCircle className="w-4 h-4" />
          )}
          {message.text}
        </div>
      )}

      {!isEditing ? (
        <div className="space-y-4">
          <div className="p-4 bg-slate-50 rounded-lg flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">PIN Status</p>
              <p className="font-medium text-slate-900">
                {hasPin ? "PIN is set" : "No PIN configured"}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                hasPin
                  ? "bg-green-100 text-green-700"
                  : "bg-slate-200 text-slate-600"
              }`}
            >
              {hasPin ? "Active" : "Inactive"}
            </span>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-md transition-colors"
            >
              {hasPin ? "Change PIN" : "Set PIN"}
            </button>
            {hasPin && (
              <button
                onClick={handleRemovePin}
                disabled={loading}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium rounded-md transition-colors disabled:opacity-50"
              >
                Remove PIN
              </button>
            )}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSetPin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              New PIN (4-6 digits)
            </label>
            <input
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-center text-2xl tracking-widest"
              placeholder="••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Confirm PIN
            </label>
            <input
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              value={confirmPin}
              onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, ""))}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-center text-2xl tracking-widest"
              placeholder="••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Current Password (for verification)
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                className="w-full px-4 py-2 pr-10 border border-slate-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                placeholder="Enter your current password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-md transition-colors disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save PIN"}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setPin("");
                setConfirmPin("");
                setCurrentPassword("");
                setMessage(null);
              }}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium rounded-md transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
