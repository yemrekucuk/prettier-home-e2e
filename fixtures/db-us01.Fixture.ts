import { test as base } from '@playwright/test';
import { Client } from 'pg';

export const test = base.extend<{
  postgresClient: Client; 
}>({
  postgresClient: async ({}, use) => {

    const client = new Client({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    await client.connect();

    await use(client);

    await client.end();
  }
});

export { expect } from '@playwright/test';