import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Good search engine bots — allow freely
      {
        userAgent: ["Googlebot", "Bingbot", "DuckDuckBot", "Slurp", "YandexBot"],
        allow: "/",
        disallow: ["/admin/", "/api/"],
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
        disallow: ["/admin/", "/api/"],
      },
      // AI crawlers — search, live answers and training all allowed, so ChatGPT,
      // Claude, Perplexity, Gemini, Apple, Meta and others can read, cite and
      // recommend the site. (src/lib/bot-detector.ts lets the same bots through.)
      {
        userAgent: [
          // OpenAI
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          // Anthropic
          "ClaudeBot",
          "Claude-SearchBot",
          "Claude-User",
          // Perplexity
          "PerplexityBot",
          "Perplexity-User",
          // Google (Gemini and Vertex AI grounding; not used for Search)
          "Google-Extended",
          // Apple
          "Applebot",
          "Applebot-Extended",
          // Others
          "Amazonbot",
          "Meta-ExternalAgent",
          "Meta-ExternalFetcher",
          "CCBot",
          "cohere-ai",
          "MistralAI-User",
          "DuckAssistBot",
          "Bytespider",
        ],
        allow: "/",
        disallow: ["/admin/", "/api/"],
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
        disallow: ["/admin/", "/api/"],
        crawlDelay: 10,
      },
    ],
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
    host: SITE_CONFIG.url,
  };
}
