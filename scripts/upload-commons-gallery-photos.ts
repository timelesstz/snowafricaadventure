/**
 * Adds free-licence Wikimedia Commons photos to destination galleries that
 * have no hosted photos of their own (content-health "Gallery" gap,
 * 2026-11-23). Picks, alt text and credits are in
 * scripts/destination-gallery-commons.json; each photo was viewed by eye
 * before it was picked.
 *
 * For each pick: converts the local download to WebP (max 1600px), uploads
 * it to R2 under destinations/commons/ with a 400px thumbnail, records a
 * Media row (title holds the credit and source page), and appends the URL
 * to the destination gallery. The photographer and licence are shown as
 * the gallery caption, which CC BY / CC BY-SA attribution requires.
 *
 * Additive only. It never removes gallery images and skips any URL already
 * in the gallery, so it is safe to re-run.
 *
 *   npx tsx scripts/upload-commons-gallery-photos.ts <download-dir>            # dry run
 *   npx tsx scripts/upload-commons-gallery-photos.ts <download-dir> --apply    # write
 *
 * <download-dir> holds <slug>/<idx>.jpg, as named in the JSON.
 */
import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
import { readFileSync, existsSync } from "fs";
import path from "path";
import sharp from "sharp";

config({ path: ".env.local", quiet: true });

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL_ACCELERATE,
});

const APPLY = process.argv.includes("--apply");
const DIR = process.argv.slice(2).find((a) => !a.startsWith("--"));

type Pick = {
  slug: string;
  idx: number;
  alt: string;
  title: string;
  artist: string;
  license: string;
  page: string;
};

const credit = (p: Pick) => {
  const who = p.artist.split(",")[0].trim() || "Unknown";
  return p.license.toLowerCase().startsWith("public domain") || p.license === "CC0"
    ? `Photo: ${who} (${p.license}), Wikimedia Commons`
    : `Photo: ${who}, ${p.license}, via Wikimedia Commons`;
};

async function main() {
  if (!DIR) throw new Error("Pass the download directory as the first argument.");
  const picks: Pick[] = JSON.parse(readFileSync("scripts/destination-gallery-commons.json", "utf8"));

  const missing = picks.filter((p) => !existsSync(path.join(DIR, p.slug, `${p.idx}.jpg`)));
  if (missing.length) throw new Error(`missing files: ${missing.map((p) => `${p.slug}/${p.idx}`).join(", ")}`);

  const { uploadToR2 } = await import("../src/lib/r2");
  const slugs = [...new Set(picks.map((p) => p.slug))];
  const dests = await prisma.destination.findMany({
    where: { slug: { in: slugs } },
    select: { id: true, slug: true, gallery: true, galleryAlts: true },
  });

  for (const slug of slugs) {
    const d = dests.find((x) => x.slug === slug);
    if (!d) { console.log(`missing destination ${slug}`); continue; }
    const gallery = [...d.gallery];
    const alts = { ...((d.galleryAlts as Record<string, unknown>) ?? {}) };
    let added = 0;

    for (const p of picks.filter((x) => x.slug === slug)) {
      const key = `destinations/commons/${slug}-${p.idx}.webp`;
      const src = readFileSync(path.join(DIR, slug, `${p.idx}.jpg`));
      const img = sharp(src).rotate().resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true });
      const webp = await img.webp({ quality: 80 }).toBuffer({ resolveWithObject: true });
      const thumb = await sharp(src).rotate().resize({ width: 400 }).jpeg({ quality: 75 }).toBuffer();

      if (!APPLY) {
        console.log(`would add ${slug} <- ${p.title} (${webp.info.width}x${webp.info.height}, ${Math.round(webp.data.length / 1024)}KB) | ${credit(p)}`);
        continue;
      }
      const url = await uploadToR2(webp.data, key, "image/webp");
      const thumbnailUrl = await uploadToR2(thumb, key.replace(/\.webp$/, "-thumb.jpg"), "image/jpeg");
      await prisma.media.upsert({
        where: { key },
        update: {},
        create: {
          filename: p.title,
          key,
          url,
          thumbnailUrl,
          mimeType: "image/webp",
          size: webp.data.length,
          width: webp.info.width,
          height: webp.info.height,
          originalSize: src.length,
          alt: p.alt,
          title: `${credit(p)} — ${p.page}`,
          folder: "destinations",
        },
      });
      if (!gallery.includes(url)) { gallery.push(url); added++; }
      alts[url] = { alt: p.alt, caption: credit(p) };
    }

    if (APPLY) {
      await prisma.destination.update({ where: { id: d.id }, data: { gallery, galleryAlts: alts } });
      console.log(`wrote ${slug}: +${added}, gallery now ${gallery.length}`);
    }
  }
  if (!APPLY) console.log("\nDry run — nothing uploaded or written. Re-run with --apply.");
}

main().finally(() => prisma.$disconnect());
