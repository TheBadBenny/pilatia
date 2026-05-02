import { test, expect } from "@playwright/test";

test("debug: dimensiones del modal y contenido", async ({ page, viewport }) => {
  test.skip(!viewport || viewport.width >= 768, "solo mobile");
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.getByRole("button", { name: /abrir menú/i }).click();
  await page.waitForTimeout(300);

  // Inspect dialog
  const dialog = page.getByRole("dialog");
  const dialogBox = await dialog.boundingBox();
  console.log("Dialog bbox:", dialogBox);

  const dialogHTML = await dialog.evaluate((el) => el.outerHTML.slice(0, 500));
  console.log("Dialog HTML start:", dialogHTML);

  // Check nav inside
  const nav = dialog.locator("nav");
  const navBox = await nav.boundingBox();
  console.log("Nav inside dialog bbox:", navBox);
  const navHTML = await nav.evaluate((el) => el.outerHTML.slice(0, 800));
  console.log("Nav HTML start:", navHTML);

  // Check first link "Pilates en Madrid"
  const firstLink = dialog.getByRole("link", { name: /pilates en madrid/i });
  const linkVisible = await firstLink.isVisible();
  const linkBox = await firstLink.boundingBox();
  console.log("First link visible:", linkVisible, "bbox:", linkBox);

  // Check viewport dimensions
  const vp = page.viewportSize();
  console.log("Viewport:", vp);

  expect(linkVisible).toBe(true);
});
