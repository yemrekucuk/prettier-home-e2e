import { test, expect } from "../../fixtures/api-ui-db-combined-e2e-us11-fixture";
import { AdvertTypeService } from "../../utils/api-advertType-service";
import { generateRandomLetters } from "../../utils/api-string-generator";

test.describe("FULL E2E | Advert Type API -> DB -> UI -> API -> DB", () => {
    test.describe.configure({ mode: "serial" });
  let newId: number;//bu id uzerinden sorgulamalari yapacagiz
  const newTitle = "QA-" + generateRandomLetters(6);//bu olusturulan title ile yine sorgulama yapacagiz

  // 1) API — Create
  test("API | Advert Type oluştur", async ({ authorizedRequest }) => {
    const service = new AdvertTypeService(authorizedRequest);

    const res = await service.createAdvertType({ title: newTitle });
    expect(res.status()).toBe(200);

    const body = await res.json();
    newId = body.id;//bodydeki gelen id degerini aliyoruz
  });

  // 2) DB — Verify Exists
  test("DB | Oluşturulan kayıt DB’de var mı?", async ({ dbClient }) => {
    const result = await dbClient.query(
      "SELECT * FROM advert_types WHERE id = $1",
      [newId],
    );//DB den advert_types tablosunda id si newId  olan satiri bul sorgusu (newid yi api da post ile olusturdugumuz yeni advert_type id si)

    expect(result.rows.length).toBe(1);
    expect(result.rows[0].title).toBe(newTitle);
  });

  // 3) UI — Dropdown’da görünüyor mu?
  test("UI | Advert Type dropdown’da yeni kayıt görünüyor mu?", async ({
    loginPage,
    propertiesPage,
    page,
  }) => {
    await page.goto("/");
    await loginPage.loginAsCustomer();
    await loginPage.clickPropertiesLink();

    // Value ile seçiyoruz
    await propertiesPage.advertTypeSelect.selectOption(String(newId));

    // dogrulama yapiyoruz
    await expect(propertiesPage.advertTypeSelect).toHaveValue(String(newId));
  });

  // 4) API — Delete
  test("API | Kayıt silinir", async ({ authorizedRequest }) => {
    const service = new AdvertTypeService(authorizedRequest);

    const res = await service.deleteAdvertType(newId);
    expect(res.status()).toBe(200);
  });

  // 5) DB — Verify Deleted
  test("DB | Silinen kayıt DB’den gerçekten silinmiş mi?", async ({
    dbClient,
  }) => {
    const result = await dbClient.query(
      "SELECT * FROM advert_types WHERE id = $1",
      [newId],
    );

    expect(result.rows.length).toBe(0);
  });
});
