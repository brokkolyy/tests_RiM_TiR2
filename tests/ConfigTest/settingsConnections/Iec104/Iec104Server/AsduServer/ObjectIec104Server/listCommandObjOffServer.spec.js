const path = require('path');
const { test, expect } = require('@playwright/test');
const ConfigPage = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPage.js'));
const ConfigPageElements = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPageElements.js'));

test.describe('Навигация', () => {
    test.beforeEach(async ({page}) => {
        const config = new ConfigPage(page);
        const configElement = new ConfigPageElements(page);
        
        await config.goto();
        await config.contextMenuBroadcast(); 
        await config.clickIec104_S();
                                
        await page.locator('div').filter({ hasText: /^iec104127\.0\.0\.1102iec104_server$/ }).nth(1).click({button:'right'});
        await configElement.clickAsdu();

        await page.locator('div').filter({ hasText: /^asdu1asdu$/ }).nth(1).click({button:'right'});
        await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
        await configElement.clickObject_1();
        const el = page.locator('div').filter({ hasText: /^ts1Это поле обязательно для заполненияЭто поле обязательно для заполнения$/ }).nth(1);
        await expect(el).toBeVisible();
        await el.click();

        const item = page.getByRole('combobox', { name: 'Тип сигнала' });
        await item.click();
        const op = page.getByRole('option', { name: 'Однопозиционное ТУ' });
        await op.click();
    });

    test('Выбрать в списке - Прямое', async({page}) => {
        const item = page.getByRole('combobox', { name: 'Команда' });
        await item.click();
        const list = page.getByRole('listbox', { name: 'Команда' });
        await expect(list).toBeVisible();

        const op = page.getByRole('option', { name: 'Прямое' });
        await op.click();
        await expect(list).toBeHidden();

        await expect(item).toHaveText('Прямое');
    });

    test('Выбрать в списке - Выбор/исполнить', async({page}) => {
        const item = page.getByRole('combobox', { name: 'Команда' });
        await item.click();
        const list = page.getByRole('listbox', { name: 'Команда' });
        await expect(list).toBeVisible();

        const op = page.getByRole('option', { name: 'Выбор/исполнить' });
        await op.click();
        await expect(list).toBeHidden();

        await expect(item).toHaveText('Выбор/исполнить');
    });
});