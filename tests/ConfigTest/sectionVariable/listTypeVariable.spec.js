const path = require('path');
const { test, expect } = require('@playwright/test');
const ConfigPage = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPage.js'));

async function prepare(page) {
    const item = page.getByRole('combobox', { name: 'Тип переменной' });
    await page.evaluate(() => {
    const el = document.querySelector('.css-97987l');
    if (el) el.style.pointerEvents = 'none';
    });
    await item.click();
    return item;
}

test.describe('Навигация', () => {
    test.beforeEach(async ({page}) => {
        const config = new ConfigPage(page);
        await config.goto();
        await config.contextMenuVariable();
        await page.getByRole('menuitem', { name: 'Создать переменную', exact: true }).hover();
        await config.clickVariable_1();

        const el = page.locator('div').filter({ hasText: /^variable$/ }).nth(1);
        await expect(el).toBeVisible();
        await el.click();
    });

    test('1 бит - bool', async ({ page }) => {
    const item = await prepare(page);

    const op1 = page.getByRole('option', { name: 'бит - bool' });
    await expect(op1).toBeVisible(); 
    await op1.click();
    await expect(page.getByRole('listbox', { name: 'Тип переменной' })).toBeHidden();
   
    await expect(item).toHaveText('1 бит - bool');

    await item.click();
    await expect(page.locator('.chakra-select__itemIndicator > .css-s3mb0o').first()).toBeVisible();
});

test('2 байта - целое без знака', async ({ page }) => {
    const item = await prepare(page);
    const op1 = page.getByRole('option', { name: '2 байта - целое без знака' });
    await expect(op1).toBeVisible(); 
    await op1.click();
    await expect(page.getByRole('listbox', { name: 'Тип переменной' })).toBeHidden();
   
    await expect(item).toHaveText('2 байта - целое без знака');
});

test('2 байта - целое', async ({ page }) => {
    const item = await prepare(page);
    const op1 = page.getByRole('option', { name: '2 байта - целое', exact: true }); //exact: true?
    await expect(op1).toBeVisible(); 
    await op1.click();
    await expect(page.getByRole('listbox', { name: 'Тип переменной' })).toBeHidden();
   
    await expect(item).toHaveText('2 байта - целое');
});

test('4 байта - целое', async ({ page }) => {
    const item = await prepare(page);
    const op1 = page.getByRole('option', { name: '4 байта - целое', exact: true });
    await expect(op1).toBeVisible(); 
    await op1.click();
    await expect(page.getByRole('listbox', { name: 'Тип переменной' })).toBeHidden();
   
    await expect(item).toHaveText('4 байта - целое');
});

test('4 байта - целое без знака', async ({ page }) => {
    const item = await prepare(page);
    const op1 = page.getByRole('option', { name: '4 байта - целое без знака' });
    await expect(op1).toBeVisible(); 
    await op1.click();
    await expect(page.getByRole('listbox', { name: 'Тип переменной' })).toBeHidden();
   
    await expect(item).toHaveText('4 байта - целое без знака');;
});

test('4 байта - с плавающей точкой', async ({ page }) => {
    const item = await prepare(page);
    const op1 = page.getByRole('option', { name: 'байта - с плавающей точкой' });
    await expect(op1).toBeVisible(); 
    await op1.click();
    await expect(page.getByRole('listbox', { name: 'Тип переменной' })).toBeHidden();
   
    await expect(item).toHaveText('4 байта - с плавающей точкой');
});

});