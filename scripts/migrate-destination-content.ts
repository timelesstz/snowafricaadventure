/**
 * Migrate rich destination content from placeholder data into the database.
 *
 * Uses upsert to preserve any existing DB data — only backfills fields that
 * are empty or missing. Run with: npx tsx scripts/migrate-destination-content.ts
 */
import prisma from "../src/lib/prisma";

const destinationContent: Record<
  string,
  {
    name: string;
    description: string;
    highlights: string[];
    wildlife: string[];
    bestTime: string;
  }
> = {
  "serengeti-national-park": {
    name: "Serengeti National Park",
    description:
      "The Serengeti is Tanzania's oldest and most popular national park. The name comes from the Maasai word \"siringet\" meaning \"endless plains\" — a perfect description of the 14,763 square kilometres of grassland, savanna, and woodland that make up this UNESCO World Heritage Site.\n\nThe park is most famous for hosting the Great Migration, one of the most spectacular wildlife events on Earth. Each year, over 1.5 million wildebeest, accompanied by hundreds of thousands of zebras and gazelles, make their circular journey in search of fresh grazing.\n\nBeyond the migration, the Serengeti offers exceptional year-round wildlife viewing. The park is home to all of the Big Five — lion, leopard, elephant, buffalo, and rhino — as well as cheetahs, hyenas, giraffes, and over 500 bird species.",
    highlights: ["Great Migration", "Big Five", "Endless Plains", "Hot Air Balloons"],
    wildlife: ["Lion", "Leopard", "Elephant", "Buffalo", "Rhino", "Cheetah", "Wildebeest", "Zebra", "Giraffe", "Hippo"],
    bestTime: "June to October for dry season; December to March for calving season",
  },
  "ngorongoro-conservation-area": {
    name: "Ngorongoro Conservation Area",
    description:
      "The Ngorongoro Crater is often called the \"Eighth Wonder of the World\". Formed about 2–3 million years ago when a giant volcano exploded and collapsed, the crater now shelters one of the most beautiful wildlife habitats on Earth.\n\nThe crater floor spans approximately 260 square kilometres and is home to around 25,000 large mammals, including the endangered black rhino. The crater's walls create a natural enclosure, meaning most animals remain resident year-round, making wildlife sightings almost guaranteed.\n\nThe Ngorongoro Conservation Area is also culturally significant as one of the few places where wildlife and semi-nomadic Maasai pastoralists coexist, continuing their traditional way of life alongside the wild animals.",
    highlights: ["UNESCO World Heritage Site", "Big Five", "Crater Floor", "Maasai Culture"],
    wildlife: ["Black Rhino", "Lion", "Leopard", "Elephant", "Buffalo", "Hippo", "Flamingo", "Wildebeest", "Zebra", "Hyena"],
    bestTime: "Year-round; June to September for dry season; November to April for green season",
  },
  "tarangire-national-park": {
    name: "Tarangire National Park",
    description:
      "Tarangire National Park is Tanzania's sixth-largest national park and one of the most underrated gems of the Northern Circuit. Named after the Tarangire River that flows through its entire length, this park is best known for its vast elephant herds and its iconic landscape studded with enormous ancient baobab trees.\n\nDuring the dry season from June through October, the Tarangire River becomes the only reliable water source across a vast semi-arid ecosystem, drawing extraordinary concentrations of wildlife. Herds of 200 to 300 elephants are a common sight at the riverbanks.\n\nTarangire holds one of Tanzania's highest concentrations of bird species — over 550 recorded species — making it a paradise for birding enthusiasts. The park is particularly famous for its populations of yellow-collared lovebird and ashy starling.",
    highlights: ["Largest Elephant Herds in Tanzania", "Ancient Baobab Trees", "550+ Bird Species", "Tarangire River Wildlife Corridor", "Dry Season Concentrations", "Night Game Drives"],
    wildlife: ["Elephant", "Lion", "Leopard", "Cheetah", "Buffalo", "Giraffe", "Zebra", "Wildebeest", "African Rock Python", "Oryx", "Eland", "Greater Kudu", "Gerenuk", "Honey Badger"],
    bestTime: "June to October for spectacular dry-season wildlife concentrations; November to April for birding and lush green landscapes",
  },
  "lake-manyara-national-park": {
    name: "Lake Manyara National Park",
    description:
      "Lake Manyara National Park is a compact but incredibly diverse park situated at the base of the Great Rift Valley escarpment in northern Tanzania. Despite its relatively small size, the park encompasses a remarkable variety of habitats — from dense groundwater forest to open grassland, acacia woodland, and the alkaline lake itself.\n\nThe park is famous for its tree-climbing lions, a behaviour rarely seen elsewhere in Africa. Large prides of lions are frequently spotted lounging in the branches of acacia trees, offering exceptional photographic opportunities.\n\nLake Manyara itself covers approximately two-thirds of the park's total area and attracts huge flocks of flamingos during certain seasons, turning the shoreline pink. The park supports over 400 bird species.",
    highlights: ["Tree-Climbing Lions", "Flamingo Flocks", "Great Rift Valley Views", "400+ Bird Species"],
    wildlife: ["Lion", "Elephant", "Hippo", "Giraffe", "Flamingo", "Buffalo", "Blue Monkey", "Baboon", "Zebra"],
    bestTime: "June to October for dry season; November to December for flamingos and migratory birds",
  },
  "arusha-national-park": {
    name: "Arusha National Park",
    description:
      "Arusha National Park is one of Tanzania's most underrated gems, offering an incredible diversity of habitats in a compact area. From the alkaline Momella Lakes to the Mount Meru crater, this park provides an intimate wildlife experience just a short drive from Arusha city.\n\nThe park is home to giraffes, buffalo, zebras, warthogs, and various monkey species including the striking black and white colobus monkey. With Mount Meru as a dramatic backdrop and the possibility of glimpsing Kilimanjaro on clear days, this is a photographer's paradise.\n\nArusha National Park is also the starting point for climbing Mount Meru, Tanzania's second-highest peak at 4,566 metres — an excellent acclimatisation climb before attempting Kilimanjaro.",
    highlights: ["Mount Meru Views", "Momella Lakes", "Colobus Monkeys", "Walking Safari"],
    wildlife: ["Giraffe", "Buffalo", "Zebra", "Colobus Monkey", "Blue Monkey", "Warthog", "Bushbuck", "Flamingo"],
    bestTime: "June to October for dry season; year-round for walking safaris",
  },
  "ruaha-national-park": {
    name: "Ruaha National Park",
    description:
      "Ruaha National Park is Tanzania's largest national park — covering over 20,226 square kilometres — and widely considered one of Africa's finest and least-crowded safari destinations. The park takes its name from the Great Ruaha River, which becomes the central focus of wildlife activity during the dry season.\n\nRuaha supports what is believed to be Tanzania's largest elephant population — some estimates suggest over 12,000 individuals. The predator watching is exceptional, with dense populations of lion, leopard, cheetah, and African wild dogs.\n\nThe birdlife is extraordinary, with over 570 recorded species spanning the full range of East African habitats. Walking safaris are a particular speciality, with several camps offering multi-day fly-camping experiences.",
    highlights: ["Tanzania's Largest Park", "Great Ruaha River", "Largest Elephant Population", "Exceptional Lion Watching", "African Wild Dogs", "Walking Safari Specialist", "570+ Bird Species"],
    wildlife: ["Elephant", "Lion", "Leopard", "African Wild Dog", "Cheetah", "Buffalo", "Greater Kudu", "Sable Antelope", "Hippo", "Crocodile", "Roan Antelope"],
    bestTime: "May to October for dry season; June to September for peak wildlife concentration along the river",
  },
  "selous-game-reserve": {
    name: "Selous Game Reserve (Nyerere National Park)",
    description:
      "The Selous Game Reserve — recently renamed Nyerere National Park — is Africa's single largest protected wildlife area. Spanning approximately 50,000 square kilometres, the Selous ecosystem is a UNESCO World Heritage Site and one of the world's last truly great wilderness areas.\n\nThe Rufiji River is the Selous's lifeblood and greatest attraction. The park's famous boat safaris drift silently along the river's banks, bringing visitors face-to-face with hippo families, massive Nile crocodiles, and herds of buffalo.\n\nAfrican wild dogs find their stronghold in the Selous. The reserve's vast miombo woodland is ideal territory for the dogs' large pack ranges, and the Selous population is one of the most important in Africa.",
    highlights: ["Africa's Largest Protected Area", "UNESCO World Heritage Site", "Rufiji River Boat Safaris", "Largest Hippo Population in Africa", "Wild Dog Stronghold", "440+ Bird Species"],
    wildlife: ["Hippo", "Crocodile", "Elephant", "African Wild Dog", "Lion", "Leopard", "Buffalo", "Sable Antelope", "African Skimmer", "White-Backed Night Heron"],
    bestTime: "June to October for dry season; July to September for peak wildlife viewing along the Rufiji River",
  },
  "katavi-national-park": {
    name: "Katavi National Park",
    description:
      "Katavi National Park stands as one of Tanzania's most remote and least-visited wilderness areas, making it an extraordinary destination for authentic African safari experiences. Located in the far west of Tanzania, Katavi occupies approximately 4,471 square kilometres.\n\nKatavi is most famous for the extraordinary dry-season concentrations of hippos that gather in the shrinking pools between June and October, sometimes numbering over 200 animals in a single pool. Enormous territorial battles erupt frequently.\n\nBuffalo herds at Katavi are legendary — it is not unusual to encounter herds numbering several hundred animals. Lion prides follow these buffalo herds closely, having evolved specialised techniques for tackling prey far larger than themselves.",
    highlights: ["Hippo Concentrations", "Remote Wilderness", "Large Elephant Herds", "Legendary Buffalo Herds", "No Crowds", "Authentic Africa"],
    wildlife: ["Hippo", "Crocodile", "Elephant", "Buffalo", "Lion", "Leopard", "Topi", "Reedbuck", "African Spoonbill", "Yellow-Billed Stork"],
    bestTime: "June to October for extraordinary dry-season hippo and wildlife concentrations",
  },
  "kitulo-national-park": {
    name: "Kitulo National Park",
    description:
      "Kitulo National Park is one of Tanzania's most unusual parks — a high-altitude montane grassland plateau that transforms into a breathtaking carpet of wildflowers between November and April. The park earned its nickname — the Serengeti of Flowers — from David Attenborough.\n\nDuring the rainy season, the plateau erupts with over 350 species of wildflowers, including 45 species of terrestrial orchid. The orchid diversity at Kitulo is particularly remarkable, creating what is considered one of the finest orchid-viewing experiences in sub-Saharan Africa.\n\nBeyond its floral displays, Kitulo is an important site for birds, supporting Albertine Rift endemic species including Denham's bustard and the rare blue swallow.",
    highlights: ["Serengeti of Flowers", "45 Orchid Species", "350+ Wildflower Species", "Rare Mountain Birds", "High-Altitude Plateau", "No Crowds"],
    wildlife: ["Mountain Reedbuck", "Leopard", "Serval Cat", "Denham's Bustard", "Blue Swallow", "Abbott's Duiker", "Mountain Marsh Widow", "Terrestrial Orchids (45 spp)"],
    bestTime: "November to April for peak wildflower and orchid displays; year-round for birdwatching",
  },
  "mkomazi-national-park": {
    name: "Mkomazi National Park",
    description:
      "Mkomazi National Park occupies a special place in Tanzania's conservation story. Located in northeastern Tanzania bordering Kenya's Tsavo West National Park, Mkomazi covers 3,234 square kilometres of semi-arid savanna.\n\nThe park's black rhino sanctuary is one of its most important features, protecting a small but growing population of eastern black rhino — one of the world's most critically endangered subspecies.\n\nEqually significant is Mkomazi's African wild dog breeding programme. Wild dogs are Africa's most endangered large carnivore, and the Mkomazi programme has successfully bred and released wild dogs into the Tanzanian ecosystem.",
    highlights: ["Black Rhino Sanctuary", "Wild Dog Breeding Programme", "Border with Tsavo", "450+ Bird Species", "Conservation Tourism", "Views of Kilimanjaro"],
    wildlife: ["Black Rhino", "African Wild Dog", "Elephant", "Giraffe", "Oryx", "Lesser Kudu", "Gerenuk", "Lion", "Leopard", "Vulturine Guineafowl"],
    bestTime: "June to October for dry season; year-round for rhino and wild dog visits",
  },
  "mikumi-national-park": {
    name: "Mikumi National Park",
    description:
      "Mikumi National Park is Tanzania's fourth-largest national park and by far its most accessible safari destination from Dar es Salaam. Located just 300 kilometres west along the Tanzania-Zambia Highway, Mikumi can be reached in approximately four hours.\n\nThe park's wildlife is most concentrated in the famous Mkata floodplain — a vast open grassland surrounded by mountain ranges. Lions, often seen resting on termite mounds, are among Mikumi's most photographed residents.\n\nThe predator population at Mikumi is remarkable for a park so close to a major city, with healthy populations of leopard and cheetah regularly sighted alongside lions and hyenas.",
    highlights: ["Closest Park to Dar es Salaam", "Mkata Floodplain", "Large Elephant Herds", "Lion Pride Viewing", "400+ Bird Species", "Easy Weekend Safari"],
    wildlife: ["Lion", "Elephant", "Buffalo", "Giraffe", "Hippo", "Zebra", "Wildebeest", "Leopard", "Cheetah", "Wild Dog", "Hyena"],
    bestTime: "June to October for dry season wildlife concentrations; year-round accessible from Dar es Salaam",
  },
  "udzungwa-national-park": {
    name: "Udzungwa Mountains National Park",
    description:
      "Udzungwa Mountains National Park is Tanzania's premier hiking destination and one of Africa's most significant biodiversity hotspots. The Udzungwa Mountains form part of the Eastern Arc Mountains — an ancient chain considered one of the world's most important biodiversity centres.\n\nThe park's most famous residents are its endemic primates. The Sanje mangabey — discovered by science in 1979 and found only in the Udzungwa Mountains — is one of Africa's rarest primates. The Iringa red colobus is another endemic species unique to this ecosystem.\n\nThe most popular route, the Sanje Waterfall Trail, follows a river through forest to the spectacular 170-metre Sanje Falls.",
    highlights: ["Eastern Arc Mountains Biodiversity", "Sanje Waterfall (170m)", "Endemic Sanje Mangabey", "Iringa Red Colobus", "400+ Bird Species", "Multi-Day Forest Treks"],
    wildlife: ["Sanje Mangabey (endemic)", "Iringa Red Colobus (endemic)", "Blue Monkey", "Olive Baboon", "Harvey's Red Duiker", "Abbott's Duiker", "African Civet", "Udzungwa Partridge (endemic)", "African Pitta"],
    bestTime: "June to October for dry hiking season; year-round for primate and bird watching",
  },
  "rubondo-island-national-park": {
    name: "Rubondo Island National Park",
    description:
      "Rubondo Island National Park is Tanzania's most unusual national park — a forested island sanctuary in the southwestern corner of Lake Victoria. Covering 456 square kilometres, Rubondo offers a distinctive safari experience combining primate encounters, aquatic wildlife, and exceptional fishing.\n\nThe island's chimpanzees were introduced in the 1960s as part of a rescue programme and now exhibit fully wild behaviours. Tracking them through dense forest is a memorable experience.\n\nRubondo also supports populations of sitatunga — a semi-aquatic antelope rarely seen in other parks — making it one of the most reliable places in East Africa to observe this distinctive species.",
    highlights: ["Lake Victoria Island", "Wild Chimpanzees", "Sitatunga Antelope", "Nile Perch Fishing", "Boat Safari", "Near-Zero Crowds"],
    wildlife: ["Chimpanzee", "Sitatunga", "Elephant", "Hippo", "Crocodile", "Giraffe", "Bushbuck", "African Fish Eagle", "Grey Crowned Crane", "Nile Perch"],
    bestTime: "June to September for dry season; December to February for fishing season peak",
  },
  "mahale-national-park": {
    name: "Mahale Mountains National Park",
    description:
      "Mahale Mountains National Park offers what many consider the single most magical animal encounter in Africa: spending an intimate morning with wild chimpanzees on the shores of Lake Tanganyika.\n\nThe M-Group chimpanzees — approximately 60 individuals — have been studied continuously since the 1960s, making it one of the longest-running primate research projects in the world.\n\nLake Tanganyika itself is the world's second-deepest lake with remarkably clear waters. Snorkelling reveals a colourful underwater world of endemic cichlid fish — over 250 species found nowhere else on Earth.",
    highlights: ["Wild Chimpanzee Tracking", "Lake Tanganyika Beach", "Remote Wilderness", "World-Class Snorkelling", "Primate Research Site", "Forest Hiking"],
    wildlife: ["Chimpanzee (M-Group)", "Red Colobus Monkey", "Blue Monkey", "Olive Baboon", "Leopard", "Bushbuck", "Nile Crocodile", "Cichlid Fish (endemic species)", "Forest Birds"],
    bestTime: "June to October for best chimpanzee tracking; May to October for overall dry season conditions",
  },
  "gombe-stream-national-park": {
    name: "Gombe Stream National Park",
    description:
      "Gombe Stream National Park holds a place in scientific history that few wildlife reserves can match. It was here that Jane Goodall began the longest-running continuous study of wild chimpanzees ever undertaken.\n\nThe habituated Kasekela chimpanzee community — approximately 100 individuals whose lineage has been documented since Goodall's earliest days — allows extraordinary proximity. Visitors regularly witness tool use, grooming sessions, and complex social behaviours.\n\nAt just 52 square kilometres, Gombe is Tanzania's smallest national park, but it encompasses a remarkable diversity of habitats along the shores of Lake Tanganyika.",
    highlights: ["Chimpanzee Trekking", "Jane Goodall Legacy", "Lake Tanganyika", "Primate Research"],
    wildlife: ["Chimpanzees", "Olive Baboons", "Red Colobus Monkeys", "Red-tailed Monkeys", "Blue Monkeys", "Bushbuck", "Bush Pigs", "African Fish Eagles", "Palm-nut Vultures", "Monitor Lizards"],
    bestTime: "July to October for dry season; chimps viewable year-round but trails easier during dry months",
  },
};

