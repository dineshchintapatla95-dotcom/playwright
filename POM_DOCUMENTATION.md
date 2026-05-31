# OrangeHRM Login Page Object Model

## Overview
This is a Playwright Page Object Model (POM) implementation for the OrangeHRM login page. The POM encapsulates all page interactions, making tests more maintainable and reusable.

## File Structure
```
pages/
├── LoginPage.js          # Main Page Object Model class
features/
├── login.feature         # Cucumber feature file
├── step_definitions/
│   └── login_steps.js    # Cucumber step definitions using POM
tests/
├── login.spec.js         # Playwright tests using POM
```

## LoginPage Class Methods

### `navigateToLoginPage(url)`
- **Description**: Navigate to the OrangeHRM login page
- **Parameters**: 
  - `url` (string): Full URL to login page
- **Example**:
  ```javascript
  await loginPage.navigateToLoginPage('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  ```

### `enterUsername(username)`
- **Description**: Enter username in the username field
- **Parameters**: 
  - `username` (string): Username to enter
- **Example**:
  ```javascript
  await loginPage.enterUsername('Admin');
  ```

### `enterPassword(password)`
- **Description**: Enter password in the password field
- **Parameters**: 
  - `password` (string): Password to enter
- **Example**:
  ```javascript
  await loginPage.enterPassword('admin123');
  ```

### `clickLogin()`
- **Description**: Click the login button
- **Example**:
  ```javascript
  await loginPage.clickLogin();
  ```

### `getErrorMessage()`
- **Description**: Get error message if login fails
- **Returns**: `Promise<string|null>` - Error message text or null
- **Example**:
  ```javascript
  const errorMsg = await loginPage.getErrorMessage();
  if (errorMsg) {
    console.log('Login failed:', errorMsg);
  }
  ```

### `verifyDashboard()`
- **Description**: Verify if dashboard is loaded after login
- **Returns**: `Promise<boolean>` - True if dashboard is visible
- **Example**:
  ```javascript
  const isDashboardVisible = await loginPage.verifyDashboard();
  expect(isDashboardVisible).toBe(true);
  ```

### `login(username, password)`
- **Description**: Complete login flow in one call
- **Parameters**: 
  - `username` (string): Username
  - `password` (string): Password
- **Example**:
  ```javascript
  await loginPage.login('Admin', 'admin123');
  ```

### `isLoginPageDisplayed()`
- **Description**: Check if login page is displayed
- **Returns**: `Promise<boolean>` - True if login form is visible
- **Example**:
  ```javascript
  const isDisplayed = await loginPage.isLoginPageDisplayed();
  ```

### `getPageTitle()`
- **Description**: Get the page title
- **Returns**: `Promise<string>` - Page title
- **Example**:
  ```javascript
  const title = await loginPage.getPageTitle();
  ```

## Usage Examples

### With Playwright Tests
```javascript
const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');

test('login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await loginPage.login('Admin', 'admin123');
  
  const isDashboardVisible = await loginPage.verifyDashboard();
  expect(isDashboardVisible).toBe(true);
});
```

### With Cucumber
```gherkin
Feature: User Login
  Scenario: Successful login
    Given user navigates to login page
    When user enters username "Admin"
    And user enters password "admin123"
    And user clicks login button
    Then user should see dashboard
```

## Running Tests

### Run Playwright tests
```bash
npx playwright test tests/login.spec.js
```

### Run Cucumber tests
```bash
npm run test:cucumber
```

## Best Practices Used

1. **Encapsulation**: All page interactions are encapsulated in the LoginPage class
2. **Reusability**: Methods can be reused across multiple test scenarios
3. **Maintainability**: Changes to selectors only need to be made in one place
4. **Wait Strategies**: Proper wait conditions using `waitFor()` and `waitForLoadState()`
5. **Error Handling**: Try-catch blocks for better error handling
6. **Readable Assertions**: Methods return meaningful values for assertions
7. **Documentation**: JSDoc comments for all methods
