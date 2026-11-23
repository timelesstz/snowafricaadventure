/**
 * Fills empty destination galleries (content-health "Gallery" gap,
 * 2026-11-23) with photos the site already hosts on R2, each one viewed
 * and checked by eye first:
 *   - must show the park (or a plausible scene from it)
 *   - not a copy of the featured image or of another pick
 *   - no stock or photographer watermark
 *   - at least 600px wide
 * Most picks are Snow Africa's own 2026 trip photos.
 *
 * The other 9 parks (Arusha, Gombe, Kitulo, Mkomazi, Mahale, Udzungwa,
 * Katavi, Mikumi, Rubondo) have no usable hosted photo besides their
 * featured image, so they are left for the owner to upload.
 *
 * Writes only where `gallery` is currently empty, so editor changes are
 * never overwritten. Additive only.
 *
 *   npx tsx scripts/fill-destination-galleries.ts            # dry run
 *   npx tsx scripts/fill-destination-galleries.ts --apply    # write
 */
import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";

config({ path: ".env.local", quiet: true });

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL_ACCELERATE,
});

const APPLY = process.argv.includes("--apply");
const R2 = "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/";

type Pick = { path: string; alt: string };

const GALLERIES: Record<string, Pick[]> = {
  "ngorongoro-conservation-area": [
    { path: "daytrips/2026/04/1777297430909-Elephants-in-Ngorongoro.jpeg", alt: "Elephant with cattle egrets on the Ngorongoro Crater floor" },
    { path: "safaris/2026/04/1777274536702-Zebras-in-Ngorongoro.jpeg", alt: "Zebra herd grazing below the Ngorongoro Crater rim" },
    { path: "safaris/2026/04/1777274635619-Ngorongoro-Eland.jpeg", alt: "Eland grazing near the soda lake in Ngorongoro Crater" },
    { path: "safaris/2026/07/1783801442375-Lion-In-Ngorongoro.jpeg", alt: "Male lion resting on a track in Ngorongoro Crater" },
    { path: "safaris/2026/04/1777270929489-Ngorongoro-Crater-view-from-the-lodge.jpeg", alt: "Lodge terrace looking out over Ngorongoro Crater" },
  ],
  "lake-manyara-national-park": [
    { path: "safaris/2026/04/1777144693831-Manyara-photo.jpeg", alt: "Elephants crossing a track in Lake Manyara's groundwater forest" },
    { path: "blog/2026/07/1784378689701-WhatsApp-Image-2026-07-11-at-11.16.48-AM.jpeg", alt: "Giraffes in a dry riverbed among acacias and palms" },
    { path: "safaris/2026/04/1777270857949-Escarpment-lodge-Manyara-2.jpeg", alt: "Thatched pool villas at a lodge on the Manyara escarpment" },
  ],
  "serengeti-national-park": [
    { path: "blog/2026/07/1784380005558-WhatsApp-Image-2026-07-11-at-2.19.03-PM--1-.jpeg", alt: "Wildebeest migration columns crossing the Serengeti plains" },
    { path: "blog/2026/07/1784376866809-WhatsApp-Image-2026-07-11-at-2.19.03-PM.jpeg", alt: "Lioness and cubs on a track across the open Serengeti plains" },
    { path: "blog/2026/07/1784376802229-WhatsApp-Image-2026-07-11-at-2.19.02-PM.jpeg", alt: "Hot air balloon safari over the Serengeti at dawn" },
  ],
  "tarangire-national-park": [
    { path: "routes/2026/07/1784125373500-Tarangire-Elephants-herd.jpeg", alt: "Elephant herd drinking at the Tarangire River" },
    { path: "safaris/2026/04/1777270338505-Tarangire-River-dri.jpeg", alt: "Giraffes and zebras on the dry Tarangire riverbed" },
    { path: "blog/2026/07/1784378756802-WhatsApp-Image-2026-07-11-at-11.16.55-AM--2-.jpeg", alt: "Young elephants playing among acacia scrub in Tarangire" },
    { path: "safaris/2026/04/1777274890526-Elephants-Tarangire.jpeg", alt: "Lions resting in long grass in Tarangire National Park" },
    { path: "safaris/2026/07/1783781207197-Tarangire-Baobab-cave.jpeg", alt: "Visitors at a giant hollow baobab in Tarangire" },
  ],
  "selous-game-reserve": [
    { path: "wp-content/uploads/2025/07/Selous-Game-Reserve-11.webp", alt: "Waterbuck herd in Nyerere (Selous) woodland" },
    { path: "wp-content/uploads/2025/07/kudu-nyerere-national-park.webp", alt: "Greater kudu by the water in Nyerere National Park" },
    { path: "wp-content/uploads/2023/03/Selous-Game-Reserve.jpg", alt: "Weaver bird at its nest in the Selous" },
  ],
  "ruaha-national-park": [
    { path: "blog/2026/07/1784376972152-WhatsApp-Image-2026-07-11-at-2.19.04-PM--1-.jpeg", alt: "Zebras drinking at a river in Ruaha National Park" },
    { path: "wp-content/uploads/2023/03/Ruaha-National-Park.jpg", alt: "Little bee-eater perched in Ruaha National Park" },
  ],
};

async function main() {
  const dests = await prisma.destination.findMany({
    where: { slug: { in: Object.keys(GALLERIES) } },
    select: { id: true, slug: true, gallery: true, galleryAlts: true },
  });

  for (const [slug, picks] of Object.entries(GALLERIES)) {
    const d = dests.find((x) => x.slug === slug);
    if (!d) { console.log(`missing   ${slug}`); continue; }
    if (d.gallery.length > 0) { console.log(`skip      ${slug} (gallery already has ${d.gallery.length})`); continue; }

    const urls = picks.map((p) => R2 + p.path);
    for (const u of urls) {
      const res = await fetch(u, { method: "HEAD" });
      if (!res.ok) throw new Error(`${slug}: ${u} returned ${res.status}`);
    }
    const alts = {
      ...((d.galleryAlts as Record<string, unknown>) ?? {}),
      ...Object.fromEntries(picks.map((p) => [R2 + p.path, { alt: p.alt }])),
    };
    console.log(`${APPLY ? "write" : "would write"} ${slug}: ${urls.length} images`);
    if (APPLY) {
      await prisma.destination.update({ where: { id: d.id }, data: { gallery: urls, galleryAlts: alts } });
    }
  }
  if (!APPLY) console.log("\nDry run — nothing written. Re-run with --apply.");
}

main().finally(() => prisma.$disconnect());
