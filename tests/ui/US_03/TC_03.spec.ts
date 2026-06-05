/* import { test, expect } from "../../../fixtures/myProfileFixture";

test.describe("US_03 - My Profile", () => {

  test("TC_03 - Profil fotoğrafı ekleyebilmeli", async ({ myProfilePage }) => {

    await myProfilePage.page.waitForLoadState('networkidle');
    await myProfilePage.profilePhotoTab.click();

    await myProfilePage.fileInput.setInputFiles('test-data/test-photo.jpg.jpeg');
    await myProfilePage.doneButton.click();
    await myProfilePage.saveButton.click();


   await expect(myProfilePage.page.getByText("You have updated your profile photo")).toBeVisible();
  });

}); */