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
        await configElement.clickObject_1();
        const el = page.locator('div').filter({ hasText: /^1inЭто поле обязательно для заполнения$/ }).nth(1)
        await expect(el).toBeVisible();
        await el.click();
    });

    test('Нажать на “Вход“', async ({page}) => {
        const item = page.getByRole('combobox', { name: 'Функция' });
        await item.click();
        const list = page.getByRole('listbox', { name: 'Функция' });
        await expect(list).toBeVisible();

        const opIn = page.getByRole('option', { name: 'Вход' });
        await opIn.click();
        await expect(list).toBeHidden();

        await expect(item).toHaveText('Вход');

        await item.click();
        await expect(page.locator('.chakra-select__itemIndicator > .css-s3mb0o').first()).toBeVisible();
    });

    test('Нажать на “Выход“', async ({page}) => {
        const item = page.getByRole('combobox', { name: 'Функция' });
        await item.click();
        const list = page.getByRole('listbox', { name: 'Функция' });
        await expect(list).toBeVisible();

        const opOut = page.getByRole('option', { name: 'Выход' });
        await opOut.click();
        await expect(list).toBeHidden();

        await expect(item).toHaveText('Выход');
    });
});