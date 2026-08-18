# UI/UX Parity and Testing

## Parity rule

The migration may change framework internals, data ownership, and operational tooling. It may not casually change what users see or how established flows behave. Any intentional design change is removed from this migration or approved as a separately tracked change with its own baseline.

## Visual baseline

Capture every public route family and every admin module before porting. Dynamic routes use representative fixtures covering typical and edge states.

Required viewport set:

- Mobile: 390 × 844.
- Small tablet: 768 × 1024.
- Desktop: 1440 × 1000.
- Wide desktop: 1920 × 1080 for hero/crop checks.

Capture:

- Full-page screenshot.
- Above-the-fold screenshot after fonts/images settle.
- DOM snapshot with volatile values normalized.
- Computed font family/size/weight/line height for headings, body, buttons, inputs, nav, and cards.
- Major component bounding boxes.
- Header/footer/menu states.
- Hover, focus, validation, loading, empty, dialog, and mobile-menu states.

## Porting method

1. Copy global CSS variables, reset/base rules, typography, animations, and Tailwind configuration first.
2. Implement compatibility adapters for links, images, navigation, metadata-independent utilities, and environment variables.
3. Copy UI primitives and shared layout components with JSX/classes intact.
4. Replace Next-specific data/server APIs at page boundaries, not throughout presentation components.
5. Port domain components.
6. Port route pages against fixed fixtures.
7. Connect Laravel props only after fixture screenshots match.
8. Add Timeless widget wrappers around proven components.

Compatibility adapters are transitional. Each adapter documents supported behavior and has tests. Unsupported Next.js behavior fails loudly during development.

## Visual acceptance thresholds

Automated screenshot diff is a triage tool, not the only authority.

- Zero missing sections, components, images, labels, or CTAs.
- No unapproved content reordering.
- Header, hero, primary CTA, forms, and footer require manual pixel-level approval.
- Layout shift must not move interactive targets unexpectedly.
- Text wrapping differences caused by font/config errors are failures.
- Minor antialiasing differences may be accepted only when geometry, font metrics, and colors match.
- The diff runner stores source, target, diff image, pixel ratio, and reviewer decision per route/viewport.

## Behavior parity checklist

### Global public UI

- Header desktop navigation, mega menu, mobile menu, active states, external links.
- Footer sections, current year, certification logos, contact/social links.
- Theme variables and logo variants.
- WhatsApp widget closed/open/close behavior and responsive position.
- Breadcrumb display and links.
- Image loading/focal points/galleries/lightboxes.
- Sticky CTA/navigation behavior.
- Accordion keyboard interaction.
- Search input, results, no-results, query persistence.
- Pagination and filter query strings.

### Forms and conversion

- Contact, inquiry, tailor-made, booking, newsletter, share-email, climber details, and climber management.
- Client and server validation agreement.
- Country/phone formatting.
- Multi-step progress and back/forward behavior.
- Duplicate-submit prevention and idempotency.
- Email/notification side effects.
- Thank-you destination and analytics event deduplication.
- Attribution fields: source, landing page, referrer, UTM, GA client ID, device and location where current behavior collects them.

### Admin

- Sidebar/top-bar/mobile navigation.
- Command palette search and keyboard shortcuts.
- Tables, filters, sorting, pagination, status badges, selection.
- Forms, repeaters, media pickers, galleries, itinerary, pricing, FAQ, elevation editors.
- Confirmation dialogs and unsaved-change warnings.
- Notification bell/preferences, PWA install/offline behavior where retained.
- Role-based visibility and direct-request denial.

## Accessibility preservation and improvement

Migration acceptance requires no new critical WCAG 2.2 AA violations.

- One logical H1 per primary public page.
- Heading levels form a meaningful outline.
- Full keyboard access to menus, dialogs, tabs, accordions, builder operations, tables, and forms.
- Visible focus indicator.
- Correct labels, descriptions, errors, and live regions.
- Dialog focus trap and return.
- Images retain meaningful alt text; decorative images use empty alt.
- Color contrast meets AA using the active theme.
- Motion respects `prefers-reduced-motion`.
- Tap targets remain usable on mobile.
- SSR markup remains semantically meaningful before hydration.

