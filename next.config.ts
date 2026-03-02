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
        destination: "/trekking/3-days-2-nights-oldoinyo-lengai-climbing/",
        permanent: true,
      },
      {
        source: "/mount-kenya/",
        destination: "/trekking/",
        permanent: false,
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
