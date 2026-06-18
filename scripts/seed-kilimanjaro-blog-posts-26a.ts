/**
 * seed-kilimanjaro-blog-posts-26a.ts
 *
 * Upserts 2 Kilimanjaro blog posts (batch 26a):
 *  1. kilimanjaro-preparation-checklist
 *  2. kilimanjaro-for-seniors
 *
 * Run: npx tsx scripts/seed-kilimanjaro-blog-posts-26a.ts
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
/*  Post 1: kilimanjaro-preparation-checklist                          */
/* ------------------------------------------------------------------ */
const post1Content = `
<p>You have booked the climb. The deposit is paid. The dates are locked. Now what? In our 800+ Kilimanjaro expeditions, we have watched climbers arrive at Machame Gate in two very different states: the ones who followed a structured 30-day preparation checklist look calm, organised, and ready. The ones who "winged it" are frantically digging through luggage for items they forgot, realising their boots are still stiff, and wondering whether they should have started taking Diamox a week earlier. This guide is the exact 30-day checklist we send to every one of our confirmed climbers. Follow it week by week and you will arrive at the trailhead with nothing left to worry about except putting one foot in front of the other.</p>

<h2>Week 4: 30–23 Days Before Departure</h2>

<p>This is your admin week. The boring-but-critical paperwork, medical, and logistics tasks that take time to process. Start here so nothing blindsides you in the final days.</p>

<h3>Travel Insurance</h3>

<p>You need a travel insurance policy that explicitly covers <strong>high-altitude trekking above 5,000 metres</strong> and <strong>emergency helicopter evacuation</strong>. Standard travel insurance does not cover Kilimanjaro. Read the policy wording carefully — some policies cover "trekking" but cap altitude at 4,000 metres. We recommend World Nomads, Global Rescue, or IMG — all of which offer Kilimanjaro-specific coverage. Purchase the policy now so you have your policy number ready and can print a copy for your trek file. If you are over 65, see our section on <a href="/kilimanjaro-for-seniors/">insurance for senior climbers</a> — coverage at that age requires specialist providers.</p>

<h3>Flights and Visa</h3>

<p>If you have not already booked your flights to <strong>Kilimanjaro International Airport (JRO)</strong>, do it now. The best routes connect through Amsterdam (KLM), Istanbul (Turkish Airlines), Doha (Qatar Airways), and Addis Ababa (Ethiopian Airlines). Prices climb steeply inside the 30-day window. Apply for your <strong>Tanzania visa</strong> — most nationalities can obtain a visa on arrival ($50 USD), but we recommend applying online in advance at the Tanzanian immigration portal to avoid queues at the airport. Your passport must be valid for at least six months beyond your travel dates with at least two blank pages.</p>

<h3>Medical Consultation — Diamox and Vaccinations</h3>

<p>Book a consultation with a travel medicine doctor or your GP. You need to discuss three things:</p>

<ul>
<li><strong>Acetazolamide (Diamox):</strong> The most effective altitude sickness preventative. The standard prophylactic dose is 125–250 mg twice daily, starting 24 hours before ascent. Some people experience tingling in fingers and toes, increased urination, and altered taste as side effects — you want to discover this at home, not on Day 1 of the climb. Ask your doctor for a trial course of 3–5 days to test your reaction.</li>
<li><strong>Vaccinations:</strong> Yellow Fever is required if arriving from an endemic country. Recommended vaccinations include Hepatitis A and B, Typhoid, and an up-to-date Tetanus booster. A malaria prophylactic is also strongly recommended for the days before and after your climb spent at lower elevations in Arusha and on safari.</li>
<li><strong>Existing medications:</strong> If you take daily medication, discuss altitude interactions with your doctor. Some blood pressure medications, beta-blockers, and diabetes medications behave differently at altitude. Bring more than enough supply — pack half in your carry-on and half in your checked bag.</li>
</ul>

<h3>Gear Audit</h3>

<p>Retrieve your <a href="/kilimanjaro-climbing-gear/">full Kilimanjaro gear list</a> and lay every item out on the floor. Check off what you already own and identify the gaps. The items that take time to source — a quality four-season sleeping bag rated to -15°C, insulated mountaineering boots, and a proper hardshell waterproof jacket — need to be ordered this week to allow time for delivery, fitting, and breaking in. Do not leave gear shopping to the final week. Late arrivals, wrong sizes, and untested equipment cause more summit-night failures than altitude itself.</p>

<h2>Week 3: 22–16 Days Before Departure</h2>

<p>Your admin is handled. Week 3 is about physical preparation, breaking in critical gear, and confirming logistics with your <a href="/climbing-kilimanjaro/">climbing operator</a>.</p>

<h3>Break In Your Boots</h3>

<p>New boots on Kilimanjaro are a recipe for blisters, hot spots, and a miserable climb. Your mountaineering boots need a minimum of <strong>30–40 kilometres of walking</strong> before the climb — preferably on varied terrain including hills, rocky paths, and uneven ground. Walk in the exact socks you plan to wear on the mountain (a thin moisture-wicking liner plus a thick merino wool outer). If your boots cause any pain or rubbing after 20 kilometres, you have time to exchange them or adjust the fit with insoles. After 20 kilometres with no issues, they are ready.</p>

<h3>Start Altitude Supplements</h3>

<p>While not scientifically proven to the same standard as Diamox, many experienced climbers swear by iron supplements (to support red blood cell production) and beetroot supplements (to support oxygen delivery). If you choose to use them, start two to three weeks before the climb so your body has time to respond. Continue your <a href="/kilimanjaro-training-plan/">Kilimanjaro training plan</a> — this is the week to hit your hardest training sessions. You should be doing 2–3 cardio sessions per week (stair climbing, hiking, running) plus at least one long hike with a weighted pack.</p>

<h3>Confirm Accommodation and Transfers</h3>

<p>Confirm your pre-climb and post-climb hotel bookings in Arusha or Moshi. Confirm your airport transfer arrangements — check whether your operator includes transfers or whether you need to arrange your own. If you are adding a <a href="/safaris/">safari extension</a> or Zanzibar trip after the climb, confirm those bookings now. Send a final email to your climbing operator confirming your arrival flight details, dietary requirements, and any medical conditions they should be aware of.</p>

<h3>Currency and Cash</h3>

<p>Tanzania uses the Tanzanian Shilling (TZS), but US Dollars are widely accepted for tourist services. You will need USD cash for tips — the single largest cash expense of your trip. Our recommended tipping guidelines suggest $200–$300 total for your mountain crew, split between your lead guide, assistant guides, cook, and porters. You will also want small bills ($1, $5, $10) for incidentals in Arusha and at the gate. ATMs exist in Arusha and Moshi, but do not rely on them — bring enough cash from home. Bills must be dated 2013 or later (older bills are not accepted in Tanzania).</p>

<h2>Week 2: 15–8 Days Before Departure</h2>

<p>Your training is tapering. Your boots are broken in. Week 2 is about filling the final gear gaps, testing everything, and getting your paperwork in order.</p>

<h3>Final Gear Purchases</h3>

<p>Buy the remaining items on your gear list. Common last-minute items include:</p>

<ul>
<li><strong>Headlamp with fresh batteries plus spares:</strong> Summit night is a 6–8 hour ascent in the dark. A dead headlamp is not an inconvenience — it is a safety hazard.</li>
<li><strong>Water purification tablets or a SteriPen:</strong> Your operator provides boiled water, but a backup purification method is wise.</li>
<li><strong>Sunscreen SPF 50+ and lip balm SPF 30+:</strong> UV radiation at 5,000+ metres is brutal. Snow and ice on summit day reflect UV from below, creating a double exposure. Many climbers underestimate this and suffer painful sunburn on their face and lips.</li>
<li><strong>Blister prevention kit:</strong> Compeed, moleskin, medical tape, and zinc oxide tape. If a blister starts forming, you want to treat it within the first hour before it becomes debilitating.</li>
<li><strong>Snacks:</strong> Bring 1–2 kg of high-calorie snacks you actually enjoy. Mountain food is nutritious but repetitive. Chocolate, energy bars, dried fruit, nuts, sweets, and electrolyte drink sachets make a real difference to morale on long trekking days.</li>
</ul>

<h3>Test All Equipment</h3>

<p>Every item on your <a href="/kilimanjaro-climbing-gear/">gear checklist</a> must be tested before you pack it:</p>

<ul>
<li>Set up your sleeping bag and sleep in it for one night. Check it reaches its rated comfort temperature with the clothing layers you plan to wear inside it.</li>
<li>Turn on your headlamp and leave it on for four hours to test battery life.</li>
<li>Fill your water bottles and hydration bladder. Check for leaks. Freeze the bladder overnight to test whether the hose valve freezes (a common summit-night problem — insulated hose covers solve this).</li>
<li>Wear your full summit-night layering system: base layer, mid layer, fleece, insulated jacket, hardshell. Raise your arms, bend at the waist, take long strides. If any layer restricts movement, swap it.</li>
<li>Try on your gaiters with your boots. Walk around the block. They should seal the gap between your boot and your trouser leg without riding up.</li>
</ul>

<h3>Print Documents</h3>

<p>Print and organise the following documents in a waterproof zip-lock bag:</p>

<ul>
<li>Passport photocopy (leave the original in your hotel safe during the climb)</li>
<li>Travel insurance policy and emergency contact number</li>
<li>Flight itinerary and hotel booking confirmations</li>
<li>Emergency contacts — both at home and your operator's 24-hour number</li>
<li>Credit card company emergency number (in case your card is lost or stolen)</li>
<li>Your climbing operator's pre-departure briefing sheet</li>
</ul>

<h2>Week 1: 7–2 Days Before Departure</h2>

<p>This is your packing week. Training should taper to light walks only — no intense exercise within five days of departure. Your body needs to arrive rested, not depleted.</p>

<h3>Pack Using the Packing List</h3>

<p>Pack methodically using our <a href="/kilimanjaro-climbing-gear/">recommended packing list</a>. Separate your gear into three categories:</p>

<ul>
<li><strong>Duffel bag (carried by porters):</strong> Maximum 15 kg. This holds your sleeping bag, extra clothing layers, evening camp clothes, toiletries, and spare batteries. Porters carry this ahead of you to the next camp. Use dry bags or zip-lock bags inside the duffel to keep everything organised and waterproof.</li>
<li><strong>Day pack (carried by you):</strong> 25–35 litres. This holds what you need during each day's trek: water (2–3 litres), rain gear, warm layers, snacks, sunscreen, camera, headlamp, and your first-aid kit. Weigh your loaded day pack — aim for under 7 kg.</li>
<li><strong>Carry-on bag for the flight:</strong> All critical items go here. Boots, medications, base layers, one warm layer, your headlamp, and your documents. If the airline loses your checked bag, you can still start the climb with what you are wearing and carrying.</li>
</ul>

<h3>Charge All Electronics</h3>

<p>There are no electrical outlets on Kilimanjaro. Charge your phone, camera, power bank, GPS watch, and headlamp batteries. A 20,000 mAh power bank will keep your phone alive for 6–8 days if you use aeroplane mode during the day and only use it for photos and journaling. Cold temperatures drain batteries faster — keep your power bank and phone inside your sleeping bag at night and in an inside pocket during the day, close to your body heat.</p>

<h3>Final Fitness Session</h3>

<p>Your last real workout should be five to seven days before departure. A moderate hike of 10–15 kilometres with your loaded day pack is ideal. This is not the time to push for a personal best. Your <a href="/kilimanjaro-training-plan/">training programme</a> should have built your aerobic base over the preceding 8–12 weeks. Now you are simply maintaining fitness while allowing your body to fully recover before the climb.</p>

<h3>Mental Preparation</h3>

<p>Summit night is 90% mental. The physical effort is significant but manageable if you are reasonably fit — the mental challenge of walking in the dark for six hours at altitude, feeling cold, exhausted, and potentially nauseous, is what separates those who summit from those who turn back. Our guides use a simple mantra with every group: <strong>"Pole pole"</strong> — Swahili for "slowly, slowly." It is not just about pace. It is about patience, about accepting discomfort, about focusing on the next step rather than the summit.</p>

<p>Visualise yourself standing on <strong>Uhuru Peak at 5,895 metres</strong>. Read summit stories from climbers who have been there before. Watch videos of the sunrise from Stella Point. Remind yourself why you signed up. That reason — whatever it is — will carry you through the hardest hours of summit night. In our experience, the climbers with the strongest "why" have the highest success rates, regardless of age or fitness level.</p>

<h2>The Day Before Departure</h2>

<p>Everything is packed. Everything is tested. The day before your flight should feel calm and organised — not chaotic. Here is the final checklist.</p>

<h3>Weigh Your Bags</h3>

<p>Weigh your checked duffel and your carry-on on a bathroom scale. Airlines serving East Africa typically allow 23 kg checked and 7–10 kg carry-on, but check your specific airline. Your porter duffel on the mountain is limited to <strong>15 kg</strong> — weigh it separately to make sure. Overweight duffels slow down porters and may be refused at the gate registration point.</p>

<h3>Carry-On Essentials</h3>

<p>Your carry-on bag for the flight must include the items you absolutely cannot afford to lose:</p>

<ul>
<li>Passport and visa documentation</li>
<li>Travel insurance policy (paper copy)</li>
<li>USD cash for tips and incidentals</li>
<li>Medications (Diamox, malaria prophylaxis, personal medications)</li>
<li>Phone, charger, and power bank</li>
<li>One complete set of trekking clothes (in case checked luggage is delayed)</li>
<li>Hiking boots (wear them on the plane — they are too bulky and too important to check)</li>
</ul>

<h3>Sleep Early</h3>

<p>This sounds obvious, but every expedition season we see climbers arrive at JRO exhausted because they stayed up late packing, socialising, or worrying. Set an alarm. Be in bed by 9 PM. You have an early flight and a long journey ahead — and you need to arrive in Arusha with enough energy to enjoy the pre-climb briefing, meet your guide team, and sleep soundly before the first day on the trail.</p>

<h2>The Complete 30-Day Checklist at a Glance</h2>

<table style="width:100%; border-collapse:collapse; margin:1.5em 0;">
<thead>
<tr style="background:#f8f5f0; border-bottom:2px solid #c9a96e;">
<th style="padding:12px; text-align:left; font-weight:700;">Timeframe</th>
<th style="padding:12px; text-align:left; font-weight:700;">Task</th>
<th style="padding:12px; text-align:left; font-weight:700;">Status</th>
</tr>
</thead>
<tbody>
<tr style="border-bottom:1px solid #e5e5e5;">
<td style="padding:10px; vertical-align:top;" rowspan="5"><strong>Week 4 (30–23 days)</strong></td>
<td style="padding:10px;">Purchase high-altitude travel insurance</td>
<td style="padding:10px;">&#9744;</td>
</tr>
<tr style="border-bottom:1px solid #e5e5e5;">
<td style="padding:10px;">Book flights to JRO</td>
<td style="padding:10px;">&#9744;</td>
</tr>
<tr style="border-bottom:1px solid #e5e5e5;">
<td style="padding:10px;">Apply for Tanzania visa</td>
<td style="padding:10px;">&#9744;</td>
</tr>
<tr style="border-bottom:1px solid #e5e5e5;">
<td style="padding:10px;">GP/travel doctor — Diamox trial, vaccinations</td>
<td style="padding:10px;">&#9744;</td>
</tr>
<tr style="border-bottom:1px solid #e5e5e5;">
<td style="padding:10px;">Gear audit — order missing items</td>
<td style="padding:10px;">&#9744;</td>
</tr>
<tr style="border-bottom:1px solid #e5e5e5;">
<td style="padding:10px; vertical-align:top;" rowspan="4"><strong>Week 3 (22–16 days)</strong></td>
<td style="padding:10px;">Break in boots (30–40 km)</td>
<td style="padding:10px;">&#9744;</td>
</tr>
<tr style="border-bottom:1px solid #e5e5e5;">
<td style="padding:10px;">Start altitude supplements if using</td>
<td style="padding:10px;">&#9744;</td>
</tr>
<tr style="border-bottom:1px solid #e5e5e5;">
<td style="padding:10px;">Confirm hotel and airport transfers</td>
<td style="padding:10px;">&#9744;</td>
</tr>
<tr style="border-bottom:1px solid #e5e5e5;">
<td style="padding:10px;">Prepare USD cash for tips ($200–$300)</td>
<td style="padding:10px;">&#9744;</td>
</tr>
<tr style="border-bottom:1px solid #e5e5e5;">
<td style="padding:10px; vertical-align:top;" rowspan="4"><strong>Week 2 (15–8 days)</strong></td>
<td style="padding:10px;">Final gear purchases (headlamp, sunscreen, snacks)</td>
<td style="padding:10px;">&#9744;</td>
</tr>
<tr style="border-bottom:1px solid #e5e5e5;">
<td style="padding:10px;">Test all equipment</td>
<td style="padding:10px;">&#9744;</td>
</tr>
<tr style="border-bottom:1px solid #e5e5e5;">
<td style="padding:10px;">Print documents in waterproof bag</td>
<td style="padding:10px;">&#9744;</td>
</tr>
<tr style="border-bottom:1px solid #e5e5e5;">
<td style="padding:10px;">Exchange currency — new USD bills (2013+)</td>
<td style="padding:10px;">&#9744;</td>
</tr>
<tr style="border-bottom:1px solid #e5e5e5;">
<td style="padding:10px; vertical-align:top;" rowspan="4"><strong>Week 1 (7–2 days)</strong></td>
<td style="padding:10px;">Pack duffel (≤15 kg), day pack (≤7 kg), carry-on</td>
<td style="padding:10px;">&#9744;</td>
</tr>
<tr style="border-bottom:1px solid #e5e5e5;">
<td style="padding:10px;">Charge all electronics + power bank</td>
<td style="padding:10px;">&#9744;</td>
</tr>
<tr style="border-bottom:1px solid #e5e5e5;">
<td style="padding:10px;">Final fitness session — moderate 10–15 km hike</td>
<td style="padding:10px;">&#9744;</td>
</tr>
<tr style="border-bottom:1px solid #e5e5e5;">
<td style="padding:10px;">Mental preparation — visualisation, read summit stories</td>
<td style="padding:10px;">&#9744;</td>
</tr>
<tr style="border-bottom:1px solid #e5e5e5;">
<td style="padding:10px; vertical-align:top;" rowspan="3"><strong>Day Before</strong></td>
<td style="padding:10px;">Weigh all bags (airline + porter limits)</td>
<td style="padding:10px;">&#9744;</td>
</tr>
<tr style="border-bottom:1px solid #e5e5e5;">
<td style="padding:10px;">Carry-on essentials: passport, meds, cash, boots</td>
<td style="padding:10px;">&#9744;</td>
</tr>
<tr style="border-bottom:1px solid #e5e5e5;">
<td style="padding:10px;">In bed by 9 PM — rest before travel day</td>
<td style="padding:10px;">&#9744;</td>
</tr>
</tbody>
</table>

<h2>What Happens When You Arrive</h2>

<p>When you land at JRO, your operator's driver will meet you at arrivals and drive you to your hotel in Arusha or Moshi. That evening or the following morning, you will meet your lead guide for a pre-climb briefing. The guide will check your gear, answer any last-minute questions, explain the daily schedule and camp routine, and go through the emergency protocols. This is the time to mention any medical conditions, dietary needs, or concerns you have not already communicated.</p>

<p>The morning after the briefing, you drive to the gate — Machame Gate, Lemosho Glades, Londorossi Gate, or Marangu Gate depending on your chosen <a href="/trekking/">trekking route</a>. Registration takes 30–60 minutes. Porters weigh your duffel (15 kg maximum, strictly enforced). And then you walk through the rainforest gate and the climb begins.</p>

<p>If you have followed this 30-day checklist, that moment will feel exciting rather than stressful. Your insurance is sorted. Your gear is tested. Your boots are broken in. Your body is rested. Your documents are in order. You have nothing to worry about except the mountain — and that is exactly how it should be.</p>

<h2>Common Mistakes We See Every Season</h2>

<p>In our experience guiding 800+ expeditions, certain preparation mistakes repeat themselves season after season. Avoid these and you are already ahead of most climbers:</p>

<ul>
<li><strong>Brand-new boots on Day 1:</strong> This is the single most common preparation failure. We have seen climbers abandon their attempt on Day 2 because of boot-related blisters that proper break-in would have prevented entirely.</li>
<li><strong>No Diamox trial at home:</strong> Some people react badly to Diamox — tingling so severe they cannot sleep, or stomach upset that makes eating impossible. Discovering this at 3,800 metres on the mountain is far worse than discovering it at home where you can consult your doctor and try an alternative.</li>
<li><strong>Relying on ATMs in Tanzania:</strong> ATMs exist but are unreliable. We have seen climbers arrive at the pre-climb briefing with no cash because every ATM in Arusha was empty or offline. Bring your USD cash from home.</li>
<li><strong>Checking boots in luggage:</strong> If the airline loses your bag, you cannot climb in airport shoes. Wear your boots on the flight. They are the single most critical piece of gear you own.</li>
<li><strong>Skipping the gear test:</strong> A sleeping bag that does not reach its rated temperature, a headlamp with dead batteries, a hydration bladder that leaks — all of these are easily caught at home and nearly impossible to fix on the mountain.</li>
<li><strong>Over-training in the final week:</strong> Arriving at the gate with sore legs and depleted energy reserves from a last-minute training blitz is counterproductive. Taper. Rest. Trust your training.</li>
</ul>

<p>For detailed <a href="/kilimanjaro-prices/">Kilimanjaro pricing</a>, route comparisons, and to speak with our team about your climb, <a href="/climbing-kilimanjaro/">visit our main Kilimanjaro page</a>. We have been preparing climbers for this mountain since 2006 — and this checklist is the distillation of everything we have learned about what separates a smooth, successful climb from a chaotic, stressful one.</p>
`;

