import { APIRequestContext } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

export async function getPHCustomerToken(request: APIRequestContext) {
  const response = await request.post(process.env.API_URL + "/users/login", {
    data: {
      email: process.env.MANAGER_EMAIL,
      password: process.env.MANAGER_PASSWORD,
    },
  });

  const responseData = await response.json();
  return responseData.token;
}
