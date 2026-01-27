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
    instagram: "https://instagram.com/snowafricaadventure",
    youtube: "https://youtube.com/snowafricaadventure",
    pinterest: "https://pinterest.com/snowafricaadventure",
  },
} as const;

/**
 * Main navigation items
 */
export const MAIN_NAV = [
  { label: "Home", href: "/" },
  { label: "Safaris & Tours", href: "/tanzania-safaris/" },
  { label: "Trekking", href: "/trekking/" },
  { label: "Kilimanjaro Join Group", href: "/kilimanjaro-join-group-departures/" },
  { label: "Tanzania Destinations", href: "/tanzania-destinations/" },
  { label: "Zanzibar", href: "/zanzibar/" },
  { label: "Contact Us", href: "/contact-us/" },
] as const;

/**
 * Top bar navigation items
 */
export const TOP_NAV = [
  { label: "About Us", href: "/about-us/" },
  { label: "Day Trips", href: "/day-trips/" },
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
      { label: "Join Group Departures", href: "/kilimanjaro-join-group-departures/" },
      { label: "Day Trips", href: "/day-trips/" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { label: "About Us", href: "/about-us/" },
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
] as const;

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
