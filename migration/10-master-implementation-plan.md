# SnowAfrica Laravel + Inertia Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `subagent-driven-development` (recommended) or `executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the production Next.js application with a Laravel + Inertia React application that preserves every public/admin capability, makes all editorial pages manageable, and supports guarded one-tap deployment and rollback.

**Architecture:** Build a sibling Laravel application against cloned then existing PostgreSQL data, port the current React/Tailwind presentation through compatibility boundaries, render public pages with Inertia SSR, and manage flexible content through a versioned Timeless Builder. Deploy immutable artifacts to an atomic release layout; keep the legacy application available until parity and stabilization gates pass.

**Tech Stack:** Laravel, PHP 8.3+, Inertia v2, React 19, TypeScript, Vite, Tailwind CSS 4, PostgreSQL, Redis, Cloudflare R2, Laravel Mail/cPanel SMTP, PHPUnit, Vitest, Playwright, nginx, Supervisor/systemd, GitHub Actions.

---

## Target file map

Files are created under `L:\snowafrica-laravel` unless marked as source-only.

| Area | Primary files |
|---|---|
| Bootstrap | `composer.json`, `package.json`, `vite.config.ts`, `bootstrap/app.php`, `resources/js/app.tsx`, `resources/js/ssr.tsx` |
| Routing | `routes/web.php`, `routes/admin.php`, `routes/auth.php`, `routes/api.php`, `routes/console.php`, `routes/deployment.php` |
| Public | `app/Http/Controllers/PublicSite/*`, `resources/js/Pages/PublicSite/*`, `resources/js/Layouts/PublicLayout.tsx` |
| Admin | `app/Http/Controllers/Admin/*`, `resources/js/Pages/Admin/*`, `resources/js/Layouts/AdminLayout.tsx` |
| Builder | `app/Services/Builder/*`, `resources/js/Builder/*`, builder migrations/models/controllers |
| Data | `app/Models/*`, `app/Enums/*`, `app/Casts/*`, `database/migrations/*` |
| SEO | `app/Services/Seo/*`, `app/Http/Controllers/SitemapController.php`, `RobotsController.php`, `resources/views/app.blade.php` |
| Deployment | `app/Services/Deployment/*`, `app/Console/Commands/Deployment/*`, `deploy/*`, `.github/workflows/release.yml` |
| Verification | `tests/Unit`, `tests/Feature`, `tests/Browser`, `scripts/parity`, `scripts/migration` |

## Phase 0 — Baseline and controls

### Task 1: Establish immutable source baselines

**Files:**

- Create: `docs/legacy/source-commit.txt`
- Create: `storage/app/migration/source-file-manifest.json`
- Create: `storage/app/parity/source-route-manifest.json`
- Create: `storage/app/parity/source-seo-crawl.json`
- Create: `storage/app/parity/source-screenshots/`
- Test: `tests/Feature/Migration/SourceManifestTest.php`

- [ ] Record the exact `L:\snowafrica` commit, dirty-file list, Node/package lock hashes, Prisma schema hash, route list, redirect list, and public-asset hashes without modifying the source.
- [ ] Crawl production plus database-discovered slugs and all redirect sources; redact query secrets and personal data.
- [ ] Capture the four required viewports and interaction states from document 08.
- [ ] Add a test that rejects a source manifest missing any of the measured 75 public pages, 76 admin pages, 84 API routes, 47 models, or 174 code redirects unless the baseline document records the new measured count.
- [ ] Run `php artisan test --filter=SourceManifestTest`; expect all manifest assertions to pass.
- [ ] Commit with `docs(migration): capture immutable SnowAfrica baseline`.

### Task 2: Scaffold the sibling Laravel/Inertia application

**Files:**

- Create: Laravel starter files at repository root
- Create: `resources/js/app.tsx`
- Create: `resources/js/ssr.tsx`
- Create: `resources/views/app.blade.php`
- Modify: `vite.config.ts`, `tsconfig.json`, `package.json`, `composer.json`
- Test: `tests/Feature/BootTest.php`

