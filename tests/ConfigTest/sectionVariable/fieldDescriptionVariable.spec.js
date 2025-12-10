const path = require('path');
const { test, expect } = require('@playwright/test');
const ConfigPage = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPage.js'));

test.describe('Навигация', () => {
    test.beforeEach(async ({page}) => {
        const config = new ConfigPage(page);
        await config.goto();
        await config.contextMenuVariable();
        await page.getByRole('menuitem', { name: 'Создать переменную', exact: true }).hover();
        await config.clickVariable_1();

        const el = page.locator('div').filter({ hasText: /^variable$/ }).nth(1);
        await expect(el).toBeVisible();
        await el.click();
    });

    test('Оставить поле пустым', async ({ page }) => {
    const field = page.getByRole('textbox', { name: 'Описание' });
    await field.focus();
    await expect(field).toBeFocused();

    await field.fill('');
    await field.press('Enter');
    const val = await field.inputValue();
    expect(val).toBe('');
});

    test('Ввести максимальное количество символов', async ({ page }) => {
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