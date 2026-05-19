import { test, expect } from "../../../fixtures/propertiesFixtures";

test.describe("US_12 - Properties Search", () => {

  test("TC_06 - Create one now linkine tıklandığında register sayfasına yönlendirilmeli", async ({ propertiesPage, page }) => {
    await propertiesPage.saleButton.click();
    await propertiesPage.searchBoxInput.fill('batman');
    await propertiesPage.searchButtonInput.click();
    await page.getByRole('link', { name: 'Calm Family House in Batman' }).click();
    await expect(page).toHaveURL(/advert/);
    await propertiesPage.tourDateInput.fill('2026-05-21');
    await propertiesPage.tourTimeSelect.selectOption('08:30');
    await propertiesPage.submitTourButton.click();
    await propertiesPage.createOneNowLink.click();
    await expect(page).toHaveURL(/register/);
  });

});