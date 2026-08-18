# Custom Inertia Admin and Full CRUD

## Goal

Rebuild the existing admin as a coherent custom Inertia dashboard. Every manageable entity gets complete, authorized lifecycle operations. “Full CRUD” includes validation, relationships, search, filters, sorting, pagination, archive/delete rules, preview, audit history, and useful failure feedback—not merely create and edit forms.

## Admin shell

Port these current components before module work:

- `src/components/admin/AdminSidebar.tsx` -> `resources/js/Components/Admin/AdminSidebar.tsx`.
- `AdminTopBar.tsx`, breadcrumbs, command palette, notification bell, PWA behavior, toasts, dialogs, empty states, skeletons, data table, toolbar, pagination, status badges, fields, and confirmation UI.
- Outfit/Sora fonts, slate admin palette, spacing, responsive navigation, and current mobile behavior.

Use Inertia shared props for authenticated user, role/permissions, unread notification count, flash messages, navigation, CSRF/session state, and environment label.

## Roles and permissions

| Capability family | SUPER_ADMIN | ADMIN | EDITOR | VIEWER |
|---|---:|---:|---:|---:|
| View dashboard/content/operations | Yes | Yes | Yes | Yes |
| Edit content drafts | Yes | Yes | Yes | No |
| Publish/archive content | Yes | Yes | Yes | No |
| Manage bookings/inquiries | Yes | Yes | Configurable | No |
| Manage partners/commissions/payouts | Yes | Yes | View where currently allowed | No |
| Manage redirects/404/SEO | Yes | Yes | Yes | View |
| Manage users/roles | Yes | No | No | No |
| Manage security/deployment | Yes | No | No | No |
| Manage theme/global settings | Yes | Yes | No unless granted | View |
| Permanently delete recoverable content | Explicit exceptional permission | No | No | No |

Policies enforce these capabilities server-side. `PermissionGate` remains a presentation convenience, not a security boundary.

## Common CRUD contract

Every CRUD module must implement:

- Search over allowlisted fields.
- Filter values validated by a Form Request.
- Sort column allowlist and stable secondary sort.
- Server pagination with selectable allowed sizes.
- Empty, loading, error, and permission-denied states.
- Create/edit form with field-level validation messages.
- Unsaved-change warning.
- Success/error flash notification.
- Preview/open-public-page action when applicable.
- Status and publish controls.
- Duplicate-slug validation and normalized slug preview.
- Archive/restore in preference to permanent deletion for published content.
- Dependency impact warning before archive/delete.
- Audit history link.
- Transactional multi-relation writes.
- Optimistic concurrency using `updated_at` or a lock version on high-risk records.

## Content CRUD

### Trekking routes

Fields and relationships: slug/title/meta, duration text/days, capacity, start/end, age/physical rating, success rate, overview, highlights, itinerary days, elevation profile, pricing tiers, summit height, guide fields, CTA facts, route map, inclusions/exclusions, FAQs, featured image, gallery/alts, mountain enum, category, active status, departures.

Rules:

- A route with bookings/departures cannot be hard-deleted.
- Itinerary day order and elevation points are validated.
- Price fields are decimal strings and currencies are explicit.
- Archive removes it from listings/sitemap but preserves existing booking links and admin history.
- Preview uses draft form state where practical or a saved draft version.

### Safaris

Fields: slug/title/meta, duration, type, overview, highlights, itinerary, inclusions/exclusions, featured image/gallery/alts, starting price, pricing tiers, active status, game drives, parks count, rating, ordered destinations.

Rules:

- Destination pivot order is stored and updated transactionally.
- Rating and review aggregate usage are distinguished; editors cannot publish unsupported review claims.
- Filters/listing facets derive from typed fields.
- Existing detail-page schema and related-content behavior remain.

### Destinations

Fields: slug/name/meta, circuit, description, highlights, wildlife, best time, featured image/gallery/alts, active status, related safaris, supplemental builder content.

Rules:

- Related safaris are shown before archive.
- Empty/thin destinations are excluded from sitemap according to the approved SEO rule.

### Day trips

Fields: slug/title/meta, destination, description, highlights, inclusions/exclusions, images/alts, starting price, active status, supplemental builder content.

### Blog posts, categories, and tags

Blog fields: root slug, title/meta, excerpt, body/builder document, featured image, author, publish status/time, categories, tags, revisions.

Rules:

- Slugs are rejected if they collide with reserved routes.
- Preview displays the final root URL, not `/blog/{slug}/`.
- Saving relationships is transactional.
- Content sanitization, internal-link processing, table of contents, reading time, FAQ extraction/mapping, author profile, and related-post behavior are preserved or deliberately replaced with equivalent typed widgets.
- Changing a published slug requires a created 301 redirect from the old root URL.
- Categories/tags with published posts cannot be deleted without reassignment.

### Managed pages and Timeless Builder

- Index, create, rename, preview, visually edit, publish, archive, restore, duplicate, and inspect versions.
- `route_path` must not collide with explicit Laravel routes, root blog slugs, admin, API, assets, sitemap, or robots.
- Homepage is a protected reserved page and cannot be archived or renamed.
- Legal/system pages require elevated confirmation before unpublishing.

### Guides, logos, reviews, heroes, theme

