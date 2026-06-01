import { test, expect } from "@playwright/test";
 import * as fs from "fs";

test.describe("US06 - Manager Advert CRUD", () => {
  let token: string;
  let advertId: number;

  test("Manager login olabilmeli", async ({ request }) => {
    const response = await request.post(
      "https://prettierhome-api.deployedprojects.xyz/users/login",
      {
        data: {
          email: "manager@gmail.com",
          password: "manager123!",
        },
      },
    );

    expect(response.status()).toBe(200);

    const body = await response.json();
    token = body.token;

    expect(token).toBeTruthy();
  });

  test("Manager yeni ilan oluşturabilmeli", async ({ request }) => {
    const response = await request.post(
      "https://prettierhome-api.deployedprojects.xyz/adverts",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: {
          title: "Merkezi Konumda 3+1 Kiralık Daire",
          description: "Metroya yakın, geniş ve ferah daire",
          price: 15000,
          advertTypeId: 1,
          categoryId: 2,
          location: {
            cityId: 34,
            districtId: 12,
            address: "Bağdat Caddesi",
          },
          images: ["image1.jpg", "image2.jpg"],
        },
      },
    );

    expect(response.status()).toBe(200);

    const body = await response.json();
    advertId = body.id;

    expect(advertId).toBeTruthy();

    fs.mkdirSync("temp", { recursive: true });
    fs.writeFileSync("temp/advert.json", JSON.stringify({ advertId }));

  });

  test("Manager oluşturduğu ilanı görüntüleyebilmeli", async ({ request }) => {
    const response = await request.get(
      `https://prettierhome-api.deployedprojects.xyz/adverts/${advertId}/auth`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.id).toBe(advertId);
    expect(body.title).toContain("Kiralık");
  });

  test("Manager ilanı güncelleyebilmeli", async ({ request }) => {
    const response = await request.put(
      `https://prettierhome-api.deployedprojects.xyz/adverts/auth/${advertId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: {
          title: "Güncellenmiş Kiralık Daire",
          price: 18000,
        },
      },
    );

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.title).toBe("Güncellenmiş Kiralık Daire");
    expect(body.price).toBe(18000);
  });

  test("Manager ilanı silebilmeli", async ({ request }) => {
    const response = await request.delete(
      `https://prettierhome-api.deployedprojects.xyz/adverts/${advertId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    expect(response.status()).toBe(200);
  });
});
