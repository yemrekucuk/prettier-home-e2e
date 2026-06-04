import { test, expect } from "@playwright/test";
import { TourRequestService } from "../../../utils/api-tourRequest-service";
import { getToken } from "../../../utils/api-auth-utils";
import advertData from '../../../test-data/us_13/advertData.json';

test.describe("US_13 - Manager Tour Requests API", () => {
  let managerToken: string;
  let customerToken: string;
  let createdTourRequestId: number;
  const TEST_ADVERT_ID = advertData.testAdvertId;

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

  test.beforeEach(async ({ request }) => {
    const tourService = new TourRequestService(request);
    const tourData = await tourService.createTourRequest(
      customerToken,
      TEST_ADVERT_ID,
    );
    createdTourRequestId = tourData.id;
  });

  test.afterEach(async ({ request }) => {
    if (!createdTourRequestId) return;

    await request.get(
      `${process.env.API_URL}/tour-requests/${createdTourRequestId}/decline`,
      {
        headers: { Authorization: `Bearer ${managerToken}` },
      },
    );

    const deleteResponse = await request.delete(
      `${process.env.API_URL}/tour-requests/${createdTourRequestId}`,
      {
        headers: { Authorization: `Bearer ${managerToken}` },
      },
    );

    if (!deleteResponse.ok()) {
      console.warn(`⚠️ API Cleanup FAILED — ID: ${createdTourRequestId}`);
    }
  });

  test("TC_01 - Managerin verdiği ilana gelen randevu isteklerini görüntüleyebilmesi", async ({
    request,
  }) => {
    const response = await request.get(
      `${process.env.API_URL}/tour-requests/auth/owner?size=100`,
      {
        headers: {
          Authorization: `Bearer ${managerToken}`,
        },
      },
    );

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody.content.length).toBeGreaterThan(0);
  });

  test("TC_02 - Managerin statusu beklemede olan randevu isteklerini reddedebilmeli", async ({
    request,
  }) => {
    const response = await request.get(
      `${process.env.API_URL}/tour-requests/${createdTourRequestId}/decline`,
      {
        headers: {
          Authorization: `Bearer ${managerToken}`,
        },
      },
    );

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody.status).toBe("DECLINED");
  });

  test("TC_03 - Managerin statusu beklemede olan randevu isteklerini kabul edebilmeli", async ({
    request,
  }) => {
    const response = await request.get(
      `${process.env.API_URL}/tour-requests/${createdTourRequestId}/approve`,
      {
        headers: {
          Authorization: `Bearer ${managerToken}`,
        },
      },
    );

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody.status).toBe("APPROVED");
  });
});
