/* import { test, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

/**
 * TC_01 - Login
 *
 * Login endpoint'ini doğruluyoruz.
 * authorizedRequest fixture kullanmıyoruz çünkü
 * bu test zaten login endpoint'ini test ediyor.
 * Base request, playwright.config baseURL'ini (frontend) kullandığı için
 * API_URL'i direkt kendimiz belirtiyoruz.
 *
 * Amaç:
 * - Doğru credentials ile login olunabiliyor mu?
 * - Response'da token geliyor mu?
 * - Kullanıcı bilgileri doğru mu?
 *
 * Beklenen:
 * - Status 200
 * - token string ve dolu olmalı
 * - email, firstName, lastName, role alanları gelmeli
 

const API_URL = process.env.API_URL ?? "https://prettierhome-api.deployedprojects.xyz";

test.describe("US_03 | TC_01 - Login", () => {
  test("POST /users/login - should return 200 and valid token", async ({
    request,
  }) => {
    // Act
    const response = await request.post(`${API_URL}/users/login`, {
      data: {
        email: process.env.USER_EMAIL,
        password: process.env.USER_PASSWORD,
      },
    });

    // Assert - Status
    expect(response.status()).toBe(200);

    // Assert - Body
    const body = await response.json();

    // Token kontrolü
    expect(body.token).toBeDefined();
    expect(typeof body.token).toBe("string");
    expect(body.token.length).toBeGreaterThan(0);

    // Kullanıcı bilgileri kontrolü
    expect(body.id).toBeDefined();
    expect(body.email).toBe(process.env.USER_EMAIL);
    expect(body.firstName).toBeDefined();
    expect(body.lastName).toBeDefined();
    expect(["CUSTOMER", "ADMIN"]).toContain(body.role);
  });
}); */