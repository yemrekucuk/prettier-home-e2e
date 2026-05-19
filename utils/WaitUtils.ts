import { Page, Locator } from "@playwright/test";

/**
 * WaitUtils
 *
 * Dropdown, toast ve geç yüklenen elementler için stabil bekleme fonksiyonları.
 *
 * Kullanım Örnekleri:
 *
 * await WaitUtils.waitForVisible(citySelect);
 * await WaitUtils.waitForOptions(citySelect);
 * await WaitUtils.waitForToast(page, "TourRequest created successfully");
 */
export class WaitUtils {
  /** Element görünür olana kadar bekler */
  static async waitForVisible(locator: Locator) {
    await locator.waitFor({ state: "visible" });
  }

  /** Dropdown option'ları DOM'a gelene kadar bekler */
  static async waitForOptions(select: Locator) {
    await select.locator("option:not([value='-1'])").first().waitFor({
      state: "attached",
    });
  }

  static async waitForToast(page: Page, text?: string) {
    const locator = text
      ? page.locator(".p-toast-detail", { hasText: text })
      : page.locator(".p-toast-detail");

    await locator.first().waitFor({
      state: "visible",
      timeout: 5000,
    });
  }

  /** Liste elemanlarının yüklenmesini bekler */
  static async waitForList(listLocator: Locator) {
    await listLocator.first().waitFor({ state: "visible" });
  }
}
