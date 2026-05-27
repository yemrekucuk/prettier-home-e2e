import { test, expect } from "@playwright/test";
import { ContactPage } from "../../../pages/main/ContactPage";

test.describe("US_19: Contact Form Validasyonları", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://prettierhome.deployedprojects.xyz/contact", { waitUntil: "load" });
  });

  test("TC_02 Negatif Senaryo - First Name sınır değer (boundary) kontrolü", async ({ page }) => {
    const contactPage = new ContactPage(page);
    await contactPage.fillForm("A", "Veli", "ali.veli@gmail.com", "Test mesajı.");
    await expect(contactPage.sendButton).toBeDisabled();
    await expect(contactPage.errorMessage).toBeVisible();
  });
});
