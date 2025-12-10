const path = require('path');
const { test, expect } = require('@playwright/test');
const ConfigPage = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPage.js'));

test.describe('Навигация', () => {
    test.beforeEach(async ({page}) => {
        const config = new ConfigPage(page);
                
        await config.goto();
        await config.contextMenuBroadcast();
        await config.clickModbusTCP_S();

        const el = page.locator('div').filter({ hasText: /^MB TCP127\.0\.0\.1502modbusTCP_server$/ }).nth(1);
        await expect(el).toBeVisible();
        await el.click();
    });

    test('Фокус в поле название элемента', async ({ page }) => {
        const field = page.getByRole('textbox', { name: 'Название' });
        await field.focus();
        await expect(field).toBeFocused();
    });

   test('Ввод в поле “IP-адреса”', async({page}) => {
        const field = page.getByRole('textbox', { name: 'IP-адрес' });
        await field.focus();
        await expect(field).toBeFocused();

        await field.fill('');
        const inputVal = '127.0.0.1';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('127.0.0.1');
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).not.toBeVisible();
    });

    test('Оставить поле “IP-адреса” пустым', async({page}) => {
        const field = page.getByRole('textbox', { name: 'IP-адрес' });
        await field.focus();
        await expect(field).toBeFocused();

        await field.fill('');
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('');
        const err = page.locator('svg').filter({ hasText: 'Это поле обязательно для заполнения' }).nth(1);
        expect(err).toBeVisible();
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).toBeVisible();
    });

    test('Ввод недопустимых символов', async({page}) => {
        const field = page.getByRole('textbox', { name: 'IP-адрес' });
        await field.focus();
        await expect(field).toBeFocused();

        await field.fill('');
        const inputVal = 'йцуЙЦУQWEqwe,/?<>;:"\|{}[]())_+-=';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('йцуЙЦУQWEqwe,/?<>;:"\|{}[]())_+-=');
        const er = page.locator('svg').filter({ hasText: 'Неверный формат IP' }).nth(1);
        await expect(er).toBeVisible();
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).toBeVisible();
    });

    test('Ввод одной цифры', async({page}) => {
        const field = page.getByRole('textbox', { name: 'IP-адрес' });
        await field.focus();
        await expect(field).toBeFocused();

        await field.fill('');
        const inputVal = '1';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('1');
        const er = page.locator('svg').filter({ hasText: 'Неверный формат IP' }).nth(1);
        await expect(er).toBeVisible();
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).toBeVisible();
    });

    test('Ввод неверного формата IP-адреса', async({page}) => {
        const field = page.getByRole('textbox', { name: 'IP-адрес' });
        await field.focus();
        await expect(field).toBeFocused();

        await field.fill('');
        const inputVal = '123.123.123.123.123';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('123.123.123.123.123');

        const er = page.locator('svg').filter({ hasText: 'Неверный формат IP' }).nth(1);
        await expect(er).toBeVisible();
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).toBeVisible();
    });

    test('Ввод максимального числа', async({page}) => {
        const field = page.getByRole('textbox', { name: 'IP-адрес' });
        await field.focus();
        await expect(field).toBeFocused();

        await field.fill('');
        const inputVal = '255.255.255.255';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('255.255.255.255');

        const er = page.locator('svg').filter({ hasText: 'Неверный формат IP' }).nth(1);
        await expect(er).not.toBeVisible();
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).not.toBeVisible();
    });

    test('Ввод больше максимального ip-адреса', async({page}) => {
        const field = page.getByRole('textbox', { name: 'IP-адрес' });
        await field.focus();
        await expect(field).toBeFocused();

        await field.fill('');
        const inputVal = '256.256.256.256';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('256.256.256.256');

        const er = page.locator('svg').filter({ hasText: 'Неверный формат IP' }).nth(1);
        await expect(er).toBeVisible();
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).toBeVisible();
    });
});