/**
 * Read-only: for each destination with fewer than 3 gallery images, lists
 * candidate photos the site already hosts that name that park:
 *   - media-library images whose filename or alt names the park
 *     (WordPress size variants like -300x200 collapsed to one original)
 *   - <img> tags inside blog posts whose slug or title names the park
 *   - featured images of those blog posts and of day trips / safaris named
 *     after the park
 * Writes nothing.
 */
import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";

config({ path: ".env.local", quiet: true });

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL_ACCELERATE,
});

const KEYS: Record<string, string[]> = {
  "ngorongoro-conservation-area": ["ngorongoro"],
  "lake-manyara-national-park": ["manyara"],
  "arusha-national-park": ["arusha-national", "arusha national", "momella", "momela"],
  "selous-game-reserve": ["selous", "nyerere"],
  "serengeti-national-park": ["serengeti"],
  "ruaha-national-park": ["ruaha"],
  "tarangire-national-park": ["tarangire"],
  "gombe-stream-national-park": ["gombe"],
  "kitulo-national-park": ["kitulo"],
  "mkomazi-national-park": ["mkomazi"],
  "mahale-national-park": ["mahale"],
  "udzungwa-national-park": ["udzungwa"],
  "katavi-national-park": ["katavi"],
  "mikumi-national-park": ["mikumi"],
  "rubondo-island-national-park": ["rubondo"],
};

const base = (u: string) =>
  u.split("?")[0].replace(/-\d{2,4}x\d{2,4}(?=\.\w+$)/, "").replace(/-scaled(?=\.\w+$)/, "");

async function main() {
  const [dests, media, posts, trips, safaris] = await Promise.all([
    prisma.destination.findMany({ select: { slug: true, featuredImage: true, gallery: true } }),
    prisma.media.findMany({
      where: { mimeType: { startsWith: "image/" } },
      select: { url: true, filename: true, alt: true, width: true },
    }),
    prisma.blogPost.findMany({ select: { slug: true, title: true, content: true, featuredImage: true } }),
    prisma.dayTrip.findMany({ select: { slug: true, featuredImage: true, gallery: true } }),
    prisma.safariPackage.findMany({ select: { slug: true, featuredImage: true } }),
  ]);

  for (const d of dests) {
    if (d.gallery.length >= 3) continue;
    const keys = KEYS[d.slug] ?? [d.slug.split("-")[0]];
    const hit = (s: string | null | undefined) => !!s && keys.some((k) => s.toLowerCase().includes(k));
    const found = new Map<string, string>(); // base url -> source + alt
    const add = (url: string | null | undefined, src: string) => {
      if (!url) return;
      const b = base(url);
      if (b === base(d.featuredImage ?? "") || d.gallery.some((g) => base(g) === b)) return;
      if (!found.has(b)) found.set(b, src);
    };

    for (const m of media) if (hit(m.filename) || hit(m.alt)) add(m.url, `media alt="${m.alt ?? ""}" w=${m.width ?? "?"}`);
    for (const p of posts) {
      if (!(hit(p.slug) || hit(p.title))) continue;
      add(p.featuredImage, `post-featured ${p.slug}`);
      for (const m of p.content.matchAll(/<img[^>]*>/g)) {
        const src = m[0].match(/src="([^"]+)"/)?.[1];
        const alt = m[0].match(/alt="([^"]*)"/)?.[1] ?? "";
        if (src && (hit(alt) || hit(src))) add(src, `post-img ${p.slug} alt="${alt}"`);
      }
    }
    for (const t of trips) if (hit(t.slug)) { add(t.featuredImage, `daytrip ${t.slug}`); t.gallery.forEach((g) => add(g, `daytrip-gallery ${t.slug}`)); }
    for (const s of safaris) if (hit(s.slug)) add(s.featuredImage, `safari ${s.slug}`);

    console.log(`\n### ${d.slug} (gallery ${d.gallery.length}) featured=${d.featuredImage ?? "none"}`);
    for (const [u, src] of found) console.log(`  ${u}  <- ${src}`);
  }
}

main().finally(() => prisma.$disconnect());
