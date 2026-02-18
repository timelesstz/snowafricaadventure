import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check, Users, Calendar, MapPin, Star, ChevronDown, Shield, Compass } from "lucide-react";
import { TailorMadeForm } from "@/components/forms/TailorMadeForm";
import { generateMetadata as genMeta } from "@/lib/seo";
import { prisma } from "@/lib/prisma";
import { getExperienceYears } from "@/lib/settings";
import { CmsPageRenderer } from "@/app/(site)/p/[slug]/CmsPageRenderer";

export const metadata: Metadata = genMeta({
  title: "Tailor-Made Safari",
  description:
    "Create your perfect Tanzania safari with our custom itinerary service. We design unique journeys based on your interests, budget, and travel style.",
  url: "/tailor-made-safari/",
});

const steps = [
  {
    number: "01",
    title: "Tell Us Your Dreams",
    description:
      "Share your interests, travel dates, group size, budget, and what you'd love to experience in Tanzania.",
  },
  {
    number: "02",
    title: "Receive Your Custom Itinerary",
    description:
      "Our experts design a unique journey tailored to your preferences, complete with accommodation options.",
  },
  {
    number: "03",
    title: "Refine Together",
    description:
      "We'll work with you to adjust the itinerary until it's perfect. No pressure, no rush.",
  },
  {
    number: "04",
    title: "Book & Adventure",
    description:
      "Confirm your trip with a deposit, and we'll handle all the logistics. You just show up and enjoy!",
  },
];

const experiences = [
  {
    title: "Classic Safari",
    description:
      "Experience the iconic Northern Circuit - Serengeti, Ngorongoro, Tarangire, and Lake Manyara.",
    image:
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/Serengeri-National-Park.jpg",
  },
  {
    title: "Great Migration",
    description:
      "Witness the world's greatest wildlife spectacle with river crossings and predator action.",
    image:
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/32535628638_2be6219332_k-2.jpg",
  },
  {
    title: "Kilimanjaro + Safari",
    description:
      "Combine the adventure of climbing Africa's highest peak with wildlife encounters.",
    image:
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp",
  },
  {
    title: "Family Safari",
    description:
      "Kid-friendly adventures with shorter drives, engaging activities, and family lodges.",
    image:
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/Tarangire-National-Park.jpg",
  },
  {
    title: "Honeymoon & Romance",
    description:
      "Intimate camps, private game drives, and sunset champagne in the bush.",
    image:
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/05/ngorongoro-crater-ngorongoro-conservation-area.jpg",
  },
  {
    title: "Photography Safari",
    description:
      "Specialized vehicles, flexible timing, and expert guidance for the perfect shot.",
    image:
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/06/close-up-wild-lions-serengeti-national-park-scaled.jpg",
  },
];

const testimonials = [
  {
    quote:
      "Snow Africa created the perfect honeymoon for us. Every detail was thought of, and the surprise sunset dinner in the Serengeti was magical!",
    author: "Sarah & James",
    location: "United Kingdom",
    trip: "14-Day Honeymoon Safari",
  },
  {
    quote:
      "Traveling with three kids ages 5-12, I was nervous about logistics. The team designed an amazing family adventure that kept everyone engaged.",
    author: "The Martinez Family",
    location: "United States",
    trip: "10-Day Family Safari",
  },
  {
    quote:
      "As a solo female traveler, safety was my priority. I felt completely taken care of throughout my 12-day adventure.",
    author: "Emma L.",
    location: "Australia",
    trip: "12-Day Solo Adventure",
  },
];

