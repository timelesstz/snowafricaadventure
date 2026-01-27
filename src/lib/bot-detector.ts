// Common bot user-agent patterns
const BOT_PATTERNS: { pattern: RegExp; name: string }[] = [
  // Search Engine Bots
  { pattern: /googlebot/i, name: "Googlebot" },
  { pattern: /bingbot/i, name: "Bingbot" },
  { pattern: /slurp/i, name: "Yahoo Slurp" },
  { pattern: /duckduckbot/i, name: "DuckDuckBot" },
  { pattern: /baiduspider/i, name: "Baiduspider" },
  { pattern: /yandexbot/i, name: "YandexBot" },

  // Social Media Bots
  { pattern: /facebot|facebookexternalhit/i, name: "Facebook Bot" },
  { pattern: /twitterbot/i, name: "Twitter Bot" },
  { pattern: /linkedinbot/i, name: "LinkedIn Bot" },
  { pattern: /pinterest/i, name: "Pinterest Bot" },
  { pattern: /whatsapp/i, name: "WhatsApp Bot" },
  { pattern: /telegrambot/i, name: "Telegram Bot" },

  // SEO & Analytics Bots
  { pattern: /semrushbot/i, name: "SEMrush Bot" },
  { pattern: /ahrefsbot/i, name: "Ahrefs Bot" },
  { pattern: /mj12bot/i, name: "Majestic Bot" },
  { pattern: /dotbot/i, name: "DotBot" },
  { pattern: /petalbot/i, name: "PetalBot" },
  { pattern: /bytespider/i, name: "ByteSpider" },
  { pattern: /screaming frog/i, name: "Screaming Frog" },

  // Monitoring & Uptime Bots
  { pattern: /uptimerobot/i, name: "UptimeRobot" },
  { pattern: /pingdom/i, name: "Pingdom" },
  { pattern: /statuspage/i, name: "StatusPage" },
  { pattern: /site24x7/i, name: "Site24x7" },

  // Generic Bot Patterns (keep last)
  { pattern: /bot/i, name: "Generic Bot" },
  { pattern: /crawler/i, name: "Generic Crawler" },
  { pattern: /spider/i, name: "Generic Spider" },
  { pattern: /headless/i, name: "Headless Browser" },
  { pattern: /phantom/i, name: "PhantomJS" },
  { pattern: /selenium/i, name: "Selenium" },
  { pattern: /puppeteer/i, name: "Puppeteer" },
];

export interface BotDetectionResult {
  isBot: boolean;
  botName?: string;
}

/**
 * Detect if a user-agent string belongs to a bot
 */
export function detectBot(userAgent: string | null | undefined): BotDetectionResult {
  if (!userAgent) {
    return { isBot: false };
  }

  for (const { pattern, name } of BOT_PATTERNS) {
    if (pattern.test(userAgent)) {
      return { isBot: true, botName: name };
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
