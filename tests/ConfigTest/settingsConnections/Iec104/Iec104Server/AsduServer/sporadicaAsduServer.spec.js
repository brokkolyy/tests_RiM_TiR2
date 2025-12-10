const path = require('path');
const { test, expect } = require('@playwright/test');
const ConfigPage = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPage.js'));
const ConfigPageElements = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPageElements.js'));

test('Активация функции спорадики', async ({ page }) => {
    const config = new ConfigPage(page);
    const configElement = new ConfigPageElements(page);
                                           
    await config.goto();
    await config.contextMenuBroadcast(); 
    await config.clickIec104_S();
                                    
    await page.locator('div').filter({ hasText: /^iec104127\.0\.0\.1102iec104_server$/ }).nth(1).click({button:'right'});
    await configElement.clickAsdu();
    const el = page.locator('div').filter({ hasText: /^asdu1asdu$/ }).nth(1);
    await expect(el).toBeVisible();
    await el.click();

    const clickLog = page.locator('[id="switch::r17::thumb"]');
    await clickLog.click();
    const colorLog = page.locator('[id="switch::r17::control"]');
    await expect(colorLog).toBeVisible();                                  // await page.locator('[id="switch::r17::thumb"]').click();await page.locator('[id="switch::r17::control"]').click();await page.locator('span').nth(5).click();
});

test('Отключение функции спорадики', async ({ page }) => {
    const config = new ConfigPage(page);
    await config.goto();
    await config.contextMenuBroadcast(); 
    await config.clickIec104_S();
                            
    const el = page.locator('div').filter({ hasText: /^iec104127\.0\.0\.1102iec104_server$/ }).nth(1);
    await expect(el).toBeVisible();
    await el.click();
        
    const clickLog = page.locator('[id="switch::r17::thumb"]');

    await clickLog.click();
    await clickLog.click();
    const colorLog = page.locator('span').nth(5);
    await expect(colorLog).toBeVisible();   ;                                  // await page.locator('[id="switch::r17::thumb"]').click();await page.locator('[id="switch::r17::control"]').click();await page.locator('span').nth(5).click();
});