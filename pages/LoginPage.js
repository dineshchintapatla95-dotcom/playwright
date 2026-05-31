class LoginPage {
  constructor(page) {
    this.page = page;

    // Selectors
    this.usernameField = page.getByRole('textbox', { name: 'Username' });
    this.passwordField = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.locator('[role="alert"]');
    this.dashboardHeading = page.getByRole('heading', { name: /Dashboard/i });
  }

  /**
   * Navigate to the OrangeHRM login page
   * @param {string} url - The login page URL
   */
  async navigateToLoginPage(url) {
    await this.page.goto(url);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Enter username in the username field
   * @param {string} username - Username to enter
   */
  async enterUsername(username) {
    await this.usernameField.click();
    await this.usernameField.fill(username);
  }

  /**
   * Enter password in the password field
   * @param {string} password - Password to enter
   */
  async enterPassword(password) {
    await this.passwordField.click();
    await this.passwordField.fill(password);
  }

  /**
   * Click the login button
   */
  async clickLogin() {
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Get error message if login fails
   * @returns {Promise<string|null>} Error message text or null if not visible
   */
  async getErrorMessage() {
    const isVisible = await this.errorMessage.isVisible({ timeout: 5000 }).catch(() => false);
    if (isVisible) {
      return await this.errorMessage.textContent();
    }
    return null;
  }

  /**
   * Verify if dashboard is loaded
   * @returns {Promise<boolean>} True if dashboard is visible
   */
  async verifyDashboard() {
    try {
      await this.dashboardHeading.waitFor({ state: 'visible', timeout: 10000 });
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Perform complete login flow
   * @param {string} username - Username
   * @param {string} password - Password
   */
  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  /**
   * Check if login page is displayed
   * @returns {Promise<boolean>} True if login form is visible
   */
  async isLoginPageDisplayed() {
    try {
      await this.usernameField.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get the page title
   * @returns {Promise<string>} Page title
   */
  async getPageTitle() {
    return await this.page.title();
  }
}

module.exports = LoginPage;
