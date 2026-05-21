import { test, expect } from "@playwright/test";
import { ContactPage } from "../../../pages/main/ContactPage";

test.describe("US_19: Contact Form Validasyonları", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://prettierhome.deployedprojects.xyz/contact", { waitUntil: "load" });
  });

  test("TC_01 Pozitif Senaryo - Geçerli verilerle başarılı mesaj gönderimi", async ({ page }) => {
    const contactPage = new ContactPage(page);
    await contactPage.fillForm("Ali", "Veli", "ali.veli@gmail.com", "Proje harika görünüyor!");
    await expect(contactPage.sendButton).toBeEnabled();
    await contactPage.clickSendButton();
    await expect(contactPage.successMessage).toBeVisible({ timeout: 10000 });
  });
});
