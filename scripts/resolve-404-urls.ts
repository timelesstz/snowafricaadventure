import "dotenv/config";
import { PrismaClient, RedirectType } from "@prisma/client";

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL_ACCELERATE,
});

const DRY_RUN = process.argv.includes("--dry-run");

// Redirect sourceUrl normalization (matches redirect-cache.ts)
function normalizeForRedirect(url: string): string {
  return url.toLowerCase().replace(/\/+$/, "") || "/";
}

// URLs with /c/ prefix = e-commerce spam probes
const SPAM_PREFIX = "/c/";

// Misc URLs to ignore
const IGNORE_PATTERNS = ["/test/", "/og-image.jpg", "/gift-mode/"];

// URLs already handled by next.config.ts redirects - mark as IGNORED
const ALREADY_REDIRECTED_IN_CONFIG = [
  "/mkomazi-national-park/",
  "/tanzania-northern-circuit/",
  "/10-reasons-why-you-should-go-for-tanzania-safari-to-see-the-great-migration/",
  "/tanzania-safety/",
  "/kilimanjaro-rescue/",
  "/tanzania-destination/",
  "/tanzania-tourist-visa/",
  "/tanzania-safari-packing-list/",
  "/ngorongoro-conservation-area/",
  "/6-days-umbwe-route/",
  "/kilimanjaro-record/",
  "/eco-safari-lodges-in-tanzania-sustainable-travel-insights/",
  "/sustainability/",
  "/arusha-national-park-day-tour/",
  "/kilimanjaro-trekking/",
  "/how-high-is-kilimanjaro-mountain/",
  "/contact/",
  "/destinations/",
];

