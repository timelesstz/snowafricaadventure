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
<p>You want to climb Kilimanjaro, but you live in a city as flat as a pancake. No mountains. No hills. Maybe a highway overpass is the most elevation change you see in a month. In our 800+ expeditions guiding climbers to the roof of Africa, we have watched hundreds of people from the Netherlands, Florida, Singapore, and the Gulf States reach Uhuru Peak with zero mountain access during training. The ones who succeeded had one thing in common: they trained smart with what they had, and they were relentless about it. This guide is the programme we send to every flat-land climber who books with us — a proven 12-week system built entirely around structures, machines, and creative alternatives you can find in any city.</p>

<h2>Why Flat-Land Training Works for Kilimanjaro</h2>

<p>Here is a truth that surprises most people: Kilimanjaro is not a technical climb. There are no ropes, no ice axes (except the optional crater traverse), and no rock-climbing sections on the standard routes. What Kilimanjaro demands is cardiovascular endurance, leg strength for sustained uphill walking, mental tolerance for discomfort, and the ability to keep moving for 12-16 hours on summit night. Every one of these qualities can be built without ever stepping on a mountain. The <a href="/climbing-kilimanjaro/">routes we operate</a> — Machame, Lemosho, and Northern Circuit — are walking routes. If you can walk uphill for hours with a pack, you can summit Kilimanjaro. The altitude is the wildcard, and no amount of mountain training at sea level simulates that anyway.</p>

<p>In fact, flat-land climbers who follow a structured programme often outperform weekend mountain hikers. Why? Consistency. Living near mountains creates a false sense of security — people do one big hike per weekend and skip weekday training. Flat-land climbers, because they cannot rely on terrain, build disciplined daily programmes. That four-to-five-session weekly consistency produces better cardiovascular adaptation and more resilient joints than a single long weekend hike ever will.</p>

<h3>The Three Pillars of Flat-Land Preparation</h3>

<ul>
<li><strong>Sustained uphill endurance:</strong> Your legs and lungs need to handle 5-8 hours of continuous uphill effort, day after day, for up to 8 days. This is the non-negotiable foundation.</li>
<li><strong>Load-bearing capacity:</strong> You will carry a daypack of 5-8 kg on the mountain. Your legs, hips, and core need to handle that weight over uneven terrain without breaking down.</li>
<li><strong>Mental stamina:</strong> Summit night is 12-16 hours of walking in the dark, in freezing temperatures, at altitude. The physical fitness gets you there; the mental fitness keeps you moving when every cell in your body wants to stop.</li>
</ul>

<h2>Stair Climbing: Your Best Flat-Land Weapon</h2>

<p>If we could prescribe only one exercise for Kilimanjaro preparation, it would be stair climbing. Nothing replicates the sustained uphill leg burn, the cardiovascular demand, and the repetitive stepping motion of mountain trekking like climbing stairs. And stairs are everywhere — even in the flattest cities on earth.</p>

<h3>Where to Find Stairs</h3>

<ul>
<li><strong>Office buildings and apartment blocks:</strong> A 20-storey building gives you roughly 60-65 metres of elevation gain per ascent. Climb it 15 times and you have covered about 1,000 metres — nearly the elevation gain of a single day on <a href="/trekking/">Kilimanjaro's longer routes</a>. Many buildings have fire escape stairwells that are accessible outside business hours.</li>
<li><strong>Sports stadiums:</strong> Stadium stairs are steep, wide, and often accessible during off-hours. A single circuit of a large football or athletics stadium can give you 200-300 steps. Repeat for 60-90 minutes.</li>
<li><strong>Parking garages:</strong> Multi-storey car parks are underrated training venues. They are covered (weather-proof), have consistent step heights, and are usually empty on weekday mornings or weekends. Walk up the ramps or take the stairs — both work.</li>
<li><strong>Pedestrian overpasses and underpasses:</strong> In cities with elevated walkways or underground metro stations, you can chain together a route that includes multiple sets of stairs. Map out a 5-10 km walking route that hits every overpass and staircase in your area.</li>
</ul>

<h3>Stair Climbing Technique for Kilimanjaro</h3>

<p>Do not sprint the stairs. This is not a HIIT workout. Kilimanjaro pace is slow and steady — around 2 km/h on summit day. Your stair sessions should mirror this:</p>

<ul>
<li><strong>Pace:</strong> Conversational. If you cannot talk while climbing, you are going too fast. On the mountain, our guides enforce the "pole pole" (slowly, slowly) pace for a reason — it conserves energy and aids acclimatisation.</li>
<li><strong>Duration over speed:</strong> A 90-minute slow stair session is vastly more valuable than a 20-minute sprint session. Your body needs to learn to sustain effort for hours, not minutes.</li>
<li><strong>Full foot placement:</strong> Place your entire foot on each step, not just the ball. This trains the calf muscles and Achilles tendon for the full-foot walking technique that prevents calf fatigue on the mountain.</li>
<li><strong>Add a pack:</strong> From week 5 onward, wear a loaded daypack (start at 4 kg, build to 8 kg). This simulates the daypack you will carry on the mountain and trains your core stabilisers.</li>
<li><strong>Walk down every flight:</strong> Do not take the lift down. Kilimanjaro descent days are brutal on the knees. The eccentric muscle contractions of walking downstairs train your quads for the long, punishing descents from Barafu to Mweka Gate.</li>
</ul>

<h2>Incline Treadmill Training</h2>

<p>The incline treadmill is the closest gym equivalent to mountain hiking. Modern commercial treadmills max out at 15% gradient — roughly equivalent to a moderate mountain trail. Here is how to use it effectively:</p>

<h3>Progressive Incline Protocol</h3>

