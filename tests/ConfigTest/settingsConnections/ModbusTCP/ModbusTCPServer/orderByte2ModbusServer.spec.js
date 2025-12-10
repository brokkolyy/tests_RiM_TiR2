const path = require('path');
const { test, expect } = require('@playwright/test');
const ConfigPage = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPage.js'));

test.describe('Навигация', () => {
    test.beforeEach(async ({page}) => {
        const config = new ConfigPage(page);
                                
        await config.goto();
        await config.contextMenuBroadcast(); 
        await config.clickModbusTCP_S();
                
        const el = page.locator('div').filter({ hasText: /^MB TCP127\.0\.0\.1502modbusTCP_server$/ }).nth(1);
        await expect(el).toBeVisible();
        await el.click();
    });

test('"Младщий вперед", выпадающий список "Порядок 2-х байт"', async ({ page }) => {
    const item = page.getByRole('combobox', { name: 'Порядок 2-х байт' });
    await item.click();

    const op19200 = page.getByRole('option', { name: 'Младший вперед' });
    await expect(op19200).toBeVisible(); 
    await op19200.click();
    await expect(page.getByRole('listbox', { name: 'Порядок 2-х байт' })).toBeHidden();
   
    await expect(item).toHaveText('Младший вперед');

    await item.click();
    await expect(page.locator('.chakra-select__itemIndicator > .css-s3mb0o').first()).toBeVisible();
});

test('"Старший вперед", выпадающий список "Порядок 2-х байт"', async ({ page }) => {
    const item = page.getByRole('combobox', { name: 'Порядок 2-х байт' });
    await item.click();

    const op19200 = page.getByRole('option', { name: 'Старший вперед' });
    await expect(op19200).toBeVisible(); 
    await op19200.click();
    await expect(page.getByRole('listbox', { name: 'Порядок 2-х байт' })).toBeHidden();
   
    await expect(item).toHaveText('Старший вперед');

    await item.click();
    await expect(page.locator('[id="select::r1n::option:big"] > .chakra-select__itemIndicator > .css-s3mb0o')).toBeVisible();
});
});