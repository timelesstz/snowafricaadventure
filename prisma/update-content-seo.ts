/**
 * Content SEO Update Script
 * 1. Adds UNESCO World Heritage context to first-person-to-climb-kilimanjaro
 * 2. Adds specific 2026 dates to tanzania-festival
 * Run with: npx tsx prisma/update-content-seo.ts
 */

import "dotenv/config";
import prisma from "../src/lib/prisma";

async function main() {
  console.log("Starting content SEO updates...\n");

  // === 1. Add UNESCO section to first-person-to-climb-kilimanjaro ===
  const post1 = await prisma.blogPost.findUnique({
    where: { slug: "first-person-to-climb-kilimanjaro" },
    select: { content: true },
  });

  if (post1?.content) {
    const unescoSection = `
<h3>UNESCO World Heritage Recognition</h3>
<p>In 1987, nearly a century after Meyer and Purtscheller's first ascent, <strong>Kilimanjaro National Park was designated a UNESCO World Heritage Site</strong>. The designation recognized the mountain's outstanding universal value — its iconic snow-capped summit rising above the East African savanna, its unique succession of ecological zones, and the glaciers that the 1889 expedition navigated on summit day. UNESCO specifically cited Kilimanjaro as "one of the largest volcanic edifices in the world" with exceptional natural beauty.</p>

<p>The World Heritage status has helped protect the same landscapes these early explorers documented, ensuring that modern climbers experience terrain largely unchanged from what Meyer described in his journals — aside from the dramatic glacier retreat that has reshaped the summit zone. The park's protected status also preserves the cultural heritage of the Chagga communities, including the story of guide Yohani Kinyala Lauwo, whose contribution to the first ascent is now formally recognized.</p>`;

    // Insert after "Scientific Contributions" section, before "Local Recognition"
    const insertBefore = "<h3>Local Recognition</h3>";
    if (post1.content.includes(insertBefore)) {
      const updatedContent = post1.content.replace(
        insertBefore,
        unescoSection + "\n\n" + insertBefore
      );

      await prisma.blogPost.update({
        where: { slug: "first-person-to-climb-kilimanjaro" },
        data: { content: updatedContent },
      });
      console.log("✅ Added UNESCO World Heritage section to first-person-to-climb-kilimanjaro");
    } else {
      console.log("⚠️  Could not find insertion point for UNESCO section");
    }
  } else {
    console.log("⚠️  first-person-to-climb-kilimanjaro not found or has no content");
  }

  // === 2. Add specific 2026 dates to tanzania-festival ===
  const post2 = await prisma.blogPost.findUnique({
    where: { slug: "tanzania-festival" },
    select: { content: true },
  });

  if (post2?.content) {
    let content = post2.content;
    let changes = 0;

    // Sauti za Busara — add specific dates
    const sautiOld = "typically during the second week of February";
    const sautiNew = "in February (the 2026 edition ran February 13–16)";
    if (content.includes(sautiOld)) {
      content = content.replace(sautiOld, sautiNew);
      changes++;
    }

    // ZIFF — add specific month context
    const ziffOld = "held annually in July";
    const ziffNew = "held annually in July (the 2026 edition runs in early July)";
    if (content.includes(ziffOld)) {
      content = content.replace(ziffOld, ziffNew);
      changes++;
    }

    // Bagamoyo — add 2026 context
    const bagOld = "typically in September or October";
    const bagNew = "typically in late September or October (check the Bagamoyo College of Arts website for confirmed 2026 dates)";
    if (content.includes(bagOld)) {
      content = content.replace(bagOld, bagNew);
      changes++;
    }

    // Mwaka Kogwa — add specific dates
    const mwakaOld = "typically falling in late July";
    const mwakaNew = "typically falling in late July (in 2026, celebrations run approximately July 23–26)";
    if (content.includes(mwakaOld)) {
      content = content.replace(mwakaOld, mwakaNew);
      changes++;
    }

    if (changes > 0) {
      await prisma.blogPost.update({
        where: { slug: "tanzania-festival" },
        data: { content },
      });
      console.log(`✅ Updated ${changes} date references in tanzania-festival`);
    } else {
      console.log("⚠️  No matching date strings found in tanzania-festival");
    }
  } else {
    console.log("⚠️  tanzania-festival not found or has no content");
  }

  console.log("\nDone.");
  await prisma.$disconnect();
}

main();
