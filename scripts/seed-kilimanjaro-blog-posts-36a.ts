import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
config({ path: ".env.local" });
const prisma = new PrismaClient({ accelerateUrl: process.env.DATABASE_URL_ACCELERATE });

const FEATURED_IMAGE =
  "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp";

const post1Content = `
<p>The 6-day Machame climb is the shortest version of the most popular route on Kilimanjaro. In our 800+ expeditions, we have seen it deliver a 78-82% summit success rate — decent, but meaningfully lower than the 85-90% you get with just one extra day. This guide breaks down exactly what a 6-day Machame itinerary looks like, why the compressed schedule costs you in summit odds, and whether it is the right choice for your situation.</p>

<p>We will be honest: if you can spare seven days, we recommend the 7-day version every time. But we understand that vacation days are finite, and a 6-day Machame climb is still a legitimate way to reach the Roof of Africa.</p>

<h2>6-Day Machame Itinerary: Day-by-Day</h2>

<h3>Day 1: Machame Gate (1,790m) to Machame Camp (2,980m)</h3>
<p><strong>Distance:</strong> 11 km | <strong>Time:</strong> 5-7 hours | <strong>Gain:</strong> +1,190m</p>
<p>A steep climb through dense montane rainforest. The trail is well-maintained but can be muddy, with tree roots and rocks underfoot. You pass through a canopy of podocarpus and camphor trees draped in old-man's beard moss. Colobus monkeys are common. This is the most physically demanding Day 1 of any Kilimanjaro route — you gain nearly 1,200m of elevation before the first night. Arrive at Machame Camp on the upper forest edge by mid-afternoon.</p>

<h3>Day 2: Machame Camp (2,980m) to Shira Camp (3,840m)</h3>
<p><strong>Distance:</strong> 5 km | <strong>Time:</strong> 4-5 hours | <strong>Gain:</strong> +860m</p>
<p>You climb out of the forest into the heath and moorland zone. Giant heather gives way to open moorland with lobelias and groundsels. The <a href="/kilimanjaro-shira-plateau/">Shira Plateau</a> stretches out before you, and on clear days the summit cone of Kibo appears for the first time. Shira Camp sits at nearly 4,000m — this is where altitude begins to make itself felt. Mild headaches and deeper breathing are normal.</p>

<h3>Day 3: Shira Camp (3,840m) to Barranco Camp (3,960m) via Lava Tower (4,630m)</h3>
<p><strong>Distance:</strong> 10 km | <strong>Time:</strong> 6-7 hours | <strong>Gain:</strong> +790m up, -670m down</p>
<p>The critical acclimatization day. You ascend to <a href="/kilimanjaro-lava-tower/">Lava Tower</a> at 4,630m — higher than any summit in Europe — then descend 670m to Barranco Camp. This "walk high, sleep low" technique is the single most effective acclimatization strategy. Expect altitude symptoms at Lava Tower: headache, breathlessness, nausea. These typically resolve during the descent. Barranco Camp has spectacular views of the southern icefields.</p>

<h3>Day 4: Barranco Camp (3,960m) to Barafu Camp (4,673m) via Barranco Wall</h3>
<p><strong>Distance:</strong> 9 km | <strong>Time:</strong> 7-9 hours | <strong>Gain:</strong> +713m net (with significant ups and downs)</p>
<p>This is the day that defines the 6-day itinerary — and it is brutal. You start with the famous <a href="/kilimanjaro-barranco-wall/">Barranco Wall</a>, a 257m scramble that is thrilling but physically demanding. After cresting the wall, you cross the Karanga Valley (where 7-day climbers stop for the night) and continue climbing to Barafu Camp at 4,673m. This is 7-9 hours of sustained effort, arriving at your summit base camp in the late afternoon. You then have approximately 6-7 hours to eat, rest, and attempt to sleep before summit night begins at midnight.</p>

<p><strong>Why this matters:</strong> On the 7-day itinerary, you would camp at Karanga (3,995m), get a full night's rest, then do a short 3-4 hour climb to Barafu the next morning. The 6-day version combines these into one exhausting day and gives you almost no recovery time before the hardest night of the climb. This is the primary reason the 6-day success rate is 8-10 percentage points lower.</p>

<h3>Day 5: Summit Night — Barafu (4,673m) to Uhuru Peak (5,895m) to Mweka Camp (3,100m)</h3>
<p><strong>Distance:</strong> 13 km | <strong>Time:</strong> 12-14 hours | <strong>Elevation:</strong> +1,222m up, -2,795m down</p>
<p>Wake at 11:30pm. The midnight ascent follows steep switchbacks through loose scree under headlamp. You reach <a href="/kilimanjaro-stellas-point/">Stella Point</a> (5,756m) on the crater rim after 5-7 hours, then traverse 45 minutes to <a href="/kilimanjaro-uhuru-peak/">Uhuru Peak</a> at 5,895m. Sunrise from the summit is the reward. Descend to Barafu for a brief rest and breakfast, then continue all the way down to Mweka Camp in the rainforest. This is the longest day — 12-14 hours of total walking after minimal sleep.</p>

<h3>Day 6: Mweka Camp (3,100m) to Mweka Gate (1,630m)</h3>
<p><strong>Distance:</strong> 10 km | <strong>Time:</strong> 3-4 hours | <strong>Loss:</strong> -1,470m</p>
<p>Descend through the rainforest to Mweka Gate. Collect your summit certificate. Transfer back to your hotel in Moshi by early afternoon.</p>

<h2>6-Day vs 7-Day Machame: The Numbers</h2>

<p>The difference between 6 and 7 days comes down to one night at Karanga Camp. Here is what that night costs you — or saves you:</p>

<ul>
<li><strong>Success rate:</strong> 6-day = 78-82% | 7-day = 85-90%</li>
<li><strong>Day 4 difficulty:</strong> 6-day = 7-9 hours including Barranco Wall + climb to Barafu | 7-day = 4-5 hours to Karanga only</li>
<li><strong>Rest before summit:</strong> 6-day = 6-7 hours after an exhausting day | 7-day = full night's sleep + 3-4 hour morning walk</li>
<li><strong>Cost difference:</strong> ~$150-$200 more for the 7-day (one extra day of park fees, meals, crew)</li>
<li><strong>Extra vacation day:</strong> 1 additional day required</li>
</ul>

<h2>Who Should Choose 6 Days?</h2>

<ul>
<li><strong>Fit, experienced trekkers</strong> who can handle a 7-9 hour day followed by summit night with minimal rest</li>
<li><strong>Time-constrained travelers</strong> who genuinely cannot add one more day to their trip</li>
<li><strong>Repeat climbers</strong> who have already acclimatized well on a previous Kilimanjaro or high-altitude trek</li>
<li><strong>Budget-focused climbers</strong> saving the extra day's fees — though we would argue $150-$200 is a small price for 8-10% better summit odds</li>
</ul>

<h2>Pricing</h2>

<p>Expect <strong>$1,800-$2,500</strong> for a 6-day Machame climb with a reputable operator. This includes all park fees, guide and porter wages, meals, camping equipment, and transfers. See our <a href="/kilimanjaro-prices/">complete pricing guide</a> for a detailed breakdown.</p>

<h2>Frequently Asked Questions</h2>

<h3>Is 6 days enough to climb Kilimanjaro?</h3>
<p>It is possible but not ideal. The 6-day Machame gives a 78-82% success rate. Adding one day (7-day version) improves this to 85-90%. If you can spare the extra day, do it.</p>

<h3>Why is the 6-day success rate lower?</h3>
<p>The 6-day itinerary skips the Karanga Camp overnight, meaning you climb from Barranco to Barafu in one long day and then attempt the summit with minimal rest. The 7-day version gives you a recovery night at Karanga before the summit push.</p>

<h3>Which route is best for 6 days?</h3>
<p>Machame is the only recommended route for 6 days. The Marangu Route also offers a 5 or 6-day version, but Machame's walk-high-sleep-low profile gives better acclimatization even in the compressed timeframe.</p>

<h3>How hard is the 6-day Machame?</h3>
<p>Harder than the 7-day version due to the combined Barranco-to-Barafu day. Day 4 is grueling — 7-9 hours of hiking including the Barranco Wall scramble, arriving at 4,673m with only hours before <a href="/kilimanjaro-summit-night/">summit night</a> begins.</p>

<h3>Can beginners do the 6-day Machame?</h3>
<p>We recommend first-timers choose the 7-day version. The compressed schedule of the 6-day demands both strong fitness and mental resilience, which experienced trekkers handle better.</p>

<h3>How much does 6-day Machame cost?</h3>
<p>$1,800-$2,500 with a reputable operator. The 7-day version costs approximately $150-$200 more.</p>

<h3>What is the altitude profile of the 6-day Machame?</h3>
<p>1,790m → 2,980m → 3,840m → 4,630m (Lava Tower) → 3,960m → 4,673m (Barafu) → 5,895m (Summit) → 3,100m → 1,630m. The Lava Tower excursion on Day 3 is the key acclimatization feature.</p>

<h3>Do I need trekking poles for 6-day Machame?</h3>
<p>Strongly recommended. The descents are steep and your knees will thank you. Stow them for the <a href="/kilimanjaro-barranco-wall/">Barranco Wall</a> scramble — you need both hands free.</p>

<h3>When is the best time for 6-day Machame?</h3>
<p>January-March and June-October (dry seasons). Since the 6-day already has lower success odds, do not compound it by climbing in the rainy season.</p>

<h3>Should I choose 6-day or 7-day Machame?</h3>
<p>7-day, unless you truly cannot spare the extra day. The cost difference is small ($150-$200) and the success rate improvement is significant (78-82% vs 85-90%).</p>
`;

