const path = require('path');
const { test, expect } = require('@playwright/test');
const { exec } = require('child_process');
const ConfigPage = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPage.js'));

test.describe('Навигация', () => {
    test.beforeEach(async ({page}) => {
        const config = new ConfigPage(page);
        await config.goto();
        await config.buttonConfigClick();
        await expect(page.getByRole('menu', { name: 'Конфигурация' })).toBeVisible();
        const create = page.getByRole('menuitem', { name: 'Создать' });
        await create.click();

        const message = page.getByRole('heading', { name: 'Новая конфигурация' });
        await expect(message).toBeVisible();
    });

    test('Ввод максимальной длины имени конфигурации(50 символов)', async ({page}) => {
        const field = page.getByRole('textbox', { name: 'Имя конфигурации' });
        await field.focus();
        await expect(field).toBeFocused();

        await field.fill('');
        const inputVal = 'TestTestTestTestTestTestTestTestTestTestTestTestTe';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('TestTestTestTestTestTestTestTestTestTestTestTestTe');
    });

    test('Ввод больше максимальной длины имени конфигурации(51 символ)', async ({page}) => {
        const field = page.getByRole('textbox', { name: 'Имя конфигурации' });
        await field.focus();
        await expect(field).toBeFocused();

        await field.fill('');
        const inputVal = 'TestTestTestTestTestTestTestTestTestTestTestTestTest';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('TestTestTestTestTestTestTestTestTestTestTestTestTe');
    });

    test('Ввод меньше минимальной длины имени(3 символа)', async ({page}) => {
        const field = page.getByRole('textbox', { name: 'Имя конфигурации' });
        await field.focus();
        await expect(field).toBeFocused();
        const createElement = page.locator('*:has-text("Создать")').first();

        // Узнать больше об элементе
/*const createElement = page.locator('text=Создать').first();
const elementInfo = await createElement.evaluate((el) => {
  return {
    tagName: el.tagName,
    className: el.className,
    id: el.id,
    disabled: el.disabled,
    ariaDisabled: el.getAttribute('aria-disabled'),
    dataDisabled: el.getAttribute('data-disabled'),
    tabIndex: el.tabIndex,
    parentRole: el.parentElement?.getAttribute('role'),
    // Все атрибуты
    attributes: Array.from(el.attributes).map(attr => `${attr.name}="${attr.value}"`)
  };
});
console.log('Информация об элементе "Создать":', elementInfo);*/
        const save = page.locator('[data-value="new-file"]');   //const save = page.getByRole('menuitem', { name: /Создать/ });
        await page.screenshot({ path: 'debug-before-check.png', fullPage: true });
        await expect(save).toBeVisible();
        await expect(save).toBeDisabled();

        await field.fill('');
        const inputVal = 'abc';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('abc');
        await expect(save).not.toBeDisabled();
    });

    test('Ввод минимальной длины имени (4 символа)', async ({page}) => {
        const field = page.getByRole('textbox', { name: 'Имя конфигурации' });
        await field.focus();
        await expect(field).toBeFocused();
        const save = page.getByRole('menuitem', { name: 'Создать' });
        await expect(save).toBeDisabled();

        await field.fill('');
        const inputVal = 'Test';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('Test');
        await expect(save).toBeDisabled();
    });

    test('Оставить поле пустым', async ({page}) => {
        const field = page.getByRole('textbox', { name: 'Имя конфигурации' });
        await field.focus();
        await expect(field).toBeFocused();
        const save = page.getByRole('menuitem', { name: 'Создать' });
        await expect(save).toBeDisabled();

        await field.fill('');
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('');
        await expect(save).toBeDisabled();
    });

    test('Ввод символов через пробел', async ({page}) => {
        const field = page.getByRole('textbox', { name: 'Имя конфигурации' });
        await field.focus();
        await expect(field).toBeFocused();
        const save = page.getByRole('menuitem', { name: 'Создать' });
        await expect(save).toBeDisabled();

        await field.fill('');
        const inputVal = 'test 1';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('test 1');
        await expect(save).not.toBeDisabled();
    });

    test('Ввод чисел', async ({page}) => {
        const field = page.getByRole('textbox', { name: 'Имя конфигурации' });
        await field.focus();
        await expect(field).toBeFocused();
        const save = page.getByRole('menuitem', { name: 'Создать' });
        await expect(save).toBeDisabled();

        await field.fill('');
        const inputVal = '1234567';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('1234567');
        await expect(save).not.toBeDisabled();
    });

    test('Ввод специальных символов', async ({page}) => {
        const field = page.getByRole('textbox', { name: 'Имя конфигурации' });
        await field.focus();
        await expect(field).toBeFocused();
        const save = page.getByRole('menuitem', { name: 'Создать' });
        await expect(save).toBeDisabled();

        await field.fill('');
        const inputVal = ' -.,_=+\/|":;><?!№%?*()`~@#$&';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe(' -.,_=+\/|":;><?!№%?*()`~@#$&');
        await expect(save).not.toBeDisabled();
    });

});