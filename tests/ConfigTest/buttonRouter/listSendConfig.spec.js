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

    test('Нажать ЛКМ на “Отправить конфигурацию“', async ({page}) => {
        const send = page.getByRole('menuitem', { name: 'Отправить конфигурацию' });
        await send.click();

        const status = 
        await expect(status).toBeVisible();
    });

    test('Нажать ЛКМ на “Отправить конфигурацию“ с ошибкой', async ({page}) => {
        const config = new ConfigPage(page);
        await config.contextMenuReception();
        await config.clickComport();
        await page.locator('div').filter({ hasText: /^COMttyS0115200comport$/ }).nth(1).click();
        await page.getByRole('textbox', { name: 'Название' }).click();
        await page.getByRole('textbox', { name: 'Название' }).fill('1234');
        await page.getByRole('textbox', { name: 'Название' }).press('Enter');

        await config.buttonRouterClick();
        const send = page.getByRole('menuitem', { name: 'Отправить конфигурацию' });
        await expect(send).toBeDisabled();

        const status = 
        await expect(status).toBeVisible();
    });
});