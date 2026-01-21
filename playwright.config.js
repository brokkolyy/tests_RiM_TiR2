const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',

  reporter: [
    ['line'],
    ['allure-playwright'],

  ],

  use: {
    browserName: 'chromium',
    headless: true
  }
});