import { Metadata } from "next";
import { SafariCard } from "@/components/cards/SafariCard";
import { generateMetadata as genMeta } from "@/lib/seo";
import prisma from "@/lib/prisma";

export const metadata: Metadata = genMeta({
  title: "Tanzania Safari Packages",
  description:
    "Explore Tanzania's incredible wildlife with our safari packages. From budget camping to luxury lodges, experience the Serengeti, Ngorongoro, and more.",
  url: "/tanzania-safaris/",
});

// Fetch safaris from database
async function getSafaris() {
  const safaris = await prisma.safariPackage.findMany({
    where: {
      isActive: true,
    },
    select: {
      slug: true,
      title: true,
      duration: true,
      type: true,
      overview: true,
      priceFrom: true,
    },
    orderBy: {
      durationDays: "asc",
    },
  });
  return safaris;
}

export default async function SafarisPage() {
  const safaris = await getSafaris();

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[var(--secondary)] to-[var(--primary-dark)] text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Tanzania Safari Packages
          </h1>
          <p className="text-xl text-slate-100 max-w-2xl">
            Discover the wonders of Tanzania&apos;s wildlife. From the Great
            Migration to the Big Five, experience Africa&apos;s most spectacular
            safari destinations.
          </p>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-12 bg-[var(--muted)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video bg-[var(--primary-dark)] rounded-lg flex items-center justify-center">
              <div className="text-center text-white">
                <span className="text-6xl">▶</span>
                <p className="mt-4">Safari Experience Video</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safari Packages */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-center mb-8">
            Choose Your Safari Adventure
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {safaris.map((safari) => (
              <SafariCard
                key={safari.slug}
                slug={safari.slug}
                title={safari.title}
                duration={safari.duration}
                type={safari.type}
                overview={safari.overview}
                priceFrom={safari.priceFrom ? Number(safari.priceFrom) : undefined}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Safari Types */}
      <section className="py-12 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-center mb-8">
            Safari Accommodation Types
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-3xl mb-3">⛺</div>
              <h3 className="font-semibold text-lg mb-2">Budget Camping</h3>
              <p className="text-sm text-[var(--text-muted)]">
                Sleep under the stars in quality tents at public campsites. Perfect
                for adventurers seeking an authentic experience.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md border-2 border-[var(--secondary)]">
              <div className="text-3xl mb-3">🏨</div>
              <h3 className="font-semibold text-lg mb-2">Mid-Range Lodges</h3>
              <p className="text-sm text-[var(--text-muted)]">
                Comfortable lodges and tented camps with en-suite facilities.
                Our most popular choice.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-3xl mb-3">✨</div>
              <h3 className="font-semibold text-lg mb-2">Luxury Lodges</h3>
              <p className="text-sm text-[var(--text-muted)]">
                Premium lodges with world-class amenities, gourmet dining, and
                exclusive experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-slate">
            <h2>Tanzania Safari Experience</h2>
            <p>
              Tanzania offers some of the world&apos;s most spectacular wildlife
              viewing opportunities. Home to the legendary Serengeti, the
              stunning Ngorongoro Crater, and the elephant-rich Tarangire, a
              Tanzania safari is the ultimate African adventure.
            </p>

            <h3>The Great Migration</h3>
            <p>
              Witness nature&apos;s greatest spectacle as millions of wildebeest
              and zebra traverse the Serengeti plains. This annual migration
              offers unforgettable sightings and dramatic river crossings.
            </p>

            <h3>The Big Five</h3>
            <p>
              Tanzania is one of the best destinations to see all of the Big
              Five: lion, leopard, elephant, buffalo, and rhinoceros. Our
              experienced guides know exactly where to find them.
            </p>

            <h3>Why Choose Snow Africa Adventure?</h3>
            <ul>
              <li>Locally owned and operated</li>
              <li>Expert guides with 10+ years experience</li>
              <li>Small group sizes for intimate experiences</li>
              <li>Customizable itineraries</li>
              <li>24/7 support during your safari</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