// New redirects: source uses trailing-slash format (as stored in NotFoundUrl)
// destination uses trailing-slash format (as expected by the site)
const NEW_REDIRECTS: { source: string; destination: string; notes: string }[] = [
  // Destination pages without /tanzania-destinations/ prefix
  { source: "/kitulo-national-park/", destination: "/tanzania-destinations/kitulo-national-park/", notes: "Destination without prefix" },
  { source: "/lake-manyara-national-park/", destination: "/tanzania-destinations/lake-manyara-national-park/", notes: "Destination without prefix" },
  { source: "/ruaha-national-park/", destination: "/tanzania-destinations/ruaha-national-park/", notes: "Destination without prefix" },

  // Trekking routes without /trekking/ prefix
  { source: "/machame-route/", destination: "/trekking/7-days-machame-route/", notes: "Trekking route without prefix" },
  { source: "/rongai-route/", destination: "/trekking/7-days-rongai-route/", notes: "Trekking route without prefix" },
  { source: "/lemosho-route/", destination: "/trekking/8-days-lemosho-route/", notes: "Trekking route without prefix" },
  { source: "/mountain-trekking/", destination: "/trekking/", notes: "Generic trekking URL" },

  // Day trip "tour" vs "trip" slug variants
  { source: "/arusha-city-day-tour/", destination: "/tanzania-day-tours/arusha-city-day-trip/", notes: "tour vs trip slug variant" },
  { source: "/tarangire-national-park-day-tour/", destination: "/tanzania-day-tours/tarangire-national-park-day-trip/", notes: "tour vs trip slug variant" },
  { source: "/lake-manyara-day-tour/", destination: "/tanzania-day-tours/lake-manyara-day-trip/", notes: "tour vs trip slug variant" },

  // Safari package slug variants
  { source: "/tanzania-safaris/4-days-tanzania-lodge-safari/", destination: "/tanzania-safaris/", notes: "No exact safari match" },
  { source: "/tanzania-safaris/7-days-tanzania-tented-camp-safari-2/", destination: "/tanzania-safaris/7-days-tanzania-tented-camp-safari/", notes: "Slug variant with -2 suffix" },
  { source: "/tanzania-safaris/7-days-safari-to-tanzania-serval-wildlife/", destination: "/tanzania-safaris/7-days-safari-to-tanzania-including-serval-wildlife/", notes: "Missing 'including' in slug" },
  { source: "/tanzania-safaris/6-days-tanzania-migration-safari-ndutu-manyara-serengeti-ngorongoro-crater/", destination: "/tanzania-safaris/6-days-tanzania-migration-serengeti-ngorongoro-crater-tarangire/", notes: "Old migration safari slug" },
  { source: "/6-day-migration-safari-ndutu-manyara-sere-ngorongorocrater/", destination: "/tanzania-safaris/6-days-tanzania-migration-serengeti-ngorongoro-crater-tarangire/", notes: "Old WordPress slug with typos" },
  { source: "/tanzania-safaris/shu-s/", destination: "/tanzania-safaris/", notes: "Bot-generated garbage slug" },

  // Blog post URL variants
  { source: "/wildlife-conservation-efforts-in-tanzania-how-tourists-can-contribute/", destination: "/wildlife-conservation-efforts/", notes: "Long blog slug to short canonical" },
  { source: "/snow-covered-destinations-in-africa/", destination: "/is-there-snow-in-africa-mountains/", notes: "Blog content match" },
  { source: "/kilimanjaro-routes-success-rates/", destination: "/kilimanjaro-success-rates/", notes: "Slug variant to static page" },
  { source: "/kilimanjaro-climb-gear-list/", destination: "/kilimanjaro-climbing-gear/", notes: "Slug variant to static page" },
  { source: "/cultural-festivals-in-tanzania/", destination: "/tanzania-festival/", notes: "Blog slug variant" },
  { source: "/visa-for-kilimanjaro/", destination: "/things-to-remember-before-climbing-mount-kilimanjaro/", notes: "Visa info to prep guide" },
  { source: "/3-days-2-nights-oldoinyolengai/", destination: "/trekking/3-days-oldoinyo-lengai-climbing/", notes: "Old slug without /trekking/ prefix" },
  { source: "/mount-kilimanjaro-altitude-sickness/", destination: "/kilimanjaro-altitude-sickness/", notes: "Slug variant to static page" },
  { source: "/conquering-the-roof-of-africa-the-inspiring-journey-of-the-first-person-to-climb-mount-kilimanjaro/", destination: "/first-person-to-climb-kilimanjaro/", notes: "Long blog slug to short canonical" },
  { source: "/maasai-healing-rituals-tanzania-ancient-wellness-in-geothermal-settings/", destination: "/maasai-healing-rituals-tanzania/", notes: "Long blog slug to short canonical" },

  // Walking safari
  { source: "/7-days-walking-safari-ngorongoro-highland/", destination: "/tanzania-safaris/walking-safari-trekking-on-ngorongoro/", notes: "Old walking safari URL" },

  // Legal/misc pages
  { source: "/legal/ip/", destination: "/privacy-policy/", notes: "Old legal page" },
  { source: "/legal/terms-of-use/", destination: "/terms-and-conditions/", notes: "Old legal page" },
  { source: "/meru1.html", destination: "/trekking/4-days-mount-meru-climbing/", notes: "Old HTML page" },
];

async function findNotFoundUrl(url: string) {
  // Try exact match first, then try with/without trailing slash
  const variants = [url, url.replace(/\/$/, ""), url.endsWith("/") ? url : url + "/"];
  for (const v of variants) {
    const record = await prisma.notFoundUrl.findFirst({
      where: { url: v },
      select: { id: true, url: true, status: true, redirectId: true },
    });
    if (record) return record;
  }
  return null;
}

