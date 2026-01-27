import { test, expect } from "@playwright/test";

test.describe("Search Functionality", () => {
  test("search page loads with input field", async ({ page }) => {
    await page.goto("/search/");

    // Search input should be visible
    const searchInput = page.getByPlaceholder(/search routes, safaris/i);
    await expect(searchInput).toBeVisible();
    await expect(searchInput).toBeFocused();
  });

  test("shows popular searches on initial load", async ({ page }) => {
    await page.goto("/search/");

    // Should show popular search suggestions
    await expect(page.getByText(/popular searches/i)).toBeVisible();
    await expect(page.getByRole("link", { name: /serengeti/i })).toBeVisible();
  });

  test("displays results when searching", async ({ page }) => {
    await page.goto("/search/");

    // Type search query
    const searchInput = page.getByPlaceholder(/search routes, safaris/i);
    await searchInput.fill("safari");

    // Wait for results (debounced search)
    await page.waitForTimeout(500);

    // Should show results count
    await expect(page.getByText(/found.*results/i)).toBeVisible();
  });

  test("can filter results by type", async ({ page }) => {
    await page.goto("/search/?q=safari");

    // Wait for results
    await expect(page.getByText(/found.*results/i)).toBeVisible();

    // Filter buttons should be visible
    await expect(page.getByRole("button", { name: /all/i })).toBeVisible();
  });

  test("shows no results message for unknown query", async ({ page }) => {
    await page.goto("/search/?q=xyznonexistent123");

    // Wait for search to complete
    await page.waitForTimeout(500);

    // Should show no results message
    await expect(page.getByText(/no results found/i)).toBeVisible();
  });

  test("updates URL with search query", async ({ page }) => {
    await page.goto("/search/");

    // Type search query
    const searchInput = page.getByPlaceholder(/search routes, safaris/i);
    await searchInput.fill("kilimanjaro");

    // Wait for URL update (debounced)
    await page.waitForTimeout(500);

    // URL should contain query parameter
    await expect(page).toHaveURL(/q=kilimanjaro/);
  });

  test("can clear search", async ({ page }) => {
    await page.goto("/search/?q=test");

    // Clear button should be visible
    const clearButton = page.getByRole("button").filter({ has: page.locator("svg") }).last();

    // Click to clear
    await clearButton.click();

    // Search input should be empty
    const searchInput = page.getByPlaceholder(/search routes, safaris/i);
    await expect(searchInput).toHaveValue("");
  });
});
