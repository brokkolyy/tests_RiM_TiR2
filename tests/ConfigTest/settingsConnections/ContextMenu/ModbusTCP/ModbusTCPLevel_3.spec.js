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
    const fg = page.getByText('fg1functionGroup')
    await fg.click({button:'right'});
    await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
    await configElement.clickObject_1();

    await config.contextMenuVariable();
    await page.getByRole('menuitem', { name: 'Создать переменную', exact: true }).hover();
    await config.clickVariable_1();

    await page.locator('div').filter({ hasText: /^Это поле обязательно для заполненияЭто поле обязательно для заполнения$/ }).nth(1).dblclick();
    await page.getByRole('option', { name: 'variable' }).click();

    await page.locator('div').filter({ hasText: /^variable$/ }).nth(1).click({button: 'right'});
    await page.getByRole('menuitem', { name: 'Игнорировать Ctrl+I' }).click();
    await page.getByText('Заблокированvariable').click({button: 'right'});
    await page.getByRole('menuitem', { name: 'Копировать Ctrl+C' }).click();

    const v = page.getByRole('menuitem', { name: 'Вставить Ctrl+V' });
    await config.contextMenuReception();
    await escape(page);
    await page.getByText('MB TCP127.0.0.').click({button:'right'});
    await escape(page)

    await fg.click({button:'right'})
    await config.clickFolder();
    await page.locator('div').filter({ hasText: /^folder$/ }).nth(1).click({button:'right'})
    await expect(v).toBeEnabled();
    await v.click();

    await page.locator('div').filter({ hasText: /^Заблокирован$/ }).nth(1).click({button: 'right'});
    await page.getByRole('menuitem', { name: 'Использовать Ctrl+I' }).click();

    await page.locator('div').filter({ hasText: /^Это поле обязательно для заполненияЭто поле обязательно для заполнения$/ }).nth(1).click({button: 'right'});
    await page.getByRole('menuitem', { name: 'Копировать Ctrl+C' }).click();
    await fg.click({button: 'right'});
    await page.getByRole('menuitem', { name: 'Вставить Ctrl+V' }).click();

    await page.getByText('Заблокированvariable').click({button: 'right'});
    await page.getByRole('menuitem', { name: 'Копировать Ctrl+C' }).click();

    await config.contextMenuReception();
    await config.clickFolder();
    await page.getByText('folder').nth(1).click({button:'right'});
    await config.clickModbusTCP_C();
    await page.getByText('MB TCP127.0.0.').nth(1).click({button: 'right'});
    await configElement.clickFunctionGroup();

    await page.getByText('fg1functionGroup').nth(1).click({button:'right'});
    await page.screenshot({path:'error.png'})
    await expect(v).toBeEnabled();
    await v.click();
    await page.getByText('Заблокированvariable').click({button: 'right'});
    await page.getByRole('menuitem', { name: 'Вырезать Ctrl+X' }).click();
    await page.getByText('fg1functionGroup').nth(1).click({button: 'right'});
    await page.getByRole('menuitem', { name: 'Вставить Ctrl+V' }).click();
})