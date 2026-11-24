import { describe, expect, it } from "vitest";
import {
  aggregate,
  aggregateBy,
  aggregateLanding,
  changeImpact,
  contentPriority,
  ctrGap,
  detectCannibalization,
  diagnoseLanding,
  diffAudits,
  findMovers,
  forecastClicks,
  parseAuditIssues,
  pctChange,
  type Agg,
} from "@/lib/seo-intel/rules";
import { pathKey, publicPathFor } from "@/lib/seo-intel/paths";
import { validateSuggestion } from "@/lib/seo-intel/ai-meta";

const agg = (clicks: number, impressions: number, position: number): Agg => ({
  clicks,
  impressions,
  ctr: impressions ? clicks / impressions : 0,
  position,
});

describe("paths", () => {
  it("normalises GSC URLs and GA paths to one key", () => {
    expect(pathKey("https://snowafricaadventure.com/Trekking/Machame-Route?x=1#top")).toBe("/trekking/machame-route/");
    expect(pathKey("/tanzania-safaris/3-days")).toBe("/tanzania-safaris/3-days/");
    expect(pathKey("//double//slash")).toBe("/double/slash/");
    expect(pathKey(null)).toBe("/");
  });
  it("builds public paths per content kind", () => {
    expect(publicPathFor("route", "lemosho")).toBe("/trekking/lemosho/");
    expect(publicPathFor("blog", "best-time")).toBe("/best-time/");
  });
});

describe("aggregate", () => {
  it("weights position by impressions and derives CTR from totals", () => {
    const a = aggregate([
      { clicks: 10, impressions: 100, position: 2 },
      { clicks: 0, impressions: 900, position: 20 },
    ]);
    expect(a.ctr).toBeCloseTo(0.01);
    expect(a.position).toBeCloseTo(18.2);
  });
  it("returns zeros for no impressions", () => {
    expect(aggregate([])).toEqual({ clicks: 0, impressions: 0, ctr: 0, position: 0 });
  });
  it("groups by key and skips empty keys", () => {
    const m = aggregateBy(
      [
        { k: "a", clicks: 1, impressions: 10, position: 1 },
        { k: "a", clicks: 1, impressions: 10, position: 3 },
        { k: "", clicks: 5, impressions: 5, position: 1 },
      ],
      (r) => r.k
    );
    expect([...m.keys()]).toEqual(["a"]);
    expect(m.get("a")?.position).toBe(2);
  });
  it("pctChange handles zero baselines", () => {
    expect(pctChange(5, 0)).toBeNull();
    expect(pctChange(0, 0)).toBe(0);
    expect(pctChange(50, 100)).toBe(-50);
  });
});

describe("findMovers", () => {
  it("classifies new, lost, rising and falling", () => {
    const cur = new Map([
      ["new", agg(5, 50, 9)],
      ["up", agg(20, 100, 4)],
      ["down", agg(1, 100, 15)],
      ["noise", agg(0, 5, 3)],
    ]);
    const prev = new Map([
      ["lost", agg(3, 40, 12)],
      ["up", agg(5, 100, 9)],
      ["down", agg(8, 100, 8)],
      ["noise", agg(0, 4, 30)],
    ]);
    const kinds = Object.fromEntries(findMovers(cur, prev).map((m) => [m.key, m.kind]));
    expect(kinds).toEqual({ new: "new", lost: "lost", up: "rising", down: "falling" });
  });
});

describe("detectCannibalization", () => {
  it("flags a query split across two page-one URLs", () => {
    const rows = [
      { query: "machame route", page: "/trekking/machame/", clicks: 5, impressions: 300, position: 6 },
      { query: "machame route", page: "/machame-guide/", clicks: 2, impressions: 200, position: 8 },
      { query: "lemosho", page: "/trekking/lemosho/", clicks: 9, impressions: 400, position: 3 },
    ];
    const result = detectCannibalization(rows);
    expect(result).toHaveLength(1);
    expect(result[0].query).toBe("machame route");
    expect(result[0].severity).toBe("high");
    expect(result[0].pages.map((p) => p.page)).toEqual(["/trekking/machame/", "/machame-guide/"]);
  });
  it("ignores pages with a tiny share", () => {
    const rows = [
      { query: "q", page: "/a/", clicks: 0, impressions: 950, position: 5 },
      { query: "q", page: "/b/", clicks: 0, impressions: 50, position: 40 },
    ];
    expect(detectCannibalization(rows)).toHaveLength(0);
  });
});

