# Route and Content Migration Matrix

## Routing contract

Every current public URL must be present in the Laravel route collection with the same successful/redirect/not-found behavior, query parameters, trailing slash, canonical URL, and HTTP status. Laravel routes must be explicit enough that the root-level blog fallback cannot shadow reserved pages.

The target path column below describes the target controller/page family. It does not authorize URL changes.

## Public route inventory

### Core, company, legal, and conversion routes

| Current URL | Current source | Target controller | Target Inertia page | Content owner |
|---|---|---|---|---|
| `/` | `src/app/(site)/page.tsx` | `PublicSite\HomeController@index` | `PublicSite/Home.tsx` | Timeless page `home` + typed featured data |
| `/about-us/` | `about-us/page.tsx` | `PublicSite\PageController@showReserved` | `PublicSite/BuilderPage.tsx` | Timeless page |
| `/contact-us/` | `contact-us/page.tsx` | `PublicSite\ContactController@show` | `PublicSite/Contact.tsx` | Typed form + managed page blocks |
| `/faq/` | `faq/page.tsx` | `PublicSite\PageController@showReserved` | `PublicSite/BuilderPage.tsx` | Timeless page with FAQ blocks |
| `/tailor-made-safari/` | `tailor-made-safari/page.tsx` | `PublicSite\TailorMadeController@show` | `PublicSite/TailorMade.tsx` | Typed form + managed blocks |
| `/thank-you/` | `thank-you/page.tsx` | `PublicSite\ThankYouController` | `PublicSite/ThankYou.tsx` | Managed page; `noindex` |
| `/privacy-policy/` | `privacy-policy/page.tsx` | `PublicSite\LegalController@privacy` | `PublicSite/BuilderPage.tsx` | Timeless page |
| `/terms-and-conditions/` | `terms-and-conditions/page.tsx` | `PublicSite\LegalController@terms` | `PublicSite/BuilderPage.tsx` | Timeless page |
| `/terms-conditions/` | Redirect in `next.config.ts` | `RedirectController`/middleware | 301 only | Redirect to `/terms-and-conditions/` |
| `/meet-florent/` | `meet-florent/page.tsx` | `PublicSite\PageController@showReserved` | `PublicSite/BuilderPage.tsx` | Timeless page + person/article schema |
| `/our-guides/` | `our-guides/page.tsx` | `PublicSite\GuideController@index` | `PublicSite/Guides/Index.tsx` | Guide records + managed blocks |
| `/our-kilimanjaro-guides/` | `our-kilimanjaro-guides/page.tsx` | `PublicSite\GuideController@kilimanjaro` | `PublicSite/Guides/Kilimanjaro.tsx` | Guide records + managed blocks |
| `/search/` | `search/page.tsx` | `PublicSite\SearchController@index` | `PublicSite/Search.tsx` | PostgreSQL search; search page `noindex` decision preserved |
| `/zanzibar/` | `zanzibar/page.tsx` | `PublicSite\PageController@showReserved` | `PublicSite/BuilderPage.tsx` | Timeless page |
| `/complete-details/{token}/` | `complete-details/[token]/page.tsx` | `PublicSite\ClimberDetailsController@show` | `PublicSite/Climbers/Complete.tsx` | Booking/climber domain |
| `/manage-climbers/{bookingRef}/` | `manage-climbers/[bookingRef]/page.tsx` | `PublicSite\ClimberManagementController@show` | `PublicSite/Climbers/Manage.tsx` | Booking/climber domain |

### Trekking and departure routes

| Current URL | Current source | Target | Content owner |
|---|---|---|---|
| `/trekking/` | `trekking/page.tsx` | `TrekkingController@index` -> `PublicSite/Trekking/Index.tsx` | `TrekkingRoute` records + landing blocks |
| `/trekking/{routeSlug}/` | `trekking/[routeSlug]/page.tsx` | `TrekkingController@show` -> `PublicSite/Trekking/Show.tsx` | `TrekkingRoute`, departures, FAQs, gallery |
| `/mountain-trekking/` | `mountain-trekking/page.tsx` | `TrekkingController@mountains` -> `PublicSite/Trekking/Mountains.tsx` | Query + managed blocks |
| `/climbing-kilimanjaro/` | `climbing-kilimanjaro/page.tsx` | `PageController@showReserved` -> `BuilderPage.tsx` | Timeless page |
| `/kilimanjaro-join-group-departures/` | matching page | `GroupDepartureController@index` -> `PublicSite/Departures/Index.tsx` | Departures + managed landing blocks |

### Safari, destination, and day-trip routes

