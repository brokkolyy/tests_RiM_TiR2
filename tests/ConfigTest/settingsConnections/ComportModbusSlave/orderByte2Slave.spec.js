const path = require('path');
const { test, expect } = require('@playwright/test');
const ConfigPage = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPage.js'));
const ConfigPageElements = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPageElements.js'));

test.describe('Навигация', () => {
    test.beforeEach(async ({page}) => {
        const config = new ConfigPage(page);
    const configElement = new ConfigPageElements(page);
        
    await config.goto();
    await config.contextMenuBroadcast();
    await config.clickComport();
        
    await page.locator('div').filter({ hasText: /^COMttyS0115200comport$/ }).nth(1).click({button: 'right'});
    await configElement.clickModbusRTU_Slave();
    
    const el = page.locator('div').filter({ hasText: /^MB RTU1modbusRTU_slave$/ }).nth(1);
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
    await expect(page.locator('[id="select::r1b::option:big"] > .chakra-select__itemIndicator > .css-s3mb0o')).toBeVisible();
});
});