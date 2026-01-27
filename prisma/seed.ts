import "dotenv/config";
import prisma from "../src/lib/prisma";

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  await prisma.postTag.deleteMany();
  await prisma.postCategory.deleteMany();
  await prisma.safariDestination.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.groupDeparture.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.trekkingRoute.deleteMany();
  await prisma.safariPackage.deleteMany();
  await prisma.destination.deleteMany();
  await prisma.dayTrip.deleteMany();
  await prisma.category.deleteMany();
  await prisma.tag.deleteMany();

  // Create Categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        slug: "kilimanjaro-guides",
        name: "Kilimanjaro Guides",
        description: "Expert guides and tips for climbing Mount Kilimanjaro",
      },
    }),
    prisma.category.create({
      data: {
        slug: "safari-tips",
        name: "Safari Tips",
        description: "Make the most of your Tanzania safari experience",
      },
    }),
    prisma.category.create({
      data: {
        slug: "tanzania-travel",
        name: "Tanzania Travel",
        description: "General travel information about Tanzania",
      },
    }),
  ]);
  console.log(`✅ Created ${categories.length} categories`);

  // Create Trekking Routes
  const routes = await Promise.all([
    prisma.trekkingRoute.create({
      data: {
        slug: "machame-route",
        title: "7-Day Machame Route",
        metaTitle: "Machame Route - 7 Day Kilimanjaro Trek | Snow Africa",
        metaDescription:
          "Climb Kilimanjaro via the scenic Machame Route. 7-day trek with 90% success rate. Expert guides, all-inclusive packages from $2,150.",
        duration: "7 Days",
        durationDays: 7,
        maxPeople: 10,
        startPoint: "Machame Gate",
        endPoint: "Mweka Gate",
        ageRange: "12 - 70+",
        physicalRating: "Challenging",
        successRate: 90,
        overview:
          "The Machame Route, also known as the 'Whiskey Route', is one of the most scenic and popular routes on Kilimanjaro. This 7-day itinerary provides excellent acclimatization through a 'climb high, sleep low' profile, giving you the best chance of reaching Uhuru Peak.",
        highlights: [
          "Most scenic route on Kilimanjaro",
          "High success rate (90%)",
          "Excellent acclimatization profile",
          "Diverse landscapes and vegetation zones",
          "Stunning views of Kibo and Mawenzi peaks",
        ],
        inclusions: [
          "Park entrance fees",
          "Professional mountain guides",
          "Porters and cook",
          "All meals on the mountain",
          "Quality camping equipment",
          "Emergency oxygen",
          "Airport transfers",
          "1 night hotel in Moshi (pre-trek)",
        ],
        exclusions: [
          "International flights",
          "Travel insurance",
          "Personal climbing gear",
          "Tips for crew",
          "Visa fees",
          "Personal expenses",
        ],
        faqs: [
          {
            question: "How difficult is the Machame Route?",
            answer:
              "The Machame Route is rated as challenging due to its steep sections, particularly the Barranco Wall. However, with proper preparation and our experienced guides, climbers of average fitness can complete it successfully.",
          },
          {
            question: "What is the best time to climb?",
            answer:
              "The best months are January-March and June-October when there is less rainfall. However, Kilimanjaro can be climbed year-round.",
          },
          {
            question: "Do I need prior climbing experience?",
            answer:
              "No technical climbing experience is required. The Machame Route is a hiking route, though some scrambling is needed at the Barranco Wall.",
          },
        ],
        itinerary: [
          {
            day: 1,
            title: "Arrival Day",
            description:
              "Arrive at Kilimanjaro International Airport. Transfer to hotel in Moshi for briefing and gear check.",
            elevation: "900m",
            meals: "Dinner",
          },
          {
            day: 2,
            title: "Machame Gate to Machame Camp",
            description:
              "Drive to Machame Gate (1,800m). Begin trek through rainforest to Machame Camp.",
            elevation: "1,800m to 3,000m",
            distance: "11km",
            time: "5-7 hours",
            meals: "Breakfast, Lunch, Dinner",
          },
          {
            day: 3,
            title: "Machame Camp to Shira Camp",
            description:
              "Ascend through moorland with views of Kibo peak. Arrive at Shira Plateau.",
            elevation: "3,000m to 3,840m",
            distance: "5km",
            time: "4-6 hours",
            meals: "Breakfast, Lunch, Dinner",
          },
          {
            day: 4,
            title: "Shira Camp to Barranco Camp",
            description:
              "Climb to Lava Tower (4,630m) for acclimatization, then descend to Barranco Camp.",
            elevation: "3,840m to 3,960m (via 4,630m)",
            distance: "10km",
            time: "6-8 hours",
            meals: "Breakfast, Lunch, Dinner",
          },
          {
            day: 5,
            title: "Barranco Camp to Karanga Camp",
            description:
              "Climb the famous Barranco Wall, then traverse to Karanga Camp.",
            elevation: "3,960m to 4,035m",
            distance: "5km",
            time: "4-5 hours",
            meals: "Breakfast, Lunch, Dinner",
          },
          {
            day: 6,
            title: "Karanga Camp to Barafu Camp",
            description:
              "Continue ascending to Barafu base camp. Rest and prepare for summit attempt.",
            elevation: "4,035m to 4,673m",
            distance: "4km",
            time: "3-4 hours",
            meals: "Breakfast, Lunch, Dinner",
          },
          {
            day: 7,
            title: "Summit Day",
            description:
              "Midnight start for Uhuru Peak (5,895m). Descend to Mweka Camp after summit.",
            elevation: "4,673m to 5,895m to 3,100m",
            distance: "16km",
            time: "12-16 hours",
            meals: "Breakfast, Lunch, Dinner",
          },
          {
            day: 8,
            title: "Descent & Departure",
            description:
              "Descend to Mweka Gate. Certificate ceremony. Transfer to hotel.",
            elevation: "3,100m to 1,640m",
            distance: "10km",
            time: "3-4 hours",
            meals: "Breakfast, Lunch",
          },
        ],
        featuredImage: "/images/routes/machame-hero.jpg",
        gallery: [
          "/images/routes/machame-1.jpg",
          "/images/routes/machame-2.jpg",
          "/images/routes/machame-3.jpg",
        ],
        isActive: true,
        categoryId: categories[0].id,
      },
    }),
    prisma.trekkingRoute.create({
      data: {
        slug: "lemosho-route",
        title: "8-Day Lemosho Route",
        metaTitle: "Lemosho Route - 8 Day Kilimanjaro Trek | Snow Africa",
        metaDescription:
          "The Lemosho Route offers the highest success rate on Kilimanjaro. 8-day trek through pristine wilderness. From $2,450 all-inclusive.",
        duration: "8 Days",
        durationDays: 8,
        maxPeople: 10,
        startPoint: "Londorossi Gate",
        endPoint: "Mweka Gate",
        ageRange: "12 - 70+",
        physicalRating: "Moderate-Challenging",
        successRate: 95,
        overview:
          "The Lemosho Route is widely considered the most beautiful route on Kilimanjaro and offers the highest success rate due to excellent acclimatization. Starting from the west, you'll traverse the entire mountain before summiting.",
        highlights: [
          "Highest success rate (95%)",
          "Most scenic wilderness route",
          "Excellent acclimatization",
          "Less crowded first days",
          "Diverse wildlife sightings possible",
        ],
        inclusions: [
          "Park entrance fees",
          "Professional mountain guides",
          "Porters and cook",
          "All meals on the mountain",
          "Quality camping equipment",
          "Emergency oxygen",
          "Airport transfers",
          "2 nights hotel (pre and post trek)",
        ],
        exclusions: [
          "International flights",
          "Travel insurance",
          "Personal climbing gear",
          "Tips for crew",
          "Visa fees",
        ],
        featuredImage: "/images/routes/lemosho-hero.jpg",
        isActive: true,
        categoryId: categories[0].id,
      },
    }),
    prisma.trekkingRoute.create({
      data: {
        slug: "marangu-route",
        title: "6-Day Marangu Route",
        metaTitle: "Marangu Route - 6 Day Kilimanjaro Trek | Snow Africa",
        metaDescription:
          "The classic 'Coca-Cola Route' with hut accommodation. 6-day Kilimanjaro trek from $1,950. Comfortable option for first-time trekkers.",
        duration: "6 Days",
        durationDays: 6,
        maxPeople: 10,
        startPoint: "Marangu Gate",
        endPoint: "Marangu Gate",
        ageRange: "12 - 70+",
        physicalRating: "Moderate",
        successRate: 85,
        overview:
          "The Marangu Route, nicknamed the 'Coca-Cola Route', is the oldest and most established route on Kilimanjaro. It's the only route offering hut accommodation, making it popular for those who prefer sleeping in beds rather than tents.",
        highlights: [
          "Hut accommodation (beds provided)",
          "Same ascent and descent route",
          "Most gradual slopes",
          "Good for beginners",
          "Well-maintained trail",
        ],
        inclusions: [
          "Park entrance fees",
          "Professional mountain guides",
          "Porters and cook",
          "All meals on the mountain",
          "Hut accommodation",
          "Emergency oxygen",
          "Airport transfers",
        ],
        exclusions: [
          "International flights",
          "Travel insurance",
          "Personal gear",
          "Tips for crew",
          "Sleeping bag rental",
        ],
        featuredImage: "/images/routes/marangu-hero.jpg",
        isActive: true,
        categoryId: categories[0].id,
      },
    }),
  ]);
  console.log(`✅ Created ${routes.length} trekking routes`);

  // Create Destinations
  const destinations = await Promise.all([
    prisma.destination.create({
      data: {
        slug: "serengeti-national-park",
        name: "Serengeti National Park",
        metaTitle: "Serengeti National Park Safari | Snow Africa Adventure",
        metaDescription:
          "Experience the world-famous Serengeti and the Great Migration. Expert-guided safaris from Arusha.",
        circuit: "Northern",
        description:
          "The Serengeti is Tanzania's oldest and most popular national park. Its name comes from the Maasai word 'siringet' meaning 'endless plains'. The park is famous for hosting the Great Migration.",
        highlights: [
          "Great Migration",
          "Big Five",
          "Endless Plains",
          "Hot Air Balloons",
        ],
        wildlife: [
          "Lion",
          "Leopard",
          "Elephant",
          "Buffalo",
          "Rhino",
          "Cheetah",
          "Wildebeest",
          "Zebra",
        ],
        bestTime: "June to October for dry season; December to March for calving",
        featuredImage: "/images/destinations/serengeti-hero.jpg",
        isActive: true,
      },
    }),
    prisma.destination.create({
      data: {
        slug: "ngorongoro-crater",
        name: "Ngorongoro Crater",
        metaTitle: "Ngorongoro Crater Safari | Snow Africa Adventure",
        metaDescription:
          "Visit the world's largest intact volcanic caldera. See the Big Five in one day.",
        circuit: "Northern",
        description:
          "The Ngorongoro Crater is often called the 'Garden of Eden' or the 'Eighth Wonder of the World'. This UNESCO World Heritage Site is the world's largest intact volcanic caldera.",
        highlights: [
          "UNESCO World Heritage Site",
          "Big Five in One Day",
          "Crater Floor Game Drive",
          "Maasai Culture",
        ],
        wildlife: [
          "Black Rhino",
          "Lion",
          "Elephant",
          "Buffalo",
          "Hippo",
          "Flamingo",
        ],
        bestTime: "Year-round, best June to September",
        featuredImage: "/images/destinations/ngorongoro-hero.jpg",
        isActive: true,
      },
    }),
    prisma.destination.create({
      data: {
        slug: "tarangire-national-park",
        name: "Tarangire National Park",
        metaTitle: "Tarangire National Park Safari | Snow Africa Adventure",
        metaDescription:
          "See huge elephant herds and ancient baobab trees. Less crowded alternative to Serengeti.",
        circuit: "Northern",
        description:
          "Tarangire National Park is famous for its large elephant herds and iconic baobab trees. During the dry season, the Tarangire River is a lifeline for wildlife.",
        highlights: [
          "Large Elephant Herds",
          "Ancient Baobab Trees",
          "Bird Paradise",
          "Night Safaris",
        ],
        wildlife: ["Elephant", "Lion", "Leopard", "Python", "Oryx", "Eland"],
        bestTime: "June to October for best wildlife concentration",
        featuredImage: "/images/destinations/tarangire-hero.jpg",
        isActive: true,
      },
    }),
  ]);
  console.log(`✅ Created ${destinations.length} destinations`);

  // Create Safari Packages
  const safaris = await Promise.all([
    prisma.safariPackage.create({
      data: {
        slug: "5-day-northern-circuit-safari",
        title: "5-Day Northern Circuit Safari",
        metaTitle: "5-Day Tanzania Safari | Serengeti & Ngorongoro",
        metaDescription:
          "Classic 5-day safari covering Tarangire, Serengeti, and Ngorongoro Crater. From $2,100 per person.",
        duration: "5 Days 4 Nights",
        durationDays: 5,
        type: "Mid-range",
        overview:
          "This classic 5-day safari takes you through the highlights of Tanzania's Northern Circuit. Experience the diverse wildlife of Tarangire, the endless plains of the Serengeti, and the wildlife-packed Ngorongoro Crater.",
        highlights: [
          "Tarangire elephant herds",
          "Serengeti plains",
          "Ngorongoro Crater descent",
          "Big Five opportunity",
        ],
        inclusions: [
          "4x4 safari vehicle with pop-up roof",
          "Professional English-speaking guide",
          "All park entrance fees",
          "Full board accommodation",
          "Bottled water during game drives",
          "Airport transfers",
        ],
        exclusions: [
          "International flights",
          "Visa fees",
          "Travel insurance",
          "Tips and gratuities",
          "Personal expenses",
        ],
        featuredImage: "/images/safaris/northern-circuit-hero.jpg",
        priceFrom: 2100,
        isActive: true,
      },
    }),
    prisma.safariPackage.create({
      data: {
        slug: "3-day-budget-camping-safari",
        title: "3-Day Budget Camping Safari",
        metaTitle: "3-Day Budget Safari Tanzania | From $850",
        metaDescription:
          "Affordable 3-day camping safari to Lake Manyara and Ngorongoro Crater. Perfect for budget travelers.",
        duration: "3 Days 2 Nights",
        durationDays: 3,
        type: "Budget",
        overview:
          "Our most affordable safari option without compromising on wildlife experiences. Camp under the African stars while visiting Lake Manyara and the famous Ngorongoro Crater.",
        highlights: [
          "Tree-climbing lions at Lake Manyara",
          "Ngorongoro Crater game drive",
          "Camping under the stars",
          "Great value for money",
        ],
        inclusions: [
          "Safari vehicle",
          "Professional guide",
          "Park fees",
          "Camping equipment",
          "All meals",
        ],
        exclusions: [
          "Flights",
          "Sleeping bag (can rent)",
          "Tips",
          "Personal items",
        ],
        featuredImage: "/images/safaris/budget-safari-hero.jpg",
        priceFrom: 850,
        isActive: true,
      },
    }),
  ]);
  console.log(`✅ Created ${safaris.length} safari packages`);

  // Create Group Departures for 2025
  const machameRoute = routes[0];
  const departures = await Promise.all([
    prisma.groupDeparture.create({
      data: {
        routeId: machameRoute.id,
        arrivalDate: new Date("2025-02-14"),
        startDate: new Date("2025-02-15"),
        summitDate: new Date("2025-02-20"),
        endDate: new Date("2025-02-22"),
        price: 2150,
        currency: "USD",
        minParticipants: 2,
        maxParticipants: 10,
        isFullMoon: true,
        isGuaranteed: false,
        isFeatured: true,
        status: "OPEN",
        year: 2025,
        month: 2,
        publicNotes: "Full Moon Summit - Special departure!",
      },
    }),
    prisma.groupDeparture.create({
      data: {
        routeId: machameRoute.id,
        arrivalDate: new Date("2025-03-08"),
        startDate: new Date("2025-03-09"),
        summitDate: new Date("2025-03-14"),
        endDate: new Date("2025-03-16"),
        price: 2150,
        currency: "USD",
        minParticipants: 2,
        maxParticipants: 10,
        isFullMoon: false,
        isGuaranteed: true,
        status: "GUARANTEED",
        year: 2025,
        month: 3,
        publicNotes: "Guaranteed departure - will run with any group size!",
      },
    }),
    prisma.groupDeparture.create({
      data: {
        routeId: machameRoute.id,
        arrivalDate: new Date("2025-06-14"),
        startDate: new Date("2025-06-15"),
        summitDate: new Date("2025-06-20"),
        endDate: new Date("2025-06-22"),
        price: 2150,
        currency: "USD",
        minParticipants: 2,
        maxParticipants: 10,
        isFullMoon: true,
        status: "OPEN",
        year: 2025,
        month: 6,
      },
    }),
    prisma.groupDeparture.create({
      data: {
        routeId: machameRoute.id,
        arrivalDate: new Date("2025-07-12"),
        startDate: new Date("2025-07-13"),
        summitDate: new Date("2025-07-18"),
        endDate: new Date("2025-07-20"),
        price: 2150,
        currency: "USD",
        minParticipants: 2,
        maxParticipants: 10,
        status: "OPEN",
        year: 2025,
        month: 7,
      },
    }),
    prisma.groupDeparture.create({
      data: {
        routeId: machameRoute.id,
        arrivalDate: new Date("2025-08-09"),
        startDate: new Date("2025-08-10"),
        summitDate: new Date("2025-08-15"),
        endDate: new Date("2025-08-17"),
        price: 2150,
        currency: "USD",
        minParticipants: 2,
        maxParticipants: 10,
        status: "LIMITED",
        year: 2025,
        month: 8,
        publicNotes: "Only 3 spots remaining!",
      },
    }),
  ]);
  console.log(`✅ Created ${departures.length} group departures`);

  // Create Blog Posts (ROOT LEVEL URLS!)
  const posts = await Promise.all([
    prisma.blogPost.create({
      data: {
        slug: "best-time-climb-kilimanjaro",
        title: "Best Time to Climb Kilimanjaro: Month by Month Guide",
        metaTitle: "Best Time to Climb Kilimanjaro 2025 | Complete Guide",
        metaDescription:
          "Discover the optimal months for climbing Kilimanjaro based on weather, crowds, and success rates. Expert advice from local guides.",
        excerpt:
          "Planning your Kilimanjaro climb? Learn about the best months to summit Africa's highest peak, weather patterns, and how to maximize your chances of success.",
        content: `
# Best Time to Climb Kilimanjaro

Mount Kilimanjaro can be climbed year-round, but some months offer better conditions than others. Here's our comprehensive guide to choosing the perfect time for your adventure.

## Overview of Seasons

### Dry Seasons (Best for Climbing)
- **January to mid-March**: Clear skies, moderate temperatures
- **June to October**: Peak season, coldest but driest

### Wet Seasons (Challenging)
- **Late March to May**: Long rains, slippery trails
- **November to December**: Short rains, unpredictable

## Month by Month Breakdown

### January - February
**Rating: ⭐⭐⭐⭐⭐**
Excellent conditions with clear skies and moderate crowds. This is one of our favorite times to climb.

### March
**Rating: ⭐⭐⭐⭐**
Early March is still good, but late March sees the start of the rainy season.

### April - May
**Rating: ⭐⭐**
The long rains make conditions challenging. Lower prices but higher risk of rain.

### June - September
**Rating: ⭐⭐⭐⭐⭐**
Peak climbing season. Cold but dry conditions. Book well in advance!

### October
**Rating: ⭐⭐⭐⭐**
Transitional month with generally good conditions.

### November - December
**Rating: ⭐⭐⭐**
Short rains, but many climbers summit successfully. Fewer crowds.

## Our Recommendation

For the best experience, we recommend **January-February** or **August-September**. These months offer the best combination of weather, visibility, and success rates.

Ready to book? Check our [group departure dates](/kilimanjaro-join-group-departures/) or [contact us](/contact-us/) for a custom trip.
        `,
        featuredImage: "/images/blog/best-time-kili.jpg",
        author: "Joseph Moshi",
        isPublished: true,
        publishedAt: new Date("2025-01-10"),
      },
    }),
    prisma.blogPost.create({
      data: {
        slug: "kilimanjaro-packing-list",
        title: "Ultimate Kilimanjaro Packing List: What to Bring",
        metaTitle: "Kilimanjaro Packing List 2025 | Complete Gear Guide",
        metaDescription:
          "Comprehensive packing list for your Kilimanjaro climb. What to bring, what we provide, and expert tips from guides with 200+ summits.",
        excerpt:
          "Packing for Kilimanjaro doesn't have to be stressful. Our comprehensive guide covers everything you need - and what you can leave behind.",
        content:
          "# Kilimanjaro Packing List\n\nPacking the right gear is crucial for a successful climb...",
        featuredImage: "/images/blog/packing-list.jpg",
        author: "Grace Kimaro",
        isPublished: true,
        publishedAt: new Date("2025-01-05"),
      },
    }),
    prisma.blogPost.create({
      data: {
        slug: "great-migration-guide",
        title: "Great Migration Guide: When and Where to See It",
        metaTitle: "Great Migration Tanzania 2025 | Complete Guide",
        metaDescription:
          "Track the annual wildebeest migration through the Serengeti. Month-by-month guide with best viewing locations and safari tips.",
        excerpt:
          "The Great Migration is one of nature's most spectacular events. Learn when and where to witness this incredible phenomenon.",
        content:
          "# Great Migration Guide\n\nThe Great Migration involves over 1.5 million wildebeest...",
        featuredImage: "/images/blog/migration.jpg",
        author: "Emmanuel Ole",
        isPublished: true,
        publishedAt: new Date("2025-01-08"),
      },
    }),
  ]);
  console.log(`✅ Created ${posts.length} blog posts`);

  // Link blog posts to categories
  await prisma.postCategory.createMany({
    data: [
      { postId: posts[0].id, categoryId: categories[0].id },
      { postId: posts[1].id, categoryId: categories[0].id },
      { postId: posts[2].id, categoryId: categories[1].id },
    ],
  });
  console.log("✅ Linked posts to categories");

  // Create Day Trips
  const dayTrips = await Promise.all([
    prisma.dayTrip.create({
      data: {
        slug: "materuni-waterfalls-coffee-tour",
        title: "Materuni Waterfalls & Coffee Tour",
        metaTitle: "Materuni Waterfalls Day Trip | Snow Africa",
        metaDescription:
          "Hike to stunning 80m waterfall and experience traditional coffee farming. Half-day trip from Moshi.",
        destination: "Materuni Village",
        description:
          "Experience the stunning beauty of the Kilimanjaro foothills on this combined waterfall hike and coffee farm tour.",
        highlights: [
          "80m Waterfall",
          "Coffee Farm Tour",
          "Chagga Culture",
          "Swimming",
        ],
        inclusions: [
          "Hotel pickup",
          "Local guide",
          "Entrance fees",
          "Traditional lunch",
          "Coffee tasting",
        ],
        exclusions: ["Swimwear", "Tips", "Personal expenses"],
        featuredImage: "/images/day-trips/materuni-hero.jpg",
        priceFrom: 120,
        isActive: true,
      },
    }),
    prisma.dayTrip.create({
      data: {
        slug: "arusha-national-park-day-safari",
        title: "Arusha National Park Day Safari",
        metaTitle: "Arusha National Park Day Trip | Snow Africa",
        metaDescription:
          "Game drive and walking safari in the shadow of Mount Meru. See giraffes, buffalo, and colobus monkeys.",
        destination: "Arusha National Park",
        description:
          "A perfect introduction to Tanzanian wildlife, just 45 minutes from Arusha city.",
        highlights: [
          "Walking Safari",
          "Game Drive",
          "Momella Lakes",
          "Mount Meru Views",
        ],
        inclusions: [
          "Hotel pickup",
          "Professional guide",
          "Park fees",
          "Lunch",
          "Binoculars",
        ],
        exclusions: ["Tips", "Personal expenses"],
        featuredImage: "/images/day-trips/arusha-np-hero.jpg",
        priceFrom: 180,
        isActive: true,
      },
    }),
  ]);
  console.log(`✅ Created ${dayTrips.length} day trips`);

  console.log("\n🎉 Seeding completed successfully!");
  console.log("\nSummary:");
  console.log(`- ${categories.length} categories`);
  console.log(`- ${routes.length} trekking routes`);
  console.log(`- ${destinations.length} destinations`);
  console.log(`- ${safaris.length} safari packages`);
  console.log(`- ${departures.length} group departures`);
  console.log(`- ${posts.length} blog posts`);
  console.log(`- ${dayTrips.length} day trips`);
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
