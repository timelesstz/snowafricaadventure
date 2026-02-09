import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, Clock, Camera, Star } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { generateMetadata as genMeta } from "@/lib/seo";
import { SafariCard } from "@/components/cards/SafariCard";

interface Props {
  params: Promise<{ destSlug: string }>;
}

async function getDestination(slug: string) {
  try {
    const destination = await prisma.destination.findUnique({
      where: { slug },
      include: {
        safaris: {
          where: { safari: { isActive: true } },
          take: 3,
          include: { safari: true },
        },
      },
    });
    return destination;
  } catch {
    return null;
  }
}

// Placeholder data for development
const placeholderDestinations: Record<string, {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  heroImage: string;
  galleryImages: string[];
  highlights: string[];
  bestTimeToVisit: string;
  location: string;
  wildlife: string[];
  activities: string[];
}> = {
  "serengeti-national-park": {
    id: "1",
    name: "Serengeti National Park",
    slug: "serengeti-national-park",
    shortDescription:
      "The endless plains of Serengeti host the Great Migration and offer unparalleled wildlife viewing year-round.",
    description: `
      The Serengeti is Tanzania's oldest and most popular national park, and with good reason.
      The name "Serengeti" comes from the Maasai word "siringet" meaning "endless plains" -
      a perfect description of the 14,763 square kilometers of grassland, savanna, and woodland
      that make up this UNESCO World Heritage Site.

      The park is most famous for hosting the Great Migration, one of the most spectacular
      wildlife events on Earth. Each year, over 1.5 million wildebeest, accompanied by hundreds
      of thousands of zebras and gazelles, make their circular journey in search of fresh grazing.

      Beyond the migration, the Serengeti offers exceptional year-round wildlife viewing.
      The park is home to all of the Big Five - lion, leopard, elephant, buffalo, and rhino -
      as well as cheetahs, hyenas, giraffes, and over 500 bird species.
    `,
    heroImage: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/Serengeri-National-Park.jpg",
    galleryImages: [
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/Serengeri-National-Park.jpg",
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/32535628638_2be6219332_k-2.jpg",
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/05/safaritanzania.jpg",
    ],
    highlights: [
      "Great Migration",
      "Big Five",
      "Endless Plains",
      "Hot Air Balloons",
    ],
    bestTimeToVisit:
      "June to October for dry season; December to March for calving season",
    location: "Northern Tanzania, 335 km from Arusha",
    wildlife: [
      "Lion",
      "Leopard",
      "Elephant",
      "Buffalo",
      "Rhino",
      "Cheetah",
      "Wildebeest",
      "Zebra",
      "Giraffe",
      "Hippo",
    ],
    activities: [
      "Game Drives",
      "Hot Air Balloon Safari",
      "Walking Safari",
      "Bird Watching",
      "Photography",
    ],
  },
  "ngorongoro-crater": {
    id: "2",
    name: "Ngorongoro Crater",
    slug: "ngorongoro-crater",
    shortDescription:
      "The world's largest intact volcanic caldera, home to an incredible concentration of wildlife.",
    description: `
      The Ngorongoro Crater is often called the "Eighth Wonder of the World" - and once you've
      descended into this 600-meter-deep volcanic caldera, you'll understand why. Formed about
      2-3 million years ago when a giant volcano exploded and collapsed, the crater now shelters
      one of the most beautiful wildlife habitats on Earth.

      The crater floor spans approximately 260 square kilometers and is home to around 25,000
      large mammals, including the endangered black rhino. The crater's walls create a natural
      enclosure, meaning most animals remain resident year-round, making wildlife sightings
      almost guaranteed.

      The Ngorongoro Conservation Area is also culturally significant as one of the few places
      where wildlife and semi-nomadic Maasai pastoralists coexist, continuing their traditional
      way of life alongside the wild animals.
    `,
    heroImage: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/Ngorongoro-conservation-area.jpg",
    galleryImages: [
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/Ngorongoro-conservation-area.jpg",
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/05/Ngorongoro_Crater_Maasai_herding_mating_lion_couple-1.jpg",
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/05/ngorongoro-crater-ngorongoro-conservation-area.jpg",
    ],
    highlights: [
      "UNESCO World Heritage Site",
      "Big Five",
      "Crater Floor",
      "Maasai Culture",
    ],
    bestTimeToVisit:
      "Year-round; June to September for dry season; November to April for green season",
    location: "Northern Tanzania, 180 km from Arusha",
    wildlife: [
      "Black Rhino",
      "Lion",
      "Leopard",
      "Elephant",
      "Buffalo",
      "Hippo",
      "Flamingo",
      "Wildebeest",
      "Zebra",
      "Hyena",
    ],
    activities: [
      "Crater Floor Game Drive",
      "Maasai Village Visit",
      "Olduvai Gorge Tour",
      "Crater Rim Walk",
      "Bird Watching",
    ],
  },
  "tarangire-national-park": {
    id: "3",
    name: "Tarangire National Park",
    slug: "tarangire-national-park",
    shortDescription:
      "Famous for its giant baobab trees and large elephant herds, especially during the dry season.",
    description: `
      Tarangire National Park is Tanzania's sixth-largest national park and one of the most
      underrated gems of the Northern Circuit. Named after the Tarangire River that runs
      through its length, this park is best known for its large elephant herds - some of the
      largest in Tanzania - and its iconic landscape dotted with ancient baobab trees.

      During the dry season (June to October), the Tarangire River becomes a lifeline for
      wildlife, drawing huge concentrations of animals from the surrounding areas. This is
      when you can witness some of the highest concentrations of wildlife outside the Serengeti.

      The park's diverse habitats, from riverine forests to acacia woodlands, support a rich
      variety of wildlife and over 550 bird species - making it a paradise for bird enthusiasts.
    `,
    heroImage: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/Tarangire-National-Park.jpg",
    galleryImages: [
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/Tarangire-National-Park.jpg",
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/39339368385_20d92a678c_k.jpg",
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/05/safaritanzania.jpg",
    ],
    highlights: [
      "Large Elephant Herds",
      "Ancient Baobab Trees",
      "Bird Paradise",
      "Tarangire River",
    ],
    bestTimeToVisit:
      "June to October for best wildlife concentration; year-round for bird watching",
    location: "Northern Tanzania, 120 km from Arusha",
    wildlife: [
      "Elephant",
      "Lion",
      "Leopard",
      "Buffalo",
      "Giraffe",
      "Zebra",
      "Wildebeest",
      "Python",
      "Oryx",
      "Eland",
    ],
    activities: [
      "Game Drives",
      "Walking Safari",
      "Night Safari",
      "Bird Watching",
      "Photography",
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { destSlug } = await params;
  const destination = await getDestination(destSlug);
  const placeholder = placeholderDestinations[destSlug];

  const dest = destination || placeholder;
  if (!dest) return {};

  // Handle both DB schema (metaDescription/description) and placeholder (shortDescription)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const destAny = dest as any;
  const metaDesc = destAny.metaDescription || destAny.description?.slice(0, 160) || destAny.shortDescription || "";

  return genMeta({
    title: dest.name,
    description: metaDesc,
    url: `/tanzania-destinations/${destSlug}/`,
  });
}

export default async function DestinationDetailPage({ params }: Props) {
  const { destSlug } = await params;
  const destination = await getDestination(destSlug);
  const placeholder = placeholderDestinations[destSlug];

  const dest = destination || placeholder;

  if (!dest) {
    notFound();
  }

  // Extract data with fallbacks
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const d = dest as any;
  const name = d.name;
  const description = d.description || d.shortDescription || "";
  const heroImage = d.heroImage || d.featuredImage || "/images/placeholder-destination.jpg";
  const highlights = d.highlights || ["Wildlife", "Scenery", "Adventure"];
  const bestTimeToVisit = d.bestTimeToVisit || d.bestTime || "Year-round";
  const location = d.location || "Northern Tanzania";
  const wildlife = d.wildlife || ["Various wildlife species"];
  const activities = d.activities || ["Game Drives", "Photography"];
  const safaris = d.safaris || [];

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px]">
        <Image
          src={heroImage}
          alt={name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <nav className="text-sm text-white/70 mb-4">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href="/tanzania-destinations/" className="hover:text-white">
                Destinations
              </Link>
              <span className="mx-2">/</span>
              <span className="text-white">{name}</span>
            </nav>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              {name}
            </h1>
            <div className="flex flex-wrap gap-2">
              {highlights.map((highlight: string, i: number) => (
                <span
                  key={i}
                  className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info */}
      <section className="bg-[var(--primary)] text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[var(--secondary)]" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[var(--secondary)]" />
              <span>Best: {bestTimeToVisit.split(";")[0]}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-[var(--secondary)]" />
              <span>Must-Visit Destination</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Description */}
            <div className="lg:col-span-2">
              <h2 className="font-heading text-3xl font-bold mb-6">
                About {name}
              </h2>
              <div className="prose prose-slate prose-lg max-w-none">
                {description.split("\n").map((paragraph: string, i: number) =>
                  paragraph.trim() ? <p key={i}>{paragraph.trim()}</p> : null
                )}
              </div>

              {/* Wildlife */}
              <div className="mt-10">
                <h3 className="font-heading text-2xl font-bold mb-4">
                  Wildlife You&apos;ll See
                </h3>
                <div className="flex flex-wrap gap-2">
                  {wildlife.map((animal: string, i: number) => (
                    <span
                      key={i}
                      className="bg-[var(--muted)] text-[var(--text)] px-4 py-2 rounded-full text-sm"
                    >
                      {animal}
                    </span>
                  ))}
                </div>
              </div>

              {/* Activities */}
              <div className="mt-10">
                <h3 className="font-heading text-2xl font-bold mb-4">
                  Activities & Experiences
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {activities.map((activity: string, i: number) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 bg-[var(--surface)] p-4 rounded-lg"
                    >
                      <div className="w-10 h-10 bg-[var(--primary-light)] rounded-full flex items-center justify-center">
                        {i === 0 && <Camera className="w-5 h-5 text-[var(--primary)]" />}
                        {i === 1 && <Clock className="w-5 h-5 text-[var(--primary)]" />}
                        {i > 1 && <Star className="w-5 h-5 text-[var(--primary)]" />}
                      </div>
                      <span className="font-medium">{activity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Best Time */}
              <div className="bg-[var(--secondary-light)] border border-[var(--secondary)] rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[var(--secondary-dark)]" />
                  Best Time to Visit
                </h3>
                <p className="text-[var(--text-muted)]">{bestTimeToVisit}</p>
              </div>

              {/* Inquiry CTA */}
              <div className="bg-[var(--primary)] text-white rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-3">
                  Plan Your Visit to {name}
                </h3>
                <p className="text-[var(--primary-light)] text-sm mb-4">
                  Let us create a custom safari itinerary featuring this
                  incredible destination.
                </p>
                <Link
                  href="/contact-us/"
                  className="block text-center bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-6 py-3 rounded font-semibold transition-colors"
                >
                  Get Free Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Safaris */}
      {(safaris.length > 0 || true) && (
        <section className="py-12 bg-[var(--surface)]">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-3xl font-bold text-center mb-10">
              Safaris Featuring {name}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Placeholder safaris if none from DB */}
              {[
                {
                  title: "5-Day Northern Circuit Safari",
                  slug: "5-day-northern-circuit-safari",
                  duration: "5 Days",
                  type: "Mid-Range",
                  priceFrom: 2100,
                  featuredImage: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/05/safaritanzania.jpg",
                  overview: "Experience the best of Tanzania's northern parks.",
                },
                {
                  title: "7-Day Great Migration Safari",
                  slug: "7-day-great-migration-safari",
                  duration: "7 Days",
                  type: "Mid-Range",
                  priceFrom: 3200,
                  featuredImage: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/32535628638_2be6219332_k-2.jpg",
                  overview: "Witness the spectacular Great Migration in the Serengeti.",
                },
                {
                  title: "3-Day Budget Safari",
                  slug: "3-day-budget-safari",
                  duration: "3 Days",
                  type: "Budget",
                  priceFrom: 850,
                  featuredImage: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/3-Days-Tanzania-Budget-Camping-Safari.jpg",
                  overview: "Affordable safari experience for budget travelers.",
                },
              ].map((safari, i) => (
                <SafariCard
                  key={i}
                  title={safari.title}
                  slug={safari.slug}
                  duration={safari.duration}
                  type={safari.type}
                  priceFrom={safari.priceFrom}
                  featuredImage={safari.featuredImage}
                  overview={safari.overview}
                />
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/tanzania-safaris/"
                className="inline-block text-[var(--primary)] hover:text-[var(--primary-dark)] font-semibold"
              >
                View All Safari Packages →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Other Destinations */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-center mb-10">
            Explore More Destinations
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {Object.values(placeholderDestinations)
              .filter((d) => d.slug !== destSlug)
              .slice(0, 4)
              .map((d) => (
                <Link
                  key={d.id}
                  href={`/tanzania-destinations/${d.slug}/`}
                  className="group"
                >
                  <div className="relative aspect-square rounded-lg overflow-hidden mb-3">
                    <Image
                      src={d.heroImage}
                      alt={d.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-semibold">{d.name}</h3>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
