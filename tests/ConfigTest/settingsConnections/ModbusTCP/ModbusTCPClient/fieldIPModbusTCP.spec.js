const path = require('path');
const { test, expect } = require('@playwright/test');
const ConfigPage = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPage.js'));

async function prepareField(page) {
    const field = page.getByRole('textbox', { name: 'Название' });
    await field.focus();
    await expect(field).toBeFocused();
    await field.fill('');
    return field;
}

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

   test('Ввод в поле “IP-адреса”', async({page}) => {
        const field = await prepareField(page)
        const inputVal = '127.0.0.1';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('127.0.0.1');
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).not.toBeVisible();
    });

    test('Оставить поле “IP-адреса” пустым', async({page}) => {
        const field = await prepareField(page)
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('');
        const err = page.locator('svg').filter({ hasText: 'Это поле обязательно для заполнения' }).nth(1);
        expect(err).toBeVisible();
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).toBeVisible();
    });

    test('Ввод недопустимых символов', async({page}) => {
        const field = await prepareField(page)
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
        const field = await prepareField(page)
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
        const field = await prepareField(page)
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
        const field = await prepareField(page)
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
        const field = await prepareField(page)
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