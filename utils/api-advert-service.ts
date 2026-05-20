import { APIRequestContext } from "@playwright/test";

export class AdvertService {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
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
