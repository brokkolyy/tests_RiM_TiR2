const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',

  reporter: [
    ['line'],
    //['junit', {outputFile: './test-results/junit-report.xml'}],
    //['json', { outputFile: 'playwright-report/report.json' }],
    ['allure-playwright', {
      detail: true,
      outputFolder: 'allure-results',
      suiteTitle: false
    }],
    /*[
      'testit-adapter-playwright',
      {
        url: 'https://team-atdz.testit.software/api/v2/testruns',  // ← проверь, что именно этот URL открывается в браузере и логинишься
        privateToken: 'WlFZaEFQRG9kTk5QaDhLMDV5',     // ← это выглядит как укороченный/старый токен. Создай НОВЫЙ!
        projectId: '01970bb3-a82c-75d3-8970-a3477c8f9793',
        configurationId: '01970bb3-a864-74e6-a813-a14b67880298',
        testRunName: 'Playwright Comport Level 1',
        automaticCreationTestCases: true,
        adapterMode: 1,  // ← режим 1: отправляет все результаты без фильтра (самый простой для локального запуска)
      }
    ],*/
  ],

  use: {
    browserName: 'chromium',
    headless: true
  }
});