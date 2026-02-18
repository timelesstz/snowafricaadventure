import "dotenv/config";
import prisma from "../src/lib/prisma";

const puckData = {
  root: {},
  content: [
    {
      type: "HeroBlock",
      props: {
        id: "hero-1",
        title: "Your Safari, Your Way",
        subtitle:
          "No fixed itineraries. No compromises. We create unique Tanzania journeys designed entirely around your dreams, budget, and travel style.",
        badgeText: "Custom Itineraries",
        ctaText: "Start Planning",
        ctaUrl: "#inquiry-form",
        ctaSecondaryText: "View Packages",
        ctaSecondaryUrl: "/tanzania-safaris/",
        backgroundImage:
          "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/05/safaritanzania.jpg",
        overlayStyle: "from-black/80 via-black/50 to-transparent",
        minHeight: "70vh",
        textAlign: "left",
        showScroll: true,
      },
    },
    {
      type: "FeaturesBlock",
      props: {
        id: "features-1",
        sectionLabel: "Why Choose Us",
        heading: "Why Choose a Tailor-Made Safari?",
        subtitle:
          "Every traveler is unique. A family with young children has different needs than a couple celebrating their honeymoon or a photography enthusiast chasing the perfect shot. Our custom safaris ensure your trip matches your dreams perfectly.",
        features: [
          {
            icon: "calendar",
            title: "Flexible Timing",
            description:
              "Travel on your schedule, not ours. Any duration, any dates.",
          },
          {
            icon: "mappin",
            title: "Your Destinations",
            description:
              "Mix popular parks with hidden gems based on your interests.",
          },
          {
            icon: "users",
            title: "Private Experience",
            description:
              "Your own vehicle, guide, and schedule. No sharing with strangers.",
          },
        ],
        columns: 3,
        bgColor: "none",
      },
    },
    {
      type: "StepsBlock",
      props: {
        id: "steps-1",
        sectionLabel: "Simple Process",
        heading: "How It Works",
        steps: [
          {
            number: "01",
            title: "Tell Us Your Dreams",
            description:
              "Share your interests, travel dates, group size, budget, and what you'd love to experience in Tanzania.",
          },
          {
            number: "02",
            title: "Receive Your Custom Itinerary",
            description:
              "Our experts design a unique journey tailored to your preferences, complete with accommodation options.",
          },
          {
            number: "03",
            title: "Refine Together",
            description:
              "We'll work with you to adjust the itinerary until it's perfect. No pressure, no rush.",
          },
          {
            number: "04",
            title: "Book & Adventure",
            description:
              "Confirm your trip with a deposit, and we'll handle all the logistics. You just show up and enjoy!",
          },
        ],
        bgStyle: "dark",
      },
    },
    {
      type: "GalleryBlock",
      props: {
        id: "gallery-1",
        sectionLabel: "Safari Styles",
        heading: "Popular Safari Styles",
        subtitle:
          "Whether you're seeking adventure, relaxation, or wildlife encounters, we'll create the perfect experience.",
        items: [
          {
            image:
              "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/Serengeri-National-Park.jpg",
            title: "Classic Safari",
            description:
              "Experience the iconic Northern Circuit - Serengeti, Ngorongoro, Tarangire, and Lake Manyara.",
          },
          {
            image:
              "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/32535628638_2be6219332_k-2.jpg",
            title: "Great Migration",
            description:
              "Witness the world's greatest wildlife spectacle with river crossings and predator action.",
          },
          {
            image:
              "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp",
            title: "Kilimanjaro + Safari",
            description:
              "Combine the adventure of climbing Africa's highest peak with wildlife encounters.",
          },
          {
            image:
              "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/Tarangire-National-Park.jpg",
            title: "Family Safari",
            description:
              "Kid-friendly adventures with shorter drives, engaging activities, and family lodges.",
          },
          {
            image:
              "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/05/ngorongoro-crater-ngorongoro-conservation-area.jpg",
            title: "Honeymoon & Romance",
            description:
              "Intimate camps, private game drives, and sunset champagne in the bush.",
          },
          {
            image:
              "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/06/close-up-wild-lions-serengeti-national-park-scaled.jpg",
            title: "Photography Safari",
            description:
              "Specialized vehicles, flexible timing, and expert guidance for the perfect shot.",
          },
        ],
        columns: 3,
      },
    },
    {
      type: "ChecklistBlock",
      props: {
        id: "checklist-1",
        sectionLabel: "All Inclusive",
        heading: "Every Tailor-Made Safari Includes",
        items: [
          "Personal safari consultant",
          "Custom itinerary design",
          "Private 4x4 safari vehicle",
          "Expert English-speaking guide",
          "All park entry fees",
          "Accommodation as selected",
          "All meals during safari",
          "Airport/hotel transfers",
          "Drinking water in vehicle",
          "24/7 support during your trip",
          "Flexible payment options",
          "No booking fees",
        ],
        columns: 3,
        bgColor: "surface",
      },
    },
    {
      type: "TestimonialsBlock",
      props: {
        id: "testimonials-1",
        sectionLabel: "Testimonials",
        heading: "Stories from Our Travelers",
        testimonials: [
          {
            quote:
              "Snow Africa created the perfect honeymoon for us. Every detail was thought of, and the surprise sunset dinner in the Serengeti was magical!",
            author: "Sarah & James",
            location: "United Kingdom",
            trip: "14-Day Honeymoon Safari",
            rating: 5,
          },
          {
            quote:
              "Traveling with three kids ages 5-12, I was nervous about logistics. The team designed an amazing family adventure that kept everyone engaged.",
            author: "The Martinez Family",
            location: "United States",
            trip: "10-Day Family Safari",
            rating: 5,
          },
          {
            quote:
              "As a solo female traveler, safety was my priority. I felt completely taken care of throughout my 12-day adventure.",
            author: "Emma L.",
            location: "Australia",
            trip: "12-Day Solo Adventure",
            rating: 5,
          },
        ],
      },
    },
    {
      type: "FormBlock",
      props: {
        id: "form-1",
        sectionLabel: "Get Started",
        heading: "Let's Plan Your Safari",
        subtitle:
          "The more details you share, the better we can tailor your perfect Tanzania adventure. We'll respond within 24-48 hours.",
        formType: "tailor-made",
        bgColor: "muted",
      },
    },
    {
      type: "FaqBlock",
      props: {
        id: "faq-1",
        sectionLabel: "FAQ",
        heading: "Common Questions",
        faqs: [
          {
            question: "How far in advance should I book?",
            answer:
              "We recommend at least 1 month for peak season (July-October, December-February) to secure the best lodges. Shorter notice is possible during shoulder seasons. We also welcome last-minute bookings — just keep in mind that accommodation options may be limited based on availability, so a degree of flexibility is recommended.",
          },
          {
            question: "What's the minimum duration for a safari?",
            answer:
              "While we offer day trips, we recommend at least 3-4 days for a proper safari experience. 5-7 days allows you to explore multiple parks without rushing.",
          },
          {
            question: "Can you accommodate special requirements?",
            answer:
              "Absolutely! Whether it's dietary restrictions, mobility considerations, or specific interests like bird watching or photography, we'll customize accordingly.",
          },
        ],
        bgColor: "none",
      },
    },
    {
      type: "CtaBlock",
      props: {
        id: "cta-1",
        heading: "Your Adventure Awaits",
        subtitle:
          "Don't settle for a generic package tour. Let us create something special, just for you.",
        buttonText: "Start Your Custom Safari",
        buttonUrl: "#inquiry-form",
        bgStyle: "dark",
      },
    },
  ],
};

async function seedCmsTailorMade() {
  console.log("Seeding CMS page: tailor-made-safari...");

  await prisma.cmsPage.upsert({
    where: { slug: "tailor-made-safari" },
    update: {
      title: "Tailor-Made Safari",
      description:
        "Create your perfect Tanzania safari with our custom itinerary service.",
      puckData: puckData as object,
      status: "PUBLISHED",
      publishedAt: new Date(),
    },
    create: {
      title: "Tailor-Made Safari",
      slug: "tailor-made-safari",
      description:
        "Create your perfect Tanzania safari with our custom itinerary service.",
      puckData: puckData as object,
      status: "PUBLISHED",
      publishedAt: new Date(),
    },
  });

  console.log("  ✓ tailor-made-safari CMS page created/updated");
}

seedCmsTailorMade()
  .catch((e) => {
    console.error("Error seeding CMS page:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
