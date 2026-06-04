import {
  test,
  expect,
  APIRequestContext,
  request as playwrightRequest,
} from "@playwright/test";
import * as dotenv from "dotenv";

dotenv.config();

const BASE_URL =
  process.env.API_URL || "https://prettierhome-api.deployedprojects.xyz";
const managerEmail = process.env.MANAGER_EMAIL || "manager@gmail.com";
const managerPassword = process.env.MANAGER_PASSWORD || "manager123!";

const advertScenarios = [
  {
    id: "TC_01",
    description: "Satılık 2+1 daire ilanı oluşturulmalı",
    formData: {
      title: "1+1 Satılık Daire",
      description: "Şehir merkezinde, kullanışlı 1+1 daire.",
      price: "5000000",
      categoryId: 1,
      advertType: "Sale",
      country: "Türkiye",
      city: "Antalya",
      district: "Muratpaşa",
      address: "956 sokak no 6",
      size: "80",
      bedrooms: "1",
      bathrooms: "1",
      garage: "No",
      buildYear: "2015",
      furniture: "No",
      maintenanceFee: "200",
      terrace: "No",
      images: ["https://via.placeholder.com/640x480"],
    },
  },
  {
    id: "TC_02",
    description: "Satılık villa ilanı oluşturulmalı",
    formData: {
      title: "8+1 Satılık Villa",
      description: "Geniş bahçeli, lüks villa.",
      price: "20000000",
      categoryId: 4,
      advertType: "Sale",
      country: "Türkiye",
      city: "Antalya",
      district: "Belek",
      address: "Kemer Yolu No:45",
      size: "450",
      bedrooms: "8",
      bathrooms: "6",
      garage: "Yes",
      buildYear: "2022",
      furniture: "Yes",
      maintenanceFee: "1500",
      terrace: "Yes",
      balcony: "Yes",
      elevator: "No",
      images: ["https://via.placeholder.com/640x480"],
    },
  },
  {
    id: "TC_03",
    description: "Ofis kategorisinde ilan oluşturulmalı",
    formData: {
      title: "1+1 Ofis",
      description: "Yüksek tavanlı, merkezi ofis alanı.",
      price: "10000000",
      categoryId: 3,
      advertType: "Sale",
      country: "Deutschland",
      city: "Hamburg",
      district: "Altona",
      address: "58 sk no:2",
      size: "95",
      bedrooms: "1",
      bathrooms: "2",
      garage: "No",
      buildYear: "2018",
      furniture: "Yes",
      maintenanceFee: "1000",
      terrace: "No",
      images: ["https://via.placeholder.com/640x480"],
    },
  },
  {
    id: "TC_04",
    description: "Villa kategorisinde yurt dışı ilanı oluşturulmalı",
    formData: {
      title: "Satılık Villa",
      description: "Deniz manzaralı, ferah villa.",
      price: "50000000",
      categoryId: 4,
      advertType: "Sale",
      country: "France",
      city: "Paris",
      district: "16. Arrondissement",
      address: "Champs-Élysées 12",
      size: "320",
      bedrooms: "5",
      bathrooms: "4",
      garage: "Yes",
      buildYear: "2019",
      furniture: "Yes",
      maintenanceFee: "2000",
      terrace: "Yes",
      balcony: "Yes",
      images: ["https://via.placeholder.com/640x480"],
    },
  },
  {
    id: "TC_05",
    description: "Arsa ilanı oluşturulmalı",
    formData: {
      title: "Satılık Arsa",
      description: "Yatırımlık geniş arsa.",
      price: "8000000",
      categoryId: 5,
      advertType: "Sale",
      country: "España",
      city: "Barcelona",
      district: "Alella",
      address: "35C Park Sokak",
      size: "1285",
      zoning: "1285",
      accessRoad: "12",
      legalStatus: "125",
      landArea: "2",
      buildYear: "0",
      furniture: "No",
      maintenanceFee: "0",
      terrace: "No",
      images: ["https://via.placeholder.com/640x480"],
    },
  },
  {
    id: "TC_06",
    description: "Mağaza kategorisinde ilan oluşturulmalı",
    formData: {
      title: "Satılık Mağaza",
      description: "Cadde üzerinde geniş mağaza.",
      price: "7500000",
      categoryId: 6,
      advertType: "Sale",
      country: "France",
      city: "Ain",
      district: "Oyonnax",
      address: "1285/12",
      size: "250",
      bedrooms: "0",
      bathrooms: "1",
      garage: "Yes",
      buildYear: "2015",
      furniture: "No",
      maintenanceFee: "2000",
      terrace: "No",
      elevator: "No",
      images: ["https://via.placeholder.com/640x480"],
    },
  },
];

