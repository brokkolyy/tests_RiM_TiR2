const path = require('path');
const { test, expect } = require('@playwright/test');
const { testit } = require('testit-adapter-playwright');
const ConfigPage = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPage.js'));
const ConfigPageElements = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPageElements.js'));
//const { testit } = require('testit-adapter-playwright');

test.describe('Навигация', () => {
    test.beforeEach(async ({page}) => {
        testit.externalId('9bc4ae00-1ddc-4128-9fa5-4990f93e2d70')
        const config = new ConfigPage(page);     
        await config.goto();

        await config.contextMenuReception();
        await config.clickComport();

        await config.contextMenuBroadcast();
        await config.clickComport();
    });

    test('На 1 уровне - COM-порт (раздел "Прием")', async ({page}) => {
        testit.externalId('9bc4ae00-1ddc-4128-9fa5-4990f93e2d70')
        testit.description('На 1 уровне - COM-порт (раздел "Прием")')
        const config = new ConfigPage(page);
        const configElement = new ConfigPageElements(page);
        const comport = page.locator('div').filter({ hasText: /^COMttyS0115200comport$/ }).nth(1);

        await comport.click({button: 'right'});
        await configElement.clickModbusRTU_Master();

        await comport.click({button:'right'});
        await configElement.clickTcpBridge_Server();

        await comport.click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Игнорировать Ctrl+I' }).click();

        const comportBlock = page.getByText('ЗаблокированCOMttyS0115200comport') // page.getByRole('treeitem', { name: 'COM ttyS0 115200 comport' }).click();

        await expect(comportBlock).toBeVisible();

        await page.locator('div').filter({ hasText: /^MB RTU1modbusRTU_master$/ }).nth(1).click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Создать "Функциональная группа"' }).click();

        await comportBlock.click({button:'right'});
        await page.getByRole('menuitem', { name: 'Копировать Ctrl+C' }).click();

        await config.contextMenuReception();
        await config.clickFolder();

        await page.locator('div').filter({ hasText: /^folder$/ }).nth(1).click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Вставить Ctrl+V' }).click();

        await page.getByText('ЗаблокированCOMttyS0115200comport_copy').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Использовать Ctrl+I' }).click();

        await page.getByText('COMttyS0115200comport_copy').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Вырезать Ctrl+X' }).click();

        await page.getByText('ЗаблокированCOMttyS0115200comport').click({button: 'right'});
        await expect(page.getByRole('menuitem', { name: 'Вставить Ctrl+V' })).toBeDisabled();
        // после работы с меню
        await page.keyboard.press('Escape');

        await page.getByText('MB RTU1modbusRTU_master_copy').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Копировать Ctrl+C' }).click();
        await page.getByText('ЗаблокированCOMttyS0115200comport').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Вставить Ctrl+V' }).click();
        await expect(page.getByText('MB RTU1modbusRTU_master_copy_copy')).toBeVisible();

        await page.getByText('ЗаблокированCOMttyS0115200comport').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Вырезать Ctrl+X' }).click();
        await page.locator('div').filter({ hasText: /^folder$/ }).nth(2).click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Вставить Ctrl+V' }).click();
    })
    

    test('На 1 уровне - COM-порт (раздел "Передача")', async ({page}) => {
        
        testit.description('На 1 уровне - COM-порт (раздел "Передача")')
        const config = new ConfigPage(page);
        const configElement = new ConfigPageElements(page);
        const comport = page.locator('[id=":re:"] > .group > .css-uwwqev > div > ._tree_1yclz_105 > div:nth-child(2) > div:nth-child(2) > ._node_1yclz_1')

        await comport.click({button: 'right'});
        await configElement.clickModbusRTU_Slave();

        await comport.click({button:'right'});
        await configElement.clickTcpBridge_Client();

        await comport.click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Игнорировать Ctrl+I' }).click();

        const comportBlock = page.getByText('ЗаблокированCOMttyS0115200comport') // page.getByRole('treeitem', { name: 'COM ttyS0 115200 comport' }).click();

        await expect(comportBlock).toBeVisible();

        await page.locator('div').filter({ hasText: /^MB RTU1modbusRTU_slave$/ }).nth(1).click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Создать "Функциональная группа"' }).click();

        await comportBlock.click({button:'right'});
        await page.getByRole('menuitem', { name: 'Копировать Ctrl+C' }).click();

        await config.contextMenuBroadcast();
        await config.clickFolder();

        await page.locator('div').filter({ hasText: /^folder$/ }).nth(1).click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Вставить Ctrl+V' }).click();

        await page.getByText('ЗаблокированCOMttyS0115200comport_copy').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Использовать Ctrl+I' }).click();

        await page.getByText('COMttyS0115200comport_copy').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Вырезать Ctrl+X' }).click();

        await page.getByText('ЗаблокированCOMttyS0115200comport').click({button: 'right'});
        await expect(page.getByRole('menuitem', { name: 'Вставить Ctrl+V' })).toBeDisabled();
        // после работы с меню
        await page.keyboard.press('Escape');

        await page.getByText('MB RTU1modbusRTU_slave_copy').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Копировать Ctrl+C' }).click();
        await page.getByText('ЗаблокированCOMttyS0115200comport').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Вставить Ctrl+V' }).click();
        await expect(page.getByText('MB RTU1modbusRTU_slave_copy_copy')).toBeVisible();

        await page.getByText('ЗаблокированCOMttyS0115200comport').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Вырезать Ctrl+X' }).click();
        await page.locator('div').filter({ hasText: /^folder$/ }).nth(2).click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Вставить Ctrl+V' }).click();
    })
});