import { test as base, expect, Page } from "@playwright/test";
import { LoginPage } from "../pages/main/LoginPage";
import { MyProfilePage } from "../pages/main/MyProfilePage";

type MyProfileFixtures = {
  myProfilePage: MyProfilePage;
};

export const test = base.extend<MyProfileFixtures>({
  myProfilePage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await page.goto("https://prettierhome.deployedprojects.xyz/");
    await loginPage.clickLoginLink();
    await loginPage.login(
      process.env.USER_EMAIL as string,
      process.env.USER_PASSWORD as string
    );
    await loginPage.clickUserLogo();
    await loginPage.clickMyProfileLink();
    await page.waitForURL(/my-profile/);
    await use(new MyProfilePage(page));
  },
});

export { expect } from "@playwright/test";