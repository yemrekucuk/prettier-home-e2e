import { test, expect } from "../../../fixtures/propertiesFixtures";

test.describe("US_12 - Properties Search", () => {

  test("TC_01 - Search kısmından genel arama yapabilmeli", async ({ propertiesPage, page }) => {

    await page.getByRole('searchbox', { name: 'Search' }).fill('batman');
    await page.locator('div.search-input-wrapper button').click();
    await expect(page).toHaveURL(/batman/);
  });

});