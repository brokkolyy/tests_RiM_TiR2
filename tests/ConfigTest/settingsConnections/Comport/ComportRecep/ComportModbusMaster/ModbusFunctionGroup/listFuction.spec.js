const path = require('path');
const { test, expect } = require('@playwright/test');
const ConfigPage = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPage.js'));
const ConfigPageElements = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPageElements.js'));

test.describe('Навигация', () => {
    test.beforeEach(async ({page}) => {
        const config = new ConfigPage(page);
        const configElement = new ConfigPageElements(page);
        
        await config.goto();
        await config.contextMenuReception();
        await config.clickComport();
        
        await page.locator('div').filter({ hasText: /^COMttyS0115200comport$/ }).nth(1).click({button: 'right'});
        await configElement.clickModbusRTU_Master();
    
        await page.locator('div').filter({ hasText: /^MB RTU1modbusRTU_master$/ }).nth(1).click({button: 'right'});
        await configElement.clickFunctionGroup();
    
        const el = page.locator('div').filter({ hasText: /^fg1functionGroup$/ }).first();
        await expect(el).toBeVisible();
    
        await el.click();
    });

test('(0x01) Чтение значений из нескольких регистров флагов', async ({ page }) => {
    const item = page.getByRole('combobox', { name: 'Функция info' });
    await item.click();

    const op1 = page.getByRole('option', { name: '(0x01' });
    await expect(op1).toBeVisible(); 
    await op1.click();
    await expect(page.getByRole('listbox', { name: 'Функция info' })).toBeHidden();
   
    await expect(item).toHaveText('(0x01) Чтение значений из нескольких регистров флагов');

    await item.click();
    await expect(page.locator('.chakra-select__itemIndicator > .css-s3mb0o').first()).toBeVisible();
});

test('(0x02) Чтение значений из нескольких дискретных входов', async ({ page }) => {
    const item = page.getByRole('combobox', { name: 'Функция info' });
    await item.click();

    const op1 = page.getByRole('option', { name: '(0x02' });
    await expect(op1).toBeVisible(); 
    await op1.click();
    await expect(page.getByRole('listbox', { name: 'Функция info' })).toBeHidden();
   
    await expect(item).toHaveText('(0x02) Чтение значений из нескольких дискретных входов');

    await item.click();
    await expect(page.locator('[id="select::r19::option:2"] > .chakra-select__itemIndicator > .css-s3mb0o')).toBeVisible();
});

test('(0x03) Чтение значений из нескольких регистров хранения', async ({ page }) => {
    const item = page.getByRole('combobox', { name: 'Функция info' });
    await item.click();

    const op1 = page.getByRole('option', { name: '(0x03' });
    await expect(op1).toBeVisible(); 
    await op1.click();
    await expect(page.getByRole('listbox', { name: 'Функция info' })).toBeHidden();
   
    await expect(item).toHaveText('(0x03) Чтение значений из нескольких регистров хранения');

    await item.click();
    await expect(page.locator('[id="select::r19::option:3"] > .chakra-select__itemIndicator > .css-s3mb0o')).toBeVisible();
});

test('(0x04) Чтение значений из нескольких регистров ввода', async ({ page }) => {
    const item = page.getByRole('combobox', { name: 'Функция info' });
    await item.click();

    const op1 = page.getByRole('option', { name: '(0x04' });
    await expect(op1).toBeVisible(); 
    await op1.click();
    await expect(page.getByRole('listbox', { name: 'Функция info' })).toBeHidden();
   
    await expect(item).toHaveText('(0x04) Чтение значений из нескольких регистров ввода');

    await item.click();
    await expect(page.locator('[id="select::r19::option:4"] > .chakra-select__itemIndicator > .css-s3mb0o')).toBeVisible();
});

test('(0x05) Запись значения одного флага', async ({ page }) => {
    const item = page.getByRole('combobox', { name: 'Функция info' });
    await item.click();

    const op1 = page.getByRole('option', { name: '(0x05' });
    await expect(op1).toBeVisible(); 
    await op1.click();
    await expect(page.getByRole('listbox', { name: 'Функция info' })).toBeHidden();
   
    await expect(item).toHaveText('(0x05) Запись значения одного флага');

    await item.click();
    await expect(page.locator('[id="select::r19::option:5"] > .chakra-select__itemIndicator > .css-s3mb0o')).toBeVisible();
});

test('(0x06) Запись значения в один регистр хранения', async ({ page }) => {
    const item = page.getByRole('combobox', { name: 'Функция info' });
    await item.click();

    const op1 = page.getByRole('option', { name: '(0x06' });
    await expect(op1).toBeVisible(); 
    await op1.click();
    await expect(page.getByRole('listbox', { name: 'Функция info' })).toBeHidden();
   
    await expect(item).toHaveText('(0x06) Запись значения в один регистр хранения');

    await item.click();
    await expect(page.locator('[id="select::r19::option:6"] > .chakra-select__itemIndicator > .css-s3mb0o')).toBeVisible();
});

test('(0x15) Запись значений в несколько регистров флагов', async ({ page }) => {
    const item = page.getByRole('combobox', { name: 'Функция info' });
    await item.click();

    const op1 = page.getByRole('option', { name: '(0x15' });
    await expect(op1).toBeVisible(); 
    await op1.click();
    await expect(page.getByRole('listbox', { name: 'Функция info' })).toBeHidden();
   
    await expect(item).toHaveText('(0x15) Запись значений в несколько регистров флагов');

    await item.click();
    await expect(page.locator('[id="select::r19::option:15"] > .chakra-select__itemIndicator > .css-s3mb0o')).toBeVisible();
});

test('(0x16) Запись значений в несколько регистров хранения', async ({ page }) => {
    const item = page.getByRole('combobox', { name: 'Функция info' });
    await item.click();

    const op1 = page.getByRole('option', { name: '(0x16' });
    await expect(op1).toBeVisible(); 
    await op1.click();
    await expect(page.getByRole('listbox', { name: 'Функция info' })).toBeHidden();
   
    await expect(item).toHaveText('(0x16) Запись значений в несколько регистров хранения');

    await item.click();
    await expect(page.locator('[id="select::r19::option:16"] > .chakra-select__itemIndicator > .css-s3mb0o')).toBeVisible();
});

});