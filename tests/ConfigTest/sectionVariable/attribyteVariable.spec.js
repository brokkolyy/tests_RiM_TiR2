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
    });

    test('Специальная переменная', async({page}) => {
        const check = page.locator('[id="checkbox::r1a::control"]');
        await check.click();
        // Проверить что чекбокс отмечен
        await expect(check).toHaveAttribute('data-state', 'checked');
        const attr = page.getByRole('group').filter({ hasText: 'Задержка цикла, сек' });
        await expect(attr).toBeVisible();

        await check.click();
        // Проверить что НЕ отмечен
        await expect(check).not.toHaveAttribute('data-state', 'checked');
        await expect(attr).toBeHidden();
    });

    test('Архив', async({page}) => {
        const check = page.locator('[id="checkbox::r1b::control"]');
        await check.click();
        // Проверить что чекбокс отмечен
        await expect(check).toHaveAttribute('data-state', 'checked');
        const attr = page.getByRole('combobox', { name: 'Группа' });
        await expect(attr).toBeVisible();

        await check.click();
        // Проверить что НЕ отмечен
        await expect(check).not.toHaveAttribute('data-state', 'checked');
        await expect(attr).toBeHidden();
    });

    test('Команда пользователя', async({page}) => {
        const check = page.locator('[id="checkbox::r1c::control"]');
        await check.click();
        // Проверить что чекбокс отмечен
        await expect(check).toHaveAttribute('data-state', 'checked');

        await check.click();
        // Проверить что НЕ отмечен
        await expect(check).not.toHaveAttribute('data-state', 'checked');
    });

    test('График', async({page}) => {
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
        
        const check = page.locator('[id="checkbox::r1c::control"]');;
        await check.click();
        // Проверить что чекбокс отмечен
        await expect(check).toHaveAttribute('data-state', 'checked');

        await check.click();
        // Проверить что НЕ отмечен
        await expect(check).not.toHaveAttribute('data-state', 'checked');
    })
});