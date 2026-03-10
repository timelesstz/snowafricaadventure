import { cache } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, Clock, Camera, Star } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { generateMetadata as genMeta } from "@/lib/seo";
import { SafariCard } from "@/components/cards/SafariCard";

interface Props {
  params: Promise<{ destSlug: string }>;
}

const getDestination = cache(async function getDestination(slug: string) {
  try {
    const destination = await prisma.destination.findUnique({
      where: { slug },
      include: {
        safaris: {
          where: { safari: { isActive: true } },
          take: 3,
          include: { safari: true },
        },
      },
    });
    return destination;
  } catch {
    return null;
  }
});

// Placeholder data for development (also used as fallback if DB record has no content)
const placeholderDestinations: Record<string, {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  heroImage: string;
  galleryImages: string[];
  highlights: string[];
  bestTimeToVisit: string;
  location: string;
  wildlife: string[];
  activities: string[];
}> = {
  "serengeti-national-park": {
    id: "1",
    name: "Serengeti National Park",
    slug: "serengeti-national-park",
    shortDescription:
      "The endless plains of Serengeti host the Great Migration and offer unparalleled wildlife viewing year-round.",
    description: `
      The Serengeti is Tanzania's oldest and most popular national park, and with good reason.
      The name "Serengeti" comes from the Maasai word "siringet" meaning "endless plains" -
      a perfect description of the 14,763 square kilometers of grassland, savanna, and woodland
      that make up this UNESCO World Heritage Site.

      The park is most famous for hosting the Great Migration, one of the most spectacular
      wildlife events on Earth. Each year, over 1.5 million wildebeest, accompanied by hundreds
      of thousands of zebras and gazelles, make their circular journey in search of fresh grazing.

      Beyond the migration, the Serengeti offers exceptional year-round wildlife viewing.
      The park is home to all of the Big Five - lion, leopard, elephant, buffalo, and rhino -
      as well as cheetahs, hyenas, giraffes, and over 500 bird species.
    `,
    heroImage: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/Serengeri-National-Park.jpg",
    galleryImages: [
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/Serengeri-National-Park.jpg",
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/32535628638_2be6219332_k-2.jpg",
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/05/safaritanzania.jpg",
    ],
    highlights: [
      "Great Migration",
      "Big Five",
      "Endless Plains",
      "Hot Air Balloons",
    ],
    bestTimeToVisit:
      "June to October for dry season; December to March for calving season",
    location: "Northern Tanzania, 335 km from Arusha",
    wildlife: [
      "Lion",
      "Leopard",
      "Elephant",
      "Buffalo",
      "Rhino",
      "Cheetah",
      "Wildebeest",
      "Zebra",
      "Giraffe",
      "Hippo",
    ],
    activities: [
      "Game Drives",
      "Hot Air Balloon Safari",
      "Walking Safari",
      "Bird Watching",
      "Photography",
    ],
  },
  "ngorongoro-crater": {
    id: "2",
    name: "Ngorongoro Crater",
    slug: "ngorongoro-crater",
    shortDescription:
      "The world's largest intact volcanic caldera, home to an incredible concentration of wildlife.",
    description: `
      The Ngorongoro Crater is often called the "Eighth Wonder of the World" - and once you've
      descended into this 600-meter-deep volcanic caldera, you'll understand why. Formed about
      2-3 million years ago when a giant volcano exploded and collapsed, the crater now shelters
      one of the most beautiful wildlife habitats on Earth.

      The crater floor spans approximately 260 square kilometers and is home to around 25,000
      large mammals, including the endangered black rhino. The crater's walls create a natural
      enclosure, meaning most animals remain resident year-round, making wildlife sightings
      almost guaranteed.

      The Ngorongoro Conservation Area is also culturally significant as one of the few places
      where wildlife and semi-nomadic Maasai pastoralists coexist, continuing their traditional
      way of life alongside the wild animals.
    `,
    heroImage: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/Ngorongoro-conservation-area.jpg",
    galleryImages: [
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/Ngorongoro-conservation-area.jpg",
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/05/Ngorongoro_Crater_Maasai_herding_mating_lion_couple-1.jpg",
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/05/ngorongoro-crater-ngorongoro-conservation-area.jpg",
    ],
    highlights: [
      "UNESCO World Heritage Site",
      "Big Five",
      "Crater Floor",
      "Maasai Culture",
    ],
    bestTimeToVisit:
      "Year-round; June to September for dry season; November to April for green season",
    location: "Northern Tanzania, 180 km from Arusha",
    wildlife: [
      "Black Rhino",
      "Lion",
      "Leopard",
      "Elephant",
      "Buffalo",
      "Hippo",
      "Flamingo",
      "Wildebeest",
      "Zebra",
      "Hyena",
    ],
    activities: [
      "Crater Floor Game Drive",
      "Maasai Village Visit",
      "Olduvai Gorge Tour",
      "Crater Rim Walk",
      "Bird Watching",
    ],
  },
  "tarangire-national-park": {
    id: "3",
    name: "Tarangire National Park",
    slug: "tarangire-national-park",
    shortDescription:
      "Famous for its giant baobab trees and large elephant herds, especially during the dry season.",
    description: `Tarangire National Park is Tanzania's sixth-largest national park and one of the most underrated gems of the Northern Circuit. Named after the Tarangire River that flows through its entire length, this park is best known for its vast elephant herds — some of the largest concentrations of elephants anywhere in Tanzania — and its iconic landscape studded with enormous ancient baobab trees that have stood for thousands of years.

Located just 120 kilometres from Arusha along the road towards Dodoma, Tarangire is remarkably accessible yet remains far less crowded than the Serengeti or Ngorongoro, making it an ideal addition to any northern Tanzania itinerary or a destination in its own right.

During the dry season from June through October, the Tarangire River becomes the only reliable water source across a vast semi-arid ecosystem, drawing extraordinary concentrations of wildlife from hundreds of kilometres around. Herds of 200 to 300 elephants are a common sight at the riverbanks, while lion prides, leopards, cheetahs, and large herds of buffalo, zebra, wildebeest, impala, and giraffe converge on this lifeline. This seasonal congregation rivals the famous wildlife spectacles of the Serengeti and is one of East Africa's most underappreciated safari experiences.

The baobab trees of Tarangire are among the most photographed in Africa. These extraordinary trees — some estimated to be over 1,000 years old — create a surreal landscape unlike anywhere else in Tanzania. The baobabs provide food and shelter for a remarkable range of wildlife, from elephant families stripping bark with their tusks, to hornbills nesting in hollow trunks, to vervet monkeys raiding the hanging fruit. At sunset, the baobab silhouettes against the golden sky create images that stay with visitors for a lifetime.

Tarangire holds one of Tanzania's highest concentrations of bird species — over 550 recorded species — making it a paradise for birding enthusiasts. The park is particularly famous for its populations of yellow-collared lovebird, ashy starling, and several species found nowhere else on Tanzania's northern circuit. The riparian forest along the Tarangire River hosts spectacular concentrations of green wood-hoopoe, African broadbill, and white-headed buffalo weaver. Migrant species arrive from Europe and northern Africa between November and April, significantly swelling the bird diversity.

The southern section of the park near Silale Swamp offers outstanding wildlife viewing in a remote setting that few visitors reach. Here, large herds of buffalo gather in the wet season alongside fringe-eared oryx, eland, greater kudu, and the striking gerenuk. The python population in Tarangire is notable — the African rock python, Africa's largest snake reaching up to six metres, is frequently spotted in the rocky outcrops and riverine vegetation.

Night game drives in Tarangire, available through select camps, reveal a completely different world of nocturnal hunters: honey badgers, genets, spring hares, aardvark, bush babies, and occasionally the elusive African wildcat emerge after dark. Walking safaris from mobile camps offer the rare opportunity to experience the park on foot — tracking wildlife through the bush with an expert guide in a way that connects you intimately with the landscape and its animal inhabitants.

Tarangire is best visited in combination with other northern circuit parks. A classic itinerary pairs Tarangire with Lake Manyara, Ngorongoro Crater, and the Serengeti for a comprehensive northern Tanzania experience covering all major ecosystems and wildlife spectacles. For a Kilimanjaro climbing trip combined with wildlife, a two or three-day Tarangire stop either before or after your climb makes for a perfectly balanced Tanzania adventure.`,
    heroImage: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/Tarangire-National-Park.jpg",
    galleryImages: [
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/Tarangire-National-Park.jpg",
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/39339368385_20d92a678c_k.jpg",
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/05/safaritanzania.jpg",
    ],
    highlights: [
      "Largest Elephant Herds in Tanzania",
      "Ancient Baobab Trees",
      "550+ Bird Species",
      "Tarangire River Wildlife Corridor",
      "Dry Season Concentrations",
      "Night Game Drives",
    ],
    bestTimeToVisit:
      "June to October for spectacular dry-season wildlife concentrations; November to April for birding and lush green landscapes",
    location: "Northern Tanzania, 120 km from Arusha",
    wildlife: [
      "Elephant",
      "Lion",
      "Leopard",
      "Cheetah",
      "Buffalo",
      "Giraffe",
      "Zebra",
      "Wildebeest",
      "African Rock Python",
      "Oryx",
      "Eland",
      "Greater Kudu",
      "Gerenuk",
      "Honey Badger",
    ],
    activities: [
      "Game Drives",
      "Walking Safari",
      "Night Game Drive",
      "Bird Watching",
      "Photography",
      "Bush Picnics",
    ],
  },
  "katavi-national-park": {
    id: "4",
    name: "Katavi National Park",
    slug: "katavi-national-park",
    shortDescription:
      "Tanzania's remote western wilderness, famous for extraordinary concentrations of hippos and buffalo during the dry season.",
    description: `Katavi National Park stands as one of Tanzania's most remote and least-visited wilderness areas, making it an extraordinary destination for those seeking an authentic African safari experience completely removed from the tourist crowds. Located in the far west of Tanzania, bordering the Democratic Republic of Congo and just south of Lake Tanganyika, Katavi occupies approximately 4,471 square kilometres of stunning landscape encompassing seasonal floodplains, dense miombo woodland, and the life-giving waters of Lake Katavi and Lake Chada.

The park's remoteness is precisely what makes it so extraordinary. Unlike the northern circuit parks where dozens of vehicles can converge on a single lion pride, in Katavi you may spend entire mornings watching wildlife spectacles with no other vehicle in sight. The solitude amplifies every experience, making each elephant encounter, each hippo confrontation, and each predator sighting feel like a private discovery in a truly wild Africa.

Katavi is most famous for the extraordinary dry-season concentrations of hippos that gather in the shrinking pools between June and October. As the seasonal floodplains dry out, hippos from across the park congregate in the remaining water bodies, sometimes numbering over 200 animals in a single pool. The sounds, sights, and smells of these massive aggregations are utterly unforgettable. Enormous territorial battles erupt frequently as the pools shrink and competition for space intensifies. Alongside the hippos, huge Nile crocodiles bask on the muddy banks, waiting patiently for opportunities that the confined space inevitably provides.

The elephant population at Katavi is equally remarkable. Large breeding herds of 50 to 100 elephants are commonly seen moving through the woodland areas, and during the dry season they congregate at the remaining waterholes in scenes reminiscent of Tanzania's golden era of safari photography. The elephants of Katavi tend to carry impressive ivory, reflecting generations of relatively undisturbed existence in this remote corner of Tanzania.

Buffalo herds at Katavi are legendary among wildlife enthusiasts. It is not unusual to encounter herds numbering several hundred animals, sometimes stretching across the floodplains as far as the eye can see. Lion prides follow these buffalo herds closely, and Katavi's lions are renowned for their buffalo-hunting expertise, having evolved specialised techniques for tackling prey far larger than themselves.

The Katuma River system flows through the park, feeding the seasonal lakes and supporting a remarkable concentration of wildlife year-round. During the wet season between November and May, the floodplains flood extensively and wildlife disperses across the landscape, with thousands of waterbirds — African spoonbill, yellow-billed stork, sacred ibis, and Goliath heron among them — arriving to exploit the rich conditions.

Getting to Katavi requires either a charter flight from Dar es Salaam, Arusha, or Ruaha, naturally making it suited to the fly-in safari market. Accommodation options are deliberately limited, with just a handful of exclusive camps offering high-quality service in an utterly remote setting. For the discerning traveller who has already experienced the northern circuit and seeks something genuinely different, Katavi National Park represents the pinnacle of the off-the-beaten-track African safari — a place where the modern world feels very far away indeed.`,
    heroImage: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/05/safaritanzania.jpg",
    galleryImages: [
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/05/safaritanzania.jpg",
    ],
    highlights: [
      "Hippo Concentrations",
      "Remote Wilderness",
      "Large Elephant Herds",
      "Legendary Buffalo Herds",
      "No Crowds",
      "Authentic Africa",
    ],
    bestTimeToVisit:
      "June to October for extraordinary dry-season hippo and wildlife concentrations",
    location: "Western Tanzania, near Lake Tanganyika",
    wildlife: [
      "Hippo",
      "Crocodile",
      "Elephant",
      "Buffalo",
      "Lion",
      "Leopard",
      "Topi",
      "Reedbuck",
      "African Spoonbill",
      "Yellow-Billed Stork",
    ],
    activities: [
      "Game Drives",
      "Walking Safari",
      "Bird Watching",
      "Photography",
      "Fly-In Safari",
    ],
  },
  "kitulo-national-park": {
    id: "5",
    name: "Kitulo National Park",
    slug: "kitulo-national-park",
    shortDescription:
      "Known as the 'Serengeti of Flowers', Kitulo is a high-altitude plateau paradise for wildflowers, orchids, and rare birds.",
    description: `Kitulo National Park is one of Tanzania's most unusual and enchanting national parks — a high-altitude montane grassland plateau that transforms into a breathtaking carpet of wildflowers between November and April each year. Located in the Kipengere Range of the Southern Highlands, close to the town of Makete in Njombe Region, Kitulo sits at elevations between 2,600 and 2,900 metres above sea level — high enough to experience cool, misty conditions typical of East Africa's Afromontane ecosystems.

The park earned its evocative nickname — the Serengeti of Flowers — from the BBC's David Attenborough, who described its seasonal floral displays as among the finest on the African continent. During the rainy season from November through April, the plateau erupts with over 350 species of wildflowers, including 45 species of terrestrial orchid. The sheer density and variety of blooms across the rolling grasslands creates an extraordinary spectacle: bright purple, yellow, orange, and white flowers stretching across the high plateau against a backdrop of dramatic mountain scenery.

The orchid diversity at Kitulo is particularly remarkable. Species of Disa, Eulophia, Habenaria, and Satyrium are all represented, creating what is considered one of the finest orchid-viewing experiences in sub-Saharan Africa. Botanists and flower enthusiasts from around the world make special journeys to Kitulo during the peak flowering season, often combining the visit with other Southern Highlands destinations like the Udzungwa Mountains.

Beyond its extraordinary floral displays, Kitulo is also an important site for birds. The park and surrounding highlands support a number of Albertine Rift endemic species and other range-restricted birds. Denham's bustard — a large, spectacular bird found in montane grasslands — breeds here, as does the rare mountain marsh widow. Other notable species include the blue swallow, a globally threatened migratory species that breeds in the Afromontane grasslands of Tanzania and Malawi; Njombe cisticola; and the striking Kipengere seedeater.

The plateau habitat also supports a number of mammal species typical of East African highlands: mountain reedbuck, leopard, serval cat, Lichtenstein's hartebeest, and the rare Abbott's duiker have all been recorded in the park and surrounding forest reserves.

Hiking through Kitulo's flower-studded grasslands is the primary activity for most visitors, with a network of trails crossing the plateau and offering views of the distant Livingstone Mountains and Lake Malawi on clear days. The experience is meditative and deeply restorative — wandering through acres of wildflowers in near-complete solitude, with only the sounds of wind, birds, and the crunch of grass underfoot.

Access to Kitulo is via road from Mbeya or Njombe, either of which can be reached by air from Dar es Salaam. The park is typically combined with visits to Mbeya, Ruaha National Park, or the Udzungwa Mountains as part of a Southern Tanzania circuit — an increasingly popular alternative to the northern circuit that rewards travellers with authentic, crowd-free experiences.`,
    heroImage: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/05/safaritanzania.jpg",
    galleryImages: [
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/05/safaritanzania.jpg",
    ],
    highlights: [
      "Serengeti of Flowers",
      "45 Orchid Species",
      "350+ Wildflower Species",
      "Rare Mountain Birds",
      "High-Altitude Plateau",
      "No Crowds",
    ],
    bestTimeToVisit:
      "November to April for peak wildflower and orchid displays; year-round for birdwatching",
    location: "Southern Highlands, Njombe Region, Tanzania",
    wildlife: [
      "Mountain Reedbuck",
      "Leopard",
      "Serval Cat",
      "Denham's Bustard",
      "Blue Swallow",
      "Abbott's Duiker",
      "Mountain Marsh Widow",
      "Terrestrial Orchids (45 spp)",
    ],
    activities: [
      "Wildflower Hiking",
      "Bird Watching",
      "Orchid Photography",
      "Nature Walks",
      "Landscape Photography",
    ],
  },
  "mahale-national-park": {
    id: "6",
    name: "Mahale Mountains National Park",
    slug: "mahale-national-park",
    shortDescription:
      "Track wild chimpanzees on the stunning shores of Lake Tanganyika in one of East Africa's most remote and beautiful parks.",
    description: `Mahale Mountains National Park offers what many wildlife enthusiasts consider the single most magical animal encounter available anywhere in Africa: spending an intimate morning with a habituated community of wild chimpanzees in their natural mountain forest habitat, on the shores of one of the world's oldest and deepest lakes. The combination of close chimpanzee encounters, pristine tropical forest, crystal-clear water, and utter remoteness makes Mahale one of East Africa's true bucket-list destinations.

Located on the eastern shore of Lake Tanganyika in western Tanzania, Mahale occupies 1,613 square kilometres of spectacular terrain ranging from the lake's turquoise shoreline at 772 metres elevation to the Mahale Mountain peaks at over 2,460 metres. The landscape is dramatically beautiful: forested mountain ridges plunge directly into the lake, creating dramatic scenery that has no parallel anywhere else in Tanzania.

Lake Tanganyika itself is an extraordinary natural wonder. The world's second-deepest lake after Lake Baikal in Russia and second-largest by volume, Tanganyika is estimated to be between nine and twelve million years old. Its waters are remarkably clear — visibility up to 20 metres in places — and its depths harbour hundreds of endemic cichlid fish species found nowhere else on Earth. Snorkelling in Tanganyika reveals a freshwater reef ecosystem as colourful and complex as any marine reef.

The primary draw for most visitors is the M-Group chimpanzees — a habituated community of approximately 60 individuals that has been studied continuously since the 1960s, making it one of the longest-running primate research projects in the world. Japanese primatologist Toshisada Nishida began studying the Mahale chimpanzees in 1965, and his work, alongside that of Jane Goodall at nearby Gombe, fundamentally transformed our understanding of chimpanzee society and behaviour.

Tracking the chimpanzees involves following their calls and trails through the dense forest, often for one to three hours, before encountering the group foraging, socialising, grooming, or resting. Unlike more easily habituated primates, chimpanzees remain essentially wild in their behaviour, making each encounter genuinely unpredictable and profoundly moving. Watching them use tools, display complex social behaviours, care for their young, and occasionally acknowledge your presence with a direct, intelligent gaze creates an emotional connection unlike any other wildlife experience.

Beyond the chimpanzees, Mahale's forests support a rich biodiversity including red colobus monkey, blue monkey, red-tailed monkey, olive baboon, and an exceptional variety of forest birds. The park's location at the western edge of the Eastern Arc Mountains ensures high endemism across all taxa.

Accommodation at Mahale is exclusively at a small number of luxury bush camps situated on the lakeshore, combining chimpanzee tracking with swimming and snorkelling in Tanganyika's crystal waters, sunset kayaking, and fishing for the famous Nile perch and yellowbelly cichlids. The combination of mountain forest adventure and beach-style relaxation on a pristine African lake is uniquely Mahale's own.`,
    heroImage: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/05/safaritanzania.jpg",
    galleryImages: [
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/05/safaritanzania.jpg",
    ],
    highlights: [
      "Wild Chimpanzee Tracking",
      "Lake Tanganyika Beach",
      "Remote Wilderness",
      "World-Class Snorkelling",
      "Primate Research Site",
      "Forest Hiking",
    ],
    bestTimeToVisit:
      "June to October for best chimpanzee tracking; May to October for overall dry season conditions",
    location: "Western Tanzania, eastern shore of Lake Tanganyika",
    wildlife: [
      "Chimpanzee (M-Group)",
      "Red Colobus Monkey",
      "Blue Monkey",
      "Olive Baboon",
      "Leopard",
      "Bushbuck",
      "Nile Crocodile",
      "Cichlid Fish (endemic species)",
      "Forest Birds",
    ],
    activities: [
      "Chimpanzee Tracking",
      "Snorkelling",
      "Swimming",
      "Kayaking",
      "Forest Hiking",
      "Bird Watching",
      "Fishing",
    ],
  },
  "mikumi-national-park": {
    id: "7",
    name: "Mikumi National Park",
    slug: "mikumi-national-park",
    shortDescription:
      "Tanzania's most accessible safari destination, just 300 km from Dar es Salaam, offering excellent wildlife viewing in the famous Mkata floodplain.",
    description: `Mikumi National Park holds the distinction of being Tanzania's fourth-largest national park and by far its most accessible safari destination from the commercial capital Dar es Salaam. Located just 300 kilometres west of Dar es Salaam along the Tanzania-Zambia Highway, Mikumi can be reached by road in approximately four hours, making it ideal for weekend safaris, short breaks from the city, and first-time safari experiences that combine easily with a beach extension at Zanzibar or Dar es Salaam.

The park covers 3,230 square kilometres of varied habitat, but its wildlife is most concentrated in the famous Mkata floodplain — a vast open grassland surrounded by mountain ranges that creates one of Tanzania's most dramatic safari landscapes. During the dry season from June to October, the floodplain becomes a wildlife haven as animals congregate around the Mkata River and its tributaries. Lions, often seen resting on termite mounds that offer both elevated views and cooling breezes, are among Mikumi's most photographed residents.

Elephant herds are a constant feature of the Mkata floodplain, with family groups of up to 30 individuals frequently encountered at close range. The elephants of Mikumi have become relatively relaxed in the presence of vehicles, offering outstanding photographic opportunities. Buffaloes gather in impressive herds, particularly in the early morning and late afternoon when they move to and from water sources.

Giraffes are ubiquitous in Mikumi's acacia woodlands, their elegant forms visible from considerable distances as they browse on umbrella thorn and fever trees. Hippos occupy every waterhole and pool in the floodplain, their characteristic snorting and grunting adding a constant soundtrack to the safari experience. Zebra and wildebeest herds move across the plains in large numbers, attracting hunting hyenas and occasional wild dogs.

The predator population at Mikumi is remarkable for a park so close to a major city. In addition to lions and hyenas, Mikumi supports healthy populations of leopard and cheetah, both of which are regularly sighted by patient observers in the early morning and late afternoon. Wild dogs, though less predictable, have been recorded in the park and its buffer zones.

Mikumi's birdlife is spectacular, with over 400 species recorded across the park's varied habitats. The floodplain hosts large wading birds including saddle-billed stork, yellow-billed stork, and African spoonbill, while the woodland areas shelter lilac-breasted roller, southern ground hornbill, and numerous raptor species. The park's proximity to Udzungwa Mountains National Park means birders can easily combine both parks in a single southern Tanzania itinerary.

For travellers arriving on international flights to Dar es Salaam, Mikumi offers an excellent introduction to Tanzania's wildlife before or after a Zanzibar beach stay — a classic combination that many operators refer to as the "Safari & Beach" experience. The park also forms the northern gateway to the Selous ecosystem and can be combined with a visit to Nyerere National Park (formerly Selous Game Reserve) for a more comprehensive southern Tanzania safari.`,
    heroImage: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/05/safaritanzania.jpg",
    galleryImages: [
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/05/safaritanzania.jpg",
    ],
    highlights: [
      "Closest Park to Dar es Salaam",
      "Mkata Floodplain",
      "Large Elephant Herds",
      "Lion Pride Viewing",
      "400+ Bird Species",
      "Easy Weekend Safari",
    ],
    bestTimeToVisit:
      "June to October for dry season wildlife concentrations; year-round accessible from Dar es Salaam",
    location: "Eastern Tanzania, 300 km west of Dar es Salaam",
    wildlife: [
      "Lion",
      "Elephant",
      "Buffalo",
      "Giraffe",
      "Hippo",
      "Zebra",
      "Wildebeest",
      "Leopard",
      "Cheetah",
      "Wild Dog",
      "Hyena",
    ],
    activities: [
      "Game Drives",
      "Bird Watching",
      "Photography",
      "Night Game Drive",
      "Bush Walk",
    ],
  },
  "mkomazi-national-park": {
    id: "8",
    name: "Mkomazi National Park",
    slug: "mkomazi-national-park",
    shortDescription:
      "Home to a critical black rhino sanctuary and African wild dog breeding programme in northern Tanzania's dramatic arid landscape.",
    description: `Mkomazi National Park occupies a special place in Tanzania's conservation story. Located in the Kilimanjaro and Tanga Regions of northeastern Tanzania, bordering Kenya's Tsavo West National Park to the north, Mkomazi covers 3,234 square kilometres of semi-arid savanna and thornbush that supports two of Africa's most endangered large mammals through dedicated conservation programmes.

The park's black rhino sanctuary is one of its most important features. Established in the 1990s through a partnership between the Tanzanian government and the George Adamson Wildlife Preservation Trust, the rhino sanctuary currently protects a small but growing population of eastern black rhino — one of the world's most critically endangered subspecies. The sanctuary operates under strict security protocols, and sightings of the resident rhinos, while not guaranteed, are possible during carefully guided visits. Contributing to the recovery of this species from the brink of extinction gives visits to Mkomazi a conservation dimension that adds real meaning to the safari experience.

Equally significant is Mkomazi's African wild dog breeding programme, run by the same trust. Wild dogs — also known as painted wolves or painted dogs — are Africa's most endangered large carnivore, with a global population estimated at fewer than 7,000 individuals. The Mkomazi programme has successfully bred and released wild dogs into the Tanzanian ecosystem, contributing meaningfully to the regional recovery of this spectacular pack-hunting predator.

The landscape of Mkomazi is strikingly different from Tanzania's better-known parks. The semi-arid thornbush and rocky hillsides, interspersed with seasonal riverbeds and occasional baobab trees, create a harsh but beautiful environment with a distinctive East African character. The Kilimanjaro massif is visible on the horizon from many parts of the park, providing a dramatic backdrop to game drives.

Wildlife beyond the rhinos and wild dogs includes healthy populations of elephant, giraffe, zebra, eland, oryx, lesser kudu, gerenuk (the long-necked gazelle unique to drier East African habitats), and Grant's gazelle. The predator suite includes lion and leopard, while cheetah are occasionally sighted in the open plains areas. The park's proximity to Kenya's Tsavo means wildlife moves freely between ecosystems, and populations of lion and elephant in particular are shared across the international boundary.

Mkomazi's bird list exceeds 450 species, with many dry-country specialists not easily found in Tanzania's wetter northern parks. Vulturine guineafowl — one of Africa's most spectacular birds — is commonly encountered along the park's roadsides and tracks. Yellow-necked spurfowl, Somali bee-eater, and various species of lark and wheatear reflect the park's arid character.

The park can be combined with a Kilimanjaro climb or an Amboseli National Park visit across the Kenyan border, making it an excellent addition to any northern Tanzania itinerary. Same-species viewing at Mkomazi — particularly the rhinos and wild dogs — gives the park a unique value that no other Tanzanian destination quite matches.`,
    heroImage: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/05/safaritanzania.jpg",
    galleryImages: [
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/05/safaritanzania.jpg",
    ],
    highlights: [
      "Black Rhino Sanctuary",
      "Wild Dog Breeding Programme",
      "Border with Tsavo",
      "450+ Bird Species",
      "Conservation Tourism",
      "Views of Kilimanjaro",
    ],
    bestTimeToVisit:
      "June to October for dry season; year-round for rhino and wild dog visits",
    location: "Northeastern Tanzania, bordering Kenya's Tsavo West",
    wildlife: [
      "Black Rhino",
      "African Wild Dog",
      "Elephant",
      "Giraffe",
      "Oryx",
      "Lesser Kudu",
      "Gerenuk",
      "Lion",
      "Leopard",
      "Vulturine Guineafowl",
    ],
    activities: [
      "Rhino Sanctuary Visit",
      "Wild Dog Programme Tour",
      "Game Drives",
      "Bird Watching",
      "Photography",
      "Conservation Education",
    ],
  },
  "ruaha-national-park": {
    id: "9",
    name: "Ruaha National Park",
    slug: "ruaha-national-park",
    shortDescription:
      "Tanzania's largest national park, offering raw, uncrowded wilderness with exceptional predator viewing along the Great Ruaha River.",
    description: `Ruaha National Park is Tanzania's largest national park — covering over 20,226 square kilometres — and widely considered one of Africa's finest and least-crowded safari destinations. Located in central Tanzania, approximately 625 kilometres west of Dar es Salaam and 130 kilometres from the town of Iringa, Ruaha offers a safari experience defined by extraordinary wildlife density, dramatic landscapes, and a profound sense of wilderness that is increasingly rare across the continent.

The park takes its name from the Great Ruaha River, which flows along the park's southern and eastern boundaries before emptying into the Indian Ocean via the Rufiji Delta. During the dry season from May through October, the Great Ruaha River becomes the central focus of wildlife activity — enormous herds of elephant, buffalo, giraffe, zebra, and various antelope species congregate along its banks, while crocodiles and hippos occupy every pool. The riverine landscape — ancient tamarind trees, fig trees, and borassus palms reflecting in the calm water — is among the most photogenic in all of Africa.

Ruaha supports what is believed to be Tanzania's largest elephant population — some estimates suggest over 12,000 individuals, making it one of the most significant elephant sanctuaries in East Africa. Encounters with elephant families of 50 or more animals at the river's edge are common during the dry season, and the park's relative remoteness means these elephants retain their natural, undisturbed behaviours.

The predator watching at Ruaha is exceptional. The park supports the world's largest recorded population of greater kudu outside southern Africa, and this abundance of large prey supports dense populations of lion. Walking safari operators consistently describe Ruaha's lion watching as among the finest in Africa — the prides here are large, frequently encountered, and extraordinarily relaxed in the presence of vehicles. Leopard sightings are common both in the riverine woodland and on rocky kopjes, where the spotted cats rest in the shade during the heat of the day.

African wild dogs are perhaps Ruaha's most celebrated residents. The park supports one of Tanzania's largest wild dog populations, and the open woodland terrain makes tracking the dogs' early morning hunts a genuine possibility. Cheetah and caracal are also present in the more open plains areas, while spotted hyena are common throughout the park.

The birdlife of Ruaha is extraordinary, with over 570 recorded species spanning the full range of East African habitats. The combination of miombo woodland, riverine forest, seasonal floodplains, and rocky escarpments supports species found nowhere else in Tanzania. Lilac-breasted rollers, martial eagles, and numerous kingfisher species are among the photographic highlights.

Walking safaris are a particular speciality at Ruaha, with several camps offering multi-day fly-camping experiences following elephant and predator trails through the bush on foot. This ground-level perspective transforms the safari experience, bringing you face-to-face with the smaller details of the ecosystem — tracks, plants, insects, and birds — alongside the genuine possibility of close encounters with large wildlife. For adventurous travellers seeking the definitive off-the-beaten-track Tanzania experience, Ruaha National Park is unrivalled.`,
    heroImage: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/05/safaritanzania.jpg",
    galleryImages: [
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/05/safaritanzania.jpg",
    ],
    highlights: [
      "Tanzania's Largest Park",
      "Great Ruaha River",
      "Largest Elephant Population",
      "Exceptional Lion Watching",
      "African Wild Dogs",
      "Walking Safari Specialist",
      "570+ Bird Species",
    ],
    bestTimeToVisit:
      "May to October for dry season; June to September for peak wildlife concentration along the river",
    location: "Central Tanzania, 625 km west of Dar es Salaam",
    wildlife: [
      "Elephant",
      "Lion",
      "Leopard",
      "African Wild Dog",
      "Cheetah",
      "Buffalo",
      "Greater Kudu",
      "Sable Antelope",
      "Hippo",
      "Crocodile",
      "Roan Antelope",
    ],
    activities: [
      "Game Drives",
      "Walking Safari",
      "Fly-Camping",
      "Bird Watching",
      "Night Game Drive",
      "Photography",
    ],
  },
  "rubondo-island-national-park": {
    id: "10",
    name: "Rubondo Island National Park",
    slug: "rubondo-island-national-park",
    shortDescription:
      "Lake Victoria's hidden safari gem — an island sanctuary with chimpanzees, sitatunga antelope, and outstanding fishing.",
    description: `Rubondo Island National Park is Tanzania's most unusual national park — a forested island sanctuary in the southwestern corner of Lake Victoria, the world's largest tropical lake and Africa's largest lake by surface area. Covering 456 square kilometres of forest, wetland, and lakeshore, Rubondo offers an utterly distinctive safari experience that combines primate encounters, aquatic wildlife, exceptional fishing, and bird watching in one of Africa's most unusual ecosystems.

The island's chimpanzees are perhaps its most compelling attraction. A group of chimpanzees was introduced to the island in the 1960s and 1970s as part of a rescue programme for animals from European zoos and circuses. Having lived wild on the island for several generations, these chimpanzees now exhibit fully wild behaviours despite their unusual origin story. Tracking them through the island's dense forest, where the canopy creates a cathedral-like light and the humidity signals a truly tropical ecosystem, is a memorable and moving experience.

In addition to chimpanzees, Rubondo supports populations of sitatunga — a semi-aquatic antelope found in papyrus swamps and forest margins near water. Sitatunga are elusive and rarely seen in other Tanzanian parks, making Rubondo one of the most reliable places in East Africa to observe this distinctive waterlogged specialist. The island also supports elephant, hippopotamus, bushbuck, vervet monkey, and a small population of giraffe introduced during the same 1960s conservation programme.

Lake Victoria surrounds the island in every direction, and the lake itself is integral to the Rubondo experience. Boat safaris along the forested shoreline offer extraordinary bird watching and opportunities to observe hippos, crocodiles, and fish eagles at close range. The lake's waters support huge populations of Nile perch, making Rubondo one of East Africa's premier fishing destinations — the massive perch, which can exceed 100 kg, provide some of the most dramatic freshwater fishing available anywhere on the continent.

The bird life on Rubondo and the surrounding lake is exceptional. Africa's largest colony of the grey crowned crane, Uganda's national bird, has historically been found on the island. African fish eagle — with its haunting cry — is ubiquitous along the shoreline. The papyrus beds harbour secretive papyrus yellow warbler, shoebill stork is occasionally recorded in suitable wetland habitat, and the forest supports an impressive range of forest kingfishers, sunbirds, and weavers.

Getting to Rubondo requires either a charter flight to the island's grass airstrip or a boat journey from the mainland lake port of Nkome. The combination of remoteness and uniqueness means Rubondo receives very few visitors — typically a few hundred per year — making it one of Tanzania's most exclusive and uncrowded wildlife destinations. It pairs naturally with the Serengeti ecosystem for travellers combining the two as part of a western Tanzania circuit, and it represents a truly off-the-beaten-track experience that most safari travellers never discover.`,
    heroImage: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/05/safaritanzania.jpg",
    galleryImages: [
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/05/safaritanzania.jpg",
    ],
    highlights: [
      "Lake Victoria Island",
      "Wild Chimpanzees",
      "Sitatunga Antelope",
      "Nile Perch Fishing",
      "Boat Safari",
      "Near-Zero Crowds",
    ],
    bestTimeToVisit:
      "June to September for dry season; December to February for fishing season peak",
    location: "Lake Victoria, northwestern Tanzania",
    wildlife: [
      "Chimpanzee",
      "Sitatunga",
      "Elephant",
      "Hippo",
      "Crocodile",
      "Giraffe",
      "Bushbuck",
      "African Fish Eagle",
      "Grey Crowned Crane",
      "Nile Perch",
    ],
    activities: [
      "Chimpanzee Tracking",
      "Boat Safari",
      "Nile Perch Fishing",
      "Bird Watching",
      "Swimming",
      "Forest Hiking",
    ],
  },
  "selous-game-reserve": {
    id: "11",
    name: "Selous Game Reserve (Nyerere National Park)",
    slug: "selous-game-reserve",
    shortDescription:
      "Africa's largest protected area and UNESCO World Heritage Site, famous for boat safaris along the Rufiji River and wild dog packs.",
    description: `The Selous Game Reserve — recently renamed Nyerere National Park in its core area in honour of Tanzania's founding president Julius Nyerere — is Africa's single largest protected wildlife area. Spanning approximately 50,000 square kilometres (roughly the size of Denmark), the Selous ecosystem is a UNESCO World Heritage Site and one of the world's last truly great wilderness areas. The sheer scale of the place is difficult to comprehend: a landscape of miombo woodland, seasonal floodplains, lakes, and river systems so vast that it creates a world unto itself.

The Rufiji River is the Selous's lifeblood and its greatest attraction. Africa's largest river system south of the Zambezi, the Rufiji cuts through the heart of the reserve, creating a network of channels, lakes, and oxbow pools that support extraordinary concentrations of wildlife. The park's famous boat safaris drift silently along the Rufiji's banks, bringing visitors face-to-face with hippo families resting in the shallows, massive Nile crocodiles basking on sand bars, and herds of buffalo coming to drink. The experience of viewing wildlife from the water — at eye level with hippos and crocodiles — is profoundly different from any land-based safari.

The Selous supports Africa's largest population of hippopotamus — estimated at over 40,000 individuals — and one of the continent's largest crocodile populations. During the dry season from May to October, the Rufiji pools concentrate both species to dramatic densities, with hundreds of hippos packed into shrinking pools and dozens of crocodiles sunning on every available bank.

Large elephant herds move through the reserve's vast miombo woodland, though elephant numbers have been severely impacted by historical poaching. Conservation efforts have stabilised and begun to reverse this decline, and Selous elephants are now frequently encountered in the northern sectors of the reserve near the Rufiji River.

African wild dogs — Africa's most endangered large carnivore — find their stronghold in the Selous. The reserve's vast, lightly populated miombo woodland is ideal territory for the dogs' large pack ranges, and the Selous population of several hundred individuals is one of the most important in Africa. Watching a wild dog pack hunt through the woodland on a game drive, or encountering them at a kill, is one of East Africa's most electric wildlife experiences.

The Selous's bird list exceeds 440 species, with the riverine and lacustrine habitats attracting spectacular waterbirds including African skimmer, white-backed night heron, malachite kingfisher, and palm-nut vulture. Walking safaris through the miombo are offered by several operators, providing a ground-level safari experience in landscapes of great character.

The Nyerere National Park sector of the reserve — the tourism zone in the northern section — is accessed by charter flight from Dar es Salaam in approximately one hour, or by road in a longer drive. The park pairs naturally with Mikumi National Park (driving distance away) and Zanzibar for a classic "South Tanzania and Beach" itinerary that many travellers consider the ultimate Tanzania combination.`,
    heroImage: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/05/safaritanzania.jpg",
    galleryImages: [
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/05/safaritanzania.jpg",
    ],
    highlights: [
      "Africa's Largest Protected Area",
      "UNESCO World Heritage Site",
      "Rufiji River Boat Safaris",
      "Largest Hippo Population in Africa",
      "Wild Dog Stronghold",
      "440+ Bird Species",
    ],
    bestTimeToVisit:
      "June to October for dry season; July to September for peak wildlife viewing along the Rufiji River",
    location: "Southern Tanzania, approximately 230 km from Dar es Salaam",
    wildlife: [
      "Hippo",
      "Crocodile",
      "Elephant",
      "African Wild Dog",
      "Lion",
      "Leopard",
      "Buffalo",
      "Sable Antelope",
      "African Skimmer",
      "White-Backed Night Heron",
    ],
    activities: [
      "Boat Safari",
      "Game Drives",
      "Walking Safari",
      "Bird Watching",
      "Fly-Camping",
      "Photography",
    ],
  },
  "udzungwa-national-park": {
    id: "12",
    name: "Udzungwa Mountains National Park",
    slug: "udzungwa-national-park",
    shortDescription:
      "Tanzania's hiking and primate paradise — home to endemic species, stunning waterfalls, and the famous Sanje Waterfall trek.",
    description: `Udzungwa Mountains National Park is Tanzania's premier hiking destination and one of Africa's most significant biodiversity hotspots. Located in the Southern Highlands of Tanzania, approximately 350 kilometres from Dar es Salaam, the Udzungwa Mountains form part of the Eastern Arc Mountains — an ancient chain of mountain blocks that have acted as an island of moist forest for millions of years, generating extraordinary levels of plant and animal endemism.

The Eastern Arc Mountains are considered one of the world's most important biodiversity centres, rivalling the Galapagos Islands and the Amazon Basin in terms of the proportion of endemic species relative to total area. The Udzungwa sector alone protects over 400 species of endemic or near-endemic plants, and several animal species found nowhere else on Earth.

The park's most famous residents are its endemic primates. The Sanje mangabey — a large, endangered monkey discovered by science in 1979 and found only in the Udzungwa Mountains — is one of Africa's rarest primates and can be observed in the forest around the park headquarters near Mang'ula. The Iringa red colobus, another endemic primate species unique to the Udzungwa ecosystem, is frequently encountered in troops along forest trails. These close encounters with critically rare primates, in a setting of extraordinary forest beauty, are among Tanzania's most genuinely exceptional wildlife experiences.

The park's trail network offers hiking experiences ranging from short nature walks to multi-day wilderness treks for well-prepared adventurers. The most popular route, the Sanje Waterfall Trail, follows a river through the forest to reach the spectacular Sanje Falls — a 170-metre waterfall that plunges through the forest canopy in a series of cascades. The hike to Sanje takes approximately four hours return and passes through several forest types, offering excellent primate and bird watching along the way.

The Mwanihana Peak Trail leads to the highest point in the park at 2,576 metres above sea level — a demanding multi-day trek through diverse forest zones from lowland tropical forest through montane forest to high-altitude grassland. The journey to the summit passes through habitats rich in bird life and offers spectacular views over the Kilombero Valley below.

The birdlife of the Udzungwa Mountains is exceptional even by Tanzania's high standards. Over 400 species have been recorded, including 28 species endemic to the Eastern Arc Mountains. The Udzungwa partridge, Rufous-winged sunbird, and Nduk eagle owl are among the species that dedicated birders make special pilgrimages to observe. The forest understory rings with the calls of African pitta, cinnamon-chested bee-eater, and multiple species of hornbill and sunbird.

Udzungwa is typically combined with a visit to Mikumi National Park — just 60 kilometres away by road — and together they form the core of an excellent southern Tanzania circuit. The combination of waterfall hiking, primate encounters, and classic game viewing across two very different habitats makes the Mikumi-Udzungwa combination one of Tanzania's most rewarding and undervisited itineraries.`,
    heroImage: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/05/safaritanzania.jpg",
    galleryImages: [
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/05/safaritanzania.jpg",
    ],
    highlights: [
      "Eastern Arc Mountains Biodiversity",
      "Sanje Waterfall (170m)",
      "Endemic Sanje Mangabey",
      "Iringa Red Colobus",
      "400+ Bird Species",
      "Multi-Day Forest Treks",
    ],
    bestTimeToVisit:
      "June to October for dry hiking season; year-round for primate and bird watching",
    location: "Southern Tanzania, 350 km from Dar es Salaam",
    wildlife: [
      "Sanje Mangabey (endemic)",
      "Iringa Red Colobus (endemic)",
      "Blue Monkey",
      "Olive Baboon",
      "Harvey's Red Duiker",
      "Abbott's Duiker",
      "African Civet",
      "Udzungwa Partridge (endemic)",
      "African Pitta",
    ],
    activities: [
      "Sanje Waterfall Trek",
      "Mwanihana Peak Hike",
      "Primate Tracking",
      "Bird Watching",
      "Forest Nature Walks",
      "Photography",
    ],
  },
  "gombe-stream-national-park": {
    id: "13",
    name: "Gombe Stream National Park",
    slug: "gombe-stream-national-park",
    shortDescription:
      "Tanzania's smallest national park and birthplace of Jane Goodall's pioneering chimpanzee research. Home to habituated chimpanzee communities on the shores of Lake Tanganyika.",
    description: `Gombe Stream National Park holds a place in scientific history that few wildlife reserves anywhere in the world can match. It was here, on the forested slopes above Lake Tanganyika in western Tanzania, that a young British researcher named Jane Goodall arrived in July 1960 to begin what would become the longest-running continuous study of wild chimpanzees ever undertaken. Her discoveries at Gombe — that chimpanzees fashion and use tools, that they hunt cooperatively, that they form complex social bonds marked by affection, rivalry, grief, and even warfare — fundamentally redefined the boundary between humans and the rest of the animal kingdom. More than six decades later, the research station she established continues to operate, and the chimpanzees she first observed have descendants that visitors can track through the same forests today.

Gombe Stream sits on the eastern shore of Lake Tanganyika in the Kigoma Region of western Tanzania. At just 52 square kilometres, it is Tanzania's smallest national park — a narrow strip of mountainous terrain stretching roughly 16 kilometres along the lakeshore and reaching only about three kilometres inland. Despite its diminutive size, the park encompasses a remarkable diversity of habitats. Steep valleys carved by seasonal streams run from the ridgeline down to the lake, their slopes cloaked in thick gallery forest, open woodland, and grassland. The terrain is rugged and intimate in a way that larger, flatter parks simply cannot replicate: every trail leads through dense vegetation alive with the sounds of primates calling, birds singing, and streams tumbling over mossy rocks.

The star attraction is, without question, the habituated Kasekela chimpanzee community — a group of approximately 100 individuals whose lineage has been documented by researchers since Goodall's earliest days. These are among the most studied wild animals on the planet, and their habituation to human presence allows visitors an extraordinary degree of proximity. Chimpanzee trekking at Gombe begins with a guided walk from the lakeshore into the forest, following trails that wind uphill through the trees. The guides — many of whom have spent decades working alongside researchers — listen for the distinctive pant-hoot calls that reveal the chimps' location, then lead visitors through the undergrowth to find them. Once the group is located, visitors are permitted to spend one hour observing the chimpanzees at close range.

What makes this hour so memorable is the sheer range of behaviours on display. Visitors regularly witness tool use — chimpanzees stripping twigs to extract termites from mounds, exactly the behaviour that Goodall first documented in 1960 and that overturned the long-held belief that only humans used tools. Grooming sessions, in which individuals sit in pairs or small groups carefully picking through each other's fur, reveal the intricate social bonds that hold the community together. Mothers nurse and play with infants, adolescents roughhouse and test boundaries, and dominant males patrol their territory with dramatic displays of strength — charging through the undergrowth, drumming on tree buttresses, and hurling branches. Occasionally, visitors may witness a hunt, as the Kasekela chimpanzees are known to cooperatively pursue red colobus monkeys through the canopy, a behaviour that was first described scientifically at Gombe.

Beyond the chimpanzees, Gombe supports a rich community of other primates that visitors encounter along the forest trails. Olive baboons are abundant throughout the park and are themselves the subject of long-term research at Gombe, with several troops habituated to human observers. Red-tailed monkeys, easily identified by their distinctive russet tails and white nose spots, forage in the mid-canopy and are frequently seen in mixed-species groups with blue monkeys. Red colobus monkeys — the chimpanzees' occasional prey — occupy the upper canopy in noisy troops, their acrobatic leaps between branches a constant spectacle overhead. Vervet monkeys are common along the lakeshore and around the park's simple accommodation. In total, Gombe supports more primate species per square kilometre than almost any comparable area in East Africa.

Lake Tanganyika itself forms a spectacular backdrop to the entire Gombe experience. The world's longest freshwater lake — stretching nearly 700 kilometres from north to south — and the second deepest after Siberia's Lake Baikal, Tanganyika holds an estimated 17 per cent of the world's surface fresh water. At Gombe, its waters are remarkably clear, with visibility often exceeding 15 metres. Swimming in the lake after a morning of chimpanzee trekking is one of the great simple pleasures of East African travel, and snorkelling reveals a colourful underwater world of endemic cichlid fish — the lake harbours over 250 species found nowhere else on Earth. The sunsets over the lake, with the mountains of the Democratic Republic of Congo visible on the far shore, are among the most beautiful in all of Tanzania.

The birdlife at Gombe is impressive, with over 200 species recorded within the park's compact boundaries. African fish eagles are a constant presence along the lakeshore, their piercing calls one of the defining sounds of Lake Tanganyika. Palm-nut vultures soar above the forest canopy, while the thick undergrowth shelters Peter's twinspot, Ross's turaco, and numerous species of sunbird and weaver. For dedicated birders, the combination of lakeshore, forest, and woodland habitats within such a small area makes Gombe remarkably productive.

Reaching Gombe is itself part of the adventure and adds to the park's sense of remoteness and exclusivity. There is no road access — the park can only be reached by boat. Most visitors fly from Arusha, Dar es Salaam, or the Serengeti to Kigoma, the regional capital on Lake Tanganyika, and then take a motorboat along the lakeshore to the park — a journey of roughly 25 kilometres that takes between one and two hours depending on conditions. The boat ride, with forested hills rising steeply from the water and fishing villages dotting the shoreline, is a memorable experience in its own right and immediately establishes that Gombe is a place apart from the well-trodden northern safari circuit.

The best time to visit Gombe is during the dry season from July to October, when forest trails are easier to navigate and visibility through the undergrowth is at its best, making chimpanzee tracking more straightforward. However, the chimpanzees are present and viewable year-round, and the wet season from November to May brings lush green forests and excellent birdwatching as migratory species arrive. The park's equatorial location means temperatures are warm throughout the year.

Accommodation within the park is deliberately simple, reflecting Gombe's character as a research site rather than a luxury safari destination. The park operates basic bandas — simple shelters with beds and mosquito nets — and a small tented camp near the lakeshore. The simplicity of the accommodation is part of Gombe's charm: evenings are spent listening to the forest sounds, watching the stars over the lake, and absorbing the profound sense of place that comes from sleeping in the same landscape where some of the most important discoveries in primatology were made.

The Jane Goodall research station continues to operate within the park, staffed by Tanzanian researchers who carry on the tradition of daily chimpanzee observation that has now accumulated over six decades of continuous data. Visitors can learn about the ongoing research, the challenges of chimpanzee conservation in a landscape under pressure from surrounding communities, and the broader work of the Jane Goodall Institute in protecting great apes across Africa. The educational dimension of a Gombe visit is significant: this is not simply a wildlife experience, but an encounter with the history and future of conservation science.

Travellers often compare Gombe with Mahale Mountains National Park, Tanzania's other great chimpanzee trekking destination located further south on the same lake. Both parks offer extraordinary chimp encounters on the shores of Lake Tanganyika, but they differ in character. Mahale is larger, more remote, and served by exclusive luxury camps, while Gombe is more accessible from Kigoma and carries the unmatched historical connection to Jane Goodall and the birth of modern primatology. Many visitors who have the time and budget choose to visit both, but for those making a single choice, Gombe's combination of scientific heritage, intimate forest trekking, and the chance to observe the descendants of the very chimpanzees that changed our understanding of what it means to be human makes it one of the most profoundly rewarding wildlife experiences in Africa.`,
    heroImage: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/Gombe-Stream-National-Park.jpg",
    galleryImages: [
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/Gombe-Stream-National-Park.jpg",
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/Gombe-Stream-National-Park.jpg",
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/Gombe-Stream-National-Park.jpg",
    ],
    highlights: ["Chimpanzee Trekking", "Jane Goodall Legacy", "Lake Tanganyika", "Primate Research"],
    bestTimeToVisit:
      "July to October (dry season); chimps viewable year-round but trails are easier and visibility better during dry months",
    location: "Western Tanzania, Kigoma Region",
    wildlife: [
      "Chimpanzees",
      "Olive Baboons",
      "Red Colobus Monkeys",
      "Red-tailed Monkeys",
      "Blue Monkeys",
      "Bushbuck",
      "Bush Pigs",
      "African Fish Eagles",
      "Palm-nut Vultures",
      "Monitor Lizards",
      "Vervet Monkeys",
      "Forest Cobras",
    ],
    activities: [
      "Chimpanzee Trekking",
      "Lake Tanganyika Swimming",
      "Snorkeling",
      "Bird Watching",
      "Forest Hiking",
      "Photography",
      "Research Station Visit",
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { destSlug } = await params;
  const destination = await getDestination(destSlug);
  const placeholder = placeholderDestinations[destSlug];

  const dest = destination || placeholder;
  if (!dest) return {};

  // Handle both DB schema (metaDescription/description) and placeholder (shortDescription)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const destAny = dest as any;
  const metaDesc = destAny.metaDescription || destAny.description?.slice(0, 160) || destAny.shortDescription || "";

  return genMeta({
    title: dest.name,
    description: metaDesc,
    url: `/tanzania-destinations/${destSlug}/`,
  });
}

export default async function DestinationDetailPage({ params }: Props) {
  const { destSlug } = await params;
  const destination = await getDestination(destSlug);
  const placeholder = placeholderDestinations[destSlug];

  const dest = destination || placeholder;

  if (!dest) {
    notFound();
  }

  // Extract data with fallbacks
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const d = dest as any;
  const name = d.name;
  const description = d.description || d.shortDescription || "";
  const heroImage = d.heroImage || d.featuredImage || "/images/placeholder-destination.jpg";
  const highlights = d.highlights || ["Wildlife", "Scenery", "Adventure"];
  const bestTimeToVisit = d.bestTimeToVisit || d.bestTime || "Year-round";
  const location = d.location || "Northern Tanzania";
  const wildlife = d.wildlife || ["Various wildlife species"];
  const activities = d.activities || ["Game Drives", "Photography"];
  const safaris = d.safaris || [];

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px]">
        <Image
          src={heroImage}
          alt={name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <nav className="text-sm text-white/70 mb-4">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href="/tanzania-destinations/" className="hover:text-white">
                Destinations
              </Link>
              <span className="mx-2">/</span>
              <span className="text-white">{name}</span>
            </nav>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              {name}
            </h1>
            <div className="flex flex-wrap gap-2">
              {highlights.map((highlight: string, i: number) => (
                <span
                  key={i}
                  className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info */}
      <section className="bg-[var(--primary)] text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[var(--secondary)]" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[var(--secondary)]" />
              <span>Best: {bestTimeToVisit.split(";")[0]}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-[var(--secondary)]" />
              <span>Must-Visit Destination</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Description */}
            <div className="lg:col-span-2">
              <h2 className="font-heading text-3xl font-bold mb-6">
                About {name}
              </h2>
              <div className="prose prose-slate prose-lg max-w-none">
                {description.split("\n").map((paragraph: string, i: number) =>
                  paragraph.trim() ? <p key={i}>{paragraph.trim()}</p> : null
                )}
              </div>

              {/* Wildlife */}
              <div className="mt-10">
                <h3 className="font-heading text-2xl font-bold mb-4">
                  Wildlife You&apos;ll See
                </h3>
                <div className="flex flex-wrap gap-2">
                  {wildlife.map((animal: string, i: number) => (
                    <span
                      key={i}
                      className="bg-[var(--muted)] text-[var(--text)] px-4 py-2 rounded-full text-sm"
                    >
                      {animal}
                    </span>
                  ))}
                </div>
              </div>

              {/* Activities */}
              <div className="mt-10">
                <h3 className="font-heading text-2xl font-bold mb-4">
                  Activities & Experiences
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {activities.map((activity: string, i: number) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 bg-[var(--surface)] p-4 rounded-lg"
                    >
                      <div className="w-10 h-10 bg-[var(--primary-light)] rounded-full flex items-center justify-center">
                        {i === 0 && <Camera className="w-5 h-5 text-[var(--primary)]" />}
                        {i === 1 && <Clock className="w-5 h-5 text-[var(--primary)]" />}
                        {i > 1 && <Star className="w-5 h-5 text-[var(--primary)]" />}
                      </div>
                      <span className="font-medium">{activity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Best Time */}
              <div className="bg-[var(--secondary-light)] border border-[var(--secondary)] rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[var(--secondary-dark)]" />
                  Best Time to Visit
                </h3>
                <p className="text-[var(--text-muted)]">{bestTimeToVisit}</p>
              </div>

              {/* Inquiry CTA */}
              <div className="bg-[var(--primary)] text-white rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-3">
                  Plan Your Visit to {name}
                </h3>
                <p className="text-[var(--primary-light)] text-sm mb-4">
                  Let us create a custom safari itinerary featuring this
                  incredible destination.
                </p>
                <Link
                  href="/contact-us/"
                  className="block text-center bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-6 py-3 rounded font-semibold transition-colors"
                >
                  Get Free Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Safaris */}
      {(safaris.length > 0 || true) && (
        <section className="py-12 bg-[var(--surface)]">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-3xl font-bold text-center mb-10">
              Safaris Featuring {name}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Placeholder safaris if none from DB */}
              {[
                {
                  title: "5-Day Northern Circuit Safari",
                  slug: "5-day-northern-circuit-safari",
                  duration: "5 Days",
                  type: "Mid-Range",
                  priceFrom: 2100,
                  featuredImage: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/05/safaritanzania.jpg",
                  overview: "Experience the best of Tanzania's northern parks.",
                },
                {
                  title: "7-Day Great Migration Safari",
                  slug: "7-day-great-migration-safari",
                  duration: "7 Days",
                  type: "Mid-Range",
                  priceFrom: 3200,
                  featuredImage: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/32535628638_2be6219332_k-2.jpg",
                  overview: "Witness the spectacular Great Migration in the Serengeti.",
                },
                {
                  title: "3-Day Budget Safari",
                  slug: "3-day-budget-safari",
                  duration: "3 Days",
                  type: "Budget",
                  priceFrom: 850,
                  featuredImage: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/3-Days-Tanzania-Budget-Camping-Safari.jpg",
                  overview: "Affordable safari experience for budget travelers.",
                },
              ].map((safari, i) => (
                <SafariCard
                  key={i}
                  title={safari.title}
                  slug={safari.slug}
                  duration={safari.duration}
                  type={safari.type}
                  priceFrom={safari.priceFrom}
                  featuredImage={safari.featuredImage}
                  overview={safari.overview}
                />
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/tanzania-safaris/"
                className="inline-block text-[var(--primary)] hover:text-[var(--primary-dark)] font-semibold"
              >
                View All Safari Packages →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Other Destinations */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-center mb-10">
            Explore More Destinations
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {Object.values(placeholderDestinations)
              .filter((d) => d.slug !== destSlug)
              .slice(0, 4)
              .map((d) => (
                <Link
                  key={d.id}
                  href={`/tanzania-destinations/${d.slug}/`}
                  className="group"
                >
                  <div className="relative aspect-square rounded-lg overflow-hidden mb-3">
                    <Image
                      src={d.heroImage}
                      alt={d.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-semibold">{d.name}</h3>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
