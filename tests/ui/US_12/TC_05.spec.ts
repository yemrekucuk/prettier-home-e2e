import { test, expect } from "../../../fixtures/propertiesFixtures";

test.describe("US_12 - Properties Search", () => {

  test("TC_05 - Tour request uyarıları görünmeli", async ({ propertiesPage, page }) => {

    await propertiesPage.saleButton.click();
    await propertiesPage.searchBoxInput.fill('batman');
    await propertiesPage.searchButtonInput.click();
    await page.getByRole('link', { name: 'Calm Family House in Batman' }).click();
    await expect(page).toHaveURL(/advert/);
    await propertiesPage.tourDateInput.fill('2026-05-21');
    await propertiesPage.tourTimeSelect.selectOption('07:30');
    await propertiesPage.submitTourButton.click();
    await expect(propertiesPage.loginForTourText).toBeVisible();
    await expect(propertiesPage.createOneNowText).toBeVisible();
  });

});