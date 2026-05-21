import { test, expect } from '@playwright/test';
import { apiRegisterData } from '../../test-data/apiRegisterData';
import { createRegisterTestData, endpoints } from '../../helpers/apiHelper';

test('US01-TC01-API-Should register user successfully with valid data', async ({ request }) => {

   const testData = createRegisterTestData(); 
   const response =
        await request.post(
            endpoints.register,
        {
            data:{
                ...apiRegisterData,
                ...testData
        }
 });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.id).toBeTruthy();
    expect(body.firstName).toBe(apiRegisterData.firstName);
    expect(body.lastName).toBe(apiRegisterData.lastName);
    expect(body.phone).toBe(testData.phone);
    expect(body.email).toBe(testData.email);
});

test('US01-TC02-API-RegisterWithoutFirstName', async ({ request }) => {
    
    const response =
            await request.post(
            endpoints.register,

        {
            data:{
                ...apiRegisterData,
                ...createRegisterTestData(),
                firstName:''
        }
}
);
     expect(response.status()).toBe(400);
     const body = await response.json();
     expect(body.firstName).toContain('cannot be blank');

});