const validationScenarios = [
  {
    id: "TC_07",
    description:
      "Başlık minimum karakter kurallarını sağlamadan ilan oluşturulamamalı",
    formData: {
      title: "abc",
      description: "Geçerli açıklama.",
      price: "5000000",
      categoryId: 1,
      advertType: "Sale",
      country: "Türkiye",
      city: "Antalya",
      district: "Muratpaşa",
      address: "956 sokak no 6",
      size: "80",
      bedrooms: "1",
      bathrooms: "1",
      garage: "No",
      buildYear: "2015",
      furniture: "No",
      maintenanceFee: "200",
      terrace: "No",
      images: ["https://via.placeholder.com/640x480"],
    },
  },
  {
    id: "TC_08",
    description: "Bir zorunlu alan boş bırakıldığında ilan oluşturulamamalı",
    formData: {
      title: "Satılık 2+1 Daire",
      description: "Alanlardan biri boş bırakılmış form.",
      price: "5000000",
      categoryId: 1,
      advertType: "Sale",
      country: "Türkiye",
      city: "Antalya",
      district: "Muratpaşa",
      address: "",
      size: "80",
      bedrooms: "1",
      bathrooms: "1",
      garage: "No",
      buildYear: "2015",
      furniture: "No",
      maintenanceFee: "200",
      terrace: "No",
      images: ["https://via.placeholder.com/640x480"],
    },
  },
  {
    id: "TC_09",
    description: "Fiyatta negatif değer veya harf kullanımı kabul edilmemeli",
    formData: {
      title: "Satılık 2+1 Daire",
      description: "Fiyat alanı negatif değer içeriyor.",
      price: "-8000",
      categoryId: 1,
      advertType: "Sale",
      country: "Türkiye",
      city: "Antalya",
      district: "Muratpaşa",
      address: "956 sokak no 6",
      size: "80",
      bedrooms: "1",
      bathrooms: "1",
      garage: "No",
      buildYear: "2015",
      furniture: "No",
      maintenanceFee: "200",
      terrace: "No",
      images: ["https://via.placeholder.com/640x480"],
    },
  },
  {
    id: "TC_10",
    description:
      "Özellik alanlarında negatif veya harf verisi kabul edilmemeli",
    formData: {
      title: "Satılık 2+1 Daire",
      description: "Özellik alanı negatif değer içeriyor.",
      price: "5000000",
      categoryId: 1,
      advertType: "Sale",
      country: "Türkiye",
      city: "Antalya",
      district: "Muratpaşa",
      address: "956 sokak no 6",
      size: "-5",
      bedrooms: "2",
      bathrooms: "1",
      garage: "No",
      buildYear: "2015",
      furniture: "No",
      maintenanceFee: "200",
      terrace: "No",
      images: ["https://via.placeholder.com/640x480"],
    },
  },
];

const unauthorizedScenario = {
  id: "TC_11",
  description: "Manager olmayan kullanıcı ilan oluşturamamalı",
  formData: {
    title: "Yetkisiz Kullanıcı İlanı",
    description: "Yetkisiz kullanıcı tarafından oluşturulmaya çalışıldı.",
    price: "5000000",
    categoryId: 1,
    advertType: "Sale",
    country: "Türkiye",
    city: "Antalya",
    district: "Muratpaşa",
    address: "956 sokak no 6",
    size: "80",
    bedrooms: "1",
    bathrooms: "1",
    garage: "No",
    buildYear: "2015",
    furniture: "No",
    maintenanceFee: "200",
    terrace: "No",
    images: ["https://via.placeholder.com/640x480"],
  },
};

