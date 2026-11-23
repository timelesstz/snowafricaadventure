import { describe, expect, it } from "vitest";
import {
  buildIdea,
  classifyQuery,
  clusterQueries,
  refreshPriority,
  refreshReasons,
  type IdeaContent,
} from "@/lib/seo-intel/content-ideas";
import { EMPTY_AGG, type QueryPageRow } from "@/lib/seo-intel/rules";

const row = (query: string, page: string, impressions: number, position: number, clicks = 0): QueryPageRow => ({
  query,
  page,
  impressions,
  position,
  clicks,
});

const content: IdeaContent[] = [
  { id: "r1", kind: "route", title: "8 Days Lemosho Route", slug: "8-days-lemosho-route", path: "/trekking/8-days-lemosho-route/", isLive: true },
  { id: "r2", kind: "route", title: "6 Days Umbwe Route", slug: "6-days-umbwe-route", path: "/trekking/6-days-umbwe-route/", isLive: true },
  { id: "b1", kind: "blog", title: "Kilimanjaro Umbwe Route", slug: "kilimanjaro-umbwe-route", path: "/kilimanjaro-umbwe-route/", isLive: true },
  { id: "b2", kind: "blog", title: "How much to climb Kilimanjaro", slug: "how-much-to-climb-kilimanjaro", path: "/how-much-to-climb-kilimanjaro/", isLive: true },
  { id: "b3", kind: "blog", title: "Kilimanjaro weight loss", slug: "kilimanjaro-weight-loss", path: "/kilimanjaro-weight-loss/", isLive: true },
  { id: "d1", kind: "blog", title: "Old draft on cost", slug: "kilimanjaro-cost-draft", path: "/kilimanjaro-cost-draft/", isLive: false },
];

describe("classifyQuery", () => {
  it("finds the route, the intent and the trip length", () => {
    const c = classifyQuery("Lemosho route 8 days")!;
    expect(c.topic.id).toBe("lemosho");
    expect(c.intent.id).toBe("itinerary");
    expect(c.days).toBe(8);
  });
  it("groups price searches in other languages", () => {
    expect(classifyQuery("kilimanjaro beklimmen kosten")!.intent.id).toBe("price");
    expect(classifyQuery("how much to climb kilimanjaro")!.intent.id).toBe("price");
  });
  it("keeps the Northern Circuit trek apart from the safari circuit", () => {
    expect(classifyQuery("northern circuit kilimanjaro")!.topic.id).toBe("northern-circuit-route");
    expect(classifyQuery("tanzania northern circuit safari")!.topic.id).toBe("safari");
  });
  it("ignores brand and off-topic searches", () => {
    expect(classifyQuery("snow africa adventures")).toBeNull();
    expect(classifyQuery("lion vs lioness")).toBeNull();
    expect(classifyQuery("does it snow in africa")).toBeNull();
  });
});

describe("clusterQueries", () => {
  it("merges variants and drops groups below the threshold", () => {
    const clusters = clusterQueries(
      [
        row("cost to climb kilimanjaro", "/kilimanjaro-prices/", 150, 55),
        row("kilimanjaro climbing cost", "/kilimanjaro-prices/", 120, 58),
        row("umbwe route map", "/kilimanjaro-umbwe-route/", 10, 14),
      ],
      { minImpressions: 30 }
    );
    expect(clusters).toHaveLength(1);
    expect(clusters[0].key).toBe("kilimanjaro:price");
    expect(clusters[0].agg.impressions).toBe(270);
    expect(clusters[0].queries[0].query).toBe("cost to climb kilimanjaro");
  });
});

