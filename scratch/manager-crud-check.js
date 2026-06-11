require('dotenv').config();
const { request } = require('@playwright/test');

(async () => {
  try {
    const apiBaseUrl = process.env.API_URL || 'https://prettierhome-api.deployedprojects.xyz';
    console.log('apiBaseUrl', apiBaseUrl);

    const login = await request.newContext();
    const loginResponse = await login.post(`${apiBaseUrl}/users/login`, {
      data: {
        email: process.env.MANAGER_EMAIL,
        password: process.env.MANAGER_PASSWORD,
      },
    });
    console.log('login status', loginResponse.status());
    const loginBody = await loginResponse.json();
    console.log('login token present', !!loginBody.token);

    const managerCtx = await request.newContext({
      baseURL: apiBaseUrl,
      extraHTTPHeaders: {
        Authorization: `Bearer ${loginBody.token}`,
      },
    });

    const payload = {
      title: 'Test Advert',
      description: 'Test description',
      price: 100000,
      categoryId: 1,
      type: 'sale',
      city: 'Test City',
      district: 'Test District',
      rooms: '2+1',
    };

    let res = await managerCtx.post('/adverts', { data: payload });
    console.log('create status', res.status());
    console.log('create body', await res.text());

    const listResponse = await managerCtx.get('/adverts/search?page=0&size=1');
    const searchBody = await listResponse.json();
    const adverts = Array.isArray(searchBody) ? searchBody : searchBody.content || searchBody.items || searchBody.data || [];
    const advertId = adverts[0]?.id;
    console.log('first advert id', advertId);
    if (advertId) {
      res = await managerCtx.put(`/adverts/${advertId}`, { data: { title: 'Updated Test Advert' } });
      console.log('update status', res.status());
      console.log('update body', await res.text());
      res = await managerCtx.delete(`/adverts/${advertId}`);
      console.log('delete status', res.status());
      console.log('delete body', await res.text());
    }

    await login.dispose();
    await managerCtx.dispose();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
