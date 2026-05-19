import { Page, Locator } from "@playwright/test";
import { Navbar } from "../Navbar";

export class LoginPage extends Navbar{
    
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly userPic: Locator;


    constructor(page: Page) {
        super(page)
        
        this.emailInput = page.locator('input[name="email"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.loginButton = page.locator('button[type="submit"]');
        this.userPic = page.locator('.user-pic').first();
    }

    async login(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async loginAsAdmin() {
        await this.login(process.env.ADMIN_EMAIL as string, process.env.ADMIN_PASSWORD as string);
    }

    async loginAsManager() {
        await this.login(process.env.MANAGER_EMAIL as string, process.env.MANAGER_PASSWORD as string);
    }

    async navigateToLoginPage(){
        await this.page.goto(process.env.BASE_URL as string);
        await this.clickLoginLink();
    }

    async fillLoginForm(
        email: string,
        password: string,
) {

    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);

}

    async clickLoginButton (){
        await this.loginButton.click()
    }


}