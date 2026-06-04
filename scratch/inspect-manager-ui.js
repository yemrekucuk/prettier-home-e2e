require('dotenv').config();
const { chromium } = require('playwright');
(async () => {
  const baseUrl = process.env.BASE_URL || 'https://prettierhome.deployedprojects.xyz';
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(baseUrl);
  await page.click('text=Login');
  await page.waitForLoadState('networkidle');
  console.log('env MANAGER_EMAIL present', !!process.env.MANAGER_EMAIL);
  console.log('env MANAGER_PASSWORD present', !!process.env.MANAGER_PASSWORD);
  console.log('env API_URL', process.env.API_URL);
  const inputs = await page.$$eval('input', (els) => els.map((el) => ({ name: el.name, id: el.id, type: el.type, value: el.value, disabled: el.disabled, placeholder: el.placeholder })));
  console.log('login inputs', inputs);
  const buttons = await page.$$eval('button', (els) => els.map((el) => ({ type: el.type, text: el.innerText, disabled: el.disabled, className: el.className }))); 
  console.log('login buttons', buttons);
  await page.fill('input[name="email"]', process.env.MANAGER_EMAIL || '');
  await page.fill('input[name="password"]', process.env.MANAGER_PASSWORD || '');
  await page.click('button[type="submit"]', { force: true });
  await page.waitForTimeout(5000);
  console.log('post-login url', page.url());
  const bodyText = await page.evaluate(() => document.body.innerText);
  console.log('post-login body contains Logout', bodyText.includes('Logout'));
  console.log('post-login body contains Dashboard', bodyText.includes('Dashboard'));
  console.log('page title', await page.title());
  await page.goto(`${baseUrl}/my-adverts`);
  await page.waitForLoadState('networkidle');
  const rowCount = await page.locator('tbody tr').count();
  console.log('rows', rowCount);
  for (let i = 0; i < rowCount; i++) {
    const row = page.locator('tbody tr').nth(i);
    const buttonCount = await row.locator('button').count();
    console.log('row', i, 'buttonCount', buttonCount);
    for (let j = 0; j < buttonCount; j++) {
      const btn = row.locator('button').nth(j);
      const className = await btn.getAttribute('class');
      const ariaLabel = await btn.getAttribute('aria-label');
      const title = await btn.getAttribute('title');
      const svgClass = await btn.locator('svg').getAttribute('class');
      const svgContent = await btn.locator('svg').evaluate((node) => node.outerHTML.slice(0, 300));
      console.log(' row button', j, { className, ariaLabel, title, svgClass, svgContent });
    }
    const text = await row.innerText();
    const snapshot = text.split('\n').slice(0, 4);
    console.log(' row text snapshot', snapshot);
  }
  await browser.close();
})();