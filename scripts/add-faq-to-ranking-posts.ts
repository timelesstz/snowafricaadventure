/**
 * Adds FAQ sections with microdata schema markup to blog posts
 * that are ranking in Google top 10 but currently lack FAQs.
 * This helps trigger FAQ rich results in Google SERPs.
 *
 * Target pages (all currently ranking top 10):
 * 1. /hunting-strategy-of-the-lions/ - #2 for "lion hunting strategy"
 * 2. /lion-vs-lioness/ - #7 for "lion vs lioness differences"
 * 3. /are-there-tigers-in-serengeti/ - #7 for "are there tigers in serengeti"
 * 4. /why-do-zebra-and-wildebeest-migrate-together/ - #7 for "why do zebra wildebeest migrate"
 * 5. /is-lion-hunting-legal-in-africa/ - #7 for "is lion hunting legal africa"
 *
 * Run with: npx tsx scripts/add-faq-to-ranking-posts.ts
 */

import "dotenv/config";
import prisma from "../src/lib/prisma";

interface FaqEntry {
  slug: string;
  faqHtml: string;
}

function buildFaqSection(
  qaPairs: Array<{ q: string; a: string }>
): string {
  let html = `\n<h2>Frequently Asked Questions</h2>\n`;
  html += `<div class="faq-accordion" itemscope itemtype="https://schema.org/FAQPage">\n`;

  for (const { q, a } of qaPairs) {
    html += `<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">${q}</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">${a}</p>
</div>
</div>\n`;
  }

  html += `</div>`;
  return html;
}

