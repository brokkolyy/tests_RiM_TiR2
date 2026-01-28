const path = require('path');
const { test, expect } = require('@playwright/test');
const { config } = require('process');

const MonitoringPage = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPage.js'));

test('Синхронизация страницы "Конфигурация" с "Мониторинг"', async ({ page }) => {

})