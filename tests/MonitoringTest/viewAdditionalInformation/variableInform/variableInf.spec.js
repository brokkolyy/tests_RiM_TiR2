const path = require('path');
const { test, expect } = require('@playwright/test');
const { config } = require('process');
const MonitoringPage = require(path.join(process.cwd(), 'pages', 'Monitoring', 'MonitoringPage.js'));

async function locat(page) {
    const nameInf = page.getByRole('menuitem', { name: 'Дополнительная информация' });
    await expect(nameInf).toBeVisible();
    const buttonClose = page.getByRole('button', { name: 'Close' });
    await expect(buttonClose).toBeVisible();
    const settings = page.getByText('Настройки');
    await expect(settings).toBeVisible();
}

test('Переменная "GPIO" -> "дополнительная информация"', async ({page}) => {
    const monitoring = new MonitoringPage(page);
    await monitoring.goto();


    await expect(page.getByText('Порт')).toBeVisible()
    await expect(page.getByText('Функция')).toBeVisible()
})

test('Переменная "Comport" -> "дополнительная информация"', async ({page}) => {
    const monitoring = new MonitoringPage(page);
    await monitoring.goto();


    await expect(page.getByText('Адрес информационного объекта')).toBeVisible()
})

test('Переменная "IEC104" -> "дополнительная информация"', async ({page}) => {
    const monitoring = new MonitoringPage(page);
    await monitoring.goto();


    await expect().toBeVisible()
})