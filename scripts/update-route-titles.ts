/**
 * Propose (and optionally apply) SEO meta titles for trekking routes.
 *
 * Pattern: "<N>-Day <Route> Route | Kilimanjaro Climb from $<price>"
 *   - N comes from the route's durationDays field.
 *   - <Route> is the route title with its duration prefix and "Route" suffix removed.
 *   - The price is the same "from" price the route page shows: the lowest upcoming
 *     group-departure price, else the cheapest pricing tier. A route with neither
 *     gets no price part (no invented numbers).
 *   - Capped at 55 chars (TITLE_BUDGET in src/lib/seo.ts — longer titles are cut
 *     mid-phrase by fitTitle). If the price part doesn't fit, it is dropped.
 *
 * Default is a dry run that only reads. --apply writes ONLY metaTitle, one route
 * at a time, via prisma.trekkingRoute.update({ where: { id } }). Nothing is deleted.
 *
 * Usage:
 *   npx tsx scripts/update-route-titles.ts            # dry run (default)
 *   npx tsx scripts/update-route-titles.ts --apply    # write metaTitle
 */

import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";

config({ path: ".env.local" });

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL_ACCELERATE,
});

const MAX_LENGTH = 55;
const APPLY = process.argv.includes("--apply");

/** "7 Days Machame Route" -> "Machame". Null when the title isn't a single named route. */
function routeName(title: string): string | null {
  if (/safari|&|(^|\s)and(\s|$)/i.test(title)) return null; // combo packages
  const m = title
    .replace(/^\s*\d+[\s-]*days?\s*/i, "")
    .match(/^(.+?)\s+route(\s|$)/i);
  if (!m) return null;
  const name = m[1].replace(/(^|\s)kilimanjaro(\s|$)/i, " ").replace(/\s+/g, " ").trim();
  return name || null;
}

function proposeTitle(days: number, name: string, price: number | null): string {
  const base = `${days}-Day ${name} Route`;
  if (price) {
    const withPrice = `${base} | Kilimanjaro Climb from $${price.toLocaleString("en-US")}`;
    if (withPrice.length <= MAX_LENGTH) return withPrice;
  }
  const withClimb = `${base} | Kilimanjaro Climb`;
  if (withClimb.length <= MAX_LENGTH) return withClimb;
  return base.slice(0, MAX_LENGTH);
}

async function main() {
  const routes = await prisma.trekkingRoute.findMany({
    where: { isActive: true },
    orderBy: { durationDays: "asc" },
    select: {
      id: true,
      slug: true,
      title: true,
      metaTitle: true,
      mountain: true,
      durationDays: true,
      pricingTiers: true,
      departures: {
        where: {
          status: { in: ["OPEN", "GUARANTEED", "LIMITED"] },
          startDate: { gte: new Date() },
        },
        select: { price: true },
      },
    },
  });

  console.log(APPLY ? "MODE: APPLY (writes metaTitle only)\n" : "MODE: DRY RUN (no writes)\n");

  for (const r of routes) {
    const depPrices = r.departures.map((d) => Number(d.price)).filter((p) => p > 0);
    const tierPrices = ((r.pricingTiers as { price?: number }[] | null) || [])
      .map((t) => Number(t?.price))
      .filter((p) => Number.isFinite(p) && p > 0);
    const price = depPrices.length
      ? Math.min(...depPrices)
      : tierPrices.length
        ? Math.min(...tierPrices)
        : null;

    const current = r.metaTitle || r.title;
    const name = routeName(r.title);
    if (r.mountain !== "KILIMANJARO" || !name) {
      console.log(`${r.slug}`);
      console.log(`  current  (${current.length}): ${current}`);
      console.log(`  skipped: not a single Kilimanjaro route (${r.mountain})`);
      continue;
    }
    const proposed = proposeTitle(r.durationDays, name, price);

    console.log(`${r.slug}`);
    console.log(`  current  (${current.length}): ${current}`);
    console.log(`  proposed (${proposed.length}): ${proposed}`);

    if (APPLY && proposed !== r.metaTitle) {
      await prisma.trekkingRoute.update({
        where: { id: r.id },
        data: { metaTitle: proposed },
      });
      console.log("  -> updated");
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
