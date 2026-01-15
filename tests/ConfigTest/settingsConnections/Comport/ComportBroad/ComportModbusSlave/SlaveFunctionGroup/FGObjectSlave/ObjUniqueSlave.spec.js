const path = require('path');
const { test, expect } = require('@playwright/test');
const ConfigPage = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPage.js'));
const ConfigPageElements = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPageElements.js'));

test.describe('Навигация', () => {
    test.beforeEach(async ({page}) => {
        const config = new ConfigPage(page);
        const configElement = new ConfigPageElements(page);
        
        await config.goto();
        await config.contextMenuBroadcast();
        await config.clickComport();
        
        await page.locator('div').filter({ hasText: /^COMttyS0115200comport$/ }).nth(1).click({button: 'right'});
        await configElement.clickModbusRTU_Slave();
    
        await page.locator('div').filter({ hasText: /^MB RTU1modbusRTU_slave$/ }).nth(1).click({button: 'right'});
        await configElement.clickFunctionGroup();

        await page.locator('div').filter({ hasText: /^fg1functionGroup$/ }).first().click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
        await configElement.clickObject_1();

        await page.locator('div').filter({ hasText: /^MB RTU1modbusRTU_slave$/ }).nth(2).click({button: 'right'});
        await configElement.clickFunctionGroup();       //2 функциональная группа

        await page.locator('div').filter({ hasText: /^fg1functionGroup$/ }).first().click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
        await configElement.clickObject_1();
    });


test('Уникальность объекта данных (FG-ИО)-(FG-ИО)', async ({ page }) => {
    const errorIcon1 = page.locator('div').filter({ hasText: /^Это поле обязательно для заполненияЭто поле обязательно для заполнения$/ }).nth(4);
    await expect(errorIcon1).toBeVisible();
    const errIcon2 = page.locator('svg').filter({ hasText: 'Это поле обязательно для заполнения Данный тип данных не подходит для функций 1' }).first();
    await expect(errIcon2).toBeVisible();
    const errorGroup = page.locator('svg').filter({ hasText: 'Функция и тип данных должны быть уникальными внутри родительского элементаЭто по' });
    await expect(errorGroup).toBeVisible();
    const errorButton = page.getByRole('button', { name: 'Показать ошибки' });
    await expect(errorButton).toBeVisible();
});

test('Уникальность адреса объекта (FG-ИО)-(FG-ИО)', async ({ page }) => {
    const el1 = page.locator('._node_1yclz_1.isLeaf > .chakra-stack.css-3cqz5p > .chakra-stack.css-n3uhkm > .chakra-stack').first();
    await expect(el1).toBeVisible();        //1 объект данный
    // 1 объект
    await el1.click();
    const fieldEl1 = page.getByRole('textbox', { name: 'Адрес информационного объекта' });
    await fieldEl1.focus();
    await expect(fieldEl1).toBeFocused();
    
    const inputVal = '0x1';
    await fieldEl1.fill(inputVal);
    await fieldEl1.press('Enter');
    const val = await fieldEl1.inputValue();
    expect(val).toBe('0x1');
    await page.evaluate(() => document.activeElement.blur());

    const el2 = page.locator('div:nth-child(7) > ._node_1yclz_1 > .chakra-stack.css-3cqz5p > .chakra-stack.css-n3uhkm > .chakra-stack');
    await expect(el2).toBeVisible();        //2 объект данный
    // 2 объект
    //const el2 = page.locator('div:nth-child(7) > ._node_1yclz_1 > .chakra-stack.css-3cqz5p > .chakra-stack.css-n3uhkm > .chakra-stack');
    /*await el2.click();
    const fieldEl2 = page.getByRole('textbox', { name: 'Адрес информационного объекта' });
    await fieldEl2.focus();
    await expect(fieldEl2).toBeFocused();*/
    const fieldEl2 = page.getByRole('textbox', { name: 'Адрес информационного объекта' });
    await fieldEl2.focus();
    await expect(fieldEl2).toBeFocused();

    const errorIcon2 = page.locator('svg').filter({ hasText: 'Функция и тип данных должны быть уникальными внутри родительского элементаЭто по' });
    await fieldEl2.fill(inputVal);
    await fieldEl2.press('Enter');
    const val2 = await fieldEl2.inputValue();
    expect(val2).toBe('0x1');
    
    await expect(errorIcon2).toBeVisible();
});

test('Уникальность адреса объекта (FG-ИО)-(FG-ИО)-(FG-ИО)', async ({ page }) => {
    const configElement = new ConfigPageElements(page);
    const el1 = page.locator('._node_1yclz_1.isLeaf > .chakra-stack.css-3cqz5p > .chakra-stack.css-n3uhkm > .chakra-stack').first();
    await expect(el1).toBeVisible();        //1 объект данный
    // 1 объект
    await el1.click();
    const fieldEl1 = page.getByRole('textbox', { name: 'Адрес информационного объекта' });
    await fieldEl1.focus();
    await expect(fieldEl1).toBeFocused();
    
    const inputVal = '0x1';
    await fieldEl1.fill(inputVal);
    await fieldEl1.press('Enter');
    const val = await fieldEl1.inputValue();
    expect(val).toBe('0x1');
    await page.evaluate(() => document.activeElement.blur());
    
    // 2 объект
    const el2 = page.locator('div:nth-child(7) > ._node_1yclz_1 > .chakra-stack.css-3cqz5p > .chakra-stack.css-n3uhkm > .chakra-stack');
    await expect(el2).toBeVisible(); 
    //await el2.click();
    const fieldEl2 = page.getByRole('textbox', { name: 'Адрес информационного объекта' });
    await fieldEl2.focus();
    await expect(fieldEl2).toBeFocused();

    const errorIcon2 = page.locator('svg').filter({ hasText: 'Функция и тип данных должны быть уникальными внутри родительского элементаЭто по' });
    await fieldEl2.fill(inputVal);
    await fieldEl2.press('Enter');
    const val2 = await fieldEl2.inputValue();
    expect(val2).toBe('0x1');
    
    await expect(errorIcon2).toBeVisible();
    
    // 3 объект
    await page.locator('div:nth-child(4) > ._node_1yclz_1').click({button: 'right'});
    await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
    await configElement.clickObject_1();
    const el3 = page.locator('div:nth-child(6) > ._node_1yclz_1 > .chakra-stack.css-3cqz5p > .chakra-stack.css-n3uhkm > .chakra-stack');
    await expect(el3).toBeVisible();
    
    await el3.click();
    const fieldEl3 = page.getByRole('textbox', { name: 'Адрес информационного объекта' });
    await fieldEl3.focus();
    await expect(fieldEl3).toBeFocused();

    const errorIcon3 = page.locator('svg').filter({ hasText: /^Адрес должен быть уникальным внутри родительского элемента$/ });
    await fieldEl3.fill(inputVal);
    await fieldEl3.press('Enter');
    const val3  = await fieldEl2.inputValue();
    expect(val3).toBe('0x1');
    await expect(errorIcon3).toBeVisible();

    const errorGroup = page.locator('svg').filter({ hasText: 'Это поле обязательно для заполнения Данный тип данных не подходит для функций 1' }).first();
    await expect(errorGroup).toBeVisible();
    const errorButton = page.getByRole('button', { name: 'Показать ошибки' });
    await expect(errorButton).toBeVisible();
});
});

