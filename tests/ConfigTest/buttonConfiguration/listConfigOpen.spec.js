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

    test('Параметр "Открыть..."', async ({page}) => {
        await expect(page.getByRole('menu', { name: 'Конфигурация' })).toBeVisible();
        const open = page.getByRole('menuitem', { name: 'Открыть' });
        await open.click();

    });

    test('Выбрать файл с конфигурацией для ТиРа без ошибок', async({page}) => {
        await expect(page.getByRole('menu', { name: 'Конфигурация' })).toBeVisible();
        /*const open = page.getByRole('menuitem', { name: 'Открыть' });
        await open.setInputFiles('test (4).xml');*/

        const fileChooserPromise = page.waitForEvent('filechooser');

        await page.getByRole('menuitem', { name: 'Открыть' }).click();

        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles('test (4).xml');
        const status = page.getByRole('status', { name: 'Файл загружен' });
        await expect(status).toBeVisible();
    });

    test('Выбрать файл с конфигурацией для ТиРа, но с допущенными в ней ошибками', async ({page}) => {
        await expect(page.getByRole('menu', { name: 'Конфигурация' })).toBeVisible();
        const fileChooserPromise = page.waitForEvent('filechooser');

        await page.getByRole('menuitem', { name: 'Открыть' }).click();

        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles('test (4).xml');
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).not.toBeVisible();
        const status = page.getByRole('status', { name: 'Файл загружен' });
        await expect(status).toBeVisible();
    })

    test('Выбрать файл с расширением .xml сторонней программы', async ({page}) => {
        await expect(page.getByRole('menu', { name: 'Конфигурация' })).toBeVisible();
        const fileChooserPromise = page.waitForEvent('filechooser');

        await page.getByRole('menuitem', { name: 'Открыть' }).click();

        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles('test (4).xml');
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).not.toBeVisible();
    });
});