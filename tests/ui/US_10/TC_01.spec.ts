import { test, expect } from "../../../fixtures/propertiesFixtures";
import { HomePage } from "../../../pages/main/HomePage";

test("Customer Kiralik ilan arayabilmeli", async ({
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
  await propertiesPage.isVisibleFirstSearchedPropertie();
});
