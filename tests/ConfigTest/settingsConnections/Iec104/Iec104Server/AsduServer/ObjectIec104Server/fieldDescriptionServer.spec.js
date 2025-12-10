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
        await config.clickIec104_S();
                                
        await page.locator('div').filter({ hasText: /^iec104127\.0\.0\.1102iec104_server$/ }).nth(1).click({button:'right'});
        await configElement.clickAsdu();
        await page.locator('div').filter({ hasText: /^asdu1asdu$/ }).nth(1).click({button:'right'});
        await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
        await configElement.clickObject_1();
        const el = page.locator('div').filter({ hasText: /^ts1Это поле обязательно для заполненияЭто поле обязательно для заполнения$/ }).nth(1);
        await expect(el).toBeVisible();
        await el.click();
    });

    test('Фокус в поле название элемента', async ({ page }) => {
        const field = page.getByRole('spinbutton', { name: 'Адрес информационного объекта' });
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