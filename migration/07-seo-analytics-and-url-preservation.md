# SEO, Analytics, and URL Preservation

## Non-negotiable outcome

Search engines and visitors must see the same canonical pages, equivalent or stronger rendered content, the same meaningful structured data, stable media, working internal links, and intentional redirects. A successful application build is not evidence of SEO parity.

## Baseline capture

Before implementation and again immediately before cutover, crawl the current production site and save:

- Requested URL, final URL, status, redirect hops, and response time.
- Canonical, robots, title, meta description, H1/H2/H3 hierarchy.
- Open Graph and Twitter tags.
- JSON-LD blocks normalized by type.
- Word count and normalized main-content hash.
- Internal and external links.
- Images, alt text, dimensions, lazy/priority state.
- Sitemap membership, priority, change frequency, and last modification.
- Indexable/non-indexable classification.
- Screenshot and DOM snapshot at representative widths.

Target paths:

```text
storage/app/parity/source-crawl.json
storage/app/parity/target-crawl.json
storage/app/parity/seo-diff.json
storage/app/parity/redirect-diff.json
```

The crawler reads the current sitemap, discovered internal links, database-published slugs, and all configured redirect sources. It does not rely on the sitemap alone.

## Central SEO service

`app/Services/Seo/SeoBuilder.php` creates a typed `SeoViewModel` containing:

- Title and description.
- Canonical URL.
- Robots directives.
- Open Graph type/title/description/URL/site name/image.
- Twitter card/title/description/image.
- Published/modified author metadata for articles.
- Alternate links if localization is introduced.
- One or more validated JSON-LD objects.
- Sitemap inclusion, priority, frequency, and last-modified source.

Order of precedence:

1. Explicit admin SEO metadata.
2. Typed domain defaults from the record.
3. Page/builder defaults.
4. Site-wide fallback.

The current title budget and brand suffix behavior are reproduced and covered by tests. A migration report flags any title/description change rather than silently “optimizing” it.

## SSR head rendering

`resources/views/app.blade.php` renders the initial head from the Inertia `seo` page prop. Inertia SSR must also render meaningful body content. The following must be visible in raw HTML fetched without executing JavaScript:

- `<title>`.
- Meta description and robots.
- Canonical.
- Open Graph and Twitter tags.
- JSON-LD scripts.
- H1 and primary content.
- Navigation links.

Preview and admin pages emit `noindex, nofollow` and no canonical pointing to a draft URL.

## Structured data parity

Implement tested PHP schema builders corresponding to the current TypeScript functions:

- `TourOperatorSchema`.
- `WebSiteSchema` with `SearchAction`.
- `LocalBusinessSchema`.
- `TouristTripSchema`.
- `ProductSchema`.
- `FaqPageSchema`.
- `ArticleSchema`.
- `BreadcrumbListSchema`.
- `EventSchema`.
- `AggregateRatingSchema`.
- `ReviewSchema`.
- `HowToSchema`.
- `VideoObjectSchema`.
- `TouristDestinationSchema`.
- `ItemListSchema`.

Schema is derived from actual page/domain data. Review/rating schema appears only where the displayed rating and source support it. JSON-LD is encoded with safe JSON flags and is never assembled by string concatenation.

## URL and trailing-slash policy

- Keep current public paths exactly.
- nginx and Laravel cooperate to produce one canonical trailing-slash form for public content.
- Query strings are preserved through redirects unless explicitly removed for security.
- Route model binding uses slugs without case-folding surprises.
- The root blog route is registered after every explicit reserved route.
- A single central `ReservedSlug` service feeds route validation, sitemap rules, and blog/page CRUD.
- `/blog/{slug}/` remains a one-hop 301 to `/{slug}/`.
- `/terms-conditions/` remains a one-hop 301 to `/terms-and-conditions/`; sitemap emits only the latter.

## Redirect migration

Import all 174 `next.config.ts` redirect entries plus current database redirects into a normalized manifest. Do not treat temporary spam/bot rules as permanent SEO redirects without retaining their current status.

For every redirect:

- Normalize source and destination.
- Preserve 301 vs 302 semantics.
- Preserve wildcard/parameter behavior using explicit tested patterns.
- Prevent loops and multi-hop chains.
- Confirm the final destination is not a 404/5xx.
- Preserve query strings where current behavior does.
- Record conflicts between code and database rules.

