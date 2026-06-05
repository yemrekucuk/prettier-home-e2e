import { test, expect } from "../../../fixtures/api-auth-customer-fixture";
import { UserService } from "../../../utils/api-user-service";
import { DeleteAccountRequest } from "../../../interfaces/user.interface";

/**
 * TC_06 - Hesap Sil
 *
 * Authenticated kullanıcının hesabını silen endpoint'i doğruluyoruz.
 *
 * ⚠️  DİKKAT: Bu test gerçek hesabı siler!
 * Sadece test ortamında çalıştır.
 * Çalıştırmadan önce yeni bir test kullanıcısı oluştur
 * ya da .env'deki credentials'ı test hesabına göre ayarla.
 *
 * Amaç:
 * - DELETE isteği ile hesap silinebiliyor mu?
 *
 * Beklenen:
 * - Status 200
 

const deletePayload: DeleteAccountRequest = {
  password: process.env.CUSTOMER_PASSWORD ?? "",
};

test.describe("US_03 | TC_06 - Hesap Sil", () => {
  let userService: UserService;

  test.beforeEach(async ({ authorizedRequest }) => {
    userService = new UserService(authorizedRequest);
  });

  test("DELETE /users/auth - should return 200 and delete account", async () => {
    // Act
    const response = await userService.deleteAccount(deletePayload.password);

    // Assert - Status
    expect(response.status()).toBe(200);
  });
});*/