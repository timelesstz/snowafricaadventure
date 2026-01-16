# Snow Africa Adventure - WordPress to Next.js Migration
## Complete Development Prompt & PRD

---

## Project Overview

**Client:** Snow Africa Adventure (snowafricaadventure.com)
**Current Stack:** WordPress with Elementor, Rank Math SEO
**Target Stack:** Next.js 14+ (App Router), Prisma ORM, Cloudflare R2, PostgreSQL (Prisma Cloud/Neon/Supabase)
**Primary Goal:** Zero SEO traffic loss during migration - preserve all URLs exactly

---

## Critical SEO Requirements (NON-NEGOTIABLE)

### URL Structure Preservation
Every URL must remain EXACTLY the same. No exceptions.

**Current URL Patterns:**
```
/                                    → Homepage
/trekking/                           → Trekking listing
/trekking/[route-slug]/              → Individual route (e.g., /trekking/7-days-machame-route/)
/trekking/kilimanjaro-guide/         → Guide parent
/trekking/kilimanjaro-guide/[slug]/  → Guide subpages
/tanzania-safaris/                   → Safari listing
/tanzania-safaris/[safari-slug]/     → Individual safari
/tanzania-destinations/              → Destinations listing
/tanzania-destinations/[dest-slug]/  → Individual destination
/day-trips/                          → Day trips listing
/day-trips/[trip-slug]/              → Individual day trip
/zanzibar/                           → Zanzibar page
/blog/                               → Blog listing
/[post-slug]/                        → Individual blog posts (root level!)
/category/[category-slug]/           → Category archives
/contact-us/                         → Contact page
/about-us/                           → About page
/kilimanjaro-join-group-departures/  → Group departures
/tailor-made-safari/                 → Custom safari form
/terms-conditions/                   → Terms page
/shop/                               → Shop (minimal, 2 products)
/product/[slug]/                     → Product pages
```

**IMPORTANT:** Blog posts live at ROOT level (e.g., `/climbing-kilimanjaro/` NOT `/blog/climbing-kilimanjaro/`)

### Trailing Slashes
- WordPress uses trailing slashes
- Next.js config MUST enable `trailingSlash: true`

### Meta Data to Preserve
Extract and migrate from Rank Math:
- Title tags
- Meta descriptions
- Open Graph data
- Twitter cards
- Schema markup (FAQ, Article, LocalBusiness, TourOperator)
- Canonical URLs

---

## Content Types & Data Models

### 1. Trekking Routes (Kilimanjaro Climbs)

