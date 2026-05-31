import { expect, test } from "@playwright/test";
import { LoginPage } from "../../../pages/main/LoginPage";
import { ControlPanelPage } from "../../../pages/dashboard/ControlPanelPage";
import { MyTourRequestsPage } from "../../../pages/main/MyTourRequestsPage";
import { TourRequestService } from "../../../utils/api-tourRequest-service";
import { getToken } from "../../../utils/api-auth-utils";

test.describe.serial("US_13 - Manager Tour Requests Validation", () => {
  let loginPage: LoginPage;
  let controlPanelPage: ControlPanelPage;
  let myTourRequestsPage: MyTourRequestsPage;

  let managerToken: string;
  let customerToken: string;
  let createdTourRequestId: number;
  const TEST_ADVERT_ID = 63;

  test.beforeAll(async ({ request }) => {
    managerToken = await getToken(
      request,
      process.env.MANAGER_EMAIL as string,
      process.env.MANAGER_PASSWORD as string,
    );

    customerToken = await getToken(
      request,
      process.env.CUSTOMER_EMAIL_YEK as string,
      process.env.CUSTOMER_PASSWORD_YEK as string,
    );
  });

  test.beforeEach(async ({ page, request }) => {
    const tourService = new TourRequestService(request);
    createdTourRequestId = await tourService.createTourRequest(
      customerToken,
      TEST_ADVERT_ID,
    );

    loginPage = new LoginPage(page);
    controlPanelPage = new ControlPanelPage(page);
    myTourRequestsPage = new MyTourRequestsPage(page);
    await loginPage.navigate();
    await loginPage.loginAsManager();
    await controlPanelPage.clickBackToSiteLink();
    await myTourRequestsPage.clickUserLogo();
    await myTourRequestsPage.clickMyTourRequestsLink();
    await myTourRequestsPage.clickMyResponsesTab();
    await page.waitForURL(/.*\/my-tour-requests/);
  });

  test.afterEach(async ({ request }) => {
    if (!createdTourRequestId) return;

    const apiBase = (process.env.API_URL ?? "").replace(/\/+$/, "");

    await request.get(
      `${apiBase}/tour-requests/${createdTourRequestId}/decline`,
      { headers: { Authorization: `Bearer ${managerToken}` } },
    );

    const deleteResponse = await request.delete(
      `${apiBase}/tour-requests/${createdTourRequestId}`,
      { headers: { Authorization: `Bearer ${managerToken}` } },
    );

    if (!deleteResponse.ok()) {
      console.warn(
        `⚠️ Cleanup FAILED — ID: ${createdTourRequestId} | Status: ${deleteResponse.status()} | Test: ${test.info().title}`,
      );
    }
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

  test("TC_05 - Managerin randevu talebini yanitlarken islemden vazgecebilmesi", async () => {
    await expect(myTourRequestsPage.getPendingRows().first()).toBeVisible({
      timeout: 15000,
    });
    await myTourRequestsPage.managePendingRequest("reject", "cancel");
    await expect(myTourRequestsPage.confirmPopup).toBeHidden();
    await expect(myTourRequestsPage.toastMessage).toBeHidden();
  });

  test("TC_06 - Managerin liste limitini aşan randevu taleplerinde sayfalari goruntuleyebilmesi", async () => {
    await expect(myTourRequestsPage.visibleRequestRows.first()).toBeVisible({
      timeout: 15000,
    });
    await myTourRequestsPage.clickPageTwo();
    await expect(myTourRequestsPage.previousPageButton).toBeEnabled();
  });
});

test.describe
  .serial("US_13 - Manager Tour Requests Validation (Empty State)", () => {
  let loginPage: LoginPage;
  let controlPanelPage: ControlPanelPage;
  let myTourRequestsPage: MyTourRequestsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    controlPanelPage = new ControlPanelPage(page);
    myTourRequestsPage = new MyTourRequestsPage(page);
    await loginPage.navigate();
    await loginPage.loginAsEmptyManager();
    await controlPanelPage.clickBackToSiteLink();
    await myTourRequestsPage.clickUserLogo();
    await myTourRequestsPage.clickMyTourRequestsLink();
    await myTourRequestsPage.clickMyResponsesTab();
    await page.waitForURL(/.*\/my-tour-requests/);
  });

  test("TC_04 - Managerin hiç randevu isteği yokken veri olmama durumunu görüntüleyebilmesi ", async ({
    page,
  }) => {
    await expect(myTourRequestsPage.visibleRequestRows).toHaveCount(0);
    const emptyMessage = page.getByText(myTourRequestsPage.emptyStateText, {
      exact: false,
    });
    await expect(emptyMessage).toBeVisible();
  });
});
