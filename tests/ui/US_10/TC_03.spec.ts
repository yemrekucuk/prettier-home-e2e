import { test, expect } from "../../../fixtures/propertiesFixtures";
import { HomePage } from "../../../pages/main/HomePage";

test("TC_03 Customer ilanları inceleyebilmeli ve ilan sahibinin bilgilerini görebilmeli", async ({
  loginPage,
  propertiesPage,
  page,
  listingDetailsPage,
}) => {
  const homePage = new HomePage(page);
  await page.goto("/");
  await homePage.clickLoginLink();
  await loginPage.loginAsCustomer();
  await homePage.clickRentButton();
  await homePage.clickSearchButton();
  await propertiesPage.firstSearcedPropertie.click();
  await listingDetailsPage.listingDetailsVisibleTests();
});
