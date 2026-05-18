import { Locator, Page, expect } from "@playwright/test";
import { NavbarPage } from "./NavbarPage";
import { FilterOptions } from "../../interfaces/filterOptions.interface";
import { WaitUtils } from "../../utils/WaitUtils";

export class PropertiesPage extends NavbarPage {
  readonly firstSearcedPropertie: Locator;

  constructor(page: Page) {
    super(page);
    this.firstSearcedPropertie = page.locator(
      "(//div/a/img[@class='card-img-top property-card-img'])[1]",
    );
  }

  // ---------------------------
  // GETTER LOCATORS (her çağrıldığında güncel DOM’dan alınır)
  // ---------------------------

  get searchInput() {
    return this.page.getByRole("textbox", { name: "Search" });
  }

  get minPriceInput() {
    return this.page.getByPlaceholder("min");
  }

  get maxPriceInput() {
    return this.page.getByPlaceholder("max");
  }

  get advertTypeSelect() {
    return this.page.getByLabel("Advert Type");
  }

  get categorySelect() {
    return this.page.getByLabel("Category");
  }

  get countrySelect() {
    return this.page.getByLabel("Country");
  }

  get citySelect() {
    return this.page.getByLabel("City");
  }

  get districtSelect() {
    return this.page.locator("//select[@id='dist']");
  }

  get searchButtonProperties() {
    return this.page.getByRole("button", { name: "Search" });
  }

  get listingCards() {
    return this.page.locator("//div[contains(@class,'property-card')]");
  }

  get totalFoundText() {
    return this.page.getByText(/Total found\s*:/);
  }
  get myTourRequestsPropertiesLink() {
    return this.page.getByRole("link", { name: "My Tour Requests" });
  }

  // ---------------------------
  // FILTER LOGIC
  // ---------------------------

  async filterSearch(options: FilterOptions) {
    // 1) Search keyword
    if (options.searchInput) {
      await this.searchInput.fill(options.searchInput);
    }

    // 2) Price Range
    if (options.minPrice !== undefined) {
      await this.minPriceInput.fill(options.minPrice);
    }

    if (options.maxPrice !== undefined) {
      await this.maxPriceInput.fill(options.maxPrice);
    }

    // 3) Advert Type
    if (options.advertType) {
      await this.advertTypeSelect.selectOption(options.advertType);
    }

    // 4) Category
    if (options.category) {
      await this.categorySelect.selectOption(options.category);
    }

    // 5) Country
    if (options.country) {
      await this.countrySelect.selectOption(options.country);
    }

    //  6) CITY DROPDOWN YÜKLENMESİNİ BEKLE
    await this.citySelect
      .locator('option:not([value="-1"])')
      .first()
      .waitFor({ state: "attached", timeout: 10000 });

    // 7) City
    if (options.city) {
      await this.citySelect.selectOption(options.city);
    }

    // 8) DISTRICT DROPDOWN YÜKLENMESİNİ BEKLE
    await this.districtSelect
      .locator('option:not([value="-1"])')
      .first()
      .waitFor({ state: "attached", timeout: 10000 });

    // 9) District
    if (options.district) {
      await this.districtSelect.selectOption({ label: options.district });
    }

    // 10) Search Button
    await this.searchButtonProperties.waitFor({ state: "visible" });
  }

  // ---------------------------
  // ACTIONS
  // ---------------------------

  async clickSearch() {
    const searchBtn = this.page.getByRole("button", { name: "Search" });

    await searchBtn.waitFor({ state: "visible" });
    await searchBtn.click();

    await this.listingCards.first().waitFor({ state: "visible" });
  }

  async goToFirstPropertyDetails() {
    await this.listingCards.first().waitFor({ state: "visible" });
    await this.listingCards.first().click();
  }

  async clickFirstSearchedPropertie() {
    await this.firstSearcedPropertie.waitFor({ state: "visible" });
    await this.firstSearcedPropertie.click();
  }

  async isVisibleFirstSearchedPropertie() {
    await this.firstSearcedPropertie.waitFor({ state: "visible" });
    await expect(this.firstSearcedPropertie).toBeVisible();
  }

  async searchRentPropertiesWithSpesificDatas() {
    await this.searchInput.fill("Office");

    await this.minPriceInput.fill("250000");

    await this.maxPriceInput.fill("400000");

    await this.advertTypeSelect.selectOption({ label: "Rent" });

    await this.categorySelect.selectOption({ label: "Office" });

    await this.countrySelect.selectOption({ label: "Türkiye" });

    await this.citySelect.selectOption({ label: "Bursa" });

    await this.page.waitForSelector(
      'select[id="dist"] option:has-text("Nilüfer")',
      { state: "attached" },
    );

    await this.districtSelect.selectOption({ label: "Nilüfer" });
  }
}
