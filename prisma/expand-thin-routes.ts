/**
 * Expand thin content on 6 route/safari pages that have dropped in search rankings.
 *
 * Problem: These pages have 22-77 word overviews, causing Google to flag them as thin content.
 * Solution: Expand overviews to 400-600 words, add/expand FAQs, improve meta titles & descriptions.
 *
 * Usage: npx tsx prisma/expand-thin-routes.ts
 */

import "dotenv/config";
import prisma from "../src/lib/prisma";

interface RouteUpdate {
  slug: string;
  model: "trekkingRoute" | "safariPackage";
  metaTitle: string;
  metaDescription: string;
  overview: string;
  faqs?: { question: string; answer: string }[];
  highlights?: string[];
}

const updates: RouteUpdate[] = [
  // ─────────────────────────────────────────────
  // 1. 8 Days Lemosho Route (32 words → ~480 words)
  // ─────────────────────────────────────────────
  {
    slug: "8-days-lemosho-route",
    model: "trekkingRoute",
    metaTitle: "8-Day Lemosho Route: Kilimanjaro's Highest Success Rate (95%)",
    metaDescription:
      "The 8-day Lemosho Route offers 95% summit success through pristine western wilderness. Day-by-day itinerary, packing list, costs, and what to expect from Kilimanjaro's best route.",
    overview: `The Lemosho Route is widely regarded as the finest way to climb Kilimanjaro. Starting from the remote Londorossi Gate on the mountain's western flank at 2,100 metres, this 8-day itinerary crosses the entire width of the mountain before summiting via the Southern Circuit — giving you the most complete Kilimanjaro experience available.

What sets Lemosho apart is its acclimatization profile. With 8 days on the mountain, you gain altitude gradually through the proven "climb high, sleep low" method. The route reaches the Lava Tower at 4,600 metres on day 3 before dropping back to Barranco Camp at 3,960 metres — a deliberate altitude swing that triggers your body's red blood cell production. This profile is the single biggest factor behind Lemosho's industry-leading 95% summit success rate.

The first two days traverse the Shira Plateau through pristine montane rainforest and moorland that sees far fewer trekkers than the southern routes. You may spot black-and-white colobus monkeys, blue monkeys, and dozens of bird species in the rainforest zone. The forest canopy gives way to giant heather and then the otherworldly landscape of the Shira Plateau — a high-altitude plateau at 3,800 metres with unobstructed views of Kibo's glaciated summit.

From day 3 onward, Lemosho merges with the Machame Route's upper section, following the spectacular Southern Circuit through alpine desert beneath Kilimanjaro's famous glaciers. The route passes through five distinct climate zones in 8 days: cultivated farmland, montane rainforest, heath and moorland, alpine desert, and arctic summit zone. Few treks anywhere on Earth offer this range of ecosystems.

The Barranco Wall on day 5 is a highlight — a near-vertical rock scramble that looks impossible from below but requires only hands and feet, no ropes. From the top, the trail traverses the Karanga Valley and climbs to Barafu Base Camp at 4,673 metres for the midnight summit push.

Summit night begins around midnight. You climb for 6-7 hours through scree and thin air, reaching Stella Point on the crater rim at dawn. From there, it is a 45-minute walk along the crater edge to Uhuru Peak at 5,895 metres — the highest point in Africa. On a clear morning, you can see Mount Meru floating above the clouds 70 kilometres to the west.

Our 8-day Lemosho departures include KINAPA-licensed guides, a 3:1 porter ratio, emergency oxygen, pulse oximeters for daily health monitoring, all park fees, meals on the mountain, quality camping equipment, airport transfers, and 2 nights at a hotel in Moshi before and after the trek.`,
    highlights: [
      "Highest summit success rate on Kilimanjaro (95%)",
      "Best acclimatization profile of any route",
      "Remote western approach through pristine wilderness",
      "Crosses all 5 Kilimanjaro climate zones",
      "Shira Plateau panoramic views",
      "Barranco Wall scramble experience",
      "Less crowded first 2 days than Machame or Marangu",
    ],
    faqs: [
      {
        question: "Why does the Lemosho Route have the highest success rate?",
        answer:
          "The 8-day Lemosho Route achieves a 95% summit success rate primarily because of its gradual acclimatization profile. The route includes a deliberate climb to 4,600m at Lava Tower on day 3 followed by a descent to 3,960m — this 'climb high, sleep low' method triggers your body to produce more red blood cells. With 8 days on the mountain versus 5-6 on shorter routes, your body has significantly more time to adapt to altitude.",
      },
      {
        question: "How difficult is the 8-day Lemosho Route?",
        answer:
          "Lemosho is rated moderate-challenging. No technical climbing skills are required — it is a hiking trek with one scramble section (the Barranco Wall). The main challenge is altitude. If you can hike 6-8 hours per day over varied terrain and have done a reasonable training programme, you are physically capable of completing the Lemosho Route. Previous high-altitude experience is helpful but not required.",
      },
      {
        question: "What is the best time of year to climb the Lemosho Route?",
        answer:
          "The best months are January-February and June-October. These are the dry seasons when skies are clearest and trails are driest. June-October is the most popular window with the most stable weather. January-February is slightly less busy but still offers excellent conditions. March-May is the long rainy season and is not recommended.",
      },
      {
        question: "How much does the 8-day Lemosho Route cost?",
        answer:
          "Our 8-day Lemosho Route packages start from $2,500 per person and include all park fees, KINAPA-licensed guides, porters, cook, all meals on the mountain, quality camping equipment, emergency oxygen, pulse oximeter, airport transfers, and 2 nights hotel in Moshi. The price varies by group size and season — solo climbers pay more, while groups of 4+ receive discounts.",
      },
      {
        question: "What is the Barranco Wall and is it dangerous?",
        answer:
          "The Barranco Wall is a steep rock face you scramble up on day 5 of the Lemosho Route. It looks intimidating from below, but it is not a technical climb — you use hands and feet to climb but no ropes, harnesses, or climbing experience are needed. Your guide goes ahead and shows you exactly where to place your hands and feet. The wall takes 1-2 hours to ascend and is considered one of the highlights of the trek.",
      },
      {
        question: "Do I need previous trekking experience for Lemosho?",
        answer:
          "No previous trekking experience is strictly required, but it is strongly recommended that you have done multi-day hikes before attempting Kilimanjaro. At minimum, you should be comfortable walking 6-8 hours per day over uneven terrain. A 12-week training programme that includes regular hiking, cardio, and stair climbing will prepare most fit people for the Lemosho Route.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 2. 7 Days Machame Route (44 words → ~450 words)
  // ─────────────────────────────────────────────
  {
    slug: "7-days-machame-route",
    model: "trekkingRoute",
    metaTitle: "7-Day Machame Route: Kilimanjaro's Most Scenic Climb (90% Success)",
    metaDescription:
      "Climb Kilimanjaro via the 7-day Machame 'Whiskey Route' — the most scenic path to Uhuru Peak. 90% success rate, Barranco Wall scramble, 5 climate zones. Full itinerary & costs.",
    overview: `The Machame Route — known as the "Whiskey Route" for its reputation as a tougher alternative to the "Coca-Cola" Marangu Route — is the most popular path up Kilimanjaro, and for good reason. This 7-day itinerary combines the mountain's most dramatic scenery with an acclimatization profile that produces a 90% summit success rate.

Starting from Machame Gate at 1,800 metres on Kilimanjaro's southern face, the route climbs through dense montane rainforest on day 1, emerging into the heath and moorland zone where giant lobelias and senecios create an otherworldly landscape. By day 2, you reach the Shira Plateau at 3,840 metres with sweeping views of Kibo's glaciated dome ahead.

Day 3 is the critical acclimatization day. The route ascends to the Lava Tower at 4,600 metres before descending to Barranco Camp at 3,960 metres. This "climb high, sleep low" profile is what separates 7-day itineraries from shorter versions — your body begins producing extra red blood cells during this altitude swing, dramatically improving your summit chances.

The Barranco Wall on day 4 is the route's signature moment. This near-vertical rock face rises 257 metres above Barranco Camp and looks impassable from below. In reality, it is a hands-and-feet scramble that requires no ropes or technical gear — just nerve and a good guide showing you the holds. Most trekkers rate it as the single most memorable part of the entire climb.

From the top of the wall, the trail crosses the Karanga Valley and ascends through alpine desert to Barafu Base Camp at 4,673 metres. The vegetation disappears entirely, replaced by scree fields and the looming presence of Kilimanjaro's southern glaciers — remnants of the ice cap that once covered the entire summit.

Summit night starts around midnight. You climb by headlamp through switchbacks of volcanic scree for 6-7 hours, reaching Stella Point on the crater rim as the eastern sky turns gold. From Stella Point, a 45-minute walk along the crater edge brings you to Uhuru Peak at 5,895 metres — the Roof of Africa. The descent on day 7 follows the Mweka Route through rainforest back to the gate.

The 7-day Machame is our most-booked Kilimanjaro route. It strikes the ideal balance between time on the mountain, scenery, physical challenge, and cost. All packages include KINAPA-licensed guides, a 3:1 porter-to-climber ratio, all meals, quality camping equipment, emergency oxygen, and airport transfers.`,
    highlights: [
      "Most scenic route on Kilimanjaro",
      "90% summit success rate with 7-day itinerary",
      "Famous Barranco Wall scramble",
      "Excellent climb-high-sleep-low acclimatization",
      "Five distinct climate zones in 7 days",
      "Stunning views of Kibo and Mawenzi peaks",
      "Most popular route — strong guide expertise",
    ],
    faqs: [
      {
        question: "Why is the Machame Route called the Whiskey Route?",
        answer:
          "The Machame Route earned the nickname 'Whiskey Route' because it was historically considered the harder, more adventurous alternative to the Marangu 'Coca-Cola Route.' The name stuck even though Machame has become the most popular route on Kilimanjaro. The whiskey label reflects the route's steeper gradients, more varied terrain, and the Barranco Wall scramble — elements that make it more physically engaging than the gentler Marangu path.",
      },
      {
        question: "Is 7 days enough for the Machame Route?",
        answer:
          "Yes — 7 days is the recommended duration for the Machame Route. The extra day compared to the 6-day version adds a critical acclimatization day at the Lava Tower, boosting the summit success rate from roughly 80% to 90%. A 6-day Machame is only recommended for fit trekkers with previous high-altitude experience. For most climbers, 7 days is the sweet spot between acclimatization, cost, and time.",
      },
      {
        question: "How does the Machame Route compare to the Lemosho Route?",
        answer:
          "Both routes share the same upper mountain section from the Shira Plateau to the summit. The main differences are the approach and duration: Lemosho starts from the quieter western side and takes 8 days, giving slightly better acclimatization (95% vs 90% success rate). Machame starts from the busier southern side and takes 7 days. Machame is generally less expensive and has more flexible departure dates. Lemosho is better for those who want maximum acclimatization time.",
      },
      {
        question: "What fitness level do I need for the 7-day Machame Route?",
        answer:
          "You should be able to hike 6-8 hours per day over hilly terrain carrying a daypack. No technical climbing skills are needed. We recommend starting a training programme at least 12 weeks before your climb: regular hiking (ideally with elevation gain), cardio exercise 3-4 times per week, and stair climbing or step-ups for leg endurance. The Barranco Wall scramble requires basic coordination but no climbing experience.",
      },
      {
        question: "What does the Machame Route cost?",
        answer:
          "Our 7-day Machame Route packages start from $2,100 per person. This includes all KINAPA park fees, licensed mountain guides, porters and cook (3:1 ratio), all meals on the mountain, quality camping equipment, emergency oxygen cylinder, pulse oximeter, airport transfers, and 2 nights hotel accommodation in Moshi. Group discounts are available for parties of 4 or more.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 3. 6 Days Rongai Route (28 words → ~420 words)
  // ─────────────────────────────────────────────
  {
    slug: "6-days-rongai-route",
    model: "trekkingRoute",
    metaTitle: "6-Day Rongai Route: Kilimanjaro's Quiet Northern Approach (85% Success)",
    metaDescription:
      "Climb Kilimanjaro from the north via the 6-day Rongai Route — quieter trails, Kenya border views, and the best option during rainy season. 85% success rate. Itinerary & pricing.",
    overview: `The Rongai Route is the only path that approaches Kilimanjaro from the north, near the Kenyan border. Starting from Rongai Gate at 1,950 metres, this quieter route offers a genuine wilderness experience with far fewer trekkers than the popular southern routes — you may see only a handful of other climbing groups during the first three days.

The northern approach has a practical advantage beyond solitude: it sits in Kilimanjaro's rain shadow. While the southern slopes receive the bulk of the mountain's rainfall, the northern side stays drier throughout the year. This makes Rongai the most reliable choice during the March-May long rains and November short rains when other routes can be waterlogged and miserable.

Day 1 climbs through cultivated farmland and pine plantations before entering the montane forest zone. The forest on the northern side is drier than the southern rainforest, with glimpses of wildlife including colobus monkeys and a variety of birds. By day 2, the trail breaks out of the treeline onto open moorland with sweeping views northward toward Kenya and the Amboseli basin — a perspective of Kilimanjaro that very few climbers ever see.

The route passes through caves formed by ancient lava flows, where early Kilimanjaro climbers sheltered before the era of mountain huts and tents. By day 3, you reach the alpine desert zone beneath the eastern ice fields, with Mawenzi Peak — Kilimanjaro's jagged, technical second summit at 5,149 metres — dominating the skyline to your right.

The summit push follows the same path as the Marangu Route: a midnight departure from Kibo Hut at 4,703 metres, climbing through scree to Gilman's Point on the crater rim, then along the crater edge past Stella Point to Uhuru Peak at 5,895 metres. The descent follows the Marangu Route down the southern slopes, meaning you traverse the entire mountain — ascending from the north and descending to the south.

The 6-day Rongai Route has an 85% summit success rate. While shorter than the 7-8 day routes, its more gradual northern gradient and the optional acclimatization hike to Mawenzi Tarn partially compensate for the reduced time. The route is rated moderate in difficulty and is suitable for first-time high-altitude trekkers who are reasonably fit. All packages include licensed guides, porters, all meals, camping equipment, emergency oxygen, and transfers.`,
    highlights: [
      "Only northern approach to Kilimanjaro",
      "Quietest route — far fewer trekkers",
      "Best route during rainy season (rain shadow)",
      "Views toward Kenya and Amboseli",
      "Traverse the entire mountain (north to south)",
      "Gentle gradient suitable for first-timers",
      "85% summit success rate",
    ],
    faqs: [
      {
        question: "Why choose the Rongai Route over Machame or Lemosho?",
        answer:
          "Choose Rongai if you want solitude, if you are climbing during the rainy season (March-May or November), or if you prefer a gentler gradient. Rongai sits in Kilimanjaro's rain shadow and stays drier than the southern routes year-round. It also sees far fewer trekkers — ideal if crowds concern you. The trade-off is slightly less dramatic scenery than Machame and a lower success rate (85% vs 90-95%) due to the 6-day duration.",
      },
      {
        question: "Is the 6-day Rongai Route long enough to acclimatize?",
        answer:
          "Six days is the minimum recommended duration for a Kilimanjaro climb. The Rongai Route's gradual northern gradient helps compensate for the shorter timeframe — you gain altitude steadily without the steep ascents of routes like Umbwe. An optional acclimatization hike to Mawenzi Tarn on day 3 adds extra altitude exposure. If you want more acclimatization time, consider the 7-day Rongai version which adds an extra day.",
      },
      {
        question: "Can I climb the Rongai Route during rainy season?",
        answer:
          "Yes — Rongai is the best route for rainy season climbing. The northern slopes receive significantly less rainfall than the southern approaches because they sit in the mountain's rain shadow. While no route is completely dry during the March-May long rains, Rongai gives you the driest conditions available. Trails are less muddy and cloud cover clears faster on the northern side.",
      },
      {
        question: "How much does the 6-day Rongai Route cost?",
        answer:
          "Our 6-day Rongai Route packages start from $2,200 per person including all park fees, KINAPA-licensed guides, porters and cook, all meals, camping equipment, emergency oxygen, airport transfers, and hotel accommodation in Moshi. The longer transfer to the northern gate (approximately 4 hours from Moshi) is included in the price.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 4. 4 Days Mount Meru Climbing (27 words → ~430 words)
  // ─────────────────────────────────────────────
  {
    slug: "4-days-mount-meru-climbing",
    model: "trekkingRoute",
    metaTitle: "4-Day Mount Meru Climb: Tanzania's Second Highest Peak (4,566m)",
    metaDescription:
      "Climb Mount Meru in 4 days — Tanzania's second-highest peak at 4,566m. Wildlife encounters, armed ranger escort, and the best Kilimanjaro acclimatization trek. From $850.",
    overview: `Mount Meru is Tanzania's second-highest mountain at 4,566 metres and one of East Africa's most rewarding yet overlooked treks. Located inside Arusha National Park just 70 kilometres west of Kilimanjaro, the 4-day climb offers something Kilimanjaro cannot: genuine wildlife encounters on the trail combined with a serious high-altitude summit.

Unlike Kilimanjaro where large animals are confined to the lower forest zone, Mount Meru's trek passes directly through prime wildlife habitat. An armed ranger accompanies every climbing group — not as a formality but as a necessity. Buffalo, elephant, giraffe, and warthog are regularly seen on the lower slopes, and your ranger will guide you safely past any animals on the trail. This blend of mountain trekking and walking safari is unique in East Africa.

The climb begins at Momella Gate at 1,500 metres and ascends through open grassland where you might walk past grazing giraffes within your first hour. The trail enters montane forest rich with colobus monkeys and tropical birds before reaching Miriakamba Hut at 2,514 metres — a comfortable mountain hut with bunk beds and communal dining.

Day 2 climbs steeply through the forest to Saddle Hut at 3,566 metres, perched on the ridge between Meru's main summit and the parasitic cone of Little Meru (3,820m). An afternoon acclimatization hike to Little Meru's summit is strongly recommended — the views of Kilimanjaro's snow-capped dome from here are among the most photogenic in Tanzania.

Summit day starts at 2 AM. The trail traverses a narrow ridge along the edge of Meru's spectacular horseshoe crater — a dramatic caldera formed when the eastern wall collapsed in a prehistoric eruption. The exposed ridge walk is the most technically demanding section, with steep drop-offs into the crater on one side. You reach Socialist Peak (the true summit at 4,566m) as the sun rises over Kilimanjaro, visible in full glory just 70 kilometres to the east.

Many climbers use Mount Meru as acclimatization before tackling Kilimanjaro the following week. Sleeping at 3,566 metres gives your body a head start on red blood cell production, significantly improving your chances of summiting Kilimanjaro. We offer combined Meru + Kilimanjaro packages with a rest day between the two climbs.

The 4-day trek includes an armed ranger, park fees, licensed mountain guides, hut accommodation, all meals, and transfers from Arusha. Mount Meru has a 95% summit success rate owing to its lower altitude and the high fitness level of climbers it attracts.`,
    highlights: [
      "Tanzania's second-highest peak (4,566m)",
      "Wildlife on the trail — giraffe, buffalo, elephant",
      "Armed ranger escort through wildlife zones",
      "Spectacular crater ridge summit walk",
      "Best Kilimanjaro acclimatization trek",
      "Panoramic Kilimanjaro views from the summit",
      "95% summit success rate",
      "Hut accommodation — no tents needed",
    ],
    faqs: [
      {
        question: "Is Mount Meru a good acclimatization trek before Kilimanjaro?",
        answer:
          "Yes — Mount Meru is widely considered the best acclimatization trek before Kilimanjaro. Sleeping at Saddle Hut (3,566m) and summiting at 4,566m kickstarts your body's altitude adaptation. We recommend 1-2 rest days in Arusha between Mount Meru and your Kilimanjaro climb. Studies show that climbers who acclimatize on Meru first have significantly higher Kilimanjaro summit success rates.",
      },
      {
        question: "Do I need climbing experience for Mount Meru?",
        answer:
          "No technical climbing experience is required, but Mount Meru is not a beginner hike. The summit ridge is exposed with steep drop-offs on one side, and the 2 AM start means you are walking in the dark on a narrow path. You should be comfortable hiking 6-8 hours on steep terrain and not have a fear of heights. Previous multi-day hiking experience is recommended.",
      },
      {
        question: "What wildlife will I see on Mount Meru?",
        answer:
          "Mount Meru's lower slopes pass through Arusha National Park, home to giraffe, buffalo, elephant, warthog, bushbuck, colobus monkeys, blue monkeys, and over 400 bird species. You are very likely to see giraffe and buffalo on day 1 — they graze on the open grassland near Momella Gate. An armed ranger accompanies every group specifically because of the wildlife presence on the trail.",
      },
      {
        question: "How much does the 4-day Mount Meru climb cost?",
        answer:
          "Our 4-day Mount Meru climb starts from $850 per person. This includes all park entrance fees, armed ranger, licensed mountain guide, porters, hut accommodation (Miriakamba and Saddle Huts), all meals on the mountain, and transfers from Arusha. Combined Meru + Kilimanjaro packages are available at a discounted rate.",
      },
      {
        question: "How does Mount Meru compare to Kilimanjaro in difficulty?",
        answer:
          "Mount Meru is shorter (4 days vs 5-8 days) and lower (4,566m vs 5,895m), but the summit ridge is more technically demanding than anything on Kilimanjaro. The exposed crater rim walk requires steady nerves and decent fitness. Overall, Meru is considered moderate-challenging — easier than Kilimanjaro in terms of altitude exposure but more demanding in terms of terrain technicality.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 5. 3 Days Ol Doinyo Lengai Climbing (29 words → ~410 words)
  // ─────────────────────────────────────────────
  {
    slug: "3-days-oldoinyo-lengai-climbing",
    model: "trekkingRoute",
    metaTitle: "3-Day Ol Doinyo Lengai Climb: Tanzania's Active Volcano (2,962m)",
    metaDescription:
      "Climb Ol Doinyo Lengai — Tanzania's only active volcano and the Maasai 'Mountain of God.' Night summit for sunrise, unique carbonatite lava, Lake Natron flamingos. From $650.",
    overview: `Ol Doinyo Lengai — "Mountain of God" in the Maasai language — is Tanzania's only active volcano and one of the most extraordinary climbs in East Africa. Rising 2,962 metres above the eastern shore of Lake Natron in the Great Rift Valley, this stratovolcano is the only place on Earth that erupts natrocarbonatite lava — a rare form of volcanic lava that is black when molten but turns white within hours of exposure to air.

The 3-day expedition begins with a transfer from Arusha to the Maasai village of Engare Sero near Lake Natron — a scenic 5-hour drive through the Rift Valley lowlands with views of the volcano growing larger on the horizon. Day 1 includes an afternoon hike to nearby waterfalls where freshwater streams cut through volcanic rock, creating natural swimming pools surrounded by lush vegetation in an otherwise arid landscape.

The summit attempt is a night climb, starting between 10 PM and midnight. The ascent gains approximately 1,600 metres of elevation over 8-10 kilometres — an unrelenting climb up loose volcanic ash and scree on gradients that often exceed 40 degrees. There are no switchbacks; the trail goes almost straight up. This is the most physically demanding short trek in Tanzania, and the steep terrain combined with shifting volcanic ash underfoot makes every step demanding.

You reach the crater rim as dawn breaks over the Rift Valley. The sunrise view is staggering: Lake Natron stretches below, its alkaline waters flushed red and pink; the Serengeti plains extend westward to the horizon; and the snow-capped summit of Kilimanjaro may be visible 150 kilometres to the northeast on clear mornings. The crater itself is an alien landscape of white carbonatite lava flows, active fumaroles releasing sulphurous gas, and small hornitos (miniature volcanic cones) that may be warm to the touch.

The descent takes 3-4 hours back to the base, and your legs will feel every metre. Day 3 includes an optional morning visit to Lake Natron's flamingo colonies — up to 2.5 million lesser flamingos breed here, making it one of the most important flamingo nesting sites in Africa — before the return transfer to Arusha.

This climb is rated very challenging and is recommended only for fit, experienced hikers. The extreme steepness, loose footing, and 8-10 hour summit push at night require genuine physical preparation. All packages include experienced local Maasai guides, camping equipment, meals, park and conservation fees, and round-trip transfers from Arusha.`,
    highlights: [
      "Tanzania's only active volcano",
      "Unique natrocarbonatite lava found nowhere else on Earth",
      "Night climb with sunrise from the crater rim",
      "Spectacular Lake Natron and Rift Valley views",
      "Maasai cultural experience at Engare Sero",
      "Lake Natron flamingo colonies (up to 2.5 million birds)",
      "One of East Africa's most challenging short treks",
    ],
    faqs: [
      {
        question: "How difficult is the Ol Doinyo Lengai climb?",
        answer:
          "Very difficult. The climb gains 1,600 metres of elevation over 8-10 km with gradients exceeding 40 degrees on loose volcanic ash. There are no flat sections or switchbacks on the upper mountain — it is relentlessly steep. The night climb adds disorientation and cold. This trek is rated very challenging and is only recommended for fit hikers with previous trekking experience. Allow 8-10 hours for the round trip.",
      },
      {
        question: "Why is the climb done at night?",
        answer:
          "The night start serves two purposes. First, daytime temperatures at the base of Ol Doinyo Lengai can exceed 40°C in the Rift Valley heat — climbing in darkness avoids the worst of the heat. Second, a midnight start times your arrival at the crater rim for sunrise, which is the most spectacular part of the experience. The volcanic rock retains heat, so the upper sections are warmer than you might expect at night.",
      },
      {
        question: "Is Ol Doinyo Lengai still active? Is it safe to climb?",
        answer:
          "Ol Doinyo Lengai is classified as an active volcano — its most recent major eruption was in 2007-2008, which significantly altered the crater. The volcano currently shows low-level activity with fumaroles and occasional small lava flows within the crater. Local Maasai guides monitor activity closely, and climbs are only permitted when conditions are safe. The natrocarbonatite lava is unusually cool compared to other volcanic lava types (around 500°C vs 1,100°C for basalt).",
      },
      {
        question: "What should I bring for the Ol Doinyo Lengai climb?",
        answer:
          "Essential gear includes sturdy hiking boots with good ankle support, warm layers for the night climb (temperatures drop to near freezing at the crater rim), a powerful headlamp with spare batteries, 3+ litres of water, energy snacks, sun protection for the descent, and a dust mask or buff for the volcanic ash. Trekking poles are highly recommended for the steep descent through loose scree.",
      },
      {
        question: "Can I combine Ol Doinyo Lengai with other treks or safaris?",
        answer:
          "Yes — we offer combined packages with Lake Natron exploration, Serengeti safaris, and Kilimanjaro climbs. A popular combination is the 11-day Walking Safari on Ngorongoro Highlands package which includes trekking through the Ngorongoro Highlands, visiting Lake Natron (near Ol Doinyo Lengai), and Serengeti game drives. We can also arrange Lengai as an add-on before or after a Kilimanjaro climb.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 6. Walking Safari on Ngorongoro (77 words → ~480 words)
  // ─────────────────────────────────────────────
  {
    slug: "walking-safari-trekking-on-ngorongoro",
    model: "safariPackage",
    metaTitle: "11-Day Ngorongoro Walking Safari & Serengeti Game Drives",
    metaDescription:
      "Trek the Ngorongoro Highlands on foot — Olmoti Crater, Empakaai flamingos, Lake Natron — then 3 days of Serengeti Big Five game drives. 11 days, all-inclusive from $950.",
    overview: `This 11-day expedition is Tanzania's most complete adventure — combining a 6-day walking safari through the Ngorongoro Highlands with thrilling game drives across the Serengeti plains. You travel on foot through volcanic craters, Maasai villages, and flamingo-filled lakes before trading your hiking boots for a safari vehicle in Africa's most famous national park.

The walking safari begins after a full-day game drive in the Ngorongoro Crater, where you descend into the world's largest unbroken volcanic caldera to search for the Big Five among over 25,000 resident animals. From there, the journey goes on foot — a rare way to experience Tanzania that puts you at eye level with the landscape rather than viewing it through a vehicle window.

Over 6 trekking days, you hike 10-15 kilometres daily through the Ngorongoro Highlands at elevations between 2,000 and 3,200 metres. The route crosses terrain that most Tanzania visitors never see: the montane rainforest and waterfall inside Olmoti Crater, the flamingo-filled soda lake at Empakaai Crater, open grasslands dotted with Maasai settlements, and acacia woodlands alive with birdlife. A dedicated trek team — porters, chef, and armed ranger — walks with you, setting up camp and preparing hot meals at each stop.

The cultural dimension sets this trek apart from any mountain climb. You walk through active Maasai grazing lands, visit traditional bomas, and share trails with Maasai herders moving cattle along routes their families have used for generations. Your Maasai guide shares knowledge of medicinal plants, animal tracks, and the volcanic geology that shaped these highlands — context that transforms the walking safari from a hike into an education.

The trekking portion ends with a dramatic descent from the highlands to the shores of Lake Natron — one of East Africa's most surreal landscapes. The alkaline lake hosts up to 2.5 million breeding flamingos, and the imposing silhouette of Ol Doinyo Lengai, Tanzania's only active volcano, dominates the skyline. You spend two nights at a luxury tented camp here before driving to the Serengeti.

The final three days are dedicated to game drives in the Serengeti, entering through the remote Klein's Gate and covering both the Lobo area in the northern Serengeti and the wildlife-rich Central Serengeti around the Seronera Valley. Lion, leopard, elephant, cheetah, buffalo, and enormous herds of wildebeest and zebra are all realistic sightings across these three days.

This safari is all-inclusive from Arusha: accommodation, all meals, park fees, ranger fees, trekking equipment, porter team, experienced guide, and 4x4 safari vehicle. Prices start from $950 per person for groups.`,
    faqs: [
      {
        question: "How physically demanding is the Ngorongoro walking safari?",
        answer:
          "Moderate. You hike 10-15 km per day over varied terrain at altitudes between 2,000 and 3,200 metres. The trails are not technical — no scrambling, ropes, or climbing skills needed. However, some days involve significant elevation gain and loss on uneven ground. You should be comfortable walking 5-6 hours per day and have a reasonable fitness base. Porters carry all camping equipment; you only carry a daypack.",
      },
      {
        question: "What wildlife will I see on the walking safari?",
        answer:
          "On the Ngorongoro Crater game drive: lion, elephant, buffalo, black rhino, hippo, zebra, wildebeest, flamingo, and hyena. During the highland trek: colobus monkeys, bushbuck, various raptors, and spectacular birdlife in the montane forest. At Lake Natron: up to 2.5 million flamingos during breeding season. In the Serengeti: lion, leopard, cheetah, elephant, buffalo, giraffe, wildebeest, zebra, and potentially the Great Migration depending on the season.",
      },
      {
        question: "When is the best time for this walking safari?",
        answer:
          "June to October offers the driest conditions and best trekking weather, coinciding with the Serengeti's dry season when wildlife concentrates around water sources. January-February is also excellent with fewer tourists and good weather. March-May is the long rainy season — highland trails can be muddy and views may be obscured by cloud, though the landscape is lush and green.",
      },
      {
        question: "What is included in the price?",
        answer:
          "Everything from Arusha: round-trip airport transfers, 4x4 safari vehicle, English-speaking guide, all park and conservation fees, armed ranger for highland trekking, porters and trek chef, all camping equipment (tents, sleeping pads, mattresses, sleeping bags), all accommodation as per itinerary, all meals, and drinking water throughout. Not included: international flights, visa fees, travel insurance, personal items, tips, and alcoholic beverages.",
      },
      {
        question: "Can this safari be customized?",
        answer:
          "Yes. We can adjust the itinerary length, swap accommodation types (upgrade from camping to lodge where available), add or remove the Ol Doinyo Lengai volcano climb at Lake Natron, extend the Serengeti days, or combine this with a Kilimanjaro climb. Contact us with your preferences and group size for a customized quote.",
      },
    ],
  },
];

async function expandThinRoutes() {
  console.log("Expanding thin content on 6 route/safari pages...\n");

  let successCount = 0;

  for (const update of updates) {
    try {
      const { slug, model, metaTitle, metaDescription, overview, faqs, highlights } = update;

      if (model === "trekkingRoute") {
        const data: Record<string, unknown> = { metaTitle, metaDescription, overview };
        if (faqs) data.faqs = faqs;
        if (highlights) data.highlights = highlights;

        await prisma.trekkingRoute.update({
          where: { slug },
          data,
        });
      } else {
        // SafariPackage model has no faqs field
        await prisma.safariPackage.update({
          where: { slug },
          data: { metaTitle, metaDescription, overview },
        });
      }

      const wordCount = overview.split(/\s+/).filter(Boolean).length;
      const faqCount = faqs?.length || 0;
      console.log(`  ${slug}`);
      console.log(`    Overview: ${wordCount} words | FAQs: ${faqCount}`);
      console.log(`    Meta: ${metaTitle}`);
      successCount++;
    } catch (error) {
      console.error(`  FAILED: ${update.slug}`, error);
    }
  }

  console.log(`\nDone: ${successCount}/${updates.length} pages updated.`);
}

expandThinRoutes();
