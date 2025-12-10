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

    test('Фокус в поле название элемента', async ({ page }) => {
        const field = page.getByRole('textbox', { name: 'Название' });
        await field.focus();
        await expect(field).toBeFocused();
    });

    test('Максимальная длина (30 символов)', async ({ page }) => {
        const field = page.getByRole('textbox', { name: 'Название' });
        await field.focus();
        await expect(field).toBeFocused();

        await field.fill('');
        const inputVal = 'test1test1test1test1test1test1';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('test1test1test1test1test1test1');
        const err = page.locator('svg').filter({ hasText: 'Имя узла должно начинаться с буквы или подчеркивания и содержать только латински' }).first();
        await expect(err).not.toBeVisible();
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).not.toBeVisible();
    });

    test('Ввод больше максимальной длины (1 буква)', async ({ page }) => {
        const field = page.getByRole('textbox', { name: 'Название' });
        await field.focus();
        await expect(field).toBeFocused();

        await field.fill('');
        const inputVal = 'test1test1test1test1test1test1test1';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('test1test1test1test1test1test1test1');
        const err = page.locator('svg').filter({ hasText: 'Имя узла должно начинаться с буквы или подчеркивания и содержать только латински' }).first();
        await expect(err).not.toBeVisible();
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).not.toBeVisible();
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
        const err = page.locator('svg').filter({ hasText: 'Имя узла должно начинаться с буквы или подчеркивания и содержать только латински' }).first();
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
        const err = page.locator('svg').filter({ hasText: 'Имя узла должно начинаться с буквы или подчеркивания и содержать только латински' }).first();
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
        const err = page.locator('svg').filter({ hasText: 'Имя узла должно начинаться с буквы или подчеркивания и содержать только латински' }).first();
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
        const err = page.locator('svg').filter({ hasText: 'Имя узла должно начинаться с буквы или подчеркивания и содержать только латински' }).first();
        await expect(err).toBeVisible();
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).toBeVisible();
    });
});
