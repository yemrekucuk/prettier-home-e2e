import { test as base } from "@playwright/test";
import { Client } from "pg";

type MyFixtures = {
  dbClient: Client;
};

export const test = base.extend<MyFixtures>({
  dbClient: async ({}, use) => {
    // 1) Setup – Bağlantıyı aç
    const client = new Client({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: false,
    });

    await client.connect();

    // 2) Testlerde kullan
    await use(client);

    // 3) Teardown – Bağlantıyı kapat
    await client.end();
  },
});

export { expect } from "@playwright/test";
