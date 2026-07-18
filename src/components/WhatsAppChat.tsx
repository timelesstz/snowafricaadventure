"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { trackContactClick } from "@/lib/analytics";

const WHATSAPP_NUMBER = "255766657854";

const QUICK_QUESTIONS = [
  {
    icon: "\u{1F3D4}\u{FE0F}",
    label: "Climb Kilimanjaro",
    message:
      "Hi! I'm interested in climbing Mount Kilimanjaro. Could you help me choose the best route and dates?",
  },
  {
    icon: "\u{1F981}",
    label: "Tanzania Safari",
    message:
      "Hi! I'd love to plan a Tanzania safari. Can you tell me about your packages and best times to visit?",
  },
  {
    icon: "\u{1F3D6}\u{FE0F}",
    label: "Zanzibar Beach Holiday",
    message:
      "Hi! I'm interested in a Zanzibar beach holiday. What options do you have?",
  },
  {
    icon: "\u{1F30D}",
    label: "Custom Trip",
    message:
      "Hi! I'd like to plan a tailor-made trip combining safari, trekking, or beach. Can you help me design an itinerary?",
  },
  {
    icon: "\u{1F465}",
    label: "Join a Group Climb",
    message:
      "Hi! I'd like to join a group departure for Kilimanjaro. What upcoming dates do you have?",
  },
] as const;

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export default function WhatsAppChat() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  // Pulse until the user interacts or the intro timeout elapses — derived so
  // no synchronous setState runs inside the effect.
  const [timedOut, setTimedOut] = useState(false);
  const pulse = !hasInteracted && !timedOut;
  // Stamped when the panel is first opened rather than during render — the
  // server formats in UTC while the browser uses local time, so rendering it
  // on the server causes a hydration mismatch.
  const [sentAt, setSentAt] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setTimedOut(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
    if (!hasInteracted) setHasInteracted(true);
    if (!sentAt) {
      setSentAt(
        new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    }
  }, [hasInteracted, sentAt]);

  const logWhatsApp = useCallback((action: string, label: string, message?: string) => {
    trackContactClick({ method: "whatsapp", location: pathname || "/" });
    fetch("/api/whatsapp-log/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, label, message, page: pathname }),
    }).catch(() => {});
  }, [pathname]);

  const handleQuestionClick = useCallback((label: string, message: string) => {
    logWhatsApp("quick_question", label, message);
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  }, [logWhatsApp]);

  const handleDirectChat = useCallback(() => {
    logWhatsApp("direct_chat", "Type your own message");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}`, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  }, [logWhatsApp]);

  if (isAdmin) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 pointer-events-none">
      {/* Chat popup */}
      <div
        className={`origin-bottom-right transition-all duration-300 ease-out ${
          isOpen
            ? "scale-100 opacity-100 translate-y-0 pointer-events-auto"
            : "scale-95 opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        <div className="w-[340px] max-w-[calc(100vw-2.5rem)] overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5">
          {/* Header */}
          <div className="relative bg-[#075E54] px-5 py-4">
            <button
              onClick={handleToggle}
              className="absolute right-3 top-3 rounded-full p-1 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Close chat"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15">
                <WhatsAppIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-white text-[15px] leading-tight">
                  Snow Africa Adventure
                </p>
                <p className="mt-0.5 text-xs text-[#25D366]">
                  Typically replies within minutes
                </p>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="bg-[#ECE5DD] p-4">
            {/* Welcome bubble */}
            <div className="relative mb-4 rounded-lg rounded-tl-none bg-white px-4 py-3 shadow-sm">
              <p className="text-[15px] font-semibold text-gray-900 leading-snug">
                Your Tanzania adventure starts here!
              </p>
              <p className="mt-1.5 text-sm text-gray-600 leading-relaxed">
                Kilimanjaro summit, Big Five safari, or Zanzibar beaches
                &mdash; tell us your dream and we&apos;ll make it happen.
                Pick a question below to get started:
              </p>
              <div className="mt-1.5 text-right text-[10px] text-gray-400">
                {sentAt}
              </div>
            </div>

            {/* Quick questions */}
            <div className="space-y-2">
              {QUICK_QUESTIONS.map((q) => (
                <button
                  key={q.label}
                  onClick={() => handleQuestionClick(q.label, q.message)}
                  className="group flex w-full items-center gap-2.5 rounded-lg border border-[#25D366]/20 bg-white px-3.5 py-2.5 text-left shadow-sm transition-all hover:border-[#25D366]/50 hover:shadow-md active:scale-[0.98]"
                >
                  <span className="text-lg leading-none">{q.icon}</span>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-[#075E54]">
                    {q.label}
                  </span>
                  <svg
                    className="ml-auto h-4 w-4 shrink-0 text-gray-300 transition-colors group-hover:text-[#25D366]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 bg-white px-4 py-3">
            <button
              onClick={handleDirectChat}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#128C7E] hover:shadow-md active:scale-[0.98]"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Type your own message
            </button>
          </div>
        </div>
      </div>

      {/* Floating button */}
      <button
        onClick={handleToggle}
        className={`pointer-events-auto group relative flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:bg-[#128C7E] hover:shadow-xl active:scale-95 ${
          isOpen ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
        }`}
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon className="h-7 w-7" />
        {pulse && (
          <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-40" />
        )}
      </button>
    </div>
  );
}
