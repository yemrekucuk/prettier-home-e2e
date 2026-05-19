import { RegisterPage } from "../pages/main/RegisterPage";
import { createRegisterData } from "./registerTestData";


export async function prepareRegisterPage(
    registerPage: RegisterPage
){

    const data = createRegisterData();

    await registerPage.navigateToRegisterPage();

    return data;

}


export async function prepareRegisterPageWithTerms(
    registerPage: RegisterPage
){

    const data = createRegisterData();

    await registerPage.navigateToRegisterPage();

    await registerPage.termsCheckbox.check();

    return data;

}