<ul>
<li><strong>Weeks 1-4:</strong> 8-10% incline at 4.5-5.5 km/h for 45-60 minutes. Focus on building base endurance without destroying your joints.</li>
<li><strong>Weeks 5-8:</strong> 12-15% incline at 4.0-5.0 km/h for 60-90 minutes. The slower speed at higher incline matches actual mountain pace. Add a weighted vest or backpack (5-7 kg).</li>
<li><strong>Weeks 9-12:</strong> 15% incline at 3.5-4.5 km/h for 90-120 minutes. By now, you should be able to sustain 2 hours at max incline without significant fatigue. This is summit-night fitness.</li>
</ul>

<p>One critical detail: do not hold the treadmill handrails. Holding the rails reduces the workload by 20-30% and teaches your body to depend on arm support that will not exist on the mountain. If you need the rails for balance, the incline is too steep or the speed is too fast — reduce and build back up.</p>

<h3>Simulating Summit Night on the Treadmill</h3>

<p>Once per week in the final four weeks of training, do a summit simulation session: 15% incline, 3.5 km/h, for 120 minutes continuously. This replicates the effort level and duration of the Barafu-to-Stella-Point ascent. Do it late at night — 10 PM to midnight — to simulate walking when your body wants to sleep. If you can sustain this session, you have the physical foundation for summit night. The altitude adds a variable you cannot simulate, but the muscular and cardiovascular demands are accurately replicated.</p>

<h2>Step Machines and Stair Climbers</h2>

<p>The revolving staircase machine (StairMaster or similar) is excellent for Kilimanjaro prep because it forces continuous stepping without the downhill return. On the mountain, you climb for hours without any downhill break during ascent days. The step machine replicates this one-directional effort perfectly.</p>

<ul>
<li><strong>Target duration:</strong> 45 minutes in weeks 1-4, building to 90 minutes by weeks 9-12.</li>
<li><strong>Resistance:</strong> Medium. The goal is duration, not speed. Set a pace of 40-60 steps per minute and hold it for the full session.</li>
<li><strong>Combine with pack:</strong> Wear your actual Kilimanjaro daypack loaded to 5-8 kg. This dual-purpose session builds leg endurance and pack tolerance simultaneously.</li>
</ul>

<h2>Loaded Rucksack Walking</h2>

<p>Rucking — walking with a weighted backpack — is a military training staple that translates perfectly to Kilimanjaro preparation. Even on completely flat terrain, a 10-12 kg rucksack transforms a simple walk into serious cardiovascular and muscular training.</p>

<h3>Rucking Protocol</h3>

<ul>
<li><strong>Starting weight:</strong> 6 kg in a comfortable hiking backpack with hip belt. Never increase weight by more than 2 kg per week.</li>
<li><strong>Target weight:</strong> 10-12 kg by week 8. This exceeds your Kilimanjaro daypack weight (5-8 kg) and provides an overtraining buffer that makes the actual climb feel easier.</li>
<li><strong>Duration:</strong> 60-90 minutes during the week, 2-4 hours on weekends. The long weekend ruck is your most important session — it teaches your body to sustain effort for mountain-length durations.</li>
<li><strong>Terrain:</strong> Vary surfaces — pavement, park trails, sand, grass. Different surfaces engage different stabiliser muscles and prevent repetitive strain injuries.</li>
<li><strong>Footwear:</strong> Use your actual <a href="/kilimanjaro-climbing-gear/">Kilimanjaro hiking boots</a> for every rucking session from week 4 onward. This breaks in the boots and toughens your feet simultaneously.</li>
</ul>

<h2>Indoor Cycling for Hill Simulation</h2>

<p>If your city is flat but you have access to a stationary bike or indoor cycling trainer, you can simulate hill climbing through resistance adjustments. This is particularly useful as a low-impact cross-training day that spares your knees while still building the cardiovascular engine needed for summit night.</p>

<ul>
<li><strong>Hill simulation programme:</strong> Set the trainer to a "hill climb" or "mountain" profile. Aim for 45-60 minutes at a moderate cadence (60-70 RPM) with high resistance. The effort should feel like grinding uphill in a low gear.</li>
<li><strong>Standing intervals:</strong> Every 10 minutes, stand out of the saddle for 2 minutes. This engages the glutes and quadriceps in a pattern that mirrors steep uphill walking.</li>
<li><strong>Frequency:</strong> 1-2 sessions per week as a supplement to stair climbing and rucking. Cycling should not replace uphill walking sessions — it supplements them.</li>
</ul>

<h2>The 12-Week Flat-Land Kilimanjaro Training Schedule</h2>

<p>This is the exact schedule we send to clients who book a <a href="/climbing-kilimanjaro/">Kilimanjaro expedition</a> with us and have no mountain access. It has been refined over years of feedback from climbers who trained exclusively on flat terrain and summited successfully. Review our <a href="/kilimanjaro-training-plan/">complete training plan</a> for additional strength and flexibility exercises that complement this schedule.</p>

