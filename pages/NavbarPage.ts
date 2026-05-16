import { Page } from "@playwright/test";

export class NavbarPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // --- GETTERS (her çağrıldığında güncel DOM’dan locator üretir) ---

  get homeLink() {
    return this.page.locator('nav.top-nav-menu a.nav-link[href="/"]');
  }

  get propertiesLink() {
    return this.page
      .locator("#offcanvas-menu")
      .getByRole("link", { name: "Properties" });
  }

  get aboutLink() {
    return this.page.locator('nav.top-nav-menu a.nav-link[href="/about"]');
  }

  get contactLink() {
    return this.page.locator('nav.top-nav-menu a.nav-link[href="/contact"]');
  }

  get languageDropdown() {
    return this.page.locator("a.dropdown-toggle:has(img.flag-icon)");
  }

  get propertyButton() {
    return this.page.locator("a.add-property");
  }

  get userLogo() {
    return this.page.locator(".user-logo-nav");
  }

  get englishOption() {
    return this.page.locator(".language-item", { hasText: "English" });
  }

  get turkishOption() {
    return this.page.locator(".language-item", { hasText: "Türkçe" });
  }

  get frenchOption() {
    return this.page.locator(".language-item", { hasText: "Français" });
  }

  get germanOption() {
    return this.page.locator(".language-item", { hasText: "Deutsch" });
  }

  get spanishOption() {
    return this.page.locator(".language-item", { hasText: "Español" });
  }

  get myProfileLink() {
    return this.page.locator("#subMenu a[href='/my-profile']");
  }

  get myAdvertsLink() {
    return this.page.locator("#subMenu a[href='/my-adverts']");
  }

  get myFavoritesLink() {
    return this.page.locator("#subMenu a[href='/my-favorites']");
  }

  get myTourRequestsLink() {
    return this.page.locator("#subMenu a[href='/my-tour-requests']");
  }

  get dashboardLink() {
    return this.page.locator("#subMenu a[href='/dashboard']");
  }

  get logoutButton() {
    return this.page.locator("#subMenu a[href='/']");
  }

  // --- CLICK METHODS (getter üzerinden çalışır → her zaman doğru elemente tıklar) ---

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
