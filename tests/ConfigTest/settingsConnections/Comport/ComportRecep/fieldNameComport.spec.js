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


test('Фокус в поле название элемента "Последовательный порт"', async ({ page }) => {
    const field = page.getByRole('textbox', { name: 'Название' });
    await field.focus();
    await expect(field).toBeFocused();
});

test('Максимальная длина(30 символов), поле название элемента "Последовательный порт"', async ({ page }) => {
    const field = page.getByRole('textbox', { name: 'Название' });
    await field.focus();
    await expect(field).toBeFocused();

    await field.fill('');
    const inputVal = '123456789012345678901234567890';
    await field.fill(inputVal);
    await field.press('Enter');
    const val = await field.inputValue();
    const error = page.locator('svg').filter({ hasText: 'Имя узла должно начинаться с буквы или подчеркивания и содержать только латински' }).nth(1);
    expect(val).toBe('123456789012345678901234567890');
    expect(error).toBeVisible();
    const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
    await expect(buttonError).toBeVisible();
});

test('Ввод больше максимальной длины (31 символ), поле название элемента "Последовательный порт"', async ({ page }) => {
    const field = page.getByRole('textbox', { name: 'Название' });
    await field.focus();
    await expect(field).toBeFocused();

    await field.fill('');
    const inputVal = '1234567890123456789012345678901';
    await field.fill(inputVal);
    await field.press('Enter');
    const val = await field.inputValue();
    
    const error = page.locator('svg').filter({ hasText: 'Имя узла должно начинаться с буквы или подчеркивания и содержать только латински' }).nth(1);
    expect(val).toBe('1234567890123456789012345678901');
    expect(error).toBeVisible();
    const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
    await expect(buttonError).toBeVisible();
});

test('Ввод минимальной длины (1 символ), поле название элемента "Последовательный порт"', async ({ page }) => {
    const field = page.getByRole('textbox', { name: 'Название' });
    await field.focus();
    await expect(field).toBeFocused();

    await field.fill('');
    const inputVal = '1';
    await field.fill(inputVal);
    await field.press('Enter');
    const val = await field.inputValue();
    
    const error = page.locator('svg').filter({ hasText: 'Имя узла должно начинаться с буквы или подчеркивания и содержать только латински' }).nth(1);
    expect(val).toBe('1');
    expect(error).toBeVisible();
    const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
    await expect(buttonError).toBeVisible();
});

test('Ввод недопустимых символов, поле название элемента "Последовательный порт"', async ({ page }) => {
    const field = page.getByRole('textbox', { name: 'Название' });
    await field.focus();
    await expect(field).toBeFocused();

    await field.fill('');
    const inputVal = 'ЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮйцукенгшщзхъфывапролджэячсмитьбю-.,_=+\/|":;><?!№%?*()`~@#$&';
    await field.fill(inputVal);
    await field.press('Enter');
    
    const val = await field.inputValue();
    const errIcon = page.locator('svg').filter({ hasText: 'Имя узла должно начинаться с буквы или подчеркивания и содержать только латински' }).nth(1);
    expect(val).toBe('ЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮйцукенгшщзхъфывапролджэячсмитьбю-.,_=+\/|":;><?!№%?*()`~@#$&');
    expect(errIcon).toBeVisible();
    const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
    await expect(buttonError).toBeVisible();
});

test('Оставить поле пустым, поле название элемента "Последовательный порт"', async ({ page }) => {
    const field = page.getByRole('textbox', { name: 'Название' });
    await field.focus();
    await expect(field).toBeFocused();

    await field.fill('');
    await field.press('Enter');
    const val = await field.inputValue();
    const errIcon = page.locator('svg').filter({ hasText: 'Имя узла должно начинаться с буквы или подчеркивания и содержать только латински' }).nth(1);
    expect(val).toBe('');
    expect(errIcon).toBeVisible();
    const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
    await expect(buttonError).toBeVisible();
});

test('Ввести сначала цифру, потом букву, поле название элемента "Последовательный порт"', async ({ page }) => {
    const field = page.getByRole('textbox', { name: 'Название' });
    await field.focus();
    await expect(field).toBeFocused();

    await field.fill('');
    const inputVal = '1t';
    await field.fill(inputVal);
    await field.press('Enter');
    const val = await field.inputValue();
    const errIcon = page.locator('svg').filter({ hasText: 'Имя узла должно начинаться с буквы или подчеркивания и содержать только латински' }).nth(1);
    expect(val).toBe('1t');
    expect(errIcon).toBeVisible();
    const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
    await expect(buttonError).toBeVisible();
});
});