import { APIRequestContext } from "@playwright/test";
import { IAdvertTypePayload, IAdvertTypeResponse, } from "../interfaces/api-advertType.interface";

export class apiAdvertTypeService {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }
  /**
   * [METOT - CREATE CONTACT (POST)]
   * Yeni bir kaynak oluşturma isteğidir.
   */

  async createAdvertType(payload: IAdvertTypePayload) {
    return await this.request.post("/advert-types", {
      data: payload,
    });
  }
  /**
   * [METOT - GET CONTACT (GET)]
   * Belirli bir kaynağı okuma isteğidir.
   * @param id - URL'e eklenecek olan dinamik kimlik bilgisi.
   */
  async getAdvertType(id: number) {
    return await this.request.get(`/advert-types/${id}`);
  }

  /**
   * [METOT - UPDATE CONTACT (PUT)]
   * Mevcut bir kaynağı tamamen güncellemek (veriyi ezmek) için kullanılır.
   */

  async updateAdvertType(id: number, payload: IAdvertTypePayload) {
    return await this.request.put(`/advert-types/${id}`, {
      data: payload,
    });
  }

  /**
   * [METOT - DELETE CONTACT (DELETE)]
   * Belirtilen ID'ye sahip kaynağı sunucudan tamamen kaldırır.
   */

  async deleteAdvertType(id: number) {
    return await this.request.delete(`/advert-types/${id}`);
  }
}