describe("ctrGap / forecast", () => {
  it("flags a page-one result far under the CTR curve", () => {
    const gap = ctrGap(agg(2, 1000, 3));
    expect(gap).not.toBeNull();
    expect(gap!.missedClicks).toBeGreaterThan(50);
  });
  it("ignores healthy CTR, low volume and page two", () => {
    expect(ctrGap(agg(150, 1000, 3))).toBeNull();
    expect(ctrGap(agg(0, 20, 3))).toBeNull();
    expect(ctrGap(agg(0, 1000, 14))).toBeNull();
  });
  it("forecasts extra clicks from moving up", () => {
    expect(forecastClicks(agg(2, 1000, 12), 3)).toBeGreaterThan(50);
    expect(forecastClicks(agg(0, 0, 0))).toBe(0);
  });
});

describe("contentPriority", () => {
  it("ranks a weak, visible trekking route above a weak, unseen blog post", () => {
    expect(contentPriority(40, "route", 2000)).toBeGreaterThan(contentPriority(40, "blog", 0));
    expect(contentPriority(100, "route", 5000)).toBe(0);
  });
  it("lifts a high-scoring page whose snippet is losing clicks", () => {
    expect(contentPriority(90, "blog", 20000, 800)).toBeGreaterThan(contentPriority(85, "blog", 900, 0));
  });
});

describe("landing diagnoses", () => {
  it("uses session-weighted bounce rate", () => {
    const s = aggregateLanding([
      { sessions: 90, users: 80, conversions: 0, bounceRate: 0.9, avgSessionDuration: 10 },
      { sessions: 10, users: 10, conversions: 1, bounceRate: 0.1, avgSessionDuration: 100 },
    ]);
    expect(s.bounceRate).toBeCloseTo(0.82);
    expect(s.avgSessionDuration).toBeCloseTo(19);
  });
  it("flags high bounce, no enquiries on money pages and decay", () => {
    const cur = { sessions: 40, users: 35, conversions: 0, bounceRate: 0.88, avgSessionDuration: 45 };
    const prev = { sessions: 100, users: 90, conversions: 2, bounceRate: 0.5, avgSessionDuration: 60 };
    const codes = diagnoseLanding(cur, prev, "safari").map((d) => d.code);
    expect(codes).toEqual(["high-bounce", "no-conversions", "traffic-decay"]);
    expect(diagnoseLanding(cur, prev, "blog").map((d) => d.code)).not.toContain("no-conversions");
  });
});

describe("audits", () => {
  it("diffs fixed and new problems", () => {
    const d = diffAudits(
      { score: 60, issues: [{ severity: "critical", field: "h1", message: "Missing H1" }] },
      {
        score: 75,
        issues: [
          { severity: "pass", field: "h1", message: "ok" },
          { severity: "warning", field: "schema", message: "No schema" },
        ],
      }
    );
    expect(d.fixed.map((i) => i.field)).toEqual(["h1"]);
    expect(d.introduced.map((i) => i.field)).toEqual(["schema"]);
    expect(d.scoreDelta).toBe(15);
  });
  it("parses only well-formed issues", () => {
    expect(parseAuditIssues([{ severity: "pass", field: "x", message: "m" }, { bad: 1 }, null])).toHaveLength(1);
    expect(parseAuditIssues("nope")).toEqual([]);
  });
});

describe("changeImpact", () => {
  it("waits for a week of data", () => {
    expect(changeImpact(agg(5, 500, 5), agg(20, 500, 5), 3)).toBe("too-early");
  });
  it("reads CTR lifts and drops", () => {
    expect(changeImpact(agg(5, 500, 5), agg(10, 500, 5), 14)).toBe("improved");
    expect(changeImpact(agg(10, 500, 5), agg(5, 500, 5), 14)).toBe("worse");
    expect(changeImpact(agg(10, 500, 5), agg(10, 520, 5), 14)).toBe("flat");
  });
});

describe("validateSuggestion", () => {
  it("warns on length and brand repetition", () => {
    const w = validateSuggestion({
      metaTitle: "Machame Route 7 Days | Snow Africa Adventure Kilimanjaro Trek",
      metaDescription: "Too short.",
    });
    expect(w).toHaveLength(3);
    expect(
      validateSuggestion({
        metaTitle: "Machame Route: 7-Day Kilimanjaro Climb",
        metaDescription:
          "Climb Kilimanjaro on the Machame Route over seven days with certified mountain guides, quality tents and daily health checks. Check the next departure dates.",
      })
    ).toEqual([]);
  });
});
