const path = require('path');
const { test, expect } = require('@playwright/test');
const { exec } = require('child_process');
const ConfigPage = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPage.js'));

test('Контекстное меню 0 уровень ', async ({page}) => {
    const config = new ConfigPage(page);
    await config.goto();

    await config.contextMenuVariable();
    await page.getByRole('menuitem', { name: 'Создать переменную', exact: true }).hover();
    await config.clickVariable_1();

    await page.getByText('variable').click({button: 'right'});
    await page.getByRole('menuitem', { name: 'Копировать Ctrl+C' }).click();
    /*await config.contextMenuVariable();
    await page.waitForTimeout(5);
    await page.screenshot({path:'error.png'})
    await expect(page.getByRole('menuitem', { name: 'Вставить Ctrl+V' })).toBeDisabled();
    await page.keyboard.press('Escape')*/
    
    await config.contextMenuVariable();
    await config.clickFolderVatiable();
    await page.getByText('folder').click({button: 'right'});
    await page.getByRole('menuitem', { name: 'Создать папку' }).click();

    await page.getByText('folder').first().click({button: 'right'});
    await page.getByRole('menuitem', { name: 'Игнорировать Ctrl+I' }).click();
    await expect(page.locator('svg').filter({ hasText: 'Заблокирован' })).toBeVisible();

    await page.getByText('Заблокированfolder').click({button: 'right'});
    await page.getByRole('menuitem', { name: 'Копировать Ctrl+C' }).click();
    await config.contextMenuVariable();
    await page.getByRole('menuitem', { name: 'Вставить Ctrl+V' }).click();
    await expect(page.locator('svg').filter({ hasText: 'Заблокирован' }).first()).toBeVisible();
    await page.getByText('Заблокированfolder_copy').click({button: 'right'});
    await page.getByRole('menuitem', { name: 'Использовать Ctrl+I' }).click()

    await page.locator('div').filter({ hasText: /^folder_copy$/ }).nth(1).click({button: 'right'});
    await page.getByRole('menuitem', { name: 'Вырезать Ctrl+X' }).click();
    await config.contextMenuVariable();
    await page.getByRole('menuitem', { name: 'Вставить Ctrl+V' }).click();
})