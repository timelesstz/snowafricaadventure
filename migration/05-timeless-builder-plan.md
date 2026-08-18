# Timeless Builder Plan

## Objective

Timeless Builder turns SnowAfrica’s compiled editorial pages into manageable, versioned page documents while preserving the exact current design. It is not a generic website-theme generator and must not encourage editors to redesign the product accidentally.

The Gosheni implementation at `L:\goshenisafari-laravel\resources\js\Builder` is the structural reference. SnowAfrica’s components, CSS, content types, and responsive behavior are the rendering source of truth.

## Module boundaries

```text
resources/js/Builder/
  Types/          document and widget contracts only
  Registry/       widget definitions, schemas, categories, defaults
  Renderer/       public/admin-preview rendering; no editor imports
  Widgets/        SnowAfrica presentation widgets
  Editor/         canvas, panels, inspector, toolbar, history, media picker
  Templates/      curated SnowAfrica page/section templates
  Hooks/          editor state, autosave, shortcuts, viewport, selection
  compat/         temporary component/router compatibility adapters
```

The public entry imports only `Types`, `Registry` metadata required for rendering, `Renderer`, and the selected widget chunks. The admin editor is dynamically imported from `Builder/Editor` and receives its own Vite chunk.

## Document model

```ts
export interface BuilderDocument {
  schemaVersion: 1;
  elements: BuilderElement[];
  settings: PageSettings;
}

export interface BuilderElement<TConfig = Record<string, unknown>> {
  id: string;
  type: string;
  version: number;
  config: TConfig;
  visibility?: {
    desktop?: boolean;
    tablet?: boolean;
    mobile?: boolean;
  };
}
```

Each widget definition provides:

- Stable type and schema version.
- Human label, category, icon, and preview thumbnail.
- Default config.
- Zod-compatible client validation and matching Laravel validation rules.
- Config migration functions for older widget versions.
- Editor inspector fields.
- Renderer component.
- Accessibility checks.
- Search/SEO text extraction.
- Optional server-data resolver key.

Unknown widget types render a visible admin error and a public-safe fallback that logs the issue. They do not crash the page or disappear without a report.

## Required widget registry

### Layout and typography

- Section/container.
- Grid and responsive columns.
- Spacer/divider.
- Rich text with controlled HTML.
- Heading/subheading/eyebrow.
- Quote/callout.
- Image and image-break.
- Gallery/lightbox.
- Video/embed with consent-aware loading.

### SnowAfrica heroes and navigation aids

- Page hero with image/gradient, focal point, overlay, title, subtitle, badge, CTAs, text alignment, height, and scroll indicator.
- Breadcrumbs.
- Sticky in-page navigation/table of contents.
- Mobile sticky CTA.

### Safari and trekking content

- Safari cards/carousel/filter results embed.
- Trekking route cards/comparison.
- Destination cards/carousel/map embed.
- Day-trip cards.
- Itinerary timeline/accordion.
- Elevation profile.
- Route map.
- Pricing tiers.
- Inclusions/exclusions.
- Group departure availability.
- Guide profile/quote.
- Difficulty, success-rate, duration, altitude, wildlife, and park statistics.

### Conversion and trust

- Inquiry/contact/tailor-made form embed using typed form components.
- Booking/departure CTA.
- WhatsApp CTA.
- Reviews/testimonials carousel.
- Aggregate rating/trust strip.
- Credentials/certifications/logos.
- Partner/logo strip.
- Newsletter form.
- FAQ accordion.
- Related articles/knowledge base.
- Author biography.

### Editorial/data visuals

- Feature/highlight list.
- Numbered steps/HowTo.
- Comparison table.
- Responsive data table.
- Climate/weather table.
- Packing/checklist.
- Timeline.
- Stats grid.
- Alert/safety notice.
- Download/resource card.
- Dynamic latest/related posts.

Widgets embed existing React components instead of cloning their markup. For example, the builder’s FAQ widget wraps the same accessible accordion used on typed pages.

## Data-driven widget hydration

Stored builder JSON contains query intent, never serialized privileged records. Example:

```json
{
  "id": "featured-safaris",
  "type": "safari_carousel",
  "version": 1,
  "config": {
    "mode": "featured",
    "limit": 6,
    "manualSlugs": []
  }
}
```

`app/Services/Builder/BlockHydrator.php` walks the published document, groups resolver requests, performs eager-loaded queries, and returns data keyed by element ID. It enforces published/active scopes and maximum limits. Editor preview may request draft records only for authorized users.

