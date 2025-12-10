const path = require('path');
const { test, expect } = require('@playwright/test');
const ConfigPage = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPage.js'));
const ConfigPageElements = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPageElements.js'));

test('Уникальность объекта данных (FG-ИО)-(FG-ИО)', async ({ page }) => {
    const config = new ConfigPage(page);
    const configElement = new ConfigPageElements(page);
        
    await config.goto();
    await config.contextMenuReception();
    await config.clickComport();
        
    await page.locator('div').filter({ hasText: /^COMttyS0115200comport$/ }).nth(1).click({button: 'right'});
    await configElement.clickModbusRTU_Master();
    
    await page.locator('div').filter({ hasText: /^MB RTU1modbusRTU_master$/ }).nth(1).click({button: 'right'});
    await configElement.clickFunctionGroup();      
    
    await page.locator('div:nth-child(4) > ._node_1yclz_1').click({button: 'right'});
    await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
    await configElement.clickObject_1();
    
    await page.locator('div').filter({ hasText: /^MB RTU1modbusRTU_master$/ }).nth(1).click({button: 'right'});
    await config.clickFolder();

    const folder = page.locator('div').filter({ hasText: /^folder$/ }).nth(4);  //папка
    await expect(folder).toBeVisible();
    await folder.click({button: 'right'});
    await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
    await configElement.clickObject_1();         

    const errorIcon = page.locator('svg').filter({ hasText: 'Это поле обязательно для заполненияЭто поле обязательно для заполнения' }).first();
    const errorIcon1 = page.locator('svg').filter({ hasText: 'Это поле обязательно для заполнения' }).nth(4);
    await expect(errorIcon).toBeVisible();
    const errIcon2 = page.locator('svg').filter({ hasText: 'Это поле обязательно для заполненияАдрес должен быть уникальным внутри родительс' }).nth(1);
    const errorButton = page.getByRole('button', { name: 'Показать ошибки' });
    await expect(errorButton).toBeVisible();

    const objFolder = page.locator('div:nth-child(7) > ._node_1yclz_1 > .chakra-stack.css-3cqz5p > .chakra-stack.css-n3uhkm > .chakra-stack');
    await objFolder.click();
    expect(page.locator('svg').filter({ hasText: 'Это поле обязательно для заполнения' }).nth(3));
    await objFolder.click();
    const fieldObjF = page.getByRole('textbox', { name: 'Адрес информационного объекта' });
    await fieldObjF.focus();
    await expect(fieldObjF).toBeFocused();
    
    const inputVal = '0x1';
    await fieldObjF.fill(inputVal);
    await fieldObjF.press('Enter');
    const val = await fieldObjF.inputValue();
    expect(val).toBe('0x1');
    await expect(errorIcon1).not.toBeVisible();

    const objFG = page.locator('._node_1yclz_1.isLeaf > .chakra-stack.css-3cqz5p > .chakra-stack.css-n3uhkm > .chakra-stack').first();
    expect(page.locator('svg').filter({ hasText: 'Это поле обязательно для заполнения' }).nth(3));
    await objFG.click();
    const fieldFG = page.getByRole('textbox', { name: 'Адрес информационного объекта' });
    await fieldFG.focus();
    await expect(fieldFG).toBeFocused();

    await fieldFG.fill(inputVal);
    await fieldFG.press('Enter');
    const val1 = await fieldFG.inputValue();
    expect(val1).toBe('0x1');
    await expect(errorIcon1).not.toBeVisible();
    await expect(page.locator('.chakra-icon.css-pgosud > path').first()).toBeVisible();

    await page.locator('div:nth-child(4) > ._node_1yclz_1').click({button: 'right'});
    await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
    await configElement.clickObject_1();
    const objFG2 = page.locator('div:nth-child(8) > ._node_1yclz_1 > .chakra-stack.css-3cqz5p > .chakra-stack.css-n3uhkm > .chakra-stack');
    await expect(objFG2).toBeVisible();
    await objFG2.click();
    expect(page.locator('svg').filter({ hasText: 'Это поле обязательно для заполнения' }).nth(3));
    await objFG.click();
    const fieldFG2 = page.getByRole('textbox', { name: 'Адрес информационного объекта' });
    await fieldFG2.focus();
    await expect(fieldFG2).toBeFocused();

    await fieldFG2.fill(inputVal);
    await fieldFG2.press('Enter');
    const val2 = await fieldFG.inputValue();
    expect(val2).toBe('0x1');
    await expect(errorIcon1).not.toBeVisible();
    await expect(page.locator('svg').filter({ hasText: /^Адрес должен быть уникальным внутри родительского элемента$/ })).toBeVisible();

    await fieldFG2.fill('0x2');
    await fieldFG2.press('Enter');
    const val3 = await fieldFG.inputValue();
    expect(val3).toBe('0x2');
    await expect(errorIcon1).not.toBeVisible();
    await expect(page.locator('svg').filter({ hasText: /^Адрес должен быть уникальным внутри родительского элемента$/ })).not.toBeVisible();
});