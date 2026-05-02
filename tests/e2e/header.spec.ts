import { test, expect } from "@playwright/test";

test.describe("Header / navegación", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("logo y nombre Pilatia visibles", async ({ page }) => {
    const logo = page.getByRole("link", { name: /pilatia/i }).first();
    await expect(logo).toBeVisible();
    await expect(logo).toContainText("Pilatia");
  });

  test("desktop: enlaces de nav visibles", async ({ page, viewport }) => {
    test.skip(!viewport || viewport.width < 768, "solo desktop");
    const header = page.locator("header").first();
    await expect(header.getByRole("link", { name: "Precios" }).first()).toBeVisible();
    await expect(header.getByRole("link", { name: "Metodología" }).first()).toBeVisible();
    await expect(header.getByRole("link", { name: "Sobre" }).first()).toBeVisible();
    await expect(header.getByRole("link", { name: "Ver estudios" })).toBeVisible();
  });

  test("desktop: hamburguesa NO visible", async ({ page, viewport }) => {
    test.skip(!viewport || viewport.width < 768, "solo desktop");
    const burger = page.getByRole("button", { name: /abrir menú/i });
    await expect(burger).not.toBeVisible();
  });

  test("mobile: hamburguesa visible y enlaces desktop ocultos", async ({ page, viewport }) => {
    test.skip(!viewport || viewport.width >= 768, "solo mobile");
    const burger = page.getByRole("button", { name: /abrir menú/i });
    await expect(burger).toBeVisible();

    // Los enlaces de desktop NO deben estar visibles en mobile
    const header = page.locator("header").first();
    await expect(header.getByRole("link", { name: "Ver estudios" })).not.toBeVisible();
  });

  test("mobile: click en hamburguesa abre el menú", async ({ page, viewport }) => {
    test.skip(!viewport || viewport.width >= 768, "solo mobile");
    await page.getByRole("button", { name: /abrir menú/i }).click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText("Por modalidad");
    await expect(dialog).toContainText("Por barrio");
    await expect(dialog.getByRole("link", { name: /pilates en madrid/i })).toBeVisible();
    await expect(dialog.getByRole("link", { name: /barre en madrid/i })).toBeVisible();
    await expect(dialog.getByRole("link", { name: /reformer pilates madrid/i })).toBeVisible();
    await expect(dialog.getByRole("link", { name: /salamanca/i })).toBeVisible();
    await expect(dialog.getByRole("button", { name: /cerrar menú/i })).toBeVisible();
  });

  test("mobile: cerrar con X", async ({ page, viewport }) => {
    test.skip(!viewport || viewport.width >= 768, "solo mobile");
    await page.getByRole("button", { name: /abrir menú/i }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.getByRole("button", { name: /cerrar menú/i }).click();
    await expect(page.getByRole("dialog")).not.toBeVisible();
  });

  test("mobile: cerrar con ESC", async ({ page, viewport }) => {
    test.skip(!viewport || viewport.width >= 768, "solo mobile");
    await page.getByRole("button", { name: /abrir menú/i }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).not.toBeVisible();
  });

  test("mobile: click en link cierra y navega", async ({ page, viewport }) => {
    test.skip(!viewport || viewport.width >= 768, "solo mobile");
    await page.getByRole("button", { name: /abrir menú/i }).click();
    const dialog = page.getByRole("dialog");
    await dialog.getByRole("link", { name: /pilates en madrid/i }).click();
    await page.waitForURL(/\/pilates-madrid\/?$/);
    await expect(page.getByRole("dialog")).not.toBeVisible();
    await expect(page).toHaveURL(/\/pilates-madrid\/?$/);
  });

  test("header sticky: visible tras scroll", async ({ page }) => {
    const header = page.locator("header").first();
    await expect(header).toBeVisible();
    await page.evaluate(() => window.scrollTo(0, 1500));
    await page.waitForTimeout(300);
    await expect(header).toBeVisible();
    // Bounding box top should still be 0 (sticky)
    const box = await header.boundingBox();
    expect(box?.y).toBeLessThan(20);
  });
});

test.describe("Smoke test rutas principales", () => {
  const routes = [
    "/",
    "/precios/",
    "/pilates-madrid/",
    "/barre-madrid/",
    "/reformer-pilates-madrid/",
    "/metodologia/",
    "/sobre/",
    "/barrios/salamanca/",
    "/barrios/la-latina/",
    "/estudios/pilates-zentro/",
  ];

  for (const route of routes) {
    test(`carga ${route}`, async ({ page }) => {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1").first()).toBeVisible();
      await expect(page.locator("header").first()).toBeVisible();
      await expect(page.locator("footer").first()).toBeVisible();
    });
  }
});
