const path = require('path');
const { test, expect } = require('@playwright/test');
const LoggingPage = require(path.join(process.cwd(), 'pages', 'Logging', 'LoggingPage.js'));

test('Отображения 100 строк', async ({page}) => {
    const log = new LoggingPage(page)
    await log.goto()

    const box = page.getByRole('combobox', { name: 'Количество отображаемых строк:' })
    await box.click()
    await page.getByRole('option', { name: '100', exact: true }).click();
    await expect(box).toHaveText('100')

    await page.getByLabel('Логи во внешней памяти').getByText('system — копия (3).log').click()
    await page.getByRole('button').filter({ hasText: /^$/ }).nth(4).click()
    await expect(page.locator('div.css-qkiqe6')).toHaveCountGreaterThan(0);
    const logContainer = page.locator('.logs-container');
    const rows = logContainer.locator('div.css-qkiqe6');
    await expect(rows).toHaveCount(100);
})