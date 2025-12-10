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

    test('Выпадающий список "Стоп-бит" 1', async ({ page }) => {
      const item = page.getByRole('combobox', { name: 'Стоп-бит' });
      await item.click();
    
      const op1 = page.getByRole('option', { name: '1' });
      await expect(op1).toBeVisible(); 
      await op1.click();
      await expect(page.getByRole('listbox', { name: 'Стоп-бит' })).toBeHidden();
     
      await expect(item).toHaveText('1');
      await item.click();
      await expect(page.locator('.chakra-select__itemIndicator > .css-s3mb0o').first()).toBeVisible();;
    });
    
    test('Выпадающий список "Стоп-бит" 2', async ({ page }) => {
      const item = page.getByRole('combobox', { name: 'Стоп-бит' });
      await item.click();
    
      const op2 = page.getByRole('option', { name: '2' });
      await expect(op2).toBeVisible(); 
      await op2.click();
      await expect(page.getByRole('listbox', { name: 'Стоп-бит' })).toBeHidden();
    
      await expect(item).toHaveText('2');
      await item.click();
      await expect(page.locator('[id="select::r1b::option:2"] > .chakra-select__itemIndicator > .css-s3mb0o')).toBeVisible();
    });
    
});