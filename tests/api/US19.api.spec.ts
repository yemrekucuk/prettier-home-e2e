import { test, expect } from '@playwright/test';

const baseURL = process.env.API_BASE_URL || 'https://prettierhome-api.deployedprojects.xyz';

test.describe('US19 Contact Form Validations API Tests', () => {

    test('TC_01 Positive Scenario', async ({ request }) => {
        const response = await request.post(`${baseURL}/contact-messages/save`, {
            data: {
                firstName: "Ali",
                lastName: "Veli",
                email: "ali.veli@gmail.com",
                message: "Proje harika görünüyor!"
            }
        });
        expect(response.status()).toBe(200);
    });

    test('TC_02 Negative Scenario - First Name Boundary', async ({ request }) => {
        const response = await request.post(`${baseURL}/contact-messages/save`, {
            data: {
                firstName: "A",
                lastName: "Veli",
                email: "ali.veli@gmail.com",
                message: "Test mesajı."
            }
        });
        expect([400, 422, 500]).toContain(response.status());
    });

    test('TC_03 Negative Scenario - Last Name Boundary', async ({ request }) => {
        const response = await request.post(`${baseURL}/contact-messages/save`, {
            data: {
                firstName: "Ali",
                lastName: "B",
                email: "ali.veli@gmail.com",
                message: "Test mesajı."
            }
        });
        expect([400, 422, 500]).toContain(response.status());
    });

    test('TC_04 Negative Scenario - Email Format', async ({ request }) => {
        const response = await request.post(`${baseURL}/contact-messages/save`, {
            data: {
                firstName: "Ali",
                lastName: "Veli",
                email: "techproeducation",
                message: "Test mesajı."
            }
        });
        expect([400, 422, 500]).toContain(response.status());
    });

});
