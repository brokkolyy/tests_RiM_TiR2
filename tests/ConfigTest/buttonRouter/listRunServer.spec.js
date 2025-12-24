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

    test('Нажать ЛКМ на “Запустить сервер“ если уже запущен', async ({page}) => {
        const run = page.getByRole('menuitem', { name: 'Запустить сервер', exact: true })
        await run.click();

        const statusErr = page.getByRole('status', { name: 'Произошла ошибка' });
        await expect(statusErr).toBeVisible();
    })

    test('Нажать ЛКМ на “Запустить сервер“', async ({page}) => {
        const run = page.getByRole('menuitem', { name: 'Запустить сервер', exact: true })
        await run.click();

        await page.getByRole('menuitem', { name: 'Остановить сервер' }).click();

        await run.click();
        const status = page.getByRole('status', { name: 'Сервер запущен' });
        await expect(status).toBeVisible();
    })
});