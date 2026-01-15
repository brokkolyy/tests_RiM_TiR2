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
        await page.getByText('iec104127.0.0.').click({button: 'right'});
        await configElement.clickAsdu();

        await page.getByText('asdu1asdu').dblclick();
        await page.getByRole('treeitem', { name: 'asdu 1 asdu' }).getByRole('textbox').fill('test');
        await page.keyboard.press('Enter');

        await page.getByText('asdu1test').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Создать "Папка"' }).click();
        await page.getByText('asdu1test').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
        await configElement.clickObject_1();

        await page.getByText('asdu1test').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Игнорировать Ctrl+I' }).click();
        await expect(page.locator('svg').filter({ hasText: 'Заблокирован' })).toBeVisible();
        

        await page.getByText('ts1').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Игнорировать Ctrl+I' }).click();
        await expect(page.locator('svg').filter({ hasText: 'Заблокирован' }).nth(1)).toBeVisible();
        await page.getByText('asdu1test').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Копировать Ctrl+C' }).click();

        await config.contextMenuReception();
        await config.clickComport()
        await config.contextMenuReception();
        await config.clickGpio()
        await config.contextMenuReception();
        await config.clickIec104_C()
        await config.contextMenuReception();
        await config.clickModbusTCP_C()
        await config.contextMenuReception();
        await config.clickFolder()

        const v = page.getByRole('menuitem', { name: 'Вставить Ctrl+V' });
        await page.getByText('COMttyS0115200comport').click({button:'right'});
        await expect(v).toBeDisabled();
        await page.keyboard.press('Escape');
        await page.getByText('gpio200gpio').click({button:'right'})
        await expect(v).toBeDisabled();
        await page.keyboard.press('Escape');
        /*await page.getByText('iec104127.0.0.').nth(1).click({button:'right'});
        await expect(v).toBeEnabled();
        await page.keyboard.press('Escape');*/
        await page.getByText('MB TCP127.0.0.').click({button:'right'});
        await expect(v).toBeDisabled();
        await page.keyboard.press('Escape');
        await page.getByText('folder').nth(1).click({button:"right"});
        await expect(v).toBeDisabled();
        await page.keyboard.press('Escape');
        await config.clickIec104_C();
        await page.getByText('iec104127.0.0.').nth(1).click({button:'right'})
        await expect(v).toBeEnabled();
        await v.click();

        await page.getByText('Заблокированasdu1test_copy').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Использовать Ctrl+I' }).click();

        await page.getByText('asdu1test_copy').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Вырезать Ctrl+X' }).click();
    })

    test('На 1 уровне: IEC104 Раздел "Передача"', async ({page}) => {
        const config = new ConfigPage(page);
        const configElement = new ConfigPageElements(page);   
        await config.goto();

        await config.contextMenuBroadcast();
        await config.clickIec104_S();
        await page.getByText('iec104127.0.0.').click({button: 'right'});
        await configElement.clickAsdu();

        await page.getByText('asdu1asdu').dblclick();
        await page.getByRole('treeitem', { name: 'asdu 1 asdu' }).getByRole('textbox').fill('test');
        await page.keyboard.press('Enter');

        await page.getByText('asdu1test').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Создать "Папка"' }).click();
        await page.getByText('asdu1test').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
        await configElement.clickObject_1();

        await page.getByText('asdu1test').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Игнорировать Ctrl+I' }).click();
        await expect(page.locator('svg').filter({ hasText: 'Заблокирован' })).toBeVisible();
        

        await page.getByText('ts1').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Игнорировать Ctrl+I' }).click();
        await expect(page.locator('svg').filter({ hasText: 'Заблокирован' }).nth(1)).toBeVisible();
        await page.getByText('asdu1test').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Копировать Ctrl+C' }).click();

        await config.contextMenuBroadcast();
        await config.clickComport()
        await config.contextMenuBroadcast();
        await config.clickGpio()
        await config.contextMenuBroadcast();
        await config.clickIec104_S()
        await config.contextMenuBroadcast();
        await config.clickModbusTCP_S()
        await config.contextMenuBroadcast();
        await config.clickFolder()

        const v = page.getByRole('menuitem', { name: 'Вставить Ctrl+V' });
        await page.getByText('COMttyS0115200comport').click({button:'right'});
        await expect(v).toBeDisabled();
        await page.keyboard.press('Escape');
        await page.getByText('gpio200gpio').click({button:'right'})
        await expect(v).toBeDisabled();
        await page.keyboard.press('Escape');
        /*await page.getByText('iec104127.0.0.').nth(1).click({button:'right'});
        await expect(v).toBeEnabled();
        await page.keyboard.press('Escape');*/
        await page.getByText('MB TCP127.0.0.').click({button:'right'});
        await expect(v).toBeDisabled();
        await page.keyboard.press('Escape');
        await page.getByText('folder').nth(1).click({button:"right"});
        await expect(v).toBeDisabled();
        await page.keyboard.press('Escape');
        await config.clickIec104_S();
        await page.getByText('iec104127.0.0.').nth(1).click({button:'right'})
        await expect(v).toBeEnabled();
        await v.click();

        await page.getByText('Заблокированasdu1test_copy').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Использовать Ctrl+I' }).click();

        await page.getByText('asdu1test_copy').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Вырезать Ctrl+X' }).click();
    })