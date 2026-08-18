# Risks, Decisions, and Non-Goals

## Decision log

| ID | Decision | Reason |
|---|---|---|
| D-001 | Build a sibling `L:\snowafrica-laravel` repository | Keeps the live application stable and enables side-by-side verification |
| D-002 | Retain PostgreSQL and current records | Eliminates a needless database-platform migration and reduces data-loss risk |
| D-003 | Retain Cloudflare R2 bucket/object keys | Preserves media URLs, cache value, and content references |
| D-004 | Use custom Inertia for public and admin | Preserves React UI/UX and avoids a visually divergent admin framework |
| D-005 | Use React 19 and Tailwind 4 | Matches SnowAfrica’s current frontend and minimizes presentation drift |
| D-006 | Use Inertia SSR for public pages | Required for crawlable HTML, metadata, structured data, previews, and resilient first render |
| D-007 | Use Timeless Builder for flexible editorial layout | Removes compiled static pages while retaining reusable, controlled components |
| D-008 | Keep domain facts in typed models | Prices, dates, filters, relationships, availability, and schemas must remain queryable and validated |
| D-009 | Publish immutable builder versions | Prevents drafts and partial edits from reaching production |
| D-010 | Port presentation, rewrite data/backend boundaries | Delivers stack migration without redesign |
| D-011 | PostgreSQL search first | Existing scale does not justify operating another search service without evidence |
| D-012 | Admin queues deployment requests; CLI executes them | The web server must not have shell/service-switch authority |
| D-013 | Use immutable releases and atomic symlink activation | Gives deterministic artifacts and fast code rollback |
| D-014 | Keep a legacy edge-origin switch through stabilization | Gives immediate whole-stack fallback without DNS delay |
| D-015 | Mail stays on cPanel SMTP unless separately approved | Matches the requested provider and avoids changing web and mail infrastructure together |
| D-016 | Block destructive migrations during coexistence | Next.js and rollback depend on the old schema remaining compatible |
| D-017 | No broad SEO/content redesign during stabilization | Isolates migration effects and protects diagnostic clarity |

## Risk register

| Risk | Probability / impact | Early signal | Prevention | Recovery |
|---|---|---|---|---|
| Static TSX content loses sections or layout | High / Critical | Content hash, DOM, or screenshot diff | AST extraction, widget mapping, per-page publish gate | Keep page unpublished; continue serving legacy |
| Canonical/redirect regression | Medium / Critical | Crawl diff, GSC warnings, 404 spike | Route manifest, one-hop redirect tests, central canonical service | Edge revert or hotfix redirect release |
| Existing PostgreSQL identifiers/casts mis-map | Medium / Critical | Model parity/reconciliation mismatch | Actual DB inventory, explicit mappings, clone write tests | Stop cutover; rollback code; restore only for corruption |
| Monetary or booking data changes incorrectly | Low / Critical | Aggregate/status diff, transaction test failure | Decimal strings, transactions, locks, idempotency | Disable writes, export valid new records, targeted repair |
| Legacy password hashes fail | Medium / High | Sample verification/login tests fail | Compatibility tests and rehash-on-login plan | Keep legacy auth active; reset affected test users only |
| Draft content leaks publicly | Low / High | Public version differs from published ID | Immutable published version relation and visibility tests | Repoint published version/cache purge |
| Builder editor enters public bundle | Medium / Medium | Bundle manifest increase | Strict imports and bundle assertion | Split import/chunk and redeploy |
| R2 references break or objects are deleted | Low / Critical | Media audit 404/usage mismatch | Retain keys, usage-aware deletion, no migration deletion | R2 version restore/replication plus DB reference repair |
| Email queues stop | Medium / High | Queue heartbeat stale, pending/failed jobs | Supervisor, Redis, alerts, deployment smoke | Restart worker, retry safe jobs, inspect SMTP |
| SSR fails after deploy | Medium / High | Readiness/raw HTML probe failure | SSR test/build gate, Supervisor, browser-global guards | Automatic previous release or legacy-origin revert |
| Deployment runner has excessive privilege | Low / Critical | Security review finding | Dedicated account, allowlisted commands/services, request state machine | Disable deployment switch and rotate credentials |
| Migration locks production tables | Medium / High | Staging timing/lock report | Additive migrations, concurrent indexes, chunked backfills | Cancel/rollback release; retain compatible schema |
| One-tap deployment hides unsafe action | Medium / Critical | Missing preflight/confirmation evidence | Mandatory password/TOTP/phrase, backup, checksum, health | Request cancellation/automatic rollback |
| DNS cutover disrupts mail | Low / Critical | MX/TXT diff | Web-only record plan and pre/post DNS export | Restore exact mail records immediately |
| Analytics fires twice or loses attribution | Medium / High | DebugView/network duplicate/missing event | Single facade, dual-property tests, controlled script mounts | Disable duplicate mount and deploy code fix |
| SEO traffic drops for normal seasonal reasons and is misdiagnosed | Medium / Medium | Mixed page-group changes | Baselines by page/query, annotate release, avoid simultaneous SEO edits | Investigate cohort evidence before rollback |
| Existing user changes in source are overwritten | Low / High | Dirty worktree overlap | Source is read-only during port; copy by manifest/commit | Restore user branch/commit; never reset source |
| Reference-project code diverges from SnowAfrica design | High / Medium | Screenshot/component mismatch | Use references for architecture only | Replace reference widget/UI with SnowAfrica component |
| Production backup exists but cannot restore | Medium / Critical | Restore drill failure | Automated verification and quarterly isolated restores | Repair backup process before cutover |

