import { Page, Locator, expect } from "@playwright/test";
import { NavbarPage } from "./NavbarPage";
import { WaitUtils } from "../../utils/WaitUtils";

export class MyTourRequestsPage extends NavbarPage {
  readonly requestRows: Locator;
  readonly toastMessage: Locator;
  readonly dateInput: Locator;
  readonly timeSelect: Locator;
  readonly updateButton: Locator;
  readonly myResponsesTab: Locator;
  readonly visibleRequestRows: Locator;
  readonly activeStatusBadges: Locator;
  readonly pageTwoButton: Locator;
  readonly previousPageButton: Locator;
  readonly confirmPopup: Locator;
  readonly emptyStateText = "No results found";
  readonly myRequestTableFirstRow: Locator;
  readonly myRequestTableFirstRowAdvertName: Locator;
  readonly lastCreatedTourRequestDeleteButton: Locator;
  readonly lastCreatedTourRequestEditButton: Locator;
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
    this.lastCreatedTourRequestEditButton = page
      .locator(".getproperty button")
      .nth(-2);

    this.myResponsesTab = page.locator(
      "button[data-rr-ui-event-key='response']",
    );
    this.visibleRequestRows = page.locator(".tab-pane.active table tbody tr");
    this.activeStatusBadges = page.locator(
      ".tab-pane.active table tbody tr span[data-pc-section='value']",
    );
    this.pageTwoButton = page
      .locator("button[data-pc-section='pagebutton']")
      .filter({ hasText: /^2$/ })
      .first();
    this.previousPageButton = page.locator(
      ".tab-pane.active .p-paginator-bottom button[data-pc-section='prevpagebutton']",
    );
    this.confirmPopup = page.locator(".p-confirm-popup");
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
    return this.page.locator(".getproperty", { hasText: propertyName });
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
  async expectToast(text: string) {
    await expect(this.page.locator(".p-toast")).toContainText(text);
  }

  // --------------------------
  // ACTIONS
  // --------------------------

  async deleteRequest(propertyName: string) {
    const row = this.getRowByPropertyName(propertyName).first();

    // Row zaten görünür olana kadar auto-wait yapar
    await expect(row).toBeVisible();

    const deleteButton = this.getDeleteButton(row);
    await expect(deleteButton).toBeVisible();

    await deleteButton.click();

    // Confirm popup
    await expect(this.page.locator(".p-confirm-popup")).toBeVisible();
    await this.page.getByRole("button", { name: "Yes" }).click();

    // Toast (en stabil yöntem)
    await expect(this.page.locator(".p-toast")).toContainText("deleted");
  }

  async clickEditRequest(propertyName: string) {
    const row = this.getRowByPropertyName(propertyName).first();
    await expect(row).toBeVisible();

    const editButton = this.getEditButton(row);
    await expect(editButton).toBeVisible();

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

  async getStatusText(propertyName: string) {
    const row = this.getRowByPropertyName(propertyName).first();
    await expect(row).toBeVisible();

    return row.locator(".text p").nth(2).innerText();
  }

  async getTourDateTime(propertyName: string) {
    const row = this.getRowByPropertyName(propertyName).first();
    await expect(row).toBeVisible();

    const date = await row.locator(".tour-date").innerText();
    const time = await row.locator(".tour-time").innerText();

    return { date, time };
  }

  async clickMyResponsesTab() {
    await this.myResponsesTab.click();
    await expect(this.myResponsesTab).toHaveAttribute("aria-selected", "true");
  }

  getPendingRows() {
    return this.visibleRequestRows.filter({
      hasText: /(PENDING|BEKLEMEDE|EN ATTENTE|AUSSTEHEND|PENDIENTE)/i,
    });
  }

  async manageRequestByDateTime(
    date: string,
    time: string,
    action: "approve" | "reject",
    confirmAction: "accept" | "cancel" = "accept",
  ) {
    const targetRow = this.visibleRequestRows
      .filter({ hasText: date })
      .filter({ hasText: time });

    await targetRow.waitFor({ state: "visible", timeout: 15000 });

    if (action === "reject") {
      await targetRow.locator("button").first().click();
    } else if (action === "approve") {
      await targetRow.locator("button").nth(1).click();
    }

    const confirmPopup = this.confirmPopup;
    await confirmPopup.waitFor({ state: "visible" });

    if (confirmAction === "accept") {
      await confirmPopup
        .locator(".p-confirm-popup-accept")
        .click({ force: true });
    } else if (confirmAction === "cancel") {
      await confirmPopup
        .locator(".p-confirm-popup-reject")
        .click({ force: true });
    }
  }
  async clickPageTwo() {
    await this.pageTwoButton.click();
  }
  async clickPreviousPageButton() {
    await this.previousPageButton.click();
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
  async updateLastCreatedTourRequest(date: string, time: string) {
    await this.lastCreatedTourRequestEditButton.click();
    await this.dateInput.fill(date);
    await this.timeSelect.selectOption(time);
    await this.updateButton.click();
  }
}
