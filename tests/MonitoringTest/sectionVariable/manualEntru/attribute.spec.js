const path = require('path');
const { test, expect } = require('@playwright/test');
const MonitoringPage = require(path.join(process.cwd(), 'pages', 'Monitoring', 'MonitoringPage.js'));

test.describe('Навигация', () => {
    test.beforeEach(async ({page}) => {
        const monitoring = new MonitoringPage(page);
        await monitoring.goto();
        await page.getByText('IRZGPIO_BattLow').nth(1).click({button: 'right'});
        await monitoring.clickManualEntry();
    });

test('Атрибут "Используется (US)"', async({page}) => {
    

    const check = page.locator('[id="checkbox::re::control"]');
    await page.screenshot({path:'err.png'})
    //await expect(page.getByText('Используется (US)')).toBeVisible()
    await expect(check).toBeVisible();
    await check.click()
    await expect(check).toBeChecked()
    await check.click()
    await expect(check).not.toBeChecked()
})

test('Атрибут "Заблокирован (BL)"', async({page}) => {
    const check = page.locator('[id="checkbox::ri::control"]');
    await expect(page.getByText('Заблокирован (BL)')).toBeVisible()
    await expect(check).toBeVisible();
    await check.click()
    await expect(check).toBeChecked()
    await check.click()
    await expect(check).not.toBeChecked()
})

test('Атрибут "Неизвестный (UN)"', async({page}) => {
    const check = page.locator('[id="checkbox::rm::control"]')
    await expect(page.getByText('Неизвестный (UN)')).toBeVisible()
    await expect(check).toBeVisible();
    await check.click()
    await expect(check).toBeChecked()
    await check.click()
    await expect(check).not.toBeChecked()
})

test('Атрибут "Замещен (SB)"', async({page}) => {
    const check = page.locator('[id="checkbox::rq::control"]')
    await expect(page.getByText('Замещен (SB)')).toBeVisible()
    await expect(check).toBeChecked()
    await expect(check).toBeDisabled();
})

test('Атрибут "Недостоверный (IV)"', async({page}) => {
    const check = page.locator('[id="checkbox::ru::control"]');
    await expect(page.getByText('Недостоверный (IV)')).toBeVisible()
    await expect(check).toBeChecked();
    await expect(check).toBeDisabled();
})

test('Атрибут "Доп. расчет (AC)"', async({page}) => {
    const check = page.locator('[id="checkbox::rg::control"]')
    await expect(page.getByText('Доп. расчет (AC)')).toBeVisible()
    await expect(check).toBeVisible();
    await check.click()
    await expect(check).toBeChecked()
    await check.click()
    await expect(check).not.toBeChecked()
})

test('Атрибут "Переполнен (OV)"', async({page}) => {
    const check = page.locator('[id="checkbox::rk::control"]')
    await expect(page.getByText('Переполнен (OV)')).toBeVisible()
    await expect(check).toBeVisible();
    await check.click()
    await expect(check).toBeChecked()
    await check.click()
    await expect(check).not.toBeChecked()
})

test('Атрибут "Ручной (BL)"', async({page}) => {
    const check = page.locator('[id="checkbox::ro::control"]')
    await expect(page.getByText('Ручной (BL)')).toBeVisible()
    //await expect(check).toBeChecked();
    await expect(check).toBeDisabled();
    
})

test('Атрибут "Устаревший (NT)"', async({page}) => {
    const check = page.locator('[id="checkbox::rs::control"]')
    await expect(page.getByText('Устаревший (NT)')).toBeVisible()
    await expect(check).toBeVisible();
    await check.click()
    await expect(check).toBeChecked()
    await check.click()
    await expect(check).not.toBeChecked()
})
})