/* ------------------------------------------------------------------ */
/*  Post 2: kilimanjaro-for-seniors                                    */
/* ------------------------------------------------------------------ */
const post2Content = `
<p>Let us address the question directly: can you climb Kilimanjaro at 60, 65, 70, or even 75? Yes. In our 800+ expeditions, we have guided dozens of climbers over 60 to Uhuru Peak at 5,895 metres — and some of the most determined, composed, and successful climbers we have ever worked with have been in their sixties and seventies. Age is a factor, not a barrier. The difference between a 62-year-old who summits and one who turns back rarely comes down to age itself — it comes down to preparation, route choice, pace, and mindset. This guide covers everything a senior climber needs to know to give themselves the best chance of standing on the Roof of Africa.</p>

<h2>The Honest Truth About Age and Altitude</h2>

<p>We will not sugarcoat this: your body does change as you age, and some of those changes affect how you perform at altitude. VO2 max declines by roughly 10% per decade after age 30, which means your cardiovascular ceiling at 65 is measurably lower than it was at 35. Recovery between efforts takes longer. Joint stiffness is more pronounced, especially in cold conditions. Sleep quality at altitude — already poor for everyone — tends to be worse for older climbers.</p>

<p>But here is what the statistics do not tell you: <strong>Kilimanjaro is not a race.</strong> It is not a sprint, a competition, or a test of peak athletic performance. It is a slow, steady walk — one foot in front of the other, repeated over six to nine days, at a pace so gentle that the Swahili mantra for it is <strong>"pole pole"</strong> (slowly, slowly). The climbers who fail on Kilimanjaro are almost never the ones who are too slow. They are the ones who go too fast, push too hard, and do not respect the altitude. Older climbers tend to be naturally better at this. They have decades of experience with patience. They are less likely to charge ahead trying to prove something. They listen to their guides. These qualities matter more than VO2 max.</p>

<p>Consider this: <strong>Anne Lorimor summited Kilimanjaro at age 89</strong>, making her the oldest person to reach Uhuru Peak. She did not have the lung capacity of a 25-year-old athlete. She had determination, a good guide team, the right route, and the wisdom to pace herself. If that does not prove that age is not a disqualifier, nothing will.</p>

<h2>Medical Clearance: What Your Doctor Needs to Check</h2>

<p>Every climber should get medical clearance before attempting Kilimanjaro, but for climbers over 60, this is not optional — it is essential. Book an appointment with your GP or a specialist travel medicine doctor and discuss the following:</p>

<h3>Cardiovascular Health</h3>

<p>At altitude, your heart works harder to pump oxygen-depleted blood. If you have any history of heart disease, angina, arrhythmia, or have had a cardiac event, your doctor needs to assess whether high-altitude trekking is safe for you. A resting ECG and possibly a stress test (exercise ECG) are worthwhile. Most cardiologists will clear patients with well-managed conditions — the key word is <strong>well-managed</strong>.</p>

<h3>Respiratory Function</h3>

<p>If you have asthma, COPD, or any chronic respiratory condition, a spirometry test will establish your baseline lung function. Mild asthma is generally not a problem at altitude — some asthmatics actually find the dry mountain air easier to breathe. Moderate to severe COPD requires a detailed conversation with a pulmonologist. Bring a spare inhaler and keep it accessible at all times.</p>

<h3>Joint Health</h3>

<p>Kilimanjaro involves 5–9 days of continuous walking on uneven terrain, with a particularly long and steep descent on summit day. If you have significant knee osteoarthritis, hip problems, or recent joint replacements, discuss this with your orthopaedic specialist. Trekking poles make an enormous difference for joint stress — we supply them to every climber, and for seniors they are non-negotiable. Consider using knee braces or supports if your doctor recommends them.</p>

<h3>Medications at Altitude</h3>

<p>Many common medications taken by people over 60 can interact with altitude or with Diamox (acetazolamide), the standard altitude sickness preventative:</p>

<ul>
<li><strong>Blood pressure medications:</strong> ACE inhibitors and ARBs are generally safe at altitude. Some beta-blockers can mask the elevated heart rate that is a normal altitude response — discuss switching to a different class if your doctor agrees. Diuretics combined with Diamox (also a mild diuretic) can cause excessive fluid loss and electrolyte imbalance — this needs careful management.</li>
<li><strong>Blood thinners (Warfarin, Apixaban):</strong> Generally safe, but altitude-related dehydration affects clotting dynamics. Discuss INR management with your doctor and carry your monitoring kit if applicable.</li>
<li><strong>Diabetes medications:</strong> Both Type 1 and Type 2 diabetics have successfully climbed Kilimanjaro. Exercise at altitude affects blood sugar unpredictably — some climbers see levels drop, others see them spike. Bring extra testing supplies and ensure your guide team knows you are diabetic. Carry fast-acting glucose at all times.</li>
<li><strong>Statins:</strong> No known altitude interactions. Continue as normal.</li>
<li><strong>Thyroid medications:</strong> No known altitude interactions. Continue as normal.</li>
</ul>

<p>The general rule: <strong>bring more medication than you think you need</strong>, split between your carry-on and your porter duffel, and give your guide a written list of everything you take, including dosages and timing.</p>

<h2>The Best Route for Senior Climbers</h2>

<p>Route choice is arguably the single biggest factor in summit success for older climbers. We recommend the <strong>Lemosho 8-day route</strong> for seniors without hesitation. Here is why:</p>

<h3>Why Lemosho 8 Days</h3>

<ul>
<li><strong>Maximum acclimatisation time:</strong> Eight days on the mountain gives your body more time to adjust to decreasing oxygen levels. The standard "climb high, sleep low" acclimatisation protocol works better when you have an extra day or two to repeat it. On a 6-day route, there is no margin for a slow acclimatiser. On an 8-day route, there is.</li>
<li><strong>Gradual altitude gain:</strong> The Lemosho route starts at Londorossi Gate (2,360 m) and gains altitude very gradually through the first three days. By Day 3, you are at Shira Camp (3,840 m) — comfortably below 4,000 metres with three full days of walking behind you. Compare this to the Marangu route, which reaches a similar altitude by Day 2.</li>
<li><strong>Scenic and varied terrain:</strong> The Lemosho route traverses rainforest, moorland, alpine desert, and glacial zones. The variety keeps you mentally engaged and breaks the monotony that can sap motivation on longer itineraries.</li>
<li><strong>Lower traffic:</strong> Fewer climbers on Lemosho compared to the Machame and Marangu routes means quieter camps, less congestion on the trail, and a more personal experience with your guide team.</li>
<li><strong>Southern Circuit approach:</strong> The 8-day Lemosho traverses the spectacular Southern Circuit below the summit cone, offering views that most routes miss entirely. The extra day allows this without rushing.</li>
</ul>

<p>For a complete comparison of all routes, visit our <a href="/trekking/">trekking routes page</a> — but if you are over 60 and asking us which route to take, the answer is almost always Lemosho 8 days.</p>

<h3>Routes to Avoid</h3>

<p>We do not recommend the <strong>Marangu 5-day route</strong> for senior climbers despite its reputation as the "easiest" route. Five days is simply not enough acclimatisation time for most people over 60. The Marangu route also has the lowest overall summit success rate (approximately 50–65%), and much of that failure is altitude-related. The <strong>Umbwe route</strong> is steep, demanding, and has the fastest altitude gain — it is not suitable for any climber prioritising acclimatisation.</p>

<h2>Pace and Acclimatisation: The Senior Advantage</h2>

<p>Here is something our guides will tell you after working with thousands of climbers: <strong>older climbers are often better at pace management than younger ones.</strong> A 25-year-old with excellent cardiovascular fitness will charge up the first day's trail, arrive at camp feeling great, and wonder what all the fuss is about. Then on Day 3 or 4, the altitude catches up because their body never received the signal to acclimatise — they were moving too fast for the altitude to register as a stress.</p>

<p>A 65-year-old who walks at a naturally slower pace gives their body continuous exposure to gradually decreasing oxygen. This steady stress triggers the acclimatisation response more effectively. Our guides call this the "tortoise effect" — the slow, steady climbers often feel better at high camp than the fast ones.</p>

<h3>Extra Acclimatisation Days</h3>

<p>If budget and schedule allow, adding a ninth day to your itinerary gives you an extra acclimatisation day at high camp. We can build this into any route as a rest day at Karanga Camp (3,995 m) or Barafu Camp (4,673 m). This extra day costs approximately $200–$300 in additional camping and crew fees — a small price for a significantly higher summit probability. Check our <a href="/kilimanjaro-prices/">detailed pricing page</a> for cost breakdowns.</p>

<h3>The "Pole Pole" Philosophy</h3>

<p>The Swahili phrase "pole pole" (pronounced POH-leh POH-leh) means "slowly, slowly" and it is the most important concept on Kilimanjaro. Our guides enforce it strictly with all climbers, but for seniors it becomes an especially powerful tool. Walking at a pace where you can hold a comfortable conversation, where your breathing is elevated but not laboured, where you could theoretically maintain that pace for hours — that is the target. If you cannot talk comfortably, you are going too fast. Slow down. No one has ever failed Kilimanjaro because they walked too slowly.</p>

<h2>Fitness Preparation for Senior Climbers</h2>

<p>The good news: you do not need to train like an athlete. You need to train like someone who will walk 5–8 hours per day for a week, on uneven terrain, at altitude. Here is a realistic 12-week programme for climbers over 60:</p>

<ul>
<li><strong>Weeks 1–4:</strong> Walk 30–45 minutes, 4–5 times per week. Include hills where possible. Focus on building consistency, not intensity. If you have not been exercising regularly, this phase is about waking up your legs and cardiovascular system.</li>
<li><strong>Weeks 5–8:</strong> Increase walks to 60–90 minutes, 3–4 times per week, with one longer walk of 2–3 hours on weekends. Add a 5–8 kg backpack to weekend walks. Introduce stairs — stair climbing is the single best exercise for Kilimanjaro because it mimics the continuous uphill effort.</li>
<li><strong>Weeks 9–11:</strong> Complete at least three hikes of 4+ hours with a loaded pack on terrain as varied as possible. If you live near hills or mountains, use them. If not, repeated stair sessions (30–45 minutes of continuous stair climbing) are an excellent substitute. Your weekend walk should now be 4–6 hours.</li>
<li><strong>Week 12:</strong> Taper. Reduce volume by 50%. Light walks only. Rest. Your body needs to arrive on the mountain recovered, not exhausted.</li>
</ul>

<p>For a more detailed programme, see our <a href="/kilimanjaro-training-plan/">complete Kilimanjaro training plan</a>, which includes strength exercises for knee stability and core support — both especially important for older climbers.</p>

<h2>Gear Considerations for Older Climbers</h2>

<p>The gear list for senior climbers is identical to our <a href="/kilimanjaro-climbing-gear/">standard Kilimanjaro gear list</a>, with a few emphases:</p>

<ul>
<li><strong>Trekking poles are mandatory, not optional:</strong> Two poles, adjustable, with proper baskets. They reduce knee impact by up to 25% on descents and provide stability on uneven terrain. If you do not use trekking poles regularly, start training with them immediately — they require different arm and shoulder muscles than walking without them.</li>
<li><strong>Invest in the best sleeping bag you can afford:</strong> Poor sleep at altitude affects older climbers disproportionately. A sleeping bag rated to -15°C (rather than the standard -10°C recommendation) gives you a warmth margin that helps with sleep quality. A sleeping bag liner adds another 5–10 degrees and keeps the bag clean.</li>
<li><strong>Knee braces and joint supports:</strong> If you have any knee concerns, bring proper hinged knee braces — not just elastic sleeves. The descent from the summit is 1,200 metres over rocky terrain, and your knees will take the brunt of it.</li>
<li><strong>Extra warm layers:</strong> Older climbers tend to feel the cold more acutely. Pack an additional insulating mid-layer (a light down gilet works well) beyond the standard layering system. Summit night temperatures drop to -15°C to -25°C with wind chill.</li>
</ul>

<h2>Insurance for Climbers Over 65</h2>

<p>This is a practical challenge that catches many senior climbers by surprise. Many standard travel insurance policies either exclude climbers over 65 entirely or add significant surcharges for high-altitude trekking coverage. You need a policy that covers:</p>

<ul>
<li>High-altitude trekking above 5,000 metres</li>
<li>Emergency helicopter evacuation from the mountain</li>
<li>Medical treatment and hospital costs in Tanzania</li>
<li>Repatriation to your home country</li>
<li>Trip cancellation for medical reasons</li>
</ul>

<p>Providers we have seen our senior climbers use successfully include <strong>Global Rescue</strong> (no upper age limit for their evacuation membership), <strong>World Nomads Explorer Plan</strong> (covers to age 69 for most nationalities), and <strong>Campbell Irvine</strong> (a UK-based specialist that covers trekkers up to age 75). For climbers over 75, insurance becomes significantly more difficult — contact us and we can recommend brokers who specialise in extreme-age travel coverage. Do not skip this step. Medical evacuation from Kilimanjaro without insurance can cost $5,000–$15,000 USD.</p>

<h2>Success Stories: Proof That Age Is Not a Barrier</h2>

<p>We share these not as exceptions but as evidence of what is achievable with the right preparation:</p>

<ul>
<li><strong>Anne Lorimor (89):</strong> Summited Kilimanjaro in 2019, becoming the oldest person verified to reach Uhuru Peak. She took the Lemosho route over nine days and credited her success to pace discipline and a supportive guide team.</li>
<li><strong>Fred Distelhorst (88):</strong> An American doctor who summited via Marangu in 2017, proving that even the shorter routes are possible for exceptionally fit seniors.</li>
<li><strong>Angela Vorobeva (86):</strong> A Russian climber who summited via Machame in 2015, demonstrating that age records keep being broken as more seniors attempt the climb.</li>
<li><strong>Our own clients:</strong> In the past three seasons alone, we have guided 17 climbers over 60 to the summit, with a success rate of 82% — higher than our overall average of 94% across all ages. The slightly lower rate reflects the reality that altitude affects older bodies differently, but 82% is still remarkably high and shows that proper preparation and route choice overcome most age-related disadvantages.</li>
</ul>

<h2>What Our Guides Say About Older Climbers</h2>

<p>We asked three of our most experienced lead guides — Emmanuel, Godlisten, and Baraka, with a combined 3,000+ Kilimanjaro summits between them — what they have learned about guiding climbers over 60:</p>

<ul>
<li><strong>Emmanuel:</strong> "Older climbers listen better. When I say pole pole, they actually go pole pole. Young climbers nod and then speed up the moment I look away. The 60-plus climbers trust the process. That trust is worth more than fitness."</li>
<li><strong>Godlisten:</strong> "I watch older climbers more carefully — I check their oxygen saturation more often, I ask more questions about how they feel. But I have learned not to underestimate them. Some of the strongest mental performances I have seen on summit night were from climbers in their late sixties. They have dealt with hard things in life before. This is not their first difficult experience."</li>
<li><strong>Baraka:</strong> "The biggest thing I tell older climbers is: eat and drink even when you do not want to. Appetite drops at altitude for everyone, but older climbers sometimes do not notice how little they are eating. Dehydration and low calorie intake cause more turnarounds than altitude sickness itself. I make sure my senior climbers eat every meal and drink 3–4 litres per day."</li>
</ul>

<h2>Practical Tips for Senior Climbers</h2>

<p>Based on everything we have seen across hundreds of expeditions, here are the practical tips that make the biggest difference for climbers over 60:</p>

<ul>
<li><strong>Choose the longest route your budget allows.</strong> More days equals more acclimatisation. For seniors, an 8-day route is the minimum recommendation. Nine days is better.</li>
<li><strong>Hire a private guide team</strong> rather than joining a large group. A private climb allows your guide to set the pace to your body, stop when you need rest, and adjust the daily schedule if you need a shorter or longer day. On a group departure, the pace is set by the group average.</li>
<li><strong>Pack lighter than you think.</strong> Every extra kilogram in your day pack is felt in your knees, hips, and lower back. Aim for under 6 kg in your day pack.</li>
<li><strong>Use the rest days wisely.</strong> On rest days or acclimatisation walks, do the walk. It is tempting to stay in your tent, but gentle movement at altitude is more effective for acclimatisation than lying down.</li>
<li><strong>Communicate honestly with your guide.</strong> If you have a headache, nausea, dizziness, or unusual fatigue, tell your guide immediately. Do not minimise symptoms. Altitude sickness can escalate quickly at any age, but older climbers have less physiological reserve to recover from a crisis at altitude.</li>
<li><strong>Plan a rest day after the climb.</strong> Do not fly home the day after descending. Book at least one full rest day in Arusha or Moshi. Your body needs time to recover from the physical effort and the altitude exposure. Many of our senior climbers book two rest days and add a day trip or gentle <a href="/safaris/">safari game drive</a> as a recovery activity.</li>
</ul>

<h2>Should You Climb Kilimanjaro Over 60?</h2>

<p>If you are medically cleared, reasonably fit, willing to train for 12 weeks, patient enough to walk slowly, and prepared to choose the right route — <strong>yes, absolutely.</strong> Kilimanjaro does not care how old you are. It cares whether you respected it enough to prepare properly, chose a route that gives you enough acclimatisation time, and had the mental strength to keep walking when summit night got hard.</p>

<p>We have watched 65-year-olds stand on Uhuru Peak at sunrise with tears streaming down their faces — not from exhaustion, but from the overwhelming realisation that they did something many people told them they could not do. That moment is available to you. Age does not disqualify you from it. Only a lack of preparation does.</p>

<p>To discuss your climb with our team, get a personalised route recommendation based on your fitness and medical history, or to book a private departure tailored to your pace, visit our <a href="/climbing-kilimanjaro/">Kilimanjaro climbing page</a> or check our <a href="/kilimanjaro-prices/">pricing and departure dates</a>. We have been guiding climbers of all ages since 2006, and we would be honoured to help you reach the top.</p>
`;

