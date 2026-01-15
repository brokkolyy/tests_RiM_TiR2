const path = require('path');
const { test, expect } = require('@playwright/test');
const ConfigPage = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPage.js'));
const ConfigPageElements = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPageElements.js'));

    test('На 1 уровне: GPIO ', async ({page}) => {
        const config = new ConfigPage(page);
        const configElement = new ConfigPageElements(page);   
        await config.goto();

        await config.contextMenuReception();
        await config.clickGpio();

        let gpio = page.getByText('gpio200gpio').first()
        await gpio.dblclick();
        await page.getByRole('treeitem', { name: 'gpio 200 gpio' }).getByRole('textbox').fill('test');
        await page.keyboard.press('Enter');

        gpio = page.locator('div').filter({ hasText: /^gpio200test$/ }).nth(1);
        await gpio.click({button:'right'})
        await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
        await configElement.clickObject_1();
        await gpio.click({button:'right'})
        await page.screenshot({path:'error.png'})
        await config.clickFolder()
        
        await gpio.click({button:'right'})
        await page.getByRole('menuitem', { name: 'Игнорировать Ctrl+I' }).click();
        const block = page.locator('div').filter({ hasText: /^Заблокированgpio200test$/ }).nth(1)
        await page.screenshot({path:'error.png'})
        await expect(block).toBeVisible();
        gpio = page.getByText('Заблокированgpio200test');
        await gpio.click({button:'right'})
        await page.getByRole('menuitem', { name: 'Копировать Ctrl+C' }).click();
        await page.getByText('1in').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Игнорировать Ctrl+I' }).click();
        await expect(page.locator('svg').filter({ hasText: 'Заблокирован' }).nth(1)).toBeVisible();

        const V = page.getByRole('menuitem', { name: 'Вставить Ctrl+V' })

        await config.contextMenuReception();
        await config.clickComport();
        await page.getByText('COMttyS0115200comport').click({button: 'right'});
        await expect(V).toBeDisabled();
        await page.keyboard.press('Escape');

        await config.contextMenuReception();
        await config.clickIec104_C();
        await page.getByText('iec104127.0.0.').click({button: 'right'});
        await expect(V).toBeDisabled();
        await page.keyboard.press('Escape');

        await config.contextMenuReception();
        await config.clickModbusTCP_C();
        await page.getByText('MB TCP127.0.0.').click({button: 'right'});
        await expect(V).toBeDisabled();
        await page.keyboard.press('Escape');

        await config.contextMenuReception();
        await config.clickFolder();
        await page.getByText('folder').nth(1).click({button: 'right'});
        await expect(V).toBeEnabled();
        await V.click();

        await page.getByText('Заблокированgpio200test_copy').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Использовать Ctrl+I' }).click();

        await page.getByText('Заблокированgpio200test').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Удалить Backspace' }).click();
    })

    test('На 1 уровне: GPIO (Раздел "Передача")', async ({page}) => {
        const config = new ConfigPage(page);
        const configElement = new ConfigPageElements(page);   
        await config.goto();

        await config.contextMenuBroadcast();
        await config.clickGpio();

        let gpio = page.getByText('gpio200gpio').first()
        await gpio.dblclick();
        await page.getByRole('treeitem', { name: 'gpio 200 gpio' }).getByRole('textbox').fill('test');
        await page.keyboard.press('Enter');

        gpio = page.locator('div').filter({ hasText: /^gpio200test$/ }).nth(1);
        await gpio.click({button:'right'})
        await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
        await configElement.clickObject_1();
        await gpio.click({button:'right'})
        await config.clickFolder()
        
        await gpio.click({button:'right'})
        await page.getByRole('menuitem', { name: 'Игнорировать Ctrl+I' }).click();
        const block = page.locator('div').filter({ hasText: /^Заблокированgpio200test$/ }).nth(1)
        await page.screenshot({path:'error.png'})
        await expect(block).toBeVisible();
        gpio = page.getByText('Заблокированgpio200test');
        await gpio.click({button:'right'})
        await page.getByRole('menuitem', { name: 'Копировать Ctrl+C' }).click();
        await page.getByText('1in').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Игнорировать Ctrl+I' }).click();
        await expect(page.locator('svg').filter({ hasText: 'Заблокирован' }).nth(1)).toBeVisible();

        const V = page.getByRole('menuitem', { name: 'Вставить Ctrl+V' })

        await config.contextMenuBroadcast();
        await config.clickComport();
        await page.getByText('COMttyS0115200comport').click({button: 'right'});
        await expect(V).toBeDisabled();
        await page.keyboard.press('Escape');

        await config.contextMenuBroadcast();
        await config.clickIec104_S();
        await page.getByText('iec104127.0.0.').click({button: 'right'});
        await expect(V).toBeDisabled();
        await page.keyboard.press('Escape');

        await config.contextMenuBroadcast();
        await config.clickModbusTCP_S();
        await page.getByText('MB TCP127.0.0.').click({button: 'right'});
        await expect(V).toBeDisabled();
        await page.keyboard.press('Escape');

        await config.contextMenuBroadcast();
        await config.clickFolder();
        await page.getByText('folder').nth(1).click({button: 'right'});
        await page.screenshot({path:'error.png'})
        await expect(V).not.toBeDisabled();
        await V.click();

        await page.getByText('Заблокированgpio200test_copy').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Использовать Ctrl+I' }).click();

        await page.getByText('Заблокированgpio200test').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Удалить Backspace' }).click();
    })