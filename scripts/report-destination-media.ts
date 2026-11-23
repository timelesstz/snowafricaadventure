/**
 * Read-only: for each destination with no gallery, list media-library images
 * whose filename or alt text names that park, plus images already used in
 * that park's blog guide. Candidates only; writes nothing.
 */
import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";

config({ path: ".env.local", quiet: true });

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL_ACCELERATE,
});

// Search keys per destination: the distinctive word(s) of the park name.
const KEYS: Record<string, string[]> = {
  "ngorongoro-conservation-area": ["ngorongoro"],
  "lake-manyara-national-park": ["manyara"],
  "arusha-national-park": ["arusha-national", "arusha_national", "momella", "meru-crater"],
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

async function main() {
  const media = await prisma.media.findMany({
    where: { mimeType: { startsWith: "image/" } },
    select: { url: true, filename: true, alt: true, width: true, height: true, size: true },
  });

  const out: Record<string, { filename: string; url: string; alt: string | null; w: number | null; h: number | null }[]> = {};
  for (const [slug, keys] of Object.entries(KEYS)) {
    out[slug] = media
      .filter((m) => {
        const hay = `${m.filename} ${m.alt ?? ""}`.toLowerCase();
        return keys.some((k) => hay.includes(k));
      })
      .map((m) => ({ filename: m.filename, url: m.url, alt: m.alt, w: m.width, h: m.height }));
  }
  console.log(JSON.stringify({ mediaImages: media.length, candidates: out }, null, 2));
}

main().finally(() => prisma.$disconnect());
