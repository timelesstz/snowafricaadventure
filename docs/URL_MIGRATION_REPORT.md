# URL Migration Report: Snow Africa Adventure

## Executive Summary

Comparing live site (https://snowafricaadventure.com) against new Next.js project.

**Live Site Stats:**
- 82 pages
- 121 blog posts
- 9 category pages
- **Total: 212+ URLs**

---

## URL Structure Comparison

### 1. Static Pages - MATCHING

| Live URL | New Route | Status |
|----------|-----------|--------|
| `/` | `/(site)/page.tsx` | OK |
| `/about-us/` | `/(site)/about-us/page.tsx` | OK |
| `/contact-us/` | `/(site)/contact-us/page.tsx` | OK |
| `/blog/` | `/(site)/blog/page.tsx` | OK |
| `/trekking/` | `/(site)/trekking/page.tsx` | OK |
| `/tanzania-safaris/` | `/(site)/tanzania-safaris/page.tsx` | OK |
| `/tanzania-destinations/` | `/(site)/tanzania-destinations/page.tsx` | OK |
| `/zanzibar/` | `/(site)/zanzibar/page.tsx` | OK |
| `/kilimanjaro-join-group-departures/` | `/(site)/kilimanjaro-join-group-departures/page.tsx` | OK |
| `/tailor-made-safari/` | `/(site)/tailor-made-safari/page.tsx` | OK |
| `/day-trips/` | `/(site)/day-trips/page.tsx` | OK |
| `/terms-conditions/` | `/(site)/terms-and-conditions/page.tsx` | **REDIRECT NEEDED** |

---

### 2. Trekking Routes - Dynamic Routes OK

Live URLs that will be handled by `/(site)/trekking/[routeSlug]/page.tsx`:

| Live URL | New Route Pattern | Status |
|----------|-------------------|--------|
| `/trekking/7-days-machame-route/` | `/trekking/[routeSlug]/` | OK - needs DB content |
| `/trekking/8-days-lemosho-route/` | `/trekking/[routeSlug]/` | OK - needs DB content |
| `/trekking/6-days-marangu-route/` | `/trekking/[routeSlug]/` | OK - needs DB content |
| `/trekking/6-days-rongai-route/` | `/trekking/[routeSlug]/` | OK - needs DB content |
| `/trekking/6-days-machame-route/` | `/trekking/[routeSlug]/` | OK - needs DB content |
| `/trekking/6-days-umbwe-route/` | `/trekking/[routeSlug]/` | OK - needs DB content |
| `/trekking/5-days-marangu-route/` | `/trekking/[routeSlug]/` | OK - needs DB content |
| `/trekking/7-days-rongai-route/` | `/trekking/[routeSlug]/` | OK - needs DB content |
| `/trekking/4-days-mount-meru-climbing/` | `/trekking/[routeSlug]/` | OK - needs DB content |
| `/trekking/3-days-2-nights-oldoinyo-lengai-climbing/` | `/trekking/[routeSlug]/` | OK - needs DB content |

**Sub-pages under /trekking/ needing special handling:**

| Live URL | Status | Action |
|----------|--------|--------|
| `/trekking/kilimanjaro-guide/` | **REDIRECT NEEDED** | → `/blog/` or create new page |
| `/trekking/kilimanjaro-guide/best-time-to-climb-mount-kilimanjaro/` | **REDIRECT NEEDED** | → Blog post |
| `/trekking/kilimanjaro-guide/climbing-mount-kilimanjaro-cost/` | **REDIRECT NEEDED** | → Blog post |
| `/trekking/kilimanjaro-guide/climbing-mount-kilimanjaro-packages/` | **REDIRECT NEEDED** | → `/trekking/` |
| `/trekking/kilimanjaro-guide/kilimanjaro-safety/` | **REDIRECT NEEDED** | → Blog post |
| `/trekking/kilimanjaro-guide/kilimanjaro-routes-success-rates/` | **REDIRECT NEEDED** | → Blog post |
| `/trekking/kilimanjaro-guide/kilimanjaro-porters/` | **REDIRECT NEEDED** | → Blog post |
| `/trekking/kilimanjaro-guide/kilimanjaro-climb-gear-list/` | **REDIRECT NEEDED** | → Blog post |
| `/trekking/kilimanjaro-guide/kilimanjaro-rescue/` | **REDIRECT NEEDED** | → Blog post |
| `/trekking/kilimanjaro-guide/kilimanjaro-faqs/` | **REDIRECT NEEDED** | → Blog post |
| `/trekking/kilimanjaro-guide/kilimanjaro-guided-tours/` | **REDIRECT NEEDED** | → `/trekking/` |
| `/trekking/tipping-on-kilimanjaro/` | **REDIRECT NEEDED** | → Blog post |
| `/trekking/training-to-climb-mt-kilimanjaro/` | **REDIRECT NEEDED** | → Blog post |
| `/trekking/mount-kilimanjaro-altitude-sickness/` | **REDIRECT NEEDED** | → Blog post |
| `/trekking/visa-for-kilimanjaro/` | **REDIRECT NEEDED** | → Blog post |

---

### 3. Safari Packages - Dynamic Routes OK

Live URLs handled by `/(site)/tanzania-safaris/[safariSlug]/page.tsx`:

| Live URL Slug | Status |
|---------------|--------|
| `walking-safari-trekking-on-ngorongoro` | OK - needs DB content |
| `7-days-safari-to-tanzania-serval-wildlife` | OK - needs DB content |
| `10-day-adventure-in-tanzania-safari-zanzibar` | OK - needs DB content |
| `6-days-tanzania-lodge-and-luxury-tented-camp-safari...` | OK - needs DB content |
| `3-days-tanzania-lodge-safari-tarangire-lake-manyara-ngorongoro-crater` | OK - needs DB content |
| `6-days-5-nights-budget-camping-safari-tarangire-lake-manyara-serengeti-and-ngorongoro-crater` | OK - needs DB content |
| `7-days-tanzania-tented-camp-safari` | OK - needs DB content |
| `5-days-tanzania-luxury-safarilake-manyara-serengeti-ngorongoro` | OK - needs DB content |
| `3-days-tanzania-budget-camping-safari-tarangire-lake-manyara-and-ngorongoro-crater` | OK - needs DB content |
| `6-days-safari-to-tarangire-ngorongoro-serengeti-central-north` | OK - needs DB content |
| `8-days-wonders-of-tanzania-safari` | OK - needs DB content |
| `4-days-safari-to-ngorongoro-and-serengeti` | OK - needs DB content |
| `4-day-safari-adventure-in-tanzania` | OK - needs DB content |
| `9-days-tanzania-wildlife-safari` | OK - needs DB content |
| `6-days-tanzania-migration-safari-ndutu-manyara-serengeti-ngorongoro-crater` | OK - needs DB content |
| `2-days-tanzania-lodge-safari` | OK - needs DB content |
| `5-days-4-nights-budget-camping-safari-lake-manyara-serengeti-and-ngorongoro` | OK - needs DB content |

---

### 4. Destinations - Dynamic Routes OK

Live URLs handled by `/(site)/tanzania-destinations/[destSlug]/page.tsx`:

| Live Slug | Status |
|-----------|--------|
| `rubondo-island-national-park` | OK - needs DB content |
| `mikumi-national-park` | OK - needs DB content |
| `udzungwa-national-park` | OK - needs DB content |
| `tarangire-national-park` | OK - needs DB content |
| `serengeti-national-park` | OK - needs DB content |
| `selous-game-reserve` | OK - needs DB content |
| `ruaha-national-park` | OK - needs DB content |
| `ngorongoro-conservation-area` | OK - needs DB content |
| `mkomazi-national-park` | OK - needs DB content |
| `mahale-national-park` | OK - needs DB content |
| `lake-manyara-national-park` | OK - needs DB content |
| `kitulo-national-park` | OK - needs DB content |
| `katavi-national-park` | OK - needs DB content |
| `gombe-stream-national-park` | OK - needs DB content |
| `arusha-national-park` | OK - needs DB content |

---

### 5. Day Trips - Dynamic Routes OK

Live URLs handled by `/(site)/day-trips/[slug]/page.tsx`:

| Live Slug | Status |
|-----------|--------|
| `arusha-city-day-trip` | OK - needs DB content |
| `ngorongoro-crater-day-trip` | OK - needs DB content |
| `tarangire-national-park-day-trip` | OK - needs DB content |
| `lake-manyara-day-trip` | OK - needs DB content |
| `arusha-national-park-day-trip` | OK - needs DB content |

---

### 6. Blog Posts - ROOT LEVEL

**CRITICAL**: Blog posts live at root level (`/[postSlug]/`), NOT under `/blog/`.

The `/(site)/[postSlug]/page.tsx` route handles these. All 121 blog posts need to be migrated to the database.

Sample of posts needing migration:
- `/climbing-kilimanjaro/`
- `/how-tall-is-mount-kilimanjaro/`
- `/tanzania-festival/`
- `/best-time-to-climb-mount-kilimanjaro/`
- `/wildlife-safaris-tanzania/`
- `/serengeti-national-park/`
- `/great-wildebeest-migration/`
- ... and 114 more

---

### 7. Categories

Live categories handled by `/(site)/category/[categorySlug]/page.tsx`:

| Live Category | Status |
|---------------|--------|
| `/category/blog/` | OK - needs DB content |
| `/category/safari-tours/` | OK - needs DB content |
| `/category/mount-kilimanjaro/` | OK - needs DB content |
| `/category/tanzania-destinations/` | OK - needs DB content |
| `/category/day-trip/` | OK - needs DB content |
| `/category/kilimanjaro-climbing-guide/` | OK - needs DB content |

**Nested categories needing redirects:**
| Live URL | Action |
|----------|--------|
| `/category/tanzania-destinations/western-circuit/` | REDIRECT → `/category/tanzania-destinations/` |
| `/category/tanzania-destinations/southern-circuit/` | REDIRECT → `/category/tanzania-destinations/` |
| `/category/tanzania-destinations/northern-circuit/` | REDIRECT → `/category/tanzania-destinations/` |

---

### 8. URLs TO REMOVE (WordPress-specific)

| Live URL | Action |
|----------|--------|
| `/my-account/` | Do not migrate - WooCommerce |
| `/cart/` | Do not migrate - WooCommerce |
| `/checkout/` | Do not migrate - WooCommerce |
| `/shop/` | Do not migrate - WooCommerce |

---

### 9. Special Pages Needing Redirects

| Live URL | Redirect To |
|----------|-------------|
| `/lemosho-route-kilimanjaro/` | `/trekking/8-days-lemosho-route/` |
| `/africa-mount-kilimanjaro/` | `/trekking/` |
| `/first-person-to-climb-mount-kilimanjaro/` | `/first-person-to-climb-kilimanjaro/` (blog post) |
| `/group-tours-in-tanzania/` | `/kilimanjaro-join-group-departures/` |
| `/mount-kilimanjaro-trekking/` | `/trekking/` |

---

## Required Redirects Configuration

Add to `next.config.ts`:

```typescript
async redirects() {
  return [
    // Terms page URL difference
    {
      source: '/terms-conditions/',
      destination: '/terms-and-conditions/',
      permanent: true,
    },
    // Kilimanjaro guide section → blog
    {
      source: '/trekking/kilimanjaro-guide/:path*',
      destination: '/blog/',
      permanent: true,
    },
    // Trekking info pages → blog
    {
      source: '/trekking/tipping-on-kilimanjaro/',
      destination: '/your-tipping-guide-for-tanzania/',
      permanent: true,
    },
    {
      source: '/trekking/training-to-climb-mt-kilimanjaro/',
      destination: '/climbing-mount-kilimanjaro/',
      permanent: true,
    },
    {
      source: '/trekking/mount-kilimanjaro-altitude-sickness/',
      destination: '/can-you-climb-kilimanjaro-with-asthma/',
      permanent: true,
    },
    {
      source: '/trekking/visa-for-kilimanjaro/',
      destination: '/contact-us/',
      permanent: true,
    },
    // Nested categories
    {
      source: '/category/tanzania-destinations/:circuit/',
      destination: '/category/tanzania-destinations/',
      permanent: true,
    },
    // Old standalone pages
    {
      source: '/africa-mount-kilimanjaro/',
      destination: '/trekking/',
      permanent: true,
    },
    {
      source: '/lemosho-route-kilimanjaro/',
      destination: '/trekking/8-days-lemosho-route/',
      permanent: true,
    },
    {
      source: '/group-tours-in-tanzania/',
      destination: '/kilimanjaro-join-group-departures/',
      permanent: true,
    },
    {
      source: '/mount-kilimanjaro-trekking/',
      destination: '/trekking/',
      permanent: true,
    },
    // WooCommerce pages (redirect to homepage)
    {
      source: '/my-account/',
      destination: '/',
      permanent: true,
    },
    {
      source: '/cart/',
      destination: '/',
      permanent: true,
    },
    {
      source: '/checkout/',
      destination: '/',
      permanent: true,
    },
    {
      source: '/shop/',
      destination: '/',
      permanent: true,
    },
  ];
}
```

---

## Content Migration Checklist

### Required Database Content

1. **Trekking Routes (10)**
   - [ ] 7-days-machame-route
   - [ ] 8-days-lemosho-route
   - [ ] 6-days-marangu-route
   - [ ] 6-days-rongai-route
   - [ ] 6-days-machame-route
   - [ ] 6-days-umbwe-route
   - [ ] 5-days-marangu-route
   - [ ] 7-days-rongai-route
   - [ ] 4-days-mount-meru-climbing
   - [ ] 3-days-2-nights-oldoinyo-lengai-climbing

2. **Safari Packages (17)**
   - All 17 safari packages listed above

3. **Destinations (15)**
   - All 15 national parks/reserves listed above

4. **Day Trips (5)**
   - All 5 day trips listed above

5. **Blog Posts (121)**
   - All 121 blog posts need migration

6. **Categories (6)**
   - blog
   - safari-tours
   - mount-kilimanjaro
   - tanzania-destinations
   - day-trip
   - kilimanjaro-climbing-guide

---

## Pre-Deployment Steps

1. **Add redirects to next.config.ts** (see config above)
2. **Migrate content to database**
   - Routes, safaris, destinations, day trips
   - All 121 blog posts with correct slugs
   - Categories
3. **Verify with script**: `npm run verify-urls`
4. **Test redirects**: Check all redirect chains work
5. **Update sitemap generation** if needed
6. **Set up 404 monitoring** to catch missed URLs post-launch

---

## Risk Assessment

| Risk | Severity | Mitigation |
|------|----------|------------|
| Missing blog post content | HIGH | Migrate all 121 posts before launch |
| Broken /trekking/kilimanjaro-guide/* links | MEDIUM | Redirect to /blog/ |
| WooCommerce URLs returning 404 | LOW | Redirect to homepage |
| Nested category URLs | LOW | Redirect to parent category |

---

## Migration Status

### Completed ✅

| Content Type | Count | Status |
|--------------|-------|--------|
| Categories | 6 | ✅ Migrated |
| Trekking Routes | 10 | ✅ Migrated |
| Destinations | 15 | ✅ Migrated |
| Safari Packages | 17 | ✅ Migrated |
| Day Trips | 5 | ✅ Migrated |
| Blog Posts | 125 | ✅ Migrated (placeholder content) |
| Group Departures | 9 | ✅ Seeded (2025-2026) |
| Redirects | 18 | ✅ Configured |

### Pending ⚠️

- [ ] Full blog post content (currently placeholder text)
- [ ] Featured images (need to migrate from WordPress/upload to R2)
- [ ] Gallery images for routes/safaris/destinations

### Commands

```bash
# Re-run full migration
npm run db:seed:production

# Add blog posts only
npx tsx prisma/seed-blog-posts.ts

# Verify URLs
npm run verify:urls
```

---

Generated: 2026-01-27
Updated: 2026-01-27 (Content migrated)
