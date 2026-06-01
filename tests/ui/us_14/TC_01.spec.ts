import { test, expect } from "@playwright/test";
import { LoginPage } from "../../../pages/main/LoginPage";
import { ListingDetailsPage } from "../../../pages/main/ListingDetailsPage";
import { ControlPanelPage } from "../../../pages/dashboard/ControlPanelPage";

test.describe("US_14: Manager Randevu Yönetimi", () => {
  test("TC_01 Manager başka birinin ilanına randevu (Tour) isteği gönderebilmeli", async ({ page }) => {
    await page.goto("https://prettierhome.deployedprojects.xyz/login", { waitUntil: "load" });
    const loginPage = new LoginPage(page);
    const controlPanelPage = new ControlPanelPage(page);

    await loginPage.loginAsManager();
    await page.waitForURL("**/dashboard");
    await controlPanelPage.clickBackToSiteLink(); 

    await page.goto("https://prettierhome.deployedprojects.xyz", { waitUntil: "load" });
    const firstAdvert = page.locator('a[href*="/advert/"]').first();
    await expect(firstAdvert, 'Ana sayfada ilan bulunamadı').toBeVisible({ timeout: 15000 });
    await firstAdvert.click();

    const listingDetailsPage = new ListingDetailsPage(page);
    await listingDetailsPage.scheduleATour("2027-06-20", "15:00");
  });
});
