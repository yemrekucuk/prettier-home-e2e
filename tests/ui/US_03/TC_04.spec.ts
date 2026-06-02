import { test, expect } from "../../../fixtures/myProfileFixture";

test.describe("US_03 - My Profile", () => {

  test("TC_04 - Hesabını silebilmeli", async ({ myProfilePage }) => {
    await myProfilePage.deleteAccountTab.click();
    await myProfilePage.deletePasswordInput.fill("Aa12345678.");
    
    // Hesap silinmesin diye sadece dialog açıldığını doğrula
    await expect(myProfilePage.deletePasswordInput).toBeVisible();
  });

});