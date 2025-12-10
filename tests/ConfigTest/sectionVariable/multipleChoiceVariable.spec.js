const path = require('path');
const { test, expect } = require('@playwright/test');
const ConfigPage = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPage.js'));
const ConfigPageElements = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPageElements.js'));

test('Множественный выбор переменных(no)', async ({page}) => {
    const config = new ConfigPage(page);
        
    await config.goto();
    await config.contextMenuVariable();
    await page.getByRole('menuitem', { name: 'Создать переменную', exact: true }).hover();
    await config.clickVariable_3();

    await page.locator('div').filter({ hasText: /^variableЗначение "variable" уже существует$/ }).nth(1).click();
    const field = page.getByRole('textbox', { name: 'Название' });
    await field.focus();
    await expect(field).toBeFocused()

    await field.fill('');
    const inputVal = 'test';
    await field.fill(inputVal + 1);
    await field.press('Enter');
    const val = await field.inputValue();
    expect(val).toBe('test1');

    await page.locator('div').filter({ hasText: /^variable$/ }).nth(1).click();
    await field.focus();
    await expect(field).toBeFocused()

    await field.fill('');
    await field.fill(inputVal + 2);
    await field.press('Enter');
    const val2 = await field.inputValue();
    expect(val2).toBe('test2');

    await page.locator('div').filter({ hasText: /^variable$/ }).nth(4).click();
    await field.focus();
    await expect(field).toBeFocused()

    await field.fill('');
    await field.fill(inputVal + 3);
    await field.press('Enter');
    const val3 = await field.inputValue();
    expect(val3).toBe('test3');
})