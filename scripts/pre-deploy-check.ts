#!/usr/bin/env npx tsx
/**
 * Pre-Deployment Check Script
 * Verifies the project is ready for production deployment
 */

import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const ROOT = path.join(__dirname, "..");

interface CheckResult {
  name: string;
  status: "pass" | "fail" | "warn";
  message: string;
}

const results: CheckResult[] = [];

function check(name: string, fn: () => { status: "pass" | "fail" | "warn"; message: string }) {
  try {
    const result = fn();
    results.push({ name, ...result });
  } catch (error) {
    results.push({
      name,
      status: "fail",
      message: error instanceof Error ? error.message : String(error),
    });
  }
}

console.log("🔍 Running pre-deployment checks...\n");

// 1. Check .env.example has all required vars
check("Environment Variables", () => {
  const envExample = fs.readFileSync(path.join(ROOT, ".env.example"), "utf-8");
  const required = [
    "DATABASE_URL",
    "NEXTAUTH_URL",
    "NEXTAUTH_SECRET",
    "R2_ENDPOINT",
    "R2_ACCESS_KEY_ID",
    "R2_SECRET_ACCESS_KEY",
    "R2_BUCKET_NAME",
    "SMTP_HOST",
    "SMTP_USER",
    "SMTP_PASS",
    "CRON_SECRET",
  ];

  const missing = required.filter((v) => !envExample.includes(v));
  if (missing.length > 0) {
    return { status: "fail", message: `Missing: ${missing.join(", ")}` };
  }
  return { status: "pass", message: `All ${required.length} required vars documented` };
});

// 2. Check build passes
check("Build", () => {
  try {
    execSync("npm run build", { cwd: ROOT, stdio: "pipe" });
    return { status: "pass", message: "Build successful" };
  } catch {
    return { status: "fail", message: "Build failed" };
  }
});

// 3. Check tests pass
check("Tests", () => {
  try {
    execSync("npm run test:run", { cwd: ROOT, stdio: "pipe" });
    return { status: "pass", message: "All tests passing" };
  } catch {
    return { status: "fail", message: "Tests failing" };
  }
});

// 4. Check ESLint
check("ESLint", () => {
  try {
    const output = execSync("npm run lint 2>&1", { cwd: ROOT, encoding: "utf-8" });
    const errorMatch = output.match(/(\d+) errors?/);
    const errors = errorMatch ? parseInt(errorMatch[1]) : 0;
    if (errors > 0) {
      return { status: "fail", message: `${errors} ESLint errors` };
    }
    return { status: "pass", message: "No ESLint errors" };
  } catch {
    return { status: "warn", message: "Could not run ESLint" };
  }
});

// 5. Check redirects configured
check("Redirects", () => {
  const configPath = path.join(ROOT, "next.config.ts");
  const config = fs.readFileSync(configPath, "utf-8");
  const redirectCount = (config.match(/source:/g) || []).length;
  if (redirectCount < 10) {
    return { status: "warn", message: `Only ${redirectCount} redirects configured` };
  }
  return { status: "pass", message: `${redirectCount} redirects configured` };
});

// 6. Check vercel.json exists
check("Vercel Config", () => {
  const vercelPath = path.join(ROOT, "vercel.json");
  if (!fs.existsSync(vercelPath)) {
    return { status: "warn", message: "vercel.json not found" };
  }
  const vercel = JSON.parse(fs.readFileSync(vercelPath, "utf-8"));
  if (vercel.crons && vercel.crons.length > 0) {
    return { status: "pass", message: `${vercel.crons.length} cron job(s) configured` };
  }
  return { status: "pass", message: "vercel.json exists" };
});

// 7. Check trailing slash
check("Trailing Slash (SEO)", () => {
  const configPath = path.join(ROOT, "next.config.ts");
  const config = fs.readFileSync(configPath, "utf-8");
  if (config.includes("trailingSlash: true")) {
    return { status: "pass", message: "trailingSlash: true (matches WordPress)" };
  }
  return { status: "fail", message: "trailingSlash not set - URLs will break!" };
});

// 8. Check sitemap exists
check("Sitemap", () => {
  const sitemapPath = path.join(ROOT, "src/app/sitemap.ts");
  if (fs.existsSync(sitemapPath)) {
    return { status: "pass", message: "Dynamic sitemap configured" };
  }
  return { status: "warn", message: "Sitemap not found" };
});

// 9. Check robots.txt exists
check("Robots.txt", () => {
  const robotsPath = path.join(ROOT, "src/app/robots.ts");
  if (fs.existsSync(robotsPath)) {
    return { status: "pass", message: "Dynamic robots.txt configured" };
  }
  return { status: "warn", message: "Robots.txt not found" };
});

// Print results
console.log("\n" + "═".repeat(60));
console.log("📋 PRE-DEPLOYMENT CHECK RESULTS");
console.log("═".repeat(60) + "\n");

let passed = 0;
let failed = 0;
let warned = 0;

for (const result of results) {
  const icon = result.status === "pass" ? "✅" : result.status === "fail" ? "❌" : "⚠️";
  console.log(`${icon} ${result.name}: ${result.message}`);

  if (result.status === "pass") passed++;
  else if (result.status === "fail") failed++;
  else warned++;
}

console.log("\n" + "─".repeat(60));
console.log(`Summary: ${passed} passed, ${failed} failed, ${warned} warnings`);
console.log("─".repeat(60));

if (failed > 0) {
  console.log("\n❌ DEPLOYMENT BLOCKED - Fix failures before deploying\n");
  process.exit(1);
} else if (warned > 0) {
  console.log("\n⚠️  DEPLOYMENT OK WITH WARNINGS\n");
  process.exit(0);
} else {
  console.log("\n🚀 READY FOR DEPLOYMENT!\n");
  process.exit(0);
}
