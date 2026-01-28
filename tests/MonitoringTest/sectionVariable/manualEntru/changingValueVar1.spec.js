const path = require('path');
const { test, expect } = require('@playwright/test');
const { config } = require('process');
const MonitoringPage = require(path.join(process.cwd(), 'pages', 'Monitoring', 'MonitoringPage.js'));


test('Переключатель "Изменение значения переменной" для типа "1 бит - bool"', async ({page}) => {
    const monitoring = new MonitoringPage(page);
    await monitoring.goto();
    await page.getByText('IRZGPIO_BattLow').nth(1).click({button: 'right'});
    await monitoring.clickManualEntry();
    // добавить создание переменной в конфигуравции с типом  bool

    await expect(page.getByRole('heading', { name: 'Ручной ввод' })).toBeVisible()
    await expect(page.getByText('Изменение значения переменной')).toBeVisible()

    await page.locator('span').filter({ hasText: /^0$/ }).first().click();
    await expect(page.getByLabel('Ручной ввод').getByText('1', { exact: true })).toBeVisible()

    await page.getByLabel('Ручной ввод').getByText('1', { exact: true }).click();
    await expect(page.getByText('0', { exact: true })).toBeVisible();
    await monitoring.clickAccept();
    await expect(page.getByRole('heading', { name: 'Ручной ввод' })).not.toBeVisible()
})