- [ ] Create `L:\snowafrica-laravel` as a new Git repository and install Laravel with Inertia React, SSR, TypeScript, React 19, Vite, and Tailwind 4.
- [ ] Configure path alias `@/*` to `resources/js/*`, strict TypeScript, formatting, lint, PHP test, Vitest, Playwright, typecheck, `build`, and `build:ssr` scripts.
- [ ] Add a boot test that requests `/health/live` and expects 200 plus an application/release identifier with no dependency details.
- [ ] Implement the route and minimal app/SSR entry until the test passes.
- [ ] Run `php artisan test`, `npm run typecheck`, and `npm run build:ssr`; expect zero failures and both client/SSR manifests.
- [ ] Commit with `chore: scaffold Laravel Inertia SSR application`.

## Phase 1 — Existing data compatibility

### Task 3: Inventory the real PostgreSQL schema

**Files:**

- Create: `app/Console/Commands/Migration/InventoryDatabaseCommand.php`
- Create: `app/Services/Migration/DatabaseInventory.php`
- Create: `storage/app/migration/database-inventory.schema.json`
- Test: `tests/Feature/Migration/DatabaseInventoryTest.php`

- [ ] Write tests against a fixture schema covering quoted names, camelCase columns, arrays, jsonb, decimals, enums, foreign keys, and indexes.
- [ ] Implement read-only `migration:inventory-database` using `information_schema` and `pg_catalog`; exclude values and credentials.
- [ ] Run it against a restored production clone and store a sanitized generated inventory artifact outside version control plus an approved structural snapshot under `docs/legacy/`.
- [ ] Compare the inventory to `L:\snowafrica\prisma\schema.prisma` and classify every mismatch.
- [ ] Run `php artisan test --filter=DatabaseInventory`; expect pass and zero database mutations.
- [ ] Commit with `feat(migration): inventory legacy PostgreSQL schema`.

### Task 4: Map legacy tables into Eloquent

**Files:**

- Create: `app/Models/*.php` for all 47 models
- Create: `app/Enums/*.php` for all 19 enums
- Create: `app/Casts/PgTextArray.php`
- Create: `app/Models/Concerns/UsesLegacyCuid.php`
- Test: `tests/Feature/Models/LegacyModelParityTest.php`
- Test: `tests/Unit/Casts/PgTextArrayTest.php`

- [ ] Add failing fixtures for all scalar, decimal, date, enum, array, json, relationship, timestamp, and ID behaviors.
- [ ] Implement explicit table/column mappings, casts, keys, timestamps, scopes, and relationships without changing the database.
- [ ] Compare serialized Eloquent records with Prisma-produced sanitized fixture JSON for every critical model.
- [ ] Prove password hash verification for sampled test hashes without logging them.
- [ ] Run `php artisan test --filter='LegacyModelParity|PgTextArray'`; expect pass.
- [ ] Commit with `feat(data): map SnowAfrica legacy schema to Eloquent`.

### Task 5: Add Laravel-owned content, audit, and deployment schema

**Files:**

- Create: migrations for tables specified in documents 04 and 09
- Create: models for content pages, builder documents/versions/templates/sections, SEO metadata, navigation, audit, deployment requests/releases/backups
- Test: `tests/Feature/Migrations/AdditiveMigrationTest.php`

- [ ] Add a test that starts from the sanitized legacy schema fixture, runs all Laravel migrations twice where safe, and asserts no legacy table/column/index disappears.
- [ ] Create additive migrations with foreign keys/indexes and PostgreSQL jsonb.
- [ ] Implement model casts/relationships and factories.
- [ ] Run `php artisan migrate:fresh --seed` only on the isolated test database, then `php artisan test --filter=AdditiveMigrationTest`; expect pass.
- [ ] Run destructive-pattern classification; expect zero unapproved destructive operations.
- [ ] Commit with `feat(data): add managed content and operations schema`.

