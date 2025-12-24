const path = require('path');
const { test, expect } = require('@playwright/test');
const ConfigPage = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPage.js'));

test.describe('Навигация', () => {
    test.beforeEach(async ({page}) => {
        const config = new ConfigPage(page);
        await config.goto();
        await config.buttonConfigClick();
        
        await expect(page.getByRole('menu', { name: 'Конфигурация' })).toBeVisible();
        const open = page.getByRole('menuitem', { name: 'Редактировать' });
        await open.click();
        const zone =  page.locator('div').filter({ hasText: /^Редактирование конфигурации$/ });
        await expect(zone).toBeVisible();
    });

    test('Оставить поле пустым', async ({ page }) => {
    const field = page.getByRole('textbox', { name: 'Описание' });
    await field.focus();
    await expect(field).toBeFocused();

    await field.fill('');
    const val = await field.inputValue();
    expect(val).toBe('');
    const save = page.getByRole('button', { name: 'Сохранить' });
    await save.click();
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
    const save = page.getByRole('button', { name: 'Сохранить' });
    await save.click();

});

    test('Ввести все допустимые символы', async ({ page }) => {
    const field = page.getByRole('textbox', { name: 'Описание' });
    await field.focus();
    await expect(field).toBeFocused();

    await field.fill('');
    const inputVal = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ0123456789~`!@#$%^&*()-_=+[{]}|;:",<.>/?';     //
    await field.fill(inputVal);
    await field.press('Enter');
    
    const val = await field.inputValue();
    expect(val).toBe('АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ0123456789~`!@#$%^&*()-_=+[{]}|;:",<.>/?');
    const save = page.getByRole('button', { name: 'Сохранить' });
    await save.click();
});

});