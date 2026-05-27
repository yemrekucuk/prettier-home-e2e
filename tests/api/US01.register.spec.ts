import { test, expect } from '@playwright/test';
import { apiRegisterData } from '../../test-data/apiRegisterData';
import { createRegisterTestData, endpoints } from '../../helpers/apiHelper';
import { registerUser } from '../../helpers/registerUserHelper';

test('US01-TC01-API-Should register user successfully with valid data', async ({ request }) => {

    const { response, user } = await registerUser(request);
   
    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.id).toBeTruthy();
    expect(body.firstName).toBe(user.firstName);
    expect(body.lastName).toBe(user.lastName);
    expect(body.phone).toBe(user.phone);
    expect(body.email).toBe(user.email);
});

test('US01-TC02-API-RegisterWithoutFirstName', async ({ request }) => {

    const { response } = await registerUser(request, { firstName: '' });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.firstName).toContain('cannot be blank');

});


test('US01-TC03-API-RegisterWithoutLastName', async ({ request }) => {

    const { response } = await registerUser(request, { lastName: '' });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.lastName).toContain('cannot be blank');

});



test('US01-TC04-API-RegisterWithoutPhone', async ({ request }) => {

    const { response } = await registerUser(request, { phone: '' });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.phone).toContain('cannot be blank');

});


test('US01-TC05-API-RegisterWithoutEmail', async ({ request }) => {

    const { response } = await registerUser(request, { email: '' });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.email).toContain('cannot be blank');

});


test('US01-TC06-API-RegisterWithoutPassword', async ({ request }) => {

    const { response } = await registerUser(request, { password: '' });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.password).toContain('cannot be blank');

});
