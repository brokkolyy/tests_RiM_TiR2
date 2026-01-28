const path = require('path');
const { test, expect } = require('@playwright/test');
const LoggingPage = require(path.join(process.cwd(), 'pages', 'Logging', 'LoggingPage.js'));

test('Лог-файлы во внешней памяти', async ({page}) => {
    const log = new LoggingPage(page)
    await log.goto()

    await expect(page.getByText('Логи во внешней памяти')).toBeVisible()
    await expect(page.getByLabel('Логи во внешней памяти').getByText('system — копия (3).log')).toBeVisible()
    await page.getByLabel('Логи во внешней памяти').getByText('system — копия (3).log').click()
    await expect(page.getByRole('button').filter({ hasText: /^$/ }).nth(4)).toBeEnabled()
})

test('Лог-файлы во внутренней памяти', async ({page}) => {
    const log = new LoggingPage(page)
    await log.goto()

    await expect(page.getByText('Логи во внутренней памяти')).toBeVisible();
    await page.evaluate(() => { window.scrollTo(0, document.body.scrollHeight)})
    await expect(page.getByText('Modbus_BEMP.log')).toBeVisible();
    await page.getByText('Modbus_BEMP.log').click()
    await expect(page.locator('[id="select::r3::option:internal/Modbus_BEMP.log"] > .chakra-button')).toBeEnabled();
})

test('Кнопка "Выбрать все"', async ({page}) => {
    const log = new LoggingPage(page)
    await log.goto()

    await expect(page.getByRole('button', { name: 'Скачать выбранные логи' })).toBeDisabled()
    await expect(page.getByRole('button', { name: 'Выбрать все' })).toBeVisible();
    await page.getByRole('button', { name: 'Выбрать все' }).click()
    await expect(page.getByRole('button', { name: 'Скачать выбранные логи' })).toBeEnabled()
})