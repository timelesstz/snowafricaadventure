/**
 * Seed the Logo table from the legacy about.commitment.logo1..5 SiteSettings.
 *
 * Names are taken from the actual uploaded filenames, not from the old
 * hardcoded alt text — those two had drifted out of sync, so every logo was
 * announced to screen readers under the wrong organisation's name.
 *
 * Upserts keyed on slug; never deletes. Safe to re-run.
 */
import "dotenv/config";
import prisma from "../src/lib/prisma";

const R2 = "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/about/logos/2026/02";

const logos = [
  {
    slug: "kpap",
    name: "KPAP Certified Partner",
    image: `${R2}/1770724992372-kpap-logo-2019-1.jpeg`,
    linkUrl: "https://www.kiliporters.org/",
    order: 0,
  },
  {
    slug: "tato",
    name: "TATO Licensed Operator",
    image: `${R2}/1770725013142-tato-vector-new-.webp`,
    linkUrl: "https://tatotz.org/",
    order: 1,
  },
  {
    slug: "tripadvisor",
    name: "TripAdvisor",
    image: `${R2}/1770725050076-logo-Tripadvisor-1536x1152.png`,
    linkUrl: null,
    order: 2,
  },
  {
    slug: "tanapa",
    name: "TANAPA — Tanzania National Parks",
    image: `${R2}/1770725590946-6465197170038874ec0aafae-TANAPA.jpeg`,
    linkUrl: null,
    order: 3,
  },
  {
    // Uploaded as a raw WhatsApp export, so the organisation cannot be
    // identified from the file. Keeps the vague label it already rendered
    // with rather than asserting an identity we cannot verify.
    slug: "certification-5",
    name: "Certification",
    image: `${R2}/1781812843430-WhatsApp-Image-2026-06-18-at-8.50.33-PM.jpeg`,
    linkUrl: null,
    order: 4,
  },
];

// Every legacy surface rendered all five logos, so preserve that exactly.
const PLACEMENTS = ["homepage", "about", "footer"];

async function main() {
  console.log(`Seeding ${logos.length} logos...`);

  for (const logo of logos) {
    const data = {
      name: logo.name,
      image: logo.image,
      linkUrl: logo.linkUrl,
      placements: PLACEMENTS,
      order: logo.order,
      isActive: true,
    };

    await prisma.logo.upsert({
      where: { slug: logo.slug },
      update: data,
      create: { slug: logo.slug, ...data },
    });

    console.log(`  ✓ ${logo.name}`);
  }

  const total = await prisma.logo.count();
  console.log(`\nDone. ${total} logos in table.`);
}

main()
  .catch((e) => {
    console.error("Logo seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
