import { Page, Locator } from "@playwright/test";
import { NavbarPage } from "./NavbarPage";

export class LoginPage extends NavbarPage {
  readonly loginHeaderLink: Locator; // Formu açan link
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly userPic: Locator;

  constructor(page: Page) {
    super(page);
    this.loginHeaderLink = page
      .locator("a.nav-link")
      .filter({ hasText: "Login" });
    this.emailInput = page.locator('input[name="email"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[type="submit"]');
    this.userPic = page.locator('.user-pic').first();
  }

  async navigate() {
    await this.page.goto("/login");
  }

  async login(email: string, password: string) {
    await this.loginHeaderLink.click();
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async navigateToLoginPage() {
    await this.page.goto(process.env.BASE_URL as string);
    await this.clickLoginLink();
  }

  async fillLoginForm(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async loginAsAdmin() {
    await this.login(
      process.env.ADMIN_EMAIL as string,
      process.env.ADMIN_PASSWORD as string,
    );
  }

  async loginAsManager() {
    await this.login(
      process.env.MANAGER_EMAIL as string,
      process.env.MANAGER_PASSWORD as string,
    );
  }

  async loginAsCustomer() {
    await this.login(
      process.env.CUSTOMER_EMAIL as string,
      process.env.CUSTOMER_PASSWORD as string,
    );
  }

  async loginAsEmptyManager() {
    await this.login(
      process.env.EMPTY_MANAGER_EMAIL as string,
      process.env.EMPTY_MANAGER_PASSWORD as string,
    );
  }
}