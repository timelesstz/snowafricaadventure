"use client";

import Link from "next/link";
import { Mountain, Compass, Home, Search, ArrowRight } from "lucide-react";
import { useEffect } from "react";

export default function NotFound() {
  // Track 404 hit
  useEffect(() => {
    fetch("/api/track-404", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: window.location.pathname + window.location.search,
        userAgent: navigator.userAgent,
        referer: document.referrer || null,
      }),
    }).catch(() => {
      // Fire and forget - don't handle errors
    });
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-16 text-center">
        {/* 404 Illustration */}
        <div className="relative mb-8">
          <div className="text-[180px] font-bold text-slate-100 leading-none select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Mountain className="w-24 h-24 text-amber-500" />
          </div>
        </div>

        {/* Message */}
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Trail Not Found
        </h1>
        <p className="text-lg text-slate-600 max-w-md mx-auto mb-8">
          Looks like you have wandered off the beaten path. The page you are looking for
          does not exist or has been moved.
        </p>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-medium"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
          <Link
            href="/contact-us/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
          >
            <Compass className="w-5 h-5" />
            Contact Us
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center justify-center gap-2">
            <Search className="w-5 h-5 text-amber-500" />
            Popular Destinations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href="/trekking/"
              className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors group"
            >
              <span className="font-medium text-slate-700">Kilimanjaro Treks</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-500 transition-colors" />
            </Link>
            <Link
              href="/tanzania-safaris/"
              className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors group"
            >
              <span className="font-medium text-slate-700">Tanzania Safaris</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-500 transition-colors" />
            </Link>
            <Link
              href="/kilimanjaro-join-group-departures/"
              className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors group"
            >
              <span className="font-medium text-slate-700">Group Departures</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-500 transition-colors" />
            </Link>
            <Link
              href="/tanzania-destinations/"
              className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors group"
            >
              <span className="font-medium text-slate-700">Safari Destinations</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-500 transition-colors" />
            </Link>
          </div>
        </div>

        {/* Support Note */}
        <p className="mt-8 text-sm text-slate-500">
          Need help? Contact us at{" "}
          <a
            href="mailto:info@snowafricaadventure.com"
            className="text-amber-600 hover:underline"
          >
            info@snowafricaadventure.com
          </a>
        </p>
      </div>
    </div>
  );
}
