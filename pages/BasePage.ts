import { Page, Locator } from "@playwright/test";

export class BasePage {
  readonly page: Page;
  readonly homeLink: Locator;
  readonly propertiesLink: Locator;
  readonly aboutLink: Locator;
  readonly contactLink: Locator;
  readonly languageDropdown: Locator;
  readonly propertyButton: Locator;
  readonly userLogo: Locator;
  readonly englishOption: Locator;
  readonly turkishOption: Locator;
  readonly frenchOption: Locator;
  readonly germanOption: Locator;
  readonly spanishOption: Locator;
  readonly myProfileLink: Locator;
  readonly myAdvertsLink: Locator;
  readonly myFavoritesLink: Locator;
  readonly myTourRequestsLink: Locator;
  readonly dashboardLink: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;

    const topMenu = page.locator("nav.top-nav-menu");
    const languageOption = page.locator(".language-item");
    const userMenu = page.locator("#subMenu");

    this.homeLink = topMenu.locator('a.nav-link[href="/"]');
    this.propertiesLink = topMenu.locator('a.nav-link[href="/ad/search"]');
    this.aboutLink = topMenu.locator('a.nav-link[href="/about"]');
    this.contactLink = topMenu.locator('a.nav-link[href="/contact"]');
    this.languageDropdown = page.locator(
      "a.dropdown-toggle:has(img.flag-icon)",
    );
    this.propertyButton = page.locator("a.add-property");
    this.userLogo = page.locator(".user-logo-nav");
    this.englishOption = languageOption.filter({ hasText: "English" });
    this.turkishOption = languageOption.filter({ hasText: "Türkçe" });
    this.frenchOption = languageOption.filter({ hasText: "Français" });
    this.germanOption = languageOption.filter({ hasText: "Deutsch" });
    this.spanishOption = languageOption.filter({ hasText: "Español" });
    this.myProfileLink = userMenu.locator("a[href='/my-profile']");
    this.myAdvertsLink = userMenu.locator("a[href='/my-adverts']");
    this.myFavoritesLink = userMenu.locator("a[href='/my-favorites']");
    this.myTourRequestsLink = userMenu.locator("a[href='/my-tour-requests']");
    this.dashboardLink = userMenu.locator("a[href='/dashboard']");
    this.logoutButton = userMenu.locator('a[href="/"]');
  }

  async clickHomeLink() {
    await this.homeLink.click();
  }
  async clickPropertiesLink() {
    await this.propertiesLink.click();
  }
  async clickAboutLink() {
    await this.aboutLink.click();
  }
  async clickContactLink() {
    await this.contactLink.click();
  }
  async clickLanguageDropdown() {
    await this.languageDropdown.click();
  }
  async clickPropertyButton() {
    await this.propertyButton.click();
  }
  async clickUserLogo() {
    await this.userLogo.click();
  }
  async clickEnglishOption() {
    await this.englishOption.click({ force: true });
  }
  async clickTurkishOption() {
    await this.turkishOption.click({ force: true });
  }
  async clickFrenchOption() {
    await this.frenchOption.click({ force: true });
  }
  async clickGermanOption() {
    await this.germanOption.click({ force: true });
  }
  async clickSpanishOption() {
    await this.spanishOption.click({ force: true });
  }
  async clickMyProfileLink() {
    await this.myProfileLink.click();
  }
  async clickMyAdvertsLink() {
    await this.myAdvertsLink.click();
  }
  async clickMyFavoritesLink() {
    await this.myFavoritesLink.click();
  }
  async clickMyTourRequestsLink() {
    await this.myTourRequestsLink.click();
  }
  async clickDashboardLink() {
    await this.dashboardLink.click();
  }
  async clickLogoutButton() {
    await this.logoutButton.click();
  }
}
