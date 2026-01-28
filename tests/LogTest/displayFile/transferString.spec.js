const path = require('path');
const { test, expect } = require('@playwright/test');
const LoggingPage = require(path.join(process.cwd(), 'pages', 'Logging', 'LoggingPage.js'));

test('Кнопка "Пауза"/"Возобновить"', async({page}) => {
    const log = new LoggingPage(page)
    await log.goto();

    await page.getByLabel('Логи во внешней памяти').getByText('system — копия (3).log').click()
    await page.getByRole('button').filter({ hasText: /^$/ }).nth(4).click()
    
    const button = page.locator('[id="checkbox::ra::control"]');
    await expect(button).not.toBeChecked()
    await button.click()
    await expect(button).toBeChecked();
})