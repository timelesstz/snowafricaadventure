import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { Phone, Mail, MapPin, Clock, MessageCircle, ArrowRight } from "lucide-react";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { SITE_CONFIG, OFFICE_HOURS } from "@/lib/constants";
import { generateMetadata as genMeta, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import { getSiteStats, getTripAdvisorStats } from "@/lib/settings";
import { PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = genMeta({
  title: "Contact Us - Get a Free Quote",
  description:
    "Contact Snow Africa Adventure in Arusha, Tanzania. Free quotes for Kilimanjaro treks, wildlife safaris & Zanzibar holidays. Call +255 766 657 854 or email. We respond within 24 hours.",
  url: "/contact-us/",
});

const WHATSAPP_URL = `https://wa.me/${SITE_CONFIG.phone.replace(/\D/g, "")}`;

/** "08:00" → "8:00 AM" */
function formatTime(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${suffix}`;
}

const contactMethods: {
  icon: LucideIcon;
  title: string;
  value: string;
  note: string;
  href: string;
  external?: boolean;
  tone: string;
}[] = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: SITE_CONFIG.phone,
    note: "Fastest way to reach us",
    href: WHATSAPP_URL,
    external: true,
    tone: "bg-acacia-100 text-acacia-700",
  },
  {
    icon: Mail,
    title: "Email",
    value: SITE_CONFIG.email,
    note: "We reply within 24 hours",
    href: `mailto:${SITE_CONFIG.email}`,
    tone: "bg-amber-100 text-amber-700",
  },
  {
    icon: Phone,
    title: "Phone",
    value: SITE_CONFIG.phone,
    note: "During office hours (EAT)",
    href: `tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`,
    tone: "bg-slate-100 text-slate-700",
  },
];

// Answers match /terms-and-conditions/ and /faq/; the terms page is the source of truth.
const faqs = [
  {
    question: "How far in advance should I book?",
    answer:
      "We recommend booking at least 3-6 months in advance, especially for peak seasons (June-October and December-February).",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "For Kilimanjaro climbs and safaris: more than 60 days before departure, a full refund minus a $100 admin fee; 31-60 days, 50%; 15-30 days, 25%; under 15 days, no refund. Group departures and day trips have their own terms, listed in our terms and conditions.",
  },
  {
    question: "Do I need travel insurance?",
    answer:
      "Yes, comprehensive travel insurance covering medical evacuation is mandatory for all Kilimanjaro climbs and highly recommended for safaris.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept bank transfers, credit cards (Visa/Mastercard), and mobile money (M-Pesa). A 20% deposit secures your booking for all safaris and Kilimanjaro/trekking routes, with the balance due 2 weeks before departure.",
  },
];

const destinations = [
  {
    href: "/trekking/",
    title: "Kilimanjaro",
    description: "Conquer Africa's highest peak",
    image: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp",
  },
  {
    href: "/tanzania-safaris/",
    title: "Safaris",
    description: "Witness the great migration",
    image: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/06/close-up-wild-lions-serengeti-national-park-scaled.jpg",
  },
  {
    href: "/zanzibar/",
    title: "Zanzibar",
    description: "Paradise beaches await",
    image: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/Zanzibar-Beach-Holiday.webp",
  },
  {
    href: "/tanzania-day-tours/",
    title: "Tanzania Day Tours",
    description: "Local adventures",
    image: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/06/materuni-waterfalls-tour.webp",
  },
];

function InfoRow({ icon: Icon, title, children }: { icon: LucideIcon; title: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-11 h-11 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-amber-700" aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <h3 className="font-semibold text-slate-900 mb-1">{title}</h3>
        {children}
      </div>
    </div>
  );
}

const socialIcons: Record<string, string> = {
  Instagram:
    "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  Facebook:
    "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  TripAdvisor:
    "M12.006 4.295c-2.67 0-5.338.784-7.645 2.353H0l1.963 2.135a5.997 5.997 0 0 0 4.04 10.43 5.976 5.976 0 0 0 4.075-1.6L12 19.705l1.922-2.09a5.972 5.972 0 0 0 4.072 1.598 6 6 0 0 0 4.041-10.43L24 6.649h-4.35a13.573 13.573 0 0 0-7.644-2.354zM12 6.255c1.531 0 3.063.303 4.504.912C13.456 8.453 12 11.837 12 11.837s-1.455-3.384-4.5-4.67A11.61 11.61 0 0 1 12 6.256zM6.002 9.157a4.059 4.059 0 1 1 0 8.118 4.059 4.059 0 0 1 0-8.118zm11.992 0a4.059 4.059 0 1 1 .003 8.115 4.059 4.059 0 0 1-.003-8.115zm-11.992 1.93a2.13 2.13 0 1 0 0 4.258 2.13 2.13 0 0 0 0-4.257zm11.992 0a2.13 2.13 0 1 0 0 4.258 2.13 2.13 0 0 0 0-4.257z",
};

export default async function ContactPage() {
  const [stats, tripAdvisor] = await Promise.all([getSiteStats(), getTripAdvisorStats()]);

  const socials = [
    { name: "Instagram", href: SITE_CONFIG.social.instagram },
    { name: "Facebook", href: SITE_CONFIG.social.facebook },
    { name: "TripAdvisor", href: tripAdvisor.url },
  ];

  const trustStats = [
    { value: stats.travelers, label: "Happy Travelers" },
    { value: stats.success, label: "Summit Success" },
    { value: stats.experience, label: "Years Experience" },
  ];

  return (
    <div className="bg-white">
      <MultiJsonLd
        schemas={[
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Contact Us", url: "/contact-us/" },
          ]),
          generateFAQSchema(faqs),
        ]}
      />

      <PageHero pageSlug="contact-us" />

      {/* Quick contact: the number and address are visible, not just the channel name */}
      <section className="py-8 border-b border-slate-200" aria-label="Quick contact">
        <div className="container mx-auto px-4">
          <div className="grid gap-4 lg:grid-cols-3 lg:gap-6">
            {contactMethods.map((method) => {
              const Icon = method.icon;
              return (
                <a
                  key={method.title}
                  href={method.href}
                  {...(method.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-4 p-4 rounded-xl border border-slate-200 bg-white transition-all hover:border-amber-400 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
                >
                  <div className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center ${method.tone}`}>
                    <Icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{method.title}</p>
                    <p className="font-semibold text-slate-900 break-words group-hover:text-amber-700">{method.value}</p>
                    <p className="text-sm text-slate-500">{method.note}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form first on phones (it's the goal of the page); info column first on desktop */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
            <div className="order-2 lg:order-1 lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                  Contact Information
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  Our team of travel experts is ready to help you create the perfect
                  Tanzanian adventure. Reach out through any of the channels below.
                </p>
              </div>

              <div className="space-y-6">
                <InfoRow icon={MapPin} title="Office Location">
                  <address className="not-italic text-slate-600">
                    {SITE_CONFIG.address.street}
                    <br />
                    {SITE_CONFIG.address.city}, {SITE_CONFIG.address.country}
                  </address>
                </InfoRow>

                <InfoRow icon={Clock} title="Office Hours">
                  <dl className="text-slate-600 grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5">
                    {OFFICE_HOURS.map((h) => (
                      <div key={h.label} className="contents">
                        <dt>{h.label}:</dt>
                        <dd>
                          {formatTime(h.opens)} – {formatTime(h.closes)}
                        </dd>
                      </div>
                    ))}
                    <dt>Sunday:</dt>
                    <dd>Closed</dd>
                  </dl>
                  <p className="mt-1 text-sm text-slate-500">East Africa Time (UTC+3). WhatsApp messages are answered outside these hours too.</p>
                </InfoRow>

                <InfoRow icon={MessageCircle} title="Follow Us">
                  <ul className="flex gap-3 mt-2">
                    {socials.map((s) => (
                      <li key={s.name}>
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Snow Africa Adventure on ${s.name} (opens in a new tab)`}
                          className="w-11 h-11 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 transition-colors hover:bg-amber-100 hover:text-amber-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d={socialIcons[s.name]} />
                          </svg>
                        </a>
                      </li>
                    ))}
                  </ul>
                </InfoRow>
              </div>

              <div className="pt-8 border-t border-slate-200">
                <p className="text-sm text-slate-500 mb-4">Trusted by travelers worldwide</p>
                <dl className="grid grid-cols-3 gap-4">
                  {trustStats.map((s) => (
                    <div key={s.label} className="flex flex-col-reverse">
                      <dt className="text-xs text-slate-500">{s.label}</dt>
                      <dd className="text-2xl font-bold text-amber-700">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div className="order-1 lg:order-2 lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-5 sm:p-8">
                <div className="mb-6 sm:mb-8">
                  <h2 className="font-heading text-2xl font-bold text-slate-900 mb-2">Send Us a Message</h2>
                  <p className="text-slate-600">
                    Fill out the form below and we&apos;ll get back to you with a personalized proposal.
                  </p>
                </div>
                <InquiryForm variant="full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">Explore Our Destinations</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Not sure where to start? Explore our most popular adventures and find the perfect trip for you.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((dest) => (
              <Link key={dest.href} href={dest.href} className="group relative aspect-[4/5] rounded-2xl overflow-hidden">
                <Image
                  src={dest.image}
                  alt={dest.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-heading text-xl font-bold text-white mb-1">{dest.title}</h3>
                  <p className="text-white/80 text-sm mb-3">{dest.description}</p>
                  <span className="inline-flex items-center gap-1 text-amber-400 text-sm font-medium group-hover:gap-2 transition-all">
                    Learn more <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl font-bold text-slate-900 mb-3">Frequently Asked Questions</h2>
              <p className="text-slate-600">Quick answers to common questions</p>
            </div>

            <div className="space-y-4 mb-8">
              {faqs.map((faq) => (
                <div key={faq.question} className="bg-white rounded-xl p-5 border border-slate-200">
                  <h3 className="font-semibold text-slate-900 mb-2">{faq.question}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-slate-500 mb-8">
              Full booking, payment and cancellation terms:{" "}
              <Link href="/terms-and-conditions/" className="font-medium text-amber-700 underline underline-offset-2 hover:text-amber-800">
                terms and conditions
              </Link>
              .
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/faq/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 rounded-lg text-[var(--primary-dark)] font-medium hover:bg-amber-600 transition-colors"
              >
                Read More FAQs
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-100 transition-colors"
              >
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
