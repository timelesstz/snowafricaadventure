import { describe, it, expect } from "vitest";
import { injectInternalLinks } from "@/lib/content-processor";
import type { LinkMapEntry } from "@/lib/internal-link-map";

const entry = (phrase: string, href: string): LinkMapEntry => ({ phrase, href, priority: 3 });

describe("injectInternalLinks", () => {
  it("links the first occurrence of a phrase", () => {
    const out = injectInternalLinks(
      "<p>Read about altitude sickness. More altitude sickness tips.</p>",
      [entry("altitude sickness", "/kilimanjaro-altitude-sickness/")]
    );
    expect(out.match(/<a /g)).toHaveLength(1);
    expect(out).toContain('<a href="/kilimanjaro-altitude-sickness/" class="internal-link">altitude sickness</a>');
  });

  it("matches whole words only", () => {
    const out = injectInternalLinks("<p>Check the baggage limit first.</p>", [
      entry("age limit", "/kilimanjaro-age-limits/"),
    ]);
    expect(out).not.toContain("<a ");
  });

  it("links each target page once, even through different phrases", () => {
    const out = injectInternalLinks(
      "<p>Kilimanjaro tipping is expected. See the tipping guide.</p>",
      [entry("Kilimanjaro tipping", "/kilimanjaro-tipping-guide/"), entry("tipping guide", "/kilimanjaro-tipping-guide/")]
    );
    expect(out.match(/<a /g)).toHaveLength(1);
  });

  it("skips a page the post already links to", () => {
    const html = '<p>Our <a href="/kilimanjaro-prices/">price list</a> covers Kilimanjaro budget questions.</p>';
    const out = injectInternalLinks(html, [entry("Kilimanjaro budget", "/kilimanjaro-prices/")]);
    expect(out).toBe(html);
  });

  it("never links the post to itself", () => {
    const out = injectInternalLinks("<p>The Barranco Wall is steep.</p>", [
      entry("Barranco Wall", "/kilimanjaro-barranco-wall/"),
    ], "kilimanjaro-barranco-wall");
    expect(out).not.toContain("<a ");
  });

  it("does not link inside headings or existing links", () => {
    const html = '<h2>Uhuru Peak</h2><p><a href="/x/">Uhuru Peak photos</a></p>';
    const out = injectInternalLinks(html, [entry("Uhuru Peak", "/kilimanjaro-uhuru-peak/")]);
    expect(out).toBe(html);
  });
});
