import { test, expect } from "@playwright/test";

test.describe("Safari Detail Page", () => {
  test("safari listing page loads", async ({ page }) => {
    await page.goto("/tanzania-safaris/");

    // Page title should be visible
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/safari/i);

    // Should have safari cards
    const safariCards = page.locator("a[href*='/tanzania-safaris/']");
    await expect(safariCards.first()).toBeVisible();
  });

  test("can navigate to safari detail page", async ({ page }) => {
    await page.goto("/tanzania-safaris/");

    // Click first safari card
    const safariLink = page.locator("a[href*='/tanzania-safaris/'][href$='/']").first();
    const href = await safariLink.getAttribute("href");

    // Skip if no detail links (only listing page links)
    if (href && href !== "/tanzania-safaris/") {
      await safariLink.click();

      // Should be on detail page
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    }
  });

  test("safari detail page has key sections", async ({ page }) => {
    // Navigate directly to a known safari page
    await page.goto("/tanzania-safaris/2-days-tanzania-lodge-safari/");

    // Hero section should be visible
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Overview section should exist
    await expect(page.getByText(/about this safari/i)).toBeVisible();

    // Day by Day section should exist
    await expect(page.getByText(/day by day/i)).toBeVisible();

    // Inclusions section should exist
    await expect(page.getByText(/everything you need/i)).toBeVisible();
  });

  test("quick nav works on safari detail page", async ({ page }) => {
    await page.goto("/tanzania-safaris/2-days-tanzania-lodge-safari/");

    // Quick nav should have section links
    const overviewLink = page.getByRole("link", { name: /overview/i });

    if (await overviewLink.isVisible()) {
      await overviewLink.click();

      // Should scroll to overview section (URL hash)
      await expect(page).toHaveURL(/#overview/);
    }
  });

  test("CTA buttons are visible", async ({ page }) => {
    await page.goto("/tanzania-safaris/2-days-tanzania-lodge-safari/");

    // Book Now or similar CTA should be visible
    await expect(page.getByRole("link", { name: /book/i }).first()).toBeVisible();
  });
});

test.describe("Safari Detail Page - Mobile", () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test("safari detail page is responsive", async ({ page }) => {
    await page.goto("/tanzania-safaris/2-days-tanzania-lodge-safari/");

    // Hero should be visible
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Content should be readable (not cut off)
    await expect(page.getByText(/about this safari/i)).toBeVisible();
  });
});
