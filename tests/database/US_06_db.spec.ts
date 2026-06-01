import { test, expect } from "@playwright/test";
import * as dotenv from "dotenv";
import { Client } from "pg";

dotenv.config();

async function getDbClient() {
  const client = new Client({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  await client.connect();
  return client;
}

test.describe("US06 – DB Validation Tests", () => {
  let advertId: number;

  test.beforeAll(() => {
    const data = require("../../temp/advert.json");
    advertId = data.advertId;
  });

  test("DB – Advert oluşturulmuş olmalı", async () => {
    const client = await getDbClient();

    const result = await client.query("SELECT * FROM adverts WHERE id = $1", [
      advertId,
    ]);

    expect(result.rows.length).toBe(1);

    await client.end();
  });

  test("DB – Güncelleme yansımış olmalı", async () => {
    const client = await getDbClient();

    const result = await client.query(
      "SELECT title, price FROM adverts WHERE id = $1",
      [advertId],
    );

    expect(result.rows[0].title).toBe("Güncellenmiş Kiralık Daire");

    await client.end();
  });

  test("DB – Silme yansımış olmalı", async () => {
    const client = await getDbClient();

    const result = await client.query("SELECT * FROM adverts WHERE id = $1", [
      advertId,
    ]);

    expect(result.rows.length).toBe(0);

    await client.end();
  });
});
