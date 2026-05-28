import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
   await page.setDefaultTimeout(5000);
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Admin' }).click();
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers');
  await page.getByRole('button', { name: ' Add' }).click();
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/admin/saveSystemUser');
  await page.getByText('-- Select --').first().click();
  await page.getByRole('option', { name: 'Admin' }).click();
  await page.getByRole('textbox', { name: 'Type for hints...' }).click();
  await page.getByRole('textbox', { name: 'Type for hints...' }).fill('joker john selvam');
   await page.setDefaultTimeout(5000);
  await page.getByText('-- Select --').click();
  await page.getByRole('option', { name: 'Enabled' }).click();
  await page.getByRole('textbox').nth(2).click();
  await page.getByRole('textbox').nth(2).fill('joker john selvam');
  await page.getByRole('textbox').nth(3).click();
  await page.getByRole('textbox').nth(3).fill('John@123');
  await page.locator('div').filter({ hasText: /^Confirm Password$/ }).first().click();
  await page.getByRole('textbox').nth(4).fill('John@123');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers');
  
});