<table style="width:100%; border-collapse:collapse; margin:1.5em 0;">
<thead>
<tr style="background:#f8f5f0; border-bottom:2px solid #c9a96e;">
<th style="padding:12px; text-align:left; font-weight:700;">Week</th>
<th style="padding:12px; text-align:left; font-weight:700;">Monday</th>
<th style="padding:12px; text-align:left; font-weight:700;">Tuesday</th>
<th style="padding:12px; text-align:left; font-weight:700;">Wednesday</th>
<th style="padding:12px; text-align:left; font-weight:700;">Thursday</th>
<th style="padding:12px; text-align:left; font-weight:700;">Friday</th>
<th style="padding:12px; text-align:left; font-weight:700;">Saturday</th>
<th style="padding:12px; text-align:left; font-weight:700;">Sunday</th>
</tr>
</thead>
<tbody>
<tr style="border-bottom:1px solid #e5e5e5;">
<td style="padding:10px;"><strong>1-2</strong></td>
<td style="padding:10px;">Stairs 30 min</td>
<td style="padding:10px;">Rest</td>
<td style="padding:10px;">Treadmill 10% / 45 min</td>
<td style="padding:10px;">Rest</td>
<td style="padding:10px;">Stairs 30 min</td>
<td style="padding:10px;">Ruck walk 60 min (6 kg)</td>
<td style="padding:10px;">Rest or light walk</td>
</tr>
<tr style="border-bottom:1px solid #e5e5e5;">
<td style="padding:10px;"><strong>3-4</strong></td>
<td style="padding:10px;">Stairs 45 min</td>
<td style="padding:10px;">Cycling 45 min</td>
<td style="padding:10px;">Treadmill 12% / 60 min</td>
<td style="padding:10px;">Rest</td>
<td style="padding:10px;">Step machine 45 min</td>
<td style="padding:10px;">Ruck walk 90 min (7 kg)</td>
<td style="padding:10px;">Rest or yoga</td>
</tr>
<tr style="border-bottom:1px solid #e5e5e5;">
<td style="padding:10px;"><strong>5-6</strong></td>
<td style="padding:10px;">Stairs 60 min + 4 kg pack</td>
<td style="padding:10px;">Cycling 50 min</td>
<td style="padding:10px;">Treadmill 13% / 70 min</td>
<td style="padding:10px;">Strength training</td>
<td style="padding:10px;">Step machine 60 min</td>
<td style="padding:10px;">Ruck walk 2 hr (8 kg)</td>
<td style="padding:10px;">Rest</td>
</tr>
<tr style="border-bottom:1px solid #e5e5e5;">
<td style="padding:10px;"><strong>7-8</strong></td>
<td style="padding:10px;">Stairs 75 min + 6 kg pack</td>
<td style="padding:10px;">Cycling 55 min</td>
<td style="padding:10px;">Treadmill 15% / 80 min</td>
<td style="padding:10px;">Strength training</td>
<td style="padding:10px;">Step machine 75 min</td>
<td style="padding:10px;">Ruck walk 3 hr (10 kg)</td>
<td style="padding:10px;">Rest</td>
</tr>
<tr style="border-bottom:1px solid #e5e5e5;">
<td style="padding:10px;"><strong>9-10</strong></td>
<td style="padding:10px;">Stairs 90 min + 7 kg pack</td>
<td style="padding:10px;">Cycling 60 min</td>
<td style="padding:10px;">Treadmill 15% / 90 min</td>
<td style="padding:10px;">Strength training</td>
<td style="padding:10px;">Step machine 90 min</td>
<td style="padding:10px;">Ruck walk 3.5 hr (11 kg)</td>
<td style="padding:10px;">Rest</td>
</tr>
<tr style="border-bottom:1px solid #e5e5e5;">
<td style="padding:10px;"><strong>11</strong></td>
<td style="padding:10px;">Stairs 90 min + 8 kg pack</td>
<td style="padding:10px;">Cycling 60 min</td>
<td style="padding:10px;">Treadmill 15% / 100 min</td>
<td style="padding:10px;">Strength training</td>
<td style="padding:10px;">Step machine 90 min</td>
<td style="padding:10px;">Ruck walk 4 hr (12 kg)</td>
<td style="padding:10px;">Rest</td>
</tr>
<tr style="border-bottom:1px solid #e5e5e5;">
<td style="padding:10px;"><strong>12 (taper)</strong></td>
<td style="padding:10px;">Stairs 40 min (no pack)</td>
<td style="padding:10px;">Rest</td>
<td style="padding:10px;">Treadmill 10% / 45 min</td>
<td style="padding:10px;">Rest</td>
<td style="padding:10px;">Light 30 min walk</td>
<td style="padding:10px;">Ruck walk 60 min (6 kg)</td>
<td style="padding:10px;">Rest — travel prep</td>
</tr>
</tbody>
</table>

<h3>Key Notes on the Schedule</h3>

<ul>
<li><strong>Rest days are sacred:</strong> Overtraining leads to injury, not fitness. If you feel joint pain, take an extra rest day. Arriving at the mountain healthy is more important than arriving maximally fit.</li>
<li><strong>Saturday is your peak session:</strong> The long weekend ruck walk simulates an actual mountain day. Protect this session — reschedule work commitments if necessary. It is the single most valuable workout in the entire programme.</li>
<li><strong>Week 12 is a taper:</strong> Reduce intensity by 40-50% in the final week before your flight. You want to arrive in Tanzania rested and energised, not depleted from a final training push. Your fitness does not improve in the last week — but it can be damaged by fatigue and minor injuries.</li>
<li><strong>Strength training:</strong> Thursday sessions should target legs and core specifically — squats, lunges, step-ups with dumbbells, calf raises, and planks. These prevent the muscle fatigue that forces people off the mountain on day 4 or 5.</li>
</ul>

<h2>Mental Preparation Without Altitude Experience</h2>

<p>The biggest fear flat-land climbers express is: "How do I prepare for altitude if I have never been above 1,000 metres?" Here is the honest answer: you cannot fully prepare for altitude. No training at sea level — not even altitude masks, altitude tents, or hypoxic training — perfectly simulates the experience of breathing at 5,895 metres where there is roughly half the oxygen of sea level. But here is what you can control:</p>

<ul>
<li><strong>Discomfort tolerance:</strong> Train in uncomfortable conditions deliberately. Cold showers. Early morning sessions when you do not want to get out of bed. The last 30 minutes of a 4-hour ruck when your feet hurt and your shoulders ache. Summit night is an exercise in tolerating discomfort — and that skill transfers from any challenging environment.</li>
<li><strong>Sleep deprivation management:</strong> On summit night, you will start walking at midnight after minimal sleep. Practice functioning while tired. Do a late-night stair climbing session (10 PM to midnight) once or twice during training to understand how your body performs when fatigued.</li>
<li><strong>Breathing techniques:</strong> Practice deliberate deep breathing during every training session. Inhale for 4 counts, exhale for 6 counts. This pattern becomes automatic on the mountain, where efficient breathing directly affects altitude performance.</li>
<li><strong>Visualisation:</strong> Study the route. Know every camp name, every elevation marker, every landmark. When you are walking in the dark at 5,200 metres, knowing exactly where you are and how far you have to go provides enormous psychological comfort. Check our <a href="/trekking/">route guides</a> for detailed elevation profiles and camp descriptions.</li>
<li><strong>The "next step" mentality:</strong> On summit night, the summit feels impossibly distant. Our guides teach climbers to think only about the next footstep — not the summit, not the next rest stop, just the next step. Practice this focus during your hardest training sessions. When your legs burn at minute 80 of a 90-minute stair session, do not think about the remaining 10 minutes. Think about the next step.</li>
</ul>

