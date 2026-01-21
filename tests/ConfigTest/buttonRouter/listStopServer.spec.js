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

    test('Нажать ЛКМ на “Остановить сервер“', async ({page}) => {
        const stop = page.getByRole('menuitem', { name: 'Остановить сервер' });
        await stop.click();
        const status = page.getByRole('status', { name: 'Сервер остановлен' })
        //await page.screenshot({path:'error.png'})
        await expect(status).toBeVisible(); 
    });

    test('Повторно нажать ЛКМ на “Остановить сервер“', async ({page}) => {
        const stop = page.getByRole('menuitem', { name: 'Остановить сервер' });
        const run = page.getByRole('menuitem', { name: 'Запустить сервер', exact: true })
        await stop.click();
        await run.click();

        const err = page.getByRole('status', { name: 'Произошла ошибка' })
        await expect(err).toBeVisible();
    });
});