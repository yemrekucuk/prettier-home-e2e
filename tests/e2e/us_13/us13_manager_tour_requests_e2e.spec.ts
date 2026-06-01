import { test, expect } from "@playwright/test";
import { Client } from "pg";
import { LoginPage } from "../../../pages/main/LoginPage";
import { ControlPanelPage } from "../../../pages/dashboard/ControlPanelPage";
import { MyTourRequestsPage } from "../../../pages/main/MyTourRequestsPage";
import { TourRequestService } from "../../../utils/api-tourRequest-service";
import { getToken } from "../../../utils/api-auth-utils";

test.describe.serial("US_13 — Manager Tour Requests E2E Doğrulamasi", () => {
  let loginPage: LoginPage;
  let controlPanelPage: ControlPanelPage;
  let myTourRequestsPage: MyTourRequestsPage;

  let dbClient: Client;
  let managerToken: string;
  let customerToken: string;

  let createdTourRequestId: number;
  let createdTourDate: string;
  let createdTourTime: string;

  const TEST_ADVERT_ID = Number(process.env.TEST_ADVERT_ID) || 63;

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

    dbClient = new Client({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: false,
    });
    await dbClient.connect();
  });

  test.beforeEach(async ({ page, request }) => {
    const tourService = new TourRequestService(request);
    const tourData = await tourService.createTourRequest(
      customerToken,
      TEST_ADVERT_ID,
    );

    createdTourRequestId = tourData.id;

    const [year, month, day] = tourData.date.split("-");
    createdTourDate = `${day}.${month}.${year}`;
    let [hourStr, minute] = tourData.time.split(":");
    let hourNum = parseInt(hourStr, 10);
    const ampm = hourNum >= 12 ? "PM" : "AM";
    hourNum = hourNum % 12 || 12;
    createdTourTime = `${hourNum}:${minute} ${ampm}`;

    const dbResult = await dbClient.query(
      `
      SELECT status FROM tour_requests WHERE id = $1
    `,
      [createdTourRequestId],
    );

    expect(dbResult.rows.length).toBe(1);
    expect(dbResult.rows[0].status).toBe(0);

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

    try {
      const declineResponse = await request.get(
        `${apiBase}/tour-requests/${createdTourRequestId}/decline`,
        {
          headers: { Authorization: `Bearer ${managerToken}` },
        },
      );

      if (declineResponse.ok() || declineResponse.status() === 409) {
        const deleteResponse = await request.delete(
          `${apiBase}/tour-requests/${createdTourRequestId}`,
          {
            headers: { Authorization: `Bearer ${managerToken}` },
          },
        );

        if (!deleteResponse.ok()) {
          console.warn(`⚠️ API Cleanup FAILED — ID: ${createdTourRequestId}`);
        }
      }

      const dbVerifyDelete = await dbClient.query(
        `
        SELECT COUNT(*) FROM tour_requests WHERE id = $1
      `,
        [createdTourRequestId],
      );

      expect(Number(dbVerifyDelete.rows[0].count)).toBe(0);
    } catch (error) {
      console.error("Teardown error: ", error);
    }
  });

  test.afterAll(async () => {
    await dbClient.end();
  });

  test("TC_01 - Managerin statusu beklemede olan randevu isteklerini kabul edebilmesi (UI + API + DB Doğrulaması)", async ({
    request,
  }) => {
    await myTourRequestsPage.manageRequestByDateTime(
      createdTourDate,
      createdTourTime,
      "approve",
    );

    await expect(myTourRequestsPage.toastMessage).toBeVisible({
      timeout: 5000,
    });

    const apiResponse = await request.get(
      `${process.env.API_URL}/tour-requests/auth/owner?size=100`,
      {
        headers: { Authorization: `Bearer ${managerToken}` },
      },
    );
    const responseBody = await apiResponse.json();

    const targetRequest = responseBody.content.find(
      (req: any) => req.id === createdTourRequestId,
    );

    expect(targetRequest).toBeDefined();
    expect(targetRequest.status).toBe("APPROVED");

    const dbResult = await dbClient.query(
      `
      SELECT status FROM tour_requests WHERE id = $1
    `,
      [createdTourRequestId],
    );

    expect(Number(dbResult.rows[0].status)).toBe(1);
  });

  test("TC_02 - Managerin statusu beklemede olan randevu isteklerini reddedebilmesi (UI + API + DB Doğrulaması)", async ({
    request,
  }) => {
    await myTourRequestsPage.manageRequestByDateTime(
      createdTourDate,
      createdTourTime,
      "reject",
    );

    await expect(myTourRequestsPage.toastMessage).toBeVisible({
      timeout: 5000,
    });

    const apiResponse = await request.get(
      `${process.env.API_URL}/tour-requests/auth/owner?size=100`,
      {
        headers: { Authorization: `Bearer ${managerToken}` },
      },
    );
    const responseBody = await apiResponse.json();

    const targetRequest = responseBody.content.find(
      (req: any) => req.id === createdTourRequestId,
    );

    expect(targetRequest).toBeDefined();
    expect(targetRequest.status).toBe("DECLINED");

    const dbResult = await dbClient.query(
      `
      SELECT status FROM tour_requests WHERE id = $1
    `,
      [createdTourRequestId],
    );

    expect(Number(dbResult.rows[0].status)).toBe(2);
  });
});
