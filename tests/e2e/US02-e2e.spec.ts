import { test, expect } from '../../fixtures/db-us01.Fixture';
import { loginUser } from '../../helpers/authHelper';
import { LoginPage } from '../../pages/main/LoginPage';
import { loginData } from '../../utils/loginData';

test('US02-TC01-E2E | Kullanıcı başarıyla giriş yapabilmelidir',
async ({ page, postgresClient }) => {

    const loginPage = new LoginPage(page);

    // Kullanıcı giriş işlemini gerçekleştirir.
    await loginUser(loginPage);

    // Kullanıcının ana sayfaya yönlendirildiği doğrulanır.
    await expect(page).toHaveURL(process.env.BASE_URL as string);

    // Kullanıcı profil ikonunun görüntülendiği doğrulanır.
    await expect(loginPage.userPic).toBeVisible();

    // Kullanıcı bilgileri DB üzerinden doğrulanır.
        const result = await postgresClient.query(`
        
        SELECT email, enabled, locked, role
        FROM users
        WHERE email= $1 
        `,
        [loginData.email]
    );

    expect(result.rows.length).toBe(1);
    expect(result.rows[0].email).toBe(loginData.email);
    expect(result.rows[0].enabled).toBe(true);
    expect(result.rows[0].locked).toBe(false);
    expect(result.rows[0].role).toBe('CUSTOMER');
});