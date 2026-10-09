import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/destinations",
  "/manage",
  "/passenger-details",
  "/results",
  "/travel-info",
];

for (const route of routes) {
  test(`no accessible violations on ${route}`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator("#main")).toBeVisible();
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
}