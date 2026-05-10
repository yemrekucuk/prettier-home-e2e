import { test, expect } from '@playwright/test';

test.describe('Prettier Home - Smoke Tests', () => {

    test('Should load the homepage and verify title', async ({ page }) => {
        // playwright.config.ts içindeki baseURL'e gider
        await page.goto('/');

        // Assertion: Sayfa başlığının (title) doğru geldiğini doğrula
        await expect(page).toHaveTitle(/Prettier/); 
    });

});