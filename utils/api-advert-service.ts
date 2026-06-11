import { APIRequestContext } from "@playwright/test";

export class AdvertService {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  /**
   * POST | Yeni ilan oluştur
   */
  async createAdvert(payload: Record<string, unknown>) {
    return await this.request.post("/adverts", {
      data: payload,
    });
  }

  /**
   * PUT | Mevcut ilanı güncelle
   */
  async updateAdvert(id: number, payload: Record<string, unknown>) {
    return await this.request.put(`/adverts/${id}`, {
      data: payload,
    });
  }

  /**
   * DELETE | İlan sil
   */
  async deleteAdvert(id: number) {
    return await this.request.delete(`/adverts/${id}`);
  }

  /**
   * GET | Tüm ilanları getir (search endpoint)
   */
  async getAllAdverts(page = 0, size = 20, sort = "category.id", type = "asc") {
    return await this.request.get(
      `/adverts/search?page=${page}&size=${size}&sort=${sort}&type=${type}`,
    );
  }

  /**
   * GET | Satılık ilanları getir
   */
  async getSaleAdverts() {
    return await this.request.get(
      `/adverts/search?page=0&size=20&sort=category.id&type=asc&sale=true`,
    );
  }

  /**
   * GET | İlan detayını getir
   */
  async getAdvertById(id: number) {
    return await this.request.get(`/adverts/${id}/auth`);
  }

  async searchAdverts(params: Record<string, any>) {
    const queryString = new URLSearchParams(params).toString();
    return await this.request.get(`/adverts/search?${queryString}`);
  }
}
