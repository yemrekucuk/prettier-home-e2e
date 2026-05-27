import { LoginPage } from "../pages/main/LoginPage";

import { loginData } from "../utils/loginData";

export async function loginUser(
    loginPage : LoginPage
){

    await loginPage.navigateToLoginPage();

    await loginPage.fillLoginForm(
        loginData.email,
        loginData.password
    );

        await loginPage.clickLoginButton();

}