export default async function TailorMadeSafariPage() {
  const experienceYears = await getExperienceYears();

  // Check if CMS version exists
  let cmsPage = null;
  try {
    cmsPage = await prisma.cmsPage.findUnique({
      where: { slug: "tailor-made-safari" },
    });
  } catch {
    // Fall through to hardcoded version
  }

  if (cmsPage && cmsPage.status === "PUBLISHED") {
    return (
      <div>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <CmsPageRenderer data={cmsPage.puckData as any} />
      </div>
    );
  }

  // Fallback: hardcoded version
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[70vh]">
        <div className="absolute inset-0">
          <Image
            src="https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/05/safaritanzania.jpg"
            alt="Custom Safari Tanzania"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-4 py-1.5 bg-[var(--secondary)] text-white rounded-full text-sm font-semibold">
                Custom Itineraries
              </span>
              <div className="flex items-center gap-1 text-white/80">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-sm">4.9 Rating &bull; 115+ Reviews</span>
              </div>
            </div>

            <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Your Safari, <br />
              <span className="text-[var(--secondary)]">Your Way</span>
            </h1>

            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              No fixed itineraries. No compromises. We create unique Tanzania
              journeys designed entirely around your dreams, budget, and travel style.
            </p>

            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2 text-white">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">100%</p>
                  <p className="text-sm text-white/70">Customizable</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-white">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{experienceYears}</p>
                  <p className="text-sm text-white/70">Years Experience</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-white">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">Private</p>
                  <p className="text-sm text-white/70">Guided Tours</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="#inquiry-form"
                className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
              >
                Start Planning
              </a>
              <Link
                href="/tanzania-safaris/"
                className="inline-block border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                View Packages
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 flex flex-col items-center gap-1 z-10">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>
      </section>

      {/* Why Tailor-Made */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider">
              Why Choose Us
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 mt-2">
              Why Choose a Tailor-Made Safari?
            </h2>
            <p className="text-[var(--text-muted)] text-lg mb-10">
              Every traveler is unique. A family with young children has
              different needs than a couple celebrating their honeymoon or a
              photography enthusiast chasing the perfect shot. Our custom
              safaris ensure your trip matches your dreams perfectly.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-7 h-7 text-amber-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Flexible Timing</h3>
                <p className="text-sm text-[var(--text-muted)]">
                  Travel on your schedule, not ours. Any duration, any dates.
                </p>
              </div>
              <div className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-7 h-7 text-amber-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Your Destinations</h3>
                <p className="text-sm text-[var(--text-muted)]">
                  Mix popular parks with hidden gems based on your interests.
                </p>
              </div>
              <div className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-7 h-7 text-amber-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Private Experience</h3>
                <p className="text-sm text-[var(--text-muted)]">
                  Your own vehicle, guide, and schedule. No sharing with
                  strangers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-[var(--primary-dark)] text-white">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Simple Process
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {steps.map((step) => (
              <div
                key={step.number}
                className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
              >
                <div className="text-4xl font-bold text-[var(--secondary)] mb-3">
                  {step.number}
                </div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-white/70 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Types */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Safari Styles
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
            Popular Safari Styles
          </h2>
          <p className="text-[var(--text-muted)] text-center mb-12 max-w-2xl mx-auto">
            Whether you&apos;re seeking adventure, relaxation, or wildlife
            encounters, we&apos;ll create the perfect experience.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiences.map((exp) => (
              <div
                key={exp.title}
                className="group bg-white border border-[var(--border)] rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={exp.image}
                    alt={exp.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{exp.title}</h3>
                  <p className="text-[var(--text-muted)] text-sm">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            All Inclusive
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-10">
            Every Tailor-Made Safari Includes
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              "Personal safari consultant",
              "Custom itinerary design",
              "Private 4x4 safari vehicle",
              "Expert English-speaking guide",
              "All park entry fees",
              "Accommodation as selected",
              "All meals during safari",
              "Airport/hotel transfers",
              "Drinking water in vehicle",
              "24/7 support during your trip",
              "Flexible payment options",
              "No booking fees",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-white p-4 rounded-lg border border-[var(--border)] shadow-sm"
              >
                <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-emerald-600" />
                </div>
                <span className="text-[var(--text)]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Testimonials
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-10">
            Stories from Our Travelers
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((test, i) => (
              <div
                key={i}
                className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-[var(--text-muted)] mb-4 italic leading-relaxed">
                  &ldquo;{test.quote}&rdquo;
                </p>
                <div className="border-t border-[var(--border)] pt-4">
                  <p className="font-semibold">{test.author}</p>
                  <p className="text-sm text-[var(--text-muted)]">{test.location}</p>
                  <p className="text-sm text-[var(--secondary-dark)] font-medium">{test.trip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="inquiry-form" className="py-16 bg-[var(--muted)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider mb-2">
                Get Started
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Let&apos;s Plan Your Safari
              </h2>
              <p className="text-[var(--text-muted)]">
                The more details you share, the better we can tailor your
                perfect Tanzania adventure. We&apos;ll respond within 24-48 hours.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-[var(--border)]">
              <TailorMadeForm />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
              FAQ
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-10">
              Common Questions
            </h2>
            <div className="space-y-4">
              <div className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold mb-2">
                  How far in advance should I book?
                </h3>
                <p className="text-[var(--text-muted)]">
                  We recommend 3-6 months for peak season (July-October,
                  December-February) to secure the best lodges. Shorter notice
                  is possible during shoulder seasons.
                </p>
              </div>
              <div className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold mb-2">
                  What&apos;s the minimum duration for a safari?
                </h3>
                <p className="text-[var(--text-muted)]">
                  While we offer day trips, we recommend at least 3-4 days for a
                  proper safari experience. 5-7 days allows you to explore
                  multiple parks without rushing.
                </p>
              </div>
              <div className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold mb-2">
                  Can you accommodate special requirements?
                </h3>
                <p className="text-[var(--text-muted)]">
                  Absolutely! Whether it&apos;s dietary restrictions, mobility
                  considerations, or specific interests like bird watching or
                  photography, we&apos;ll customize accordingly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary)] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Your Adventure Awaits
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
            Don&apos;t settle for a generic package tour. Let us create
            something special, just for you.
          </p>
          <a
            href="#inquiry-form"
            className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
          >
            Start Your Custom Safari
          </a>
        </div>
      </section>
    </div>
  );
}
