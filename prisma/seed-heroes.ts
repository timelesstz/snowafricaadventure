import "dotenv/config";
import prisma from "../src/lib/prisma";

const heroes = [
  {
    pageSlug: "homepage",
    pageName: "Homepage",
    heroType: "image",
    title: "Climb Kilimanjaro.\nSafari Tanzania.",
    subtitle:
      "Summit Africa's highest peak. Witness the Great Migration. Experience the adventure of a lifetime with Tanzania's trusted local operator.",
    badgeText: "Tanzania's Trusted Adventure Partner",
    ctaPrimaryText: "Explore Kilimanjaro",
    ctaPrimaryUrl: "/trekking/",
    ctaSecondaryText: "View Safari Packages",
    ctaSecondaryUrl: "/tanzania-safaris/",
    backgroundImage:
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp",
    overlayGradient: "from-black/70 via-black/50 to-transparent",
    overlayDirection: "to-r",
    overlayOpacity: 70,
    minHeight: "75vh",
    textAlignment: "left",
    showScrollIndicator: true,
  },
  {
    pageSlug: "tanzania-safaris",
    pageName: "Tanzania Safaris",
    heroType: "image",
    title: "Tanzania Safari\nPackages",
    subtitle:
      "From the endless plains of the Serengeti to the wildlife-rich Ngorongoro Crater, experience Africa's most spectacular safari destinations with Tanzania's trusted local operator.",
    badgeText: "2025-2026 Season",
    ctaPrimaryText: "Explore Safaris",
    ctaPrimaryUrl: "#safaris",
    ctaSecondaryText: "Design Your Own Safari",
    ctaSecondaryUrl: "/tailor-made-safari/",
    backgroundImage:
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/05/safaritanzania.jpg",
    overlayGradient: "from-black/80 via-black/50 to-transparent",
    overlayDirection: "to-r",
    overlayOpacity: 80,
    minHeight: "70vh",
    textAlignment: "left",
    showScrollIndicator: true,
  },
  {
    pageSlug: "trekking",
    pageName: "Trekking Routes",
    heroType: "image",
    title: "Kilimanjaro\nTrekking Routes",
    subtitle:
      "Choose your path to the Roof of Africa. Each route offers a unique experience through diverse ecosystems to the summit at 5,895m.",
    badgeText: "5,895m Summit",
    ctaPrimaryText: "Explore Routes",
    ctaPrimaryUrl: "#routes",
    ctaSecondaryText: "View Group Departures",
    ctaSecondaryUrl: "/kilimanjaro-join-group-departures/",
    backgroundImage:
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp",
    overlayGradient: "from-black/90 via-black/50 to-black/30",
    overlayDirection: "to-t",
    overlayOpacity: 90,
    minHeight: "75vh",
    textAlignment: "center",
    showScrollIndicator: true,
  },
  {
    pageSlug: "tailor-made-safari",
    pageName: "Tailor-Made Safari",
    heroType: "image",
    title: "Your Safari,\nYour Way",
    subtitle:
      "No fixed itineraries. No compromises. We create unique Tanzania journeys designed entirely around your dreams, budget, and travel style.",
    badgeText: "Custom Itineraries",
    ctaPrimaryText: "Start Planning",
    ctaPrimaryUrl: "#inquiry-form",
    backgroundImage:
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/05/safaritanzania.jpg",
    overlayGradient: "from-black/80 via-black/50 to-transparent",
    overlayDirection: "to-r",
    overlayOpacity: 80,
    minHeight: "70vh",
    textAlignment: "left",
    showScrollIndicator: true,
  },
  {
    pageSlug: "zanzibar",
    pageName: "Zanzibar",
    heroType: "image",
    title: "Zanzibar Beach Holidays",
    subtitle:
      "The perfect ending to your Tanzania adventure. Pristine white sand beaches, turquoise waters, and rich Swahili culture.",
    backgroundImage:
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/09/Kwale-Island-q3hixrn6vumez8p4r8n0xtnsqincj7k0dg7q485hi8.jpg",
    overlayGradient: "from-black/60 via-black/20 to-transparent",
    overlayDirection: "to-t",
    overlayOpacity: 60,
    minHeight: "70vh",
    textAlignment: "bottom",
    showScrollIndicator: false,
  },
  {
    pageSlug: "tanzania-day-tours",
    pageName: "Tanzania Day Tours",
    heroType: "gradient",
    title: "Tanzania Day Tours from Arusha",
    subtitle:
      "Short on time? Experience Tanzania's highlights with our expertly guided day tours and excursions.",
    gradientFrom: "var(--primary-dark)",
    gradientTo: "var(--text)",
    minHeight: "auto",
    textAlignment: "center",
    showScrollIndicator: false,
  },
  {
    pageSlug: "kilimanjaro-join-group-departures",
    pageName: "Group Departures",
    heroType: "gradient",
    title: "Kilimanjaro Join Group Departures",
    subtitle:
      "Join our scheduled group climbs with fixed departure dates. Share the adventure with fellow climbers from around the world.",
    gradientFrom: "var(--primary-dark)",
    gradientTo: "var(--primary-dark)",
    minHeight: "auto",
    textAlignment: "center",
    showScrollIndicator: false,
  },
  {
    pageSlug: "contact-us",
    pageName: "Contact Us",
    heroType: "gradient",
    title: "Let's Plan Your Dream Adventure",
    subtitle:
      "Whether you're dreaming of conquering Kilimanjaro, witnessing the Great Migration, or relaxing on Zanzibar's beaches, we're here to make it happen.",
    badgeText: "Get in Touch",
    gradientFrom: "#1e293b",
    gradientTo: "#0f172a",
    minHeight: "auto",
    textAlignment: "center",
    showScrollIndicator: false,
  },
  {
    pageSlug: "faq",
    pageName: "FAQ",
    heroType: "gradient",
    title: "Frequently Asked Questions",
    subtitle:
      "Find answers to common questions about Kilimanjaro treks, Tanzania safaris, Zanzibar holidays, booking, payments, and more.",
    badgeText: "Help Center",
    gradientFrom: "#1e293b",
    gradientTo: "#0f172a",
    minHeight: "auto",
    textAlignment: "center",
    showScrollIndicator: false,
  },
  {
    pageSlug: "blog",
    pageName: "Blog",
    heroType: "gradient",
    title: "Blog",
    subtitle:
      "Travel tips, safari stories, and Kilimanjaro guides from our team of local experts.",
    gradientFrom: "var(--primary-dark)",
    gradientTo: "var(--text)",
    minHeight: "auto",
    textAlignment: "center",
    showScrollIndicator: false,
  },
];

async function seedHeroes() {
  console.log("Seeding page heroes...");

  for (const hero of heroes) {
    await prisma.pageHero.upsert({
      where: { pageSlug: hero.pageSlug },
      update: hero,
      create: hero,
    });
    console.log(`  ✓ ${hero.pageName} (${hero.pageSlug})`);
  }

  console.log(`\nSeeded ${heroes.length} page heroes.`);
}

seedHeroes()
  .catch((e) => {
    console.error("Error seeding heroes:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
