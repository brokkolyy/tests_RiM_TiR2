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

test('Выбрать в списке - 1-0 3-2', async ({ page }) => {
    const item = page.getByRole('combobox', { name: 'Порядок 4-х байт' });
    await item.click();
    await expect(page.getByRole('listbox', { name: 'Порядок 4-х байт' })).toBeVisible();

    const op1032 = page.getByRole('option', { name: '-0 3-2' });
    await expect(op1032).toBeVisible(); 
    await op1032.click();
    await expect(page.getByRole('listbox', { name: 'Порядок 4-х байт' })).toBeHidden();
   
    await expect(item).toHaveText('1-0 3-2');

    await item.click();
    await expect(page.locator('.chakra-select__itemIndicator > .css-s3mb0o').first()).toBeVisible();
});

test('Выбрать в списке - 3-2 1-0', async ({ page }) => {
    const item = page.getByRole('combobox', { name: 'Порядок 4-х байт' });
    await item.click();
    await expect(page.getByRole('listbox', { name: 'Порядок 4-х байт' })).toBeVisible();

    const op3210 = page.getByRole('option', { name: '-2 1-0' });
    await expect(op3210).toBeVisible(); 
    await op3210.click();
    await expect(page.getByRole('listbox', { name: 'Порядок 4-х байт' })).toBeHidden();
   
    await expect(item).toHaveText('3-2 1-0');

    //await item.click();
    //await expect(page.locator('[id="select::r1d::option:3-2 1-0"] > .chakra-select__itemIndicator > .css-s3mb0o')).toBeVisible();
});

test('Выбрать в списке - 2-3 0-1', async ({ page }) => {
    const item = page.getByRole('combobox', { name: 'Порядок 4-х байт' });
    await item.click();
    await expect(page.getByRole('listbox', { name: 'Порядок 4-х байт' })).toBeVisible();

    const op2301 = page.getByRole('option', { name: '-3 0-1' });
    await expect(op2301).toBeVisible(); 
    await op2301.click();
    await expect(page.getByRole('listbox', { name: 'Порядок 4-х байт' })).toBeHidden();
   
    await expect(item).toHaveText('2-3 0-1');

    //await item.click();
    //await expect(page.locator('[id="select::r1d::option:2-3 0-1"] > .chakra-select__itemIndicator > .css-s3mb0o')).toBeVisible();
});

test('Выбрать в списке - 0-1 2-3', async ({ page }) => {
    const item = page.getByRole('combobox', { name: 'Порядок 4-х байт' });
    await item.click();
    await expect(page.getByRole('listbox', { name: 'Порядок 4-х байт' })).toBeVisible();

    const op0123 = page.getByRole('option', { name: '-1 2-3' });
    await expect(op0123).toBeVisible(); 
    await op0123.click();
    await expect(page.getByRole('listbox', { name: 'Порядок 4-х байт' })).toBeHidden();
   
    await expect(item).toHaveText('0-1 2-3');

    //await item.click();
    //await expect(page.locator('[id="select::r1d::option:0-1 2-3"] > .chakra-select__itemIndicator > .css-s3mb0o')).toBeVisible();
});
});