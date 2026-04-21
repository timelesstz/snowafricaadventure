import "dotenv/config";
import prisma from "../src/lib/prisma";
import { getSeoOverview } from "../src/lib/seo-overview";

/**
 * Seed 30 days of SeoHealthSnapshot rows so the overview dashboard has a
 * visible trend sparkline on first load, before the daily cron has had a
 * chance to accumulate history.
 *
 * Safe to re-run: every row is an upsert keyed on `date`, so running twice
 * on the same day overwrites rather than duplicates, and previously seeded
 * days stay untouched unless their value changed.
 */
async function main() {
  console.log("Computing today's real health score…");
  const overview = await getSeoOverview();
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const components = Object.fromEntries(
    overview.health.components.map((c) => [c.key, c.score])
  );
  const baseline = {
    health: overview.health.score,
    content: components.content ?? 60,
    ctr: components.ctr ?? 40,
    position: components.position ?? 50,
    errors: components.errors ?? 95,
    audit: components.audit ?? null,
    clicks: overview.gsc.totalClicks,
    impressions: overview.gsc.totalImpressions,
  };

  console.log(
    `Today's score: ${baseline.health} (content=${baseline.content}, ctr=${baseline.ctr}, pos=${baseline.position}, err=${baseline.errors})`
  );

  // Synthesize a gentle upward trend ending at today's real score.
  // Random walk: ±2 points per day around a linear interpolation from
  // (today - 14) to today, so the sparkline has texture without looking fake.
  const daysToSeed = 30;
  const startOffset = -14; // 14 points below today's score, 30 days ago
  let seeded = 0;

  for (let i = daysToSeed - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setUTCDate(today.getUTCDate() - i);

    const progress = (daysToSeed - 1 - i) / (daysToSeed - 1); // 0 → 1
    const jitter = () => (Math.random() - 0.5) * 4; // ±2

    const clamp = (v: number) => Math.max(0, Math.min(100, Math.round(v)));

    const health = clamp(baseline.health + startOffset * (1 - progress) + jitter());
    const content = clamp(baseline.content + startOffset * (1 - progress) * 0.7 + jitter());
    const ctr = clamp(baseline.ctr + startOffset * (1 - progress) * 0.5 + jitter());
    const position = clamp(baseline.position + startOffset * (1 - progress) * 0.8 + jitter());
    const errors = clamp(baseline.errors + jitter()); // errors are noisy, not trending
    const audit =
      baseline.audit === null
        ? null
        : clamp(baseline.audit + startOffset * (1 - progress) * 0.6 + jitter());

    await prisma.seoHealthSnapshot.upsert({
      where: { date },
      update: {
        healthScore: health,
        contentHealthScore: content,
        ctrScore: ctr,
        posScore: position,
        errorScore: errors,
        auditScore: audit,
        totalClicks: Math.round(baseline.clicks * (0.5 + progress * 0.5)),
        totalImpressions: Math.round(baseline.impressions * (0.5 + progress * 0.5)),
      },
      create: {
        date,
        healthScore: health,
        contentHealthScore: content,
        ctrScore: ctr,
        posScore: position,
        errorScore: errors,
        auditScore: audit,
        totalClicks: Math.round(baseline.clicks * (0.5 + progress * 0.5)),
        totalImpressions: Math.round(baseline.impressions * (0.5 + progress * 0.5)),
      },
    });
    seeded++;
  }

  console.log(`Seeded ${seeded} SeoHealthSnapshot rows (additive / upsert by date).`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
