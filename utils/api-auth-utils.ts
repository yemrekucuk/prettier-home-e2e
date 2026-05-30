import { APIRequestContext } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

export async function getPHCustomerToken(request: APIRequestContext) {
  const baseUrl = (process.env.API_URL ?? "").replace(/\/+$/, "");
  const response = await request.post(`${baseUrl}/users/login`, {
    data: {
      email: process.env.CUSTOMER_EMAIL,
      password: process.env.CUSTOMER_PASSWORD,
    },
  });
  const responseData = await response.json();
  return responseData.token;
}

export async function getToken(
  request: APIRequestContext,
  email: string,
  password: string,
): Promise<string> {
  const baseUrl = (process.env.API_URL ?? "").replace(/\/+$/, "");

  const response = await request.post(`${baseUrl}/users/login`, {
    data: { email, password },
  });

  if (!response.ok()) {
    throw new Error(
      `Login failed for "${email}". Status: ${response.status()} - Body: ${await response.text()}`,
    );
  }

  const body = await response.json();

  if (!body.token) {
    throw new Error(`Login OK but no token in response for "${email}".`);
  }

  return body.token;
}