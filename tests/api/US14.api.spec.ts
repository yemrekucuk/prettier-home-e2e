import { test, expect } from '@playwright/test';

const baseURL = process.env.API_BASE_URL || 'https://prettierhome-api.deployedprojects.xyz';

test.describe('US14 Manager Tour Request API Tests', () => {
    let managerToken = '';
    const advertId = 1;

    test.beforeAll(async ({ request }) => {
        const response = await request.post(`${baseURL}/users/login`, {
            data: {
                email: 'manager@test.com',
                password: 'manager123!'
            }
        });
        expect(response.status()).toBe(200);
        const body = await response.json();
        managerToken = body.token;
    });

    test('TC_01 Create Tour Request as Manager', async ({ request }) => {
        const response = await request.post(`${baseURL}/tour-requests`, {
            headers: {
                Authorization: `Bearer ${managerToken}`
            },
            data: {
                tourDate: '2027-06-20',
                tourTime: {
                    hour: 15,
                    minute: 0
                },
                advertId: advertId
            }
        });
        // According to Postman collection, we expect 200 or 201
        expect([200, 201]).toContain(response.status());
    });

    test('TC_02 Get Tour Requests (Guest)', async ({ request }) => {
        const response = await request.get(`${baseURL}/tour-requests/auth/guest`, {
            headers: {
                Authorization: `Bearer ${managerToken}`
            }
        });
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(Array.isArray(body.content)).toBeTruthy();
    });
});
