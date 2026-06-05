// Appium capabilities configuration for iOS and Android

const androidCapabilities = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': 'Android Emulator',
  'appium:app': '/path/to/app.apk', // Replace with your app path
  'appium:appPackage': 'com.example.app', // Replace with your app package
  'appium:appActivity': 'MainActivity',
  'appium:newCommandTimeout': 300000,
};

const iosCapabilities = {
  platformName: 'iOS',
  'appium:automationName': 'XCUITest',
  'appium:deviceName': 'iPhone 14',
  'appium:app': '/path/to/app.app', // Replace with your app path
  'appium:bundleId': 'com.example.app', // Replace with your bundle ID
  'appium:newCommandTimeout': 300000,
};

const serverConfig = {
  protocol: 'http',
  hostname: 'localhost',
  port: 4723, // Default Appium server port
};

module.exports = {
  androidCapabilities,
  iosCapabilities,
  serverConfig,
};
