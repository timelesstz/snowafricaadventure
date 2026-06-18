/**
 * seed-kilimanjaro-blog-posts-24a.ts
 *
 * Upserts 2 Kilimanjaro blog posts (batch 24a):
 *  1. kilimanjaro-arusha-guide
 *  2. kilimanjaro-group-dynamics
 *
 * Run: npx tsx scripts/seed-kilimanjaro-blog-posts-24a.ts
 */

import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";

config({ path: ".env.local" });

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL_ACCELERATE,
});

const FEATURED_IMAGE =
  "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp";

/* ------------------------------------------------------------------ */
/*  Post 1: kilimanjaro-arusha-guide                                   */
/* ------------------------------------------------------------------ */
const post1Content = `
<p>Arusha is the gateway city to Mount Kilimanjaro. Nearly every climber who attempts Africa's highest peak spends at least one or two nights in this bustling northern Tanzanian city — one night before the climb to meet the guide team, check gear, and get a final briefing, and often another night after descending to celebrate, recover, and sleep in a real bed. What you do with that time in Arusha matters more than most people realise. The right hotel means a solid sleep before the biggest physical challenge of your life. The right restaurant means a proper carb-loaded meal before six or more days of mountain food. The right pre-climb activity means you arrive at the gate relaxed and acclimatised rather than jet-lagged and anxious. This guide covers everything Kilimanjaro climbers need to know about Arusha — where to stay, where to eat, where to buy last-minute gear, and what to do before and after your climb.</p>

<h2>Getting to Arusha</h2>

<p>Arusha sits at an altitude of <strong>1,400 metres</strong> above sea level — which means you start acclimatising the moment you arrive. The city is served by two airports and overland routes from Kenya.</p>

<h3>Kilimanjaro International Airport (JRO)</h3>

<p>The main international gateway is <strong>Kilimanjaro International Airport (JRO)</strong>, located approximately <strong>46 kilometres east</strong> of Arusha town centre. Direct flights arrive from Amsterdam (KLM), Istanbul (Turkish Airlines), Doha (Qatar Airways), Addis Ababa (Ethiopian Airlines), and Nairobi (Kenya Airways, Precision Air). The drive from JRO to Arusha takes 45–60 minutes depending on traffic. Most reputable <a href="/climbing-kilimanjaro/">Kilimanjaro climbing operators</a> include airport transfers as part of the package — confirm this when booking. If arranging your own transport, expect to pay $40–$60 USD for a private taxi or $15–$20 for a shared shuttle.</p>

<h3>Arusha Airport (ARK)</h3>

<p><strong>Arusha Airport (ARK)</strong> is a small domestic airport located just 8 kilometres west of town. It handles domestic flights from Dar es Salaam, Zanzibar, and the Serengeti/Ngorongoro airstrips. If you are combining your Kilimanjaro climb with a <a href="/kilimanjaro-safari-combo/">safari or Zanzibar extension</a>, this is the airport you will likely use for internal connections. Coastal Aviation and Auric Air operate most routes.</p>

<h3>Shuttle from Nairobi</h3>

<p>If you fly into Nairobi's Jomo Kenyatta International Airport (NBO) — which sometimes has cheaper flights — you can catch a cross-border shuttle to Arusha. The journey takes approximately 4–5 hours via the Namanga border crossing. Riverside Shuttle and Impala Shuttle are the most reliable operators, running multiple daily departures from central Nairobi. One-way tickets cost $25–$35 USD. You will need a valid <a href="/kilimanjaro-visa-tanzania/">Tanzania visa</a> at the border.</p>

<h2>Where to Stay in Arusha</h2>

<p>Your choice of hotel depends on your budget, whether you want to be in the city centre or closer to your climbing gate, and how much recovery luxury you want after the mountain. Here is a breakdown by budget tier.</p>

<h3>Budget ($30–$80 per Night)</h3>

<p>Budget accommodation in Arusha is clean, functional, and gets the job done. You will not get five-star amenities, but you will get a bed, a hot shower, and breakfast before your climb.</p>

<ul>
<li><strong>Arusha Backpackers:</strong> The social hub of the budget traveller scene. Dorms and private rooms, a lively bar, and plenty of fellow climbers to swap stories with. Great for solo travellers joining group departures. Located in the city centre.</li>
<li><strong>Meru House Inn:</strong> A reliable mid-budget guesthouse with clean rooms, Wi-Fi, and a quiet garden. Walking distance to restaurants and shops. Good value for couples or small groups.</li>
<li><strong>Planet Lodge:</strong> Set in a leafy compound on the outskirts of town, Planet Lodge offers cottage-style rooms with more space and greenery than most budget options. It has a restaurant on site and a peaceful atmosphere that helps with pre-climb nerves.</li>
</ul>

<h3>Mid-Range ($80–$200 per Night)</h3>

<p>Mid-range hotels in Arusha offer genuine comfort — proper beds, reliable hot water, swimming pools, and restaurant quality that goes beyond basic breakfast buffets.</p>

<ul>
<li><strong>African Tulip Hotel:</strong> The best mid-range option in Arusha. Boutique styling, excellent restaurant, rooftop bar with views, and a central location. Popular with climbing groups who want comfort without luxury pricing.</li>
<li><strong>Kibo Palace Hotel:</strong> A large modern hotel with a pool, gym, spa, and multiple restaurants. Good for post-climb recovery when you want space and amenities.</li>
<li><strong>Mount Meru Hotel:</strong> One of the older established hotels in Arusha with extensive grounds, a pool, and a location right on the main road. The rooms have been refurbished and the breakfast buffet is substantial — exactly what you want before a climb.</li>
</ul>

<h3>Luxury ($200+ per Night)</h3>

<p>Luxury hotels in Arusha range from international chains to historic properties with character. If you are treating Kilimanjaro as a once-in-a-lifetime trip, the extra spend on a luxury hotel before and after the climb is worth every shilling.</p>

<ul>
<li><strong>Gran Melia Arusha:</strong> The top international brand hotel in the area. Set on a coffee estate with world-class grounds, spa, fine dining, and impeccable service. If budget is not a constraint, this is the choice.</li>
<li><strong>Arusha Serena Hotel:</strong> Part of the Serena chain, this hotel has expansive gardens, a pool, and a location near the city centre. Reliable luxury with a distinctly African ambiance — stone walls, local art, and lush tropical landscaping.</li>
<li><strong>The Arusha Hotel:</strong> A historic property dating back to 1894, this is the oldest hotel in Arusha and carries genuine character. Recently renovated with modern amenities but retaining its colonial-era architecture. Located right in the city centre near the Clock Tower.</li>
</ul>

<h3>Near Machame Gate</h3>

<p>If you are climbing the <a href="/trekking/7-days-machame-route/">Machame route</a> — the most popular route on Kilimanjaro — you might prefer to stay near the gate to reduce the morning drive on Day 1.</p>

<ul>
<li><strong>Kilimanjaro Mountain Resort:</strong> A well-run lodge with views of the mountain on clear days. Located on the road to Machame Gate, it cuts travel time on climb day significantly.</li>
<li><strong>Weru Weru River Lodge:</strong> A charming riverside lodge in the foothills near Moshi, well-positioned for Machame or Marangu gate access. Quiet, green, and an excellent place to sleep before the mountain.</li>
</ul>

<h3>Where to Stay in Arusha — Comparison Table</h3>

<table>
<thead>
<tr><th>Hotel</th><th>Price Range</th><th>Distance to Town Centre</th><th>Distance to Machame Gate</th><th>Highlights</th></tr>
</thead>
<tbody>
<tr><td><strong>Arusha Backpackers</strong></td><td>$30–$50/night</td><td>City centre</td><td>~70 km</td><td>Social, solo-friendly, dorms available</td></tr>
<tr><td><strong>Meru House Inn</strong></td><td>$40–$70/night</td><td>City centre</td><td>~70 km</td><td>Quiet garden, good Wi-Fi, couples</td></tr>
<tr><td><strong>Planet Lodge</strong></td><td>$50–$80/night</td><td>5 km</td><td>~65 km</td><td>Leafy grounds, cottages, peaceful</td></tr>
<tr><td><strong>African Tulip Hotel</strong></td><td>$100–$180/night</td><td>City centre</td><td>~70 km</td><td>Boutique, rooftop bar, best mid-range</td></tr>
<tr><td><strong>Kibo Palace Hotel</strong></td><td>$90–$160/night</td><td>City centre</td><td>~70 km</td><td>Pool, gym, spa, large modern hotel</td></tr>
<tr><td><strong>Mount Meru Hotel</strong></td><td>$80–$150/night</td><td>1 km</td><td>~68 km</td><td>Established, pool, big breakfast buffet</td></tr>
<tr><td><strong>Gran Melia Arusha</strong></td><td>$250–$500/night</td><td>15 km (coffee estate)</td><td>~55 km</td><td>World-class spa, fine dining, top luxury</td></tr>
<tr><td><strong>Arusha Serena Hotel</strong></td><td>$200–$350/night</td><td>2 km</td><td>~68 km</td><td>Serena chain, gardens, pool, African décor</td></tr>
<tr><td><strong>The Arusha Hotel</strong></td><td>$200–$300/night</td><td>City centre (Clock Tower)</td><td>~70 km</td><td>Historic 1894, recently renovated, character</td></tr>
<tr><td><strong>Kilimanjaro Mountain Resort</strong></td><td>$80–$150/night</td><td>50 km (near Machame)</td><td>~15 km</td><td>Mountain views, short drive to gate</td></tr>
<tr><td><strong>Weru Weru River Lodge</strong></td><td>$70–$130/night</td><td>60 km (near Moshi)</td><td>~25 km</td><td>Riverside, quiet, green, foothills</td></tr>
</tbody>
</table>

<h2>Where to Eat in Arusha</h2>

<p>Food in Arusha ranges from traditional Tanzanian street food to international fine dining. For climbers, the priority is carb-loading before the mountain and celebrating after. Here are the best options.</p>

<h3>Local Tanzanian Cuisine</h3>

<ul>
<li><strong>Mama's Kitchen:</strong> A local favourite serving traditional Tanzanian dishes — pilau rice, grilled meats, ugali with beans, and chapati. The portions are generous, the prices are local-friendly, and the food is exactly the kind of hearty carb-heavy meal you want the night before a climb.</li>
<li><strong>Khan's BBQ:</strong> An Arusha institution. Open-air grills serving skewered meats, mishkaki (beef or chicken kebabs), chips mayai (the Tanzanian omelette-chip fusion), and fresh juices. It fills up in the evening, the smoke and noise create a vibrant atmosphere, and the food is exceptional value. Best for groups.</li>
</ul>

<h3>International and Fine Dining</h3>

<ul>
<li><strong>The Blue Heron:</strong> Upscale dining in a garden setting with a menu blending Tanzanian and international flavours. Steaks, seafood, pasta, and excellent cocktails. This is the post-climb celebration restaurant — the place to mark your summit with a proper meal and a cold drink.</li>
<li><strong>Via Via:</strong> A Belgian-Tanzanian cultural café near the Natural History Museum. Live music on some evenings, a diverse menu covering everything from pasta to curries to Tanzanian specialities, and an arty, relaxed atmosphere. Good for both pre-climb dinners and post-climb decompression.</li>
</ul>

<h3>Coffee Shops</h3>

<p>Tanzania grows some of the finest coffee in the world — particularly in the highlands around Kilimanjaro and Mount Meru. Do not leave Arusha without drinking local coffee.</p>

<ul>
<li><strong>Arusha Coffee Lodge:</strong> Set on a working coffee plantation, this is more than a coffee shop — it is an experience. You can tour the estate, watch the roasting process, and drink coffee that was growing in the ground outside the window hours before. Worth a half-day visit.</li>
<li><strong>Union Café:</strong> A popular spot in the city centre serving excellent Tanzanian coffee alongside pastries and light meals. Good Wi-Fi makes it a useful base for pre-climb admin — uploading last photos, emailing family, or checking gear lists.</li>
</ul>

<h3>Pre-Climb Dinner Spots</h3>

<p>Your last dinner before the mountain should be carb-heavy, protein-rich, and something you genuinely enjoy. Avoid anything too spicy or unfamiliar — the last thing you need is an upset stomach on Day 1. Khan's BBQ, Mount Meru Hotel's buffet, and the African Tulip restaurant are all excellent choices. Order extra rice, potatoes, or pasta. Drink water, not alcohol.</p>

<h3>Post-Climb Celebration Restaurants</h3>

<p>You just climbed the highest mountain in Africa. You deserve a proper meal. The Blue Heron is the go-to celebration spot for a reason — steaks, cocktails, and a garden setting that feels civilised after a week in the wilderness. Via Via works well for groups who want live music and a more casual vibe. If you are staying at the African Tulip, their rooftop bar is the perfect spot for sunset drinks with your climbing team.</p>

<h3>Best Restaurants in Arusha — Comparison Table</h3>

<table>
<thead>
<tr><th>Restaurant</th><th>Cuisine</th><th>Price Range</th><th>Best For</th></tr>
</thead>
<tbody>
<tr><td><strong>Mama's Kitchen</strong></td><td>Traditional Tanzanian</td><td>$5–$12</td><td>Authentic local food, carb-loading</td></tr>
<tr><td><strong>Khan's BBQ</strong></td><td>Grilled meats, street food</td><td>$5–$15</td><td>Groups, pre-climb dinner, atmosphere</td></tr>
<tr><td><strong>The Blue Heron</strong></td><td>International fine dining</td><td>$20–$45</td><td>Post-climb celebration, date night</td></tr>
<tr><td><strong>Via Via</strong></td><td>International fusion</td><td>$10–$25</td><td>Live music, casual groups, culture</td></tr>
<tr><td><strong>Arusha Coffee Lodge</strong></td><td>Coffee, light meals</td><td>$8–$20</td><td>Coffee experience, plantation tour</td></tr>
<tr><td><strong>Union Café</strong></td><td>Coffee, pastries</td><td>$3–$10</td><td>Quick coffee, Wi-Fi, city centre</td></tr>
<tr><td><strong>African Tulip Restaurant</strong></td><td>International, buffet</td><td>$15–$35</td><td>Hotel guests, rooftop bar, pre-climb</td></tr>
<tr><td><strong>Mount Meru Hotel Buffet</strong></td><td>Buffet, international</td><td>$12–$25</td><td>Hearty breakfast, pre-climb fuel</td></tr>
</tbody>
</table>

<h2>Shopping for Last-Minute Gear</h2>

<p>Forgot a base layer? Need a warmer fleece? Left your headlamp at home? Arusha has you covered — though with caveats. The <a href="/kilimanjaro-climbing-gear/">gear you need for Kilimanjaro</a> is readily available in town, but quality varies enormously and prices are higher than buying at home.</p>

<h3>Outdoor Gear Shops in Arusha</h3>

<p>Several shops along the main roads near the Clock Tower sell trekking gear — both new and rental. Look for shops that cater specifically to climbers rather than general tourist shops. The quality of new gear ranges from excellent branded items (North Face, Columbia) to no-name alternatives that may or may not last a week on the mountain. For critical items like waterproof jackets and warm layers, buy branded if possible.</p>

<h3>Markets for Base Layers and Accessories</h3>

<p>Arusha's <strong>Mitumba markets</strong> (second-hand clothing markets) sell surprisingly good quality base layers, fleeces, and warm clothing imported from Europe and the US. You can find thermal leggings, merino wool layers, and fleece jackets for a fraction of their retail price. Quality varies — inspect items carefully for wear and check zippers — but many climbers have successfully kitted out their entire layering system from these markets for under $50.</p>

<h3>What You Can Rent from Operators</h3>

<p>Most reputable operators rent out the big-ticket items: <strong>sleeping bags</strong> (rated to -20°C), <strong>trekking poles</strong>, <strong>waterproof pants</strong>, and sometimes <strong>down jackets</strong>. Rental costs typically range from $15–$30 per item for the entire climb. The quality of rental gear varies by operator — the best operators maintain their rental stock well, while budget operators may provide worn-out equipment. Always inspect rental gear before accepting it.</p>

<h3>Prices Comparison: Arusha vs Home Country</h3>

<table>
<thead>
<tr><th>Item</th><th>Price in Arusha (New)</th><th>Price in Arusha (Mitumba/Rental)</th><th>Price at Home (Approx.)</th></tr>
</thead>
<tbody>
<tr><td><strong>Waterproof jacket</strong></td><td>$60–$150</td><td>$15–$30 (used)</td><td>$80–$200</td></tr>
<tr><td><strong>Fleece jacket</strong></td><td>$30–$80</td><td>$5–$15 (used)</td><td>$40–$100</td></tr>
<tr><td><strong>Trekking poles (pair)</strong></td><td>$20–$50</td><td>$15–$25 (rental)</td><td>$30–$80</td></tr>
<tr><td><strong>Sleeping bag (-20°C)</strong></td><td>$80–$200</td><td>$20–$30 (rental)</td><td>$150–$400</td></tr>
<tr><td><strong>Base layer set</strong></td><td>$25–$60</td><td>$5–$12 (used)</td><td>$40–$80</td></tr>
<tr><td><strong>Headlamp</strong></td><td>$10–$30</td><td>$5–$10 (basic)</td><td>$15–$40</td></tr>
</tbody>
</table>

<h2>Things to Do Before Your Climb</h2>

<p>Most climbers arrive in Arusha a day early. Use that time wisely — gentle acclimatisation, cultural exploration, and relaxation are far better than sitting in your hotel room worrying about the mountain.</p>

<h3>Arusha National Park (Half-Day Trip)</h3>

<p>Arusha National Park is only 25 kilometres from town and offers a perfect half-day outing. The park sits on the slopes of <strong>Mount Meru</strong> (4,562m) and features walking safaris among giraffes, zebras, and buffalo, as well as canoeing on the Momella Lakes where flamingos gather. The views of Mount Meru and — on clear days — Kilimanjaro itself are spectacular. A half-day trip costs approximately $50–$80 per person including park fees and guide.</p>

<h3>Cultural Heritage Centre</h3>

<p>This massive complex on the road to Arusha National Park houses one of East Africa's largest collections of art, gemstones (including tanzanite, mined exclusively in this region), and African artefacts. Even if you do not plan to buy anything, the galleries are worth a wander. The tanzanite exhibit is educational and gives context to a gemstone found nowhere else on Earth.</p>

<h3>Maasai Market</h3>

<p>The central Maasai Market in Arusha sells beaded jewellery, carved wooden figures, batik fabrics, and an array of souvenirs. Bargaining is expected — start at roughly half the quoted price and negotiate from there. The market is busiest on Wednesday and Saturday mornings. Buy souvenirs here before your climb so you do not have to carry them on the mountain.</p>

<h3>Coffee Plantation Tours</h3>

<p>The slopes of Mount Meru and the Kilimanjaro foothills produce some of the world's best coffee. Several plantations near Arusha offer guided tours where you walk through the growing process — from cherry picking to roasting — and taste fresh coffee at the end. Tours typically last 2–3 hours and cost $20–$40 per person. The Arusha Coffee Lodge and various Chagga-run plantations near Machame offer excellent options.</p>

<h3>Shanga</h3>

<p>Shanga is a social enterprise in the grounds of the Elewana Arusha Coffee Lodge that employs people with disabilities to create glasswork, metalwork, jewellery, and fabric items. The workshop tour is fascinating, the products are beautiful and unique, and your purchase directly supports an outstanding social cause. Allow 1–2 hours.</p>

<h3>Meserani Snake Park</h3>

<p>Located about 25 kilometres west of Arusha, the Meserani Snake Park is a small but worthwhile stop if you have time. It houses a collection of native Tanzanian snakes, a Maasai cultural exhibit, and a small museum. A good option for families or anyone with a few hours to fill before their climb briefing.</p>

<h2>Things to Do After Your Climb</h2>

<p>You have summited Kilimanjaro. Your legs ache, your appetite has returned with a vengeance, and you have between one and fourteen days before your flight home. Here are the best ways to spend them.</p>

<h3>Safari in Ngorongoro Crater or Serengeti</h3>

<p>The most popular post-Kilimanjaro activity is a <a href="/kilimanjaro-safari-combo/">safari in the northern Tanzania circuit</a> — Ngorongoro Crater, the Serengeti, Lake Manyara, and Tarangire. Multi-day safaris typically run 3–7 days and range from $250–$500+ per person per day depending on accommodation level. The Ngorongoro Crater is particularly rewarding as a 2-day add-on — it is only 3 hours from Arusha and the wildlife density in the crater is extraordinary.</p>

<h3>Zanzibar Beach Holiday</h3>

<p>A Zanzibar extension is the classic "mountain and beach" combination. Fly from Arusha Airport (ARK) to Zanzibar in about an hour. The white sand beaches, turquoise waters, and Stone Town's narrow streets offer a complete contrast to a week on the mountain. Most climbers book 3–5 nights. Budget beach hotels start around $60/night; boutique and luxury resorts range from $150–$500+/night.</p>

<h3>Chemka (Kikuletwa) Hot Springs</h3>

<p>The <a href="/kilimanjaro-after-summit/">Chemka Hot Springs</a> are natural warm-water springs surrounded by tropical trees, located about 1.5 hours south of Moshi. The warm water is incredibly soothing on post-climb muscles, and the setting — a natural pool fed by underground springs under a canopy of fig trees — is beautiful. Day trip cost is approximately $40–$60 per person including transport and entry fees.</p>

<h3>Materuni Waterfalls Day Trip</h3>

<p>Materuni village sits on the southern slopes of Kilimanjaro, and the waterfall hike is a gentle 45-minute walk through coffee and banana plantations to a stunning 80-metre waterfall. The trip typically includes a coffee-making experience with a local Chagga family. Cost is approximately $50–$70 per person. It is an excellent gentle day out for legs that are still recovering from the mountain.</p>

<h3>Lake Manyara Day Trip</h3>

<p>Lake Manyara National Park is about 2 hours from Arusha and makes an excellent day trip. The park is famous for its tree-climbing lions, large baboon troops, flamingo-lined lake shores, and lush groundwater forest. A day trip costs approximately $100–$150 per person including park fees, guide, and transport. It offers a wildlife experience without the commitment of a multi-day safari.</p>

<h3>Post-Climb Activities — Comparison Table</h3>

<table>
<thead>
<tr><th>Activity</th><th>Duration</th><th>Distance from Arusha</th><th>Cost (Per Person)</th><th>Highlights</th></tr>
</thead>
<tbody>
<tr><td><strong>Ngorongoro Crater Safari</strong></td><td>2–3 days</td><td>180 km (3 hours)</td><td>$500–$1,500</td><td>Big Five in a volcanic crater, extraordinary density</td></tr>
<tr><td><strong>Serengeti Safari</strong></td><td>3–7 days</td><td>335 km (7 hours)</td><td>$800–$3,500</td><td>Great Migration, vast plains, iconic Africa</td></tr>
<tr><td><strong>Zanzibar Beach</strong></td><td>3–5 days</td><td>1-hour flight</td><td>$60–$500/night</td><td>White sand, turquoise water, Stone Town culture</td></tr>
<tr><td><strong>Chemka Hot Springs</strong></td><td>Half day</td><td>90 km (1.5 hours via Moshi)</td><td>$40–$60</td><td>Natural warm springs, muscle recovery, scenic</td></tr>
<tr><td><strong>Materuni Waterfalls</strong></td><td>Half day</td><td>60 km (1.5 hours via Moshi)</td><td>$50–$70</td><td>80m waterfall, coffee tour, Chagga village</td></tr>
<tr><td><strong>Lake Manyara Day Trip</strong></td><td>Full day</td><td>126 km (2 hours)</td><td>$100–$150</td><td>Tree-climbing lions, flamingos, forest</td></tr>
</tbody>
</table>

<h2>Practical Tips for Kilimanjaro Climbers in Arusha</h2>

<h3>Currency and Payments</h3>

<p>The local currency is the <strong>Tanzanian Shilling (TZS)</strong>, but <strong>US dollars are widely accepted</strong> in Arusha — hotels, tour operators, and many restaurants quote prices in USD. ATMs are available at major banks (CRDB, NMB, Exim Bank) in the city centre and at the airport. Visa and Mastercard are accepted at most mid-range and luxury hotels. Carry small USD bills ($1, $5, $10, $20) for tips, taxi fares, and market purchases. Note: US dollar bills printed before 2006 are often rejected in Tanzania.</p>

<h3>SIM Cards and Connectivity</h3>

<p>Buy a local SIM card at the airport or any phone shop in town. <strong>Vodacom</strong> and <strong>Airtel</strong> are the two main providers — both offer 4G coverage in Arusha and along most of the lower Kilimanjaro routes. A SIM card with a data bundle costs approximately $5–$10 and provides enough data for a week of moderate use. You will lose signal on the mountain above approximately 3,500m, but having a local number is useful for confirming arrangements with your operator.</p>

<h3>Getting Around Arusha</h3>

<p>Taxis are the primary transport for tourists in Arusha. <strong>Negotiate the price before getting in</strong> — there are no meters. A ride within the city centre should cost 5,000–10,000 TZS ($2–$4). From the city centre to the outskirts, expect 15,000–25,000 TZS ($6–$10). Uber and Bolt are not currently available in Arusha. Bajaj (three-wheeled tuk-tuks) are cheaper than taxis and good for short distances within town.</p>

<h3>Safety</h3>

<p>Arusha is <strong>generally safe for tourists</strong> but standard precautions apply. Avoid walking alone at night, particularly outside the city centre. Keep valuables out of sight. Use hotel safes for passports and excess cash. The area around the Clock Tower and the main hotels is well-lit and busy in the evenings. Petty theft (pickpocketing, bag snatching) can occur in crowded market areas — keep bags zipped and in front of you.</p>

<h3>Altitude Advantage</h3>

<p>Arusha sits at <strong>1,400 metres above sea level</strong> — higher than Denver, Colorado. This means you are already beginning to acclimatise from the moment you arrive. If you are <a href="/kilimanjaro-from-usa/">flying from a low-altitude country</a> or <a href="/kilimanjaro-from-uk/">coming from the UK</a>, spending 2–3 nights in Arusha before your climb gives your body a gentle head start on altitude adjustment. It will not replace proper acclimatisation on the mountain, but every bit helps.</p>

<h3>What to Do the Day Before Your Climb</h3>

<p>Your operator will typically schedule a <strong>briefing meeting</strong> the afternoon or evening before the climb. During this meeting you will meet your lead guide, review the itinerary, do a final gear check, and ask any remaining questions. Beyond the briefing:</p>

<ul>
<li>Eat a large, carb-heavy dinner (rice, pasta, potatoes)</li>
<li>Drink 2–3 litres of water throughout the day</li>
<li>Lay out all your gear and do a final pack — weigh your daypack and your duffel</li>
<li>Get to bed early — aim for 8+ hours of sleep</li>
<li>Do not drink alcohol the night before</li>
<li>Do not try any adventurous food — stick to what your stomach knows</li>
</ul>

<p>For a complete guide to what happens at the <a href="/kilimanjaro-airport-guide/">airport and on arrival day</a>, read our dedicated airport guide.</p>
`;

