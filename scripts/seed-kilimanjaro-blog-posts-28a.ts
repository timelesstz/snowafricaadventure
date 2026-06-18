/**
 * seed-kilimanjaro-blog-posts-28a.ts
 *
 * Upserts 2 Kilimanjaro blog posts (batch 28a):
 *  1. kilimanjaro-flat-land-training
 *  2. kilimanjaro-best-camps
 *
 * Run: npx tsx scripts/seed-kilimanjaro-blog-posts-28a.ts
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
/*  Post 1: kilimanjaro-flat-land-training                             */
/* ------------------------------------------------------------------ */
const post1Content = `
<p>You live in the Netherlands, where the highest point is a 322-metre hill most Dutch people have never visited. Or you are in Florida, where the tallest thing you can climb is a highway overpass. Or you are in the American Midwest, the English Fenlands, coastal Australia, or any of the dozens of flat regions where people dream of Kilimanjaro but cannot find a hill to train on. In our 800+ expeditions, we have guided climbers from all of these places to Uhuru Peak at 5,895 metres — and some of them arrived fitter and better prepared than climbers who live surrounded by mountains. The secret is not having mountains. The secret is knowing how to simulate mountains with what you have. This guide is the flat-land training programme we have refined over fifteen years of preparing sea-level climbers for the Roof of Africa.</p>

<h2>Why Flat-Land Climbers Can Absolutely Succeed</h2>

<p>Let us address the anxiety first: <strong>you do not need to train on mountains to climb a mountain.</strong> Kilimanjaro is not a technical climb. There are no ropes, no ice axes, no scrambling sections (apart from a short rock scramble at the Barranco Wall, which is more like climbing a steep staircase). It is a long, sustained walk at altitude. The physical demands are cardiovascular endurance, leg strength, and the ability to walk 5-8 hours per day for six to nine days while carrying a light day pack. All of these can be trained without a single metre of elevation gain.</p>

<p>In fact, flat-land training has one significant advantage: <strong>consistency.</strong> Climbers who live near mountains often rely on weekend hikes as their primary training. They get one big session per week and not much in between. Flat-land climbers, because they cannot rely on terrain, build structured programmes with four to five sessions per week using stairs, treadmills, and loaded walks. That consistency — training almost daily rather than once a week — produces better cardiovascular adaptation and more resilient legs. We see it in the data: our flat-land climbers who follow a structured programme have summit success rates within 2-3% of climbers who train on real mountains.</p>

<h2>The Five Pillars of Flat-Land Kilimanjaro Training</h2>

<p>Your training programme needs to address five specific physical demands. Miss any one of these and you will feel it on the mountain. Our <a href="/kilimanjaro-training-plan/">complete Kilimanjaro training plan</a> covers all five in detail, but here we adapt each one specifically for flat-land environments.</p>

<h3>1. Sustained Uphill Walking (Stair Training)</h3>

<p>This is the single most important exercise for Kilimanjaro preparation, and it is the one that flat-land climbers can replicate most effectively. Stair climbing mimics the continuous uphill effort of trekking days on the mountain — the relentless, moderate-intensity effort that lasts for hours. Here is where to find stairs when you have no hills:</p>

<ul>
<li><strong>Office buildings and apartment blocks:</strong> A 10-storey building gives you roughly 30 metres of vertical gain per ascent. Walk up, take the lift down, repeat. Ten repetitions gives you 300 metres — equivalent to a solid training hike. Many corporate buildings are open on weekends or have fire stairs accessible 24 hours.</li>
<li><strong>Stadium stairs:</strong> Football and athletics stadiums have long, steep stairways that are often open to the public outside of event days. Stadium stairs are wider and steeper than building stairs, which engages your glutes and hamstrings more aggressively — closer to actual mountain terrain.</li>
<li><strong>Parking garages:</strong> Multi-storey car parks are an underrated training venue. The ramps simulate a continuous uphill gradient (typically 8-12%), and you can walk up the ramps rather than the stairs for a more realistic hiking simulation. Early mornings on weekends, most parking garages are virtually empty.</li>
<li><strong>Pedestrian overpasses and bridges:</strong> In flat cities, infrastructure is your terrain. A pedestrian bridge over a highway or railway gives you 6-10 metres of climbing per crossing. Chain together five or six bridges on a walking route and you have a genuine training circuit.</li>
</ul>

<h3>2. Incline Treadmill Training</h3>

<p>If you have access to a gym, an incline treadmill is the single best piece of equipment for Kilimanjaro preparation. Modern treadmills reach 15% gradient — steeper than most of the Kilimanjaro trail. Here is how to use it effectively:</p>

<ul>
<li><strong>Start at 10% gradient, 4.5 km/h.</strong> This approximates a moderate Kilimanjaro trekking pace on an average uphill section. Walk for 30 minutes at this setting. If your heart rate stays below 70% of your maximum, the gradient is right. If it spikes above 80%, drop the gradient to 8% and build up.</li>
<li><strong>Progress to 12-15% gradient over weeks.</strong> By Week 8 of your training programme, you should be comfortable walking at 12-15% gradient for 60-90 minutes continuously. This is harder than most of the actual Kilimanjaro trail, which means the mountain will feel easier than your training.</li>
<li><strong>Simulate summit night:</strong> Once per week in your final month, do a treadmill session of 90-120 minutes at 12% gradient, 3.5-4 km/h. This slow, sustained effort at steep gradient simulates the long, grinding ascent from Barafu Camp to Stella Point on summit night.</li>
<li><strong>Do not hold the handrails.</strong> Holding the handrails reduces the workload by up to 30% and teaches your body to rely on arm support it will not have on the mountain. If you need the rails for balance, reduce the speed or gradient until you can walk unsupported.</li>
</ul>

<h3>3. Loaded Rucksack Walking on Flat Terrain</h3>

<p>On Kilimanjaro, you carry a day pack weighing 5-8 kg for 5-8 hours per day. Your body needs to be conditioned to this load. Even on completely flat terrain, walking with a weighted pack trains your core stability, hip flexors, shoulders, and lower back — all of which take significant strain on the mountain.</p>

<ul>
<li><strong>Start with 5 kg in Week 1-4.</strong> Use water bottles to add weight — they distribute evenly and you can adjust the load easily. Walk for 60-90 minutes on your weekend long walk.</li>
<li><strong>Progress to 8-10 kg in Week 5-8.</strong> Adding 2-3 kg above your actual mountain pack weight creates an overload effect — when you drop back to 6-7 kg on the mountain, it feels lighter.</li>
<li><strong>Walk on varied surfaces:</strong> Grass, gravel paths, sand, uneven pavement. Kilimanjaro terrain is rarely flat and smooth, so training exclusively on tarmac does not prepare your ankles and stabiliser muscles for rocky trails.</li>
<li><strong>Wear your actual trekking boots.</strong> This serves double duty — it breaks in your boots and conditions your feet to walking long distances in mountaineering footwear. Refer to our <a href="/kilimanjaro-climbing-gear/">Kilimanjaro gear guide</a> for boot recommendations.</li>
</ul>

<h3>4. Sand Dune Training</h3>

<p>If you live anywhere near a coast, sand dunes are an exceptional Kilimanjaro training resource. Walking uphill in soft sand demands 1.5-2 times the energy of walking on firm ground at the same gradient. A 20-metre sand dune climbed twenty times gives you 400 metres of vertical gain — and the soft, unstable surface closely mimics the volcanic scree you will encounter above 4,500 metres on Kilimanjaro, particularly on the summit night ascent to Stella Point where each step forward can slide half a step back.</p>

<p>If you live in the Netherlands, the dunes at Scheveningen, Bloemendaal, or Texel are perfect. In the UK, the Formby dunes, Camber Sands, or the Norfolk coast. In Florida, any Gulf Coast beach with dune systems. In Australia, the Stockton Sand Dunes near Newcastle are among the largest in the Southern Hemisphere. Walk up the steepest face, walk down the gentle slope. Repeat until your legs burn. That burn is exactly what summit night feels like.</p>

<h3>5. Step Machine and Cycling Cross-Training</h3>

<p>Two gym machines deserve special mention for flat-land Kilimanjaro training:</p>

<ul>
<li><strong>Step machine (StairMaster):</strong> A 30-45 minute session at moderate resistance mimics continuous uphill walking without the impact of real stairs. Set the speed so you can maintain a conversation — the same effort level you should maintain on the mountain. The step machine also builds the specific quad and glute endurance that summit night demands.</li>
<li><strong>Indoor cycling with resistance:</strong> If you have an indoor trainer or spin bike, cycling at high resistance and low cadence (50-60 rpm) trains the same slow-twitch muscle fibres used in sustained uphill walking. A 60-minute session twice per week is excellent cross-training that gives your joints a break from the impact of walking while maintaining cardiovascular load.</li>
</ul>

<h2>The 12-Week Flat-Land Training Schedule</h2>

<p>This programme is specifically designed for climbers with no access to hills or mountains. Every session uses flat terrain, stairs, treadmills, or gym equipment. Follow it consistently and you will arrive at the Kilimanjaro trailhead stronger than most climbers who trained on hills once a week.</p>

<table style="width:100%; border-collapse:collapse; margin:1.5em 0;">
<thead>
<tr style="background:#f8f5f0; border-bottom:2px solid #c9a96e;">
<th style="padding:12px; text-align:left; font-weight:700;">Week</th>
<th style="padding:12px; text-align:left; font-weight:700;">Mon</th>
<th style="padding:12px; text-align:left; font-weight:700;">Tue</th>
<th style="padding:12px; text-align:left; font-weight:700;">Wed</th>
<th style="padding:12px; text-align:left; font-weight:700;">Thu</th>
<th style="padding:12px; text-align:left; font-weight:700;">Fri</th>
<th style="padding:12px; text-align:left; font-weight:700;">Sat</th>
<th style="padding:12px; text-align:left; font-weight:700;">Sun</th>
</tr>
</thead>
<tbody>
<tr style="border-bottom:1px solid #e5e5e5;">
<td style="padding:10px;"><strong>1-2</strong></td>
<td style="padding:10px;">30 min flat walk</td>
<td style="padding:10px;">Rest</td>
<td style="padding:10px;">20 min stair climb</td>
<td style="padding:10px;">30 min flat walk</td>
<td style="padding:10px;">Rest</td>
<td style="padding:10px;">60 min walk (5 kg pack)</td>
<td style="padding:10px;">Rest or light yoga</td>
</tr>
<tr style="border-bottom:1px solid #e5e5e5;">
<td style="padding:10px;"><strong>3-4</strong></td>
<td style="padding:10px;">40 min flat walk</td>
<td style="padding:10px;">30 min treadmill 10%</td>
<td style="padding:10px;">30 min stair climb</td>
<td style="padding:10px;">40 min flat walk</td>
<td style="padding:10px;">Rest</td>
<td style="padding:10px;">90 min walk (5 kg pack)</td>
<td style="padding:10px;">30 min cycling or step machine</td>
</tr>
<tr style="border-bottom:1px solid #e5e5e5;">
<td style="padding:10px;"><strong>5-6</strong></td>
<td style="padding:10px;">45 min walk + stairs</td>
<td style="padding:10px;">45 min treadmill 12%</td>
<td style="padding:10px;">40 min stair climb</td>
<td style="padding:10px;">45 min flat walk</td>
<td style="padding:10px;">Rest</td>
<td style="padding:10px;">2 hr walk (8 kg pack)</td>
<td style="padding:10px;">40 min cycling or step machine</td>
</tr>
<tr style="border-bottom:1px solid #e5e5e5;">
<td style="padding:10px;"><strong>7-8</strong></td>
<td style="padding:10px;">50 min walk + stairs</td>
<td style="padding:10px;">60 min treadmill 12-15%</td>
<td style="padding:10px;">45 min stair climb</td>
<td style="padding:10px;">50 min walk + sand dunes</td>
<td style="padding:10px;">Rest</td>
<td style="padding:10px;">3 hr walk (10 kg pack)</td>
<td style="padding:10px;">45 min cycling or step machine</td>
</tr>
<tr style="border-bottom:1px solid #e5e5e5;">
<td style="padding:10px;"><strong>9-10</strong></td>
<td style="padding:10px;">50 min walk + stairs</td>
<td style="padding:10px;">75 min treadmill 12-15%</td>
<td style="padding:10px;">45 min stair climb</td>
<td style="padding:10px;">50 min walk + sand dunes</td>
<td style="padding:10px;">Rest</td>
<td style="padding:10px;">4 hr walk (10 kg pack)</td>
<td style="padding:10px;">45 min cross-training</td>
</tr>
<tr style="border-bottom:1px solid #e5e5e5;">
<td style="padding:10px;"><strong>11</strong></td>
<td style="padding:10px;">50 min walk + stairs</td>
<td style="padding:10px;">90 min treadmill 12-15%</td>
<td style="padding:10px;">45 min stair climb</td>
<td style="padding:10px;">50 min walk</td>
<td style="padding:10px;">Rest</td>
<td style="padding:10px;">5 hr walk (10 kg pack)</td>
<td style="padding:10px;">Rest</td>
</tr>
<tr style="border-bottom:1px solid #e5e5e5;">
<td style="padding:10px;"><strong>12</strong></td>
<td style="padding:10px;">30 min easy walk</td>
<td style="padding:10px;">30 min treadmill 10%</td>
<td style="padding:10px;">Rest</td>
<td style="padding:10px;">30 min easy walk</td>
<td style="padding:10px;">Rest</td>
<td style="padding:10px;">60 min easy walk</td>
<td style="padding:10px;">Rest — travel prep</td>
</tr>
</tbody>
</table>

<h2>Altitude Simulation: What Works and What Does Not</h2>

<h3>Altitude Training Masks</h3>

<p>Altitude training masks — the neoprene masks with adjustable valves that restrict airflow — are heavily marketed to Kilimanjaro climbers. The honest assessment: <strong>they do not simulate altitude.</strong> Real altitude reduces the partial pressure of oxygen in the air you breathe. Training masks simply make it harder to inhale the same air — they train your respiratory muscles, not your body's altitude adaptation. That said, stronger respiratory muscles are not useless. Several of our flat-land climbers have reported that mask training helped them feel less breathless during sustained uphill effort. If you use one, treat it as a respiratory muscle trainer, not an altitude simulator. Wear it during treadmill sessions for 20-30 minutes, not during your entire workout.</p>

<h3>Hypoxic Tents and Altitude Rooms</h3>

<p>These actually work. Hypoxic tents reduce the oxygen concentration in the air you sleep in, triggering the same physiological response as sleeping at altitude — increased red blood cell production and improved oxygen transport. The problem is cost: a hypoxic tent system costs $3,000-$6,000 to purchase or $200-$400 per month to rent. For most climbers, the money is better spent on a longer route (which achieves the same acclimatisation benefit naturally on the mountain) or a higher-quality <a href="/kilimanjaro-climbing-gear/">gear setup</a>. If you have the budget and the commitment, sleeping in a hypoxic tent for four to six weeks before your climb does provide a measurable advantage — but it is not necessary for success.</p>

<h3>Pre-Acclimatisation Travel</h3>

<p>The most effective altitude preparation for flat-land climbers is spending two to three days at moderate altitude (2,000-3,000 metres) before the climb begins. If your schedule allows, fly into Kilimanjaro a few days early and book a day trip to Ngorongoro Crater (2,286 metres at the rim) or spend a night at a lodge on the crater rim. This gentle altitude exposure kickstarts your acclimatisation before you even step on the mountain. We can arrange this as part of a pre-climb <a href="/safaris/">safari package</a>.</p>

<h2>Weekend Training Hikes Without Mountains</h2>

<p>Your Saturday long walk is the backbone of your training programme. Here is how to make a flat-terrain long walk as effective as a mountain hike:</p>

<ul>
<li><strong>Walk for time, not distance.</strong> On Kilimanjaro, you walk for 5-8 hours per day. Your training walks should build to 4-5 hours by Week 10. The pace does not matter — what matters is time on your feet.</li>
<li><strong>Include stairs in the route.</strong> Plan your long walk to include a building, bridge, or overpass where you can add 15-20 minutes of stair climbing mid-walk. This simulates the undulating terrain of the mountain.</li>
<li><strong>Walk in your boots and full day pack.</strong> Every long walk should be in the exact boots, socks, and pack you will carry on Kilimanjaro. By Week 10, your boots should be fully broken in, your pack should feel like a natural extension of your body, and you should have no hotspots or rubbing anywhere.</li>
<li><strong>Practise eating and drinking on the move.</strong> On Kilimanjaro, you need to consume 3-4 litres of water and 3,000-4,000 calories per day. Practise eating snacks and drinking water at regular intervals during your long walks. Your stomach needs to be trained for this just as much as your legs.</li>
</ul>

<h2>Mental Preparation Without Altitude Experience</h2>

<p>The biggest mental challenge for flat-land climbers is the unknown. You have never experienced altitude. You do not know how your body will respond to thin air. You do not know what 5,000 metres feels like. This uncertainty breeds anxiety, and anxiety is the enemy of summit night performance.</p>

<p>Here is how to prepare mentally without altitude experience:</p>

<ul>
<li><strong>Train in discomfort deliberately.</strong> Walk in rain, cold, wind, and darkness. Summit night starts at midnight in sub-zero temperatures. If your training has only ever been in comfortable conditions, the shock of summit night will compound the altitude challenge. Walk at 5 AM in January. Walk in the rain without stopping. Walk when you do not feel like walking. This builds mental resilience that transfers directly to the mountain.</li>
<li><strong>Practise the "next step" mentality.</strong> On summit night, the summit feels impossibly far. Our guides teach climbers to focus on the next step — literally, the next footfall. Not the summit. Not the next rest stop. Just the next step. Practise this during your hardest training sessions: when you are forty minutes into a stair climb and your legs are burning, do not think about the remaining twenty minutes. Think about the next step.</li>
<li><strong>Read and watch summit accounts.</strong> Watching summit night videos and reading first-person accounts from climbers who have been there gives you a mental model of what to expect. The more detailed your mental model, the less the unknown can unsettle you. You will know that the scree section below Stella Point feels like walking in thick sand. You will know that the cold eases after sunrise. You will know that the final ridge walk from Stella Point to <strong>Uhuru Peak at 5,895 metres</strong> is the most beautiful hour of the entire climb.</li>
<li><strong>Accept that you cannot fully prepare for altitude.</strong> This is important. No amount of flat-land training can tell you how your body will respond to 50% oxygen at 5,000 metres. Some incredibly fit athletes get debilitating headaches at 3,500 metres. Some completely average people feel fine at 5,500 metres. Your response to altitude is largely genetic and unpredictable. Train your body and your mind, choose a route with excellent acclimatisation (we recommend at least seven days — check our <a href="/trekking/">route options</a>), and trust your guide to manage the altitude variables on the mountain.</li>
</ul>

<h2>Flat-Land Success Stories From Our Expeditions</h2>

<p>These are real climbers from flat regions who summited with us after training without mountains:</p>

<ul>
<li><strong>Pieter and Anneke from Rotterdam, Netherlands:</strong> Trained for sixteen weeks using parking garage ramps, cycling dikes in headwinds, and weekend walks along the North Sea dunes near Hoek van Holland. Both summited via Lemosho 8-day in January 2025. Pieter told us his parking garage sessions were harder than any single day on the mountain.</li>
<li><strong>Sarah from Norfolk, UK:</strong> The flattest county in England. She trained using the stairwell of her 8-storey office building during lunch breaks and beach walks along the North Norfolk coast with a loaded rucksack. Summited via Machame 7-day in August 2024 and described summit night as "exactly as hard as I expected because I had trained for it."</li>
<li><strong>David from Tampa, Florida:</strong> His highest local point is a highway overpass. He trained using a gym treadmill at 15% gradient and the concrete steps of the local football stadium. Summited via the Northern Circuit 9-day route in October 2024. He later wrote to us: "I was fitter than people in my group who had trained on mountains in Colorado."</li>
</ul>

<p>The message from every flat-land climber who has summited with us is the same: <strong>consistency beats terrain.</strong> Train four to five days per week, progressively increase duration and load, simulate the uphill effort with stairs and treadmills, and arrive on the mountain with legs and lungs that are ready for the work.</p>

<h2>What to Do When You Arrive at the Mountain</h2>

<p>All your flat-land training has built the engine. Now the mountain provides the terrain and the altitude. Two things matter in your first two days on the trail:</p>

<ul>
<li><strong>Walk slower than you think you need to.</strong> Flat-land climbers often walk too fast on Day 1 because the trail feels easy compared to their treadmill sessions. Remember: the treadmill did not have 25% less oxygen. Slow down. Match your guide's pace exactly. You will feel like you are walking unreasonably slowly. You are not.</li>
<li><strong>Drink more water than feels natural.</strong> You are accustomed to drinking a certain amount during training at sea level. At altitude, you need 50% more. Three to four litres per day minimum. Your guide will remind you, but you need to make it a conscious habit from the first hour on the trail.</li>
</ul>

<p>For complete route information, <a href="/kilimanjaro-prices/">pricing details</a>, and to book your climb with a team that has successfully guided hundreds of flat-land climbers to the summit, visit our <a href="/climbing-kilimanjaro/">Kilimanjaro climbing page</a>. You do not need mountains to train for this mountain. You need commitment, structure, and twelve weeks of consistent effort. The summit is earned in parking garages and on treadmills long before you ever see the glaciers of Kibo.</p>
`;

