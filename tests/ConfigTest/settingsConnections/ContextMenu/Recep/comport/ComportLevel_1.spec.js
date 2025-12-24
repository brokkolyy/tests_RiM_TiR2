const path = require('path');
const { test, expect } = require('@playwright/test');
const ConfigPage = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPage.js'));
const ConfigPageElements = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPageElements.js'));


test.describe('Навигация', () => {
    test.beforeEach(async ({page}) => {
        const config = new ConfigPage(page);     
        await config.goto();
        await config.contextMenuReception();
        await config.clickComport();
    });

    test('На 1 уровне - COM-порт (раздел "Прием")', async ({page}) => {
        const config = new ConfigPage(page);
        const configElement = new ConfigPageElements(page);
        const comport = page.locator('div').filter({ hasText: /^COMttyS0115200comport$/ }).nth(1);

        await comport.click({button: 'right'});
        await configElement.clickModbusRTU_Master();

        await comport.click({button:'right'});
        await configElement.clickTcpBridge_Server();

        /*
        await comport.click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Переименовать Enter' }).click();
        const field = page.getByRole('textbox');
        await field.focus();
        await expect(field).toBeFocused();
        await field.fill('test');
        await field.press('Enter');*/

        await comport.click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Игнорировать Ctrl+I' }).click();

        const comportBlock = page.locator('div').filter({ hasText: /^ЗаблокированCOMttyS0115200test$/ }).nth(1);
        await expect(comportBlock).toBeVisible();

        await page.locator('div').filter({ hasText: /^MB RTU1modbusRTU_master$/ }).nth(1).click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Создать "Функциональная группа"' }).click();

        await comportBlock.click({button:'right'});
        await page.getByRole('menuitem', { name: 'Копировать Ctrl+C' }).click();

        await config.contextMenuReception();
        await config.clickFolder();

        await page.locator('div').filter({ hasText: /^folder$/ }).nth(1).click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Вставить Ctrl+V' }).click();

        await page.locator('div').filter({ hasText: /^ЗаблокированCOMttyS0115200test_copy$/ }).nth(1).click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Использовать Ctrl+I' }).click();
    })
});