- Guides: full profile fields, specialties, certifications, languages, routes, founder/mountain-guide flags, active state, order.
- Logos: name, media, link, placements, order, active state; safe URL validation.
- Reviews: source, author, image, rating 1–5, title/content/trip type, verified/featured, publish date; claims must match source evidence.
- Hero data becomes hero-widget config or typed owner settings; focal points and responsive preview remain.
- Theme editing uses CSS-variable inputs, validates colors/fonts/radius, provides staged preview, versions global theme settings, and supports rollback.

## Media CRUD

- Paginated/searchable grid and table views.
- Folder, MIME, upload date, uploader, usage, dimensions, and missing-alt filters.
- Multipart/direct upload through `MediaService`; browser never receives permanent R2 credentials.
- Edit alt, title, caption, credit, and folder.
- Replace while preserving the database media ID and updating references intentionally.
- Generate approved variants and record their metadata.
- Usage scan includes typed media relations, legacy URL fields, builder JSON, SEO images, logos, theme settings, and email assets.
- Delete is blocked while usage count is nonzero; forced deletion is not part of normal UI.
- R2 browse/import is restricted to admins and cannot delete arbitrary bucket objects.

## Operations CRUD

### Departures

- List/search/filter by route, year/month, status, featured/guaranteed/full-moon, and availability.
- Create/edit/archive; bulk creation with preview and duplicate detection.
- Rotation settings and manual feature controls.
- Validate chronological arrival/start/summit/end dates and capacity.
- Prevent destructive capacity/status changes that conflict with confirmed bookings.
- Record internal notes separately from public notes.

### Bookings and climbers

- List/search/filter and detailed timeline.
- Status transition service with an explicit allowed-transition map.
- Payment fields updated only through authorized actions; every change audited.
- View/create/resend/revoke climber tokens with expiry.
- Related inquiry, departure, emails, visitor attribution, source, UTM, and GA client ID preserved.
- Invoice view and email actions retained.
- Booking deletion is replaced with cancellation/void semantics; financial/history records remain.

### Inquiries

- Search/filter by type, status, dates, source, destination, country, device, and assignee if added.
- View/edit contact and trip requirements.
- Status transitions and notes.
- Send logged email.
- Convert to booking transactionally and link the records to prevent duplicate conversion.
- Preserve attribution, landing page, IP/location, referrer, UTM, GA client ID, and referral source.

### Invite links and newsletter

- Invite create/revoke, departure association, expiry, active status, clicks/bookings, creator/invitees.
- Newsletter search/export and activate/unsubscribe timestamps; never hard-delete unsubscribe evidence.

### Partners, commissions, and payouts

- Partner profile, type, contact, agreement dates/document, payout frequency/method/details, rates by trip type, active state, notes.
- Payout details are encrypted/redacted and permission-restricted.
- Commission creation/calculation is centralized and decimal-safe.
- Status transitions are allowlisted and audited.
- Payout generation uses a transaction and prevents double inclusion.
- Exports use authorization and streamed responses.

## Communications and notifications

- Email logs retain recipient, subject, type, channel, status, message ID, safe error, metadata, and sent time.
- Resend creates a new log linked to the original; it does not overwrite history.
- Notifications support unread/read, bulk mark read, expiry, priority, and safe deletion rules.
- Push subscriptions can be added/revoked and are associated with the authenticated user.
- SMTP failures retry through the queue with backoff and surface in failed-job/admin health views.

## SEO, redirects, and 404 modules

- Redirect create/edit validates normalized source, relative/approved target, loop, chain, collision, and source existence.
- Changing a redirect invalidates the cached map.
- 404 monitor retains hit totals, bot/human split, recent hits, referrer, user agent, and statuses.
- “Create redirect” uses the 404 path as source and links records transactionally.
- SEO modules preserve overview, GSC/GA sync status, search queries, page metrics, keyword tracker, page analyzer, recommendations, content health, and settings.

## User and security CRUD

- Create, edit name/email/role/status, initiate password reset, revoke sessions, and view last login.
- A user cannot deactivate/demote the last active super admin.
- Users cannot edit their own role upward or bypass policy through crafted requests.
- Passwords use Laravel’s configured strong hash; existing hashes are upgraded on successful login where safe.
- PIN login remains only if its risk/behavior is explicitly retained; the preferred target is password plus TOTP for privileged users.

## Delete semantics

| Data class | Normal removal |
|---|---|
| Published content | Archive/unpublish; retain revisions and redirects |
| Media | Delete only when unreferenced; audit object deletion |
| Users | Deactivate; retain audit and authored records |
| Bookings/payments/commissions/payouts | Status transition/void; never hard-delete in UI |
| Inquiries/newsletter | Retain according to privacy policy; use approved anonymization workflow |
| Draft content with no dependencies | Soft delete or audited hard delete by exceptional permission |
| Redirects | Deactivate; retain hit history |

## Admin acceptance criteria

- Every current admin route has an equivalent or an explicit consolidation redirect.
- Every model intended for management has complete lifecycle operations and tests.
- Every write is validated, authorized, audited when material, and transactionally safe.
- Search/filter/sort/pagination state is URL-addressable.
- Admin remains usable at supported mobile and desktop widths.
- A viewer cannot mutate via UI or direct HTTP.
- No ordinary admin operation requires shell access, Prisma Studio, or a code change.

