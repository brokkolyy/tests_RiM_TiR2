const path = require('path');
const { test, expect } = require('@playwright/test');
const ConfigPage = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPage.js'));
const ConfigPageElements = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPageElements.js'));

async function escape(page) {
    const v = page.getByRole('menuitem', { name: 'Вставить Ctrl+V' });
    await expect(v).toBeDisabled();
    await page.keyboard.press('Escape');
}

test.describe('Навигация', () => {
    test.beforeEach(async ({page}) => {
        const config = new ConfigPage(page);     
        await config.goto();

        await config.contextMenuReception();
        await config.clickComport();

        await config.contextMenuBroadcast();
        await config.clickComport();
    });

    test('На 2 уровне - COM-порт-TCP-мост (раздел "Прием")', async ({page}) => {
        const config = new ConfigPage(page);
        const configElement = new ConfigPageElements(page);

        await page.getByText('COMttyS0115200comport').first().click({button:'right'});
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

        /*await page.getByText('ЗаблокированTCP127.0.0.').click({button: 'right'});
        await escape(page)*/

        await page.getByText('COMttyS0115200comport').first().click({button: 'right'});
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

    test('На 2 уровне - COM-порт-TCP-мост (раздел "Передача")', async ({page}) => {
        const config = new ConfigPage(page);
        const configElement = new ConfigPageElements(page);

        await page.getByText('COMttyS0115200comport').nth(1).click({button:'right'});
        await configElement.clickTcpBridge_Client();

        await page.getByText('TCP127.0.0.').dblclick();
        await page.getByRole('treeitem', { name: 'TCP 127.0.0.1 502' }).getByRole('textbox').fill('test');
        await page.getByRole('treeitem', { name: 'TCP 127.0.0.1 502' }).getByRole('textbox').press('Enter');
        
        await page.getByText('TCP127.0.0.1502test').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Игнорировать Ctrl+I' }).click();

        await page.getByText('ЗаблокированTCP127.0.0.').click({button: 'right'});
        await expect(page.getByRole('menuitem', { name: 'Использовать Ctrl+I' })).not.toBeDisabled();
        await page.getByRole('menuitem', { name: 'Копировать Ctrl+C' }).click();
        await config.contextMenuBroadcast();
        await config.clickFolder();

        /*await page.locator('div').filter({ hasText: /^ПриемCOMttyS0115200comportЗаблокированTCP127\.0\.0\.1502test$/ }).nth(1).click({button: 'right'});
        await escape(page)*/

        await page.getByText('COMttyS0115200comport').nth(1).click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Вставить Ctrl+V' }).click();
        await expect(page.getByText('ЗаблокированTCP127.0.0.1502test_copy')).toBeVisible();
        await page.getByText('ЗаблокированTCP127.0.0.1502test_copy').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Использовать Ctrl+I' }).click();
        await page.getByText('TCP127.0.0.1502test_copy').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Копировать Ctrl+C' }).click();

        await page.getByText('folder').click({button: 'right'});
        await config.clickComport();
        await page.getByText('COMttyS0115200comportЗначение "comport" уже существует').nth(1).click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Вставить Ctrl+V' }).click();

        await page.getByText('ЗаблокированTCP127.0.0.').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Вырезать Ctrl+X' }).click();
        await page.getByText('COMttyS0115200comportЗначение "comport" уже существует').nth(1).click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Вставить Ctrl+V' }).click();
        await page.getByText('ЗаблокированTCP127.0.0.').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Удалить Backspace' }).click();
    });

    test('На 2 уровне - COM-порт-Modbus-RTU (раздел "Прием")', async ({page}) => {
        const config = new ConfigPage(page);
        const configElement = new ConfigPageElements(page);
        await page.getByText('COMttyS0115200comport').first().click({button:'right'});
        await configElement.clickModbusRTU_Master();
        let modbus = page.getByText('MB RTU1modbusRTU_master');
        await modbus.click({button:'right'})
        await escape(page)
        await page.getByText('modbusRTU_master').dblclick();
        await page.getByRole('treeitem', { name: 'MB RTU 1 modbusRTU_master' }).getByRole('textbox').fill('test');
        await page.keyboard.press('Enter')
        modbus = page.getByText('MB RTU1test');

        await modbus.click({button:'right'});
        await configElement.clickFunctionGroup();

        await modbus.click({button:'right'});
        await page.getByRole('menuitem', { name: 'Игнорировать Ctrl+I' }).click()
        await expect(page.locator('svg').filter({ hasText: 'Заблокирован' })).toBeVisible()
        modbus = page.getByText('ЗаблокированMB RTU1test')

        await page.getByText('fg1functionGroup').click({button:'right'})
        await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
        await configElement.clickObject_1();

        await modbus.click({button:'right'})
        await page.getByRole('menuitem', { name: 'Копировать Ctrl+C' }).click();

        const v = page.getByRole('menuitem', { name: 'Вставить Ctrl+V' });
        await config.contextMenuReception();
        await escape(page)
        await config.contextMenuReception();
        await config.clickComport()
        await config.contextMenuReception();
        await config.clickGpio()
        await config.contextMenuReception();
        await config.clickIec104_C()
        await config.contextMenuReception();
        await config.clickModbusTCP_C()
        await config.contextMenuReception();
        await config.clickFolder()

        await page.getByText('gpio200gpio').click({button:'right'})
        await escape(page)
        await page.getByText('iec104127.0.0.').click({button:'right'});
        await escape(page)
        await page.getByText('MB TCP127.0.0.').click({button:'right'});
        await escape(page)
        await page.getByText('folder').click({button:"right"});
        await escape(page);

        await page.getByText('folder').click({button:"right"});
        await config.clickComport();
        await page.getByText('COMttyS0115200comport').nth(2).click({button:'right'})
        await page.screenshot({path:'error.png'})
        await expect(v).toBeEnabled();
        await v.click();

        await page.getByText('ЗаблокированMB RTU1test_copy').click({button:'right'});
        await page.getByRole('menuitem', { name: 'Использовать Ctrl+I' }).click();

        await page.getByText('MB RTU1test_copy').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Вырезать Ctrl+X' }).click();
        await page.getByText('MB RTU1test_copy').click();

        //await page.evaluate(() => window.scrollTo(0, 0))
        //const container = page.locator('._tree_1yclz_105').first();
        //await container.evaluate(el => el.scrollTo = 0)
        await page.keyboard.press('PageUp')
        await page.keyboard.press('PageUp')
        //await page.locator('div').filter({ hasText: /^Прием$/ }).nth(1).scrollIntoViewIfNeeded();
        await page.screenshot({path:'error.png'})
        await page.locator('div').filter({ hasText: /^Прием$/ }).nth(1).click({button:'right'});
        
        await config.clickComport();
        await page.getByText('COMttyS0115200comport').nth(2).click({button:'right'})
        
        await expect(v).toBeEnabled();
        await v.click();
    })

    test('На 2 уровне - COM-порт-Modbus-RTU (раздел "Передача")', async ({page}) => {
        const config = new ConfigPage(page);
        const configElement = new ConfigPageElements(page);
        await page.getByText('COMttyS0115200comport').nth(1).click({button:'right'});
        await configElement.clickModbusRTU_Slave();
        let modbus = page.getByText('MB RTU1modbusRTU_slave');
        await modbus.click({button:'right'})
        await escape(page)
        await page.getByText('modbusRTU_slave').dblclick();
        await page.getByRole('treeitem', { name: 'MB RTU 1 modbusRTU_slave' }).getByRole('textbox').fill('test');
        await page.keyboard.press('Enter')
        modbus = page.getByText('MB RTU1test');

        await modbus.click({button:'right'});
        await configElement.clickFunctionGroup();

        await modbus.click({button:'right'});
        await page.getByRole('menuitem', { name: 'Игнорировать Ctrl+I' }).click()
        await expect(page.locator('svg').filter({ hasText: 'Заблокирован' })).toBeVisible()
        modbus = page.getByText('ЗаблокированMB RTU1test')

        await page.getByText('fg1functionGroup').click({button:'right'})
        await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
        await configElement.clickObject_1();

        await modbus.click({button:'right'})
        await page.getByRole('menuitem', { name: 'Копировать Ctrl+C' }).click();

        const v = page.getByRole('menuitem', { name: 'Вставить Ctrl+V' });
        await config.contextMenuBroadcast();
        await escape(page)
        await config.contextMenuBroadcast();
        await config.clickComport()
        await config.contextMenuBroadcast();
        await config.clickGpio()
        await config.contextMenuBroadcast();
        await config.clickIec104_S()
        await config.contextMenuBroadcast();
        await config.clickModbusTCP_S()
        await config.contextMenuBroadcast();
        await config.clickFolder()

        await page.getByText('gpio200gpio').click({button:'right'})
        await escape(page)
        await page.getByText('iec104127.0.0.').click({button:'right'});
        await escape(page)
        await page.getByText('MB TCP127.0.0.').click({button:'right'});
        await escape(page)
        await page.getByText('folder').click({button:"right"});
        await escape(page);

        await page.getByText('folder').click({button:"right"});
        await config.clickComport();
        await page.getByText('COMttyS0115200comport').nth(2).click({button:'right'})
        await page.screenshot({path:'error.png'})
        await expect(v).toBeEnabled();
        await v.click();

        await page.getByText('ЗаблокированMB RTU1test_copy').click({button:'right'});
        await page.getByRole('menuitem', { name: 'Использовать Ctrl+I' }).click();

        await page.getByText('MB RTU1test_copy').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Вырезать Ctrl+X' }).click();
        await page.getByText('MB RTU1test_copy').click();

        //await page.evaluate(() => window.scrollTo(0, 0))
        //const container = page.locator('._tree_1yclz_105').first();
        //await container.evaluate(el => el.scrollTo = 0)
        await page.keyboard.press('PageUp')
        await page.keyboard.press('PageUp')
        //await page.locator('div').filter({ hasText: /^Прием$/ }).nth(1).scrollIntoViewIfNeeded();
        await page.screenshot({path:'error.png'})
        await page.locator('div').filter({ hasText: /^Прием$/ }).nth(1).click({button:'right'});
        
        await config.clickComport();
        await page.getByText('COMttyS0115200comport').nth(3).click({button:'right'})
        
        await expect(v).toBeEnabled();
        await v.click();
    })
})