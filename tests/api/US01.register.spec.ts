import { test, expect} from '@playwright/test';

test('US01-TC01-API-RegisterPositive', async ({ request }) => {
    
    const randomPhone =
    `(${Math.floor(100 + Math.random() * 900)}) ${
    Math.floor(100 + Math.random() * 900)
    }-${Math.floor(1000 + Math.random() * 9000)}`;

    const randomEmail = `test${Date.now()}@gmail.com`;

    const response = 
    await request.post(
        `${process.env.API_BASE_URL}/users/register`, 
        {
            data : {"firstName": "Ayşe",
                    "lastName": "Yılmaz",
                    "phone": randomPhone,
                    "email": randomEmail,
                    "password": "Password123."
            }
        }
    );

        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.id).toBeTruthy();
        expect(body.email).toEqual(randomEmail);
        expect(body.phone).toEqual(randomPhone);

});
