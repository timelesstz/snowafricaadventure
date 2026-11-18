"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, Wrench, Users, Zap, Star } from "lucide-react";
import { InquiryForm } from "@/components/forms/InquiryForm";

interface RouteHeroProps {
  title: string;
  subtitle?: string;
  badge?: string;
  duration: string;
  difficulty?: string;
  successRate?: number;
  summitHeight?: string;
  image?: string;
}

export function RouteHero({
  title,
  subtitle,
  badge = "Most Popular Route",
  duration,
  difficulty = "Challenging",
  successRate = 92,
  summitHeight = "5,895m",
  image = "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp",
}: RouteHeroProps) {
  return (
    <section className="relative overflow-hidden bg-slate-800">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>

      {/* Overlay: even on small screens (text spans the full width), a
          left-to-right gradient on desktop where the form card sits right. */}
      <div className="absolute inset-0 pointer-events-none bg-slate-900/75 lg:hidden" />
      <div
        className="absolute inset-0 pointer-events-none hidden lg:block"
        style={{
          background:
            "linear-gradient(to right, rgba(30, 41, 59, 0.92) 0%, rgba(30, 41, 59, 0.75) 45%, rgba(30, 41, 59, 0.45) 100%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 lg:py-16 grid lg:grid-cols-[minmax(0,1fr)_400px] gap-8 lg:gap-12 items-end lg:min-h-[620px]">
      {/* Content */}
      <div>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-white/75 text-sm mb-4">
          <Link href="/" className="hover:text-[var(--secondary)] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/trekking/" className="hover:text-[var(--secondary)] transition-colors">
            Kilimanjaro
          </Link>
          <span>/</span>
          <span>{title}</span>
        </nav>

        {/* Badge */}
        <span className="inline-flex items-center gap-1.5 bg-[var(--secondary)] text-[var(--primary-dark)] px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide mb-4">
          <Star className="w-3.5 h-3.5" fill="currentColor" />
          {badge}
        </span>

        {/* Title */}
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-base sm:text-lg text-white/85 max-w-2xl mb-6 line-clamp-3 sm:line-clamp-none">{subtitle}</p>
        )}

        {/* Stats */}
        <div className="flex flex-wrap gap-6 md:gap-8">
          <StatItem
            icon={<Calendar className="w-5 h-5" />}
            value={duration}
            label="Duration"
          />
          <StatItem
            icon={<Wrench className="w-5 h-5" />}
            value={difficulty}
            label="Difficulty"
          />
          <StatItem
            icon={<Users className="w-5 h-5" />}
            value={`${successRate}%`}
            label="Success Rate"
          />
          <StatItem
            icon={<Zap className="w-5 h-5" />}
            value={summitHeight}
            label="Summit"
          />
        </div>
      </div>

      {/* Lead capture */}
      <div id="hero-quote" className="scroll-mt-24">
        <InquiryForm
          variant="hero"
          relatedTo={title}
          tripType="Kilimanjaro"
          heroTitle="Get your free climb quote"
          heroSubtitle={`Your price, dates and a day-by-day plan for the ${title}, sent within 24 hours.`}
        />
      </div>
      </div>
    </section>
  );
}

function StatItem({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-[var(--secondary)]">
        {icon}
      </div>
      <div className="text-white">
        <div className="font-heading font-bold text-lg">{value}</div>
        <div className="text-xs text-white/60 uppercase tracking-wide">{label}</div>
      </div>
    </div>
  );
}
