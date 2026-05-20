import { APIRequestContext } from "@playwright/test";
import {
  IAdvertTypePayload,
  IAdvertTypeResponse,
} from "../interfaces/api-advertType.interface";

/**
 * Advert Type CRUD işlemlerini yöneten service class.
 * Token fixture tarafından eklendiği için burada header yoktur.
 * authorizedRequest zaten token'lıdır.
 */
export class AdvertTypeService {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  /**
   * CREATE Advert Type (POST)
   */
  async createAdvertType(payload: IAdvertTypePayload) {
    return await this.request.post("/advert-types", {
      data: payload,
    });
  }

  /**
   * GET Advert Type by ID (GET)
   */
  async getAdvertTypeById(id: number) {
    return await this.request.get(`/advert-types/${id}`);
  }

  /**
   * GET All Advert Types (ALL)
   */
  async getAllAdvertTypes() {
    return await this.request.get("/advert-types/all");
  }

  /**
   * GET Advert Types (default)
   */
  async getAdvertTypes() {
    return await this.request.get("/advert-types");
  }

  /**
   * UPDATE Advert Type (PUT)
   */
  async updateAdvertType(id: number, payload: IAdvertTypePayload) {
    return await this.request.put(`/advert-types/${id}`, {
      data: payload,
    });
  }

  /**
   * DELETE Advert Type (DELETE)
   */
  async deleteAdvertType(id: number) {
    return await this.request.delete(`/advert-types/${id}`);
  }
}
  
