const path = require('path');
const { test, expect } = require('@playwright/test');
const MonitoringPage = require(path.join(process.cwd(), 'pages', 'Monitoring', 'MonitoringPage.js'));

async function prepareField(page) {
    const field = page.getByRole('spinbutton', { name: 'Значение' });
    await field.focus();
    await expect(field).toBeFocused();
    await field.fill('');
    return field;
}

async function errorM1(page) {
    const buttonError = page.getByText('Поле не может быть пустым');
    await expect(buttonError).toBeVisible();
}
async function errorM2(page) {
    const buttonError = page.getByText('Значение не может быть больше')
    await expect(buttonError).toBeVisible();
}
async function errorM3(page) {
    const buttonError = page.getByText('Значение должно быть целым')
    await expect(buttonError).toBeVisible();
}

test.describe('Навигация', () => {
    test.beforeEach(async ({page}) => {
        const monitoring = new MonitoringPage(page);
        await monitoring.goto();
        await page.getByText('IRZGPIO_CmdPulse').nth(1).click({button: 'right'});
        await monitoring.clickManualEntry();
    });

    test('Ввод максимального числа', async ({ page }) => {
        const monitoring = new MonitoringPage(page);
        const field = await prepareField(page)
        const inputVal = '2147483647'
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('2147483647');
        await monitoring.clickAcceptM()
    })

    test('Ввод больше максимального числа', async ({ page }) => {
        const monitoring = new MonitoringPage(page);
        const field = await prepareField(page)
        const inputVal = '2147483648'
        await field.fill(inputVal);
        await field.press('Enter');
        await errorM2(page)
        const val = await field.inputValue();
        expect(val).toBe('2147483647');
        await monitoring.clickAcceptM()
    })

    test('Ввод минимального числа', async ({ page }) => {
        const monitoring = new MonitoringPage(page);
        const field = await prepareField(page)
        const inputVal = '-2147483648 '
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('-2147483648 ');
        await monitoring.clickAcceptM()
    })

    test('Ввод меньше минимального числа', async ({ page }) => {
        const monitoring = new MonitoringPage(page);
        const field = await prepareField(page)
        const inputVal = '-2147483649'
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('-2147483649');
        await monitoring.clickAcceptM()
    })

    test('Оставить поле пустым', async ({ page }) => {
        const monitoring = new MonitoringPage(page);
        const field = await prepareField(page)
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('');
        await errorM1(page)
        await monitoring.clickAcceptM()
    })

    test('Ввод числа через точку', async ({ page }) => {
        const monitoring = new MonitoringPage(page);
        const field = await prepareField(page)
        const inputVal = '1.2'
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('1.2');
        await errorM3(page)
        await monitoring.clickAcceptM()
    })

    test('Ввод числа через запятую', async ({ page }) => {
        const monitoring = new MonitoringPage(page);
        const field = await prepareField(page)
        const inputVal = '1,2'
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('1,2');
        await errorM3(page)
        await monitoring.clickAcceptM()
    })

    test('Ввод недопустимых символов', async ({ page }) => {
        const monitoring = new MonitoringPage(page);
        const field = await prepareField(page)
        const inputVal = 'ЙйЦцУуQqWwEe~!@#$%^&*()_+`-={}[]:”|;’\<>?,./,'
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('');
        await errorM3(page)
        await monitoring.clickAcceptM()
    })

    test('Ввод числа через пробел', async ({ page }) => {
        const monitoring = new MonitoringPage(page);
        const field = await prepareField(page)
        const inputVal = '1 2'
        await field.fill(inputVal);
        await field.press('Enter');
        const val = await field.inputValue();
        expect(val).toBe('1 2');
        await errorM3(page)
        await monitoring.clickAcceptM()
    })
})