import { test, expect } from "../../../fixtures/propertiesFixtures";
import { HomePage } from "../../../pages/main/HomePage";

test.describe("Properties  Filter Tests", () => {
  test.describe.configure({ mode: "serial" });

  test("TC_04 Customer bir ilada randevu alabilmeli", async ({
    loginPage,
    propertiesPage,
    page,
    listingDetailsPage,
    myTourRequestsPage,
  }) => {

    const expectedDate: string = "25-05-2026";
    const expectedTime: string = "09:00";
    const homePage = new HomePage(page);
    await page.goto("/");
    await homePage.clickLoginLink();
    await loginPage.loginAsCustomer();
    await homePage.clickRentButton();
    await homePage.clickSearchButton();
    await propertiesPage.firstSearcedPropertie.click();
    const expectedAdvertTitle: string =
      await listingDetailsPage.advertTitle.innerText();
    await listingDetailsPage.scheduleATour(expectedDate, expectedTime);
    await listingDetailsPage.successMessageVisibleTest();
    await listingDetailsPage.clickUserLogo();
    await myTourRequestsPage.clickMyTourRequestsLink();
    await myTourRequestsPage.lastCreatedTourRequestVisibleTest();

    expect(expectedAdvertTitle).toBe(
      await myTourRequestsPage.myRequestTableFirstRowAdvertName.innerText(),
    );
  });

  test("TC_05 Customer randevu silebilmeli", async ({
    page,
    myTourRequestsPage,
    loginPage,
  }) => {
    const homePage = new HomePage(page);
    await page.goto("/");
    await homePage.clickLoginLink();
    await loginPage.loginAsCustomer();
    await homePage.clickUserLogo();
    await homePage.clickMyTourRequestsLink();
    await myTourRequestsPage.deleteLastCreatedTourRequest();
    await myTourRequestsPage.deleteMessageVisibleTest();
  });
});