<h2>Common Flat-Land Training Mistakes</h2>

<ul>
<li><strong>Running instead of walking:</strong> Kilimanjaro is a walking mountain. Running builds cardiovascular fitness but does not train the specific muscle groups used in slow, sustained uphill walking. Replace at least 80% of your running sessions with walking-based training.</li>
<li><strong>Neglecting downhill training:</strong> Descent days on Kilimanjaro are brutal on the knees. Walk down every flight of stairs you climb — do not take the lift. The eccentric muscle contractions of downhill walking must be trained specifically.</li>
<li><strong>Altitude masks and gimmicks:</strong> Altitude training masks restrict airflow but do not reduce oxygen concentration. They train your breathing muscles, not your body's altitude adaptation. Save the money and invest in an extra pair of quality hiking socks instead. Review our <a href="/kilimanjaro-climbing-gear/">gear guide</a> for items that actually make a difference.</li>
<li><strong>Starting too late:</strong> Twelve weeks is the minimum. If you are currently sedentary, add 4-6 weeks of base fitness building before starting this programme. We have seen climbers start training 3 weeks before departure — they uniformly struggle.</li>
<li><strong>Ignoring strength work:</strong> Legs, core, and hip stabilisers need targeted strength training alongside endurance work. Squats, lunges, step-ups, and planks twice per week prevent the muscle fatigue that forces people off the mountain on day 4.</li>
<li><strong>Training only on smooth surfaces:</strong> Kilimanjaro trails are rocky, rooted, and uneven. Walk on gravel paths, grass, sand — anything other than smooth pavement. Your ankle stabilisers need to be conditioned for variable terrain or you risk a sprain that ends your climb.</li>
</ul>

<h2>What Our Flat-Land Climbers Say</h2>

<p>Of the climbers we have guided who came from flat terrain and followed a structured training programme, our summit success rate is 93% — nearly identical to our overall average of 95%. The mountain does not care whether you trained on mountains or staircases. It cares whether you put in the hours, built the endurance, and developed the mental resilience to keep walking when everything inside you says stop.</p>

<p>If you live in a flat city and want to climb Kilimanjaro, you are not at a disadvantage — you are simply training differently. And different is not inferior. The discipline required to climb 40 flights of stairs in a humid office building stairwell, week after week, builds a mental toughness that mountain hikers who step out their back door onto a trail never develop.</p>

<p>For a personalised training assessment based on your fitness level, climb date, and available facilities, <a href="/climbing-kilimanjaro/">contact our team</a>. We review your training plan, adjust the schedule to your timeline, and check in with you monthly to track progress. For current <a href="/kilimanjaro-prices/">Kilimanjaro pricing</a> and available group departure dates, visit our booking page. And check the <a href="/best-time-to-climb-kilimanjaro/">best time to climb guide</a> to align your training schedule with optimal weather windows.</p>
`;

/* ------------------------------------------------------------------ */
/*  Post 2: kilimanjaro-best-camps                                     */
/* ------------------------------------------------------------------ */
const post2Content = `
<p>Every night on Kilimanjaro, you sleep in a different camp. The camp you wake up in determines the landscape you walk through, the temperature you endure, the sunset you witness, and — more practically — the quality of sleep that fuels the next day's ascent. In our 800+ expeditions, we have slept in every camp on every route, in every season, through rainstorms and clear skies, and we have strong opinions about which camps are worth anticipating and which ones you simply endure. This guide covers every major camp on Kilimanjaro — where it sits, what route uses it, what facilities exist, and what makes each one memorable.</p>

<h2>Understanding Kilimanjaro's Camp System</h2>

<p>Kilimanjaro has two types of accommodation: huts and tent camps. The Marangu Route (the only route with hut accommodation) uses permanent wooden huts with bunk beds, mattresses, and communal dining halls. Every other route — <a href="/climbing-kilimanjaro/">Machame, Lemosho, Northern Circuit, and Rongai</a> — uses designated tent camping areas where your crew sets up and strikes camp daily. The tent camps have basic facilities: pit latrines, sometimes a ranger station, and flat ground for pitching tents. Everything else — your tent, sleeping mat, food, water, and cooking equipment — is carried up by your porter team.</p>

<h3>Camp Elevation Zones</h3>

<p>Kilimanjaro's camps fall into four distinct ecological zones, and each zone creates a dramatically different camping experience:</p>

<ul>
<li><strong>Rainforest zone (1,800-2,800m):</strong> Warm, humid, mosquito-prone at lower elevations. Camps here are lush and enclosed by dense canopy. Expect evening rain.</li>
<li><strong>Heath and moorland zone (2,800-4,000m):</strong> Open landscapes with giant heather and groundsels. Camps offer panoramic views. Temperatures cool significantly at night.</li>
<li><strong>Alpine desert zone (4,000-5,000m):</strong> Sparse vegetation, exposed rock, intense UV. Camps feel austere and lunar. Night temperatures drop well below freezing.</li>
<li><strong>Arctic zone (5,000m+):</strong> Glaciers, scree, and permanent ice. Only two camps exist here. Extreme cold and altitude create challenging sleeping conditions.</li>
</ul>

<h2>Complete Camp Reference Table</h2>

