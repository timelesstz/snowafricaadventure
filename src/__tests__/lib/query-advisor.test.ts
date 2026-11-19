import { describe, it, expect } from "vitest";
import {
  analyzeQuery,
  classifyIntent,
  generateTopInsights,
  pageTargetsQuery,
  type QueryMetrics,
} from "@/lib/seo-dashboard/query-advisor";

// Rows taken from the live Search Console report (28 days to 2026-11-17).
const q = (
  query: string,
  clicks: number,
  impressions: number,
  ctr: number,
  position: number,
  topPage: string
): QueryMetrics => ({ query, clicks, impressions, ctr, position, topPage });

describe("classifyIntent", () => {
  it("does not treat 'rate' inside a phrase as a pricing signal", () => {
    expect(classifyIntent("lion kill rate")).toBe("informational");
  });

  it("matches plural and whole-word signals", () => {
    expect(classifyIntent("kilimanjaro group departures")).toBe("transactional");
    expect(classifyIntent("best tour operator in tanzania")).toBe("transactional");
    expect(classifyIntent("kilimanjaro price list")).toBe("transactional");
  });

  it("treats bare 'snow africa' as a topic, not the brand", () => {
    expect(classifyIntent("snow africa")).toBe("informational");
    expect(classifyIntent("snow africa adventures")).toBe("branded");
  });
});

describe("pageTargetsQuery", () => {
  it("recognises a dedicated page from its slug", () => {
    expect(pageTargetsQuery("kilimanjaro group departures", "/kilimanjaro-join-group-departures/")).toBe(true);
    expect(pageTargetsQuery("best tour operator in tanzania", "/best-tour-operator-in-tanzania/")).toBe(true);
    expect(pageTargetsQuery("where is mount kilimanjaro", "/where-is-mount-kilimanjaro/")).toBe(true);
  });

  it("rejects unrelated pages and the homepage", () => {
    expect(pageTargetsQuery("hottest continent in the world", "/is-there-snow-in-africa-mountains/")).toBe(false);
    expect(pageTargetsQuery("africa adventures", "/")).toBe(false);
  });
});

describe("analyzeQuery", () => {
  it("does not call an existing dedicated page a content gap", () => {
    const a = analyzeQuery(q("kilimanjaro group departures", 1, 216, 0.54, 39.7, "/kilimanjaro-join-group-departures/"));
    expect(a.tag).toBe("weak-page");
    expect(a.actions.join(" ")).not.toMatch(/create a (new|comprehensive) page/i);
  });

  it("does not tell a #1-2 query to push to the top 3", () => {
    expect(analyzeQuery(q("tanzania festivals", 0, 2, 0, 1, "/tanzania-festival/")).label).not.toBe("Push to Top 3");
    expect(analyzeQuery(q("what is the tallest mountain", 0, 12, 0, 2, "/kilimanjaro-vs-everest/")).label).not.toBe("Push to Top 3");
  });

  it("marks queries with very few impressions as too little data", () => {
    expect(analyzeQuery(q("картинки", 0, 1, 0, 2, "/kilimanjaro-training-plan/")).label).toBe("Too Little Data");
  });

  it("flags the brand query at #3 as not #1", () => {
    expect(analyzeQuery(q("snow africa adventures", 25, 168, 15.06, 3, "/")).label).toBe("Brand Not #1");
  });

  it("still flags a real page-1 CTR problem", () => {
    expect(analyzeQuery(q("snowy mountains in africa", 1, 109, 0.5, 3.6, "/is-there-snow-in-africa-mountains/")).tag).toBe("quick-win");
  });
});

describe("generateTopInsights", () => {
  it("keeps targeted pages out of the content-gap insight", () => {
    const insights = generateTopInsights([
      q("kilimanjaro group departures", 1, 216, 0.54, 39.7, "/kilimanjaro-join-group-departures/"),
      q("best tour operator in tanzania", 1, 56, 3.03, 39.4, "/best-tour-operator-in-tanzania/"),
    ]);
    const gap = insights.find((i) => i.title.startsWith("Content Gaps"));
    const weak = insights.find((i) => i.title.startsWith("Existing Pages"));
    expect(gap).toBeUndefined();
    expect(weak?.queries).toEqual(["kilimanjaro group departures", "best tour operator in tanzania"]);
  });
});
