import { expect, test } from "@playwright/test";

test("search, book, then retrieve the booking", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: "Everyday fares. Farther possibilities.",
    }),
  ).toBeVisible();

  await page.fill("#depart", "2026-12-01");
  await page.getByRole("button", { name: "Search flights" }).click();

  await expect(page).toHaveURL(/\/results/);
  await expect(
    page.getByRole("heading", { name: "Available fares" }),
  ).toBeVisible();

  const options = page.locator(".flight-option");
  await expect(options).toHaveCount(3);
  await options.first().getByRole("button", { name: "Select" }).click();

  await expect(page).toHaveURL(/\/passenger-details/);
  await page.fill("#pd-first", "Maria");
  await page.fill("#pd-last", "Santos");
  await page.fill("#pd-email", "maria@example.com");
  await page.fill("#pd-phone", "+63 917 000 0000");
  await page.getByRole("button", { name: "Confirm booking" }).click();

  await expect(page).toHaveURL(/\/manage\/?\?confirmation=/);
  const reference = new URL(page.url()).searchParams.get("confirmation");
  expect(reference).toBeTruthy();

  await page.fill("#surname", "Santos");
  await page.getByRole("button", { name: "Find booking" }).click();

  await expect(page.locator(".booking-result.show")).toContainText(
    `${reference} confirmed`,
  );
});
