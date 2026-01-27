import { Metadata } from "next";
import { RouteCard } from "@/components/cards/RouteCard";
import { generateMetadata as genMeta } from "@/lib/seo";
import prisma from "@/lib/prisma";

export const metadata: Metadata = genMeta({
  title: "Kilimanjaro Trekking Routes",
  description:
    "Explore our Kilimanjaro climbing routes. From the popular Machame Route to the scenic Lemosho, find your perfect path to Africa's highest peak.",
  url: "/trekking/",
});

// Fetch routes from database
async function getRoutes() {
  const routes = await prisma.trekkingRoute.findMany({
    where: {
      isActive: true,
    },
    select: {
      slug: true,
      title: true,
      duration: true,
      physicalRating: true,
      maxPeople: true,
      overview: true,
      successRate: true,
    },
    orderBy: {
      durationDays: "asc",
    },
  });
  return routes;
}

export default async function TrekkingPage() {
  const routes = await getRoutes();

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Kilimanjaro Trekking Routes
          </h1>
          <p className="text-xl text-slate-200 max-w-2xl">
            Choose your path to the Roof of Africa. Each route offers a unique
            experience with different scenery, challenge levels, and success rates.
          </p>
        </div>
      </section>

      {/* Routes Grid */}
      <section className="py-12 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {routes.map((route) => (
              <RouteCard
                key={route.slug}
                slug={route.slug}
                title={route.title}
                duration={route.duration}
                physicalRating={route.physicalRating ?? undefined}
                maxPeople={route.maxPeople ?? undefined}
                overview={route.overview}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-slate">
            <h2>Climbing Mount Kilimanjaro with Snow Africa Adventure</h2>
            <p>
              Mount Kilimanjaro stands at 5,895 meters (19,341 feet) as the
              highest peak in Africa and the tallest free-standing mountain in
              the world. Our experienced guides have led thousands of successful
              summit attempts across all routes.
            </p>

            <h3>Choosing the Right Route</h3>
            <p>
              Each Kilimanjaro route has its own character. The <strong>Machame
              Route</strong> is our most popular choice, offering excellent
              scenery and a high success rate. The <strong>Lemosho Route</strong>
              provides the best acclimatization with 8 days on the mountain. For
              a quieter experience, consider the <strong>Rongai Route</strong>
              approaching from the north.
            </p>

            <h3>What&apos;s Included</h3>
            <ul>
              <li>Professional English-speaking guides</li>
              <li>All park fees and permits</li>
              <li>Quality camping equipment</li>
              <li>Nutritious meals prepared by our mountain chef</li>
              <li>Emergency oxygen and first aid kit</li>
              <li>Airport transfers and hotel accommodation</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Mountain CTAs */}
      <section className="py-12 bg-[var(--muted)]">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-center mb-8">
            Other Mountains to Climb
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="text-4xl mb-4">🏔️</div>
              <h3 className="font-semibold text-lg mb-2">Mount Kilimanjaro</h3>
              <p className="text-sm text-[var(--text-muted)]">
                5,895m - Africa&apos;s Highest Peak
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="text-4xl mb-4">⛰️</div>
              <h3 className="font-semibold text-lg mb-2">Mount Meru</h3>
              <p className="text-sm text-[var(--text-muted)]">
                4,566m - Tanzania&apos;s Second Highest
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="text-4xl mb-4">🌋</div>
              <h3 className="font-semibold text-lg mb-2">Ol Doinyo Lengai</h3>
              <p className="text-sm text-[var(--text-muted)]">
                2,962m - Active Volcano
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
