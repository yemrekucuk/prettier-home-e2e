import { test, expect } from "../../../fixtures/api-auth-fixture";
import { AdvertTypeService } from "../../../utils/api-advertType-service";
import { IAdvertTypeResponse } from "../../../interfaces/api-advertType.interface";



test.describe("Advert Type Testleri", () => {
  let advertTypeService: AdvertTypeService;

  test.beforeEach(async ({ authorizedRequest }) => {
    advertTypeService = new AdvertTypeService(authorizedRequest);
  });

  
  test("Sale advert type dinamik ID ile doğrulama", async () => {
    // 1) Ilan tiplerinin bilgilerini aliyoruz
    const listResponse = await advertTypeService.getAllAdvertTypes();
    //Array olarak donuyor
    const list = (await listResponse.json()) as IAdvertTypeResponse[];

    // 2) Sale olanı buluyoruz
    const saleType = list.find((t) => t.title === "Sale");
    expect(saleType).toBeDefined();

    // 3) ID integer mı? interfacein type guvenliginden yararlaniyoruz
    expect(typeof saleType!.id).toBe("number");

    // 4) Bu ID ile byId çağıriyoruz yine interfaceden yararlaniyoruz
    const response = await advertTypeService.getAdvertTypeById(saleType!.id);
    const body = (await response.json()) as IAdvertTypeResponse;

    // 5) Doğrulamalar
    expect(body.id).toBe(saleType!.id);
    expect(body.title).toBe("Sale");
    expect(body.builtIn).toBe(true);
  });




});
