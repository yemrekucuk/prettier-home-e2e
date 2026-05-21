import { Page, Locator } from "@playwright/test";
import { NavbarPage } from "./NavbarPage";

export class ContactPage extends NavbarPage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly messageInput: Locator;
  readonly sendButton: Locator;
  readonly successMessage: Locator;
  readonly errorMessage: Locator;
  readonly emailErrorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.locator('#firstName');
    this.lastNameInput = page.locator('#lastName');
    this.emailInput = page.locator('#email');
    this.messageInput = page.locator('#message');
    this.sendButton = page.locator('button:has-text("SEND")').first();
    this.successMessage = page.locator('text=Contact message saved successfully');
    this.errorMessage = page.locator('text=At least 2 characters').first();
    this.emailErrorMessage = page.locator('text=Invalid email').first();
  }

  async fillForm(firstName: string, lastName: string, email: string, message: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.messageInput.fill(message);
  }

  async clickSendButton() {
    await this.sendButton.click();
  }
}
