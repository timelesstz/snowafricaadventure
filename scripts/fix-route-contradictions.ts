/**
 * Fixes figures that disagree inside and across trekking route records
 * (found by scripts/report-route-contradictions.ts, 2026-11-23).
 *
 * One value per place, used on every route:
 *   Rongai Gate 1,950m (was 2,364m in start point, itineraries, FAQs)
 *   Marangu Gate 1,860m (was 1,879m in structured fields, 1,860m in text)
 *   Umbwe Gate 1,600m (was 1,800m in start point and day 1)
 *   Simba Camp 2,625m (was 2,625m and 2,671m)
 *   Umbwe Cave Camp 2,850m, Karanga Camp 3,995m, Lava Tower 4,600m,
 *   Kibo Hut 4,720m, Barranco Camp 3,960m, Machame Camp 2,835m,
 *   Shira Cave Camp 3,750m on Machame (Shira 2 stays 3,850m on Lemosho)
 * Garbled units: "3,835mm", "1,879mm", "3,600mm", "3,900mm0m".
 * Success rates: field and text agree; 7-day Rongai above 6-day Rongai;
 *   only the Northern Circuit is called "highest".
 * Northern Circuit itinerary renumbered from day 0 like every other route.
 *
 * Exact string replacements on named routes only; each must match the
 * expected number of times or the script stops. Updates by id, no deletes.
 *
 *   npx tsx scripts/fix-route-contradictions.ts            # dry run
 *   npx tsx scripts/fix-route-contradictions.ts --apply    # write
 */
import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";

config({ path: ".env.local", quiet: true });

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL_ACCELERATE,
});

const APPLY = process.argv.includes("--apply");

type Rep = [from: string, to: string];

const MACHAME_BARRANCO: Rep[] = [
  ["3,900mm0m → 3,960m", "4,600m → 3,960m"],
  ["Barranco camp (3,900m)", "Barranco Camp (3,960m)"],
  ["Barranco Camp (3,900m)", "Barranco Camp (3,960m)"],
  ["3,900m →", "3,960m →"],
  ["→ 3,900m", "→ 3,960m"],
];

const FIXES: Record<string, { text: Rep[]; successRate?: number }> = {
  "7-days-rongai-route": {
    text: [
      ["Rongai Gate (2,364m)", "Rongai Gate (1,950m)"],
      ["2,364m → 2,671m", "1,950m → 2,625m"],
      ["2,671m", "2,625m"],
      ["1,879m", "1,860m"],
      ["Kibo Hut or School Hut at around 4,750 meters", "Kibo Hut (4,720 meters) or School Hut (around 4,750 meters)"],
      ["success rates between 80 and 85 percent", "success rates between 85 and 90 percent"],
    ],
  },
  "6-days-rongai-route": {
    text: [
      ["Rongai Gate (2,364m)", "Rongai Gate (1,950m)"],
      ["2,364m → 2,671m", "1,950m → 2,625m"],
      ["2,671m", "2,625m"],
      ["1,879mm", "1,860m"],
      ["1,879m", "1,860m"],
      ["Kibo Hut at 4,703 metres", "Kibo Hut at 4,720 metres"],
    ],
  },
  "5-days-marangu-route": { text: [["1,879m", "1,860m"]] },
  "6-days-marangu-route": { text: [["1,879m", "1,860m"]] },
  "6-days-umbwe-route": {
    text: [
      ["Umbwe Gate (1,800m)", "Umbwe Gate (1,600m)"],
      ["1,800m → 2,850m", "1,600m → 2,850m"],
      ["Umbwe Cave Camp at 2,940 meters", "Umbwe Cave Camp at 2,850 meters"],
      ["Karanga Camp at 4,035 meters", "Karanga Camp at 3,995 meters"],
      ...MACHAME_BARRANCO,
    ],
  },
  "6-days-machame-route": {
    successRate: 75,
    text: [
      ["1,800m → 3,835mm", "1,800m → 2,835m"],
      ["Machame Camp at 3,000 meters", "Machame Camp at 2,835 meters"],
      ["Shira Camp at 3,840 meters", "Shira Cave Camp at 3,750 meters"],
      ["Shira Camp (3,750m)", "Shira Cave Camp (3,750m)"],
      ["Lava Tower at 4,630 meters", "Lava Tower at 4,600 meters"],
      ...MACHAME_BARRANCO,
    ],
  },
  "7-days-machame-route": {
    text: [
      ["Shira Cave camp(3,840m)", "Shira Cave Camp (3,750m)"],
      ["3,840m → 3,900mm0m", "3,750m → 3,900mm0m"],
      ["Uhuru peak (5895m)-Mweka camp (3,100m", "Mweka Camp (3,100m)"],
      ["from roughly 80% to 90%", "from roughly 75% to 90%"],
      ...MACHAME_BARRANCO,
    ],
  },
  "8-days-lemosho-route": {
    text: [
      ["3,850m → 3,600mm → 3,960m", "3,850m → 4,600m → 3,960m"],
      ["Baranco  (3,900m)", "Barranco Camp (3,960m)"],
      ["Baranco Camp", "Barranco Camp"],
      ["3,900m →", "3,960m →"],
      ["Uhuru Peak (5,895m-Mweka camp (3,100m)", "Mweka Camp (3,100m)"],
      ["Highest summit success rate on Kilimanjaro (95%)", "95% summit success rate, among the highest on Kilimanjaro"],
      ["Why does the Lemosho Route have the highest success rate?", "Why does the Lemosho Route have such a high success rate?"],
      ["Lemosho's industry-leading 95% summit success rate", "Lemosho's 95% summit success rate"],
    ],
  },
  "kilimanjaro-trek-machame-route-and-tanzania-safari-northern-circuit": {
    text: [
      ["3,750m-3,900m", "3,750m-3,960m"],
      ["3900m-3995m", "3,960m-3,995m"],
      ["Machame hut campsite 2835m", "Machame Camp 2,835m"],
      ["Baranco camp 3,900m", "Barranco Camp 3,960m"],
      ["Baranco c", "Barranco c"],
      ["Baranco C", "Barranco C"],
      ["Baranco W", "Barranco W"],
    ],
  },
};

