import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Good search engine bots — allow freely
      {
        userAgent: ["Googlebot", "Bingbot", "DuckDuckBot", "Slurp", "YandexBot"],
        allow: "/",
        disallow: ["/admin/", "/api/", "/_next/"],
      },
      // Good social media bots — allow freely
      {
        userAgent: [
          "facebookexternalhit",
          "Twitterbot",
          "LinkedInBot",
          "WhatsApp",
          "Pinterest",
          "TelegramBot",
        ],
        allow: "/",
        disallow: ["/admin/", "/api/", "/_next/"],
      },
      // Bad bots — block everything
      {
        userAgent: [
          "AhrefsBot",
          "SemrushBot",
          "MJ12bot",
          "DotBot",
          "PetalBot",
          "ByteSpider",
          "GPTBot",
          "CCBot",
          "ClaudeBot",
          "Google-Extended",
          "Bytedance",
          "DataForSeoBot",
        ],
        disallow: "/",
      },
      // All other bots — allow with crawl delay
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/_next/"],
        crawlDelay: 10,
      },
    ],
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
    host: SITE_CONFIG.url,
  };
}
