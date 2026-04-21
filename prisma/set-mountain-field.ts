import "dotenv/config";
import prisma from "../src/lib/prisma";

/**
 * Idempotent: sets the `mountain` field on Meru and Lengai routes.
 * All other routes keep the schema default of KILIMANJARO.
 * Safe to re-run — uses scoped `update` with `where`, never `deleteMany`.
 */
async function main() {
  console.log("Setting mountain field on non-Kilimanjaro routes...");

  const updates = [
    { slug: "4-days-mount-meru-climbing", mountain: "MERU" as const },
    { slug: "3-days-oldoinyo-lengai-climbing", mountain: "LENGAI" as const },
  ];

  for (const { slug, mountain } of updates) {
    try {
      const updated = await prisma.trekkingRoute.update({
        where: { slug },
        data: { mountain },
      });
      console.log(`  ${updated.slug} -> ${updated.mountain}`);
    } catch (err: unknown) {
      const code = (err as { code?: string }).code;
      if (code === "P2025") {
        console.log(`  (skip) ${slug} not found in DB`);
      } else {
        throw err;
      }
    }
  }

  console.log("Done.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