const faqEntries: FaqEntry[] = [
  {
    slug: "hunting-strategy-of-the-lions",
    faqHtml: buildFaqSection([
      {
        q: "How do lions hunt as a team?",
        a: 'Lions hunt cooperatively using a formation strategy. Some lionesses act as "wings" that circle the prey from both sides, while others hold the centre position. The wings chase prey towards the centre, where the strongest hunters make the kill. This coordinated approach gives them a 30% success rate compared to just 17-19% when hunting alone.',
      },
      {
        q: "Do male lions hunt or only females?",
        a: "While lionesses do the majority of hunting, male lions also hunt — especially when targeting larger prey like buffalo or giraffe. Males are more likely to hunt alone or ambush prey using dense vegetation. Their larger size makes them effective at bringing down big animals, though their mane makes them more visible to prey.",
      },
      {
        q: "What time of day do lions hunt?",
        a: "Lions primarily hunt at night and during twilight hours (dusk and dawn), when their superior night vision gives them an advantage over prey. About 80% of hunts occur in low-light conditions. However, lions in thick bush areas may also hunt during the day, especially when hungry or when an easy opportunity presents itself.",
      },
      {
        q: "What animals do lions hunt most often?",
        a: "Lions prefer medium to large herbivores. In the Serengeti, their most common prey includes wildebeest, zebra, buffalo, and various antelope species like topi and hartebeest. They typically target animals weighing 50-300 kg. Lions will also hunt warthogs, giraffes, and even young elephants or hippos when other prey is scarce.",
      },
      {
        q: "Where can I see lions hunting on safari?",
        a: 'The Serengeti in Tanzania offers some of the best lion hunting observations, particularly during the Great Migration when prey is abundant. Night game drives in parks like Ruaha and the Ngorongoro Crater also provide opportunities. Book a <a href="/tanzania-safaris/">Tanzania safari package</a> with experienced guides who know lion pride territories and hunting patterns.',
      },
    ]),
  },
  {
    slug: "lion-vs-lioness",
    faqHtml: buildFaqSection([
      {
        q: "Who is stronger, a lion or a lioness?",
        a: "Male lions are physically stronger, weighing 330-550 lbs compared to a lioness's 240-330 lbs. Males have more muscle mass and a thicker build. However, lionesses are faster and more agile, reaching speeds of up to 50 mph compared to a male's 35 mph. Each gender's physical traits are optimized for their role — males for territorial defence, females for hunting.",
      },
      {
        q: "Why do lionesses do most of the hunting?",
        a: "Lionesses are the primary hunters because their smaller, lighter bodies give them greater speed and agility. Their lack of a mane also makes them less visible to prey. Lionesses hunt cooperatively in groups, using coordinated strategies to encircle and ambush prey. Males contribute by defending the kill from hyenas and other scavengers.",
      },
      {
        q: "Can a lioness beat a lion in a fight?",
        a: "In a direct physical confrontation, a male lion would typically overpower a lioness due to his larger size (up to 50% heavier), stronger bite force, and protective mane. However, lionesses rarely fight males directly. In prides, lionesses sometimes band together to drive out unwanted males, using numbers and coordination to their advantage.",
      },
      {
        q: "Do male lions protect their cubs?",
        a: "Male lions protect their cubs indirectly by defending the pride's territory from rival males. If a new male takes over a pride, he will typically kill existing cubs to bring the females into oestrus faster. The resident male's primary role is preventing this by patrolling boundaries and fighting off challengers.",
      },
      {
        q: "Where is the best place to see lions in Tanzania?",
        a: 'The Serengeti National Park and Ngorongoro Crater are the best places to see lions in Tanzania. The Serengeti alone hosts over 3,000 lions — one of the highest densities in Africa. The Ngorongoro Crater\'s enclosed ecosystem makes lion sightings almost guaranteed. Explore our <a href="/tanzania-safaris/">Tanzania safari packages</a> to plan your visit.',
      },
    ]),
  },
  {
    slug: "are-there-tigers-in-serengeti",
    faqHtml: buildFaqSection([
      {
        q: "Are there any tigers in Africa?",
        a: "No, there are no wild tigers in Africa. Tigers are exclusively native to Asia, found in countries like India, Russia, Indonesia, and Southeast Asia. While tigers and lions are both big cats, they evolved on separate continents and never naturally coexisted in Africa. The only tigers in Africa are in zoos and wildlife sanctuaries.",
      },
      {
        q: "Why are there no tigers in Africa?",
        a: "Tigers evolved in Asia and never migrated to Africa, likely because established African predators — lions, leopards, and cheetahs — already occupied the big cat ecological niches. During the Pleistocene, land bridges allowed animal migration between continents, but tigers remained in Asia where they diversified into subspecies adapted to diverse habitats from Siberian forests to tropical jungles.",
      },
      {
        q: "What big cats live in the Serengeti?",
        a: 'The Serengeti is home to three species of big cats: lions, leopards, and cheetahs. Lions are the most visible, with over 3,000 in the greater Serengeti ecosystem. Leopards prefer rocky kopjes and riverine forests. Cheetahs hunt on the open plains, especially in the southeastern Serengeti. All three can be seen on a <a href="/tanzania-safaris/">Tanzania safari</a>.',
      },
      {
        q: "Could a tiger survive in the Serengeti?",
        a: "A tiger could theoretically survive in the Serengeti's grassland habitat, as they are adaptable predators. However, they would face intense competition from lions, which hunt in prides and dominate through numbers. Tigers are solitary hunters, putting them at a disadvantage against lion prides. The open grassland terrain also differs from the dense forests tigers evolved to hunt in.",
      },
      {
        q: "What is the most dangerous animal in the Serengeti?",
        a: "The African buffalo (Cape buffalo) is considered the most dangerous animal in the Serengeti for humans, responsible for more fatalities than lions. Hippos are the second most dangerous, especially near water. Lions, while iconic predators, rarely target humans. On a guided safari, all animals can be observed safely from your vehicle.",
      },
    ]),
  },
  {
    slug: "why-do-zebra-and-wildebeest-migrate-together",
    faqHtml: buildFaqSection([
      {
        q: "How many animals migrate in the Great Migration?",
        a: "The Great Migration involves approximately 1.5 million wildebeest, 300,000 zebras, and 200,000 gazelles — over 2 million animals in total. It's the largest terrestrial animal migration on Earth, covering roughly 800 km (500 miles) in a clockwise loop through the Serengeti-Mara ecosystem between Tanzania and Kenya.",
      },
      {
        q: "Do zebras and wildebeest eat the same grass?",
        a: "No, and this is key to why they migrate together. Zebras eat the tall, tough top layer of grass first, which reveals the shorter, more nutritious shoots underneath that wildebeest prefer. This complementary grazing pattern means they don't compete for food — they actually help each other by making grass more accessible.",
      },
      {
        q: "When is the best time to see the Great Migration?",
        a: 'The migration can be seen year-round in different locations. The dramatic Mara River crossings happen from July to October in the northern Serengeti. Calving season is January to March in the southern Serengeti. The western corridor (May-June) sees the herds moving north. Plan your trip with our <a href="/tanzania-safaris/">Tanzania safari packages</a> timed to the migration.',
      },
      {
        q: "How many wildebeest die during the migration?",
        a: "Approximately 250,000 wildebeest and 30,000 zebras die during the migration each year from predation, drowning at river crossings, exhaustion, and disease. However, about 500,000 calves are born annually during the calving season (January-March), more than replacing the losses and sustaining the population.",
      },
      {
        q: "Where is the best place to watch the migration in Tanzania?",
        a: 'The northern Serengeti (Kogatende area) is best for river crossings from July to October. The southern Serengeti (Ndutu area) is ideal for calving season from January to March. The central Serengeti offers year-round wildlife viewing. Each location offers a different perspective of this natural spectacle. View our <a href="/tanzania-safaris/">migration safari packages</a>.',
      },
    ]),
  },
  {
    slug: "is-lion-hunting-legal-in-africa",
    faqHtml: buildFaqSection([
      {
        q: "Which African countries allow lion hunting?",
        a: "As of 2026, lion hunting is legal in several African countries including South Africa, Tanzania, Mozambique, Zimbabwe, and Cameroon, subject to strict permit systems and quotas. Botswana banned hunting in 2014, and Kenya banned all hunting in 1977. Each country has different regulations regarding seasons, quotas, and permit costs.",
      },
      {
        q: "How much does it cost to hunt a lion in Africa?",
        a: "A legal lion hunt in Africa typically costs between $35,000 and $75,000 USD, including the trophy fee, daily rates, guide fees, and permits. South Africa is generally less expensive at $35,000-$50,000, while Tanzania can exceed $70,000. These high costs are partly intended to fund conservation programmes, though this remains controversial.",
      },
      {
        q: "How many lions are left in Africa?",
        a: "Current estimates place the wild African lion population at fewer than 25,000, down from an estimated 200,000 a century ago — a decline of over 80%. The main threats are habitat loss, human-wildlife conflict, and poaching. Tanzania, Kenya, and Botswana hold the largest remaining populations.",
      },
      {
        q: "Does lion hunting help conservation?",
        a: "This is highly debated. Proponents argue that hunting fees fund anti-poaching efforts, habitat protection, and community development. Critics point out that hunting removes genetically important breeding males, that only a fraction of fees reach conservation, and that photo tourism generates far more sustainable revenue. The scientific consensus increasingly favours non-consumptive wildlife tourism.",
      },
      {
        q: "Can I see lions on a photo safari instead?",
        a: 'Absolutely! Tanzania\'s national parks offer incredible lion viewing without hunting. The Serengeti has one of the world\'s largest lion populations, and the Ngorongoro Crater provides almost guaranteed sightings. Photo safaris generate more revenue per lion than hunting and support sustainable tourism. Explore our <a href="/tanzania-safaris/">Tanzania safari packages</a> for ethical wildlife experiences.',
      },
    ]),
  },
];

