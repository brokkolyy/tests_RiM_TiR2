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

test.describe('Навигация', () => {
    test.beforeEach(async ({page}) => {
        const config = new ConfigPage(page);
        const configElement = new ConfigPageElements(page);
        
        await config.goto();
        await config.contextMenuReception(); 
        await config.clickIec104_C();
                                
        await page.locator('div').filter({ hasText: /^iec104127\.0\.0\.1102iec104_client$/ }).nth(1).click({button:'right'});
        await configElement.clickAsdu();
        await page.locator('div').filter({ hasText: /^asdu1asdu$/ }).nth(1).click({button:'right'});
        await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
        await configElement.clickObject_1();
        const el = page.locator('div').filter({ hasText: /^ts1Это поле обязательно для заполненияЭто поле обязательно для заполнения$/ }).nth(1);
        await expect(el).toBeVisible();
        await el.click();
    });

    test('Уникальность адреса ИО (ИО - папка - ИО)', async ({page}) => {
        const config = new ConfigPage(page);
        const configElement = new ConfigPageElements(page);
        await page.locator('div').filter({ hasText: /^asdu1asdu$/ }).nth(1).click({button:'right'});
        await config.clickFolder();

        await page.locator('div').filter({ hasText: /^asdu1asdu$/ }).nth(1).click({button:'right'});
        await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
        await configElement.clickObject_1();
        await expect(page.getByText('ts1Это поле обязательно для заполненияЭто поле обязательно для заполнения').nth(1)).toBeVisible()
        await buttonError(page)

        await page.getByText('ts1Это поле обязательно для заполненияЭто поле обязательно для заполнения').first().click();
        let field = await prepareField(page);
        await field.fill('125');
        await field.press('Enter');

        await page.screenshot({path:'obj.png'})
        await page.locator('div').filter({ hasText: /^ts1$/ }).nth(1).click()//page.getByText('ts1Это поле обязательно для заполненияЭто поле обязательно для заполнения').nth(1).click();
        /*await page.locator('div').filter({ hasText: /^ts1$/ }).nth(1).click();
            await page.getByText('ts1Это поле обязательно для заполненияЭто поле обязательно для заполнения').click();
         */
        field = await prepareField(page);
        await field.fill('125');
        await field.press('Enter');

        await buttonError(page);
        await expect(page.locator('svg').filter({ hasText: 'Это поле обязательно для заполненияАдрес должен быть уникальным внутри родительс' }).first()).toBeVisible();

        await page.getByText('125ts1').nth(1).click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Удалить Backspace' }).click();
        await expect(page.locator('svg').filter({ hasText: 'Это поле обязательно для заполнения' })).toBeVisible()
    })
})