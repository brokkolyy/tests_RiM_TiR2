const path = require('path');
const { test, expect } = require('@playwright/test');
const ConfigPage = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPage.js'));
const ConfigPageElements = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPageElements.js'));

async function escape(page) {
    const v = page.getByRole('menuitem', { name: 'Вставить Ctrl+V' });
    await expect(v).toBeDisabled();
    await page.keyboard.press('Escape');
}

    test('На 1 уровне: Modbus-TCP  Раздел "Прием"', async ({page}) => {
        const config = new ConfigPage(page);
        const configElement = new ConfigPageElements(page);   
        await config.goto();

        await config.contextMenuReception();
        await config.clickModbusTCP_C();

        await page.getByText('MB TCP127.0.0.').dblclick();
        await page.getByRole('treeitem', { name: 'MB TCP 127.0.0.1 502' }).getByRole('textbox').fill('test');
        await page.getByRole('treeitem', { name: 'MB TCP 127.0.0.1 502' }).getByRole('textbox').press('Enter');
        let test = page.getByText('MB TCP127.0.0.1502test');

        const v = page.getByRole('menuitem', { name: 'Вставить Ctrl+V' });
        await test.click({button:'right'});
        await escape(page)

        await test.click({button:'right'})
        await configElement.clickFunctionGroup();
        await test.click({button:'right'});
        await page.getByRole('menuitem', { name: 'Игнорировать Ctrl+I' }).click();
        await expect(page.locator('svg').filter({ hasText: 'Заблокирован' })).toBeVisible();

        await page.getByText('functionGroup').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
        await configElement.clickObject_1();

        test = page.getByText('ЗаблокированMB TCP127.0.0.');
        
        await test.click({button:'right'})
        await expect(page.getByRole('menuitem', { name: 'Использовать Ctrl+I' })).toBeEnabled();
        await page.keyboard.press('Escape');
        await test.click({button:'right'})
        await page.getByRole('menuitem', { name: 'Копировать Ctrl+C' }).click();

        //await config.contextMenuReception();
        //await escape(page);

        //await test.click({button:'right'})
        //await escape(page);

        await config.contextMenuReception();
        await config.clickComport();
        await page.getByText('COMttyS0115200comport').click({button: 'right'});
        await escape(page)

        await config.contextMenuReception();
        await config.clickGpio();
        await page.getByText('gpio200gpio').click({button:'right'})
        await escape(page)
        

        await config.contextMenuReception();
        await config.clickModbusTCP_C();
        await page.getByText('MB TCP127.0.0.1502modbusTCP_client').click({button: 'right'});
        await escape(page)
        
        /*await config.contextMenuReception();
        await config.clickIec104_C();
        await escape(page)
        */
        await config.contextMenuReception()
        await config.clickFolder();
        await page.getByText('folder').click({button:'right'})
        await page.screenshot({path:'error.png'})
        await expect(v).toBeEnabled();
        await v.click();
        await page.getByText('ЗаблокированMB TCP127.0.0.1502test_copy').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Использовать Ctrl+I' }).click();

        await page.getByText('MB TCP127.0.0.1502test_copy').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Вырезать Ctrl+X' }).click()
    })

    test('На 1 уровне: Modbus-TCP  Раздел "Передача"', async ({page}) => {
        const config = new ConfigPage(page);
        const configElement = new ConfigPageElements(page);   
        await config.goto();

        await config.contextMenuBroadcast();
        await config.clickModbusTCP_S();

        await page.getByText('MB TCP127.0.0.').dblclick();
        await page.getByRole('treeitem', { name: 'MB TCP 127.0.0.1 502' }).getByRole('textbox').fill('test');
        await page.getByRole('treeitem', { name: 'MB TCP 127.0.0.1 502' }).getByRole('textbox').press('Enter');
        let test = page.getByText('MB TCP127.0.0.1502test');

        const v = page.getByRole('menuitem', { name: 'Вставить Ctrl+V' });
        await test.click({button:'right'});
        await escape(page)

        await test.click({button:'right'})
        await configElement.clickFunctionGroup();
        await test.click({button:'right'});
        await page.getByRole('menuitem', { name: 'Игнорировать Ctrl+I' }).click();
        await expect(page.locator('svg').filter({ hasText: 'Заблокирован' })).toBeVisible();

        await page.getByText('functionGroup').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
        await configElement.clickObject_1();

        test = page.getByText('ЗаблокированMB TCP127.0.0.');
        
        await test.click({button:'right'})
        await expect(page.getByRole('menuitem', { name: 'Использовать Ctrl+I' })).toBeEnabled();
        await page.keyboard.press('Escape');
        await test.click({button:'right'})
        await page.getByRole('menuitem', { name: 'Копировать Ctrl+C' }).click();

        //await config.contextMenuReception();
        //await escape(page);

        //await test.click({button:'right'})
        //await escape(page);

        await config.contextMenuBroadcast();
        await config.clickComport();
        await page.getByText('COMttyS0115200comport').click({button: 'right'});
        await escape(page)

        await config.contextMenuBroadcast();
        await config.clickGpio();
        await page.getByText('gpio200gpio').click({button:'right'})
        await escape(page)
        

        await config.contextMenuBroadcast();
        await config.clickModbusTCP_S();
        await page.getByText('MB TCP127.0.0.1502modbusTCP_server').click({button: 'right'});
        await escape(page)
        
        /*await config.contextMenuReception();
        await config.clickIec104_C();
        await escape(page)
        */
        await config.contextMenuBroadcast()
        await config.clickFolder();
        await page.getByText('folder').click({button:'right'})
        await page.screenshot({path:'error.png'})
        await expect(v).toBeEnabled();
        await v.click();
        await page.getByText('ЗаблокированMB TCP127.0.0.1502test_copy').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Использовать Ctrl+I' }).click();

        await page.getByText('MB TCP127.0.0.1502test_copy').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Вырезать Ctrl+X' }).click()
    })