import { test, expect } from "@playwright/test";
import { Client } from "pg";

test.describe("US_13 — Tour Requests Tablo Doğrulamasi", () => {
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

  test("tour_requests tablosu DB'de mevcut olmali", async () => {
    const result = await dbClient.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_name = 'tour_requests'
    `);
    expect(result.rows.length).toBe(1);
  });

  test("Tablo gerekli kolonlara sahip olmali", async () => {
    const result = await dbClient.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'tour_requests'
      ORDER BY ordinal_position
    `);

    const columns = result.rows.map((r) => r.column_name);

    expect(columns).toContain("id");
    expect(columns).toContain("status");
    expect(columns).toContain("tour_date");
    expect(columns).toContain("tour_time");
  });

  test("Tabloda en az 1 kayit bulunuyor olmali", async () => {
    const result = await dbClient.query(`
      SELECT COUNT(*) FROM tour_requests
    `);
    expect(Number(result.rows[0].count)).toBeGreaterThan(0);
  });

  test("Tüm status değerleri geçerli olmali (0: PENDING, 1: APPROVED, 2: DECLINED)", async () => {
    const result = await dbClient.query(`
      SELECT DISTINCT status FROM tour_requests
    `);

    const validStatuses = [0, 1, 2];
    for (const row of result.rows) {
      expect(validStatuses).toContain(row.status);
    }
  });

  test("Hiçbir kayitta tour_date veya tour_time boş olmamali", async () => {
    const result = await dbClient.query(`
      SELECT COUNT(*) FROM tour_requests
      WHERE tour_date IS NULL OR tour_time IS NULL
    `);
    expect(Number(result.rows[0].count)).toBe(0);
  });

  test("Her tur isteği geçerli bir ilana (advert) bağli olmali", async () => {
    const result = await dbClient.query(`
      SELECT COUNT(*) FROM tour_requests t
      LEFT JOIN adverts a ON t.advert_id = a.id
      WHERE a.id IS NULL
    `);
    expect(Number(result.rows[0].count)).toBe(0);
  });
});
