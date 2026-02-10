"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Clock, ChevronDown, Calendar, Users } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface TourDetailHeroProps {
  title: string;
  subtitle?: string;
  heroImage: string;
  badges: string[];
  duration: number;
  parks: number;
  gameDrives: number;
  rating: number;
  price: number;
  spotsLeft?: number;
}

export function TourDetailHero({
  title,
  subtitle,
  heroImage,
  badges,
  duration,
  parks,
  gameDrives,
  rating,
  price,
  spotsLeft = 3,
}: TourDetailHeroProps) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage}
          alt={title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              135deg,
              rgba(30, 41, 59, 0.92) 0%,
              rgba(51, 65, 85, 0.85) 50%,
              rgba(30, 41, 59, 0.75) 100%
            )`
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-[1fr_420px] gap-8 lg:gap-16 items-center">
          {/* Left - Hero Content */}
          <div className="text-white">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-[13px] font-medium text-white/70 mb-8">
              <Link href="/" className="hover:text-[var(--secondary)] transition-colors">Home</Link>
              <span>/</span>
              <Link href="/tanzania-safaris/" className="hover:text-[var(--secondary)] transition-colors">Tanzania Safaris</Link>
              <span>/</span>
              <span className="text-white/50">{title.split(' ').slice(0, 3).join(' ')}...</span>
            </nav>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {badges.map((badge, index) => (
                <span
                  key={index}
                  className={`
                    inline-flex items-center gap-1.5 px-4 py-2 rounded-full
                    font-heading text-[13px] font-semibold
                    ${index === 0
                      ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                      : index === 1
                        ? 'bg-[var(--secondary)]/20 text-[var(--secondary-light)] border border-[var(--secondary)]/30'
                        : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    }
                  `}
                >
                  {index === 0 && <Check className="w-3.5 h-3.5" />}
                  {badge}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight mb-6">
              {title.split('&').map((part, i) => (
                <span key={i}>
                  {i === 0 ? (
                    <>
                      {part.split(' ').slice(0, -1).join(' ')}{' '}
                      <span className="text-[var(--secondary)]">{part.split(' ').slice(-1)}</span>
                    </>
                  ) : (
                    <> &{part}</>
                  )}
                </span>
              ))}
            </h1>

            {/* Subtitle */}
            {subtitle && (
              <p className="text-lg sm:text-xl text-white/85 max-w-[550px] leading-relaxed mb-10">
                {subtitle}
              </p>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-6 border-y border-white/15 mb-8">
              {[
                { value: duration, label: 'Days' },
                { value: parks, label: 'Parks' },
                { value: gameDrives, label: 'Game Drives' },
                { value: rating, label: 'Rating' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-heading text-2xl sm:text-3xl font-extrabold text-[var(--secondary)] tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-[13px] text-white/60 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Trust Items */}
            <div className="flex flex-wrap gap-6">
              {['Expert safari guides', '4x4 Land Cruisers', 'Full board included'].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-white/80">
                  <Check className="w-[18px] h-[18px] text-green-400" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Right - Booking Card */}
          <div className="bg-white rounded-sm overflow-hidden shadow-2xl">
            {/* Top Accent */}
            <div
              className="h-1"
              style={{ background: 'linear-gradient(90deg, var(--secondary) 0%, var(--secondary-light) 100%)' }}
            />

            {/* Price Header */}
            <div className="text-center p-6 border-b border-[var(--border)]">
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-sm text-[var(--text-muted)]">From</span>
                <span className="font-heading text-4xl font-extrabold text-[var(--text)] tracking-tight">
                  {formatPrice(price)}
                </span>
                <span className="text-[15px] text-[var(--text-muted)]">/ person</span>
              </div>
              <div className="flex items-center justify-center gap-2 mt-4 px-4 py-2 bg-[var(--secondary)]/10 rounded-sm text-[13px] text-[var(--secondary-dark)] font-medium">
                <Clock className="w-4 h-4" />
                Only {spotsLeft} spots left for February 2025
              </div>
            </div>

            {/* Form */}
            <div className="p-6">
              <form className="space-y-4">
                <div>
                  <label className="block font-heading text-[13px] font-semibold text-[var(--text)] mb-1">
                    Preferred Start Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      className="w-full px-4 py-3 border border-[var(--border)] rounded-sm font-sans text-[15px] text-[var(--text)] focus:outline-none focus:border-[var(--secondary)] focus:ring-2 focus:ring-[var(--secondary)]/15 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-heading text-[13px] font-semibold text-[var(--text)] mb-1">
                      Travelers
                    </label>
                    <select className="w-full px-4 py-3 border border-[var(--border)] rounded-sm font-sans text-[15px] text-[var(--text)] bg-white focus:outline-none focus:border-[var(--secondary)] focus:ring-2 focus:ring-[var(--secondary)]/15 transition-all appearance-none cursor-pointer">
                      <option>1 Person</option>
                      <option>2 People</option>
                      <option>3 People</option>
                      <option>4 People</option>
                      <option>5+ People</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-heading text-[13px] font-semibold text-[var(--text)] mb-1">
                      Safari Type
                    </label>
                    <select className="w-full px-4 py-3 border border-[var(--border)] rounded-sm font-sans text-[15px] text-[var(--text)] bg-white focus:outline-none focus:border-[var(--secondary)] focus:ring-2 focus:ring-[var(--secondary)]/15 transition-all appearance-none cursor-pointer">
                      <option>Private Safari</option>
                      <option>Join Group</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-heading text-[13px] font-semibold text-[var(--text)] mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 border border-[var(--border)] rounded-sm font-sans text-[15px] text-[var(--text)] placeholder:text-[var(--text-light)] focus:outline-none focus:border-[var(--secondary)] focus:ring-2 focus:ring-[var(--secondary)]/15 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[var(--secondary)] text-white font-heading font-semibold rounded-sm hover:bg-[var(--secondary-dark)] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[var(--secondary)]/25 transition-all mt-2"
                >
                  <Calendar className="w-5 h-5" />
                  Check Availability
                </button>
              </form>

              {/* Features */}
              <div className="mt-6 pt-6 border-t border-[var(--border)] space-y-2">
                {[
                  'Free cancellation up to 30 days before',
                  'No hidden fees - price is all-inclusive',
                  'Secure payment with instant confirmation',
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-[13px] text-[var(--text-muted)]">
                    <Check className="w-4 h-4 text-green-500" />
                    {feature}
                  </div>
                ))}
              </div>

              {/* Group Dates Link */}
              <Link
                href="/safari-group-departures"
                className="flex items-center justify-center gap-2 mt-4 p-4 bg-[var(--surface)] rounded-sm text-[var(--primary)] font-heading text-sm font-semibold hover:bg-[var(--surface-elevated)] transition-colors"
              >
                <Users className="w-[18px] h-[18px]" />
                View Fixed Group Departure Dates
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 text-xs animate-bounce">
        <span>Scroll to explore</span>
        <ChevronDown className="w-6 h-6" />
      </div>
    </section>
  );
}
