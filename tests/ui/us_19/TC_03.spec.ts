import { test, expect } from "@playwright/test";
import { ContactPage } from "../../../pages/main/ContactPage";

test.describe("US_19: Contact Form Validasyonları", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://prettierhome.deployedprojects.xyz/contact", { waitUntil: "load" });
  });

  test("TC_03 Negatif Senaryo - Last Name sınır değer (boundary) kontrolü", async ({ page }) => {
    const contactPage = new ContactPage(page);
    await contactPage.fillForm("Ali", "B", "ali.veli@gmail.com", "Test mesajı.");
    await contactPage.lastNameInput.blur();
    await expect(contactPage.errorMessage).toBeVisible();
    
    await contactPage.lastNameInput.fill("Ba");
    await expect(contactPage.errorMessage).toBeHidden();
  });
});
