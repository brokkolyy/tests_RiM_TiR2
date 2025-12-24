const path = require('path');
const { test, expect } = require('@playwright/test');
const { exec } = require('child_process');
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

    test('Ввод максимальной длины имени конфигурации(50 символов)', async ({page}) => {
        const field = page.getByRole('textbox', { name: 'Имя конфигурации' });
        await field.focus();
        await expect(field).toBeFocused();

        await field.fill('');
        const inputVal = 'TestTestTestTestTestTestTestTestTestTestTestTestTe';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('TestTestTestTestTestTestTestTestTestTestTestTestTe');
        const save = page.getByRole('button', { name: 'Сохранить' });
        await save.click();
        await expect(page.getByText('TestTestTestTestTestTestTestTestTestTestTestTestTe')).toBeVisible();
    });

    test('Ввод больше максимальной длины имени конфигурации(51 символ)', async ({page}) => {
        const field = page.getByRole('textbox', { name: 'Имя конфигурации' });
        await field.focus();
        await expect(field).toBeFocused();

        await field.fill('');
        const inputVal = 'TestTestTestTestTestTestTestTestTestTestTestTestTest';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('TestTestTestTestTestTestTestTestTestTestTestTestTe');
        const save = page.getByRole('button', { name: 'Сохранить' });
        await save.click();
        await expect(page.getByText('TestTestTestTestTestTestTestTestTestTestTestTestTe')).toBeVisible();
    });

    test('Ввод меньше минимальной длины имени(3 символа)', async ({page}) => {
        const field = page.getByRole('textbox', { name: 'Имя конфигурации' });
        await field.focus();
        await expect(field).toBeFocused();

        await field.fill('');
        const inputVal = 'abc';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('abc');
        const save = page.getByRole('button', { name: 'Сохранить' });
        await expect(save).toBeDisabled();
    });

    test('Ввод минимальной длины имени (4 символа)', async ({page}) => {
        const field = page.getByRole('textbox', { name: 'Имя конфигурации' });
        await field.focus();
        await expect(field).toBeFocused();

        await field.fill('');
        const inputVal = 'Test';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('Test');
        const save = page.getByRole('button', { name: 'Сохранить' });
        await save.click();
        await expect(page.getByText('Test')).toBeVisible();
    });

    test('Оставить поле пустым', async ({page}) => {
        const field = page.getByRole('textbox', { name: 'Имя конфигурации' });
        await field.focus();
        await expect(field).toBeFocused();

        await field.fill('');
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('');
        const save = page.getByRole('button', { name: 'Сохранить' });
        await expect(save).toBeDisabled();
    });

    test('Ввод символов через пробел', async ({page}) => {
        const field = page.getByRole('textbox', { name: 'Имя конфигурации' });
        await field.focus();
        await expect(field).toBeFocused();

        await field.fill('');
        const inputVal = 'test 1';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('test 1');
        const save = page.getByRole('button', { name: 'Сохранить' });
        await save.click();
        await expect(page.getByText('test 1')).toBeVisible();
    });

    test('Ввод чисел', async ({page}) => {
        const field = page.getByRole('textbox', { name: 'Имя конфигурации' });
        await field.focus();
        await expect(field).toBeFocused();

        await field.fill('');
        const inputVal = '1234567';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('1234567');
        const save = page.getByRole('button', { name: 'Сохранить' });
        await save.click();
        await expect(page.getByText('1234567')).toBeVisible();
    });

    test('Ввод специальных символов', async ({page}) => {
        const field = page.getByRole('textbox', { name: 'Имя конфигурации' });
        await field.focus();
        await expect(field).toBeFocused();

        await field.fill('');
        const inputVal = ' -.,_=+\/|":;><?!№%?*()`~@#$&';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe(' -.,_=+\/|":;><?!№%?*()`~@#$&');
        const save = page.getByRole('button', { name: 'Сохранить' });
        await save.click();
        await expect(page.getByText(' -.,_=+\/|":;><?!№%?*()`~@#$&')).toBeVisible();
    });
});