<p>The following table summarises every major camp on Kilimanjaro, organised by elevation. Use this alongside our <a href="/trekking/">route comparison guide</a> to plan which camps you will sleep at based on your chosen route.</p>

<table style="width:100%; border-collapse:collapse; margin:1.5em 0;">
<thead>
<tr style="background:#f8f5f0; border-bottom:2px solid #c9a96e;">
<th style="padding:12px; text-align:left; font-weight:700;">Camp</th>
<th style="padding:12px; text-align:left; font-weight:700;">Elevation</th>
<th style="padding:12px; text-align:left; font-weight:700;">Route(s)</th>
<th style="padding:12px; text-align:left; font-weight:700;">Zone</th>
<th style="padding:12px; text-align:left; font-weight:700;">Key Features</th>
</tr>
</thead>
<tbody>
<tr style="border-bottom:1px solid #e5e5e5;">
<td style="padding:10px;">Mandara Hut</td>
<td style="padding:10px;">2,720m</td>
<td style="padding:10px;">Marangu</td>
<td style="padding:10px;">Rainforest</td>
<td style="padding:10px;">A-frame huts, beds, flush toilets, Maundi Crater viewpoint</td>
</tr>
<tr style="border-bottom:1px solid #e5e5e5;">
<td style="padding:10px;">Mti Mkubwa</td>
<td style="padding:10px;">2,750m</td>
<td style="padding:10px;">Lemosho</td>
<td style="padding:10px;">Rainforest</td>
<td style="padding:10px;">Quiet, ancient fig tree, low crowds, blue monkeys</td>
</tr>
<tr style="border-bottom:1px solid #e5e5e5;">
<td style="padding:10px;">Machame Camp</td>
<td style="padding:10px;">3,020m</td>
<td style="padding:10px;">Machame</td>
<td style="padding:10px;">Rainforest/Heath</td>
<td style="padding:10px;">Popular, first Kibo views, rainforest canopy, colobus monkeys</td>
</tr>
<tr style="border-bottom:1px solid #e5e5e5;">
<td style="padding:10px;">Horombo Hut</td>
<td style="padding:10px;">3,720m</td>
<td style="padding:10px;">Marangu</td>
<td style="padding:10px;">Moorland</td>
<td style="padding:10px;">Largest hut complex, snack shop, Zebra Rocks acclimatisation hike</td>
</tr>
<tr style="border-bottom:1px solid #e5e5e5;">
<td style="padding:10px;">Shira Camp</td>
<td style="padding:10px;">3,840m</td>
<td style="padding:10px;">Machame, Lemosho, Northern Circuit</td>
<td style="padding:10px;">Moorland</td>
<td style="padding:10px;">360-degree plateau views, legendary sunsets, route convergence</td>
</tr>
<tr style="border-bottom:1px solid #e5e5e5;">
<td style="padding:10px;">Barranco Camp</td>
<td style="padding:10px;">3,960m</td>
<td style="padding:10px;">Machame, Lemosho, Umbwe, Northern Circuit</td>
<td style="padding:10px;">Alpine desert</td>
<td style="padding:10px;">Barranco Wall scramble, sheltered valley, giant groundsels</td>
</tr>
<tr style="border-bottom:1px solid #e5e5e5;">
<td style="padding:10px;">Karanga Camp</td>
<td style="padding:10px;">3,995m</td>
<td style="padding:10px;">Machame, Lemosho, Northern Circuit</td>
<td style="padding:10px;">Alpine desert</td>
<td style="padding:10px;">Last water source, glacier views, acclimatisation split camp</td>
</tr>
<tr style="border-bottom:1px solid #e5e5e5;">
<td style="padding:10px;">Barafu Camp</td>
<td style="padding:10px;">4,673m</td>
<td style="padding:10px;">Machame, Lemosho, Umbwe, Northern Circuit</td>
<td style="padding:10px;">Alpine desert</td>
<td style="padding:10px;">Summit launch point, exposed ridge, no water, Milky Way views</td>
</tr>
<tr style="border-bottom:1px solid #e5e5e5;">
<td style="padding:10px;">Kibo Hut</td>
<td style="padding:10px;">4,703m</td>
<td style="padding:10px;">Marangu</td>
<td style="padding:10px;">Alpine desert</td>
<td style="padding:10px;">Stone building, dormitory beds, saddle crossing approach</td>
</tr>
<tr style="background:#f8f5f0; border-top:2px solid #c9a96e;">
<td style="padding:10px;"><strong>Crater Camp</strong></td>
<td style="padding:10px;"><strong>5,729m</strong></td>
<td style="padding:10px;"><strong>Any (special permit)</strong></td>
<td style="padding:10px;"><strong>Arctic</strong></td>
<td style="padding:10px;"><strong>Inside crater, beside glaciers, best stargazing on continent</strong></td>
</tr>
</tbody>
</table>

<h2>Rainforest Zone Camps</h2>

<h3>Machame Camp (3,020m) — Machame Route</h3>

<p>Machame Camp is the first overnight stop on the most popular route on the mountain. Sitting at the upper edge of the rainforest zone, it occupies a cleared area surrounded by tall Erica trees and moss-draped branches. The camp accommodates up to 200 climbers on busy nights, making it one of the more crowded camps on the mountain.</p>

<ul>
<li><strong>Elevation:</strong> 3,020 metres</li>
<li><strong>Route(s):</strong> Machame</li>
<li><strong>Facilities:</strong> Pit latrines, ranger station, flat camping terraces, stream water nearby</li>
<li><strong>What makes it special:</strong> The hike from Machame Gate (1,800m) to Machame Camp is one of the most beautiful on the entire mountain — a full day through dripping rainforest with colobus monkeys overhead and an emerald canopy filtering the sunlight. Arriving at camp, you are above the forest canopy for the first time, and if the clouds clear, you catch your first glimpse of the Kibo summit cone. It sets the tone for the entire climb.</li>
</ul>

<h3>Mandara Hut (2,720m) — Marangu Route</h3>

