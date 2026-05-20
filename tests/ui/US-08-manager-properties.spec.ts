import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/main/LoginPage";
import { MyAdvertsPage } from "../../pages/main/MyAdvertsPage";
import { CreatePropertyPage, defaultValidFormData } from "../../pages/main/CreatePropertyPage";

test.describe("US_08 Manager Properties Tests", () => {
  let loginPage: LoginPage;
  let myAdvertsPage: MyAdvertsPage;
  let createPropertyPage: CreatePropertyPage;
  
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    myAdvertsPage = new MyAdvertsPage(page);
    createPropertyPage = new CreatePropertyPage(page);

    // Manager sisteme giriş yapmış olmalıdır
    await page.goto("https://prettierhome.deployedprojects.xyz/login");
    await loginPage.loginAsManager();
    
    // Giriş yapıldıktan sonra dashboard ekranı açılırsa ana sayfaya dön (Siteye Geri Dön)
    try {
      await page.waitForTimeout(1500); // Girişin tamamlanması için bekle
      if (await page.locator('text=Back to Site').or(page.locator('text=Back to Web Site')).isVisible()) {
          await page.locator('text=Back to Site').or(page.locator('text=Back to Web Site')).click();
      } else {
          await page.goto("https://prettierhome.deployedprojects.xyz/");
      }
    } catch(e) {}
  });

  test("TC_01 Manager verdiği ilanları görebilmeli", async ({ page }) => {
    // Ana sayfada Profil ikonuna tıklanır
    await myAdvertsPage.clickUserLogo();
    // İlanlarım (My Properties) yazısına tıklanır
    await myAdvertsPage.clickMyAdvertsLink();
    
    // İlanlarım sayfasına gidildiğini doğrula
    await expect(page).toHaveURL(/.*my-properties|.*properties/); 
    
    // İlanlar sayfada görüntülenmelidir (en az 1 tane ilan satırı olmalı)
    await expect(myAdvertsPage.propertyRows.first()).toBeVisible({ timeout: 10000 });

    // Sayfalama ikonlarına tıklanır (eğer sayfalama aktifse)
    if (await myAdvertsPage.paginationNext.isVisible()) {
      await myAdvertsPage.paginationNext.click();
      await expect(myAdvertsPage.propertyRows.first()).toBeVisible();
      await myAdvertsPage.paginationPrev.click();
      await expect(myAdvertsPage.propertyRows.first()).toBeVisible();
    }
  });

  test("TC_02 Manager verdiği ilanları güncelleyebilmeli", async ({ page }) => {
    // Profil menüsünden ilanlara git
    await myAdvertsPage.clickUserLogo();
    await myAdvertsPage.clickMyAdvertsLink();
    
    // Herhangi bir ilanda Düzenle ikonuna tıklanır
    await myAdvertsPage.editButtons.first().click();
    
    // Fiyat alanına tıklanıp güncellenir
    await createPropertyPage.priceInput.fill("30000");
    await createPropertyPage.clickCreateButton(); // Güncelle butonu (Update) create butonuyla aynı mantıkla çalışır
    
    // Başarı mesajı doğrulanır
    await expect(page.locator("text=Advert updated successfully").or(page.locator("text=Başarıyla güncellendi").or(page.locator("text=Success")))).toBeVisible();
  });

  test("TC_03 Manager verdiği ilanları silebilmeli", async ({ page }) => {
    test.setTimeout(60000); // İlan ekleyip silmek uzun sürebilir
    // 1. Önce silinecek geçici bir test ilanı oluştur
    const testTitle = "Silinecek İlan " + Date.now();
    await page.goto("https://prettierhome.deployedprojects.xyz/");
    await createPropertyPage.clickPropertyButton(); // İlan Ekle sayfasına git
    await createPropertyPage.fillAdvertForm({
      ...defaultValidFormData,
      title: testTitle
    });
    await createPropertyPage.uploadImage("test-data/US_07/1716819386108033080.jpg");
    await createPropertyPage.clickCreateButton();
    await expect(page.locator("text=Advert created successfully").or(page.locator("text=İlan başarıyla oluşturuldu!"))).toBeVisible();
    await page.waitForTimeout(2000); 
    
    // 2. İlanlarım sayfasına git
    await page.goto("https://prettierhome.deployedprojects.xyz/");
    await myAdvertsPage.clickUserLogo();
    await myAdvertsPage.clickMyAdvertsLink();
    
    // 3. Eklediğimiz ilanı bul ve sil butonuna bas
    const deleteBtn = await myAdvertsPage.getDeleteButtonByTitle(testTitle);
    await deleteBtn.click();
    
    // 4. Onay penceresinde "Evet" (Yes) seç
    await myAdvertsPage.confirmYesButton.click();
    
    // 5. Başarı mesajını doğrula
    await expect(page.locator("text=Advert deleted successfully").or(page.locator("text=İlan başarıyla silindi").or(page.locator("text=Deleted")))).toBeVisible();
  });

  test("TC_04 Manager verdiği ilanları silebilmeli (İptal - Hayır)", async ({ page }) => {
    test.setTimeout(60000);
    // 1. Önce silme iptali testi için geçici test ilanı oluştur
    const testTitle = "İptal Edilecek İlan " + Date.now();
    await page.goto("https://prettierhome.deployedprojects.xyz/");
    await createPropertyPage.clickPropertyButton();
    await createPropertyPage.fillAdvertForm({
      ...defaultValidFormData,
      title: testTitle
    });
    await createPropertyPage.uploadImage("test-data/US_07/1716819386108033080.jpg");
    await createPropertyPage.clickCreateButton();
    await expect(page.locator("text=Advert created successfully").or(page.locator("text=İlan başarıyla oluşturuldu!"))).toBeVisible();
    await page.waitForTimeout(2000); 
    
    // 2. İlanlarım sayfasına git
    await page.goto("https://prettierhome.deployedprojects.xyz/");
    await myAdvertsPage.clickUserLogo();
    await myAdvertsPage.clickMyAdvertsLink();
    
    // 3. İlanı bul ve sil butonuna bas
    const deleteBtn = await myAdvertsPage.getDeleteButtonByTitle(testTitle);
    await deleteBtn.click();
    
    // 4. Onay penceresinde "Hayır" (No) seç
    await myAdvertsPage.confirmNoButton.click();
    
    // 5. İlanın silinmediğini doğrula
    await expect(page.locator(`text=${testTitle}`)).toBeVisible();
  });
});