/* ------------------------------------------------------------------ */
/*  Post 2: kilimanjaro-group-dynamics                                 */
/* ------------------------------------------------------------------ */
const post2Content = `
<p>Kilimanjaro is rarely a solo endeavour. Whether you join an <a href="/kilimanjaro-join-group-departures/">open group departure</a> with strangers, bring your closest friends, or climb as part of a corporate team, the group dynamic on the mountain can make or break your experience. A supportive, well-bonded group turns the hardest night of your life into a shared triumph. A dysfunctional group turns six days of physical strain into six days of social exhaustion on top of the physical kind. This guide covers how groups form, how they fracture, how the best guides manage them, and how you can thrive regardless of who you climb with.</p>

<h2>Types of Climbing Groups on Kilimanjaro</h2>

<p>Not all Kilimanjaro groups are created equal. The type of group you climb with shapes everything — from pace control to social energy to how conflicts are handled. Here are the four main types.</p>

<h3>Private Group (Friends and Family)</h3>

<p>You know everyone. You chose each other. You share a history and a reason for climbing together — a milestone birthday, a shared bucket-list dream, a memorial for someone you lost. Private groups have the advantage of pre-existing trust and communication patterns. You already know who is the early riser, who is the slow starter, who needs space, and who needs encouragement. The downside is that pre-existing relationship tensions can amplify under the stress of altitude, sleep deprivation, and physical discomfort. That unresolved argument from three months ago? It will surface on Day 4.</p>

<h3>Join-a-Group / Open Departure</h3>

<p>Strangers assembled by a tour operator, united by the same departure date and the same mountain. Open departures attract the most diverse range of people — different nationalities, different fitness levels, different motivations, different ages. This diversity is both the greatest strength and the greatest challenge. You will hear perspectives you have never considered. You will also navigate pace differences, language barriers, and the awkwardness of sharing a tent with someone you met 48 hours ago. The upside: <a href="/kilimanjaro-join-group-departures/">open departure groups</a> often form the strongest post-climb bonds precisely because the shared experience is their entire relationship foundation.</p>

<h3>Corporate and Team-Building Groups</h3>

<p><a href="/kilimanjaro-corporate-teams/">Corporate groups</a> climb with a dual purpose — summiting Kilimanjaro and building team cohesion. The mountain strips away office hierarchies faster than any boardroom exercise. The CEO struggles with altitude just like the intern. The quiet analyst turns out to be the toughest walker. Corporate groups benefit from a shared organisational identity and a built-in support structure, but they also carry workplace politics onto the mountain. The key to successful corporate climbs is setting expectations early: on the mountain, job titles mean nothing. Physical performance does not correlate with professional rank.</p>

<h3>Charity Groups</h3>

<p>Charity climbers are raising money for a cause, and that cause creates a powerful unifying purpose. When the altitude hits and morale drops, "I'm doing this for the charity" is a motivational anchor that personal climbs lack. Charity groups tend to have strong camaraderie from Day 1 — everyone has fundraised, everyone has a story about why this cause matters, and there is a collective accountability that keeps people pushing. The challenge with charity groups is that some members may have prioritised fundraising over fitness preparation, leading to wider ability gaps than other group types.</p>

<h3>Group Types — Comparison Table</h3>

<table>
<thead>
<tr><th>Group Type</th><th>Typical Size</th><th>Pace Control</th><th>Cost Per Person</th><th>Social Dynamic</th><th>Best For</th></tr>
</thead>
<tbody>
<tr><td><strong>Private (friends/family)</strong></td><td>2–8</td><td>Full control — set your own pace</td><td>$3,500–$6,500 (flexible)</td><td>Pre-existing trust, possible legacy tensions</td><td>Close groups with shared motivation</td></tr>
<tr><td><strong>Open departure</strong></td><td>4–12</td><td>Pace set by guides for group</td><td>$2,500–$4,500 (fixed dates)</td><td>Diverse, unpredictable, often very bonding</td><td>Solo travellers, budget-conscious climbers</td></tr>
<tr><td><strong>Corporate</strong></td><td>6–20</td><td>Subgroups with team leaders</td><td>$4,000–$7,000 (corporate packages)</td><td>Shared org identity, hierarchy disruption</td><td>Team-building, company milestones</td></tr>
<tr><td><strong>Charity</strong></td><td>8–25</td><td>Pace by ability, strong support</td><td>$3,000–$5,000 (fundraising offsets)</td><td>Purpose-driven, high camaraderie, variable fitness</td><td>Cause-driven climbers, community-minded</td></tr>
</tbody>
</table>

<h2>How Groups Form on the Mountain</h2>

<p>Regardless of group type, every Kilimanjaro group goes through a predictable social evolution over the course of the climb. Understanding this arc helps you navigate it.</p>

<h3>Day 1: Awkward Introductions</h3>

<p>The first day is always the most socially uncomfortable. If you are in an open departure, you are walking with people you met at the hotel briefing the previous evening — or even at the gate that morning. Conversations are surface-level: where are you from, why Kilimanjaro, have you done anything like this before. Walking pace is uncertain — everyone is trying to gauge their speed relative to the group. The trail from the gate to the first camp is typically 5–8 hours and relatively gentle, which gives plenty of time for conversation without breathlessness getting in the way.</p>

<h3>Day 2–3: Natural Pace Groups Emerge</h3>

<p>By the second day, the group has naturally separated into pace clusters. The fast walkers pull ahead. The steady walkers find their rhythm. The slower walkers settle at the back with an assistant guide. This is completely normal and good guides encourage it — forcing everyone to walk at the same pace frustrates the fast and pressures the slow. The social dynamic shifts too. You start walking consistently with the same 2–3 people, and those become your primary conversation partners. Inside jokes begin. Shared routines emerge — who brews tea first, who claims which corner of the dining tent, who snores.</p>

<h3>Day 4–5: Deep Bonds Through Shared Adversity</h3>

<p>Something changes around Day 4. The altitude is real. Sleep is poor. Appetite is off. Personal hygiene has deteriorated. Nobody looks or feels their best. And in this state of shared vulnerability, genuine bonds form. You have seen your climbing partners at their weakest — struggling with a headache at 4,200 metres, vomiting behind a rock, crying from exhaustion at the top of a steep section — and they have seen the same from you. This mutual vulnerability creates a depth of connection that months of normal social interaction cannot match. Many Kilimanjaro friendships are forged on these days.</p>

<h3>Summit Night: The Group Pulls Together or Fragments</h3>

<p><a href="/kilimanjaro-summit-night/">Summit night</a> is the ultimate test of group dynamics. You leave camp around midnight in the freezing dark, headlamp beams cutting through the blackness, and walk uphill for 6–8 hours into thinner and thinner air. Some people are strong. Some people are struggling. Some people will have to turn back. How the group handles this moment — supporting the struggling, celebrating the strong, accepting the decisions of those who turn around — defines the entire climb experience. The best groups encourage without pressuring. The worst groups create guilt and resentment.</p>

<h3>Descent: Post-Summit Euphoria</h3>

<p>The descent after a successful summit is pure joy. The exhaustion is real, the knees are protesting, but the shared accomplishment creates an euphoric bond. Groups that struggled with dynamics earlier in the climb often find that summit day resets everything. You climbed the highest mountain in Africa together. That shared achievement becomes the foundation of a lasting connection.</p>

<h2>Common Group Dynamics Challenges</h2>

<p>Every group encounters friction on a multi-day mountain expedition. Here are the most common challenges and how to handle them.</p>

<h3>Pace Differences</h3>

<p>This is the number one source of group tension on Kilimanjaro. The fastest walker gets frustrated waiting at rest stops. The slowest walker feels guilty for holding everyone up. In reality, walking pace on Kilimanjaro is primarily determined by how well your body handles altitude, not by fitness level — a marathon runner may struggle at 5,000 metres while a moderately fit walker breezes through. The solution is simple and every good operator uses it: <strong>split the group into pace subgroups</strong>, each with its own guide or assistant guide. The fast group leaves camp first or last (depending on the day), the slow group takes the other slot, and everyone arrives at the next camp at roughly similar times by different margins.</p>

<h3>Personality Clashes</h3>

<p>Confined spaces, altitude-induced irritability, sleep deprivation, and days without privacy amplify every personality friction. The loud extrovert who would be charming at a dinner party becomes exhausting after five days in a tent. The quiet introvert who seems standoffish is actually conserving energy. Altitude above 4,000 metres genuinely affects mood — increased irritability, reduced patience, and emotional volatility are real physiological effects of hypoxia, not personality flaws. The solution: <strong>recognise that altitude is making everyone harder to live with</strong>, give each other grace, use headphones when you need isolation, and remember that the tension is temporary.</p>

<h3>The "Hero" Who Pushes Too Hard</h3>

<p>Every group has one — the person who treats the climb as a race, walks too fast, does not drink enough water, skips meals to prove toughness, and ends up with severe altitude sickness on Day 4. The hero's downfall affects the entire group: if they cannot continue, the itinerary may be disrupted, guides are diverted to manage the evacuation, and morale drops. The solution is guide-driven: <strong>experienced guides enforce pace discipline from Day 1</strong>. The Swahili phrase <em>pole pole</em> (slowly, slowly) is not a suggestion — it is a clinical strategy for altitude acclimatisation. Good guides will physically slow down anyone walking too fast, regardless of how fit they claim to be.</p>

<h3>The Chronic Complainer</h3>

<p>Complaining is contagious. One person fixating on every discomfort — the cold, the food, the toilets, the early wake-ups — can drag an entire group's morale into the dirt. The solution requires a combination of <strong>humour, distraction, and honest conversation</strong>. Often, the complainer is not aware of the impact on others. A quiet, kind word — "I know it's tough, but when you keep saying how miserable it is, it makes it harder for the rest of us too" — usually works. If it does not, spatial distance is the next tool: walk in a different pace group, sit at the other end of the dining tent.</p>

<h3>Couples Who Isolate from the Group</h3>

<p><a href="/kilimanjaro-for-couples/">Couples on Kilimanjaro</a> sometimes retreat into their own bubble, eating together, walking together, and engaging with the group only when forced. This creates an unspoken division. The solution is <strong>inclusive activities and shared meals</strong> — guides who seat people differently at dinner each night, who pair different walking partners for specific sections, and who create group rituals that include everyone. Couples: remember that climbing Kilimanjaro as a pair is wonderful, but you will both get more from the experience if you engage with the wider group too.</p>

<h3>Common Issues and Solutions — Table</h3>

<table>
<thead>
<tr><th>Issue</th><th>How Common</th><th>Impact on Group</th><th>Solution</th></tr>
</thead>
<tbody>
<tr><td><strong>Pace differences</strong></td><td>Very common (nearly every group)</td><td>High — frustration, guilt, resentment</td><td>Split into pace subgroups with separate guides</td></tr>
<tr><td><strong>Personality clashes</strong></td><td>Common (especially groups 6+)</td><td>Medium — tension, awkward silences</td><td>Give space, use headphones, blame altitude</td></tr>
<tr><td><strong>The "hero"</strong></td><td>Occasional (1 in 3 groups)</td><td>High — potential evacuation, disrupted plans</td><td>Guide-enforced pace discipline from Day 1</td></tr>
<tr><td><strong>Chronic complainer</strong></td><td>Occasional (1 in 4 groups)</td><td>High — morale drain, contagious negativity</td><td>Humour, honest conversation, spatial distance</td></tr>
<tr><td><strong>Couple isolation</strong></td><td>Common (when couples present)</td><td>Low-medium — social division</td><td>Inclusive seating, varied walking partners</td></tr>
<tr><td><strong>Language barriers</strong></td><td>Common in international groups</td><td>Low — communication friction</td><td>Simple English, gestures, patience, translation apps</td></tr>
<tr><td><strong>Altitude-induced mood changes</strong></td><td>Very common above 4,000m</td><td>Medium — irritability, emotional outbursts</td><td>Recognise it is physiological, not personal</td></tr>
</tbody>
</table>

<h2>The Role of the Guide in Group Dynamics</h2>

<p>A great Kilimanjaro guide is not just a navigator and safety manager — they are a group dynamics expert. The best guides have led hundreds of groups and have seen every interpersonal scenario imaginable. Here is what great guides do.</p>

<h3>Setting Pace for the Group</h3>

<p>The lead guide sets the pace for the slowest sustainable walker, not the fastest. This is counter-intuitive for competitive personalities, but it is medically correct — slower acclimatisation pace means higher summit success rates. Guides who let the fast walkers dictate pace risk burning out the entire group.</p>

<h3>Managing Morale</h3>

<p>Singing, storytelling, encouragement, and humour are tools of the trade. The <em>Jambo</em> song at dinner, the stories of famous climbers who struggled on the same section, the constant reassurance of "you are doing great, you are strong" — these are not platitudes. They are deliberate morale management techniques refined over thousands of guided climbs. The guides who sing are the guides whose groups summit.</p>

<h3>Mediating Conflicts</h3>

<p>When tensions arise — and they will — experienced guides step in early and quietly. They might suggest a different tent arrangement, adjust walking pairs, or have a private word with the person causing friction. The best mediations happen before the conflict surfaces publicly.</p>

<h3>Making Tough Calls</h3>

<p>The hardest part of a guide's job is telling someone they cannot continue. On summit night, when a climber's oxygen saturation drops below safe levels or they show signs of severe altitude sickness, the guide must make the call to turn them back — regardless of how much money they spent, how far they have travelled, or how passionately they want to continue. How the guide communicates this decision — and how the group supports the affected member — is a defining moment. Good guides are firm, compassionate, and clear about why the decision is being made.</p>

<h3>Creating Traditions</h3>

<p>The best guides create group traditions that bond the team — a specific song at each camp, a group photo ritual at every summit sign, a round of hot chocolate after summit night. These traditions give the group a shared narrative and create moments of collective joy that counterbalance the suffering.</p>

<h2>Tips for Thriving in a Climbing Group</h2>

<p>Whether you are climbing with your best friends or a group of strangers, these principles will make the experience better for everyone — including you.</p>

<ol>
<li><strong>Introduce yourself early and learn names.</strong> On Day 1, go out of your way to learn every person's name and one thing about them. Use names consistently. People who feel known feel included.</li>
<li><strong>Share snacks.</strong> This is the fastest bonding mechanism on the mountain. Bring extra chocolate, dried fruit, or sweets and offer them to others at rest stops. Food sharing is a universal act of generosity that breaks social barriers instantly.</li>
<li><strong>Walk at your own pace, not someone else's.</strong> Do not speed up to impress the fast walker. Do not slow down out of guilt. Walk at the pace that is right for your body and your acclimatisation. Your summit depends on it.</li>
<li><strong>Be patient with slower members.</strong> You might be the strong walker on Day 3 and the slowest person in the group on summit night. Altitude does not discriminate. The patience you extend today may be the patience you need tomorrow.</li>
<li><strong>Keep complaints to a minimum.</strong> Everything is uncomfortable. Everyone knows. Voicing every discomfort does not fix it — it just makes the person next to you feel worse too. Complain to your journal. Complain to the mountain. But limit what you dump on your group.</li>
<li><strong>Celebrate small wins together.</strong> Reaching each camp is an achievement. A sunset from 4,000 metres is spectacular. A hot meal after a cold day is a gift. Verbalise these wins. "That sunset was incredible" is simple, but it shifts the group's focus from suffering to appreciation.</li>
<li><strong>Give people space when they need it.</strong> If someone puts in headphones, retreats to their tent early, or walks in silence, let them. Personal space on a group expedition is precious and necessary. Not every moment needs to be social.</li>
<li><strong>On summit night, encourage but do not pressure.</strong> If someone decides to turn back, respect their decision. Do not say "you can do it, just push harder" when they have told you they cannot. Support means accepting their choice, not overriding it.</li>
</ol>

<h2>Solo Climbers Joining Groups</h2>

<p><a href="/kilimanjaro-solo-climb/">Solo climbers</a> who join open departure groups face a unique social challenge: entering an established social environment as an outsider. But solo climbers also have significant advantages. You arrive without pre-existing dynamics — no legacy tensions, no expectations, no roles. You are free to be whoever you want to be on the mountain. Solo climbers often become the social glue of the group because they are actively reaching out to everyone rather than defaulting to existing friends.</p>

<p>Tips for solo climbers joining groups:</p>

<ul>
<li>Arrive at the pre-climb briefing early and introduce yourself to everyone</li>
<li>Ask questions — genuine curiosity about other people's motivations for climbing creates instant connection</li>
<li>Be open about being solo — it invites empathy and inclusion</li>
<li>Offer to share tent space, snacks, or gear — generosity signals trustworthiness</li>
<li>Walk with different people on different days — you will naturally find your people</li>
</ul>

<h2>Group Size Recommendations</h2>

<p>Group size affects everything — from logistics and cost to social dynamics and summit success. Here is what works and what does not.</p>

<h3>Optimal Group Sizes — Table</h3>

<table>
<thead>
<tr><th>Group Size</th><th>Pros</th><th>Cons</th><th>Guide-to-Client Ratio</th></tr>
</thead>
<tbody>
<tr><td><strong>2–4 climbers</strong></td><td>Intimate, flexible pace, easy communication, strong bonds</td><td>Less social variety, higher per-person cost, one difficult person has outsized impact</td><td>1 lead guide + 1 assistant</td></tr>
<tr><td><strong>5–8 climbers</strong></td><td>Ideal social variety, enough people for subgroups, manageable logistics, good energy</td><td>Pace differences start to matter, requires more guide coordination</td><td>1 lead guide + 2 assistants</td></tr>
<tr><td><strong>9–12 climbers</strong></td><td>Large enough for natural subgroups, lively camp atmosphere, economies of scale</td><td>Harder to keep cohesive, some members may feel anonymous, longer camp setups</td><td>1 lead guide + 3–4 assistants</td></tr>
<tr><td><strong>13+ climbers</strong></td><td>Lowest per-person cost, always someone to talk to</td><td>Challenging logistics, multiple guide teams needed, difficult to bond as one group, long bottlenecks on narrow sections</td><td>2+ lead guides + proportional assistants</td></tr>
</tbody>
</table>

<p>For <a href="/kilimanjaro-group-vs-private/">open departures</a>, the sweet spot is <strong>5–8 climbers</strong>. This size provides enough social variety to find compatible walking partners, allows natural pace subgroups to form, and is small enough that everyone knows everyone by Day 2. Larger groups work well for charity and corporate climbs where the pre-existing shared purpose compensates for the logistical complexity.</p>

<h2>The Summit Night Test</h2>

<p>Summit night is when every group dynamic is tested to its extreme. At midnight, the group leaves high camp in the freezing dark. Some members feel strong. Others are nauseous, headachy, and questioning every life decision that led them to this moment. Over the next 6–8 hours, the group stretches and compresses as individual speeds diverge in the thin air.</p>

<p>The defining moments of summit night group dynamics are:</p>

<ul>
<li><strong>When someone turns back:</strong> How does the group react? Disappointment is natural, but guilt-tripping or excessive pressure is harmful. The right response is a hug, a "well done for getting this far," and a promise to celebrate together back at camp.</li>
<li><strong>When the strongest helps the weakest:</strong> The climber who carries someone's daypack for the last hour, or who walks beside a struggling teammate singing songs to distract them — these are the moments that define the climb.</li>
<li><strong>When everyone reaches the summit:</strong> The eruption of emotion at Uhuru Peak — hugging, crying, laughing, photographing — is one of the most intense shared experiences humans can have. This moment bonds groups for life.</li>
<li><strong>The reunion at camp:</strong> When those who summited and those who turned back meet again at high camp, the way the group handles this reunion matters enormously. The summiteers should celebrate but also honour those who tried. Those who turned back should be proud of their attempt, not ashamed.</li>
</ul>

<h2>Post-Climb Friendships</h2>

<p>Kilimanjaro climbing groups have a remarkable track record of staying in touch long after the descent. WhatsApp groups created at the trailhead remain active for years. Annual reunions happen. People who met as strangers at the Machame Gate attend each other's weddings. The reason is simple: you shared something genuinely extraordinary. You saw each other at your worst and your best. You walked through the night together in the coldest hours of your life and stood on the roof of Africa as the sun rose. That shared experience creates a bond that resists the usual erosion of casual travel friendships.</p>

<p>The climbers who maintain these post-climb friendships tend to be the ones who invested in the group during the climb — who learned names, shared snacks, encouraged the struggling, and celebrated the wins. The lesson is obvious but worth stating: <strong>the more you give to the group, the more the group gives back to you — on the mountain and long after you leave it.</strong></p>
`;