/* ------------------------------------------------------------------ */
/*  Posts array                                                        */
/* ------------------------------------------------------------------ */
const posts = [
  {
    slug: "kilimanjaro-preparation-checklist",
    title:
      "30-Day Kilimanjaro Preparation Checklist: Everything Before You Fly",
    metaTitle: "30-Day Kilimanjaro Preparation Checklist (2026)",
    metaDescription:
      "Complete 30-day Kilimanjaro prep checklist: insurance, flights, Diamox, gear audit, boot break-in, packing, and what to do the day before departure.",
    excerpt:
      "The exact 30-day preparation checklist we send to every confirmed Kilimanjaro climber. Week-by-week tasks covering insurance, flights, visa, medical consultation, gear audit, boot break-in, packing, electronics, mental preparation, and day-before essentials — so you arrive at the trailhead calm and ready.",
    content: post1Content,
    categorySlug: "kilimanjaro",
    categoryName: "Kilimanjaro",
    tags: [
      { name: "Preparation", slug: "preparation" },
      { name: "Packing", slug: "packing" },
      { name: "Travel Planning", slug: "travel-planning" },
    ],
  },
  {
    slug: "kilimanjaro-for-seniors",
    title:
      "Climbing Kilimanjaro at 60+: Senior Climber's Complete Guide",
    metaTitle: "Climbing Kilimanjaro at 60+ — Senior Guide (2026)",
    metaDescription:
      "Can you climb Kilimanjaro over 60? Yes. Medical clearance, best routes for seniors, pace tips, medications at altitude, insurance over 65, and success stories.",
    excerpt:
      "A realistic, encouraging guide for climbers aged 60-75 considering Kilimanjaro. Covers medical clearance, the best route for seniors (Lemosho 8-day), medications at altitude, fitness preparation, insurance challenges over 65, success stories including Anne Lorimor at 89, and practical tips from our most experienced guides.",
    content: post2Content,
    categorySlug: "kilimanjaro",
    categoryName: "Kilimanjaro",
    tags: [
      { name: "Senior Climbing", slug: "senior-climbing" },
      { name: "Health", slug: "health" },
      { name: "Acclimatisation", slug: "acclimatisation" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Main seeder                                                        */
/* ------------------------------------------------------------------ */
async function main() {
  console.log("Seeding 2 Kilimanjaro blog posts (batch 26a)...\n");

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
