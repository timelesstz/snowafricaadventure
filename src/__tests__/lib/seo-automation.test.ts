import { describe, it, expect, vi } from "vitest";

// seo-overview pulls in Prisma at import time; the helpers under test are pure.
vi.mock("@/lib/prisma", () => ({ default: {}, prisma: {} }));

import { evaluateSeoAlerts, type AlertSignals } from "@/lib/seo-automation/alert-rules";
import { buildActionQueue, estimateQuickWinGain, type ActionQueueInput } from "@/lib/seo-action-queue";
import { anchorWindowEnd } from "@/lib/seo-overview";
import { isOwnUrl, liveOriginFrom } from "@/lib/seo-automation/audits";

const quiet: AlertSignals = {
  googleConfigured: true,
  sync: [
    { source: "GSC", status: "COMPLETED", hoursAgo: 5, error: null },
    { source: "GA4", status: "COMPLETED", hoursAgo: 5, error: null },
  ],
  traffic: { clicks: 100, priorClicks: 100, impressions: 5000, priorImpressions: 5000 },
  health: { current: 70, weekAgo: 70 },
  pageDrops: [],
  new404s: [],
};

describe("evaluateSeoAlerts", () => {
  it("raises nothing when everything is steady", () => {
    expect(evaluateSeoAlerts(quiet)).toEqual([]);
  });

  it("flags failed and stale syncs, but only when Google is configured", () => {
    const signals: AlertSignals = {
      ...quiet,
      sync: [
        { source: "GSC", status: "FAILED", hoursAgo: 2, error: "quota" },
        { source: "GA4", status: "COMPLETED", hoursAgo: 72, error: null },
      ],
    };
    const keys = evaluateSeoAlerts(signals).map((a) => a.key);
    expect(keys).toEqual(["sync-failed:GSC", "sync-stale:GA4"]);
    expect(evaluateSeoAlerts({ ...signals, googleConfigured: false })).toEqual([]);
  });

  it("alerts on a 30%+ click drop, urgent at 45%+, and ignores a tiny base", () => {
    const drop = evaluateSeoAlerts({ ...quiet, traffic: { ...quiet.traffic!, clicks: 65 } });
    expect(drop.map((a) => [a.key, a.severity])).toEqual([["traffic:clicks-drop", "high"]]);

    const crash = evaluateSeoAlerts({ ...quiet, traffic: { ...quiet.traffic!, clicks: 50 } });
    expect(crash[0].severity).toBe("urgent");

    const tiny = evaluateSeoAlerts({
      ...quiet,
      traffic: { clicks: 2, priorClicks: 10, impressions: 100, priorImpressions: 100 },
    });
    expect(tiny).toEqual([]);
  });

  it("alerts on health drops of 5+ points, high at 10+", () => {
    expect(evaluateSeoAlerts({ ...quiet, health: { current: 66, weekAgo: 70 } })).toEqual([]);
    expect(evaluateSeoAlerts({ ...quiet, health: { current: 65, weekAgo: 70 } })[0].severity).toBe("normal");
    expect(evaluateSeoAlerts({ ...quiet, health: { current: 58, weekAgo: 70 } })[0].severity).toBe("high");
  });

  it("groups ranking drops into one alert keyed by the pages involved", () => {
    const alerts = evaluateSeoAlerts({
      ...quiet,
      pageDrops: [
        { page: "https://x.com/a/", position: 12, priorPosition: 6, priorImpressions: 900 },
        { page: "https://x.com/b/", position: 9, priorPosition: 4, priorImpressions: 300 },
        // Too small, and too small a move — both ignored.
        { page: "https://x.com/c/", position: 20, priorPosition: 5, priorImpressions: 50 },
        { page: "https://x.com/d/", position: 6, priorPosition: 5, priorImpressions: 5000 },
      ],
    });
    expect(alerts).toHaveLength(1);
    expect(alerts[0].key).toBe("rankings:drop:/a/|/b/");
    expect(alerts[0].title).toBe("2 pages lost rankings this week");
  });

  it("alerts on new 404s that people (not bots) hit", () => {
    const alerts = evaluateSeoAlerts({
      ...quiet,
      new404s: [
        { url: "https://x.com/old-route/", humanHitCount: 12, hitCount: 40 },
        { url: "https://x.com/bot-only/", humanHitCount: 0, hitCount: 300 },
      ],
    });
    expect(alerts).toHaveLength(1);
    expect(alerts[0].severity).toBe("high");
    expect(alerts[0].message).toContain("/old-route/");
    expect(alerts[0].message).not.toContain("/bot-only/");
  });
});

