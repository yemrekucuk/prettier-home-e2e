import { test, expect } from "@playwright/test";
import * as dotenv from "dotenv";
import { Client } from "pg";
import { LoginPage } from "../../pages/main/LoginPage";
import { MyTourRequestsPage } from "../../pages/main/MyTourRequestsPage";

dotenv.config();

let managerToken: string;
const advertId = 1; // Assuming an advert with ID 1 exists, can be adjusted

async function getDbClient() {
  const client = new Client({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: false
  });
  await client.connect();
  return client;
}

test.describe.serial("US14 – E2E (API + DB + UI) Manager Tour Request", () => {

  // ---------------- LOGIN (API) ----------------
  test("Login as Manager (API)", async ({ request }) => {
    const response = await request.post(`${process.env.API_BASE_URL || 'https://prettierhome-api.deployedprojects.xyz'}/users/login`, {
      data: {
        email: process.env.MANAGER_EMAIL || "manager@test.com",
        password: process.env.MANAGER_PASSWORD || "manager123!",
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    managerToken = body.token;
    expect(managerToken).toBeTruthy();
  });

  // ---------------- CREATE TOUR REQUEST (API) ----------------
  test("Create Tour Request (API)", async ({ request }) => {
    const response = await request.post(`${process.env.API_BASE_URL || 'https://prettierhome-api.deployedprojects.xyz'}/tour-requests`, {
      headers: {
        Authorization: `Bearer ${managerToken}`,
        "Content-Type": "application/json",
      },
      data: {
        tourDate: "2027-06-20",
        tourTime: {
          hour: 15,
          minute: 0
        },
        advertId: advertId
      },
    });

    // In a normal E2E, this should be 200 or 201.
    // If there is a backend bug (e.g. returns 401), this test will catch it by failing.
    expect([200, 201]).toContain(response.status());
  });

  // ---------------- DB CHECK (CREATE) ----------------
  test("DB – Tour Request oluşturulmuş olmalı", async () => {
    const client = await getDbClient();

    // Check if the tour request exists for this advert on this date/time
    const result = await client.query(`
      SELECT * FROM tour_requests 
      WHERE advert_id = $1 
      AND tour_date = $2 
      AND tour_time = $3
    `, [advertId, '2027-06-20', '15:00:00']);

    expect(result.rows.length).toBeGreaterThan(0);
    
    await client.end();
  });

  // ---------------- UI CHECK (READ) ----------------
  test("UI – Manager oluşturduğu randevuları listede görebilmeli", async ({ page }) => {
    await page.goto(`${process.env.BASE_URL || 'https://prettierhome.deployedprojects.xyz'}/login`);

    const loginPage = new LoginPage(page);
    await loginPage.loginAsManager();
    await page.waitForURL("**/dashboard");
    
    // Go to My Tour Requests
    await page.goto(`${process.env.BASE_URL || 'https://prettierhome.deployedprojects.xyz'}/my-tour-requests`, { waitUntil: "load" });

    const myTourRequestsPage = new MyTourRequestsPage(page);
    // This will verify visibility and will fail correctly if the backend bug prevented creation
    await myTourRequestsPage.lastCreatedTourRequestVisibleTest();
  });
});
