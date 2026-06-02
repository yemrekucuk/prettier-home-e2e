import { test, expect } from "../../../fixtures/api-auth-customer-fixture";
import { UserService } from "../../../utils/api-user-service";

/**
 * TC_02 - Profil Getir
 *
 * Authenticated kullanıcının profil bilgilerini getiren endpoint'i doğruluyoruz.
 * authorizedRequest fixture ile token otomatik ekleniyor.
 *
 * Amaç:
 * - Token ile profil getirilebiliyor mu?
 * - Response doğru alanları içeriyor mu?
 * - Email doğru kullanıcıya ait mi?
 *
 * Beklenen:
 * - Status 200
 * - id, firstName, lastName, email, phone, role alanları gelmeli
 * - email .env deki CUSTOMER_EMAIL ile eşleşmeli
 * - role CUSTOMER veya ADMIN olmalı
 */

test.describe("US_03 | TC_02 - Profil Getir", () => {
  let userService: UserService;

  test.beforeEach(async ({ authorizedRequest }) => {
    userService = new UserService(authorizedRequest);
  });

  test("GET /users/auth - should return 200 and user profile", async () => {
    // Act
    const response = await userService.getProfile();

    // Assert - Status
    expect(response.status()).toBe(200);

    // Assert - Body
    const body = await response.json();

    // Zorunlu alanlar kontrolü
    expect(body.id).toBeDefined();
    expect(typeof body.id).toBe("number");

    expect(body.firstName).toBeDefined();
    expect(body.lastName).toBeDefined();
    expect(body.phone).toBeDefined();

    // Email doğru kullanıcıya ait mi?
    expect(body.email).toBe(process.env.CUSTOMER_EMAIL);

    // Role geçerli mi?
    expect(["CUSTOMER", "ADMIN"]).toContain(body.role);
  });
});