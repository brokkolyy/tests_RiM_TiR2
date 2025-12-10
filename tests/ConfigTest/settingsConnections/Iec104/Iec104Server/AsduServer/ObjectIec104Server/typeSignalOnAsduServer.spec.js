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

        await page.locator('div').filter({ hasText: /^asdu1asdu$/ }).nth(1).click();
        const clickLog = page.locator('[id="switch::r17::thumb"]');
        await clickLog.click();

        await page.locator('div').filter({ hasText: /^asdu1asdu$/ }).nth(1).click({button:'right'});
        await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
        await configElement.clickObject_1();
        const el = page.locator('div').filter({ hasText: /^ts1Это поле обязательно для заполненияЭто поле обязательно для заполнения$/ }).nth(1);
        await expect(el).toBeVisible();
        await el.click();
    });

    test('Выбрать в списке - Однопозиционный ТС', async({page}) => {
        const item = page.getByRole('combobox', { name: 'Тип сигнала' });
        await item.click();
        const list = page.getByRole('listbox', { name: 'Тип сигнала' })
        await expect(list).toBeVisible();

        const op = page.getByRole('option', { name: 'Однопозиционный ТС' });
        await op.click();
        await expect(list).toBeHidden();

        await expect(item).toHaveText('Однопозиционный ТС');

        await expect(page.getByText('КомандаПрямоеВыбор/исполнитьПрямое')).toBeHidden();
    });

    test('Выбрать в списке - Двухпозиционный ТС', async({page}) => {
        const item = page.getByRole('combobox', { name: 'Тип сигнала' });
        await item.click();
        const list = page.getByRole('listbox', { name: 'Тип сигнала' })
        await expect(list).toBeVisible();

        const op = page.getByRole('option', { name: 'Двухпозиционный ТС' });
        await op.click();
        await expect(list).toBeHidden();

        await expect(item).toHaveText('Двухпозиционный ТС');
        await expect(page.getByText('КомандаПрямоеВыбор/исполнитьПрямое')).toBeHidden();
    });

    test('Выбрать в списке - ТИ масштабированное', async({page}) => {
        const item = page.getByRole('combobox', { name: 'Тип сигнала' });
        await item.click();
        const list = page.getByRole('listbox', { name: 'Тип сигнала' })
        await expect(list).toBeVisible();

        const op = page.getByRole('option', { name: 'ТИ масштабированное' });
        await op.click();
        await expect(list).toBeHidden();

        await expect(item).toHaveText('ТИ масштабированное');
        await expect(page.getByText('КомандаПрямоеВыбор/исполнитьПрямое')).toBeHidden();
    });

    test('Выбрать в списке - ТИ нормализованное', async({page}) => {
        const item = page.getByRole('combobox', { name: 'Тип сигнала' });
        await item.click();
        const list = page.getByRole('listbox', { name: 'Тип сигнала' })
        await expect(list).toBeVisible();

        const op = page.getByRole('option', { name: 'ТИ нормализованное' });
        await op.click();
        await expect(list).toBeHidden();

        await expect(item).toHaveText('ТИ нормализованное');
        await expect(page.getByText('КомандаПрямоеВыбор/исполнитьПрямое')).toBeHidden();
    });

    test('Выбрать в списке - ТИ с плавающей точкой', async({page}) => {
        const item = page.getByRole('combobox', { name: 'Тип сигнала' });
        await item.click();
        const list = page.getByRole('listbox', { name: 'Тип сигнала' })
        await expect(list).toBeVisible();

        const op = page.getByRole('option', { name: 'ТИ с плавающей точкой' });
        await op.click();
        await expect(list).toBeHidden();

        await expect(item).toHaveText('ТИ с плавающей точкой');
        await expect(page.getByText('КомандаПрямоеВыбор/исполнитьПрямое')).toBeHidden();
    });

    test('Выбрать в списке - Однопозиционное ТУ', async({page}) => {
        const item = page.getByRole('combobox', { name: 'Тип сигнала' });
        await item.click();
        const list = page.getByRole('listbox', { name: 'Тип сигнала' })
        await expect(list).toBeVisible();

        const op = page.getByRole('option', { name: 'Однопозиционное ТУ' });
        await op.click();
        await expect(list).toBeHidden();

        await expect(item).toHaveText('Однопозиционное ТУ');
        await expect(page.getByText('КомандаПрямоеВыбор/исполнитьПрямое')).toBeVisible();
    });

    test('Выбрать в списке - Двухпозиционное ТУ', async({page}) => {
        const item = page.getByRole('combobox', { name: 'Тип сигнала' });
        await item.click();
        const list = page.getByRole('listbox', { name: 'Тип сигнала' })
        await expect(list).toBeVisible();

        const op = page.getByRole('option', { name: 'Двухпозиционное ТУ' });
        await op.click();
        await expect(list).toBeHidden();

        await expect(item).toHaveText('Двухпозиционное ТУ');
        await expect(page.getByText('КомандаПрямоеВыбор/исполнитьПрямое')).toBeVisible();
    });
});