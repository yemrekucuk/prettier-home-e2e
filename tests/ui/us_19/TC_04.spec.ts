import { test, expect } from "@playwright/test";
import { ContactPage } from "../../../pages/main/ContactPage";

test.describe("US_19: Contact Form Validasyonları", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://prettierhome.deployedprojects.xyz/contact", { waitUntil: "load" });
  });

  test("TC_04 Negatif Senaryo - Email format validasyonu kontrolü", async ({ page }) => {
    const contactPage = new ContactPage(page);
    await contactPage.fillForm("Ali", "Veli", "techproeducation", "Test mesajı.");
    await contactPage.emailInput.blur();
    await expect(contactPage.emailErrorMessage).toBeVisible();
  });
});
