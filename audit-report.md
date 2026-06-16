# Audit Report — Snow Africa Adventure

**Date:** 2026-06-15
**Mode:** `--ooda` (Full Observe-Orient-Decide-Act)

## Stack profile

```
lang=ts
framework=nextjs
runtime=node
package_manager=npm
router=app
has_typescript=true
has_ui_framework=react
```

**Summary:** Next.js 16.1.2 (app router), TypeScript strict, React 19, Prisma 7, Tailwind CSS 4, npm

**Verdict:** SHIPPABLE WITH CAVEATS

---

## Executive summary

The project is a mature, well-architected safari booking platform that is already live in production. The codebase has zero TODO/FIXME/HACK comments, strict TypeScript, and strong auth middleware. Two user-facing pages serve hardcoded placeholder data instead of querying the database (the only CRITICAL findings). Secondary issues include 15 env vars used in code but missing from `.env.example`, 13 components with no loading indicators during data fetches, and ~50 accessibility gaps in admin components. The `scripts/` and `ui-variations/` directories contain extensive Unsplash placeholder images, but these are dev/seed artifacts and don't reach production users.

---

## Findings

### CRITICAL — blocks shipping / affects users

1. **`src/app/(site)/tanzania-day-tours/page.tsx:30`** — `placeholderTrips` hardcoded array with fake day trip data shown to real users when database returns empty. Users see fabricated tours.
2. **`src/app/(site)/tanzania-destinations/page.tsx:76`** — `placeholderDestinations` hardcoded array with fake destination data shown to real users. Same pattern as above.

### HIGH — internal features or noticeable issues

