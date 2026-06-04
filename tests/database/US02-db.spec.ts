import { test, expect } from '../../fixtures/db-us01.Fixture';
import { loginData } from '../../utils/loginData';

test('US02-TC01-DB-Login user should exist in database', async ({ postgresClient }) => {
    // TC01 -> Login için gerekli kullanıcı bilgilerinin veritabanında mevcut ve geçerli olduğunu doğrular.
    const result = await postgresClient.query(`
        SELECT *
        FROM users
        WHERE email = $1
    `, [loginData.email]);

    expect(result.rows.length).toBe(1);

    const user = result.rows[0];

    expect(user.enabled).toBe(true);
    expect(user.locked).toBe(false);
    expect(user.password_hash).toBeTruthy();
});