| Current URL | Current source | Target | Content owner |
|---|---|---|---|
| `/tanzania-safaris/` | `tanzania-safaris/page.tsx` | `SafariController@index` -> `PublicSite/Safaris/Index.tsx` | Safari records + filters + landing blocks |
| `/tanzania-safaris/{safariSlug}/` | dynamic page | `SafariController@show` -> `PublicSite/Safaris/Show.tsx` | Safari, destinations, itinerary, gallery, pricing |
| `/tanzania-destinations/` | listing page | `DestinationController@index` -> `PublicSite/Destinations/Index.tsx` | Destinations + landing blocks |
| `/tanzania-destinations/{destSlug}/` | dynamic page | `DestinationController@show` -> `PublicSite/Destinations/Show.tsx` | Destination + related safaris |
| `/tanzania-day-tours/` | listing page | `DayTripController@index` -> `PublicSite/DayTrips/Index.tsx` | Day trips + landing blocks |
| `/tanzania-day-tours/{slug}/` | dynamic page | `DayTripController@show` -> `PublicSite/DayTrips/Show.tsx` | Day trip record |

### Blog, categories, tags, and managed pages

| Current URL | Current source | Target | Rule |
|---|---|---|---|
| `/blog/` | `blog/page.tsx` | `BlogController@index` -> `PublicSite/Blog/Index.tsx` | Published posts, pagination, categories |
| `/blog/{slug}/` | redirect page | permanent redirect | Redirect to root post URL `/{slug}/` |
| `/{postSlug}/` | `[postSlug]/page.tsx` | `BlogController@showRoot` -> `PublicSite/Blog/Show.tsx` | Registered last; reject reserved slugs |
| `/category/{categorySlug}/` | dynamic page | `BlogTaxonomyController@category` | Published posts only |
| `/tag/{tagSlug}/` | dynamic page | `BlogTaxonomyController@tag` | Published posts only |
| `/p/{slug}/` | Puck CMS page | `PageController@showLegacyCms` | Preserve while converting; later render Timeless document at the same URL |

### Bespoke SEO landing pages to convert to Timeless Builder

Each route below keeps its exact URL. Its current TSX becomes a versioned page document composed from SnowAfrica-specific Timeless widgets. The migration stores the current metadata, schemas, content order, images, alt text, links, CTA targets, and responsive presentation.

| URL | Current file |
|---|---|
| `/african-safaris/` | `african-safaris/page.tsx` |
| `/best-kilimanjaro-tour-operators/` | `best-kilimanjaro-tour-operators/page.tsx` |
| `/best-route-to-climb-kilimanjaro/` | `best-route-to-climb-kilimanjaro/page.tsx` |
| `/best-tanzania-tour-operator/` | `best-tanzania-tour-operator/page.tsx` |
| `/best-time-to-climb-kilimanjaro/` | `best-time-to-climb-kilimanjaro/page.tsx` |
| `/can-beginners-climb-kilimanjaro/` | `can-beginners-climb-kilimanjaro/page.tsx` |
| `/climb-kilimanjaro-from-usa/` | `climb-kilimanjaro-from-usa/page.tsx` |
| `/how-hard-is-kilimanjaro/` | `how-hard-is-kilimanjaro/page.tsx` |
| `/kilimanjaro-age-limits/` | `kilimanjaro-age-limits/page.tsx` |
| `/kilimanjaro-airport-guide/` | `kilimanjaro-airport-guide/page.tsx` |
| `/kilimanjaro-altitude-sickness/` | `kilimanjaro-altitude-sickness/page.tsx` |
| `/kilimanjaro-climate-zones/` | `kilimanjaro-climate-zones/page.tsx` |
| `/kilimanjaro-climbing-companies/` | `kilimanjaro-climbing-companies/page.tsx` |
| `/kilimanjaro-climbing-gear/` | `kilimanjaro-climbing-gear/page.tsx` |
| `/kilimanjaro-day-hike/` | `kilimanjaro-day-hike/page.tsx` |
| `/kilimanjaro-deaths/` | `kilimanjaro-deaths/page.tsx` |
| `/kilimanjaro-food-meals/` | `kilimanjaro-food-meals/page.tsx` |
| `/kilimanjaro-glaciers/` | `kilimanjaro-glaciers/page.tsx` |
| `/kilimanjaro-honeymoon/` | `kilimanjaro-honeymoon/page.tsx` |
| `/kilimanjaro-hygiene/` | `kilimanjaro-hygiene/page.tsx` |
| `/kilimanjaro-map/` | `kilimanjaro-map/page.tsx` |
| `/kilimanjaro-paragliding/` | `kilimanjaro-paragliding/page.tsx` |
| `/kilimanjaro-prices/` | `kilimanjaro-prices/page.tsx` |
| `/kilimanjaro-records/` | `kilimanjaro-records/page.tsx` |
| `/kilimanjaro-safety/` | `kilimanjaro-safety/page.tsx` |
| `/kilimanjaro-solo-climb/` | `kilimanjaro-solo-climb/page.tsx` |
| `/kilimanjaro-statistics/` | `kilimanjaro-statistics/page.tsx` |
| `/kilimanjaro-success-rates/` | `kilimanjaro-success-rates/page.tsx` |
| `/kilimanjaro-tipping-guide/` | `kilimanjaro-tipping-guide/page.tsx` |
| `/kilimanjaro-training-plan/` | `kilimanjaro-training-plan/page.tsx` |
| `/kilimanjaro-travel-insurance/` | `kilimanjaro-travel-insurance/page.tsx` |
| `/kilimanjaro-visa-tanzania/` | `kilimanjaro-visa-tanzania/page.tsx` |
| `/kilimanjaro-weather/` | `kilimanjaro-weather/page.tsx` |
| `/kilimanjaro-women-climbing/` | `kilimanjaro-women-climbing/page.tsx` |
| `/luxury-safaris-tanzania/` | `luxury-safaris-tanzania/page.tsx` |
| `/mount-kilimanjaro/` | `mount-kilimanjaro/page.tsx` |
| `/mount-kilimanjaro-height/` | `mount-kilimanjaro-height/page.tsx` |
| `/tanzania-beach-holidays/` | `tanzania-beach-holidays/page.tsx` |
| `/tanzania-camping-safaris/` | `tanzania-camping-safaris/page.tsx` |
| `/tanzania-itinerary-10-days/` | `tanzania-itinerary-10-days/page.tsx` |
| `/tanzania-lodge-safaris/` | `tanzania-lodge-safaris/page.tsx` |
| `/tanzania-safari-from-uk/` | `tanzania-safari-from-uk/page.tsx` |
| `/wildlife-safaris-tanzania/` | `wildlife-safaris-tanzania/page.tsx` |