## Phase 2 — Auth, shells, and UI foundation

### Task 6: Implement session auth and permission policies

**Files:**

- Create: `routes/auth.php`
- Create: `app/Http/Controllers/Auth/*`
- Create: `app/Http/Requests/Auth/*`
- Create: `app/Policies/*`
- Create: `app/Support/Permissions.php`
- Create: `resources/js/Pages/Admin/Auth/*`
- Test: `tests/Feature/Auth/*`
- Test: `tests/Feature/Authorization/RoleMatrixTest.php`

- [ ] Write failing tests for login, logout, throttling, session regeneration, legacy hash compatibility, reset token expiry/use, inactive users, and every role boundary in document 06.
- [ ] Implement Laravel session auth, role hierarchy, named permissions, policies, password reset, and audit events.
- [ ] Port the current login/reset UI exactly.
- [ ] Run auth/authorization tests; expect direct HTTP mutations by `VIEWER` to return 403 and last-super-admin safeguards to pass.
- [ ] Commit with `feat(auth): add compatible admin authentication and policies`.

### Task 7: Port CSS, public layout, and compatibility adapters

**Files:**

- Create: `resources/css/app.css`
- Create: `resources/js/Layouts/PublicLayout.tsx`
- Create: `resources/js/Components/Layout/*`
- Create: `resources/js/compat/{Link,Image,navigation,dynamic}.tsx`
- Create: `resources/js/Components/ThemeProvider.tsx`
- Test: `resources/js/compat/*.test.tsx`
- Test: `tests/Browser/PublicLayout.spec.ts`

- [ ] Copy and normalize the source global CSS/theme tokens, fonts, header, footer, navigation, analytics mounts, Web Vitals, and WhatsApp widget without design changes.
- [ ] Implement adapter contracts required by copied components and tests for internal/external links, image sizing/fill/priority, navigation, and client-only dynamic imports.
- [ ] Feed theme/logo/navigation through shared Inertia props and SSR-safe initialization to prevent CLS.
- [ ] Run component tests, SSR build, and public-layout screenshots at all four viewports; expect approved parity.
- [ ] Commit with `feat(ui): port SnowAfrica public design foundation`.

### Task 8: Port the custom admin shell and primitives

**Files:**

- Create: `resources/js/Layouts/AdminLayout.tsx`
- Create: `resources/js/Components/Admin/*`
- Create: `resources/js/Pages/Admin/Dashboard.tsx`
- Create: `app/Http/Controllers/Admin/DashboardController.php`
- Test: `tests/Browser/AdminShell.spec.ts`

- [ ] Port admin sidebar/top bar/breadcrumbs/command palette/notification shell/PWA/toasts and shared UI components.
- [ ] Implement shared props and dashboard queries with authorized, serialized view models.
- [ ] Verify desktop/mobile navigation, keyboard shortcuts, loading/empty/error states, and role-based visibility.
- [ ] Run browser and accessibility tests; expect parity and no critical accessibility issue.
- [ ] Commit with `feat(admin): port custom Inertia admin shell`.

## Phase 3 — Routes, SEO, and parity harness

### Task 9: Implement routing, redirects, sitemap, robots, and SEO builders

**Files:**

- Create: `routes/web.php`
- Create: `app/Services/Seo/*`
- Create: `app/Support/Routing/ReservedSlug.php`
- Create: `app/Http/Middleware/HandleRedirects.php`
- Create: `app/Http/Controllers/{SitemapController,RobotsController}.php`
- Modify: `resources/views/app.blade.php`
- Test: `tests/Feature/Seo/*`
- Test: `tests/Feature/Routing/*`

