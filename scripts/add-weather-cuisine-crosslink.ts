/**
 * Playbook §5 position-drop triage — targeted fix.
 *
 * `tanzanian food` query crashed #1 → #21.6 because
 * /weather-in-tanzania/ outranks /traditional-tanzanian-cuisine/ for
 * that query. Google is topically confused. Adding a clear internal
 * link from the weather post to the cuisine post re-anchors the
 * cuisine query to the cuisine page.
 *
 * The generic linker (add-internal-links-to-blog.ts) couldn't find
 * the exact phrase "Tanzanian cuisine" in the post body, so this
 * script appends a small, semantically-clean "See also" block at the
 * end of /weather-in-tanzania/ pointing at the cuisine post.
 *
 * Idempotent — inserts only if the marker isn't already present.
 *
 * Run with: npx tsx scripts/add-weather-cuisine-crosslink.ts
 */

import "dotenv/config";
import prisma from "../src/lib/prisma";

const MARKER = 'data-seealso="traditional-tanzanian-cuisine"';

const BLOCK = `
<div ${MARKER} style="margin:2.5rem 0;padding:1.25rem 1.5rem;border-left:4px solid #16a34a;background:#f0fdf4;border-radius:0.5rem;">
  <p style="margin:0;font-size:0.95rem;">
    <strong>See also:</strong> Travelling in Tanzania isn&apos;t just about the weather and wildlife — the food is its own experience. Read our guide to <a href="/traditional-tanzanian-cuisine/">traditional Tanzanian cuisine</a> for the dishes to try (ugali, nyama choma, pilau, coastal seafood) and where to eat them on your trip.
  </p>
</div>
`.trim();

async function main() {
  const post = await prisma.blogPost.findUnique({
    where: { slug: "weather-in-tanzania" },
    select: { id: true, content: true },
  });
  if (!post) {
    console.log("SKIP: weather-in-tanzania not found");
    return;
  }

  if (post.content.includes(MARKER)) {
    console.log("OK (no-op): weather-in-tanzania already has the see-also block");
    await prisma.$disconnect();
    return;
  }

  await prisma.blogPost.update({
    where: { slug: "weather-in-tanzania" },
    data: { content: post.content + "\n\n" + BLOCK },
  });
  console.log("OK: weather-in-tanzania — added see-also → traditional-tanzanian-cuisine");
  await prisma.$disconnect();
}

main().catch(async (err) => {
  console.error(err);
  await prisma.$disconnect();
  process.exit(1);
});
