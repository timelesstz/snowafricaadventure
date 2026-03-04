/**
 * Fix SEO recommendations:
 * 1. Update blog post metadata for better CTR (aardvark + lions posts)
 * 2. Create redirects for high-traffic 404 URLs
 * 3. Mark bot/spam 404s as ignored
 *
 * Run: npx tsx scripts/fix-seo-recommendations.ts
 */

import "dotenv/config";
import prisma from "../src/lib/prisma";

async function main() {
  console.log("🔧 Fixing SEO recommendations...\n");

  // =============================================
  // 1. UPDATE BLOG POST METADATA FOR BETTER CTR
  // =============================================
  console.log("📝 Updating blog post metadata for better CTR...\n");

  const metaUpdates = [
    {
      slug: "a-complete-overview-about-aardvark",
      metaTitle: "Aardvark: How to Spot One on Safari",
      metaDescription:
        "Where and when to see aardvarks in Tanzania. Night drive tips, best parks, and what makes this bizarre nocturnal mammal Africa's most elusive wildlife sighting.",
      excerpt:
        "The aardvark is one of Africa's hardest animals to spot. Learn where to find them, when to go, and what makes night game drives your best chance.",
    },
    {
      slug: "hunting-strategy-of-the-lions",
      metaTitle: "How Lions Hunt: Watch the Strategy",
      metaDescription:
        "See how lion prides coordinate hunts — ambush tactics, role assignments, and why females lead the kill. Real strategies witnessed on Tanzania safaris.",
      excerpt:
        "Lion hunting is a team sport. Discover the ambush tactics, pride coordination, and real strategies behind Africa's most dramatic predator-prey encounters.",
    },
  ];

  for (const update of metaUpdates) {
    const result = await prisma.blogPost.updateMany({
      where: { slug: update.slug },
      data: {
        metaTitle: update.metaTitle,
        metaDescription: update.metaDescription,
        excerpt: update.excerpt,
      },
    });
    console.log(
      `  ${result.count > 0 ? "✅" : "⚠️"} ${update.slug}: ${result.count} record(s) updated`
    );
    console.log(`     Title: "${update.metaTitle}" (${update.metaTitle.length} chars)`);
    console.log(`     Desc:  "${update.metaDescription}" (${update.metaDescription.length} chars)`);
    console.log();
  }

  // =============================================
  // 2. CREATE REDIRECTS FOR HIGH-TRAFFIC 404 URLs
  // =============================================
  console.log("🔀 Creating redirects for high-traffic 404 URLs...\n");

  const redirects = [
    {
      sourceUrl: "/itineraries/5788127e-61a5-4b62-9355-93fc4fa3df1b",
      destinationUrl: "/tanzania-safaris/",
      notes: "Old itinerary UUID URL → safaris page (17 hits)",
    },
    {
      sourceUrl: "/i/itn_4fa3df1b_mlf4t1dl_la4gcne",
      destinationUrl: "/tanzania-safaris/",
      notes: "Old short itinerary URL → safaris page (17 hits)",
    },
    {
      sourceUrl: "/auth/signin",
      destinationUrl: "/admin/login/",
      notes: "Old NextAuth signin path → admin login (6 hits)",
    },
  ];

  for (const redirect of redirects) {
    try {
      const existing = await prisma.redirect.findUnique({
        where: { sourceUrl: redirect.sourceUrl },
      });

      if (existing) {
        console.log(`  ⏭️  Redirect already exists: ${redirect.sourceUrl} → ${existing.destinationUrl}`);
        continue;
      }

      const created = await prisma.redirect.create({
        data: {
          sourceUrl: redirect.sourceUrl,
          destinationUrl: redirect.destinationUrl,
          type: "PERMANENT",
          isActive: true,
          notes: redirect.notes,
        },
      });
      console.log(`  ✅ Created redirect: ${created.sourceUrl} → ${created.destinationUrl}`);

      // Link to NotFoundUrl if it exists
      const notFoundUrl = await prisma.notFoundUrl.findFirst({
        where: {
          url: { in: [redirect.sourceUrl, redirect.sourceUrl + "/"] },
        },
      });
      if (notFoundUrl) {
        await prisma.notFoundUrl.update({
          where: { id: notFoundUrl.id },
          data: { status: "REDIRECTED", redirectId: created.id },
        });
        console.log(`     📎 Linked to 404 entry (${notFoundUrl.hitCount} hits)`);
      }
    } catch (error: any) {
      console.log(`  ❌ Error creating redirect for ${redirect.sourceUrl}: ${error.message}`);
    }
  }

  // =============================================
  // 3. MARK BOT/SPAM 404s AS IGNORED
  // =============================================
  console.log("\n🤖 Marking bot/spam 404 URLs as ignored...\n");

  const ignoreUrls = [
    "/webmail",
    "/webmail/",
    "/auto.php",
    "/auto.php/",
    "/wp-login.php",
    "/wp-login.php/",
    "/apple-app-site-association",
    "/apple-app-site-association/",
  ];

  const ignored = await prisma.notFoundUrl.updateMany({
    where: {
      url: { in: ignoreUrls },
      status: "ACTIVE",
    },
    data: { status: "IGNORED" },
  });
  console.log(`  ✅ Marked ${ignored.count} bot/spam 404 entries as IGNORED`);

  console.log("\n✨ All SEO recommendations fixed!");
}

main()
  .catch((e) => {
    console.error("Script failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
