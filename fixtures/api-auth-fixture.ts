import {
  test as base,
  APIRequestContext,
  request as playwrightRequest,
} from "@playwright/test";

import { getPHCustomerToken } from "../utils/api-auth-utils";
/**
 * Bu fixturele
 * - Testler başlamadan önce otomatik olarak token üretiyoruz
 * - Bu token ile yetkili (authorized) bir API context oluşturuyoruz
 * - Tüm testlere bu hazır context'i veriyoruz
 * Böylece her testte tekrar tekrar login olmak zorunda kalmiyoruz.
 */

// Fixture 
type MyFixtures = {
  authorizedRequest: APIRequestContext;
};

// Playwright fixture genişletme
export const test = base.extend<MyFixtures>({
  /**
   * authorizedRequest:
   * Her testten önce çalışır ve testlere otomatik olarak
   * Authorization header'ı eklenmiş bir API context sağlar.
   */
  authorizedRequest: async ({ request }, use) => {
    // Token aliyoruz utilsden
    const token = await getPHCustomerToken(request);

    // Yeni API context oluşturuyoruz
    /**
     * 2) Token'ı kullanarak yeni bir API context oluşturuyoruz.
     */
    const authContext = await playwrightRequest.newContext({
      baseURL: process.env.API_URL,
      extraHTTPHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Teste veriyoruz
    /**
     * 3) Oluşturduğumuz context'i testlere veriyoruz.
     * Test dosyalarında authorizedRequest olarak kullanılacak.
     */
    await use(authContext);

    // Temizlik yapiyoruz testten sonra context i kapatiyoruz
    await authContext.dispose();
  },
});

// Test dosyalarının tek satırla import edebilmesi için
export { expect } from "@playwright/test";
