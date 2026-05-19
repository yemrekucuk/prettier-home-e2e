import { test, expect } from "../../../fixtures/propertiesFixtures";
import { PROPERTIES_DATA } from "../../../test-data/TestDataProperties";




  
  test("TC_08 - Ozel Filtreleme", async ({
    propertiesPage,
    listingDetailsPage,
    loginPage,page
  }) => {
    await page.goto("/");
    await loginPage.loginAsCustomer();
    await loginPage.clickPropertiesLink();
    //1)Doldurulmasi gereken alanlari tesdatadaki verilerimizi gondererek dolduruyoruz=>Filter search methodunu kullandim
    await propertiesPage.filterSearch(PROPERTIES_DATA);
    //2)search =>bu methodda hem bekleme hem visible hem click fonksiyonu var
    await propertiesPage.clickSearch();
    //3)Karsimiza gelen listeden ilk ilana tikliyoruz(cunku bizim ozel filtreledigimiz ilan geliyor sonuc olarak)
    await propertiesPage.listingCards.first().click();
    //4)Dogrulamalri yapiyoruz
    await expect(listingDetailsPage.advertTypeField).toHaveText(
      PROPERTIES_DATA.advertTypeField!,
    );
    await expect(listingDetailsPage.locationField).toHaveText(
      PROPERTIES_DATA.locationField!,
    );
    await expect(listingDetailsPage.advertPrice).toContainText("$");
  });
