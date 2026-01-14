const path = require('path');
const { test, expect } = require('@playwright/test');
const ConfigPage = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPage.js'));
const ConfigPageElements = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPageElements.js'));

async function prepareField(page) {
    const field = page.getByRole('textbox', { name: 'Адрес информационного объекта' });
    await field.focus();
    await expect(field).toBeFocused();
    await field.fill('');
    return field;
}

async function errorM(page) {
    const ErrorButton =  page.getByRole('button', { name: 'Показать ошибки' });
    await expect(ErrorButton).toBeVisible();
    await expect(page.locator('svg').filter({ hasText: 'Это поле обязательно для заполненияЭто поле обязательно для заполнения' })).toBeVisible(); //в разделе передача иконка

    const el = page.locator('div').filter({ hasText: /^Это поле обязательно для заполненияЭто поле обязательно для заполнения$/ }).nth(1);
    await expect(el).toBeVisible();
    await el.click();
}

async function errorForm(page) {
    const errorMes = page.locator('svg').filter({ hasText: /^Неверный формат адреса информационного объекта$/ });
    await expect(errorMes).toBeVisible();
}

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
});
    
    test('Ввести допустимое число 0x1', async ({ page }) => {
        await errorM(page)
        expect(page.locator('.chakra-icon.css-pgosud > path').first()); //иконка в поле 
        const field = await prepareField(page)
        const inputVal = '0x1';     //
        await field.fill(inputVal);
        await field.press('Enter');
    
        const val = await field.inputValue();
        expect(val).toBe('0x1');
        await expect(page.locator('svg').filter({ hasText: 'Это поле обязательно для заполнения' }).nth(2)).toBeVisible();
});

    test('Ввести 0 после чего допустимое значение 00x1', async ({ page }) => {
        await errorM(page)
        expect(page.locator('.chakra-icon.css-pgosud > path').first()); //иконка в поле 
        const field = await prepareField(page)
        const inputVal = '00x1';  
        await field.fill(inputVal);  
        await field.press('Enter');

        const val = await field.inputValue();
        expect(val).toBe('00x1')
        await errorForm(page)
});

    test('Ввод недопустимых символов', async ({ page }) => {
        await errorM(page)
        expect(page.locator('.chakra-icon.css-pgosud > path').first()); //иконка в поле 
        const field = await prepareField(page)
        const inputVal = 'abcdefghijklmnopqrstuvwyzABCDEFGHIJKLMNOPQRSTUVWXYZабвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ~!@#$%^&*()-_=+[{]}\\|;:",<.>/?';    
        await field.fill(inputVal);
        await field.press('Enter');

        const val = await field.inputValue();
        expect(val).toBe('abcdefghijklmnopqrstuvwyzABCDEFGHIJKLMNOPQRSTUVWXYZабвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ~!@#$%^&*()-_=+[{]}\\|;:",<.>/?')
        await errorForm(page)
});

    test('Оставить поле пустым', async ({ page }) => {
        await errorM(page)
        expect(page.locator('.chakra-icon.css-pgosud > path').first()); //иконка в поле 
        const field = await prepareField(page)
        await field.press('Enter');

        const val = await field.inputValue();
        expect(val).toBe('')
        const errorMes = page.locator('svg').filter({ hasText: 'Это поле обязательно для заполнен' }).nth(1);
        await expect(errorMes).toBeVisible();
});

    test('Ввести 0 после чего недопустимое значение', async ({ page }) => {
        await errorM(page)
        expect(page.locator('.chakra-icon.css-pgosud > path').first()); //иконка в поле 
        const field = await prepareField(page)
        const inputVal = '055588';    
        await field.fill(inputVal);
        await field.press('Enter');

        const val = await field.inputValue();
        expect(val).toBe('055588')
        await errorForm(page)
});

    test('Ввести цифру, пробел и ещё одну цифру', async ({ page }) => {
        await errorM(page)
        expect(page.locator('.chakra-icon.css-pgosud > path').first()); //иконка в поле 
        const field = await prepareField(page)
        const inputVal = '0 x 1';    
        await field.fill(inputVal);
        await field.press('Enter');

        const val = await field.inputValue();
        expect(val).toBe('0 x 1')
        await errorForm(page)
});

    test('Ввести минимально допустимое шестнадцатеричное значение', async ({ page }) => {
        await errorM(page)
        expect(page.locator('.chakra-icon.css-pgosud > path').first()); //иконка в поле 
        const field = await prepareField(page)
        const inputVal = '0x0';    
        await field.fill(inputVal);
        await field.press('Enter');

        const val = await field.inputValue();
        expect(val).toBe('0x0')
        await errorForm(page)
});

    test('Ввести недопустимое шестнадцатеричное значение(число)x(число)', async ({ page }) => {
        await errorM(page)
        expect(page.locator('.chakra-icon.css-pgosud > path').first()); //иконка в поле 
        const field = await prepareField(page)
        const inputVal = '1x000000';    
        await field.fill(inputVal);
        await field.press('Enter');

        const val = await field.inputValue();
        expect(val).toBe('1x000000')
        await errorForm(page)
});

    test('Ввести допустимое шестнадцатеричное значение без 0 в начале', async ({ page }) => {
        await errorM(page)
        expect(page.locator('.chakra-icon.css-pgosud > path').first()); //иконка в поле 
        const field = await prepareField(page)
        const inputVal = 'x012';    
        await field.fill(inputVal);
        await field.press('Enter');

        const val = await field.inputValue();
        expect(val).toBe('x012')
        await errorForm(page)
});

    test('Ввести максимально допустимое шестнадцатеричное значение ', async ({ page }) => {
        await errorM(page)
        expect(page.locator('.chakra-icon.css-pgosud > path').first()); //иконка в поле 
        const field = await prepareField(page)
        const inputVal = '0xFFFF';    
        await field.fill(inputVal);
        await field.press('Enter');

        const val = await field.inputValue();
        expect(val).toBe('0xFFFF')
        
    });

    test('Ввести больше максимально допустимого шестнадцатеричного значения', async ({ page }) => {
        await errorM(page)
        expect(page.locator('.chakra-icon.css-pgosud > path').first()); //иконка в поле 
        const field = await prepareField(page)
        const inputVal = '0xFFFFA';    
        await field.fill(inputVal);
        await field.press('Enter');

        const val = await field.inputValue();
        expect(val).toBe('0xFFFFA')
        const errorMes = page.locator('svg').filter({ hasText: /^Значение должно быть в диапазоне от 0x0 до 0xffff$/ });
        await expect(errorMes).toBeVisible();
    });

    test('Ввести допустимое шестнадцатеричное значение в части после x поставить пробел', async ({ page }) => {
        await errorM(page)
        expect(page.locator('.chakra-icon.css-pgosud > path').first()); //иконка в поле 
        const field = await prepareField(page)
        const inputVal = '0x12 12';    
        await field.fill(inputVal);
        await field.press('Enter');

        const val = await field.inputValue();
        expect(val).toBe('0x12 12')
        await errorForm(page)
    });
});