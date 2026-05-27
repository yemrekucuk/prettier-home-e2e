import { Locator, Page, expect } from "@playwright/test";
import { NavbarPage } from "./NavbarPage";
import { FilterOptions } from "../../interfaces/filterOptions.interface";
import searchData from "../../test-data/SearchData.json"

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
    get filterSearchButton() {
    return this.page.getByRole('button', { name: 'Search' });
  }
  get advertImage() {
  return this.page.locator('span').nth(1);
}

get detailsHeading() {
  return this.page.getByRole('heading', { name: 'DETAILS' });
}

get locationHeading() {
  return this.page.getByRole('heading', { name: 'LOCATION' });
}

get descriptionHeading() {
  return this.page.getByRole('heading', { name: 'Description' });
}
get saleButton() {
  return this.page.getByRole('button', { name: 'SALE' });
}

get tourDateInput() {
  return this.page.getByRole('textbox', { name: 'Tour Date' });
}

get tourTimeSelect() {
  return this.page.getByLabel('Tour Time');
}

get submitTourButton() {
  return this.page.getByRole('button', { name: 'Submit a tour request' });
}

get loginForTourText() {
  return this.page.getByText('Log in for tour requestFound');
}

get createOneNowText() {
  return this.page.getByText("Don't have an account? Create");
}
get searchBoxInput() {
  return this.page.getByRole('searchbox', { name: 'Search' });
}
get searchButtonInput() {
  return this.page.locator('div.search-input-wrapper button');
}
get createOneNowLink() {
  return this.page.getByText('Create one now!');
}

  // ---------------------------
  // FILTER LOGIC
  // ---------------------------

  async filterSearch(options: FilterOptions) {
    await this.searchInput.fill(options.searchInput || "");
    await this.minPriceInput.fill(options.minPrice || "");
    await this.maxPriceInput.fill(options.maxPrice || "");

    await this.advertTypeSelect.selectOption({ label: options.advertType });
    await this.categorySelect.selectOption({ label: options.category });
    await this.countrySelect.selectOption({ label: options.country });

    // CITY — direkt seç 
    await this.citySelect.selectOption({ label: options.city });

    // DISTRICT — direkt option bekle 
    await this.page.waitForSelector(
      `select#dist option:has-text("${options.district}")`,
      { state: "attached", timeout: 10000 },
    );

    await this.districtSelect.selectOption({ label: options.district });

    await this.searchButtonProperties.click();
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
    await this.searchInput.fill(searchData.searchInput);

    await this.minPriceInput.fill(searchData.minPrice);

    await this.maxPriceInput.fill(searchData.maxPrice);

    await this.advertTypeSelect.selectOption({ label: searchData.advertType });

    await this.categorySelect.selectOption({ label: searchData.category });

    await this.countrySelect.selectOption({ label: searchData.country });

    await this.citySelect.selectOption({ label: searchData.city });

    await this.page.waitForSelector(
      'select[id="dist"] option:has-text("Nilüfer")',
      { state: "attached" },
    );

    await this.districtSelect.selectOption({ label: searchData.district });
  }
}
