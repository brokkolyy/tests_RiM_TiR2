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
async function errM(page) {
    const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
    await expect(buttonError).toBeVisible();
}

test.describe('Навигация', () => {
    test.beforeEach(async ({page}) => {
        const config = new ConfigPage(page);
        const configElement = new ConfigPageElements(page);
                                        
        await config.goto();
        await config.contextMenuBroadcast(); 
        await config.clickModbusTCP_S();
                        
        await page.locator('div').filter({ hasText: /^MB TCP127\.0\.0\.1502modbusTCP_server$/ }).nth(1).click({button:'right'});
        await configElement.clickFunctionGroup();
        const el = page.locator('div').filter({ hasText: /^fg1functionGroup$/ }).first();
        await expect(el).toBeVisible();
        await el.click();
    });

    test('Максимальная длина (30 символов)', async ({ page }) => {
        const field = await prepareField(page)
        const inputVal = 'qwertyuiopasdfghjklzxcvbnmqwer';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('qwertyuiopasdfghjklzxcvbnmqwer');
    });

    test('Ввод больше максимальной длины (31 символ)', async ({ page }) => {
        const field = await prepareField(page)
        const inputVal = 'qwertyuiopasdfghjklzxcvbnmqwert';
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('qwertyuiopasdfghjklzxcvbnmqwert');
        await errM(page)
});

test('Ввод минимальной длины (1 символ), поле название элемента "Последовательный порт"', async ({ page }) => {
    const field = await prepareField(page)
    const inputVal = 'f';
    await field.fill(inputVal);
    await field.press('Enter');
    const val = await field.inputValue();
    expect(val).toBe('f');
});

test('Ввод недопустимых символов', async ({ page }) => {
    const field = await prepareField(page)
    const inputVal = 'ЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮйцукенгшщзхъфывапролджэячсмитьбю-.,_=+\/|":;><?!№%?*()`~@#$&';
    await field.fill(inputVal);
    await field.press('Enter');
    const val = await field.inputValue();
    expect(val).toBe('ЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮйцукенгшщзхъфывапролджэячсмитьбю-.,_=+\/|":;><?!№%?*()`~@#$&');
    await errM(page)
});

test('Оставить поле пустым', async ({ page }) => {
    const field = await prepareField(page)
    await field.press('Enter');
    const val = await field.inputValue();
    const errIcon = page.locator('svg').filter({ hasText: 'Имя узла должно начинаться с буквы или подчеркивания и содержать только латински' }).nth(1);
    expect(val).toBe('');
    expect(errIcon).toBeVisible();
    await errM(page)
});

test('Ввести сначала цифру, потом букву', async ({ page }) => {
    const field = await prepareField(page)
    const inputVal = '1t';
    await field.fill(inputVal);
    await field.press('Enter');
    const val = await field.inputValue();
    expect(val).toBe('1t');
    await errM(page)
});
});