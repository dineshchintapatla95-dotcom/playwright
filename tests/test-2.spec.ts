import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.setDefaultTimeout(5000);
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Performance' }).click();
  await page.setDefaultTimeout(5000);
  await page.getByRole('textbox', { name: 'Type for hints...' }).click();
  await page.getByRole('textbox', { name: 'Type for hints...' }).fill('Radha  Gupta');
  await page.getByRole('option', { name: 'Radha  Gupta' }).click();
  await page.locator('div').filter({ hasText: /^-- Select --$/ }).nth(2).click();
  await page.getByRole('option', { name: 'Software Engineer' }).click();
  await page.getByText('-- Select --').first().click();
  await page.getByText('OrangeHRM', { exact: true }).click();
  await page.getByText('Current Employees Only').click();
  await page.getByText('Current and Past Employees').click();
  await page.getByText('-- Select --').click();
  await page.setDefaultTimeout(5000);
  await page.getByRole('option', { name: 'Activated' }).click();
  await page.getByRole('button', { name: 'Search' }).click();
  await page.getByRole('button', { name: 'Search' }).click();
});