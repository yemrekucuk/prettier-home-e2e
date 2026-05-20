import { test, expect } from '../../fixtures/US02Fixture';
import { loginData } from '../../utils/loginData';
import { loginUser } from '../../helpers/authHelper';
import {fillEmptyLoginForm, fillOnlyEmail, fillOnlyPassword, fillValidLogin }from '../../helpers/loginFormHelper';


test.describe('US02 - Login',()=>{

test('US02/TC01  ==> Customer should be able to login with valid credentials', async ({ loginPage, page }) => {

    await loginUser(loginPage);
    await expect(page).toHaveURL(process.env.BASE_URL as string);
    await expect(loginPage.userPic).toBeVisible();
});


test('US02/TC02  ==> Invalid email format should display validation error', async ({ loginPage }) => {

    await loginPage.navigateToLoginPage();
    await loginPage.fillLoginForm(
        loginData.invalidEmail,
        loginData.password
    );

    await expect(loginPage.emailInput).toHaveClass(/is-invalid/);
    await expect(loginPage.loginButton).toBeDisabled();
});

test('US02/TC03  ==> Password field should be mandatory (Negative Scenario)', async ({ loginPage }) => {

    await loginPage.navigateToLoginPage();
    await fillOnlyEmail(loginPage);
    await expect(loginPage.loginButton).toBeDisabled();

});

test('US02/TC04 ==> Login button should remain disabled until email and password are entered (Negative Scenario)',async ({ loginPage }) => {

        await loginPage.navigateToLoginPage();

        await fillEmptyLoginForm(loginPage);
        await expect(loginPage.loginButton).toBeDisabled();

        await fillOnlyEmail(loginPage);
        await expect(loginPage.loginButton).toBeDisabled();

        await fillOnlyPassword(loginPage);
        await expect(loginPage.loginButton).toBeDisabled();

        await fillValidLogin(loginPage);    
        await expect(loginPage.loginButton).toBeEnabled();

    });
});
