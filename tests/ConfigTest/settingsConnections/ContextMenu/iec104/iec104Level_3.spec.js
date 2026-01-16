const path = require('path');
const { test, expect } = require('@playwright/test');
const ConfigPage = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPage.js'));
const ConfigPageElements = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPageElements.js'));

async function escape(page) {
    const v = page.getByRole('menuitem', { name: 'Вставить Ctrl+V' });
    await expect(v).toBeDisabled();
    await page.keyboard.press('Escape');
}
async function createASDU(page) {
    const configElement = new ConfigPageElements(page); 
    await page.getByText('iec104127.0.0.').first().click({button: 'right'});
    await configElement.clickAsdu();
}

    test('На 3 уровне: IEC-104 -ASDU-объект данных, Раздел "Прием"', async ({page}) => {
        const config = new ConfigPage(page);
        const configElement = new ConfigPageElements(page);   
        await config.goto();

        await config.contextMenuReception();
        await config.clickIec104_C();
        await createASDU(page)

        await page.locator('div').filter({ hasText: /^asdu1asdu$/ }).nth(1).click({button:'right'});
        await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
        await configElement.clickObject_1();

        await page.getByText('ts1').click({button:'right'})
        await page.getByRole('menuitem', { name: 'Игнорировать Ctrl+I' }).click();

        await page.getByText('ts1').click({button:'right'})
        await page.getByRole('menuitem', { name: 'Копировать Ctrl+C' }).click();

        const v = page.getByRole('menuitem', { name: 'Вставить Ctrl+V' });
        await config.contextMenuReception();
        await escape(page)

        await page.getByText('iec104127.0.0.').click({button: 'right'});
        await escape(page)

        await page.getByText('asdu1asdu').click({button:"right"});
        await config.clickFolder();
        await page.getByText('folder').click({button:'right'})
        await expect(v).toBeEnabled();
        await v.click();

        await page.getByText('Заблокированts1').nth(1).click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Использовать Ctrl+I' }).click()

        await page.locator('div').filter({ hasText: /^ts1$/ }).nth(1).click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Копировать Ctrl+C' }).click()
        await page.getByText('asdu1asdu').click({button: 'right'});
        await v.click()

        await page.locator('div').filter({ hasText: /^ts1$/ }).nth(3).click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Вырезать Ctrl+X' }).click()

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
        await page.getByText('MB TCP127.0.0.').click({button: 'right'});
        await escape(page)
        await config.contextMenuReception();
        await config.clickIec104_C();
        await createASDU(page)

        await page.getByText('asdu1asdu').nth(1).click({button:'right'});
        await expect(v).toBeEnabled();
        await v.click();

        await page.getByText('Заблокированts1').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Вырезать Ctrl+X' }).click();
        await page.getByText('asdu1asdu').nth(1).click({button: 'right'});
        await v.click()
    })

    test('На 3 уровне: IEC-104 -ASDU-объект данных, Раздел "Передача"', async ({page}) => {
        const config = new ConfigPage(page);
        const configElement = new ConfigPageElements(page);   
        await config.goto();

        await config.contextMenuBroadcast();
        await config.clickIec104_S();
        await createASDU(page)

        await page.locator('div').filter({ hasText: /^asdu1asdu$/ }).nth(1).click({button:'right'});
        await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
        await configElement.clickObject_1();

        await page.getByText('ts1').click({button:'right'})
        await page.getByRole('menuitem', { name: 'Игнорировать Ctrl+I' }).click();

        await page.getByText('ts1').click({button:'right'})
        await page.getByRole('menuitem', { name: 'Копировать Ctrl+C' }).click();

        const v = page.getByRole('menuitem', { name: 'Вставить Ctrl+V' });
        await config.contextMenuBroadcast();
        await escape(page)

        await page.getByText('iec104127.0.0.').click({button: 'right'});
        await escape(page)

        await page.getByText('asdu1asdu').click({button:"right"});
        await config.clickFolder();
        await page.getByText('folder').click({button:'right'})
        await expect(v).toBeEnabled();
        await v.click();

        await page.getByText('Заблокированts1').nth(1).click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Использовать Ctrl+I' }).click()

        await page.locator('div').filter({ hasText: /^ts1$/ }).nth(1).click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Копировать Ctrl+C' }).click()
        await page.getByText('asdu1asdu').click({button: 'right'});
        await v.click()

        await page.locator('div').filter({ hasText: /^ts1$/ }).nth(3).click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Вырезать Ctrl+X' }).click()

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
        await page.getByText('MB TCP127.0.0.').click({button: 'right'});
        await escape(page)

        await config.contextMenuBroadcast();
        await config.clickIec104_S();
        await createASDU(page)

        await page.getByText('asdu1asdu').nth(1).click({button:'right'});
        await expect(v).toBeEnabled();
        await v.click();

        await page.getByText('Заблокированts1').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Вырезать Ctrl+X' }).click();
        await page.getByText('asdu1asdu').nth(1).click({button: 'right'});
        await v.click()
    })

    test('На 3 уровне: IEC-104 -ASDU-папка, Раздел "Прием"', async ({page}) => {
        const config = new ConfigPage(page);
        const configElement = new ConfigPageElements(page);   
        await config.goto();

        await config.contextMenuReception();
        await config.clickIec104_C();
        await createASDU(page)

        await page.locator('div').filter({ hasText: /^asdu1asdu$/ }).nth(1).click({button:'right'});
        await config.clickFolder();
        await page.getByText('folder').dblclick()
        await page.locator('input[type="text"]').fill('test');
        await page.locator('input[type="text"]').press('Enter');

        let testFolder = page.getByRole('paragraph').filter({ hasText: 'test' });
        await testFolder.click({button:'right'});
        await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
        await configElement.clickObject_1();
        await testFolder.click({button:'right'});
        await config.clickFolder();

        await testFolder.click({button:'right'});
        await page.getByRole('menuitem', { name: 'Игнорировать Ctrl+I' }).click();
        testFolder = page.getByText('Заблокированtest');
        await expect(page.locator('svg').filter({ hasText: 'Заблокирован' })).toBeVisible();
        await testFolder.click({button:'right'});
        await expect(page.getByRole('menuitem', { name: 'Использовать Ctrl+I' })).toBeEnabled();
        await page.keyboard.press('Escape');
    
        await page.getByText('folder').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Игнорировать Ctrl+I' }).click();
        await expect(page.locator('svg').filter({ hasText: 'Заблокирован' }).nth(1)).toBeVisible();

        await testFolder.click({button:'right'});
        await page.getByRole('menuitem', { name: 'Копировать Ctrl+C' }).click()

        const v = page.getByRole('menuitem', { name: 'Вставить Ctrl+V' });
        await config.contextMenuReception();
        await escape(page)
        await page.getByText('iec104127.0.0.').click({button: 'right'});
        await escape(page);
        await page.locator('div').filter({ hasText: /^asdu1asdu$/ }).nth(1).click({button:'right'});
        await expect(v).toBeEnabled();
        await v.click();

        await page.getByText('Заблокированtest_copy').click({button:'right'});
        await page.getByRole('menuitem', { name: 'Использовать Ctrl+I' }).click();
        await page.locator('div').filter({ hasText: /^test_copy$/ }).nth(1).click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Копировать Ctrl+C' }).click()

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
        await page.getByText('MB TCP127.0.0.').click({button: 'right'});
        await escape(page)

        await config.contextMenuReception();
        await config.clickIec104_C();
        await createASDU(page)
        await page.getByText('asdu1asdu').nth(1).click({button:'right'})
        await expect(v).toBeEnabled();
        await v.click();

        await testFolder.click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Вырезать Ctrl+X' }).click();
        await page.locator('div').filter({ hasText: /^test_copy$/ }).nth(4).click({button: 'right'});
        await v.click()
    })

    test('На 3 уровне: IEC-104 -ASDU-папка, Раздел "Передача"', async ({page}) => {
        const config = new ConfigPage(page);
        const configElement = new ConfigPageElements(page);   
        await config.goto();

        await config.contextMenuBroadcast();
        await config.clickIec104_S();
        await createASDU(page)

        await page.locator('div').filter({ hasText: /^asdu1asdu$/ }).nth(1).click({button:'right'});
        await config.clickFolder();
        await page.getByText('folder').dblclick()
        await page.locator('input[type="text"]').fill('test');
        await page.locator('input[type="text"]').press('Enter');

        let testFolder = page.getByRole('paragraph').filter({ hasText: 'test' });
        await testFolder.click({button:'right'});
        await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
        await configElement.clickObject_1();
        await testFolder.click({button:'right'});
        await config.clickFolder();

        await testFolder.click({button:'right'});
        await page.getByRole('menuitem', { name: 'Игнорировать Ctrl+I' }).click();
        testFolder = page.getByText('Заблокированtest');
        await expect(page.locator('svg').filter({ hasText: 'Заблокирован' })).toBeVisible();
        await testFolder.click({button:'right'});
        await expect(page.getByRole('menuitem', { name: 'Использовать Ctrl+I' })).toBeEnabled();
        await page.keyboard.press('Escape');
    
        await page.getByText('folder').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Игнорировать Ctrl+I' }).click();
        await expect(page.locator('svg').filter({ hasText: 'Заблокирован' }).nth(1)).toBeVisible();

        await testFolder.click({button:'right'});
        await page.getByRole('menuitem', { name: 'Копировать Ctrl+C' }).click()

        const v = page.getByRole('menuitem', { name: 'Вставить Ctrl+V' });
        await config.contextMenuBroadcast();
        await escape(page)
        await page.getByText('iec104127.0.0.').click({button: 'right'});
        await escape(page);
        await page.locator('div').filter({ hasText: /^asdu1asdu$/ }).nth(1).click({button:'right'});
        await expect(v).toBeEnabled();
        await v.click();

        await page.getByText('Заблокированtest_copy').click({button:'right'});
        await page.getByRole('menuitem', { name: 'Использовать Ctrl+I' }).click();
        await page.locator('div').filter({ hasText: /^test_copy$/ }).nth(1).click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Копировать Ctrl+C' }).click()

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
        await page.getByText('MB TCP127.0.0.').click({button: 'right'});
        await escape(page)

        await config.contextMenuBroadcast();
        await config.clickIec104_S();
        await createASDU(page)
        await page.getByText('asdu1asdu').nth(1).click({button:'right'})
        await expect(v).toBeEnabled();
        await v.click();

        await testFolder.click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Вырезать Ctrl+X' }).click();
        await page.locator('div').filter({ hasText: /^test_copy$/ }).nth(4).click({button: 'right'});
        await v.click()
    })
