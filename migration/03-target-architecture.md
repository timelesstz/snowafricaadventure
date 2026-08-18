# Target Architecture

Target repository: `L:\snowafrica-laravel`

## Architecture summary

Laravel owns HTTP routing, authentication, authorization, validation, persistence, queues, mail, storage, scheduling, caching, audit logging, and deployment requests. Inertia React owns both public and admin presentation. Inertia SSR renders crawlable public HTML and head metadata. Timeless Builder supplies managed page composition while specialized domain editors own strongly typed tour, trekking, destination, departure, and booking data.

The existing Next.js app remains the reference renderer until cutover. Ported components should keep their JSX and Tailwind classes wherever possible. Data access moves behind controllers and services; presentation should not be rewritten for architectural neatness.

## Target stack

| Layer | Target |
|---|---|
| Runtime | PHP 8.3+, Laravel 13 or the latest project-approved stable version |
| Public UI | Inertia v2, React 19, TypeScript |
| Admin UI | Custom Inertia v2, React 19, TypeScript |
| SSR | Inertia SSR Node process under Supervisor |
| Bundler | Vite |
| CSS | Tailwind CSS 4 plus ported `globals.css` and theme variables |
| Database | Existing PostgreSQL database; local clones for development/testing |
| Search | PostgreSQL full-text/`ILIKE` with `pg_trgm` indexes where justified |
| Cache/session/queue | Redis in production |
| Media | Existing Cloudflare R2 bucket through Flysystem S3 |
| Mail | Laravel Mail through configured cPanel SMTP; queued |
| Web server | nginx + PHP-FPM on Ubuntu VPS |
| Deployment | Admin-requested, trusted CLI-executed atomic releases |
| Monitoring | health endpoints, logs, queue/scheduler/SSR probes, uptime checks |

## Application boundaries

```text
Browser / crawler
  -> nginx
  -> Laravel routes and middleware
     -> Public controllers -> query/services -> Inertia SSR -> React public pages
     -> Admin controllers  -> policies/actions -> Inertia -> React admin pages
     -> API/webhook routes -> Form Requests/services/jobs -> JSON/redirect responses

Laravel
  -> PostgreSQL: content, bookings, users, SEO, redirects, audit, deployments
  -> Redis: cache, sessions, queues, locks
  -> R2: media objects using existing keys
  -> SMTP: queued transactional mail
  -> Supervisor: queue worker + Inertia SSR
  -> Scheduler: reminders, SEO sync, snapshots, reviews, deployment worker
```

## Target directory map

```text
L:\snowafrica-laravel\
  app\
    Actions\
      Admin\
      Auth\
      Booking\
      Content\
      Deployment\
      Seo\
    Console\Commands\
      Deployment\
      Migration\
    Enums\
    Http\Controllers\
      Admin\
      Api\
      PublicSite\
      Webhooks\
    Http\Middleware\
    Http\Requests\
      Admin\
      PublicSite\
    Jobs\
    Mail\
    Models\
      Concerns\
    Policies\
    Services\
      Analytics\
      Builder\
      Deployment\
      Email\
      Media\
      Migration\
      Search\
      Seo\
    Support\
      Database\
      Inertia\
      Seo\
  bootstrap\
  config\
    deployment.php
    domains.php
    filesystems.php
    inertia.php
    seo.php
    snowafrica.php
  database\
    migrations\
    seeders\
  deploy\
    nginx\
    supervisor\
    systemd\
    runbooks\
  resources\
    css\app.css
    js\
      app.tsx
      ssr.tsx
      Builder\
        Editor\
        Renderer\
        Registry\
        Widgets\
        Templates\
        Types\
        compat\
      Components\
        Admin\
        Analytics\
        Blog\
        Cards\
        Departures\
        Forms\
        Layout\
        Seo\
        Tours\
        Ui\
      Layouts\
        AdminLayout.tsx
        PublicLayout.tsx
      Pages\
        Admin\
        PublicSite\
      compat\
      hooks\
      lib\
      types\
    views\app.blade.php
  routes\
    admin.php
    api.php
    auth.php
    console.php
    deployment.php
    web.php
  tests\
    Feature\
    Unit\
    Browser\
  scripts\
    parity\
    migration\
```

## Controller and service rules

