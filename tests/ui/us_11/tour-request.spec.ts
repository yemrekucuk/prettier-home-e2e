import { test, expect } from "../../../fixtures/propertiesFixtures";
import {
  PROPERTIES_DATA,
  testData,
} from "../../../test-data/TestDataProperties";
import { DateUtils } from "../../../utils/DateUtils";


test.describe("Tour Request Flow", () => {
  test.beforeEach(async ({ page, loginPage, propertiesPage }) => {
    await page.goto("/");
    await loginPage.loginAsCustomer();
    await loginPage.clickPropertiesLink();

    await propertiesPage.filterSearch(PROPERTIES_DATA);
    await propertiesPage.clickSearch();
    await propertiesPage.listingCards.first().click();
  });

  test("TC_10 Owner Contact Information görüntülenmeli", async ({
    listingDetailsPage,
  }) => {
    await expect(listingDetailsPage.ownerContactSection).toBeVisible();
    await expect(listingDetailsPage.ownerName).toBeVisible();
    await expect(listingDetailsPage.contactNumberButton).toBeVisible();
    await expect(listingDetailsPage.sendMailButton).toBeVisible();
  });

  test("TC_11 Customer Tour Request oluşturabilmeli", async ({
    page,
    listingDetailsPage,
  }) => {
    await listingDetailsPage.scheduleATour(DateUtils.future(8), "16:00");
    await listingDetailsPage.submitTourButton.click();

    await expect(page.locator(".p-toast")).toContainText("successfully");
  });
});
test.describe("My Tour Requests Flow", () => {
  test.beforeEach(async ({ page, loginPage }) => {
    await page.goto("/");
    await loginPage.loginAsCustomer();
  });

  test("TC_14 Customer Tour Request kaydını güncelleyebilmeli", async ({
    propertiesPage,
    myTourRequestsPage,
    page,
  }) => {
    await propertiesPage.userLogo.click();
    await propertiesPage.myTourRequestsLink.click();

    await myTourRequestsPage.updateLastCreatedTourRequest(
      testData.date,
      testData.time,
    );

    await expect(page.locator(".p-toast")).toContainText("created");
  });

  test("TC_13 Customer Tour Request kaydını silebilmeli", async ({
    propertiesPage,
    myTourRequestsPage,
    page,
  }) => {
    await propertiesPage.userLogo.click();
    await propertiesPage.myTourRequestsLink.click();

    await myTourRequestsPage.deleteLastCreatedTourRequest();

    await expect(page.locator(".p-toast")).toContainText("deleted");
  });
});



