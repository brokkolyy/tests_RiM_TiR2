const path = require('path');
const { test, expect } = require('@playwright/test');
const { config } = require('process');
const MonitoringPage = require(path.join(process.cwd(), 'pages', 'Monitoring', 'MonitoringPage.js'));

async function seach(page) {
    const seachString = page.getByRole('textbox', { name: 'Поиск' });
    await seachString.focus()
    await expect(seachString).toBeFocused()
    await seachString.fill('');
    return seachString;
}

test('Поиск объектов', async ({page}) => {
    const monitoring = new MonitoringPage(page)
    await monitoring.goto();

    // Получаем все элементы ДО клика
    const allDivs = page.locator('div');
    const countBefore = await allDivs.count();
// Кликаем на элемент для фильтрации
    //await page.locator('div').filter({ hasText: 'Переменныеvariable' }).nth(4).click();
    const seachString = seach(page)
    await seachString.fill('modbusRTU_master')
    await page.keyboard.press('Enter')
// Получаем элементы ПОСЛЕ клика
    const visibleDivs = page.locator('div:visible');
    const countAfter = await visibleDivs.count();
// Проверяем, что количество видимых элементов уменьшилось
    expect(countAfter).toBeLessThan(countBefore);
})

test('Поиск элементов', async({page}) => {
    const monitoring = new MonitoringPage(page)
    await monitoring.goto();


})

test('Поиск переменных', async({page}) => {
    const monitoring = new MonitoringPage(page)
    await monitoring.goto();

})

test('Поиск папки', async({page}) => {
    const monitoring = new MonitoringPage(page)
    await monitoring.goto();

})