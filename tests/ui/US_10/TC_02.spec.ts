import { test, expect } from "../../../fixtures/propertiesFixtures";
import { HomePage } from "../../../pages/main/HomePage";

test("TC_02 Customer ilanlara özel arama yapabilmeli", async ({
  loginPage,
  propertiesPage,
  page,
}) => {
  const homePage = new HomePage(page);
  await page.goto("/");
  await homePage.clickLoginLink();
  await loginPage.loginAsCustomer();
  await homePage.clickRentButton();
  await homePage.clickSearchButton();
  await propertiesPage.searchRentPropertiesWithSpesificDatas();
  await propertiesPage.searchButtonProperties.click();
  await propertiesPage.isVisibleFirstSearchedPropertie();
});