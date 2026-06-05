import { test, expect } from "../../../fixtures/api-auth-customer-fixture";
import { UserService } from "../../../utils/api-user-service";
import { ChangePasswordRequest } from "../../../interfaces/user.interface";

/**
 * TC_04 - Şifre Değiştir
 *
 * Authenticated kullanıcının şifresini değiştiren endpoint'i doğruluyoruz.
 * currentPassword ve newPassword aynı değer — şifre değişmiş gibi görünür
 * ama aslında aynı kalır, her çalıştırmada tekrar test edilebilir.
 *
 * Amaç:
 * - PATCH isteği ile şifre değiştirilebiliyor mu?
 * - Validasyon kurallarına uygun şifre kabul ediliyor mu?
 *
 * Beklenen:
 * - Status 200
 

const changePasswordPayload: ChangePasswordRequest = {
  currentPassword: process.env.CUSTOMER_PASSWORD ?? "",
  newPassword: process.env.CUSTOMER_PASSWORD ?? "",
};

test.describe("US_03 | TC_04 - Şifre Değiştir", () => {
  let userService: UserService;

  test.beforeEach(async ({ authorizedRequest }) => {
    userService = new UserService(authorizedRequest);
  });

  test("PATCH /users/change-password - should return 200", async () => {
    // Act
    const response = await userService.changePassword(
      changePasswordPayload.currentPassword,
      changePasswordPayload.newPassword
    );

    // Assert - Status
    expect(response.status()).toBe(200);
  });
});*/