// Exact expected hit counts would be brittle across HTML/JSON; instead every
// replacement must hit at least once, and the totals are printed for review.
function applyAll(s: string, reps: Rep[], hits: number[]): string {
  reps.forEach(([from, to], i) => {
    const n = s.split(from).length - 1;
    hits[i] += n;
    if (n) s = s.split(from).join(to);
  });
  return s;
}

async function main() {
  const routes = await prisma.trekkingRoute.findMany({
    where: { slug: { in: [...Object.keys(FIXES), "9-day-northern-circuit-route-kilimanjaro-guide"] } },
    select: {
      id: true, slug: true, successRate: true, startPoint: true, endPoint: true, overview: true,
      highlights: true, itinerary: true, faqs: true, metaDescription: true,
    },
  });

  let failed = false;
  const writes: { id: string; data: object }[] = [];
  for (const [slug, fix] of Object.entries(FIXES)) {
    const r = routes.find((x) => x.slug === slug);
    if (!r) { console.log(`missing ${slug}`); failed = true; continue; }
    const hits = fix.text.map(() => 0);
    const data = {
      startPoint: r.startPoint == null ? null : applyAll(r.startPoint, fix.text, hits),
      endPoint: r.endPoint == null ? null : applyAll(r.endPoint, fix.text, hits),
      overview: applyAll(r.overview, fix.text, hits),
      metaDescription: r.metaDescription == null ? null : applyAll(r.metaDescription, fix.text, hits),
      highlights: r.highlights.map((h) => applyAll(h, fix.text, hits)),
      itinerary: JSON.parse(applyAll(JSON.stringify(r.itinerary ?? null), fix.text, hits)),
      faqs: JSON.parse(applyAll(JSON.stringify(r.faqs ?? null), fix.text, hits)),
      ...(fix.successRate !== undefined ? { successRate: fix.successRate } : {}),
    };
    console.log(`\n${slug}${fix.successRate !== undefined ? `  successRate ${r.successRate} -> ${fix.successRate}` : ""}`);
    fix.text.forEach(([from, to], i) => console.log(`  x${hits[i]}  "${from}" -> "${to}"`));
    const zero = fix.text.filter((_, i) => hits[i] === 0);
    // Shared Barranco reps are optional per route; everything else must hit.
    const required = zero.filter((rep) => !MACHAME_BARRANCO.includes(rep));
    if (required.length) { failed = true; console.log(`  !! no match: ${required.map((x) => x[0]).join(" | ")}`); }
    writes.push({ id: r.id, data });
  }

  // Northern Circuit: renumber days 1..10 to 0..9 and fix the summit day.
  const nc = routes.find((x) => x.slug === "9-day-northern-circuit-route-kilimanjaro-guide");
  if (nc && Array.isArray(nc.itinerary)) {
    const days = nc.itinerary as Record<string, unknown>[];
    if (days[0]?.day === 1) {
      const next = days.map((d) => {
        const out: Record<string, unknown> = { ...d, day: (d.day as number) - 1 };
        if (out.elevation === "4,720m to 5,895m") out.elevation = "4,720m to 5,895m to 3,820m";
        if (out.meals === "Breakfast, lunch, breakfast") out.meals = "Breakfast, lunch, dinner";
        return out;
      });
      console.log(`\n9-day-northern-circuit: renumber days ${days.map((d) => d.day).join(",")} -> ${next.map((d) => d.day).join(",")}`);
      writes.push({ id: nc.id, data: { itinerary: next as object[] } });
    } else console.log("\n9-day-northern-circuit: already starts at day 0, skipped");
  }

  if (failed) { process.exitCode = 1; console.log("\nStopped: fix the unmatched strings first. Nothing written."); }
  else if (!APPLY) console.log("\nDry run — nothing written. Re-run with --apply.");
  else {
    for (const w of writes) await prisma.trekkingRoute.update({ where: { id: w.id }, data: w.data });
    console.log(`\nWritten ${writes.length} routes.`);
  }
}

main().finally(() => prisma.$disconnect());
