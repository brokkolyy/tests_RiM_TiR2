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
});
    
    test('Оставить поле пустым', async ({ page }) => {
    const ErrorButton =  page.getByRole('button', { name: 'Показать ошибки' });
    await expect(ErrorButton).toBeVisible();

    const el = page.locator('div').filter({ hasText: /^Это поле обязательно для заполненияЭто поле обязательно для заполнения$/ }).nth(1);
    await expect(el).toBeVisible();
    await el.click();
    expect(page.locator('.chakra-icon.css-pgosud > path').first()); //иконка в поле 
    const field = page.getByRole('textbox', { name: 'Описание' });
    await field.focus();
    await expect(field).toBeFocused();

    await field.fill('');
    await field.press('Enter');
    
    const val = await field.inputValue();
    expect(val).toBe('');
});

    test('Ввести максимальное количество символов', async ({ page }) => {

    const ErrorButton =  page.getByRole('button', { name: 'Показать ошибки' });
    await expect(ErrorButton).toBeVisible();

    const el = page.locator('div').filter({ hasText: /^Это поле обязательно для заполненияЭто поле обязательно для заполнения$/ }).nth(1);
    await expect(el).toBeVisible();
    await el.click();
    expect(page.locator('.chakra-icon.css-pgosud > path').first()); //иконка в поле 
    const field = page.getByRole('textbox', { name: 'Описание' });
    await field.focus();
    await expect(field).toBeFocused();

    await field.fill('');
    const inputVal = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZабвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМН';     //
    await field.fill(inputVal);
    await field.press('Enter');
    
    const val = await field.inputValue();
    expect(val).toBe('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZабвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМН');
});

    test('Ввести все допустимые символы', async ({ page }) => {

    const ErrorButton =  page.getByRole('button', { name: 'Показать ошибки' });
    await expect(ErrorButton).toBeVisible();
    //await expect(page.locator('svg').filter({ hasText: 'Это поле обязательно для заполненияЭто поле обязательно для заполнения' })).toBeVisible(); //в разделе передача иконка

    const el = page.locator('div').filter({ hasText: /^Это поле обязательно для заполненияЭто поле обязательно для заполнения$/ }).nth(1);
    await expect(el).toBeVisible();
    await el.click();
    expect(page.locator('.chakra-icon.css-pgosud > path').first()); //иконка в поле 
    const field = page.getByRole('textbox', { name: 'Описание' });
    await field.focus();
    await expect(field).toBeFocused();

    await field.fill('');
    const inputVal = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ0123456789~`!@#$%^&*()-_=+[{]}\\|;:",<.>/?';     //
    await field.fill(inputVal);
    await field.press('Enter');
    
    const val = await field.inputValue();
    expect(val).toBe('АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ0123456789~`!@#$%^&*()-_=+[{]}\\|;:",<.>/?');
});

});