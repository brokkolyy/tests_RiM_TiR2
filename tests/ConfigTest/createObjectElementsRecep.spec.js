const path = require('path');
const { test, expect } = require('@playwright/test');
const ConfigPage = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPage.js'));
const ConfigPageElements = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPageElements.js'));

test('Создание объектов данных GPIO(1), раздел "Прием"', async ({ page }) => {
    const config = new ConfigPage(page);
    const configElement = new ConfigPageElements(page);

    await config.goto();
    await config.contextMenuReception();
    await config.clickGpio();

    await page.locator('div').filter({ hasText: /^gpio200gpio$/ }).nth(1).click({
        button: 'right'});
    await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
    await configElement.clickObject_1();

    const obj = page.locator('div').filter({ hasText: /^1inЭто поле обязательно для заполнения$/ }).nth(1);
    await expect(obj).toBeVisible();
});

test('Создание объектов данных(2) GPIO, раздел "Прием"', async ({ page }) => {
    const config = new ConfigPage(page);
    const configElement = new ConfigPageElements(page);

    await config.goto();
    await config.contextMenuReception();
    await config.clickGpio();

    await page.locator('div').filter({ hasText: /^gpio200gpio$/ }).nth(1).click({
        button: 'right'});
    await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
    await configElement.clickObject_2();

    const obj = page.locator('div').filter({ hasText: /^1inЭто поле обязательно для заполнения$/ }).nth(4);
    await expect(obj).toBeVisible();
});

test('Создание объектов данных(3) GPIO, раздел "Прием"', async ({ page }) => {
    const config = new ConfigPage(page);
    const configElement = new ConfigPageElements(page);

    await config.goto();
    await config.contextMenuReception();
    await config.clickGpio();

    await page.locator('div').filter({ hasText: /^gpio200gpio$/ }).nth(1).click({
        button: 'right'});
    await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
    await configElement.clickObject_3();

    const obj = page.locator('div:nth-child(5) > ._node_1yclz_1');
    await expect(obj).toBeVisible();
})

test('Создание объектов данных(5) GPIO, раздел "Прием"', async ({ page }) => {
    const config = new ConfigPage(page);
    const configElement = new ConfigPageElements(page);

    await config.goto();
    await config.contextMenuReception();
    await config.clickGpio();

    await page.locator('div').filter({ hasText: /^gpio200gpio$/ }).nth(1).click({
        button: 'right'});
    await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
    await configElement.clickObject_5();

    const obj = page.locator('div:nth-child(7) > ._node_1yclz_1');
    await expect(obj).toBeVisible();
});

test('Создание объектов данных(10) GPIO, раздел "Прием"', async ({ page }) => {
    const config = new ConfigPage(page);
    const configElement = new ConfigPageElements(page);

    await config.goto();
    await config.contextMenuReception();
    await config.clickGpio();

    await page.locator('div').filter({ hasText: /^gpio200gpio$/ }).nth(1).click({
        button: 'right'});
    await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
    await configElement.clickObject_10();

    const obj = page.locator('div:nth-child(12) > ._node_1yclz_1');
    await expect(obj).toBeVisible();
});

test('Создание объектов данных(1) IEC104, раздел "Прием"', async ({ page }) => {
    const config = new ConfigPage(page);
    const configElement = new ConfigPageElements(page);

    await config.goto();
    await config.contextMenuReception();
    await config.clickIec104_C();

    await page.locator('div').filter({ hasText: /^iec104127\.0\.0\.1102iec104_client$/ }).nth(1).click({
        button: 'right'});
    await configElement.clickAsdu();

    await page.locator('div').filter({ hasText: /^asdu1asdu$/ }).nth(1).click({
        button: 'right'});
    await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
    await configElement.clickObject_1();

    const obj = page.locator('div').filter({ hasText: /^ts1Это поле обязательно для заполненияЭто поле обязательно для заполнения$/ }).nth(1);
    await expect(obj).toBeVisible();
});

test('Создание объектов данных(2) IEC104, раздел "Прием"', async ({ page }) => {
    const config = new ConfigPage(page);
    const configElement = new ConfigPageElements(page);

    await config.goto();
    await config.contextMenuReception();
    await config.clickIec104_C();

    await page.locator('div').filter({ hasText: /^iec104127\.0\.0\.1102iec104_client$/ }).nth(1).click({
        button: 'right'});
    await configElement.clickAsdu();

    await page.locator('div').filter({ hasText: /^asdu1asdu$/ }).nth(1).click({
        button: 'right'});
    await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
    await configElement.clickObject_2();

    const obj = page.locator('div').filter({ hasText: /^ts1Это поле обязательно для заполненияЭто поле обязательно для заполнения$/ }).nth(4);
    await expect(obj).toBeVisible();
});

