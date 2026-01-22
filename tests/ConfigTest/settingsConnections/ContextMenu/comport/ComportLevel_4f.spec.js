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

    test('На 4 уровне: COM-порт-Modbus-RTU-функциональная группа- папка (раздел "Прием")', async ({page}) => {
        const config = new ConfigPage(page);
        const configElement = new ConfigPageElements(page);

        await page.getByText('COMttyS0115200comport').first().click({button:'right'});
        await configElement.clickModbusRTU_Master();
        await page.getByText('MB RTU1modbusRTU_master').click({button:'right'});
        await configElement.clickFunctionGroup();
        await page.getByText('fg1functionGroup').click({button:'right'});
        await config.clickFolder();

        await page.getByText('folder').first().click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
        await configElement.clickObject_1();

        await page.getByText('folder').click({button:'right'})
        await config.clickFolder();

        await page.getByText('folder').first().click({button:'right'})
        await page.getByRole('menuitem', { name: 'Игнорировать Ctrl+I' }).click();
        await page.getByText('folder').nth(1).click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Игнорировать Ctrl+I' }).click();

        await page.getByText('Заблокированfolder').first().click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Копировать Ctrl+C' }).click();

        const v = page.getByRole('menuitem', { name: 'Вставить Ctrl+V' });
        await config.contextMenuReception();
        await escape(page)
        await page.getByText('COMttyS0115200comport').first().click({button:'right'});
        await escape(page)
        await page.getByText('fg1functionGroup').click({button:'right'});
        await expect(v).toBeEnabled();
        await v.click()

        await page.getByText('Заблокированfolder_copy').first().click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Использовать Ctrl+I' }).click();
        await page.getByText('folder_copy').first().click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Копировать Ctrl+C' }).click();

        await config.contextMenuReception()
        await config.clickIec104_C();
        await page.getByText('iec104127.0.0.').click({button: 'right'});
        await expect(v).toBeDisabled()
        await configElement.clickAsdu();
        await page.getByText('asdu1asdu').click({button: 'right'})
        await escape(page);
        await config.contextMenuReception()
        await config.clickModbusTCP_C();
        await page.screenshot({path:'error.png'})
        await page.getByText('COMttyS0115200comport').first().click()
        await page.keyboard.press('PageDown');
        await page.keyboard.press('PageDown');
        await page.getByText('MB TCP127.0.0.').click({button:'right'});
        await escape(page);
        await page.getByText('MB TCP127.0.0.').click()
        await page.keyboard.press('PageUp')
        await page.keyboard.press('PageUp')
        await config.contextMenuReception();
        await escape(page)
        
        /*await page.locator('div').filter({ hasText: /^Прием$/ }).nth(1).click({button:'right'});
        await config.contextMenuReception();
        await config.clickGpio();
        await page.screenshot({path:'error.png'})
        await page.getByText('gpio200gpio').click({button:'right'});
        await escape(page)*/

        await config.contextMenuReception();
        await config.clickComport()
        
        await page.getByText('COMttyS0115200comport').first().click()
        await page.keyboard.press('PageDown');
        await page.keyboard.press('PageDown');
        await page.getByText('COMttyS0115200comport').click({button: 'right'});
        await expect(v).toBeDisabled();
        await page.screenshot({path:'error.png'})
        await configElement.clickModbusRTU_Master();
        await page.getByText('MB RTU1modbusRTU_master').nth(1).click({button: 'right'});
        await expect(v).toBeDisabled();
        await configElement.clickFunctionGroup();
        await page.getByText('fg1functionGroup').nth(1).click({button: 'right'});
        await v.click();

        await page.getByText('Заблокированfolder').first().click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Вырезать Ctrl+X' }).click();
        await page.getByText('fg1functionGroup').click({button: 'right'});
        await v.click();

        await page.getByText('folder_copy').first().click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Вырезать Ctrl+X' }).click();
        await page.getByText('fg1functionGroup').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Вставить Ctrl+V' }).click();
    })
})