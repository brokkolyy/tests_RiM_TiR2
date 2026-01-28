const path = require('path');
const { test, expect } = require('@playwright/test');
const LoggingPage = require(path.join(process.cwd(), 'pages', 'Logging', 'LoggingPage.js'));

test('Кнопка "Назад"', async({page}) => {
    const log = new LoggingPage(page)
    await log.goto();

    await page.getByLabel('Логи во внешней памяти').getByText('system — копия (3).log').click()
    await page.getByRole('button').filter({ hasText: /^$/ }).nth(4).click()

    await expect(page.locator('section')).toBeVisible();
    await page.getByRole('button').filter({ hasText: /^$/ }).nth(3).click();
    await page.screenshot({path:'err.png'})
    
    await expect(page.locator('div').filter({ hasText: /^Выберите файл$/ })).toBeVisible()
})