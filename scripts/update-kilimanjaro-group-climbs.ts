/**
 * Updates the kilimanjaro-group-climbs blog post with expanded content
 * Adds: departure dates section, acclimatization, medical monitoring, 4 new FAQs
 * Fixes: meta title formatting
 *
 * Run with: npx tsx scripts/update-kilimanjaro-group-climbs.ts
 */

import "dotenv/config";
import prisma from "../src/lib/prisma";

const content = `
<p class="lead">Kilimanjaro group climbs are the most popular — and most affordable — way to reach the summit of Africa's highest peak. By joining a scheduled group departure, you share the cost of guides, porters, and equipment with fellow trekkers while gaining the motivation and camaraderie that comes from climbing together. This guide covers everything you need to know about joining a Kilimanjaro group climb: cost, routes, what's included, and how to pick the right departure for you.</p>

<h2>Why Join a Kilimanjaro Group Climb?</h2>

<p>Over 60% of the 35,000+ climbers who attempt Kilimanjaro each year do so as part of a group. There are good reasons for this:</p>

<h3>Save 15–30% vs Private Climbs</h3>
<p>On a Kilimanjaro group climb, expenses like vehicle transfers, guide salaries, cook services, and park camping fees are split across all group members. The more people in your group, the lower your per-person cost. A group climb typically saves $500–$1,500 compared to booking the same route privately.</p>

<h3>Built-In Motivation on Summit Night</h3>
<p>Summit night is the hardest part of any Kilimanjaro climb — 12–15 hours of hiking through darkness in freezing temperatures. Having teammates around you makes a real difference. Climbers who summit as part of a group consistently report that the encouragement of fellow trekkers helped them push through when they wanted to stop.</p>

<h3>Safety in Numbers</h3>
<p>Groups provide inherent safety benefits. Guides can monitor the group more effectively, other climbers can spot early signs of <a href="/kilimanjaro-altitude-sickness/">altitude sickness</a> in each other, and if someone struggles, there's immediate support available.</p>

<h3>Meet Climbers from Around the World</h3>
<p>Kilimanjaro group climbs attract adventurers from every continent. Many climbers say the friendships formed on the mountain — sharing meals, encouraging each other through difficult sections, and celebrating together at Uhuru Peak — become as memorable as the summit itself.</p>

<figure style="margin: 2rem 0;">
<img src="https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp" alt="Group of Kilimanjaro climbers trekking together with guides on the mountain trail" loading="lazy" width="800" height="533" style="width:100%;height:auto;border-radius:8px;" />
<figcaption style="text-align:center;font-size:0.9em;color:#666;margin-top:0.5rem;">A Snow Africa group ascending Kilimanjaro together — the camaraderie on group climbs is what many climbers remember most.</figcaption>
</figure>

<h2>How Much Do Kilimanjaro Group Climbs Cost?</h2>

<p>Group climb pricing depends primarily on the route, duration, and service level. Here's what to expect in 2026:</p>

<table>
<thead>
<tr><th>Route</th><th>Duration</th><th>Group Price (per person)</th><th>Private Price (per person)</th><th>You Save</th></tr>
</thead>
<tbody>
<tr><td>Marangu</td><td>6 days</td><td>$1,850–$2,200</td><td>$2,400–$3,000</td><td>~25%</td></tr>
<tr><td>Machame</td><td>7 days</td><td>$2,100–$2,800</td><td>$2,800–$3,500</td><td>~20%</td></tr>
<tr><td>Rongai</td><td>7 days</td><td>$2,200–$2,900</td><td>$2,900–$3,600</td><td>~20%</td></tr>
<tr><td>Lemosho</td><td>8 days</td><td>$2,500–$3,200</td><td>$3,200–$4,200</td><td>~20%</td></tr>
<tr><td>Northern Circuit</td><td>9 days</td><td>$3,000–$3,500</td><td>$3,800–$4,500</td><td>~18%</td></tr>
</tbody>
</table>

<p><strong>What's NOT included (budget separately):</strong></p>

<ul>
<li>International flights to Kilimanjaro Airport (JRO): $800–$1,500</li>
<li>Tanzania visa: $50 (most nationalities) or $100 (US citizens)</li>
<li>Tips for guides, porters, and cook: $250–$400</li>
<li>Personal gear (if not rented): $500–$1,500</li>
<li>Travel insurance with evacuation cover: $50–$150</li>
</ul>

<p>See our full <a href="/kilimanjaro-prices/">Kilimanjaro pricing breakdown</a> for a detailed cost guide.</p>

<h2>Private vs Group Kilimanjaro Climb: Which Is Right for You?</h2>

<p>This is one of the first decisions you'll make when planning your Kilimanjaro climb. Here's an honest comparison:</p>

<table>
<thead>
<tr><th>Factor</th><th>Group Climb</th><th>Private Climb</th></tr>
</thead>
<tbody>
<tr><td>Cost</td><td>15–30% cheaper</td><td>Premium pricing</td></tr>
<tr><td>Dates</td><td>Fixed departure schedule</td><td>Any date you choose</td></tr>
<tr><td>Pace</td><td>Set by group average</td><td>Fully customized to you</td></tr>
<tr><td>Group size</td><td>4–12 climbers</td><td>Just your party</td></tr>
<tr><td>Social</td><td>Meet international climbers</td><td>Privacy with your group</td></tr>
<tr><td>Flexibility</td><td>Fixed itinerary</td><td>Can adjust on the mountain</td></tr>
<tr><td>Best for</td><td>Solo travelers, couples, budget-conscious</td><td>Families, corporate groups, specific needs</td></tr>
</tbody>
</table>

<p><strong>Our recommendation:</strong> If you're a solo traveler, a couple, or climbing on a budget, a group climb is almost always the better choice. You get the same guides, same routes, same equipment, and the same chance of summiting — at a significantly lower price. Choose private only if you need date flexibility or have specific requirements (medical conditions, very slow pace, etc.).</p>

<h2>Best Routes for Kilimanjaro Group Climbs</h2>

<p>Not all routes are equally suited to group climbing. Here are the most popular options, ranked by our recommendation:</p>

<h3>1. Lemosho Route — 8 Days (Our Top Pick)</h3>
<p><strong>Summit success rate: 90–95%</strong></p>
<p>The <a href="/trekking/8-days-lemosho-route/">Lemosho route</a> is the best choice for most group climbers. The 8-day itinerary provides excellent acclimatization, the scenery is stunning from day one, and the success rate is the highest of any standard route. Groups on Lemosho tend to be smaller and more experienced.</p>

<h3>2. Machame Route — 7 Days (Most Popular)</h3>
<p><strong>Summit success rate: 80–90%</strong></p>
<p>The <a href="/trekking/7-days-machame-route/">"Whiskey Route"</a> is the most popular route on Kilimanjaro for good reason: dramatic scenery, good acclimatization through the "climb high, sleep low" approach, and frequent group departures. It's more physically demanding than Lemosho but one day shorter.</p>

<h3>3. Rongai Route — 7 Days (Quietest Option)</h3>
<p><strong>Summit success rate: 85–90%</strong></p>
<p>The <a href="/trekking/7-days-rongai-route/">Rongai route</a> approaches from the north — the drier side of the mountain. It's less crowded, has gentler terrain, and is ideal for group climbers who prefer a quieter experience. Good for the rainy season when southern routes are wetter.</p>

<h3>4. Marangu Route — 6 Days (Budget Option)</h3>
<p><strong>Summit success rate: 65–80%</strong></p>
<p>The <a href="/trekking/6-days-marangu-route/">only route with hut accommodation</a> (no camping). The shortest and cheapest option, but the lower success rate makes it harder to recommend unless budget is the primary concern. We strongly suggest the 6-day version over the 5-day.</p>

<h2>What's Included in a Kilimanjaro Group Climb?</h2>

<p>A reputable operator's group climb package should include all of the following:</p>

<ul>
<li><strong>Professional guides:</strong> KINAPA-certified lead guide and assistant guides (our ratio: 1 guide per 4 climbers)</li>
<li><strong>Porters:</strong> To carry group equipment, food, and water (3–4 porters per climber)</li>
<li><strong>Cook and all meals:</strong> Three hot meals per day plus snacks and hot drinks</li>
<li><strong>Camping equipment:</strong> Quality tents, sleeping mats, dining tent, and toilet tent</li>
<li><strong>Park fees:</strong> KINAPA entrance fees, camping fees, and rescue fees</li>
<li><strong>Pre/post accommodation:</strong> Hotel night before and after the climb in Moshi or Arusha</li>
<li><strong>Airport transfers:</strong> Pickup and drop-off at Kilimanjaro Airport (JRO)</li>
<li><strong>Emergency oxygen:</strong> Supplemental oxygen and pulse oximeter carried on every climb</li>
<li><strong>Summit certificate:</strong> Official KINAPA certificate upon reaching the summit</li>
</ul>

<p><strong>Red flags:</strong> If an operator doesn't include park fees, airport transfers, or pre/post accommodation, they're quoting a misleadingly low price. Always compare like-for-like when evaluating Kilimanjaro group climb costs.</p>

<h2>How to Choose the Right Group Climb</h2>

<h3>Pick the Right Route Length</h3>
<p>This is the single biggest factor in your success. Routes of 7+ days have dramatically higher summit success rates because they allow proper acclimatization. Our <a href="/best-route-to-climb-kilimanjaro/">route comparison guide</a> breaks this down in detail.</p>

<h3>Check the Guide-to-Climber Ratio</h3>
<p>The industry standard is 1 guide per 6–8 climbers. Better operators maintain 1:4 or 1:5. This matters for safety — your guide needs to be able to monitor each climber's condition, especially above 4,000m.</p>

<h3>Verify the Operator's Credentials</h3>
<p>Look for: TATO (Tanzania Association of Tour Operators) membership, KPAP (Kilimanjaro Porters Assistance Project) partnership, and a documented summit success rate above 85%. Ask how they treat their porters — ethical operators pay fair wages, provide proper food and shelter, and limit porter loads to 20kg. See our guide on <a href="/kilimanjaro-climbing-companies/">choosing a Kilimanjaro climbing company</a>.</p>

<h3>Consider Group Size</h3>
<p>Smaller groups (4–8 climbers) offer more personal attention and flexibility. Larger groups (9–12) are typically cheaper but move slower. Most operators cap groups at 12 for quality reasons.</p>

<h2>What to Expect on a Kilimanjaro Group Climb</h2>

<p>Here's what a typical day looks like on a group climb:</p>

<ul>
<li><strong>6:00 AM:</strong> Wake-up call with hot tea or coffee delivered to your tent</li>
<li><strong>6:30 AM:</strong> Wash up and pack personal items</li>
<li><strong>7:00 AM:</strong> Hot breakfast in the dining tent</li>
<li><strong>8:00 AM:</strong> Begin hiking — porters break camp and overtake you on the trail</li>
<li><strong>12:00 PM:</strong> Hot lunch at a designated rest point</li>
<li><strong>1:00–3:00 PM:</strong> Continue hiking to the next camp</li>
<li><strong>3:00–4:00 PM:</strong> Arrive at camp — porters have already set up tents</li>
<li><strong>4:00 PM:</strong> Rest, acclimatize, and socialize with your group</li>
<li><strong>6:00 PM:</strong> Hot dinner in the dining tent</li>
<li><strong>7:30 PM:</strong> Briefing from your guide on the next day, then early to bed</li>
</ul>

<p>The pace on group climbs is deliberately slow — "pole pole" (Swahili for "slowly, slowly"). This isn't just tradition; it's the single most effective strategy for preventing <a href="/kilimanjaro-altitude-sickness/">altitude sickness</a> and maximizing your summit chances.</p>

<figure style="margin: 2rem 0;">
<img src="https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/49c04fa0-2704-4624-aaf4-59db6de1f1f5.jpg" alt="Kilimanjaro climbers at high-altitude camp with views of the summit zone" loading="lazy" width="800" height="533" style="width:100%;height:auto;border-radius:8px;" />
<figcaption style="text-align:center;font-size:0.9em;color:#666;margin-top:0.5rem;">Climbers resting at a high-altitude camp on Kilimanjaro — daily health checks happen at every camp.</figcaption>
</figure>

<h3>Acclimatization on Group Climbs</h3>
<p>Proper acclimatization is the #1 factor that determines whether you summit. On group climbs, the itinerary is designed around the "climb high, sleep low" principle — hiking to higher elevations during the day, then descending to a lower camp to sleep. This trains your body to produce more red blood cells and adapt to reduced oxygen levels.</p>
<p>Group climbs actually help acclimatization because the pace is set to the group average, which is typically slower than experienced hikers would go alone. That slower pace gives everyone more time to adapt. Our guides also build in acclimatization rest stops and short hikes at camp in the afternoons to speed adaptation.</p>

<h3>Medical Monitoring During Your Climb</h3>
<p>Safety is non-negotiable on Kilimanjaro. On every Snow Africa group climb, guides perform twice-daily health checks at each camp:</p>
<ul>
<li><strong>Pulse oximetry:</strong> Blood oxygen saturation measured with a fingertip device — readings below 70% at altitude may require intervention</li>
<li><strong>Heart rate monitoring:</strong> Resting heart rate tracked to identify early altitude stress</li>
<li><strong>Lake Louise Score:</strong> Standardized questionnaire assessing headache, nausea, fatigue, and dizziness — the <a href="https://wwwnc.cdc.gov/travel/yellowbook/2024/environmental-hazards-and-risks/high-elevation-travel-and-altitude-illness" target="_blank" rel="noopener">international standard for diagnosing acute mountain sickness</a> (AMS) as recommended by the CDC</li>
<li><strong>Emergency oxygen:</strong> Supplemental oxygen carried on every climb in case of severe symptoms</li>
</ul>
<p>If any climber shows signs of serious altitude sickness, our guides have authority to descend that person immediately — no questions, no delays. Your safety always comes before summit goals. Learn more about <a href="/kilimanjaro-altitude-sickness/">altitude sickness prevention and symptoms</a>.</p>

<h2>What Our Group Climbers Say</h2>

<blockquote style="border-left:4px solid #2d6a4f;padding:1rem 1.5rem;margin:1.5rem 0;background:#f0fdf4;border-radius:0 8px 8px 0;">
<p style="font-style:italic;margin-bottom:0.5rem;">"All 3 of us successfully summited Uhuru Peak. The guides were incredible — professional, encouraging, and genuinely cared about our safety. The group dynamic made summit night bearable when I wanted to quit at Stella Point."</p>
<cite style="font-size:0.9em;color:#555;">— Alana, United States (8-day Lemosho group climb, rated 5/5 on SafariBookings)</cite>
</blockquote>

<blockquote style="border-left:4px solid #2d6a4f;padding:1rem 1.5rem;margin:1.5rem 0;background:#f0fdf4;border-radius:0 8px 8px 0;">
<p style="font-style:italic;margin-bottom:0.5rem;">"Our family of 9 — ages 16 to 62 — all made it safely to the summit and back down. The guides knew exactly when to push us and when to slow down. We couldn't have done it without them."</p>
<cite style="font-size:0.9em;color:#555;">— Nelson Laur, United States (family group climb, rated 5/5 on SafariBookings)</cite>
</blockquote>

<h2>Kilimanjaro Group Climb Dates 2026–2027</h2>

<p>We run scheduled group departures throughout the year on Kilimanjaro's most popular routes. Group climbs depart on fixed dates, and you can join as a solo traveler, couple, or small group. Even with just 2 bookings, the departure runs — your climb date is guaranteed.</p>

<p><strong>Peak season departures (June–October & January–March)</strong> fill fastest — book 3–6 months ahead for the best availability. Green season departures (April–May, November) offer lower prices and fewer crowds, though conditions are wetter.</p>

<table>
<thead>
<tr><th>Season</th><th>Months</th><th>Conditions</th><th>Availability</th><th>Price Level</th></tr>
</thead>
<tbody>
<tr><td>Peak Dry</td><td>June–October</td><td>Clear skies, cold nights, busiest</td><td>Most departures, fills fast</td><td>Standard</td></tr>
<tr><td>Warm Dry</td><td>January–March</td><td>Warmer, good visibility, fewer crowds</td><td>Regular departures</td><td>Standard</td></tr>
<tr><td>Short Rains</td><td>November–December</td><td>Brief afternoon showers, green scenery</td><td>Limited departures</td><td>Lower</td></tr>
<tr><td>Long Rains</td><td>April–May</td><td>Wettest period, fewest climbers</td><td>Few departures</td><td>Lowest</td></tr>
</tbody>
</table>

<p><strong><a href="/kilimanjaro-join-group-departures/">View all 2026–2027 group departure dates and prices →</a></strong></p>

<p>Can't find a date that works? <a href="/contact-us/">Contact us</a> — we can often open additional group departures or arrange a private climb on your preferred dates.</p>

<h2>Tips for Solo Travelers Joining a Group Climb</h2>

<p>About 40% of our group climbers are solo travelers. If that's you, here's what to know:</p>

<ul>
<li><strong>You won't be alone:</strong> You'll meet your group at the pre-climb hotel briefing the evening before. Most groups bond quickly over shared excitement and nervous energy.</li>
<li><strong>Tent sharing:</strong> Solo travelers typically share a 2-person tent with another solo climber of the same gender. If you want a private tent, most operators offer this for a small supplement ($100–$150).</li>
<li><strong>No minimum group size:</strong> Our scheduled departures run even if only 2 people book. You're guaranteed to climb on your chosen date.</li>
<li><strong>Communication:</strong> All our group climbs are conducted in English. Guides speak English fluently along with Swahili and often German or French.</li>
<li><strong>Stay connected:</strong> Exchange contact details with your group — many of our climbers meet up again for future adventures together.</li>
</ul>

<h2>Frequently Asked Questions</h2>

<div class="faq-accordion" itemscope itemtype="https://schema.org/FAQPage">

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">How much does a Kilimanjaro group climb cost?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">Kilimanjaro group climbs cost $1,850–$3,500 per person depending on the route and duration. The 6-day Marangu route is the cheapest option at $1,850–$2,200, while the 8-day Lemosho route costs $2,500–$3,200. Group climbs save 15–30% compared to private climbs on the same route. Budget separately for flights ($800–$1,500), visa ($50–$100), tips ($250–$400), and personal gear.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">What is the ideal group size for climbing Kilimanjaro?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">The ideal group size for Kilimanjaro is 4–8 climbers. This provides the best balance of cost savings, personal attention from guides, and social experience. Smaller groups (2–4) feel more private but cost more per person. Larger groups (9–12) are cheaper but slower on the trail. Most reputable operators cap group size at 12 climbers to maintain quality and safety.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">Can I join a Kilimanjaro group climb as a solo traveler?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">Yes — about 40% of group climbers are solo travelers. You'll meet your group at a pre-climb briefing and share a tent with another solo climber of the same gender (private tent supplements are available for $100–$150). Scheduled departures run even with just 2 bookings, so your climb date is guaranteed. Solo travelers consistently rate the social experience as a highlight of their Kilimanjaro climb.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">Which route is best for a Kilimanjaro group climb?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">The Lemosho route (8 days) is the best route for group climbs, with a 90–95% summit success rate and the best acclimatization profile. The Machame route (7 days) is the most popular group option with 80–90% success rates and dramatic scenery. For budget-conscious climbers, the Marangu route (6 days) is cheapest but has lower success rates at 65–80%. Choose a 7+ day route for the best summit chances.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">What is the difference between a group climb and a private climb on Kilimanjaro?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">Group climbs have fixed departure dates and you climb with 4–12 other trekkers, sharing costs for guides, porters, and equipment (saving 15–30%). Private climbs let you choose any start date and climb at your own pace with just your party, but cost more. Both use the same routes, the same professional guides, and the same equipment. Group climbs are better for solo travelers and budget-conscious climbers; private climbs suit families or those needing date flexibility.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">When is the best time to join a Kilimanjaro group climb?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">The best months for Kilimanjaro group climbs are January–March and June–October (dry seasons). June–October offers the clearest skies and most group departures. January–March is warmer with fewer crowds. Group departures are available year-round, but rainy season climbs (April–May, November) have fewer groups and more challenging conditions. Book 3–6 months in advance for peak season dates.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">What happens if the group climb doesn't fill up?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">Our scheduled group departures run with as few as 2 climbers — your date is guaranteed regardless of final group size. If only 2–3 people book, you essentially get a semi-private experience at the group price. We never cancel a departure due to low numbers. If a departure date has strong bookings, we may open additional dates on the same route to keep group sizes comfortable.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">Can I get a private tent on a group climb?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">Yes. Solo travelers are normally paired with another solo climber of the same gender in a 2-person tent. If you prefer your own space, a private tent supplement is available for $100–$150 per climb. Couples and friends traveling together automatically share a tent. All tents are quality 4-season mountain tents rated for high-altitude conditions.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">What is the summit success rate for Kilimanjaro group climbs?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">Summit success rates depend heavily on the route and duration. The 8-day Lemosho route has the highest rate at 90–95%, followed by the 7-day Rongai (85–90%) and 7-day Machame (80–90%). The 6-day Marangu has the lowest at 65–80% due to less acclimatization time. Our overall success rate across all group climbs is above 90%, as we recommend 7+ day routes and maintain strict acclimatization protocols with twice-daily health monitoring.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">Do I need to be physically fit to join a Kilimanjaro group climb?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">You don't need to be an athlete, but reasonable fitness is important. You should be comfortable hiking 5–8 hours per day over uneven terrain. Most group climbers prepare with 8–12 weeks of training: regular hiking, cardio (running, cycling, swimming), and stair climbing. The pace on group climbs is deliberately slow ("pole pole"), which helps all fitness levels. Read our full <a href="/kilimanjaro-training-plan/">Kilimanjaro training plan</a> for a week-by-week preparation guide.</p>
</div>
</div>

</div>

<p>Ready to join a Kilimanjaro group climb? <a href="/kilimanjaro-join-group-departures/">Browse our 2026–2027 group departure dates</a> or <a href="/contact-us/">contact us</a> to find the right climb for your schedule and budget.</p>
`.trim();

async function main() {
  const slug = "kilimanjaro-group-climbs";

  // Step 1: Update metadata
  console.log("Updating metadata...");
  await prisma.blogPost.update({
    where: { slug },
    data: {
      title: "Kilimanjaro Group Climbs: Cost, Routes & How to Join a Group Trek",
      metaTitle: "Kilimanjaro Group Climbs 2026-2027: Cost, Routes & Dates",
      metaDescription:
        "Kilimanjaro group climbs from $1,850. Compare routes, group vs private costs, what's included, and tips for solo travelers. Join scheduled departures & save 15-30%.",
      excerpt:
        "Everything you need to know about Kilimanjaro group climbs — pricing by route, what's included, private vs group comparison, and how to join a scheduled departure.",
    },
  });
  console.log("✓ Metadata updated");

  // Step 2: Update content
  console.log("Updating content...");
  const updated = await prisma.blogPost.update({
    where: { slug },
    data: { content },
  });

  console.log(`✓ Content updated for "${updated.slug}"`);
  console.log(`  Title: ${updated.title}`);
  console.log(`  Meta Title: ${updated.metaTitle}`);
  console.log(
    `  Meta Description: ${updated.metaDescription?.substring(0, 80)}...`
  );

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
