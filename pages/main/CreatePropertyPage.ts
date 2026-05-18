import { Page, Locator } from "@playwright/test";
import { Navbar } from "../Navbar";

export const defaultValidFormData = {
  title: "Merkezi Konumda 3+1 Kiralık Daire",
  description: "Geniş balkonlu, eşyalı, metro yakını",
  price: "5000",
  advertType: "Rent",
  category: "House",
  country: "Türkiye",
  city: "İstanbul",
  district: "Kadıköy",
  address: "Atatürk Cad. No:12",
  size: "120",
  bedrooms: "3",
  bathrooms: "1",
  garage: "No",
  buildYear: "2010",
  furniture: "No",
  maintenanceFee: "200",
  terrace: "No",
};

export class CreatePropertyPage extends Navbar {
  readonly titleInput: Locator;
  readonly descriptionInput: Locator;
  readonly priceInput: Locator;

  readonly advertTypeDropdown: Locator;
  readonly categoryDropdown: Locator;

  readonly countryDropdown: Locator;
  readonly cityDropdown: Locator;
  readonly districtDropdown: Locator;

  readonly addressInput: Locator;

  readonly latitudeInput: Locator;
  readonly longitudeInput: Locator;

  readonly sizeInput: Locator;
  readonly bedroomsInput: Locator;
  readonly bathroomsInput: Locator;

  readonly garageDropdown: Locator;
  readonly buildYearInput: Locator;
  readonly furnitureDropdown: Locator;
  readonly maintenanceFeeInput: Locator;
  readonly terraceDropdown: Locator;

  readonly imageUploadInput: Locator;
  readonly createButton: Locator;

  constructor(page: Page) {
    super(page);

    // --- Common Information ---
    this.titleInput = page.getByLabel("Title");
    this.descriptionInput = page.getByLabel("Description");
    this.priceInput = page.getByLabel("Price");

    this.advertTypeDropdown = page.getByLabel("Advert Type");
    this.categoryDropdown = page.getByLabel("Category");

    // --- Address Information ---
    this.countryDropdown = page.getByLabel("Country");
    this.cityDropdown = page.getByLabel("City");
    this.districtDropdown = page.getByLabel("District");

    this.addressInput = page.getByLabel("Address");

    this.latitudeInput = page.getByLabel("Latitude");
    this.longitudeInput = page.getByLabel("Longitude");

    // --- Properties ---
    this.sizeInput = page.getByLabel("Size");
    this.bedroomsInput = page.getByLabel("Bedrooms");
    this.bathroomsInput = page.getByLabel("Bathrooms");

    this.garageDropdown = page.getByLabel("Garage");
    this.buildYearInput = page.getByLabel("Year of Build");
    this.furnitureDropdown = page.getByLabel("Furniture");
    this.maintenanceFeeInput = page.getByLabel("Maintenance Fee");
    this.terraceDropdown = page.getByLabel("Terrace");

    // --- Image Upload ---
    this.imageUploadInput = page.locator('input[type="file"]');

    // --- Create Button ---
    this.createButton = page.locator('button[type="submit"]', {
      hasText: "Create",
    });
  }

  async fillAdvertForm(formData: any = {}) {
    const data = { ...defaultValidFormData, ...formData };

    if (data.title !== undefined) await this.titleInput.fill(data.title);
    if (data.description !== undefined)
      await this.descriptionInput.fill(data.description);
    if (data.price !== undefined) await this.priceInput.fill(data.price);

    if (data.advertType !== undefined)
      await this.advertTypeDropdown.selectOption(data.advertType);
    if (data.category !== undefined)
      await this.categoryDropdown.selectOption(data.category);

    if (data.country !== undefined)
      await this.countryDropdown.selectOption({ label: data.country });
    if (data.city !== undefined)
      await this.cityDropdown.selectOption({ label: data.city });
    if (data.district !== undefined)
      await this.districtDropdown.selectOption({ label: data.district });

    if (data.address !== undefined) await this.addressInput.fill(data.address);
    if (data.size !== undefined) await this.sizeInput.fill(data.size);
    if (data.bedrooms !== undefined)
      await this.bedroomsInput.fill(data.bedrooms);
    if (data.bathrooms !== undefined)
      await this.bathroomsInput.fill(data.bathrooms);

    if (data.garage !== undefined)
      await this.garageDropdown.selectOption(data.garage);
    if (data.buildYear !== undefined)
      await this.buildYearInput.fill(data.buildYear);
    if (data.furniture !== undefined)
      await this.furnitureDropdown.selectOption(data.furniture);
    if (data.maintenanceFee !== undefined)
      await this.maintenanceFeeInput.fill(data.maintenanceFee);
    if (data.terrace !== undefined)
      await this.terraceDropdown.selectOption(data.terrace);
  }

  async uploadImage(filePath: string) {
    await this.imageUploadInput.setInputFiles(filePath);
  }

  async clickCreateButton() {
    await this.createButton.click();
  }
}
