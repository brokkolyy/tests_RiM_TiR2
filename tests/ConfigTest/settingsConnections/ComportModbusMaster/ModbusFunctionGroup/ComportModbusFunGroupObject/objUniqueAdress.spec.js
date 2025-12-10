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
    await configElement.clickFunctionGroup();       //1 функциональная группа
    
    await page.locator('div:nth-child(4) > ._node_1yclz_1').click({button: 'right'});
    await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
    await configElement.clickObject_2();
    const el1 = page.locator('div').filter({ hasText: /^Это поле обязательно для заполненияЭто поле обязательно для заполнения$/ }).nth(1);
    await expect(el1).toBeVisible();        //1 объект данный
    const el2 = page.locator('._node_1yclz_1.isLeaf > .chakra-stack.css-3cqz5p > .chakra-stack.css-n3uhkm > .chakra-stack').first();
    await expect(el2).toBeVisible();        //2 объект данный
    
    const errorIcon = page.locator('svg').filter({ hasText: 'Это поле обязательно для заполненияЭто поле обязательно для заполнения' }).first();
    const errorIcon1 = page.locator('svg').filter({ hasText: 'Это поле обязательно для заполнения' }).nth(4);
    await expect(errorIcon).toBeVisible();
    const errIcon2 = page.locator('svg').filter({ hasText: 'Это поле обязательно для заполненияАдрес должен быть уникальным внутри родительс' }).nth(1);
    const errorButton = page.getByRole('button', { name: 'Показать ошибки' });
    await expect(errorButton).toBeVisible();

    await el1.click();
    const fieldEl1 = page.getByRole('textbox', { name: 'Адрес информационного объекта' });
    await fieldEl1.focus();
    await expect(fieldEl1).toBeFocused();
    
    const inputVal = '0x1';
    await fieldEl1.fill(inputVal);
    await fieldEl1.press('Enter');
    const val = await fieldEl1.inputValue();
    expect(val).toBe('0x1');
    await expect(errorIcon1).not.toBeVisible();

    await el2.click();
    const fieldEl2 = page.getByRole('textbox', { name: 'Адрес информационного объекта' });
    await fieldEl2.focus();
    await expect(fieldEl2).toBeFocused();

    await fieldEl2.fill(inputVal);
    await fieldEl2.press('Enter');
    const val2 = await fieldEl2.inputValue();
    expect(val2).toBe('0x1');
    
    //await expect(errIcon2).toBeVisible();

    await page.locator('div:nth-child(4) > ._node_1yclz_1').click({button: 'right'});
    await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
    await configElement.clickObject_1();
    const el3 = page.locator('div:nth-child(7) > ._node_1yclz_1 > .chakra-stack.css-3cqz5p > .chakra-stack.css-n3uhkm > .chakra-stack');
    await expect(el3).toBeVisible();
    
    await el3.click();
    const fieldEl3 = page.getByRole('textbox', { name: 'Адрес информационного объекта' });
    await fieldEl3.focus();
    await expect(fieldEl3).toBeFocused();

    await expect(errorIcon1).toBeVisible();
    await fieldEl3.fill(inputVal);
    await fieldEl3.press('Enter');
    const val3  = await fieldEl2.inputValue();
    expect(val3).toBe('0x1');
    await expect(errIcon2).toBeVisible();
    await expect(errorButton).toBeVisible();

    await fieldEl3.focus();
    await expect(fieldEl3).toBeFocused();
    await fieldEl3.fill(inputVal + '2');
    await fieldEl3.press('Enter');
    const val4  = await fieldEl2.inputValue();
    expect(val4).toBe('0x12');
    await expect(errIcon2).not.toBeVisible();

    await fieldEl2.focus();
    await expect(fieldEl2).toBeFocused();
    await fieldEl2.fill('');
    await fieldEl2.press('Enter');
    const val5  = await fieldEl2.inputValue();
    expect(val5).toBe('');
    await expect(errorIcon1).toBeVisible();

    await fieldEl2.focus();
    await expect(fieldEl2).toBeFocused();
    await fieldEl2.fill(inputVal);
    await fieldEl2.press('Enter');
    expect(val2).toBe('0x1');
    await expect(errorIcon1).toBeVisible();

    await fieldEl2.focus();
    await expect(fieldEl2).toBeFocused();
    await fieldEl2.fill('');
    await fieldEl2.press('Enter');
    await fieldEl2.fill(inputVal + '2');
    await fieldEl2.press('Enter');
    const val12 = await fieldEl2.inputValue();
    expect(val12).toBe('0x12');
    await page.pause();
    await expect(page.locator('svg').filter({ hasText: 'Это поле обязательно для заполненияАдрес должен быть уникальным внутри родительс' }).nth(1)).toBeVisible();

    await fieldEl2.focus();
    await expect(fieldEl2).toBeFocused();
    await fieldEl2.fill(inputVal + '22');
    await fieldEl2.press('Enter');
    const val122 = await fieldEl2.inputValue();
    expect(val122).toBe('0x122');
    await expect(errIcon2).not.toBeVisible();
});
/*page.locator('svg').filter({ hasText: /^Адрес должен быть уникальным внутри родительского элемента$/ }).click();
  await page.locator('svg').filter({ hasText: 'Это поле обязательно для заполненияАдрес должен быть уникальным внутри родительс' }).first().click();
  await page.locator('svg').filter({ hasText: 'Это поле обязательно для заполненияАдрес должен быть уникальным внутри родительс' }).nth(1).click(); */