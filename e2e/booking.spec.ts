import { expect, test } from "@playwright/test";

test("complete the five-step booking flow and retrieve the booking", async ({
  page,
}) => {
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

  await expect(page).toHaveURL(/\/passengers/);
  await page.fill("#t-0-first", "Maria");
  await page.fill("#t-0-last", "Santos");
  await page.getByRole("button", { name: "Choose seats" }).click();

  await expect(page).toHaveURL(/\/seats/);
  await page.getByRole("button", { name: "Seat 2A", exact: true }).click();
  await page.getByRole("button", { name: "Continue to payment" }).click();

  await expect(page).toHaveURL(/\/payment/);
  await page.getByRole("button", { name: /Pay .*\(demo\)/ }).click();

  await expect(page).toHaveURL(/\/confirmation\/?\?ref=/);
  await expect(
    page.getByRole("heading", { name: "You are booked." }),
  ).toBeVisible();

  const reference = new URL(page.url()).searchParams.get("ref");
  expect(reference).toBeTruthy();

  await page.goto("/manage");
  await page.fill("#reference", reference ?? "");
  await page.fill("#surname", "Santos");
  await page.getByRole("button", { name: "Find booking" }).click();

  await expect(page.locator(".booking-result.show")).toContainText(
    `${reference} confirmed`,
  );
});

test("deep links into results with URL search params", async ({ page }) => {
  await page.goto(
    "/results?from=Manila%20(MNL)&to=Tokyo%20(NRT)&depart=2026-12-01&adults=1&cabin=Economy&trip=round",
  );

  await expect(
    page.getByRole("heading", { name: "Available fares" }),
  ).toBeVisible();
  await expect(page.locator(".flight-option")).toHaveCount(3);
});