const post2Content = `
<p>Seven days is the sweet spot for climbing Kilimanjaro — long enough for proper acclimatization, short enough to fit within most vacation schedules. In our 800+ expeditions, the 7-day itinerary consistently delivers 85-90% summit success rates across both the Machame and Lemosho routes, making it the most popular choice among our clients.</p>

<p>This guide covers both the 7-day Machame and 7-day Lemosho itineraries day-by-day, explains why seven days works so well from an acclimatization perspective, and helps you decide which 7-day option is right for your climb.</p>

<h2>Why 7 Days Is the Sweet Spot</h2>

<p>The relationship between days on the mountain and summit success is not linear — it follows a curve with diminishing returns:</p>

<ul>
<li><strong>5 days:</strong> 60-65% success rate (insufficient acclimatization)</li>
<li><strong>6 days:</strong> 78-82% (better but still compressed)</li>
<li><strong>7 days:</strong> 85-90% (the performance leap — this is where acclimatization clicks)</li>
<li><strong>8 days:</strong> 93-95% (marginal improvement over 7)</li>
</ul>

<p>The jump from 6 to 7 days is the single biggest improvement per additional day on the mountain. That extra night — at Karanga Camp on Machame, or on the Shira Plateau on Lemosho — gives your body the critical adaptation time it needs before the summit push.</p>

<h2>Option 1: 7-Day Machame Route</h2>

<p>The <a href="/kilimanjaro-machame-route-guide/">Machame Route</a> is the most popular 7-day itinerary on Kilimanjaro, chosen by roughly 40% of all climbers. It approaches from the south and is known for dramatic scenery, the famous Barranco Wall, and excellent acclimatization through its walk-high-sleep-low profile.</p>

<h3>Day 1: Machame Gate (1,790m) to Machame Camp (2,980m)</h3>
<p><strong>Distance:</strong> 11 km | <strong>Time:</strong> 5-7 hours | <strong>Gain:</strong> +1,190m</p>
<p>Steep ascent through montane rainforest. The most demanding first day of any route — you gain nearly 1,200m through a canopy of mossy trees and giant ferns. Colobus monkeys and blue monkeys are common sightings. Arrive at Machame Camp on the forest edge by mid-afternoon.</p>

<h3>Day 2: Machame Camp (2,980m) to Shira Camp (3,840m)</h3>
<p><strong>Distance:</strong> 5 km | <strong>Time:</strong> 4-5 hours | <strong>Gain:</strong> +860m</p>
<p>Climb out of the forest into the heath and moorland zone. Open views appear as the vegetation thins. The <a href="/kilimanjaro-shira-plateau/">Shira Plateau</a> stretches ahead, with Kibo's summit visible on clear days. Your first night above 3,500m.</p>

<h3>Day 3: Shira Camp (3,840m) to Barranco Camp (3,960m) via Lava Tower (4,630m)</h3>
<p><strong>Distance:</strong> 10 km | <strong>Time:</strong> 6-7 hours | <strong>Gain:</strong> +790m up, -670m down</p>
<p>The key acclimatization day. Ascend to <a href="/kilimanjaro-lava-tower/">Lava Tower</a> at 4,630m, then descend to Barranco Camp. Walk high, sleep low — the most effective acclimatization technique. Most climbers feel altitude for the first time at Lava Tower. Symptoms resolve during descent.</p>

<h3>Day 4: Barranco Camp (3,960m) to Karanga Camp (3,995m)</h3>
<p><strong>Distance:</strong> 5 km | <strong>Time:</strong> 4-5 hours | <strong>Gain:</strong> +250m net</p>
<p>Morning starts with the <a href="/kilimanjaro-barranco-wall/">Barranco Wall</a> — a 257m Class 2 scramble that is the most photographed section of the entire mountain. After the wall, traverse the Karanga Valley to Karanga Camp. This is the day that 6-day climbers skip, and it makes all the difference: you arrive early, rest fully, and face the summit push two days later with fresh legs.</p>

<h3>Day 5: Karanga Camp (3,995m) to Barafu Camp (4,673m)</h3>
<p><strong>Distance:</strong> 4 km | <strong>Time:</strong> 3-4 hours | <strong>Gain:</strong> +678m</p>
<p>Short but steep ascent to Barafu, your summit base camp in the alpine desert. Arrive by early afternoon. Eat, hydrate, and try to sleep by 7pm. <a href="/kilimanjaro-summit-night/">Summit night</a> begins at midnight.</p>

<h3>Day 6: Summit Night — Barafu to Uhuru Peak (5,895m) to Mweka Camp (3,100m)</h3>
<p><strong>Distance:</strong> 13 km | <strong>Time:</strong> 12-14 hours | <strong>Elevation:</strong> +1,222m up, -2,795m down</p>
<p>Midnight start. Headlamp ascent through scree to Stella Point (5,756m), crater rim traverse to Uhuru Peak (5,895m). Summit sunrise. Descend to Barafu for rest, then continue to Mweka Camp in the rainforest. The longest and most demanding day.</p>

<h3>Day 7: Mweka Camp (3,100m) to Mweka Gate (1,630m)</h3>
<p><strong>Distance:</strong> 10 km | <strong>Time:</strong> 3-4 hours | <strong>Loss:</strong> -1,470m</p>
<p>Rainforest descent to the gate. Collect your summit certificate. Transfer to Moshi by early afternoon.</p>

<h2>Option 2: 7-Day Lemosho Route</h2>

<p>The <a href="/kilimanjaro-lemosho-route-guide/">Lemosho Route</a> approaches from the west and offers a quieter, more scenic alternative. The 7-day Lemosho has an 88% success rate — slightly higher than 7-day Machame due to the more gradual approach.</p>

<h3>Day 1: Londorossi Gate (2,100m) to Mti Mkubwa (2,750m)</h3>
<p><strong>Distance:</strong> 6 km | <strong>Time:</strong> 3-4 hours | <strong>Gain:</strong> +650m</p>
<p>After a 3-4 hour drive from Moshi, trek through the western rainforest. A gentle start — the first day is deliberately short for gradual acclimatization.</p>

<h3>Day 2: Mti Mkubwa (2,750m) to Shira 2 Camp (3,840m)</h3>
<p><strong>Distance:</strong> 14 km | <strong>Time:</strong> 7-8 hours | <strong>Gain:</strong> +1,090m</p>
<p>The longest day by distance. Climb through heather into the moorland, crossing the Shira Plateau. This is where the 7-day Lemosho compresses: the 8-day version splits this into two days (to Shira 1, then Shira 2). On the 7-day, you push through in one sustained effort.</p>

<h3>Days 3-7: Same as Machame Days 3-7</h3>
<p>From Shira 2 onwards, Lemosho and Machame follow the identical southern circuit: Lava Tower acclimatization day, Barranco Wall, Karanga Camp, Barafu summit approach, Mweka descent. The day-by-day experience is identical to the Machame itinerary described above.</p>

<h2>Machame vs Lemosho: Which 7-Day Route?</h2>

<ul>
<li><strong>Success rate:</strong> Lemosho 88% vs Machame 85-90% — slight edge to Lemosho due to the gentler western approach</li>
<li><strong>Crowds:</strong> Lemosho's first two days are significantly quieter (10-20 climbers vs 60-80 on Machame)</li>
<li><strong>Scenery:</strong> Both are spectacular. Lemosho's Shira Plateau crossing is unique; Machame's rainforest is denser</li>
<li><strong>Cost:</strong> Lemosho is $100-$300 more (longer drive to Londorossi Gate, slightly higher operator costs)</li>
<li><strong>Day 2 difficulty:</strong> Lemosho's 14km Day 2 is longer than Machame's 5km Day 2, but less steep</li>
</ul>

<p>Our recommendation: if you prefer quieter trails and don't mind a long Day 2, choose Lemosho. If you want to minimize any individual day's effort, Machame distributes the work more evenly. Read our full <a href="/kilimanjaro-lemosho-vs-machame/">Lemosho vs Machame comparison</a> for more detail.</p>

<h2>How 7 Days Compares to Other Durations</h2>

<p>To help you decide if 7 days is right:</p>

<ul>
<li><strong>vs <a href="/kilimanjaro-5-day-itinerary/">5-day Marangu</a>:</strong> 7-day is dramatically better. Success rate 85-90% vs 60-65%. No contest.</li>
<li><strong>vs <a href="/kilimanjaro-6-day-itinerary/">6-day Machame</a>:</strong> The extra Karanga night is the biggest single-day improvement you can make. +8-10% success for one extra day and $150-$200.</li>
<li><strong>vs <a href="/kilimanjaro-8-day-itinerary/">8-day Lemosho</a>:</strong> 8-day adds an extra acclimatization day on the Shira Plateau (93-95% success). If you have the time and budget, the 8-day is the gold standard. But 7-day is already excellent.</li>
</ul>

<h2>Pricing</h2>

<p>Expect <strong>$2,000-$3,000</strong> for a 7-day climb. Machame sits at the lower end ($2,000-$2,800); Lemosho at the higher end ($2,200-$3,000). See our <a href="/kilimanjaro-prices/">complete pricing guide</a> for details.</p>

<h2>Frequently Asked Questions</h2>

<h3>Is 7 days enough to climb Kilimanjaro?</h3>
<p>Yes — 7 days is the sweet spot. It provides adequate acclimatization for most climbers and delivers 85-90% success rates. Longer itineraries (8-9 days) are slightly better but offer diminishing returns.</p>

<h3>Which is the best 7-day Kilimanjaro route?</h3>
<p>Both Machame and Lemosho are excellent. Lemosho has a marginally higher success rate (88% vs 85-90%) and quieter first days. Machame is slightly cheaper and has a shorter drive to the gate.</p>

<h3>How fit do I need to be for 7 days?</h3>
<p>You should be able to hike 6-8 hours with a daypack and walk uphill continuously for 30+ minutes. See our <a href="/kilimanjaro-fitness-requirements/">fitness requirements guide</a> for detailed benchmarks.</p>

<h3>What is the success rate for 7-day Kilimanjaro?</h3>
<p>85-90% on Machame, 88% on Lemosho. These are among the best success rates you can achieve without going to an 8 or 9-day itinerary.</p>

<h3>Is 7-day Machame or Lemosho harder?</h3>
<p>Very similar difficulty. Machame's Day 1 is steeper; Lemosho's Day 2 is longer. From Day 3 onwards they follow the same trail. Neither is harder overall.</p>

<h3>How much does a 7-day Kilimanjaro climb cost?</h3>
<p>$2,000-$3,000 depending on route and operator. Park fees alone are $862.60 per non-resident adult. Budget operators under $1,500 are almost certainly cutting corners.</p>

<h3>Can beginners do a 7-day climb?</h3>
<p>Absolutely. Seven days provides enough time for proper acclimatization, making it suitable for first-time trekkers with reasonable fitness. We recommend it as the minimum for most first-timers.</p>

<h3>What is included in a 7-day Kilimanjaro package?</h3>
<p>Park fees, professional guides and porters, all meals on the mountain, camping equipment (tents, sleeping mats), drinking water treatment, emergency oxygen, and airport/hotel transfers. You need to bring your own sleeping bag, clothing, and personal items.</p>

<h3>Do I need to train for 7 days on Kilimanjaro?</h3>
<p>Yes. We recommend a minimum 8-12 week training program focused on cardio endurance and stair climbing. See our <a href="/kilimanjaro-training-plan/">12-week training plan</a> for a structured program.</p>

<h3>When is the best time for a 7-day climb?</h3>
<p>January-March and June-October (dry seasons). June and September offer the best balance of good weather and moderate crowds. July-August is peak season with the best conditions but the most climbers.</p>
`;

