import { test, expect } from "../../../fixtures/propertiesFixtures";

test.describe("US_12 - Properties Search", () => {

  test("TC_04 - İletişim bilgisine tıklandığında mesaj gelmeli", async ({ propertiesPage, page }) => {
    
    await propertiesPage.contactLink.click();
    await expect(page).toHaveURL(/contact/);
    await expect(page.locator('.contact-form')).toBeVisible();
    await expect(page.getByText("Don't have an account? Create one now!")).toBeVisible();
  });

});