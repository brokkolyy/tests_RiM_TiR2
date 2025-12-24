const path = require('path');
const { test, expect } = require('@playwright/test');
const { exec } = require('child_process');
const ConfigPage = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPage.js'));

test.describe('Навигация', () => {
    test.beforeEach(async ({page}) => {
        const config = new ConfigPage(page);
        await config.goto();
        await config.buttonConfigClick();
    });

    test('Нажать ЛКМ на кнопку “Отмена“', async ({page}) => {
        await expect(page.getByRole('menu', { name: 'Конфигурация' })).toBeVisible();
        const close = page.getByRole('menuitem', { name: 'Закрыть' });
        await close.click();

        const zone = page.locator('div').filter({ hasText: /^Закрыть конфигурацию\?$/ });
        await expect(zone).toBeVisible();

        const buttonClose = page.getByRole('button', { name: 'Отмена' });
        await expect(buttonClose).toBeVisible();
        await buttonClose.click();

        await expect(zone).toBeHidden();
    });

    test('Нажать ЛКМ на кнопку “Применить“', async ({page}) => {
        await expect(page.getByRole('menu', { name: 'Конфигурация' })).toBeVisible();
        const close = page.getByRole('menuitem', { name: 'Закрыть' });
        await close.click();

        const zone = page.locator('div').filter({ hasText: /^Закрыть конфигурацию\?$/ });
        await expect(zone).toBeVisible();

        const buttonClose = page.getByRole('button', { name: 'Применить' });
        await expect(buttonClose).toBeVisible();
        await buttonClose.click();

        await expect(zone).toBeHidden();

        const zone2 = page.locator('div').filter({ hasText: /^Похоже, что конфигурация отсутствует$/ });
        await expect(zone2).toBeVisible()
        const fileChooserPromise = page.waitForEvent('filechooser');

        await page.getByRole('button', { name: 'Загрузить конфигурацию' }).click();

        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles('test (4).xml');

        await expect(zone2).toBeHidden();
    });

    test('Нажать ЛКМ на кнопку “Синхронизировать“', async ({page}) => {
        await expect(page.getByRole('menu', { name: 'Конфигурация' })).toBeVisible();
        const close = page.getByRole('menuitem', { name: 'Закрыть' });
        await close.click();

        const zone = page.locator('div').filter({ hasText: /^Закрыть конфигурацию\?$/ });
        await expect(zone).toBeVisible();

        const buttonClose = page.getByRole('button', { name: 'Применить' });
        await expect(buttonClose).toBeVisible();
        await buttonClose.click();

        await expect(zone).toBeHidden();

        const zone2 = page.locator('div').filter({ hasText: /^Похоже, что конфигурация отсутствует$/ });
        await expect(zone2).toBeVisible()

        await page.getByRole('button', { name: 'Синхронизировать' }).click();

        const status = page.getByRole('status', { name: 'Конфигурация обновлена' });
        await expect(status).toBeVisible();
        await expect(page.locator('svg').filter({ hasText: 'Синхронизировано c сервером' })).toBeVisible();

        await expect(zone2).toBeHidden();
    });

    test('Нажать ЛКМ на кнопку “Создать конфигурацию“', async ({page}) => {
        await expect(page.getByRole('menu', { name: 'Конфигурация' })).toBeVisible();
        const close = page.getByRole('menuitem', { name: 'Закрыть' });
        await close.click();

        const zone = page.locator('div').filter({ hasText: /^Закрыть конфигурацию\?$/ });
        await expect(zone).toBeVisible();

        const buttonClose = page.getByRole('button', { name: 'Применить' });
        await expect(buttonClose).toBeVisible();
        await buttonClose.click();

        await expect(zone).toBeHidden();

        const zone2 = page.locator('div').filter({ hasText: /^Похоже, что конфигурация отсутствует$/ });
        await expect(zone2).toBeVisible()
        await page.getByRole('button', { name: 'Создать конфигурацию' }).click();


        const createZone = page.locator('div').filter({ hasText: /^Новая конфигурация$/ });
        await expect(createZone).toBeVisible();

        await page.getByRole('button', { name: 'Отмена' }).click();
        await expect(createZone).toBeHidden();
        await expect(zone2).toBeVisible();

        await page.getByRole('button', { name: 'Создать конфигурацию' }).click();
        /*const field = page.getByRole('textbox', { name: 'Имя конфигурации' });
        await field.focus();
        await expect(field).toBeFocused();
        await field.fill('');
        const inputVal = 'Test';
        await field.fill(inputVal);*/
        const field = page.getByRole('textbox', { name: 'Имя конфигурации' });
        await field.fill('test')
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('test');

        await page.getByRole('button', { name: 'Создать' }).click();
        await expect(page.getByText('test')).toBeVisible();
    });
});