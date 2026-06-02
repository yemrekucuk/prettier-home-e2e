import { test, expect } from '../../fixtures/db-us01.Fixture';

test('US01-TC01-DB-Users table contains required columns', async ({ postgresClient }) => {
    // TC01 -> Users tablosunda gerekli kolonlar mevcut mu?

    const result = await postgresClient.query(`
        SELECT column_name
        FROM information_schema.columns
        WHERE table_name = 'users'
    `);
    const columns = result.rows.map(row => row.column_name);

    expect(columns).toContain('id');
    expect(columns).toContain('email');
    expect(columns).toContain('first_name');
    expect(columns).toContain('last_name');
    expect(columns).toContain('phone');
    expect(columns).toContain('password_hash');
    expect(columns).toContain('role');
});

test('US01-TC02-DB-Users should not contain records with empty first name', async ({ postgresClient }) => {
    // TC02 -> first_name boş kayıt içeriyor mu?
    const result = await postgresClient.query(`
        SELECT *
        FROM users
        WHERE first_name IS NULL
        OR TRIM(first_name) = ''
    `);
    expect(result.rows.length).toBe(0);
});

test('US01-TC03-DB-Users should not contain records with empty last name', async ({ postgresClient }) => {
    // TC03 -> last_name boş kayıt içeriyor mu?
    const result = await postgresClient.query(`
        SELECT *
        FROM users
        WHERE last_name IS NULL
        OR TRIM(last_name) = ''
   `);
    expect(result.rows.length).toBe(0);
});

test('US01-TC04-DB-Users should not contain records with empty phone', async ({ postgresClient }) => {
    // TC04 -> Phone boş kayıt içeriyor mu?
    const resut = await postgresClient.query(`
        SELECT *
        FROM users
        WHERE phone IS NULL
        OR TRIM(phone) = ''
    `);
    expect(resut.rows.length).toBe(0);
});

test('US01-TC05-DB-Users should not contain records with empty email', async ({ postgresClient }) => {
    // TC05 -> Email boş kayıt içeriyor mu?
    const resut = await postgresClient.query(`
        SELECT *
        FROM users
        WHERE email IS NULL
        OR TRIM(email) = ''
    `);
    expect(resut.rows.length).toBe(0);
});

test('US01-TC06-DB-Users should not contain records with empty role', async ({ postgresClient }) => {
    // TC06 -> role boş kayıt içeriyor mu?
    const result = await postgresClient.query(`
      SELECT *
      FROM users
      WHERE role IS NULL
      OR TRIM(role) = ''
    `);

expect(result.rows.length).toBe(0);
});

test('US01-TC07-DB-Users should not contain records with empty password hash', async ({ postgresClient }) => {
    // TC07 -> password_hash boş kayıt içeriyor mu?
    const result = await postgresClient.query(`
    SELECT *
    FROM users
    WHERE password_hash IS NULL
    OR TRIM(password_hash) = ''        
`);
    expect(result.rows.length).toBe(0);
});