- [ ] Write fixtures matching every current metadata/schema builder and redirect pattern.
- [ ] Register explicit routes in the order defined in document 02, with root blog fallback last.
- [ ] Implement central SEO, structured data, redirect, sitemap, robots, canonical, and reserved-slug services.
- [ ] Import the 174 source redirects and database redirects into a normalized manifest; prove one-hop final targets.
- [ ] Run SEO/routing tests and raw-HTML SSR probes; expect exact approved output.
- [ ] Commit with `feat(seo): preserve routes metadata schemas and redirects`.

### Task 10: Build the automated parity system

**Files:**

- Create: `app/Console/Commands/Parity/{Crawl,Compare}Command.php`
- Create: `scripts/parity/capture.mjs`
- Create: `scripts/parity/compare.mjs`
- Create: `tests/Feature/Parity/ParityGateTest.php`

- [ ] Implement status/redirect/head/schema/content/link/image/DOM/screenshot capture against allowlisted base URLs.
- [ ] Normalize volatile dates, CSRF, request IDs, analytics IDs, and authorized dynamic availability without hiding content loss.
- [ ] Produce JSON and HTML reports with blocking vs reviewed differences.
- [ ] Add CI failure rules from document 07 and screenshot requirements from document 08.
- [ ] Run against the unchanged source twice; expect no blocking self-diff.
- [ ] Commit with `test(parity): add route SEO and visual comparison gates`.

## Phase 4 — Timeless Builder and managed content

### Task 11: Implement Builder types, registry, renderer, and hydration

**Files:**

- Create: `resources/js/Builder/{Types,Registry,Renderer,Widgets}/*`
- Create: `app/Services/Builder/{BlockHydrator,DocumentValidator,PublishedDocumentResolver}.php`
- Create: `app/Http/Resources/BuilderDocumentResource.php`
- Test: `resources/js/Builder/**/*.test.tsx`
- Test: `tests/Feature/Builder/RendererTest.php`

- [ ] Define the versioned document/element contracts and matching client/server validation fixtures.
- [ ] Port shared SnowAfrica components and implement every required widget family in document 05.
- [ ] Implement batched server-side hydration, published scopes, caching, and invalidation.
- [ ] Render fixture documents through Inertia SSR and assert text, links, images, headings, and schemas.
- [ ] Inspect Vite manifest to assert editor modules are absent from public chunks.
- [ ] Commit with `feat(builder): add Timeless document renderer and widgets`.

### Task 12: Implement Builder editor, preview, versions, and publishing

**Files:**

- Create: `resources/js/Builder/Editor/*`
- Create: `resources/js/Pages/Admin/Builder/Editor.tsx`
- Create: `app/Http/Controllers/Admin/BuilderController.php`
- Create: `app/Actions/Content/{SaveBuilderDraft,PublishBuilderDocument,RestoreBuilderVersion}.php`
- Create: `app/Http/Requests/Admin/Builder/*`
- Test: `tests/Feature/Builder/EditorWorkflowTest.php`
- Test: `tests/Browser/BuilderEditor.spec.ts`

- [ ] Write failing tests for autosave, concurrency conflict, validation, authorization, preview expiry/noindex, publish, cache invalidation, audit, and restore.
- [ ] Port/adapt Gosheni’s canvas, panels, inspector, media picker, templates, history, a11y feedback, and toast patterns.
- [ ] Implement the exact endpoint contract in document 05 and atomic immutable publishing.
- [ ] Verify keyboard editing, all viewports, media/link selection, conflict recovery, publish, and restore.
- [ ] Commit with `feat(builder): add Timeless visual editor and publishing`.

### Task 13: Build and run the static/Puck content conversion pipeline

**Files:**

- Create: `scripts/migration/{extract-pages.mjs,component-map.ts}`
- Create: `app/Console/Commands/Migration/{ExtractPages,ImportContent}Command.php`
- Create: `app/Services/Migration/ContentImporter.php`
- Test: `tests/Fixtures/migration/pages/*`
- Test: `tests/Feature/Migration/ContentImportTest.php`

