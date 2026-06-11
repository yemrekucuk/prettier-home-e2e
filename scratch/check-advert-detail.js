require('dotenv').config();
const { request } = require('@playwright/test');

(async () => {
  const apiBaseUrl = process.env.API_URL || 'https://prettierhome-api.deployedprojects.xyz';
  const login = await request.newContext();
  const loginResponse = await login.post(`${apiBaseUrl}/users/login`, {
    data: { email: process.env.MANAGER_EMAIL, password: process.env.MANAGER_PASSWORD },
  });
  console.log('login status', loginResponse.status());
  const loginBody = await loginResponse.json();
  console.log('token present', !!loginBody.token);
  const managerCtx = await request.newContext({
    baseURL: apiBaseUrl,
    extraHTTPHeaders: { Authorization: `Bearer ${loginBody.token}` },
  });
  for (const path of ['/adverts/19/admin', '/adverts/19/auth', '/adverts/19', '/adverts/auth?page=0&size=5']) {
    const res = await managerCtx.get(path);
    let text;
    try { text = await res.text(); } catch (e) { text = String(e); }
    console.log(path, res.status(), text.slice(0, 500));
  }
  await managerCtx.dispose();
  await login.dispose();
})();