/* ------------------------------------------------------------------ */
/*  Posts array                                                        */
/* ------------------------------------------------------------------ */
const posts = [
  {
    slug: "kilimanjaro-arusha-guide",
    title:
      "Arusha City Guide for Kilimanjaro Climbers: Where to Stay, Eat & Explore",
    metaTitle: "Arusha City Guide for Kilimanjaro Climbers 2026",
    metaDescription:
      "Everything Kilimanjaro climbers need to know about Arusha: best hotels near the mountain, restaurants, shopping for last-minute gear, things to do before and after your climb.",
    excerpt:
      "Arusha is the gateway city for Kilimanjaro — most climbers spend 1-2 nights here before and after their climb. This comprehensive guide covers the best hotels by budget, restaurants for pre-climb carb-loading and post-climb celebrations, last-minute gear shopping, and the best things to do before and after your mountain adventure.",
    content: post1Content,
    categorySlug: "kilimanjaro",
    categoryName: "Kilimanjaro",
    tags: [
      { name: "Arusha", slug: "arusha" },
      { name: "Travel Planning", slug: "travel-planning" },
      { name: "Hotels", slug: "hotels" },
    ],
  },
  {
    slug: "kilimanjaro-group-dynamics",
    title:
      "Group Dynamics on Kilimanjaro: How to Thrive in a Climbing Team",
    metaTitle: "Kilimanjaro Group Dynamics — Climbing as a Team",
    metaDescription:
      "How group dynamics work on Kilimanjaro: forming your team, pace differences, personality clashes, supporting struggling members, solo vs group, and tips for a harmonious climb.",
    excerpt:
      "Kilimanjaro is rarely a solo endeavour — whether you join an open departure or bring friends, the group dynamic can make or break your experience. This guide covers how groups form on the mountain, common challenges like pace differences and personality clashes, the role of the guide, and practical tips for thriving in any climbing team.",
    content: post2Content,
    categorySlug: "kilimanjaro",
    categoryName: "Kilimanjaro",
    tags: [
      { name: "Group Climbing", slug: "group-climbing" },
      { name: "Team Building", slug: "team-building" },
      { name: "Social", slug: "social" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Main seeder                                                        */
/* ------------------------------------------------------------------ */
async function main() {
  console.log("Seeding 2 Kilimanjaro blog posts (batch 24a)...\n");

  for (const post of posts) {
    // 1. Upsert category
    const category = await prisma.category.upsert({
      where: { slug: post.categorySlug },
      update: { name: post.categoryName },
      create: { slug: post.categorySlug, name: post.categoryName },
    });

    // 2. Upsert tags
    const tagRecords = [];
    for (const tag of post.tags) {
      const tagRecord = await prisma.tag.upsert({
        where: { slug: tag.slug },
        update: { name: tag.name },
        create: { slug: tag.slug, name: tag.name },
      });
      tagRecords.push(tagRecord);
    }

    // 3. Upsert blog post
    const result = await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {
        title: post.title,
        excerpt: post.excerpt,
        content: post.content.trim(),
        metaTitle: post.metaTitle,
        metaDescription: post.metaDescription,
        featuredImage: FEATURED_IMAGE,
        isPublished: true,
      },
      create: {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content.trim(),
        metaTitle: post.metaTitle,
        metaDescription: post.metaDescription,
        featuredImage: FEATURED_IMAGE,
        isPublished: true,
        author: "Emmanuel Moshi",
        publishedAt: new Date("2026-06-18"),
      },
    });

    // 4. Link category via join table (ignore if already linked)
    await prisma.postCategory
      .create({
        data: { postId: result.id, categoryId: category.id },
      })
      .catch(() => {}); // Ignore duplicate

    // 5. Link tags via join table (ignore if already linked)
    for (const tagRecord of tagRecords) {
      await prisma.postTag
        .create({
          data: { postId: result.id, tagId: tagRecord.id },
        })
        .catch(() => {}); // Ignore duplicate
    }

    console.log(`  Upserted: ${post.slug}`);
  }

  console.log(`\nDone — ${posts.length} blog posts upserted.`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
