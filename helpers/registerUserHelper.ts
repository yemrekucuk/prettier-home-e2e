import { apiRegisterData }from '../test-data/apiRegisterData';

import {createRegisterTestData,endpoints}from './apiHelper';

import { APIRequestContext } from '@playwright/test';


export const registerUser = async (request: APIRequestContext, overrides: any = {}) => {

    const user = 
    {
        ...apiRegisterData,
        ...createRegisterTestData(),
        ...overrides
    };

    const response =
        await request.post(
        endpoints.register,

        {
            data:user
        }

    );

        return { response, user
};

};

