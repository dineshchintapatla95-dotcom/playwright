class LoginPage {
  constructor(page) {
    this.page = page;

    this.usernameField = page.locator('input[name="username"]');
    this.passwordField = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[type="submit"]');
    this.errorMessage = page.locator('[role="alert"]');
    this.dashboardHeading = page.locator('h6', { hasText: 'Dashboard' });
  }

  /**
   * Navigate to the OrangeHRM login page.
   * @param {string} url - The login page URL.
   */
  async navigateToLoginPage(url) {
    await this.page.goto(url, { waitUntil: 'networkidle' });
    await this.usernameField.waitFor({ state: 'visible', timeout: 10000 });
  }

  /**
   * Enter username in the login form.
   * @param {string} username
   */
  async enterUsername(username) {
    await this.usernameField.fill(username);
  }

  /**
   * Enter password in the login form.
   * @param {string} password
   */
  async enterPassword(password) {
    await this.passwordField.fill(password);
  }

  /**
   * Click login and wait for the dashboard to appear.
   */
  async clickLogin() {
    await Promise.all([
      this.page.waitForLoadState('networkidle'),
      this.loginButton.click()
    ]);
  }

  /**
   * Verify that dashboard is visible after login.
   * @returns {Promise<boolean>}
   */
  async verifyDashboard() {
    try {
      await this.dashboardHeading.waitFor({ state: 'visible', timeout: 10000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Perform the full login flow.
   * @param {string} username
   * @param {string} password
   */
  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  /**
   * Check if login page is displayed.
   * @returns {Promise<boolean>}
   */
  async isLoginPageDisplayed() {
    try {
      await this.usernameField.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get the current page title.
   * @returns {Promise<string>}
   */
  async getPageTitle() {
    return await this.page.title();
  }
}

module.exports = LoginPage;
