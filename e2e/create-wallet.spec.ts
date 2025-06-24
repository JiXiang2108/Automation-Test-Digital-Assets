import { test, expect } from '@playwright/test';
import fs from 'fs';

test.use({ storageState: 'auth.json' });

test('test', async ({ page }) => {
  await page.goto('http://walletcore.ntkong.com:18080/dashboard');

  // Đọc số thứ tự lần trước từ file
  let lastIndex = 0 ;
  const stateFile = 'wallet-order-number.json';

  if (fs.existsSync(stateFile)) {
    const data = fs.readFileSync(stateFile, 'utf-8');
    const json = JSON.parse(data);
    lastIndex = json.lastIndex || 0;
  }

  // Tăng số thứ tự lên
  const nextIndex = lastIndex + 1;
  const nextIndexStr = String(nextIndex).padStart(2, '0');

  // Tạo tên ví mới
  const newWalletName = `Tuong${nextIndexStr} (123456)`;

  // Cập nhật file sau khi đã lấy số
  fs.writeFileSync(stateFile, JSON.stringify({ lastIndex: nextIndex }, null, 2));

  // Các bước tạo ví
  await page.getByRole('button', { name: '+ New Wallet' }).click();
  await page.getByRole('textbox', { name: 'Wallet Name' }).fill(newWalletName);
  await page.getByRole('combobox').click();
  await page.getByText('Ethereum (ETH)', { exact: true }).click();
  await page.getByRole('textbox', { name: 'Secret PIN' }).click();
  await page.getByRole('textbox', { name: 'Secret PIN' }).fill('123456');
  //chờ 7s
  await page.waitForTimeout(7000);
  await page.getByRole('button', { name: 'Create Wallet' }).click(); 
  await page.getByRole('banner').getByRole('button').filter({ hasText: /^$/ }).click();
  // Xử lý dialog xác nhận logout
  page.once('dialog', async (dialog) => {
    console.log(`Đã hiện confirm: ${dialog.message()}`);
    await dialog.accept(); 
  });
  await page.getByRole('button', { name: 'Logout' }).click();
});