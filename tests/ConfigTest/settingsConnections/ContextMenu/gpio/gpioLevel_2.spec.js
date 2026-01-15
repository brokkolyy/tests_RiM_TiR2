const path = require('path');
const { test, expect } = require('@playwright/test');
const ConfigPage = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPage.js'));
const ConfigPageElements = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPageElements.js'));

    test('На 1 уровне: GPIO ', async ({page}) => {
        const config = new ConfigPage(page);
        const configElement = new ConfigPageElements(page);   
        await config.goto();

        await config.contextMenuVariable();
        await page.getByRole('menuitem', { name: 'Создать переменную' }).hover();
        await config.clickVariable_1();

        await config.contextMenuReception();
        await config.clickGpio();

        let gpio = page.getByText('gpio200gpio');
        await gpio.click({button:'right'})
        await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
        await configElement.clickObject_1();

        await page.getByText('1in').dblclick();
        await page.getByRole('option', { name: 'variable' }).click();
        await expect(page.getByText('1invariable')).toBeVisible();

        await page.getByText('1invariable').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Игнорировать Ctrl+I' }).click();
        await expect(page.getByText('Заблокирован1invariable')).toBeVisible();

        await page.getByText('Заблокирован1invariable').click({button:'right'})
        await page.getByRole('menuitem', { name: 'Копировать Ctrl+C' }).click();
        await config.contextMenuReception();
        await expect(page.getByRole('menuitem', { name: 'Вставить Ctrl+V' })).toBeDisabled();

        await config.contextMenuReception();
        await page.screenshot({path:'error.png'})
        await config.clickFolder();
        await page.getByText('folder').click({button: 'right'});
        await page.screenshot({path:'error.png'})
        // не работает
        //await expect(page.getByRole('menuitem', { name: 'Копировать Ctrl+C' })).toHaveAttribute('data-disabled');//await expect(page.getByRole('menuitem', { name: 'Копировать Ctrl+C' })).toBeDisabled();
    });