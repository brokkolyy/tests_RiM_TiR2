const path = require('path');
const { test, expect } = require('@playwright/test');
const { config } = require('process');

const ConfigPage = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPage.js'));

test('Создание соединения GPIO', async ({ page }) => {
  const config = new ConfigPage(page);
  await config.goto();
  await config.contextMenuReception(); // контекстное меню прием
  await config.clickGpio();
  await config.contextMenuBroadcast();  // контекстное меню передача
  await config.clickGpio();

  const el = page.locator('div').filter({ hasText: /^gpio200gpio$/ }).nth(1);
  await expect(el).toBeVisible();
});

test('Создание соединений GPIO + уникальность названий', async({ page }) => {
    const config = new ConfigPage(page);

    await config.goto();
    await config.contextMenuReception();    // контекстное меню прием
    await config.clickGpio();

    await config.clickButtonAddConnRecep();  // выпадающий список добавления элемента прием
    await config.clickGpio();

    const errorIconEl1 = page.locator('svg').filter({ hasText: 'Значение "gpio" уже существует' }).nth(1);
    const errorIconEl2 = page.locator('svg').filter({ hasText: 'Значение "gpio" уже существует' }).first();
    await expect(errorIconEl1).toBeVisible();
    await expect(errorIconEl2).toBeVisible();
    const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
    await expect(buttonError).toBeVisible();
});

test('Создание соединений Comport', async({ page }) => {
    const config = new ConfigPage(page);

    await config.goto();
    await config.contextMenuReception();    // контекстное меню прием
    await config.clickComport();
    await config.contextMenuBroadcast();    // контекстное меню передача
    await config.clickComport();

    const el = page.locator('div').filter({ hasText: /^COMttyS0115200comport$/ }).nth(1);
    await expect(el).toBeVisible();
});

test('Создание соединений Comport + уникальность названий', async({ page }) => {
    const config = new ConfigPage(page);

    await config.goto();
    await config.contextMenuReception();    // контекстное меню прием
    await config.clickComport();

    await config.clickButtonAddConnRecep();     // выпадающий список добавления элемента прием
    await config.clickComport();

    const errorIconEl1 = page.locator('svg').filter({ hasText: 'Значение "comport' }).nth(1);
    const errorIconEl2 = page.locator('svg').filter({ hasText: 'Значение "comport' }).first();
    await expect(errorIconEl1).toBeVisible();
    await expect(errorIconEl2).toBeVisible();
    const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
    await expect(buttonError).toBeVisible();
});

test('Создание соединения IEC client', async ({ page }) => {
    const config = new ConfigPage(page);

    await config.goto();
    await config.contextMenuReception();    // контекстное меню прием
    await config.clickIec104_C();

    await config.clickButtonAddConnRecep();
    await config.clickIec104_C();

    const el = page.locator('div').filter({ hasText: /^iec104127\.0\.0\.1102iec104_client$/ }).nth(1);
    await expect(el).toBeVisible();
});

test('Создание соединений IEC client + уникальность названий', async ({ page }) => {
    const config = new ConfigPage(page);

    await config.goto();
    await config.contextMenuReception();
    await config.clickIec104_C();

    await config.clickButtonAddConnRecep();
    await config.clickIec104_C();

    const errorIconEl1 = page.locator('svg').filter({ hasText: 'Значение "iec104_client' }).nth(1);
    const errorIconEl2 = page.locator('svg').filter({ hasText: 'Значение "iec104_client' }).first();
    await expect(errorIconEl1).toBeVisible();
    await expect(errorIconEl2).toBeVisible();
    const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
    await expect(buttonError).toBeVisible();
});

test('Создание соединения IEC104 server', async ({ page }) => {
    const config = new ConfigPage(page);

    await config.goto();
    await config.contextMenuBroadcast();    // контекстное меню передача
    await config.clickIec104_S();

    await config.clickButtonAddConnBroad();
    await config.clickIec104_S();

    const el = page.locator('div').filter({ hasText: /^iec104127\.0\.0\.1102iec104_server$/ }).first();
    await expect(el).toBeVisible();
});

test('Создание соединений IEC server + уникальность названий', async ({ page }) => {
    const config = new ConfigPage(page);

    await config.goto();
    await config.contextMenuBroadcast();
    await config.clickIec104_S();

    await config.clickButtonAddConnBroad();
    await config.clickIec104_S();

    const errorIconEl1 = page.locator('svg').filter({ hasText: 'Значение "iec104_server' }).nth(1);
    const errorIconEl2 = page.locator('svg').filter({ hasText: 'Значение "iec104_server' }).first();
    await expect(errorIconEl1).toBeVisible();
    await expect(errorIconEl2).toBeVisible();
    const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
    await expect(buttonError).toBeVisible();
});


