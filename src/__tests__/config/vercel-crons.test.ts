import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import nextConfig from "../../../next.config";

// Vercel's cron runner does not follow redirects. With trailingSlash enabled,
// a cron path without the slash gets a 308 and the job never runs: that is
// how lead follow-up, SEO sync and departure rotation all went silent from
// September 2026.
describe("vercel.json cron paths", () => {
  const vercel = JSON.parse(readFileSync(join(process.cwd(), "vercel.json"), "utf8")) as {
    crons: { path: string; schedule: string }[];
  };

  it("fits the Hobby plan limit of two crons", () => {
    expect(vercel.crons.length).toBeLessThanOrEqual(2);
  });

  it.each(vercel.crons.map((c) => c.path))("%s matches the trailingSlash setting", (path) => {
    expect(nextConfig.trailingSlash).toBe(true);
    expect(path.endsWith("/")).toBe(true);
  });
});
