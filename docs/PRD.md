# Snow Africa Adventure - Live PRD & Project Tracker
## WordPress to Next.js Migration

```
 ╔═══════════════════════════════════════════════════════════════════════╗
 ║  PROJECT STATUS: 🟡 IN PROGRESS                                        ║
 ║  Started: January 2026 | Target: March 2026                           ║
 ╚═══════════════════════════════════════════════════════════════════════╝
```

---

## Quick Stats Dashboard

| Metric | Status | Progress |
|--------|--------|----------|
| **Overall Completion** | Phase 1 | ░░░░░░░░░░ 0% |
| **Pages Migrated** | 0 / ~50 | ░░░░░░░░░░ 0% |
| **Content Types** | 0 / 9 | ░░░░░░░░░░ 0% |
| **SEO URLs Preserved** | Pending | ░░░░░░░░░░ 0% |
| **Tests Written** | 0 | ░░░░░░░░░░ 0% |

---

## Phase Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        PROJECT PHASES                                    │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌────────┐│
│  │ PHASE 1  │──▶│ PHASE 2  │──▶│ PHASE 3  │──▶│ PHASE 4  │──▶│ PHASE 5││
│  │  Setup   │   │  Data    │   │  Build   │   │  Test    │   │ Launch ││
│  │          │   │Migration │   │  Pages   │   │          │   │        ││
│  └──────────┘   └──────────┘   └──────────┘   └──────────┘   └────────┘│
│      🔵            ⚪            ⚪            ⚪            ⚪         │
│    CURRENT                                                              │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘

Legend: 🔵 In Progress | ✅ Complete | ⚪ Not Started | 🔴 Blocked
```

---

## PHASE 1: Project Setup
**Status: 🔵 IN PROGRESS**

### 1.1 Initialize Next.js Project
```
[ ] Create Next.js 14+ project with App Router
[ ] Configure TypeScript
[ ] Set up ESLint & Prettier
[ ] Configure tailwind.css
[ ] Set trailingSlash: true in next.config.js (CRITICAL FOR SEO!)
```

### 1.2 Database Setup
```
[ ] Set up PostgreSQL (Neon/Supabase/Prisma Cloud)
[ ] Initialize Prisma ORM
[ ] Create all schema models:
    [ ] TrekkingRoute
    [ ] SafariPackage
    [ ] Destination
    [ ] BlogPost
    [ ] Category
    [ ] Tag
    [ ] GroupDeparture (with booking system)
    [ ] Booking
    [ ] PricingRule
    [ ] DayTrip
    [ ] Inquiry
    [ ] Review
    [ ] Page
[ ] Run initial migration
[ ] Seed test data
```

### 1.3 Cloudflare R2 Setup
```
[ ] Create R2 bucket: snowafrica
[ ] Configure custom domain: cdn.snowafricaadventure.com
[ ] Set up access credentials
[ ] Create upload utility functions
[ ] Test image upload/retrieval
```

### 1.4 Environment Configuration
```
[ ] Create .env.local with all variables
[ ] Set up Resend/SendGrid for emails
[ ] Configure Google Analytics
[ ] Set up error monitoring (Sentry)
```

---

## PHASE 2: Data Migration
**Status: ⚪ NOT STARTED**

### 2.1 WordPress Content Export
```
[ ] Export all trekking routes (10 routes)
[ ] Export all safari packages (6+ safaris)
[ ] Export all destinations (12 destinations)
[ ] Export all blog posts (ROOT level URLs!)
[ ] Export all categories
[ ] Export group departure data
[ ] Export day trips
[ ] Export static pages
[ ] Extract Rank Math SEO data:
    [ ] Meta titles
    [ ] Meta descriptions
    [ ] OG data
    [ ] Schema markup
```

### 2.2 Image Migration to R2
```
[ ] Download all WordPress uploads
[ ] Organize by content type:
    /uploads/
    /routes/
    /safaris/
    /destinations/
    /blog/
    /general/
