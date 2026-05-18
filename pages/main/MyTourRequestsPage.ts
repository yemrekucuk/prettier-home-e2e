import { Page, Locator, expect } from "@playwright/test";
import { NavbarPage } from "./NavbarPage";
import { WaitUtils } from "../../utils/WaitUtils";

export class MyTourRequestsPage extends NavbarPage {
  readonly requestRows: Locator;
  readonly toastMessage: Locator;
  readonly dateInput: Locator;
  readonly timeSelect: Locator;
  readonly updateButton: Locator;
  readonly myRequestTableFirstRow: Locator;
  readonly myRequestTableFirstRowAdvertName: Locator;
  readonly lastCreatedTourRequestDeleteButton: Locator;
  readonly deletePopupYesButton: Locator;
  readonly deletePopupNoButton: Locator;
  readonly deleteSuccessMessage: Locator;

  constructor(page: Page) {
    super(page);

    // Kart yapısı
    this.requestRows = page.locator(".getproperty");
    this.toastMessage = page.locator(".p-toast-detail");

    // Edit sayfası locatorları
    this.dateInput = page.locator('input[name="tourDate"]');
    this.timeSelect = page.locator('select[name="tourTime"]');
    this.updateButton = page.getByRole("button", { name: "UPDATE" });
    this.myRequestTableFirstRow = page.locator("(//tbody)[1]/tr[1]");
    this.myRequestTableFirstRowAdvertName = page.locator(
      "(//div[@class='text']/p)[1]",
    );
    this.lastCreatedTourRequestDeleteButton = page.locator(
      "(//button[@class='btn-link btn btn-primary'])[1]",
    );
    this.deletePopupYesButton = page.locator(
      "(//span[@class='p-button-label p-c'])[2]",
    );
    this.deletePopupNoButton = page.locator(
      "(//span[@class='p-button-label p-c'])[1]",
    );
    this.deleteSuccessMessage = page.locator(
      "//div[@class='p-toast-message-text']",
    );
  }

  // --------------------------
  // PRIVATE HELPERS
  // --------------------------

  private getRowByPropertyName(propertyName: string) {
    return this.requestRows.filter({ hasText: propertyName });
  }

  private getEditButton(row: Locator) {
    return row.getByRole("button").filter({
      has: row.locator('svg path[d^="M17 3a2.85"]'),
    });
  }

  private getDeleteButton(row: Locator) {
    return row.getByRole("button").filter({
      has: row.locator('svg path[d^="M19 6v14"]'),
    });
  }

  // --------------------------
  // ACTIONS
  // --------------------------

  async deleteRequest(propertyName: string) {
    const row = this.getRowByPropertyName(propertyName).first();
    
    await WaitUtils.waitForVisible(row);

    const deleteButton = this.getDeleteButton(row);
    await WaitUtils.waitForVisible(deleteButton);

    await deleteButton.click();

    await this.page.locator(".p-confirm-popup").waitFor({ state: "visible" });
    await this.page.getByRole("button", { name: "Yes" }).click();

    await WaitUtils.waitForToast(this.page, "Tour request deleted");
  }

  async clickEditRequest(propertyName: string) {
    const row = this.getRowByPropertyName(propertyName).first();
    
    await WaitUtils.waitForVisible(row);

    const editButton = this.getEditButton(row);
    await WaitUtils.waitForVisible(editButton);

    await editButton.click();
  }

  async clickUpdateButton() {
    await this.updateButton.click();
  }

  async updateTourRequest(date: string, time: string) {
    await this.dateInput.fill(date);
    await this.timeSelect.selectOption(time);
    await this.updateButton.click();
  }

  // --------------------------
  // GETTERS 
  // --------------------------

  async getStatusText(propertyName: string) {
    const row = this.getRowByPropertyName(propertyName).first();
    await WaitUtils.waitForVisible(row);

    
    return row.locator(".text p").nth(2).innerText();
  }

  async getTourDateTime(propertyName: string) {
    const row = this.getRowByPropertyName(propertyName).first();
    await WaitUtils.waitForVisible(row);

    const date = await row.locator(".tour-date").innerText();
    const time = await row.locator(".tour-time").innerText();

    return { date, time };
  }

  async lastCreatedTourRequestVisibleTest() {
    await WaitUtils.waitForVisible(this.myRequestTableFirstRow);
    expect(this.myRequestTableFirstRow).toBeVisible();
  }

  async deleteLastCreatedTourRequest() {
    await this.lastCreatedTourRequestDeleteButton.click();
    await this.page.waitForTimeout(2000);
    await this.deletePopupYesButton.click();
  }
  async deleteMessageVisibleTest() {
    await WaitUtils.waitForVisible(this.deleteSuccessMessage);
    expect(this.deleteSuccessMessage).toBeVisible();
  }
}