Cache keys include page version, locale if localization is added later, theme version, and a global referenced-content version. Changes to tours, routes, destinations, reviews, guides, logos, and navigation bump the relevant content-version stamp.

## Editor features

- Add elements from categorized registry.
- Drag/reorder with keyboard-accessible alternatives.
- Select, duplicate, copy/paste, and remove.
- Undo/redo within the session.
- Inspector fields generated from widget definitions.
- Desktop/tablet/mobile viewport preview.
- Media picker with usage-aware assets and alt text.
- Link picker for known internal routes plus validated external URLs.
- Autosave draft with debounce and explicit saved/saving/error status.
- Optimistic concurrency through `lock_version`; conflicting edits open a compare/reload workflow.
- Preview in a signed, expiring draft URL.
- Version history with author, time, summary, compare, and restore-to-draft.
- Publish action that creates an immutable version and atomically moves `published_version_id`.
- Unpublish/archive with impact warning.
- Template insertion and reusable sections.
- Page SEO panel and schema summary.
- Accessibility panel for missing alt text, heading-order violations, unlabeled links/buttons, empty headings, and contrast-token warnings.
- Migration parity panel linking source and target screenshots/reports during the migration phase.

## Editor API

All routes are under authenticated admin middleware and policy checks.

| Method/path | Purpose |
|---|---|
| `GET /admin/builder/{document}` | Render editor shell with draft/version/template props |
| `PUT /admin/builder/{document}/draft` | Validate and save draft with lock version |
| `POST /admin/builder/{document}/preview-token` | Issue signed, expiring preview URL |
| `POST /admin/builder/{document}/publish` | Validate, snapshot, hash, and publish atomically |
| `POST /admin/builder/{document}/restore/{version}` | Copy an old snapshot into a new draft |
| `GET /admin/builder/{document}/versions/{version}` | Fetch sanitized version for compare |
| `POST /admin/builder/templates/{template}/insert` | Return validated template elements with new IDs |
| `GET /admin/media/picker` | Paginated media data |
| `GET /preview/{document}/{token}` | Render draft with `noindex`, no cache, signed expiry |

Draft save never publishes. Publish validates all elements server-side, checks internal-link targets, checks referenced media, extracts searchable text, creates a version, updates `published_version_id`, invalidates caches, regenerates sitemap data if relevant, and records an audit log in one transaction.

## SEO integration

- Heading widgets expose semantic levels; the editor warns on zero/multiple H1s and skipped levels.
- FAQ, HowTo, breadcrumb, article, trip, product, event, video, destination, item-list, aggregate-rating, and review schemas are generated by server services from typed page/widget data.
- Editors see a schema summary; they do not hand-author JSON-LD for normal use.
- Custom JSON-LD is reserved for `SUPER_ADMIN`, validated as JSON, sanitized, size-limited, and audited.
- Rich text is sanitized on save and output. Script, style, event-handler, iframe, and unsafe URL payloads are rejected unless an allowlisted embed widget handles them.
- Internal-link extraction feeds the link graph and broken-link audit.

## Specialized domain editors

Tours, trekking routes, destinations, day trips, and blog posts keep typed forms for fields that drive filtering, relationships, prices, dates, availability, or schemas. Each can also own one supplemental builder document for flexible editorial sections.

This prevents a visual editor from turning essential domain facts into unqueryable JSON while eliminating hardcoded marketing sections.

## Builder test plan

- Unit tests for every widget default config, validation, renderer, schema migration, and text extraction.
- Contract tests proving client and Laravel validators accept/reject the same fixtures.
- Feature tests for draft save, conflict, preview, publish, restore, authorization, cache invalidation, and audit log.
- XSS fixtures for rich text, URLs, custom schema, embed fields, and imported legacy HTML.
- SSR tests for representative documents with every widget family.
- Bundle analysis asserting editor modules are absent from public chunks.
- Playwright tests for keyboard reorder, media selection, viewport preview, autosave recovery, conflict resolution, publish, and version restore.
- Screenshot comparisons for every migrated bespoke page at mobile, tablet, and desktop widths.

## Builder acceptance criteria

- Every compiled editorial page can be edited without code changes.
- Every source layout can be represented without arbitrary raw JSX or unsafe HTML blocks.
- Public rendering is pixel-equivalent and server-rendered.
- Drafts never leak into public output, sitemap, search, or structured data.
- Restore creates a new draft and never mutates historical versions.
- Concurrent edits cannot silently overwrite each other.
- Editor JavaScript is absent from public bundles.
- The imported page cannot publish until its parity checks pass.

