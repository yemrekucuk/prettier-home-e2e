import { Page, expect } from "@playwright/test";
import { NavbarPage } from "./NavbarPage";
import { FilterOptions } from "../../interfaces/filterOptions.interface";
import { WaitUtils } from "../../utils/WaitUtils";

export class PropertiesPage extends NavbarPage {
  constructor(page: Page) {
    super(page);
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

  // District dropdown React tarafından yeniden render edildiği için → .first()
  get districtSelect() {
    return this.page.locator("select#dist").first();
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
    if (options.advertType) {
      await this.advertTypeSelect.selectOption(options.advertType);
    }

    if (options.category) {
      await this.categorySelect.selectOption(options.category);
    }

    if (options.minPrice !== undefined) {
      await this.minPriceInput.fill(options.minPrice);
    }

    if (options.maxPrice !== undefined) {
      await this.maxPriceInput.fill(options.maxPrice);
    }

    if (options.country) {
      await this.countrySelect.selectOption(options.country);
    }

    if (options.city) {
      await this.citySelect.selectOption(options.city);
    }

    if (options.district) {
      // District dropdown React tarafından yeniden render edildiği için:
      await this.page.waitForSelector("select#dist", { state: "attached" });
      await this.districtSelect.waitFor({ state: "visible" });

      await this.districtSelect.selectOption({ label: options.district });
    }

    await WaitUtils.waitForVisible(this.searchButtonProperties);
  }

  // ---------------------------
  // ACTIONS
  // ---------------------------

  async clickSearch() {
    await this.searchButtonProperties.click();
    await this.listingCards.first().waitFor({ state: "visible" });
  }

  async goToFirstPropertyDetails() {
    await this.listingCards.first().waitFor({ state: "visible" });
    await this.listingCards.first().click();
  }
}
