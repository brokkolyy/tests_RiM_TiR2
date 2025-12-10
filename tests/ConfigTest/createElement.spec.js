const path = require('path');
const { test, expect } = require('@playwright/test');
/*const { config } = require('process');
const { configPageElement } = require('process');*/

const ConfigPage = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPage.js'));
const ConfigPageElements = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPageElements.js'));

test('Создание ModbusRTU Master, раздел "Прием"', async ({ page }) => {         //Элементы comport, раздел "Прием"
    const config = new ConfigPage(page);
    const configElement = new ConfigPageElements(page);

    await config.goto();
    await config.contextMenuReception();
    await config.clickComport();

    await page.locator('div').filter({ hasText: /^COMttyS0115200comport$/ }).nth(1).click({
    button: 'right'});
    await configElement.clickModbusRTU_Master();

    const el = page.locator('div').filter({ hasText: /^MB RTU1modbusRTU_master$/ }).nth(1);
    await expect(el).toBeVisible();
});

test('Создание TCPBridge Server, раздел "Прием"', async ({ page }) => {
    const config = new ConfigPage(page);
    const configElement = new ConfigPageElements(page);

    await config.goto();
    await config.contextMenuReception();
    await config.clickComport();

    await page.locator('div').filter({ hasText: /^COMttyS0115200comport$/ }).nth(1).click({
    button: 'right'});
    await configElement.clickTcpBridge_Server();

    const el = page.locator('div').filter({ hasText: /^TCP127\.0\.0\.1502tcpBridge_server$/ }).nth(1);
    await expect(el).toBeVisible();
});

test('Создание функциональной группы, раздел "Прием"', async ({ page }) => {
    const config = new ConfigPage(page);
    const configElement = new ConfigPageElements(page);

    await config.goto();
    await config.contextMenuReception();
    await config.clickComport();

    await page.locator('div').filter({ hasText: /^COMttyS0115200comport$/ }).nth(1).click({
        button: 'right'});
    await configElement.clickModbusRTU_Master();

    await page.locator('div').filter({ hasText: /^MB RTU1modbusRTU_master$/ }).nth(1).click({
        button: 'right'});
    await configElement.clickFunctionGroup();

    const el = page.locator('div').filter({ hasText: /^fg1functionGroup$/ }).first();
    await expect(el).toBeVisible();
});

test('Создание ModbusRTU Slave, раздел "Передача"', async ({ page }) => {           //Элементы comport, раздел "Передача"
    const config = new ConfigPage(page);
    const configElement = new ConfigPageElements(page);

    await config.goto();
    await config.contextMenuBroadcast();
    await config.clickComport();

    await page.locator('div').filter({ hasText: /^COMttyS0115200comport$/ }).nth(1).click({
        button: 'right'});
    await configElement.clickModbusRTU_Slave();

    const el = page.locator('div').filter({ hasText: /^MB RTU1modbusRTU_slave$/ }).nth(1);
    await expect(el).toBeVisible();
});

test('Создание TCPBridge Client, раздел "Передача"', async ({ page }) => {
    const config = new ConfigPage(page);
    const configElement = new ConfigPageElements(page);

    await config.goto();
    await config.contextMenuBroadcast();
    await config.clickComport();

    await page.locator('div').filter({ hasText: /^COMttyS0115200comport$/ }).nth(1).click({
        button: 'right'});
    await configElement.clickTcpBridge_Client();

    const el = page.locator('div').filter({ hasText: /^TCP127\.0\.0\.1502tcpBridge_client$/ }).nth(1);
    await expect(el).toBeVisible();
});

test('Создание функциональной группы, раздел "Передача"', async ({ page }) => {
    const config = new ConfigPage(page);
    const configElement = new ConfigPageElements(page);

    await config.goto();
    await config.contextMenuBroadcast();
    await config.clickComport();

    await page.locator('div').filter({ hasText: /^COMttyS0115200comport$/ }).nth(1).click({
        button: 'right'});
    await configElement.clickModbusRTU_Slave();

    await page.locator('div').filter({ hasText: /^MB RTU1modbusRTU_slave$/ }).nth(2).click({
        button: 'right'});
    await configElement.clickFunctionGroup();

    const el = page.locator('div').filter({ hasText: /^fg1functionGroup$/ }).first();
    await expect(el).toBeVisible();
});

test('Создание элемента ASDU (client)', async ({ page }) => {
    const config = new ConfigPage(page);
    const configElement = new ConfigPageElements(page);

    await config.goto();
    await config.contextMenuReception();
    await config.clickIec104_C();

    await page.locator('div').filter({ hasText: /^iec104127\.0\.0\.1102iec104_client$/ }).nth(1).click({
        button: 'right'});
    await configElement.clickAsdu();

    const el = page.locator('div').filter({ hasText: /^asdu1asdu$/ }).nth(1);
    await expect(el).toBeVisible();
});

test('Создание элемента ASDU (server)', async ({ page }) => {
    const config = new ConfigPage(page);
    const configElement = new ConfigPageElements(page);

    await config.goto();
    await config.contextMenuBroadcast();
    await config.clickIec104_S();

    await page.locator('div').filter({ hasText: /^iec104127\.0\.0\.1102iec104_server$/ }).nth(1).click({
        button: 'right'});
    await configElement.clickAsdu();

    const el = page.locator('div').filter({ hasText: /^asdu1asdu$/ }).nth(1);
    await expect(el).toBeVisible();
});
