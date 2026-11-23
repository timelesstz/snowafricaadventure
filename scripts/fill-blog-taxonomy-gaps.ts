/**
 * Fills the "Categories" and "Tags" gaps on /admin/seo/content-health/.
 *
 * Additive only: creates PostCategory / PostTag rows with skipDuplicates,
 * touches only posts that currently have NO category (resp. NO tag), and
 * never creates new categories or tags — it reuses the existing vocabulary.
 *
 *   npx tsx scripts/fill-blog-taxonomy-gaps.ts            # dry run (default)
 *   npx tsx scripts/fill-blog-taxonomy-gaps.ts --apply    # write
 *
 * Categories: an explicit, hand-reviewed map (all 48 uncategorised posts were
 * Kilimanjaro articles on 2026-11-19). Posts not in the map are reported, not
 * guessed.
 *
 * Tags: an existing tag is applied when every word of its slug appears in the
 * post's slug or title. Only tags already used on 2+ posts are considered, so
 * one-off tags don't spread. Max 4 per post, most specific first. Posts with
 * no confident match are left untagged and listed.
 */
import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";

config({ path: ".env.local", quiet: true });

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL_ACCELERATE,
});

const APPLY = process.argv.includes("--apply");

/** About the mountain itself (geography, facts, comparisons). */
const MOUNT_KILIMANJARO = [
  "kilimanjaro-meaning-name-origin",
  "kilimanjaro-vs-mount-kenya",
  "kilimanjaro-fun-facts",
  "where-is-mount-kilimanjaro",
  "kilimanjaro-vs-mount-meru",
  "kilimanjaro-night-sky",
  "kilimanjaro-vs-everest-base-camp",
  "kilimanjaro-myths",
  "kilimanjaro-wildlife",
  "kilimanjaro-shira-plateau",
  "kilimanjaro-uhuru-peak",
];

/** Trip planning around a climb (cost, combos, people, occasions). */
const KILIMANJARO = [
  "kilimanjaro-budget-guide",
  "kilimanjaro-safari-combo",
  "kilimanjaro-proposals",
  "kilimanjaro-volunteering",
  "kilimanjaro-certificates",
  "kilimanjaro-weight-loss",
  "kilimanjaro-porters",
  "kilimanjaro-group-vs-private",
];

/** How to climb it: routes, preparation, on-mountain advice. */
const CLIMBING_GUIDE = [
  "8-day-lemosho-route-kilimanjaro-guide",
  "6-day-rongai-route-kilimanjaro-guide",
  "climbing-kilimanjaro-over-50",
  "kilimanjaro-trail-running",
  "kilimanjaro-lemosho-vs-machame",
  "kilimanjaro-acclimatization",
  "kilimanjaro-barranco-wall",
  "kilimanjaro-machame-vs-rongai",
  "kilimanjaro-photography-guide",
  "kilimanjaro-what-to-expect",
  "kilimanjaro-rongai-route-guide",
  "kilimanjaro-marangu-route-guide",
  "kilimanjaro-fitness-test",
  "kilimanjaro-full-moon-climb",
  "kilimanjaro-camping",
  "kilimanjaro-crater-camp",
  "kilimanjaro-umbwe-route",
  "kilimanjaro-after-summit",
  "kilimanjaro-packing-mistakes",
  "kilimanjaro-rainy-season",
  "kilimanjaro-drinking-water",
  "kilimanjaro-with-kids",
  "kilimanjaro-northern-circuit",
  "kilimanjaro-phone-signal",
  "kilimanjaro-sleeping-tips",
  "kilimanjaro-rescue-evacuation",
  "kilimanjaro-summit-sunrise",
  "kilimanjaro-mental-preparation",
  "kilimanjaro-sun-protection",
];

const CATEGORY_MAP: Record<string, string> = Object.fromEntries([
  ...MOUNT_KILIMANJARO.map((s) => [s, "mount-kilimanjaro"]),
  ...KILIMANJARO.map((s) => [s, "kilimanjaro"]),
  ...CLIMBING_GUIDE.map((s) => [s, "kilimanjaro-climbing-guide"]),
]);

const MAX_TAGS = 4;

function words(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter(Boolean)
      .map((w) => (w.length > 3 && w.endsWith("s") ? w.slice(0, -1) : w))
  );
}

async function main() {
  const [categories, tags, posts] = await Promise.all([
    prisma.category.findMany({ select: { id: true, slug: true } }),
    prisma.tag.findMany({
      select: { id: true, slug: true, _count: { select: { posts: true } } },
    }),
    prisma.blogPost.findMany({
      select: {
        id: true,
        slug: true,
        title: true,
        _count: { select: { categories: true, tags: true } },
      },
    }),
  ]);
  const categoryId = new Map(categories.map((c) => [c.slug, c.id]));

  // ── Categories ──
  const catRows: { postId: string; categoryId: string }[] = [];
  const unmapped: string[] = [];
  for (const p of posts.filter((p) => p._count.categories === 0)) {
    const target = CATEGORY_MAP[p.slug];
    const id = target ? categoryId.get(target) : undefined;
    if (!id) {
      unmapped.push(p.slug);
      continue;
    }
    catRows.push({ postId: p.id, categoryId: id });
    console.log(`category  ${p.slug} -> ${target}`);
  }

  // ── Tags ──
  const vocab = tags
    .filter((t) => t._count.posts >= 2)
    .map((t) => ({ ...t, words: [...words(t.slug)] }))
    // Most specific (more words) first, then most used.
    .sort((a, b) => b.words.length - a.words.length || b._count.posts - a._count.posts);

  const tagRows: { postId: string; tagId: string }[] = [];
  const untagged: string[] = [];
  for (const p of posts.filter((p) => p._count.tags === 0)) {
    const have = words(`${p.slug} ${p.title}`);
    const picked: string[] = [];
    for (const t of vocab) {
      if (picked.length >= MAX_TAGS) break;
      if (!t.words.every((w) => have.has(w))) continue;
      // Skip a tag whose words are already covered by a more specific pick
      // (e.g. "kilimanjaro" once "kilimanjaro-routes" is chosen) — unless
      // the post would otherwise have only one tag.
      const covered = picked.some((s) => t.words.every((w) => words(s).has(w)));
      if (covered && picked.length >= 2) continue;
      picked.push(t.slug);
      tagRows.push({ postId: p.id, tagId: t.id });
    }
    if (picked.length === 0) untagged.push(p.slug);
    else console.log(`tags      ${p.slug} -> ${picked.join(", ")}`);
  }

  console.log(`\n${catRows.length} category links, ${tagRows.length} tag links`);
  console.log(`unmapped (no category): ${unmapped.length ? unmapped.join(", ") : "none"}`);
  console.log(`no confident tag match: ${untagged.length}`);
  if (untagged.length) console.log(untagged.join("\n"));

  if (!APPLY) {
    console.log("\nDry run — nothing written. Re-run with --apply.");
    return;
  }
  const c = await prisma.postCategory.createMany({ data: catRows, skipDuplicates: true });
  const t = await prisma.postTag.createMany({ data: tagRows, skipDuplicates: true });
  console.log(`\nWrote ${c.count} category links and ${t.count} tag links.`);
}

main().finally(() => prisma.$disconnect());
