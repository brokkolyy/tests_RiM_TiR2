const path = require('path');
const { test, expect } = require('@playwright/test');
const LoggingPage = require(path.join(process.cwd(), 'pages', 'Logging', 'LoggingPage.js'));

test('Кнопка "Назад"', async({page}) => {
    const log = new LoggingPage(page)
    await log.goto();

    await page.getByLabel('Логи во внешней памяти').getByText('system — копия (3).log').click()
    await page.getByRole('button').filter({ hasText: /^$/ }).nth(4).click()

    await page.getByText('[2025-09-26T17:23:41.403Z] [').click();
    await page.keyboard.press('PageUp')

    await expect(page.locator('.chakra-button.css-shy97h')).toBeVisible()
    await page.locator('.chakra-button.css-shy97h').click();
    await expect(page.locator('.chakra-button.css-shy97h')).toBeHidden();
})