<p>Mandara Hut is the first stop on the Marangu Route and the most comfortable first-night camp on Kilimanjaro. It consists of A-frame wooden huts with bunk beds for 4-8 people each, a separate dining hall, and solar-powered lighting. The camp sits in dense rainforest next to a lovely stream.</p>

<ul>
<li><strong>Elevation:</strong> 2,720 metres</li>
<li><strong>Route(s):</strong> Marangu</li>
<li><strong>Facilities:</strong> Wooden A-frame huts, bunk beds with mattresses, dining hall, flush toilets, solar lighting</li>
<li><strong>What makes it special:</strong> Mandara is the only first-night camp with actual beds and a roof — a luxury you will appreciate if it rains, which it frequently does at this elevation. The Maundi Crater viewpoint is a 20-minute walk from camp and offers the first panoramic views of Mawenzi Peak and the plains below. Our guides always recommend the detour for acclimatisation and sunset photography.</li>
</ul>

<h3>Mti Mkubwa Camp (2,750m) — Lemosho Route</h3>

<p>Mti Mkubwa ("Big Tree" in Swahili) is named after the enormous fig tree that marks the camp's entrance. This is the first camp on the Lemosho Route, and it sees far fewer climbers than Machame Camp because the Lemosho approach is longer and less accessible. On many nights during the shoulder season, you may share the camp with only one or two other groups.</p>

<ul>
<li><strong>Elevation:</strong> 2,750 metres</li>
<li><strong>Route(s):</strong> Lemosho</li>
<li><strong>Facilities:</strong> Pit latrines, ranger check-in, basic tent platforms, stream water</li>
<li><strong>What makes it special:</strong> The solitude. While Machame Camp bustles with 150-200 climbers, Mti Mkubwa rarely sees more than 40. The surrounding forest is dense and atmospheric — ancient trees, hanging moss, and the sounds of blue monkeys and hornbills. If you value a quieter start to your <a href="/trekking/">Kilimanjaro trek</a>, the Lemosho Route through Mti Mkubwa is the way to go.</li>
</ul>

<h2>Heath and Moorland Zone Camps</h2>

<h3>Shira Camp (3,840m) — Machame, Lemosho, and Northern Circuit Routes</h3>

<p>Shira Camp sits on the vast Shira Plateau, a 6,200-hectare expanse of moorland that was once the caldera of Kilimanjaro's oldest volcanic cone. The camp is a convergence point where the Machame and Lemosho routes merge, and it serves as a launch point for the Northern Circuit variation. The plateau stretches in every direction, offering 360-degree views that are among the most dramatic on the mountain.</p>

<ul>
<li><strong>Elevation:</strong> 3,840 metres</li>
<li><strong>Route(s):</strong> Machame, Lemosho, Northern Circuit</li>
<li><strong>Facilities:</strong> Pit latrines, ranger station, extensive flat camping area, stream water from Shira springs</li>
<li><strong>What makes it special:</strong> The Shira Plateau sunset is legendary. With no trees or topography to obstruct the view, the sun drops below a vast horizon while Kibo's glaciers glow pink and gold above you. The sense of space is overwhelming — you feel exposed to the sky in a way that no other camp on the mountain replicates. Many of our guides name Shira as their favourite camp, and we agree.</li>
</ul>

<h3>Horombo Hut (3,720m) — Marangu Route</h3>

<p>Horombo Hut is the largest hut complex on Kilimanjaro, accommodating up to 120 climbers in wooden dormitory huts spread across a hillside of giant groundsels and lobelias. It serves as both the second-night ascent camp and the descent camp on the Marangu Route, meaning it is always busy. The huts are basic but functional — wooden bunk beds, thin mattresses, and communal dining halls.</p>

<ul>
<li><strong>Elevation:</strong> 3,720 metres</li>
<li><strong>Route(s):</strong> Marangu</li>
<li><strong>Facilities:</strong> Wooden huts, bunk beds, dining hall, flush toilets, solar lighting, small shop selling snacks and bottled water</li>
<li><strong>What makes it special:</strong> Horombo is the acclimatisation hub of the Marangu Route. On longer itineraries, climbers spend two nights here with a day hike to Zebra Rocks (4,020m) for altitude adjustment. The landscape surrounding the camp — giant groundsels, lobelias, and the twin peaks of Kibo and Mawenzi framing the horizon — is quintessential Kilimanjaro. The small shop is a welcome touch; buying a Coca-Cola at 3,720 metres feels absurdly civilised.</li>
</ul>

<h2>Alpine Desert Zone Camps</h2>

<h3>Barranco Camp (3,960m) — Machame, Lemosho, and Northern Circuit Routes</h3>

<p>Barranco Camp sits in a dramatic valley beneath the Barranco Wall — a 257-metre volcanic rock face that climbers scramble up the following morning. The camp itself is one of the most photogenic on the mountain, framed by giant groundsels and overlooked by the imposing wall and the glaciers of the Western Breach. Despite being at nearly 4,000 metres, Barranco is warmer than camps at similar altitude because the valley walls shelter it from wind.</p>

<ul>
<li><strong>Elevation:</strong> 3,960 metres</li>
<li><strong>Route(s):</strong> Machame, Lemosho, Umbwe, Northern Circuit</li>
<li><strong>Facilities:</strong> Pit latrines, ranger station, terraced camping platforms, stream water</li>
<li><strong>What makes it special:</strong> The Barranco Wall. Waking up and staring at the wall you are about to climb creates a mixture of dread and excitement that is pure Kilimanjaro. The scramble up the wall is the most technically engaging section of the standard routes — hands-on rock, exposed ledges, and a genuine sense of achievement at the top. Barranco Camp is also strategically important: the "walk high, sleep low" principle means you descend to Barranco after reaching higher elevations during the day, which aids acclimatisation significantly.</li>
</ul>

<h3>Karanga Camp (3,995m) — Machame, Lemosho, and Northern Circuit Routes</h3>

