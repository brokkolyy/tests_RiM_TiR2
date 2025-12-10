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
        await config.clickModbusTCP_S();
                        
        await page.locator('div').filter({ hasText: /^MB TCP127\.0\.0\.1502modbusTCP_server$/ }).nth(1).click({button:'right'});
        await configElement.clickFunctionGroup();
        const el = page.locator('div').filter({ hasText: /^fg1functionGroup$/ }).first();
        await expect(el).toBeVisible();
        await el.click();
    });

test('1 бит - bool', async ({ page }) => {
    const errIcon = page.locator('svg').filter({ hasText: 'Это поле обязательно для заполнения Данный тип данных не подходит для функций' }).nth(1);
    expect(errIcon).toBeVisible();
    const error = page.locator('svg').filter({ hasText: 'Это поле обязательно для заполнения Данный тип данных не подходит для функций' }).first();
    await expect(error).toBeVisible();
    const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
    await expect(buttonError).toBeVisible();
    
    const item = page.getByRole('combobox', { name: 'Тип данных' });

    await page.evaluate(() => {
    const el = document.querySelector('.css-97987l');
    if (el) el.style.pointerEvents = 'none';
    });
    await item.click();

    const op1 = page.getByRole('option', { name: 'бит - bool' });
    await expect(op1).toBeVisible(); 
    await op1.click();
    await expect(page.getByRole('listbox', { name: 'Тип данных' })).toBeHidden();
   
    await expect(item).toHaveText('1 бит - bool');

    await item.click();
    await expect(page.locator('.chakra-select__itemIndicator > .css-s3mb0o').first()).toBeVisible();
});

test('2 байта - целое без знака', async ({ page }) => {
    const errIcon = page.locator('svg').filter({ hasText: 'Это поле обязательно для заполнения Данный тип данных не подходит для функций' }).nth(1);
    expect(errIcon).toBeVisible();
    const error = page.locator('svg').filter({ hasText: 'Это поле обязательно для заполнения Данный тип данных не подходит для функций' }).first();
    await expect(error).toBeVisible();
    const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
    await expect(buttonError).toBeVisible();
    
    const item = page.getByRole('combobox', { name: 'Тип данных' });

    await page.evaluate(() => {
    const el = document.querySelector('.css-97987l');
    if (el) el.style.pointerEvents = 'none';
    });
    await item.click();

    const op1 = page.getByRole('option', { name: '2 байта - целое без знака' });
    await expect(op1).toBeVisible(); 
    await op1.click();
    await expect(page.getByRole('listbox', { name: 'Тип данных' })).toBeHidden();
   
    await expect(item).toHaveText('2 байта - целое без знака');

    //await item.click();
    //await expect(page.locator('[id="select::r1b::option:ushort"] > .chakra-select__itemIndicator > .css-s3mb0o')).toBeVisible();
});

test('2 байта - целое', async ({ page }) => {
    const errIcon = page.locator('svg').filter({ hasText: 'Это поле обязательно для заполнения Данный тип данных не подходит для функций' }).nth(1);
    expect(errIcon).toBeVisible();
    const error = page.locator('svg').filter({ hasText: 'Это поле обязательно для заполнения Данный тип данных не подходит для функций' }).first();
    await expect(error).toBeVisible();
    const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
    await expect(buttonError).toBeVisible();
    
    const item = page.getByRole('combobox', { name: 'Тип данных' });

    await page.evaluate(() => {
    const el = document.querySelector('.css-97987l');
    if (el) el.style.pointerEvents = 'none';
    });
    await item.click();

    const op1 = page.getByRole('option', { name: '2 байта - целое', exact: true }); //exact: true?
    await expect(op1).toBeVisible(); 
    await op1.click();
    await expect(page.getByRole('listbox', { name: 'Тип данных' })).toBeHidden();
   
    await expect(item).toHaveText('2 байта - целое');

    //await item.click();
    //await expect(page.locator('[id="select::r1b::option:short"] > .chakra-select__itemIndicator > .css-s3mb0o')).toBeVisible();
});

test('4 байта - целое без знака', async ({ page }) => {
    const errIcon = page.locator('svg').filter({ hasText: 'Это поле обязательно для заполнения Данный тип данных не подходит для функций' }).nth(1);
    expect(errIcon).toBeVisible();
    const error = page.locator('svg').filter({ hasText: 'Это поле обязательно для заполнения Данный тип данных не подходит для функций' }).first();
    await expect(error).toBeVisible();
    const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
    await expect(buttonError).toBeVisible();
    
    const item = page.getByRole('combobox', { name: 'Тип данных' });

    await page.evaluate(() => {
    const el = document.querySelector('.css-97987l');
    if (el) el.style.pointerEvents = 'none';
    });
    await item.click();

    const op1 = page.getByRole('option', { name: '4 байта - целое без знака' });
    await expect(op1).toBeVisible(); 
    await op1.click();
    await expect(page.getByRole('listbox', { name: 'Тип данных' })).toBeHidden();
   
    await expect(item).toHaveText('4 байта - целое без знака');

    //await item.click();
    //await expect(page.locator('[id="select::r1b::option:uint"] > .chakra-select__itemIndicator > .css-s3mb0o')).toBeVisible();
});

test('4 байта - с плавающей точкой', async ({ page }) => {
    const errIcon = page.locator('svg').filter({ hasText: 'Это поле обязательно для заполнения Данный тип данных не подходит для функций' }).nth(1);
    expect(errIcon).toBeVisible();
    const error = page.locator('svg').filter({ hasText: 'Это поле обязательно для заполнения Данный тип данных не подходит для функций' }).first();
    await expect(error).toBeVisible();
    const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
    await expect(buttonError).toBeVisible();
    
    const item = page.getByRole('combobox', { name: 'Тип данных' });

    await page.evaluate(() => {
    const el = document.querySelector('.css-97987l');
    if (el) el.style.pointerEvents = 'none';
    });
    await item.click();

    const op1 = page.getByRole('option', { name: 'байта - с плавающей точкой' });
    await expect(op1).toBeVisible(); 
    await op1.click();
    await expect(page.getByRole('listbox', { name: 'Тип данных' })).toBeHidden();
   
    await expect(item).toHaveText('4 байта - с плавающей точкой');

    //await item.click();
    //await expect(page.locator('[id="select::r1b::option:float"] > .chakra-select__itemIndicator > .css-s3mb0o')).toBeVisible();
});
});