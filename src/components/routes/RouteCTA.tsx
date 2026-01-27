"use client";

import Link from "next/link";
import { Zap, Calendar, Phone, Star, Users, CheckCircle, Shield } from "lucide-react";

interface RouteCTAProps {
  routeSlug?: string;
  stats?: {
    rating?: string;
    climbers?: string;
    successRate?: string;
    licensed?: boolean;
  };
}

export function RouteCTA({
  routeSlug,
  stats = {
    rating: "4.9/5",
    climbers: "2,500+",
    successRate: "92%",
    licensed: true,
  },
}: RouteCTAProps) {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%)",
        }}
      />

      {/* Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Icon */}
        <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Zap className="w-10 h-10 text-[var(--secondary)]" />
        </div>

        {/* Title */}
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
          Ready to Conquer Africa&apos;s Highest Peak?
        </h2>

        {/* Text */}
        <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
          Start your Kilimanjaro adventure today. Our expert team will help you
          choose the perfect route, departure date, and ensure you&apos;re fully
          prepared for the climb of a lifetime.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <Link
            href={routeSlug ? `#inquiry-form` : "/contact-us/"}
            className="inline-flex items-center gap-2.5 px-10 py-4 bg-[var(--secondary)] text-[var(--primary-dark)] font-heading text-lg font-bold rounded-lg hover:bg-[var(--secondary-light)] transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-[var(--secondary)]/30"
          >
            <Calendar className="w-5 h-5" />
            Book Your Climb
          </Link>
          <Link
            href="/contact-us/"
            className="inline-flex items-center gap-2.5 px-10 py-4 bg-transparent text-white font-heading text-lg font-semibold border-2 border-white/30 rounded-lg hover:bg-white/10 hover:border-white/50 transition-all"
          >
            <Phone className="w-5 h-5" />
            Talk to an Expert
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-8">
          <TrustItem icon={<Star className="w-4 h-4" fill="currentColor" />} text={`${stats.rating} Rating`} />
          <TrustItem icon={<Users className="w-4 h-4" />} text={`${stats.climbers} Climbers`} />
          <TrustItem icon={<CheckCircle className="w-4 h-4" />} text={`${stats.successRate} Success Rate`} />
          {stats.licensed && (
            <TrustItem icon={<Shield className="w-4 h-4" />} text="Licensed Operator" />
          )}
        </div>
      </div>
    </section>
  );
}

function TrustItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 text-white/70 text-sm">
      <span className="text-[var(--secondary)]">{icon}</span>
      {text}
    </div>
  );
}
