import { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { SITE_CONFIG } from "@/lib/constants";
import { generateMetadata as genMeta } from "@/lib/seo";

export const metadata: Metadata = genMeta({
  title: "Contact Us",
  description:
    "Get in touch with Snow Africa Adventure. Contact us for Kilimanjaro treks, Tanzania safaris, and Zanzibar holidays. We respond within 24 hours.",
  url: "/contact-us/",
});

export default function ContactPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-[var(--primary-light)] max-w-2xl">
            Ready to start your adventure? Get in touch and we&apos;ll help you
            plan the trip of a lifetime.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="font-heading text-2xl font-bold mb-6">
                Get In Touch
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[var(--primary-light)] rounded-full flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-[var(--primary)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <a
                      href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`}
                      className="text-[var(--primary)] hover:text-[var(--primary-dark)]"
                    >
                      {SITE_CONFIG.phone}
                    </a>
                    <p className="text-sm text-[var(--text-muted)] mt-1">
                      WhatsApp available
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[var(--primary-light)] rounded-full flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-[var(--primary)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a
                      href={`mailto:${SITE_CONFIG.email}`}
                      className="text-[var(--primary)] hover:text-[var(--primary-dark)]"
                    >
                      {SITE_CONFIG.email}
                    </a>
                    <p className="text-sm text-[var(--text-muted)] mt-1">
                      We respond within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[var(--primary-light)] rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[var(--primary)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Office</h3>
                    <p className="text-[var(--text-muted)]">
                      {SITE_CONFIG.address.street}
                      <br />
                      {SITE_CONFIG.address.city}, {SITE_CONFIG.address.country}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[var(--primary-light)] rounded-full flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-[var(--primary)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Office Hours</h3>
                    <p className="text-[var(--text-muted)]">
                      Monday - Saturday: 8:00 AM - 6:00 PM (EAT)
                      <br />
                      Sunday: 9:00 AM - 3:00 PM (EAT)
                    </p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="mt-8">
                <div className="aspect-video bg-[var(--border)] rounded-lg flex items-center justify-center">
                  <div className="text-center text-[var(--text-muted)]">
                    <MapPin className="w-12 h-12 mx-auto mb-2" />
                    <p>Map - Arusha, Tanzania</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="font-heading text-2xl font-bold mb-6">
                Send Us a Message
              </h2>
              <div className="bg-[var(--surface)] rounded-lg p-6">
                <InquiryForm variant="full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-12 bg-[var(--muted)]">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-center mb-8">
            Explore Our Destinations
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/trekking/"
              className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
            >
              <span className="text-4xl mb-3 block">🏔️</span>
              <h3 className="font-semibold">Kilimanjaro</h3>
            </Link>
            <Link
              href="/tanzania-safaris/"
              className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
            >
              <span className="text-4xl mb-3 block">🦁</span>
              <h3 className="font-semibold">Safaris</h3>
            </Link>
            <Link
              href="/zanzibar/"
              className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
            >
              <span className="text-4xl mb-3 block">🏝️</span>
              <h3 className="font-semibold">Zanzibar</h3>
            </Link>
            <Link
              href="/day-trips/"
              className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
            >
              <span className="text-4xl mb-3 block">🚗</span>
              <h3 className="font-semibold">Day Trips</h3>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
