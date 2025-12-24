const path = require('path');
const { test, expect } = require('@playwright/test');
const ConfigPage = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPage.js'));

test.describe('Навигация', () => {
    test.beforeEach(async ({page}) => {
        const config = new ConfigPage(page);
                
        await config.goto();
        await config.contextMenuReception();
        await config.clickFolder();
    });

    test('На 1 уровне Папка', async ({page}) => {
        const config = new ConfigPage(page);
        const folder = page.locator('div').filter({ hasText: /^folder$/ }).nth(1);
        await folder.click({button: 'right'});
        await config.clickComport();

        await folder.click({button: 'right'});
        await config.clickGpio();

        await folder.click({button: 'right'});
        await config.clickIec104_C();

        await folder.click({button: 'right'});
        await config.clickModbusTCP_C();

        await folder.click({button: 'right'});
        const copy = page.getByRole('menuitem', { name: 'Копировать Ctrl+C' });
        await copy.click();

        await config.contextMenuReception();
        await config.clickFolder();
        await page.locator('div:nth-child(7) > ._node_1yclz_1').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Вставить Ctrl+V' }).click(); 

        await page.locator('div').filter({ hasText: /^folder_copy$/ }).nth(4).click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Игнорировать Ctrl+I' }).click();
        await expect(page.locator('div').filter({ hasText: /^Заблокированfolder_copy$/ }).nth(3)).toBeVisible();

        await page.locator('div').filter({ hasText: /^Заблокированfolder_copy$/ }).nth(3).click({button:'right'})
        await page.getByRole('menuitem', { name: 'Вырезать Ctrl+X' }).click();
        await page.locator('div').filter({ hasText: /^folder$/ }).nth(1).click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Вставить Ctrl+V' }).click();
        await page.locator('div').filter({ hasText: /^Заблокированfolder_copy$/ }).nth(1).click();
        await page.getByText('Заблокированfolder_copy').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Использовать Ctrl+I' }).click();
        await page.locator('div').filter({ hasText: /^folder_copy$/ }).nth(1).click();
    })
});