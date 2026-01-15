const path = require('path');
const { test, expect } = require('@playwright/test');
const ConfigPage = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPage.js'));
const ConfigPageElements = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPageElements.js'));

async function buttonError(page) {
    const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
    await expect(buttonError).toBeVisible();
}
async function prepareField(page) {
    const field = page.getByRole('spinbutton', { name: 'Адрес информационного объекта' });
    await field.fill('');
    await field.focus();
    await expect(field).toBeFocused();
    return field
}

test.describe('Навигация (не работает)', () => {
    test.beforeEach(async ({page}) => {
        const config = new ConfigPage(page);
        const configElement = new ConfigPageElements(page);
        
        await config.goto();
        await config.contextMenuReception(); 
        await config.clickIec104_C();
                                
        await page.locator('div').filter({ hasText: /^iec104127\.0\.0\.1102iec104_client$/ }).nth(1).click({button:'right'});
        await configElement.clickAsdu();
    });

    test('Уникальность адреса ИО ((папка-ИО) - (папка - ИО))', async ({page}) => {
        const config = new ConfigPage(page);
        const configElement = new ConfigPageElements(page);
        await page.locator('div').filter({ hasText: /^asdu1asdu$/ }).nth(1).click({button:'right'});
        await config.clickFolder();         

        await page.locator('div').filter({ hasText: /^asdu1asdu$/ }).nth(1).click({button:'right'});
        await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
        await configElement.clickObject_1();

        await page.locator('div').filter({ hasText: /^asdu1asdu$/ }).nth(1).click({button:'right'});
        await config.clickFolder();

        await page.locator('div').filter({ hasText: /^folder$/ }).nth(1).click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
        await page.getByRole('menuitem', { name: 'Создать "Объект данных" (1)' }).click();
        await buttonError(page)

    })  
})