/**
 * Belirtilen uzunlukta rastgele küçük harflerden oluşan bir string üretir.
 *
 * Bu fonksiyon özellikle Advert Type, Advert, User vb.
 * oluşturma testlerinde benzersiz title üretmek için kullanılır.
 *
 * @param length Üretilecek string uzunluğu (varsayılan: 6)
 * @returns Rastgele üretilmiş string
 */
export function generateRandomLetters(length = 6): string {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return result;
}
