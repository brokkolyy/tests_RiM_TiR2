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
        const field = page.getByRole('textbox', { name: 'Название' });
        await field.focus();
        await expect(field).toBeFocused();
    });

    test('Максимальная длина (30 символов)', async({page}) => {
        const field = page.getByRole('textbox', { name: 'Название' });
        await field.focus();
        await expect(field).toBeFocused();

        await field.fill('');
        const inputVal = 'qwertyuiopasdfghjklzxcvbnmqw_1';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('qwertyuiopasdfghjklzxcvbnmqw_1');

        const err = page.locator('svg').filter({ hasText: 'Имя узла должно начинаться с буквы или подчеркивания и содержать только латински' }).nth(1);
        await expect(err).not.toBeVisible();
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).not.toBeVisible();
    });

    test('Ввод допустимых символов больше максимальной длины', async ({ page }) => {
        const field = page.getByRole('textbox', { name: 'Название' });
        await field.focus();
        await expect(field).toBeFocused();

        await field.fill('');
        const inputVal = 'qwertyuiopasdfghjklzxcvbnmqw_1r';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('qwertyuiopasdfghjklzxcvbnmqw_1r');

        const err = page.locator('svg').filter({ hasText: 'Имя узла должно начинаться с буквы или подчеркивания и содержать только латински' }).nth(1);
        await expect(err).not.toBeVisible();
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).toBeVisible();
    });

    test('Ввод минимальной длины (1 символ)', async ({ page }) => {
        const field = page.getByRole('textbox', { name: 'Название' });
        await field.focus();
        await expect(field).toBeFocused();

        await field.fill('');
        const inputVal = 'f';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('f');
        const err = page.locator('svg').filter({ hasText: 'Имя узла должно начинаться с буквы или подчеркивания и содержать только латински' }).nth(1);
        await expect(err).not.toBeVisible();
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).not.toBeVisible();
    });

    test('Ввод недопустимых символов', async ({ page }) => {
        const field = page.getByRole('textbox', { name: 'Название' });
        await field.focus();
        await expect(field).toBeFocused();

        await field.fill('');
        const inputVal = 'ЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮйцукенгшщзхъфывапролджэячсмитьбю-.,_=+\/|":;><?!№%?*()`~@#$&';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('ЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮйцукенгшщзхъфывапролджэячсмитьбю-.,_=+\/|":;><?!№%?*()`~@#$&');
        const err = page.locator('svg').filter({ hasText: 'Имя узла должно начинаться с буквы или подчеркивания и содержать только латински' }).nth(1);
        await expect(err).toBeVisible();
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).toBeVisible();
    });

    test('Оставить поле пустым', async ({ page }) => {
        const field = page.getByRole('textbox', { name: 'Название' });
        await field.focus();
        await expect(field).toBeFocused();

        await field.fill('');
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('');
        const err = page.locator('svg').filter({ hasText: 'Имя узла должно начинаться с буквы или подчеркивания и содержать только латински' }).nth(1);
        await expect(err).toBeVisible();
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).toBeVisible();
    });

    test('Ввод только чисел', async ({ page }) => {
        const field = page.getByRole('textbox', { name: 'Название' });
        await field.focus();
        await expect(field).toBeFocused();

        await field.fill('');
        const inputVal = '12345';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('12345');
        const err = page.locator('svg').filter({ hasText: 'Имя узла должно начинаться с буквы или подчеркивания и содержать только латински' }).nth(1);
        await expect(err).toBeVisible();
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).toBeVisible();
    });

    test('Ввести сначала цифру, потом букву', async ({ page }) => {
        const field = page.getByRole('textbox', { name: 'Название' });
        await field.focus();
        await expect(field).toBeFocused();

        await field.fill('');
        const inputVal = '1test';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('1test');
        const err = page.locator('svg').filter({ hasText: 'Имя узла должно начинаться с буквы или подчеркивания и содержать только латински' }).nth(1);
        await expect(err).toBeVisible();
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).toBeVisible();
    });

    test('Ввод символов через пробел', async ({ page }) => {
        const field = page.getByRole('textbox', { name: 'Название' });
        await field.focus();
        await expect(field).toBeFocused();

        await field.fill('');
        const inputVal = 'gp io';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('gp io');
        const err = page.locator('svg').filter({ hasText: 'Имя узла должно начинаться с буквы или подчеркивания и содержать только латински' }).nth(1);
        await expect(err).toBeVisible();
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).toBeVisible();
    });
});