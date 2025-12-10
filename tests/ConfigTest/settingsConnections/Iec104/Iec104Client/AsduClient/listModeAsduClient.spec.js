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
        await config.clickIec104_C();
                        
        await page.locator('div').filter({ hasText: /^iec104127\.0\.0\.1102iec104_client$/ }).nth(1).click({button:'right'});
        await configElement.clickAsdu();
        const el = page.locator('div').filter({ hasText: /^asdu1asdu$/ }).nth(1);
        await expect(el).toBeVisible();
        await el.click();
    });

    test('Выбрать в списке - Ручной', async({page}) => {
        const item = page.getByRole('combobox', { name: 'Режим опроса' });
        await item.click();
        const list = page.getByRole('listbox', { name: 'Режим опроса' });
        await expect(list).toBeVisible();

        const op = page.getByRole('option', { name: 'Ручной' });
        await op.click();
        await expect(list).toBeHidden();

        await expect(item).toHaveText('Ручной');

        await item.click();
        await expect(page.locator('.chakra-select__itemIndicator > .css-s3mb0o').first()).toBeVisible();

        await expect(page.getByRole('group').filter({ hasText: 'Период опроса, мин' })).toBeVisible();
    });

    test('Выбрать в списке - На старте', async({page}) => {
        const item = page.getByRole('combobox', { name: 'Режим опроса' });
        await item.click();
        const list = page.getByRole('listbox', { name: 'Режим опроса' });
        await expect(list).toBeVisible();

        const op = page.getByRole('option', { name: 'На старте' });
        await op.click();
        await expect(list).toBeHidden();

        await expect(item).toHaveText('На старте');

        await expect(page.getByRole('group').filter({ hasText: 'Период опроса, мин' })).toBeHidden();
    });

    test('Выбрать в списке - Всегда', async({page}) => {
        const item = page.getByRole('combobox', { name: 'Режим опроса' });
        await item.click();
        const list = page.getByRole('listbox', { name: 'Режим опроса' });
        await expect(list).toBeVisible();

        const op = page.getByRole('option', { name: 'Всегда' });
        await op.click();
        await expect(list).toBeHidden();

        await expect(item).toHaveText('Всегда');

        await expect(page.getByRole('group').filter({ hasText: 'Период опроса, мин' })).toBeHidden();
    });

    test('Выбрать в списке - Без опроса', async({page}) => {
        const item = page.getByRole('combobox', { name: 'Режим опроса' });
        await item.click();
        const list = page.getByRole('listbox', { name: 'Режим опроса' });
        await expect(list).toBeVisible();

        const op = page.getByRole('option', { name: 'Без опроса' });
        await op.click();
        await expect(list).toBeHidden();

        await expect(item).toHaveText('Без опроса');

        await expect(page.getByRole('group').filter({ hasText: 'Период опроса, мин' })).toBeHidden();
    });
});