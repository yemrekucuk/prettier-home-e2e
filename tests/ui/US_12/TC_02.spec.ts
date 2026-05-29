import { test, expect } from "../../../fixtures/propertiesFixtures";

test.describe("US_12 - Properties Search", () => {

  test("TC_02 - Özel arama yapabilmeli", async ({ propertiesPage, page }) => {
    await propertiesPage.propertiesLink.click();
    await propertiesPage.minPriceInput.fill('100');
    await propertiesPage.maxPriceInput.fill('1000');
    await propertiesPage.advertTypeSelect.selectOption('2');
    await propertiesPage.countrySelect.selectOption('223');
    await propertiesPage.citySelect.selectOption('4134');
    await propertiesPage.districtSelect.selectOption('48477');
    await propertiesPage.filterSearchButton.click();
    await expect(page).toHaveURL(/search/);
  });

});