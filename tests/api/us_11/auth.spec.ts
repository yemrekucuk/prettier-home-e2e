import expected from "../../../test-data/auth-us11-customer-expected.json";
import { test, expect } from "../../../fixtures/api-auth-fixture";

test("Token ve kullanici doğrulama", async ({ authorizedRequest }) => {
  const response = await authorizedRequest.get("/users/auth");
  expect(response.status()).toBe(200);

  const body = await response.json();

  // JSON’daki requiredFields listesi
  for (const field of expected.requiredFields) {
    expect(body).toHaveProperty(field);
  }

  // Role doğrulama
  expect(body.role).toBe(expected.role);
});
