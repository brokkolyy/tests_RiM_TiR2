const path = require('path');
const { test, expect } = require('@playwright/test');
const { config } = require('process');
const MonitoringPage = require(path.join(process.cwd(), 'pages', 'Monitoring', 'MonitoringPage.js'));

test('Переключатель "Переключить отображение имени"', async ({page}) => {
    const monitoring = new MonitoringPage(page)
    await monitoring.goto()

    const toggle = page.locator('span').first();
    await expect(page.getByText('Переключить отображение имени')).toBeVisible()
    await expect(toggle).toBeVisible()
    await expect(toggle).not.toBeChecked()

    await toggle.click()
    await expect(toggle).toBeChecked()
})