describe("buildIdea", () => {
  it("targets the on-topic page Google already ranks, even outside the CMS", () => {
    const [cluster] = clusterQueries([
      row("cost to climb kilimanjaro", "/kilimanjaro-prices/", 200, 40),
      row("kilimanjaro climbing cost", "/kilimanjaro-weight-loss/", 40, 70),
    ]);
    const idea = buildIdea(cluster, content);
    expect(idea.status).toBe("refresh");
    expect(idea.target?.path).toBe("/kilimanjaro-prices/");
    expect(idea.target?.content).toBeNull();
    expect(idea.targetPosition).toBeCloseTo(40);
  });

  it("falls back to the strongest CMS match, not an unrelated post", () => {
    const [cluster] = clusterQueries([row("kilimanjaro climb price", "/", 100, 60)]);
    const idea = buildIdea(cluster, content);
    expect(idea.target?.content?.id).toBe("b2");
  });

  it("points an itinerary search for one route at the bookable page, never a draft", () => {
    const [cluster] = clusterQueries([row("lemosho route 8 days", "/kilimanjaro-8-day-itinerary/", 260, 53)]);
    const idea = buildIdea(cluster, content);
    expect(idea.target?.content?.id).toBe("r1");
    expect(idea.targetPosition).toBe(0);
    expect(idea.googlePage?.path).toBe("/kilimanjaro-8-day-itinerary/");
  });

  it("asks a ranking guide to link to the bookable route page", () => {
    const [cluster] = clusterQueries([row("how difficult is umbwe route", "/kilimanjaro-umbwe-route/", 120, 20)]);
    const idea = buildIdea({ ...cluster }, [
      ...content,
      { id: "b9", kind: "blog", title: "How difficult is the Umbwe route", slug: "how-difficult-is-the-umbwe-route", path: "/how-difficult-is-the-umbwe-route/", isLive: true },
    ]);
    expect(idea.cluster.intent.id).toBe("difficulty");
    expect(idea.target?.content?.kind).toBe("blog");
    expect(idea.linkTo?.id).toBe("r2");
  });

  it("proposes a new page when nothing covers the topic", () => {
    // Google only shows the home page, which is not about the topic.
    const [cluster] = clusterQueries([row("big five safari tanzania", "/", 258, 60)]);
    const idea = buildIdea(cluster, content);
    expect(idea.status).toBe("new");
    expect(idea.target).toBeNull();
    expect(idea.gain).toBeGreaterThan(0);
  });

  it("lets a guide answer a single topic when there is no bookable page for it", () => {
    const [cluster] = clusterQueries([row("big five safari tanzania", "/big-five-tanzania/", 258, 60)]);
    const guide: IdeaContent = { id: "b5", kind: "blog", title: "Big Five Tanzania", slug: "big-five-tanzania", path: "/big-five-tanzania/", isLive: true };
    const idea = buildIdea(cluster, [...content, guide]);
    expect(idea.status).toBe("refresh");
    expect(idea.target?.content?.id).toBe("b5");
  });

  it("treats a top-five page that takes most searches as covered", () => {
    const [cluster] = clusterQueries([row("umbwe route", "/trekking/6-days-umbwe-route/", 300, 3.2, 40)]);
    expect(buildIdea(cluster, content).status).toBe("covered");
  });
});

describe("refreshReasons", () => {
  const base = {
    agg: { clicks: 2, impressions: 400, ctr: 0.005, position: 12 },
    previous: { clicks: 10, impressions: 380, ctr: 0.026, position: 11 },
    score: 52,
    fails: ["No FAQs", "Gallery under 4 images"],
    updatedAt: new Date("2025-01-01"),
    isLive: true,
    ideas: [],
    days: 28,
    hasSearchData: true,
  };
  const now = new Date("2026-11-23");

  it("explains every problem with a page", () => {
    const codes = refreshReasons(base, now).map((r) => r.code);
    expect(codes).toEqual(expect.arrayContaining(["falling", "striking", "weak", "stale"]));
  });
  it("flags live pages Google never shows", () => {
    const reasons = refreshReasons({ ...base, agg: EMPTY_AGG, previous: EMPTY_AGG, score: 90, updatedAt: now }, now);
    expect(reasons.map((r) => r.code)).toEqual(["invisible"]);
  });
  it("says nothing about drafts or healthy pages", () => {
    expect(refreshReasons({ ...base, isLive: false }, now)).toEqual([]);
    const healthy = refreshReasons(
      { ...base, agg: { clicks: 40, impressions: 400, ctr: 0.1, position: 2.5 }, previous: { clicks: 38, impressions: 390, ctr: 0.097, position: 2.6 }, score: 85, updatedAt: now },
      now
    );
    expect(healthy).toEqual([]);
    expect(refreshPriority("route", healthy, 85, 400)).toBe(0);
  });
  it("ranks a route above a blog post with the same problems", () => {
    const reasons = refreshReasons(base, now);
    expect(refreshPriority("route", reasons, 52, 400)).toBeGreaterThan(refreshPriority("blog", reasons, 52, 400));
  });
});
