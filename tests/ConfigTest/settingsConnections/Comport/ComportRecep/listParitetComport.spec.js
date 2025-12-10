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

    test('Выпадающий список "Паритет" (нет)', async ({ page }) => {
    const item = page.getByRole('combobox', { name: 'Паритет' });
    await item.click();

    const opNo = page.getByRole('option', { name: 'Нет' });
    await expect(opNo).toBeVisible(); 
    await opNo.click();
    await expect(page.getByRole('listbox', { name: 'Паритет' })).toBeHidden();

    await expect(item).toHaveText('Нет');
});

test('Выпадающий список "Паритет" (бит четности)', async ({ page }) => {
    const item = page.getByRole('combobox', { name: 'Паритет' });
    await item.click();

    const op1 = page.getByRole('option', { name: 'Бит чётности' });
    await expect(op1).toBeVisible();
    await op1.click();
    await expect(page.getByRole('listbox', { name: 'Паритет' })).toBeHidden();

    await expect(item).toHaveText('Бит чётности');
});

test('Выпадающий список "Паритет" (бит нечетности)', async ({ page }) => {
    const item = page.getByRole('combobox', { name: 'Паритет' });
    await item.click();

    const op1 = page.getByRole('option', { name: 'Бит нечётности' });
    await expect(op1).toBeVisible();
    await op1.click();
    await expect(page.getByRole('listbox', { name: 'Паритет' })).toBeHidden();

    await expect(item).toHaveText('Бит нечётности');
})
});