/**
 * Seed the Guide table from the previously hardcoded guide profiles.
 *
 * Upserts keyed on slug; the only deletions are the explicit REMOVED_SLUGS.
 * Safe to re-run; re-running restores the original copy for any guide whose
 * slug still matches, so edit guides in the admin rather than here.
 *
 * The roster below is the confirmed team. Six fabricated profiles that used to
 * live on /our-kilimanjaro-guides/ are removed by slug (see REMOVED_SLUGS),
 * along with two slugs superseded by corrected name spellings.
 */
import "dotenv/config";
import prisma from "../src/lib/prisma";

const PLACEHOLDER_IMAGE =
  "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2025/02/ipananga.jpg";

type GuideSeed = {
  slug: string;
  name: string;
  role: string;
  image: string | null;
  bio: string;
  quote?: string;
  experience?: string;
  summits?: string;
  specialty?: string;
  specialties?: string[];
  certifications?: string[];
  languages?: string[];
  routes?: string[];
  isFounder?: boolean;
  isMountainGuide?: boolean;
  isActive?: boolean;
  order: number;
};

const guides: GuideSeed[] = [
  {
    slug: "florent-ipanga",
    name: "Florent Ipanga",
    role: "Co-Founder & Safari Expert",
    summits: "150+",
    experience: "12+ years",
    image: PLACEHOLDER_IMAGE,
    specialties: ["All Kilimanjaro Routes", "Wildlife Safaris", "Safari Planning"],
    certifications: [
      "KINAPA Certified Guide",
      "Wilderness First Responder",
      "TATO Licensed Operator",
      "Wildlife Guide",
    ],
    bio: "Florent founded Snow Africa Adventure with a mission to share Tanzania's natural wonders through authentic, responsible tourism. With over 150 Kilimanjaro summits and extensive experience across Tanzania's national parks, he personally trains every guide on the team and insists on the highest standards for safety and porter welfare. Florent specialises in combined Kilimanjaro + safari itineraries and is passionate about sustainable tourism and community development in the Kilimanjaro region.",
    quote:
      "When you climb with respect for the mountain and its people, the summit is just the beginning of the reward.",
    isFounder: true,
    order: 0,
  },
  {
    slug: "sylvester-mpaju",
    name: "Sylvester Mpaju",
    role: "Mountain Guide",
    summits: "120+",
    experience: "11+ years",
    image: PLACEHOLDER_IMAGE,
    specialties: ["Machame Route", "Northern Circuit", "High Altitude Acclimatization"],
    certifications: [
      "KINAPA Certified Guide",
      "Wilderness First Responder",
      "Advanced Altitude Medicine",
    ],
    bio: "Sylvester Mpaju is one of our most experienced senior guides with more than 120 summits to his name. He specialises in longer routes like the Northern Circuit where his deep understanding of acclimatization profiles helps climbers adjust gradually and summit strong. Known by climbers for his upbeat energy and encyclopaedic knowledge of Kilimanjaro's geology and ecology.",
    quote:
      "Every person who reaches the top carries a different story — I help them write the best chapter.",
    order: 1,
  },
  {
    slug: "benedict-tati",
    name: "Benedict Tati",
    role: "Mountain Guide",
    summits: "90+",
    experience: "9+ years",
    image: PLACEHOLDER_IMAGE,
    specialties: ["Lemosho Route", "Rongai Route", "Group Expeditions"],
    certifications: ["KINAPA Certified Guide", "Wilderness First Responder", "Team Leadership"],
    bio: "Benedict Tati excels at managing large group expeditions where coordination, communication, and individual attention must all coexist. With over 90 summits, he reads the mountain and his climbers with equal precision — adjusting pace, rotating rest stops, and keeping morale high even in challenging weather. His calm leadership style puts first-time climbers at ease.",
    quote: "A strong team climbs farther than a fast individual. We reach the top together.",
    order: 2,
  },
  {
    slug: "paul-tango",
    name: "Paul Tango",
    role: "Mountain Guide",
    summits: "85+",
    experience: "9+ years",
    image: PLACEHOLDER_IMAGE,
    specialties: ["Umbwe Route", "Marangu Route", "Summit Night Strategy"],
    certifications: ["KINAPA Certified Guide", "Wilderness First Responder", "Night Navigation"],
    bio: "Paul Tango is the guide climbers want beside them on summit night. With a deep understanding of the psychological and physical demands of the final push to Uhuru Peak, he knows exactly when to encourage, when to slow down, and when to share a story that makes the next hundred metres feel effortless. He has guided more than 85 successful summits across all major routes.",
    quote:
      "Summit night is not about strength — it is about believing in each step you take in the dark.",
    order: 3,
  },
  {
    slug: "benedict-muro",
    name: "Benedict Muro",
    role: "Mountain Guide",
    summits: "95+",
    experience: "10+ years",
    image: PLACEHOLDER_IMAGE,
    specialties: ["Machame Route", "Lemosho Route", "Wildlife & Ecology"],
    certifications: [
      "KINAPA Certified Guide",
      "Wilderness First Responder",
      "Ecology & Conservation",
    ],
    bio: "Benedict Muro brings a naturalist's eye to every climb. Beyond guiding climbers safely to the summit, he transforms the trek into an education — pointing out endemic plants in the moorland zone, identifying bird species in the rainforest, and explaining how Kilimanjaro's glaciers have changed over decades. His 95+ summits give him an intimate knowledge of the mountain's moods and seasons.",
    quote:
      "Kilimanjaro is not just a mountain to climb — it is a classroom with no walls and the best views on Earth.",
    order: 4,
  },
  {
    slug: "abdilay-juma-mickina",
    name: "Abdilay Juma Mickina",
    role: "Mountain Guide",
    summits: "75+",
    experience: "8+ years",
    image: PLACEHOLDER_IMAGE,
    specialties: ["Rongai Route", "Northern Circuit", "Solo Climber Support"],
    certifications: ["KINAPA Certified Guide", "Wilderness First Responder", "Advanced First Aid"],
    bio: "Abdilay is the go-to guide for solo travellers and smaller groups who want a deeply personal Kilimanjaro experience. His attentive, one-on-one approach ensures every climber feels supported from gate to summit. With 75+ summits under his belt, he is particularly skilled on the quieter Rongai and Northern Circuit routes where his knowledge of less-travelled paths creates a more intimate mountain experience.",
    quote:
      "You do not need a big group to have a big adventure — sometimes the mountain speaks loudest when it is just you and the sky.",
    order: 5,
  },
  {
    slug: "sylvester-philimon-mwaya",
    name: "Sylvester Philimon Mwaya",
    role: "Mountain Guide",
    summits: "80+",
    experience: "8+ years",
    image: PLACEHOLDER_IMAGE,
    specialties: ["Marangu Route", "Machame Route", "First-Time Climber Coaching"],
    certifications: ["KINAPA Certified Guide", "Wilderness First Responder", "Fitness Assessment"],
    bio: "Sylvester Philimon Mwaya has built a reputation as the guide who turns nervous first-timers into confident summit achievers. He takes time before each climb to assess fitness levels, explain what to expect at each altitude zone, and set realistic daily goals. His patient coaching style and 80+ summits of experience make him the perfect guide for anyone attempting Kilimanjaro for the first time.",
    quote:
      "The hardest step is not the last one to the summit — it is the first one at the gate when you decide to try.",
    order: 6,
  },
  {
    slug: "innocent-elisante",
    name: "Innocent Elisante",
    role: "Mountain Guide",
    summits: "70+",
    experience: "7+ years",
    image: PLACEHOLDER_IMAGE,
    specialties: ["Lemosho Route", "Umbwe Route", "Photography & Storytelling"],
    certifications: ["KINAPA Certified Guide", "Wilderness First Responder", "Mountain Photography"],
    bio: "Innocent Elisante combines mountain guiding with a gift for photography and storytelling. He knows every viewpoint, golden-hour angle, and dramatic backdrop on Kilimanjaro — ensuring climbers return home with photos as unforgettable as the experience itself. With 70+ summits and a natural warmth that puts everyone at ease, Innocent creates the kind of expedition memories that last a lifetime.",
    quote:
      "A photograph captures a moment, but the feeling of standing on the Roof of Africa — that stays in your heart forever.",
    order: 7,
  },

  {
    slug: "emmanuel-meleji",
    name: "Emmanuel Meleji",
    role: "Maasai Guide",
    image: null,
    specialties: ["Ngorongoro Highlands Treks", "Mount Oldoinyo Lengai"],
    specialty: "Ngorongoro highlands treks and Mount Oldoinyo Lengai climbing",
    bio: "Emmanuel Meleji is a Maasai guide who leads treks through the Ngorongoro highlands and climbs of Mount Oldoinyo Lengai, Tanzania's active volcano. He shares Maasai knowledge of the land, its wildlife, and its traditions with every group he guides.",
    isMountainGuide: false,
    order: 8,
  },
  {
    slug: "athuman-mongesanga",
    name: "Athuman Mongesanga",
    role: "Safari Guide",
    image: null,
    specialties: ["Wildlife Safaris"],
    specialty: "Wildlife safaris",
    bio: "Athuman Mongesanga is a safari guide with Snow Africa Adventure, leading wildlife game drives across Tanzania's national parks.",
    isMountainGuide: false,
    order: 9,
  },
];