## Cutover incident thresholds

Immediately revert to the legacy origin or previous release when any of these is confirmed and cannot be corrected safely inside the agreed short response window:

- Homepage, primary catalog routes, admin login, or booking/inquiry submission returns sustained 5xx.
- Database reconciliation detects lost/changed critical records.
- Confirmed bookings/inquiries cannot be created or are created with incorrect amounts/relationships.
- Public pages lose canonical/robots/SSR content broadly.
- Queue/mail outage accumulates customer communications without a safe drain plan.
- Authentication/authorization allows privilege bypass.
- R2 media fails across a material share of pages.

Do not restore the database automatically when reverting traffic. Preserve valid post-cutover writes and decide data recovery separately.

## Assumptions that implementation must verify

- The existing PostgreSQL database is reachable from the chosen production topology with acceptable latency and backup access.
- Current Prisma-origin identifiers can be mapped without renaming.
- A stable legacy Vercel origin hostname can be used behind the edge, or Cloudflare origin switching is available.
- The current R2 bucket and credentials can be used by Laravel Flysystem without changing public keys.
- cPanel SMTP permits the required queued application volume and has valid SPF/DKIM alignment.
- The target VPS has sufficient capacity for PHP-FPM, PostgreSQL if local, Redis, queue worker, SSR, backups, and build-free artifact extraction.
- Existing production data can be restored into isolated rehearsal environments without violating privacy/security policy.

If an assumption fails, record the selected alternative as a new decision before implementation continues.

## Non-goals

- Redesigning the brand, public pages, admin, navigation, or content strategy.
- Rewriting copy, titles, descriptions, URLs, or schemas for speculative SEO gains.
- Moving from PostgreSQL to MySQL.
- Moving media away from R2.
- Replacing custom Inertia admin with Filament.
- Introducing microservices, Kubernetes, or a new search cluster.
- Adding multilingual URLs/content unless separately scoped.
- Replacing cPanel SMTP with SES or another provider during the same migration.
- Rebuilding the booking product into a materially different commerce flow.
- Deleting legacy tables, columns, Vercel deployment, or R2 objects during the initial cutover.
- Treating raw HTML as the default answer for hard-to-convert TSX pages.

## Change-control rule

Any deviation affecting URL structure, database platform, admin framework, UI design, content ownership, SSR, mail provider, media keys, deployment authority, or rollback method requires owner approval and a new decision row before code is merged.

