import { test, expect } from "../../../fixtures/propertiesFixtures";

test.describe("US_12 - Properties Search", () => {

  test("TC_03 - İlan detay sayfasında resim, Description, DETAILS ve LOCATION görebilmeli", async ({ propertiesPage, page }) => {
    await propertiesPage.propertiesLink.click();
    await page.getByRole('link', { name: 'Exquisite Residence in' }).click();
    await expect(page).toHaveURL(/advert/);
    await expect(propertiesPage.advertImage).toBeVisible();
    await expect(propertiesPage.descriptionHeading).toBeVisible();
    await expect(propertiesPage.detailsHeading).toBeVisible();
    await expect(propertiesPage.locationHeading).toBeVisible();
  });

});