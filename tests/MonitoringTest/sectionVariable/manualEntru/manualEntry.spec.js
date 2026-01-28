const path = require('path');
const { test, expect } = require('@playwright/test');
const { config } = require('process');

const MonitoringPage = require(path.join(process.cwd(), 'pages', 'Monitoring', 'MonitoringPage.js'));

test('Окно "Ручной ввод"', async ({page}) => {
    const monitoring = new MonitoringPage(page);
    await monitoring.goto();
    await page.screenshot({path:'err.png'})
    await page.getByText('IRZGPIO_BattLow').nth(1).click({button: 'right'});
    await monitoring.clickManualEntry();

    await expect(page.getByRole('heading', { name: 'Ручной ввод' })).toBeVisible()
    await expect(page.getByText('Изменение значения переменной')).toBeVisible()
    await expect(page.getByRole('group', { name: 'Атрибуты' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Close' })).toBeVisible()
    await page.getByRole('button', { name: 'Close' }).click();
    
    await expect(page.getByRole('heading', { name: 'Ручной ввод' })).not.toBeVisible()
})