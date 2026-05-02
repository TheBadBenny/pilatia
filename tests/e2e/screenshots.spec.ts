import { test } from "@playwright/test";

test.describe("Visual snapshots del header", () => {
  test("home — header con menu cerrado", async ({ page }, testInfo) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.screenshot({
      path: `test-results/snapshots/${testInfo.project.name}-header-closed.png`,
      fullPage: false,
      clip: { x: 0, y: 0, width: testInfo.project.use.viewport!.width, height: 120 },
    });
  });

  test("home — header con menu abierto (mobile)", async ({ page, viewport }, testInfo) => {
    test.skip(!viewport || viewport.width >= 768, "solo mobile");
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.getByRole("button", { name: /abrir menú/i }).click();
    await page.waitForTimeout(500);
    await page.screenshot({
      path: `test-results/snapshots/${testInfo.project.name}-menu-open.png`,
      fullPage: false,
    });
  });

  test("home — full page top 800px", async ({ page }, testInfo) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.screenshot({
      path: `test-results/snapshots/${testInfo.project.name}-home-top.png`,
      fullPage: false,
      clip: { x: 0, y: 0, width: testInfo.project.use.viewport!.width, height: 800 },
    });
  });
});
