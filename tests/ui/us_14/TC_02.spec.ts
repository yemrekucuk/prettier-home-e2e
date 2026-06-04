import { test, expect } from "@playwright/test";
import { LoginPage } from "../../../pages/main/LoginPage";
import { MyTourRequestsPage } from "../../../pages/main/MyTourRequestsPage";
import { ControlPanelPage } from "../../../pages/dashboard/ControlPanelPage";

test.describe("US_14: Manager Randevu Yönetimi", () => {
  test("TC_02 Manager oluşturduğu randevuların durumunu listede görebilmeli", async ({ page }) => {
    await page.goto("https://prettierhome.deployedprojects.xyz/login", { waitUntil: "load" });
    const loginPage = new LoginPage(page);
    const controlPanelPage = new ControlPanelPage(page);

    await loginPage.loginAsManager();
    await page.waitForURL("**/dashboard");
    await controlPanelPage.clickBackToSiteLink(); 

    await page.goto("https://prettierhome.deployedprojects.xyz/my-tour-requests", { waitUntil: "load" });
    const myTourRequestsPage = new MyTourRequestsPage(page);
    
    await myTourRequestsPage.lastCreatedTourRequestVisibleTest();
  });
});
