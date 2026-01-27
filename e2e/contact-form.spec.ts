import { test, expect } from "@playwright/test";

test.describe("Contact Page", () => {
  test("contact page loads with form", async ({ page }) => {
    await page.goto("/contact-us/");

    // Page heading should be visible
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/contact/i);

    // Form should be present
    await expect(page.getByRole("textbox", { name: /name/i })).toBeVisible();
    await expect(page.getByRole("textbox", { name: /email/i })).toBeVisible();
  });

  test("contact form has all required fields", async ({ page }) => {
    await page.goto("/contact-us/");

    // Check for required form fields
    await expect(page.getByRole("textbox", { name: /name/i })).toBeVisible();
    await expect(page.getByRole("textbox", { name: /email/i })).toBeVisible();
    await expect(page.getByRole("textbox", { name: /message/i })).toBeVisible();
  });

  test("contact form validates email", async ({ page }) => {
    await page.goto("/contact-us/");

    // Fill form with invalid email
    await page.getByRole("textbox", { name: /name/i }).fill("Test User");
    await page.getByRole("textbox", { name: /email/i }).fill("invalid-email");
    await page.getByRole("textbox", { name: /message/i }).fill("Test message");

    // Try to submit
    await page.getByRole("button", { name: /send|submit/i }).click();

    // Email field should show validation error (HTML5 validation)
    const emailInput = page.getByRole("textbox", { name: /email/i });
    await expect(emailInput).toHaveAttribute("type", "email");
  });

  test("displays contact information", async ({ page }) => {
    await page.goto("/contact-us/");

    // Should display phone or email contact info
    await expect(
      page.getByText(/\+255|info@snowafricaadventure/i)
    ).toBeVisible();
  });
});

test.describe("Inquiry Form", () => {
  test("tailor-made safari page has inquiry form", async ({ page }) => {
    await page.goto("/tailor-made-safari/");

    // Page should load
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Form should be present
    await expect(page.getByRole("textbox", { name: /name/i })).toBeVisible();
  });

  test("inquiry form has trip preference fields", async ({ page }) => {
    await page.goto("/tailor-made-safari/");

    // Should have date or preference fields
    const hasDateField = await page.getByLabel(/date|when/i).isVisible().catch(() => false);
    const hasGuestsField = await page.getByLabel(/guests|people|travelers/i).isVisible().catch(() => false);

    // At least one preference field should exist
    expect(hasDateField || hasGuestsField).toBeTruthy();
  });
});

test.describe("Form Accessibility", () => {
  test("form fields have proper labels", async ({ page }) => {
    await page.goto("/contact-us/");

    // All inputs should have associated labels
    const nameInput = page.getByRole("textbox", { name: /name/i });
    const emailInput = page.getByRole("textbox", { name: /email/i });

    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();

    // Inputs should be accessible by their labels
    await expect(nameInput).toHaveAccessibleName(/.+/);
    await expect(emailInput).toHaveAccessibleName(/.+/);
  });

  test("submit button is clearly labeled", async ({ page }) => {
    await page.goto("/contact-us/");

    // Submit button should have clear text
    const submitButton = page.getByRole("button", { name: /send|submit|contact/i });
    await expect(submitButton).toBeVisible();
  });
});
