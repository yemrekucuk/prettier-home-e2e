import { test, expect } from "@playwright/test";
import { Client } from "pg";
import * as dotenv from "dotenv";

dotenv.config();

test.describe("US_19 — Contacts Tablo Doğrulaması", () => {
  let dbClient: Client;

  test.beforeAll(async () => {
    dbClient = new Client({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: false,
    });
    await dbClient.connect();
  });

  test.afterAll(async () => {
    await dbClient.end();
  });

  test("contacts tablosu DB'de mevcut olmalı", async () => {
    const result = await dbClient.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_name = 'contacts'
    `);
    expect(result.rows.length).toBe(1);
  });

  test("Tablo gerekli kolonlara sahip olmalı", async () => {
    const result = await dbClient.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'contacts'
      ORDER BY ordinal_position
    `);
    
    const columns = result.rows.map((r) => r.column_name);

    expect(columns).toContain("id");
    expect(columns).toContain("first_name");
    expect(columns).toContain("last_name");
    expect(columns).toContain("email");
    expect(columns).toContain("message");
    expect(columns).toContain("status");
  });

  test("Tabloda en az 1 kayıt bulunuyor olmalı", async () => {
    const result = await dbClient.query(`
      SELECT COUNT(*) FROM contacts
    `);
    expect(Number(result.rows[0].count)).toBeGreaterThan(0);
  });
});
