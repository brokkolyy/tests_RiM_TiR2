const path = require('path');
const { test, expect } = require('@playwright/test');
const LoggingPage = require(path.join(process.cwd(), 'pages', 'Logging', 'LoggingPage.js'));

test('Скачать лог-файлы', async ({page}) => {
    const log = new LoggingPage(page)
    await log.goto()
    await expect(page.getByRole('button', { name: 'Скачать выбранные логи' })).toBeDisabled()
    await expect(page.getByRole('button', { name: 'Выбрать все' })).toBeVisible();
    await page.getByRole('button', { name: 'Выбрать все' }).click()
    await expect(page.getByRole('button', { name: 'Скачать выбранные логи' })).toBeEnabled()
    await page.getByRole('button', { name: 'Скачать выбранные логи' }).click()
})