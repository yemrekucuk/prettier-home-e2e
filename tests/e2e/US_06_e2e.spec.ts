import { test, expect } from "@playwright/test";
import * as dotenv from "dotenv";
import { Client } from "pg";
import { LoginPage } from "../../pages/main/LoginPage";
import { ControlPanelPage } from "../../pages/dashboard/ControlPanelPage";

dotenv.config();

let token: string;
let advertId: number;

async function getDbClient() {
  const client = new Client({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  await client.connect();
  return client;
}

test.describe("US06 – E2E (API + DB + UI)", () => {
  // ---------------- LOGIN (API) ----------------
  test("Login (API)", async ({ request }) => {
    const response = await request.post(`${process.env.API_URL}/users/login`, {
      data: {
        email: process.env.MANAGER_EMAIL,
        password: process.env.MANAGER_PASSWORD,
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    token = body.token;
    expect(token).toBeTruthy();
  });

  // ---------------- CREATE ADVERT (API) ----------------
  test("Create Advert (API)", async ({ request }) => {
    const response = await request.post(`${process.env.API_URL}/adverts`, {
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
        images: ["image1.jpg"],
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    advertId = body.id;
    expect(advertId).toBeTruthy();
  });

  // ---------------- DB CHECK (CREATE) ----------------
  test("DB – Advert oluşturulmuş olmalı", async () => {
    const client = await getDbClient();

    const result = await client.query("SELECT * FROM adverts WHERE id = $1", [
      advertId,
    ]);

    expect(result.rows.length).toBe(1);
    expect(result.rows[0].title).toContain("Kiralık");

    await client.end();
  });

  // ---------------- UI CHECK (CREATE) ----------------
  test("UI – Manager ilanı görebilmeli", async ({ page }) => {
    await page.goto(`${process.env.BASE_URL}/login`);

    const loginPage = new LoginPage(page);
    const controlPanelPage = new ControlPanelPage(page);

    await loginPage.loginAsManager();
    await page.waitForURL("**/dashboard");
    await controlPanelPage.clickBackToSiteLink();

    await page.goto(`${process.env.BASE_URL}/my-adverts`);

    await expect(
      page.getByText("Merkezi Konumda 3+1 Kiralık Daire"),
    ).toBeVisible();
  });

  // ---------------- UPDATE (API) ----------------
  test("Update Advert (API)", async ({ request }) => {
    const response = await request.put(
      `${process.env.API_URL}/adverts/auth/${advertId}`,
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
  });

  // ---------------- DB CHECK (UPDATE) ----------------
  test("DB – Güncelleme yansımış olmalı", async () => {
    const client = await getDbClient();

    const result = await client.query(
      "SELECT title, price FROM adverts WHERE id = $1",
      [advertId],
    );

    expect(result.rows[0].title).toBe("Güncellenmiş Kiralık Daire");
    expect(result.rows[0].price).toBe(18000);

    await client.end();
  });

  // ---------------- DELETE (API) ----------------
  test("Delete Advert (API)", async ({ request }) => {
    const response = await request.delete(
      `${process.env.API_URL}/adverts/${advertId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    expect(response.status()).toBe(200);
  });

  // ---------------- DB CHECK (DELETE) ----------------
  test("DB – Silme yansımış olmalı", async () => {
    const client = await getDbClient();

    const result = await client.query("SELECT * FROM adverts WHERE id = $1", [
      advertId,
    ]);

    expect(result.rows.length).toBe(0);

    await client.end();
  });
});
