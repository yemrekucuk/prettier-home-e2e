import { Locator } from "@playwright/test";

/**
 * InputUtils
 *
 * Input alanlarını daha stabil doldurmak için yardımcı fonksiyonlar.
 *
 * Kullanım Örnekleri:
 *
 * await InputUtils.clearAndType(tourDateInput, "2026-05-20");
 * await InputUtils.clearAndType(minPriceInput, "100000");
 */
export class InputUtils {
  /** Input'u tamamen temizler ve yeni değer yazar */
  static async clearAndType(locator: Locator, value: string) {
    await locator.fill(""); // önce temizle
    await locator.type(value); // sonra yaz
  }
}
