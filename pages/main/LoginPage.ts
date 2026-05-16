import { Page, Locator } from "@playwright/test";
import { NavbarPage } from "../NavbarPage";

export class LoginPage extends NavbarPage {
  readonly loginHeaderLink: Locator; // Formu açan link
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.loginHeaderLink = page.getByRole("link", { name: "Login" });
    this.emailInput = page.locator('input[name="email"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[type="submit"]');
  }

  async login(email: string, password: string) {
    await this.loginHeaderLink.click();
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
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
}
