/* import { test, expect } from "../../../fixtures/myProfileFixture";

test.describe("US_03 - My Profile", () => {

  test("TC_02 - Şifre değiştirebilmeli", async ({ myProfilePage }) => {
    await myProfilePage.changePasswordTab.click();
    await myProfilePage.currentPasswordInput.fill("Aa12345678.");
    await myProfilePage.newPasswordInput.fill("Bb12345678.");
    await myProfilePage.confirmPasswordInput.fill("Bb12345678.");
    await myProfilePage.changeButton.click();
    await expect(myProfilePage.page).toHaveURL(/login/);
    //  Bu test çalıştıktan sonra şifre Bb12345678. olarak değişir!
    // .env dosyasındaki USER_PASSWORD=Bb12345678. olarak güncellenmeli!
    // TC01 tekrar çalıştırılacaksa USER_PASSWORD=Aa12345678. yapılmalı!
  });

}); */