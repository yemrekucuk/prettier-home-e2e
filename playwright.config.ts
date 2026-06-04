import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

/**
 * .env dosyasını okumak için yapılandırma.
 * Bu sayede process.env.BASE_URL gibi değişkenlere erişebilirsin.
 */
dotenv.config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Sisteme binen yükü azaltmak için dosya içi paralel koşumu kapatıyoruz */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Hem lokalde hem CI ortamında sunucuyu yormamak için tek worker (Sequential Execution) kullanıyoruz */
  workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. */
  use: {
    /* .env dosyasındaki BASE_URL'i kullan, yoksa yedek olarak adresi yaz */
    baseURL: process.env.BASE_URL || "https://prettierhome.deployedprojects.xyz",

    /* Collect trace when retrying the failed test. */
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    // Firefox ve WebKit bloklarını senin bıraktığın gibi yorum satırında tuttum.
    /* {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    }, */
  ],
});