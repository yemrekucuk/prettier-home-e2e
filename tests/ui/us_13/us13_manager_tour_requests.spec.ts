import { expect, test } from "@playwright/test";
import { LoginPage } from "../../../pages/main/LoginPage";
import { ControlPanelPage } from "../../../pages/dashboard/ControlPanelPage";
import { HomePage } from "../../../pages/main/HomePage";
import { MyTourRequestsPage } from "../../../pages/main/MyTourRequestsPage";

test.describe("US_13 - Manager Tour Requests Validation", () => {
  let loginPage: LoginPage;
  let controlPanelPage: ControlPanelPage;
  let homePage: HomePage;
  let myTourRequestsPage: MyTourRequestsPage;

  test.beforeEach(async ({ page }) => {
    await page.goto("/login");

    loginPage = new LoginPage(page);
    controlPanelPage = new ControlPanelPage(page);
    myTourRequestsPage = new MyTourRequestsPage(page);

    await loginPage.loginAsManager();

    homePage = await controlPanelPage.clickBackToSiteLink();

    await homePage.clickUserLogo();
    await homePage.clickMyTourRequestsLink();
    await myTourRequestsPage.clickMyResponsesTab();
    await expect(page).toHaveURL(/.*\/my-tour-requests/);
  });

  test("TC_01 - Managerin verdiği ilana gelen randevu isteklerini görüntüleyebilmesi", async () => {
    await expect(myTourRequestsPage.visibleRequestRows.first()).toBeVisible({
      timeout: 15000,
    });
  });

  test("TC_02 - Managerin statusu beklemede olan randevu isteklerini reddedebilmeli", async () => {
    await expect(myTourRequestsPage.getPendingRows().first()).toBeVisible({
      timeout: 15000,
    });
    await myTourRequestsPage.managePendingRequest("reject");
    await expect(myTourRequestsPage.toastMessage).toBeVisible({
      timeout: 5000,
    });
  });

  test("TC_03 - Managerin statusu beklemede olan randevu isteklerini kabul edebilmeli", async () => {
    await expect(myTourRequestsPage.getPendingRows().first()).toBeVisible({
      timeout: 15000,
    });

    await myTourRequestsPage.managePendingRequest("approve");
    await expect(myTourRequestsPage.toastMessage).toBeVisible({
      timeout: 5000,
    });
  });
});
