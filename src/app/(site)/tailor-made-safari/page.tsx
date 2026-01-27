import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check, Users, Calendar, MapPin, Star } from "lucide-react";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { generateMetadata as genMeta } from "@/lib/seo";

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
    image: "/images/experiences/classic.jpg",
  },
  {
    title: "Great Migration",
    description:
      "Witness the world's greatest wildlife spectacle with river crossings and predator action.",
    image: "/images/experiences/migration.jpg",
  },
  {
    title: "Kilimanjaro + Safari",
    description:
      "Combine the adventure of climbing Africa's highest peak with wildlife encounters.",
    image: "/images/experiences/kili-safari.jpg",
  },
  {
    title: "Family Safari",
    description:
      "Kid-friendly adventures with shorter drives, engaging activities, and family lodges.",
    image: "/images/experiences/family.jpg",
  },
  {
    title: "Honeymoon & Romance",
    description:
      "Intimate camps, private game drives, and sunset champagne in the bush.",
    image: "/images/experiences/honeymoon.jpg",
  },
  {
    title: "Photography Safari",
    description:
      "Specialized vehicles, flexible timing, and expert guidance for the perfect shot.",
    image: "/images/experiences/photography.jpg",
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

export default function TailorMadeSafariPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px]">
        <Image
          src="/images/tailor-made-hero.jpg"
          alt="Custom Safari Tanzania"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-xl">
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-4">
                Your Safari, Your Way
              </h1>
              <p className="text-xl text-white/90 mb-6">
                No fixed itineraries. No compromises. We create unique Tanzania
                journeys designed around you.
              </p>
              <a
                href="#inquiry-form"
                className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                Start Planning
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Tailor-Made */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl font-bold mb-4">
              Why Choose a Tailor-Made Safari?
            </h2>
            <p className="text-[var(--text-muted)] text-lg mb-8">
              Every traveler is unique. A family with young children has
              different needs than a couple celebrating their honeymoon or a
              photography enthusiast chasing the perfect shot. Our custom
              safaris ensure your trip matches your dreams perfectly.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-[var(--surface)] rounded-lg p-6">
                <div className="w-12 h-12 bg-[var(--primary-light)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-[var(--primary)]" />
                </div>
                <h3 className="font-semibold mb-2">Flexible Timing</h3>
                <p className="text-sm text-[var(--text-muted)]">
                  Travel on your schedule, not ours. Any duration, any dates.
                </p>
              </div>
              <div className="bg-[var(--surface)] rounded-lg p-6">
                <div className="w-12 h-12 bg-[var(--primary-light)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-[var(--primary)]" />
                </div>
                <h3 className="font-semibold mb-2">Your Destinations</h3>
                <p className="text-sm text-[var(--text-muted)]">
                  Mix popular parks with hidden gems based on your interests.
                </p>
              </div>
              <div className="bg-[var(--surface)] rounded-lg p-6">
                <div className="w-12 h-12 bg-[var(--primary-light)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-[var(--primary)]" />
                </div>
                <h3 className="font-semibold mb-2">Private Experience</h3>
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
      <section className="py-12 bg-[var(--primary)] text-white">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-center mb-10">
            How It Works
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="text-4xl font-bold text-[var(--secondary)] mb-3">
                  {step.number}
                </div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-[var(--primary-light)] text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Types */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-center mb-4">
            Popular Safari Styles
          </h2>
          <p className="text-[var(--text-muted)] text-center mb-10 max-w-2xl mx-auto">
            Whether you&apos;re seeking adventure, relaxation, or wildlife
            encounters, we&apos;ll create the perfect experience.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiences.map((exp) => (
              <div
                key={exp.title}
                className="group bg-white border border-[var(--border)] rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={exp.image}
                    alt={exp.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
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
      <section className="py-12 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-center mb-10">
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
              <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-lg">
                <Check className="w-5 h-5 text-[var(--primary)] shrink-0" />
                <span className="text-[var(--text)]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-center mb-10">
            Stories from Our Travelers
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((test, i) => (
              <div key={i} className="bg-white border border-[var(--border)] rounded-lg p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      className="w-4 h-4 fill-[var(--secondary)] text-[var(--secondary)]"
                    />
                  ))}
                </div>
                <p className="text-[var(--text-muted)] mb-4 italic">&ldquo;{test.quote}&rdquo;</p>
                <div className="border-t border-[var(--muted)] pt-4">
                  <p className="font-semibold">{test.author}</p>
                  <p className="text-sm text-[var(--text-muted)]">{test.location}</p>
                  <p className="text-sm text-[var(--primary)]">{test.trip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="inquiry-form" className="py-12 bg-[var(--muted)]">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-heading text-3xl font-bold mb-4">
                Let&apos;s Plan Your Safari
              </h2>
              <p className="text-[var(--text-muted)]">
                Tell us about your dream trip and we&apos;ll get back to you
                within 24 hours with a custom proposal. No obligation, no spam.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <InquiryForm
                variant="full"
                relatedTo="Tailor-Made Safari"
                tripType="safari"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ-ish */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-center mb-10">
              Common Questions
            </h2>
            <div className="space-y-6">
              <div className="bg-[var(--surface)] rounded-lg p-6">
                <h3 className="font-semibold mb-2">
                  How far in advance should I book?
                </h3>
                <p className="text-[var(--text-muted)]">
                  We recommend 3-6 months for peak season (July-October,
                  December-February) to secure the best lodges. Shorter notice
                  is possible during shoulder seasons.
                </p>
              </div>
              <div className="bg-[var(--surface)] rounded-lg p-6">
                <h3 className="font-semibold mb-2">
                  What&apos;s the minimum duration for a safari?
                </h3>
                <p className="text-[var(--text-muted)]">
                  While we offer day trips, we recommend at least 3-4 days for a
                  proper safari experience. 5-7 days allows you to explore
                  multiple parks without rushing.
                </p>
              </div>
              <div className="bg-[var(--surface)] rounded-lg p-6">
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
      <section className="py-12 bg-[var(--primary)] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">
            Your Adventure Awaits
          </h2>
          <p className="text-[var(--primary-light)] mb-6 max-w-2xl mx-auto">
            Don&apos;t settle for a generic package tour. Let us create
            something special, just for you.
          </p>
          <a
            href="#inquiry-form"
            className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
          >
            Start Your Custom Safari
          </a>
        </div>
      </section>
    </div>
  );
}
