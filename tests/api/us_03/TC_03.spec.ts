import { test, expect } from "../../../fixtures/api-auth-fixture";
import { UserService } from "../../../utils/api-user-service";
import { UpdateProfileRequest } from "../../../interfaces/user.interface";

/**
 * TC_03 - Profil Güncelle
 *
 * Authenticated kullanıcının profil bilgilerini güncelleyen endpoint'i doğruluyoruz.
 *
 * Amaç:
 * - PATCH isteği ile profil güncellenebiliyor mu?
 * - Response güncellenen alanları doğru döndürüyor mu?
 *
 * Beklenen:
 * - Status 200
 * - Gönderilen alanlar response'da aynı değerlerle dönmeli
 * - id alanı number olmalı
 */

const updatedProfile: UpdateProfileRequest = {
  firstName: "Suphi",
  lastName: "Albayrakoglu",
  phone: "(542) 422-2222",
  email: process.env.CUSTOMER_EMAIL ?? "",
  role: "CUSTOMER",
};

test.describe("US_03 | TC_03 - Profil Güncelle", () => {
  let userService: UserService;

  test.beforeEach(async ({ authorizedRequest }) => {
    userService = new UserService(authorizedRequest);
  });

  test("PATCH /users/auth - should return 200 and updated profile", async () => {
    // Act
    const response = await userService.updateProfile(updatedProfile);

    // Assert - Status
    expect(response.status()).toBe(200);

    // Assert - Body
    const body = await response.json();

    // id kontrolü
    expect(body.id).toBeDefined();
    expect(typeof body.id).toBe("number");

    // Güncellenen alanlar doğru mu?
    expect(body.firstName).toBe(updatedProfile.firstName);
    expect(body.lastName).toBe(updatedProfile.lastName);
    expect(body.phone).toBe(updatedProfile.phone);
    expect(body.email).toBe(updatedProfile.email);
    expect(body.role).toBe(updatedProfile.role);
  });
});