test('Уникальность адреса объекта (FG-ИО)-(FG-ИО)-(FG-ИО), убрать лишние ошибки', async ({ page }) => {
    const config = new ConfigPage(page);
    const configElement = new ConfigPageElements(page);
    
    await config.goto();
    await config.contextMenuBroadcast();
    await config.clickComport();    
    await page.locator('div').filter({ hasText: /^COMttyS0115200comport$/ }).nth(1).click({button: 'right'});
    await configElement.clickModbusRTU_Slave();

    await page.locator('div').filter({ hasText: /^MB RTU1modbusRTU_slave$/ }).nth(1).click({button: 'right'});
    await configElement.clickFunctionGroup();       //1 функциональная группа
    
    const elf = page.locator('div').filter({ hasText: /^fg1functionGroup$/ }).first();
    await expect(elf).toBeVisible();
    await elf.click();


    const item = page.getByRole('combobox', { name: 'Тип данных' });
    await page.evaluate(() => {
    const el = document.querySelector('.css-97987l');
    if (el) el.style.pointerEvents = 'none';});
    await item.click();

    const op1 = page.getByRole('option', { name: 'бит - bool' });
    await expect(op1).toBeVisible(); 
    await op1.click();
    await expect(item).toHaveText('1 бит - bool');

    await page.locator('div:nth-child(4) > ._node_1yclz_1').click({button: 'right'});
    await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
    await configElement.clickObject_1();

    const el1 = page.locator('div').filter({ hasText: /^Это поле обязательно для заполненияЭто поле обязательно для заполнения$/ }).nth(1);
    await expect(el1).toBeVisible();
    await el1.click();
    
    await page.locator('div').filter({ hasText: /^MB RTU1modbusRTU_slave$/ }).nth(2).click({button: 'right'});
    await configElement.clickFunctionGroup();        //2 функциональная группа
    const fg2 = page.locator('div:nth-child(6) > ._node_1yclz_1 > .chakra-stack.css-3cqz5p');
    await fg2.click();
    const item2 = page.getByRole('combobox', { name: 'Функция' });

    await item2.click();

    const op2 = page.getByRole('option', { name: '(0x03' });
    await expect(op2).toBeVisible(); 
    await op2.click();
    await expect(item2).toHaveText('(0x03) Чтение значений из нескольких регистров хранения');

    const item3 = page.getByRole('combobox', { name: 'Тип данных' });

    await page.evaluate(() => {
    const el = document.querySelector('.css-97987l');
    if (el) el.style.pointerEvents = 'none';
    });
    await item3.click();

    const op3 = page.getByRole('option', { name: '2 байта - целое без знака' });
    await expect(op3).toBeVisible(); 
    await op3.click();
    await expect(item3).toHaveText('2 байта - целое без знака');
    await page.locator('div:nth-child(6) > ._node_1yclz_1').click({button: 'right'});
    await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
    await configElement.clickObject_1(); 
    
    // 1 объект
    await el1.click();
    const fieldEl1 = page.getByRole('textbox', { name: 'Адрес информационного объекта' });
    await fieldEl1.focus();
    await expect(fieldEl1).toBeFocused();

    const errorIcon1 = page.locator('div').filter({ hasText: /^Это поле обязательно для заполненияЭто поле обязательно для заполнения$/ }).nth(4);
    
    const inputVal = '0x1';
    await fieldEl1.fill(inputVal);
    await fieldEl1.press('Enter');
    const val = await fieldEl1.inputValue();
    expect(val).toBe('0x1');
    await page.evaluate(() => document.activeElement.blur());
    await expect(errorIcon1).not.toBeVisible();
    
    // 2 объект
    const el2 = page.locator('div:nth-child(7) > ._node_1yclz_1 > .chakra-stack.css-3cqz5p > .chakra-stack.css-n3uhkm > .chakra-stack');
    await expect(el2).toBeVisible();
    await el2.click();
    /*const fieldEl2 = page.getByRole('textbox', { name: 'Адрес информационного объекта' });
    await fieldEl2.focus();*/
    const fieldEl2 = page.getByRole('textbox', { name: 'Адрес информационного объекта' });
    await fieldEl2.focus();
    await expect(fieldEl2).toBeFocused();
    await fieldEl2.fill(inputVal);
    await fieldEl2.press('Enter');
    const val2 = await fieldEl2.inputValue();
    expect(val2).toBe('0x1');
    
    // 3 объект
    await page.locator('div:nth-child(4) > ._node_1yclz_1').click({button: 'right'});
    await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
    await configElement.clickObject_1();
    const el3 = page.locator('div:nth-child(6) > ._node_1yclz_1 > .chakra-stack.css-3cqz5p > .chakra-stack.css-n3uhkm > .chakra-stack');
    await expect(el3).toBeVisible();
    
    await el3.click();
    const fieldEl3 = page.getByRole('textbox', { name: 'Адрес информационного объекта' });
    await fieldEl3.focus();
    await expect(fieldEl3).toBeFocused();

    const errorIcon3 = page.locator('svg').filter({ hasText: /^Адрес должен быть уникальным внутри родительского элемента$/ });
    await fieldEl3.fill(inputVal);
    await fieldEl3.press('Enter');
    const val3  = await fieldEl2.inputValue();
    expect(val3).toBe('0x1');
    await expect(errorIcon3).toBeVisible();

    const errorButton = page.getByRole('button', { name: 'Показать ошибки' });
    await expect(errorButton).toBeVisible();
});

