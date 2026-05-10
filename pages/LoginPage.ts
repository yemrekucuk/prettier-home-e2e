import { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    // Constructor: Obje üretildiğinde ilk çalışan blok
    constructor(page: Page) {
        this.page = page;
        // Locator'ları tanımlıyoruz. Genelde email ve password formlarında "name" attribute'u kullanılır.
        this.emailInput = page.locator('input[name="email"]'); 
        this.passwordInput = page.locator('input[name="password"]');
        this.loginButton = page.locator('button[type="submit"]'); // Tıklanacak buton
    }

    // Ortak Login Methodu - Dışarıdan email ve password alacak şekilde bekliyor
    async login(email: string , password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}