test('Создание объектов данных(3) IEC104, раздел "Прием"', async ({ page }) => {
    const config = new ConfigPage(page);
    const configElement = new ConfigPageElements(page);

    await config.goto();
    await config.contextMenuReception();
    await config.clickIec104_C();

    await page.locator('div').filter({ hasText: /^iec104127\.0\.0\.1102iec104_client$/ }).nth(1).click({
        button: 'right'});
    await configElement.clickAsdu();

    await page.locator('div').filter({ hasText: /^asdu1asdu$/ }).nth(1).click({
        button: 'right'});
    await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
    await configElement.clickObject_3();

    const obj = page.locator('div:nth-child(6) > ._node_1yclz_1');
    await expect(obj).toBeVisible();
});

test('Создание объектов данных(5) IEC104, раздел "Прием"', async ({ page }) => {
    const config = new ConfigPage(page);
    const configElement = new ConfigPageElements(page);

    await config.goto();
    await config.contextMenuReception();
    await config.clickIec104_C();

    await page.locator('div').filter({ hasText: /^iec104127\.0\.0\.1102iec104_client$/ }).nth(1).click({
        button: 'right'});
    await configElement.clickAsdu();

    await page.locator('div').filter({ hasText: /^asdu1asdu$/ }).nth(1).click({
        button: 'right'});
    await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
    await configElement.clickObject_5();

    const obj = page.locator('div:nth-child(8) > ._node_1yclz_1');
    await expect(obj).toBeVisible();
});

test('Создание объектов данных(10) IEC104, раздел "Прием"', async ({ page }) => {
    const config = new ConfigPage(page);
    const configElement = new ConfigPageElements(page);

    await config.goto();
    await config.contextMenuReception();
    await config.clickIec104_C();

    await page.locator('div').filter({ hasText: /^iec104127\.0\.0\.1102iec104_client$/ }).nth(1).click({
        button: 'right'});
    await configElement.clickAsdu();

    await page.locator('div').filter({ hasText: /^asdu1asdu$/ }).nth(1).click({
        button: 'right'});
    await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
    await configElement.clickObject_10();

    const obj = page.locator('div:nth-child(12) > ._node_1yclz_1 > .chakra-stack.css-3cqz5p');
    await expect(obj).toBeVisible();
});

test('Создание объектов данных(1) ModbusRTU Master, раздел "Прием"', async ({ page }) => {
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

    await page.locator('div').filter({ hasText: /^fg1functionGroup$/ }).first().click({
        button: 'right'});
    await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
    await configElement.clickObject_1();

    const obj = page.locator('div').filter({ hasText: /^Это поле обязательно для заполненияЭто поле обязательно для заполнения$/ }).nth(1);
    await expect(obj).toBeVisible();
});

test('Создание объектов данных(2) ModbusRTU Master, раздел "Прием"', async ({ page }) => {
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

    await page.locator('div').filter({ hasText: /^fg1functionGroup$/ }).first().click({
        button: 'right'});
    await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
    await configElement.clickObject_2();

    const obj = page.locator('div').filter({ hasText: /^Это поле обязательно для заполненияЭто поле обязательно для заполнения$/ }).nth(4);
    await expect(obj).toBeVisible();
});

test('Создание объектов данных(3) ModbusRTU Master, раздел "Прием"', async ({ page }) => {
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

    await page.locator('div').filter({ hasText: /^fg1functionGroup$/ }).first().click({
        button: 'right'});
    await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
    await configElement.clickObject_3();

    const obj = page.locator('div:nth-child(7) > ._node_1yclz_1');
    await expect(obj).toBeVisible();
});

test('Создание объектов данных(5) ModbusRTU Master, раздел "Прием"', async ({ page }) => {
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

    await page.locator('div').filter({ hasText: /^fg1functionGroup$/ }).first().click({
        button: 'right'});
    await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
    await configElement.clickObject_5();

    const obj = page.locator('div:nth-child(9) > ._node_1yclz_1');
    await expect(obj).toBeVisible();
});

