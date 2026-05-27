import { test, expect } from "@playwright/test";

import { LoginPage } from "../../pages/main/LoginPage";
import { CreatePropertyPage } from "../../pages/main/CreatePropertyPage";
import { ControlPanelPage } from "../../pages/dashboard/ControlPanelPage";

test.describe("US_06 Create Property Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://prettierhome.deployedprojects.xyz/login", {
      waitUntil: "load",
    });

    const loginPage = new LoginPage(page);
    const controlPanelPage = new ControlPanelPage(page);

    await loginPage.loginAsManager();

    await page.waitForURL("**/dashboard");
    await page.waitForTimeout(1500);
    await controlPanelPage.clickBackToSiteLink();
  });

  test("TC_US06_01 Create property successfully", async ({ page }) => {
    const propertyPage = new CreatePropertyPage(page);

    await propertyPage.clickPropertyButton();
    await propertyPage.fillAdvertForm();
    await propertyPage.uploadImage("test-data/US_06/760KB.jpg");
    await propertyPage.clickCreateButton();

    await expect(page).toHaveURL(/dashboard|ad|property/);
  });

  test("TC_US06_02 Upload image smaller than 3MB", async ({ page }) => {
    const propertyPage = new CreatePropertyPage(page);

    await propertyPage.clickPropertyButton();
    await propertyPage.fillAdvertForm();
    await propertyPage.uploadImage("test-data/US_06/2.9MB.jpg");
    await propertyPage.clickCreateButton();

    await expect(
      page.locator("text=Each image should be a maximum of 3 MB"),
    ).not.toBeVisible();
  });

  test("TC_US06_04 Empty title validation", async ({ page }) => {
    const propertyPage = new CreatePropertyPage(page);

    await propertyPage.clickPropertyButton();

    await propertyPage.fillAdvertForm({
      title: undefined,
    });

    await propertyPage.uploadImage("test-data/US_06/760KB.jpg");

    await propertyPage.titleInput.click();
    await page.mouse.click(0, 0); //bos bir alana tiklamak
    await expect(page.locator("text=Enter a title")).toBeVisible();
  });

  test("TC_US06_05 Empty description validation", async ({ page }) => {
    const propertyPage = new CreatePropertyPage(page);

    await propertyPage.clickPropertyButton();

    await propertyPage.fillAdvertForm({
      description: undefined,
    });

    await propertyPage.uploadImage("test-data/US_06/760KB.jpg");
    await propertyPage.descriptionInput.click();
    await page.mouse.click(0, 0); //bos bir alana tiklamak

    await expect(page.locator("text=Enter a description")).toBeVisible();
  });

  test("TC_US06_06 Empty address validation", async ({ page }) => {
    const propertyPage = new CreatePropertyPage(page);

    await propertyPage.clickPropertyButton();

    await propertyPage.fillAdvertForm({
      address: undefined,
    });

    await propertyPage.uploadImage("test-data/US_06/760KB.jpg");
    await propertyPage.addressInput.click();
    await page.mouse.click(0, 0); //bos bir alana tiklamak

    await expect(page.locator("text=The address is required")).toBeVisible();
  });

  test("TC_US06_07 Upload image bigger than 3MB", async ({ page }) => {
    const propertyPage = new CreatePropertyPage(page);

    await propertyPage.clickPropertyButton();
    await propertyPage.fillAdvertForm();
    await propertyPage.uploadImage("test-data/US_06/3.5MB.jpg");

    await expect(
      page.getByText("Each image should be a maximum of 3 MB"),
    ).toBeVisible();
  });

  test("TC_US06_08 All validations should appear", async ({ page }) => {
    const propertyPage = new CreatePropertyPage(page);

    await propertyPage.clickPropertyButton();

    await propertyPage.clickCreateButton();

    await expect(page.locator("text=Enter a title")).toBeVisible();

    await expect(page.locator("text=Enter a description")).toBeVisible();

    await expect(page.locator("text=The address is required")).toBeVisible();

    await expect(
      page.locator("text=Please upload at least 1 image"),
    ).toBeVisible();
  });

  test("TC_US06_09 No image upload validation", async ({ page }) => {
    const propertyPage = new CreatePropertyPage(page);

    await propertyPage.clickPropertyButton();
    await propertyPage.fillAdvertForm();

    await expect(
      page.locator("text=Please upload at least 1 image"),
    ).toBeVisible();
  });
});
