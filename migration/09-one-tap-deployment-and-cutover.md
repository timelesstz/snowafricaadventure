# One-Tap Deployment, Cutover, and Rollback

## Outcome

An authorized super administrator can request a production deployment or rollback from the admin Deployment Center. The HTTP request only creates a reviewed database request. A privileged background CLI runner performs the deployment. The result is logged, health-checked, and reversible.

This combines SafariSync’s secure admin-request/CLI-execution boundary with Gosheni’s immutable release directories and atomic `current` symlink.

## Production topology

```text
Internet
  -> Cloudflare DNS/TLS
  -> nginx on Ubuntu VPS
     -> current Laravel release / PHP-FPM
     -> Inertia SSR Node service

Laravel
  -> local/private PostgreSQL or approved managed PostgreSQL endpoint
  -> Redis for cache/session/queue/locks
  -> existing Cloudflare R2 bucket
  -> cPanel SMTP for transactional mail

Supervisor/systemd
  -> queue worker
  -> Inertia SSR

system scheduler
  -> Laravel schedule:run every minute
  -> deployment:run-pending every minute under a privileged deployment account
```

Mail DNS is out of deployment scope. MX, SPF, DKIM, DMARC, and human mailbox records remain unchanged during web cutover.

## Filesystem layout

```text
/var/www/snowafrica/
  current -> releases/20260818T120000Z-<commit>/
  releases/
  shared/
    .env
    storage/
    backups/
    deployment-logs/
    release-packages/
  switch/
    legacy-upstream.conf
    laravel-upstream.conf
    active-upstream.conf -> legacy-upstream.conf or laravel-upstream.conf
```

Secrets live only in `shared/.env` or root-owned service environment files. They never enter artifacts, logs, admin responses, or Markdown.

## Release artifact

GitHub Actions creates a versioned release artifact from an immutable commit/tag. The workflow:

1. Installs Composer and npm dependencies from lock files.
2. Runs PHP, TypeScript, unit, feature, and browser release gates.
3. Builds Vite client and Inertia SSR bundles.
4. Generates route/bundle manifests.
5. Packages source, `vendor`, built public assets, SSR bundle, migration files, and manifest.
6. Generates SHA-256 checksum and signs or verifies provenance through the selected GitHub release mechanism.
7. Publishes artifact, checksum, commit, build time, required PHP extensions, required environment keys, and migration classification.

Production never builds unreviewed working-tree code and never deploys a moving branch without recording the resolved commit.

## Deployment data model

### `deployment_requests`

UUID, requested action (`deploy`, `rollback`, `backup`, `cutover`, `revert_cutover`), requested release/commit, status, requester, approver if dual approval is enabled, confirmation evidence timestamps, sanitized options jsonb, started/finished times, runner host, exit code, log path, failure summary, timestamps.

Statuses: `pending`, `approved`, `running`, `succeeded`, `failed`, `cancelled`.

### `deployment_releases`

UUID, release name, commit SHA, artifact checksum, path, status (`available`, `active`, `failed`, `rolled_back`, `pruned`), deployed/activated/rolled-back times, migration batch, health result jsonb, creator/request relation, timestamps.

### `deployment_backups`

UUID, request/release relation, database backup path/object key, checksum, encrypted flag, verified flag, restore-test status/time, size, retention class, timestamps.

## Deployment Center security

- Only `SUPER_ADMIN` with `deployment.manage` may mutate.
- Re-confirm password, TOTP, and type `DEPLOY <release>` or `ROLLBACK <release>`.
- Rate-limit requests.
- Optional IP/CIDR allowlist.
- Reject concurrent active deployment/cutover requests.
- Web/PHP-FPM user cannot execute shell commands, switch symlinks, restart services, or read secrets.
- The admin UI displays allowlisted sanitized logs only.
- The CLI runner accepts structured database requests, not arbitrary command strings.
- All request state transitions and cancellations are audited.

## One-tap normal deployment flow

1. Super admin selects an approved release.
2. Deployment Center fetches release metadata and displays commit, tests, checksum, migration classification, environment/key compatibility, backup state, and change summary.
3. Super admin completes confirmation; Laravel inserts an approved request.
4. `deployment:run-pending` obtains a host-level and database advisory lock.
5. Runner revalidates request, checksum, disk, binaries/extensions, services, DB/R2/Redis/SMTP reachability, and current health.
6. Runner creates an encrypted database backup and verifies its checksum/offsite upload.
7. Runner extracts the artifact into a new release directory with no path traversal.
8. Runner links shared `.env` and `storage`, fixes narrow runtime permissions, and runs `php artisan about`.
9. Runner runs `php artisan migrate --force`; destructive migration patterns are blocked unless the release has a separately approved exception.
10. Runner runs config/route/view/event optimization and target release smoke tests.
11. Runner atomically switches `current` to the new release.
12. Runner reloads PHP-FPM, restarts Inertia SSR and queue workers gracefully, and lets nginx keep serving.
13. Runner probes `/health/live`, authenticated `/health/ready`, homepage raw SSR, representative catalog/blog routes, and admin login shell.
14. On success, mark active and retain the configured number of old releases.
15. On code/health failure, switch `current` back, restart services, probe again, and mark the request failed with rollback details.

The deployment button is one tap operationally after confirmation; the runner still performs every safety step.

