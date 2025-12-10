const path = require('path');
const { test, expect } = require('@playwright/test');
const ConfigPage = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPage.js'));
const ConfigPageElements = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPageElements.js'));

test('Активация функции логирования', async ({ page }) => {
    const config = new ConfigPage(page);
        
    await config.goto();
    await config.contextMenuReception();
    await config.clickModbusTCP_C();
        
    const el = page.locator('div').filter({ hasText: /^MB TCP127\.0\.0\.1502modbusTCP_client$/ }).nth(1);
    await expect(el).toBeVisible();
    await el.click();
        
    const clickLog = page.locator('[id="switch::r17::thumb"]');
    await clickLog.click();
    const colorLog = page.locator('[id="switch::r17::control"]');
    await expect(colorLog).toBeVisible();                                  // await page.locator('[id="switch::r17::thumb"]').click();await page.locator('[id="switch::r17::control"]').click();await page.locator('span').nth(5).click();
});

test('Отключение функции логирования', async ({ page }) => {
    const config = new ConfigPage(page);
        
    await config.goto();
    await config.contextMenuReception();
    await config.clickModbusTCP_C();
        
    const el = page.locator('div').filter({ hasText: /^MB TCP127\.0\.0\.1502modbusTCP_client$/ }).nth(1);
    await expect(el).toBeVisible();
    await el.click();
        
    const clickLog = page.locator('[id="switch::r17::thumb"]');

    await clickLog.click();
    await clickLog.click();
    const colorLog = page.locator('span').nth(5);
    await expect(colorLog).toBeVisible();   ;                                  // await page.locator('[id="switch::r17::thumb"]').click();await page.locator('[id="switch::r17::control"]').click();await page.locator('span').nth(5).click();
});