import { Page, Locator, expect } from "@playwright/test";
import { NavbarPage } from "./NavbarPage";
import { InputUtils } from "../../utils/InputUtils";

export class ListingDetailsPage extends NavbarPage {
  readonly advertPrice: Locator;
  readonly advertTitle: Locator;
  readonly advertTypeField: Locator;
  readonly locationField: Locator;
  readonly descriptionField: Locator;
  readonly tourDateInput: Locator;
  readonly tourTimeSelect: Locator;
  readonly submitTourButton: Locator;
  readonly successMessage: Locator;
  readonly categoryField: Locator;
  readonly ownerContactSection: Locator;
  readonly ownerName: Locator;
  readonly contactNumberButton: Locator;
  readonly contactNumberToggle: Locator;
  readonly sendMailButton: Locator;
  readonly sendMailToggle: Locator;
  readonly phoneNumberHiddenButton: Locator;
  readonly phoneNumberHiddenText: Locator;
  readonly emailHiddenButton: Locator;
  readonly emailHiddenText: Locator;
  readonly detailsField: Locator;

  constructor(page: Page) {
    super(page);

    this.advertPrice = page.locator(
      ".advert-details-page-header-container .price",
    );
    this.advertTitle = page.locator(".advert-title");
    this.advertTypeField = page.locator(".advert-type");
    this.categoryField = page.locator(".advert-category-title");
    this.descriptionField = page.locator(".advert-description");
    this.locationField = page.locator(".city-district");

    // Tour Request alanı
    this.tourDateInput = page.getByRole("textbox", { name: "Tour Date" });
    this.tourTimeSelect = page.getByLabel("Tour Time");
    this.submitTourButton = page.getByRole("button", {
      name: "Submit a tour request",
    });

    this.successMessage = page.locator("text=TourRequest created successfully");

    // Owner Contact Section
    this.ownerContactSection = page.locator(
      ".advert-details-owner-profile-container",
    );
    this.ownerName = page.locator(".advert-details-owner-name");

    // Contact Number
    this.contactNumberButton = page
      .locator(".advert-details-owner-phone button")
      .first();

    this.contactNumberToggle = page.locator(
      ".advert-details-owner-phone button.show-toggle",
    );

    // Send Mail
    this.sendMailButton = page
      .locator(".advert-details-owner-mail button")
      .first();

    this.sendMailToggle = page.locator(
      ".advert-details-owner-mail button.show-toggle",
    );
    this.detailsField = page.locator(
      "//div[@class='advert-details-properties-container container']",
    );
    this.phoneNumberHiddenButton = page.locator(
      "(//button[@class='show-toggle btn btn-danger'])[1]",
    );
    this.emailHiddenButton = page.locator(
      "(//button[@class='show-toggle btn btn-danger'])[2]",
    );
    this.phoneNumberHiddenText = page.locator(
      "//a[@class='advert-detail-phone-link']",
    );
    this.emailHiddenText = page.locator(
      "//a[@class='advert-detail-mail-link']",
    );
  }

  /**
   * Tour Request oluşturur (InputUtils ile stabil)
   */
  async scheduleATour(date: string, time: string) {
    await InputUtils.clearAndType(this.tourDateInput, date);
    await this.tourTimeSelect.selectOption(time);
    await this.submitTourButton.click();

    //await this.successMessage.waitFor({ state: "visible" });
  }

  async listingDetailsVisibleTests() {
    await this.phoneNumberHiddenButton.click();
    await this.emailHiddenButton.click();
    await expect(this.emailHiddenText).toBeVisible();
    await expect(this.phoneNumberHiddenText).toBeVisible();
    await expect(this.descriptionField).toBeVisible();
    await expect(this.detailsField).toBeVisible();
    await expect(this.locationField).toBeVisible();
  }

  async successMessageVisibleTest() {
    expect(this.successMessage).toBeVisible();
  }
}
