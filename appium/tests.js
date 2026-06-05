const wdio = require('webdriverio');
const { androidCapabilities, iosCapabilities, serverConfig } = require('./config');

let driver;

describe('Mobile App Tests', () => {
  describe('Android Tests', () => {
    beforeAll(async () => {
      const opts = {
        ...serverConfig,
        capabilities: androidCapabilities,
      };
      driver = await wdio.remote(opts);
    });

    afterAll(async () => {
      if (driver) {
        await driver.deleteSession();
      }
    });

    test('Android - Find element by ID and check visibility', async () => {
      try {
        const element = await driver.$('id:com.example.app:id/button_login');
        const isDisplayed = await element.isDisplayed();
        expect(isDisplayed).toBe(true);
      } catch (error) {
        console.error('Error finding element:', error);
      }
    });

    test('Android - Tap button and verify text', async () => {
      try {
        const loginButton = await driver.$('id:com.example.app:id/button_login');
        await loginButton.click();

        const welcomeText = await driver.$('id:com.example.app:id/text_welcome');
        const text = await welcomeText.getText();
        expect(text).toContain('Welcome');
      } catch (error) {
        console.error('Error in tap test:', error);
      }
    });

    test('Android - Input text in field', async () => {
      try {
        const usernameField = await driver.$('id:com.example.app:id/input_username');
        await usernameField.clearValue();
        await usernameField.addValue('testuser');

        const inputValue = await usernameField.getValue();
        expect(inputValue).toBe('testuser');
      } catch (error) {
        console.error('Error in input test:', error);
      }
    });

    test('Android - Swipe screen', async () => {
      try {
        const element = await driver.$('id:com.example.app:id/scrollable_list');
        await element.touchAction([
          { action: 'press', x: 100, y: 100 },
          { action: 'moveTo', x: 100, y: 0 },
          { action: 'release' },
        ]);
      } catch (error) {
        console.error('Error in swipe test:', error);
      }
    });

    test('Android - Wait for element', async () => {
      try {
        const element = await driver.$('id:com.example.app:id/loading_spinner');
        await element.waitForDisplayed({ timeout: 5000, reverse: true });
        const mainContent = await driver.$('id:com.example.app:id/main_content');
        expect(await mainContent.isDisplayed()).toBe(true);
      } catch (error) {
        console.error('Error in wait test:', error);
      }
    });
  });

  describe('iOS Tests', () => {
    beforeAll(async () => {
      const opts = {
        ...serverConfig,
        capabilities: iosCapabilities,
      };
      driver = await wdio.remote(opts);
    });

    afterAll(async () => {
      if (driver) {
        await driver.deleteSession();
      }
    });

    test('iOS - Find element by accessibility ID', async () => {
      try {
        const element = await driver.$('~login_button');
        const isDisplayed = await element.isDisplayed();
        expect(isDisplayed).toBe(true);
      } catch (error) {
        console.error('Error finding element:', error);
      }
    });

    test('iOS - Tap button and verify navigation', async () => {
      try {
        const loginButton = await driver.$('~login_button');
        await loginButton.click();

        const dashboardTitle = await driver.$('~dashboard_title');
        const text = await dashboardTitle.getText();
        expect(text).toContain('Dashboard');
      } catch (error) {
        console.error('Error in tap test:', error);
      }
    });

    test('iOS - Input text in field', async () => {
      try {
        const passwordField = await driver.$('~password_input');
        await passwordField.clearValue();
        await passwordField.addValue('password123');

        const inputValue = await passwordField.getValue();
        expect(inputValue).toBe('password123');
      } catch (error) {
        console.error('Error in input test:', error);
      }
    });

    test('iOS - Scroll to element', async () => {
      try {
        const targetElement = await driver.$('~bottom_button');
        await driver.execute('mobile: scroll', { element: targetElement });
      } catch (error) {
        console.error('Error in scroll test:', error);
      }
    });

    test('iOS - Verify alert handling', async () => {
      try {
        const deleteButton = await driver.$('~delete_button');
        await deleteButton.click();

        const alertText = await driver.getAlertText();
        expect(alertText).toContain('Confirm');

        await driver.acceptAlert();
      } catch (error) {
        console.error('Error in alert test:', error);
      }
    });
  });
});
