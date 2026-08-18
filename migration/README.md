# SnowAfrica Laravel + Inertia Migration Documentation

Status: approved design; documentation baseline created 2026-08-18.

This folder is the authoritative migration package for rebuilding Snow Africa Adventure as a Laravel application with an Inertia React public site, a custom Inertia admin dashboard, the Timeless Builder visual editor, and a guarded one-tap deployment and rollback workflow.

The migration is a stack change, not a redesign. Existing routes, content, responsive behavior, brand styling, conversion flows, analytics, structured data, metadata, media URLs, and search equity must survive unchanged unless a change is separately approved and recorded.

## Locked decisions

1. Build the target application as a sibling repository at `L:\snowafrica-laravel`.
2. Keep the current Next.js application at `L:\snowafrica` operational until cutover acceptance passes.
3. Use Laravel, Inertia v2, React, TypeScript, Vite, and Tailwind CSS 4 for both public and admin interfaces.
4. Use custom Inertia admin pages. Do not introduce Filament or Blade-rendered product interfaces.
5. Retain the existing PostgreSQL data and Cloudflare R2 media. Do not perform a destructive database recreation.
6. Let Laravel become the schema owner through reviewed migrations after compatibility has been proven.
7. Port React presentation components and Tailwind classes with minimal changes so UI/UX remains visually identical.
8. Use Inertia SSR for public HTML, metadata, canonical tags, JSON-LD, and crawlable content.
9. Adapt the Timeless Builder architecture from `L:\goshenisafari-laravel`, while retaining SnowAfrica-specific widgets and styling.
10. Adapt the Deployment Center and trusted background runner pattern from `L:\safarisync-laravel`.
11. Treat “one tap” as a guarded deployment/cutover action after automated preflight, backup, migration classification, smoke tests, and explicit confirmation. It does not bypass review.
12. Preserve all current public URLs and trailing-slash behavior. Any unavoidable URL change requires an explicit, tested 301 redirect.

## Document index

| Document | Purpose |
|---|---|
| [01-current-state-audit.md](01-current-state-audit.md) | Evidence-backed inventory of the Next.js application and migration gaps |
| [02-route-and-content-matrix.md](02-route-and-content-matrix.md) | Public, admin, API, and content-family route mapping |
| [03-target-architecture.md](03-target-architecture.md) | Laravel/Inertia architecture, boundaries, and file ownership |
| [04-database-and-content-migration.md](04-database-and-content-migration.md) | PostgreSQL compatibility, Eloquent mapping, content extraction, and reconciliation |
| [05-timeless-builder-plan.md](05-timeless-builder-plan.md) | Builder document model, widgets, editor, renderer, preview, and versioning |
| [06-admin-and-full-crud.md](06-admin-and-full-crud.md) | Custom admin modules, permissions, workflows, and CRUD acceptance criteria |
| [07-seo-analytics-and-url-preservation.md](07-seo-analytics-and-url-preservation.md) | Metadata, schema, redirects, sitemap, analytics, and search-equity controls |
| [08-ui-ux-parity-and-testing.md](08-ui-ux-parity-and-testing.md) | Pixel parity, behavior parity, test pyramid, and release gates |
| [09-one-tap-deployment-and-cutover.md](09-one-tap-deployment-and-cutover.md) | Deployment Center, infrastructure, backups, cutover, rollback, and recovery |
| [10-master-implementation-plan.md](10-master-implementation-plan.md) | Ordered, testable implementation plan with exact target paths and checkpoints |
| [11-risks-decisions-and-non-goals.md](11-risks-decisions-and-non-goals.md) | Risk register, decision log, assumptions, and scope boundaries |
| [12-definition-of-done.md](12-definition-of-done.md) | Final acceptance checklist and owner sign-off record |

## How to use this package

1. Read documents 01–03 before creating the target repository.
2. Implement documents 04–09 in the order established by document 10.
3. Record deviations in document 11 before merging the deviation.
4. Keep the current and target applications pointed at non-production clones until coexistence tests pass.
5. Use document 12 as the only authority for production cutover approval.

## Prime directive

The target application is not complete because it builds or because CRUD works. It is complete only when the same URLs deliver equivalent content, design, interaction, metadata, schemas, redirects, forms, analytics events, and operational behavior, with database reconciliation showing no lost records.