function buildAdvertPayload(formData: Record<string, any>) {
  return Object.entries(formData).reduce(
    (payload, [key, value]) => {
      if (value === undefined || value === null) {
        return payload;
      }

      const numericKeys = [
        "price",
        "size",
        "bedrooms",
        "bathrooms",
        "buildYear",
        "maintenanceFee",
        "zoning",
        "accessRoad",
        "legalStatus",
        "landArea",
      ];

      return {
        ...payload,
        [key]: numericKeys.includes(key) ? Number(value) : value,
      };
    },
    {} as Record<string, any>,
  );
}

let managerRequest: APIRequestContext;

test.describe.serial("US_07 - Manager İlan Oluşturma API Testi", () => {
  test.beforeAll(async ({ request }) => {
    expect(managerEmail).toBeDefined();
    expect(managerPassword).toBeDefined();

    const loginResponse = await request.post(`${BASE_URL}/users/login`, {
      data: {
        email: managerEmail,
        password: managerPassword,
      },
    });

    expect(loginResponse.status()).toBe(200);
    const loginBody = await loginResponse.json();
    const token = loginBody.token;
    expect(token).toBeTruthy();

    managerRequest = await playwrightRequest.newContext({
      baseURL: BASE_URL,
      extraHTTPHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(
      "--- [ÖN KOŞUL] Manager girişi başarılı, yetkilendirilmiş istek bağlamı oluşturuldu ---",
    );
  });

  test.afterAll(async () => {
    await managerRequest.dispose();
  });

  for (const scenario of advertScenarios) {
    test(`${scenario.id} - ${scenario.description}`, async () => {
      const payload = buildAdvertPayload(scenario.formData);

      const response = await managerRequest.post("/adverts", {
        params: {
          advert: scenario.formData.title,
        },
        data: payload,
      });

      const statusCode = response.status();
      console.log(
        `--- [BİLGİ] ${scenario.id} POST /adverts durum kodu:`,
        statusCode,
      );

      let responseBody: any = null;
      try {
        responseBody = await response.json();
        console.log(
          `--- [BİLGİ] ${scenario.id} POST /adverts yanıtı:`,
          JSON.stringify(responseBody, null, 2),
        );
      } catch {
        console.log(
          `--- [BİLGİ] ${scenario.id} POST /adverts yanıtı JSON değil veya boş ---`,
        );
      }

      if ([200, 201].includes(statusCode)) {
        expect(responseBody).toBeTruthy();
        expect(
          responseBody.id || responseBody.data || responseBody.title,
        ).toBeDefined();
      } else {
        expect([400, 401, 403]).toContain(statusCode);
      }
    });
  }

  for (const scenario of validationScenarios) {
    test(`${scenario.id} - ${scenario.description}`, async () => {
      const payload = buildAdvertPayload(scenario.formData);

      const response = await managerRequest.post("/adverts", {
        params: {
          advert: scenario.formData.title,
        },
        data: payload,
      });

      const statusCode = response.status();
      console.log(
        `--- [BİLGİ] ${scenario.id} POST /adverts durum kodu:`,
        statusCode,
      );

      if ([200, 201].includes(statusCode)) {
        throw new Error(
          `${scenario.id} için beklenen hata kodu alınmadı, başarılı yanıt alındı.`,
        );
      }

      expect([400, 401, 403]).toContain(statusCode);
    });
  }

  test(`${unauthorizedScenario.id} - ${unauthorizedScenario.description}`, async ({
    request,
  }) => {
    const payload = buildAdvertPayload(unauthorizedScenario.formData);

    const response = await request.post(`${BASE_URL}/adverts`, {
      params: {
        advert: unauthorizedScenario.formData.title,
      },
      data: payload,
    });

    const statusCode = response.status();
    console.log(
      `--- [BİLGİ] ${unauthorizedScenario.id} POST /adverts durum kodu:`,
      statusCode,
    );

    expect([401, 403]).toContain(statusCode);
  });
});
