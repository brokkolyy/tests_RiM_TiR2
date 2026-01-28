const path = require('path');
const { test, expect } = require('@playwright/test');
const LoggingPage = require(path.join(process.cwd(), 'pages', 'Logging', 'LoggingPage.js'));

test.describe('Навигация', () => {
    test.beforeEach(async({page}) =>{
        const log = new LoggingPage(page);
        await log.goto()
       
        await page.evaluate(() => { window.scrollTo(0, document.body.scrollHeight)})
        
        
        await expect(page.getByText('Modbus_BEMP.log')).toBeVisible();
        await page.getByText('Modbus_BEMP.log').click()
        await page.locator('[id="select::r3::option:internal/Modbus_BEMP.log"] > .chakra-button').click();
    })

    test('Фильтр "Предупреждения"', async({page}) =>{
        await page.waitForTimeout(5000)
        await page.screenshot({path:'err.png'})
        const warn = page.locator('[id="checkbox::r7::control"]');
        //await expect(warn).toBeVisible()
        await expect(warn).toBeChecked()
        await warn.click()
        await expect(warn).not.toBeChecked();
    })

    test('Фильтр "Ошибки"', async({page}) =>{
        const err = page.locator('[id="checkbox::r8::control"]')
        await expect(err).toBeVisible()
        await expect(err).toBeChecked()
        await err.click()
        await expect(err).not.toBeChecked();
    })

    test('Фильтр "Сообщения"', async({page}) =>{
        const info = page.locator('[id="checkbox::r9::control"]')
        await expect(info).toBeVisible()
        await expect(info).toBeChecked()
        await info.click()
        await expect(info).not.toBeChecked();
    })

    test('Убрать все фильтры ', async({page}) =>{
        await page.locator('[id="checkbox::r7::control"]').click()
        await page.locator('[id="checkbox::r8::control"]').click()
        await page.locator('[id="checkbox::r9::control"]').click()
        await expect(page.getByText('Нет данных')).toBeVisible()
    })
})