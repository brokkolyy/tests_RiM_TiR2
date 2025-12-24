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

    test('Параметр "Редактировать"', async ({page}) => {
        await expect(page.getByRole('menu', { name: 'Конфигурация' })).toBeVisible();
        const open = page.getByRole('menuitem', { name: 'Редактировать' });
        await open.click();
        const zone =  page.locator('div').filter({ hasText: /^Редактирование конфигурации$/ });
        await expect(zone).toBeVisible();
    });
});