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
test('На 3 уровне - COM-порт-Modbus-RTU-функциональная группа (раздел "Прием")', async ({page}) => {
        const config = new ConfigPage(page);
        const configElement = new ConfigPageElements(page);
        await page.getByText('COMttyS0115200comport').first().click({button:'right'});
        await configElement.clickModbusRTU_Master();
        await page.getByText('MB RTU1modbusRTU_master').click({button:'right'});
        await configElement.clickFunctionGroup();
        let fg1 = page.getByText('fg1functionGroup');
        await fg1.dblclick();
        await page.locator('input[type="text"]').fill('test');
        await page.keyboard.press('Enter');
        fg1 = page.getByText('fg1test');
        await fg1.click({button:'right'});
        await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
        await configElement.clickObject_1();
        await fg1.click({button:'right'})
        await config.clickFolder()

        await fg1.click({button:'right'})
        await page.getByRole('menuitem', { name: 'Игнорировать Ctrl+I' }).click()

        await page.locator('._node_1yclz_1.isLeaf').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Игнорировать Ctrl+I' })
        fg1 = page.getByText('Заблокированfg1test');
        await fg1.click({button:'right'});
        await page.screenshot({path:'error.png'})
        await page.getByRole('menuitem', { name: 'Копировать Ctrl+C' }).click({force: true});

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
        await page.getByText('folder').nth(1).click({button:"right"});
        await escape(page);

        await page.getByText('folder').nth(1).click({button:"right"});
        await config.clickComport();
        await page.getByText('COMttyS0115200comport').nth(1).click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Создать "Modbus-RTU Master"' }).click();
        await page.getByText('MB RTU1modbusRTU_master').nth(1).click({button: 'right'});
        await page.screenshot({path:'error.png'})
        await v.click();
        await page.getByText('Заблокированfg1test_copy').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Использовать Ctrl+I' }).click();
        await page.getByText('test_copy').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Вырезать Ctrl+X' }).click();
        await fg1.click()
        await page.keyboard.press('PageUp')
        await page.keyboard.press('PageUp')
        await page.locator('div').filter({ hasText: /^Прием$/ }).nth(1).click({button:'right'});
        
        await config.clickComport();
        //await page.screenshot({path:'err.png'})
        await page.getByText('COMttyS0115200comport').nth(1).click({button:'right'})
        await configElement.clickModbusRTU_Master();
        await page.getByText('MB RTU1modbusRTU_master').nth(2).click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Вставить Ctrl+V' }).click();
        await fg1.click({button:'right'})
        await page.getByRole('menuitem', { name: 'Вырезать Ctrl+X' }).click();
        await page.getByText('MB RTU1modbusRTU_master').nth(1).click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Вставить Ctrl+V' }).click();
    })

    test('На 3 уровне - COM-порт-Modbus-RTU-функциональная группа (раздел "Передача")', async ({page}) => {
        const config = new ConfigPage(page);
        const configElement = new ConfigPageElements(page);
        await page.getByText('COMttyS0115200comport').nth(1).click({button:'right'});
        await configElement.clickModbusRTU_Slave();
        await page.getByText('MB RTU1modbusRTU_slave').click({button:'right'});
        await configElement.clickFunctionGroup();
        let fg1 = page.getByText('fg1functionGroup');
        await fg1.dblclick();
        await page.locator('input[type="text"]').fill('test');
        await page.keyboard.press('Enter');
        fg1 = page.getByText('fg1test');
        await fg1.click({button:'right'});
        await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
        await configElement.clickObject_1();
        await fg1.click({button:'right'})
        await config.clickFolder()

        await fg1.click({button:'right'})
        await page.getByRole('menuitem', { name: 'Игнорировать Ctrl+I' }).click()

        await page.locator('._node_1yclz_1.isLeaf').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Игнорировать Ctrl+I' })
        fg1 = page.getByText('Заблокированfg1test');
        await fg1.click({button:'right'});
        await page.screenshot({path:'error.png'})
        await page.getByRole('menuitem', { name: 'Копировать Ctrl+C' }).click({force: true});

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
        await page.getByText('folder').nth(1).click({button:"right"});
        await escape(page);

        await page.getByText('folder').nth(1).click({button:"right"});
        await config.clickComport();
        await page.getByText('COMttyS0115200comport').nth(3).click({button: 'right'});
        await page.screenshot({path:'error.png'})
        await configElement.clickModbusRTU_Slave();
        await page.getByText('MB RTU1modbusRTU_slave').nth(1).click({button: 'right'});
        //await page.screenshot({path:'error.png'})
        await v.click();
        await page.getByText('Заблокированfg1test_copy').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Использовать Ctrl+I' }).click();
        await page.getByText('test_copy').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Вырезать Ctrl+X' }).click();
        await page.getByText('test_copy').click()
        //await fg1.click()
        await page.keyboard.press('PageUp')
        await page.keyboard.press('PageUp')
        await page.locator('div').filter({ hasText: /^Передача$/ }).nth(5).click({button:'right'})
        await page.screenshot({path:'error.png'})
        await config.clickComport();
        await page.getByText('COMttyS0115200comport').nth(3).click({button:'right'})
        await configElement.clickModbusRTU_Slave();
        await page.getByText('MB RTU1modbusRTU_slave').nth(1).click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Вставить Ctrl+V' }).click();
        
        await fg1.click({button:'right'})
        await page.getByRole('menuitem', { name: 'Вырезать Ctrl+X' }).click();
        await page.getByText('MB RTU1modbusRTU_slave').nth(1).click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Вставить Ctrl+V' }).click();
    })
})