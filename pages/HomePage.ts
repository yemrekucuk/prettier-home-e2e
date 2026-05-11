import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  readonly searchBar: Locator;
  readonly searchButton: Locator;
  readonly rentButton: Locator;
  readonly saleButton: Locator;
  readonly houseButton: Locator;
  readonly apartmentButton: Locator;
  readonly officeButton: Locator;
  readonly villaButton: Locator;
  readonly landButton: Locator;
  readonly shopButton: Locator;

  constructor(page: Page) {
    super(page);

    const buttonAdvertType = page.locator(".advert-type-wrapper");
    const buttonCategory = page.locator(".category-wrapper");

    this.searchBar = page.getByPlaceholder("Search");
    this.searchButton = page.locator('input[name="query"] + button');
    this.rentButton = buttonAdvertType.locator("button").first();
    this.saleButton = buttonAdvertType.locator("button").nth(1);
    this.houseButton = buttonCategory.locator("button").first();
    this.apartmentButton = buttonCategory.locator("button").nth(1);
    this.officeButton = buttonCategory.locator("button").nth(2);
    this.villaButton = buttonCategory.locator("button").nth(3);
    this.landButton = buttonCategory.locator("button").nth(4);
    this.shopButton = buttonCategory.locator("button").nth(5);
  }

  async searchProperty(propertyName: string) {
    await this.searchBar.fill(propertyName);
    await this.page.keyboard.press("Enter");
  }
  async clickSearchButton() {
    await this.searchButton.click();
  }
  async clickRentButton() {
    await this.rentButton.click();
  }
  async clickSaleButton() {
    await this.saleButton.click();
  }
  async clickHouseButton() {
    await this.houseButton.click();
  }
  async clickApartmentButton() {
    await this.apartmentButton.click();
  }
  async clickOfficeButton() {
    await this.officeButton.click();
  }
  async clickVillaButton() {
    await this.villaButton.click();
  }
  async clickLandButton() {
    await this.landButton.click();
  }
  async clickShopButton() {
    await this.shopButton.click();
  }
}
