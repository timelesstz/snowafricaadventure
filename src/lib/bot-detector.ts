export type BotCategory = "good" | "bad" | "unknown";

interface BotPattern {
  pattern: RegExp;
  name: string;
  category: BotCategory;
}

// Common bot user-agent patterns, ordered from specific to generic
const BOT_PATTERNS: BotPattern[] = [
  // Good bots — Search Engines
  { pattern: /googlebot/i, name: "Googlebot", category: "good" },
  { pattern: /bingbot/i, name: "Bingbot", category: "good" },
  { pattern: /slurp/i, name: "Yahoo Slurp", category: "good" },
  { pattern: /duckduckbot/i, name: "DuckDuckBot", category: "good" },
  { pattern: /baiduspider/i, name: "Baiduspider", category: "good" },
  { pattern: /yandexbot/i, name: "YandexBot", category: "good" },

  // Good bots — Social Media
  { pattern: /facebot|facebookexternalhit/i, name: "Facebook Bot", category: "good" },
  { pattern: /twitterbot/i, name: "Twitter Bot", category: "good" },
  { pattern: /linkedinbot/i, name: "LinkedIn Bot", category: "good" },
  { pattern: /pinterest/i, name: "Pinterest Bot", category: "good" },
  { pattern: /whatsapp/i, name: "WhatsApp Bot", category: "good" },
  { pattern: /telegrambot/i, name: "Telegram Bot", category: "good" },

  // Good bots — Monitoring & Uptime
  { pattern: /uptimerobot/i, name: "UptimeRobot", category: "good" },
  { pattern: /pingdom/i, name: "Pingdom", category: "good" },
  { pattern: /statuspage/i, name: "StatusPage", category: "good" },
  { pattern: /site24x7/i, name: "Site24x7", category: "good" },

  // Bad bots — SEO Scrapers
  { pattern: /semrushbot/i, name: "SEMrush Bot", category: "bad" },
  { pattern: /ahrefsbot/i, name: "Ahrefs Bot", category: "bad" },
  { pattern: /mj12bot/i, name: "Majestic Bot", category: "bad" },
  { pattern: /dotbot/i, name: "DotBot", category: "bad" },
  { pattern: /petalbot/i, name: "PetalBot", category: "bad" },
  { pattern: /bytespider/i, name: "ByteSpider", category: "bad" },
  { pattern: /dataforseobot/i, name: "DataForSeoBot", category: "bad" },
  { pattern: /screaming frog/i, name: "Screaming Frog", category: "bad" },

  // Bad bots — AI Scrapers
  { pattern: /gptbot/i, name: "GPTBot", category: "bad" },
  { pattern: /ccbot/i, name: "CCBot", category: "bad" },
  { pattern: /claudebot/i, name: "ClaudeBot", category: "bad" },
  { pattern: /google-extended/i, name: "Google-Extended", category: "bad" },
  { pattern: /bytedance/i, name: "Bytedance", category: "bad" },

  // Bad bots — Headless Browsers
  { pattern: /headless/i, name: "Headless Browser", category: "bad" },
  { pattern: /phantomjs|phantom/i, name: "PhantomJS", category: "bad" },
  { pattern: /selenium/i, name: "Selenium", category: "bad" },
  { pattern: /puppeteer/i, name: "Puppeteer", category: "bad" },

  // Unknown — Generic Bot Patterns (keep last)
  { pattern: /bot/i, name: "Generic Bot", category: "unknown" },
  { pattern: /crawler/i, name: "Generic Crawler", category: "unknown" },
  { pattern: /spider/i, name: "Generic Spider", category: "unknown" },
];

export interface BotDetectionResult {
  isBot: boolean;
  botName?: string;
  category?: BotCategory;
}

/**
 * Detect if a user-agent string belongs to a bot
 */
export function detectBot(userAgent: string | null | undefined): BotDetectionResult {
  if (!userAgent) {
    return { isBot: false };
  }

  for (const { pattern, name, category } of BOT_PATTERNS) {
    if (pattern.test(userAgent)) {
      return { isBot: true, botName: name, category };
    }
  }

  return { isBot: false };
}

/**
 * Check if the user-agent looks like a real browser
 * Bots often have minimal or unusual user-agents
 */
export function isLikelyRealBrowser(userAgent: string | null | undefined): boolean {
  if (!userAgent) {
    return false;
  }

  // Check for common browser signatures
  const browserPatterns = [
    /Mozilla\/5\.0.*Chrome\//i,
    /Mozilla\/5\.0.*Firefox\//i,
    /Mozilla\/5\.0.*Safari\//i,
    /Mozilla\/5\.0.*Edge\//i,
    /Mozilla\/5\.0.*MSIE/i,
    /Mozilla\/5\.0.*Trident\//i,
  ];

  const looksLikeBrowser = browserPatterns.some((pattern) => pattern.test(userAgent));
  const { isBot } = detectBot(userAgent);

  return looksLikeBrowser && !isBot;
}
