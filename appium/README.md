# Appium Mobile App Testing

Complete test suite for testing mobile apps on iOS and Android using Appium with WebdriverIO.

## Prerequisites

1. **Node.js** - v14 or higher
2. **Appium Server** - Install globally:
   ```bash
   npm install -g appium
   ```
3. **Android Setup** (for Android testing):
   - Android SDK installed
   - Android emulator running or device connected
   - Update `appPackage` and `appActivity` in `config.js`

4. **iOS Setup** (for iOS testing):
   - Xcode installed
   - iOS simulator running or device connected
   - Update `bundleId` in `config.js`

## Installation

```bash
cd appium
npm install
```

## Configuration

Edit `config.js` with your app details:

**Android:**
- `appPackage`: Your app's Java package name
- `appActivity`: Your app's main activity
- `app`: Path to your `.apk` file

**iOS:**
- `bundleId`: Your app's bundle identifier
- `app`: Path to your `.app` folder

## Running Tests

Start Appium server first:
```bash
appium --port 4723
```

Then run tests:
```bash
# All tests
npm test

# Android tests only
npm run test:android

# iOS tests only
npm run test:ios
```

## Key Test Examples

### Element Locators

**Android:**
- By ID: `id:com.example.app:id/button_id`
- By XPath: `//android.widget.Button[@text='Login']`
- By text: `android=new UiSelector().text('Login')`

**iOS:**
- By accessibility ID: `~accessibility_id`
- By XPath: `//XCUIElementTypeButton[@name='Login']`
- By predicate: `predicate=name == 'Login'`

### Common Actions
- `element.click()` - Tap element
- `element.addValue(text)` - Type text
- `element.clearValue()` - Clear field
- `element.getText()` - Get element text
- `driver.back()` - Press back button
- `driver.execute('mobile: scroll', {...})` - Scroll

## Debugging

Enable verbose logging:
```bash
appium --log-level debug
```

Use Appium Inspector to identify element locators:
```bash
appium inspector
```

## File Structure

```
appium/
├── config.js          # Appium capabilities and server config
├── tests.js           # Test cases for iOS and Android
├── jest.config.js     # Jest configuration
├── package.json       # Dependencies
└── README.md          # This file
```