// Slugs that must not remain in the table: six fabricated profiles that came
// from the old /our-kilimanjaro-guides/ page, plus two slugs superseded by
// corrected spellings. Removed by exact slug so nothing else is touched.
const REMOVED_SLUGS = [
  "emmanuel-moshi",
  "joseph-tarimo",
  "francis-kimaro",
  "godlisten-massawe",
  "baraka-lyimo",
  "elisha-msuya",
  "sylvester-joachim-mpaju",
  "sylvester-philemon",
];

async function main() {
  console.log(`Seeding ${guides.length} guides...`);

  for (const guide of guides) {
    const data = {
      name: guide.name,
      role: guide.role,
      image: guide.image,
      bio: guide.bio,
      quote: guide.quote ?? null,
      experience: guide.experience ?? null,
      summits: guide.summits ?? null,
      specialty: guide.specialty ?? null,
      specialties: guide.specialties ?? [],
      certifications: guide.certifications ?? [],
      languages: guide.languages ?? [],
      routes: guide.routes ?? [],
      isFounder: guide.isFounder ?? false,
      isMountainGuide: guide.isMountainGuide ?? true,
      isActive: guide.isActive ?? true,
      order: guide.order,
    };

    await prisma.guide.upsert({
      where: { slug: guide.slug },
      update: data,
      create: { slug: guide.slug, ...data },
    });

    console.log(`  ${data.isActive ? "✓" : "○"} ${guide.name} (${guide.role})`);
  }

  for (const slug of REMOVED_SLUGS) {
    const removed = await prisma.guide.deleteMany({ where: { slug } });
    if (removed.count > 0) console.log(`  ✗ removed ${slug}`);
  }

  const active = await prisma.guide.count({ where: { isActive: true } });
  const inactive = await prisma.guide.count({ where: { isActive: false } });
  console.log(`\nDone. ${active} active, ${inactive} inactive (pending review).`);
}

main()
  .catch((e) => {
    console.error("Guide seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
