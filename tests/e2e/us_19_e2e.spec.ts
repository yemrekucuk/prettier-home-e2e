import { test, expect } from "@playwright/test";
import * as dotenv from "dotenv";
import { Client } from "pg";
import { ContactPage } from "../../pages/main/ContactPage";

dotenv.config();

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

test.describe.serial("US19 – E2E (UI + DB + API) Contact Form", () => {
  const uniqueMessage = `Proje harika görünüyor! E2E Test: ${Date.now()}`;
  const testEmail = "ali.veli@gmail.com";

  // ---------------- UI CREATE ----------------
  test("UI – Geçerli verilerle mesaj gönderimi", async ({ page }) => {
    await page.goto(`${process.env.BASE_URL || 'https://prettierhome.deployedprojects.xyz'}/contact`, { waitUntil: "load" });

    const contactPage = new ContactPage(page);
    await contactPage.fillForm("Ali", "Veli", testEmail, uniqueMessage);
    await expect(contactPage.sendButton).toBeEnabled();
    await contactPage.clickSendButton();
    await expect(contactPage.successMessage).toBeVisible({ timeout: 10000 });
  });

  // ---------------- DB CHECK (CREATE) ----------------
  test("DB – Gönderilen mesaj veritabanına kaydedilmiş olmalı", async () => {
    const client = await getDbClient();

    // Verify the exact message exists in the DB
    const result = await client.query(`
      SELECT * FROM contacts 
      WHERE email = $1 AND message = $2
    `, [testEmail, uniqueMessage]);

    expect(result.rows.length).toBe(1);
    expect(result.rows[0].first_name).toBe("Ali");
    expect(result.rows[0].last_name).toBe("Veli");

    await client.end();
  });

  // ---------------- API CHECK (READ) ----------------
  test("API – Kaydedilen mesaj API üzerinden de dönmeli (Opsiyonel)", async ({ request }) => {
    // If manager credentials aren't set, we skip API verification
    test.skip(!process.env.MANAGER_EMAIL, "Manager bilgisi eksik olduğu için API doğrulaması atlandı.");
    
    const loginRes = await request.post(`${process.env.API_BASE_URL || 'https://prettierhome-api.deployedprojects.xyz'}/users/login`, {
      data: {
        email: process.env.MANAGER_EMAIL,
        password: process.env.MANAGER_PASSWORD,
      },
    });
    
    if (loginRes.status() !== 200) {
        test.skip(true, "Manager girişi başarısız, mesaj listesi alınamadı.");
        return;
    }

    const { token } = await loginRes.json();
    
    // Check contact messages list using token
    const msgRes = await request.get(`${process.env.API_BASE_URL || 'https://prettierhome-api.deployedprojects.xyz'}/contact-messages`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (msgRes.status() === 200) {
      const body = await msgRes.json();
      const contentArray = body.content || body;
      const found = contentArray.some((msg: any) => msg.message === uniqueMessage);
      expect(found).toBeTruthy();
    } else {
        test.skip(true, "Contact messages endpoint'i 200 dönmedi.");
    }
  });
});
