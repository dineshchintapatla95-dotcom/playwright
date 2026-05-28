const {test, expect} = require('@playwright/test'); 
test('Login test', async ({page}) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.setDefaultTimeout(5000);
    await page.getByRole('textbox', { name: 'Username' }).click(); 
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).click(); 
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

});""