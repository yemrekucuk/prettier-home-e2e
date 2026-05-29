import { test, expect } from "../../../fixtures/api-auth-customer-fixture";
import { AdvertTypeService } from "../../../utils/api-advertType-service";
import { generateRandomLetters } from "../../../utils/api-string-generator";

test.describe("Advert Type CRUD Testleri", () => {
  //Testlerin birbirine bagimli calismasi icin serial mod yapiyoruz
  test.describe.configure({ mode: "serial" });

  let advertTypeService: AdvertTypeService;
  let createdId: number;

  test.beforeEach(async ({ authorizedRequest }) => {
    //her testten once requestlerimizi yaptigimiz methodlarimizi utils dosyamizdan olusturuyoruz
    advertTypeService = new AdvertTypeService(authorizedRequest);
  });

  test("Advert Type Olusturma-Create", async () => {
    /**
     * Bu testte yeni bir Advert Type oluşturuyoruz.
     * Her seferinde benzersiz bir title üretmek için random string kullanıyoruz.
     * Bu methodumuzu utils klasorden cagiriyoruz import ederek
     * Böylece testler birbirine çakışmıyor ve backend duplicate hatası vermiyor.
     */
    const payload = { title: `TestType ${generateRandomLetters()}` };
    //AdvertTypeService utilsden olusturdugumuz post methodu kullaniyoruz
    const response = await advertTypeService.createAdvertType(payload);
    expect(response.status()).toBe(200);
    //bize donen response u aliyoruz
    const body = await response.json();
    //olusturulan id yi diger testlerde lazim olacagi icin sakliyoruz
    createdId = body.id;
    //dogrulamalari yapiyoruz
    expect(body.title).toBe(payload.title);
    expect(body.builtIn).toBe(false);
  });

  test("Olusturulan Advert Type detayini dogrulama-Read", async () => {
    /**
     * Bu testte bir önceki testte oluşturduğumuz Advert Type'ın
     * gerçekten backend'de var olup olmadığını doğruluyoruz.
     * createdId bir önceki testten geliyor.
     */
    const response = await advertTypeService.getAdvertTypeById(createdId);
    expect(response.status()).toBe(200);

    const body = await response.json();
    //responsedan gelen id ile bizim sakladigimiz id ayni mi dogrulamasi
    expect(body.id).toBe(createdId);
  });

  test("Advert Type Guncelleme-Update", async () => {
    /**
     * Bu testte oluşturduğumuz Advert Type'ın title'ını güncelliyoruz.
     * Yine benzersiz bir title üretmek için random string kullanıyoruz.
     * Ve yine olusturdugumuz advert'in id sini burada kullaniyoruz
     */
    const updatePayload = { title: `UpdatedType ${generateRandomLetters()}` };

    const response = await advertTypeService.updateAdvertType(
      createdId,
      updatePayload,
    );
    expect(response.status()).toBe(200);

    const body = await response.json();
    //guncellenen advert'in id si degismemeli dogruluyoruz olusturdugumuz id ile
    expect(body.id).toBe(createdId);
    //title gercekten guncelledigimiz title mi dogruluyoruz
    expect(body.title).toBe(updatePayload.title);
  });

  test("Advert Type Silme-Delete", async () => {
    /**
     * Bu testte oluşturduğumuz Advert Type'ı siliyoruz.
     * Yine ayni id yi kullaniyoruz
     * Silme işlemi başarılı olduğunda backend 200 döner.
     */
    const response = await advertTypeService.deleteAdvertType(createdId);
    expect(response.status()).toBe(200);
  });
});
