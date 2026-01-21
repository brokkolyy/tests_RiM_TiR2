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
        await config.clickFolder();
        
        //await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
        //await configElement.clickObject_1();
        //await page.locator('div').filter({ hasText: /^Это поле обязательно для заполненияЭто поле обязательно для заполнения$/ }).nth(1).dblclick();
        //await page.getByRole('option', { name: 'test' }).click();
        //let obj = page.locator('div').filter({ hasText: /^test$/ }).nth(1)
    })
})