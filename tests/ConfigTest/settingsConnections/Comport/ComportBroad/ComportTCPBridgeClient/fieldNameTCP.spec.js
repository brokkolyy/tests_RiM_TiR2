const path = require('path');
const { test, expect } = require('@playwright/test');
const ConfigPage = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPage.js'));
const ConfigPageElements = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPageElements.js'));

async function prepareField(page) {
    const field = page.getByRole('textbox', { name: 'Название' });
    await field.focus();
    await expect(field).toBeFocused();
    await field.fill('');
    return field;
}

test.describe('Навигация', () => {
    test.beforeEach(async ({page}) => {
        const config = new ConfigPage(page);
        const configElement = new ConfigPageElements(page);
                
        await config.goto();
        await config.contextMenuBroadcast();
        await config.clickComport();
                
        await page.locator('div').filter({ hasText: /^COMttyS0115200comport$/ }).nth(1).click({button: 'right'});
        await configElement.clickTcpBridge_Client();
        const el = page.locator('div').filter({ hasText: /^TCP127\.0\.0\.1502tcpBridge_client$/ }).nth(1);
        await expect(el).toBeVisible();
        await el.click();
    });

    test('Максимальная длина (30 символов)', async ({page}) => {
        const field = await prepareField(page)
        const inputVal = 'qwertyuiopasdfghjklzxcvbnmqwe_1';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('qwertyuiopasdfghjklzxcvbnmqwe_1');
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).not.toBeVisible();
    });

    test('Ввод больше максимальной длины (31 символ)', async ({page}) => {
        const field = await prepareField(page)
        const inputVal = 'qwertyuiopasdfghjklzxcvbnmqwe_1q';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('qwertyuiopasdfghjklzxcvbnmqwe_1q');
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).toBeVisible();
    });

    test('Ввод минимальной длины (1 символ)', async ({page}) => {
        const field = await prepareField(page)
        const inputVal = 'f';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('f');
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).not.toBeVisible();
    });

    test('Ввод недопустимых символов ', async ({page}) => {
        const field = await prepareField(page)
        const inputVal = 'ЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮйцукенгшщзхъфывапролджэячсмитьбю-.,_=+\/|":;><?!№%?*()`~@#$&';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('ЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮйцукенгшщзхъфывапролджэячсмитьбю-.,_=+\/|":;><?!№%?*()`~@#$&');
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).not.toBeVisible();
    });

    test('Оставить поле пустым', async ({page}) => {
        const field = await prepareField(page)
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('');
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).not.toBeVisible();
    });

    test('Ввести сначала цифру, потом букву', async ({page}) => {
        const field = await prepareField(page)
        const inputVal = '0t';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('0t');
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).not.toBeVisible();
    });

    test('Ввод только чисел', async ({page}) => {
        const field = await prepareField(page)
        const inputVal = '1234';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('1234');
        const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
        await expect(buttonError).toBeVisible();
    });
});
