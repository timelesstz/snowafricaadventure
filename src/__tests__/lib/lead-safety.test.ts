import { describe, it, expect } from "vitest";
import {
  isPlausibleHoneypotLead,
  containsSpamSignals,
  isMalformedUserAgent,
  looksLikeGibberishName,
} from "@/lib/notifications/lead-safety";

describe("isPlausibleHoneypotLead", () => {
  const human = { email: "ana@example.test", name: "Ana Lopez", message: "Kilimanjaro in February?" };

  it("accepts a real-looking traveller", () => {
    expect(isPlausibleHoneypotLead(human)).toBe(true);
  });

  it("accepts trip fields in place of a message, and a single 4+ char name", () => {
    expect(isPlausibleHoneypotLead({ email: "x@example.test", name: "Ahmed", hasTripFields: true })).toBe(true);
  });

  it("rejects invalid email, short name or an empty submission", () => {
    expect(isPlausibleHoneypotLead({ ...human, email: "nope" })).toBe(false);
    expect(isPlausibleHoneypotLead({ ...human, name: "Al" })).toBe(false);
    expect(isPlausibleHoneypotLead({ email: human.email, name: human.name })).toBe(false);
  });

  it("rejects URLs and B2B pitch phrases", () => {
    expect(isPlausibleHoneypotLead({ ...human, message: "visit www.cheap.example" })).toBe(false);
    expect(isPlausibleHoneypotLead({ ...human, message: "Need a website redesign?" })).toBe(false);
    expect(isPlausibleHoneypotLead({ ...human, message: "Guest post offer" })).toBe(false);
  });

  it("does not trip on words that merely contain a phrase", () => {
    expect(containsSpamSignals("Best season for a Serengeti safari")).toBe(false);
    expect(containsSpamSignals("SEO services")).toBe(true);
  });

  // Shape of the Nov 2026 Tor bot wave on the article quote cards
  const CHROME_UA =
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36";
  const bot = {
    email: "a.jk.ott2.0.02@gmail.com",
    name: "Rixbxtl",
    message: "Quote request for 8 Days Lemosho Route, sent from the trip card in an article.",
    hasTripFields: true,
    userAgent: `"${CHROME_UA}"`,
  };

  it("rejects a quoted or missing User-Agent", () => {
    expect(isPlausibleHoneypotLead(bot)).toBe(false);
    expect(isPlausibleHoneypotLead({ ...human, userAgent: `"${CHROME_UA}"` })).toBe(false);
    expect(isPlausibleHoneypotLead({ ...human, userAgent: null })).toBe(false);
    expect(isPlausibleHoneypotLead({ ...human, userAgent: CHROME_UA })).toBe(true);
  });

  it("rejects a random-letter one-word name even with a clean User-Agent", () => {
    expect(isPlausibleHoneypotLead({ ...bot, userAgent: CHROME_UA })).toBe(false);
  });
});

describe("isMalformedUserAgent", () => {
  it("flags empty and quote-wrapped values only", () => {
    expect(isMalformedUserAgent("")).toBe(true);
    expect(isMalformedUserAgent(undefined)).toBe(true);
    expect(isMalformedUserAgent('"Mozilla/5.0 (X11)"')).toBe(true);
    expect(isMalformedUserAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)")).toBe(false);
  });
});

describe("looksLikeGibberishName", () => {
  it("flags random-letter names from the bot wave", () => {
    for (const n of ["Rixbxtl", "Fqhct", "Pkmnp", "Axxspwwxv"]) expect(looksLikeGibberishName(n)).toBe(true);
  });

  it("leaves real names alone", () => {
    for (const n of ["Schmidt", "Mariia", "Lynch", "Nacim BENNI", "Andy Cron", "Ahmed", "Koen den Hertog"])
      expect(looksLikeGibberishName(n)).toBe(false);
  });
});
