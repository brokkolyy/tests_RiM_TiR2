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
    
test('Ввод числа с максимальной длиной (3 символа) и максимально допустимого значение', async ({ page }) => {
    const field = page.getByRole('spinbutton', { name: 'Адрес устройства' });
    await field.focus();

    await expect(field).toBeFocused();

    await field.fill('1');
    const inputVal = '255';
    await field.fill(inputVal);
    await page.locator('.css-1dtqfaw').click();
    const val = await field.inputValue();
    expect(val).toBe('255');
});


test('Ввести число больше максимально допустимого значения', async ({ page }) => {
    const field = page.getByRole('spinbutton', { name: 'Адрес устройства' });
    await field.focus();

    await expect(field).toBeFocused();

    await field.fill('1');
    const inputVal = '256';
    await field.fill(inputVal);
    await page.locator('.css-1dtqfaw').click();
    const val = await field.inputValue();
    expect(val).toBe('256');
    const errIcon = page.locator('svg').filter({ hasText: 'Значение должно быть в диапазоне от 1 до' }).nth(1);
    await expect(errIcon).toBeVisible();
    const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
    await expect(buttonError).toBeVisible();
});

test('Проверить работоспособность кнопок вверх', async ({ page }) => {
    const field = page.getByRole('spinbutton', { name: 'Адрес устройства' });
    await field.focus();

    await expect(field).toBeFocused();

    const inc = page.getByRole('group').filter({ hasText: 'Адрес устройства' }).getByLabel('increment value');
    await field.fill('1');
    await inc.click();
    await page.locator('.css-1dtqfaw').click();
    const val = await field.inputValue();
    expect(val).toBe('2');
});

test('Проверить работоспособность кнопок вниз', async ({ page }) => {
    const field = page.getByRole('spinbutton', { name: 'Адрес устройства' });
    await field.focus();

    await expect(field).toBeFocused();

    const inc = page.getByRole('group').filter({ hasText: 'Адрес устройства' }).getByLabel('decrease value');
    await field.fill('5');
    await inc.click(3);
    await page.locator('.css-1dtqfaw').click();
    const val = await field.inputValue();
    expect(val).toBe('4');
});

test('Ввод числа с большим количеством символов чем у максимального числа (4 и более)', async ({ page }) => {
    const field = page.getByRole('spinbutton', { name: 'Адрес устройства' });
    await field.focus();

    await expect(field).toBeFocused();

    await field.fill('1');
    const inputVal = '123123';
    await field.fill(inputVal);
    await page.locator('.css-1dtqfaw').click();
    const val = await field.inputValue();
    expect(val).toBe('123123');
    const errIcon = page.locator('svg').filter({ hasText: 'Значение должно быть в диапазоне от 1 до' }).nth(1);
    await expect(errIcon).toBeVisible();
    const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
    await expect(buttonError).toBeVisible();
});

test('Ввод минимальной длины (1 символ)', async ({ page }) => {
    const field = page.getByRole('spinbutton', { name: 'Адрес устройства' });
    await field.focus();

    await expect(field).toBeFocused();

    await field.fill('1');
    const inputVal = '1';
    await field.fill(inputVal);
    await page.locator('.css-1dtqfaw').click();
    const val = await field.inputValue();
    expect(val).toBe('1');
});

test('Ввести число меньше минимального допустимого значения', async ({ page }) => {
    const field = page.getByRole('spinbutton', { name: 'Адрес устройства' });
    await field.focus();
    await expect(field).toBeFocused();

    await field.fill('1');
    const inputVal = '0';
    await field.fill(inputVal);
    await page.locator('.css-1dtqfaw').click();
    const val = await field.inputValue();
    expect(val).toBe('0');
    const errIcon = page.locator('svg').filter({ hasText: 'Значение должно быть в диапазоне от 1 до' }).nth(1);
    await expect(errIcon).toBeVisible();
    const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
    await expect(buttonError).toBeVisible();
});

test('Ввод недопустимых символов', async ({ page }) => {
    const field = page.getByRole('spinbutton', { name: 'Адрес устройства' });
    await field.focus();

    await expect(field).toBeFocused();

    await field.fill('1');
    const inputVal = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZабвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ~!@#$%^&*()-_=+[{]}\\|;:",<.>/?';
    await field.fill(inputVal);
    //await page.locator('.css-1dtqfaw').click();
    await field.press('Enter');
    const val = await field.inputValue();
    expect(val).toBe('1');
});

test('Оставить поле пустым и нажать фон', async ({ page }) => {
    const field = page.getByRole('spinbutton', { name: 'Адрес устройства' });
    await field.focus();

    await expect(field).toBeFocused();

    await field.fill('');
    await page.locator('.css-1dtqfaw').click();
    const val = await field.inputValue();
    expect(val).toBe('');
    const errIcon = page.locator('svg').filter({ hasText: 'Это поле обязательно для заполнения' }).nth(1);
    await expect(errIcon).toBeVisible();
    const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
    await expect(buttonError).toBeVisible();
});

test('Ввести 0 после чего допустимое значение', async ({ page }) => {
    const field = page.getByRole('spinbutton', { name: 'Адрес устройства' });
    await field.focus();

    await expect(field).toBeFocused();

    await field.fill('');
    const inputVal = '034';
    await field.fill(inputVal);
    //await page.locator('.css-1dtqfaw').click();
    await field.press('Enter');
    const val = await field.inputValue();
    expect(val).toBe('34');
});

test('Ввести 0 после чего недопустимое значение', async ({ page }) => {
    const field = page.getByRole('spinbutton', { name: 'Адрес устройства' });
    await field.focus();

    await expect(field).toBeFocused();

    await field.fill('');
    const inputVal = '0555';
    await field.fill(inputVal);
    //await page.locator('.css-1dtqfaw').click();
    await field.press('Enter');
    const val = await field.inputValue();
    expect(val).toBe('555');
    const errIcon = page.locator('svg').filter({ hasText: 'Значение должно быть в диапазоне от 1 до' }).nth(1);
    await expect(errIcon).toBeVisible();
    const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
    await expect(buttonError).toBeVisible();
});

test('Ввести цифру, пробел и ещё одну цифру', async ({ page }) => {
    const field = page.getByRole('spinbutton', { name: 'Адрес устройства' });
    await field.focus();
    await expect(field).toBeFocused();

    await field.fill('');
    const inputVal = '2 3';
    await field.fill(inputVal);
    //await page.locator('.css-1dtqfaw').click();
    await field.press('Enter');
    const val = await field.inputValue();
    expect(val).toBe('2');
    const errIcon = page.locator('svg').filter({ hasText: 'Это поле обязательно для заполнения' }).nth(1);
    await expect(errIcon).toBeVisible();
    const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
    await expect(buttonError).toBeVisible();
});
});