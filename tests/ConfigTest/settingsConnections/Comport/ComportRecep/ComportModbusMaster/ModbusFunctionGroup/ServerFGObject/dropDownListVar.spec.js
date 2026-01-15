const path = require('path');
const { test, expect } = require('@playwright/test');
const ConfigPage = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPage.js'));
const ConfigPageElements = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPageElements.js'));

test('Выпадающий список переменные', async ({ page }) => {
    const config = new ConfigPage(page);
    const configElement = new ConfigPageElements(page);
        
    await config.goto();
    await config.contextMenuReception();
    await config.clickComport();
        
    await page.locator('div').filter({ hasText: /^COMttyS0115200comport$/ }).nth(1).click({
        button: 'right'});
    await configElement.clickModbusRTU_Master();
    
    await page.locator('div').filter({ hasText: /^MB RTU1modbusRTU_master$/ }).nth(1).click({button: 'right'});
    await configElement.clickFunctionGroup();       //1 функциональная группа
    
    await page.locator('div').filter({ hasText: /^fg1functionGroup$/ }).first().click({button: 'right'});
    await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
    await configElement.clickObject_1();
    
    const fg = page.locator('div').filter({ hasText: /^Это поле обязательно для заполненияЭто поле обязательно для заполнения$/ }).nth(1);
    await expect(fg).toBeVisible();
    await fg.click();
    //Variable
    await config.contextMenuVariable();
    await page.getByRole('menuitem', { name: 'Создать переменную', exact: true }).hover();
    await config.clickVariable_2();
    
    const variable1 = page.locator('div').filter({ hasText: /^variable$/ }).nth(1);
    await variable1.click();
    const field = page.getByRole('textbox', { name: 'Название' });
    await field.focus();
    await expect(field).toBeFocused();
    await field.fill('a');
    await field.press('Enter');
    const val = await field.inputValue();
    expect(val).toBe('a');

    const variable2 = page.locator('div').filter({ hasText: /^variable$/ }).nth(1)
    await variable2.click();
    const field2 = page.getByRole('textbox', { name: 'Название' });
    await field2.focus();
    await expect(field2).toBeFocused();
    await field2.fill('b');
    await field2.press('Enter');
    const val2 = await field.inputValue();
    expect(val2).toBe('b');

    const cbx = page.getByRole('combobox', { name: 'Переменная' });
    const buttunList = page.getByRole('button', { name: 'Toggle suggestions' });
    await buttunList.click();

    const opA = page.getByText('a').nth(4)
    await expect(opA).toBeVisible();
    await opA.click();
    await expect(page.getByText('ab', { exact: true })).toBeHidden();
    //await expect(cbx).toHaveText('a');

    const opB = page.getByText('b', { exact: true }).nth(2);
    await buttunList.click();
    await opB.click();
    await expect(page.getByText('ab', { exact: true })).toBeHidden();
    await expect(cbx).toHaveText('b');
});
