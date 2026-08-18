# Database and Content Migration

## Safety policy

The existing PostgreSQL database contains production content, bookings, inquiries, users, departures, and operational history. The migration is additive. It must not begin by exporting records into a new empty database, renaming existing tables, truncating data, or running seeds that delete and recreate records.

All discovery and rehearsals run against a restored production clone. Production credentials must never be written to this repository or to migration reports.

## Schema ownership transition

1. Prisma remains the descriptive source of truth while the target models are first mapped.
2. Generate an actual database inventory from `information_schema`, `pg_catalog`, and Laravel Doctrine-independent inspection commands. Do not assume the Prisma file includes every production index or constraint.
3. Create explicit Eloquent models for the current tables. Set `$table`, `$primaryKey`, `$incrementing`, `$keyType`, `CREATED_AT`, `UPDATED_AT`, casts, guarded/fillable rules, and relationships.
4. Prove read parity and controlled write parity on a clone.
5. Freeze Prisma schema changes during the final migration window.
6. Declare Laravel migrations the source of truth after cutover.
7. Retain the final Prisma schema and database inventory under `docs/legacy/` in the Laravel repository for historical reference.

## Existing-table mapping rules

- Inspect exact PostgreSQL identifiers. Prisma-origin table and column names may be quoted and case-sensitive.
- IDs remain strings where the existing model uses `cuid()`; do not cast them to integers or UUIDs.
- PostgreSQL arrays map through a tested custom cast such as `App\Casts\PgTextArray` where Laravel does not natively preserve the representation.
- `json`/`jsonb` fields map to arrays or dedicated value objects.
- `Decimal` values map to `decimal:2` strings and money value objects. They never become floats.
- Enums map to PHP backed enums only after every stored value is inventoried.
- Date-only and timestamp semantics are documented per field; timezone conversion is tested with `Africa/Dar_es_Salaam` and UTC.
- Relation deletes preserve current behavior. New destructive cascades are not introduced during compatibility work.
- Current `isActive`, `isPublished`, and `status` meanings remain unchanged until the relevant module is migrated and tested.

## New Laravel-owned tables

New tables use snake_case names, UUID primary keys, explicit foreign keys, `jsonb`, and timestamps. Migrations are created in the target repository under `database/migrations/`.

### `content_pages`

| Column | Type/rule |
|---|---|
| `id` | UUID primary key |
| `slug` | varchar, unique |
| `route_path` | varchar, unique; normalized leading and trailing slash |
| `title` | varchar |
| `description` | text nullable |
| `page_type` | enum string: `landing`, `company`, `legal`, `campaign`, `system` |
| `template` | varchar default `default` |
| `status` | enum string: `draft`, `published`, `archived` |
| `published_at` | timestamptz nullable |
| `created_by` / `updated_by` | existing admin-user string ID, nullable FK where compatible |
| timestamps | timestamptz |

### `builder_documents`

| Column | Type/rule |
|---|---|
| `id` | UUID primary key |
| `owner_type`, `owner_id` | indexed morph pair; page, route, safari, destination, day trip, blog |
| `name` | varchar |
| `schema_version` | positive integer |
| `draft_elements` | jsonb array, default `[]` |
| `draft_settings` | jsonb object, default `{}` |
| `lock_version` | positive integer for optimistic concurrency |
| `published_version_id` | nullable UUID pointing to an immutable version |
| `updated_by` | existing admin-user string ID nullable |
| timestamps | timestamptz |

Unique index: `owner_type`, `owner_id`, `name`.

### `builder_document_versions`

| Column | Type/rule |
|---|---|
| `id` | UUID primary key |
| `builder_document_id` | UUID FK with cascade |
| `version` | positive integer |
| `elements` | jsonb array |
| `settings` | jsonb object |
| `seo_snapshot` | jsonb object |
| `content_hash` | SHA-256 hex string |
| `change_summary` | varchar |
| `created_by` | admin-user string ID nullable |
| `published_at` | timestamptz nullable |
| timestamps | timestamptz |

Unique index: `builder_document_id`, `version`. Public pages render only the row referenced by `published_version_id`.

### `builder_templates`

Fields: UUID, unique slug, name, category, description, thumbnail media ID, `elements` jsonb, `settings` jsonb, schema version, active flag, creator/updater, timestamps.

### `reusable_sections`

Fields: UUID, unique slug, name, status, `elements` jsonb, schema version, version, creator/updater, timestamps. Builder elements reference a reusable section by ID and stored expected version. Publishing a changed global section requires an impact preview listing affected pages.

### `seo_metadata`

Polymorphic owner, title, description, focus keyword, canonical URL, robots index/follow, Open Graph title/description/image, Twitter title/description/image, schema type, custom schema jsonb, sitemap inclusion/priority/frequency, breadcrumb override jsonb, and timestamps. An owner has at most one SEO row.

Custom schema is merged through an allowlisted schema service. Raw `<script>` or arbitrary HTML is not accepted.

### Navigation and audit tables

- `navigation_menus`: UUID, unique key, name, location, active flag, timestamps.
- `navigation_items`: UUID, menu FK, parent nullable self-FK, label, URL, target, rel, optional media icon, sort order, active flag, visibility settings jsonb, timestamps.
- `audit_logs`: UUID, actor ID, action, subject morph, before/after jsonb with secret-field redaction, request ID, IP, user agent, timestamp.
- Deployment tables are defined in document 09.

