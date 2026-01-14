const path = require('path');
const { test, expect } = require('@playwright/test');
const ConfigPage = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPage.js'));
const ConfigPageElements = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPageElements.js'));

async function prepareField(page) {
    const el1 = page.locator('._node_1yclz_1.isLeaf > .chakra-stack.css-3cqz5p > .chakra-stack.css-n3uhkm > .chakra-stack')
    await expect(el1).toBeVisible();
    await el1.click();
    const field = page.getByRole('textbox', { name: 'Адрес информационного объекта' });
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
        await config.contextMenuReception();
        await config.clickComport();
        
        await page.locator('div').filter({ hasText: /^COMttyS0115200comport$/ }).nth(1).click({button: 'right'});
        await configElement.clickModbusRTU_Master();
        await page.locator('div').filter({ hasText: /^MB RTU1modbusRTU_master$/ }).nth(1).click({button: 'right'});
        await configElement.clickFunctionGroup();       //1 функциональная группа
        await page.locator('div:nth-child(4) > ._node_1yclz_1').click({button: 'right'});
        await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
        await configElement.clickObject_1();
    });


test('Максимальная длина(0xffff), ', async ({ page }) => {
    const field = await prepareField(page)
    const inputVal = '0xffff';
    await field.fill(inputVal);
    await field.press('Enter');
    const val = await field.inputValue();
    expect(val).toBe('0xffff');
    await expect(page.locator('svg').filter({ hasText: /^Неверный формат адреса информационного объекта$/ })).not.toBeVisible();
});

test('Ввод максимальной длины (0xfffff), ', async ({ page }) => {
    const field = await prepareField(page)
    const inputVal = '0xfffff';
    await field.fill(inputVal);
    await field.press('Enter');
    const val = await field.inputValue();
    
    expect(val).toBe('0xfffff');
    await expect(page.locator('svg').filter({ hasText: /^Значение должно быть в диапазоне от 0x0 до 0xffff$/ })).toBeVisible();
});

test('Ввод минимальной длины (0x0), ', async ({ page }) => {
    const field = await prepareField(page)
    const inputVal = '0x0';
    await field.fill(inputVal);
    await field.press('Enter');
    const val = await field.inputValue();
    
    expect(val).toBe('0x0');
    await expect(page.locator('svg').filter({ hasText: /^Неверный формат адреса информационного объекта$/ })).not.toBeVisible();
});

test('Ввод недопустимых символов', async ({ page }) => {
    const field = await prepareField(page)
    const inputVal = 'ЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮйцукенгшщзхъфывапролджэячсмитьбю-.,_=+\/|":;><?!№%?*()`~@#$&';
    await field.fill(inputVal);
    await field.press('Enter');
    
    const val = await field.inputValue();
    expect(val).toBe('ЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮйцукенгшщзхъфывапролджэячсмитьбю-.,_=+\/|":;><?!№%?*()`~@#$&');
    await expect(page.locator('svg').filter({ hasText: /^Неверный формат адреса информационного объекта$/ })).toBeVisible();
});

test('Оставить поле пустым', async ({ page }) => {
    const field = await prepareField(page)
    await field.press('Enter');
    
    const val = await field.inputValue();
    expect(val).toBe('');
    await expect(page.locator('svg').filter({ hasText: 'Это поле обязательно для заполнения' }).nth(2)).toBeVisible();
    const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
    await expect(buttonError).toBeVisible();
});

test('Ввести число в десятичной сс', async ({ page }) => {
    const field = await prepareField(page)
    const inputVal = '12';
    await field.fill(inputVal);
    await field.press('Enter');
    
    const val = await field.inputValue();
    expect(val).toBe('12');
    await expect(page.locator('svg').filter({ hasText: /^Неверный формат адреса информационного объекта$/ })).toBeVisible();
});

test('Ввести недопустимое шестнадцатеричное значение (0+число)x(число)', async ({ page }) => {
    const field = await prepareField(page)
    const inputVal = '01х0000';
    await field.fill(inputVal);
    await field.press('Enter');
    
    const val = await field.inputValue();
    expect(val).toBe('01х0000');
    await expect(page.locator('svg').filter({ hasText: /^Неверный формат адреса информационного объекта$/ })).toBeVisible();
});

test('Ввести допустимое шестнадцатеричное значение без 0 в началеx(допустимое число)', async ({ page }) => {
    const field = await prepareField(page)
    const inputVal = 'x0012';
    await field.fill(inputVal);
    await field.press('Enter');
    
    const val = await field.inputValue();
    expect(val).toBe('x0012');
    await expect(page.locator('svg').filter({ hasText: /^Неверный формат адреса информационного объекта$/ })).toBeVisible();
});

test('Ввести больше максимально допустимого шестнадцатеричного значения ', async ({ page }) => {
    const field = await prepareField(page)
    const inputVal = '0хFFFFА';
    await field.fill(inputVal);
    await field.press('Enter');
    
    const val = await field.inputValue();
    expect(val).toBe('0хFFFFА');
    await expect(page.locator('svg').filter({ hasText: /^Неверный формат адреса информационного объекта$/ })).toBeVisible();
});

test('Ввести минимально допустимое шестнадцатеричное значение (5 нулей после х)', async ({ page }) => {
    const field = await prepareField(page)
    const inputVal = '0x00000';
    await field.fill(inputVal);
    await field.press('Enter');
    
    const val = await field.inputValue();
    expect(val).toBe('0x00000');
    await expect(page.locator('svg').filter({ hasText: /^Неверный формат адреса информационного объекта$/ })).not.toBeVisible();
});
});