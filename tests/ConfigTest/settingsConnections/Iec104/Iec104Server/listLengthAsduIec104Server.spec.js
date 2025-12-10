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

test('Выбрать в списке - 1 байт', async ({ page }) => {
    const item = page.getByRole('combobox', { name: 'Длина адреса ASDU' });
    await item.click();

    const op1 = page.getByRole('option', { name: '1 байт' });
    await expect(op1).toBeVisible(); 
    await op1.click();
    await expect(page.getByRole('listbox', { name: 'Длина адреса ASDU' })).toBeHidden();
   
    await expect(item).toHaveText('1 байт');

    await item.click();
    await expect(page.locator('.chakra-select__itemIndicator > .css-s3mb0o').first()).toBeVisible();//locator('.chakra-select__itemIndicator > .css-s3mb0o').first()
});

test('Выбрать в списке - 2 байта', async ({ page }) => {
    const item = page.getByRole('combobox', { name: 'Длина адреса ASDU' });
    await item.click();

    const op = page.getByRole('option', { name: 'байта' });
    await expect(op).toBeVisible(); 
    await op.click();
    await expect(page.getByRole('listbox', { name: 'Длина адреса ASDU' })).toBeHidden();
   
    await expect(item).toHaveText('2 байта');

    await item.click();
    await expect(page.locator('[id="select::r1c::option:2"] > .chakra-select__itemIndicator > .css-s3mb0o')).toBeVisible();
});
});