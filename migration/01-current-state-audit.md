# Current-State Audit

Audit date: 2026-08-18  
Source repository: `L:\snowafrica`  
Reference repositories: `L:\safarisync-laravel`, `L:\safarisync-deploy`, `L:\goshenisafari-laravel`

## Executive finding

SnowAfrica is not a static brochure site. It is a production Next.js 16 application with a significant admin and operations surface. The migration must preserve a public content platform, booking and inquiry flows, customer data, admin workflows, SEO tooling, media management, scheduled work, and analytics.

The biggest gap is that much of the highest-value editorial content is still compiled into React page files. Of 75 public `page.tsx` files, 54 do not directly query Prisma. Those files contain approximately 40,488 lines. They include the long-form Kilimanjaro and Tanzania landing pages that carry organic-search value. The migration must convert that content into managed data without flattening its layout or weakening its structured data.

## Measured inventory

| Area | Measured state |
|---|---:|
| Public page files under `src/app/(site)` | 75 |
| Public page files with direct Prisma access | 21 |
| Public page files without direct Prisma access | 54 |
| Lines in public pages without direct Prisma access | ~40,488 |
| Admin page files under `src/app/(admin)/admin` | 76 |
| API route files under `src/app/api` | 84 |
| Prisma models | 47 |
| Prisma enums | 19 |
| Next.js redirect entries in `next.config.ts` | 174 |
| Reusable files under `src/components` | 154 |
| Files under `src/lib` | 63 |
| Existing automated test files | 15 |

These numbers are a baseline, not an estimate. The implementation must regenerate the inventory before cutover and explain any difference.

## Current stack

| Layer | Current implementation | Migration consequence |
|---|---|---|
| Web framework | Next.js 16 App Router | Replace routing/server components with Laravel controllers and Inertia pages |
| UI | React 19 + TypeScript | Retain React and TypeScript; port components instead of redesigning |
| Styling | Tailwind CSS 4, CSS variables | Retain Tailwind 4 and copy the brand token system exactly |
| Data | Prisma 7, PostgreSQL/Accelerate | Map existing quoted/camelCase schema explicitly in Eloquent; no destructive recreation |
| Authentication | NextAuth v5 credentials | Replace with Laravel session auth while preserving password-hash compatibility and roles |
| Storage | Cloudflare R2 via AWS SDK | Replace with Laravel Flysystem S3/R2 while retaining bucket and object keys |
| Email | Nodemailer and cPanel SMTP | Replace with queued Laravel Mail using the same intended SMTP provider |
| Admin | Custom Next.js React dashboard | Rebuild as custom Inertia admin, preserving workflows and design |
| CMS | Prisma `Page`, `CmsPage`, Puck, page heroes, homepage settings | Consolidate into Timeless Builder plus typed domain editors |
| SEO | Next Metadata API, custom schema functions, GSC/GA sync, audit dashboard | Centralize in Laravel SEO services and Inertia SSR head output |
| Deployment | Vercel + Vercel Cron | Move to a VPS release workflow with queues, scheduler, SSR, health checks, backups, and rollback |

## Existing domain models

The Prisma schema currently defines these functional groups:

- Catalog/content: `TrekkingRoute`, `SafariPackage`, `Destination`, `SafariDestination`, `DayTrip`, `BlogPost`, `Category`, `Tag`, `PostCategory`, `PostTag`, `Page`, `CmsPage`, `HomepageContent`, `PageHero`, `Guide`, `Logo`, `Review`, `Media`.
- Departures/booking: `GroupDeparture`, `Booking`, `ClimberToken`, `InviteLink`, `AutoRotationConfig`, `PricingRule`.
- Lead management: `Inquiry`, `NewsletterSubscription`.
- Commercial: `Partner`, `PartnerCommissionRate`, `Commission`, `CommissionPayout`.
- Administration/security: `AdminUser`, `PasswordResetToken`, `PushSubscription`.
- Communications: `Notification`, `EmailLog`.
- SEO/observability: `NotFoundUrl`, `NotFoundHit`, `Redirect`, `SeoSyncLog`, `GscSearchQuery`, `GscPageMetric`, `GaOrganicMetric`, `SeoPageAudit`, `SeoKeywordTracker`, `SeoHealthSnapshot`.
- Presentation/configuration: `SiteSetting`, `ThemeSetting`.

The target must first map these tables as they exist. New Laravel-native names are allowed only for new tables. Renaming current tables or columns during the migration would add risk without user value.

## Public surface

The public application contains:

- Homepage and company pages.
- Trekking listing and detail routes.
- Safari listing and detail routes.
- Destination listing and detail routes.
- Day-trip listing and detail routes.
- Blog listing, post, category, and tag routes.
- More than 40 bespoke long-form SEO pages.
- Search.
- Tailor-made inquiry flow.
- Contact and newsletter flows.
- Group departure booking and invitation flows.
- Climber detail token flows.
- Legal, thank-you, and error behavior.

Public layouts also provide global header/footer, theme and logo data, dual Google Analytics, web-vitals reporting, WhatsApp chat, preconnects, fonts, and organization-level JSON-LD.