Immutable infrastructure/security redirects may stay in route/middleware code. Content redirects belong in the database and admin manager.

## Sitemap

`SitemapController` produces XML from:

- Explicit static/reserved routes.
- Published trekking routes, safaris, destinations, day trips, blog posts, categories, tags, and content pages.
- SEO metadata inclusion and priority overrides.
- Actual record/page modification timestamps.

Rules:

- Never use the current time as `lastmod` merely because the sitemap was requested.
- Exclude admin, API, auth, search results, previews, thank-you/token flows, archived/draft content, and thin destinations under the approved content rule.
- Prevent root-blog slugs from colliding with reserved routes.
- Cache XML and invalidate it on publish/archive/slug/SEO changes.
- Optionally split into sitemap indexes only when URL count/size justifies it.

## Robots

Port the current intent:

- Allow mainstream search bots and social preview bots.
- Allow AI search/citation bots currently permitted.
- Block listed training-only bots.
- Block listed high-bandwidth SEO crawlers if the owner retains that policy.
- Disallow admin, API, internal build assets, previews, and token flows.
- Publish the canonical sitemap and host.

Because bot identifiers and best practices can change, review the policy at implementation time using official crawler documentation; any policy change is recorded in the decision log.

## Internal links and content processing

- Port `src/lib/internal-link-map.ts` to `app/Services/Seo/InternalLinkIndex.php` plus a deterministic HTML/content transformer.
- Preserve automatic internal-link injection limits and avoid self-links, nested anchors, headings, code, and unsafe HTML mutations.
- Generate table of contents IDs deterministically and preserve inbound fragment links where they exist.
- Extract and validate builder links at publish time.
- Run a complete internal-link crawl; zero unintended internal 404s is a release gate.

## Search

Use PostgreSQL instead of introducing a separate search service at migration time:

- Search published blog posts, pages, safaris, trekking routes, destinations, and day trips.
- Build a normalized searchable-text projection for builder documents at publish time.
- Use `pg_trgm` GIN indexes for tolerant title/slug queries and PostgreSQL text search for content where measured queries justify it.
- Enforce published/active visibility and sanitize excerpts.
- Preserve search analytics event naming.

## Analytics parity

Retain both configured GA4 properties and the current event taxonomy:

- `generate_lead` for inquiry/booking/tailor-made/Zanzibar flows.
- `form_start`, `form_step`, `form_abandonment`.
- `view_item`, `add_to_cart`, `begin_checkout`, `purchase`, `select_departure`.
- `contact_click`, `social_click`, `search`, `cta_click`, `scroll_depth`.
- Web Vitals: LCP, CLS, TTFB, INP, FCP and current compatible metrics.

Create `resources/js/lib/analytics.ts` as the single event facade. Port current parameter names and dual-property dispatch. Consent behavior, script loading order, referral/UTM/GA client ID persistence, and thank-you deduplication are verified with browser tests.

The admin SEO/analytics history tables remain mapped; sync jobs use Laravel queues and scheduler with locks to avoid overlapping runs.

## 404 monitoring

Laravel’s final 404 handler records normalized paths server-side, classifies bot/user agent, increments the aggregate row, and samples hit details without delaying the response. Sensitive query values are redacted. Static asset noise and known scanner paths are classified separately from content 404s.

## SEO release gates

Cutover is blocked if any of these occurs without an approved exception:

- A source 2xx URL becomes 4xx/5xx.
- Canonical path/domain changes.
- An indexable source page becomes noindex or leaves the sitemap.
- Title or meta description is missing or materially changed.
- H1 count changes from the accepted baseline.
- Main-content hash/word count indicates missing sections.
- Existing JSON-LD types disappear or required fields become invalid.
- An internal link becomes broken.
- A redirect becomes a chain/loop or changes status incorrectly.
- Root blog posts are shadowed by another route.
- Analytics lead/purchase events fail or fire twice.
- Search Console/GA integrations cannot authenticate in staging verification.

## Post-cutover SEO watch

For at least 30 days:

- Daily compare 404s, 5xx, sitemap fetch, indexed-page warnings, canonical anomalies, crawl stats, and top landing-page traffic.
- Compare clicks, impressions, CTR, position, organic sessions, conversions, and page groups against pre-cutover baselines while accounting for normal variance.
- Keep the Next.js rollback target and redirect manifest available through the highest-risk initial window.
- Do not perform broad title, URL, information-architecture, or copy changes during the migration stabilization period.

