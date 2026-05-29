// combined-e2e-fixture.ts
import {
  test as base,
  APIRequestContext,
  request as playwrightRequest,
  expect,
} from "@playwright/test";
import { Client } from "pg";
import { getPHCustomerToken } from "../utils/api-auth-utils";

// UI Pages
import { LoginPage } from "../pages/main/LoginPage";
import { PropertiesPage } from "../pages/main/PropertiesPage";
import { ListingDetailsPage } from "../pages/main/ListingDetailsPage";
import { MyTourRequestsPage } from "../pages/main/MyTourRequestsPage";

// --- TÜM FIXTURE TİPLERİNİ TEK ÇATI ALTINDA TOPLUYORUZ ---
type FullE2EFixtures = {
  authorizedRequest: APIRequestContext;
  dbClient: Client;

  loginPage: LoginPage;
  propertiesPage: PropertiesPage;
  listingDetailsPage: ListingDetailsPage;
  myTourRequestsPage: MyTourRequestsPage;
};

// --- TEK BİR BASE.EXTEND ---
//Eger fixturesleri ayri ayri yapip testte import edersek playwright hangisinden tes,expect alacagini bilemiyor ve hata olusuyor
//Bu yuzden ui-api ve db fixturesleri tek bir fixture altinda birlestirdik e2e testlerim icin
export const test = base.extend<FullE2EFixtures>({
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

  // --- UI PAGE FIXTURES ---
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  propertiesPage: async ({ page }, use) => {
    await use(new PropertiesPage(page));
  },

  listingDetailsPage: async ({ page }, use) => {
    await use(new ListingDetailsPage(page));
  },

  myTourRequestsPage: async ({ page }, use) => {
    await use(new MyTourRequestsPage(page));
  },
});

export { expect };
