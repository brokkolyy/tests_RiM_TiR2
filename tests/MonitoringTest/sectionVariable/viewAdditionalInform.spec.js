const path = require('path');
const { test, expect } = require('@playwright/test');
const { config } = require('process');
const MonitoringPage = require(path.join(process.cwd(), 'pages', 'Monitoring', 'MonitoringPage.js'));

async function locat(page) {
    const nameInf = page.getByRole('menuitem', { name: 'Дополнительная информация' });
    //await expect(nameInf).toBeVisible();
    const buttonClose = page.getByRole('button', { name: 'Close' });
    await expect(buttonClose).toBeVisible();
    const settings = page.getByText('Настройки');
    await expect(settings).toBeVisible();
}

test('Переменные -> "дополнительная информация"', async ({page}) => {
    const monitoring = new MonitoringPage(page);
    await monitoring.goto();
    await page.getByText('IRZGPIO_ACOk').nth(1).click({button: 'right'});
    await monitoring.clickAdditInf()
    

    await locat(page)
    await expect(page.getByText('Тип данных')).toBeVisible()
    await expect(page.getByText('Цикличная')).toBeVisible()
    await expect(page.getByText('Задержка цикла, сек')).toBeVisible()
    await expect(page.getByText('В архив ТИ')).toBeVisible()
    await expect(page.getByText('Единица измерения')).toBeVisible()
    await expect(page.getByText('Апертура')).toBeVisible()
    await page.evaluate(() => { window.scrollTo(0, document.body.scrollHeight)})
    await page.screenshot({path:'err.png'})
    await expect(page.getByText('ТУ', { exact: true })).toBeVisible()
    await expect(page.getByText('В архив ТС')).toBeVisible()
    await expect(page.getByText('Группа')).toBeVisible()
})