async function main() {
  console.log("Seeding 2 Kilimanjaro blog posts (6-day + 7-day itineraries)...\n");

  const category = await prisma.category.upsert({
    where: { slug: "kilimanjaro" },
    update: { name: "Kilimanjaro" },
    create: { slug: "kilimanjaro", name: "Kilimanjaro" },
  });

  const posts = [
    {
      slug: "kilimanjaro-6-day-itinerary",
      title: "Kilimanjaro 6-Day Itinerary: Machame Route Day-by-Day",
      metaTitle: "Kilimanjaro 6-Day Itinerary | Machame Day-by-Day",
      metaDescription:
        "Complete 6-day Machame Route itinerary with day-by-day breakdown, 78-82% success rate data, altitude profile, and honest comparison with the 7-day version.",
      excerpt:
        "The 6-day Machame is the shortest version of Kilimanjaro's most popular route. Day-by-day itinerary, success rates, and honest advice on whether 6 days is enough.",
      content: post1Content,
      tags: [
        { name: "Kilimanjaro Itinerary", slug: "kilimanjaro-itinerary" },
        { name: "Machame Route", slug: "machame-route" },
        { name: "6-Day Climb", slug: "6-day-climb" },
        { name: "Kilimanjaro Tips", slug: "kilimanjaro-tips" },
      ],
    },
    {
      slug: "kilimanjaro-7-day-itinerary",
      title: "Kilimanjaro 7-Day Itinerary: Machame & Lemosho Day-by-Day",
      metaTitle: "Kilimanjaro 7-Day Itinerary | The Sweet Spot",
      metaDescription:
        "Plan your 7-day Kilimanjaro climb with day-by-day Machame and Lemosho itineraries, 85-90% success rates, and expert tips from 800+ expeditions.",
      excerpt:
        "Seven days is the sweet spot for Kilimanjaro. Both Machame and Lemosho 7-day itineraries deliver 85-90% success rates. Complete day-by-day guide with expert advice.",
      content: post2Content,
      tags: [
        { name: "Kilimanjaro Itinerary", slug: "kilimanjaro-itinerary" },
        { name: "Lemosho Route", slug: "lemosho-route" },
        { name: "7-Day Climb", slug: "7-day-climb" },
        { name: "Kilimanjaro Planning", slug: "kilimanjaro-planning" },
      ],
    },
  ];

  for (const post of posts) {
    for (const tag of post.tags) {
      await prisma.tag.upsert({
        where: { slug: tag.slug },
        update: {},
        create: { name: tag.name, slug: tag.slug },
      });
    }

    const result = await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {
        title: post.title,
        content: post.content,
        metaTitle: post.metaTitle,
        metaDescription: post.metaDescription,
        excerpt: post.excerpt,
        featuredImage: FEATURED_IMAGE,
        isPublished: true,
        author: "Emmanuel Moshi",
      },
      create: {
        slug: post.slug,
        title: post.title,
        content: post.content,
        metaTitle: post.metaTitle,
        metaDescription: post.metaDescription,
        excerpt: post.excerpt,
        featuredImage: FEATURED_IMAGE,
        isPublished: true,
        author: "Emmanuel Moshi",
        publishedAt: new Date(),
      },
    });

    console.log(`  Upserted: ${result.slug}`);

    await prisma.postCategory
      .create({ data: { postId: result.id, categoryId: category.id } })
      .catch(() => {});

    for (const tag of post.tags) {
      const t = await prisma.tag.findFirst({ where: { slug: tag.slug } });
      if (t) {
        await prisma.postTag
          .create({ data: { postId: result.id, tagId: t.id } })
          .catch(() => {});
      }
    }
  }

  console.log("\nDone — 2 itinerary posts seeded.");
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
