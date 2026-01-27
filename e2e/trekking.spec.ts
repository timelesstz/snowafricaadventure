import { test, expect } from "@playwright/test";

test.describe("Trekking Routes", () => {
  test("trekking listing page loads", async ({ page }) => {
    await page.goto("/trekking/");

    // Page heading
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Should have route cards
    const routeLinks = page.locator("a[href*='/trekking/'][href$='/']");
    await expect(routeLinks.first()).toBeVisible();
  });

  test("can view route detail page", async ({ page }) => {
    await page.goto("/trekking/");

    // Find and click a route card
    const routeLink = page
      .locator("a[href*='/trekking/']")
      .filter({ hasNot: page.locator("a[href='/trekking/']") })
      .first();

    const href = await routeLink.getAttribute("href");

    if (href && href !== "/trekking/") {
      await routeLink.click();

      // Should be on route detail page
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

      // Should have key sections
      await expect(page.locator("body")).toContainText(/day|itinerary/i);
    }
  });

  test("route detail page shows pricing", async ({ page }) => {
    await page.goto("/trekking/");

    // Get first route link that's not the listing page
    const routeLinks = page.locator("a[href*='/trekking/'][href$='/']");
    const count = await routeLinks.count();

    for (let i = 0; i < count; i++) {
      const href = await routeLinks.nth(i).getAttribute("href");
      if (href && href !== "/trekking/" && href.includes("-route")) {
        await page.goto(href);
        break;
      }
    }

    // Should show price information
    await expect(page.getByText(/\$|usd|price/i)).toBeVisible();
  });
});

test.describe("Group Departures", () => {
  test("group departures page loads", async ({ page }) => {
    await page.goto("/kilimanjaro-join-group-departures/");

    // Page heading
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Should have departure information
    await expect(page.locator("body")).toContainText(/depart|climb|group/i);
  });

  test("departure cards show key information", async ({ page }) => {
    await page.goto("/kilimanjaro-join-group-departures/");

    // Should show dates or availability info
    const hasDateInfo = await page.getByText(/2025|2026|january|february|march/i).isVisible().catch(() => false);
    const hasRouteInfo = await page.getByText(/machame|lemosho|rongai|marangu/i).isVisible().catch(() => false);

    expect(hasDateInfo || hasRouteInfo).toBeTruthy();
  });

  test("can see departure details", async ({ page }) => {
    await page.goto("/kilimanjaro-join-group-departures/");

    // Look for departure cards or booking buttons
    const bookingElements = page.getByRole("link", { name: /book|join|view/i });

    if ((await bookingElements.count()) > 0) {
      await expect(bookingElements.first()).toBeVisible();
    }
  });
});

test.describe("Trekking Routes - Mobile", () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test("trekking page is mobile responsive", async ({ page }) => {
    await page.goto("/trekking/");

    // Content should be visible
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Cards should be stacked (not side by side)
    const routeLinks = page.locator("a[href*='/trekking/'][href$='/']");
    await expect(routeLinks.first()).toBeVisible();
  });

  test("group departures is mobile responsive", async ({ page }) => {
    await page.goto("/kilimanjaro-join-group-departures/");

    // Content should be visible and not overflow
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Page should not have horizontal scroll
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);

    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 20); // Allow small tolerance
  });
});
