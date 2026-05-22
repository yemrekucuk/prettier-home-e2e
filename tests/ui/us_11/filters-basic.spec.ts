import { test, expect } from "../../../fixtures/propertiesFixtures";
import { PROPERTIES_DATA } from "../../../test-data/TestDataProperties";
import { WaitUtils } from "../../../utils/WaitUtils";

test.describe("Properties  Filter Tests", () => {
  test.beforeEach(async ({ page, loginPage }) => {
    //1)Sayfaya gidilir
    await page.goto("/");
    //2)Customer olarak giris yapilir
    await loginPage.loginAsCustomer();
    //3)Properties sayfasina gidilir
    await loginPage.clickPropertiesLink();
  });

  test("TC_02 Advert Type = Sale →Aranilan ilk ilanda SALE dogrulama ", async ({
    propertiesPage,
    listingDetailsPage,
  }) => {
    //4) Advert Type = Sale
    await propertiesPage.advertTypeSelect.selectOption(PROPERTIES_DATA.advertType!);

    //5) Search
    await propertiesPage.searchButtonProperties.click();

    //6) İlan kartlarını bekle
    await WaitUtils.waitForList(propertiesPage.listingCards);

    //7) İlk ilanın detayına gir
    await propertiesPage.listingCards.first().click();

    //8) Detay sayfasında Advert Type = SALE doğrula
    await expect(listingDetailsPage.advertTypeField).toHaveText("SALE");

    //9) Detay sayfasında başlık görünüyor mu doğrula
    await expect(listingDetailsPage.advertTitle).toBeVisible();
  });
  test("TC_03 - Category = House → Aranilan ilk ilanda Category doğrulama", async ({
    propertiesPage,
    listingDetailsPage,
  }) => {
    //4) Advert Type = Sale
    await propertiesPage.advertTypeSelect.selectOption(
      PROPERTIES_DATA.advertType!,
    );
    //5) Category = House
    await propertiesPage.categorySelect.selectOption(PROPERTIES_DATA.category!);
    //6) Search
    await propertiesPage.clickSearch();
    //7) İlan kartlarini bekle
    await WaitUtils.waitForList(propertiesPage.listingCards);

    //8) İlk ilana tıkla
    await propertiesPage.listingCards.first().click();

    //9) Category doğrulama
    await expect(listingDetailsPage.categoryField).toContainText(
      PROPERTIES_DATA.category!,
    );
  });
 

  test("TC_05 Country → Ilk ilanda ulke dogrulama", async ({
    propertiesPage,
    listingDetailsPage,
  }) => {
    //4 Advert Type
    await propertiesPage.advertTypeSelect.selectOption(
      PROPERTIES_DATA.advertType!,
    );

    //5 Country
    await propertiesPage.countrySelect.selectOption(PROPERTIES_DATA.country!);

    //6 Search
    await propertiesPage.clickSearch();

    //7 Ilan kartlarini bekle
    await WaitUtils.waitForList(propertiesPage.listingCards);

    //8 Ilk ilana tikla
    await propertiesPage.listingCards.first().click();

    //9 Ulke dogrulama
    await expect(listingDetailsPage.locationField).toContainText(
      PROPERTIES_DATA.country!,
    );
  });

  test("TC_06 City → Ilk ilanda sehir dogrulama", async ({
    propertiesPage,
    listingDetailsPage,
  }) => {
    //4 Advert Type
    await propertiesPage.advertTypeSelect.selectOption(
      PROPERTIES_DATA.advertType!,
    );

    //5 Country
    await propertiesPage.countrySelect.selectOption(PROPERTIES_DATA.country!);

    //6 City
    await propertiesPage.citySelect.selectOption(PROPERTIES_DATA.city!);

    //7 Search
    await propertiesPage.clickSearch();

    //8 Ilan kartlarini bekle
    await WaitUtils.waitForList(propertiesPage.listingCards);

    //9 Ilk ilana tikla
    await propertiesPage.listingCards.first().click();

    //10 Sehir dogrulama
    await expect(listingDetailsPage.locationField).toContainText(
      PROPERTIES_DATA.city!,
    );
  });

  test("TC_07 District → Ilk ilanda ilce dogrulama", async ({
    propertiesPage,
    listingDetailsPage,
  }) => {
    //4 Advert Type
    await propertiesPage.advertTypeSelect.selectOption(
      PROPERTIES_DATA.advertType!,
    );

    //5 Country
    await propertiesPage.countrySelect.selectOption(PROPERTIES_DATA.country!);

    //6 City
    await propertiesPage.citySelect.selectOption(PROPERTIES_DATA.city!);

    //7 District
    await propertiesPage.districtSelect.selectOption(PROPERTIES_DATA.district!);

    //8 Search
    await propertiesPage.clickSearch();

    //9 Ilan kartlarini bekle
    await WaitUtils.waitForList(propertiesPage.listingCards);

    //10 Ilk ilana tikla(kendi datalarimizla gelen ilk ilana tikliyoruz)
    await propertiesPage.listingCards.first().click();

    //11 Ilce dogrulama
    await expect(listingDetailsPage.locationField).toContainText(
      PROPERTIES_DATA.district!,
    );
  });
});
