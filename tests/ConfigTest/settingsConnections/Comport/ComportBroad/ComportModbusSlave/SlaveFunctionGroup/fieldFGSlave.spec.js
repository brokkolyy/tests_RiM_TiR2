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
        await configElement.clickModbusRTU_Slave();
        await page.locator('div').filter({ hasText: /^MB RTU1modbusRTU_slave$/ }).nth(1).click({button: 'right'});
        await configElement.clickFunctionGroup();
        const el = page.locator('div').filter({ hasText: /^fg1functionGroup$/ }).first();
        await expect(el).toBeVisible();
        await el.click();
    });

test('Максимальная длина(30 символов), поле название элемента "Последовательный порт"', async ({ page }) => {
    const field = await prepareField(page)
    const inputVal = '123456789012345678901234567890';
    await field.fill(inputVal);
    await field.press('Enter');
    const val = await field.inputValue();
    expect(val).toBe('123456789012345678901234567890');
});

test('Ввод больше максимальной длины (31 символ), поле название элемента "Последовательный порт"', async ({ page }) => {
    const field = await prepareField(page)
    const inputVal = '1234567890123456789012345678901';
    await field.fill(inputVal);
    await field.press('Enter');
    const val = await field.inputValue();
    expect(val).toBe('1234567890123456789012345678901');
});

test('Ввод минимальной длины (1 символ), поле название элемента "Последовательный порт"', async ({ page }) => {
    const field = await prepareField(page)
    const inputVal = '1';
    await field.fill(inputVal);
    await field.press('Enter');
    const val = await field.inputValue();
    expect(val).toBe('1');
});

test('Ввод недопустимых символов, поле название элемента "Последовательный порт"', async ({ page }) => {
    const field = await prepareField(page)
    const inputVal = 'ЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮйцукенгшщзхъфывапролджэячсмитьбю-.,_=+\/|":;><?!№%?*()`~@#$&';
    await field.fill(inputVal);
    await field.press('Enter');
    const val = await field.inputValue();
    expect(val).toBe('ЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮйцукенгшщзхъфывапролджэячсмитьбю-.,_=+\/|":;><?!№%?*()`~@#$&');
});

test('Оставить поле пустым, поле название элемента "Последовательный порт"', async ({ page }) => {
    const field = await prepareField(page)
    await field.press('Enter');
    const val = await field.inputValue();
    const errIcon = page.locator('svg').filter({ hasText: 'Имя узла должно начинаться с буквы или подчеркивания и содержать только латински' }).nth(1);
    expect(val).toBe('');
    expect(errIcon).toBeVisible();
    const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
    await expect(buttonError).toBeVisible();
});

test('Ввести сначала цифру, потом букву, поле название элемента "Последовательный порт"', async ({ page }) => {
    const field = await prepareField(page)
    const inputVal = '1t';
    await field.fill(inputVal);
    await field.press('Enter');
    const val = await field.inputValue();
    expect(val).toBe('1t');
});
});