test('Уникальность адреса объекта (FG-ИО)-(FG-ИО)-(FG-ИО), 4 объекта данных', async ({ page }) => {
    const config = new ConfigPage(page);
    const configElement = new ConfigPageElements(page);
        
    await config.goto();
    await config.contextMenuBroadcast();
    await config.clickComport();    
    await page.locator('div').filter({ hasText: /^COMttyS0115200comport$/ }).nth(1).click({button: 'right'});
    await configElement.clickModbusRTU_Slave();

    await page.locator('div').filter({ hasText: /^MB RTU1modbusRTU_slave$/ }).nth(1).click({button: 'right'});
    await configElement.clickFunctionGroup();       //1 функциональная группа
    
    const elf = page.locator('div').filter({ hasText: /^fg1functionGroup$/ }).first();
    await expect(elf).toBeVisible();
    await elf.click();

    const item = page.getByRole('combobox', { name: 'Тип данных' });
    await page.evaluate(() => {
    const el = document.querySelector('.css-97987l');
    if (el) el.style.pointerEvents = 'none';
    });
    await item.click();

    const op1 = page.getByRole('option', { name: 'бит - bool' });
    await expect(op1).toBeVisible(); 
    await op1.click();
    await expect(item).toHaveText('1 бит - bool');

    await page.locator('div:nth-child(4) > ._node_1yclz_1').click({button: 'right'});
    await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
    await configElement.clickObject_1();
    const el1 = page.locator('._node_1yclz_1.isLeaf > .chakra-stack.css-3cqz5p > .chakra-stack.css-n3uhkm > .chakra-stack').first();
    await expect(el1).toBeVisible();        //1 объект данный
    await el1.click();
    

    await page.locator('div').filter({ hasText: /^MB RTU1modbusRTU_slave$/ }).nth(1).click({button: 'right'});
    await configElement.clickFunctionGroup();       //2 функциональная группа
    const fg2 = page.locator('div:nth-child(6) > ._node_1yclz_1 > .chakra-stack.css-3cqz5p');
    await fg2.click();
    const item2 = page.getByRole('combobox', { name: 'Функция' });

    await item2.click();

    const op2 = page.getByRole('option', { name: '(0x03' });
    await expect(op2).toBeVisible(); 
    await op2.click();
    await expect(item2).toHaveText('(0x03) Чтение значений из нескольких регистров хранения');

    const item3 = page.getByRole('combobox', { name: 'Тип данных' });

    await page.evaluate(() => {
    const el = document.querySelector('.css-97987l');
    if (el) el.style.pointerEvents = 'none';
    });
    await item3.click();

    const op3 = page.getByRole('option', { name: '2 байта - целое без знака' });
    await expect(op3).toBeVisible(); 
    await op3.click();
    await expect(item3).toHaveText('2 байта - целое без знака');
    await page.locator('div:nth-child(6) > ._node_1yclz_1').click({button: 'right'});
    await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
    await configElement.clickObject_1(); 
    
    // 1 объект
    await el1.click();
    const fieldEl1 = page.getByRole('textbox', { name: 'Адрес информационного объекта' });
    await fieldEl1.focus();
    await expect(fieldEl1).toBeFocused();

    const errorIcon1 = page.locator('div').filter({ hasText: /^Это поле обязательно для заполненияЭто поле обязательно для заполнения$/ }).nth(4);
    
    const inputVal = '0x1';
    await fieldEl1.fill(inputVal);
    await fieldEl1.press('Enter');
    const val = await fieldEl1.inputValue();
    expect(val).toBe('0x1');
    await page.evaluate(() => document.activeElement.blur());
    await expect(errorIcon1).not.toBeVisible();
    
    // 2 объект
    const el2 = page.locator('div:nth-child(7) > ._node_1yclz_1 > .chakra-stack.css-3cqz5p > .chakra-stack.css-n3uhkm > .chakra-stack');
    await expect(el2).toBeVisible();
    await el2.click();
    /*const fieldEl2 = page.getByRole('textbox', { name: 'Адрес информационного объекта' });
    await fieldEl2.focus();*/
    const fieldEl2 = page.getByRole('textbox', { name: 'Адрес информационного объекта' });
    await fieldEl2.focus();
    await expect(fieldEl2).toBeFocused();
    await fieldEl2.fill(inputVal);
    await fieldEl2.press('Enter');
    const val2 = await fieldEl2.inputValue();
    expect(val2).toBe('0x1');
    
    // 3 объект
    await page.locator('div:nth-child(4) > ._node_1yclz_1').click({button: 'right'});
    await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
    await configElement.clickObject_1();
    const el3 = page.locator('div:nth-child(6) > ._node_1yclz_1 > .chakra-stack.css-3cqz5p > .chakra-stack.css-n3uhkm > .chakra-stack');
    await expect(el3).toBeVisible();
    
    await el3.click();
    const fieldEl3 = page.getByRole('textbox', { name: 'Адрес информационного объекта' });
    await fieldEl3.focus();
    await expect(fieldEl3).toBeFocused();

    
    await fieldEl3.fill(inputVal);
    await fieldEl3.press('Enter');
    const val3  = await fieldEl2.inputValue();
    expect(val3).toBe('0x1');
    const errorIcon3 = page.locator('svg').filter({ hasText: /^Адрес должен быть уникальным внутри родительского элемента$/ });
    await expect(errorIcon3).toBeVisible();
    
    const errorButton = page.getByRole('button', { name: 'Показать ошибки' });
    await expect(errorButton).toBeVisible();

    //4 объект 
    const el4 = page.locator('._node_1yclz_1.isLeaf.isSelected > .chakra-stack.css-3cqz5p');
    await expect(el4).toBeVisible();
    await el4.click();
    const fieldEl4 = page.getByRole('textbox', { name: 'Адрес информационного объекта' });
    await fieldEl4.focus();
    await expect(fieldEl4).toBeFocused();
    await fieldEl4.fill(inputVal);
    await fieldEl4.press('Enter');
    const val4 = await fieldEl4.inputValue();
    expect(val4).toBe('0x1');

    const errorObj = page.locator('svg').filter({ hasText: /^Адрес должен быть уникальным внутри родительского элемента$/ });
    await expect(errorObj).toBeVisible();
    await expect(errorButton).toBeVisible();

    await fieldEl4.fill('0x2');
    await fieldEl4.press('Enter');
    const val5 = await fieldEl4.inputValue();
    expect(val5).toBe('0x2');
    await expect(errorObj).not.toBeVisible();

    await page.locator('div').filter({ hasText: /^MB RTU1modbusRTU_slave$/ }).nth(1).click({button: 'right'});
    await configElement.clickFunctionGroup();       //3 функциональная группа
    const fg4 = page.locator('div:nth-child(10) > ._node_1yclz_1');
    //await fg4.click();
    /// допустим, вы определили, что нужный узел имеет индекс 3
    await page.locator('._node_1yclz_1:has-text("functionGroup")').nth(2).scrollIntoViewIfNeeded();
    await page.locator('._node_1yclz_1:has-text("functionGroup")').nth(2).click();
   
    //page.locator('div:nth-child(10) > ._node_1yclz_1');
    /*await page.locator('div').filter({ hasText: /^fg1functionGroup$/ }).nth(4).click();
  await page.locator('._node_1yclz_1.isInternal.isOpen.isSelected > .chakra-stack.css-3cqz5p') */


    const item5 = page.getByRole('combobox', { name: 'Тип данных' });
    await page.evaluate(() => {
    const el = document.querySelector('.css-97987l');
    if (el) el.style.pointerEvents = 'none';
    });
    await item5.click();

    const op5 = page.getByRole('option', { name: 'бит - bool' });
    await expect(op5).toBeVisible(); 
    await op5.click();
    await expect(item5).toHaveText('1 бит - bool');

    const erFG = page.locator('svg').filter({ hasText: 'Функция и тип данных должны быть уникальными внутри родительского элемента' }).nth(1);
    await expect(erFG).toBeVisible();
    //5 объект
    await page.locator('._node_1yclz_1:has-text("functionGroup")').nth(2).click({button: 'right'});
    await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
    await configElement.clickObject_1();
    /**page.locator('div:nth-child(11) > ._node_1yclz_1 > .chakra-stack.css-3cqz5p > .chakra-stack.css-n3uhkm > .chakra-stack').click();
  await page.locator('._node_1yclz_1.isLeaf.isSelected > .chakra-stack.css-3cqz5p').click();
  await page.locator('._node_1yclz_1.isLeaf.isSelected') 
        page.locator('div:nth-child(11) > ._node_1yclz_1').click();
  await page.getByRole('treeitem').filter({ hasText: 'Это поле обязательно для заполненияЭто поле обязательно для заполнения' }).nth(4)
  */
    const el5 = page.getByRole('treeitem').filter({ hasText: 'Это поле обязательно для заполненияЭто поле обязательно для заполнения' }).nth(4)
    /*await page.evaluate(() => {
        window.scrollBy(0,1000)
    })*/
    await page.screenshot({path:'err.png'})
    await expect(el5).toBeVisible();
    //await el5.click();
    const fieldEl5 = page.getByRole('textbox', { name: 'Адрес информационного объекта' });
    await fieldEl5.focus();
    await expect(fieldEl5).toBeFocused();
    await fieldEl5.fill(inputVal);
    await fieldEl5.press('Enter');
    const val55 = await fieldEl5.inputValue();
    expect(val55).toBe('0x1');
});
