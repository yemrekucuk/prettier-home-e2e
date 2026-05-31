import { APIRequestContext } from "@playwright/test";
import {
  TourRequestPayload,
  TourRequestResponse,
} from "../interfaces/api-tourRequest.interface";

export class TourRequestService {
  private request: APIRequestContext;
  private baseUrl =
    "https://prettierhome-api.deployedprojects.xyz/tour-requests";

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  private generateDynamicDateTime() {
    const date = new Date();

    const randomDays = Math.floor(Math.random() * 60) + 1;
    date.setDate(date.getDate() + randomDays);

    const dynamicDate = date.toISOString().split("T")[0];

    const hour = Math.floor(Math.random() * (17 - 9 + 1)) + 9;

    const minute = Math.random() > 0.5 ? "00" : "30";

    const dynamicTime = `${hour.toString().padStart(2, "0")}:${minute}`;

    return { dynamicDate, dynamicTime };
  }

  async createTourRequest(token: string, advertId: number): Promise<number> {
    const { dynamicDate, dynamicTime } = this.generateDynamicDateTime();

    const payload: TourRequestPayload = {
      tourDate: dynamicDate,
      tourTime: dynamicTime,
      advertId: advertId,
    };

    const response = await this.request.post(this.baseUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: payload,
    });

    if (!response.ok()) {
      throw new Error(
        `Failed to create tour request. Status: ${response.status()}`,
      );
    }

    const responseBody: TourRequestResponse = await response.json();
    return responseBody.id;
  }
}
