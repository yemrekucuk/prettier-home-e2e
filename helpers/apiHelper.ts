import { apiRegisterData } from '../test-data/apiRegisterData';

import { generateRandomEmail,generateRandomPhone } from '../utils/apiRandomGenerator';



export const createRegisterTestData = () => ({
    phone:
        `(${Math.floor(Math.random()*900+100)}) ` +
        `${Math.floor(Math.random()*900+100)}-` +
        `${Math.floor(Math.random()*9000+1000)}`,

    email:
        `test${Date.now()}@gmail.com`
});

export const endpoints = {
    register: `${process.env.API_BASE_URL}/users/register`,
    login: `${process.env.API_BASE_URL}/users/login`   
};