const path = require('path');
const { test, expect } = require('@playwright/test');
const ConfigPage = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPage.js'));
const ConfigPageElements = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPageElements.js'));

test.describe('Навигация', () => {
    test.beforeEach(async ({page}) => {
        const config = new ConfigPage(page);
        const configElement = new ConfigPageElements(page);
        
        await config.goto();

        await config.contextMenuVariable();
        await config.clickVariable_2();
        await 

        await config.contextMenuBroadcast(); 
        await config.clickIec104_S();
                                
        await page.locator('div').filter({ hasText: /^iec104127\.0\.0\.1102iec104_server$/ }).nth(1).click({button:'right'});
        await configElement.clickAsdu();
        const el = page.locator('div').filter({ hasText: /^asdu1asdu$/ }).nth(1);
        await expect(el).toBeVisible();
        await el.click();
    });


});