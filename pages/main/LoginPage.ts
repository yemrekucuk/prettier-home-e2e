import { Page, Locator } from "@playwright/test";
import { Navbar } from "../Navbar";

export class LoginPage extends Navbar{
    
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        super(page)
        
        this.emailInput = page.locator('input[name="email"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.loginButton = page.locator('button[type="submit"]');
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
}