import { test, expect } from "../../../fixtures/propertiesFixtures"
import { PROPERTIES_DATA } from "../../../test-data/TestDataProperties"


test.describe("Listing Details Tests", () => {

    test.beforeEach(async ({ page, loginPage, propertiesPage }) => {
      await page.goto("/");
      await loginPage.loginAsCustomer();
      await loginPage.clickPropertiesLink();

      // filtersearch methodu ve icine testdatadaki datalar
      await propertiesPage.filterSearch(PROPERTIES_DATA);

      // Search
      await propertiesPage.clickSearch();

      // İlk ilana gir
      await propertiesPage.listingCards.first().waitFor({ state: "visible" });
      await propertiesPage.listingCards.first().click();

    });

    test("TC_08 → Listing Details sayfasında tüm alanlar doğru görüntülenmeli", async ({  listingDetailsPage }) => {
      // Title
      await listingDetailsPage.advertTitle.waitFor({ state: "visible" });
        await expect(listingDetailsPage.advertTitle).toBeVisible();
        // Advert Type
    await expect(listingDetailsPage.advertTypeField).toContainText(
      PROPERTIES_DATA.advertTypeField!
    );

    // Category(testdatadaki datalardan)
    await expect(listingDetailsPage.categoryField).toContainText(
      PROPERTIES_DATA.category!
    );

    // Price(testdatadaki datalardan datamiz string oldugundan number yapiyoruz)
    await listingDetailsPage.advertPrice.waitFor({ state: "visible" });
    const priceText = await listingDetailsPage.advertPrice.textContent();
    const price = parseInt(priceText!.replace(/[^0-9]/g, ""), 10);

    expect(price).toBeGreaterThanOrEqual(Number(PROPERTIES_DATA.minPrice));
    expect(price).toBeLessThanOrEqual(Number(PROPERTIES_DATA.maxPrice));

    // Location (City + District)
    await expect(listingDetailsPage.locationField).toContainText(
      PROPERTIES_DATA.city!
    );
    await expect(listingDetailsPage.locationField).toContainText(
      PROPERTIES_DATA.district!
    );
  });

  
  test("TC_09 → Description alanı doğru görüntülenmeli", async ({
    listingDetailsPage,
  }) => {
    await listingDetailsPage.descriptionField.waitFor({ state: "visible" });

    // Description boş olmamalı
    const desc = await listingDetailsPage.descriptionField.textContent();
    expect(desc?.trim().length).toBeGreaterThan(0);

    // UI description → TestData description eşleşmesi
    if (PROPERTIES_DATA.description) {
      await expect(listingDetailsPage.descriptionField).toContainText(
        PROPERTIES_DATA.description!
      );
    }
  });
    });

    