test('Создание соединения Modbus client', async ({ page }) => {
    const config = new ConfigPage(page);

    await config.goto();
    await config.contextMenuReception();    // контекстное меню прием
    await config.clickModbusTCP_C();
    await config.clickButtonAddConnRecep();    // контекстное меню 
    await config.clickModbusTCP_C();

    const el = page.locator('div').filter({ hasText: /^MB TCP127\.0\.0\.1502modbusTCP_client$/ }).nth(1);
    await expect(el).toBeVisible();
});

test('Создание соединений Modbus client + уникальность соединений', async ({ page }) => {
    const config = new ConfigPage(page);

    await config.goto();
    await config.contextMenuReception();    // контекстное меню прием
    await config.clickModbusTCP_C();

    await config.clickButtonAddConnRecep();
    await config.clickModbusTCP_C();

    const errorIconEl1 = page.locator('svg').filter({ hasText: 'Значение "modbusTCP_client' }).nth(1);
    const errorIconEl2 = page.locator('svg').filter({ hasText: 'Значение "modbusTCP_client' }).first();
    await expect(errorIconEl1).toBeVisible();
    await expect(errorIconEl2).toBeVisible();
    const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
    await expect(buttonError).toBeVisible();
});

test('Создание соединения Modbus server', async ({ page }) => {
    const config = new ConfigPage(page);

    await config.goto();
    await config.contextMenuBroadcast();    // контекстное меню передача
    await config.clickModbusTCP_S();

    await config.clickButtonAddConnBroad();
    await config.clickModbusTCP_S();

    const el = page.locator('div').filter({ hasText: /^MB TCP127\.0\.0\.1502modbusTCP_server$/ }).nth(1);
    await expect(el).toBeVisible();
});

test('Создание соединений Modbus server + уникальность соединений', async ({ page }) => {
    const config = new ConfigPage(page);

    await config.goto();
    await config.contextMenuBroadcast();
    await config.clickModbusTCP_S();

    await config.clickButtonAddConnBroad();
    await config.clickModbusTCP_S();

    const errorIconEl2 = page.locator('svg').filter({ hasText: 'Значение "modbusTCP_server' }).first();
    const errorIconEl1 = page.locator('svg').filter({ hasText: 'Значение "modbusTCP_server' }).nth(1);
    await expect(errorIconEl1).toBeVisible();
    await expect(errorIconEl2).toBeVisible();
    const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
    await expect(buttonError).toBeVisible();
})
/*
test('Создание папок', async ({ page }) => {
    const config = new ConfigPage(page);

    await config.goto();
    await config.contextMenuReception();
    await config.clickFolder();

    await config.contextMenuBroadcast();
    await config.clickFolder();

    await config.contextMenuVariable();
    await config.clickFolder();

    await config.clickButtonAddConnRecep();
    await config.clickFolder();

    await config.clickButtonAddConnBroad();
    await config.clickFolder();

    await config.clickButtonAddFolder();

    const errorIconEl1 = page.locator('div').filter({ hasText: /^folder$/ }).nth(4);
    const errorIconEl2 = page.locator('div:nth-child(3) > ._node_1yclz_1 > .chakra-stack.css-3cqz5p > .chakra-stack.css-n3uhkm > .chakra-stack').first();
    const errorIconEl3 = page.locator('[id=":re:"] > .group > .css-uwwqev > div > ._tree_1yclz_105 > div:nth-child(2) > div:nth-child(2) > ._node_1yclz_1 > .chakra-stack.css-3cqz5p > .chakra-stack.css-n3uhkm > .chakra-stack');
    const errorIconEl4 = page.locator('[id=":re:"] > .group > .css-uwwqev > div > ._tree_1yclz_105 > div:nth-child(2) > div:nth-child(3) > ._node_1yclz_1 > .chakra-stack.css-3cqz5p > .chakra-stack.css-n3uhkm > .chakra-stack');
    const errorIconEl5 = page.locator('[id=":rr:"] > .group > .css-uwwqev > div > ._tree_1yclz_105 > div:nth-child(2) > div:nth-child(2) > ._node_1yclz_1 > .chakra-stack.css-3cqz5p > .chakra-stack.css-n3uhkm > .chakra-stack');
    const errorIconEl6 = page.locator('[id=":rr:"] > .group > .css-uwwqev > div > ._tree_1yclz_105 > div:nth-child(2) > div:nth-child(3) > ._node_1yclz_1 > .chakra-stack.css-3cqz5p > .chakra-stack.css-n3uhkm > .chakra-stack');
    await expect(errorIconEl1).toBeVisible();
    await expect(errorIconEl2).toBeVisible();
    await expect(errorIconEl3).toBeVisible();
    await expect(errorIconEl4).toBeVisible();
    await expect(errorIconEl5).toBeVisible();
    await expect(errorIconEl6).toBeVisible();
})*/