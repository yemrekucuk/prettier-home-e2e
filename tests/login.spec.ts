import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

// 1. Senaryo: Admin Girişi
test('Admin basariyla sisteme giris yapabilmeli', async ({ page }) => {
    // Adım 1: Sitenin login sayfasına git (URL'in sonuna sitenin giriş uzantısını yazmalısın, örn: /login)
    await page.goto('/login'); 

    // Adım 2: LoginPage class'ından bir 'instance' (obje) üret
    const loginPage = new LoginPage(page);

    // Adım 3: İşte şifreleri girdiğimiz an! Metodu çağır ve verileri gönder.
    await loginPage.login('admin@gmail.com', 'admin123!');

    // Adım 4: Assertion (Doğrulama). Girişin başarılı olduğunu kanıtla.
    // Örnek: Giriş yapınca ekranda 'Dashboard' yazısı çıkıyor mu diye kontrol edebilirsin.
    // await expect(page.locator('text=Dashboard')).toBeVisible();
});

// 2. Senaryo: Manager Girişi
test('Manager basariyla sisteme giris yapabilmeli', async ({ page }) => {
    await page.goto('/login'); 
    
    const loginPage = new LoginPage(page);
    
    // Manager bilgilerini gönderiyoruz! Aynı metot, farklı data!
    await loginPage.login('manager@gmail.com', 'manager123!');
});