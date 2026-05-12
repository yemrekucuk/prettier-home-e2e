import { Page, Locator } from "@playwright/test";

export class ControlPanelPage {
  readonly page: Page;

  readonly dashboardLink: Locator;
  readonly advertsLink: Locator;
  readonly categoriesLink: Locator;
  readonly advertTypesLink: Locator;
  readonly usersLink: Locator;
  readonly tourRequestsLink: Locator;
  readonly reportsLink: Locator;
  readonly contactMessagesLink: Locator;
  readonly backToSiteLink: Locator;
  readonly logoutButton: Locator;
  readonly confirmLogoutButton: Locator;
  readonly cancelLogoutButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.dashboardLink = page.locator('.central a[href="/dashboard"]');
    this.advertsLink = page.locator('a[href="/dashboard/adverts"]');
    this.categoriesLink = page.locator('a[href="/dashboard/categories"]');
    this.advertTypesLink = page.locator('a[href="/dashboard/advert-types"]');
    this.usersLink = page.locator('a[href="/dashboard/users"]');
    this.tourRequestsLink = page.locator('a[href="/dashboard/tour-requests"]');
    this.reportsLink = page.locator('a[href="/dashboard/reports"]');
    this.contactMessagesLink = page.locator(
      'a[href="/dashboard/contact-messages"]',
    );
    this.backToSiteLink = page.locator('.admin-side-menu a[href="/"]');
    this.logoutButton = page.locator("a.logout");
    this.confirmLogoutButton = page.locator(".p-confirm-dialog-accept");
    this.cancelLogoutButton = page.locator(".p-confirm-dialog-reject");
  }

  async clickDashboardLink() {
    await this.dashboardLink.click();
  }
  async clickAdvertsLink() {
    await this.advertsLink.click();
  }
  async clickCategoriesLink() {
    await this.categoriesLink.click();
  }
  async clickAdvertTypesLink() {
    await this.advertTypesLink.click();
  }
  async clickUsersLink() {
    await this.usersLink.click();
  }
  async clickTourRequestsLink() {
    await this.tourRequestsLink.click();
  }
  async clickReportsLink() {
    await this.reportsLink.click();
  }
  async clickContactMessagesLink() {
    await this.contactMessagesLink.click();
  }
  async clickBackToSiteLink() {
    await this.backToSiteLink.click();
  }
  async clickLogoutButton() {
    await this.logoutButton.click();
  }
  async clickConfirmLogoutButton() {
    await this.confirmLogoutButton.click();
  }
  async performFullLogout() {
    await this.clickLogoutButton();
    await this.clickConfirmLogoutButton();
  }
}
