import { test, expect } from '@playwright/test';

test.use({ storageState: 'auth.json' });

test('test', async ({ page }) => {
  await page.goto('http://walletcore.ntkong.com:18080/dashboard');
  await page.getByRole('link', { name: 'Swap' }).click();
  await page.getByRole('textbox', { name: '$' }).click();
  await page.getByRole('textbox', { name: '$' }).fill('0.00001');
  await page.getByRole('button', { name: 'Continue to Swap' }).click();
  await page.locator('.w-10').first().fill('0');
  await page.locator('input:nth-child(2)').fill('0');
  await page.locator('input:nth-child(3)').fill('1');
  await page.locator('input:nth-child(4)').fill('1');
  await page.locator('input:nth-child(5)').fill('1');
  await page.locator('input:nth-child(6)').fill('2');
  //chờ 5s
  await page.waitForTimeout(5000);
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.getByRole('link', { name: 'History' }).click();
  await page.getByRole('banner').getByRole('button').filter({ hasText: /^$/ }).click();
  page.once('dialog', async (dialog) => {
    console.log(`Đã hiện confirm: ${dialog.message()}`);
    await dialog.accept(); 
  });
  await page.getByRole('button', { name: 'Logout' }).click();
});