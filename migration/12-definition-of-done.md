# Definition of Done and Cutover Acceptance

This checklist is the production cutover gate. Every required item must have evidence. A verbal “looks good” does not override a failed automated gate.

## Repository and architecture

- [ ] `L:\snowafrica-laravel` is a separate reviewed repository with clean build instructions and lock files.
- [ ] Laravel is the routing/business/data owner; public and admin UIs use custom Inertia React.
- [ ] Public pages use Inertia SSR and render meaningful raw HTML.
- [ ] React 19, Tailwind 4, Outfit, Sora, theme variables, and current UI components are retained.
- [ ] Editor code is absent from public bundles.
- [ ] No ordinary content/admin operation requires source edits or shell access.

## Route completeness

- [ ] All measured public page files are represented in the route manifest.
- [ ] All current admin modules are represented or deliberately consolidated with a tested redirect.
- [ ] All API capabilities are mapped to controllers/actions/jobs or intentionally retired with evidence.
- [ ] Every current production 2xx URL remains 2xx at the same canonical URL.
- [ ] `/blog/{slug}/` remains a one-hop permanent redirect to `/{slug}/`.
- [ ] Root post slugs cannot collide with reserved routes.
- [ ] Trailing-slash behavior is consistent with the current canonical policy.
- [ ] Zero unintended internal 404s remain.

## Content and Timeless Builder

- [ ] All compiled editorial pages have managed Timeless documents or approved typed-page ownership.
- [ ] No public editorial copy is stranded only in source code.
- [ ] Homepage, company, legal, campaign, and long-form SEO pages are editable.
- [ ] Tours, routes, destinations, day trips, blog posts, and guides retain typed fields and relationships.
- [ ] Draft changes cannot appear publicly.
- [ ] Preview is signed, expiring, `noindex`, and inaccessible without authorization/token.
- [ ] Publish creates immutable version history and audit records.
- [ ] Version restore creates a new draft and preserves history.
- [ ] Concurrent editing conflict handling is proven.
- [ ] Unknown/invalid widget documents cannot publish.

## Full CRUD and admin

- [ ] Every module in document 06 passes create/read/update/archive or delete/restore tests as applicable.
- [ ] Search, filters, sorting, pagination, validation, previews, statuses, and audit links work.
- [ ] All writes are authorized server-side.
- [ ] Role matrix passes for `SUPER_ADMIN`, `ADMIN`, `EDITOR`, and `VIEWER`.
- [ ] Last-super-admin protection passes.
- [ ] Operational/financial records cannot be hard-deleted through normal UI.
- [ ] Admin desktop and mobile navigation match the approved baseline.
- [ ] Media usage prevents deletion of referenced assets.

## Data integrity

- [ ] Actual production schema inventory is captured and reviewed.
- [ ] All 47 measured Prisma models and 19 enums are mapped or their updated baseline difference is approved.
- [ ] Eloquent/Prisma sanitized fixture parity passes.
- [ ] Critical record primary-key sets match.
- [ ] Record counts and status distributions match.
- [ ] Booking, price, commission, and payout decimal aggregates match.
- [ ] Relationship counts match.
- [ ] Media references resolve.
- [ ] Published pages all have valid published versions.
- [ ] `migration:reconcile` exits zero immediately before cutover.
- [ ] Migrations are additive/compatible through the rollback window.

## SEO

- [ ] Source and target crawl manifests have no unapproved blocking difference.
- [ ] Titles, descriptions, canonicals, robots, Open Graph, and Twitter tags are present and approved.
- [ ] Required JSON-LD types and fields validate.
- [ ] H1 and content parity passes.
- [ ] Sitemap includes only canonical/indexable published URLs and accurate modification dates.
- [ ] `/terms-conditions/` redirects to `/terms-and-conditions/`; only the latter is in sitemap.
- [ ] Robots policy preserves approved search/social/AI behavior and blocks private surfaces.
- [ ] All 174 measured code redirects plus database redirects are accounted for.
- [ ] Redirects have no loops and no unintended chains.
- [ ] 404 monitor records and classifies correctly without exposing sensitive query values.
- [ ] GSC/GA synchronization works through queued/scheduled jobs.

