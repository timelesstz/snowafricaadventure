import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Users, Check, X, Calendar } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { generateMetadata as genMeta } from "@/lib/seo";
import { InquiryForm } from "@/components/forms/InquiryForm";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getDayTrip(slug: string) {
  try {
    const trip = await prisma.dayTrip.findUnique({
      where: { slug },
    });
    return trip;
  } catch {
    return null;
  }
}

// Placeholder data
const placeholderTrips: Record<string, {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  price: number;
  duration: string;
  heroImage: string;
  highlights: string[];
  groupSize: string;
  inclusions: string[];
  exclusions: string[];
  itinerary: { time: string; activity: string }[];
  whatToBring: string[];
}> = {
  "arusha-national-park-day-safari": {
    id: "1",
    name: "Arusha National Park Day Safari",
    slug: "arusha-national-park-day-safari",
    shortDescription:
      "Game drive and walking safari in the shadow of Mount Meru, with diverse wildlife and stunning scenery.",
    description: `
      Arusha National Park is one of Tanzania's most underrated gems, offering an incredible diversity
      of habitats in a compact area. From the alkaline Momella Lakes to the Mount Meru crater, this
      park provides an intimate wildlife experience just a short drive from Arusha city.

      This day trip combines a game drive with a walking safari, giving you the chance to see wildlife
      from different perspectives. The park is home to giraffes, buffalo, zebras, warthogs, and various
      monkey species including the striking black and white colobus monkey.

      With Mount Meru as a dramatic backdrop and the possibility of glimpsing Kilimanjaro on clear days,
      this is a photographer's paradise. The park's relatively small size means you can cover a lot of
      ground in a single day, making it perfect for those with limited time.
    `,
    price: 180,
    duration: "Full Day (8-9 hours)",
    heroImage: "/images/day-trips/arusha-np-hero.jpg",
    highlights: ["Walking Safari", "Game Drive", "Momella Lakes", "Mount Meru Views", "Colobus Monkeys"],
    groupSize: "2-6 people",
    inclusions: [
      "Hotel pickup and drop-off in Arusha",
      "Professional English-speaking guide",
      "4x4 safari vehicle",
      "Park entry fees",
      "Walking safari with armed ranger",
      "Packed lunch and drinking water",
      "Binoculars (on request)",
    ],
    exclusions: [
      "Personal expenses",
      "Tips for guide and ranger",
      "Travel insurance",
      "Alcoholic beverages",
    ],
    itinerary: [
      { time: "7:00 AM", activity: "Hotel pickup in Arusha" },
      { time: "8:00 AM", activity: "Arrive at Arusha National Park gate, enter park" },
      { time: "8:30 AM", activity: "Morning game drive through different habitats" },
      { time: "10:30 AM", activity: "Walking safari with armed ranger" },
      { time: "12:30 PM", activity: "Picnic lunch at scenic viewpoint" },
      { time: "1:30 PM", activity: "Visit Momella Lakes - flamingo spotting" },
      { time: "3:00 PM", activity: "Continue game drive, visit Fig Tree Arch" },
      { time: "4:00 PM", activity: "Depart park" },
      { time: "5:00 PM", activity: "Return to Arusha hotel" },
    ],
    whatToBring: [
      "Comfortable walking shoes",
      "Long pants and long sleeves",
      "Sun hat and sunscreen",
      "Camera with good zoom",
      "Warm layer (can be cool in the morning)",
      "Insect repellent",
    ],
  },
  "materuni-waterfalls-coffee-tour": {
    id: "2",
    name: "Materuni Waterfalls & Coffee Tour",
    slug: "materuni-waterfalls-coffee-tour",
    shortDescription:
      "Hike through lush Chagga village to stunning waterfalls and learn about traditional coffee production.",
    description: `
      Experience the stunning beauty of the Kilimanjaro foothills on this combined waterfall hike
      and coffee farm tour. The village of Materuni sits at about 1,500 meters elevation on the
      slopes of Kilimanjaro, home to the Chagga people who have cultivated coffee here for generations.

      Your adventure begins with a guided hike through banana plantations and tropical forest to
      reach the spectacular 80-meter Materuni Waterfall. The crystal-clear pool at its base is
      perfect for a refreshing swim (bring your swimsuit!).

      After the hike, visit a traditional Chagga homestead to learn about their way of life and
      the coffee production process - from picking the ripe cherries to roasting and grinding
      the beans by hand. You'll enjoy a cup of authentic Kilimanjaro coffee that you've helped
      prepare yourself.
    `,
    price: 120,
    duration: "Half Day (5-6 hours)",
    heroImage: "/images/day-trips/materuni-hero.jpg",
    highlights: ["80m Waterfall", "Coffee Farm", "Chagga Culture", "Swimming", "Local Lunch"],
    groupSize: "2-8 people",
    inclusions: [
      "Hotel pickup and drop-off (Moshi or Arusha)",
      "English-speaking local guide",
      "All entrance fees",
      "Traditional Chagga lunch",
      "Coffee tour and tasting",
      "Drinking water",
    ],
    exclusions: [
      "Swimwear and towel",
      "Personal expenses",
      "Tips for guide",
      "Travel insurance",
    ],
    itinerary: [
      { time: "8:00 AM", activity: "Hotel pickup in Moshi (or 7:00 AM from Arusha)" },
      { time: "9:00 AM", activity: "Arrive at Materuni village, meet local guide" },
      { time: "9:30 AM", activity: "Begin hike to waterfall through village and forest" },
      { time: "10:30 AM", activity: "Arrive at Materuni Waterfall - time to swim and photos" },
      { time: "11:30 AM", activity: "Hike back to village" },
      { time: "12:30 PM", activity: "Coffee tour - picking, roasting, grinding, tasting" },
      { time: "1:30 PM", activity: "Traditional Chagga lunch" },
      { time: "2:30 PM", activity: "Return to hotel" },
    ],
    whatToBring: [
      "Comfortable hiking shoes with grip",
      "Swimsuit and towel",
      "Change of clothes",
      "Camera",
      "Sun protection",
      "Small backpack",
    ],
  },
  "ngorongoro-crater-day-trip": {
    id: "5",
    name: "Ngorongoro Crater Day Trip",
    slug: "ngorongoro-crater-day-trip",
    shortDescription:
      "Descend into the world-famous Ngorongoro Crater for an unforgettable wildlife experience.",
    description: `
      The Ngorongoro Crater is often called the 'Garden of Eden' or the 'Eighth Wonder of the World,'
      and a day trip here shows you why. This UNESCO World Heritage Site is the world's largest
      intact volcanic caldera, home to some 25,000 large animals in a natural amphitheater.

      Starting early from Arusha, you'll drive through the scenic highlands to the crater rim,
      then descend 600 meters to the crater floor. The enclosed ecosystem means wildlife viewing
      is exceptional - you have an excellent chance of seeing all of the Big Five (lion, elephant,
      buffalo, leopard, and the endangered black rhino) in a single day.

      While this is a long day trip, the experience is absolutely worth it. The crater's beauty
      and wildlife concentration are simply unmatched anywhere on Earth.
    `,
    price: 350,
    duration: "Full Day (12-13 hours)",
    heroImage: "/images/day-trips/ngorongoro-day-hero.jpg",
    highlights: ["Big Five", "UNESCO Site", "Crater Floor", "Rhino Spotting", "Lunch Included"],
    groupSize: "2-6 people",
    inclusions: [
      "Hotel pickup and drop-off in Arusha/Moshi",
      "Professional English-speaking guide/driver",
      "4x4 safari vehicle with pop-up roof",
      "Ngorongoro Conservation Area entry fees",
      "Crater service fee",
      "Packed lunch and drinking water",
      "Binoculars",
    ],
    exclusions: [
      "Personal expenses",
      "Tips for guide",
      "Travel insurance",
      "Alcoholic beverages",
      "Maasai village visit (optional extra)",
    ],
    itinerary: [
      { time: "5:30 AM", activity: "Early hotel pickup in Arusha" },
      { time: "8:00 AM", activity: "Arrive at Lodoare Gate, enter Conservation Area" },
      { time: "9:00 AM", activity: "Reach crater rim - photo stop with views" },
      { time: "9:30 AM", activity: "Descend into the crater" },
      { time: "10:00 AM - 3:00 PM", activity: "Full crater floor game drive" },
      { time: "12:30 PM", activity: "Picnic lunch at hippo pool" },
      { time: "3:30 PM", activity: "Ascend out of crater" },
      { time: "4:00 PM", activity: "Begin return journey to Arusha" },
      { time: "6:30 PM", activity: "Arrive back at your hotel" },
    ],
    whatToBring: [
      "Warm layers (crater rim is cold)",
      "Camera with charged batteries",
      "Binoculars",
      "Sunscreen and sunglasses",
      "Hat",
      "Comfortable clothing in neutral colors",
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const trip = await getDayTrip(slug);
  const placeholder = placeholderTrips[slug];

  const data = trip || placeholder;
  if (!data) return {};

  // Handle both DB (title/description) and placeholder (name/shortDescription)
  const title = 'title' in data ? data.title : data.name;
  const description = 'description' in data && data.description
    ? data.description
    : 'shortDescription' in data ? data.shortDescription : '';

  return genMeta({
    title,
    description,
    url: `/day-trips/${slug}/`,
  });
}

export default async function DayTripDetailPage({ params }: Props) {
  const { slug } = await params;
  const dbTrip = await getDayTrip(slug);
  const placeholder = placeholderTrips[slug];

  const trip = dbTrip || placeholder;

  if (!trip) {
    notFound();
  }

  // Extract data with type safety - handle both DB and placeholder structures
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tripData = trip as any;
  const name = tripData.title || tripData.name;
  const description = tripData.description || tripData.shortDescription;
  const price = tripData.priceFrom || tripData.price;
  const duration = tripData.duration || "Full Day";
  const heroImage = tripData.featuredImage || tripData.heroImage || "/images/placeholder-trip.jpg";
  const highlights = tripData.highlights || [];
  const groupSize = tripData.groupSize || "2-6 people";
  const inclusions = tripData.inclusions || [];
  const exclusions = tripData.exclusions || [];
  const itinerary = tripData.itinerary || [];
  const whatToBring = tripData.whatToBring || [];

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
              <Link href="/day-trips/" className="hover:text-white">
                Day Trips
              </Link>
              <span className="mx-2">/</span>
              <span className="text-white">{name}</span>
            </nav>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-white mb-4">
              {name}
            </h1>
            <div className="flex flex-wrap gap-4 text-white/90">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {duration}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {groupSize}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                From Arusha
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Price Bar */}
      <section className="bg-[var(--primary)] text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-[var(--primary-light)] text-sm">Price per person</span>
              <div className="text-3xl font-bold">${price} USD</div>
            </div>
            <div className="flex gap-4">
              <a
                href="#booking-form"
                className="bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Book This Trip
              </a>
              <a
                href="https://wa.me/255123456789"
                className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2">
              {/* Description */}
              <div className="mb-10">
                <h2 className="font-heading text-2xl font-bold mb-4">
                  About This Trip
                </h2>
                <div className="prose prose-slate max-w-none">
                  {description.split("\n").map((p: string, i: number) =>
                    p.trim() ? <p key={i}>{p.trim()}</p> : null
                  )}
                </div>
              </div>

              {/* Highlights */}
              {highlights.length > 0 && (
                <div className="mb-10">
                  <h2 className="font-heading text-2xl font-bold mb-4">
                    Trip Highlights
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {highlights.map((h: string, i: number) => (
                      <span
                        key={i}
                        className="bg-[var(--primary-light)] text-[var(--primary)] px-4 py-2 rounded-full"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Itinerary */}
              {itinerary.length > 0 && (
                <div className="mb-10">
                  <h2 className="font-heading text-2xl font-bold mb-4">
                    Itinerary
                  </h2>
                  <div className="space-y-4">
                    {itinerary.map(
                      (item: { time: string; activity: string }, i: number) => (
                        <div
                          key={i}
                          className="flex gap-4 bg-[var(--surface)] p-4 rounded-lg"
                        >
                          <div className="w-20 shrink-0">
                            <span className="text-[var(--primary)] font-semibold text-sm">
                              {item.time}
                            </span>
                          </div>
                          <div className="text-[var(--text)]">{item.activity}</div>
                        </div>
                      )
                    )}
                  </div>
                  <p className="text-sm text-[var(--text-muted)] mt-4">
                    * Times are approximate and may vary based on conditions and
                    group preferences.
                  </p>
                </div>
              )}

              {/* Inclusions/Exclusions */}
              <div className="grid md:grid-cols-2 gap-8 mb-10">
                {inclusions.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <Check className="w-5 h-5 text-[var(--primary)]" />
                      What&apos;s Included
                    </h3>
                    <ul className="space-y-2">
                      {inclusions.map((item: string, i: number) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-[var(--text-muted)]"
                        >
                          <Check className="w-4 h-4 text-[var(--primary)] mt-1 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {exclusions.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <X className="w-5 h-5 text-red-500" />
                      Not Included
                    </h3>
                    <ul className="space-y-2">
                      {exclusions.map((item: string, i: number) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-[var(--text-muted)]"
                        >
                          <X className="w-4 h-4 text-red-400 mt-1 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* What to Bring */}
              {whatToBring.length > 0 && (
                <div className="bg-[var(--secondary-light)] border border-[var(--secondary)] rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-4">What to Bring</h3>
                  <div className="grid md:grid-cols-2 gap-2">
                    {whatToBring.map((item: string, i: number) => (
                      <div key={i} className="flex items-center gap-2 text-[var(--text-muted)]">
                        <span className="w-2 h-2 bg-[var(--secondary)] rounded-full"></span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Booking Form */}
            <div className="lg:col-span-1">
              <div
                id="booking-form"
                className="sticky top-24 bg-[var(--surface)] rounded-lg p-6"
              >
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[var(--primary)]" />
                  Book This Trip
                </h3>
                <InquiryForm
                  variant="sidebar"
                  relatedTo={name}
                  tripType="day-trip"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Trips */}
      <section className="py-12 bg-[var(--muted)]">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-center mb-8">
            More Day Trips
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {Object.values(placeholderTrips)
              .filter((t) => t.slug !== slug)
              .slice(0, 3)
              .map((t) => (
                <Link
                  key={t.id}
                  href={`/day-trips/${t.slug}/`}
                  className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={t.heroImage}
                      alt={t.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-sm font-bold text-[var(--primary)]">
                      ${t.price}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1">{t.name}</h3>
                    <p className="text-sm text-[var(--text-muted)]">{t.duration}</p>
                  </div>
                </Link>
              ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/day-trips/"
              className="text-[var(--primary)] hover:text-[var(--primary-dark)] font-semibold"
            >
              View All Day Trips →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