async function main() {
  console.log(DRY_RUN ? "\n=== DRY RUN MODE ===\n" : "\n=== EXECUTING ===\n");

  let ignoredCount = 0;
  let redirectedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  // --- Section A: Mark /c/ spam URLs as IGNORED ---
  console.log("--- Section A: Marking /c/ spam URLs as IGNORED ---");
  const allActive = await prisma.notFoundUrl.findMany({
    where: { status: "ACTIVE" },
    select: { id: true, url: true },
  });

  const spamUrls = allActive.filter((u) => u.url.startsWith(SPAM_PREFIX));
  console.log(`Found ${spamUrls.length} spam /c/ URLs (out of ${allActive.length} active)`);
  if (!DRY_RUN && spamUrls.length > 0) {
    await prisma.notFoundUrl.updateMany({
      where: { id: { in: spamUrls.map((u) => u.id) } },
      data: { status: "IGNORED" },
    });
  }
  ignoredCount += spamUrls.length;

  // --- Section A2: Mark misc ignore URLs ---
  console.log("\n--- Section A2: Marking misc URLs as IGNORED ---");
  for (const url of IGNORE_PATTERNS) {
    const record = await findNotFoundUrl(url);
    if (record && record.status === "ACTIVE") {
      console.log(`  IGNORE: ${record.url}`);
      if (!DRY_RUN) {
        await prisma.notFoundUrl.update({
          where: { id: record.id },
          data: { status: "IGNORED" },
        });
      }
      ignoredCount++;
    } else {
      console.log(`  SKIP: ${url} ${record ? `(status: ${record.status})` : "(not in DB)"}`);
      skippedCount++;
    }
  }

  // --- Section B: Mark WordPress date archives as IGNORED ---
  console.log("\n--- Section B: Marking WordPress date archives as IGNORED ---");
  const dateUrls = allActive.filter((u) => /^\/\d{4}\/\d{2}\/\d{2}\/?$/.test(u.url));
  console.log(`Found ${dateUrls.length} WordPress date archive URLs`);
  for (const u of dateUrls) {
    console.log(`  IGNORE: ${u.url}`);
  }
  if (!DRY_RUN && dateUrls.length > 0) {
    await prisma.notFoundUrl.updateMany({
      where: { id: { in: dateUrls.map((u) => u.id) } },
      data: { status: "IGNORED" },
    });
  }
  ignoredCount += dateUrls.length;

  // --- Section C: Mark already-redirected-in-config URLs as IGNORED ---
  console.log("\n--- Section C: Marking next.config.ts-redirected URLs as IGNORED ---");
  for (const url of ALREADY_REDIRECTED_IN_CONFIG) {
    const record = await findNotFoundUrl(url);
    if (record && record.status === "ACTIVE") {
      console.log(`  IGNORE: ${record.url}`);
      if (!DRY_RUN) {
        await prisma.notFoundUrl.update({
          where: { id: record.id },
          data: { status: "IGNORED" },
        });
      }
      ignoredCount++;
    } else {
      console.log(`  SKIP: ${url} ${record ? `(status: ${record.status})` : "(not in DB)"}`);
      skippedCount++;
    }
  }

  // --- Section D: Create new DB redirects ---
  console.log("\n--- Section D: Creating new database redirects ---");
  for (const { source, destination, notes } of NEW_REDIRECTS) {
    // Redirect sourceUrl is stored without trailing slash (redirect-cache.ts convention)
    const redirectSourceUrl = normalizeForRedirect(source);

    // Check if redirect already exists
    const existing = await prisma.redirect.findUnique({
      where: { sourceUrl: redirectSourceUrl },
    });
    if (existing) {
      console.log(`  SKIP (redirect exists): ${redirectSourceUrl} -> ${existing.destinationUrl}`);
      skippedCount++;
      continue;
    }

    // Find the 404 record to link (stored with trailing slashes)
    const notFoundRecord = await findNotFoundUrl(source);

    console.log(`  REDIRECT: ${redirectSourceUrl} -> ${destination} ${notFoundRecord ? "(linked to 404)" : "(no 404 record)"}`);

    if (!DRY_RUN) {
      try {
        await prisma.redirect.create({
          data: {
            sourceUrl: redirectSourceUrl,
            destinationUrl: destination,
            type: RedirectType.PERMANENT,
            isActive: true,
            notes,
            createdBy: "resolve-404-script",
            ...(notFoundRecord && !notFoundRecord.redirectId
              ? { notFoundUrl: { connect: { id: notFoundRecord.id } } }
              : {}),
          },
        });

        if (notFoundRecord && !notFoundRecord.redirectId) {
          await prisma.notFoundUrl.update({
            where: { id: notFoundRecord.id },
            data: { status: "REDIRECTED" },
          });
        }

        redirectedCount++;
      } catch (err) {
        console.error(`  ERROR creating redirect for ${redirectSourceUrl}:`, (err as Error).message);
        errorCount++;
      }
    } else {
      redirectedCount++;
    }
  }

  // --- Summary ---
  console.log("\n=== SUMMARY ===");
  console.log(`Ignored:    ${ignoredCount}`);
  console.log(`Redirected: ${redirectedCount}`);
  console.log(`Skipped:    ${skippedCount}`);
  console.log(`Errors:     ${errorCount}`);
  if (DRY_RUN) {
    console.log("\n(Dry run - no changes were made)");
  }

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