## Legacy content consolidation

The current `Page`, `CmsPage`, `HomepageContent`, and `PageHero` records overlap. They are not deleted during migration.

| Current source | Target |
|---|---|
| `Page` | Create/update `content_pages` plus one builder document; preserve original ID in migration metadata |
| `CmsPage.puckData` | Transform Puck components to Timeless elements; retain raw source snapshot in the first version |
| `HomepageContent` | Merge into typed homepage widgets or referenced data queries |
| `PageHero` | Convert into page/document hero widget config; preserve focal point, overlay, alignment, CTA, height |
| Static TSX pages | Convert to `content_pages` and builder documents through the assisted pipeline below |
| Typed catalog models | Retain as typed models; attach supplemental builder documents where needed |

Legacy records remain read-only for one release after cutover. A separate, later cleanup plan may archive or remove them after backups and owner approval.

## Assisted TSX-to-Timeless conversion

Arbitrary React JSX cannot be safely converted to a visual-builder document with a blind script. The conversion pipeline is therefore automated where deterministic and blocks publication when manual mapping is required.

Target commands:

```bash
php artisan migration:inventory-source --source=L:/snowafrica
php artisan migration:extract-pages --source=L:/snowafrica --output=storage/app/migration/extracted
php artisan migration:import-content --input=storage/app/migration/extracted --dry-run
php artisan migration:import-content --input=storage/app/migration/extracted
php artisan migration:reconcile
```

`migration:extract-pages` delegates TSX parsing to `scripts/migration/extract-pages.mjs`, which uses a TypeScript AST rather than regular expressions. It produces, for every page:

- Route and source file.
- Metadata inputs.
- Ordered component tree.
- Text content and heading hierarchy.
- Links and CTA labels/targets.
- Image URLs, dimensions, alt text, and priority.
- JSON-LD generator calls and their inputs.
- Imported SnowAfrica components.
- Interactive components that cannot become pure builder blocks.
- A conversion status of `automatic`, `mapped`, or `manual-review-required`.

The importer maps known components through `scripts/migration/component-map.ts`. Unknown components fail that page’s import; they are never silently converted to raw HTML. The solution for an unknown component is to add a proper Timeless widget or a typed embedded component, then re-run extraction.

## Builder element import contract

Every extracted page document contains:

```json
{
  "schemaVersion": 1,
  "route": "/kilimanjaro-weather/",
  "sourceFile": "src/app/(site)/kilimanjaro-weather/page.tsx",
  "elements": [],
  "seo": {},
  "schemas": [],
  "contentHash": "sha256-hex",
  "review": {
    "status": "manual-review-required",
    "reasons": []
  }
}
```

Imported drafts cannot be published until the source and target screenshot/DOM/SEO comparison is attached to the page’s migration record.

## Media migration

R2 objects are retained in place. Migration concerns database metadata and references, not copying every object.

1. Export current `Media` records and scan source code/database content for referenced URLs.
2. Normalize references without changing public object URLs.
3. Import missing metadata into the Laravel media model through idempotent upserts.
4. Record orphan objects, missing objects, duplicate hashes, missing alt text, and invalid MIME types.
5. Do not delete or move an object during migration.
6. New uploads use a single `MediaService` that validates MIME/size, reads actual image dimensions, optimizes to an approved derivative while retaining the original when required, writes immutable cache metadata, and stores alt/caption/credit/folder.
7. Safe deletion is blocked while a media ID or URL is referenced by content, SEO, settings, galleries, or builder documents.

## Reconciliation

`php artisan migration:reconcile` compares source and target counts and content hashes. Its report covers:

- Every current model/table record count.
- Primary-key sets for critical tables.
- Null/non-null distribution for required content fields.
- Sums of booking, commission, payout, and price fields using decimals.
- Relationship counts for route departures, safari destinations, blog categories/tags, and booking climbers.
- Status distributions.
- Media-reference existence.
- Page and SEO content hashes.
- Redirect source/destination sets.

The command exits non-zero if any critical record is missing, a monetary aggregate differs, a relationship count decreases without an approved exception, or a published page lacks a published builder version.

## Rollback and coexistence rules

- New tables are safe for the Next.js application because it does not use them.
- Changes to existing fields during the coexistence stage must be compatible with both Prisma and Eloquent.
- No target migration may drop or rename a Prisma-used column before Next.js retirement.
- Cutover rollback switches traffic back to Next.js and restores the pre-deploy database backup only if the failed release performed incompatible writes. Normal code-only rollback must not erase valid bookings created after cutover.
- Every data rollback procedure distinguishes schema rollback from business-data rollback.

## Database/content acceptance criteria

- Every current table is mapped and its production-clone count recorded.
- Eloquent returns identical critical field values for sampled records.
- All 54 non-Prisma public pages have a managed target representation or a documented typed-page exception approved in the route matrix.
- No published route renders from compiled editorial copy that administrators cannot edit.
- Public rendering uses immutable published versions; draft edits never leak.
- Reconciliation exits zero twice: after initial import and immediately before cutover.
- No R2 object is deleted or renamed.
- Backup restoration is proven on an isolated database.

