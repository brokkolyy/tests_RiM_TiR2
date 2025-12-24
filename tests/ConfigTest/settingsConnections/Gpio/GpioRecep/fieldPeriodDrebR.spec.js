const path = require('path');
const { test, expect } = require('@playwright/test');
const ConfigPage = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPage.js'));

test.describe('Навигация', () => {
    test.beforeEach(async ({page}) => {
        const config = new ConfigPage(page);
                                        
        await config.goto();
        await config.contextMenuReception(); 
        await config.clickGpio();
                        
        const el = page.locator('div').filter({ hasText: /^gpio200gpio$/ }).nth(1);
        await expect(el).toBeVisible();
        await el.click();
    });

    test('Фокус в поле название элемента', async ({ page }) => {
        const field = page.getByRole('spinbutton', { name: 'Период дребезга' });
        await field.focus();
        await expect(field).toBeFocused();
    });

    test('Ввод числа с максимальной длиной (5 символа) и значение которого больше максимально допустимого', async({page}) => {
        const field = page.getByRole('spinbutton', { name: 'Период дребезга' });
        await field.focus();
        await expect(field).toBeFocused();

        await field.fill('');
        const inputVal = '99999';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('99999');
        
        const err = page.locator('.chakra-icon.css-pgosud > path').first();//page.locator('[id="number-input::r19:"] svg').filter({ hasText: 'Значение должно быть в диапазоне от 1 до' });
        await expect(err).toBeVisible();
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).toBeVisible();
    });

    test('Ввод числа с максимальной длиной (5 символа) и максимально допустимого значение', async({page}) => {
        const field = page.getByRole('spinbutton', { name: 'Период дребезга' });
        await field.focus();
        await expect(field).toBeFocused();

        await field.fill('');
        const inputVal = '10000';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('10000');
        
        const err = page.locator('.chakra-icon.css-pgosud > path').first();; //page.locator('.chakra-icon.css-pgosud > path').first()
        await expect(err).not.toBeVisible();
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).not.toBeVisible();
    });

    test('Ввод числа с большим количеством символов чем у максимального числа (6 и более)', async({page}) => {
        const field = page.getByRole('spinbutton', { name: 'Период дребезга' });
        await field.focus();
        await expect(field).toBeFocused();

        await field.fill('');
        const inputVal = '111111';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('111111');
        
        const err = page.locator('.chakra-icon.css-pgosud > path').first();; //page.locator('.chakra-icon.css-pgosud > path').first()
        await expect(err).toBeVisible();
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).toBeVisible();
    });

    test('Ввод положительного числа меньше минимально допустимого', async({page}) => {
        const field = page.getByRole('spinbutton', { name: 'Период дребезга' });
        await field.focus();
        await expect(field).toBeFocused();

        await field.fill('');
        const inputVal = '0';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('0');
        
        const err = page.locator('.chakra-icon.css-pgosud > path').first();; //page.locator('.chakra-icon.css-pgosud > path').first()
        await expect(err).toBeVisible();
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).toBeVisible();
    });

    test('Ввести минимально допустимое число', async({page}) => {
        const field = page.getByRole('spinbutton', { name: 'Период дребезга' });
        await field.focus();
        await expect(field).toBeFocused();

        await field.fill('');
        const inputVal = '1';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('1');
        
        const err = page.locator('.chakra-icon.css-pgosud > path').first();; //page.locator('.chakra-icon.css-pgosud > path').first()
        await expect(err).not.toBeVisible();
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).not.toBeVisible();
    });

    test('Ввод недопустимых символов', async({page}) => {
        const field = page.getByRole('spinbutton', { name: 'Период дребезга' });
        await field.focus();
        await expect(field).toBeFocused();

        await field.fill('');
        const inputVal = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZабвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ~!@#$%^&*()-_=+[{]}\\|;:",<.>/?';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('');
        
        const err = page.locator('.chakra-icon.css-pgosud > path').first();; //page.locator('.chakra-icon.css-pgosud > path').first()
        await expect(err).not.toBeVisible();
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).not.toBeVisible();
    });

    test('Оставить поле пустым', async({page}) => {
        const field = page.getByRole('spinbutton', { name: 'Период дребезга' });
        await field.focus();
        await expect(field).toBeFocused();

        await field.fill('');
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('');
        
        const err = page.locator('div').filter({ hasText: /^Это поле обязательно для заполнения$/ }).nth(2) //page.locator('.chakra-icon.css-pgosud > path').first()
        await expect(err).toBeVisible();
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).toBeVisible();
    });

    test('Ввести 0 после чего допустимое значение', async({page}) => {
        const field = page.getByRole('spinbutton', { name: 'Период дребезга' });
        await field.focus();
        await expect(field).toBeFocused();

        await field.fill('');
        const inputVal = '034';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('034');
        
        const err = page.locator('.chakra-icon.css-pgosud > path').first();; //page.locator('.chakra-icon.css-pgosud > path').first()
        await expect(err).not.toBeVisible();
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).not.toBeVisible();
    });

    test('Ввести 0 после чего недопустимое значение', async({page}) => {
        const field = page.getByRole('spinbutton', { name: 'Период дребезга' });
        await field.focus();
        await expect(field).toBeFocused();

        await field.fill('');
        const inputVal = '05555555';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('5555555');
        
        const err = page.locator('.chakra-icon.css-pgosud > path').first();; //page.locator('.chakra-icon.css-pgosud > path').first()
        await expect(err).toBeVisible();
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).toBeVisible();
    });

    test('Ввести цифру, пробел и ещё одну цифру', async({page}) => {
        const field = page.getByRole('spinbutton', { name: 'Период дребезга' });
        await field.focus();
        await expect(field).toBeFocused();

        await field.fill('');
        const inputVal = '2 3';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('23');
        
        const err = page.locator('.chakra-icon.css-pgosud > path').first();; //page.locator('.chakra-icon.css-pgosud > path').first()
        await expect(err).not.toBeVisible();
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).not.toBeVisible();
    });
});