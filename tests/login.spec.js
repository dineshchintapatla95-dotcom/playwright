const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');

test.describe('OrangeHRM Login - Page Object Model', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  });

  test('should login successfully with valid credentials', async () => {
    await loginPage.login('Admin', 'admin123');
    const isDashboardVisible = await loginPage.verifyDashboard();
    expect(isDashboardVisible).toBe(true);
  });

  test('should display login form on page load', async () => {
    const isLoginPageDisplayed = await loginPage.isLoginPageDisplayed();
    expect(isLoginPageDisplayed).toBe(true);
  });

  test('should fill username field correctly', async ({ page }) => {
    const testUsername = 'TestUser';
    await loginPage.enterUsername(testUsername);
    const inputValue = await page.getByRole('textbox', { name: 'Username' }).inputValue();
    expect(inputValue).toBe(testUsername);
  });

  test('should fill password field correctly', async ({ page }) => {
    const testPassword = 'TestPassword123';
    await loginPage.enterPassword(testPassword);
    const inputValue = await page.getByRole('textbox', { name: 'Password' }).inputValue();
    expect(inputValue).toBe(testPassword);
  });

  test('should display page title', async () => {
    const pageTitle = await loginPage.getPageTitle();
    expect(pageTitle).toContain('OrangeHRM');
  });
});