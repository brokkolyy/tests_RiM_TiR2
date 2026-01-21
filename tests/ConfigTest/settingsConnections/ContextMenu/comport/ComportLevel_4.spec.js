const path = require('path');
const { test, expect } = require('@playwright/test');
const ConfigPage = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPage.js'));
const ConfigPageElements = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPageElements.js'));

async function escape(page) {
    const v = page.getByRole('menuitem', { name: 'Вставить Ctrl+V' });
    await expect(v).toBeDisabled();
    await page.keyboard.press('Escape');
}

async function variable(page) {
    const config = new ConfigPage(page);
    await config.contextMenuVariable();
    await page.getByRole('menuitem', { name: 'Создать переменную', exact: true }).hover();
    await config.clickVariable_1();
    await page.getByText('variable').dblclick()
    await page.locator('input[type="text"]').fill('test');
    await page.keyboard.press('Enter');
}

test.describe('Навигация', () => {
    test.beforeEach(async ({page}) => {
        const config = new ConfigPage(page);     
        await config.goto();

        await config.contextMenuVariable();
        await page.getByRole('menuitem', { name: 'Создать переменную', exact: true }).hover();
        await config.clickVariable_1();
        await page.getByText('variable').dblclick()
        await page.locator('input[type="text"]').fill('test');
        await page.keyboard.press('Enter');

        await config.contextMenuReception();
        await config.clickComport();

        await config.contextMenuBroadcast();
        await config.clickComport();
    });

    test('На 4 уровне: COM-порт-Modbus-RTU-функциональная группа-объект данных (раздел "Прием")', async ({page}) => {
        const config = new ConfigPage(page);
        const configElement = new ConfigPageElements(page);

        await page.getByText('COMttyS0115200comport').first().click({button:'right'});
        await configElement.clickModbusRTU_Master();
        await page.getByText('MB RTU1modbusRTU_master').click({button:'right'});
        await configElement.clickFunctionGroup();
        await page.getByText('fg1functionGroup').click({button:'right'});
        await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
        await configElement.clickObject_1();
        await page.locator('div').filter({ hasText: /^Это поле обязательно для заполненияЭто поле обязательно для заполнения$/ }).nth(1).dblclick();
        
        await page.getByRole('option', { name: 'test' }).click();
        let obj = page.locator('div').filter({ hasText: /^test$/ }).nth(1)
        
        await expect(obj).toBeVisible(); 
        await obj.click({button:'right'});
        await page.getByRole('menuitem', { name: 'Игнорировать Ctrl+I' }).click();
        obj = page.getByText('Заблокированtest');
        await obj.click({button:"right"})
        await page.getByRole('menuitem', { name: 'Копировать Ctrl+C' }).click()

        await page.getByText('COMttyS0115200comport').first().click({button:'right'});
        await escape(page)
        await page.getByText('MB RTU1modbusRTU_master').click({button:'right'});
        await escape(page)
        await page.getByText('fg1functionGroup').click({button:'right'});
        await config.clickFolder();
        await page.getByText('folder').click({button: 'right'});
        
        await page.getByRole('menuitem', { name: 'Вставить Ctrl+V' }).click();

        await page.locator('div').filter({ hasText: /^Заблокирован$/ }).nth(1).click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Использовать Ctrl+I' }).click();
        await page.locator('div').filter({ hasText: /^Это поле обязательно для заполненияЭто поле обязательно для заполнения$/ }).nth(1).click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Копировать Ctrl+C' }).click();
        await page.getByText('fg1functionGroup').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Вставить Ctrl+V' }).click();

        await page.locator('div').filter({ hasText: /^Это поле обязательно для заполненияЭто поле обязательно для заполнения$/ }).nth(1).click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Вырезать Ctrl+X' }).click();

        await config.contextMenuReception()
        await config.clickIec104_C();
        await page.getByText('iec104127.0.0.').click({button: 'right'});
        await configElement.clickAsdu();
        await page.getByText('asdu1asdu').click({button: 'right'})
        await escape(page);
        await config.contextMenuReception()
        await config.clickModbusTCP_C();
        await page.getByText('MB TCP127.0.0.').click({button:'right'});
        await escape(page);
        await config.contextMenuReception();
        await escape(page)
        await config.contextMenuReception();
        await config.clickComport()
        await page.locator('div').filter({ hasText: /^Прием$/ }).nth(1).click({button:'right'});
        await config.clickGpio();
        await page.screenshot({path:'error.png'})
        await page.getByText('gpio200gpio').click({button:'right'});
        await escape(page)
        await config.contextMenuReception();
        await config.clickFolder()

        
        await page.getByText('folder').nth(1).click({button:"right"});
        await escape(page);

        await page.getByText('COMttyS0115200comport').nth(1).click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Создать "Modbus-RTU Master"' }).click();
        await page.getByText('MB RTU1modbusRTU_master').nth(1).click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Создать "Функциональная группа"' }).click();
        await page.getByText('fg1functionGroup').nth(1).click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Вставить Ctrl+V' }).click();

        await page.getByText('Заблокированtest').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Вырезать Ctrl+X' }).click();
        await page.getByText('fg1functionGroup').nth(1).click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Вставить Ctrl+V' }).click();
    })

    test('На 4 уровне: COM-порт-Modbus-RTU-функциональная группа-объект данных (раздел "Передача")', async ({page}) => {
        const config = new ConfigPage(page);
        const configElement = new ConfigPageElements(page);

        await page.getByText('COMttyS0115200comport').nth(1).click({button:'right'});
        await configElement.clickModbusRTU_Slave();
        await page.getByText('MB RTU1modbusRTU_slave').click({button:'right'});
        await configElement.clickFunctionGroup();
        await page.getByText('fg1functionGroup').click({button:'right'});
        await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
        await configElement.clickObject_1();
        await page.locator('div').filter({ hasText: /^Это поле обязательно для заполненияЭто поле обязательно для заполнения$/ }).nth(1).dblclick();
        
        await page.getByRole('option', { name: 'test' }).click();
        let obj = page.locator('div').filter({ hasText: /^test$/ }).nth(1)
        
        await expect(obj).toBeVisible(); 
        await obj.click({button:'right'});
        await page.getByRole('menuitem', { name: 'Игнорировать Ctrl+I' }).click();
        obj = page.getByText('Заблокированtest');
        await obj.click({button:"right"})
        await page.getByRole('menuitem', { name: 'Копировать Ctrl+C' }).click()

        await page.getByText('COMttyS0115200comport').nth(1).click({button:'right'});
        await escape(page)
        await page.getByText('MB RTU1modbusRTU_slave').click({button:'right'});
        await escape(page)
        await page.getByText('fg1functionGroup').click({button:'right'});
        await config.clickFolder();
        await page.getByText('folder').click({button: 'right'});
        
        await page.getByRole('menuitem', { name: 'Вставить Ctrl+V' }).click();

        await page.locator('div').filter({ hasText: /^Заблокирован$/ }).nth(1).click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Использовать Ctrl+I' }).click();
        await page.locator('div').filter({ hasText: /^Это поле обязательно для заполненияЭто поле обязательно для заполнения$/ }).nth(1).click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Копировать Ctrl+C' }).click();
        await page.getByText('fg1functionGroup').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Вставить Ctrl+V' }).click();

        await page.locator('div').filter({ hasText: /^Это поле обязательно для заполненияЭто поле обязательно для заполнения$/ }).nth(1).click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Вырезать Ctrl+X' }).click();

        await config.contextMenuBroadcast()
        await config.clickIec104_S();
        await page.getByText('iec104127.0.0.').click({button: 'right'});
        await configElement.clickAsdu();
        await page.getByText('asdu1asdu').click({button: 'right'})
        await escape(page);
        await config.contextMenuBroadcast()
        await config.clickModbusTCP_S();
        await page.getByText('MB TCP127.0.0.').click({button:'right'});
        await escape(page);
        await config.contextMenuBroadcast();
        await escape(page)
        await config.contextMenuBroadcast();
        await config.clickComport()
        await page.locator('div').filter({ hasText: /^Передача$/ }).nth(1).click({button:'right'});
        await config.clickGpio();
        await page.screenshot({path:'error.png'})
        await page.getByText('gpio200gpio').click({button:'right'});
        await escape(page)
        await config.contextMenuBroadcast();
        await config.clickFolder()

        
        await page.getByText('folder').nth(1).click({button:"right"});
        await page.screenshot({path:'error.png'})
        await escape(page);

        await page.getByText('COMttyS0115200comport').nth(2).click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Создать "Modbus-RTU Slave"' }).click();
        await page.getByText('MB RTU1modbusRTU_slave').nth(1).click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Создать "Функциональная группа"' }).click();
        await page.getByText('fg1functionGroup').nth(1).click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Вставить Ctrl+V' }).click();

        await page.getByText('Заблокированtest').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Вырезать Ctrl+X' }).click();
        await page.getByText('fg1functionGroup').nth(1).click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Вставить Ctrl+V' }).click();
    })
})