`about-us`, `contact-us`, `faq`, `zanzibar`, `tailor-made-safari`, and the legal pages also contain compiled content and belong in the managed-content conversion, though their interactive/domain portions stay typed.

## Admin route families

Target routes retain the `/admin/` prefix and current recognizable nouns. Every module gets index/create/edit/show routes only where its workflow requires them.

| Admin family | Current pages | Target controllers/pages | Required management behavior |
|---|---|---|---|
| Dashboard | `/admin/` | `Admin\DashboardController` / `Admin/Dashboard.tsx` | KPIs, recent activity, alerts |
| Auth/profile | login, forgot/reset password, reset PIN, settings | Auth controllers / `Admin/Auth/*`, `Admin/Settings/*` | Session auth, reset, profile, PIN/TOTP transition |
| Routes | `/admin/routes`, `/{id}` | `Admin\TrekkingRouteController` / `Admin/TrekkingRoutes/*` | Full CRUD, archive, preview, relationships |
| Safaris | `/admin/safaris`, `/{id}` | `Admin\SafariController` / `Admin/Safaris/*` | Full CRUD, itinerary, pricing, destinations, SEO |
| Destinations | `/admin/destinations`, `/{id}` | `Admin\DestinationController` | Full CRUD, related safaris, SEO |
| Day trips | `/admin/day-trips`, `/{id}` | `Admin\DayTripController` | Full CRUD and preview |
| Blog | `/admin/blog`, `/{id}` | `Admin\BlogPostController` | Full CRUD, taxonomy, root URL preview, revisions |
| Pages/builder | pages list/new/edit | `Admin\PageController`, `Admin\BuilderController` | Full CRUD, visual edit, preview, versions, publish |
| Homepage | `/admin/homepage` | Redirect/open builder page `home` plus settings panel | No separate competing CMS |
| Heroes | `/admin/heroes`, `/{pageSlug}` | Hero widget or typed hero settings editor | Focal point, overlay, CTA, responsive preview |
| Guides | `/admin/guides`, `/{id}` | `Admin\GuideController` | Full CRUD, ordering, active status |
| Logos | `/admin/logos`, `/{id}` | `Admin\LogoController` | Full CRUD, placements, ordering |
| Reviews | `/admin/reviews`, `/{id}` | `Admin\ReviewController` | Full CRUD, verification, feature/publish |
| Media | `/admin/media` | `Admin\MediaController` / `Admin/Media/Index.tsx` | Upload, edit, folders, usage, safe deletion, R2 browse |
| Theme | `/admin/theme` | `Admin\BrandingController` | Colors, fonts, radii, logos, favicon, preview |
| Departures | list/new/edit/bulk/settings | `Admin\GroupDepartureController` | Full CRUD, bulk create, rotation, feature/status |
| Bookings | list/show/invoice | `Admin\BookingController` | Search, status/payment, climbers, emails, invoice |
| Inquiries | list/show | `Admin\InquiryController` | Status, edit, email, convert to booking |
| Invite links | list | `Admin\InviteLinkController` | Create/revoke/inspect tracking |
| Newsletter | list | `Admin\NewsletterController` | Search, status, export, unsubscribe controls |
| Partners | list/new/show/edit/earnings | `Admin\PartnerController` | Full CRUD, rates, earnings, test email/export |
| Commissions/payouts | list and payouts | commission/payout controllers | Review, status transitions, export, audit |
| Email logs | list/show | `Admin\EmailLogController` | Filter, inspect, safe resend |
| Notifications | list/preferences | `Admin\NotificationController` | Read state, delete, subscribe/preferences |
| Users | list/new/edit | `Admin\UserController` | Full CRUD, activate/deactivate, roles, password reset |
| Redirects | list/new/edit | `Admin\RedirectController` | Full CRUD, loop/chain validation, hit stats |
| 404 monitor | list/show | `Admin\NotFoundController` | Bot/human detail, ignore, redirect conversion |
| SEO | overview plus 8 subpages | `Admin\Seo*Controller` / `Admin/Seo/*` | Preserve sync, audit, metrics, settings, keywords |
| Analytics | overview and conversion subpages | analytics controllers / `Admin/Analytics/*` | Preserve current charts, filters, attribution |
| Deployment | new module | `Admin\DeploymentController` / `Admin/Deployments/*` | Preflight, deploy, log, rollback, backup status |
| Audit log | new module | `Admin\AuditLogController` / `Admin/AuditLog/Index.tsx` | Actor/action/record/diff/IP filters |