<p>Karanga Camp is a relatively new addition to the standard itinerary, introduced to break up the formerly brutal Barranco-to-Barafu day into two manageable stages. It sits in the Karanga Valley, the last reliable water source on the southern routes before the summit push. The camp is smaller and quieter than Barranco, with excellent views of the southern glaciers.</p>

<ul>
<li><strong>Elevation:</strong> 3,995 metres</li>
<li><strong>Route(s):</strong> Machame, Lemosho, Northern Circuit</li>
<li><strong>Facilities:</strong> Pit latrines, limited flat ground, Karanga stream (last water before summit)</li>
<li><strong>What makes it special:</strong> Karanga is the last water point. Every drop of water carried to Barafu Camp and beyond for the summit push is collected from the Karanga stream. This makes Karanga operationally critical — our crew fills every container here. For climbers, the camp provides a shorter day and additional acclimatisation night that materially improves <a href="/climbing-kilimanjaro/">summit success rates</a>. The views of the southern icefields from Karanga are also stunning, particularly at sunrise when the glaciers catch the first light.</li>
</ul>

<h2>High-Altitude Base Camps</h2>

<h3>Barafu Camp (4,673m) — Machame, Lemosho, and Northern Circuit Routes</h3>

<p>Barafu means "ice" in Swahili, and this camp earns its name. Perched on an exposed ridge at 4,673 metres, Barafu is the summit launch point for all southern routes. There is no shelter from the wind, no vegetation, and no water source. The ground is loose scree and volcanic rock. You arrive in the afternoon, eat an early dinner, attempt to sleep for a few hours, and then wake at midnight to begin the summit push. It is not comfortable. It is not meant to be.</p>

<ul>
<li><strong>Elevation:</strong> 4,673 metres</li>
<li><strong>Route(s):</strong> Machame, Lemosho, Umbwe, Northern Circuit</li>
<li><strong>Facilities:</strong> Pit latrines, ranger station, exposed rocky camping area (no water source)</li>
<li><strong>What makes it special:</strong> Barafu is where the climb becomes real. The altitude is palpable — headaches, nausea, and breathlessness are common. Sleep is elusive. But the views are extraordinary: you can see the lights of Moshi town thousands of metres below, and the Milky Way is visible in a way that is impossible at lower elevations. The nervous energy in camp before summit night — 200 head-torch beams dancing in the darkness as teams prepare to depart between 11 PM and 1 AM — is one of the defining memories of a Kilimanjaro climb. Check our <a href="/kilimanjaro-training-plan/">training plan</a> to ensure your body is ready for the demands that Barafu introduces.</li>
</ul>

<h3>Kibo Hut (4,703m) — Marangu Route</h3>

<p>Kibo Hut is the Marangu Route's equivalent of Barafu Camp — the final stop before the summit push. It is a large stone building with dormitory-style bunk rooms that accommodate up to 60 climbers. Unlike Barafu's exposed tents, Kibo Hut offers solid walls and a roof, but the temperature inside is not significantly warmer than outside. The building is draughty, and at 4,703 metres, everything is cold.</p>

<ul>
<li><strong>Elevation:</strong> 4,703 metres</li>
<li><strong>Route(s):</strong> Marangu</li>
<li><strong>Facilities:</strong> Stone dormitory building, bunk beds, dining area, pit latrines (no running water)</li>
<li><strong>What makes it special:</strong> Kibo Hut has an austere grandeur. Built in the 1970s, the stone structure sits on a saddle between Kibo and Mawenzi peaks, surrounded by alpine desert. It has the feeling of a mountain refuge from another era. The approach from Horombo crosses the "saddle" — a 4,200-metre moonscape of volcanic dust that is one of the most desolate and beautiful landscapes on earth. Despite the discomfort, sleeping under a solid roof at this altitude provides marginally better rest than a tent at Barafu, which can make a difference on summit night.</li>
</ul>

<h2>The Extreme: Crater Camp</h2>

<h3>Crater Camp (5,729m) — Special Permit Required</h3>

<p>Crater Camp is the highest camp on Kilimanjaro and one of the highest overnight camping locations on the African continent. It sits inside the Kibo crater rim, beside the Furtwangler Glacier, at 5,729 metres. Sleeping here requires a special permit, additional park fees, and a crew capable of carrying camping equipment to extreme altitude. Very few operators offer it, and we recommend it only for experienced altitude trekkers who have already summited Kilimanjaro at least once.</p>

<ul>
<li><strong>Elevation:</strong> 5,729 metres</li>
<li><strong>Route(s):</strong> Any route (accessed from Stella Point after standard summit), requires special permit</li>
<li><strong>Facilities:</strong> None. You carry everything. Flat ground on volcanic ash inside the crater. No water (ice must be melted), no latrines (pack out waste)</li>
<li><strong>What makes it special:</strong> Crater Camp is the ultimate Kilimanjaro experience. You sleep beside glaciers that have existed for 11,000 years, inside the caldera of a volcano, above 99.9% of the African continent. The night sky from the crater — at 5,729 metres, above virtually all atmospheric moisture and light pollution — is arguably the best stargazing on the planet. Sunrise illuminating the inner crater walls, the ash pit, and the retreating glaciers is a sight that fewer than 500 people witness each year. It is harsh, uncomfortable, and absolutely unforgettable.</li>
</ul>

<h2>How to Choose Your Route by Camp Quality</h2>

<p>If camp experience matters to you — and after 800+ expeditions, we can tell you it should — here is how the routes compare:</p>