- Public controllers assemble typed page props; they do not format large HTML strings.
- Admin controllers authorize every action and delegate business changes to actions/services.
- Form Requests own input validation and normalization.
- Policies own record-level access rules.
- Transactions wrap multi-table writes such as blog relationships, tour destinations, booking status changes, and publishing/version creation.
- Services own reusable operations such as media upload, SEO assembly, block hydration, email dispatch, analytics synchronization, and deployment.
- Eloquent scopes define visibility (`published`, `active`, `upcoming`) consistently.
- React pages receive serialization-ready view models rather than raw models with accidental fields.
- Money remains decimal strings at the JSON boundary. Do not convert monetary values to binary floats.

## Public rendering

`routes/web.php` must register explicit reserved/static routes before the root-level blog-post fallback. Public controllers return Inertia pages with a `seo` prop. `resources/views/app.blade.php` renders title, description, canonical, robots, Open Graph, Twitter, alternate links, and sanitized JSON-LD during SSR.

Data-driven widgets are hydrated by `app/Services/Builder/BlockHydrator.php`. The public renderer receives both the stored block document and server-resolved data. It must never make privileged admin API calls from the browser.

## Admin architecture

Admin lives under `/admin/` and uses the same route shape as today. Authentication pages render without the authenticated shell. Authenticated pages use `resources/js/Layouts/AdminLayout.tsx`, which ports the existing sidebar, top bar, command palette, PWA behavior, notifications, toasts, and role-based visibility.

All list modules use a common query contract:

- `q`: text search.
- `sort`: allowlisted column.
- `direction`: `asc` or `desc`.
- `page`: positive integer.
- `per_page`: allowlisted page size.
- Module-specific filter keys.

Laravel returns paginator data in a consistent shape. The UI preserves filters in the URL so refresh, back, and shared links behave predictably.

## Authentication and authorization

- Use Laravel session authentication with CSRF protection.
- Keep existing password hashes compatible; prove verification against a production-clone sample before cutover.
- Preserve role hierarchy: `SUPER_ADMIN > ADMIN > EDITOR > VIEWER`.
- Express permissions as named abilities and policies, not only hidden UI.
- Regenerate sessions at login and invalidate other sessions on password reset where supported.
- Rate-limit login, password reset, public forms, booking actions, and deployment requests.
- Audit login failures, role changes, destructive content actions, redirect changes, publishing, deployment requests, and rollback.
- Require password re-confirmation, TOTP, and a typed confirmation phrase for deploy/rollback after TOTP is enabled.

## Database coexistence

During development, both applications may read a cloned database. They must not share-write production during ordinary development. A controlled compatibility stage may allow both stacks against a staging clone to prove read/write equivalence.

Laravel models must explicitly define existing table names, primary-key behavior, timestamps, casts, and relationships. New migrations are additive and idempotent. Destructive migrations are blocked by the deployment preflight unless separately approved.

## Content ownership model

| Content | Owner |
|---|---|
| Tours/safaris, trekking routes, destinations, day trips | Typed Eloquent models plus optional builder blocks |
| Blog posts | Typed post fields, taxonomy relations, and builder/rich-content blocks |
| Bespoke landing pages | `Page` + versioned Timeless Builder document |
| Homepage | Reserved `Page` slug `home` + builder document |
| Header/footer/navigation | Navigation/menu tables and site settings |
| Theme/logos | Theme settings, site settings, logo/media relations |
| SEO | Polymorphic SEO metadata plus computed defaults |
| Redirects | Redirect table; code contains only immutable emergency/system rules |
| Forms/bookings/operations | Typed domain records; never generic builder JSON |

## Performance budgets

- Public editor code must not appear in public bundles.
- SSR must produce meaningful HTML without waiting for client hydration.
- Above-the-fold images have explicit dimensions and controlled priority.
- Routes must not introduce N+1 queries; listing/detail query counts are asserted in tests where practical.
- Cached builder output is invalidated by page publish and by changes to referenced data-driven records.
- Public JavaScript growth for equivalent pages must remain within 10% of the current measured production baseline unless an approved feature explains it.
- Core Web Vitals must be equal to or better than the pre-cutover baseline at the 75th percentile.

## Architecture acceptance criteria

- Public and admin routes render through Inertia; no product UI is rebuilt in Filament.
- Public source HTML contains body content, canonical, metadata, and JSON-LD with JavaScript disabled.
- Existing PostgreSQL records are readable and writable without lossy conversion.
- Existing R2 object URLs continue to resolve.
- A normal content edit requires no code deployment.
- Builder editor code is absent from public entry chunks.
- Queue, scheduler, SSR, health, deployment worker, backup, and rollback are documented and testable.
- The Next.js application can remain live until the final DNS/reverse-proxy cutover.

