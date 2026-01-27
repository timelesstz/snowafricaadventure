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
| **Overall Completion** | Phase 4 In Progress | ███████░░░ 70% |
| **Pages Migrated** | 25+ / ~50 | ████████░░ 85% |
| **Content Types** | 9 / 9 schemas | ██████████ 100% |
| **SEO URLs Preserved** | All Routes Ready | ████████░░ 80% |
| **Tests Written** | 63 tests (28 unit + 35 E2E) | ██████░░░░ 60% |
| **Admin Dashboard** | Core Features Done | ████████░░ 80% |

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
│  │          │   │Migration │   │  Pages   │   │  & SEO   │   │        ││
│  └──────────┘   └──────────┘   └──────────┘   └──────────┘   └────────┘│
│      ✅            ⚪            ✅            🔵            ⚪         │
│   COMPLETE      PENDING      COMPLETE       CURRENT       NOT STARTED │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘

Legend: 🔵 In Progress | ✅ Complete | ⚪ Not Started | 🔴 Blocked
```

---

## PHASE 1: Project Setup
**Status: ✅ COMPLETE**

### 1.1 Initialize Next.js Project
```
[x] Create Next.js 14+ project with App Router
[x] Configure TypeScript
[x] Set up ESLint & Prettier
[x] Configure tailwind.css
[x] Set trailingSlash: true in next.config.js (CRITICAL FOR SEO!)
```

### 1.2 Database Setup
```
[x] Set up PostgreSQL (Neon/Supabase/Prisma Cloud) - Schema ready
[x] Initialize Prisma ORM (v7)
[x] Create all schema models:
    [x] TrekkingRoute
    [x] SafariPackage
    [x] Destination
    [x] BlogPost
    [x] Category
    [x] Tag
    [x] GroupDeparture (with booking system)
    [x] Booking
    [x] PricingRule
    [x] DayTrip
    [x] Inquiry
    [x] Review
    [x] Page
    [x] SiteSetting
[ ] Run initial migration (requires DB connection)
[ ] Seed test data (after migration)
```

### 1.3 Cloudflare R2 Setup
```
[x] Create upload utility functions (src/lib/r2.ts)
[x] Configure image patterns in next.config.ts
[x] Set up redirect for /wp-content/uploads/*
[ ] Create R2 bucket: snowafrica (manual step)
[ ] Configure custom domain: cdn.snowafricaadventure.com (manual step)
[ ] Set up access credentials (manual step)
```

### 1.4 Environment Configuration
```
[x] Create .env.example with all variables
[x] Configure environment template
[ ] Set up Resend/SendGrid for emails (after deployment)
[ ] Configure Google Analytics (after deployment)
[ ] Set up error monitoring (optional)
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
**Status: ✅ COMPLETE**

### 3.1 Core Layout & Components
```
[x] Top bar component (phone, email, links)
[x] Main navigation (mega menu style)
[x] Footer component (multi-column)
[x] Trust badges component
[x] Inquiry form component (multiple variants)
[x] Review carousel component
[x] Route/Safari cards
[x] Day-by-day accordion
[x] Departure tables (responsive!)
[x] Breadcrumbs component
[x] Quick facts sidebar component
[x] Inclusions/Exclusions component
[x] Badge components
[x] Button components
```

### 3.2 Page Templates

#### Homepage (/)
```
[x] Hero section with image and CTA
[x] Trust indicators (stats bar)
[x] Featured routes grid
[x] Join Group CTA banner
[x] Featured safaris grid
[x] Why Choose Us section
[x] Testimonials carousel
[x] Explore More Adventures grid
[x] Inquiry form section
[x] Blog teaser section
```

#### Trekking Section
```
[x] /trekking/ - Listing page
[x] /trekking/[routeSlug]/ - Route detail template
    [x] Two-column layout
    [x] Quick facts sidebar
    [x] Itinerary accordion
    [x] Inclusions/Exclusions
    [x] FAQs with schema
    [x] Booking form
[ ] /trekking/kilimanjaro-guide/ - Guide parent (optional)
[ ] /trekking/kilimanjaro-guide/[guideSlug]/ - Guide subpages (optional)
```

#### Safari Section
```
[x] /tanzania-safaris/ - Listing page
[x] /tanzania-safaris/[safariSlug]/ - Safari detail template
```

#### Destinations
```
[x] /tanzania-destinations/ - Listing page
[x] /tanzania-destinations/[destSlug]/ - Destination detail
```

#### Blog
```
[x] /blog/ - Blog listing (two-column with sidebar)
[x] /[postSlug]/ - Individual posts (ROOT LEVEL - CRITICAL!) ✅
[x] /category/[categorySlug]/ - Category archives
```

#### Group Departures (MAJOR FEATURE)
```
[x] /kilimanjaro-join-group-departures/
    [x] Explanation content
    [x] 2025 departures table
    [x] 2026 departures table
    [x] Route comparison table
    [x] Booking form integration
    [x] Real-time availability display
    [x] Mobile responsive cards
```

#### Other Pages
```
[x] /about-us/
[x] /contact-us/ (form + info)
[x] /zanzibar/
[x] /day-trips/
[x] /day-trips/[slug]/
[x] /tailor-made-safari/
[x] /terms-and-conditions/
[x] /privacy-policy/
[ ] /shop/ (optional - deferred)
[ ] /product/[productSlug]/ (optional - deferred)
```

### 3.3 Admin Dashboard (Group Departures)
```
[x] Admin authentication (NextAuth)
[ ] Departures calendar view
[x] Departures table management
[x] Single departure detail view
[x] Booking management
[x] Bulk add departures tool
[x] Status auto-update system (auto-rotation cron)
[x] Partners & commissions management
[x] Inquiries management
[x] User management
[x] Analytics dashboard
```

---

## PHASE 4: SEO & Testing
**Status: 🔵 IN PROGRESS**

### 4.1 SEO Implementation
```
[x] Metadata generation for all content types
[x] Open Graph tags
[x] Twitter cards
[x] JSON-LD Schema:
    [x] TourOperator
    [x] TouristTrip
    [x] FAQPage
    [x] Article
    [x] LocalBusiness
    [x] Product
    [x] BreadcrumbList
[x] Canonical URLs
[x] Dynamic sitemap.ts
[x] robots.ts
[x] Site search page (/search/)
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

### 4.3 Unit & Integration Testing
```
[x] Vitest test framework setup
[x] Testing Library integration
[x] Search API tests (8 tests)
[x] SEO utility tests (9 tests)
[x] Utils tests (7 tests)
[x] Component tests (4 tests)
[x] E2E tests with Playwright:
    [x] Navigation tests (6 tests)
    [x] Search functionality tests (7 tests)
    [x] Safari detail page tests (6 tests)
    [x] Contact form tests (8 tests)
    [x] Trekking routes tests (8 tests)
```

### 4.4 Functional Testing
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

*Last Updated: January 17, 2026 - Phase 4 In Progress*
*Project: Snow Africa Adventure Migration*
*Next Steps: Complete testing suite, URL verification, then launch preparation*