- [ ] Add AST fixtures for metadata, headings, content arrays, images, links, JSON-LD calls, responsive components, Puck JSON, and unsupported components.
- [ ] Implement deterministic extraction and idempotent dry-run/import.
- [ ] Map all known source components to registered Timeless widgets; unsupported components block import.
- [ ] Import every bespoke route into drafts, then review source/target at all viewports and attach parity results.
- [ ] Publish only pages with passing route/content/SEO/visual/accessibility checks.
- [ ] Run `php artisan migration:import-content --dry-run` twice; expect identical plans and no writes.
- [ ] Commit with `feat(migration): convert static pages to Timeless documents`.

## Phase 5 — Public catalog and full admin CRUD

### Task 14: Port typed public catalog and blog routes

**Files:**

- Create: public controllers/resources/pages for home, trekking, safaris, destinations, day trips, guides, departures, blog/taxonomy, search, pages
- Test: `tests/Feature/PublicSite/*`
- Test: `tests/Browser/PublicCatalog.spec.ts`

- [ ] Write route-family tests for published/draft/archive, pagination/filtering, ordered relations, root blog URLs, metadata/schema, 404, and SSR.
- [ ] Port React page/components with current Tailwind classes and replace Prisma queries with controller/service props.
- [ ] Attach supplemental published Builder documents where specified.
- [ ] Compare each route family to source fixtures and screenshots.
- [ ] Run public feature/browser/parity suites; expect no blocking difference.
- [ ] Commit by domain in small commits such as `feat(trekking): port public listing and details`.

### Task 15: Implement content and media CRUD

**Files:**

- Create: admin controllers/requests/actions/policies/pages for routes, safaris, destinations, day trips, blog/taxonomy, pages, guides, logos, reviews, branding, media
- Create: `app/Services/Media/MediaService.php`
- Test: `tests/Feature/Admin/Content/*`, `tests/Feature/Admin/Media/*`

- [ ] Implement each module’s common CRUD contract and domain-specific rules from document 06.
- [ ] Reuse ported itinerary, elevation, pricing, FAQ, gallery, linked-image, SEO, slug, table, and form components.
- [ ] Configure R2 Flysystem, validation, metadata, usage scan, replacement, variants, and delete protection.
- [ ] Run role-matrix tests and one browser CRUD scenario per module.
- [ ] Commit each bounded module independently.

### Task 16: Implement operations CRUD and transactional services

**Files:**

- Create: controllers/requests/actions/policies/pages for departures, bookings, climbers, inquiries, invites, newsletter, partners, commissions, payouts, email logs, notifications, users
- Test: `tests/Feature/Admin/Operations/*`

- [ ] Write allowed status transition and authorization tests before each service.
- [ ] Centralize decimal-safe calculations and multi-record changes in transactions with locks/idempotency where required.
- [ ] Preserve current attribution, visitor, email, climber, commission, payout, and invoice behavior.
- [ ] Replace destructive operational deletes with the semantics in document 06.
- [ ] Run full operations and permission suites; expect all invariants to pass.
- [ ] Commit per domain.

### Task 17: Port forms, mail, queues, scheduler, analytics, SEO dashboard, redirects, and 404 monitoring

**Files:**

- Create: public requests/actions/controllers/pages for forms/token flows
- Create: `app/Mail/*`, `app/Jobs/*`, `app/Services/Email/*`
- Create: scheduled commands in `app/Console/Commands/*` and `routes/console.php`
- Create: analytics/SEO/redirect/404 controllers, services, and admin pages
- Test: `tests/Feature/Forms/*`, `Mail/*`, `Schedule/*`, `SeoAdmin/*`

- [ ] Port form validation and side effects with duplicate-submit/idempotency tests.
- [ ] Port mail templates and logging; queue with retries/backoff and safe errors.
- [ ] Replace Vercel cron routes with scheduled commands using non-overlap locks and heartbeats.
- [ ] Port dual GA4/event facade, Web Vitals, GSC/GA jobs, SEO screens, redirect manager, and 404 tracking.
- [ ] Run synthetic end-to-end flows without sending production analytics or email.
- [ ] Commit by capability.

