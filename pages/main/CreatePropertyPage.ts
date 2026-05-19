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
  // --
  readonly parkingSpaceDropdown: Locator;
  readonly balconyDropdown: Locator;
  readonly elevatorDropdown: Locator;
  readonly zoningInput: Locator;
  readonly accessRoadInput: Locator;
  readonly legalStatusInput: Locator;
  readonly landAreaInput: Locator;

  constructor(page: Page) {
    super(page);
    this.titleInput = page.getByLabel("Title");
    this.descriptionInput = page.getByLabel("Description");
    this.priceInput = page.getByLabel("Price");
    this.advertTypeDropdown = page.getByLabel("Advert Type");
    this.categoryDropdown = page.getByLabel("Category");
    this.countryDropdown = page.getByLabel("Country");
    this.cityDropdown = page.getByLabel("City");
    this.districtDropdown = page.getByLabel("District");
    this.addressInput = page.getByLabel("Address");
    this.latitudeInput = page.getByLabel("Latitude");
    this.longitudeInput = page.getByLabel("Longitude");
    this.sizeInput = page.getByLabel("Size");
    this.bedroomsInput = page.getByLabel("Bedrooms");
    this.bathroomsInput = page.getByLabel("Bathrooms");
    this.garageDropdown = page.getByLabel("Garage");
    this.buildYearInput = page.getByLabel("Year of Build");
    this.furnitureDropdown = page.getByLabel("Furniture");
    this.maintenanceFeeInput = page.getByLabel("Maintenance Fee");
    this.terraceDropdown = page.getByLabel("Terrace");
    this.parkingSpaceDropdown = page.getByLabel("Parking Space");
    this.balconyDropdown = page.getByLabel("Balcony");
    this.elevatorDropdown = page.getByLabel("Elevator");
    this.zoningInput = page.getByLabel("Zoning");
    this.accessRoadInput = page.getByLabel("Access Road");
    this.legalStatusInput = page.getByLabel("Legal Status");
    this.landAreaInput = page.getByLabel("Land Area");

    // --- Image Upload ---
    this.imageUploadInput = page.locator('input[type="file"]');

    // --- Create Button ---
    this.createButton = page.locator('button[type="submit"]', {
      hasText: "Create",
    });
  }

  async clickPropertyButton() {
    await this.page.locator("text=İlan Ekle").or(this.page.locator("text=Create Property")).click();
  }

  async fillAdvertForm(formData: any = {}) {

    let data = { ...formData };
    const isDefaultCategory = !formData.category || formData.category === "Ev" || formData.category === "House";
    if (isDefaultCategory) {
        data = { ...defaultValidFormData, ...formData };
    }
    if (data.title !== undefined) await this.titleInput.fill(data.title);
    if (data.description !== undefined) await this.descriptionInput.fill(data.description);
    if (data.price !== undefined) await this.priceInput.fill(data.price);

    if (data.advertType !== undefined) await this.advertTypeDropdown.selectOption(data.advertType === "Satılık" ? { label: "Sale" } : { label: data.advertType });
    const categoryMap: Record<string, string> = {
      "Ev": "House",
      "Apartman": "Apartment",
      "Ofis": "Office",
      "Villa": "Villa",
      "Arsa": "Land",
      "Mağaza": "Shop"
    };
    if (data.category !== undefined) {
      const translatedCategory = categoryMap[data.category] || data.category;
      await this.categoryDropdown.selectOption({ label: translatedCategory });
    }
    if (data.country !== undefined) await this.countryDropdown.selectOption({ label: data.country });
    if (data.city !== undefined) await this.cityDropdown.selectOption({ label: data.city });
    if (data.district !== undefined) await this.districtDropdown.selectOption({ label: data.district });

    const fillOpt = async (loc: Locator, val: string | undefined) => {
      if (val !== undefined) {
        try { await loc.fill(val, { timeout: 1000 }); } catch (e) {}
      }
    };
    const selOpt = async (loc: Locator, val: string | undefined) => {
      if (val !== undefined) {
        try { await loc.selectOption({ label: val }, { timeout: 1000 }); } catch (e) {}
      }
    };

    await fillOpt(this.addressInput, data.address);
    await fillOpt(this.sizeInput, data.size);
    await fillOpt(this.bedroomsInput, data.bedrooms);
    await fillOpt(this.bathroomsInput, data.bathrooms);

    await selOpt(this.garageDropdown, data.garage);
    
    const yearValue = data.buildYear !== undefined ? data.buildYear : data.yearOfBuild;
    await fillOpt(this.buildYearInput, yearValue);

    await selOpt(this.furnitureDropdown, data.furniture);
    await fillOpt(this.maintenanceFeeInput, data.maintenanceFee);
    await selOpt(this.terraceDropdown, data.terrace);
    await selOpt(this.parkingSpaceDropdown, data.parkingSpace);
    await selOpt(this.balconyDropdown, data.balcony);
    await selOpt(this.elevatorDropdown, data.elevator);
    await fillOpt(this.zoningInput, data.zoning);
    await fillOpt(this.accessRoadInput, data.accessRoad);
    await fillOpt(this.legalStatusInput, data.legalStatus);
    await fillOpt(this.landAreaInput, data.landArea);
  }

  async uploadImage(filePath: string) {
    await this.imageUploadInput.setInputFiles(filePath);
  }

  async clickCreateButton() {
    await this.createButton.click();
  }
}