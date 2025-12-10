const path = require('path');
const { test, expect } = require('@playwright/test');
const ConfigPage = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPage.js'));
const ConfigPageElements = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPageElements.js'));

test.describe('Навигация', () => {
    test.beforeEach(async ({page}) => {
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
        await configElement.clickObject_1();
    
    });


test('Фокус в поле описание объекта данных', async ({ page }) => {
    const el1 = page.locator('._node_1yclz_1.isLeaf > .chakra-stack.css-3cqz5p > .chakra-stack.css-n3uhkm > .chakra-stack')
    await expect(el1).toBeVisible();

    await el1.click();
    const field = page.getByRole('textbox', { name: 'Описание' });
    await field.focus();
    await expect(field).toBeFocused();
});

test('Ввести минимальное количество символов', async ({ page }) => {
    const el1 = page.locator('._node_1yclz_1.isLeaf > .chakra-stack.css-3cqz5p > .chakra-stack.css-n3uhkm > .chakra-stack');
    await expect(el1).toBeVisible();

    await el1.click();
    const field = page.getByRole('textbox', { name: 'Описание' });
    await field.focus();
    await expect(field).toBeFocused();

    await field.fill('');
    await field.press('Enter');
    const val = await field.inputValue();
    expect(val).toBe('');

});

test('Ввести максимальное количество символов', async ({ page }) => {
    const el1 = page.locator('._node_1yclz_1.isLeaf > .chakra-stack.css-3cqz5p > .chakra-stack.css-n3uhkm > .chakra-stack');
    await expect(el1).toBeVisible();

    await el1.click();
    const field = page.getByRole('textbox', { name: 'Описание' });
    await field.focus();
    await expect(field).toBeFocused();

    await field.fill('');
    const inputVal = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZабвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМН';
    await field.fill(inputVal);
    await field.press('Enter');
    const val = await field.inputValue();
    expect(val).toBe('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZабвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМН');
});

test('Ввести все допустимые символы', async ({ page }) => {
    const el1 = page.locator('._node_1yclz_1.isLeaf > .chakra-stack.css-3cqz5p > .chakra-stack.css-n3uhkm > .chakra-stack');
    await expect(el1).toBeVisible();

    await el1.click();
    const field = page.getByRole('textbox', { name: 'Описание' });
    await field.focus();
    await expect(field).toBeFocused();

    await field.fill('');
    const inputVal = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZабвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ0123456789~`!@#$%^&*()-_=+[{]}\\|;:",<.>/?';
    await field.fill(inputVal);
    await field.press('Enter');
    const val = await field.inputValue();
    expect(val).toBe('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZабвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ0123456789~`!@#$%^&*()-_=+[{]}\\|;:",<.>/?');
});
});