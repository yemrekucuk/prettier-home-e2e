import { APIRequestContext } from "@playwright/test";

/**
 * UserService
 * US_03 kapsamındaki tüm user endpoint'lerini burada yönetiyoruz.
 * Her metod ilgili endpoint'e istek atıp response döndürüyor.
 */
export class UserService {
  constructor(private request: APIRequestContext) {}

  async login(email: string, password: string) {
    return this.request.post("/users/login", {
      data: { email, password },
    });
  }

  async getProfile() {
    return this.request.get("/users/auth");
  }

  async updateProfile(data: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    role: string;
  }) {
    return this.request.patch("/users/auth", { data });
  }

  async changePassword(currentPassword: string, newPassword: string) {
    return this.request.patch("/users/change-password", {
      data: { currentPassword, newPassword },
    });
  }

  async deleteAccount(password: string) {
    return this.request.delete("/users/auth", {
      data: { password },
    });
  }
}