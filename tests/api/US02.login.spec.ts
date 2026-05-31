import { test, expect } from '@playwright/test';
import { loginData } from '../../utils/loginData';
import { endpoints } from '../../helpers/apiHelper';

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
