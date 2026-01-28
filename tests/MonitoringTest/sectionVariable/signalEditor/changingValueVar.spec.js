const path = require('path');
const { test, expect } = require('@playwright/test');
const { config } = require('process');
const MonitoringPage = require(path.join(process.cwd(), 'pages', 'Monitoring', 'MonitoringPage.js'));

test('Переключатель "Изменение значения переменной" для типа "1 бит - bool"', async ({page}) => {
    const monitoring = new MonitoringPage(page);
    await monitoring.goto();

    // добавить создание переменной в конфигуравции с типом  bool

    await expect(page.getByRole('heading', { name: 'Редактор сигнала' })).toBeVisible()
    await expect(page.getByText('Изменение значения переменной')).toBeVisible()

    await page.locator('span').filter({ hasText: /^0$/ }).first().click();
    await expect(page.getByLabel('Редактор сигнала').getByText('1', { exact: true })).toBeVisible()

    await page.getByLabel('Редактор сигнала').getByText('1', { exact: true }).click();
    await expect(page.getByText('0', { exact: true })).toBeVisible();
    await monitoring.clickAccept();
    await expect(page.getByRole('heading', { name: 'Редактор сигнала' })).not.toBeVisible()
})

test('Поле "Значение" тип "2 байта - целое без знака""', async ({page}) => {
    const monitoring = new MonitoringPage(page);
    await monitoring.goto();

    // добавить создание переменной в конфигуравции с типом  2 байта - целое без знака

    await expect(page.getByRole('heading', { name: 'Редактор сигнала' })).toBeVisible()
    await expect(page.getByText('Изменение значения переменной')).toBeVisible()

    await expect(page.getByText('Значение')).toBeVisible()
    await expect(page.getByText('Целое от 0 до')).toBeVisible()
   
    await monitoring.clickAccept();
    await expect(page.getByRole('heading', { name: 'Редактор сигнала' })).not.toBeVisible()
})

test('Поле "Значение" тип "2 байта - целое"', async ({page}) => {
    const monitoring = new MonitoringPage(page);
    await monitoring.goto();

    // добавить создание переменной в конфигуравции с типом  2 байта - целое

    await expect(page.getByRole('heading', { name: 'Редактор сигнала' })).toBeVisible()
    await expect(page.getByText('Изменение значения переменной')).toBeVisible()

    await expect(page.getByText('Значение')).toBeVisible()
    await expect(page.getByText('Целое от 0 до')).toBeVisible()
   
    await monitoring.clickAccept();
    await expect(page.getByRole('heading', { name: 'Редактор сигнала' })).not.toBeVisible()
})

test('Поле "Значение" тип "4 байта - целое"', async ({page}) => {
    const monitoring = new MonitoringPage(page);
    await monitoring.goto();

    // добавить создание переменной в конфигуравции с типом  4 байта - целое

    await expect(page.getByRole('heading', { name: 'Редактор сигнала' })).toBeVisible()
    await expect(page.getByText('Изменение значения переменной')).toBeVisible()

    await expect(page.getByText('Значение')).toBeVisible()
    await expect(page.getByText('Целое от 0 до')).toBeVisible()
   
    await monitoring.clickAccept();
    await expect(page.getByRole('heading', { name: 'Редактор сигнала' })).not.toBeVisible()
})

test('Поле "Значение" тип "4 байта - целое без знака"', async ({page}) => {
    const monitoring = new MonitoringPage(page);
    await monitoring.goto();

    // добавить создание переменной в конфигуравции с типом  4 байта - целое без знака

    await expect(page.getByRole('heading', { name: 'Редактор сигнала' })).toBeVisible()
    await expect(page.getByText('Изменение значения переменной')).toBeVisible()

    await expect(page.getByText('Значение')).toBeVisible()
    await expect(page.getByText('Целое от 0 до')).toBeVisible()
   
    await monitoring.clickAccept();
    await expect(page.getByRole('heading', { name: 'Редактор сигнала' })).not.toBeVisible()
})

test('Поле "Значение" тип "4 байта - с плавающей точкой"', async ({page}) => {
    const monitoring = new MonitoringPage(page);
    await monitoring.goto();

    // добавить создание переменной в конфигуравции с типом  4 байта - с плавающей точкой

    await expect(page.getByRole('heading', { name: 'Редактор сигнала' })).toBeVisible()
    await expect(page.getByText('Изменение значения переменной')).toBeVisible()

    await expect(page.getByText('Значение')).toBeVisible()
    await expect(page.getByText('Целое от 0 до')).toBeVisible()
   
    await monitoring.clickAccept();
    await expect(page.getByRole('heading', { name: 'Редактор сигнала' })).not.toBeVisible()
})