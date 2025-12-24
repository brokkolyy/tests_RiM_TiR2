const path = require('path');
const { test, expect } = require('@playwright/test');
const { exec } = require('child_process');
const ConfigPage = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPage.js'));

test.describe('Навигация', () => {
    test.beforeEach(async ({page}) => {
        const config = new ConfigPage(page);
        await config.goto();
        await config.buttonRouterClick();
    });

    test('Нажать ЛКМ на “Отмена“', async({page}) => {
        const get = page.getByRole('menuitem', { name: 'Получить конфигурацию' });
        await get.click();

        const zone = page.locator('div').filter({ hasText: /^Получить конфигурацию\?$/ });
        await expect(zone).toBeVisible();
        await page.getByRole('button', { name: 'Отмена' }).click();
        await expect(zone).toBeHidden();
    });

    test('Нажать ЛКМ на “Получить конфигурацию“', async({page}) => {
        const get = page.getByRole('menuitem', { name: 'Получить конфигурацию' });
        await get.click();

        const zone = page.locator('div').filter({ hasText: /^Получить конфигурацию\?$/ });
        await expect(zone).toBeVisible();
        await page.getByRole('button', { name: 'Применить' }).click();
        await expect(zone).toBeHidden();

        const status = page.getByRole('status', { name: 'Конфигурация обновлена' });
        await expect(status).toBeVisible();
        const svg = page.locator('svg').filter({ hasText: 'Синхронизировано c сервером' });
        await expect(svg).toBeVisible();
    });
});