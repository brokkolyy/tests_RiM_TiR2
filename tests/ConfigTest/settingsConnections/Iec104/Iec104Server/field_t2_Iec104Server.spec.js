const path = require('path');
const { test, expect } = require('@playwright/test');
const ConfigPage = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPage.js'));

test.describe('Навигация', () => {
    test.beforeEach(async ({page}) => {
        const config = new ConfigPage(page);
                
        await config.goto();
        await config.contextMenuBroadcast();
        await config.clickIec104_S();

        const el = page.locator('div').filter({ hasText: /^iec104127\.0\.0\.1102iec104_server$/ }).nth(1);
        await expect(el).toBeVisible();
        await el.click();
    });

    test('Фокус в поле название элемента', async ({ page }) => {
        const field = page.getByRole('spinbutton', { name: 't2' });
        await field.focus();
        await expect(field).toBeFocused();
    });

    test('Ввод числа больше максимально допустимого', async({page}) => {
        const field = page.getByRole('spinbutton', { name: 't2' });
        await field.focus();
        await expect(field).toBeFocused();

        await field.fill('');
        const inputVal = '256';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('256');
        const err = page.locator('svg').filter({ hasText: 'Значение должно быть в диапазоне от 1 до' }).nth(1);
        await expect(err).toBeVisible();
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).toBeVisible();
    });

    test('Ввод числа максимально допустимого значение', async({page}) => {
        const field = page.getByRole('spinbutton', { name: 't2' });
        await field.focus();
        await expect(field).toBeFocused();

        await field.fill('');
        const inputVal = '255';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('255');
        const err = page.locator('svg').filter({ hasText: 'Значение должно быть в диапазоне от 1 до' }).nth(1);
        await expect(err).not.toBeVisible();
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).not.toBeVisible();
    });

    test('Ввод числа с большим количеством символов чем у максимального числа (4 и более)', async({page}) => {
        const field = page.getByRole('spinbutton', { name: 't2' });
        await field.focus();
        await expect(field).toBeFocused();

        await field.fill('');
        const inputVal = '123123';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('123123');
        const err = page.locator('svg').filter({ hasText: 'Значение должно быть в диапазоне от 1 до' }).nth(1);
        await expect(err).toBeVisible();
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).toBeVisible();
    });

    test('Ввод положительного числа меньше минимально допустимого', async({page}) => {
        const field = page.getByRole('spinbutton', { name: 't2' });
        await field.focus();
        await expect(field).toBeFocused();

        await field.fill('');
        const inputVal = '0';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('0');
        const err = page.locator('svg').filter({ hasText: 'Значение должно быть в диапазоне от 1 до' }).nth(1);
        await expect(err).toBeVisible();
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).toBeVisible();
    });

    test('Ввести минимально допустимое число', async({page}) => {
        const field = page.getByRole('spinbutton', { name: 't2' });
        await field.focus();
        await expect(field).toBeFocused();

        await field.fill('');
        const inputVal = '1';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('1');
        const err = page.locator('svg').filter({ hasText: 'Значение должно быть в диапазоне от 1 до' }).nth(1);
        await expect(err).not.toBeVisible();
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).not.toBeVisible();
    });

    test('Ввод недопустимых символов', async({page}) => {
        const field = page.getByRole('spinbutton', { name: 't2' });
        await field.focus();
        await expect(field).toBeFocused();

        await field.fill('1');
        const inputVal = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZабвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ~!@#$%^&*()-_=+[{]}\\|;:",<.>/?';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('1');
        const err = page.locator('svg').filter({ hasText: 'Значение должно быть в диапазоне от 1 до' }).nth(1);
        await expect(err).not.toBeVisible();
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).not.toBeVisible();
    });

    test('Оставить поле пустым', async({page}) => {
        const field = page.getByRole('spinbutton', { name: 't2' });
        await field.focus();
        await expect(field).toBeFocused();

        await field.fill('');
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('');
        const err = page.locator('svg').filter({ hasText: 'Значение должно быть в диапазоне от 1 до 255 Это поле обязательно для заполнения' }).nth(1);
        await expect(err).not.toBeVisible();
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).toBeVisible();
    });

    test('Ввести 0 после чего допустимое значение', async({page}) => {
        const field = page.getByRole('spinbutton', { name: 't2' });
        await field.focus();
        await expect(field).toBeFocused();

        await field.fill('');
        const inputVal = '034';
        await field.fill(inputVal);
        await field.press('Enter');
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('34');
        const err = page.locator('svg').filter({ hasText: 'Значение должно быть в диапазоне от 1 до' }).nth(1);
        await expect(err).not.toBeVisible();
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).not.toBeVisible();
    });

    test('Ввести 0 после чего недопустимое значение', async({page}) => {
        const field = page.getByRole('spinbutton', { name: 't2' });
        await field.focus();
        await expect(field).toBeFocused();

        await field.fill('');
        const inputVal = '0555342342';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('555342342');
        const err = page.locator('svg').filter({ hasText: 'Значение должно быть в диапазоне от 1 до' }).nth(1);
        await expect(err).toBeVisible();
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).toBeVisible();
    });

    test('Работоспособность кнопок (Вверх)', async({page}) => {
        const field = page.getByRole('spinbutton', { name: 't2' });
        /*await field.focus();
        await expect(field).toBeFocused();

        await field.fill('');
        const inputVal = '0555342342';
        await field.fill(inputVal);*/
        await page.getByRole('group').filter({ hasText: 't2' }).getByLabel('increment value').click();
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('2');
        const err = page.locator('svg').filter({ hasText: 'Значение должно быть в диапазоне от 1 до' }).nth(1);
        await expect(err).not.toBeVisible();
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).not.toBeVisible();
    });

    test('Работоспособность кнопок (Вниз)', async({page}) => {
        const field = page.getByRole('spinbutton', { name: 't2' });
        /*await field.focus();
        await expect(field).toBeFocused();

        await field.fill('');
        const inputVal = '0555342342';
        await field.fill(inputVal);*/
        await page.getByRole('group').filter({ hasText: 't2' }).getByLabel('decrease value').click();
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('0');
        const err = page.locator('svg').filter({ hasText: 'Значение должно быть в диапазоне от 1 до' }).nth(1);
        await expect(err).toBeVisible();
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).toBeVisible();
    });
});