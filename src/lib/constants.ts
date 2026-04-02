/**
 * Site configuration constants
 */
export const SITE_CONFIG = {
  name: "Snow Africa Adventure",
  description:
    "Experience the adventure of a lifetime with Snow Africa Adventure. Expert-led Kilimanjaro treks, Tanzania safaris, and Zanzibar beach holidays.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://snowafricaadventure.com",
  phone: "+255 766 657 854",
  email: "info@snowafricaadventure.com",
  address: {
    street: "MEC House, Plot no 161, Second floor, Mianzini Area",
    city: "Arusha",
    country: "Tanzania",
  },
  social: {
    facebook: "https://facebook.com/snowafricaadventure",
    twitter: "https://twitter.com/snowafrica",
    instagram: "https://instagram.com/snow_africa_adventures",
    youtube: "https://youtube.com/snowafricaadventure",
    pinterest: "https://pinterest.com/snowafricaadventure",
  },
} as const;

/**
 * Mega menu navigation structure
 */
export type NavItem = { label: string; href: string; description?: string };
export type MegaMenuItem = {
  label: string;
  href: string;
  children: NavItem[];
};

export const MEGA_NAV: MegaMenuItem[] = [
  {
    label: "Safaris & Tours",
    href: "/tanzania-safaris/",
    children: [
      { label: "All Safari Packages", href: "/tanzania-safaris/", description: "Browse curated Tanzania safaris" },
      { label: "Tailor-Made Safaris", href: "/tailor-made-safari/", description: "Custom itineraries for your group" },
      { label: "Destinations", href: "/tanzania-destinations/", description: "Serengeti, Ngorongoro & more" },
      { label: "Day Tours", href: "/tanzania-day-tours/", description: "Single-day excursions from Arusha" },
    ],
  },
  {
    label: "Trekking",
    href: "/trekking/",
    children: [
      { label: "All Trekking Routes", href: "/trekking/", description: "Compare all Kilimanjaro routes" },
      { label: "Best Route to Climb", href: "/best-route-to-climb-kilimanjaro/", description: "Route comparison guide" },
      { label: "Climbing Guide", href: "/climbing-kilimanjaro/", description: "Everything you need to know" },
      { label: "Kilimanjaro Prices", href: "/kilimanjaro-prices/", description: "Full cost breakdown" },
      { label: "Best Time to Climb", href: "/best-time-to-climb-kilimanjaro/", description: "Seasonal guide" },
    ],
  },
];

export const SIMPLE_NAV = [
  { label: "Zanzibar", href: "/zanzibar/" },
  { label: "Contact Us", href: "/contact-us/" },
] as const;

export const GROUP_CLIMB_NAV = {
  label: "Join Group Climb",
  href: "/kilimanjaro-join-group-departures/",
} as const;

/**
 * Main navigation items (flat — used by mobile menu fallback)
 */
export const MAIN_NAV = [
  { label: "Home", href: "/" },
  { label: "Safaris & Tours", href: "/tanzania-safaris/" },
  { label: "Trekking", href: "/trekking/" },
  { label: "Join Group Climb", href: "/kilimanjaro-join-group-departures/" },
  { label: "Destinations", href: "/tanzania-destinations/" },
  { label: "Day Tours", href: "/tanzania-day-tours/" },
  { label: "Zanzibar", href: "/zanzibar/" },
  { label: "Contact Us", href: "/contact-us/" },
] as const;

/**
 * Top bar navigation items
 */
export const TOP_NAV = [
  { label: "About Us", href: "/about-us/" },
  { label: "Tailor-Made Safaris", href: "/tailor-made-safari/" },
  { label: "Blog", href: "/blog/" },
] as const;

/**
 * Footer navigation groups
 */
