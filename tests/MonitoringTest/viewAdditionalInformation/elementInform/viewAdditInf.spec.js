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

test('Элемент "GPIO" -> "дополнительная информация"', async ({ page }) => {
    const monitoring = new MonitoringPage(page);

    await monitoring.goto();


    await locat(page);
    await expect(page.locator('[id="scroll-area-:r45::content"]').getByText('Логирование')).toBeVisible();
    await expect(page.getByText('Период дребезга')).toBeVisible();
})

test('Элемент "Comport" -> "дополнительная информация"', async ({ page }) => {
    const monitoring = new MonitoringPage(page);

    await monitoring.goto();


    await locat(page);
    await expect(page.getByText('Период дребезга')).toBeVisible();
    await expect(page.getByText('Интерфейс')).toBeVisible()
    await expect(page.getByText('Скорость')).toBeVisible()
    await expect(page.getByText('Стоп-бит')).toBeVisible()
    await expect(page.getByText('Паритет')).toBeVisible()
})

test('Элемент "ModbusRTU"(Прием) -> "дополнительная информация"', async ({ page }) => {
    const monitoring = new MonitoringPage(page);

    await monitoring.goto();


    await locat(page);
    await expect(page.locator('[id="scroll-area-:r7b::content"]').getByText('Логирование')).toBeVisible();
    await expect(page.getByText('Адрес устройства')).toBeVisible();
    await expect(page.getByText('Порядок 2-х байт')).toBeVisible()
    await expect(page.getByText('Порядок 4-х байт')).toBeVisible()
    await expect(page.getByText('Пауза между запросами, мс')).toBeVisible()

})
test('Элемент "ModbusRTU"(Передача) -> "дополнительная информация"', async ({ page }) => {
    const monitoring = new MonitoringPage(page);

    await monitoring.goto();


    await locat(page);
    await expect(page.locator('[id="scroll-area-:r7b::content"]').getByText('Логирование')).toBeVisible();
    await expect(page.getByText('Адрес устройства')).toBeVisible();
    await expect(page.getByText('Порядок 2-х байт')).toBeVisible()
    await expect(page.getByText('Порядок 4-х байт')).toBeVisible()
    await expect(page.getByText('Пауза между запросами, мс')).toBeVisible()

})

test('Элемент "IEC104" ->"дополнительная информация"', async ({ page }) => {
    const monitoring = new MonitoringPage(page);

    await monitoring.goto();


    await locat(page);
    await expect().toBeVisible();
    await expect().toBeVisible();
    await expect().toBeVisible()
    await expect().toBeVisible()
    await expect().toBeVisible()
    await expect().toBeVisible()
})

test('Элемент "FunctionGrop" -> "дополнительная информация"', async ({ page }) => {
    const monitoring = new MonitoringPage(page);

    await monitoring.goto();


    await locat(page);
    await expect(page.getByText('Функция')).toBeVisible();
    await expect(page.getByText('Тип данных')).toBeVisible();
})

test('Элемент "ASDU"(Прием) -> "дополнительная информация"', async ({ page }) => {
    const monitoring = new MonitoringPage(page);

    await monitoring.goto();


    await locat(page);
    await expect(page.getByText('Адрес ASDU')).toBeVisible();
    await expect(page.getByText('Режим опроса')).toBeVisible();
    await expect(page.getByText('Период опроса, мин')).toBeVisible();
})

test('Элемент "ASDU"(Передача) -> "дополнительная информация"', async ({ page }) => {
    const monitoring = new MonitoringPage(page);

    await monitoring.goto();


    await locat(page);
    await expect(page.getByText('Спорадика')).toBeVisible();
    await expect(page.getByText('Адрес ASDU')).toBeVisible();
})