import { test, expect } from '@playwright/test';

test.use({ storageState: 'auth.json' });

test('test', async ({ page }) => {
  await page.goto('http://walletcore.ntkong.com:18080/dashboard');
  await page.getByRole('button', { name: 'Manage Asset' }).click();
  await page.getByRole('switch').nth(1).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('banner').getByRole('button').filter({ hasText: /^$/ }).click();
  page.once('dialog', async (dialog) => {
    console.log(`Đã hiện confirm: ${dialog.message()}`);
    await dialog.accept(); 
  });
  await page.getByRole('button', { name: 'Logout' }).click();
});