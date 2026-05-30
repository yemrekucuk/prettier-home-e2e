import { test, expect } from '@playwright/test';
import { registerUser } from '../../helpers/registerUserHelper';
import { registerData } from '../../utils/registerData';

test.describe('US01 Register API', async () => {
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

        /*
    Boş phone alanı için API bazen
    "cannot be blank", bazen de "form of (XXX)"  mesajı dönüyor.
    Status code her zaman 400.
    */

    /*
    Observed inconsistent API validation messages
    for empty firstName:
    - "First Name cannot be blank."
    - "First name should be between 1 and 50 characters long."
    Status code remains 400.
    */

    const { response } = await registerUser(request, { firstName: '' });

    expect(response.status()).toBe(400);
    const body = await response.json();

    expect(body.firstName).toMatch(/cannot be blank|between 1 and 50/);

});


test('US01-TC03-API-RegisterWithoutLastName', async ({ request }) => {

    /*
    Observed inconsistent API validation messages
    for empty lastName:

    - "Last Name cannot be blank."
    - "Last name should be between 1 and 50 characters long."

    Status code remains 400.
    */

    const { response } = await registerUser(request, { lastName: '' });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.lastName).toMatch(/cannot be blank|between 1 and 50/);
});



test('US01-TC04-API-RegisterWithoutPhone', async ({ request }) => {

        /*
    Observed inconsistent API validation messages
    for empty phone input:

    - "Phone Number cannot be blank."
    - "Phone should be in the form of (XXX) XXX-XXXX."

    Status code remains 400.
    */

    const { response } = await registerUser(request, { phone: '' });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.phone).toMatch(/cannot be blank|form of \(XXX\)/);

});


test('US01-TC05-API-RegisterWithoutEmail', async ({ request }) => {

    const { response } = await registerUser(request, { email: '' });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.email).toContain('cannot be blank');

});


test('US01-TC06-API-RegisterWithoutPassword', async ({ request }) => {

        /*
    Observed inconsistent API validation messages
    for empty password input:

    - "Password cannot be blank."
    - Password complexity validation message

    Status code remains 400.
    */

    const { response } = await registerUser(request, { password: '' });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.password).toMatch(/cannot be blank|at least one letter/);    
});

test('US01-TC07-API-RegisterWithoutConfirmPassword', async ({ request }) => {

    /*
    Potential defect:

    UI blocks empty confirmPassword input, but API accepts the request and returns 200 OK.
    Possible missing backend validation.
    */


    const { response } = await registerUser(request, { confirmPassword: '' });

    expect(response.status()).toBe(400);

});

test('US01-TC08-API-RegisterWithShortPassword', async ({ request }) => {

    const shortPassword = 'Ab1!';

    const {response} = await registerUser( request, {
        password: shortPassword,
        confirmPassword: registerData
    });

    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body.password).toContain('between 8 and 30');

    
});

test('US01-TC09-API-RegisterWithoutUppercasePassword', async ({ request }) => {

        /*
    Potential defect:

    Frontend requires uppercase letter.
    API accepts password without uppercase.
    Possible backend validation inconsistency.
    */

    const passwordWithoutUppercase ='password123.';

    const {response} = await registerUser( request, {
        password: passwordWithoutUppercase,
        confirmPassword: passwordWithoutUppercase
    });
    expect(response.status()).toBe(400);
    
});


test('US01-TC10-API-RegisterWithoutNumberInPassword', async ({ request }) => {

    const passwordWithoutNumber  = 'Password.';

    const {response} = await registerUser( request, {
        password: passwordWithoutNumber,
        confirmPassword: passwordWithoutNumber
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.password).toContain('one number');
    
});


test('US01-TC11-API-RegisterWithNumericPasswordOnly', async ({ request }) => {

    const numericPassword   = '123456789' ;

    const {response} = await registerUser( request, {
        password: numericPassword,
        confirmPassword: numericPassword
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.password).toContain('one letter, one number, and one special character');
    
});

});