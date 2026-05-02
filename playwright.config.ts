import { defineConfig, devices } from "@playwright/test";

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? "https://pilatia.es";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["list"]],
  use: {
    baseURL: BASE_URL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 800 } } },
    { name: "tablet", use: { ...devices["iPad (gen 7)"], viewport: { width: 768, height: 1024 } } },
    { name: "mobile-iphone-se", use: { ...devices["iPhone SE"], viewport: { width: 375, height: 667 } } },
    { name: "mobile-iphone-14", use: { ...devices["iPhone 13"], viewport: { width: 390, height: 844 } } },
  ],
});