```prisma
model TrekkingRoute {
  id              String   @id @default(cuid())
  slug            String   @unique
  title           String
  metaTitle       String?
  metaDescription String?
  duration        String   // "7 Days"
  maxPeople       Int?     // 10
  startPoint      String   // "Machame Park Gate"
  endPoint        String   // "Mweka Gate"
  ageRange        String?  // "12 - 80+"
  physicalRating  String   // "Challenging"
  overview        String   @db.Text
  itinerary       Json     // Array of day objects
  routeMapImage   String?
  inclusions      String[] 
  exclusions      String[]
  faqs            Json?    // FAQ schema data
  featuredImage   String?
  gallery         String[]
  relatedRoutes   TrekkingRoute[] @relation("RelatedRoutes")
  category        Category? @relation(fields: [categoryId], references: [id])
  categoryId      String?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

**Sample Routes:**
- 7-Days Machame Route
- 6-Days Machame Route
- 8-Days Lemosho Route
- 5-Days Marangu Route
- 6-Days Marangu Route
- 6-Days Rongai Route
- 7-Days Rongai Route
- 6-Days Umbwe Route
- 4-Days Mount Meru
- 3-Days Ol Doinyo Lengai

### 2. Safari Packages

```prisma
model SafariPackage {
  id              String   @id @default(cuid())
  slug            String   @unique
  title           String
  metaTitle       String?
  metaDescription String?
  duration        String   // "6 Days 5 Nights"
  type            String   // "Budget", "Mid-range", "Luxury"
  overview        String   @db.Text
  itinerary       Json
  inclusions      String[]
  exclusions      String[]
  destinations    Destination[] @relation("SafariDestinations")
  featuredImage   String?
  gallery         String[]
  priceFrom       Decimal?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

**Sample Safaris:**
- 3-Days Tanzania Lodge Safari
- 3-Days Tanzania Budget Camping Safari
- 5-Days Tanzania Luxury Safari
- 6-Days Tanzania Mid-range Safari
- 9-Days Tanzania Wildlife Safari
- 10-Day Adventure Safari & Zanzibar

### 3. Destinations

```prisma
model Destination {
  id              String   @id @default(cuid())
  slug            String   @unique
  name            String
  metaTitle       String?
  metaDescription String?
  circuit         String   // "Northern", "Southern", "Western"
  description     String   @db.Text
  highlights      String[]
  wildlife        String[]
  bestTime        String?
  featuredImage   String?
  gallery         String[]
  safaris         SafariPackage[] @relation("SafariDestinations")
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

**Destinations:**
- Serengeti National Park
- Ngorongoro Conservation Area
- Tarangire National Park
- Lake Manyara National Park
- Selous Game Reserve
- Ruaha National Park
- Mikumi National Park
- Katavi National Park
- Mahale National Park
- Gombe Stream National Park
- Arusha National Park
- Rubondo Island National Park

### 4. Blog Posts

```prisma
model BlogPost {
  id              String   @id @default(cuid())
  slug            String   @unique  // Lives at ROOT level!
  title           String
  metaTitle       String?
  metaDescription String?
  excerpt         String?
  content         String   @db.Text
  featuredImage   String?
  author          String?
  categories      Category[]
  tags            Tag[]
  publishedAt     DateTime?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

model Category {
  id              String   @id @default(cuid())
  slug            String   @unique
  name            String
  description     String?
  posts           BlogPost[]
  routes          TrekkingRoute[]
}

model Tag {
  id    String     @id @default(cuid())
  slug  String     @unique
  name  String
  posts BlogPost[]
}
```

### 5. Group Departures

```prisma
model GroupDeparture {
  id            String   @id @default(cuid())
  route         TrekkingRoute @relation(fields: [routeId], references: [id])
  routeId       String
  arrivalDate   DateTime
  departureDate DateTime
  price         Decimal
  currency      String   @default("USD")
  spacesTotal   Int
  spacesBooked  Int      @default(0)
  isFullMoon    Boolean  @default(false)
  year          Int
  status        String   @default("available") // available, limited, full
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

### 6. Day Trips

```prisma
model DayTrip {
  id              String   @id @default(cuid())
  slug            String   @unique
  title           String
  metaTitle       String?
  metaDescription String?
  destination     String
  description     String   @db.Text
  highlights      String[]
  inclusions      String[]
  exclusions      String[]
  featuredImage   String?
  priceFrom       Decimal?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

### 7. Inquiries/Bookings

```prisma
model Inquiry {
  id              String   @id @default(cuid())
  type            String   // "safari", "trekking", "group", "custom"
  fullName        String
  email           String
  phone           String?
  phonePrefix     String?
  nationality     String?
  tripType        String?
  numAdults       Int?
  numChildren     Int?
  arrivalDate     DateTime?
  additionalInfo  String?  @db.Text
  relatedTo       String?  // Reference to route/safari slug
  status          String   @default("new")
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

### 8. Reviews (TripAdvisor Integration)

```prisma
model Review {
  id          String   @id @default(cuid())
  source      String   // "tripadvisor", "google", "manual"
  authorName  String
  rating      Int
  title       String?
  content     String   @db.Text
  tripType    String?  // "safari", "kilimanjaro"
  verified    Boolean  @default(false)
  publishedAt DateTime
  createdAt   DateTime @default(now())
}
```

### 9. Static Pages

```prisma
model Page {
  id              String   @id @default(cuid())
  slug            String   @unique
  title           String
  metaTitle       String?
  metaDescription String?
  content         String   @db.Text
  template        String?  // "default", "contact", "about"
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

---

## Site Architecture

### Navigation Structure

**Top Bar:**
- Phone: +255 766 657 854
- Email: info@snowafricaadventure.com
- Links: About Us | Day Trips | Tailor-Made Safaris | Blog

**Main Navigation:**
- Home
- Safaris & Tours → /tanzania-safaris/
- Trekking → /trekking/
- Kilimanjaro Join Group → /kilimanjaro-join-group-departures/
- Tanzania Destinations → /tanzania-destinations/
- Zanzibar → /zanzibar/
- Contact Us → /contact-us/
- Africa Mount Kilimanjaro → /africa-mount-kilimanjaro/

**Footer:**
- Safari & Tours (3 featured)
- Kilimanjaro (3 featured routes)
- Social links: Facebook, Twitter, YouTube, Instagram, Pinterest
- Partner badges: TripAdvisor, SafariBookings, YourAfricanSafari
- Member badges: KPAP, TATO, etc.
- Terms & Conditions, Blog links

---

## Page Templates

### 1. Homepage
**Sections:**
- Hero slider with inquiry form (Name, Email, Trip Type dropdown, No. People, Arrival Date)
- Trust badges (TripAdvisor rating, certifications)
- Company intro
- Kilimanjaro Join Group CTA banner
- Mount Kilimanjaro Routes grid (6 routes)
- TripAdvisor reviews carousel (ElfsightWidget or custom)
- Tanzania Tours & Safaris grid (6 safaris)
- "You're More Than a Guest" trust section
- Successful Travelers photo gallery

### 2. Trekking Listing (/trekking/)
- Page header
- Route cards grid (8 routes)
- SEO content about trekking in Tanzania
- Three mountain CTAs (Kilimanjaro, Meru, Ol Doinyo Lengai)

### 3. Individual Route Page (/trekking/[slug]/)
**Layout: Two columns**

**Left Column (Main):**
- Route title + breadcrumbs
- Overview text
- Route waypoints list
- Quick facts (Duration, Max People, Start, End, Age, Physical Rating)
- Day-by-day itinerary (collapsible accordions)
- Route map image
- Inclusions/Exclusions
- FAQs (collapsible, with schema)
- Related routes grid

**Right Column (Sidebar):**
- Booking inquiry form
- Guide profile card
- Kilimanjaro Climbing Guide links
- Related routes

### 4. Safari Listing (/tanzania-safaris/)
- Page header
- Safari overview content
- Video embed
- Safari packages grid

### 5. Individual Safari Page (/tanzania-safaris/[slug]/)
Similar to route pages with:
- Overview
- Day-by-day itinerary
- Inclusions/Exclusions
- Booking form sidebar

### 6. Blog Listing (/blog/)
**Layout: Two columns**
- Left: Post cards with pagination/load more
- Right sidebar: Search, Featured Posts, Safari Packages, Kilimanjaro Routes

### 7. Individual Blog Post (/[slug]/)
**IMPORTANT: Blog posts at ROOT level**
- Full-width article content
- Author info
- Related posts
- Sidebar with categories, recent posts

### 8. Group Departures (/kilimanjaro-join-group-departures/)
- Explanation content
- 2025 departures table
- Reviews carousel
- 2026 departures table
- Route comparison table
- Route descriptions (Machame, Lemosho, Rongai)
- Booking form

### 9. Contact Page (/contact-us/)
- Address, phone numbers, email
- Contact form
- Destinations grid

### 10. Destinations Listing (/tanzania-destinations/)
- Overview content
- Destination cards grid by circuit

---

## Technical Implementation

### Next.js App Router Structure

```
app/
├── (site)/
│   ├── layout.tsx                    # Main site layout
│   ├── page.tsx                      # Homepage
│   ├── about-us/page.tsx
│   ├── contact-us/page.tsx
│   ├── blog/page.tsx                 # Blog listing
│   ├── [postSlug]/page.tsx           # Individual blog posts (ROOT LEVEL!)
│   ├── trekking/
│   │   ├── page.tsx                  # Trekking listing
│   │   ├── [routeSlug]/page.tsx      # Individual route
│   │   └── kilimanjaro-guide/
│   │       ├── page.tsx
│   │       └── [guideSlug]/page.tsx
│   ├── tanzania-safaris/
│   │   ├── page.tsx
│   │   └── [safariSlug]/page.tsx
│   ├── tanzania-destinations/
│   │   ├── page.tsx
│   │   └── [destSlug]/page.tsx
│   ├── day-trips/
│   │   ├── page.tsx
│   │   └── [tripSlug]/page.tsx
│   ├── zanzibar/page.tsx
│   ├── kilimanjaro-join-group-departures/page.tsx
│   ├── tailor-made-safari/page.tsx
│   ├── category/[categorySlug]/page.tsx
│   ├── terms-conditions/page.tsx
│   ├── shop/page.tsx
│   └── product/[productSlug]/page.tsx
├── api/
│   ├── inquiries/route.ts
│   ├── contact/route.ts
│   └── revalidate/route.ts
├── sitemap.ts                        # Dynamic sitemap generation
├── robots.ts
└── not-found.tsx
```

### next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,  // CRITICAL for SEO
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.r2.cloudflarestorage.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.snowafricaadventure.com', // Your R2 custom domain
      },
    ],
  },
  async redirects() {
    return [
      // Add any URL changes here (try to avoid!)
      // Example: old image paths to R2
      {
        source: '/wp-content/uploads/:path*',
        destination: 'https://cdn.snowafricaadventure.com/uploads/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
```

### Sitemap Generation

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://snowafricaadventure.com'
  
  // Fetch all content
  const [routes, safaris, destinations, posts, dayTrips, categories] = await Promise.all([
    prisma.trekkingRoute.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.safariPackage.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.destination.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.blogPost.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.dayTrip.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.category.findMany({ select: { slug: true } }),
  ])

  const staticPages = [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/about-us/`, lastModified: new Date() },
    { url: `${baseUrl}/contact-us/`, lastModified: new Date() },
    { url: `${baseUrl}/blog/`, lastModified: new Date() },
    { url: `${baseUrl}/trekking/`, lastModified: new Date() },
    { url: `${baseUrl}/tanzania-safaris/`, lastModified: new Date() },
    { url: `${baseUrl}/tanzania-destinations/`, lastModified: new Date() },
    { url: `${baseUrl}/zanzibar/`, lastModified: new Date() },
    { url: `${baseUrl}/kilimanjaro-join-group-departures/`, lastModified: new Date() },
    { url: `${baseUrl}/tailor-made-safari/`, lastModified: new Date() },
    { url: `${baseUrl}/day-trips/`, lastModified: new Date() },
  ]

  const routeUrls = routes.map(route => ({
    url: `${baseUrl}/trekking/${route.slug}/`,
    lastModified: route.updatedAt,
  }))

  const safariUrls = safaris.map(safari => ({
    url: `${baseUrl}/tanzania-safaris/${safari.slug}/`,
    lastModified: safari.updatedAt,
  }))

  const destUrls = destinations.map(dest => ({
    url: `${baseUrl}/tanzania-destinations/${dest.slug}/`,
    lastModified: dest.updatedAt,
  }))

  // Blog posts at ROOT level!
  const postUrls = posts.map(post => ({
    url: `${baseUrl}/${post.slug}/`,
    lastModified: post.updatedAt,
  }))

  const dayTripUrls = dayTrips.map(trip => ({
    url: `${baseUrl}/day-trips/${trip.slug}/`,
    lastModified: trip.updatedAt,
  }))

  const categoryUrls = categories.map(cat => ({
    url: `${baseUrl}/category/${cat.slug}/`,
    lastModified: new Date(),
  }))

  return [
    ...staticPages,
    ...routeUrls,
    ...safariUrls,
    ...destUrls,
    ...postUrls,
    ...dayTripUrls,
    ...categoryUrls,
  ]
}
```

---

## Cloudflare R2 Setup

### Directory Structure
```
snowafrica-bucket/
├── uploads/
│   ├── 2023/
│   │   └── 03/
│   │       └── [images from WordPress]
│   ├── 2024/
│   └── 2025/
├── routes/
│   └── [route-specific images]
├── safaris/
├── destinations/
├── blog/
└── general/
```

### R2 Integration

```typescript
// lib/r2.ts
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const R2 = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
})

export async function uploadToR2(
  file: Buffer,
  key: string,
  contentType: string
) {
  await R2.send(new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: key,
    Body: file,
    ContentType: contentType,
  }))
  
  return `${process.env.R2_PUBLIC_URL}/${key}`
}

export function getR2Url(key: string) {
  return `${process.env.R2_PUBLIC_URL}/${key}`
}
```

---

## Forms & Integrations

### Inquiry Form Schema

```typescript
// lib/schemas/inquiry.ts
import { z } from 'zod'

export const inquirySchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phonePrefix: z.string().optional(),
  phone: z.string().optional(),
  nationality: z.string().optional(),
  tripType: z.enum([
    'Wildlife Safari',
    'Kilimanjaro',
    'Zanzibar Beach',
    'Wildlife Safari + Kilimanjaro',
    'Wildlife Safari + Zanzibar Beach',
    'Customized'
  ]).optional(),
  numAdults: z.number().min(1).optional(),
  numChildren: z.number().min(0).optional(),
  arrivalDate: z.date().optional(),
  additionalInfo: z.string().optional(),
})
```

### Email Notification

```typescript
// Send to: info@snowafricaadventure.com
// Use: Resend, SendGrid, or similar
```

---

## SEO Implementation

### Metadata Generation

```typescript
// lib/seo.ts
import { Metadata } from 'next'

export function generateRouteMetadata(route: TrekkingRoute): Metadata {
  return {
    title: route.metaTitle || `${route.title} | Snow Africa Adventure`,
    description: route.metaDescription || route.overview.slice(0, 160),
    openGraph: {
      title: route.metaTitle || route.title,
      description: route.metaDescription,
      images: route.featuredImage ? [{ url: route.featuredImage }] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: route.metaTitle || route.title,
      description: route.metaDescription,
    },
    alternates: {
      canonical: `https://snowafricaadventure.com/trekking/${route.slug}/`,
    },
  }
}
```

### JSON-LD Schema

```typescript
// components/schema/TourSchema.tsx
export function TourSchema({ route }: { route: TrekkingRoute }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: route.title,
    description: route.overview,
    touristType: 'Adventure',
    provider: {
      '@type': 'TourOperator',
      name: 'Snow Africa Adventure',
      telephone: '+255766657854',
      email: 'info@snowafricaadventure.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'MEC House, Plot no 161, Second floor, Mianzini Area',
        addressLocality: 'Arusha',
        addressCountry: 'TZ',
      },
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// FAQ Schema for routes with FAQs
export function FAQSchema({ faqs }: { faqs: FAQ[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

---

## Migration Checklist

### Phase 1: Setup
- [ ] Initialize Next.js 14 project with App Router
- [ ] Configure Prisma with PostgreSQL
- [ ] Set up Cloudflare R2 bucket and custom domain
- [ ] Configure environment variables

### Phase 2: Data Migration
- [ ] Export WordPress content (WP All Export or custom)
- [ ] Create migration scripts for each content type
- [ ] Migrate all images to R2 preserving paths
- [ ] Verify all content in database

### Phase 3: Development
- [ ] Build all page templates
- [ ] Implement navigation components
- [ ] Create inquiry/booking forms
- [ ] Integrate TripAdvisor reviews
- [ ] Build sitemap generation
- [ ] Implement SEO metadata

### Phase 4: Testing
- [ ] Crawl both sites, compare URLs
- [ ] Test all forms
- [ ] Verify all images load
- [ ] Check mobile responsiveness
- [ ] Validate schema markup
- [ ] Test page speed

### Phase 5: Launch
- [ ] DNS cutover (hard switch, no staging period)
- [ ] Submit new sitemap to Google Search Console
- [ ] Monitor for 404s daily for 2 weeks
- [ ] Set up redirect monitoring

---

## Environment Variables

```env
# Database
DATABASE_URL="postgresql://..."

# Cloudflare R2
R2_ENDPOINT="https://[account-id].r2.cloudflarestorage.com"
R2_ACCESS_KEY_ID="..."
R2_SECRET_ACCESS_KEY="..."
R2_BUCKET_NAME="snowafrica"
R2_PUBLIC_URL="https://cdn.snowafricaadventure.com"

# Email (for forms)
RESEND_API_KEY="..."
NOTIFICATION_EMAIL="info@snowafricaadventure.com"

# Analytics
NEXT_PUBLIC_GA_ID="..."

# Site
NEXT_PUBLIC_SITE_URL="https://snowafricaadventure.com"
```

---

## Design System Notes

### Colors (from current site)
- Primary Green: Used in buttons, accents
- Dark text on light backgrounds
- White/cream backgrounds
- Safari-themed imagery

### Typography
- Clean, professional fonts
- Clear hierarchy for itineraries

### Components Needed
- Hero slider with form overlay
- Route/Safari cards
- Day-by-day accordion
- Booking inquiry form (multiple variants)
- Review carousel
- Departure tables
- Trust badge strips
- Footer with multi-column layout

---

## Third-Party Integrations

1. **TripAdvisor** - Reviews widget or API
2. **SafariBookings** - Partner badge/link
3. **Google Analytics** - Tracking
4. **Google Search Console** - Sitemap submission
5. **Email Service** - Form submissions
6. **Payment Gateway** (if adding booking) - Future consideration

---

## Success Metrics

- Zero 404 errors post-launch
- Same or improved page load times
- No drop in organic traffic (monitor weekly)
- Form submissions working correctly
- All images loading from R2

---

## Notes for Development Agent

1. **URL preservation is SACRED** - Do not change any URL structure
2. Blog posts live at ROOT level, not under /blog/
3. Always use trailing slashes
4. Migrate WordPress `wp-content/uploads` path structure to R2
5. The site has LOTS of tables (group departures) - ensure proper responsive handling
6. Forms are critical to business - test thoroughly
7. TripAdvisor reviews are important social proof - preserve the carousel
8. The site serves international customers - consider i18n for future

---

*Generated for Snow Africa Adventure WordPress to Next.js migration project*
