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

    test('Параметр "Создать..."', async ({page}) => {
        await expect(page.getByRole('menu', { name: 'Конфигурация' })).toBeVisible();
        const create = page.getByRole('menuitem', { name: 'Создать' });
        await create.click();

        const message = page.getByRole('heading', { name: 'Новая конфигурация' });
        await expect(message).toBeVisible();
    });

    test('Параметр "Создать...-> нажать на кнопку "Отмена""', async ({page}) => {
        await expect(page.getByRole('menu', { name: 'Конфигурация' })).toBeVisible();
        const create = page.getByRole('menuitem', { name: 'Создать' });
        await create.click();

        const message = page.getByRole('heading', { name: 'Новая конфигурация' });
        const cancel = page.getByRole('button', { name: 'Отмена' });
        await expect(cancel).toBeVisible();
        await cancel.click();
        await expect(message).not.toBeVisible();
    });

});