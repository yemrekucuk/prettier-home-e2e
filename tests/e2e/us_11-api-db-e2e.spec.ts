import { test, expect } from "../../fixtures/api-db-combined-us11-fixture";
import { AdvertTypeService } from "../../utils/api-advertType-service";

import { generateRandomLetters } from "../../utils/api-string-generator";

// Bu test, Advert Type'ın API ve DB üzerinden uçtan uca doğrulanmasını amaçliyor.
// Akış: API => DB => API => DB
test.describe("E2E | Advert Type API -> DB -> API -> DB", () => {
  let newId: number;
  // Rastgele, backend'in kabul ettiği formatta title üretiyoruz(utils dosyasinda olusturdugumuz methodu kullaniyoruz)
  const newTitle = "QA-" + generateRandomLetters(6);

    test("API | Advert Type oluştur", async ({ authorizedRequest }) => {
      // API servis sınıfını kullanıyoruz(icinde request methodlarimiz var)
      const service = new AdvertTypeService(authorizedRequest);
      // Yeni Advert Type oluşturuyoruz
      const res = await service.createAdvertType({ title: newTitle });
      // API başarılı olmalı
      expect(res.status()).toBe(200);
      // Dönen id'yi alıyoruz cunku bize lazim olacak
      const body = await res.json();
      newId = body.id;
    });

    test("DB | Oluşturulan kayıt DB’de var mı?", async ({ dbClient }) => {
      // DB'de bu id'ye sahip kayıt var mı kontrol ediyoruz
      const result = await dbClient.query(
        "SELECT * FROM advert_types WHERE id = $1",
        [newId],
      );
      // Kayıt bulunuyor mu dogruluyoruz
      expect(result.rows.length).toBe(1);
      expect(result.rows[0].title).toBe(newTitle);
    });

  test("API | Kayıt silinir", async ({ authorizedRequest }) => {
    const service = new AdvertTypeService(authorizedRequest);
    // API üzerinden silme işlemi
    const res = await service.deleteAdvertType(newId);
    // API'nin silme işlemini başarıyla gerçekleştirdiğini doğruluyoruz
    expect(res.status()).toBe(200);
  });

  test("DB | Silinen kayıt DB’den gerçekten silinmiş mi?", async ({
    dbClient,
  }) => {
    // DB'de bu id artık olmamalı
    const result = await dbClient.query(
      "SELECT * FROM advert_types WHERE id = $1",
      [newId],
    );
    // API'nin silme işleminin DB'ye gerçekten yansıdığını doğruluyoruz
    expect(result.rows.length).toBe(0);
  });
});