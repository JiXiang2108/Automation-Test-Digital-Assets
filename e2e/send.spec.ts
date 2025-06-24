import { test, expect } from '@playwright/test';

test.use({ storageState: 'auth.json' });


test('test', async ({ page }) => {
  await page.goto('http://walletcore.ntkong.com:18080/dashboard');
  await page.waitForTimeout(7000);
  await page.getByRole('link', { name: 'Send' }).click();
  await page.getByText(/^ETH/, { exact: false }).first().click();
  await page.getByRole('textbox', { name: 'Enter amount in ETH' }).click();
  await page.getByRole('textbox', { name: 'Enter amount in ETH' }).fill('0.02');
  await page.getByRole('textbox', { name: 'Enter Address on Blockchain' }).click();
  await page.getByRole('textbox', { name: 'Enter Address on Blockchain' }).fill('0xeecc99636722cbafc90317dc8f85dcba3e6e48a6');
  await page.getByRole('button', { name: 'Confirm Transaction' }).click();
  await page.locator('.w-10').first().click();
  await page.keyboard.type('001112', { delay: 100 }); 
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.getByRole('link', { name: 'History' }).click();
  await page.getByRole('banner').getByRole('button').filter({ hasText: /^$/ }).click();
  page.once('dialog', async (dialog) => {
    console.log(`Đã hiện confirm: ${dialog.message()}`);
    await dialog.accept(); 
  });
  await page.getByRole('button', { name: 'Logout' }).click();
});