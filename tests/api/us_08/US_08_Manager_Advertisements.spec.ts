import {
  test,
  expect,
  APIRequestContext,
  request as playwrightRequest,
} from "@playwright/test";
import { AdvertService } from "../../../utils/api-advert-service";

const apiBaseUrl =
  process.env.API_URL || "https://prettierhome-api.deployedprojects.xyz";

async function createManagerRequest(request: APIRequestContext) {
  const loginResponse = await request.post(`${apiBaseUrl}/users/login`, {
    data: {
      email: process.env.MANAGER_EMAIL,
      password: process.env.MANAGER_PASSWORD,
    },
  });

  expect(loginResponse.status()).toBe(200);

  const loginBody = await loginResponse.json();
  expect(loginBody.token).toBeTruthy();

  return await playwrightRequest.newContext({
    baseURL: apiBaseUrl,
    extraHTTPHeaders: {
      Authorization: `Bearer ${loginBody.token}`,
    },
  });
}

function extractAdvertList(body: unknown) {
  if (Array.isArray(body)) {
    return body;
  }

  if (body && typeof body === "object") {
    const payload = body as {
      content?: unknown[];
      items?: unknown[];
      data?: unknown[];
    };

    if (Array.isArray(payload.content)) {
      return payload.content;
    }
    if (Array.isArray(payload.items)) {
      return payload.items;
    }
    if (Array.isArray(payload.data)) {
      return payload.data;
    }
  }

  return [];
}

test.describe.serial("US_08 - Manager İlan Yönetimi API Testleri", () => {
  let managerRequest: APIRequestContext | null = null;
  let advertService: AdvertService;

  async function getFirstAdvertId(): Promise<number> {
    expect(managerRequest).not.toBeNull();
    const listResponse = await managerRequest!.get(
      "/adverts/search?page=0&size=20",
    );
    expect(listResponse.status()).toBe(200);

    const listBody = await listResponse.json();
    const adverts = extractAdvertList(listBody) as Array<{
      id?: number;
      title?: string;
    }>;

    expect(adverts.length).toBeGreaterThan(0);
    const firstAdvertId = adverts[0]?.id;
    expect(firstAdvertId).toBeDefined();
    return firstAdvertId as number;
  }

  test.beforeEach(async ({ request }) => {
    managerRequest = await createManagerRequest(request);
    advertService = new AdvertService(managerRequest);
  });

  test.afterEach(async () => {
    if (managerRequest) {
      await managerRequest.dispose();
    }
  });

  test("TC_01 - Manager verdiği ilanları görebilmeli", async () => {
    const listResponse = await advertService.getAllAdverts(0, 20);
    expect(listResponse.status()).toBe(200);

    const listBody = await listResponse.json();
    const adverts = extractAdvertList(listBody);
    expect(adverts.length).toBeGreaterThan(0);
  });

  test("TC_02 - Manager ilan detayını admin endpoint ile görebilmeli", async () => {
    const advertId = await getFirstAdvertId();

    const detailResponse = await managerRequest!.get(
      `/adverts/${advertId}/admin`,
    );
    expect(detailResponse.status()).toBe(200);

    const detail = await detailResponse.json();
    expect(detail.id).toBe(advertId);
    expect(detail.title).toBeDefined();
  });

  test("TC_03 - Manager auth endpointine erişim yetkisinin backend tarafından kısıtlandığını doğrulamalı", async () => {
    const advertId = await getFirstAdvertId();

    const detailResponse = await managerRequest!.get(
      `/adverts/${advertId}/auth`,
    );

    expect([400, 401, 403, 404]).toContain(detailResponse.status());
  });

  test("TC_04 - Manager ilan oluşturma isteği yapabilmeli (başarısız oluşsa da kontrol edilmeli)", async () => {
    const payload = {
      title: "Manager API Test Advert",
      description: "API test advert created by manager",
      price: 100000,
      categoryId: 1,
      advertType: "Sale",
      country: "Türkiye",
      city: "İstanbul",
      district: "Kadıköy",
      address: "API Test Address",
      size: 100,
      bedrooms: 2,
      bathrooms: 1,
      garage: "No",
      buildYear: 2023,
      furniture: "No",
      maintenanceFee: 100,
      terrace: "No",
    };

    const createResponse = await advertService.createAdvert(payload);
    expect([400, 401, 403]).toContain(createResponse.status());
  });

  test("TC_05 - Manager ilan güncelleme isteği yapabilmeli (backend kısıtlamasını doğrula)", async () => {
    const advertId = await getFirstAdvertId();
    const updateResponse = await advertService.updateAdvert(advertId, {
      title: "Manager Updated API Advert",
    });

    expect([400, 401, 403, 404]).toContain(updateResponse.status());
  });

  test("TC_06 - Manager ilan silme isteği yapabilmeli (backend kısıtlamasını doğrula)", async () => {
    const advertId = await getFirstAdvertId();
    const deleteResponse = await advertService.deleteAdvert(advertId);

    expect([400, 401, 403, 404]).toContain(deleteResponse.status());
  });
});
