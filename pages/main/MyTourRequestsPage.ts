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

  constructor(page: Page) {
    super(page);

    this.requestRows = page.locator("table tbody tr");
    this.toastMessage = page.locator(".p-toast-detail");
    //Ilanin Edit sayfasindaki locatorlar
    this.dateInput = page.locator('input[name="tourDate"]');
    this.timeSelect = page.locator('select[name="tourTime"]');
    this.updateButton = page.getByRole("button", { name: "UPDATE" });

    this.myResponsesTab = page.locator(
      "button[data-rr-ui-event-key='response']",
    );
    this.visibleRequestRows = page.locator(".tab-pane.active table tbody tr");
    this.activeStatusBadges = page.locator(
      ".tab-pane.active table tbody tr span[data-pc-section='value']",
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

  async clickMyResponsesTab() {
    await this.myResponsesTab.click();
    await expect(this.myResponsesTab).toHaveAttribute("aria-selected", "true");
  }

  getPendingRows() {
    return this.visibleRequestRows.filter({
      hasText: /(PENDING|BEKLEMEDE|EN ATTENTE|AUSSTEHEND|PENDIENTE)/i,
    });
  }
  async managePendingRequest(action: "approve" | "reject") {
    const firstPendingRow = this.getPendingRows().first();
    await WaitUtils.waitForVisible(firstPendingRow);

    if (action === "reject") {
      await firstPendingRow.locator("button").first().click();
    } else if (action === "approve") {
      await firstPendingRow.locator("button").nth(1).click();
    }

    const confirmPopup = this.page.locator(".p-confirm-popup");
    await confirmPopup.waitFor({ state: "visible" });

    await confirmPopup.locator(".p-confirm-popup-accept").click({ force: true });
  }
}
