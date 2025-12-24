const path = require('path');
const { test, expect } = require('@playwright/test');
const { exec } = require('child_process');
const ConfigPage = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPage.js'));

test.describe('Навигация', () => {
    test.beforeEach(async ({page}) => {
        const config = new ConfigPage(page);
        await config.goto();
        await config.buttonConfigClick();
    });

    test('Параметр "Сохранить"', async ({page}) => {
        await expect(page.getByRole('menu', { name: 'Конфигурация' })).toBeVisible();
        const downloadPromise = page.waitForEvent('download');
        await page.getByRole('menuitem', { name: 'Сохранить' }).click();
        const download = await downloadPromise;
    });

    test('Параметр "Сохранить" с ошибкой', async ({page}) => {
        const config = new ConfigPage(page);

        await config.contextMenuReception();    // контекстное меню прием
        await config.clickComport();
        await config.contextMenuReception();    // контекстное меню прием
        await config.clickComport();

        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).toBeVisible();

        await config.buttonConfigClick();
        await expect(page.getByRole('menu', { name: 'Конфигурация' })).toBeVisible();
        const downloadPromise = page.waitForEvent('download');
        await page.getByRole('menuitem', { name: 'Сохранить' }).click();
        const download = await downloadPromise;
    });
});