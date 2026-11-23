/**
 * Read-only: finds figures that disagree inside and across trekking route
 * records: success rate field vs percentages in text, gate/camp altitudes
 * across routes, itinerary length vs durationDays, malformed units.
 * Writes nothing.
 */
import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";

config({ path: ".env.local", quiet: true });

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL_ACCELERATE,
});

const strip = (s: string) => s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

// Named places whose altitude should be the same on every route.
const PLACES = [
  "Marangu Gate", "Machame Gate", "Umbwe Gate", "Rongai Gate", "Nale Moru", "Londorossi Gate", "Lemosho Gate",
  "Mweka Gate", "Mandara Hut", "Horombo Hut", "Kibo Hut", "Simba Camp", "Second Cave", "Kikelewa", "Mawenzi Tarn",
  "Machame Camp", "Shira Camp", "Shira 2", "Barranco Camp", "Karanga Camp", "Barafu Camp", "Mweka Camp",
  "Lava Tower", "Umbwe Cave", "Moir Hut", "Pofu Camp", "Third Cave", "School Hut", "Big Tree", "Mti Mkubwa",
  "Uhuru Peak", "Stella Point", "Gilman's Point", "High Camp", "Millennium Camp", "Crater Camp",
];

async function main() {
  const routes = await prisma.trekkingRoute.findMany({
    orderBy: { slug: "asc" },
    select: {
      slug: true, durationDays: true, duration: true, successRate: true, startPoint: true, endPoint: true,
      summitHeight: true, overview: true, highlights: true, itinerary: true, elevationProfile: true, faqs: true,
      metaDescription: true, isActive: true,
    },
  });

  const placeAlts: Record<string, Map<string, Set<string>>> = {};

  for (const r of routes) {
    const fields: Record<string, string> = {
      overview: strip(r.overview),
      highlights: r.highlights.join(" | "),
      itinerary: JSON.stringify(r.itinerary ?? ""),
      elevation: JSON.stringify(r.elevationProfile ?? ""),
      faqs: strip(JSON.stringify(r.faqs ?? "")),
      meta: r.metaDescription ?? "",
      start: r.startPoint ?? "",
      end: r.endPoint ?? "",
    };
    const all = Object.entries(fields);
    const issues: string[] = [];

    // Success-rate percentages in text vs the field.
    for (const [f, t] of all) {
      for (const m of t.matchAll(/([^.]{0,60}(?:success|summit rate)[^.]{0,60})/gi)) {
        const pct = m[1].match(/\d{2}\s*(?:[–-]\s*\d{2})?\s*%/g);
        if (pct) issues.push(`success-text [${f}] ${pct.join(",")} :: "${m[1].trim().slice(0, 110)}"`);
      }
    }
    // Malformed units.
    for (const [f, t] of all) for (const m of t.matchAll(/\d[\d,]*\s?mm\b/g)) issues.push(`unit [${f}] "${m[0]}"`);

    // Itinerary length vs durationDays.
    if (Array.isArray(r.itinerary)) {
      const days = (r.itinerary as { day?: unknown }[]).map((d) => d.day);
      if (r.itinerary.length !== r.durationDays) issues.push(`itinerary has ${r.itinerary.length} entries, durationDays=${r.durationDays}, duration="${r.duration}" days=${JSON.stringify(days)}`);
    }

    // Collect place altitudes.
    for (const [f, t] of all) {
      for (const p of PLACES) {
        const re = new RegExp(`${p.replace(/'/g, "['’]")}[^0-9]{0,25}?\\(?\\s*([0-9][0-9,.]{2,5})\\s?m\\b`, "gi");
        for (const m of t.matchAll(re)) {
          const v = m[1].replace(/[.,]/g, "");
          ((placeAlts[p] ??= new Map()).get(v) ?? placeAlts[p].set(v, new Set()).get(v)!).add(`${r.slug}:${f}`);
        }
      }
    }

    console.log(`\n### ${r.slug}${r.isActive ? "" : " (inactive)"} successRate=${r.successRate} days=${r.durationDays} start="${r.startPoint}" end="${r.endPoint}" summit="${r.summitHeight}"`);
    for (const i of issues) console.log(`  ${i}`);
  }

  console.log("\n=== PLACE ALTITUDES (values seen -> where) ===");
  for (const [p, vals] of Object.entries(placeAlts)) {
    if (vals.size < 2) continue;
    console.log(`\n${p}:`);
    for (const [v, where] of vals) console.log(`  ${v}m  x${where.size}  ${[...where].slice(0, 8).join(", ")}${where.size > 8 ? " …" : ""}`);
  }
}

main().finally(() => prisma.$disconnect());
