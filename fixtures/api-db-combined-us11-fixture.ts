
import {
  test as base,
  APIRequestContext,
  request as playwrightRequest,
  expect,
} from "@playwright/test";
import { Client } from "pg";
import { getPHCustomerToken } from "../utils/api-auth-utils";
/**
 * API ve DB fixture’larını tek bir test objesinde toplar.
 * Sebep: Playwright aynı dosyada birden fazla test objesine izin vermez.
 * Bu sayede E2E testlerinde authorizedRequest + dbClient birlikte kullanılabilir.
 */



type ApiDbFixtures = {
  authorizedRequest: APIRequestContext;
  dbClient: Client;
};

export const test = base.extend<ApiDbFixtures>({
  // --- API FIXTURE ---
  authorizedRequest: async ({ request }, use) => {
    const token = await getPHCustomerToken(request);

    const authContext = await playwrightRequest.newContext({
      baseURL: process.env.API_URL,
      extraHTTPHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    await use(authContext);
    await authContext.dispose();
  },

  // --- DB FIXTURE ---
  dbClient: async ({}, use) => {
    const client = new Client({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: false,
    });

    await client.connect();
    await use(client);
    await client.end();
  },
});

export { expect };
