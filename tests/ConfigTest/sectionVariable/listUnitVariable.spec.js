const path = require('path');
const { test, expect } = require('@playwright/test');
const { exec } = require('child_process');
const ConfigPage = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPage.js'));

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
        const item = page.getByRole('combobox', { name: 'Тип переменной' });
        await page.evaluate(() => {
        const el = document.querySelector('.css-97987l');
        if (el) el.style.pointerEvents = 'none';
        });
        await item.click();
        const op1 = page.getByRole('option', { name: '2 байта - целое без знака' });
        await expect(op1).toBeVisible(); 
        await op1.click();
        await expect(item).toHaveText('2 байта - целое без знака');
        const check = page.locator('[id="checkbox::r1d::control"]');
        await check.click();
        await expect(check).toHaveAttribute('data-state', 'checked');
        await expect(page.getByText('График', { exact: true })).toBeVisible();
        await el.click();
    });

    test('Выбрать в списке - B', async ({ page }) => {
        const item = page.getByRole('combobox', { name: 'Единица измерения' });
        await item.click();
        const list = page.getByRole('listbox', { name: 'Единица измерения' });
        await expect(list).toBeVisible();

        const op1032 = page.getByRole('option', { name: 'В', exact: true });
        await expect(op1032).toBeVisible(); 
        await op1032.click();
        await expect(list).toBeHidden();
        await expect(item).toHaveText('В');
    });

    test('Выбрать в списке - кВ', async ({ page }) => {
        const item = page.getByRole('combobox', { name: 'Единица измерения' });
        await item.click();
        const list = page.getByRole('listbox', { name: 'Единица измерения' });
        await expect(list).toBeVisible();

        const op1032 = page.getByRole('option', { name: 'кВ' });
        await expect(op1032).toBeVisible(); 
        await op1032.click();
        await expect(list).toBeHidden();
        await expect(item).toHaveText('кВ');
    });

    test('Выбрать в списке - мВ', async ({ page }) => {
        const item = page.getByRole('combobox', { name: 'Единица измерения' });
        await item.click();
        const list = page.getByRole('listbox', { name: 'Единица измерения' });
        await expect(list).toBeVisible();

        const op1032 = page.getByRole('option', { name: 'мВ' });
        await expect(op1032).toBeVisible(); 
        await op1032.click();
        await expect(list).toBeHidden();
        await expect(item).toHaveText('мВ');
    });

    test('Выбрать в списке - А', async ({ page }) => {
        const item = page.getByRole('combobox', { name: 'Единица измерения' });
        await item.click();
        const list = page.getByRole('listbox', { name: 'Единица измерения' });
        await expect(list).toBeVisible();

        const op1032 = page.getByRole('option', { name: 'А', exact: true });
        await expect(op1032).toBeVisible(); 
        await op1032.click();
        await expect(list).toBeHidden();
        await expect(item).toHaveText('А');
    });

    test('Выбрать в списке - кА', async ({ page }) => {
        const item = page.getByRole('combobox', { name: 'Единица измерения' });
        await item.click();
        const list = page.getByRole('listbox', { name: 'Единица измерения' });
        await expect(list).toBeVisible();

        const op1032 = page.getByRole('option', { name: 'кА' });
        await expect(op1032).toBeVisible(); 
        await op1032.click();
        await expect(list).toBeHidden();
        await expect(item).toHaveText('кА');
    });

    test('Выбрать в списке - мА', async ({ page }) => {
        const item = page.getByRole('combobox', { name: 'Единица измерения' });
        await item.click();
        const list = page.getByRole('listbox', { name: 'Единица измерения' });
        await expect(list).toBeVisible();

        const op1032 = page.getByRole('option', { name: 'мА' });
        await expect(op1032).toBeVisible(); 
        await op1032.click();
        await expect(list).toBeHidden();
        await expect(item).toHaveText('мА');
    });
});