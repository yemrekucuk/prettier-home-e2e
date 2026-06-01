import { test, expect } from '@playwright/test';
import { loginData } from '../../utils/loginData';
import { endpoints } from '../../helpers/apiHelper';

test.describe('US02 Login API Tests', () => {
test('US02-TC01-API-LoginSuccessfully', async ({ request }) => {

    const response = await request.post(endpoints.login, {

        data: {
            email: loginData.email,
            password: loginData.password
        }
    });
  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.token).toBeTruthy();
  expect(body.id).toBeTruthy();
  expect(body.email).toBe(loginData.email);
  expect(body.role).toBe('CUSTOMER');

});


test('US02-TC02-API-LoginWithInvalidEmailFormat', async ({ request }) => {

    const response = await request.post(endpoints.login, {
        data: {
            email: loginData.invalidEmail,
            password: loginData.password
        }
    });
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.email).toMatch(/form of email/i);
});

test('US02-TC03-API-LoginWithoutPassword', async ({ request }) => {

    const response = await request.post(endpoints.login,{
        data: {
            email: loginData.email,
            password: ''
    
         }
    });
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.password).toMatch(/cannot be blank|between 8 and 20/i);
});

});
