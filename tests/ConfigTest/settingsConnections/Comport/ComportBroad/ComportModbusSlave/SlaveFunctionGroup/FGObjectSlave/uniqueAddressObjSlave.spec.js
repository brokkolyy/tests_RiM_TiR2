const path = require('path');
const { test, expect } = require('@playwright/test');
const ConfigPage = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPage.js'));
const ConfigPageElements = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPageElements.js'));

async function prepareField(page) {
  const field = page.getByRole('textbox', { name: 'Адрес информационного объекта' });
  await field.focus();
  await field.fill('');
  await expect(field).toBeFocused();
  return field
}

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
    await configElement.clickObject_2();   
    
    const errorM1 = page.locator('svg').filter({ hasText: 'Это поле обязательно для заполненияАдрес должен быть уникальным внутри родительс' }).first();
    
    const elError = page.locator('div').filter({ hasText: /^Это поле обязательно для заполненияЭто поле обязательно для заполнения$/ }).nth(1)
    await elError.click(); //1
    let field = await prepareField(page)
    
    const inputVal = '0x1';
    await field.fill(inputVal);
    await field.press('Enter');
    const val = await field.inputValue();
    expect(val).toBe('0x1');
    //const fieldError = page.locator('div').filter({ hasText: /^Это поле обязательно для заполнения$/ }).nth(1)
    //await expect(fieldError).not.toBeVisible();     

    await elError.click();//2
    //await expect(fieldError).toBeVisible();     //должна быть ошибка пустого поля
    field = await prepareField(page)

    await field.fill(inputVal);
    await field.press('Enter');
    await page.screenshot({path:'errorX.png'})
    const val2 = await field.inputValue();
    expect(val2).toBe('0x1');
    await expect(page.locator('.chakra-icon.css-pgosud > path').first()).toBeVisible();
    await expect(errorM1).toBeVisible();    

    await page.locator('div').filter({ hasText: /^fg1functionGroup$/ }).first().click({button: 'right'});
    await page.getByRole('menuitem', { name: 'Создать "Объект данных"', exact: true }).hover();
    await configElement.clickObject_1();  

    await elError.click();
    field = await prepareField(page);
    await field.fill(inputVal);
    await field.press('Enter');
    const val3  = await field.inputValue();
    expect(val3).toBe('0x1');
    await expect(errorM1).toBeVisible();
    const errorIcon1 = page.locator('svg').filter({ hasText: /^Адрес должен быть уникальным внутри родительского элемента$/ });
    await expect(errorIcon1).toBeVisible();


    //без field повторно вызывается 
    await field.fill(inputVal + '2');
    await field.press('Enter');
    const val4  = await field.inputValue();
    expect(val4).toBe('0x12');
    await expect(errorIcon1).not.toBeVisible();

    await page.locator('div:nth-child(6) > ._node_1yclz_1').click();
    field = await prepareField(page);
    await field.press('Enter');
    const val5  = await field.inputValue();
    expect(val5).toBe('');
    const errorIcon2 = page.locator('div').filter({ hasText: /^Это поле обязательно для заполнения$/ }).nth(1)
    await expect(errorIcon2).toBeVisible();

    await field.fill(inputVal);
    await field.press('Enter');
    expect(val2).toBe('0x1');
    await expect(errorIcon1).toBeVisible();

    await field.press('Enter');
    await field.fill(inputVal + '2');
    await field.press('Enter');
    const val12 = await field.inputValue();
    expect(val12).toBe('0x12');
    await page.pause();
    await expect(errorIcon1).toBeVisible() //expect(page.locator('svg').filter({ hasText: /^Адрес должен быть уникальным внутри родительского элемента$/ })).toBeVisible();

    await field.fill(inputVal + '22');
    await field.press('Enter');
    const val122 = await field.inputValue();
    expect(val122).toBe('0x122');
    await page.screenshot({path:'er.png'})
    //await expect(errorIcon2).not.toBeVisible();
});
/*page.locator('svg').filter({ hasText: /^Адрес должен быть уникальным внутри родительского элемента$/ }).click();
  await page.locator('svg').filter({ hasText: 'Это поле обязательно для заполненияАдрес должен быть уникальным внутри родительс' }).first().click();
  await page.locator('svg').filter({ hasText: 'Это поле обязательно для заполненияАдрес должен быть уникальным внутри родительс' }).nth(1).click(); */