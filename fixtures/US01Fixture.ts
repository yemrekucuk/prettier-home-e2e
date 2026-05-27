import {test as base } from "@playwright/test"

import { RegisterPage } from "../pages/main/RegisterPage"

type US01Pages = {

    registerPage : RegisterPage;

};

export const test = base.extend<US01Pages>({

    registerPage : async ({page}, use) => {

        await use (
            new RegisterPage(page)
        );

    }
});

export {expect} from "@playwright/test";