async function main() {
  console.log(
    "Adding FAQ sections with schema markup to top-ranking blog posts...\n"
  );

  let updated = 0;
  let skipped = 0;

  for (const entry of faqEntries) {
    try {
      const post = await prisma.blogPost.findUnique({
        where: { slug: entry.slug },
        select: { id: true, content: true, title: true },
      });

      if (!post) {
        console.log(`  SKIP: "${entry.slug}" not found in database`);
        skipped++;
        continue;
      }

      // Check if FAQ already exists in content
      if (
        post.content.includes("FAQPage") ||
        post.content.includes("Frequently Asked Questions")
      ) {
        console.log(
          `  SKIP: "${entry.slug}" already has FAQ section`
        );
        skipped++;
        continue;
      }

      // Append FAQ to end of content
      const updatedContent = post.content + "\n\n" + entry.faqHtml;

      await prisma.blogPost.update({
        where: { slug: entry.slug },
        data: { content: updatedContent },
      });

      console.log(
        `  OK: "${entry.slug}" — FAQ section added (${entry.faqHtml.split("Question").length - 1} Q&As)`
      );
      updated++;
    } catch (error) {
      console.error(`  ERROR updating "${entry.slug}":`, error);
    }
  }

  console.log(`\nDone. Updated: ${updated}, Skipped: ${skipped}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
