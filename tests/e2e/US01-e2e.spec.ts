import { test, expect } from '../../fixtures/db-us01.Fixture';
import { RegisterPage } from '../../pages/main/RegisterPage';
import { registerData } from '../../utils/registerData';
import { createRegisterTestData } from '../../helpers/apiHelper';

test.describe('FULL E2E | US01 Register UI -> DB', () => {
    test.describe.configure({ mode: 'serial' });
    // UI katmanında oluşturulan kullanıcı bilgileri,
    // DB doğrulama adımında tekrar kullanılacaktır.

    let user: {
        firstName: string;
        lastName: string;
        phone: string;
        email: string;
        password: string;
        confirmPassword: string;
    };

test('US01-TC01-E2E | Geçerli bilgilerle kullanıcı kaydı oluşturulabilmelidir', async ({ page }) => {
        const registerPage = new RegisterPage(page);

        // Sabit register verileri ile dinamik email/telefon verilerini birleştiriyoruz.
        user = {
            ...registerData,
            ...createRegisterTestData()
        };
        // Register sayfasına gidilir.
        await registerPage.navigateToRegisterPage();

        // Kullanıcı kayıt işlemi gerçekleştirilir.
        await registerPage.completeRegistration(
            user.firstName,
            user.lastName,
            user.phone,
            user.email,
            user.password,
            user.confirmPassword
        );
        // Başarılı kayıt mesajı görüntülenmelidir.
        await expect(page.locator('.p-toast-summary')).toContainText('Success');

        // Kayıt sonrası login sayfasına yönlendirme yapılmalıdır.
        await expect(page).toHaveURL(/login/);
    });

test('US01-TC01-DB |  Kullanıcı kaydının veritabanında oluştuğu doğrulanmalıdır', async ({ postgresClient }) => {

        // UI üzerinden oluşturulan kullanıcının
        // veritabanında kayıtlı olduğu doğrulanır.
        const result = await postgresClient.query(`
            SELECT email, phone, first_name, last_name
            FROM users
            WHERE email = $1
            `,
            [user.email]
        );
        expect(result.rows.length).toBe(1);
        expect(result.rows[0].email).toBe(user.email);
        expect(result.rows[0].phone).toBe(user.phone);
        expect(result.rows[0].first_name).toBe(user.firstName);
        expect(result.rows[0].last_name).toBe(user.lastName);
    });

test('US01-TC02-E2E |  Zorunlu alan validasyonu çalışmalıdır', async ({ page }) => {
        // TC03-TC07 senaryoları aynı validasyon davranışının farklı alanlar üzerindeki tekrarları olduğundan,
        // required field validasyonu TC02 ile temsil edilmiştir.

        const registerPage = new RegisterPage(page);
        user = {
            ...registerData,
            ...createRegisterTestData()
        };
        await registerPage.navigateToRegisterPage();
        await registerPage.fillRegisterForm(
            '',
            user.lastName,
            user.phone,
            user.email,
            user.password,
            user.confirmPassword
        );

        await registerPage.termsCheckbox.check();
        await registerPage.firstNameInput.click();
        await expect(registerPage.firstNameInput).toHaveClass(/is-invalid/);
        await expect(registerPage.registerButton).toBeDisabled();
    });


});





















