/**
 * Read-only: prints the facts already stored for trekking routes that have no
 * FAQs (plus the FAQs of sibling routes) so FAQ drafts can be grounded in the
 * site's own data rather than invented. Writes nothing.
 */
import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";

config({ path: ".env.local", quiet: true });

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL_ACCELERATE,
});

async function main() {
  const routes = await prisma.trekkingRoute.findMany({
    select: {
      slug: true,
      title: true,
      duration: true,
      durationDays: true,
      startPoint: true,
      endPoint: true,
      physicalRating: true,
      successRate: true,
      summitHeight: true,
      overview: true,
      highlights: true,
      itinerary: true,
      faqs: true,
    },
  });
  const strip = (s: string) => s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  for (const r of routes) {
    const hasFaqs = Array.isArray(r.faqs) && r.faqs.length > 0;
    console.log(`\n### ${r.slug} ${hasFaqs ? "(HAS FAQS)" : "(NO FAQS)"}`);
    console.log(
      JSON.stringify({
        duration: r.duration,
        days: r.durationDays,
        start: r.startPoint,
        end: r.endPoint,
        rating: r.physicalRating,
        success: r.successRate,
        summit: r.summitHeight,
      })
    );
    if (hasFaqs) {
      for (const f of r.faqs as { question: string; answer: string }[]) {
        console.log(`Q: ${f.question}\nA: ${strip(f.answer)}`);
      }
      continue;
    }
    console.log(`OVERVIEW: ${strip(r.overview).slice(0, 1500)}`);
    console.log(`HIGHLIGHTS: ${r.highlights.join(" / ")}`);
    if (Array.isArray(r.itinerary)) {
      for (const d of r.itinerary as Record<string, unknown>[]) {
        const pick = (k: string) => (typeof d[k] === "string" || typeof d[k] === "number" ? d[k] : "");
        console.log(
          `- D${pick("day")}: ${pick("title")} | ${pick("elevation") || pick("altitude")} | ${pick("distance")} | ${pick("hikingTime") || pick("duration")} | ${strip(String(pick("description"))).slice(0, 160)}`
        );
      }
    }
  }
}

main().finally(() => prisma.$disconnect());
