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
      // AI search bots — allow for GEO/AEO visibility (citations in AI search results)
      {
        userAgent: [
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "PerplexityBot",
          "Amazonbot",
        ],
        allow: "/",
        disallow: ["/admin/", "/api/", "/_next/"],
      },
      // AI training-only bots — block (protect content from training)
      {
        userAgent: [
          "GPTBot",
          "CCBot",
          "Google-Extended",
          "anthropic-ai",
          "Bytedance",
          "ByteSpider",
          "Meta-ExternalAgent",
          "cohere-ai",
          "Applebot-Extended",
        ],
        disallow: "/",
      },
      // SEO crawlers — block (saves bandwidth, use tools directly instead)
      {
        userAgent: [
          "AhrefsBot",
          "SemrushBot",
          "MJ12bot",
          "DotBot",
          "PetalBot",
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
