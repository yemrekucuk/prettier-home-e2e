export class DateUtils {
  /**
   * Verilen Date objesini DD.MM.YYYY formatına çevirir.
   * @param date - Formatlanacak tarih
   * @returns string - DD.MM.YYYY formatında tarih
   */
  static format(date: Date): string {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  /**
   * Gelecek bir tarihe gider (örn: 3 gün sonrası).
   * Tour Request oluşturma ve güncelleme testlerinde kullanılır.
   */
  static future(days: number): string {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return this.format(date);
  }

  /**
   * Geçmiş bir tarihe gider (örn: 5 gün öncesi).
   * Negative scenario testlerinde kullanılır.
   */
  static past(days: number): string {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return this.format(date);
  }
}
