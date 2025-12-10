const path = require('path');
const { test, expect } = require('@playwright/test');
const ConfigPage = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPage.js'));
const ConfigPageElements = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPageElements.js'));

test.describe('Навигация', () => {
    test.beforeEach(async ({page}) => {
        const config = new ConfigPage(page);
        const configElement = new ConfigPageElements(page);

        await config.goto();
        await config.contextMenuReception(); 
        await config.clickGpio();
                        
        await page.locator('div').filter({ hasText: /^gpio200gpio$/ }).nth(1).click({button:'right'});
        await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover()
        await configElement.clickObject_5();
        const el = page.locator('div').filter({ hasText: /^1inЭто поле обязательно для заполнения$/ }).nth(1)
        await expect(el).toBeVisible();
        await el.click();
    });

    test('Уникальность объекта данных (по порту)', async ({page}) => {
        const errIconFirstObj = page.locator('svg').filter({ hasText: 'Это поле обязательно для заполнения' }).first();
        await expect(errIconFirstObj).toBeVisible();
        const errIconLastObj = page.locator('svg').filter({ hasText: 'Это поле обязательно для заполнения' }).nth(4);
        await expect(errIconLastObj).toBeVisible();

        await page.locator('div').filter({ hasText: /^1inЭто поле обязательно для заполнения$/ }).nth(1).click();
        const field = page.getByRole('textbox', { name: 'Порт' });
        await field.focus();
        await expect(field).toBeFocused();

        await field.fill('');
        const inputVal = '2';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('2');

        
    })
});