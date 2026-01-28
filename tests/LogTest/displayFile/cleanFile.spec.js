const path = require('path');
const { test, expect } = require('@playwright/test');
const LoggingPage = require(path.join(process.cwd(), 'pages', 'Logging', 'LoggingPage.js'));

test('Очистка поля отображения лог-файла', async({page}) => {
    const log = new LoggingPage(page)
    await log.goto();

    await page.getByLabel('Логи во внешней памяти').getByText('system — копия (3).log').click()
    await page.getByRole('button').filter({ hasText: /^$/ }).nth(4).click()
    await page.locator('button:nth-child(6)').click();
    await expect(page.getByText('Нет данных')).toBeVisible();
})