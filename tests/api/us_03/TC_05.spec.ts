import * as fs from "fs";
import * as path from "path";
import { test, expect } from "../../../fixtures/api-auth-customer-fixture";
import { APIRequestContext } from "@playwright/test";

/**
 * TC_05 - Profil Fotoğrafı Ekle
 *
 * Authenticated kullanıcının profil fotoğrafını güncelleyen endpoint'i doğruluyoruz.
 * Bu endpoint multipart/form-data ile çalışır, JSON değil.
 *
 * Amaç:
 * - PATCH isteği ile fotoğraf yüklenebiliyor mu?
 * - Response 200 dönüyor mu?
 *
 * Beklenen:
 * - Status 200
 

test.describe("US_03 | TC_05 - Profil Fotoğrafı Ekle", () => {
  test("PATCH /users/photo - should return 200", async ({
    authorizedRequest,
  }: {
    authorizedRequest: APIRequestContext;
  }) => {
    // Test için küçük bir dummy jpeg dosyası oluşturuyoruz
    const photoPath = path.join(__dirname, "test-photo.jpg");

    // Minimal valid JPEG binary
    const jpegBuffer = Buffer.from(
      "/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAALCAABAAEBAREA/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAT8AVf/Z",
      "base64"
    );
    fs.writeFileSync(photoPath, jpegBuffer);

    try {
      // Act
      const response = await authorizedRequest.patch(
        "/users/photo",
        {
          multipart: {
            photo: {
              name: "test-photo.jpg",
              mimeType: "image/jpeg",
              buffer: jpegBuffer,
            },
          },
        }
      );

      // Assert - Status
      expect(response.status()).toBe(200);
    } finally {
      // Temp dosyayı temizle
      if (fs.existsSync(photoPath)) {
        fs.unlinkSync(photoPath);
      }
    }
  });
});*/