## Phase 6 — Reconciliation, deployment, and cutover

### Task 18: Implement migration reconciliation and release gates

**Files:**

- Create: `app/Console/Commands/Migration/ReconcileCommand.php`
- Create: `app/Services/Migration/Reconciler.php`
- Test: `tests/Feature/Migration/ReconcileTest.php`

- [ ] Implement the counts, key sets, status distributions, money aggregates, relationships, media, content hashes, and redirects in document 04.
- [ ] Redact PII from reports and emit machine-readable plus operator summaries.
- [ ] Make every critical mismatch exit non-zero.
- [ ] Run against two equivalent clones; expect zero differences, then mutate a fixture and expect a failure.
- [ ] Commit with `test(migration): add production reconciliation gate`.

### Task 19: Implement Deployment Center and trusted release runner

**Files:**

- Create: `.github/workflows/release.yml`
- Create: `config/deployment.php`, `routes/deployment.php`
- Create: `app/Services/Deployment/*`
- Create: `app/Console/Commands/Deployment/*`
- Create: `resources/js/Pages/Admin/Deployments/*`
- Create: `deploy/{nginx,supervisor,systemd,runbooks}/*`
- Test: `tests/Feature/Deployment/*`, `tests/Unit/Deployment/*`

- [ ] Write tests for request authorization, confirmation, locks, state machine, package checksum/path safety, destructive migrations, backup verification, release activation, sanitized logs, health failure, and rollback.
- [ ] Implement immutable artifact build and release manifest.
- [ ] Implement admin request-only UI and trusted CLI pipeline exactly as document 09.
- [ ] Exercise a complete deploy/failed-health rollback in an isolated release root with fake named services.
- [ ] Run security/audit checks and commit with `feat(deploy): add guarded one-tap releases and rollback`.

### Task 20: Rehearse staging migration and cutover

**Files:**

- Create: `docs/runbooks/staging-rehearsal.md`
- Create: signed artifacts under CI, not Git
- Update: parity/reconciliation reports and `migration/12-definition-of-done.md` sign-off copy in target docs

- [ ] Restore a recent production backup into isolated staging and connect to a staging R2 policy that prevents destructive production actions.
- [ ] Run inventory/import/reconciliation, deploy, SSR/services, and full parity suites.
- [ ] Exercise legacy-edge proxy, Laravel cutover, automatic failed-health revert, manual revert, previous-release rollback, and isolated DB restore.
- [ ] Resolve every blocking difference and repeat the full rehearsal from a fresh restore.
- [ ] Record measured duration, downtime, locks, cache warmup, and rollback time.
- [ ] Obtain owner, engineering, SEO, and operations sign-off.
- [ ] Commit rehearsal documentation with `docs(release): record SnowAfrica cutover rehearsal`.

### Task 21: Execute production cutover and stabilization

**Files:**

- Runtime deployment records/logs/backups only; no unreviewed source edits
- Update: production runbook and final acceptance record after the event

- [ ] Freeze content/schema changes for the declared window and take the final backup.
- [ ] Deploy the approved artifact while legacy remains active; run final reconcile/parity/health checks.
- [ ] Request `cutover` from Deployment Center and verify automatic smoke.
- [ ] Perform owner conversion/admin checks and monitor errors, queues, mail, 404s, analytics, and SEO.
- [ ] Keep rollback available and follow the incident thresholds in document 12.
- [ ] After the stabilization window, make Prisma read-only, archive the Vercel project without deleting recovery artifacts, and document Laravel as schema owner.
- [ ] Commit final operational record with `docs(release): complete SnowAfrica Laravel cutover`.

## Global completion rule

No phase is complete because code exists. It is complete when its tests pass, its parity/reconciliation artifacts are reviewed, its operational procedure is rehearsed, and its bounded commit contains no unrelated source changes.

