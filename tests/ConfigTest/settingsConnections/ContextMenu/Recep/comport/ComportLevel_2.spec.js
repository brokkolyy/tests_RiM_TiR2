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

        await config.contextMenuBroadcast();
        await config.clickComport();
    });

    test('На 1 уровне - COM-порт (раздел "Прием")', async ({page}) => {
        const config = new ConfigPage(page);
        const configElement = new ConfigPageElements(page);
        const comport = page.locator('div').filter({ hasText: /^COMttyS0115200comport$/ }).nth(1);

        await comport.click({button:'right'});
        await configElement.clickTcpBridge_Server();

        await page.getByText('TCP127.0.0.').dblclick();
        await page.getByRole('treeitem', { name: 'TCP 127.0.0.1 502' }).getByRole('textbox').fill('test');
        await page.getByRole('treeitem', { name: 'TCP 127.0.0.1 502' }).getByRole('textbox').press('Enter');
        
        await page.getByText('TCP127.0.0.1502test').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Игнорировать Ctrl+I' }).click();

        await page.getByText('ЗаблокированTCP127.0.0.').click({button: 'right'});
        await expect(page.getByRole('menuitem', { name: 'Использовать Ctrl+I' })).not.toBeDisabled();
        await page.getByRole('menuitem', { name: 'Копировать Ctrl+C' }).click();
        await config.contextMenuReception();
        await config.clickFolder();

        await page.locator('div').filter({ hasText: /^ПриемCOMttyS0115200comportЗаблокированTCP127\.0\.0\.1502test$/ }).nth(1).click({button: 'right'});
        await expect(page.getByRole('menuitem', { name: 'Вставить Ctrl+V' })).toBeDisabled();
        await page.keyboard.press('Escape');

        await comport.click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Вставить Ctrl+V' }).click();
        await expect(page.getByText('ЗаблокированTCP127.0.0.1502test_copy')).toBeVisible();
        await page.getByText('ЗаблокированTCP127.0.0.1502test_copy').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Использовать Ctrl+I' }).click();
        await page.getByText('TCP127.0.0.1502test_copy').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Копировать Ctrl+C' }).click();

        await page.getByText('folder').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Создать "Comport"' }).click();
        await page.getByText('COMttyS0115200comportЗначение "comport" уже существует').nth(1).click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Вставить Ctrl+V' }).click();

        await page.getByText('ЗаблокированTCP127.0.0.').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Вырезать Ctrl+X' }).click();
        await page.getByText('COMttyS0115200comportЗначение "comport" уже существует').nth(1).click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Вставить Ctrl+V' }).click();
        await page.getByText('ЗаблокированTCP127.0.0.').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Удалить Backspace' }).click();
    });
})