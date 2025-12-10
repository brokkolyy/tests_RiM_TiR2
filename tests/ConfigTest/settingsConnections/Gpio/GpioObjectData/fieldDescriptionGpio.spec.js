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
        await config.clickGpio();
                        
        await page.locator('div').filter({ hasText: /^gpio200gpio$/ }).nth(1).click({button:'right'});
        await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover()
        await configElement.clickObject_1();
        const el = page.locator('div').filter({ hasText: /^1inЭто поле обязательно для заполнения$/ }).nth(1)
        await expect(el).toBeVisible();
        await el.click();
    });

    test('Фокус в поле название элемента', async ({ page }) => {
        const field = page.getByRole('textbox', { name: 'Описание' });
        await field.focus();
        await expect(field).toBeFocused();
    });

    test('Ввести максимальное количество символов', async ({ page }) => {
        const field = page.getByRole('textbox', { name: 'Описание' });
        await field.focus();
        await expect(field).toBeFocused();

        await field.fill('');
        const inputVal = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZабвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМН';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZабвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМН');;
    });

    test('Ввести все допустимые символы ', async ({ page }) => {
        const field = page.getByRole('textbox', { name: 'Описание' });
        await field.focus();
        await expect(field).toBeFocused();

        await field.fill('');
        const inputVal = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZабвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ0123456789~`!@#$%^&*()-_=+[{]}\\|;:",<.>/? ';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZабвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ0123456789~`!@#$%^&*()-_=+[{]}\\|;:",<.>/? ');
    });
});