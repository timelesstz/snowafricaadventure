import { test, expect } from "@playwright/test";

test.describe("Site Navigation", () => {
  test("homepage loads and displays key sections", async ({ page }) => {
    await page.goto("/");

    // Check page title
    await expect(page).toHaveTitle(/Snow Africa/);

    // Check header is visible
    await expect(page.getByRole("banner")).toBeVisible();

    // Check main navigation links (use first() to avoid strict mode issues with multiple matches)
    await expect(page.getByRole("link", { name: /trekking/i }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /safaris/i }).first()).toBeVisible();
  });

  test("can navigate to trekking page", async ({ page }) => {
    await page.goto("/");

    // Click trekking link
    await page.getByRole("link", { name: /trekking/i }).first().click();

    // Should be on trekking page
    await expect(page).toHaveURL(/\/trekking\//);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("can navigate to safaris page", async ({ page }) => {
    await page.goto("/");

    // Click safaris link
    await page.getByRole("link", { name: /safaris/i }).first().click();

    // Should be on safaris page
    await expect(page).toHaveURL(/\/tanzania-safaris\//);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("can navigate to search page", async ({ page }) => {
    await page.goto("/");

    // Click search icon (aria-label="Search")
    await page.getByLabel("Search").click();

    // Should be on search page
    await expect(page).toHaveURL(/\/search\//);
  });

  test("footer contains contact information", async ({ page }) => {
    await page.goto("/");

    // Scroll to footer
    await page.getByRole("contentinfo").scrollIntoViewIfNeeded();

    // Check footer is visible
    await expect(page.getByRole("contentinfo")).toBeVisible();
  });
});

test.describe("Mobile Navigation", () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test("mobile menu opens and shows navigation", async ({ page }) => {
    await page.goto("/");

    // Mobile menu button should be visible
    const menuButton = page.getByLabel(/toggle menu/i);
    await expect(menuButton).toBeVisible();

    // Click menu button
    await menuButton.click();

    // Navigation links should now be visible
    await expect(page.getByRole("link", { name: /trekking/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /search/i })).toBeVisible();
  });
});