/* ------------------------------------------------------------------ */
/*  Post 2: kilimanjaro-best-camps                                     */
/* ------------------------------------------------------------------ */
const post2Content = `
<p>On Kilimanjaro, the camps are not just places to sleep — they are the rhythm of the climb. Each camp marks a transition in altitude, terrain, climate, and mood. In our 800+ expeditions, we have slept at every camp on every route, in every season, and in every kind of weather the mountain can produce. This guide walks you through every major camp on Kilimanjaro — where it sits, what facilities exist, what the weather does at that elevation, which routes pass through it, and what makes each camp memorable. Whether you are choosing a <a href="/trekking/">trekking route</a> or simply want to know what to expect each night of your climb, this is the most detailed camp guide you will find anywhere.</p>

<h2>All Major Kilimanjaro Camps at a Glance</h2>

<table style="width:100%; border-collapse:collapse; margin:1.5em 0;">
<thead>
<tr style="background:#f8f5f0; border-bottom:2px solid #c9a96e;">
<th style="padding:12px; text-align:left; font-weight:700;">Camp</th>
<th style="padding:12px; text-align:left; font-weight:700;">Elevation</th>
<th style="padding:12px; text-align:left; font-weight:700;">Route(s)</th>
<th style="padding:12px; text-align:left; font-weight:700;">Key Feature</th>
</tr>
</thead>
<tbody>
<tr style="border-bottom:1px solid #e5e5e5;">
<td style="padding:10px;">Mandara Hut</td>
<td style="padding:10px;">2,720 m</td>
<td style="padding:10px;">Marangu</td>
<td style="padding:10px;">A-frame huts, rainforest setting</td>
</tr>
<tr style="border-bottom:1px solid #e5e5e5;">
<td style="padding:10px;">Mti Mkubwa Camp</td>
<td style="padding:10px;">2,750 m</td>
<td style="padding:10px;">Lemosho</td>
<td style="padding:10px;">Dense rainforest, colobus monkeys</td>
</tr>
<tr style="border-bottom:1px solid #e5e5e5;">
<td style="padding:10px;">Machame Camp</td>
<td style="padding:10px;">3,020 m</td>
<td style="padding:10px;">Machame</td>
<td style="padding:10px;">Rainforest-to-heath transition</td>
</tr>
<tr style="border-bottom:1px solid #e5e5e5;">
<td style="padding:10px;">Mweka Camp</td>
<td style="padding:10px;">3,100 m</td>
<td style="padding:10px;">Machame, Lemosho, Umbwe (descent)</td>
<td style="padding:10px;">Descent-only camp, celebration point</td>
</tr>
<tr style="border-bottom:1px solid #e5e5e5;">
<td style="padding:10px;">Simba Camp</td>
<td style="padding:10px;">3,620 m</td>
<td style="padding:10px;">Rongai</td>
<td style="padding:10px;">Kenya-side views, quietest camp</td>
</tr>
<tr style="border-bottom:1px solid #e5e5e5;">
<td style="padding:10px;">Horombo Hut</td>
<td style="padding:10px;">3,720 m</td>
<td style="padding:10px;">Marangu</td>
<td style="padding:10px;">Largest hut camp, acclimatisation day</td>
</tr>
<tr style="border-bottom:1px solid #e5e5e5;">
<td style="padding:10px;">Millennium Camp</td>
<td style="padding:10px;">3,820 m</td>
<td style="padding:10px;">Lemosho (alternate)</td>
<td style="padding:10px;">Newer camp, panoramic Shira views</td>
</tr>
<tr style="border-bottom:1px solid #e5e5e5;">
<td style="padding:10px;">Shira Camp</td>
<td style="padding:10px;">3,840 m</td>
<td style="padding:10px;">Lemosho, Shira</td>
<td style="padding:10px;">Shira Plateau, vast open moorland</td>
</tr>
<tr style="border-bottom:1px solid #e5e5e5;">
<td style="padding:10px;">Barranco Camp</td>
<td style="padding:10px;">3,960 m</td>
<td style="padding:10px;">Machame, Lemosho, Umbwe</td>
<td style="padding:10px;">Most scenic camp, Barranco Wall</td>
</tr>
<tr style="border-bottom:1px solid #e5e5e5;">
<td style="padding:10px;">Karanga Camp</td>
<td style="padding:10px;">3,995 m</td>
<td style="padding:10px;">Machame, Lemosho, Umbwe</td>
<td style="padding:10px;">Last water point before summit</td>
</tr>
<tr style="border-bottom:1px solid #e5e5e5;">
<td style="padding:10px;">Lava Tower</td>
<td style="padding:10px;">4,630 m</td>
<td style="padding:10px;">Machame, Lemosho (day stop)</td>
<td style="padding:10px;">Acclimatisation high point, volcanic tower</td>
</tr>
<tr style="border-bottom:1px solid #e5e5e5;">
<td style="padding:10px;">Barafu Camp</td>
<td style="padding:10px;">4,673 m</td>
<td style="padding:10px;">Machame, Lemosho, Umbwe</td>
<td style="padding:10px;">Summit base camp, midnight departure</td>
</tr>
<tr style="border-bottom:1px solid #e5e5e5;">
<td style="padding:10px;">Kibo Hut</td>
<td style="padding:10px;">4,703 m</td>
<td style="padding:10px;">Marangu</td>
<td style="padding:10px;">Stone hut, Marangu summit base</td>
</tr>
<tr style="border-bottom:1px solid #e5e5e5;">
<td style="padding:10px;">School Hut</td>
<td style="padding:10px;">4,750 m</td>
<td style="padding:10px;">Rongai</td>
<td style="padding:10px;">Highest hut, close to summit</td>
</tr>
<tr style="border-bottom:1px solid #e5e5e5;">
<td style="padding:10px;">Crater Camp</td>
<td style="padding:10px;">5,729 m</td>
<td style="padding:10px;">Special permit required</td>
<td style="padding:10px;">Highest camp in Africa, inside the crater</td>
</tr>
</tbody>
</table>

<h2>Rainforest Zone Camps (2,700 - 3,100 m)</h2>

<h3>Mandara Hut — 2,720 m (Marangu Route)</h3>

<p>Mandara Hut is the first overnight stop on the Marangu route and the only camp on Kilimanjaro where you sleep in wooden A-frame huts rather than tents. Each hut sleeps six to eight people in bunk beds with thin mattresses. The camp sits in dense montane rainforest at 2,720 metres and feels more like a mountain lodge than a wilderness camp. Facilities include flush toilets (a luxury you will not see again until you descend), a communal dining hut with tables and benches, and a reliable water supply piped from a nearby stream.</p>

<p>The forest around Mandara is alive with blue monkeys, colobus monkeys, and an extraordinary diversity of birdlife. If you arrive early enough, a 20-minute side trip to Maundi Crater offers your first panoramic view of the plains below and — on clear days — a distant glimpse of Kibo peak above the treeline. Cell signal from Tanzanian networks (Vodacom, Airtel) is usually available at Mandara, though weak. Night temperatures drop to 5-10°C — cool, but comfortable in a sleeping bag.</p>

<h3>Mti Mkubwa Camp — 2,750 m (Lemosho Route)</h3>

<p>Mti Mkubwa ("Big Tree" in Swahili) is the first camp on the Lemosho route, sitting at 2,750 metres in pristine montane rainforest on the western slope of Kilimanjaro. This is one of the quietest and most atmospheric first-night camps on the mountain. The Lemosho route sees far fewer climbers than Machame or Marangu, and at Mti Mkubwa you often have the feeling of being the only group in the forest.</p>

<p>The camp is a basic tent site with pit latrines and water collected from a nearby stream (boiled and purified by your cook crew). The forest canopy is dense — you may not see the sky until you leave camp in the morning. Black-and-white colobus monkeys are regularly spotted in the trees above the campsite, and at night the forest comes alive with sounds: tree hyrax screams (a disturbing sound for first-time visitors — it sounds like a child screaming), bushbuck calls, and owl hoots. Cell signal is sporadic to nonexistent. Night temperatures are similar to Mandara: 5-10°C.</p>

<h3>Machame Camp — 3,020 m (Machame Route)</h3>

<p>Machame Camp sits at the transition between rainforest and heath zone at 3,020 metres. It is the first night's stop on the Machame route — the most popular route on Kilimanjaro — and can feel crowded during peak season (January-March and June-October). The campsite is a series of cleared terraces on a hillside, and during busy periods every terrace is packed with tents from different groups.</p>

<p>Facilities include pit latrines and water collected from a stream below camp. The vegetation is transitional: tree heathers and giant groundsels begin to appear among the thinning forest canopy. On clear evenings, the view west over the forest to the plains is spectacular at sunset. Cell signal is usually available (this is the last camp with reliable signal on the Machame route). Night temperatures drop to 2-8°C, and mist and rain are common — Machame Camp sits in the cloud belt and evening drizzle is more the rule than the exception.</p>

<h3>Mweka Camp — 3,100 m (Descent Only)</h3>

<p>Mweka Camp is used exclusively for descent on the Machame, Lemosho, and Umbwe routes. You will never camp here on the way up — only on the way down after summiting. The camp sits at 3,100 metres in the upper rainforest zone, and arriving here after the long descent from the summit feels like arriving in paradise. The air is thick with oxygen (relatively speaking), the temperature is warm, and the forest canopy provides shade from the afternoon sun.</p>

<p>This is the celebration camp. Groups that have summited share stories, tips are distributed to the porter and guide crew, and the cook teams often prepare a special meal. Facilities are basic — pit latrines and stream water — but after two nights at 4,600+ metres, nobody cares. Cell signal returns here, and the first thing most climbers do is phone home to share the news. Night temperature is a comfortable 8-12°C.</p>

<h2>Heath and Moorland Zone Camps (3,600 - 3,900 m)</h2>

<h3>Simba Camp — 3,620 m (Rongai Route)</h3>

<p>Simba Camp ("Lion Camp" in Swahili) is the first overnight stop on the Rongai route, which approaches Kilimanjaro from the north — the Kenya side. At 3,620 metres, it sits in open heath and moorland with sweeping views toward the Kenyan border. This is one of the quietest camps on Kilimanjaro. The Rongai route accounts for roughly 10% of all Kilimanjaro climbers, so Simba Camp often has just two or three groups.</p>

<p>The camp is a clearing with pit latrines and water carried in by porters from a source lower on the route. The terrain is dry, scrubby heathland — a stark contrast to the lush rainforest camps on the southern routes. On clear nights, the lack of light pollution makes Simba Camp one of the best stargazing locations on the mountain. Cell signal is generally unavailable — you are on the remote north face, far from any town. Night temperatures drop to 0-5°C, and frost on the tent is common by morning.</p>

<h3>Horombo Hut — 3,720 m (Marangu Route)</h3>

<p>Horombo Hut is the largest and busiest camp on Kilimanjaro. It serves as both the second night on the ascent and the descent camp on the Marangu route, which means it sees double traffic on any given night. The camp sprawls across a hillside at 3,720 metres with dozens of A-frame huts, a large dining hall, solar-powered lighting, and the best toilet facilities on the mountain (flush toilets with running water).</p>

<p>On the standard 5-day Marangu itinerary, climbers spend an acclimatisation day at Horombo — walking up toward Mawenzi Hut at 4,600 metres and returning to sleep at 3,720 metres. This "climb high, sleep low" day is critical for altitude adjustment. The views from Horombo are superb: Mawenzi peak (5,149 m) dominates the eastern skyline, and on clear mornings the summit cone of Kibo appears above the moorland. Giant groundsels and lobelias — the iconic Kilimanjaro alpine plants — are abundant around camp. Cell signal is available but weak. Night temperatures: -2°C to 4°C.</p>

<h3>Millennium Camp — 3,820 m (Lemosho Alternate)</h3>

<p>Millennium Camp is a newer campsite on the Lemosho route, used by some operators as an alternative to Shira Camp. It sits at 3,820 metres on the edge of the Shira Plateau with panoramic views across the plateau to the western breach of Kibo. The camp was established to reduce crowding at Shira Camp and offers a slightly lower sleeping altitude — a minor acclimatisation advantage.</p>

<p>Facilities are basic: pit latrines and porter-carried water. The setting is open moorland with low scrub and scattered rocks. Wind exposure is significant — the Shira Plateau funnels wind from the west, and Millennium Camp catches the full force of it. Bring a windproof layer for evenings at camp. Night temperatures: -3°C to 3°C. Cell signal is unavailable.</p>

<h3>Shira Camp — 3,840 m (Lemosho and Shira Routes)</h3>

<p>Shira Camp sits on the vast Shira Plateau at 3,840 metres, one of three volcanic cones that form the Kilimanjaro massif. The plateau is a surreal landscape — flat, treeless, covered in tussock grass and giant groundsels, with the summit cone of Kibo rising dramatically to the east. At sunset, the plateau glows gold and the shadow of Kibo stretches westward for kilometres. It is one of the most photogenic locations on the mountain.</p>

<p>The camp is well-established with pit latrines and water available from a stream that runs across the plateau (seasonal — dry in August-October). The altitude here is the first serious test: at 3,840 metres, some climbers begin to feel mild altitude symptoms — headache, slight nausea, disrupted sleep. This is normal and usually resolves overnight. Our guides conduct oxygen saturation checks at Shira Camp and will adjust the next day's pace based on each climber's readings. Wind exposure is high on the open plateau. Night temperatures: -5°C to 2°C. Cell signal is unavailable.</p>

<h2>Alpine Desert Zone Camps (3,950 - 4,700 m)</h2>

<h3>Barranco Camp — 3,960 m (Machame, Lemosho, Umbwe)</h3>

<p><strong>Barranco Camp is the most scenic camp on Kilimanjaro.</strong> We say this with no hesitation after sleeping there hundreds of times. The camp sits in a valley at 3,960 metres directly below the Barranco Wall — a 257-metre rock face that you will climb the following morning. Behind the wall, the summit glaciers of Kibo gleam in the evening light. In front of the camp, the valley drops away toward the southern plains. At sunrise, the Barranco Wall turns orange-gold and the glaciers catch the first light of day. Every climber who has camped here remembers the view.</p>

<p>What makes Barranco special beyond the scenery is the "climb high, sleep low" acclimatisation that precedes it. On the Machame and Lemosho routes, you hike up to Lava Tower at 4,630 metres during the day, then descend 670 metres to Barranco Camp to sleep. This altitude exposure followed by descent is the most effective acclimatisation strategy, and it is why the Machame and Lemosho routes have higher summit success rates than routes that ascend continuously.</p>

<p>Facilities: pit latrines, stream water. Cell signal: none. The camp can be crowded in peak season, with dozens of groups camped on the terraces. Night temperatures: -5°C to 2°C, with frequent cloud cover that rolls up the valley in the evening. Tip from our guides: pitch your tent facing east for the sunrise view. It is worth the cold of unzipping your tent at 6:15 AM.</p>

<h3>Karanga Camp — 3,995 m (Machame, Lemosho, Umbwe)</h3>

<p>Karanga Camp sits in a small valley at 3,995 metres, wedged between ridges on the southern face of Kibo. Its most important distinction is practical: <strong>Karanga is the last water point before the summit.</strong> All water carried to Barafu Camp (and beyond to the summit) must be collected at Karanga. Your cook crew will fill every available container here, and you should ensure your personal water bottles and hydration bladder are full before leaving camp.</p>

<p>On the 7-day Machame and 8-day Lemosho routes, you camp overnight at Karanga, which adds a valuable acclimatisation night at just under 4,000 metres. On 6-day itineraries, Karanga is a lunch stop only — you pass through and continue to Barafu, which means less acclimatisation time. This is one of the key reasons we recommend 7-day minimum itineraries for all routes. Check our <a href="/kilimanjaro-prices/">pricing page</a> for the cost difference between 6 and 7-day options.</p>

<p>The valley setting provides some wind shelter, and the views up toward the summit cone are dramatic — you can see the route you will climb on summit night zigzagging up the scree slopes. Facilities: pit latrines, stream water (last reliable source). Night temperatures: -5°C to 0°C. Cell signal: none.</p>

<h3>Lava Tower — 4,630 m (Day Stop, Rarely Overnight)</h3>

<p>Lava Tower is not a camp in the traditional sense — it is a lunch stop and acclimatisation high point at 4,630 metres. The "tower" is a 100-metre volcanic rock formation that rises from the alpine desert like a ruined castle. It is the highest point you reach before summit day on the Machame and Lemosho routes, and it serves a crucial acclimatisation purpose: you hike up to Lava Tower over 3-4 hours, eat lunch, and then descend 670 metres to Barranco Camp to sleep.</p>

<p>Some operators offer an overnight camp at Lava Tower for extended acclimatisation itineraries, but this is uncommon. The altitude is significant — 4,630 metres is higher than Mont Blanc — and many climbers feel their first serious altitude symptoms here: headache, breathlessness, loss of appetite. This is by design. The brief exposure triggers your body's acclimatisation response, and the descent to Barranco resolves the symptoms. If you feel rough at Lava Tower, that is actually a good sign — it means your body is registering the altitude and will adapt overnight at the lower camp.</p>

<p>Weather at Lava Tower is harsh: exposed, windy, and often cold even at midday. Cloud cover is common, and snow flurries are possible in any month. Temperatures: -5°C to 5°C. No facilities — your crew sets up a temporary lunch tent and breaks it down after the meal.</p>

<h3>Barafu Camp — 4,673 m (Machame, Lemosho, Umbwe)</h3>

<p>Barafu Camp is <strong>summit base camp</strong> for the Machame, Lemosho, and Umbwe routes. You arrive in the early afternoon, eat an early dinner, and attempt to sleep for four to five hours before your midnight summit departure. "Barafu" means "ice" in Swahili, and the camp earns its name — it sits on an exposed rocky ridge at 4,673 metres, blasted by wind from all directions, with temperatures that drop to -10°C to -15°C overnight.</p>

<p>This is the most uncomfortable camp on the mountain, and that is by design — you are not meant to enjoy it. You are meant to eat, hydrate, rest, and then climb. The camp is a collection of tent sites on rocky ground (bring a good sleeping pad — the rocks are merciless). Pit latrines are basic and the wind makes everything harder. Water is carried up from Karanga. Cell signal: none.</p>

<p>Our guides conduct a pre-summit briefing at Barafu: layering strategy, pacing plan, turn-around protocols, and what to expect at each stage of the 6-8 hour ascent. The summit attempt starts between 11:30 PM and midnight. You will walk in darkness, in the cold, up an endless scree slope, using your headlamp and the stars for navigation. Barafu Camp is where the climb transforms from a trek into a test of will.</p>

<h3>Kibo Hut — 4,703 m (Marangu Route)</h3>

<p>Kibo Hut is the summit base camp for the Marangu route, sitting at 4,703 metres — slightly higher than Barafu. It is a stone building with dormitory-style bunks for approximately 60 climbers, making it the most basic overnight shelter on the Marangu route. The hut provides walls and a roof (no tents here), but the temperature inside is barely warmer than outside. The wind howls around the building at night, and sleep is elusive for most climbers.</p>

<p>The landscape around Kibo Hut is lunar: grey volcanic rock, no vegetation, thin air, and the massive presence of the summit cone directly above. The trail to Gilman's Point starts right behind the hut, visible as a series of switchbacks up the scree slope. Facilities include pit latrines and a small dining area. Water is carried by porters from a source lower on the route. Cell signal: none. Night temperatures: -10°C to -15°C.</p>

<h3>School Hut — 4,750 m (Rongai Route)</h3>

<p>School Hut is the highest hut on Kilimanjaro at 4,750 metres. It serves as the summit base camp for climbers on the Rongai route approaching from the north. The hut is a small stone building that sleeps approximately 30 people, but most Rongai climbers camp in tents nearby rather than using the hut itself. The setting is stark and exposed — grey scree, no vegetation, and the summit cone looming directly above.</p>

<p>School Hut has one advantage over Barafu: it is approximately 150 metres higher, which means the summit push is slightly shorter (5.5-7 hours versus 6-8 hours from Barafu). However, the higher sleeping altitude means more altitude symptoms overnight. It is a trade-off. Facilities: basic pit latrines, porter-carried water. Night temperatures: -10°C to -18°C. Cell signal: none.</p>

<h2>The Highest Camp in Africa: Crater Camp — 5,729 m</h2>

<p>Crater Camp is the most extreme overnight location on Kilimanjaro and the <strong>highest camp in Africa.</strong> It sits inside the volcanic crater at 5,729 metres, between the Furtwangler Glacier and the inner crater wall. Only climbers on special extended itineraries camp here — typically those who summit and then descend into the crater rather than descending the mountain, or climbers who want the experience of sleeping at extreme altitude.</p>

<p>Camping at Crater Camp requires a special permit, additional crew, and extra water and fuel carried to extreme altitude by porters. The experience is extraordinary: you sleep surrounded by glacial ice at nearly 6,000 metres, with the Uhuru Peak summit ridge visible above you and the vast crater floor stretching out below. Sunrise inside the crater is one of the most otherworldly experiences available on any mountain in the world.</p>

<p>However, the risks are real. At 5,729 metres, the oxygen level is approximately 50% of sea level. Acute Mountain Sickness is a serious concern, and the cold is extreme — overnight temperatures inside the crater drop to -20°C to -25°C. Only climbers with prior high-altitude experience and excellent acclimatisation should attempt Crater Camp. We offer it as an add-on to our 9-day Lemosho itinerary — contact us through our <a href="/climbing-kilimanjaro/">Kilimanjaro page</a> for details and pricing.</p>

<h2>The Most Scenic Camps</h2>

<p>If views are your priority, these three camps deliver the most visually stunning experiences on the mountain:</p>

<ul>
<li><strong>Barranco Camp (3,960 m):</strong> The Barranco Wall, the glaciers, the sunrise. No camp on Kilimanjaro matches it for sheer visual drama.</li>
<li><strong>Shira Camp (3,840 m):</strong> The vast plateau, the sunset glow, and the summit cone rising like a cathedral to the east.</li>
<li><strong>Crater Camp (5,729 m):</strong> If you can get there, the glacial landscape inside the crater is unlike anything else on the mountain — or on any mountain in Africa.</li>
</ul>

<h2>The Most Challenging Camps</h2>

<p>Difficulty at camps is driven by altitude, weather exposure, and the effort required to reach them:</p>

<ul>
<li><strong>Barafu Camp (4,673 m):</strong> The exposed ridge, the relentless wind, the cold, the anxiety of the impending summit attempt. Sleep is difficult for everyone.</li>
<li><strong>Kibo Hut (4,703 m):</strong> Similar altitude stress to Barafu but with dormitory bunks — you hear every cough, every zip, every person getting up to use the toilet at 2 AM.</li>
<li><strong>Crater Camp (5,729 m):</strong> The altitude alone makes this the most physically demanding camp. Only experienced high-altitude trekkers should attempt it.</li>
</ul>

<h2>What to Expect at Every Camp</h2>

<p>Regardless of which route you choose, the camp routine on Kilimanjaro follows a consistent pattern that our crews have perfected over hundreds of expeditions:</p>

<ul>
<li><strong>Arrival:</strong> Your crew arrives ahead of you and sets up your tent, inflates your sleeping pad, and begins preparing tea and snacks. You arrive to a ready camp.</li>
<li><strong>Afternoon:</strong> Wash up (warm water provided in a basin), change into camp clothes, drink tea, eat popcorn and biscuits, rest.</li>
<li><strong>Dinner:</strong> Hot soup followed by a main course (rice, pasta, or potatoes with vegetables, chicken, or beef). Fruit and hot drinks to finish.</li>
<li><strong>Evening:</strong> Our guide checks oxygen saturation and heart rate with a pulse oximeter, records symptoms, and briefs you on the next day. Then sleep — or at least attempt it.</li>
<li><strong>Morning:</strong> Wake-up call with hot tea or coffee delivered to your tent. Breakfast (porridge, eggs, toast, fruit, sausages). Pack your day pack while porters break down camp. Walk.</li>
</ul>

<p>For <a href="/kilimanjaro-prices/">detailed pricing</a> on all routes and itinerary lengths, or to discuss which route and camps best match your experience level, visit our <a href="/climbing-kilimanjaro/">Kilimanjaro climbing page</a>. We have slept at every camp listed in this guide more times than we can count, and we know exactly which camps will be the highlights of your climb — and which ones will test you. Both are part of the Kilimanjaro experience, and both are worth it.</p>

<p>To explore the <a href="/best-time-to-climb-kilimanjaro/">best time to climb Kilimanjaro</a> — which affects weather conditions at every camp — or to review the full <a href="/kilimanjaro-climbing-gear/">gear list</a> you will need for overnight camping at altitude, browse our complete Kilimanjaro resource library. The mountain is waiting.</p>
`;