const emptyQueue: ActionQueueInput = {
  freshness: [],
  weakContent: [],
  quickWins: [],
  top404s: [],
  audit: { pagesAudited: 10, missingSchema: 0, daysSinceLastAudit: 1 },
};

describe("buildActionQueue", () => {
  it("is empty when there is nothing to do", () => {
    expect(buildActionQueue(emptyQueue)).toEqual([]);
  });

  it("puts broken data first, and ranks money pages above blog posts at equal score", () => {
    const actions = buildActionQueue({
      ...emptyQueue,
      freshness: [{ source: "GSC", status: "FAILED", hoursAgo: 1, error: "boom" }],
      weakContent: [
        { id: "b1", kind: "blog", title: "Packing list", editHref: "/admin/blog/b1", score: 50, failedChecks: [] },
        { id: "r1", kind: "route", title: "Lemosho", editHref: "/admin/routes/r1", score: 50, failedChecks: ["FAQs"] },
      ],
    });
    expect(actions.map((a) => a.id)).toEqual(["sync-failed:GSC", "content:route:r1", "content:blog:b1"]);
    expect(actions[1].severity).toBe("medium");
    expect(actions[1].detail).toContain("FAQs");
  });

  it("drops quick wins with no gain and suggests auditing when nothing is audited", () => {
    const actions = buildActionQueue({
      ...emptyQueue,
      quickWins: [
        { query: "kili", impressions: 1000, clicks: 20, position: 6, page: "https://x.com/k/" },
        { query: "already-good", impressions: 100, clicks: 50, position: 4, page: null },
      ],
      audit: { pagesAudited: 0, missingSchema: 0, daysSinceLastAudit: null },
    });
    expect(actions.map((a) => a.id)).toEqual(["quick-win:/k/", "audit:none"]);
    expect(actions[0].detail).toContain("80 more clicks");
  });

  it("groups quick wins that share a ranking page into one action", () => {
    const actions = buildActionQueue({
      ...emptyQueue,
      quickWins: [
        { query: "snow in africa", impressions: 1000, clicks: 10, position: 8, page: "https://x.com/snow/" },
        { query: "does it snow in africa", impressions: 500, clicks: 0, position: 9, page: "https://x.com/snow/" },
        { query: "kili", impressions: 300, clicks: 0, position: 6, page: "https://x.com/k/" },
      ],
    });
    expect(actions.map((a) => a.id)).toEqual(["quick-win:/snow/", "quick-win:/k/"]);
    expect(actions[0].title).toBe("Push /snow/ into the top 3 for 2 queries");
    expect(actions[0].impact).toBe(140);
  });
});

describe("helpers", () => {
  it("estimateQuickWinGain never goes negative", () => {
    expect(estimateQuickWinGain(1000, 20)).toBe(80);
    expect(estimateQuickWinGain(100, 50)).toBe(0);
  });

  it("anchorWindowEnd ends the day after the latest data, never in the future", () => {
    const now = new Date("2026-11-19T10:00:00Z");
    expect(anchorWindowEnd(new Date("2026-11-16T00:00:00Z"), now).toISOString()).toBe("2026-11-17T00:00:00.000Z");
    expect(anchorWindowEnd(new Date("2026-11-19T00:00:00Z"), now)).toEqual(now);
    expect(anchorWindowEnd(null, now)).toEqual(now);
  });

  it("liveOriginFrom takes the live host from GSC pages, skipping local ones", () => {
    expect(liveOriginFrom(["http://localhost:3000/", "https://www.example.com/a/"])).toBe("https://www.example.com");
  });

  it("isOwnUrl only allows this site's host", () => {
    expect(isOwnUrl("https://www.snowafricaadventure.com/x/", "snowafricaadventure.com")).toBe(true);
    expect(isOwnUrl("https://snowafricaadventure.com.evil.io/", "snowafricaadventure.com")).toBe(false);
    expect(isOwnUrl("file:///etc/passwd", "snowafricaadventure.com")).toBe(false);
  });
});
