/**
 * Tags the 45 blog posts that had no tag after fill-blog-taxonomy-gaps.ts
 * (content-health "Tags" gap, 2026-11-19). Hand-picked per post from title
 * and category, reusing the existing vocabulary where a tag fits.
 *
 * Creates 9 new tags for real clusters the vocabulary lacked. Each one is
 * used on 2+ posts, so no single-post tag pages appear. The Mount Meru tag
 * is also added to the two already-tagged Meru posts so that cluster is
 * complete.
 *
 * Additive only (tag upsert by slug, PostTag createMany skipDuplicates).
 *
 *   npx tsx scripts/tag-remaining-posts.ts            # dry run (default)
 *   npx tsx scripts/tag-remaining-posts.ts --apply    # write
 */
import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";

config({ path: ".env.local", quiet: true });

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL_ACCELERATE,
});

const APPLY = process.argv.includes("--apply");

const NEW_TAGS: Record<string, string> = {
  lions: "Lions",
  "tour-operators": "Tour Operators",
  "mount-meru": "Mount Meru",
  coffee: "Coffee",
  wellness: "Wellness",
  "hot-springs": "Hot Springs",
  "snow-in-africa": "Snow in Africa",
  maasai: "Maasai",
  waterfalls: "Waterfalls",
};

const POST_TAGS: Record<string, string[]> = {
  "10-interesting-facts-about-the-lions": ["lions", "wildlife", "safari-animals"],
  "50-reasons-to-visit-tanzania": ["travel-planning", "things-to-do", "tanzania-safari"],
  "a-complete-overview-about-aardvark": ["wildlife", "safari-animals", "tanzania-wildlife"],
  "a-glimpse-on-african-wild-cats": ["wildlife", "safari-animals", "tanzania-wildlife"],
  "african-cape-buffalo": ["big-five", "wildlife", "safari-animals"],
  "amazing-teamwork-of-lions": ["lions", "wildlife", "safari-animals"],
  "best-tour-operator-in-tanzania": ["tour-operators", "safari-planning", "tanzania-safari"],
  "birdwatching-tours-tanzania": ["bird-watching", "wildlife-safari", "nature"],
  "climbing-mount-meru": ["mount-meru", "trekking-tanzania", "mountaineering"],
  "coffee-mindfulness-tanzania": ["coffee", "wellness", "cultural-tours"],
  "coffee-tours-tanzania": ["coffee", "cultural-tours", "excursions"],
  "cycling-tours-tanzania": ["adventure", "things-to-do", "excursions"],
  "geothermal-spa-walking-tanzania": ["hot-springs", "wellness", "nature"],
  "hadzabe-datoga-cultural-tours": ["cultural-tours", "culture", "community"],
  "hidden-waterfalls-in-tanzania": ["waterfalls", "nature", "hiking-tips"],
  "hiking-trails-tanzania": ["trekking-tanzania", "hiking-tips", "waterfalls"],
  "how-lions-hunt-their-prey-watch-these-3-incredible-videos": ["lions", "wildlife"],
  "hunting-strategy-of-the-lions": ["lions", "wildlife"],
  "is-lion-hunting-legal-in-africa": ["lions", "conservation", "regulations"],
  "is-there-snow-in-africa-mountains": ["snow-in-africa", "glaciers", "mountaineering"],
  "lion-vs-lioness": ["lions", "wildlife", "safari-animals"],
  "maasai-healing-rituals-tanzania": ["maasai", "culture", "wellness"],
  "maasai-homestay-tanzania": ["maasai", "cultural-tours", "community"],
  "maasai-tribes-of-tanzania": ["maasai", "culture", "heritage"],
  "ngorongoro-hot-springs": ["hot-springs", "ngorongoro-crater", "nature"],
  "off-the-beaten-path-tanzania": ["adventure", "exploration", "travel-planning"],
  "photographing-tanzania": ["photography", "travel-photography", "wildlife-photography"],
  "responsible-tourism-in-tanzania": ["conservation", "community", "environment"],
  "rift-valley-volcano-hikes": ["volcano", "geology", "trekking-tanzania"],
  "ruaha-walking-safari": ["walking-safari", "ruaha", "southern-circuit"],
  "skiing-in-africa-for-beginners": ["snow-in-africa", "adventure", "activities"],
  "snow-activities-in-africa": ["snow-in-africa", "adventure", "activities"],
  "snow-africa-adventure": ["tour-operators", "kilimanjaro", "tanzania-safari"],
  "sunset-hot-springs-in-tanzania": ["hot-springs", "nature", "excursions"],
  "tanzania-beach-holidays": ["beach-holiday", "zanzibar", "safari-beach"],
  "tanzania-festival": ["culture", "heritage", "things-to-do"],
  "tanzania-itinerary-10-days": ["safari-itinerary", "itinerary", "travel-planning"],
  "tanzania-national-parks-guide": ["national-parks", "tanzania-safari", "wildlife-safari"],
  "tanzania-tour-operators": ["tour-operators", "safari-planning", "tanzania-safari"],
  "traditional-tanzanian-cuisine": ["food", "culture", "street-food"],
  "up-the-mountain-and-back-again-snow-africa-adventures": ["kilimanjaro", "kilimanjaro-experience", "kilimanjaro-climb"],
  "wellness-retreats-tanzania": ["wellness", "luxury-travel", "travel-planning"],
  "why-do-zebra-and-wildebeest-migrate-together": ["great-migration", "serengeti", "wildlife"],
  "why-there-is-no-tiger-in-tanzania": ["wildlife", "tanzania-wildlife", "safari-animals"],
  "your-tipping-guide-for-tanzania": ["travel-planning", "safari-tips", "costs"],
  // Completing clusters on posts that already have other tags.
  "kilimanjaro-vs-mount-meru": ["mount-meru"],
  "climbing-mount-meru-why-you-should-climb-it-before-climbing-kilimanjaro": ["mount-meru"],
};

