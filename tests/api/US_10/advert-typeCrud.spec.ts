import { test, expect } from '../../../fixtures/api-auth-fixture';
import { IAdvertTypeResponse } from '../../../interfaces/api-advertType.interface';
import postData from '../../../test-data/Advert-type-Post-Payload.json'
import putData from "../../../test-data/Advert-type-Put-Payload.json";
import { apiAdvertTypeService } from '../../../utils/api-advert-type-service';


test.describe("Advert-type CRUD Operations", () => {
    test.describe.configure({ mode: "serial" });

    let advertTypeId : number;

    test('TC01 kullanıcı advert-type oluşturabilmeli', async ({ authorizedRequest }) => {

        const advertTypeService = new apiAdvertTypeService(authorizedRequest);
        const payload = postData;
        const response = await advertTypeService.createAdvertType(payload);
        const responseData: IAdvertTypeResponse = await response.json();
        expect(response.status()).toBe(200);
        expect(responseData.title).toBe(payload.title)
        advertTypeId = responseData.id;
    });

    test("TC02 kullanıcı oluşturdugu advert-type'ı görebilmeli", async ({
      authorizedRequest,
    }) => {
      const advertTypeService = new apiAdvertTypeService(authorizedRequest);
      const response = await advertTypeService.getAdvertType(advertTypeId);
      const responseData: IAdvertTypeResponse = await response.json();
      expect(response.status()).toBe(200);
      expect(responseData.title).toBe(postData.title);
    });

     test("TC03 Kullanıcı oluşturdugu advert-type'ı güncelleyebilmeli", async ({
       authorizedRequest,
     }) => {
       const advertTypeService = new apiAdvertTypeService(authorizedRequest);
       const payload = putData;
       const response = await advertTypeService.updateAdvertType(
         advertTypeId,
         payload,
       );
       const responseData: IAdvertTypeResponse = await response.json();
       expect(response.status()).toBe(200);
       expect(responseData.title).toBe(payload.title);
     });
    
    test("TC04 kullanıcı olusturdugu advert-type'ı silebilmeli", async ({
      authorizedRequest,
    }) => {
      const advertTypeService = new apiAdvertTypeService(authorizedRequest);
      const response = await advertTypeService.deleteAdvertType(advertTypeId);
      expect(response.status()).toBe(200);
    });

       test("TC02 kullanıcı silinmiş advert-type'ı görememeli", async ({
         authorizedRequest,
       }) => {
         const advertTypeService = new apiAdvertTypeService(authorizedRequest);
           const response = await advertTypeService.getAdvertType(advertTypeId);
          const responseBody : string = await response.text();
         expect(response.status()).toBe(404);
           expect(responseBody).toContain(
             `Advert type not found by id: ${advertTypeId}.`,
           );
       });

    
    


});
