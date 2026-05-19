import { test, expect } from "../../../fixtures/myProfileFixture";

test.describe("US_03 - My Profile", () => {

  test("TC_01 - Profil bilgilerini güncelleyebilmeli", async ({ myProfilePage }) => {

    await myProfilePage.firstNameInput.fill("ali");
    await myProfilePage.lastNameInput.fill("yılmaz");
    await myProfilePage.phoneInput.fill("5424222222");
    await myProfilePage.emailInput.fill("suphialbayrakoglu@gmail.com");
    await myProfilePage.updateButton.click();
    await expect(myProfilePage.page.getByText("Profile updated successfully")).toBeVisible();
  });

});