export const FOOTER_NAV = {
  safaris: {
    title: "Safari & Tours",
    links: [
      { label: "All Safari Packages", href: "/tanzania-safaris/" },
      { label: "Tailor-Made Safaris", href: "/tailor-made-safari/" },
      { label: "Tanzania Destinations", href: "/tanzania-destinations/" },
    ],
  },
  kilimanjaro: {
    title: "Kilimanjaro",
    links: [
      { label: "All Trekking Routes", href: "/trekking/" },
      { label: "Best Route to Climb", href: "/best-route-to-climb-kilimanjaro/" },
      { label: "Climbing Kilimanjaro Guide", href: "/climbing-kilimanjaro/" },
      { label: "Join Group Departures", href: "/kilimanjaro-join-group-departures/" },
      { label: "Kilimanjaro Prices", href: "/kilimanjaro-prices/" },
      { label: "Best Time to Climb", href: "/best-time-to-climb-kilimanjaro/" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { label: "About Us", href: "/about-us/" },
      { label: "Our Guides", href: "/our-guides/" },
      { label: "Contact Us", href: "/contact-us/" },
      { label: "Terms & Conditions", href: "/terms-and-conditions/" },
      { label: "Privacy Policy", href: "/privacy-policy/" },
      { label: "Blog", href: "/blog/" },
    ],
  },
} as const;

/**
 * Trip type options for forms
 */
export const TRIP_TYPES = [
  "Wildlife Safari",
  "Kilimanjaro",
  "Zanzibar Beach",
  "Wildlife Safari + Kilimanjaro",
  "Wildlife Safari + Zanzibar Beach",
  "Customized",
] as const;

/**
 * Safari types
 */
export const SAFARI_TYPES = ["Budget", "Mid-range", "Luxury"] as const;

/**
 * Destination circuits
 */
export const DESTINATION_CIRCUITS = ["Northern", "Southern", "Western"] as const;

/**
 * Physical ratings for routes
 */
export const PHYSICAL_RATINGS = [
  "Easy",
  "Moderate",
  "Challenging",
  "Difficult",
  "Very Difficult",
] as const;

/**
 * Country phone prefixes (common ones)
 */
export const PHONE_PREFIXES = [
  { code: "+1", country: "USA/Canada" },
  { code: "+44", country: "UK" },
  { code: "+49", country: "Germany" },
  { code: "+33", country: "France" },
  { code: "+31", country: "Netherlands" },
  { code: "+61", country: "Australia" },
  { code: "+255", country: "Tanzania" },
  { code: "+254", country: "Kenya" },
  { code: "+27", country: "South Africa" },
  { code: "+91", country: "India" },
  { code: "+86", country: "China" },
  { code: "+81", country: "Japan" },
  { code: "+34", country: "Spain" },
  { code: "+39", country: "Italy" },
  { code: "+41", country: "Switzerland" },
  { code: "+43", country: "Austria" },
  { code: "+46", country: "Sweden" },
  { code: "+47", country: "Norway" },
  { code: "+45", country: "Denmark" },
  { code: "+353", country: "Ireland" },
  { code: "+64", country: "New Zealand" },
  { code: "+32", country: "Belgium" },
  { code: "+65", country: "Singapore" },
  { code: "+55", country: "Brazil" },
  { code: "+52", country: "Mexico" },
  { code: "+48", country: "Poland" },
  { code: "+7", country: "Russia" },
  { code: "+971", country: "UAE" },
  { code: "+966", country: "Saudi Arabia" },
  { code: "+90", country: "Turkey" },
  { code: "+62", country: "Indonesia" },
  { code: "+60", country: "Malaysia" },
  { code: "+66", country: "Thailand" },
  { code: "+84", country: "Vietnam" },
  { code: "+82", country: "South Korea" },
  { code: "+234", country: "Nigeria" },
  { code: "+20", country: "Egypt" },
  { code: "+256", country: "Uganda" },
  { code: "+250", country: "Rwanda" },
] as const;

/**
 * Map country code (ISO 3166-1 alpha-2) to phone prefix.
 * Returns the best matching prefix or undefined.
 */
export const COUNTRY_TO_PREFIX: Record<string, string> = {
  US: "+1", CA: "+1", GB: "+44", DE: "+49", FR: "+33", NL: "+31",
  AU: "+61", TZ: "+255", KE: "+254", ZA: "+27", IN: "+91", CN: "+86",
  JP: "+81", ES: "+34", IT: "+39", CH: "+41", AT: "+43", SE: "+46",
  NO: "+47", DK: "+45", IE: "+353", NZ: "+64", BE: "+32", SG: "+65",
  BR: "+55", MX: "+52", PL: "+48", RU: "+7", AE: "+971", SA: "+966",
  TR: "+90", ID: "+62", MY: "+60", TH: "+66", VN: "+84", KR: "+82",
  NG: "+234", EG: "+20", UG: "+256", RW: "+250",
};

/**
 * Safari destinations/parks
 */
export const SAFARI_DESTINATIONS = [
  { value: "serengeti", label: "Serengeti National Park" },
  { value: "ngorongoro", label: "Ngorongoro Crater" },
  { value: "tarangire", label: "Tarangire National Park" },
  { value: "lake_manyara", label: "Lake Manyara National Park" },
  { value: "arusha", label: "Arusha National Park" },
  { value: "selous", label: "Selous Game Reserve" },
  { value: "ruaha", label: "Ruaha National Park" },
  { value: "mikumi", label: "Mikumi National Park" },
  { value: "katavi", label: "Katavi National Park" },
  { value: "mahale", label: "Mahale Mountains" },
  { value: "gombe", label: "Gombe Stream" },
] as const;

/**
 * Budget levels
 */
export const BUDGET_LEVELS = [
  { value: "budget", label: "Budget-Friendly", description: "Basic camping & budget lodges" },
  { value: "mid-range", label: "Mid-Range", description: "Comfortable lodges & tented camps" },
  { value: "luxury", label: "Luxury", description: "Premium lodges & exclusive camps" },
] as const;

/**
 * Accommodation types
 */
export const ACCOMMODATION_TYPES = [
  { value: "lodge", label: "Lodges Only", description: "Permanent structures with all amenities" },
  { value: "tented_camp", label: "Tented Camps", description: "Luxury tents with en-suite facilities" },
  { value: "camping", label: "Camping", description: "Basic camping for adventurous travelers" },
  { value: "mixed", label: "Mix of All", description: "Combination based on location" },
] as const;

/**
 * Safari interests
 */
export const SAFARI_INTERESTS = [
  { value: "big_five", label: "Big Five" },
  { value: "great_migration", label: "Great Migration" },
  { value: "photography", label: "Photography Safari" },
  { value: "birdwatching", label: "Birdwatching" },
  { value: "walking_safari", label: "Walking Safaris" },
  { value: "night_drive", label: "Night Game Drives" },
  { value: "balloon_safari", label: "Hot Air Balloon Safari" },
  { value: "cultural", label: "Cultural Experiences" },
  { value: "chimpanzee", label: "Chimpanzee Trekking" },
] as const;

/**
 * Date flexibility options
 */
export const DATE_FLEXIBILITY = [
  { value: "fixed", label: "Fixed Dates", description: "I have specific travel dates" },
  { value: "flexible", label: "Flexible (+/- 1 week)", description: "I can adjust by a few days" },
  { value: "very_flexible", label: "Very Flexible", description: "I'm open to suggestions" },
] as const;

/**
 * Safari experience levels
 */
export const SAFARI_EXPERIENCE = [
  { value: "none", label: "First Safari", description: "This will be my first safari" },
  { value: "some", label: "Some Experience", description: "I've been on 1-2 safaris before" },
  { value: "experienced", label: "Experienced", description: "I've been on multiple safaris" },
] as const;

/**
 * Zanzibar beach areas
 */
export const ZANZIBAR_BEACHES = [
  { value: "nungwi", label: "Nungwi Beach", description: "Northern tip, stunning sunsets" },
  { value: "kendwa", label: "Kendwa Beach", description: "Calm waters, boutique resorts" },
  { value: "paje", label: "Paje Beach", description: "Kitesurfing paradise, laid-back" },
  { value: "jambiani", label: "Jambiani Beach", description: "Traditional village atmosphere" },
  { value: "matemwe", label: "Matemwe Beach", description: "Quiet, pristine, secluded" },
  { value: "kiwengwa", label: "Kiwengwa Beach", description: "All-inclusive resorts" },
  { value: "no_preference", label: "No Preference", description: "Help me choose" },
] as const;

/**
 * Zanzibar activities
 */
export const ZANZIBAR_ACTIVITIES = [
  { value: "stone_town", label: "Stone Town Tour" },
  { value: "spice_tour", label: "Spice Tour" },
  { value: "snorkeling", label: "Snorkeling" },
  { value: "scuba_diving", label: "Scuba Diving" },
  { value: "dhow_cruise", label: "Sunset Dhow Cruise" },
  { value: "dolphin_tour", label: "Dolphin Tour" },
  { value: "prison_island", label: "Prison Island" },
  { value: "jozani_forest", label: "Jozani Forest" },
  { value: "kitesurfing", label: "Kitesurfing" },
  { value: "relaxation", label: "Just Relax on Beach" },
] as const;

/**
 * Zanzibar duration options
 */
export const ZANZIBAR_DURATIONS = [
  { value: "3", label: "3 Nights", description: "Quick beach escape" },
  { value: "5", label: "5 Nights", description: "Ideal beach holiday" },
  { value: "7", label: "7 Nights", description: "Ultimate relaxation" },
  { value: "custom", label: "Custom Duration", description: "I have specific dates" },
] as const;

/**
 * Author profiles for blog E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)
 */
export const AUTHOR_PROFILES: Record<string, {
  name: string;
  role: string;
  bio: string;
  credentials: string[];
  image?: string;
}> = {
  "Snow Africa Team": {
    name: "Snow Africa Team",
    role: "Safari & Trekking Experts",
    bio: "The Snow Africa Adventure team combines decades of experience guiding safaris across Tanzania's national parks and leading Kilimanjaro treks. Based in Arusha, our TATO-licensed guides have summited Kilimanjaro over 500 times collectively.",
    credentials: ["TATO Licensed Operator", "Kilimanjaro Certified Guides", "First Aid Wilderness Certified", "Based in Arusha, Tanzania"],
  },
  "Emmanuel Moshi": {
    name: "Emmanuel Moshi",
    role: "Founder & Lead Guide",
    bio: "Emmanuel founded Snow Africa Adventure with a vision to share Tanzania's natural wonders with the world. A Kilimanjaro native with over 15 years of guiding experience, he has personally led more than 200 summit expeditions and countless safari trips across the Northern and Southern Circuits.",
    credentials: ["200+ Kilimanjaro Summits", "15+ Years Guiding Experience", "TATO Licensed Guide", "Wilderness First Responder"],
  },
};

/**
 * Partner information for website attribution
 */
export const PARTNER_INFO = {
  marketing: {
    name: "Timeless International Marketing & Development",
    shortName: "Timeless International",
    website: "https://craftedbytimeless.com",
  },
} as const;
