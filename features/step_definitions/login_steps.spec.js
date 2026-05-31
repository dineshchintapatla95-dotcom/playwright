const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const LoginPage = require('../../pages/LoginPage');

let browser, page, loginPage;

Before(async function() {
  browser = await chromium.launch();
  page = await browser.newPage();
  loginPage = new LoginPage(page);
});

Given('user navigates to login page', { timeout: 30000 }, async function() {
  await loginPage.navigateToLoginPage('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
});

When('user enters username {string}', async function(username) {
  await loginPage.enterUsername(username);
});

When('user enters password {string}', async function(password) {
  await loginPage.enterPassword(password);
});

When('user clicks login button', async function() {
  await loginPage.clickLogin();
});

Then('user should see dashboard', async function() {
  const isDashboardVisible = await loginPage.verifyDashboard();
  if (!isDashboardVisible) {
    throw new Error('Dashboard not visible after login');
  }
});

Then('user should see {string} link', async function(linkName) {
  const link = page.getByRole('link', { name: linkName });
  const isVisible = await link.isVisible().catch(() => false);
  if (!isVisible) {
    throw new Error(`${linkName} link not visible`);
  }
});

Then('user should see login form', async function() {
  const isDisplayed = await loginPage.isLoginPageDisplayed();
  if (!isDisplayed) {
    throw new Error('Login form not visible');
  }
});

Then('username field should be visible', async function() {
  const isVisible = await loginPage.usernameField.isVisible().catch(() => false);
  if (!isVisible) {
    throw new Error('Username field not visible');
  }
});

Then('password field should be visible', async function() {
  const isVisible = await loginPage.passwordField.isVisible().catch(() => false);
  if (!isVisible) {
    throw new Error('Password field not visible');
  }
});

After(async function() {
  if (browser) {
    await browser.close();
  }
});
