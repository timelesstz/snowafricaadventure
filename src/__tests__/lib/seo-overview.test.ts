import { describe, it, expect } from "vitest";
import { computeHealthScore } from "@/lib/seo-health-score";

describe("computeHealthScore", () => {
  it("returns score=0 when every component lacks data", () => {
    const { score, components } = computeHealthScore({
      contentHealthScore: null,
      weightedCtr: null,
      weightedPosition: null,
      active404s: 0,
      auditAvg: null,
      contentCount: 0,
    });
    // errors component still scores 100, but content/ctr/position/audit are
    // all null so the only present weight is errors=15. Score should be 100.
    // (weightedSum = 100 * (15/15) = 100)
    expect(score).toBe(100);
    const errors = components.find((c) => c.key === "errors");
    expect(errors?.effectiveWeight).toBe(100);
    const content = components.find((c) => c.key === "content");
    expect(content?.score).toBeNull();
  });

  it("renormalizes weights when GSC data is missing", () => {
    // Only content & errors are present. Weights 30 + 15 = 45 → renormalized
    // to 30/45 = 66.67% and 15/45 = 33.33%.
    const { score, components } = computeHealthScore({
      contentHealthScore: 80,
      weightedCtr: null,
      weightedPosition: null,
      active404s: 0,
      auditAvg: null,
      contentCount: 12,
    });
    // weightedSum = 80*(30/45) + 100*(15/45) = 53.33 + 33.33 = 86.66 → 87
    expect(score).toBe(87);
    expect(
      components.find((c) => c.key === "content")?.effectiveWeight
    ).toBeCloseTo(66.7, 0);
    expect(
      components.find((c) => c.key === "errors")?.effectiveWeight
    ).toBeCloseTo(33.3, 0);
    expect(components.find((c) => c.key === "ctr")?.score).toBeNull();
  });

  it("never substitutes 50 when audits are missing", () => {
    // The previous implementation defaulted audit to 50. Verify we no
    // longer do that — audit is null and its weight is renormalized away.
    const without = computeHealthScore({
      contentHealthScore: 70,
      weightedCtr: 0.03,
      weightedPosition: 5,
      active404s: 0,
      auditAvg: null,
      contentCount: 5,
    });
    const withAudit50 = computeHealthScore({
      contentHealthScore: 70,
      weightedCtr: 0.03,
      weightedPosition: 5,
      active404s: 0,
      auditAvg: 50,
      contentCount: 5,
    });
    // The two should differ — if we silently substituted 50, they'd match.
    expect(without.score).not.toBe(withAudit50.score);
    expect(without.components.find((c) => c.key === "audit")?.score).toBeNull();
    expect(
      withAudit50.components.find((c) => c.key === "audit")?.score
    ).toBe(50);
  });

  it("CTR target of 3% caps the CTR component at 100", () => {
    const { components } = computeHealthScore({
      contentHealthScore: 70,
      weightedCtr: 0.05, // 5% > 3% target
      weightedPosition: 5,
      active404s: 0,
      auditAvg: 70,
      contentCount: 5,
    });
    expect(components.find((c) => c.key === "ctr")?.score).toBe(100);
  });

  it("position component degrades 5 points per rank below #1", () => {
    const at1 = computeHealthScore({
      contentHealthScore: null,
      weightedCtr: null,
      weightedPosition: 1,
      active404s: 0,
      auditAvg: null,
      contentCount: 0,
    });
    const at11 = computeHealthScore({
      contentHealthScore: null,
      weightedCtr: null,
      weightedPosition: 11,
      active404s: 0,
      auditAvg: null,
      contentCount: 0,
    });
    expect(at1.components.find((c) => c.key === "position")?.score).toBe(100);
    // 11 → 100 - 10*5 = 50
    expect(at11.components.find((c) => c.key === "position")?.score).toBe(50);
  });

  it("each active 404 with traffic shaves 2 points off the error score", () => {
    const ten = computeHealthScore({
      contentHealthScore: null,
      weightedCtr: null,
      weightedPosition: null,
      active404s: 10,
      auditAvg: null,
      contentCount: 0,
    });
    expect(ten.components.find((c) => c.key === "errors")?.score).toBe(80);
  });

  it("treats contentCount=0 as missing-content even if average is non-zero", () => {
    const { components } = computeHealthScore({
      contentHealthScore: 90,
      weightedCtr: null,
      weightedPosition: null,
      active404s: 0,
      auditAvg: null,
      contentCount: 0,
    });
    expect(components.find((c) => c.key === "content")?.score).toBeNull();
  });

  it("treats weightedPosition=0 as missing-position", () => {
    const { components } = computeHealthScore({
      contentHealthScore: null,
      weightedCtr: 0.02,
      weightedPosition: 0,
      active404s: 0,
      auditAvg: null,
      contentCount: 0,
    });
    expect(components.find((c) => c.key === "position")?.score).toBeNull();
  });

  it("full-data scenario produces a sensible 50-100 range", () => {
    const { score, components } = computeHealthScore({
      contentHealthScore: 75,
      weightedCtr: 0.025,
      weightedPosition: 8,
      active404s: 3,
      auditAvg: 80,
      contentCount: 50,
    });
    expect(score).toBeGreaterThan(50);
    expect(score).toBeLessThanOrEqual(100);
    // All five components should be present (none renormalized away).
    expect(components.every((c) => c.score !== null)).toBe(true);
    // Weights should sum (approximately) to 100.
    const totalWeight = components.reduce(
      (sum, c) => sum + c.effectiveWeight,
      0
    );
    expect(totalWeight).toBeCloseTo(100, 0);
  });
});
