# Snow Africa Adventure — SEO Improvement Playbook

> **How to use this file:** Drop it into your project root and open it in Claude Code. Claude Code should treat every checklist item as a task, work through them in order (P0 → P3), and commit changes in small, reviewable batches. Every fix is grounded in data pulled directly from `/admin/seo/` on 2026-04-21.

---

## 0. Snapshot of where you are today

**Last 28 days (from `/admin/seo/search-console/`):**
- Total clicks: **205** (+66.7% vs prior 7d)
- Impressions: **5,522** (+128.5% vs prior 7d)
- Avg position: **15.1**
- **Avg CTR: 0.62%** ← this is the single biggest problem. Travel sites in your niche average 2–4%.
- Open recommendations: **93 issues** (10 critical, 13 warnings)
- SEO Advisor estimate: **~110 untapped clicks** are recoverable with title/meta/redirect work alone.

**Where the traffic actually is:** three pages account for ~90% of impressions — all of them ranking in the top 5 but bleeding clicks:

| URL | Impr. (28d) | CTR | Pos. | Status |
|---|---|---|---|---|
| `/kilimanjaro-vs-everest/` | 2,209 | 0.5% | #3.5 | CRITICAL — CTR crisis |
| `/is-there-snow-in-africa-mountains/` | 2,275 | 0.48% | #4.2 | CRITICAL — CTR crisis |
| `/hunting-strategy-of-the-lions/` | 1,141 | 0.29% | #4.8 | CRITICAL — CTR crisis |

If these three pages hit a 2% CTR (still below average), that alone is ~115 extra clicks/month.

**What your traffic isn't:** none of these pages convert to bookings. You're ranking on informational "fun fact" queries (`highest mountain in the world`, `does it snow in africa`, `how do lions hunt`) while your money pages — Kilimanjaro routes, safari packages, pricing — are ranking #15 to #120. That's the second-biggest problem.

---

## 1. Priority order for Claude Code

Tackle in this order. Don't skip ahead.

- **P0 — CTR rescue** on the three pages above, plus `/how-tall-is-mount-kilimanjaro/` and `/weather-in-tanzania/` (0% CTR at 200+ impressions each).
- **P0 — 404 redirect recovery** for 9 URLs still being hit.
- **P1 — Money-page rebuild**: `/kilimanjaro-prices/`, `/how-much-to-climb-kilimanjaro/`, route pages (`/8-day-lemosho-route-kilimanjaro-guide/`, etc.), safari packages.
- **P1 — Position-drop triage** for 3 queries that crashed in the last 7 days.
- **P2 — Internal linking** from your high-impression "fun fact" pages into your money pages.
- **P2 — Schema markup** across the site (TouristTrip, TouristAttraction, Trip, Product, FAQPage, Review, Organization).
- **P3 — Content architecture** cleanup (hub-and-spoke) and local SEO for Arusha.

---

## 2. P0 — CTR Rescue (the fastest wins you have)

Every one of these pages ranks on page 1 but the snippet is failing to earn the click. The fix is almost entirely `<title>` and `<meta description>` rewriting — no re-ranking required.

### 2.1 Rewrite rules Claude Code must follow

For every title and description below, apply these constraints:

- **Title:** 50–60 characters. Lead with the specific answer or the emotional hook. End with `| Snow Africa Adventure` only if you have characters to spare — otherwise drop the brand.
- **Meta description:** 140–160 characters. Must contain (a) the primary keyword, (b) a concrete specificity (a number, a year, a guarantee), and (c) a reason to click over the 9 competitors above and below you.
- Do not keyword-stuff. Google Search Console data shows you're already ranking — the title/desc job is *conversion*, not relevance.
- Include the current year (2026) where it makes sense — freshness signals boost CTR.
- Never reuse the same description on two URLs.

### 2.2 Exact rewrites — apply these verbatim

