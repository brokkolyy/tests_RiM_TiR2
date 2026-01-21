const path = require('path');
const { test, expect } = require('@playwright/test');
const { exec } = require('child_process');
const ConfigPage = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPage.js'));

async function prepare(page) {
    const config = new ConfigPage(page);
    await config.contextMenuVariable();
    await page.getByRole('menuitem', { name: 'Создать переменную', exact: true }).hover();
}

test('Контекстное меню 0 уровень ', async ({page}) => {
    const config = new ConfigPage(page);
        await config.goto();
        await config.contextMenuVariable();

        await config.clickFolderVatiable();

        await prepare(page)
        await config.clickVariable_1();
    
        await prepare(page)
        await config.clickVariable_2();

        await prepare(page)
        await config.clickVariable_3();

        await prepare(page)
        await config.clickVariable_5();

        await prepare(page)
        await config.clickVariable_10();

        await config.contextMenuVariable();
        await config.clickFolderVatiable();


})