## Admin surface

Existing admin functionality includes:

- Dashboard, bookings, inquiries, departures, invitation links, partners, commissions, payouts, newsletter, and email logs.
- Trekking routes, safaris, destinations, day trips, blog posts, pages, homepage sections, heroes, guides, logos, reviews, media, theme, and settings.
- Users and role hierarchy: `SUPER_ADMIN`, `ADMIN`, `EDITOR`, `VIEWER`.
- Redirect manager and 404 monitor.
- SEO overview, search console, analytics, content health, recommendations, keyword tracking, and page analyzer.
- Conversion analytics for bookings, inquiries, traffic sources, countries, devices, browsers, and departures.
- Notifications and push subscription management.

Some CRUD writes are implemented as server actions inside page files while others use API routes. The target must normalize writes into Form Requests, policies, controllers/actions, services, and transactions.

## Current content-management gaps

1. Long-form content is embedded in React/TSX and requires code deployment to edit.
2. `Page`, `CmsPage`, Puck content, homepage settings, page heroes, and specialized domain records overlap in responsibility.
3. Rich layouts and SEO schema are often defined independently per page, which makes global enforcement difficult.
4. Delete operations occur in page-local server actions; the target needs explicit authorization, dependency checks, soft-delete/archive rules, and audit trails.
5. Some admin modules expose list/edit routes but do not follow one uniform CRUD contract.
6. Sitemap static-page entries and the static-route reservation list are manually maintained in separate code.
7. Redirect rules exist in both code and the database-backed redirect system.

## SEO assets that must not regress

- Exact canonical URLs and trailing slashes.
- Existing page titles and title-length behavior.
- Meta descriptions, Open Graph, and Twitter cards.
- Organization, LocalBusiness, WebSite/SearchAction, TouristTrip, Product, FAQPage, Article, BreadcrumbList, Event, AggregateRating, Review, HowTo, VideoObject, TouristDestination, and ItemList schemas where currently applicable.
- Dynamic XML sitemap content and priorities.
- Robots rules that distinguish search, social, AI-search, AI-training, and SEO crawler user agents.
- The full set of 174 configured redirect entries plus database redirects and hit counts.
- Root-slug blog posts and the reserved-slug collision rules.
- GSC and GA4 synchronization/history.
- 404 tracking, bot classification, human/bot counts, redirect conversion, and reports.
- Internal-link map behavior.
- Dual GA4 properties and the current event taxonomy.

## UI/UX assets that must not regress

- Outfit heading font and Sora body font.
- CSS-variable theme output and database-driven theme settings.
- Header, mega navigation, mobile menu, footer, logo placements, responsive breakpoints, and sticky/mobile CTAs.
- Current cards, hero layouts, accordions, filters, pagination, galleries, itinerary editors, elevation profile, forms, dialogs, tables, badges, toasts, and admin navigation.
- Image sizing, crop/focal behavior, lazy loading, preloads, CDN URLs, and alt text.
- WhatsApp widget state and positioning.
- Keyboard navigation, focus states, reduced motion, validation feedback, empty states, and loading states.

## Reference-project findings

### SafariSync Laravel

The useful patterns are:

- Full custom Inertia React across public and admin surfaces.
- Inertia SSR with a Supervisor-managed Node process.
- Compatibility shims that let React components retain familiar `next/link`, `next/image`, and navigation imports during a staged port.
- Existing PostgreSQL retained while Laravel maps the Prisma-origin schema.
- R2 retained as the canonical media store.
- PostgreSQL `ILIKE` and `pg_trgm` search instead of adding a search service prematurely.
- Admin Deployment Center that queues deployment requests; HTTP never executes shell operations.
- A trusted CLI worker that performs preflight, backup, install/build, migration, optimization, service restart, health verification, and rollback.
- Queue, scheduler, SSR, health, offsite backup, and restore-drill runbooks.

### Gosheni Laravel

The useful patterns are:

- Timeless Builder split into `Editor`, `Renderer`, `Registry`, `Widgets`, `Hooks`, and `Types`.
- The editor is imported only by an admin route and excluded from public bundles.
- Server-side block hydration for data-driven widgets.
- Builder pages, blocks, versions, templates, preview, publishing, and SEO integration.
- Specialized editors for tours, destinations, accommodations, blogs, and month guides using the same block architecture.
- Polymorphic SEO metadata and builder-block ownership.
- Database-driven sitemap and redirect middleware.
- Custom Inertia admin tables and forms.
- Release-based deployment with immutable releases, shared state, atomic symlink switching, destructive-migration classification, and rollback.

## Audit conclusion

The target should combine SafariSync’s full-Inertia/PostgreSQL/SSR/deployment architecture with Gosheni’s Timeless Builder and domain-editor architecture. SnowAfrica’s own frontend, content, schema types, analytics, and SEO logic remain the source of truth for behavior and appearance.

No reference-project component should replace a SnowAfrica component merely because it already exists. References provide architecture; SnowAfrica provides the product contract.