/* ------------------------------------------------------------------ */
/*  Posts array                                                        */
/* ------------------------------------------------------------------ */
const posts = [
  {
    slug: "kilimanjaro-flat-land-training",
    title:
      "Train for Kilimanjaro Without Mountains: Flat-Land Workout Guide",
    metaTitle: "Kilimanjaro Flat-Land Training Guide (2026)",
    metaDescription:
      "Train for Kilimanjaro without mountains. Stair climbing, incline treadmill, sand dunes, loaded rucksack walks, and a 12-week flat-land schedule that works.",
    excerpt:
      "A practical training programme for Kilimanjaro climbers who live in flat areas — Netherlands, UK lowlands, Florida, Midwest USA. Covers stair climbing in buildings and stadiums, incline treadmill protocols, sand dune training, loaded rucksack walks, altitude simulation masks, a 12-week weekly schedule, and mental preparation without altitude experience.",
    content: post1Content,
    categorySlug: "kilimanjaro",
    categoryName: "Kilimanjaro",
    tags: [
      { name: "Training", slug: "training" },
      { name: "Fitness", slug: "fitness" },
      { name: "Preparation", slug: "preparation" },
    ],
  },
  {
    slug: "kilimanjaro-best-camps",
    title:
      "Best Camps on Kilimanjaro: Where You Sleep at Every Elevation",
    metaTitle: "Kilimanjaro Camps Guide — Every Camp Explained",
    metaDescription:
      "Complete guide to every Kilimanjaro camp: Machame, Shira, Barranco, Barafu, Kibo Hut, Crater Camp and more. Elevations, facilities, weather, and route info.",
    excerpt:
      "A detailed guide to every major camp on Kilimanjaro across all routes. For each camp: elevation, route, facilities, weather, terrain, and what makes it special. Covers Mandara Hut, Machame Camp, Shira Camp, Barranco Camp, Karanga Camp, Barafu Camp, Kibo Hut, School Hut, Crater Camp, and more — with tables comparing elevations and key features.",
    content: post2Content,
    categorySlug: "kilimanjaro",
    categoryName: "Kilimanjaro",
    tags: [
      { name: "Camps", slug: "camps" },
      { name: "Routes", slug: "routes" },
      { name: "Accommodation", slug: "accommodation" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Main seeder                                                        */
/* ------------------------------------------------------------------ */
async function main() {
  console.log("Seeding 2 Kilimanjaro blog posts (batch 28a)...\n");

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
