const path = require('path');
const { test, expect } = require('@playwright/test');
const ConfigPage = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPage.js'));
const ConfigPageElements = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPageElements.js'));

test('Уникальность объекта данных (FG-ИО)-(FG-ИО)', async ({ page }) => {
    const config = new ConfigPage(page);
    const configElement = new ConfigPageElements(page);
        
    await config.goto();
    await config.contextMenuBroadcast();
    await config.clickComport();
        
    await page.locator('div').filter({ hasText: /^COMttyS0115200comport$/ }).nth(1).click({button: 'right'});
    await configElement.clickModbusRTU_Slave();
    
    await page.locator('div').filter({ hasText: /^MB RTU1modbusRTU_slave$/ }).nth(1).click({button: 'right'});
    await configElement.clickFunctionGroup();

    await page.locator('div').filter({ hasText: /^fg1functionGroup$/ }).first().click({button: 'right'});
    await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
    await configElement.clickObject_1();       //1 функциональная группа
    
    await page.locator('div:nth-child(4) > ._node_1yclz_1').click({button: 'right'});
    await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
    await configElement.clickObject_2();
    const el1 = page.locator('div').filter({ hasText: /^Это поле обязательно для заполненияЭто поле обязательно для заполнения$/ }).nth(1);
    await expect(el1).toBeVisible();        //1 объект данный
    const el2 = page.locator('._node_1yclz_1.isLeaf > .chakra-stack.css-3cqz5p > .chakra-stack.css-n3uhkm > .chakra-stack').first();
    await expect(el2).toBeVisible();        //2 объект данный
    await page.locator('div:nth-child(4) > ._node_1yclz_1').click({button: 'right'});
    await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
    await configElement.clickObject_1();
    const el3 = page.locator('div:nth-child(7) > ._node_1yclz_1'); //3 объект данных
    await expect(el3).toBeVisible();
    
    const errorIcon = page.locator('svg').filter({ hasText: 'Это поле обязательно для заполненияЭто поле обязательно для заполнения' }).first();
    const errorIcon1 = page.locator('svg').filter({ hasText: 'Это поле обязательно для заполнения' }).nth(4);
    await expect(errorIcon).toBeVisible();
    const errIcon2 = page.locator('svg').filter({ hasText: 'Это поле обязательно для заполненияАдрес должен быть уникальным внутри родительс' }).nth(1);
    const errorButton = page.getByRole('button', { name: 'Показать ошибки' });
    await expect(errorButton).toBeVisible();

    const fieldError = page.locator('svg').filter({ hasText: 'Это поле обязательно для заполнения' }).nth(3);// 1 объект ошибка в поле (Это поле обязактельно для заполнения)
    await el1.click();
    await expect(fieldError).toBeVisible();         //должна быть ошибка пустого поля
    const fieldEl1 = page.getByRole('textbox', { name: 'Адрес информационного объекта' });
    await fieldEl1.focus();
    await expect(fieldEl1).toBeFocused();
    
    const inputVal = '0x1';
    await fieldEl1.fill(inputVal);
    await fieldEl1.press('Enter');
    const val = await fieldEl1.inputValue();
    expect(val).toBe('0x1');
    await expect(fieldError).toBeVisible();     // не должно быть иконки в поле 

    await el2.click();
    await expect(fieldError).toBeVisible();     //должна быть ошибка пустого поля
    const fieldEl2 = page.getByRole('textbox', { name: 'Адрес информационного объекта' });
    await fieldEl2.focus();
    await expect(fieldEl2).toBeFocused();

    await fieldEl2.fill(inputVal);
    await fieldEl2.press('Enter');
    await page.getByRole('banner').click();
    const val2 = await fieldEl2.inputValue();
    expect(val2).toBe('0x1');
    await expect(page.locator('.chakra-icon.css-pgosud > path').first()).toBeVisible();    

    /*await page.getByRole('paragraph').filter({ hasText: 'functionGroup' }).click({button: 'right'});
    await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
    await configElement.clickObject_1();
    const el3 = page.locator('div:nth-child(7) > ._node_1yclz_1 > .chakra-stack.css-3cqz5p > .chakra-stack.css-n3uhkm > .chakra-stack'); //3 объект данных
    await expect(el3).toBeVisible();*/
    
    // замените ваш последовательный код этим блоком
    
    await el3.waitFor({ state: 'attached', timeout: 5000 });
    await expect(el3).toBeVisible({ timeout: 5000 });
    // --- вставьте этот блок вместо проблемного el3.click(...) ---
await page.addStyleTag({ content: `* { transition: none !important; animation: none !important; }` });

// локатор
const ele3 = page.locator('div:nth-child(7) > ._node_1yclz_1');

// helper: дождаться прикрепления и видимости
await ele3.waitFor({ state: 'attached', timeout: 7000 });
await expect(ele3).toBeVisible({ timeout: 7000 });

// helper: дождёмся, пока boundingBox перестанет меняться
async function waitForStable(locator, stableMs = 120, attempts = 8) {
  for (let i = 0; i < attempts; i++) {
    const b1 = await locator.boundingBox();
    if (!b1) { await page.waitForTimeout(80); continue; }
    await page.waitForTimeout(stableMs);
    const b2 = await locator.boundingBox();
    if (b2
        && b1.x === b2.x
        && b1.y === b2.y
        && b1.width === b2.width
        && b1.height === b2.height) {
      return;
    }
  }
  throw new Error('Element did not become stable (bounding box kept changing)');
}

await waitForStable(ele3);

// попытки клика с падением на координатный клик и pointer emulation
let clicked = false;
const errors = [];
try {
  // 1) сначала пробуем обычный click (без force)
  await ele3.click({ timeout: 3000 });
  clicked = true;
} catch (e1) {
  errors.push(e1.message);
  try {
    // 2) пробуем клик по центру bounding box через mouse (координатный клик)
    const box = await ele3.boundingBox();
    if (!box) throw new Error('No bounding box available for coordinate click');
    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2, { timeout: 3000 });
    clicked = true;
  } catch (e2) {
    errors.push(e2.message);
    try {
      // 3) пробуем pointer emulation (mousedown/mouseup)
      const box = await ele3.boundingBox();
      if (!box) throw new Error('No bounding box for pointer emulation');
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.mouse.down();
      await page.waitForTimeout(30);
      await page.mouse.up();
      // небольшая пауза, чтобы UI успел отреагировать
      await page.waitForTimeout(80);
      clicked = true;
    } catch (e3) {
      errors.push(e3.message);
      try {
        // 4) крайняя мера: force click
        await ele3.click({ force: true, timeout: 3000 });
        clicked = true;
      } catch (e4) {
        errors.push(e4.message);
      }
    }
  }
}

if (!clicked) {
  console.error('All click attempts failed for el3:', errors);
  throw new Error('Failed to click el3 after multiple strategies. See console for details.');
}
// --- конец вставки ---

    const fieldEl3 = page.getByRole('textbox', { name: 'Адрес информационного объекта' });
    await fieldEl3.waitFor({ state: 'attached', timeout: 5000 });
    await expect(fieldEl3).toBeVisible({ timeout: 5000 });
    await fieldEl3.focus();           // теперь focus должен пройти
    await expect(fieldEl3).toBeFocused();

    /*await el3.click({ force: true});
    const fieldEl3 = page.getByRole('textbox', { name: 'Адрес информационного объекта' });
    await fieldEl3.focus();
    await expect(fieldEl3).toBeFocused();*/

    await expect(errorIcon1).toBeVisible();
    await fieldEl3.fill(inputVal);
    await fieldEl3.press('Enter');
    const val3  = await fieldEl2.inputValue();
    expect(val3).toBe('0x1');
    await expect(errIcon2).toBeVisible();
    await expect(errorButton).toBeVisible();

    await fieldEl3.focus();
    await expect(fieldEl3).toBeFocused();
    await fieldEl3.fill(inputVal + '2');
    await fieldEl3.press('Enter');
    const val4  = await fieldEl2.inputValue();
    expect(val4).toBe('0x12');
    await expect(errIcon2).not.toBeVisible();

    await fieldEl2.focus();
    await expect(fieldEl2).toBeFocused();
    await fieldEl2.fill('');
    await fieldEl2.press('Enter');
    const val5  = await fieldEl2.inputValue();
    expect(val5).toBe('');
    await expect(errorIcon1).toBeVisible();

    await fieldEl2.focus();
    await expect(fieldEl2).toBeFocused();
    await fieldEl2.fill(inputVal);
    await fieldEl2.press('Enter');
    expect(val2).toBe('0x1');
    await expect(errorIcon1).toBeVisible();

    await fieldEl2.focus();
    await expect(fieldEl2).toBeFocused();
    await fieldEl2.fill('');
    await fieldEl2.press('Enter');
    await fieldEl2.fill(inputVal + '2');
    await fieldEl2.press('Enter');
    const val12 = await fieldEl2.inputValue();
    expect(val12).toBe('0x12');
    await page.pause();
    await expect(page.locator('svg').filter({ hasText: /^Адрес должен быть уникальным внутри родительского элемента$/ })).toBeVisible();

    await fieldEl2.focus();
    await expect(fieldEl2).toBeFocused();
    await fieldEl2.fill(inputVal + '22');
    await fieldEl2.press('Enter');
    const val122 = await fieldEl2.inputValue();
    expect(val122).toBe('0x122');
    await expect(errIcon2).not.toBeVisible();
});
/*page.locator('svg').filter({ hasText: /^Адрес должен быть уникальным внутри родительского элемента$/ }).click();
  await page.locator('svg').filter({ hasText: 'Это поле обязательно для заполненияАдрес должен быть уникальным внутри родительс' }).first().click();
  await page.locator('svg').filter({ hasText: 'Это поле обязательно для заполненияАдрес должен быть уникальным внутри родительс' }).nth(1).click(); */