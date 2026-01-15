const path = require('path');
const { test, expect } = require('@playwright/test');
const ConfigPage = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPage.js'));
const ConfigPageElements = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPageElements.js'));

    test('На 1 уровне: IEC104 Раздел "Прием"', async ({page}) => {
        const config = new ConfigPage(page);
        const configElement = new ConfigPageElements(page);   
        await config.goto();

        await config.contextMenuReception();
        await config.clickIec104_C();

        await page.getByText('iec104127.0.0.').click({button:'right'});
        await page.getByText('iec104127.0.0.').dblclick();
        //await page.screenshot({path:'error.png'})
        await page.getByRole('treeitem', { name: 'iec104 127.0.0.1 102' }).getByRole('textbox').fill('test');
        await page.getByRole('treeitem', { name: 'iec104 127.0.0.1 102' }).getByRole('textbox').press('Enter');

        await page.getByText('iec104127.0.0.1102test').click({button: 'right'});
        await configElement.clickAsdu();
        await page.getByText('iec104127.0.0.1102test').click({button: 'right'});
        await configElement.clickAsdu();

        await page.getByText('iec104127.0.0.1102test').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Игнорировать Ctrl+I' }).click()
        await expect(page.locator('svg').filter({ hasText: 'Заблокирован' }).first()).toBeVisible();

        await page.getByText('asdu1asdu').first().click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Игнорировать Ctrl+I' }).click()

        await page.getByText('Заблокированiec104127.0.0.').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Копировать Ctrl+C' }).click();

        await config.contextMenuReception();
        await config.clickFolder();

        await page.getByText('folder').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Вставить Ctrl+V' }).click()
        await page.getByText('Заблокированiec104127.0.0.1102test_copy').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Использовать Ctrl+I' }).click();
        //await expect(page.locator('svg').filter({ hasText: 'Заблокирован' }).nth(2)).not.toBeVisible();
        await page.screenshot({path:'error.png'})
    })

    test('На 1 уровне: IEC104 Раздел "Передача"', async ({page}) => {
        const config = new ConfigPage(page);
        const configElement = new ConfigPageElements(page);   
        await config.goto();

        await config.contextMenuBroadcast();
        await config.clickIec104_S();

        await page.getByText('iec104127.0.0.').click({button:'right'});
        await page.getByText('iec104127.0.0.').dblclick();
        //await page.screenshot({path:'error.png'})
        await page.getByRole('treeitem', { name: 'iec104 127.0.0.1 102' }).getByRole('textbox').fill('test');
        await page.getByRole('treeitem', { name: 'iec104 127.0.0.1 102' }).getByRole('textbox').press('Enter');

        await page.getByText('iec104127.0.0.1102test').click({button: 'right'});
        await configElement.clickAsdu();
        await page.getByText('iec104127.0.0.1102test').click({button: 'right'});
        await configElement.clickAsdu();

        await page.getByText('iec104127.0.0.1102test').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Игнорировать Ctrl+I' }).click()
        await expect(page.locator('svg').filter({ hasText: 'Заблокирован' }).first()).toBeVisible();

        await page.getByText('asdu1asdu').first().click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Игнорировать Ctrl+I' }).click()

        await page.getByText('Заблокированiec104127.0.0.').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Копировать Ctrl+C' }).click();

        await config.contextMenuBroadcast();
        await config.clickFolder();

        await page.getByText('folder').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Вставить Ctrl+V' }).click()
        await page.getByText('Заблокированiec104127.0.0.1102test_copy').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Использовать Ctrl+I' }).click();
        //await expect(page.locator('svg').filter({ hasText: 'Заблокирован' }).nth(2)).not.toBeVisible();
        await page.screenshot({path:'error.png'})
    })