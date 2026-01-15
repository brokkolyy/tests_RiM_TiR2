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

        await page.getByText('asdu1asdu').click({button:"right"})
        await page.getByRole('menu', { name: 'Создать "Объект данных"' }).hover()
        await configElement.clickObject_1();

        await page.getByText('ts1').click({button:'right'})
        await page.getByRole('menuitem', { name: 'Игнорировать Ctrl+I' }).click();

        await page.getByText('ts1').click({button:'right'})
        await page.getByRole('menuitem', { name: 'Копировать Ctrl+C' }).click();

        await page.getByText('asdu1asdu').click({button:"right"});
        await config.clickFolder();
        await page.getByText('folder').click({button:'right'})
        await expect(page.getByRole('menuitem', { name: 'Вставить Ctrl+V' })).toBeEnabled();
        await page.getByRole('menuitem', { name: 'Вставить Ctrl+V' }).click();
        await page.getByText('Заблокированts1').nth(1).click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Использовать Ctrl+I' }).click()

        await page.locator('div').filter({ hasText: /^ts1$/ }).nth(1).click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Копировать Ctrl+C' }).click()
        await page.getByText('asdu1asdu').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Вставить Ctrl+V' }).click()
    })