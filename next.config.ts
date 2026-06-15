import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // CRITICAL FOR SEO: WordPress uses trailing slashes
  trailingSlash: true,

  // Experimental performance optimizations
  experimental: {
    optimizePackageImports: ["lucide-react"],
    workerThreads: false,
  },

  images: {
    // Optimize image formats
    formats: ["image/avif", "image/webp"],
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.r2.cloudflarestorage.com",
      },
      {
        protocol: "https",
        hostname: "pub-cf9450d27ca744f1825d1e08b392f592.r2.dev",
      },
      {
        protocol: "https",
        hostname: "cdn.snowafricaadventure.com",
      },
      {
        protocol: "https",
        hostname: "snowafricaadventure.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  async redirects() {
    return [
      // WordPress admin panel → Next.js admin
      {
        source: "/wp-admin/:path*",
        destination: "/admin/login/",
        permanent: true,
      },

      // Redirect old WordPress image paths to R2
      {
        source: "/wp-content/uploads/:path*",
        destination: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/:path*",
        permanent: true,
      },

      // =====================================================
      // URL MIGRATION REDIRECTS (WordPress → Next.js)
      // =====================================================

      // Blog posts live at root level (/{slug}/) not /blog/{slug}/
      {
        source: "/blog/:slug/",
        destination: "/:slug/",
        permanent: true,
      },

      // Terms page URL difference
      {
        source: "/terms-conditions/",
        destination: "/terms-and-conditions/",
        permanent: true,
      },

      // Kilimanjaro guide section → blog
      {
        source: "/trekking/kilimanjaro-guide/",
        destination: "/blog/",
        permanent: true,
      },
      {
        source: "/trekking/kilimanjaro-guide/:slug/",
        destination: "/blog/",
        permanent: true,
      },

      // Trekking info pages → relevant blog posts
      {
        source: "/trekking/tipping-on-kilimanjaro/",
        destination: "/your-tipping-guide-for-tanzania/",
        permanent: true,
      },
      {
        source: "/trekking/training-to-climb-mt-kilimanjaro/",
        destination: "/climbing-mount-kilimanjaro/",
        permanent: true,
      },
      {
        source: "/trekking/mount-kilimanjaro-altitude-sickness/",
        destination: "/can-you-climb-kilimanjaro-with-asthma/",
        permanent: true,
      },
      {
        source: "/trekking/visa-for-kilimanjaro/",
        destination: "/contact-us/",
        permanent: true,
      },

      // Nested category URLs → parent category
      {
        source: "/category/tanzania-destinations/western-circuit/",
        destination: "/category/tanzania-destinations/",
        permanent: true,
      },
      {
        source: "/category/tanzania-destinations/southern-circuit/",
        destination: "/category/tanzania-destinations/",
        permanent: true,
      },
      {
        source: "/category/tanzania-destinations/northern-circuit/",
        destination: "/category/tanzania-destinations/",
        permanent: true,
      },

      // Old standalone pages → proper routes
      {
        source: "/africa-mount-kilimanjaro/",
        destination: "/trekking/",
        permanent: true,
      },
      {
        source: "/lemosho-route-kilimanjaro/",
        destination: "/trekking/8-days-lemosho-route/",
        permanent: true,
      },
      {
        source: "/group-tours-in-tanzania/",
        destination: "/kilimanjaro-join-group-departures/",
        permanent: true,
      },
      {
        source: "/mount-kilimanjaro-trekking/",
        destination: "/trekking/",
        permanent: true,
      },

      // Day Trips → Tanzania Day Tours (SEO rename)
      {
        source: "/day-trips/",
        destination: "/tanzania-day-tours/",
        permanent: true,
      },
      {
        source: "/day-trips/:slug/",
        destination: "/tanzania-day-tours/:slug/",
        permanent: true,
      },

      // =====================================================
      // TREKKING ROUTE CLEAN SLUG REDIRECTS
      // Clean URLs → actual DB slugs (with duration prefix)
      // =====================================================
      {
        source: "/trekking/lemosho-route/",
        destination: "/trekking/8-days-lemosho-route/",
        permanent: true,
      },
      {
        source: "/trekking/machame-route/",
        destination: "/trekking/7-days-machame-route/",
        permanent: true,
      },
      {
        source: "/trekking/marangu-route/",
        destination: "/trekking/6-days-marangu-route/",
        permanent: true,
      },
      {
        source: "/trekking/rongai-route/",
        destination: "/trekking/7-days-rongai-route/",
        permanent: true,
      },
      {
        source: "/trekking/umbwe-route/",
        destination: "/trekking/6-days-umbwe-route/",
        permanent: true,
      },
      // Northern Circuit & Western Breach have no dedicated pages yet
      {
        source: "/trekking/northern-circuit-route/",
        destination: "/trekking/",
        permanent: false,
      },
      {
        source: "/trekking/western-breach-route/",
        destination: "/trekking/8-days-lemosho-route/",
        permanent: false,
      },

      // =====================================================
      // SAFARI PACKAGE CLEAN SLUG REDIRECTS
      // =====================================================
      {
        source: "/tanzania-safaris/3-day-budget-safari/",
        destination: "/tanzania-safaris/3-days-tanzania-budget-camping-safari-tarangire-lake-manyara-and-ngorongoro-crater/",
        permanent: true,
      },
      {
        source: "/tanzania-safaris/5-day-northern-circuit-safari/",
        destination: "/tanzania-safaris/5-days-tanzania-luxury-safarilake-manyara-serengeti-ngorongoro/",
        permanent: true,
      },
      {
        source: "/tanzania-safaris/7-day-great-migration-safari/",
        destination: "/tanzania-safaris/6-days-tanzania-migration-safari-ndutu-manyara-serengeti-ngorongoro-crater/",
        permanent: true,
      },

      // =====================================================
      // MOUNTAIN PAGES → DEDICATED TREKKING ROUTES
      // =====================================================
      {
        source: "/mount-meru/",
        destination: "/trekking/4-days-mount-meru-climbing/",
        permanent: true,
      },
      {
        source: "/ol-doinyo-lengai/",
        destination: "/trekking/3-days-oldoinyo-lengai-climbing/",
        permanent: true,
      },
      {
        source: "/mount-kenya/",
        destination: "/trekking/",
        permanent: false,
      },

      // =====================================================
      // DUPLICATE CONTENT CONSOLIDATION
      // =====================================================
      // Year-specific "best time" post → canonical evergreen URL
      {
        source: "/2025-best-time-to-climb-mount-kilimanjaro/",
        destination: "/best-time-to-climb-mount-kilimanjaro/",
        permanent: true,
      },

      // =====================================================
      // POORLY FORMATTED URL FIXES (slug cleanup → new canonical URLs)
      // =====================================================
      // Blog post: too long + "ofelephants" typo
      {
        source: "/go-next-door-ofelephants-big-cats-wildebeests-and-many-more-opt-for-tanzania-safari/",
        destination: "/tanzania-safari-wildlife/",
        permanent: true,
      },
      // Safari: 101-char slug with "safaritarangire" typo
      {
        source: "/tanzania-safaris/6-days-tanzania-lodge-and-luxury-tented-camp-safaritarangire-lake-manyara-serengeti-ngorongoro-crater/",
        destination: "/tanzania-safaris/6-day-lodge-safari-northern-circuit/",
        permanent: true,
      },
      // Blog post: 94-char stop-word-heavy slug
      {
        source: "/the-smartest-packing-list-for-kilimanjaro-climbing-increase-your-trekking-experience-up-to-100/",
        destination: "/kilimanjaro-trekking-packing-list/",
        permanent: true,
      },
      // Trekking route: verbose "3-days-2-nights" pattern
      {
        source: "/trekking/3-days-2-nights-oldoinyo-lengai-climbing/",
        destination: "/trekking/3-days-oldoinyo-lengai-climbing/",
        permanent: true,
      },

      // =====================================================
      // BLOG POSTS — redirected to equivalent existing posts
      // (original slugs not in DB; content exists under different slugs)
      // =====================================================
      {
        source: "/best-time-climb-kilimanjaro/",
        destination: "/best-time-to-climb-mount-kilimanjaro/",
        permanent: true,
      },
      {
        source: "/best-time-visit-tanzania/",
        destination: "/best-time-to-visit-tanzania-for-safari/",
        permanent: true,
      },
      {
        source: "/great-migration-guide/",
        destination: "/great-wildebeest-migration/",
        permanent: true,
      },
      {
        source: "/kilimanjaro-packing-list/",
        destination: "/mount-kilimanjaro-packing-list-2025/",
        permanent: true,
      },
      {
        source: "/machame-vs-lemosho-route-comparison/",
        destination: "/trekking/",
        permanent: true,
      },
      {
        source: "/safari-photography-tips/",
        destination: "/photography-safari-tanzania/",
        permanent: true,
      },
      {
        source: "/tanzania-visa-requirements/",
        destination: "/contact-us/",
        permanent: true,
      },
      {
        source: "/things-to-do-zanzibar/",
        destination: "/zanzibar-beach-escapes/",
        permanent: true,
      },

      // WordPress date archive URLs → blog index
      {
        source: "/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/",
        destination: "/blog/",
        permanent: true,
      },
      // Old WordPress posts → matching content
      {
        source: "/10-reasons-why-you-should-go-for-tanzania-safari-to-see-the-great-migration/",
        destination: "/great-wildebeest-migration/",
        permanent: true,
      },
      {
        source: "/how-high-is-kilimanjaro-mountain/",
        destination: "/mount-kilimanjaro-height/",
        permanent: true,
      },

      // SEO playbook §3 — 404 recovery for high-traffic broken URLs
      {
        source: "/tanzania-safari-packing-list/",
        destination: "/the-ultimate-kilimanjaro-packing-list/",
        permanent: true,
      },
      {
        source: "/kilimanjaro-record/",
        destination: "/kilimanjaro-statistics/",
        permanent: true,
      },
      {
        source: "/eco-safari-lodges-in-tanzania-sustainable-travel-insights/",
        destination: "/tanzania-safaris/",
        permanent: true,
      },
      {
        source: "/sustainability/",
        destination: "/about-us/",
        permanent: true,
      },
      {
        source: "/arusha-national-park-day-tour/",
        destination: "/tanzania-day-tours/",
        permanent: true,
      },
      // Consolidate duplicate pricing intent into canonical page
      {
        source: "/how-much-to-climb-kilimanjaro/",
        destination: "/kilimanjaro-prices/",
        permanent: true,
      },

      // Common alternate URLs → canonical routes
      {
        source: "/kilimanjaro-trekking/",
        destination: "/trekking/",
        permanent: true,
      },
      {
        source: "/destinations/",
        destination: "/tanzania-destinations/",
        permanent: true,
      },
      {
        source: "/contact/",
        destination: "/contact-us/",
        permanent: true,
      },

      // Duplicate content consolidation — group climbing → group climbs
      {
        source: "/kilimanjaro-group-climbing/",
        destination: "/kilimanjaro-group-climbs/",
        permanent: true,
      },

      // =====================================================
      // CASE-SENSITIVE & INCOMPLETE URL FIXES (GSC noindex)
      // =====================================================
      // Capital K variant — handled by middleware lowercase redirect
      // {
      //   source: "/Kilimanjaro-join-group-departures/",
      //   destination: "/kilimanjaro-join-group-departures/",
      //   permanent: true,
      // },
      // {
      //   source: "/Kilimanjaro-join-group-departures",
      //   destination: "/kilimanjaro-join-group-departures/",
      //   permanent: true,
      // },
      // Incomplete URL fragments — handled by middleware lowercase redirect instead
      // These were causing redirect loops (matching /kilimanjaro-join-group-departures/ as prefix)
      // {
      //   source: "/kilimanjaro-join-/",
      //   destination: "/kilimanjaro-join-group-departures/",
      //   permanent: true,
      // },
      // {
      //   source: "/kilimanjaro-join-",
      //   destination: "/kilimanjaro-join-group-departures/",
      //   permanent: true,
      // },
      // Case-sensitive blog slug fix — handled by middleware lowercase redirect
      // Next.js matches redirects case-insensitively, causing infinite loops
      // {
      //   source: "/50-reasons-to-visit-Tanzania/",
      //   destination: "/50-reasons-to-visit-tanzania/",
      //   permanent: true,
      // },

      // =====================================================
      // OLD STANDALONE PAGE URLS (no /trekking/ prefix)
      // =====================================================
      {
        source: "/marangu-route/",
        destination: "/trekking/6-days-marangu-route/",
        permanent: true,
      },
      {
        source: "/umbwe-route/",
        destination: "/trekking/6-days-umbwe-route/",
        permanent: true,
      },
      {
        source: "/6-days-umbwe-route/",
        destination: "/trekking/6-days-umbwe-route/",
        permanent: true,
      },
      {
        source: "/tanzania-northern-circuit/",
        destination: "/trekking/9-days-northern-circuit-route/",
        permanent: true,
      },
      {
        source: "/mount-kilimanjaro/",
        destination: "/trekking/",
        permanent: true,
      },
      {
        source: "/4-days-mount-meru/",
        destination: "/trekking/4-days-mount-meru-climbing/",
        permanent: true,
      },

      // =====================================================
      // DESTINATION PAGES WITHOUT PREFIX
      // =====================================================
      {
        source: "/arusha-national-park/",
        destination: "/tanzania-destinations/arusha-national-park/",
        permanent: true,
      },
      {
        source: "/tarangire-national-park/",
        destination: "/tanzania-destinations/tarangire-national-park/",
        permanent: true,
      },
      {
        source: "/mkomazi-national-park/",
        destination: "/tanzania-destinations/mkomazi-national-park/",
        permanent: true,
      },
      {
        source: "/ngorongoro-conservation-area/",
        destination: "/tanzania-destinations/ngorongoro-conservation-area/",
        permanent: true,
      },
      {
        source: "/tanzania-destination/",
        destination: "/tanzania-destinations/",
        permanent: true,
      },

      // =====================================================
      // OLD WORDPRESS PAGES → RELEVANT CURRENT PAGES
      // =====================================================
      {
        source: "/packing-guide/",
        destination: "/kilimanjaro-trekking-packing-list/",
        permanent: true,
      },
      {
        source: "/faqs/",
        destination: "/contact-us/",
        permanent: true,
      },
      {
        source: "/tanzania-travel-itineraries/",
        destination: "/tanzania-safaris/",
        permanent: true,
      },
      {
        source: "/term-conditions/",
        destination: "/terms-and-conditions/",
        permanent: true,
      },
      {
        source: "/tanzania-safety/",
        destination: "/tanzania-safari-faqs/",
        permanent: true,
      },
      {
        source: "/kilimanjaro-rescue/",
        destination: "/climbing-kilimanjaro/",
        permanent: true,
      },
      {
        source: "/tanzania-tourist-visa/",
        destination: "/things-to-remember-before-climbing-mount-kilimanjaro/",
        permanent: true,
      },
      // Typo in crawled URL (missing trailing 't')
      {
        source: "/kilimanjaros-2025-wildlife-forecas/",
        destination: "/kilimanjaros-2025-wildlife-forecast/",
        permanent: true,
      },
      // Safari variant slug
      {
        source: "/tanzania-safaris/tanzania-luxury-safaris/",
        destination: "/tanzania-safaris/",
        permanent: true,
      },

      // =====================================================
      // WORDPRESS ARTIFACTS
      // =====================================================
      {
        source: "/author/:slug/",
        destination: "/about-us/",
        permanent: true,
      },
      {
        source: "/sitemap_index.xml",
        destination: "/sitemap.xml",
        permanent: true,
      },

      // Old WordPress sitemap URLs → Next.js sitemap
      {
        source: "/post-sitemap.xml",
        destination: "/sitemap.xml",
        permanent: true,
      },
      {
        source: "/page-sitemap.xml",
        destination: "/sitemap.xml",
        permanent: true,
      },
      {
        source: "/category-sitemap.xml",
        destination: "/sitemap.xml",
        permanent: true,
      },

      // Spam e-commerce category URLs (Etsy-like /c/ paths from bot traffic)
      {
        source: "/c/:path*",
        destination: "/",
        permanent: false,
      },

      // Destination pages without /tanzania-destinations/ prefix
      {
        source: "/kitulo-national-park/",
        destination: "/tanzania-destinations/kitulo-national-park/",
        permanent: true,
      },
      {
        source: "/lake-manyara-national-park/",
        destination: "/tanzania-destinations/lake-manyara-national-park/",
        permanent: true,
      },
      {
        source: "/ruaha-national-park/",
        destination: "/tanzania-destinations/ruaha-national-park/",
        permanent: true,
      },

      // Trekking routes without /trekking/ prefix
      {
        source: "/machame-route/",
        destination: "/trekking/7-days-machame-route/",
        permanent: true,
      },
      {
        source: "/rongai-route/",
        destination: "/trekking/7-days-rongai-route/",
        permanent: true,
      },
      {
        source: "/lemosho-route/",
        destination: "/trekking/8-days-lemosho-route/",
        permanent: true,
      },
      {
        source: "/mountain-trekking/",
        destination: "/trekking/",
        permanent: true,
      },

      // Day trip "tour" → "trip" slug corrections
      {
        source: "/arusha-city-day-tour/",
        destination: "/tanzania-day-tours/arusha-city-day-trip/",
        permanent: true,
      },
      {
        source: "/tarangire-national-park-day-tour/",
        destination: "/tanzania-day-tours/tarangire-national-park-day-trip/",
        permanent: true,
      },
      {
        source: "/lake-manyara-day-tour/",
        destination: "/tanzania-day-tours/lake-manyara-day-trip/",
        permanent: true,
      },

      // Safari package slug variants
      {
        source: "/tanzania-safaris/4-days-tanzania-lodge-safari/",
        destination: "/tanzania-safaris/4-day-safari-adventure-in-tanzania/",
        permanent: true,
      },
      {
        source: "/tanzania-safaris/7-days-tanzania-tented-camp-safari-2/",
        destination: "/tanzania-safaris/7-days-tanzania-tented-camp-safari/",
        permanent: true,
      },
      {
        source: "/tanzania-safaris/7-days-safari-to-tanzania-serval-wildlife/",
        destination: "/tanzania-safaris/7-days-safari-to-tanzania-including-serval-wildlife/",
        permanent: true,
      },
      {
        source: "/6-day-migration-safari-ndutu-manyara-sere-ngorongorocrater/",
        destination: "/tanzania-safaris/6-days-tanzania-migration-serengeti-ngorongoro-crater-tarangire/",
        permanent: true,
      },
      {
        source: "/7-days-walking-safari-ngorongoro-highland/",
        destination: "/tanzania-safaris/walking-safari-trekking-on-ngorongoro/",
        permanent: true,
      },

      // Blog post slug variants → existing content
      {
        source: "/wildlife-conservation-efforts-in-tanzania-how-tourists-can-contribute/",
        destination: "/wildlife-conservation-efforts/",
        permanent: true,
      },
      {
        source: "/snow-covered-destinations-in-africa/",
        destination: "/is-there-snow-in-africa-mountains/",
        permanent: true,
      },
      {
        source: "/kilimanjaro-routes-success-rates/",
        destination: "/kilimanjaro-success-rates/",
        permanent: true,
      },
      {
        source: "/kilimanjaro-climb-gear-list/",
        destination: "/kilimanjaro-climbing-gear/",
        permanent: true,
      },
      {
        source: "/cultural-festivals-in-tanzania/",
        destination: "/tanzania-festival/",
        permanent: true,
      },
      {
        source: "/visa-for-kilimanjaro/",
        destination: "/things-to-remember-before-climbing-mount-kilimanjaro/",
        permanent: true,
      },
      {
        source: "/3-days-2-nights-oldoinyolengai/",
        destination: "/trekking/3-days-oldoinyo-lengai-climbing/",
        permanent: true,
      },
      {
        source: "/mount-kilimanjaro-altitude-sickness/",
        destination: "/kilimanjaro-altitude-sickness/",
        permanent: true,
      },
      {
        source: "/conquering-the-roof-of-africa-the-inspiring-journey-of-the-first-person-to-climb-mount-kilimanjaro/",
        destination: "/first-person-to-climb-kilimanjaro/",
        permanent: true,
      },
      {
        source: "/maasai-healing-rituals-tanzania-ancient-wellness-in-geothermal-settings/",
        destination: "/maasai-healing-rituals-tanzania/",
        permanent: true,
      },

      // Legal/misc page redirects
      {
        source: "/legal/ip/",
        destination: "/privacy-policy/",
        permanent: true,
      },
      {
        source: "/legal/terms-of-use/",
        destination: "/terms-and-conditions/",
        permanent: true,
      },
      {
        source: "/meru1.html",
        destination: "/trekking/4-days-mount-meru-climbing/",
        permanent: true,
      },

      // Additional destination pages without prefix
      {
        source: "/katavi-national-park/",
        destination: "/tanzania-destinations/katavi-national-park/",
        permanent: true,
      },
      {
        source: "/rubondo-national-park/",
        destination: "/tanzania-destinations/rubondo-island-national-park/",
        permanent: true,
      },

      // Additional route/tour slug variants
      {
        source: "/login/",
        destination: "/admin/login/",
        permanent: true,
      },
      {
        source: "/tours/",
        destination: "/tanzania-safaris/",
        permanent: true,
      },
      {
        source: "/how-tall-is-kilimanjaro/",
        destination: "/how-tall-is-mount-kilimanjaro/",
        permanent: true,
      },
      {
        source: "/all-groups-tours/",
        destination: "/kilimanjaro-join-group-departures/",
        permanent: true,
      },
      {
        source: "/climbing-mount-kilimanjaro-packages/",
        destination: "/trekking/",
        permanent: true,
      },
      {
        source: "/best-time-for-safari-in-africa/",
        destination: "/best-time-to-go-on-safari-in-africa/",
        permanent: true,
      },
      {
        source: "/faq/",
        destination: "/tanzania-safari-faqs/",
        permanent: true,
      },
      {
        source: "/join-group-tour/",
        destination: "/kilimanjaro-join-group-departures/",
        permanent: true,
      },
      {
        source: "/kilimanjaro-porter/",
        destination: "/ethical-kilimanjaro-porter-welfare/",
        permanent: true,
      },
      {
        source: "/safaris/",
        destination: "/tanzania-safaris/",
        permanent: true,
      },
      {
        source: "/kilimanjaro/",
        destination: "/trekking/",
        permanent: true,
      },
      {
        source: "/tailormade-form/",
        destination: "/tailor-made-safari/",
        permanent: true,
      },
      {
        source: "/group-tours/",
        destination: "/kilimanjaro-join-group-departures/",
        permanent: true,
      },
      {
        source: "/inquire/",
        destination: "/contact-us/",
        permanent: true,
      },

      // Safari slug variants without /tanzania-safaris/ prefix
      {
        source: "/3-days-budget-camping-safari-tarangire-lake-manyara-ngorongoro-crater/",
        destination: "/tanzania-safaris/3-days-tanzania-budget-camping-safari-tarangire-lake-manyara-and-ngorongoro-crater/",
        permanent: true,
      },
      {
        source: "/5-days-luxury-safari-lakemanyara-serengeti-ngorongoro/",
        destination: "/tanzania-safaris/5-days-tanzania-luxury-safari-tarangire-manyara-ngorongoro/",
        permanent: true,
      },
      {
        source: "/tanzania-safaris/7-days-tanzania-lodge-safari/",
        destination: "/tanzania-safaris/",
        permanent: true,
      },
      {
        source: "/tanzania-safaris/9-days-tanzania-wildlife-safari/",
        destination: "/tanzania-safaris/9-days-tanzania-wildlife-safari-migration/",
        permanent: true,
      },
      {
        source: "/tanzania-safaris/3-days-tanzania-lodge-safari/",
        destination: "/tanzania-safaris/3-days-tanzania-lodge-safari-tarangire-lake-manyara-ngorongoro-crater/",
        permanent: true,
      },
      {
        source: "/tanzania-safaris/7-days-northern-circuit-safari/",
        destination: "/tanzania-safaris/",
        permanent: true,
      },
      {
        source: "/7-days-luxury-tented-camp-safari-including-great-wildebeest-migration-serengeti-northern-corridor/",
        destination: "/tanzania-safaris/7-days-tanzania-tented-camp-safari/",
        permanent: true,
      },
      {
        source: "/tanzania-safaris/7-days-6-nights-walking-safari-on-ngorongoro-highlands/",
        destination: "/tanzania-safaris/walking-safari-trekking-on-ngorongoro/",
        permanent: true,
      },

      // Blog slug variants
      {
        source: "/kilimanjaro-climbing-routes-which-one-is-right-for-you/",
        destination: "/kilimanjaro-climbing-routes/",
        permanent: true,
      },
      {
        source: "/coffee-plantation-yoga-mindfulness-retreats-in-tanzania/",
        destination: "/coffee-mindfulness-tanzania/",
        permanent: true,
      },
      {
        source: "/rift-valley-volcano-hikes-exploring-crater-landscapes-beyond-kilimanjaro/",
        destination: "/rift-valley-volcano-hikes/",
        permanent: true,
      },
      {
        source: "/mount-kilimanjaro-lemosho-route-your-ultimate-guide-to-an-unforgettable-climb/",
        destination: "/lemosho-route-kilimanjaro/",
        permanent: true,
      },
      {
        source: "/tanzania-safari-tours-faqs/",
        destination: "/tanzania-safari-faqs/",
        permanent: true,
      },
      {
        source: "/kilimanjaro-health-and-safety/",
        destination: "/kilimanjaro-altitude-sickness/",
        permanent: true,
      },
      {
        source: "/kilimanjaro-travel-faqs/",
        destination: "/things-to-remember-before-climbing-mount-kilimanjaro/",
        permanent: true,
      },
      {
        source: "/tanzania-health-safaety/",
        destination: "/tanzania-safari-faqs/",
        permanent: true,
      },
      {
        source: "/tanzania-cultural-tour/",
        destination: "/tanzania-festival/",
        permanent: true,
      },

      // Old standalone trekking routes without /trekking/ prefix
      {
        source: "/6-days-marangu-route/",
        destination: "/trekking/6-days-marangu-route/",
        permanent: true,
      },
      {
        source: "/6-days-machame-route/",
        destination: "/trekking/6-days-machame-route/",
        permanent: true,
      },
      {
        source: "/7-days-machame-route/",
        destination: "/trekking/7-days-machame-route/",
        permanent: true,
      },
      {
        source: "/6-days-rongai-route/",
        destination: "/trekking/6-days-rongai-route/",
        permanent: true,
      },

      // Old static HTML pages
      {
        source: "/northern.html",
        destination: "/trekking/9-day-northern-circuit-route-kilimanjaro-guide/",
        permanent: true,
      },

      // Spam/external platform URLs → homepage
      {
        source: "/featured/:path*",
        destination: "/",
        permanent: false,
      },
      {
        source: "/legal/:path*",
        destination: "/terms-and-conditions/",
        permanent: false,
      },
      {
        source: "/dashboard/:path*",
        destination: "/",
        permanent: false,
      },

      // WooCommerce pages → homepage
      {
        source: "/my-account/",
        destination: "/",
        permanent: true,
      },
      {
        source: "/cart/",
        destination: "/",
        permanent: true,
      },
      {
        source: "/checkout/",
        destination: "/",
        permanent: true,
      },
      {
        source: "/shop/",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
