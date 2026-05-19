import { Page, Locator } from "@playwright/test";
import { Navbar } from "../Navbar";

export class RegisterPage extends Navbar {

    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly phoneInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly confirmPasswordInput: Locator;
    readonly termsCheckbox: Locator;
    readonly registerButton: Locator;

  constructor(page: Page) {

    super(page);

        this.firstNameInput = page.locator('[name="firstName"]');
        this.lastNameInput = page.locator('[name="lastName"]');
        this.phoneInput = page.locator('[name="phone"]');
        this.emailInput = page.locator('[name="email"]');
        this.passwordInput = page.locator('[name="password"]');
        this.confirmPasswordInput = page.locator('[name="confirmPassword"]');
        this.termsCheckbox = page.locator('#terms');
        this.registerButton = page.locator('button[type="submit"]');

  }

  async navigateToRegisterPage() {

    await this.page.goto(process.env.BASE_URL as string);

    await this.clickRegisterLink();
}

async fillRegisterForm(
   firstName: string,
   lastName: string,
   phone: string,
   email: string,
   password: string,
   confirmPassword: string
) {
await this.firstNameInput.fill(firstName);

await this.lastNameInput.fill(lastName);

await this.phoneInput.fill(phone);

await this.emailInput.fill(email);

await this.passwordInput.fill(password);

await this.confirmPasswordInput.fill(confirmPassword);

}

async completeRegistration(

   firstName: string,
   lastName: string,
   phone: string,
   email: string,
   password: string,
   confirmPassword: string
  ) {

    await this.fillRegisterForm(
        firstName,
        lastName,
        phone,
        email,
        password,
        confirmPassword
    );

    await this.termsCheckbox.check();

    await this.registerButton.click();


}

}