[ ] Upload to R2 preserving paths
[ ] Update image references in content
[ ] Set up redirect: /wp-content/uploads/* → cdn.snowafricaadventure.com/uploads/*
```

### 2.3 Data Import Scripts
```
[ ] Create migration script for routes
[ ] Create migration script for safaris
[ ] Create migration script for destinations
[ ] Create migration script for blog posts
[ ] Create migration script for group departures
[ ] Verify all data integrity
[ ] Validate URL slugs match WordPress exactly
```

---

## PHASE 3: Page Development
**Status: ⚪ NOT STARTED**

### 3.1 Core Layout & Components
```
[ ] Top bar component (phone, email, links)
[ ] Main navigation (mega menu style)
[ ] Footer component (multi-column)
[ ] Trust badges component
[ ] Inquiry form component (multiple variants)
[ ] Review carousel component
[ ] Route/Safari cards
[ ] Day-by-day accordion
[ ] Departure tables (responsive!)
```

### 3.2 Page Templates

#### Homepage (/)
```
[ ] Hero slider with inquiry form overlay
[ ] Trust badges section
[ ] Company intro
[ ] Join Group CTA banner
[ ] Routes grid (6 items)
[ ] TripAdvisor reviews carousel
[ ] Safaris grid (6 items)
[ ] "More Than a Guest" section
[ ] Travelers gallery
```

#### Trekking Section
```
[ ] /trekking/ - Listing page
[ ] /trekking/[routeSlug]/ - Route detail template
    [ ] Two-column layout
    [ ] Quick facts sidebar
    [ ] Itinerary accordion
    [ ] Route map
    [ ] Inclusions/Exclusions
    [ ] FAQs with schema
    [ ] Booking form
[ ] /trekking/kilimanjaro-guide/ - Guide parent
[ ] /trekking/kilimanjaro-guide/[guideSlug]/ - Guide subpages
```

#### Safari Section
```
[ ] /tanzania-safaris/ - Listing page
[ ] /tanzania-safaris/[safariSlug]/ - Safari detail template
```

#### Destinations
```
[ ] /tanzania-destinations/ - Listing by circuit
[ ] /tanzania-destinations/[destSlug]/ - Destination detail
```

#### Blog
```
[ ] /blog/ - Blog listing (two-column with sidebar)
[ ] /[postSlug]/ - Individual posts (ROOT LEVEL - CRITICAL!)
[ ] /category/[categorySlug]/ - Category archives
```

#### Group Departures (MAJOR FEATURE)
```
[ ] /kilimanjaro-join-group-departures/
    [ ] Explanation content
    [ ] 2025 departures table
    [ ] 2026 departures table
    [ ] Route comparison table
    [ ] Booking form integration
    [ ] Real-time availability display
```

#### Other Pages
```
[ ] /about-us/
[ ] /contact-us/ (form + info)
[ ] /zanzibar/
[ ] /day-trips/
[ ] /day-trips/[tripSlug]/
[ ] /tailor-made-safari/
[ ] /terms-conditions/
[ ] /shop/ (minimal)
[ ] /product/[productSlug]/
```

### 3.3 Admin Dashboard (Group Departures)
```
[ ] Admin authentication (NextAuth/Clerk)
[ ] Departures calendar view
[ ] Departures table management
[ ] Single departure detail view
[ ] Booking management
[ ] Bulk add departures tool
[ ] Status auto-update system
```

---

## PHASE 4: SEO & Testing
**Status: ⚪ NOT STARTED**

### 4.1 SEO Implementation
```
[ ] Metadata generation for all content types
[ ] Open Graph tags
[ ] Twitter cards
[ ] JSON-LD Schema:
    [ ] TourOperator
    [ ] TouristTrip
    [ ] FAQPage
    [ ] Article
    [ ] LocalBusiness
[ ] Canonical URLs
[ ] Dynamic sitemap.ts
[ ] robots.ts
```

### 4.2 URL Verification
```
[ ] Crawl WordPress site
[ ] Crawl Next.js site
[ ] Compare all URLs (must be IDENTICAL)
[ ] Verify trailing slashes
[ ] Test blog posts at root level
[ ] Verify redirect for old image paths
```

### 4.3 Functional Testing
```
[ ] All forms submit correctly
[ ] Email notifications working
[ ] All images load from R2
[ ] Mobile responsiveness
[ ] Page speed (Core Web Vitals)
[ ] Group departure booking flow
[ ] Inquiry submission flow
```

---

## PHASE 5: Launch
**Status: ⚪ NOT STARTED**

### 5.1 Pre-Launch
```
[ ] Final content review
[ ] SEO audit pass
[ ] Performance optimization
[ ] Security review
[ ] Backup WordPress site
```

### 5.2 DNS Cutover
```
[ ] Switch DNS (hard cutover - no staging)
[ ] Verify all pages load
[ ] Test all forms
[ ] Monitor for 404s
```

### 5.3 Post-Launch
```
[ ] Submit sitemap to Google Search Console
[ ] Monitor 404s daily (2 weeks)
[ ] Track organic traffic
[ ] Verify form submissions reaching inbox
[ ] Monitor Core Web Vitals
```

---

## Content Inventory

### Trekking Routes (10)
| # | Route | Slug | Status |
|---|-------|------|--------|
| 1 | 7-Days Machame Route | 7-days-machame-route | ⚪ |
| 2 | 6-Days Machame Route | 6-days-machame-route | ⚪ |
| 3 | 8-Days Lemosho Route | 8-days-lemosho-route | ⚪ |
| 4 | 5-Days Marangu Route | 5-days-marangu-route | ⚪ |
| 5 | 6-Days Marangu Route | 6-days-marangu-route | ⚪ |
| 6 | 6-Days Rongai Route | 6-days-rongai-route | ⚪ |
| 7 | 7-Days Rongai Route | 7-days-rongai-route | ⚪ |
| 8 | 6-Days Umbwe Route | 6-days-umbwe-route | ⚪ |
| 9 | 4-Days Mount Meru | 4-days-mount-meru | ⚪ |
| 10 | 3-Days Ol Doinyo Lengai | 3-days-ol-doinyo-lengai | ⚪ |

### Safari Packages (6+)
| # | Safari | Slug | Status |
|---|--------|------|--------|
| 1 | 3-Days Tanzania Lodge Safari | 3-days-tanzania-lodge-safari | ⚪ |
| 2 | 3-Days Budget Camping Safari | 3-days-budget-camping-safari | ⚪ |
| 3 | 5-Days Luxury Safari | 5-days-luxury-safari | ⚪ |
| 4 | 6-Days Mid-range Safari | 6-days-mid-range-safari | ⚪ |
| 5 | 9-Days Wildlife Safari | 9-days-wildlife-safari | ⚪ |
| 6 | 10-Day Adventure + Zanzibar | 10-day-adventure-zanzibar | ⚪ |

### Destinations (12)
| # | Destination | Circuit | Status |
|---|-------------|---------|--------|
| 1 | Serengeti National Park | Northern | ⚪ |
| 2 | Ngorongoro Conservation Area | Northern | ⚪ |
| 3 | Tarangire National Park | Northern | ⚪ |
| 4 | Lake Manyara National Park | Northern | ⚪ |
| 5 | Selous Game Reserve | Southern | ⚪ |
| 6 | Ruaha National Park | Southern | ⚪ |
| 7 | Mikumi National Park | Southern | ⚪ |
| 8 | Katavi National Park | Western | ⚪ |
| 9 | Mahale National Park | Western | ⚪ |
| 10 | Gombe Stream National Park | Western | ⚪ |
| 11 | Arusha National Park | Northern | ⚪ |
| 12 | Rubondo Island National Park | Western | ⚪ |

---

## URL Map (SEO Critical)

```
MUST PRESERVE EXACTLY:

/                                    → Homepage
/trekking/                           → Trekking listing
/trekking/[route-slug]/              → Route pages
/trekking/kilimanjaro-guide/         → Guide parent
/trekking/kilimanjaro-guide/[slug]/  → Guide subpages
/tanzania-safaris/                   → Safari listing
/tanzania-safaris/[safari-slug]/     → Safari pages
/tanzania-destinations/              → Destinations listing
/tanzania-destinations/[dest-slug]/  → Destination pages
/day-trips/                          → Day trips listing
/day-trips/[trip-slug]/              → Day trip pages
/zanzibar/                           → Zanzibar page
/blog/                               → Blog listing
/[post-slug]/                        → ⚠️ BLOG POSTS AT ROOT LEVEL!
/category/[category-slug]/           → Category archives
/contact-us/                         → Contact
/about-us/                           → About
/kilimanjaro-join-group-departures/  → Group departures
/tailor-made-safari/                 → Custom safari form
/terms-conditions/                   → Terms
/shop/                               → Shop
/product/[slug]/                     → Products
```

---

## Tech Stack Summary

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          ARCHITECTURE                                    │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   ┌─────────────┐     ┌─────────────┐     ┌─────────────┐              │
│   │   NEXT.JS   │────▶│   PRISMA    │────▶│ POSTGRESQL  │              │
│   │   14+ App   │     │    ORM      │     │  (Neon)     │              │
│   │   Router    │     │             │     │             │              │
│   └─────────────┘     └─────────────┘     └─────────────┘              │
│         │                                                               │
│         │                                                               │
│         ▼                                                               │
│   ┌─────────────┐     ┌─────────────┐     ┌─────────────┐              │
│   │ CLOUDFLARE  │     │   RESEND    │     │   VERCEL    │              │
│   │     R2      │     │   (Email)   │     │  (Deploy)   │              │
│   │  (Images)   │     │             │     │             │              │
│   └─────────────┘     └─────────────┘     └─────────────┘              │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Risk Watchlist

| Risk | Impact | Mitigation | Status |
|------|--------|------------|--------|
| URL mismatch causes SEO loss | 🔴 HIGH | Triple-check all URLs, crawl comparison | ⚪ |
| Blog posts not at root level | 🔴 HIGH | Verify /[postSlug]/ routing works | ⚪ |
| Missing trailing slashes | 🔴 HIGH | next.config.js trailingSlash: true | ⚪ |
| Images broken after migration | 🟡 MEDIUM | R2 redirect + verification | ⚪ |
| Forms not sending emails | 🟡 MEDIUM | Thorough testing pre-launch | ⚪ |
| Group departures complexity | 🟡 MEDIUM | Phased development, test thoroughly | ⚪ |

---

## Success Criteria

```
✅ Zero 404 errors post-launch
✅ Same or better page load times
✅ No drop in organic traffic (monitor 4 weeks)
✅ All forms working correctly
✅ All images loading from R2
✅ Group departure system fully functional
✅ Admin can manage departures easily
```

---

## Commands

Update this PRD as work progresses:
- Change `[ ]` to `[x]` when complete
- Change `⚪` to `✅` when done
- Update progress bars
- Move phase status indicators

---

*Last Updated: January 16, 2026*
*Project: Snow Africa Adventure Migration*