async function main() {
  const slugs = Object.keys(POST_TAGS);
  const [posts, existing] = await Promise.all([
    prisma.blogPost.findMany({ where: { slug: { in: slugs } }, select: { id: true, slug: true } }),
    prisma.tag.findMany({ select: { id: true, slug: true } }),
  ]);
  const postId = new Map(posts.map((p) => [p.slug, p.id]));
  const tagId = new Map(existing.map((t) => [t.slug, t.id]));

  const missingPosts = slugs.filter((s) => !postId.has(s));
  const wanted = new Set(Object.values(POST_TAGS).flat());
  const unknownTags = [...wanted].filter((t) => !tagId.has(t) && !NEW_TAGS[t]);
  if (missingPosts.length || unknownTags.length) {
    console.log(`missing posts: ${missingPosts.join(", ") || "none"}`);
    console.log(`unknown tags: ${unknownTags.join(", ") || "none"}`);
    process.exitCode = 1;
    return;
  }

  const toCreate = Object.keys(NEW_TAGS).filter((s) => !tagId.has(s));
  console.log(`new tags: ${toCreate.join(", ") || "none"}`);
  for (const [slug, tags] of Object.entries(POST_TAGS)) console.log(`${slug} -> ${tags.join(", ")}`);

  if (!APPLY) {
    console.log("\nDry run — nothing written. Re-run with --apply.");
    return;
  }

  for (const slug of toCreate) {
    const t = await prisma.tag.upsert({
      where: { slug },
      update: {},
      create: { slug, name: NEW_TAGS[slug] },
      select: { id: true },
    });
    tagId.set(slug, t.id);
  }

  const rows = Object.entries(POST_TAGS).flatMap(([slug, tags]) =>
    tags.map((t) => ({ postId: postId.get(slug) as string, tagId: tagId.get(t) as string }))
  );
  const res = await prisma.postTag.createMany({ data: rows, skipDuplicates: true });
  console.log(`\nCreated ${toCreate.length} tags and ${res.count} tag links.`);
}

main().finally(() => prisma.$disconnect());
