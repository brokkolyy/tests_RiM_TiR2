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

    test('Нажать ЛКМ на “Перезапустить сервер“', async ({page}) => {
        const rerun = page.getByRole('menuitem', { name: 'Перезапустить сервер' });
        await rerun.click();

        const status = page.getByRole('status', { name: 'Сервер перезапущен' });
        await expect(status).toBeVisible();
    })
});