## UI/UX and accessibility

- [ ] Every route family is approved at mobile, tablet, desktop, and wide-desktop widths.
- [ ] Header, menus, hero, primary CTA, forms, sticky elements, WhatsApp, and footer match.
- [ ] No sections, images, links, headings, or interactive states are missing.
- [ ] Image crops/focal points/dimensions/priority and alt text match.
- [ ] Keyboard flows pass for public, admin, and Builder.
- [ ] No new critical WCAG 2.2 AA issue exists.
- [ ] Reduced motion and focus visibility work.

## Forms and integrations

- [ ] Contact, inquiry, tailor-made, booking, newsletter, share, invite, climber complete/manage flows pass.
- [ ] Client/server validation agrees.
- [ ] Duplicate submission is prevented or idempotent.
- [ ] Customer/admin emails queue, send, and log correctly through cPanel SMTP.
- [ ] Failed mail retries and surfaces operationally.
- [ ] R2 uploads, reads, variants, replacements, metadata, and deletion protections pass.
- [ ] Both GA4 properties receive the approved event taxonomy once per action.
- [ ] UTM/referrer/landing/GA client/device/location attribution parity passes where collected.

## Performance and operations

- [ ] Public bundle and Core Web Vitals meet document 08 budgets.
- [ ] No representative route has an N+1 regression.
- [ ] Redis cache/session/queue operate correctly.
- [ ] Queue and scheduler heartbeats are healthy and alerted.
- [ ] Inertia SSR is supervised and health-checked.
- [ ] nginx, PHP-FPM, PostgreSQL, Redis, queue, scheduler, SSR, R2, SMTP, TLS, disk, memory, log error, and 5xx monitoring are active.
- [ ] Logs redact passwords, tokens, credentials, payment/payout details, and sensitive personal data.

## Deployment, backup, and rollback

- [ ] CI produces immutable checksummed release artifacts from reviewed commits.
- [ ] Admin Deployment Center cannot execute shell commands directly.
- [ ] Password, TOTP, typed confirmation, permission, rate limit, and lock controls pass.
- [ ] Preflight blocks missing config, unsafe migrations, bad checksums, low disk, unhealthy dependencies, and concurrent deployment.
- [ ] Pre-deploy database backup is encrypted, offsite, checksummed, and recorded.
- [ ] Atomic release activation and previous-release rollback are rehearsed.
- [ ] Failed health check automatically returns to a healthy release/origin.
- [ ] Legacy-origin cutover and revert are rehearsed.
- [ ] Isolated database restore drill passes.
- [ ] Mail DNS records are exported before web DNS changes and unchanged afterward.
- [ ] The legacy Next.js deployment remains available through stabilization.

## Required command evidence

The final release record attaches successful output/artifacts for:

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

## Sign-off

| Area | Required approver | Evidence |
|---|---|---|
| Product/UI/content | Owner | Reviewed route and screenshot report |
| Engineering/data/security | Engineering owner | Tests, reconciliation, architecture/security review |
| SEO/analytics | SEO owner | Crawl/schema/redirect/event report |
| Operations/recovery | Operations owner | Rehearsal, deploy, monitoring, restore evidence |

Cutover occurs only after all four approvals are recorded in the Deployment Center or a version-controlled release record.

## Stabilization completion

The migration is fully complete only after the agreed stabilization window shows:

- No unresolved critical application/security/data incident.
- No migration-caused sustained SEO/organic conversion regression requiring rollback.
- Stable queue/mail/scheduler/SSR/backup monitoring.
- Stable bookings, inquiries, and admin workflows.
- Laravel declared schema owner.
- Legacy application made read-only/archived but not destructively deleted until recovery retention expires.

