import { Metadata } from "next";
import { Users, Award, Heart, Shield } from "lucide-react";
import { generateMetadata as genMeta } from "@/lib/seo";

export const metadata: Metadata = genMeta({
  title: "About Us",
  description:
    "Snow Africa Adventure is a locally owned tour operator based in Arusha, Tanzania. Learn about our mission, team, and commitment to sustainable tourism.",
  url: "/about-us/",
});

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[var(--primary-dark)] to-[var(--text)] text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            About Snow Africa Adventure
          </h1>
          <p className="text-xl text-[var(--text-light)] max-w-2xl">
            Your trusted partner for authentic African adventures since 2010.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl font-bold mb-6">Our Story</h2>
            <div className="prose prose-slate prose-lg">
              <p>
                Snow Africa Adventure was founded with a simple mission: to share
                the wonders of Tanzania with travelers from around the world while
                supporting local communities and preserving our natural heritage.
              </p>
              <p>
                Based in Arusha, the gateway to Tanzania&apos;s Northern Circuit, we
                are a team of passionate locals who have grown up in the shadow of
                Mount Kilimanjaro and the vast Serengeti plains. This is our home,
                and we want to share it with you.
              </p>
              <p>
                Over the years, we have guided thousands of climbers to the summit
                of Kilimanjaro and led countless safari adventures through
                Tanzania&apos;s iconic national parks. Each journey is crafted with
                care, attention to detail, and genuine love for what we do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-center mb-10">
            What We Stand For
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-[var(--primary-light)] rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-[var(--primary)]" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Safety First</h3>
              <p className="text-sm text-[var(--text-muted)]">
                Your safety is our top priority. All our guides are certified and
                trained in wilderness first aid.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-[var(--primary-light)] rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-[var(--primary)]" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Responsible Tourism</h3>
              <p className="text-sm text-[var(--text-muted)]">
                We minimize our environmental impact and support conservation
                efforts across Tanzania.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-[var(--primary-light)] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-[var(--primary)]" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Community Support</h3>
              <p className="text-sm text-[var(--text-muted)]">
                We employ local staff and contribute to community development
                projects in the regions we operate.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-[var(--primary-light)] rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-[var(--primary)]" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Excellence</h3>
              <p className="text-sm text-[var(--text-muted)]">
                We strive for excellence in everything we do, from planning to
                execution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-center mb-10">
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-32 h-32 bg-[var(--border)] rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">👤</span>
              </div>
              <h3 className="font-semibold text-lg">Joseph Moshi</h3>
              <p className="text-[var(--primary)] text-sm">Founder & Lead Guide</p>
              <p className="text-[var(--text-muted)] text-sm mt-2">
                200+ successful Kilimanjaro summits
              </p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-[var(--border)] rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">👤</span>
              </div>
              <h3 className="font-semibold text-lg">Grace Kimaro</h3>
              <p className="text-[var(--primary)] text-sm">Operations Manager</p>
              <p className="text-[var(--text-muted)] text-sm mt-2">
                15 years in tourism industry
              </p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-[var(--border)] rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">👤</span>
              </div>
              <h3 className="font-semibold text-lg">Emmanuel Ole</h3>
              <p className="text-[var(--primary)] text-sm">Head Safari Guide</p>
              <p className="text-[var(--text-muted)] text-sm mt-2">
                Born and raised in Serengeti region
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-12 bg-[var(--primary)] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold mb-8">
            Certifications & Memberships
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="bg-white/10 px-6 py-3 rounded">TATO Member</div>
            <div className="bg-white/10 px-6 py-3 rounded">KPAP Partner</div>
            <div className="bg-white/10 px-6 py-3 rounded">
              TripAdvisor Certificate
            </div>
            <div className="bg-white/10 px-6 py-3 rounded">
              SafariBookings Verified
            </div>
          </div>
          <p className="mt-8 text-[var(--primary-light)] max-w-2xl mx-auto">
            We are proud members of the Tanzania Association of Tour Operators
            (TATO) and partners of the Kilimanjaro Porters Assistance Project
            (KPAP), ensuring fair treatment of all our mountain staff.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-4xl font-bold text-[var(--primary)]">15+</p>
              <p className="text-[var(--text-muted)]">Years Experience</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[var(--primary)]">5000+</p>
              <p className="text-[var(--text-muted)]">Happy Travelers</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[var(--primary)]">93%</p>
              <p className="text-[var(--text-muted)]">Summit Success</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[var(--primary)]">4.9</p>
              <p className="text-[var(--text-muted)]">TripAdvisor Rating</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
