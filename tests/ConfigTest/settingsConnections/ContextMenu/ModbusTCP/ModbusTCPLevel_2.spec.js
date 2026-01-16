const path = require('path');
const { test, expect } = require('@playwright/test');
const ConfigPage = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPage.js'));
const ConfigPageElements = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPageElements.js'));

async function escape(page) {
    const v = page.getByRole('menuitem', { name: 'Вставить Ctrl+V' });
    await expect(v).toBeDisabled();
    await page.keyboard.press('Escape');
}

test('На 2 уровне: Modbus-TCP -> Функциональная группа, Раздел "Прием"', async ({page}) => {
    const config = new ConfigPage(page);
    const configElement = new ConfigPageElements(page);   
    await config.goto();

    await config.contextMenuReception();
    await config.clickModbusTCP_C();

    await page.getByText('MB TCP127.0.0.').click({button:'right'});
    await configElement.clickFunctionGroup();
    await page.getByText('fg1functionGroup').dblclick();
    await page.locator('input[type="text"]').fill('test');
    await page.locator('input[type="text"]').press('Enter');

    let test = page.getByText('fg1test');
    await test.click({button:'right'});
    await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
    await configElement.clickObject_1();
    await test.click({button:'right'});
    await config.clickFolder();

    await test.click({button:'right'});
    await page.getByRole('menuitem', { name: 'Игнорировать Ctrl+I' }).click();
    await expect(page.locator('svg').filter({ hasText: 'Заблокирован' })).toBeVisible();
    test = page.getByText('Заблокированfg1test');
    await test.click({button:'right'});
    await expect(page.getByRole('menuitem', { name: 'Использовать Ctrl+I' })).toBeEnabled();

    //await test.click({button:'right'});
    await page.getByRole('menuitem', { name: 'Копировать Ctrl+C' }).click();

    const v = page.getByRole('menuitem', { name: 'Вставить Ctrl+V' });

    await config.contextMenuReception();
    await escape(page);

    await config.contextMenuReception();
    await config.clickComport();
    await page.getByText('COMttyS0115200comport').click({button: 'right'});
    await escape(page)

    await config.contextMenuReception();
    await config.clickGpio();
    await page.getByText('gpio200gpio').click({button:'right'})
    await escape(page)
         
    await config.contextMenuReception()
    await config.clickFolder();
    await page.getByText('folder').first().click({button:'right'})   
    await escape(page)

    await config.contextMenuReception();
    await config.clickModbusTCP_C();
    await page.getByText('MB TCP127.0.0.1502modbusTCP_client').first().click({button: 'right'});
    await expect(v).toBeEnabled();
    await v.click()

    await page.getByText('Заблокированfg1test_copy').click({button:'right'});
    await page.getByRole('menuitem', { name: 'Использовать Ctrl+I' }).click();
    await expect(page.locator('svg').filter({ hasText: 'Заблокирован' }).nth(1)).toBeHidden(); 

    await page.getByText('fg1test_copy').click({button: 'right'});
    await page.getByRole('menuitem', { name: 'Вырезать Ctrl+X' }).click();

    await page.getByText('MB TCP127.0.0.').nth(1).click({button: 'right'});
    await page.getByRole('menuitem', { name: 'Вставить Ctrl+V' }).click();

    await test.click({button: 'right'});
    await page.getByRole('menuitem', { name: 'Вырезать Ctrl+X' }).click();
    await page.getByText('MB TCP127.0.0.').nth(1).click({button: 'right'});
    await page.getByRole('menuitem', { name: 'Вставить Ctrl+V' }).click();
})

test('На 2 уровне: Modbus-TCP -> Функциональная группа, Раздел "Передача"', async ({page}) => {
    const config = new ConfigPage(page);
    const configElement = new ConfigPageElements(page);   
    await config.goto();

    await config.contextMenuBroadcast();
    await config.clickModbusTCP_S();

    await page.getByText('MB TCP127.0.0.').click({button:'right'});
    await configElement.clickFunctionGroup();
    await page.getByText('fg1functionGroup').dblclick();
    await page.locator('input[type="text"]').fill('test');
    await page.locator('input[type="text"]').press('Enter');

    let test = page.getByText('fg1test');
    await test.click({button:'right'});
    await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
    await configElement.clickObject_1();
    await test.click({button:'right'});
    await config.clickFolder();

    await test.click({button:'right'});
    await page.getByRole('menuitem', { name: 'Игнорировать Ctrl+I' }).click();
    await expect(page.locator('svg').filter({ hasText: 'Заблокирован' })).toBeVisible();
    test = page.getByText('Заблокированfg1test');
    await test.click({button:'right'});
    await expect(page.getByRole('menuitem', { name: 'Использовать Ctrl+I' })).toBeEnabled();

    //await test.click({button:'right'});
    await page.getByRole('menuitem', { name: 'Копировать Ctrl+C' }).click();

    const v = page.getByRole('menuitem', { name: 'Вставить Ctrl+V' });

    await config.contextMenuBroadcast();
    await escape(page);

    await config.contextMenuBroadcast();
    await config.clickComport();
    await page.getByText('COMttyS0115200comport').click({button: 'right'});
    await escape(page)

    await config.contextMenuBroadcast();
    await config.clickGpio();
    await page.getByText('gpio200gpio').click({button:'right'})
    await escape(page)
         
    await config.contextMenuBroadcast()
    await config.clickFolder();
    await page.getByText('folder').first().click({button:'right'})   
    await escape(page)

    await config.contextMenuBroadcast();
    await config.clickModbusTCP_S();
    await page.getByText('MB TCP127.0.0.1502modbusTCP_server').first().click({button: 'right'});
    await expect(v).toBeEnabled();
    await v.click()

    await page.getByText('Заблокированfg1test_copy').click({button:'right'});
    await page.getByRole('menuitem', { name: 'Использовать Ctrl+I' }).click();
    await expect(page.locator('svg').filter({ hasText: 'Заблокирован' }).nth(1)).toBeHidden(); 

    await page.getByText('fg1test_copy').click({button: 'right'});
    await page.getByRole('menuitem', { name: 'Вырезать Ctrl+X' }).click();

    await page.getByText('MB TCP127.0.0.').nth(1).click({button: 'right'});
    await page.getByRole('menuitem', { name: 'Вставить Ctrl+V' }).click();

    await test.click({button: 'right'});
    await page.getByRole('menuitem', { name: 'Вырезать Ctrl+X' }).click();
    await page.getByText('MB TCP127.0.0.').nth(1).click({button: 'right'});
    await page.getByRole('menuitem', { name: 'Вставить Ctrl+V' }).click();
})