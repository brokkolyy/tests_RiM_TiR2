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

    test('Выбрать 19200 в выпадающем списке "Скорость"', async ({ page }) => {
      const item = page.getByRole('combobox', { name: 'Скорость' });
      await item.click();
    
      const op19200 = page.getByRole('option', { name: '19200' });
      await expect(op19200).toBeVisible(); 
      await op19200.click();
      await expect(page.getByRole('listbox', { name: 'Скорость' })).toBeHidden();
      // 1) Если combobox — input/textarea с value:
      //await expect(item).toHaveValue('19200');
    
      // 2) Или если текст выбранного значения показывается внутри триггера:
      await expect(item).toHaveText('19200');
    
      // 3) Если список закрывается после выбора, можно дополнительно проверить невидимость:
      //await expect(item).toBeHidden();
      await item.click();
      await expect(page.locator('.chakra-select__itemIndicator > .css-s3mb0o').first()).toBeVisible();;
    });
    
    test('Выбрать 38400 в выпадающем списке "Скорость"', async ({ page }) => {
      const item = page.getByRole('combobox', { name: 'Скорость' });
      await item.click();
    
      const op38400 = page.getByRole('option', { name: '38400' });
      await expect(op38400).toBeVisible(); 
      await op38400.click();
      await expect(page.getByRole('listbox', { name: 'Скорость' })).toBeHidden();
    
      await expect(item).toHaveText('38400');
      await item.click();
      await expect(page.locator('[id="select::r19::option:38400"] > .chakra-select__itemIndicator > .css-s3mb0o')).toBeVisible();;
    });
    
    test('Выбрать 57600 в выпадающем списке "Скорость"', async ({ page }) => {
      const item = page.getByRole('combobox', { name: 'Скорость' });
      await item.click();
    
      const op57600 = page.getByRole('option', { name: '57600' });
      await expect(op57600).toBeVisible(); 
      await op57600.click();
      await expect(page.getByRole('listbox', { name: 'Скорость' })).toBeHidden();
    
      await expect(item).toHaveText('57600');
      await item.click();
      await expect(page.locator('[id="select::r19::option:57600"] > .chakra-select__itemIndicator > .css-s3mb0o')).toBeVisible();
    });
    
    test('Выбрать 115200 в выпадающем списке "Скорость"', async ({ page }) => {
      const item = page.getByRole('combobox', { name: 'Скорость' });
      await item.click();
    
      const op115200 = page.getByRole('option', { name: '115200' });
      await expect(op115200).toBeVisible(); 
      await op115200.click();
      await expect(page.getByRole('listbox', { name: 'Скорость' })).toBeHidden();
    
      await expect(item).toHaveText('115200');
      await item.click();
      await expect(page.locator('[id="select::r19::option:115200"] > .chakra-select__itemIndicator > .css-s3mb0o')).toBeVisible();
    });
    
    test('Выбрать 230400 в выпадающем списке "Скорость"', async ({ page }) => {
      const item = page.getByRole('combobox', { name: 'Скорость' });
      await item.click();
    
      const op230400 = page.getByRole('option', { name: '230400' });
      await expect(op230400).toBeVisible(); 
      await op230400.click();
      await expect(page.getByRole('listbox', { name: 'Скорость' })).toBeHidden();
     
      await expect(item).toHaveText('230400');
      await item.click();
      await expect(page.locator('[id="select::r19::option:230400"] > .chakra-select__itemIndicator > .css-s3mb0o')).toBeVisible();
    });
});