/**
 * Monitor Query SEO Expansion Script
 *
 * 1. Unpublish /how-tall-is-mount-kilimanjaro/ (keyword cannibalization fix)
 * 2. Expand /best-time-to-go-on-safari-in-africa/ (featured snippet, budget timing, FAQ)
 * 3. Expand /climbing-mount-meru/ (comparison table, costs, FAQ)
 * 4. Expand /great-wildebeest-migration/ (month tracker, FAQ)
 * 5. Expand /kilimanjaro-climbing-routes/ (route comparison, FAQ)
 * 6. Cross-link in /best-time-to-visit-tanzania-for-safari/
 * 7. Meta title differentiation for safari timing posts
 *
 * Run with: npx tsx prisma/update-monitor-queries-seo.ts
 */

import "dotenv/config";
import prisma from "../src/lib/prisma";

async function main() {
  console.log("Starting Monitor Query SEO expansion...\n");

  let updated = 0;
  let errors = 0;

  // Helper to insert content at the very start of existing content
  function prependToContent(current: string, newContent: string): string {
    return newContent + current;
  }

  // Helper to append content at end
  function appendToContent(current: string, newContent: string): string {
    return current + "\n\n" + newContent;
  }

  // Helper to insert a cross-link after the first paragraph
  function insertAfterFirstParagraph(
    current: string,
    insert: string
  ): string {
    const firstPClose = current.indexOf("</p>");
    if (firstPClose === -1) return insert + current;
    return (
      current.slice(0, firstPClose + 4) +
      "\n\n" +
      insert +
      "\n\n" +
      current.slice(firstPClose + 4)
    );
  }

  // Helper to insert content before the last CTA div (or append if no CTA found)
  function insertBeforeCTA(current: string, newContent: string): string {
    // Look for common CTA patterns at the end of content
    const ctaPatterns = [
      '<div class="cta',
      '<div class="booking-cta',
      '<div class="call-to-action',
      '<div style="background: linear-gradient',
      '<div style="background:#',
    ];
    let lastCtaIndex = -1;
    for (const pattern of ctaPatterns) {
      const idx = current.lastIndexOf(pattern);
      if (idx > lastCtaIndex) {
        lastCtaIndex = idx;
      }
    }
    if (lastCtaIndex > 0) {
      return (
        current.slice(0, lastCtaIndex) +
        "\n\n" +
        newContent +
        "\n\n" +
        current.slice(lastCtaIndex)
      );
    }
    // No CTA found, just append
    return current + "\n\n" + newContent;
  }

  // ============================================================
  // 1. Unpublish /how-tall-is-mount-kilimanjaro/
  // ============================================================
  try {
    const post1 = await prisma.blogPost.findUnique({
      where: { slug: "how-tall-is-mount-kilimanjaro" },
      select: { isPublished: true },
    });

    if (post1) {
      await prisma.blogPost.update({
        where: { slug: "how-tall-is-mount-kilimanjaro" },
        data: { isPublished: false },
      });
      console.log(
        "1. Unpublished how-tall-is-mount-kilimanjaro (redirected to /mount-kilimanjaro-height/)"
      );
      updated++;
    } else {
      console.log("1. SKIP: how-tall-is-mount-kilimanjaro not found");
    }
  } catch (e) {
    console.error("1. ERROR unpublishing how-tall-is-mount-kilimanjaro:", e);
    errors++;
  }

  // ============================================================
  // 2. Expand /best-time-to-go-on-safari-in-africa/ (HIGHEST PRIORITY)
  // ============================================================
  try {
    const post2 = await prisma.blogPost.findUnique({
      where: { slug: "best-time-to-go-on-safari-in-africa" },
      select: { content: true, metaTitle: true },
    });

    if (post2?.content) {
      let content = post2.content;

      // a) Featured snippet paragraph at the very beginning (before first <p>)
      const featuredSnippet = `<p class="lead"><strong>The best time for an African safari depends on your destination.</strong> For East Africa (Tanzania and Kenya), June to October offers dry weather and peak wildlife concentration. Southern Africa's prime season runs May to October. The Great Migration's river crossings peak July to September, while calving season is January to March. Budget travelers should target shoulder seasons — November and March — for lower rates with decent wildlife viewing.</p>\n\n`;

      // Check if featured snippet already added
      if (!content.includes("The best time for an African safari depends on your destination")) {
        content = prependToContent(content, featuredSnippet);
      }

      // b) Budget vs Luxury Timing section
      const budgetSection = `<h2>Budget vs Luxury: When Safari Prices Drop</h2>
<p>Safari pricing follows predictable seasonal patterns across Africa. High season (June–October in most regions) brings premium rates — lodges charge 40–60% more than low season. But shoulder seasons offer a sweet spot: lower prices with reasonable wildlife viewing.</p>
<ul>
<li><strong>Best budget months:</strong> April–May (green season) in Tanzania and Kenya — rates drop 30–50%, parks are empty, and birdlife is exceptional. The downside: some roads become difficult and short afternoon rains are common.</li>
<li><strong>Best value months:</strong> November and March — shoulder seasons with good wildlife, moderate prices, and fewer crowds than peak season. These months often deliver the best overall experience for the price.</li>
<li><strong>Peak premium months:</strong> July–September — the Great Migration river crossings drive highest demand. Book 6–12 months ahead for the best camps.</li>
</ul>
<p>Southern Africa follows a similar pattern — May and November are shoulder months with good value. Namibia's green season (January–April) offers dramatic landscapes and lower rates, though some desert-adapted wildlife disperses.</p>`;

      // c) Cross-link box
      const crossLinkBox = `<div style="background: #f8f5f0; border-left: 4px solid #d4a843; padding: 20px; margin: 24px 0; border-radius: 8px;">
<p><strong>Planning a Tanzania safari specifically?</strong> Our detailed <a href="/best-time-to-visit-tanzania-for-safari/">Tanzania Safari Timing Guide</a> breaks it down park by park — Serengeti, Ngorongoro, Tarangire, and Selous — with month-by-month recommendations.</p>
</div>`;

      // d) FAQ section
      const faqSection = `<h2>Frequently Asked Questions</h2>

<h3>What is the best month for an African safari?</h3>
<p>July through September is widely considered the best time across most of Africa. In East Africa, the dry season concentrates wildlife around water sources, and the Great Migration river crossings peak in the Serengeti and Masai Mara. In Southern Africa, winter (June–August) brings the driest conditions and best game viewing in Botswana, Zimbabwe, and Zambia.</p>

<h3>Is dry season or wet season better for safari?</h3>
<p>Dry season (June–October in most regions) is better for wildlife spotting — animals gather at remaining water sources and vegetation thins out, making them easier to see. Wet season (November–May) brings lush landscapes, newborn animals, exceptional birdlife, and lower prices — but some roads become impassable and animals disperse widely.</p>

<h3>How much does an African safari cost?</h3>
<p>Budget safaris in Tanzania and Kenya start from $150–250 per person per day for camping-based trips. Mid-range lodge safaris run $300–500 per day. Luxury and fly-in safaris in Botswana, Tanzania's private concessions, or Rwanda's gorilla treks range from $600 to $2,000+ per day. The biggest cost factors are accommodation level, season, and whether you fly between parks or drive.</p>

<h3>What is the best country for a first safari?</h3>
<p>Tanzania and Kenya are the best countries for a first-time safari. Both offer reliable year-round wildlife, well-established tourism infrastructure, English-speaking guides, and diverse experiences — from the Serengeti's endless plains to Ngorongoro Crater's concentrated wildlife. Tanzania edges ahead for variety: you can combine safari with Kilimanjaro trekking, Zanzibar beaches, and cultural visits in a single trip.</p>

<h3>Can you see the Big Five year-round in Africa?</h3>
<p>Yes, the Big Five (lion, leopard, elephant, rhino, buffalo) are resident year-round in parks like the Serengeti, Ngorongoro Crater, Kruger, and the Okavango Delta. However, sighting probability improves in dry season when vegetation thins out and animals concentrate near water. Rhinos are the hardest to spot regardless of season — Ngorongoro Crater offers the best chances in East Africa.</p>

<h3>Is it safe to go on safari in Africa?</h3>
<p>Safari tourism is very safe when booked with reputable operators. Tanzania, Kenya, Botswana, South Africa, and Namibia have well-established tourism industries with strict safety standards. You'll be accompanied by trained guides in national parks, and accommodation ranges from secure lodges to fenced camps. The main risks — sunburn, dehydration, and motion sickness on bumpy roads — are easily managed with preparation.</p>`;

      // Insert budget section + cross-link box + FAQ before CTA (or append)
      if (!content.includes("Budget vs Luxury: When Safari Prices Drop")) {
        content = insertBeforeCTA(
          content,
          budgetSection + "\n\n" + crossLinkBox + "\n\n" + faqSection
        );
      }

      // Update meta title
      const newMetaTitle =
        "Best Time for African Safari: Country-by-Country Guide 2026";

      await prisma.blogPost.update({
        where: { slug: "best-time-to-go-on-safari-in-africa" },
        data: { content, metaTitle: newMetaTitle },
      });
      console.log(
        "2. Expanded best-time-to-go-on-safari-in-africa (featured snippet + budget section + cross-link + FAQ + meta title)"
      );
      updated++;
    } else {
      console.log(
        "2. SKIP: best-time-to-go-on-safari-in-africa not found or has no content"
      );
    }
  } catch (e) {
    console.error("2. ERROR expanding best-time-to-go-on-safari-in-africa:", e);
    errors++;
  }

  // ============================================================
  // 3. Expand /climbing-mount-meru/
  // ============================================================
  try {
    const post3 = await prisma.blogPost.findUnique({
      where: { slug: "climbing-mount-meru" },
      select: { content: true },
    });

    if (post3?.content) {
      let content = post3.content;

      // a) Meru vs Kilimanjaro comparison table
      const comparisonTable = `<h2>Mount Meru vs Kilimanjaro: Side-by-Side Comparison</h2>
<p>Many climbers debate whether to tackle Meru, Kilimanjaro, or both. Here is how the two mountains compare:</p>
<table>
<thead>
<tr><th>Factor</th><th>Mount Meru</th><th>Mount Kilimanjaro</th></tr>
</thead>
<tbody>
<tr><td><strong>Height</strong></td><td>4,566m (14,980ft)</td><td>5,895m (19,341ft)</td></tr>
<tr><td><strong>Duration</strong></td><td>3–4 days</td><td>5–9 days</td></tr>
<tr><td><strong>Difficulty</strong></td><td>Moderate-Challenging</td><td>Challenging</td></tr>
<tr><td><strong>Technical sections</strong></td><td>Narrow ridgeline on summit day</td><td>Barranco Wall scramble (some routes)</td></tr>
<tr><td><strong>Cost</strong></td><td>$800–1,200</td><td>$2,000–5,000</td></tr>
<tr><td><strong>Park fees</strong></td><td>~$295 (3 nights)</td><td>~$785–1,065 (5–8 nights)</td></tr>
<tr><td><strong>Annual climbers</strong></td><td>~3,000</td><td>~35,000</td></tr>
<tr><td><strong>Wildlife</strong></td><td>Excellent — buffalo, giraffe, colobus monkeys, occasional leopard</td><td>Limited — colobus monkeys in forest zone</td></tr>
<tr><td><strong>Crowds</strong></td><td>Very quiet</td><td>Busy in peak season</td></tr>
<tr><td><strong>Best for</strong></td><td>Acclimatization before Kilimanjaro, wildlife lovers, budget climbers</td><td>Summit seekers, bucket list, Seven Summits</td></tr>
</tbody>
</table>`;

      // b) Costs section
      const costsSection = `<h2>How Much Does It Cost to Climb Mount Meru?</h2>
<p>Mount Meru is significantly more affordable than Kilimanjaro. Here is a typical cost breakdown for a 4-day climb:</p>
<ul>
<li><strong>Park fees:</strong> $295 for a 3-night stay in Arusha National Park (adults, foreign visitors)</li>
<li><strong>Guide and ranger fees:</strong> $80–120 (an armed ranger is mandatory due to wildlife)</li>
<li><strong>Operator cost (guide, cook, porters, meals, transport):</strong> $500–800</li>
<li><strong>Total budget:</strong> $800–1,200 per person, all-inclusive</li>
</ul>
<p>Compare this to Kilimanjaro at $2,000–5,000 per person. If you are climbing both mountains, adding Meru before Kilimanjaro typically costs $900–1,200 extra but significantly improves your Kilimanjaro summit chances through better acclimatization.</p>`;

      // c) FAQ section
      const meruFaq = `<h2>Frequently Asked Questions</h2>

<h3>How many days does it take to climb Mount Meru?</h3>
<p>Most climbers complete Mount Meru in 3 to 4 days. The standard itinerary is 3 days up and 1 day down, staying at Miriakamba Hut (2,514m) and Saddle Hut (3,566m) before the summit push. A 4-day option adds an extra acclimatization day at Saddle Hut, which is recommended if you are climbing Kilimanjaro afterward.</p>

<h3>Is Mount Meru harder than Kilimanjaro?</h3>
<p>Mount Meru is physically less demanding due to its lower altitude (4,566m vs 5,895m), but it has a more technical summit approach — a narrow, exposed ridgeline that requires sure-footedness and a head for heights. Kilimanjaro is harder overall because altitude is the dominant challenge, but Meru's summit ridge is more technically demanding than anything on standard Kilimanjaro routes.</p>

<h3>Do you need a guide to climb Mount Meru?</h3>
<p>Yes, a licensed guide and an armed park ranger are mandatory for all Mount Meru climbs. The ranger requirement exists because the route passes through Arusha National Park, where buffalo, elephant, and occasionally leopard are present on the lower slopes. You cannot enter the park without both a guide and ranger.</p>

<h3>Can you see Kilimanjaro from Mount Meru?</h3>
<p>Yes — on clear mornings, Mount Meru offers one of the most spectacular views of Kilimanjaro you will find anywhere. The summit and Saddle Hut both provide panoramic views of Kilimanjaro rising above the clouds approximately 70 km to the east. Early morning before clouds build offers the best visibility, typically between 5:30 and 8:00 AM.</p>

<h3>How much does it cost to climb Mount Meru?</h3>
<p>A complete Mount Meru climb costs $800–1,200 per person, including park fees ($295 for 3 nights), guide and armed ranger fees, porters, meals, accommodation in mountain huts, and transport. This is roughly one-third to one-half the cost of a Kilimanjaro climb, making Meru excellent value — especially as acclimatization before a Kilimanjaro attempt.</p>`;

      if (!content.includes("Mount Meru vs Kilimanjaro: Side-by-Side Comparison")) {
        content = insertBeforeCTA(
          content,
          comparisonTable + "\n\n" + costsSection + "\n\n" + meruFaq
        );
      }

      await prisma.blogPost.update({
        where: { slug: "climbing-mount-meru" },
        data: { content },
      });
      console.log(
        "3. Expanded climbing-mount-meru (comparison table + costs + FAQ)"
      );
      updated++;
    } else {
      console.log("3. SKIP: climbing-mount-meru not found or has no content");
    }
  } catch (e) {
    console.error("3. ERROR expanding climbing-mount-meru:", e);
    errors++;
  }

  // ============================================================
  // 4. Expand /great-wildebeest-migration/
  // ============================================================
  try {
    const post4 = await prisma.blogPost.findUnique({
      where: { slug: "great-wildebeest-migration" },
      select: { content: true },
    });

    if (post4?.content) {
      let content = post4.content;

      // a) Month-by-month tracker table
      const migrationTracker = `<h2>Month-by-Month Migration Tracker</h2>
<p>The Great Migration follows a roughly clockwise circuit through the Serengeti-Mara ecosystem. Here is where the herds are each month:</p>
<table>
<thead>
<tr><th>Month</th><th>Location</th><th>Key Event</th><th>Best Park/Area</th></tr>
</thead>
<tbody>
<tr><td><strong>January–March</strong></td><td>Southern Serengeti (Ndutu)</td><td>Calving season — 8,000+ calves born daily</td><td>Ndutu, Lake Ndutu area</td></tr>
<tr><td><strong>April–May</strong></td><td>Central Serengeti</td><td>Long rains begin; herds move north</td><td>Seronera Valley</td></tr>
<tr><td><strong>June</strong></td><td>Western Corridor</td><td>Grumeti River crossings begin</td><td>Grumeti Reserve</td></tr>
<tr><td><strong>July–August</strong></td><td>Northern Serengeti / Mara River</td><td>Dramatic Mara River crossings — peak migration spectacle</td><td>Kogatende, Lamai</td></tr>
<tr><td><strong>September–October</strong></td><td>Masai Mara (Kenya) / Northern Serengeti</td><td>Return crossings; herds spread across Mara</td><td>Masai Mara, Kogatende</td></tr>
<tr><td><strong>November–December</strong></td><td>Eastern Serengeti moving south</td><td>Short rains trigger southward movement</td><td>Loliondo, Namiri Plains</td></tr>
</tbody>
</table>
<p><em>Timing varies by 2–4 weeks each year depending on rainfall patterns. Contact us for real-time migration updates before booking.</em></p>`;

      // b) FAQ section
      const migrationFaq = `<h2>Frequently Asked Questions</h2>

<h3>When is the best time to see the Great Migration?</h3>
<p>The most dramatic spectacle — the Mara River crossings — occurs from July through September in the northern Serengeti (Kogatende area). However, the migration happens year-round. Calving season (January–March) in the southern Serengeti offers equally compelling wildlife viewing with thousands of newborns and predator action. The "best" time depends on which part of the migration you want to witness.</p>

<h3>Where do wildebeest cross the Mara River?</h3>
<p>The main crossing points are in the northern Serengeti near Kogatende and along the Mara River on both the Tanzania and Kenya sides. There are several established crossing points, but the herds may choose different locations each time based on water levels and predator presence. River crossings are unpredictable — herds may approach, hesitate for hours, then suddenly surge across, or turn back entirely. Positioning yourself at a known crossing point with a good guide gives you the best chance.</p>

<h3>How many animals are in the Great Migration?</h3>
<p>The Great Migration involves approximately 1.5 million wildebeest, 400,000 zebra, and 200,000 Thomson's gazelle — over 2 million animals in total. It is the largest overland wildlife migration on Earth. Along the way, the herds are trailed by predators: lions, cheetahs, leopards, hyenas, and crocodiles that wait at river crossings.</p>

<h3>How far do wildebeest migrate each year?</h3>
<p>The herds travel approximately 800 to 1,000 kilometres (500–620 miles) annually in a roughly clockwise loop between the southern Serengeti in Tanzania and the Masai Mara in Kenya. The exact route and timing vary each year based on rainfall patterns — the herds follow the fresh grass that grows after rains.</p>

<h3>Can you see the Great Migration from Kenya?</h3>
<p>Yes. From approximately August to October, large portions of the herds cross into Kenya's Masai Mara National Reserve, and dramatic Mara River crossings happen on both sides of the border. However, the migration spends the majority of the year (roughly 9–10 months) on the Tanzania side in the Serengeti. For the full migration experience across multiple months, Tanzania offers more flexibility.</p>`;

      if (!content.includes("Month-by-Month Migration Tracker")) {
        content = insertBeforeCTA(
          content,
          migrationTracker + "\n\n" + migrationFaq
        );
      }

      await prisma.blogPost.update({
        where: { slug: "great-wildebeest-migration" },
        data: { content },
      });
      console.log(
        "4. Expanded great-wildebeest-migration (month tracker + FAQ)"
      );
      updated++;
    } else {
      console.log(
        "4. SKIP: great-wildebeest-migration not found or has no content"
      );
    }
  } catch (e) {
    console.error("4. ERROR expanding great-wildebeest-migration:", e);
    errors++;
  }

  // ============================================================
  // 5. Expand /kilimanjaro-climbing-routes/
  // ============================================================
  try {
    const post5 = await prisma.blogPost.findUnique({
      where: { slug: "kilimanjaro-climbing-routes" },
      select: { content: true },
    });

    if (post5?.content) {
      let content = post5.content;

      // a) Route comparison table
      const routeTable = `<h2>Kilimanjaro Route Comparison at a Glance</h2>
<p>Choosing the right route is the single biggest decision that affects your summit success, comfort, and overall experience. Here is how all seven routes compare:</p>
<table>
<thead>
<tr><th>Route</th><th>Days</th><th>Distance</th><th>Success Rate</th><th>Difficulty</th><th>Scenery</th></tr>
</thead>
<tbody>
<tr><td><strong>Marangu</strong></td><td>5–6</td><td>72 km</td><td>65–70%</td><td>Moderate</td><td>★★★</td></tr>
<tr><td><strong>Rongai</strong></td><td>6–7</td><td>73 km</td><td>75–80%</td><td>Moderate</td><td>★★★</td></tr>
<tr><td><strong>Machame</strong></td><td>6–7</td><td>62 km</td><td>80–85%</td><td>Challenging</td><td>★★★★★</td></tr>
<tr><td><strong>Lemosho</strong></td><td>7–8</td><td>70 km</td><td>85–95%</td><td>Moderate-Challenging</td><td>★★★★★</td></tr>
<tr><td><strong>Shira</strong></td><td>7–8</td><td>56 km</td><td>80–85%</td><td>Moderate-Challenging</td><td>★★★★</td></tr>
<tr><td><strong>Northern Circuit</strong></td><td>9</td><td>90 km</td><td>90–95%</td><td>Moderate</td><td>★★★★★</td></tr>
<tr><td><strong>Umbwe</strong></td><td>6–7</td><td>53 km</td><td>60–70%</td><td>Very Challenging</td><td>★★★★</td></tr>
</tbody>
</table>`;

      // b) FAQ section
      const routesFaq = `<h2>Frequently Asked Questions</h2>

<h3>What is the easiest route up Kilimanjaro?</h3>
<p>The Northern Circuit (9 days) has the highest success rate (90–95%) and is considered the easiest route to summit because it allows the most acclimatization time. The Marangu route has the gentlest terrain and is the only route with hut accommodation, but its shorter duration (5–6 days) results in the lowest success rate. If "easiest" means "most likely to summit," choose a longer route like Lemosho (8 days) or Northern Circuit.</p>

<h3>Which Kilimanjaro route has the best scenery?</h3>
<p>The Lemosho and Machame routes are widely regarded as the most scenic. Both traverse the stunning Shira Plateau and pass through the Barranco Valley with its dramatic wall. The Lemosho route has a slight edge because its western approach through pristine rainforest is less trafficked and offers broader panoramic views of the Shira Plateau.</p>

<h3>Which Kilimanjaro route has the highest success rate?</h3>
<p>The Northern Circuit (9 days) and Lemosho (8 days) routes share the highest success rates at 85–95%. Both provide excellent acclimatization through their "walk high, sleep low" profiles and longer durations. With experienced operators like Snow Africa Adventure, success rates on these routes consistently reach 90%+.</p>

<h3>How much does each Kilimanjaro route cost?</h3>
<p>Route costs vary primarily by duration (more days = higher park fees and operator costs). Budget estimates per person: Marangu 5-day from $1,850, Machame 7-day from $2,200, Lemosho 8-day from $2,500, Northern Circuit 9-day from $2,800. These include park fees, guides, porters, meals, and camping equipment. Private climbs cost 20–40% more than group departures.</p>

<h3>What is the shortest Kilimanjaro route?</h3>
<p>The Umbwe route is the shortest in distance (53 km) and can be completed in 6 days. However, it is also the steepest and most demanding route with the lowest success rate. The Marangu route is the shortest in duration at 5 days, but we strongly recommend at least 7 days on any route to allow adequate acclimatization — the extra days significantly improve your chances of reaching the summit.</p>`;

      if (!content.includes("Kilimanjaro Route Comparison at a Glance")) {
        content = insertBeforeCTA(
          content,
          routeTable + "\n\n" + routesFaq
        );
      }

      await prisma.blogPost.update({
        where: { slug: "kilimanjaro-climbing-routes" },
        data: { content },
      });
      console.log(
        "5. Expanded kilimanjaro-climbing-routes (route comparison + FAQ)"
      );
      updated++;
    } else {
      console.log(
        "5. SKIP: kilimanjaro-climbing-routes not found or has no content"
      );
    }
  } catch (e) {
    console.error("5. ERROR expanding kilimanjaro-climbing-routes:", e);
    errors++;
  }

  // ============================================================
  // 6. Cross-link in /best-time-to-visit-tanzania-for-safari/
  // ============================================================
  try {
    const post6 = await prisma.blogPost.findUnique({
      where: { slug: "best-time-to-visit-tanzania-for-safari" },
      select: { content: true, metaTitle: true },
    });

    if (post6?.content) {
      let content = post6.content;

      const crossLink = `<div style="background: #f8f5f0; border-left: 4px solid #d4a843; padding: 20px; margin: 24px 0; border-radius: 8px;">
<p><strong>Comparing safari timing across all of Africa?</strong> See our <a href="/best-time-to-go-on-safari-in-africa/">Pan-African Safari Timing Guide</a> for country-by-country comparisons including Kenya, Botswana, South Africa, Namibia, and Rwanda.</p>
</div>`;

      if (!content.includes("Pan-African Safari Timing Guide")) {
        content = insertAfterFirstParagraph(content, crossLink);
      }

      // 7. Update meta title
      const newMetaTitle =
        "Best Time for Tanzania Safari: Park-by-Park Monthly Guide 2026";

      await prisma.blogPost.update({
        where: { slug: "best-time-to-visit-tanzania-for-safari" },
        data: { content, metaTitle: newMetaTitle },
      });
      console.log(
        "6. Added cross-link to best-time-to-visit-tanzania-for-safari + updated meta title"
      );
      updated++;
    } else {
      console.log(
        "6. SKIP: best-time-to-visit-tanzania-for-safari not found or has no content"
      );
    }
  } catch (e) {
    console.error(
      "6. ERROR updating best-time-to-visit-tanzania-for-safari:",
      e
    );
    errors++;
  }

  console.log(`\nDone. Updated: ${updated}, Errors: ${errors}`);
}

main()
  .catch((e) => {
    console.error("Failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
