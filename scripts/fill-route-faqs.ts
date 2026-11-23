/**
 * Adds FAQs to the 7 trekking routes that had none (content-health "FAQs" gap,
 * 2026-11-19). Answers use only facts already on each route page: the
 * day-by-day itinerary figures (altitudes, distances, hours), start/end
 * points and highlights. Success rates and prices are deliberately left out:
 * the route records disagree with themselves on success rates, and prices
 * belong to pricingTiers, not prose that goes stale.
 *
 * Writes only where `faqs` is currently empty, so it can't overwrite FAQs
 * an editor has added since.
 *
 *   npx tsx scripts/fill-route-faqs.ts            # dry run (default)
 *   npx tsx scripts/fill-route-faqs.ts --apply    # write
 */
import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";

config({ path: ".env.local", quiet: true });

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL_ACCELERATE,
});

const APPLY = process.argv.includes("--apply");

type Faq = { question: string; answer: string };

const FAQS: Record<string, Faq[]> = {
  "7-days-rongai-route": [
    {
      question: "How does the 7-day Rongai itinerary help with acclimatization?",
      answer:
        "It spreads the climb into short steps. You sleep at Simba Camp (2,671m), Second Cave (3,450m), Kikelewa (3,600m) and Mawenzi Tarn (4,315m) before crossing the Saddle to Kibo Hut (4,720m). No day before summit night gains more than about 800m, and the afternoon walk at Mawenzi Tarn gives your body extra time at altitude.",
    },
    {
      question: "Where does the Rongai Route start and finish?",
      answer:
        "You start at Rongai Gate (2,364m) on the northern side of the mountain, close to the Kenyan border, and come down the southeastern side on the Marangu trail to Marangu Gate (1,879m). Going up one side and down the other means you see both faces of Kilimanjaro. The drive to the northern gate is longer than to the southern gates.",
    },
    {
      question: "Is the Rongai Route a good choice in the rainy season?",
      answer:
        "Yes. The northern slopes sit in Kilimanjaro's rain shadow and get less rain than the southern routes, which makes Rongai the usual pick for the long rains (March to May) and November. Expect some wet days anyway: no route is fully dry in the rains.",
    },
    {
      question: "How long is summit day on the 7-day Rongai Route?",
      answer:
        "Plan for 12 to 16 hours. You leave Kibo Hut (4,720m) around midnight, climb to Gilman's Point on the crater rim and on to Uhuru Peak (5,895m), then descend to Horombo Hut (3,720m). The full day covers about 21km.",
    },
  ],

  "5-days-marangu-route": [
    {
      question: "Is 5 days enough to climb Kilimanjaro on the Marangu Route?",
      answer:
        "Only for some climbers. There is no acclimatization day: on day 3 you go from Horombo Hut (3,720m) to Kibo Hut (4,720m), a 1,000m gain, and start for the summit that same night. We recommend it if you have recently been above 4,500m and know how you handle altitude. Otherwise the 6-day Marangu adds a day at Horombo and a hike to Zebra Rocks (4,200m).",
    },
    {
      question: "What is the accommodation like on the Marangu Route?",
      answer:
        "Marangu is the only Kilimanjaro route with huts instead of tents. You sleep at Mandara Hut (2,720m), Horombo Hut (3,720m) and Kibo Hut (4,720m) in dormitory-style huts with mattresses and a shared dining hall. Bring a warm sleeping bag: the huts are not heated.",
    },
    {
      question: "Do you go up and down the same way on the Marangu Route?",
      answer:
        "Yes. You start and finish at Marangu Gate (1,879m) and descend past Horombo Hut on the same trail. The last day is a long one, about 20km from Horombo back to the gate.",
    },
    {
      question: "How long is summit day on the 5-day Marangu Route?",
      answer:
        "Expect 14 to 18 hours. You leave Kibo Hut (4,720m) around midnight, reach Gilman's Point on the crater rim, continue to Uhuru Peak (5,895m) and then walk all the way down to Horombo Hut (3,720m), about 21km in total.",
    },
  ],

  "6-days-umbwe-route": [
    {
      question: "How hard is the Umbwe Route?",
      answer:
        "It is the steepest and most direct way up Kilimanjaro. Day 1 climbs about 1,050m, from Umbwe Gate (1,800m) to Umbwe Cave Camp (2,850m), along a forest ridge where you often step up on tree roots. Day 2 gains roughly another 1,050m to Barranco Camp (3,900m). The trail is not technical, but altitude comes fast, so we suggest Umbwe for climbers who have been high before.",
    },
    {
      question: "Do I need climbing experience for the Umbwe Route?",
      answer:
        "No ropes or technical skills are needed. Expect to use your hands on the steepest forest sections and on the Barranco Wall on day 3, which is a scramble rather than a climb. Strong legs and previous multi-day hiking matter more than climbing experience.",
    },
    {
      question: "Where does the Umbwe Route meet the other routes?",
      answer:
        "At Barranco Camp (3,900m). From there you follow the same trail as Machame and Lemosho: over the Barranco Wall to Karanga Camp (3,995m), up to Barafu Camp (4,673m) and on to Uhuru Peak (5,895m). You descend via Mweka Camp (3,100m) to Mweka Gate (1,640m).",
    },
    {
      question: "Is the Umbwe Route crowded?",
      answer:
        "The first two days are among the quietest on the mountain because few climbers choose Umbwe. From Barranco Camp onwards you share camps with Machame and Lemosho groups, so the upper mountain is as busy as those routes.",
    },
  ],

  "9-day-northern-circuit-route-kilimanjaro-guide": [
    {
      question: "Why is the Northern Circuit good for acclimatization?",
      answer:
        "It is the longest route, with nine days on the mountain. After reaching Moir Hut (4,200m) you traverse the northern slopes and sleep between 3,800m and 4,200m for three nights (Moir Hut, Pofu Camp, Third Cave) before Kibo Hut (4,720m). That long stretch at moderate altitude gives your body far more time to adjust than shorter routes.",
    },
    {
      question: "How quiet is the Northern Circuit?",
      answer:
        "Very quiet. The first days follow the Lemosho trail across the Shira Plateau, but from Moir Hut the route swings around the remote northern side, where you will meet few other groups. Camps like Pofu and Third Cave look out over the Kenyan plains and Mawenzi Peak.",
    },
    {
      question: "Where does the Northern Circuit start, summit and finish?",
      answer:
        "You start at Lemosho Gate (2,100m) on the western side. Summit night begins at Kibo Hut (4,720m) around midnight for Uhuru Peak (5,895m), after which you descend to High Camp (3,820m). The last day is about 16km down to Mweka Gate (1,640m).",
    },
    {
      question: "Who is the Northern Circuit best for?",
      answer:
        "Climbers who have the time and want the best chance to acclimatize, and anyone who prefers quiet trails. Daily walks are mostly three to six hours, and the route avoids the Barranco Wall scramble. The trade-off is the extra days on the mountain.",
    },
  ],

  "6-days-machame-route": [
    {
      question: "What is the difference between the 6-day and 7-day Machame Route?",
      answer:
        "The 6-day version goes from Barranco Camp (3,900m) straight to Barafu Camp (4,673m) in one day, about 9km and 6 to 7 hours, and starts for the summit that same midnight. The 7-day version breaks that stage with a night at Karanga Camp. Choose 6 days only if you are fit and have been at high altitude before.",
    },
    {
      question: "Why does the Machame Route go up to Lava Tower and back down?",
      answer:
        "It is the 'climb high, sleep low' principle. On day 3 you climb from Shira Camp (3,750m) to Lava Tower (4,600m), then descend to sleep at Barranco Camp (3,900m). Spending a few hours higher than where you sleep helps your body adapt and lowers the risk of altitude sickness.",
    },
    {
      question: "How difficult is the Barranco Wall?",
      answer:
        "It looks intimidating but is a scramble, not a climb. You use your hands on the rock in places, there are no ropes, and guides help you through the narrow step known as the 'kissing rock'. Most climbers reach the top in one to two hours.",
    },
    {
      question: "How long is summit day on the 6-day Machame Route?",
      answer:
        "Plan for 12 to 16 hours. You leave Barafu Camp (4,673m) around midnight, reach Stella Point on the crater rim and continue to Uhuru Peak (5,895m) for sunrise, then descend to Mweka Camp (3,100m). It is about 16km in total.",
    },
  ],

  "6-days-marangu-route": [
    {
      question: "What does the extra day on the 6-day Marangu Route do?",
      answer:
        "It is an acclimatization day at Horombo Hut (3,720m). You hike towards Mawenzi Peak to Zebra Rocks (4,200m) and come back down to sleep at Horombo. Climbing higher than you sleep helps your body adjust before the push to Kibo Hut (4,720m) and summit night.",
    },
    {
      question: "Is the Marangu Route the easiest way up Kilimanjaro?",
      answer:
        "It has the gentlest gradients and a well-kept trail, which is why many first-time climbers choose it. Summit night is still hard: the scree climb from Kibo Hut to Gilman's Point is steep and cold, and Uhuru Peak (5,895m) is the same height whichever route you take.",
    },
    {
      question: "Where do you sleep on the Marangu Route?",
      answer:
        "In mountain huts rather than tents: Mandara Hut (2,720m), Horombo Hut (3,720m) for two nights, and Kibo Hut (4,720m). They are dormitory-style with mattresses and shared dining halls. Bring a warm sleeping bag, as the huts are not heated.",
    },
    {
      question: "How long is summit day on the 6-day Marangu Route?",
      answer:
        "Expect 12 to 16 hours. You leave Kibo Hut (4,720m) around midnight, climb to Gilman's Point, follow the crater rim to Uhuru Peak (5,895m) and descend to Horombo Hut (3,720m), about 21km.",
    },
  ],

  "kilimanjaro-trek-machame-route-and-tanzania-safari-northern-circuit": [
    {
      question: "What does this Kilimanjaro and safari trip include?",
      answer:
        "A 7-day climb on the Machame Route, then a northern Tanzania safari: Enduimet Wildlife Management Area in West Kilimanjaro, Tarangire National Park, Ngorongoro Crater and the Serengeti, before you return to Arusha for your flight home.",
    },
    {
      question: "Do I get to rest after the climb before the safari?",
      answer:
        "Yes. After descending to Mweka Gate you transfer to Kambi ya Tembo Tented Camp in Enduimet, and the next days are spent on game drives. You are seated in the vehicle most of the day, so the safari doubles as recovery for your legs.",
    },
    {
      question: "What wildlife can I see on the safari part?",
      answer:
        "Enduimet is known for elephants and the long-necked gerenuk gazelle, Tarangire for its big elephant herds, Ngorongoro Crater for black rhino, and the Serengeti for lions, leopards and cheetahs. Sightings are never guaranteed, but this route covers some of Tanzania's best wildlife areas.",
    },
    {
      question: "Where do I stay before the climb?",
      answer:
        "On arrival you are met at Kilimanjaro International Airport and taken to Arusha Planet Lodge or Kerama Silent Lodge, about 50 minutes away, for the night before the climb.",
    },
  ],
};

async function main() {
  const routes = await prisma.trekkingRoute.findMany({
    where: { slug: { in: Object.keys(FAQS) } },
    select: { id: true, slug: true, faqs: true },
  });

  for (const slug of Object.keys(FAQS)) {
    const route = routes.find((r) => r.slug === slug);
    if (!route) {
      console.log(`missing   ${slug}`);
      continue;
    }
    const hasFaqs = Array.isArray(route.faqs) && route.faqs.length > 0;
    if (hasFaqs) {
      console.log(`skip      ${slug} (already has FAQs)`);
      continue;
    }
    console.log(`${APPLY ? "write" : "would write"} ${slug}: ${FAQS[slug].length} FAQs`);
    if (APPLY) {
      await prisma.trekkingRoute.update({
        where: { id: route.id },
        data: { faqs: FAQS[slug] },
      });
    }
  }
  if (!APPLY) console.log("\nDry run — nothing written. Re-run with --apply.");
}

main().finally(() => prisma.$disconnect());
