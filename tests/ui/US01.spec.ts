import { test, expect } from '../../fixtures/US01Fixture';
import { registerData } from '../../utils/registerData';
import { prepareRegisterPage, prepareRegisterPageWithTerms } from '../../helpers/registerHelper';

test.describe('US01 - Register', () => {

    test('US01/TC01  ==> Customer registration with valid data', async ({ registerPage, page }) => {

        const data = await prepareRegisterPage(registerPage);

        await registerPage.completeRegistration(
            registerData.firstName,
            registerData.lastName,
            data.phone,
            data.email,
            registerData.password,
            registerData.confirmPassword
        );

        await expect(page).toHaveURL(/login/);
        await expect(page.locator('text=Your registration has been completed successfully.')).toBeVisible();

    });


    test('US01/TC02  ==> First Name field should be mandatory (Negative Scenario)', async ({ registerPage }) => {

        const data = await prepareRegisterPageWithTerms(registerPage);

        await registerPage.fillRegisterForm(
            '',
            registerData.lastName,
            data.phone,
            data.email,
            registerData.password,
            registerData.confirmPassword
        );

        await expect(registerPage.registerButton).toBeDisabled();
        await expect(registerPage.firstNameInput).toHaveClass(/is-invalid/);

    });

    test('US01/TC03  ==>  Last Name field should be mandatory (Negative Scenario)', async ({ registerPage, page }) => {

        const data = await prepareRegisterPageWithTerms(registerPage);

        await registerPage.fillRegisterForm(
            registerData.firstName,
            '',
            data.phone,
            data.email,
            registerData.password,
            registerData.confirmPassword
        );

        await expect(registerPage.registerButton).toBeDisabled();
        await expect(registerPage.lastNameInput).toHaveClass(/is-invalid/);

    });

    test('US01/TC04  ==> Phone Number field should be mandatory (Negative Scenario)', async ({ registerPage, page }) => {

        const data = await prepareRegisterPageWithTerms(registerPage);

        await registerPage.fillRegisterForm(
            registerData.firstName,
            registerData.lastName,
            '',
            data.email,
            registerData.password,
            registerData.confirmPassword
        );
        await expect(registerPage.registerButton).toBeDisabled();
        await expect(registerPage.phoneInput).toHaveClass(/is-invalid/);
        await expect(page).toHaveURL(/register/);

    });

    test('US01/TC05  ==>  Email field should be mandatory (Negative Scenario)', async ({ registerPage, page }) => {

        const data = await prepareRegisterPageWithTerms(registerPage);

        await registerPage.fillRegisterForm(
            registerData.firstName,
            registerData.lastName,
            data.phone,
            '',
            registerData.password,
            registerData.confirmPassword
        );

        await expect(registerPage.registerButton).toBeDisabled();
        await expect(registerPage.emailInput).toHaveClass(/is-invalid/);
        await expect(page).toHaveURL(/register/);


    });

    test('US01/TC06  ==> Password field should be mandatory (Negative Scenario)', async ({ registerPage, page }) => {

        const data = await prepareRegisterPageWithTerms(registerPage);

        await registerPage.fillRegisterForm(
            registerData.firstName,
            registerData.lastName,
            data.phone,
            data.email,
            '',
            registerData.confirmPassword
        );

        await expect(registerPage.registerButton).toBeDisabled();
        await expect(registerPage.passwordInput).toHaveClass(/is-invalid/);
        await expect(page).toHaveURL(/register/);

    });

    test('US01/TC07  ==> Confirm Password field should be mandatory (Negative Scenario)', async ({ registerPage, page }) => {

        const data = await prepareRegisterPageWithTerms(registerPage);

        await registerPage.fillRegisterForm(
            registerData.firstName,
            registerData.lastName,
            data.phone,
            data.email,
            registerData.password,
            ''
        );

        await expect(registerPage.registerButton).toBeDisabled();
        await expect(page).toHaveURL(/register/);

    });

    test('US01/TC08  ==> Password minimum length validation should work correctly (Negative Scenario)', async ({ registerPage, page }) => {

        const data = await prepareRegisterPageWithTerms(registerPage);
        const shortPassword = 'Pass';

        await registerPage.fillRegisterForm(
            registerData.firstName,
            registerData.lastName,
            data.phone,
            data.email,
            shortPassword,
            registerData.confirmPassword
        );

        await expect(registerPage.registerButton).toBeDisabled();
        await expect(registerPage.passwordInput).toHaveClass(/is-invalid/);
        await expect(page).toHaveURL(/register/);

    });

    test('US01/TC09  ==> Password should require at least one uppercase letter (Negative Scenario)', async ({ registerPage, page }) => {

        const data = await prepareRegisterPage(registerPage);

        const passwordWithoutUppercase = 'password123.';

        await registerPage.navigateToRegisterPage();
        await registerPage.fillRegisterForm(
            registerData.firstName,
            registerData.lastName,
            data.phone,
            data.email,
            passwordWithoutUppercase,
            registerData.confirmPassword
        );

        await expect(registerPage.registerButton).toBeDisabled();
        await expect(registerPage.passwordInput).toHaveClass(/is-invalid/);
        await expect(page).toHaveURL(/register/);

    });

    test('US01/TC10  ==> Password should require at least one numeric character (Negative Scenario)', async ({ registerPage, page }) => {

        const data = await prepareRegisterPage(registerPage);

        const passwordWithoutNumber = 'Password.';

        await registerPage.navigateToRegisterPage();
        await registerPage.fillRegisterForm(
            registerData.firstName,
            registerData.lastName,
            data.phone,
            data.email,
            passwordWithoutNumber,
            registerData.confirmPassword
        );

        await expect(registerPage.registerButton).toBeDisabled();
        await expect(registerPage.passwordInput).toHaveClass(/is-invalid/);
        await expect(page).toHaveURL(/register/);

    });

    test('US01/TC11  ==> Password should not accept numeric-only values (Negative Scenario)', async ({ registerPage, page }) => {

        const data = await prepareRegisterPage(registerPage);
        const numericOnlyPassword = '123456789';

        await registerPage.navigateToRegisterPage();
        await registerPage.fillRegisterForm(
            registerData.firstName,
            registerData.lastName,
            data.phone,
            data.email,
            numericOnlyPassword,
            registerData.confirmPassword
        );

        await expect(registerPage.registerButton).toBeDisabled();
        await expect(registerPage.passwordInput).toHaveClass(/is-invalid/);
        await expect(page).toHaveURL(/register/);
    });

    test('US01/TC12 ==> Register button should remain disabled until all required fields are completed and Terms of Use is accepted (Negative Scenario)', async ({ registerPage }) => {

        const data = await prepareRegisterPage(registerPage);

        await registerPage.termsCheckbox.check();
        await registerPage.fillRegisterForm(
            '',
            '',
            '',
            '',
            '',
            ''
        );
        await expect(registerPage.registerButton).toBeDisabled();
        await registerPage.fillRegisterForm(
            registerData.firstName,
            registerData.lastName,
            '',
            '',
            '',
            ''
        );
        await expect(registerPage.registerButton).toBeDisabled();
        await registerPage.fillRegisterForm(
            registerData.firstName,
            registerData.lastName,
            data.phone,
            data.email,
            registerData.password,
            registerData.confirmPassword
        );
        await registerPage.termsCheckbox.uncheck();
        await expect(registerPage.registerButton).toBeDisabled();
        await registerPage.termsCheckbox.check();
        await expect(registerPage.registerButton).toBeEnabled();

    });

});