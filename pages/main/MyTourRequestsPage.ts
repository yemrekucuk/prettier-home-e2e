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

    this.requestRows = page.locator("table tbody tr");
    this.toastMessage = page.locator(".p-toast-detail");
    //Ilanin Edit sayfasindaki locatorlar
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

  private getRowByPropertyName(propertyName: string) {
    return this.requestRows.filter({ hasText: propertyName });
  }

  private getEditButton(row: Locator) {
    return row.getByRole("button").filter({
      has: this.page.locator('svg path[d^="M17 3a2.85"]'),
    });
  }

  private getDeleteButton(row: Locator) {
    return row.getByRole("button").filter({
      has: this.page.locator('svg path[d^="M19 6v14"]'),
    });
  }

  async deleteRequest() {
    // 1) İlk satırı bul ve görünmesini bekle
    const firstRow = this.page.locator("tbody tr").first();
    await firstRow.waitFor({ state: "visible" });

    // 2) İlk satırdaki delete butonuna tıkla (genelde ilk button)
    const deleteButton = firstRow.locator("button").first();
    await deleteButton.click();

    // 3) Popup görünene kadar bekle (KRİTİK)
    await this.page.locator(".p-confirm-popup").waitFor({ state: "visible" });

    // 4) Yes butonuna tıkla
    await this.page.getByRole("button", { name: "Yes" }).click();

    // 5) Toast mesajını bekle
    await WaitUtils.waitForToast(this.page, "Tour request deleted");
  }

  async clickEditRequest(propertyName: string) {
    const row = this.getRowByPropertyName(propertyName);
    await WaitUtils.waitForVisible(row);

    const editButton = this.getEditButton(row);

    if ((await editButton.count()) === 0) {
      throw new Error(`Edit button not found for property: ${propertyName}`);
    }

    await editButton.click();
  }
  async clickUpdateButton() {
    await this.page.getByRole("button", { name: "UPDATE" }).click();
  }
  async updateTourRequest(date: string, time: string) {
    const dateInput = this.page.locator('input[name="tourDate"]');
    const timeSelect = this.page.locator('select[name="tourTime"]');

    await dateInput.fill(date);
    await timeSelect.selectOption(time);

    await this.page.getByRole("button", { name: "UPDATE" }).click();
  }

  async getStatusText(propertyName: string) {
    const row = this.getRowByPropertyName(propertyName);
    await WaitUtils.waitForVisible(row);

    return row.locator("td").nth(2).innerText();
  }

  async getTourDateTime(propertyName: string) {
    const row = this.getRowByPropertyName(propertyName);
    await WaitUtils.waitForVisible(row);

    const date = await row.locator("td").nth(3).innerText();
    const time = await row.locator("td").nth(4).innerText();

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