## API and action migration families

The current 84 Next.js API files are converted by capability, not copied into a single Laravel API controller.

| Current API family | Target route/controller/service |
|---|---|
| `/api/auth/*` | `routes/auth.php`, Laravel auth controllers and rate limits |
| `/api/admin/bookings/*` | admin web routes with Inertia form responses; JSON endpoints only for async panels |
| `/api/admin/departures/*` | `Admin\GroupDepartureController`, bulk/rotation actions |
| `/api/admin/inquiries/*` | `Admin\InquiryController`, conversion action, email action |
| `/api/admin/media/*` | `Admin\MediaController`, `MediaService`, signed R2 operations |
| `/api/admin/pages/*` | `Admin\PageController`, `Admin\BuilderController`, version/publish actions |
| `/api/admin/partners`, commissions, payouts | typed admin controllers and domain actions |
| `/api/admin/redirects`, 404 monitor | redirect/not-found controllers and services |
| `/api/admin/seo/*` | SEO controllers, synchronization jobs, audit services |
| `/api/admin/users/*` | `Admin\UserController`, `UserPolicy` |
| `/api/bookings`, inquiries, invites | public Form Requests and transactional actions |
| `/api/climber-details/*`, manage-climbers | token-scoped controllers with expiry and authorization |
| `/api/search` | `PublicSite\SearchController` using PostgreSQL search |
| `/api/share/email` | throttled share-mail action |
| `/api/theme`, site settings | shared Inertia props for reads; protected branding actions for writes |
| `/api/track-404` | server-side 404 middleware/event plus optional client enrichment |
| `/api/analytics/vitals` | validated, rate-limited web-vitals ingestion |
| `/api/whatsapp-log` | validated conversion/engagement event ingestion |
| `/api/cron/*` | Laravel scheduled commands/jobs; HTTP cron routes removed after cutover |
| `/api/health` | `/health/live` and protected `/health/ready` |

## Route-generation and parity artifacts

Implementation creates the following generated files in the target repository:

- `storage/app/migration/source-route-manifest.json`
- `storage/app/migration/target-route-manifest.json`
- `storage/app/migration/redirect-manifest.json`
- `storage/app/migration/route-parity-report.json`
- `storage/app/migration/seo-parity-report.json`

`php artisan migration:verify-routes --source=<source-manifest>` fails if a source 2xx URL becomes a 404/5xx, if a canonical changes without approval, if a redirect chain is introduced, or if a permanent redirect no longer reaches the same final URL.

## Known route discrepancy to close before cutover

The current sitemap emits `/terms-conditions/`, while `next.config.ts` permanently redirects that URL to `/terms-and-conditions/`. The Laravel sitemap must emit only `/terms-and-conditions/`, and the redirect must remain. The baseline crawler must record both behaviors so the correction is intentional and test-covered.

