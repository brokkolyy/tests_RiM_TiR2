const path = require('path');
const { test, expect } = require('@playwright/test');
const ConfigPage = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPage.js'));

test.describe('Навигация', () => {
    test.beforeEach(async ({page}) => {
        const config = new ConfigPage(page);
        
        await config.goto();
        await config.contextMenuReception();
        await config.clickModbusTCP_C();
        const el = page.locator('div').filter({ hasText: /^MB TCP127\.0\.0\.1502modbusTCP_client$/ }).nth(1);
        await expect(el).toBeVisible();
        await el.click();
    });

    test('Фокус в поле название элемента', async ({ page }) => {
        const field = page.getByRole('spinbutton', { name: 'Пауза между опросами, мс' })
        await field.focus();
        await expect(field).toBeFocused();
    });

    test('Ввести число больше максимально допустимого значения', async ({page}) => {
        const field = page.getByRole('spinbutton', { name: 'Пауза между опросами, мс' })
        await field.focus();
        await expect(field).toBeFocused();
    
        await field.fill('');            
        const inputVal = '10001';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('10001');
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).toBeVisible();
    });

    test('Ввод числа с максимальной длиной (5 символа) и максимально допустимого значение', async ({page}) => {
        const field = page.getByRole('spinbutton', { name: 'Пауза между опросами, мс' })
        await field.focus();
        await expect(field).toBeFocused();
    
        await field.fill('');
        const inputVal = '10000';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('10000');
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).not.toBeVisible();
    });

    test('Ввод числа с большим количеством символов чем у максимального числа (5 и более)', async ({page}) => {
        const field = page.getByRole('spinbutton', { name: 'Пауза между опросами, мс' })
        await field.focus();
        await expect(field).toBeFocused();
    
        await field.fill('');
        const inputVal = '1231232';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('1231232');
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).toBeVisible();
    });

    test('Ввод минимальной длины (1 символ)', async ({page}) => {
        const field = page.getByRole('spinbutton', { name: 'Пауза между опросами, мс' })
        await field.focus();
        await expect(field).toBeFocused();
    
        await field.fill('');
        const inputVal = '1231232';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('1231232');
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).not.toBeVisible();
    });

    test('Ввод недопустимых символов', async ({page}) => {
        const field = page.getByRole('spinbutton', { name: 'Пауза между опросами, мс' })
        await field.focus();
        await expect(field).toBeFocused();
    
        await field.fill('');
        const inputVal = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZабвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ~!@#$%^&*()-_=+[{]}\\|;:",<.>/?';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('');
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).not.toBeVisible();
    });

    test('Оставить поле пустым и нажать фон', async ({page}) => {
        const field = page.getByRole('spinbutton', { name: 'Пауза между опросами, мс' })
        await field.focus();
        await expect(field).toBeFocused();
    
        await field.fill('');
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('');
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).toBeVisible();
    });

    test('Ввести 0 после чего допустимое значение', async ({page}) => {
        const field = page.getByRole('spinbutton', { name: 'Пауза между опросами, мс' })
        await field.focus();
        await expect(field).toBeFocused();
    
        await field.fill('');
        const inputVal = '034';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('034');
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).not.toBeVisible();
    });

    test('Ввести 0 после чего недопустимое значение', async ({page}) => {
        const field = page.getByRole('spinbutton', { name: 'Пауза между опросами, мс' })
        await field.focus();
        await expect(field).toBeFocused();
    
        await field.fill('');
        const inputVal = '0555';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('555');
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).toBeVisible();
    });

    test('Ввести цифру, пробел и ещё одну цифру', async ({page}) => {
        const field = page.getByRole('spinbutton', { name: 'Пауза между опросами, мс' })
        await field.focus();
        await expect(field).toBeFocused();
    
        await field.fill('');
        const inputVal = '2 3';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('2 3');
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).not.toBeVisible();
    });

    test('Проверить работоспособность кнопок вверх/вниз', async ({page}) => {
        const field = page.getByRole('spinbutton', { name: 'Пауза между опросами, мс' })
        await field.getByLabel('increment value').click();

        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('71');

        await field.getByLabel('decrease value').click();
        await field.press('Enter');
        const val2 = await field.inputValue();
        expect(val2).toBe('70');
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).not.toBeVisible();
    });
});