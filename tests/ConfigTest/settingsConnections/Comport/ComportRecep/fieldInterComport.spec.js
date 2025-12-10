const path = require('path');
const { test, expect } = require('@playwright/test');
const ConfigPage = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPage.js'));

test.describe('Навигация', () => {
    test.beforeEach(async ({page}) => {
        const config = new ConfigPage(page);
        
        await config.goto();
        await config.contextMenuReception();    // контекстное меню прием
        await config.clickComport();

        const el = page.locator('div').filter({ hasText: /^COMttyS0115200comport$/ }).nth(1); 
        await expect(el).toBeVisible();
        await el.click();
    });

    test('Ввести название интерфейса, потом букву, поле интерфейс элемента "Последовательный порт"', async ({ page }) => {
        const field = page.getByRole('textbox', { name: 'Интерфейс info' });
        await field.focus();
    
        await expect(field).toBeFocused();
    
        await field.fill('');
        const inputVal = 'ttyS1';
        await field.fill(inputVal);
        await field.press('Enter');
        
        const val = await field.inputValue();
        await expect(val).toBe('ttyS1');
    });
    
    test('Оставить поле пустым, потом букву, поле интерфейс элемента "Последовательный порт"', async ({ page }) => {
        const field = page.getByRole('textbox', { name: 'Интерфейс info' });
        await field.focus();
        await expect(field).toBeFocused();
    
        await field.fill('');
        await field.press('Enter');
        const errIcon = page.locator('svg').filter({ hasText: 'Имя узла должно начинаться с буквы или подчеркивания и содержать только латински' }).nth(1);
        expect(val).toBe('');
        expect(errIcon).toBeVisible();
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).toBeVisible();
    });
    
    test('Ввод только чисел, потом букву, поле интерфейс элемента "Последовательный порт"', async ({ page }) => {
        const field = page.getByRole('textbox', { name: 'Интерфейс info' });
        await field.focus();
        await expect(field).toBeFocused();
    
        await field.fill('');
        const inputVal = '1234567';
        await field.fill(inputVal);
        await field.press('Enter');
        
        const val = await field.inputValue();
        const errIcon = page.locator('svg').filter({ hasText: 'Имя узла должно начинаться с буквы или подчеркивания и содержать только латински' }).nth(1);
        await expect(val).toBe('1234567');
        await expect(errIcon).toBeVisible();
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).toBeVisible();
    });
    
    test('Ввод недопустимых символов, поле интерфейс элемента "Последовательный порт"', async ({ page }) => {
        const field = page.getByRole('textbox', { name: 'Интерфейс info' });
        await field.focus();
        await expect(field).toBeFocused();
    
        await field.fill('');
        const inputVal = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ~!@#$%^&*()-_=+[{]}\\|;:",<.>/?';
        await field.fill(inputVal);
        await field.press('Enter');
        
        const val = await field.inputValue();
        const errIcon = page.locator('svg').filter({ hasText: 'Имя узла должно начинаться с буквы или подчеркивания и содержать только латински' }).nth(1);
        await expect(val).toBe('абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ~!@#$%^&*()-_=+[{]}\\|;:",<.>/?');
        await expect(errIcon).toBeVisible();
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).toBeVisible();
    });
    
    test('Ввод через пробел, поле интерфейс элемента "Последовательный порт"', async ({ page }) => {
        const field = page.getByRole('textbox', { name: 'Интерфейс info' });
        await field.focus();
        await expect(field).toBeFocused();
    
        await field.fill('');
        const inputVal = 'tty S0';
        await field.fill(inputVal);
        await field.press('Enter');
        
        const val = await field.inputValue();
        const errIcon = page.locator('svg').filter({ hasText: 'Имя узла должно начинаться с буквы или подчеркивания и содержать только латински' }).nth(1);
        await expect(val).toBe('tty S0');
        await expect(errIcon).toBeVisible();
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).toBeVisible();
    });
});