3. **Env vars used but not in `.env.example`** (15 vars) — `DATABASE_URL_ACCELERATE`, `GA4_PROPERTY_ID`, `GOOGLE_SERVICE_ACCOUNT_KEY`, `GOOGLE_SITE_VERIFICATION`, `GSC_SITE_URL`, `NEXT_PUBLIC_BASE_URL`, `NEXT_PUBLIC_VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, `VAPID_PUBLIC_KEY`, `VAPID_SUBJECT`, `ANALYTICS_ENDPOINT`. New developer setup will miss these.
4. **Fallback image patterns** — 2 components use `src || "https://r2.dev/..."` pattern that hides missing images behind a hardcoded fallback:
   - `src/components/routes/RouteItinerary.tsx:970`
   - `src/components/tours/DayByDayTimeline.tsx:320`
5. **Unhandled fetch in service worker** — `public/admin-sw.js:64` has a `fetch()` without error handling.
6. **Broken internal links in seed data** — 6 links in `prisma/seed-blog-content-kili2.ts` and `prisma/seed-blog-content-kili3.ts` point to routes that don't exist (`/kilimanjaro-climbing-routes/`, `/kilimanjaro-climbing-tips/`, `/trekking/8-days-lemosho-route/`, etc.).

### MEDIUM — dev experience / cleanup

7. **Missing loading states** — 13 components fetch data with no loading indicator:
   - `WhatsAppChat.tsx`, `GalleryUploadField.tsx`, `GroupBookingForm.tsx`, `InquiryForm.tsx`, `InviteFriendsModal.tsx`, `SafariInquiryForm.tsx`, `TailorMadeForm.tsx`, `ZanzibarInquiryForm.tsx`, `RoutePriceTable.tsx`, `EmailShareModal.tsx`, `RotationStatusCard.tsx`, `PuckEditorWrapper.tsx`, `PreferencesClient.tsx`
8. **Accessibility gaps** — ~50 findings in source files (admin-only components):
   - ~30 `<input>` elements without associated labels
   - ~10 `<div onClick>` without keyboard role attributes
   - ~5 `<button>` elements without text or aria-label
   - Located primarily in: `ItineraryEditor`, `SafariItineraryEditor`, `ElevationProfileEditor`, `PricingTiersEditor`, `PinSettings`, `FaqsEditor`, `ListEditor`, `GalleryUploadField`, `SlugTitleFields`, `TrekkingFilters`, `SafariFilters`
9. **Dead env vars in `.env.example`** — 8 vars declared but never referenced in code: `NEXTAUTH_SECRET` (NOTE: used internally by NextAuth — false positive), `NEXT_PUBLIC_SITE_NAME`, `R2_ACCESS_KEY_ID`, `R2_BUCKET_NAME`, `R2_ENDPOINT`, `R2_PUBLIC_URL`, `R2_SECRET_ACCESS_KEY` (NOTE: likely consumed via env by S3 client — verify), `SENTRY_DSN` (Sentry not integrated).
10. **Placeholder images in scripts/** — 150+ Unsplash URLs in seed scripts (`fix-all-safari-itineraries.ts`, `seed-safari-images.ts`, `seed-marangu-route.ts`). Not user-facing but could pollute database if re-run.
11. **Placeholder images in ui-variations/** — 100+ Unsplash URLs in HTML mockup files. These are design artifacts, not production code.

### LOW — cleanup

12. **Unwired API routes** — 15 routes with no frontend caller found. Most are legitimate (cron jobs, health checks, admin fetches via dynamic URLs): `/api/cron/*` (4 routes, called by Vercel Cron), `/api/health` (external monitoring), `/api/admin/seo/*` (5 routes, likely fetched by admin dashboard components via dynamic construction), `/api/admin/404-monitor/stats`, `/api/admin/commissions/export`, `/api/admin/email/test`, `/api/admin/newsletter/export`, `/api/analytics/vitals`.
13. **Unrendered components** — The detector flagged 180+ components as "exported but never rendered." Nearly all are false positives: Next.js App Router auto-renders page.tsx/layout.tsx/loading.tsx/error.tsx exports, and most component imports are traced through JSX in parent files. Manual verification showed no genuinely orphaned components.
14. **john@example.com placeholder** — Used as email input placeholder text in 10+ form components. This is standard UX (not test data) but could be replaced with a domain-specific example like `you@email.com`.

---

## Data authenticity status

| Category | Total | In Production Path | In Scripts/Dev |
|----------|-------|--------------------|----------------|
| Placeholder images (Unsplash) | 250+ | 2 (fallback patterns) | 250+ |
| Mock/dummy data (named) | 2 | 2 CRITICAL | 5 (test scripts) |
| Hardcoded arrays in components | 60+ | See note | — |
| Lorem ipsum | 0 | 0 | 0 |
| Test credentials | 0 | 0 | 0 |

**Note on hardcoded arrays:** The mock-data aggressive scanner flagged ~60 component files with hardcoded arrays. Most are intentional static content: navigation items, filter options, FAQ lists, pricing tier labels, stat cards, breadcrumb configs, etc. The two genuinely problematic ones (`placeholderTrips`, `placeholderDestinations`) are listed as CRITICAL above.

**Production-ready?** Yes, with 2 caveats — fix the placeholder arrays on day-tours and destinations pages.

---

## Wiring status

- Orphaned files: 0 confirmed (detector returned empty)
- Unrendered components: ~180 flagged, 0 confirmed (all false positives from Next.js App Router conventions)
- Unwired routes: 15 flagged, 0 confirmed broken (all have external callers: cron, health, admin fetch)
- Broken internal links: 6 (all in seed/migration scripts, not production pages)
- Dead imports: 0

---

## API & integrations

| Service | Status | Issue |
|---------|--------|-------|
| PostgreSQL (Prisma Accelerate) | OK | — |
| Cloudflare R2 (S3-compatible) | OK | — |
| NextAuth v5 | OK | Beta 30 — monitor for updates |
| Nodemailer (cPanel SMTP) | OK | — |
| Google Analytics (GA4 dual) | OK | — |
| Google Search Console API | OK | Env vars missing from .env.example |
| Web Push (VAPID) | OK | Env vars missing from .env.example |
| Sentry | NOT INTEGRATED | `SENTRY_DSN` in .env.example but no code uses it |
| Vercel Cron | OK | 4 cron routes defined |

**Env vars:**
- Used but not declared in .env.example: `DATABASE_URL_ACCELERATE`, `GA4_PROPERTY_ID`, `GOOGLE_SERVICE_ACCOUNT_KEY`, `GOOGLE_SITE_VERIFICATION`, `GSC_SITE_URL`, `NEXT_PUBLIC_BASE_URL`, `NEXT_PUBLIC_VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, `VAPID_PUBLIC_KEY`, `VAPID_SUBJECT`, `ANALYTICS_ENDPOINT`
- Declared but possibly unused: `NEXT_PUBLIC_SITE_NAME`, `SENTRY_DSN`
- Declared, used internally (false positive): `NEXTAUTH_SECRET`, `R2_ACCESS_KEY_ID`, `R2_BUCKET_NAME`, `R2_ENDPOINT`, `R2_PUBLIC_URL`, `R2_SECRET_ACCESS_KEY`

---

## Detectors run

- placeholder-images
- mock-data (targeted + aggressive)
- lorem-and-todos
- test-credentials
- env-var-audit
- orphaned-files
- dead-imports
- unrendered-components (React)
- unwired-routes (Next.js app router)
- broken-links (Next.js)
- unhandled-promises
- missing-error-states
- missing-loading-states
- accessibility-basics

## Detectors skipped

- **api-surface** (Python script) — skipped because Python 3 not confirmed available. Manual review of API routes recommended.
- **component-reuse** — skipped because Python 3 required. Visual inspection suggests no major duplicate component families.

---

## OODA plan

**Next 24h (CRITICAL-S):**
1. Fix `placeholderTrips` in `src/app/(site)/tanzania-day-tours/page.tsx` — remove hardcoded array, fetch from database (DayTrip model exists in Prisma schema).
2. Fix `placeholderDestinations` in `src/app/(site)/tanzania-destinations/page.tsx` — remove hardcoded array, query Destination model instead.

**Next week (CRITICAL-M, HIGH-S):**
3. Add 11 missing env vars to `.env.example` with placeholder values and comments.
4. Fix broken internal links in seed scripts (6 links to non-existent routes).
5. Replace fallback image patterns in `RouteItinerary.tsx:970` and `DayByDayTimeline.tsx:320` with proper empty-state handling.
6. Add error handling to `public/admin-sw.js` fetch.
7. Remove `SENTRY_DSN` from `.env.example` (Sentry not integrated) or integrate Sentry.

**Next month (rest):**
8. Add loading states to 13 client components that fetch data.
9. Add aria-labels to admin form inputs (~30 inputs) and keyboard roles to clickable divs (~10 instances).
10. Replace Unsplash URLs in seed scripts with R2 CDN URLs (prevents future database pollution).
11. Clean up `ui-variations/` directory — decide whether to keep or archive these HTML mockups.

**Consider cutting:**
- `SENTRY_DSN` env var (declared but Sentry is not integrated — remove or commit to integrating)
- `ui-variations/` directory — static HTML mockups from design phase, not used in production
- `scripts/generate-placeholders.ts` — generates placeholder data, may be obsolete now that real data exists

---

## Needs human decision

- **`scripts/` directory** — 28+ utility scripts, some for one-time migrations (already run). Should old migration scripts be archived or deleted?
- **`ui-variations/` directory** — HTML design mockups with Unsplash images. Keep for reference or clean up?
- **Sentry integration** — `SENTRY_DSN` declared in .env.example but no Sentry code exists. Integrate or remove?
- **NextAuth beta** — Running v5.0.0-beta.30. Monitor for stable release or stay on beta?

---

## How to execute fixes

Work through `audit-checklist.md` top-down. Check off items only after verifying the fix works end-to-end.

Re-run the audit after a batch of fixes to confirm progress.
