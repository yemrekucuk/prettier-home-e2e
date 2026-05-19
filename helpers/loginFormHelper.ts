import { LoginPage } from "../pages/main/LoginPage";
import { loginData } from "../utils/loginData";

export async function fillEmptyLoginForm(
    loginPage: LoginPage
) {

    await loginPage.fillLoginForm(
        '',
        ''
);

}

export async function fillOnlyEmail(
    loginPage: LoginPage
) {

    await loginPage.fillLoginForm(
        loginData.email,
        ''
    );

}

export async function fillOnlyPassword(
    loginPage: LoginPage
) {

    await loginPage.fillLoginForm(
        '',
        loginData.password
    );

}

export async function fillValidLogin(
    loginPage: LoginPage
) {

    await loginPage.fillLoginForm(
        loginData.email,
        loginData.password
    );

}