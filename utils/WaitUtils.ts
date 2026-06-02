import { Page, Locator, expect } from "@playwright/test";

/**
 * WaitUtils
 *
 * Dropdown, toast ve geç yüklenen elementler için stabil bekleme fonksiyonları.
 */
export class WaitUtils {
  /** Element görünür olana kadar bekler */
  static async waitForVisible(locator: Locator, timeout = 10000) {
    await locator.waitFor({ state: "visible", timeout });
  }

  /** Element DOM'a attach olana kadar bekler (görünür olması şart değil) */
  static async waitForAttached(locator: Locator, timeout = 10000) {
    await locator.waitFor({ state: "attached", timeout });
  }

  /**
   * Dropdown option'ları DOM'a gelene kadar bekler
   * - "-1" gibi placeholder option'ı hariç tutar
   */
  static async waitForOptions(select: Locator, timeout = 10000) {
    const realOptions = select.locator("option:not([value='-1'])");
    await realOptions.first().waitFor({ state: "attached", timeout });
  }

  /**
   * Toast bekler
   * - text verilirse o text'i içeren toast'ı bekler
   */
  static async waitForToast(page: Page, text?: string, timeout = 5000) {
    const locator = text
      ? page.locator(".p-toast", { hasText: text })
      : page.locator(".p-toast");

    await locator.waitFor({ state: "visible", timeout });
  }

  /**
   * Liste elemanlarının yüklenmesini bekler
   * - first() görünür olana kadar bekler
   */
  static async waitForList(listLocator: Locator, timeout = 15000) {
    await listLocator.first().waitFor({ state: "visible", timeout });
  }

  /**
   * Tıklanabilir olana kadar bekle + gerekirse scroll ile görünür alana getir
   * (flaky click problemlerini azaltır)
   */
  static async safeClick(locator: Locator, timeout = 10000) {
    await locator.scrollIntoViewIfNeeded();
    await expect(locator).toBeVisible({ timeout });
    await locator.click();
  }
}