> Locate the page record in the CMS (likely `Page Builder`, `Blog Posts`, or route-specific tables) and update the `seo_title` / `meta_description` fields. If the codebase uses frontmatter or a page model, update there and redeploy.

**`/kilimanjaro-vs-everest/`** (2,209 impr, 0.5% CTR, #3.5)
- Current symptom: ranks #2.9 for `kilimanjaro` (214 impr, 0.11% CTR) and #2.2 for `highest mountain in the world` (166 impr, 0.42% CTR). The snippet isn't answering the query.
- New title: `Kilimanjaro vs Everest: 7 Differences Every Climber Should Know`
- New meta: `Kilimanjaro is 3,819m shorter than Everest, needs no oxygen, and 85% of climbers summit. Full comparison — cost, difficulty, routes, training — from guides who've summited 500+ times.`

**`/is-there-snow-in-africa-mountains/`** (2,275 impr, 0.48% CTR, #4.2)
- Ranks #3.7 for `does it snow in africa` (210 impr, 0.25% CTR — flagged "CTR Crisis").
- New title: `Yes, It Snows in Africa — 5 Mountains Where You'll Find It`
- New meta: `Kilimanjaro, Mount Kenya, the Atlas, the Rwenzoris, the Drakensberg — real snow on the equator. Photos, best months to see it, and how to climb the snow line yourself.`

**`/hunting-strategy-of-the-lions/`** (1,141 impr, 0.29% CTR, #4.8)
- Ranks #2.5 for `explain the hunting strategies of a pride of lions` (35 impr, 9% CTR — decent).
- New title: `How Lions Hunt: Pride Tactics, Ambushes & Success Rates Explained`
- New meta: `Lions succeed only 25% of the time — but coordinated pride tactics, ambush lanes and role specialisation make every hunt a case study. Safari-guide breakdown with real footage.`

**`/how-tall-is-mount-kilimanjaro/`** (262 impr, 0% CTR)
- New title: `How Tall Is Kilimanjaro? 5,895m (19,341ft) — and 3 Surprises`
- New meta: `Kilimanjaro stands 5,895 metres / 19,341 feet — Africa's highest peak and the world's tallest free-standing mountain. Height by route, glacier retreat, summit timeline.`

**`/weather-in-tanzania/`** (219 impr, 0% CTR; also lost #1 → #21.6 for `tanzanian food` — unrelated drop to investigate)
- New title: `Tanzania Weather by Month (2026) — Best Times for Safari & Kili`
- New meta: `Month-by-month Tanzania weather: rainfall, temps, wildlife, and the peak Kilimanjaro + Serengeti windows. Planned by Arusha guides who work the mountain year-round.`

**`/amazing-teamwork-of-lions/`** (285 impr, 0.9% CTR)
- New title: `Lions Work in Teams: Inside Pride Cooperation on the Serengeti`
- New meta: `Female lions hunt in coordinated teams, males defend territory, cubs learn by watching. How pride teamwork works on the Serengeti — observed and photographed by our guides.`

**`/a-complete-overview-about-aardvark/`** (1,095 impr, 0.47% CTR, #12.2)
- This page is bleeding irrelevant traffic. Either delete it and 301 to a relevant page, or rewrite the title/meta so the click that does come in lands somewhere useful.
- If keeping: `Aardvark Facts: Africa's Strangest Night-Shift Excavator`
- Meta: `Aardvarks dig 10m burrows, eat 50,000 termites a night, and almost nobody sees them. Behaviour, habitat, and where you might spot one on a Tanzanian night safari.`

### 2.3 After rewriting

Add a task to re-check Search Console CTR on each URL **28 days after deployment**. If CTR on any page hasn't crossed 2%, iterate the title again — A/B by rewriting once.

---

## 3. P0 — 404 Redirect Recovery (free traffic)

From `/admin/seo/recommendations/` → Warnings → 404 Errors. These URLs are still getting hit. Create 301 redirects in `/admin/redirects/` (or the codebase's redirect table/config).

| Broken URL | Hits | Redirect To |
|---|---|---|
| `/10-reasons-why-you-should-go-for-tanzania-safari-to-see-the-great-migration/` | 14 | `/great-wildebeest-migration/` (or nearest blog about migration) |
| `/tanzania-safari-packing-list/` | 11 | `/the-ultimate-kilimanjaro-packing-list/` OR a new `/tanzania-safari-packing-list/` page (preferred — high intent) |
| `/kilimanjaro-record/` | 10 | `/mount-kilimanjaro/` or a new records page |
| `/eco-safari-lodges-in-tanzania-sustainable-travel-insights/` | 10 | `/maasai-homestay-tanzania/` or a new eco-lodges blog |
| `/2019/09/25/` | 10 | `/blog/` |
| `/sustainability/` | 9 | `/about-us/` or a new sustainability page (KPAP member — own this) |
| `/2020/02/13/` | 9 | `/blog/` |
| `/arusha-national-park-day-tour/` | 9 | `/category/day-trips/` — or build the page (clearly wanted) |
| `/2025/01/06/` | 9 | `/blog/` |

**Bigger recommendation:** disable your CMS's `/YYYY/MM/DD/` date archives altogether and redirect all of them with a wildcard to `/blog/`. Date archives are a classic thin-content trap that crawlers keep hitting.

### 3.1 Pages worth actually building (not just redirecting)

These 404s suggest demand — build real pages for them and you'll capture the traffic plus new search volume:

- `/tanzania-safari-packing-list/` — transactional, clear intent, your site has no equivalent
- `/sustainability/` — you're a KPAP member, this is a trust page that converts bookings
- `/arusha-national-park-day-tour/` — day-trip money page, you already have `/admin/day-trips/`

---

## 4. P1 — Rebuild the money pages

Your informational content ranks top 5. Your **transactional** content ranks #15–#120. This is backwards.

### 4.1 Pages that are currently underperforming

| URL | Clicks | Impr. | Pos. | Intent | Priority |
|---|---|---|---|---|---|
| `/kilimanjaro-prices/` | 1 | 96 | #29.9 | Transactional | Rebuild |
| `/how-much-to-climb-kilimanjaro/` | 1 | 2 | — | Transactional | Rebuild |
| `/8-day-lemosho-route-kilimanjaro-guide/` | 2 | 27 | #12.8 | Transactional | Expand |
| `/trekking/5-days-marangu-route/` | 0 | 3 | #49 | Transactional | Expand |
| `/trekking/7-days-machame-route/` | 0 | 5 | #94.1 | Transactional | Expand |
| `/trekking/4-days-mount-meru-climbing/` | 0 | 6 | #60.7 | Transactional | Expand |
| `/trekking/6-days-umbwe-route/` | 0 | 5 | #16.8 | Transactional | Expand |
| `/kilimanjaro-climbing-routes/` | 0 | 10 | #19.4 | Hub page | Rebuild as hub |
| `/kilimanjaro-join-group-departures/` | 0 | 1 | #10 | Transactional | Expand |
| `/` (homepage) | 3 | 41 | #15 | Brand/commercial | Rebuild |

### 4.2 What every route page needs to contain

Currently these pages are too thin. Claude Code should ensure each route page (Marangu, Machame, Lemosho 7/8d, Rongai 6/7d, Umbwe, Northern Circuit, Meru) includes:

1. **H1** matching the exact route + day count + `Kilimanjaro` (e.g. `8-Day Lemosho Route — Kilimanjaro's Highest Success Route`).
2. **Success rate + elevation profile** in the first 100 words. You have real summit data — use it.
3. **Day-by-day itinerary** table: Day / Trek time / Distance / Altitude gain / Overnight camp.
4. **What's included / excluded** list.
5. **Starting price** in USD prominently (with "from $X per person").
6. **FAQ block** (schema.org FAQPage — see §6) — at minimum: How hard? Who's it for? Best months? Training needed? Success rate?
7. **3+ photos** with descriptive alt text (not "image1.jpg").
8. **2+ testimonials** scoped to that route.
9. **Internal links** to: `/mount-kilimanjaro/`, `/kilimanjaro-climbing-routes/` (hub), the packing list, the pricing page, and **one relevant blog**.
10. **CTA blocks** — inline, mid-page, and sticky — all going to `/admin/inquiries/` submission.

Target word count: **1,500–2,500 words of unique content per route page.**

### 4.3 Rebuild `/kilimanjaro-prices/` properly

This is currently ranking #29.9 despite being a high-intent query. It should rank top 5. Required structure:

1. **Price range up-front**: "$2,000–$5,000 per climber, depending on route and group size."
2. **Pricing matrix table** — every route × group size × season.
3. **What's in the price** (park fees, guides, porters, meals, tents, transfers, O2 kit).
4. **What's NOT** (flights, visa, tips, gear hire).
5. **Why Kilimanjaro costs what it costs** — Tanzania National Park fees breakdown. This is unique content competitors rarely offer.
6. **KPAP fair-wage explanation** — ethical pricing as a differentiator.
7. **Real group departure dates** pulled from your `/admin/departures/` with live pricing.
8. **CTA** to request a custom quote.
9. **FAQPage schema**.

### 4.4 Homepage (`/` — currently #15 for `arusha tour operators`, 0.5% CTR at 41 impressions)

You're ranking #121 for `arusha tour operators` despite Arusha being your home base. Massive local SEO gap. Homepage must:

- H1: `Tanzania Safaris & Kilimanjaro Treks — Arusha-Based, Locally Owned` (or similar — local + service).
- Open with who you are, where you are, how long you've been doing it.
- Hero CTA: "Plan my trip" (inquiry) + secondary "Browse Kilimanjaro routes".
- "Why us" block referencing: KPAP membership, TATO licence, 500+ summits, Florent & Caroline founder story.
- Featured: 3 Kilimanjaro routes + 3 safari packages + 1 day trip, each linking deeper.
- Testimonial carousel pulling live from `/admin/reviews/`.
- Trust row: TripAdvisor logo, KPAP logo, TATO, Safari Bookings, etc.
- FAQ block for top queries (best time, cost, how to book).
- Organization + LocalBusiness schema.

---

## 5. P1 — Position-Drop Triage

From `/admin/seo/recommendations/` → Warnings → Position Drop. Three queries crashed in the last 7 days:

| Query | Was | Now | Likely Cause |
|---|---|---|---|
| `mount everest vs mount kilimanjaro` | #3.3 | #10.3 | Competitor refreshed content; yours is stale |
| `kilimanjaro height` | #6.7 | #57.6 | Likely algorithm re-evaluation of `/how-tall-is-mount-kilimanjaro/` |
| `tanzanian food` | #1.0 | #21.6 | Content on `/weather-in-tanzania/` is off-topic — wrong page surfaced |

**Claude Code tasks:**
1. For `kilimanjaro vs everest`: add 2 fresh sections to `/kilimanjaro-vs-everest/` — a 2026 comparison table and a cost comparison. Update the `lastModified` date in sitemap.
2. For `kilimanjaro height`: add a **"Kilimanjaro height by route"** section with summit elevations on each route. Include metric + imperial everywhere. Add a comparison graphic (alt text: "Kilimanjaro height compared to Everest, Denali, Aconcagua, Elbrus").
3. For `tanzanian food`: investigate why `/weather-in-tanzania/` is ranking for a food query. Likely a topical confusion. Create or fix `/traditional-tanzanian-cuisine/` (you have it — URL appears in Pages table with 158 impr, #6.5, 0 clicks — also needs a title rewrite) and ensure it's the primary page for that query. Add an internal link from the weather page to the cuisine page.

---

## 6. P2 — Schema Markup

Add JSON-LD to every page. Below are the minimum required types and which URLs they go on.

### 6.1 Site-wide

Add **Organization** + **LocalBusiness** schema to every page (via layout/template), with:
- name: `Snow Africa Adventure`
- address: full Arusha address
- telephone
- email
- founder: `Florent` and `Caroline`
- sameAs: TripAdvisor, Facebook, Instagram, TATO listing
- logo
- `@type: LocalBusiness` + `@type: TravelAgency`
- aggregateRating from `/admin/reviews/`

### 6.2 Per-page

| Page type | Schema types |
|---|---|
| Route pages (`/trekking/*`, `/*-route/`) | `TouristTrip` + `Product` + `Offer` (price) + `FAQPage` + `AggregateRating` |
| Safari packages | `TouristTrip` + `Product` + `Offer` + `FAQPage` |
| Day trips | `TouristAttraction` + `Product` + `Offer` |
| Blog posts | `Article` + `BreadcrumbList` |
| Hub pages (e.g. `/kilimanjaro-climbing-routes/`) | `CollectionPage` + `BreadcrumbList` |
| Home | `Organization` + `WebSite` + `SearchAction` |
| FAQs | `FAQPage` |
| Reviews page | `AggregateRating` |

### 6.3 Validation

After deployment: run every template through `https://validator.schema.org/` and `https://search.google.com/test/rich-results`. Claude Code should emit a script that curls each URL type and runs a headless validator pass.

---

## 7. P2 — Internal Linking

The highest-authority pages on your site are the fun-fact informational pages (Kilimanjaro vs Everest, snow in Africa, lion hunting). They currently don't funnel that authority toward your money pages. Fix that.

### 7.1 Hard rules

- Every high-impression informational page must contain **at least 3 contextual links** to a commercial page. Not "click here" — descriptive anchor text. Examples:
  - `/kilimanjaro-vs-everest/` → `plan your Kilimanjaro climb`, `8-day Lemosho route`, `Kilimanjaro pricing breakdown`.
  - `/is-there-snow-in-africa-mountains/` → `summit Kilimanjaro yourself`, `climbing Kilimanjaro in the snow season`, `best months to see snow on Kili`.
  - `/hunting-strategy-of-the-lions/` → `Serengeti safari packages`, `big cat photography safaris`, `walking safari in Ngorongoro`.
- Every route page links to every other route page + to the route hub. Create a reusable "Other Kilimanjaro routes" sidebar/block.
- Every safari package links to relevant destination pages.
- Every blog post has a relevant "Book your [X]" CTA inline.
- Breadcrumbs on every page (with BreadcrumbList schema).

### 7.2 Anchor text naming convention

- For transactional internal links: use verbs + specifics. `book a 7-day Machame climb`, `compare Lemosho and Machame`, `get Kilimanjaro pricing`.
- Never `click here`, `read more`, `learn more`.

---

## 8. P2 — Content Hubs (structure fix)

Your `/kilimanjaro-climbing-routes/` is a natural hub but only has 10 impressions and ranks #19.4. Rebuild as a pillar page using the hub-and-spoke model.

### 8.1 Hub structure to build

**Pillar: `/mount-kilimanjaro/`** (or rename `/kilimanjaro-climbing-routes/`)
  Content: ~3,000 words covering everything a prospective climber needs at a high level.
  Spokes (each is a separate deep page):
  - `/trekking/8-day-lemosho-route/` (recommended — best success rate)
  - `/trekking/7-day-machame-route/`
  - `/trekking/6-day-marangu-route/`
  - `/trekking/6-day-rongai-route/`
  - `/trekking/6-day-umbwe-route/`
  - `/trekking/9-day-northern-circuit-route/`
  - `/kilimanjaro-prices/`
  - `/how-hard-is-kilimanjaro/`
  - `/the-ultimate-kilimanjaro-packing-list/`
  - `/best-time-to-climb-kilimanjaro/`
  - `/kilimanjaro-training-guide/` ← doesn't exist, build it
  - `/kilimanjaro-altitude-sickness/` ← doesn't exist, build it

**Pillar: `/tanzania-safaris/`** (likely exists as a category)
  Spokes:
  - `/serengeti-safari/`
  - `/ngorongoro-crater-safari/`
  - `/great-wildebeest-migration/`
  - `/tanzania-camping-safari/`
  - `/luxury-tanzania-safari/`
  - `/family-safari-tanzania/`
  - `/honeymoon-safari-tanzania/`
  - `/photographic-safari-tanzania/`

**Pillar: `/zanzibar-beach-escapes/`** (if offering)
  Spokes: Stone Town, Nungwi, Kendwa, spice tours, combo with safari.

**Pillar: `/day-trips-from-arusha/`** ← build as hub for Arusha National Park, Materuni waterfalls, Maasai homestay, Tarangire day trip, etc.

### 8.2 Pillar page requirements

- 2,500–4,000 words.
- Every spoke linked with descriptive anchor + a 2-3 sentence intro.
- TOC at top.
- FAQ block at bottom with FAQPage schema.
- Updated date stamp ("Last updated: April 2026").
- At least one original illustration/graphic/photo.

---

## 9. P2 — Local SEO for Arusha

You're ranking #121 for `arusha tour operators` despite being an Arusha-based operator. That's a Google Business Profile + on-page local signals problem.

### 9.1 Claude Code / admin tasks

1. Verify/claim Google Business Profile. Category: `Tour operator`, secondary: `Safari tour agency`, `Mountaineering class`. Add all Kilimanjaro + safari photos.
2. On-page, the homepage, `/about-us/`, `/contact/`, and the footer must display:
   - NAP (Name, Address, Phone) in plain text, identical across pages.
   - Map embed (or Organization schema with geo coordinates).
   - Opening hours.
3. Create a `/contact/` page if it doesn't exist (I didn't see one in the admin index), with `ContactPage` schema.
4. Build a dedicated `/arusha-tour-operators/` or `/about/arusha-based-tour-operator/` landing page — 1,000+ words on why being Arusha-based matters (proximity to Kili gate, local guides, driving distances to parks, KPAP head office relationship).
5. Local citations: ensure consistent NAP on TripAdvisor, Safari Bookings, Tourradar, Viator, TATO directory, Bookmundi.
6. Earn local backlinks: Tanzania Tourism Board, Arusha municipal site, local hotels, KPAP.

---

## 10. P2 — Image SEO

I couldn't audit your image ecosystem directly, but from the URL patterns (`/what-to-wear-in-tanzania-safari-a-guide-to-perfectly-blend-with-the-color-of-tanzania/` is 115 characters of a URL — likely image alts are just as verbose or just as thin).

### 10.1 Claude Code tasks

- Audit `/admin/media/` — every image needs:
  - Filename: descriptive-hyphenated.jpg (e.g., `lemosho-route-barranco-camp-sunrise.jpg`).
  - Alt text: 8–15 words, describing what's in the image, including the location and keyword where natural. Never `image1`, `DSC_0234`, or empty.
  - Width/height attributes set (CLS).
  - Modern format: serve WebP with JPEG fallback.
  - Lazy loading below the fold.
- Write a batch script (Claude Code: in the codebase's media handling) that:
  1. Converts all JPEGs to WebP.
  2. Generates responsive `srcset` variants (400w, 800w, 1200w, 2000w).
  3. Flags any image missing alt text.
  4. Flags any image > 300KB as a compression candidate.

---

## 11. P2 — Core Web Vitals / Technical

I couldn't load `/admin/seo/analytics/` or `/admin/seo/keywords/` (they hung on "Loading…"). **First task for Claude Code: investigate why.** Could be:
- API timeout against the Search Console integration.
- Heavy query with no pagination.
- Missing cache layer.

Either way, a slow admin is a symptom of a slow public site.

### 11.1 Public-site performance checklist

- Run PageSpeed Insights on the top 10 impression pages. Target: LCP < 2.5s, CLS < 0.1, INP < 200ms.
- Enable full-page caching (Cloudflare, Fastly, or your platform's native).
- Defer all non-critical JS.
- Inline critical CSS for above-the-fold.
- Self-host or preconnect critical fonts.
- Audit any `<iframe>` embeds (booking widgets, maps) — iframe `loading="lazy"`.
- Make sure `robots.txt` allows `/trekking/`, `/tanzania-safaris/`, `/day-trips/`, `/blog/` and disallows `/admin/`.
- Make sure `sitemap.xml` is auto-generated, submitted to Search Console, and contains `lastmod` for every URL.
- Add `canonical` tags to every page (the CMS likely does this — verify).
- Ensure hreflang is set if you serve any non-English content.
- Check for orphan pages (no internal links pointing in). The `/trekking/` routes and `/tanzania-safaris/` sub-routes are suspicious — they rank #50–#94, which often means weak internal linking.

---

## 12. P3 — E-E-A-T signals

Google now explicitly weighs Experience. You have massive advantages here — use them.

- Author bios on every blog post. Each guide/author should have:
  - Real name, real photo.
  - Years of experience, number of summits, certifications (TATO, WFR, etc.).
  - A `/team/` page that each bio links to.
  - `Person` schema.
- About page rebuild: Florent + Caroline founder story, KPAP membership proof (photos, certificate), team photos, real Arusha office photos, licence numbers.
- Reviews page: pull from `/admin/reviews/`, publish with `Review` + `AggregateRating` schema, link out to TripAdvisor originals.
- "As featured in" or "In partnership with" row (if you have any press mentions — Luxury Travel Magazine had an article on Tanzania safaris).
- A Press / Media kit page.

---

## 13. P3 — Content expansion opportunities from Search Console

These queries are ranking on page 2 with 0 clicks. Each represents a content expansion opportunity — either a new section in an existing page or a new page entirely.

### 13.1 Build or expand for:

| Query | Current page | Pos. | Action |
|---|---|---|---|
| `kilimanjaro routes comparison` | `/kilimanjaro-climbing-routes/` | #13 | Add full comparison table + decision tree |
| `africa ski resorts` | `/snow-activities-in-africa/` | #6.7 | Expand with Oukaïmeden, Afriski, Tiffindell — 1,500 words |
| `africa safaris best time go` | `/best-time-to-go-on-safari-in-africa/` | #69.6 | Rebuild — this is ranking terribly for a high-intent query |
| `wet season in tanzania` | `/weather-in-tanzania/` | #36 | Dedicated wet-season section |
| `mt kilimanjaro height` | `/how-tall-is-mount-kilimanjaro/` | #51.5 | Rewrite hero — give exact height immediately |
| `is mount kilimanjaro hard to climb` | `/how-hard-is-kilimanjaro/` | #79.5 | Full difficulty rebuild with objective criteria |
| `kilimanjaro hike cost` / `price of climbing kilimanjaro` | `/how-much-to-climb-kilimanjaro/` & `/kilimanjaro-prices/` | #33 | Consolidate to one page with 301 redirect |
| `unesco kilimanjaro first ascent 1889` | `/first-person-to-climb-kilimanjaro/` | #8.7 | At risk — refresh with citations |
| `epic kilimanjaro sunrises` | `/epic-kilimanjaro-sunrises-2025/` | #2.3 | Rename to `-2026/` when appropriate; keep updated |
| `tanzania itinerary` | `/tanzania-itinerary-10-days/` | #1 | You rank #1 but 0 clicks — title/meta rewrite (priority P0) |

### 13.2 Queries you're ranking for that you shouldn't care about

Some Search Console queries are junk (`naga368`, `texas weather`, `dumfries weather`, `should i fertilize after mowing`). Don't optimise for these. If a page is accidentally ranking for these, it usually means the page is keyword-thin and Google is guessing — that's a signal to tighten the page's topical focus.

---

## 14. How Claude Code should execute this

Suggested batching:

1. **Commit 1 — CTR rescue (§2)**: rewrite titles/descriptions on 7 URLs. Single commit. Deploy. Set a calendar reminder 28 days out.
2. **Commit 2 — 404 redirects (§3)**: add all 9 redirects + disable date archives. Single commit.
3. **Commit 3 — schema infrastructure (§6)**: add a shared JSON-LD helper, wire it into layouts. Single commit.
4. **Commit 4 — money page: homepage rebuild (§4.4)**. Review before merge.
5. **Commits 5–11 — one per route page rebuild (§4.2)**.
6. **Commit 12 — internal linking pass (§7)** across high-impression informational pages.
7. **Commit 13 — hub pages (§8)**.
8. **Commit 14 — local SEO + about page (§9, §12)**.
9. **Commit 15 — image audit + optimisation (§10)**.
10. **Commit 16 — performance hardening (§11)**.

At each commit: run a lighthouse pass, validate schema, spot-check a couple of random pages in a browser.

---

## 15. What to measure, and when

After all P0 + P1 changes deploy, set a recurring check (Claude Code can schedule this as a `schedule` skill task):

- Week 1: verify no drops in impressions (you should never lose volume from these changes).
- Week 2: check CTR on the rewritten pages. Expect minimum 1.5× improvement on the three critical pages.
- Week 4: check positions on money pages. Expect `/kilimanjaro-prices/` to move from #29 to the teens.
- Week 8: compare total clicks 28d vs today's 205. Target: 500+ clicks/28d.
- Week 12: Google Business Profile impressions for "arusha tour operators" queries.

---

## 16. What I couldn't access (do this manually)

Three admin pages didn't finish loading when I captured data and should be reviewed manually:
- `/admin/seo/analytics/` — likely GA4 data. Export a 90-day report; identify channels.
- `/admin/seo/keywords/` — likely your tracked keyword set. Audit: are the right money keywords being tracked?
- `/admin/seo/content-performance/` — content performance by URL. Cross-reference with §13 above.

Also worth reviewing but out of scope here:
- `/admin/404-monitor/` — full list of 404s, not just the top 9.
- `/admin/redirects/` — audit for redirect chains (>1 hop hurts SEO).
- `/admin/bookings/` + `/admin/inquiries/` — correlate which pages are converting. Push SEO investment toward those.
- Google Search Console (the real one, not your admin wrapper) — check Coverage, Mobile Usability, Core Web Vitals reports directly.

---

## 17. Quick-reference: the 10 tasks that will move the needle most

If Claude Code only does 10 things from this document, do these:

1. Rewrite title + meta on `/kilimanjaro-vs-everest/`, `/is-there-snow-in-africa-mountains/`, `/hunting-strategy-of-the-lions/` — §2.2.
2. Add 301 redirects for the 9 high-traffic 404s — §3.
3. Rebuild `/kilimanjaro-prices/` — §4.3.
4. Rebuild homepage `/` — §4.4.
5. Expand every Kilimanjaro route page to 1,500–2,500 words with the §4.2 structure.
6. Add Organization + LocalBusiness schema site-wide + TouristTrip schema on every route & safari page — §6.
7. Add 3+ contextual internal links from each high-impression informational page to money pages — §7.1.
8. Build the `/mount-kilimanjaro/` pillar hub — §8.
9. Claim + optimise Google Business Profile for Arusha — §9.1.
10. Run image audit: alt text on every image, WebP conversion, compression — §10.1.

Ship these in this order. That's your roadmap.