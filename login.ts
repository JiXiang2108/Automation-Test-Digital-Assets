import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 100 });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('http://walletcore.ntkong.com:18080/auth/login');
  console.log('Đăng nhập bằng Google...');

  await page.waitForURL('http://walletcore.ntkong.com:18080/dashboard', { timeout: 120000 });

  await context.storageState({ path: 'auth.json' });
  console.log('Phiên đăng nhập đã được lưu');

  await browser.close();
})();