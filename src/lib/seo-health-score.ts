/**
 * Pure health-score composition for the /admin/seo overview.
 *
 * Lives in its own file (no Prisma dependency) so it can be unit-tested
 * without a database. `seo-overview.ts` re-exports it for convenience.
 */

export interface HealthScoreComponent {
  key: "content" | "ctr" | "position" | "errors" | "audit";
  label: string;
  score: number | null;
  weight: number;
  /** Effective weight as a percentage after renormalizing missing components away. */
  effectiveWeight: number;
}

interface ScoreComponentInput {
  contentHealthScore: number | null;
  /** Weighted CTR as a fraction (e.g. 0.025 for 2.5%). */
  weightedCtr: number | null;
  /** Weighted average position. 0 means no data. */
  weightedPosition: number | null;
  active404s: number;
  auditAvg: number | null;
  contentCount: number;
}

/** CTR target — 3% matches travel-vertical median (Backlinko 2024). */
const CTR_TARGET = 0.03;

/**
 * Compose the 0-100 health score from up to five real components.
 *
 * If a component is null (missing data), drop it and renormalize the
 * remaining weights so they still sum to 100. We never substitute a
 * fake "neutral" 50 — that was the source of misleading scores in the
 * previous implementation.
 *
 * Default weights: content 30 / CTR 20 / position 20 / errors 15 / audits 15.
 */
export function computeHealthScore(input: ScoreComponentInput): {
  score: number;
  components: HealthScoreComponent[];
} {
  const ctrScore =
    input.weightedCtr === null
      ? null
      : Math.round(Math.min((input.weightedCtr / CTR_TARGET) * 100, 100));

  const posScore =
    input.weightedPosition === null || input.weightedPosition === 0
      ? null
      : Math.round(Math.max(0, 100 - (input.weightedPosition - 1) * 5));

  const errorScore = Math.max(0, 100 - input.active404s * 2);

  const components: HealthScoreComponent[] = [
    {
      key: "content",
      label: "Content health",
      score: input.contentCount > 0 ? input.contentHealthScore : null,
      weight: 30,
      effectiveWeight: 0,
    },
    {
      key: "ctr",
      label: "Click-through rate",
      score: ctrScore,
      weight: 20,
      effectiveWeight: 0,
    },
    {
      key: "position",
      label: "Average position",
      score: posScore,
      weight: 20,
      effectiveWeight: 0,
    },
    {
      key: "errors",
      label: "Active 404s",
      score: errorScore,
      weight: 15,
      effectiveWeight: 0,
    },
    {
      key: "audit",
      label: "Page audits",
      score: input.auditAvg === null ? null : Math.round(input.auditAvg),
      weight: 15,
      effectiveWeight: 0,
    },
  ];

  const present = components.filter((c) => c.score !== null);
  const totalWeight = present.reduce((sum, c) => sum + c.weight, 0);

  if (totalWeight === 0) {
    return { score: 0, components };
  }

  let weightedSum = 0;
  for (const c of present) {
    c.effectiveWeight = Math.round((c.weight / totalWeight) * 1000) / 10;
    weightedSum += (c.score as number) * (c.weight / totalWeight);
  }

  return {
    score: Math.round(weightedSum),
    components,
  };
}
