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

        const check = page.locator('[id="checkbox::r1b::control"]');
        await check.click();
        await expect(check).toHaveAttribute('data-state', 'checked');

        await el.click();
    });

    test('Выбрать в списке - Предупредительные', async ({ page }) => {
        const item = page.getByRole('combobox', { name: 'Группа' });
        await item.click();
        const list = page.getByRole('listbox', { name: 'Группа' });
        await expect(list).toBeVisible();

        const op1032 = page.getByRole('option', { name: 'Предупредительные' });
        await expect(op1032).toBeVisible(); 
        await op1032.click();
        await expect(list).toBeHidden();
        await expect(item).toHaveText('Предупредительные');
    });

    test('Выбрать в списке - Аварийные ', async ({ page }) => {
        const item = page.getByRole('combobox', { name: 'Группа' });
        await item.click();
        const list = page.getByRole('listbox', { name: 'Группа' });
        await expect(list).toBeVisible();

        const op1032 = page.getByRole('option', { name: 'Аварийные' });
        await expect(op1032).toBeVisible(); 
        await op1032.click();
        await expect(list).toBeHidden();
        await expect(item).toHaveText('Аварийные');
    });

    test('Выбрать в списке - Оперативного состояния', async ({ page }) => {
        const item = page.getByRole('combobox', { name: 'Группа' });
        await item.click();
        const list = page.getByRole('listbox', { name: 'Группа' });
        await expect(list).toBeVisible();

        const op1032 = page.getByRole('option', { name: 'Оперативного состояния' });
        await expect(op1032).toBeVisible(); 
        await op1032.click();
        await expect(list).toBeHidden();
        await expect(item).toHaveText('Оперативного состояния');
    });

    test('Выбрать в списке - Без группы', async ({ page }) => {
        const item = page.getByRole('combobox', { name: 'Группа' });
        await item.click();
        const list = page.getByRole('listbox', { name: 'Группа' });
        await expect(list).toBeVisible();

        const op1032 = page.getByRole('option', { name: 'Без группы' });
        await expect(op1032).toBeVisible(); 
        await op1032.click();
        await expect(list).toBeHidden();
        await expect(item).toHaveText('Без группы');
    });
});