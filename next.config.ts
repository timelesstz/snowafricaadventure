import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // CRITICAL FOR SEO: WordPress uses trailing slashes
  trailingSlash: true,

  images: {
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