## Migration classification

Preflight blocks migrations containing destructive operations such as table/column/index/constraint drops, renames, truncation, or irreversible data rewrites. Migration files may declare a reviewed risk manifest explaining lock duration, compatibility, rollback, and backup requirements.

Normal migration releases use expand/contract:

1. Add nullable/new structures.
2. Deploy code that supports old and new.
3. Backfill with resumable commands.
4. Switch reads after reconciliation.
5. Remove old structures only in a later owner-approved cleanup release after Next.js retirement.

## Health endpoints

### `/health/live`

Public, cheap, returns only process/application liveness and release identifier. It reveals no secrets or dependency details.

### `/health/ready`

Protected by a bearer token or internal network. Checks:

- Database query.
- Redis read/write.
- Queue heartbeat freshness.
- Scheduler heartbeat freshness.
- SSR process/render probe.
- R2 configured/reachable using a non-destructive metadata check.
- Required configuration keys present.
- Current release/symlink consistency.

SMTP delivery is monitored by queued test/heartbeat and failure metrics rather than sending mail on every readiness probe.

## Initial infrastructure and cutover

To make final cutover and rollback immediate, use nginx as a switchable edge before retiring Next.js:

1. Provision the VPS, PostgreSQL/Redis, PHP-FPM, Node, nginx, Supervisor, firewall, TLS, backups, and monitoring.
2. Obtain the current Vercel deployment origin hostname through Vercel project inspection and store it as the server-only `LEGACY_ORIGIN_URL`.
3. Configure `legacy-upstream.conf` to proxy to that immutable Vercel origin with correct host/proxy headers and no redirect loop.
4. Point the web A/AAAA records to the VPS after lowering TTL; preserve every mail record.
5. Keep `active-upstream.conf` on legacy and verify the entire site through the VPS edge.
6. Deploy Laravel releases privately and verify through an authenticated preview hostname blocked from indexing.
7. Run final data, route, SEO, screenshot, form, queue, email, and backup reconciliation.
8. In Deployment Center, request `cutover`. The trusted runner switches `active-upstream.conf` to Laravel, validates nginx, reloads it, purges relevant caches, and performs full smoke checks.
9. If the smoke gate fails, the runner switches back to legacy immediately.
10. Keep the legacy origin available through the stabilization window.

If the current Vercel project cannot provide a stable direct origin, use a Cloudflare origin/load-balancer switch with equivalent health/rollback behavior. The implementation records the selected method in the decision log before production DNS changes.

## Rollback modes

### Release rollback

Switch `current` to the previous Laravel release, restart services, and probe. Additive schema remains. This is the normal rollback.

### Cutover rollback

Switch nginx/Cloudflare origin back to the legacy Next.js application. Use when Laravel has a broad runtime/behavior failure during the coexistence window.

### Database restore

Restore only for confirmed data corruption and only through a separately approved recovery procedure. Never automatically restore a pre-deploy database after real post-deploy bookings/inquiries may have been accepted. First isolate writes, export new valid transactions, and choose a recovery plan.

## Backups

- Nightly encrypted PostgreSQL custom-format dump.
- Pre-deployment encrypted dump.
- Offsite copy to an isolated R2 bucket/account or other approved target.
- Checksums and upload alerts.
- Seven daily, four weekly, and twelve monthly restore points unless business policy sets stricter retention.
- Quarterly restore drill into an isolated database; verify migrations, record counts, and application smoke.
- VPS snapshot complements but does not replace database/object-level backup.

R2 production media needs versioning/lifecycle protection or a separately verified inventory/replication strategy. Database backups alone do not recover deleted media objects.

## Server hardening

- Key-only SSH; normal deployment does not require interactive root access.
- UFW exposes only required web/SSH ports; PostgreSQL, Redis, SSR, and internal probes are private.
- Dedicated deployment account with narrowly scoped sudoers entries for release switching and named service reloads.
- Automatic security updates, fail2ban, log rotation, TLS renewal monitoring.
- Secrets readable only by required service accounts.
- `APP_DEBUG=false`, secure cookies, trusted proxies, HSTS after verified rollout, CSP/security headers tested against current embeds/analytics.

## Post-deploy smoke

- Homepage and representative static/Builder page raw SSR.
- Trekking/safari/destination/day-trip listings and details.
- Root blog post and `/blog/{slug}` redirect.
- Search.
- Contact/inquiry/booking/climber flow using non-production smoke fixtures or approved synthetic records.
- Admin login, dashboard, media, content edit/preview.
- Queue job, scheduler heartbeat, email log.
- Sitemap, robots, canonical, JSON-LD.
- Redirect and 404 recording.
- Both analytics configurations load without duplicate pageview.

## Deployment acceptance criteria

- A release deploys from the admin request without interactive SSH.
- HTTP cannot execute deployment commands.
- Checksum, preflight, backup, migration, activation, service restart, and health results are visible and audited.
- A failed health check automatically returns to the previous serving release/origin.
- Backup restore is proven on an isolated database.
- Queue, scheduler, SSR, PHP-FPM, nginx, Redis, PostgreSQL, R2, SMTP, TLS, disk, memory, errors, and 5xx are monitored.
- Mail DNS remains intact.
- Cutover and cutover rollback are rehearsed before production.

