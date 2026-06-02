const { chromium } = require('playwright');
require('dotenv').config();

(async () => {
  const baseUrl = process.env.BASE_URL || 'https://prettierhome.deployedprojects.xyz';
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  page.on('request', (request) => {
    const url = request.url();
    if (url.includes('/adverts')) {
      console.log('REQUEST', request.method(), url, request.postData() ? request.postData().slice(0, 200) : '');
    }
  });

  page.on('response', async (response) => {
    const url = response.url();
    if (url.includes('/adverts')) {
      console.log('RESPONSE', response.status(), url);
    }
  });

  await page.goto(`${baseUrl}/login`, { waitUntil: 'load' });
  await page.fill('input[name="email"]', process.env.MANAGER_EMAIL || '');
  await page.fill('input[name="password"]', process.env.MANAGER_PASSWORD || '');
  await page.click('button[type="submit"]');
  await page.waitForLoadState('networkidle');

  await page.waitForLoadState('networkidle');
  console.log('Logged in, current URL', page.url());

  const links = await page.locator('a').allInnerTexts();
  console.log('a texts:', links.slice(0, 40));
  const buttons = await page.locator('button').allInnerTexts();
  console.log('button texts:', buttons.slice(0, 40));

  await page.goto(`${baseUrl}/my-adverts`, { waitUntil: 'load' });
  await page.waitForLoadState('networkidle');
  console.log('On my adverts page', page.url());
  const links2 = await page.locator('a').allInnerTexts();
  console.log('my-adverts a texts sample:', links2.slice(0, 40));
  const buttonTexts = await page.locator('button').allInnerTexts();
  console.log('my-adverts button texts sample:', buttonTexts.slice(0, 40));
  const anchors = await page.locator('a').elementHandles();
  console.log('my-adverts anchors count', anchors.length);
  for (let i = 0; i < Math.min(20, anchors.length); i++) {
    const handle = anchors[i];
    const href = await handle.getAttribute('href');
    const text = await handle.innerText();
    const className = await handle.getAttribute('class');
    console.log('anchor', i, { href, className, text: text.slice(0, 50) });
  }
  const cardCount = await page.locator('.property-card').count();
  const rowCount = await page.locator('tr').count();
  const genericCardCount = await page.locator('.card').count();
  console.log('card counts', { cardCount, rowCount, genericCardCount });
  const btnLinkCount = await page.locator('.btn-link.btn.btn-primary').count();
  console.log('btn-link btn btn-primary count', btnLinkCount);
  const buttonHandles = await page.locator('.btn-link.btn.btn-primary').elementHandles();
  for (let i = 0; i < Math.min(10, buttonHandles.length); i++) {
    const handle = buttonHandles[i];
    const ariaLabel = await handle.getAttribute('aria-label');
    const title = await handle.getAttribute('title');
    const text = await handle.innerText();
    const outerHTML = await handle.evaluate((node) => node.outerHTML);
    console.log('icon button', i, { text: text.slice(0, 50), ariaLabel, title, outerHTML: outerHTML.slice(0, 200) });
  }
  const rowOuterHTML = await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll('tbody tr'));
    return rows.slice(0, 5).map((row) => row.outerHTML);
  });
  console.log('tbody rows sample', rowOuterHTML);

  const editButton = page.locator('button:has-text("Edit")').first();
  const deleteButton = page.locator('button:has-text("Delete")').first();
  console.log('edit count', await editButton.count(), 'delete count', await deleteButton.count());

  if (await editButton.count() > 0) {
    await editButton.click();
    await page.waitForLoadState('networkidle');
    console.log('Clicked edit');
  }

  if (await deleteButton.count() > 0) {
    await deleteButton.click();
    await page.waitForTimeout(2000);
    console.log('Clicked delete');
  }

  await browser.close();
})();
