import { test, expect } from "../../../fixtures/propertiesFixtures";
import { PROPERTIES_DATA } from "../../../test-data/TestDataProperties";


test.describe("Properties  Filter Tests", () => {
  test.beforeEach(async ({ page, loginPage }) => {
    await page.goto("/");
    await loginPage.loginAsCustomer();
    await loginPage.clickPropertiesLink();
  });

  
  test("TC_08 - Ozel Filtreleme", async ({
    propertiesPage,
    listingDetailsPage,
  }) => {
    //1)Doldurulmasi gereken alanlari tesdatadaki verilerimizi gondererek dolduruyoruz=>Filter search methodunu kullandim
    await propertiesPage.filterSearch(PROPERTIES_DATA);
    //2)search =>bu methodda hem bekleme hem visible hem click fonksiyonu var
    await propertiesPage.clickSearch();
    //3)Karsimiza gelen listeden ilk ilana tikliyoruz(cunku bizim ozel filtreledigimiz ilan geliyor sonuc olarak)
    await propertiesPage.listingCards.first().click();
    //4)Dogrulamalri yapiyoruz
    await expect(listingDetailsPage.advertTypeField).toHaveText(
      PROPERTIES_DATA.advertType!,
    );
    await expect(listingDetailsPage.locationField).toHaveText(
      PROPERTIES_DATA.city!,
    );
    await expect(listingDetailsPage.advertPrice).toContainText("$");
  });
});
