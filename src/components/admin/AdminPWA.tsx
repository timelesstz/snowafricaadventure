"use client";

import { useEffect, useState } from "react";
import { X, Download } from "lucide-react";

export default function AdminPWA() {
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Register service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/admin-sw.js", { scope: "/admin/" })
        .then((reg) => console.log("Admin SW registered:", reg.scope))
        .catch((err) => console.error("Admin SW registration failed:", err));
    }

    // Already installed — no banner needed
    if (window.matchMedia("(display-mode: standalone)").matches) return;

    const handleBeforeInstall = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setInstallPrompt(e);

      const dismissed = localStorage.getItem("sa-admin-pwa-dismissed");
      if (
        !dismissed ||
        Date.now() - parseInt(dismissed) > 7 * 24 * 60 * 60 * 1000
      ) {
        setShowBanner(true);
      }
    };

    const handleInstalled = () => {
      setShowBanner(false);
      setInstallPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    window.addEventListener("appinstalled", handleInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === "accepted") setShowBanner(false);
    setInstallPrompt(null);
  };

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem("sa-admin-pwa-dismissed", Date.now().toString());
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 right-4 left-4 lg:left-auto lg:w-96 z-50 bg-slate-800 text-white rounded-lg shadow-xl p-4 flex items-center gap-3">
      <div className="flex-shrink-0 rounded-lg bg-amber-600 p-2">
        <Download className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">Install Admin App</p>
        <p className="mt-0.5 text-xs text-slate-300">
          Quick access from your home screen
        </p>
      </div>
      <button
        onClick={handleInstall}
        className="flex-shrink-0 rounded-md bg-amber-600 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-amber-700"
      >
        Install
      </button>
      <button
        onClick={handleDismiss}
        className="flex-shrink-0 rounded p-1 transition-colors hover:bg-slate-700"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
