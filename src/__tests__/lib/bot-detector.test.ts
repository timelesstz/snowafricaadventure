import { describe, it, expect } from "vitest";
import { detectBot } from "@/lib/bot-detector";

// Real user-agent strings as each company publishes them.
const AI_CRAWLERS: [string, string][] = [
  ["GPTBot", "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.1; +https://openai.com/gptbot)"],
  ["OAI-SearchBot", "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot"],
  ["ChatGPT-User", "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/1.0; +https://openai.com/bot"],
  ["ClaudeBot", "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ClaudeBot/1.0; +claudebot@anthropic.com)"],
  ["Claude-SearchBot", "Mozilla/5.0 (compatible; Claude-SearchBot/1.0; +https://www.anthropic.com)"],
  ["Claude-User", "Mozilla/5.0 (compatible; Claude-User/1.0; +Claude-User@anthropic.com)"],
  ["PerplexityBot", "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)"],
  ["Perplexity-User", "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Perplexity-User/1.0; +https://perplexity.ai/perplexity-user)"],
  ["Applebot", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Safari/605.1.15 (Applebot/0.1; +http://www.apple.com/go/applebot)"],
  ["CCBot", "CCBot/2.0 (https://commoncrawl.org/faq/)"],
  ["Meta-ExternalAgent", "meta-externalagent/1.1 (+https://developers.facebook.com/docs/sharing/webmasters/crawler)"],
];

describe("detectBot: AI crawlers are let through", () => {
  it.each(AI_CRAWLERS)("%s is a good bot (not blocked, not rate limited)", (_name, ua) => {
    expect(detectBot(ua)).toMatchObject({ isBot: true, category: "good" });
  });

  it("Bytespider is allowed but stays rate limited", () => {
    expect(detectBot("Mozilla/5.0 (compatible; Bytespider; spider-feedback@bytedance.com)").category).toBe("unknown");
  });

  it("SEO scrapers are still blocked", () => {
    expect(detectBot("Mozilla/5.0 (compatible; AhrefsBot/7.0; +http://ahrefs.com/robot/)").category).toBe("bad");
    expect(detectBot("Mozilla/5.0 (compatible; SemrushBot/7~bl; +http://www.semrush.com/bot.html)").category).toBe("bad");
  });

  it("Googlebot and normal browsers are unchanged", () => {
    expect(detectBot("Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)").category).toBe("good");
    expect(detectBot("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36").isBot).toBe(false);
  });
});
