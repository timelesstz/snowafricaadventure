import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

// Vitest v4 + plugin-react 5 + Node 25 triggers "failed to find the runner"
// when setupFiles load in parallel worker threads. Forcing a single fork
// makes hook registration reliable. `poolOptions` is valid at runtime in v4
// but missing from the exported InlineConfig type — cast to satisfy tsc.
const poolConfig = {
  pool: "forks",
  poolOptions: {
    forks: {
      singleFork: true,
    },
  },
} as Record<string, unknown>;

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["**/*.{test,spec}.{ts,tsx}"],
    exclude: ["node_modules", ".next", "dist", "e2e"],
    ...poolConfig,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        ".next/",
        "**/*.config.*",
        "**/*.d.ts",
        "prisma/",
        "scripts/",
      ],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