<ul>
<li><strong>Best overall camp experience:</strong> <strong>Lemosho Route.</strong> Starts with the quiet beauty of Mti Mkubwa, crosses the epic Shira Plateau, descends to the dramatic Barranco Valley, and ascends via Karanga for optimal acclimatisation. Every camp offers something distinct.</li>
<li><strong>Most comfortable camps:</strong> <strong>Marangu Route.</strong> Hut accommodation with beds, dining halls, and flush toilets at Mandara and Horombo. But Kibo Hut at high altitude is draughty and uncomfortable, and the route has the lowest summit success rate because the shorter itinerary does not allow adequate acclimatisation.</li>
<li><strong>Most dramatic camps:</strong> <strong>Machame Route.</strong> Machame Camp's rainforest setting, Shira's plateau sunsets, and the Barranco Wall morning scramble create a sequence of memorable camps. However, higher traffic means busier camp sites.</li>
<li><strong>Quietest camps:</strong> <strong>Northern Circuit.</strong> The north-side camps (Pofu, Third Cave, School Hut) see a fraction of the traffic of southern routes. If you want the mountain to yourself, this 8-9 day route delivers.</li>
</ul>

<h2>Camp Comfort Tips from Our Guides</h2>

<p>After sleeping on Kilimanjaro more than 5,000 nights combined, our guide team has refined camp comfort into a science. Here are their top recommendations:</p>

<ul>
<li><strong>Arrive early:</strong> First teams to camp get the flattest, most sheltered tent spots. Our strategy is to depart camp each morning by 7:30 AM, which typically gets us to the next camp by 1-3 PM — prime pitch selection.</li>
<li><strong>Carry a sleeping bag liner:</strong> It adds 5-8 degrees of warmth and keeps your sleeping bag clean. At Barafu and Kibo, a silk or fleece liner can mean the difference between shivering all night and getting 2-3 hours of actual sleep.</li>
<li><strong>Use earplugs:</strong> Camps are noisy. Porters singing, neighbouring groups arriving late, wind flapping tent fabric. Earplugs are the cheapest upgrade to your sleep quality on the mountain. Check our full <a href="/kilimanjaro-climbing-gear/">gear recommendations</a> for other camp comfort items.</li>
<li><strong>Hydrate before bed:</strong> Drink 500 ml of warm water before sleeping. Yes, you will need to get up at 2 AM to use the latrine. But proper hydration at altitude reduces headaches, improves sleep quality, and aids acclimatisation — the trade-off is worth it.</li>
<li><strong>Hot water bottle in your sleeping bag:</strong> Ask your crew for a Nalgene bottle filled with boiling water. Place it at your feet inside your sleeping bag. It radiates warmth for 4-5 hours and transforms cold nights at Barafu and Karanga from miserable to manageable.</li>
<li><strong>Explore the surroundings:</strong> After arriving at camp, take a short 20-30 minute walk around the vicinity. This aids acclimatisation (the "walk high, sleep low" principle in miniature) and often reveals viewpoints, flora, and photo opportunities that tent-bound climbers miss entirely.</li>
</ul>

<p>For detailed route descriptions including day-by-day camp schedules and elevation profiles, visit our <a href="/trekking/">trekking routes guide</a>. To understand how weather and seasons affect camp conditions — rain at Machame Camp, wind on the Shira Plateau, extreme cold at Barafu — read our <a href="/best-time-to-climb-kilimanjaro/">best time to climb Kilimanjaro</a> guide. To book a Kilimanjaro expedition on any route, see our <a href="/climbing-kilimanjaro/">Kilimanjaro page</a> for group departure dates and <a href="/kilimanjaro-prices/">current pricing</a>. If you want advice on which route — and therefore which camps — best match your fitness level and experience, <a href="/climbing-kilimanjaro/">contact our team</a> for a personalised recommendation based on your travel dates and goals.</p>
`;

/* ------------------------------------------------------------------ */
/*  Posts array                                                        */
/* ------------------------------------------------------------------ */
const posts = [
  {
    slug: "kilimanjaro-flat-land-training",
    title:
      "Train for Kilimanjaro Without Mountains: Flat-Land Workout Guide",
    metaTitle: "Kilimanjaro Flat-Land Training: 12-Week Plan",
    metaDescription:
      "Train for Kilimanjaro without mountains. 12-week flat-land plan: stair climbing, incline treadmill, rucking, step machines. Proven by 800+ expeditions.",
    excerpt:
      "A complete 12-week Kilimanjaro training programme for climbers who live in flat areas. Covers stair climbing in buildings, stadiums, and parking garages, incline treadmill protocols at 15% gradient, loaded rucksack walking, step machines, indoor cycling for hill simulation, mental preparation strategies, and a weekly workout schedule table.",
    content: post1Content,
    categorySlug: "kilimanjaro",
    categoryName: "Kilimanjaro",
    tags: [
      { name: "Kilimanjaro Training", slug: "kilimanjaro-training" },
      { name: "Fitness", slug: "fitness" },
      { name: "Flat Land Training", slug: "flat-land-training" },
    ],
  },
  {
    slug: "kilimanjaro-best-camps",
    title:
      "Best Camps on Kilimanjaro: Where You Sleep at Every Elevation",
    metaTitle: "Best Kilimanjaro Camps: Every Route & Elevation",
    metaDescription:
      "Guide to every Kilimanjaro camp: Machame, Shira, Barranco, Karanga, Barafu, Crater Camp, Mandara, Horombo, Kibo, Mti Mkubwa. Facilities and tips.",
    excerpt:
      "A comprehensive guide to every major camp on Kilimanjaro across all routes. Covers Machame Camp (3,020m), Mandara Hut (2,720m), Mti Mkubwa (2,750m), Shira Camp (3,840m), Horombo Hut (3,720m), Barranco Camp (3,960m), Karanga Camp (3,995m), Barafu Camp (4,673m), Kibo Hut (4,703m), and Crater Camp (5,729m). Includes facilities, route assignments, and camp comfort tips.",
    content: post2Content,
    categorySlug: "kilimanjaro",
    categoryName: "Kilimanjaro",
    tags: [
      { name: "Kilimanjaro Camps", slug: "kilimanjaro-camps" },
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
        publishedAt: new Date("2026-06-19"),
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
}

main().catch(console.error).finally(() => prisma.$disconnect());
