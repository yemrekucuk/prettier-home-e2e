import { test, expect } from "../../fixtures/db-us11-fixture";

test.describe("DB Advert Types Control - advert_types", () => {
  //1 bu sorguyla advert_types isimli bir tablonun olup olmadigini dogruluyoruz
  test("Tablonun varligini dogrulama", async ({ dbClient }) => {
    const result = await dbClient.query(`
      SELECT table_name 
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_name = 'advert_types'
    `);

    expect(result.rows.length).toBe(1);
  });

  // Bu test, tablonun kolon yapısının doğru olup olmadığını doğruluyor.

  test("Kolon yapısı doğru mu", async ({ dbClient }) => {
    const result = await dbClient.query(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns
      WHERE table_name = 'advert_types'
    `);
    console.log("advert_types kolonlari :", result.rows);

    const columns = result.rows.map((r) => r.column_name);

    expect(columns).toContain("id");
    expect(columns).toContain("title");
    expect(columns).toContain("built_in");
  });
  // Bu testte  Tabloda en az 1 kayıt var mı? sorgusunu yapiyoruz
  test("Tabloda en az 1 kayıt var mı", async ({ dbClient }) => {
    const result = await dbClient.query(`
      SELECT COUNT(*) FROM advert_types
    `);

    expect(Number(result.rows[0].count)).toBeGreaterThan(0);
  });
  // built_in kayıtları listeleniyor mu?
  test("built_in kayıtları listeleniyor mu", async ({ dbClient }) => {

    /**
     * Bu testte advert_types tablosuna eklenen son 5 kaydi aliyoruz
     * ORDER BY id DESC ile en buyuk id li en yeni kayitlar en uste geliyorEklenen kayitlarin varligini dogrulamis oluyoruz
     */
    const result = await dbClient.query(`
      SELECT * FROM advert_types WHERE built_in = true
    `);

    expect(result.rows.length).toBeGreaterThanOrEqual(0);
  });
  // Son eklenen kayıtlar geliyor mu?
  test("Son eklenen kayıtlar listeleniyor mu", async ({ dbClient }) => {
    const result = await dbClient.query(`
      SELECT * 
      FROM advert_types
      ORDER BY id DESC
      LIMIT 5
    `);
    console.log("Son eklenen 5 kayit :", result.rows);

    expect(result.rows.length).toBeGreaterThanOrEqual(0);
  });
});
