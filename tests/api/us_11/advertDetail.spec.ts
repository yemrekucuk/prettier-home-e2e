import searchParams from "../../../test-data/advert-search-us11.json";
import { test, expect } from "../../../fixtures/api-auth-customer-fixture";
import { AdvertService } from "../../../utils/api-advert-service";

test.describe("Advert Detail Testleri", () => {
  let advertService: AdvertService;

  test.beforeEach(async ({ authorizedRequest }) => {
    //her testten once kullanilacak utils klasorde requestleri yapan methodlari kullanabilmek icin advertservice den object olusturuyoruz
    advertService = new AdvertService(authorizedRequest);
  });

  test("Tüm ilanlari listeleme", async () => {
    /**
     * Bu testte sistemde kayıtlı tüm ilanları listeleyen endpoint'i doğruluyoruz.
     * Amaç: Response gerçekten ilan listesi döndürüyor mu ve format doğru mu
     * Beklenen:
     * - Status 200
     * - content alanı array olmalı
     * - En az 1 ilan bulunmalı
     */
    const response = await advertService.getAllAdverts();
    expect(response.status()).toBe(200);

    const body = await response.json();
    // response array olarak dönmeli
    expect(Array.isArray(body.content)).toBe(true);
    // Sistem boş olmamalı, en az 1 ilan olmalı
    expect(body.content.length).toBeGreaterThan(0);
  });

  test("Villa ilaninin detaylarini doğrulama", async () => {
    /**
     * Bu testte US_11 için hazırladığım arama parametreleriyle
     * villa ilanını arıyoruz ve dönen ilk ilanın detaylarını doğruluyoruz.
     *
     * Amaç:
     * - Search endpoint doğru çalışıyor mu?
     * - Filtreler doğru ilanı getiriyor mu?
     * - Dönen ilanın temel alanları doğru mu?
     * - Image alanı doğru formatta mı?
     */
    const response = await advertService.searchAdverts(searchParams);
    expect(response.status()).toBe(200);

    const body = await response.json();

    // Search endpoint array döndürüyor
    expect(Array.isArray(body.content)).toBe(true);
    expect(body.content.length).toBeGreaterThan(0);
    // İlk ilanı alıyoruz (bu benim us11 deki arattigim ilan ve donen response bu)
    const advert = body.content[0];

    /**
     * Temel alan doğrulamaları:
     * - id → ilan gerçekten var mı?
     * - title → ilan başlığı boş olmamalı
     * - statusForAdvert → aktif/pasif durumu gelmeli
     * - price → 0 dan büyük olmalı
     */
    expect(advert.id).toBeDefined();
    expect(advert.title).toBeDefined();
    expect(advert.statusForAdvert).toBeDefined();
    expect(advert.price).toBeGreaterThan(0);

    /**
     * Image doğrulaması:
     * - image alanı gelmeli
     * - featured = true olmalı (UI da gordugumuz resim)
     */
    expect(advert.image).toBeDefined();
    expect(advert.image.featured).toBe(true);
  });
});