## Test pyramid

### PHP unit tests

- SEO builders and schema output.
- Redirect normalization/loop detection.
- Content transforms and reserved-slug rules.
- Money, commission, pricing, and date calculations.
- Builder validation/migrations/hydration.
- Media reference scanning.
- Deployment migration classification and log sanitization.

### Laravel feature tests

- Every public route family: 200/301/404, props, visibility, canonical/metadata.
- Every CRUD action: happy path, invalid input, unauthenticated, unauthorized, conflict, dependencies.
- Auth/reset/session/role behavior.
- Booking/inquiry/climber/invite token flows.
- Mail queued/logged behavior.
- Upload/replace/delete rules with fake storage plus R2 contract tests.
- Sitemap/robots/404/redirect behavior.
- Scheduled commands and non-overlap locks.
- Deployment request security and state transitions.

### React component tests

- Shared UI and form behavior.
- Existing critical component tests ported from Vitest.
- Builder widgets/editor operations.
- Analytics facade event names and payloads.
- Compatibility adapters.

### Browser tests

Port the current Playwright flows and expand them:

- Navigation desktop/mobile.
- Search.
- Trekking listing/detail.
- Safari listing/detail and filters.
- Contact/tailor-made/inquiry/booking submission.
- Climber token flows.
- Admin login and permission matrix.
- CRUD smoke for every module.
- Builder draft/preview/publish/restore.
- Media upload/use/delete protection.
- Redirect creation from 404.
- Deployment preflight request using a fake runner environment.
- Analytics events observed without sending to production properties.

## Data and contract fixtures

Create deterministic factories/fixtures for:

- Published/draft/archived content.
- All mountains and safari types.
- Safaris with ordered destinations.
- Routes with itinerary, pricing, FAQ, gallery, and departure states.
- Destinations with/without sufficient indexable content.
- Root blog slugs near reserved routes.
- Booking/payment/status combinations.
- Inquiry types and attribution variants.
- Media referenced from typed fields, URLs, builder documents, and SEO.
- All roles and permission boundaries.
- Redirect exact/wildcard/chain/loop cases.
- Every Timeless widget type and schema version.

## Performance verification

For a representative homepage, long-form SEO page, listing, safari detail, trekking detail, blog post, search, admin table, and builder editor, record:

- Server response time and query count.
- Raw HTML size.
- JavaScript/CSS transfer and parse size.
- Image bytes and LCP resource.
- Lighthouse categories and lab metrics.
- Field Core Web Vitals baseline where analytics provides it.

Acceptance:

- No N+1 query regression.
- Public editor bundle exclusion proven by bundle manifest inspection.
- Equivalent public pages do not exceed the current JS budget by more than 10% without approval.
- No critical Lighthouse accessibility/SEO finding.
- Mobile LCP/INP/CLS are equal to or better than the approved baseline under the same test conditions.

## Test commands in the target repository

```bash
php artisan test
npm run typecheck
npm run test:run
npm run build:ssr
npm run test:e2e
php artisan migration:reconcile
php artisan parity:crawl --target=source
php artisan parity:crawl --target=laravel
php artisan parity:compare
php artisan deployment:preflight
```

Each command must exit non-zero on a blocking failure. CI uploads test, crawl, screenshot, Lighthouse, bundle, and reconciliation reports.

## Manual sign-off groups

- Owner/product: route, content, conversion, and visual parity.
- Engineering: architecture, tests, performance, security, deployment, rollback.
- SEO: metadata, schemas, sitemap, robots, redirects, internal links, analytics.
- Operations: bookings, inquiries, mail, queue, scheduler, backups, monitoring.

No single automated score substitutes for these sign-offs.

