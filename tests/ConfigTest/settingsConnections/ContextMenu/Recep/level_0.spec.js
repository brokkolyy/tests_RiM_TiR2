const path = require('path');
const { test, expect } = require('@playwright/test');
const ConfigPage = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPage.js'));

test.describe('Навигация', () => {
    test.beforeEach(async ({page}) => {
        const config = new ConfigPage(page);
                
        await config.goto();
        await config.contextMenuReception();
        await config.clickComport();
        await config.contextMenuReception();
        await config.clickGpio();
        await config.contextMenuReception();
        await config.clickIec104_C();
        await config.contextMenuReception();
        await config.clickModbusTCP_C();
        await config.contextMenuReception();
        await config.clickFolder();
    });

    test('На 0 уровне (на уровне соединений)', async ({page}) => {
        const config = new ConfigPage(page);
        
        await config.contextMenuReception();
        const insert = page.getByRole('menuitem', { name: 'Вставить Ctrl+V' });
        await expect(insert).toBeVisible();
        await expect(insert).toBeDisabled();
        await page.locator('div').filter({ hasText: /^COMttyS0115200comport$/ }).nth(1).click({button: 'right', force: true});
        await expect(page.getByText('Создать "Modbus-RTU Master"Создать "TCP-мост (сервер)"ПереименоватьEnterУдалить')).toBeVisible();
        await expect(page.getByText(/Создать|Переименовать|Удалить|Копировать/).first()).toBeVisible();     //page.getByRole('menuitem', { name: 'Копировать Ctrl+C' }).click();
        await page.locator('div').filter({ hasText: /^folder$/ }).nth(1).click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Вставить Ctrl+V' }).click();
    })
});