async function main() {
  console.log("Starting destination content migration...\n");

  let updated = 0;
  let created = 0;
  let skipped = 0;

  for (const [slug, content] of Object.entries(destinationContent)) {
    const existing = await prisma.destination.findUnique({
      where: { slug },
      select: { id: true, description: true, highlights: true, wildlife: true, bestTime: true },
    });

    if (existing) {
      const needsUpdate =
        !existing.description || existing.description.length < 100 ||
        existing.highlights.length === 0 ||
        existing.wildlife.length === 0 ||
        !existing.bestTime;

      if (needsUpdate) {
        await prisma.destination.update({
          where: { slug },
          data: {
            ...((!existing.description || existing.description.length < 100) && { description: content.description }),
            ...(existing.highlights.length === 0 && { highlights: content.highlights }),
            ...(existing.wildlife.length === 0 && { wildlife: content.wildlife }),
            ...(!existing.bestTime && { bestTime: content.bestTime }),
          },
        });
        console.log(`  Updated: ${slug}`);
        updated++;
      } else {
        console.log(`  Skipped: ${slug} (already has content)`);
        skipped++;
      }
    } else {
      await prisma.destination.create({
        data: {
          slug,
          name: content.name,
          circuit: "Northern",
          description: content.description,
          highlights: content.highlights,
          wildlife: content.wildlife,
          bestTime: content.bestTime,
        },
      });
      console.log(`  Created: ${slug}`);
      created++;
    }
  }

  console.log(`\nDone! Created: ${created}, Updated: ${updated}, Skipped: ${skipped}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