test('Создание объектов данных(10) ModbusRTU Master, раздел "Прием"', async ({ page }) => {
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

    await page.locator('div').filter({ hasText: /^fg1functionGroup$/ }).first().click({
        button: 'right'});
    await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
    await configElement.clickObject_10();

    const obj = page.locator('div:nth-child(12) > ._node_1yclz_1');
    await expect(obj).toBeVisible();
});

test('Создание объектов данных(1) ModbusTCP client, раздел "Прием"', async ({ page }) => {
    const config = new ConfigPage(page);
    const configElement = new ConfigPageElements(page);

    await config.goto();
    await config.contextMenuReception();
    await config.clickModbusTCP_C();

    await page.locator('div').filter({ hasText: /^MB TCP127\.0\.0\.1502modbusTCP_client$/ }).nth(1).click({
        button: 'right'});
    await configElement.clickFunctionGroup();

    await page.locator('div').filter({ hasText: /^fg1functionGroup$/ }).first().click({
        button: 'right'});
    await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
    await configElement.clickObject_1();

    const obj = await page.locator('div').filter({ hasText: /^Это поле обязательно для заполненияЭто поле обязательно для заполнения$/ }).nth(1);
    await expect(obj).toBeVisible();
});

test('Создание объектов данных(2) ModbusTCP client, раздел "Прием"', async ({ page }) => {
    const config = new ConfigPage(page);
    const configElement = new ConfigPageElements(page);

    await config.goto();
    await config.contextMenuReception();
    await config.clickModbusTCP_C();

    await page.locator('div').filter({ hasText: /^MB TCP127\.0\.0\.1502modbusTCP_client$/ }).nth(1).click({
        button: 'right'});
    await configElement.clickFunctionGroup();

    await page.locator('div').filter({ hasText: /^fg1functionGroup$/ }).first().click({
        button: 'right'});
    await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
    await configElement.clickObject_2();

    const obj = await page.locator('div').filter({ hasText: /^Это поле обязательно для заполненияЭто поле обязательно для заполнения$/ }).nth(4);
    await expect(obj).toBeVisible();
});

test('Создание объектов данных(3) ModbusTCP client, раздел "Прием"', async ({ page }) => {
    const config = new ConfigPage(page);
    const configElement = new ConfigPageElements(page);

    await config.goto();
    await config.contextMenuReception();
    await config.clickModbusTCP_C();

    await page.locator('div').filter({ hasText: /^MB TCP127\.0\.0\.1502modbusTCP_client$/ }).nth(1).click({
        button: 'right'});
    await configElement.clickFunctionGroup();

    await page.locator('div').filter({ hasText: /^fg1functionGroup$/ }).first().click({
        button: 'right'});
    await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
    await configElement.clickObject_3();

    const obj = await page.locator('div:nth-child(6) > ._node_1yclz_1');
    await expect(obj).toBeVisible();
});

test('Создание объектов данных(5) ModbusTCP client, раздел "Прием"', async ({ page }) => {
    const config = new ConfigPage(page);
    const configElement = new ConfigPageElements(page);

    await config.goto();
    await config.contextMenuReception();
    await config.clickModbusTCP_C();

    await page.locator('div').filter({ hasText: /^MB TCP127\.0\.0\.1502modbusTCP_client$/ }).nth(1).click({
        button: 'right'});
    await configElement.clickFunctionGroup();

    await page.locator('div').filter({ hasText: /^fg1functionGroup$/ }).first().click({
        button: 'right'});
    await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
    await configElement.clickObject_5();

    const obj = await page.locator('div:nth-child(8) > ._node_1yclz_1');
    await expect(obj).toBeVisible();
});

test('Создание объектов данных(10) ModbusTCP client, раздел "Прием"', async ({ page }) => {
    const config = new ConfigPage(page);
    const configElement = new ConfigPageElements(page);

    await config.goto();
    await config.contextMenuReception();
    await config.clickModbusTCP_C();

    await page.locator('div').filter({ hasText: /^MB TCP127\.0\.0\.1502modbusTCP_client$/ }).nth(1).click({
        button: 'right'});
    await configElement.clickFunctionGroup();

    await page.locator('div').filter({ hasText: /^fg1functionGroup$/ }).first().click({
        button: 'right'});
    await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
    await configElement.clickObject_10();

    const obj = await page.locator('div:nth-child(12) > ._node_1yclz_1');
    await expect(obj).toBeVisible();
})